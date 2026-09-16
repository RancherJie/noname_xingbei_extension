const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const lib={card:Object.fromEntries(['blade','anMie','shengGuang','shengDun','xuRuo','zhongDu','moDan'].map(n=>[n,{enable:true}])),filter:{cardEnabled:c=>{
    assert(c&&lib.card[c.name],'cardEnabled must never receive a skill or unknown card');return !c.disabled;
}}},status={},get={
    name:c=>c.name,type:c=>c.type,xiBie:c=>c.element,value:c=>c.value||0,
};
let pack;
const game={import:(kind,fn)=>{pack=fn(lib,game,{},get,{},status);}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../extension.js'),'utf8'),{game,lib,get,_status:status});
const H=lib.lunHuiYiMeng,skills=pack.package.skill.skill;
lib.lhymVoice.batch=()=>{};
const card=(element,type='gongJi',name='blade')=>({element,type,name});
function player(hand=[],faces=[],stones=2){
    const p={hand,stones,side:true,storage:{lhym_sword:{weapon:'魔剑',faces:[...faces]},faShu:0},
        getCards:()=>p.hand,countCards:(pos,fn)=>fn?p.hand.filter(fn).length:p.hand.length,
        getHandcardLimit:()=>6,hasSkill:()=>false,countZhiShiWu:()=>p.stones,getExpansions:tag=>tag==='lhym_soul'?(p.souls||[]):[],
        canBiShaShuiJing:()=>true,canUseXingBei:(c,t)=>!t.illegal,
        removeZhiShiWu:async(id,n)=>{p.stones-=n;},
        discard:cards=>{p.hand=p.hand.filter(c=>!cards.includes(c));return {set(){return Promise.resolve();}}},
    };
    p.chooseControl=controls=>{
        const e={player:p};return {set(k,v){e[k]=v;return this;},async forResultControl(){status.event=e;return e.ai();}};
    };
    p.chooseCard=()=>{
        const e={player:p};return {set(k,v){e[k]=v;return this;},async forResultCards(){
            status.event=e;
            // 隔离执行可传输回调，不能捕获扩展内局部 H 或 face。
            const filter=vm.runInNewContext('('+e.filterCard.toString()+')',{get,_status:status});
            const score=vm.runInNewContext('('+e.ai.toString()+')',{get,_status:status});
            return p.hand.filter(c=>filter(c,p)).sort((a,b)=>score(b)-score(a)).slice(0,1);
        }};
    };
    return p;
}
H.sync=()=>{};
const actualStartupSafe=H.startupSafe;
H.startupSafe=()=>true;
(async()=>{
    for(const element of H.elements){
        for(const [material,side] of [[card(element),'yin'],[card(element,'faShu'),'yang'],[card('an','gongJi','anMie'),'yin'],[card('guang','faShu','shengGuang'),'yang']]){
            assert.equal(H.material(material,element+'_'+side),true,'new face mapping accepts matching material');
            assert.equal(H.material(material,element+'_'+(side==='yin'?'yang':'yin')),false,'old opposite mapping rejected');
        }
    }
    let p=player([card('shui'),card('shui','faShu'),card('huo')]);
    assert.equal(skills.lhym_huiYan.check({},p),false,'2 stones prioritize purification');
    await skills.lhym_jingHua.content({},null,p);
    assert.deepEqual(p.storage.lhym_sword.faces.sort(),['shui_yang','shui_yin']);
    assert.equal(p.stones,0);
    assert.equal(p.hand.length,1);
    p=player([card('huo'),card('huo','faShu'),card('shui','faShu')],['shui_yin']);
    assert(H.faceScore(p,'shui_yang')>H.faceScore(p,'huo_yang'),'finish half before new pair');
    p=player([card('lei'),card('shui','faShu','shengGuang')]);
    await skills.lhym_jingHua.content({},null,p);
    assert.deepEqual(p.storage.lhym_sword.faces.sort(),['lei_yang','lei_yin'],'wildcard completes pair');
    const dark=card('an','gongJi','anMie');dark.value=-10;
    p=player([card('shui'),dark],['shui_yang'],1);
    await skills.lhym_jingHua.content({},null,p);
    assert(p.hand.includes(dark),'reserve wildcard when native material exists');
    p=player([],[],2);
    assert.equal(skills.lhym_huiYan.check({},p),true,'no material permits asking ally');
    p=player([card('huo')],[],1);
    assert.equal(skills.lhym_huiYan.check({},p),false,'one stone and material prioritize purification');
    p.stones=0;assert.equal(skills.lhym_huiYan.check({},p),true,'no stone permits original choice');
    p=player([card('huo')],[],2);p.storage.lhym_sword.weapon='镇妖剑';p.storage.lhym_sword.stage=0;
    assert.equal(skills.lhym_huiYan.check({},p),true,'sword route unchanged');
    p=player([card('huo')],['huo_yang','huo_yin']);p.souls=[card('huo')];
    const actualRecipeScore=H.recipeScore;
    H.recipeScore=()=>1;
    status.currentPhase=p;status.event={getParent:()=>null};
    const target=(n,shield=false)=>({side:false,isIn:()=>true,countCards:()=>n,getHandcardLimit:()=>6,getExpansions:()=>shield?[{}]:[],
        getCards(){throw Error('Do not inspect hidden hands');}});
    const low=target(1),high=target(5),shield=target(0,true);
    H.enemies=()=>[low,high,shield];
    assert(H.comboReady(p));
    assert.equal(skills.lhym_canYing.mod,undefined,'no duplicate attack modifiers');
    assert(H.comboHit(p,low,dark)>H.comboHit(p,high,dark));
    assert(H.comboHit(p,high,p.hand[0])<0.7);
    assert.equal(H.comboHit(p,{...low,illegal:true},dark),0);
    assert.equal(H.comboHit(p,low,{...dark,disabled:true}),0);
    p.storage.faShu=1;assert.equal(H.comboReady(p),false,'cast earned spell before more attacks');
    p.storage.faShu=0;status.event={yingZhan:true};assert.equal(H.comboReady(p),false);
    status.event={getParent:()=>({name:'_yingZhan'})};assert.equal(H.comboReady(p),false);
    status.event={};p.souls=[];assert.equal(H.comboReady(p),false,'no soul no combo');
    const poison=card('huo','faShu','zhongDu'),missile=card('huo','faShu','moDan');
    p=player([card('huo'),poison,missile],[],0);status.currentPhase=p;status.event={};
    H.enemies=()=>[low];
    for(const c of p.hand){
        assert(skills.lhym_zhuJian.mod.aiOrder(p,c,3)>3.4,'damage card outranks ordinary shield/weakness');
        assert(skills.lhym_zhuJian.ai.effect.player(c,p,low)[1]>0);
        assert.equal(H.forgeDamageScore(p,{...low,side:true},c),0,'no farming allies');
    }
    for(const name of ['xuRuo','shengDun']) assert.equal(skills.lhym_zhuJian.mod.aiOrder(p,card('huo','faShu',name),3),0.5);
    assert.equal(H.forgeDamageScore(p,{...low,zhiLiao:2},p.hand[0]),0);
    assert.equal(H.forgeDamageScore(p,shield,missile),0);
    assert(H.forgeDamageScore(p,{...low,zhiLiao:1},poison)>0);
    assert(H.forgeDamageScore(p,{...low,getExpansions:()=>[{}]},poison)<H.forgeDamageScore(p,low,poison));
    assert.equal(skills.lhym_zhuJian.mod.aiOrder(p,p.hand[0],6),6,'preserve combo priority');
    p.stones=4;assert.equal(H.needsForgeDamage(p),false);
    p.stones=0;p.storage.lhym_sword.faces=H.elements.flatMap(x=>[x+'_yang',x+'_yin']);assert.equal(H.needsForgeDamage(p),false);
    p.storage.lhym_sword.faces=[];status.event={yingZhan:true};assert.equal(H.needsForgeDamage(p),false);
    status.event={};p.storage.lhym_sword.weapon='镇妖剑';assert.equal(H.needsForgeDamage(p),false);
    const shieldCard=card('feng','faShu','shengDun'),weak=card('shui','faShu','xuRuo');
    p=player([shieldCard,weak],['feng_yin','shui_yin'],2);status.currentPhase=p;
    for(const c of p.hand){
        assert(H.reserveYang(p,c));
        assert.equal(skills.lhym_zhuJian.mod.aiOrder(p,c,3.4),-1);
        assert.equal(skills.lhym_zhuJian.ai.effect.player(c,p,low),'zeroplayertarget');
    }
    p.storage.faShu=1;assert.equal(skills.lhym_zhuJian.mod.aiOrder(p,shieldCard,3.4),-1,'extra spell may be skipped');
    p.storage.lhym_sword.faces.push('feng_yang');assert.equal(H.reserveYang(p,shieldCard),false);
    p.storage.lhym_sword.faces=[];p.hand.push({...shieldCard});assert.equal(H.reserveYang(p,shieldCard),false,'spare material usable');
    p.hand=[shieldCard,card('guang','faShu','shengGuang')];
    assert.equal(H.reserveYang(p,shieldCard),true,'holy light is not a substitute for preserving native yang material');
    p.hand=[weak,card('guang','faShu','shengGuang')];
    assert.equal(H.reserveYang(p,weak),true,'preserve weakness despite holy light');
    p.hand.push(card('shui','faShu','zhongDu'));
    assert.equal(H.reserveYang(p,weak),false,'same-element spell remains a substitute');
    p.hand=[card('huo'),poison,missile];p.storage.faShu=0;H.enemies=()=>[high,shield];
    assert.equal(skills.lhym_zhuJian.mod.aiOrder(p,p.hand[0],3.05),1,'unsafe attack yields to spell');
    assert.equal(skills.lhym_zhuJian.ai.effect.player(p.hand[0],p,high),'zeroplayertarget');
    assert(skills.lhym_zhuJian.mod.aiOrder(p,missile,3)>3.4);
    H.enemies=()=>[high,low,shield];
    assert.equal(skills.lhym_zhuJian.mod.aiOrder(p,p.hand[0],3.05),6);
    assert.equal(skills.lhym_zhuJian.ai.effect.player(p.hand[0],p,high),'zeroplayertarget');
    assert.equal(skills.lhym_zhuJian.ai.effect.player(p.hand[0],p,shield),'zeroplayertarget');
    assert(skills.lhym_zhuJian.ai.effect.player(p.hand[0],p,low)[1]>0);
    status.event={name:'gongJi'};assert.equal(H.hasDamageSpell(p),false,'attack-only action is not convertible');
    status.event={name:'_yingZhan'};assert.equal(H.magicTurn(p),false);
    status.event={};p.storage.lhym_sword.weapon='镇妖剑';assert.equal(skills.lhym_zhuJian.mod.aiOrder(p,p.hand[0],3),undefined);
    p.storage.lhym_sword.weapon='魔剑';
    for(const payload of ['lhym_yinDan','lhym_moJianJi',{name:'lhym_yinDan'},{name:'unknown',type:'gongJi'},null,undefined,{}]){
        assert.equal(H.forgeDamageScore(p,low,payload),0);
        assert.equal(H.comboHit(p,low,payload),0);
        assert.equal(H.reserveYang(p,payload),false);
        assert.equal(skills.lhym_zhuJian.ai.effect.player(payload,p,low),undefined);
    }
    assert(H.isActionCard({name:'moDan',type:'faShu'}),'registered virtual card remains supported');
    p=player([card('di'),card('di','faShu'),card('huo'),card('huo','faShu')],[],2);status.currentPhase=p;
    assert(H.faceScore(p,'di_yang')>H.faceScore(p,'huo_yang'));
    const fire=card('huo','faShu','shengDun'),wind=card('feng','faShu','shengDun');
    p=player([fire,wind],['feng_yin'],1);status.currentPhase=p;
    assert(H.materialNeed(p,wind)>H.materialNeed(p,fire));
    assert(H.handCost(p,wind)<H.handCost(p,fire));
    p=player([],['di_yang','di_yin'],0);status.currentPhase=p;H.enemies=()=>[low];
    p.souls=[card('di'),card('di')];
    const rock=H.recipes.find(r=>r[0]==='裂地岩');
    assert.equal(H.shouldBoost(p,rock),false,'split rock into separate damage events');
    assert(H.afterRecipe(p,rock).spell>0,'second earth soul pays for next rock');
    p.souls=[card('di')];assert.equal(H.afterRecipe(p,rock).spell,0,'spent last soul gives no phantom followup');
    p.hand=[card('huo','faShu','shengDun')];assert.equal(H.afterRecipe(p,rock).spell,0,'reserved shield not a followup');
    p.souls=[card('di'),card('di')];H.enemies=()=>[{...low,zhiLiao:1}];
    assert.equal(H.shouldBoost(p,rock),true,'boost may overcome treatment');
    H.enemies=()=>[low];p.hand=[card('huo')];
    assert(H.attackScore(p,low,p.hand[0])>H.attackScore(p,{...low,zhiLiao:2},p.hand[0]));
    H.recipeScore=actualRecipeScore;H.team=()=>[];
    p.hand=[];p.souls=[card('di')];
    const lastRock=H.recipeScore(p,rock);
    p.souls.push(card('di'));assert(H.recipeScore(p,rock)>lastRock,'actual recipe score rewards funded next cast');
    p=player([card('feng')],['feng_yin'],0);status.currentPhase=p;status.event={};
    const three=target(3),five=target(5),six=target(6);
    H.enemies=()=>[three,five,six,shield];
    const attackEffect=skills.lhym_zhuJian.ai.effect.player;
    assert(H.comboHit(p,three,p.hand[0])>H.comboHit(p,five,p.hand[0]));
    assert(H.comboHit(p,five,p.hand[0])>H.comboHit(p,six,p.hand[0]));
    assert(attackEffect(p.hand[0],p,three)[1]>0,'low confidence fallback selects fewest cards');
    for(const t of [five,six,shield]) assert.equal(attackEffect(p.hand[0],p,t),'zeroplayertarget');
    status.event={name:'gongJi'};
    assert.equal(attackEffect(p.hand[0],p,five),'zeroplayertarget','dedicated attack preserves targeting');
    H.enemies=()=>[shield];assert.equal(attackEffect(p.hand[0],p,shield),'zeroplayertarget');
    const earth=card('di'),fireAttack=card('huo');
    p=player([earth,fireAttack],[],0);status.currentPhase=p;status.event={};H.enemies=()=>[three,five];
    assert(H.reserveAttack(p,earth),'preserve last earth material at low confidence');
    assert.equal(attackEffect(earth,p,three),'zeroplayertarget');
    H.enemies=()=>[low];assert(H.reserveAttack(p,earth),'prefer other high-confidence attack');
    p.hand=[earth];assert.equal(H.reserveAttack(p,earth),false,'allow reliable resource-producing last attack');
    p.countNengLiang=x=>1;H.enemies=()=>[three];
    assert(H.silverForge(p));assert(H.hasDamageSpell(p));
    assert.equal(skills.lhym_yinDan.ai.result.player(p),1,'one crystal can farm stone');
    H.enemies=()=>[{...three,zhiLiao:1}];assert.equal(H.silverForge(p),false);
    assert.equal(skills.lhym_yinDan.ai.result.player(p),-1);
    p.countNengLiang=()=>0;let decisions=[];
    p.countEmptyNengLiang=()=>5;
    p.chooseBool=()=>{const e={};return {set(k,v){e[k]=v;return this;},async forResultBool(){status.event=e;const yes=e.ai();decisions.push(yes);return yes;}};};
    p.logSkill=()=>{};p.addNengLiang=async()=>{};
    const gain={num:3};await skills.lhym_dianDang.content({},gain,p);
    assert.deepEqual(decisions,[false,true,true]);assert.equal(gain.num,1,'retain first incoming gem');
    H.startupSafe=actualStartupSafe;
    p=player([card('di')],[],1);H.enemies=()=>[three];
    assert.equal(H.startupSafe(p,1),false);
    assert.equal(skills.lhym_jingHua.check({},p),false);
    p.hand.push(card('shui','faShu','shengGuang'));assert.equal(H.startupSafe(p,1),false,'holy light cannot supply ordinary action');
    p.hand.push(card('huo'));assert.equal(H.startupSafe(p,1),true);
    assert.equal(H.startupSafe(p,2),false,'second purification must preserve action');
    p.hand=[];p.countNengLiang=()=>1;assert(H.startupSafe(p,1),'silver permits empty hand');
    p.countNengLiang=()=>0;p.storage.lhym_sword.faces=['di_yang','di_yin'];p.souls=[card('di')];
    assert(H.startupSafe(p,1),'funded single recipe permits empty hand');
    console.log('PASS: startup action reserve, holy light exclusion and no-hand spells');
    console.log('PASS: attack material preservation, one-crystal silver farming, treatment and batch pawn');
    console.log('PASS: 3/5/6-card fallback targeting and public shield regression');
    console.log('PASS: earth/wind development, shared material needs, post-cost actions, split earth casts and actual damage scoring');
    console.log('PASS: skill IDs, skill payloads, unknown cards and empty inputs never reach cardEnabled');
    console.log('PASS: reserve last yang material, skip extra spell, low-hand unshielded targeting, unsafe attack fallback and action boundaries');
    console.log('PASS: damage farming priority, full resources, completed lights, treatment/shield, poison delay and enemy-only scoring');
    console.log('PASS: purification priority, paired costs, wildcard preservation, isolated callbacks, attack/spell strategy and exclusions');
})().catch(e=>{console.error(e);process.exitCode=1;});
