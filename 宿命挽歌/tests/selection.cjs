const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const source=fs.readFileSync(path.join(root,'宿命挽歌/extension.js'),'utf8');
const core=fs.readFileSync(path.join(root,'../noname/get/index.js'),'utf8');
const start=core.indexOf('\tcharacterGets(list,num){'),end=core.indexOf('\n\tzhiLiaoEffect(',start);
const method=core.slice(start,end).trim().replace(/,$/,'');
const context=vm.createContext({assert});
vm.runInContext(`
Array.prototype.remove=function(x){const i=this.indexOf(x);if(i>=0)this.splice(i,1);return this;};
Array.prototype.randomGets=function(n){return this.slice().sort(()=>Math.random()-.5).slice(0,n);};
const forms=['sheYaoNan','huYaoNv'];
const pool=['one',...forms,'two','three','four','five','six'];
const lib={filter:{},config:{banned:[],forbidlist:[],customforbid:[]},configOL:{banned:[]},connectBanned:[]};
const game={players:[],import:(type,fn)=>fn(lib,game,ui,get,{},_status)};
const _status={};
const parent={insertBefore(){}};
const button=id=>({_link:id,link:id,parentNode:parent,remove(){this.removed=true;}});
const ui={create:{characterDialog(){return {buttons:pool.map(button)};},button(id){return {...button(id),_replaceButton:true};}}};
const get={characters:()=>pool.slice(),charactersOL:()=>pool.slice(),${method}};
`,context);
vm.runInContext(source,context);
vm.runInContext(`
lib.suMingWanGeInstallHiddenDragonSelection();
const count=list=>list.filter(x=>forms.includes(x)).length;
assert.equal(count(get.characters()),1);
assert.equal(count(get.charactersOL()),1);
const original=pool.slice();get.characterGets(pool);assert.deepEqual(pool,original);
assert.equal(get.characterGets(pool,8).length,7);
for(let i=0;i<10000;i++){
 const candidates=get.characterGets(get.characters());
 // 模拟本体先移除候选ID、再随机替换实际形态的选将流程。
 const seats=[];
 while(candidates.length){const id=candidates.splice(Math.floor(Math.random()*candidates.length),1)[0];seats.push(forms.includes(id)?forms[Math.floor(Math.random()*2)]:id);}
 assert.ok(count(seats)<=1);
 const online=get.characterGets(get.charactersOL());
 const offers=[online.splice(0,2),online.splice(0,2),online.splice(0,2),online.splice(0,2)];
 assert.ok(count(offers.flat())<=1);
}
for(const id of forms){
 lib.config.banned=[id];assert.equal(count(get.characters()),0);assert.equal(count(get.characterGets(pool)),0);
 lib.config.banned=[];_status.connectMode=true;lib.configOL.banned=[id];assert.equal(count(get.charactersOL()),0);
 lib.configOL.banned=[];lib.connectBanned=[id];assert.equal(count(get.charactersOL()),0);lib.connectBanned=[];_status.connectMode=false;
 game.players=[{name1:id}];assert.equal(count(get.characters()),0);game.players=[];
}
assert.equal(count(get.characterGets(['huYaoNv','one'])),1);
const dialog=ui.create.characterDialog('heightset');assert.equal(count(dialog.buttons.map(b=>b.link)),1);
assert.ok(dialog.buttons.find(b=>forms.includes(b.link))._replaceButton);
assert.equal(count(ui.create.characterDialog().buttons.map(b=>b.link)),2);
const before=get.characterGets;lib.suMingWanGeInstallHiddenDragonSelection();assert.equal(get.characterGets,before);
assert.equal(count(get.characters()),1);
`,context);
console.log('PASS: actual core candidate sampling, 10000 offline/online allocations, both bans, occupied slot, free selection, idempotent installation');
