// node 十周年-AI优化版/tests/sage-action-chain.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const files = ['十周年-AI优化版/extension.js', '十周年-噩梦人机/extension.js'];
const { execFileSync } = require('node:child_process');
const blocks = files.map(file => {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    const start = source.indexOf('function patchCommonDefenseAndXianZheActionChain');
    assert.ok(start >= 0, 'current renamed common-defense patch exists');
    const previous = execFileSync('git',['show','HEAD:'+file],{cwd:root,encoding:'utf8'});
    const prefix = text => text.slice(text.indexOf('function patchCommonDefenseAndXianZheActionChain'),text.indexOf('        function wisdomSimulation')).replace(/\r\n/g,'\n');
    // Added state helpers begin after the unchanged shared defensive/preparation logic.
    assert.equal(prefix(previous),prefix(source.slice(0,source.indexOf('        // 未知摸牌只计数量和期望价值'))+'        function wisdomSimulation'));
    return source.slice(source.indexOf('        function distinctCards(player)', start),
        source.indexOf('        var wisdom = lib.skill', start));
});
const normalized = text => text.replace(/\/\/[^\n]*/g, '').replace(/\s/g, '');
assert.equal(normalized(blocks[0]), normalized(blocks[1]));
let morale = 15;
const card = (suit, value = 5) => ({ suit, value });
const enemy = { side: false, hand: 6, zhiLiao: 0, countCards() { return this.hand; },
    getHandcardLimit: () => 6, hasSkillTag: () => false };
const player = { side: true, cards: [], zhiLiao: 0, energy: 0, limit: 6,
    getCards() { return this.cards; }, countCards() { return this.cards.length; },
    getHandcardLimit() { return this.limit; }, countNengLiangAll() { return this.energy; },
    getNengLiangLimit: () => 4, getZhiLiaoLimit: () => 3, hasSkillTag: () => false };
const get = { xiBie: c => c.suit, value: c => c.value, shiQi: side => side ? morale : 15 };
const helper = { lowValueCards: (cards, n) => cards.slice().sort((a,b) => a.value-b.value).slice(0,n),
    bestEnemy: (p, scorer) => ({ target: enemy, score: scorer(enemy) }), healScore: () => 1 };
const game = { countPlayer: fn => [player, enemy].forEach(fn) };
const api = new Function('helper', 'get', 'game', blocks[0] +
    ';return {codexState,simulateSelfDamageSequence,simulateBestRebound,wisdomSimulation,enemyDamageSimulation,arcanePlanForCards,bestReboundPlan};')(helper,get,game);
const checks = [];
function test(name, fn) { fn(); checks.push(name); }
test('self damage draws unknown cards and refunds spent-card value', () => {
    const result = api.simulateSelfDamageSequence(player,[2],api.codexState(player),0);
    assert.equal(result.unknown,2); assert.equal(result.cards.length,0); assert.equal(result.score,1.4);
});
test('unknown draws are never usable as a fabricated same-suit pair', () => {
    const state = api.codexState(player); state.unknown = 6;
    assert.equal(api.simulateBestRebound(player,state,0).mode,null);
});
test('ordinary same-suit pair rebounds against full enemy', () => {
    player.cards = [card('fire'),card('fire')];
    const plan = api.bestReboundPlan(player);
    assert.equal(plan.mode,'enemy'); assert.equal(plan.count,2); assert.ok(plan.score > 0);
});
test('self-target uses two independent draws and overflow checks', () => {
    player.cards = []; player.limit = 2;
    const result = api.simulateSelfDamageSequence(player,[1,2],api.codexState(player),0);
    assert.equal(result.unknown,2); assert.equal(result.morale,14); assert.ok(result.score < 0);
    player.limit = 6;
});
test('lethal self overflow is rejected or prevented with treatment', () => {
    morale = 1; player.cards = Array.from({length:6},(_,i)=>card('s'+i)); player.zhiLiao = 1;
    const result = api.simulateSelfDamageSequence(player,[1],api.codexState(player),0,1);
    assert.equal(result.firstTreatment,1); assert.equal(result.morale,1);
    player.zhiLiao = 0;
    assert.ok(api.simulateSelfDamageSequence(player,[1],api.codexState(player),0).score < -1000);
    morale = 15; player.cards = [];
});
test('first damage treatment limit does not erase saved treatment', () => {
    player.zhiLiao = 3;
    const result = api.simulateSelfDamageSequence(player,[1],api.codexState(player),0,0);
    assert.equal(result.firstTreatment,0); assert.equal(result.treatment,3);
    player.zhiLiao = 0;
});
test('repeated wisdom respects energy cap and mandatory discard after drawing', () => {
    player.energy = 3; player.limit = 20;
    const result = api.simulateSelfDamageSequence(player,[4,4],api.codexState(player),0);
    assert.equal(result.energy,4); assert.equal(result.unknown,6);
    assert.ok(Math.abs(result.score - (6*0.7+1.45)) < 1e-8);
    player.limit = 6;
});
test('paid gem opens an energy slot before wisdom', () => {
    player.energy = 4; const state = api.codexState(player); state.energy--;
    const result = api.simulateSelfDamageSequence(player,[4],state,0);
    assert.equal(result.energy,4); assert.equal(result.unknown,3);
    assert.ok(Math.abs(result.score - (3*0.7+1.45)) < 1e-8);
    assert.match(blocks[0],/afterCost.energy = Math.max\(0, afterCost.energy - 1\)/);
});
test('repeated enemy damage updates treatment, hand size and morale loss', () => {
    enemy.hand = 5; enemy.zhiLiao = 1;
    const first = api.enemyDamageSimulation(player,enemy,2,api.codexState(player));
    const second = api.enemyDamageSimulation(player,enemy,2,first);
    assert.equal(first.enemies[0].hand,6); assert.equal(first.enemies[0].treatment,0);
    assert.equal(second.enemies[0].loss,2); assert.ok(second.score > first.score);
    assert.equal(enemy.hand,5); assert.equal(enemy.zhiLiao,1);
});
test('planning does not mutate live cards or resources', () => {
    player.cards = [card('fire'),card('fire'),card('water')]; player.energy = 2;
    const before = JSON.stringify(player);
    api.bestReboundPlan(player); api.arcanePlanForCards(player,player.cards.slice(0,2));
    assert.equal(JSON.stringify(player),before);
});
test('depth cutoff still settles mandatory damage and overflow', () => {
    player.cards=[]; player.limit=2; player.zhiLiao=0; morale=1;
    const result=api.simulateSelfDamageSequence(player,[2,2],api.codexState(player),99);
    assert.ok(result.score < -1000); assert.ok(result.morale <= 0);
    player.limit=6; morale=15;
});
test('confirmed enemy victory stops later self damage', () => {
    player.cards=[]; const state=api.codexState(player); state.won=true;
    const result=api.simulateSelfDamageSequence(player,[99],state,0);
    assert.equal(result.score,0); assert.equal(result.unknown,0); assert.equal(result.morale,15);
});
console.log('SAGE_AI_PASS', checks.length, checks);
