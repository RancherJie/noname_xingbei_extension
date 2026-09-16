// 原定向测试入口保留；正常随机对局使用runtime.cjs，不注入测试材料。
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const controller=path.resolve(__dirname,'../../无名杯自动模拟器/controller.js');
const source=fs.readFileSync(path.resolve(__dirname,'../extension.js'),'utf8');
const packCode=source.replace("game.import('extension', function",'const pack = (function')
    .replace(/\}\);\s*$/,'})(lib,game,ui,get,ai,_status);');
const injection=`(async()=>{
    const {lib,game,ui,get,ai,_status}=await import('./noname.js');
    lib.config['extension_十周年-噩梦人机_enableNightmareSkills']=false;
    ${packCode}
    Object.assign(lib.character,pack.package.character.character);
    Object.assign(lib.translate,pack.package.character.translate,pack.package.skill.translate);
    Object.assign(lib.characterIntro,pack.package.character.characterIntro);
    Object.assign(lib.skill,pack.package.skill.skill);
    lib.characterPack['轮回遗梦']=pack.package.character.character;
    // 注入时选将列表已经生成，补入父选将事件的候选列表。
    for(let ev=_status.event,i=0;ev&&i<12;i++,ev=ev.getParent?.()) {
        if(Array.isArray(ev.list)&&!ev.list.includes('jingTian')) ev.list.push('jingTian');
    }
    for(const id of Object.keys(pack.package.skill.skill)) game.finishSkill(id);
    pack.arenaReady();
    window.__lhymBranch=${Number(process.env.LHYM_BRANCH)||0};
    ${process.env.LHYM_FIXTURE?fs.readFileSync(path.join(__dirname,'fixture.js'),'utf8'):''}
    lib.skill.lhym_testSnapshot={trigger:{global:'phaseEnd'},forced:true,popup:false,
        filter:(e,p)=>p.name==='jingTian',content:async function(event,trigger,player){
            if(window.__xingbeiSimulator) window.__xingbeiSimulator.timeline.push({phase:game.phaseNumber,type:'fixture',
                text:'景天测试状态',sword:JSON.parse(JSON.stringify(player.storage.lhym_sword)),
                souls:player.getExpansions('lhym_soul').length,stones:player.countZhiShiWu('lhym_longJing'),
                gems:player.countNengLiang('baoShi'),crystals:player.countNengLiang('shuiJing')});
        }};
    game.addGlobalSkill('lhym_testSnapshot');
    const forcedWeapon=${JSON.stringify(process.env.LHYM_WEAPON||'')};
    if(forcedWeapon) {
        const choose=lib.element.player.chooseControl;
        lib.element.player.chooseControl=function(){
            const evt=choose.apply(this,arguments);
            if(Array.from(arguments).includes('魔剑')&&Array.from(arguments).includes('镇妖剑')) {
                const set=evt.set;
                evt.set=function(key,value){return set.call(this,key,key==='ai'?()=>forcedWeapon:value);};
            }
            return evt;
        };
    }
    return true;
})()`;
let code=fs.readFileSync(controller,'utf8');
code=code.replace('await cdp.evaluate(runtimeInstallSource(config, index)',
    'await cdp.evaluate('+JSON.stringify(injection)+',true,"注入轮回遗梦测试包");\n            await cdp.evaluate(runtimeInstallSource(config, index)');
code=code.replace('if (require.main === module)', 'if (true)');
code=code.replace('if(game.me&&game.phaseNumber>0&&!_status.auto', 'if(game.me&&!_status.auto');
const mod=new Module(controller,module);mod.filename=controller;mod.paths=Module._nodeModulePaths(path.dirname(controller));
mod._compile(code,controller);
