const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const calls=[],lib={},game={import:(kind,fn)=>fn(lib,game,{}, {},{},{}),log:(...args)=>calls.push(['log',args[2]])};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../extension.js'),'utf8'),{game});
const H=lib.lunHuiYiMeng;
const emptyTeam=()=>Object.assign([],{sortBySeat(){return this;}});
H.target=async()=>null;H.team=emptyTeam;H.enemies=emptyTeam;
const p={
    trySkillAnimate:(id,name)=>calls.push(['animate',id,name]),
    addNengLiang:async()=>{},addGongJi(){},addFaShu(){},addGongJiOrFaShu(){},
    chooseTarget:()=>({set(){return this;},forResultTargets:async()=>[]}),
    logSkill(){throw Error('Announcement must not add another skill activation');},
};
(async()=>{
    for(const r of H.recipes){
        calls.length=0;
        await H.cast(p,r,false);
        assert.deepEqual(calls,[['animate','lhym_moJianJi',r[0]],['log','【'+r[0]+'】']]);
    }
    console.log('PASS: all 11 recipes announce exact name once, without extra skill activation');
})().catch(e=>{console.error(e);process.exitCode=1;});
