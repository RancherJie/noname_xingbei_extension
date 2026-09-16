const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const lib={skill:{},card:{},filter:{cardEnabled:()=>true}},status={},get={type:c=>c.type,xiBie:c=>c.xiBie,name:c=>c.name,value:()=>1,position:c=>c.pos||'d'};
let pack;const game={players:[],import:(kind,f)=>{pack=f(lib,game,{},get,{},status)},hasPlayer:f=>game.players.some(f),log(){}};
vm.runInNewContext(fs.readFileSync(require('path').join(__dirname,'../extension.js'),'utf8'),{game,lib,get,_status:status});
const skill=pack.package.skill.skill;Object.assign(lib.skill,skill);const C=lib.lhymCompanion,H=lib.lunHuiYiMeng;
lib.lhymVoice.batch=()=>{};
function p(id){return {playerid:id,side:true,storage:{},cards:[],dew:[],shadow:[],souls:[],treatment:0,damage:0,
 syncStorage(){},markSkill(){},unmarkSkill(){},logSkill(){},hasSkill(){return true;},isIn(){return true;},
 countCards(){return this.cards.length;},getCards(){return this.cards;},getHandcardLimit(){return 6;},getZhiLiaoLimit(){return 2;},hasZhiShiWu(){return this.pearl;},
 getExpansions(tag){return tag==='lhym_huaLu'?this.dew:tag==='lhym_canYingPai'?this.shadow:tag==='lhym_soul'?this.souls:[];},
 changeZhiLiao:async function(n){this.treatment+=n},faShuDamage:async function(n){this.damage+=n},
 removeBiShaShuiJing:async function(){this.paid=true},showCards:async()=>{},loseToDiscardpile:async function(cs){this.dew=this.dew.filter(c=>!cs.includes(c))},
 chooseBool(){return {set(){return this},forResultBool:async()=>true}},
 chooseControl(opts){return {set(){return this},forResultControl:async()=>opts[0]}},
 };}
(async()=>{
const snow=p('snow'),ally=p('ally'),enemy=p('enemy');enemy.side=false;game.players=[snow,ally,enemy];
C.move(snow,ally);assert.equal(C.holder(snow),ally);assert.equal(snow.dew.length,0);
ally.pearl=true;await skill.lhym_wuDuGuiYuan.content({target:ally},null,snow);assert.equal(ally.treatment,2,'empty dew still heals with pearl');
for(const xs of [[],['di'],['di','di'],['di','feng']]){
 snow.dew=xs.map(x=>({xiBie:x}));enemy.damage=0;let moved=0;const move=C.healMove;C.healMove=async()=>moved++;
 await skill.lhym_tianLing.content({target:enemy},null,snow);
 assert.equal(enemy.damage,xs.length===0?1:xs.length===1?2:xs[0]===xs[1]?3:1);assert.equal(moved,xs.length===2?1:0);C.healMove=move;
}
const jt=p('jing');jt.storage.lhym_sword={weapon:'镇妖剑',stage:1,branches:[],faces:[]};game.players.push(jt);H.sync=()=>{};
await skill.lhym_shenShu.content({target:jt},null,snow);assert.equal(jt.storage.lhym_sword.stage,2);assert.equal(skill.lhym_shenShu.mod.maxHandcard(snow,6),4);
await skill.lhym_shenShu.content({target:jt},null,snow);assert.equal(jt.storage.lhym_sword.stage,2,'one use per battle');
const kui=p('kui');C.form(kui,false);assert.equal(C.red(kui),false);C.form(kui,true);assert.equal(C.red(kui),true);
const e={yingZhan:false,card:{lhym_shadow:true,xiBie:'di'},changeDamageNum(n){this.damage=n}};
await skill.lhym_daiJunChoice.content({},e,kui);assert.equal(e.damage,1);assert.equal(e.lhym_returnBlue,undefined);
assert.equal(skill.lhym_cangFeng.filter({yingZhan:false,lhym_shadow:true,cards:[{type:'gongJi'}]},kui),false);
assert(pack.package.skill.translate.lhym_hongYing_info.includes('无手牌'));
const giveTarget=p('give');giveTarget.name='longKui';giveTarget.countEmptyNengLiang=()=>3;giveTarget.energy=0;giveTarget.addNengLiang=async(x,n)=>giveTarget.energy+=n;
const donor=p('donor');donor.countEmptyNengLiang=()=>3;donor.countNengLiang=x=>x==='baoShi'?1:0;donor.energy=0;donor.addNengLiang=async(x,n)=>donor.energy+=n;
donor.chooseTarget=()=>({set(){return this},forResultTargets:async()=>[giveTarget]});game.players=[donor,giveTarget];
await skill.lhym_dianDang.content({}, {num:1},donor);assert.equal(giveTarget.energy,1);assert.equal(donor.energy,1,'gift is deducted from converted crystals');
giveTarget.removeNengLiang=async()=>giveTarget.energy--;giveTarget.countNengLiang=x=>x==='shuiJing'?giveTarget.energy:0;donor.countEmptyNengLiang=()=>2;
get.cards=()=>{throw Error('companion refinement must not reveal deck');};
await skill.lhym_feiLong.content({}, {player:giveTarget,lhym_refined:{shuiJing:1}},donor);
assert.equal(giveTarget.energy,0);assert.equal(donor.energy,2);
kui.shadow=[{type:'gongJi'}];kui.cards=[];C.form(kui,true);kui.gain=async cs=>{kui.cards.push(...cs);kui.shadow=[];};
const oldPick=C.pick;C.pick=async(p,cards)=>[cards[0]];
kui.removeBiShaShuiJing=()=>{throw Error('resonance must not pay crystal');};
await C.twin(kui,true);assert.equal(C.red(kui),false);assert.equal(kui.cards.length,1);C.pick=oldPick;
assert.equal(skill.lhym_shenShuZhaoDan.filter({yingZhan:true},jt),false,'counter attacks never move flower');
const missed={yingZhan:true,cards:[{type:'gongJi',pos:'d'}]};C.form(kui,false);kui.shadow=[];
assert.equal(skill.lhym_cangFeng.filter(missed,kui),true,'blue can collect own missed counter');
assert.equal(skill.lhym_cangFeng.filter({...missed,lhym_shadow:true},kui),false);
assert.equal(skill.lhym_cangFeng.filter({...missed,lhym_borrowed:true},kui),false);
jt.storage.lhym_sword={weapon:'魔剑',faces:[],stage:0,branches:[]};jt.countZhiShiWu=()=>0;
const native={name:'blade',type:'gongJi',xiBie:'di'};
await C.lightFace(jt,native);assert(jt.storage.lhym_sword.faces.includes('di_yin'));
await C.lightFace(jt,native);assert.equal(jt.storage.lhym_sword.faces.length,1,'no duplicate light');
kui.chooseTarget=()=>({set(){return this},forResultTargets:async()=>[enemy]});
kui.useCard=()=>({then(done){assert.equal(C.red(kui),false,'remain blue while counter resolves');done();}});
await C.counter(kui,{player:enemy,weiMingZhong(){}},native);assert.equal(C.red(kui),true,'red only after counter resolves');
assert(!skill.lhym_hongYing.content.toString().includes('player.discard'),'borrow no longer charges replacement card');
console.log('PASS: missed counter collection, post-counter red timing, free light and no replacement cost');
console.log('PASS: pawn gift conservation, companion refinement skips reveal, free twin returns shadow');
console.log('PASS: empty-dew movement/heal, all burst branches, free forge once/permanent cap, forms and shadow exclusions');
})().catch(e=>{console.error(e);process.exitCode=1});
