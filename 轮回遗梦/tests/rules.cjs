const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
let pack;
const lib={};
const get={xiBie:c=>c.xiBie,type:c=>c.type,name:c=>c.name,value:()=>3};
const game={import:(kind,fn)=>{pack=fn(lib,game,{},get,{},{});},filterPlayer:fn=>players.filter(fn)};
const players=[];
vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../extension.js'),'utf8'),{game});
const H=lib.lunHuiYiMeng, S=pack.package.skill.skill;
const p={storage:{lhym_sword:{weapon:'魔剑',faces:[],stage:0,branches:[]}},side:true,
    hand:[],soul:[],energy:{baoShi:1,shuiJing:2},stones:4,
    getCards(){return this.hand;},getExpansions(){return this.soul;},
    countCards(z,f){return f?this.hand.filter(f).length:this.hand.length;},
    countNengLiang(x){return this.energy[x];},countZhiShiWu(){return this.stones;}};
players.push(p,{side:false},{side:false});
const card=(x,type='gongJi',name='dao')=>({xiBie:x,type,name});
let count=0;
function test(name,fn){fn();console.log('PASS',name);count++;}
test('ten faces; dark and light wildcard exact names',()=>{
    assert.equal(H.faces(p).length,10);
    assert.ok(H.material(card('an','gongJi','anMie'),'huo_yang'));
    assert.ok(!H.material(card('an','gongJi','anMie'),'huo_yin'));
    assert.ok(H.material(card('guang','faShu','shengGuang'),'di_yin'));
    assert.ok(!H.material(card('guang','faShu','shengGuang'),'di_yang'));
    assert.ok(!H.material(card('an','gongJi','other'),'huo_yang'));
});
test('all eleven recipes require both faces and one soul per element',()=>{
    p.soul=H.elements.map(x=>card(x));p.hand=[card('huo')];
    assert.equal(H.available(p).length,0);
    p.storage.lhym_sword.faces=H.elements.flatMap(x=>[x+'_yin',x+'_yang']);
    assert.equal(H.available(p).length,11);
    p.hand=[]; assert.equal(H.available(p).length,5);
    p.soul=[]; assert.equal(H.available(p).length,0);
});
test('silver wave needs exact opponent count and mixed actual resources',()=>{
    assert.ok(H.canSilver(p));p.energy.baoShi=3;assert.ok(!H.canSilver(p));
    p.energy.baoShi=1;p.energy.shuiJing=0;assert.ok(!H.canSilver(p));p.energy.shuiJing=2;
});
test('three repair stages have exact stone and thunder material requirements',()=>{
    p.storage.lhym_sword.weapon='镇妖剑';
    for(let stage=0;stage<3;stage++){
        p.storage.lhym_sword.stage=stage;p.hand=Array.from({length:stage+1},()=>card('lei'));
        p.stones=[1,1,2][stage];assert.ok(H.canForge(p));p.stones--;assert.ok(!H.canForge(p));
    }
    p.storage.lhym_sword.stage=3;p.stones=4;assert.ok(!H.canForge(p));
});
test('only chain branch is once per turn; no old caps or costs',()=>{
    const capped=Object.keys(S).filter(x=>S[x].usable!==undefined);
    assert.deepEqual(capped,['lhym_lianZhan']);
    assert.ok(!S.lhym_lianZhan.content.toString().includes('removeBiSha'));
    assert.ok(S.lhym_baHuang.filter({damageNum:4,target:players[1]},p));
    assert.equal(S.lhym_longJing.intro.max,4);
});
test('active and counter damage modifiers have exact scopes',()=>{
    assert.ok(S.lhym_fengMang.filter({yingZhan:false}));assert.ok(!S.lhym_fengMang.filter({yingZhan:true}));
    assert.ok(S.lhym_houFa.filter({yingZhan:true}));assert.ok(!S.lhym_canYing.filter({yingZhan:true}));
    assert.ok(S.lhym_leiDong.filter({yingZhan:true,card:card('lei')}));
});
test('refine bookkeeping owned only by actual refiner, not all players',()=>{
    assert.ok(S.lhym_refineBegin.filter({player:p},p));
    assert.ok(!S.lhym_refineBegin.filter({player:p},players[1]));
});
test('pack asset files and metadata are complete',()=>{
    const path=require('node:path'),root=path.join(__dirname,'..');
    for(const f of pack.files.character) assert.ok(fs.existsSync(path.join(root,f)));
    for(const id of pack.package.character.character.jingTian[3]) assert.ok(S[id],id);
    assert.equal(JSON.parse(fs.readFileSync(path.join(root,'info.json'),'utf8')).version,pack.package.version);
});
console.log(count+' rule groups passed');
