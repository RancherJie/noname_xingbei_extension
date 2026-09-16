// 注入到独立后台测试进程；人为提供材料，验证完整技能结算，不作为胜率样本。
lib.skill.lhym_fixture={
    trigger:{player:'xingDongBegin'},forced:true,popup:false,priority:1000,
    filter:(e,p)=>p.name==='jingTian'&&!p.storage.lhym_testDone,
    content:async function(event,trigger,player){
        player.storage.lhym_testDone=true;
        const H=lib.lunHuiYiMeng, S=lib.skill;
        const checks=[];
        function check(ok,text){if(!ok)throw new Error('JingTian fixture: '+text);checks.push(text);}
        function make(x,type){return game.createCard2(type==='faShu'?'xuRuo':({shui:'shuiLianZhan',huo:'huoYanZhan',lei:'leiGuangZhan',feng:'fengShenZhan',di:'diLieZhan'}[x]),x);}
        const originalChoice=player.chooseControl;
        player.chooseControl=function(){
            const e=originalChoice.apply(this,arguments),set=e.set;
            e.set=function(k,v){return set.call(this,k,k==='ai'&&window.__lhymChoice?()=>window.__lhymChoice:v);};
            return e;
        };
        const foes=H.enemies(player);
        // 避免密集伤害测试提前结束对局。此处仅改测试进程状态。
        game.hongShiQi=1000;game.lanShiQi=1000;
        try{
            check(player.countNengLiang('shuiJing')===2,'start grants exactly two crystals');
            check(player.getNengLiangLimit()===5,'energy cap five');
            check(!!player.storage.temp_ban__tiLian,'refine prohibited');
            // 独立资源结算：先禁用可选兑换，验证特殊行动的原始宝石收益。
            player.removeSkill('lhym_dianDang');
            if(player.countCards('h'))await player.discard(player.getCards('h'));
            await player.useSkill('_gouMai');
            check(player.countNengLiang('baoShi')===1,'special action grants one personal gem');
            const refiner=foes[0];
            for(const x of ['baoShi','shuiJing'])if(refiner.countNengLiang(x))await refiner.removeNengLiang(x,refiner.countNengLiang(x));
            await refiner.addNengLiang('baoShi',1);
            await refiner.addZhanJi('shuiJing',2);
            const top=game.createCard2('xuRuo','shui');ui.cardPile.insertBefore(top,ui.cardPile.firstChild);
            const oldBackup=lib.skill._tiLian_backup;
            lib.skill._tiLian_backup=lib.skill._tiLian.chooseButton.backup(['shuiJing','shuiJing'],refiner);
            await refiner.useSkill('_tiLian_backup');
            check(refiner.countNengLiang('baoShi')===1,'steal leaves old gem inventory untouched');
            check(refiner.countNengLiang('shuiJing')===1&&player.countNengLiang('shuiJing')===3,'steal transfers exactly one newly refined crystal');
            lib.skill._tiLian_backup=oldBackup;
            player.addSkill('lhym_dianDang');
            if(H.state(player).weapon==='魔剑'){
                // 分批提供材料：真实核心获得牌后会立即检查手牌上限，不能一次塞入十张。
                if(player.countCards('h')) await player.discard(player.getCards('h'));
                const initial=H.souls(player);if(initial.length)await player.discard(initial,'lhym_soul');
                for(let i=0;i<5;i++){
                    await player.gain([make(H.elements[i],'gongJi'),make(H.elements[i],'faShu')],'gain2');
                    await player.addZhiShiWu('lhym_longJing',4);
                    await S.lhym_jingHua.content({},trigger,player);
                }
                check(H.state(player).faces.length===10,'all ten faces purified through real costs');
                check(H.souls(player).length===10,'purification hand costs enter souls, capped at ten');
                for(const r of H.recipes){
                    const old=H.souls(player);if(old.length)await player.discard(old,'lhym_soul');
                    check(H.souls(player).length===0,'consumed souls do not recapture: '+r[0]);
                    await player.addGaiPai(r[1].map(x=>make(x,'gongJi')),'lhym_soul');
                    if(r[1].length>1)await player.gain(make('huo','gongJi'),'gain2');
                    window.__lhymChoice=r[0];
                    await S.lhym_moJianJi.content({},trigger,player);
                    window.__lhymChoice=null;
                    check(H.souls(player).length===(r[1].length>1?1:0),'exact soul cost and multi hand refill: '+r[0]);
                }
                const pile=H.souls(player);if(pile.length)await player.discard(pile,'lhym_soul');
                const attack=make('huo','gongJi');await player.gain(attack,'gain2');
                await player.useCard(attack,foes[0]).set('canYingZhan',false).set('canShengGuang',false).set('canShengDun',false);
                check(H.souls(player).includes(attack),'used physical attack enters soul after resolving');
            }else{
                for(let stage=0;stage<3;stage++){
                    if(player.countCards('h'))await player.discard(player.getCards('h'));
                    await player.addZhiShiWu('lhym_longJing',4);
                    await player.gain(Array.from({length:stage+1},()=>make('lei','gongJi')),'gain2');
                    const branch=H.branches[stage][Number(window.__lhymBranch)||0];
                    window.__lhymChoice=get.translation(branch);
                    await S.lhym_chongZhu.content({},trigger,player);
                    window.__lhymChoice=null;
                    check(H.state(player).stage===stage+1&&player.hasSkill(branch),'repair stage '+(stage+1));
                    check(player.countZhiShiWu('lhym_longJing')===4-[1,1,2][stage],'exact dragon cost stage '+(stage+1));
                }
                const attack=make('huo','gongJi');await player.gain(attack,'gain2');
                const before=attack.xiBie;
                const action=player.useCard(attack,foes[0]).set('canYingZhan',false).set('canShengGuang',false).set('canShengDun',false);
                await action;
                check(attack.xiBie===before,'thunder conversion preserves physical suit');
                check(get.xiBie(action.card)==='lei','virtual active attack becomes thunder');
                check(action.damageNum===(Number(window.__lhymBranch)?2:4),'active attack exact branch damage');
                const counter=make('lei','gongJi');await player.gain(counter,'gain2');
                const response=player.useCard(counter,foes[0]).set('yingZhan',true).set('canYingZhan',false).set('canShengGuang',false).set('canShengDun',false);
                await response;
                check(response.damageNum===(Number(window.__lhymBranch)?4:3),'counter attack exact branch damage');
            }
            window.__lhymFixtureResult={checks,sword:JSON.parse(JSON.stringify(H.state(player)))};
            window.__xingbeiSimulator.timeline.push({phase:game.phaseNumber,type:'fixture',text:'景天定向测试通过',checks,sword:JSON.parse(JSON.stringify(H.state(player)))});
        }catch(error){
            window.__lhymFixtureResult={checks,error:String(error.stack||error)};
            window.__xingbeiSimulator.errors.push(String(error.stack||error));
            window.__xingbeiSimulator.timeline.push({phase:game.phaseNumber,type:'fixture',text:'景天定向测试失败',checks,error:String(error)});
        }finally{
            window.__lhymChoice=null;player.chooseControl=originalChoice;
            game.hongShiQi=15;game.lanShiQi=15;
        }
        game.over(true);
    },
};
game.addGlobalSkill('lhym_fixture');
