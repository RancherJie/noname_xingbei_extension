const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const normal=fs.readFileSync(path.join(root,'十周年-AI优化版/extension.js'),'utf8');
const nightmare=fs.readFileSync(path.join(root,'十周年-噩梦人机/extension.js'),'utf8');
const guard=normal.slice(normal.indexOf('    function isNightmareAiProviderActive()'),normal.indexOf('    var startupSkills'));
function entry(source,lib,hit){
 const start=source.indexOf('    function applyShiZhouNianAiPatch()');
 const end=source.indexOf('        patchMandatoryAiActions();',start);
 assert.ok(start>=0&&end>start);
 // 执行实际入口保护代码；以计数器代替无关的角色补丁集合。
 return new Function('lib','hit',guard+source.slice(start,end)+'hit();\n}\nreturn applyShiZhouNianAiPatch;')(lib,hit);
}
for(const source of [normal,nightmare]){
 for(const hook of ['precontent','content','arenaReady'])
  assert.ok(source.includes(hook+': function () {\n            applyShiZhouNianAiPatch();'.replace(/\n/g,source.includes('\r\n')?'\r\n':'\n')));
}
let total=0;
for(const order of ['normal-first','nightmare-first']){
 for(const reinforcement of [true,false]){
  const lib={skill:{},config:{extensions:['十周年-AI优化版','十周年-噩梦人机'],
   'extension_十周年-噩梦人机_enable':true,'extension_十周年-噩梦人机_enableNightmareSkills':reinforcement}};
  let a=0,b=0; const n=entry(normal,lib,()=>a++),m=entry(nightmare,lib,()=>b++);
  for(let phase=0;phase<3;phase++){if(order==='normal-first'){n();m();}else{m();n();}}
  assert.equal(a,0);assert.equal(b,3);total++;
 }
}
for(const setup of [
 {extensions:[]},
 {extensions:[],'extension_十周年-噩梦人机_enable':true},
 {extensions:['十周年-噩梦人机'],'extension_十周年-噩梦人机_enable':false}
]){
 const lib={skill:{},config:setup};let calls=0;const n=entry(normal,lib,()=>calls++);
 n();n();n();assert.equal(calls,3);total++;
}
for(const lib of [
 {skill:{},config:{extensions:['十周年-噩梦人机']}},
 {skill:{},config:{extensions:[]},xingBeiNightmareAiProviderActive:true}
]){
 const before=JSON.stringify(lib.config);let calls=0;entry(normal,lib,()=>calls++)();
 assert.equal(calls,0);assert.equal(JSON.stringify(lib.config),before);total++;
}
console.log('AI_PROVIDER_PASS',total,'scenarios; all three lifecycle hooks checked');
