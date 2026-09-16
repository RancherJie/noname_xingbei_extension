const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const s=fs.readFileSync(require('path').join(__dirname,'../extension.js'),'utf8');
const start=s.indexOf('aiCostPlan: function(player) {')+'aiCostPlan: '.length;
const end=s.indexOf('return best;',start)+'return best;'.length;
const fn=vm.runInNewContext('('+s.slice(start,end)+'})',{
 lib:{filter:{cardDiscardable:c=>!c.locked,cardEnabled:c=>!c.disabled}},
 get:{type:c=>c.type,name:c=>c.name,value:c=>c.value||0},
 game:{hasPlayer:f=>f({side:false})}
});
const attack={name:'blade',type:'gongJi'},spell={name:'shengGuang',type:'faShu'},spell2={name:'moDan',type:'faShu'};
const p={side:true,hand:[],getCards(){return this.hand},canUseXingBei:()=>true};
p.hand=[attack,spell];assert.equal(fn(p).length,0);
p.hand=[attack,spell,spell2];assert.equal(fn(p).length,2);assert(!fn(p).includes(attack));
p.hand=[{name:'anMie',type:'gongJi'},spell,spell2];assert.equal(fn(p).length,0);
p.hand=[{...attack,disabled:true},spell,spell2];assert.equal(fn(p).length,0);
p.hand=[attack,{...spell,locked:true},spell2];assert.equal(fn(p).length,0);
console.log('PASS: wave startup retains legal attack, rejects empty hand/dark/disabled/locked costs');
