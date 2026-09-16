const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const lib={skill:{},element:{player:{}},filter:{}},game={jiChuXiaoGuo:{all:new Set()},addGlobalSkill(){}};
for(const name of ['addGongJi','addFaShu','addGongJiOrFaShu','addExtraXingDong'])lib.element.player[name]=function(){};
for(const name of ['targetEnabled','targetEnabled2','targetEnabled3','filterTrigger'])lib.filter[name]=()=>true;
for(const name of ['chooseTarget','chooseCardTarget'])lib.element.player[name]=()=>({filterTarget:true,set(k,v){this[k]=v;return this;}});
game.import=(kind,factory)=>Object.assign(lib.skill,factory(lib,game,{}, {},{},{}).package.skill.skill);
const context=vm.createContext({game}); // 刻意不向全局暴露lib，复现真实扩展模块的作用域。
vm.runInContext(fs.readFileSync(path.join(__dirname,'../extension.js'),'utf8'),context);
assert.equal(vm.runInContext('typeof lib',context),'undefined');
lib.skill.scopeTrue={filterTarget:true};
lib.skill.scopeReceiver={filterTarget:function(card,source,target){return this.token===7&&arguments.length===4;}};
lib.skill.baDeManager.install();
const source={side:true},ally={side:true,isIn:()=>true,hasSkill:()=>false},enemy={...ally,side:false};
const frozen={...ally,hasSkill:id=>id==='baDeNingZhi'};
const f=lib.skill.jianYiYongTanDiao.filterTarget;
assert.equal(f(null,source,ally),true);
assert.equal(f(null,source,enemy),false);
assert.equal(f(null,source,frozen),false);
assert.equal(f(null,source,{...ally,isIn:()=>false}),false);
assert.equal(lib.skill.scopeTrue.filterTarget(null,source,ally),true);
assert.equal(lib.skill.scopeReceiver.filterTarget.call({token:7},null,source,ally,'extra'),true);
lib.skill.baDeManager.install();assert.equal(lib.skill.jianYiYongTanDiao.filterTarget,f);
// 模拟远端按源码重建：使用远端lib而非房主闭包。
const remoteLib={skill:{baDeManager:{open:()=>true},jianYiYongTanDiao:{baDeOriginalTargetFilter:()=>false}}};
const remote=vm.runInNewContext('('+f.toString()+')',{lib:remoteLib});
assert.equal(remote(null,source,ally),false);
console.log('PASS: no global lib, Sona ally/enemy, stasis/out, boolean filters, receiver/arguments, idempotence, remote reconstruction');
