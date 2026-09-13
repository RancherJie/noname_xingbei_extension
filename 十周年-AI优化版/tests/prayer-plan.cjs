const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const files=['十周年-AI优化版','十周年-噩梦人机'].map(n=>path.resolve(__dirname,'../..',n,'extension.js'));
const blocks=files.map(f=>fs.readFileSync(f,'utf8').split('    function patchPrayerPlan(helper) {')[1].split('    function patchSupportTargeting(helper) {')[0]);
assert.equal(blocks[0],blocks[1]);
for(const block of blocks){
 const make=()=>({ai:{order:3,result:{player:()=>0,target:()=>1}}});
 const lib={card:{knife:{type:'gongJi',...make()}},skill:{_tiLian:{...make(),chooseButton:{check:()=>2}},_gouMai:make(),guangHuiXinYang:{...make(),filter:()=>true},heiAnZuZhou:make(),faLiChaoXi:{check:()=>true}}};
 let stock=['baoShi','shuiJing'],winning=false;
 const p={side:true,prayer:true,form:false,gems:0,crystals:0,marks:0,hand:4,zhiLiao:0,hasSkill(){return this.prayer},isHengZhi(){return this.form},canBiShaBaoShi(){return this.gems>0},countNengLiang(n){return n==='baoShi'?this.gems:this.crystals},countZhiShiWu(){return this.marks},countCards(){return this.hand},getHandcardLimit:()=>6,countEmptyNengLiang:()=>3,canFaShu:()=>true};
 const ui={selected:{buttons:[]}},status={player:p};
 const helper={canWinningSynthesis:()=>winning};
 vm.runInNewContext('function patchPrayerPlan(helper) {'+block+'patchPrayerPlan(helper);',{lib,ui,_status:{event:status},helper,game:{hasPlayer:fn=>fn({side:true})},get:{zhanJi:()=>stock,emptyZhanJi:()=>2,damageEffect:()=>-2},markPatched:()=>true});
 assert.equal(lib.skill._tiLian.ai.order(null,p),7);
 assert.equal(lib.skill._tiLian.ai.result.player(p),3);
 assert.equal(lib.skill._tiLian.chooseButton.check({link:'baoShi'}),20);
 ui.selected.buttons=[{link:'baoShi'}];assert.equal(lib.skill._tiLian.chooseButton.check({link:'shuiJing'}),2);
 winning=true;assert.equal(lib.skill._tiLian.ai.order(null,p),3);winning=false;
 stock=['shuiJing'];assert.equal(lib.skill._gouMai.ai.order(null,p),4.8);
 p.gems=1;assert.equal(lib.skill.faLiChaoXi.check({},p),false);
 p.form=true;assert.equal(lib.card.knife.ai.order(null,p),5);
 p.marks=2;p.hand=6;assert.equal(lib.skill.guangHuiXinYang.ai.order(null,p),5.5);
 assert.equal(lib.skill.heiAnZuZhou.ai.order(null,p),0);
 assert.equal(lib.skill.heiAnZuZhou.ai.result.target(p,{side:true}),-20);
 p.hand=3;assert.equal(lib.skill.heiAnZuZhou.ai.order(null,p),4.6);
 p.prayer=false;assert.equal(lib.card.knife.ai.order(null,p),3);
 assert.equal(lib.skill._tiLian.ai.result.player(p),0);
}
console.log('PRAYER_PLAN_PASS: both providers, first gem, winning synthesis, rune cycle, unsafe curse, reserve, other roles');
