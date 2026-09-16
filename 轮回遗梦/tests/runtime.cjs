const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const configPath=path.resolve(process.argv.slice(2).find(x=>x!=='--check')||path.join(__dirname,'smoke.json'));
const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
const required=['创世纪','电啸龙吟','宿命挽歌','轮回遗梦','峡谷幻音','永夜残响','bigcowcow'];
if(config.mode!=='3v3'||!config.randomCharacters)throw Error('需要3v3、随机选角');
if(config.allowedPacks?.length!==7||required.some(x=>!config.allowedPacks.includes(x)))throw Error('需要完整七包牛牛合集');
const sources=required.map(name=>({name,source:fs.readFileSync(path.resolve(__dirname,'../..',name,'extension.js'),'utf8')}));
if(config.testWeapon){
    if(!['魔剑','镇妖剑'].includes(config.testWeapon))throw Error('测试武器无效');
    const item=sources.find(x=>x.name==='轮回遗梦');
    item.source=item.source.replace("player.countCards('h',c=>get.xiBie(c)==='lei')>=2?'镇妖剑':'魔剑'",JSON.stringify(config.testWeapon));
}
const controller=path.resolve(__dirname,'../../无名杯自动模拟器/controller.js');
let code=fs.readFileSync(controller,'utf8');
function replace(from,to){if(!code.includes(from))throw Error('模拟器接口已变化：'+from);code=code.replace(from,to);}
function selectPool(allowed,players,characters,replacements){
    const family=id=>{
        const result=new Set([id]);let changed=true;
        while(changed){changed=false;for(const [key,values] of Object.entries(replacements||{})){
            const group=[key,...values];if(group.some(x=>result.has(x)))for(const x of group)if(!result.has(x)){result.add(x);changed=true;}
        }}return result;
    };
    const used=new Set();
    for(const p of players)for(const id of [p.name,p.name1,p.name2].filter(Boolean))for(const x of family(id))used.add(x);
    const pool=[];
    for(const id of allowed){
        if(!characters[id])throw Error('角色未注册：'+id);
        if(used.has(id))continue;
        pool.push(id);for(const x of family(id))used.add(x);
    }
    return pool;
}
const inject=`
    const captured=[], importedCharacters=[];
    for(const item of ${JSON.stringify(sources)}){
        let pack;
        new Function('game',item.source)({import(kind,factory){if(kind==='extension')pack=factory(lib,game,ui,get,{},_status);}});
        if(!pack?.package?.character?.character)throw Error('扩展格式异常：'+item.name);
        captured.push({name:item.name,pack});
        const data=pack.package;
        Object.assign(lib.character,data.character.character);
        lib.characterPack[item.name]=data.character.character;
        Object.assign(lib.characterIntro,data.character.characterIntro||{});
        Object.assign(lib.skill,data.skill?.skill||{});
        Object.assign(lib.card,data.card?.card||{});
        Object.assign(lib.translate,data.character.translate||{},data.skill?.translate||{},data.card?.translate||{});
    }
    // 包初始化的配置变化仅在测试进程生效，不保存用户音乐、扩展开关。
    const saveConfig=game.saveConfig,previousExtension=_status.extension,originalImport=game.import;
    try{
        // 当前游戏已完成启动，动态 character import 不会重新执行启动阶段的注册流程。
        game.import=function(kind,factory){
            if(kind!=='character')return originalImport.apply(this,arguments);
            const data=factory(lib,game,ui,get,{},_status);
            importedCharacters.push(data);
            lib.characterPack[data.name]=data.character||{};
            Object.assign(lib.character,data.character||{});
            Object.assign(lib.characterIntro,data.characterIntro||{});
            Object.assign(lib.characterTitle,data.characterTitle||{});
            Object.assign(lib.skill,data.skill||{});
            Object.assign(lib.translate,data.translate||{});
        };
        game.saveConfig=function(key,value,mode){if(mode){lib.config.mode_config[mode]??={};lib.config.mode_config[mode][key]=value;}else lib.config[key]=value;};
        for(const {name,pack} of captured){
            _status.extension=name;
            if(pack.precontent)await pack.precontent();
            const settings=Object.fromEntries(Object.keys(pack.config||{}).map(key=>[key,lib.config['extension_'+name+'_'+key]??pack.config[key].init]));
            if(pack.content)await pack.content(settings,pack.package);
        }
    }finally{game.saveConfig=saveConfig;game.import=originalImport;_status.extension=previousExtension;}
    for(const {pack} of captured)for(const id of Object.keys(pack.package.skill?.skill||{}))game.finishSkill(id);
    for(const pack of importedCharacters)for(const id of Object.keys(pack.skill||{}))game.finishSkill(id);
    for(const {pack} of captured)if(pack.arenaReady)await pack.arenaReady();
    lib.config.characters=[...${JSON.stringify(required)},...importedCharacters.map(pack=>pack.name)];
    const allowed=new Set();
    const characterTables=[...captured.map(({pack})=>pack.package.character.character),...importedCharacters.map(pack=>pack.character||{})];
    for(const table of characterTables)for(const [id,data] of Object.entries(table)){
        const flags=data[4]||[];
        if(flags.some(x=>['unseen','hiddenboss','forbidai','boss'].includes(x)))continue;
        const current=lib.character[id];
        if(current.isUnseen||current.isHiddenBoss||current.isAiForbidden||lib.filter.characterDisabled(id))continue;
        allowed.add(id);
    }
    if(${JSON.stringify(config.fixedCharacter||null)} && !allowed.has(${JSON.stringify(config.fixedCharacter||null)}))throw Error('固定角色未加载或已禁用');
    window.__lhymAllowed=allowed;window.__lhymSelectPool=${selectPool.toString()};
    ${config.fixture?fs.readFileSync(path.resolve(path.dirname(configPath),config.fixture),'utf8'):''}
`;
replace('        const cfg=${payload};','        const cfg=${payload};\n${'+JSON.stringify(inject)+'}');
replace('if(cfg.randomCharacters) return list;',`if(cfg.randomCharacters){
    let pool=window.__lhymSelectPool(window.__lhymAllowed,game.players||[],lib.character,lib.characterReplace);
    const allies=${JSON.stringify(config.testAllies||null)},opponents=${JSON.stringify(config.testOpponents||null)};
    const team=(player.side?${JSON.stringify(config.testRed||null)}:${JSON.stringify(config.testBlue||null)})||(player.side===game.me.side?allies:opponents);
    if(team)pool=pool.filter(id=>team.includes(id));
    if(!pool.length)throw Error('牛牛合集候选不足');return pool;
}`);
replace('const desired=cfg.randomCharacters?null:(game.me.side?cfg.red:cfg.blue)[0];',`
            let allowedPool=window.__lhymSelectPool(window.__lhymAllowed,(game.players||[]).filter(p=>p!==game.me),lib.character,lib.characterReplace);
            const ownTeam=game.me.side?${JSON.stringify(config.testRed||null)}:${JSON.stringify(config.testBlue||null)};
            if(ownTeam)allowedPool=allowedPool.filter(id=>ownTeam.includes(id));
            if(!allowedPool.length)throw Error('牛牛合集玩家选角候选不足');
            const desired=${JSON.stringify(config.fixedCharacter||null)}||allowedPool[Math.floor(Math.random()*allowedPool.length)];
`);
replace('const button=cfg.randomCharacters?buttons[Math.floor(Math.random()*buttons.length)]:buttons.find(b=>b.link===desired);','const button=buttons.find(b=>b.link===desired);');
replace("if(!cfg.randomCharacters&&lib.character[desired]&&ev.name==='chooseButton')","if(lib.character[desired]&&ev.name==='chooseButton')");
replace('if(game.me&&game.phaseNumber>0&&!_status.auto','if(game.me&&!_status.auto');
replace('window.__xingbeiSimulator.ensureAuto=function(){',`window.__xingbeiSimulator.ensureAuto=function(){
    if(game.phaseNumber>0&&!simulator.lhymVerified){
        const players=game.players||[],ids=players.map(p=>p.name1||p.name);
        if(ids.length!==6||ids.some(id=>!window.__lhymAllowed.has(id)))throw Error('阵容不符合牛牛合集六人：'+JSON.stringify(ids));
        for(const p of players){
            const team=p.side?${JSON.stringify(config.testRed||null)}:${JSON.stringify(config.testBlue||null)};
            if(team&&!team.includes(p.name1||p.name))throw Error('角色红蓝队分配不符合配置');
        }
        if(${JSON.stringify(config.fixedCharacter||null)} && ids.filter(id=>id===${JSON.stringify(config.fixedCharacter||null)}).length!==1)throw Error('固定角色缺失或重复');
        for(let i=0;i<players.length;i++){
            const pool=window.__lhymSelectPool(window.__lhymAllowed,players.filter((p,j)=>i!==j),lib.character,lib.characterReplace);
            if(!pool.some(id=>id===ids[i]||(lib.characterReplace[id]||[]).includes(ids[i])))throw Error('重复角色/形态名额');
        }
        simulator.lhymVerified=true;record('system','阵容验证通过：牛牛合集六名角色：'+ids.join('、'));
    }
`);
// 重载时禁止扩展自动加载，再显式初始化七包，避免受安装开关影响或重复加载。
const preload=`(()=>{let value=[];Object.defineProperty(window,'bannedExtensions',{configurable:true,get(){const blocked=value.slice();blocked.includes=()=>true;return blocked;},set(next){value=Array.isArray(next)?next:[];}});})()`;
replace('            await waitEngineReady(cdp);','            await cdp.send("Page.enable", {});\n'+
    '            await cdp.send("Page.addScriptToEvaluateOnNewDocument", {source:'+JSON.stringify(preload)+'});\n            await waitEngineReady(cdp);');
if(process.argv.includes('--check')){
    new Function(code);new Function('lib','game','ui','get','_status',`return (async()=>{${inject}})()`);
    for(const {source} of sources)new Function('game',source);
    const assert=require('node:assert/strict');
    // 执行真实景天扩展及注入流程，覆盖外层角色表为空、precontent 独立注册的情况。
    const jingSource=sources.filter(item=>item.name==='轮回遗梦');
    const probeLib={character:{},characterPack:{},characterIntro:{},characterTitle:{},skill:{},card:{},translate:{},config:{},filter:{characterDisabled:()=>false}};
    const probeGame={saveConfig(){},import(){throw Error('独立角色包不应留给启动后 import');},finishSkill(){},addGlobalSkill(){}};
    const probeWindow={};
    const probeInject=inject.replace(JSON.stringify(sources),JSON.stringify(jingSource));
    const probe=new Function('lib','game','ui','get','_status','window',`return (async()=>{${probeInject}})()`);
    probe(probeLib,probeGame,{}, {},{},probeWindow).then(()=>{
        assert(probeLib.character.jingTian);
        assert(probeWindow.__lhymAllowed.has('jingTian'));
        assert(probeLib.config.characters.includes('lunHuiYiMeng'));
        console.log('PASS: 真实景天 precontent 独立角色包注册及候选池回归检查');
    }).catch(error=>{console.error(error);process.exitCode=1;});
    const ids=['jingTian','sheYaoNan','huYaoNv',...required.map((_,i)=>'role'+i)];
    const chars=Object.fromEntries(ids.map(x=>[x,{}]));
    const family={sheYaoNan:['sheYaoNan','huYaoNv'],huYaoNv:['huYaoNv','sheYaoNan']};
    for(let n=0;n<1000;n++){
        const players=[];
        assert(selectPool(ids,players,chars,family).includes('jingTian'));
        for(let i=0;i<6;i++){const pool=selectPool(ids,players,chars,family);players.push({name:pool[Math.floor(Math.random()*pool.length)]});}
        assert.equal(new Set(players.map(p=>p.name)).size,6);
        assert(players.filter(p=>['sheYaoNan','huYaoNv'].includes(p.name)).length<=1);
    }
    console.log('PASS: 七包源码/控制器接口检查，1000次选将规则测试；未启动游戏');
}else{
    process.argv[2]=configPath;
    const mod=new Module(controller,module);mod.filename=controller;mod.paths=Module._nodeModulePaths(path.dirname(controller));
    mod._compile(code+'\nmain().catch(e=>{console.error(e);process.exitCode=1;});',controller);
}
