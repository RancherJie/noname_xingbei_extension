const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../extension.js'),'utf8');
const skills={};
const block=source.slice(source.indexOf('        // 1. 风之剑圣'),source.indexOf('        // 2. 狂战士'));
new Function('addSkill','register','activeAttack',block)((id,skill)=>skills[id]=skill,()=>{},e=>e&&e.yingZhan!==true);
(async()=>{
const s=skills.nightmare_kuangFengZhouYu,p={storage:{}};
assert.equal(s.trigger.source,'gongJiMingZhong');
assert.equal(s.filter({gongJiMingZhong:false}),false);
assert.equal(s.filter(null),false);
assert.equal(s.subSkill.damage.filter({yingZhan:false},p),false);
for(const response of [false,true]){
 const hit={gongJiMingZhong:true,yingZhan:response};
 assert.equal(s.filter(hit),true);await s.content({},hit,p);
}
assert.equal(p.storage.nightmareJiFengCount,2);
assert.equal(s.subSkill.damage.filter({yingZhan:true},p),false);
let damage=2;
await s.subSkill.damage.content({},{changeDamageNum:n=>damage+=n},p);
assert.equal(damage,4);
await s.content({},{gongJiMingZhong:true},p);
assert.equal(damage,4);assert.equal(p.storage.nightmareJiFengCount,3);
assert.deepEqual(s.subSkill.reset.trigger.global,['phaseBefore','phaseAfter']);
await s.subSkill.reset.content({},null,p);assert.equal(p.storage.nightmareJiFengCount,0);
p.storage.nightmareJiFengCount=5;s.onremove(p);assert.equal(p.storage.nightmareJiFengCount,undefined);
assert.equal(skills.nightmare_yuFengErXing.trigger.player,'phaseBegin');
console.log('WIND_HIT_STACK_PASS: miss/hit/response/future damage/reset/removal/crystal');
})().catch(e=>{console.error(e);process.exitCode=1;});
