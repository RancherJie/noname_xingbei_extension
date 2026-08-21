game.import("extension", function(lib, game, ui, get, ai, _status) {
    return {
        "name": "宿命挽歌",
        "arenaReady": function(){

},
        "content": function(config,pack){

},
        "prepare": function(){

},
        "precontent": function(){

},
        "help": {},
        "config": {},
        "package": {
            "character": {
                "connect": true,
                "character": {
                    "zhaoLingEr": [
                        null,
                        "shengGroup",
                        4,
                        [
                            "wuLingXianShu",
                            "nvWaHouRen",
                            "tianSheZhang",
                            "wuQiChaoYuan",
                            "guanYinZhou",
                            "shengLingZhu",
                            "shengLingPiFeng",
                            "wuShen",
                            "zhaoLingErRouQingXiaGu",
                            "lingLi",
                        ],
                        [
                            "des:受天命眷顾，女娲族裔与人类共生之女。外柔内刚、聪慧有主见、胆识过人。",
                            "ext:宿命挽歌/zhaoLingEr.jpg",
                            "die:ext:宿命挽歌/audio/die/zhaoLingEr.mp3",
                        ],
                    ],
                    "liXiaoYao": [
                        null,
                        "jiGroup",
                        4.5,
                        [
                            "yuJianShu",
                            "qiXingJian",
                            "tianGangZhanQi",
                            "feiLongTanYunShou",
                            "tianShiFuFa",
                            "wanJianJue",
                            "xianFengYunTiShu",
                            "zuiXianWangYueBu",
                            "xiaoYaoShenJian",
                            "jiuShenZhou",
                            "liXiaoYaoRouQingXiaGu",
                            "jianY",
                        ],
                        [
                            "des:悟性极高，聪明绝顶，富有强烈的正义感。历经爱恨情仇与家国大义的淬炼，最终成长为心怀苍生、情义无双的蜀山仙剑派掌门。",
                            "ext:宿命挽歌/liXiaoYao.jpg",
                            "die:ext:宿命挽歌/audio/die/liXiaoYao.mp3",
                        ],
                    ],
                    "linYueRu": [
                        null,
                        "huanGroup",
                        4.5,
                        [
                            "linJiaQianJin",
                            "ningShenGuiYuan",
                            "qiJianZhi",
                            "yiYangZhi",
                            "qiJueJianQi",
                            "zhenYuanHuTi",
                            "zhanLongJue",
                            "tongQianBiao",
                            "qianKunYiZhi",
                            "linYueRuRouQingXiaGu",
                            "qiJing",
                        ],
                        [
                            "des:南武林盟主林天南独女，后为蜀山派掌门李逍遥的妻子。天资灵秀，聪敏慧黠，情深义重。",
                            "ext:宿命挽歌/linYueRu.jpg",
                            "die:ext:宿命挽歌/audio/die/linYueRu.mp3",
                        ],
                    ],
                    "aNu": [
                        null,
                        "yongGroup",
                        4.5,
                        [
                            "miaoJiangShengNv",
                            "yanShaZhou",
                            "tianLeiPo",
                            "yuFengShu",
                            "jinCanWang",
                            "baoZhaGu",
                            "sanShiGu",
                            "yinGu",
                            "wanGuShiTian",
                            "qianKunYiZhi",
                            "gu",
                            "wuDuZhu",
                        ],
                        [
                            "des:个性刁钻伶俐，活泼可爱，年纪小却很精明；口快心直，却不失俏皮；虽然外表天真烂漫，但巫术毒蛊却运用自如。",
                            "ext:宿命挽歌/aNu.jpg",
                            "die:ext:宿命挽歌/audio/die/aNu.mp3",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "宿命挽歌": "宿命挽歌",
                    "zhaoLingEr": "赵灵儿",
                    "liXiaoYao": "李逍遥",
                    "linYueRu": "林月如",
                    "aNu": "阿奴",
                },
            },
            "card": {
                "card": {},
                "translate": {},
                "list": [],
            },
            "skill": {
                "skill": {
                    "suMingWanGeLianDong": {
                        "isCharacter": function(current, characterId) {
                            if (!current) return false;
                            if (typeof current.isIn == "function" && !current.isIn()) return false;
                            return current.name == characterId ||
                                current.name1 == characterId ||
                                current.name2 == characterId;
                        },
                        "getCharacters": function(characterIds) {
                            return game.filterPlayer(function(current) {
                                return characterIds.some(function(characterId) {
                                    return lib.skill.suMingWanGeLianDong
                                        .isCharacter(current, characterId);
                                });
                            });
                        },
                        "hasCharacter": function(characterId) {
                            return game.hasPlayer(function(current) {
                                return lib.skill.suMingWanGeLianDong
                                    .isCharacter(current, characterId);
                            });
                        },
                    },
                    "zhaoLingErRouQingXiaGu": {},
                    "liXiaoYaoRouQingXiaGu": {},
                    "linYueRuRouQingXiaGu": {},
                    "wuLingXianShu": {
                        "getLegalTargets": function(player) {
                    return game.filterPlayer(function(target) {
                        return target.countCards('h') <
                            target.getHandcardLimit();
                    });
                },
                        "subSkill": {
                            "yunShi": {
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "duYou": "yunShi",
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('yunShi');
                            }else{
                                return get.xiBie(card)=='di'
                            }
                        },
                                "discard": false,
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('yunShi')
                        },
                                "complexCard": true,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.yunShi.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return target.countCards('h')<target.getHandcardLimit();
                            })
                            .set("ai", function (target) {
                            var player = _status.event.player;
                                return get.damageEffect2(target, player, event.num);
                            })
                            .forResultTargets();

                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                            await player.addFaShu();
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                            "bingDong": {
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "bingDong",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('bingDong');
                            }else{
                                return get.xiBie(card)=='shui'
                            }
                        },
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('bingDong');
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.bingDong.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            //'step 1'
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return target.countCards('h')<target.getHandcardLimit();
                            })
                            .set("ai", function (target) {
                            var player = _status.event.player;
                                return get.damageEffect2(target, player, event.num);
                            }).forResultTargets();
                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                            //'step 2'
                            var targets=await player.chooseTarget(1, `冰冻：选择1名角色+1点[治疗]`, true)
                            .set("ai", function (target) {
                            var player = _status.event.player;
                                return get.zhiLiaoEffect2(target, player, 1);
                            }).forResultTargets();
                            for(var target of targets.sortBySeat(player)){
                                await target.changeZhiLiao(1, player);
                            }
                            //'step 3'
                            //if(result.bool){
                            //    result.targets[0].changeZhiLiao(1,player);
                            //}
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                            "huoQou": {
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "huoQou",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('huoQou');
                            }else{
                                return get.xiBie(card)=='huo'
                            }
                        },
                                "filterOk": function(){
                            if(ui.selected.cards[0].hasDuYou('huoQou')){
                                return true;
                            }else{
                                return false;
                            }
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.huoQou.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            //'step 0'
                            event.num=2;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            //'step 1'
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return target.countCards('h')<target.getHandcardLimit();
                            })
                            .set("ai", function (target) {
                            var player = _status.event.player;
                                return get.damageEffect2(target, player, event.num);
                            }).forResultTargets();
                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target,2);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                            "fengRen": {
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "fengRen",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('fengRen');
                            }else{
                                return get.xiBie(card)=='feng'
                            }
                        },
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('fengRen')
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.fengRen.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            //'step 0'
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            //'step 1'
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return target.countCards('h')<target.getHandcardLimit();
                            })
                            .set("ai", function (target) {
                            var player = _status.event.player;
                                return get.damageEffect2(target, player, event.num);
                            }).forResultTargets();
                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                            //'step 2'
                            await player.addGongJi();
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                            "leiJi": {
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "leiJi",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('leiJi');
                            }else{
                                return get.xiBie(card)=='lei'
                            }
                        },
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('leiJi')
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);;
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.leiJi.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            //'step 0'
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            //'step 1'
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return target.countCards('h')<target.getHandcardLimit();
                            })
                            .set("ai", function (target) {
                            var player = _status.event.player;
                                return get.damageEffect2(target, player, event.num);
                            }).forResultTargets();
                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                            //'step 2'
                            await player.changeZhanJi('baoShi',1);
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                        },
                        "group": [
                            "wuLingXianShu_yunShi",
                            "wuLingXianShu_bingDong",
                            "wuLingXianShu_huoQou",
                            "wuLingXianShu_fengRen",
                            "wuLingXianShu_leiJi",
                        ],
                        "trigger": {
                            "player": [
                                "logSkillBegin",
                            ],
                        },
                        "forced": true,
                        "filter": function(event,player){
                    return event.skill&&event.skill.startsWith('wuLingXianShu_');
                },
                        "content": async function(event,trigger,player){
                },
                        "_priority": 0,
                    },
                    "nvWaHouRen": {
                        "trigger": {
                            "source": "zaoChengShangHai",
                        },
                        "forced": true,
                        "firstDo": true,
                        "filter": function(event,player){
                    return !event.faShu;
                },
                        "content": function(){
                    trigger.faShu = true;
                },
                        "_priority": 0,
                    },
                    "tianSheZhang": {
                        "trigger": {
                            "source": "zaoChengShangHai",
                        },
                        "filter": function(event,player){
                    //game.log(event.shengLingZhu);
                    if(event.faShu!=true) return false;
                    if(event.shengLingZhu==true) return false;
                    return true;
                },
                        "content": function(){
                    player.addZhiShiWu('lingLi');
                },
                        "_priority": 0,
                    },
                    "wuQiChaoYuan": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    return player.countMark('lingLi')>=5
                },
                        "selectTarget": -1,
                        "filterTarget": function(card,player,target){
                    return player.side==target.side; // 只能选择己方
                },
                        "contentBefore": function(){
                    player.removeZhiShiWu('lingLi',5);
                },
                        "content": function(){

                    target.changeZhiLiao(2,player).set('yuanSuDianRan',true);
                },
                        "ai": {
                            "order": 3.7,
                            "result": {
                                "target": function(player,target){
                            return get.zhiLiaoEffect(target,2);
                        },
                            },
                        },
                        "_priority": 0,
                    },
                    "guanYinZhou": {
                        "enable": "faShu",
                        "type": "faShu",
                        "filterTarget": true,
                        "prompt": "令目标角色+1[治疗]",
                        "filter": function(event,player){
                    return true;
                },
                        "content": async function(event,trigger,player){
                    var skillTarget=event.target;
                    var linkedMark;
                    if(lib.skill.suMingWanGeLianDong
                        .isCharacter(skillTarget,'liXiaoYao')){
                        linkedMark='jianY';
                    }
                    else if(lib.skill.suMingWanGeLianDong
                        .isCharacter(skillTarget,'linYueRu')){
                        linkedMark='qiJing';
                    }
                    if(linkedMark&&player.countZhiShiWu('lingLi')>0){
                        var linkedName=linkedMark=='jianY'?'【剑】':'【气劲】';
                        var control=await player.chooseControl(
                            ['+1【治疗】','移除1【灵力】，令目标+1'+linkedName]
                        ).set(
                            'prompt','【柔情侠骨】：选择【观音咒】的效果'
                        ).set('ai',function(){
                            var target=_status.event.target;
                            var mark=_status.event.mark;
                            if(target.countZhiShiWu(mark)<
                                lib.skill[mark].intro.max&&
                                target.zhiLiao>=
                                target.getZhiLiaoLimit()){
                                return 1;
                            }
                            return 0;
                        }).set('target',skillTarget)
                        .set('mark',linkedMark).forResultControl();
                        if(control!='+1【治疗】'){
                            player.logSkill(
                                'zhaoLingErRouQingXiaGu',skillTarget
                            );
                            await player.removeZhiShiWu('lingLi',1);
                            await skillTarget.addZhiShiWu(linkedMark,1);
                            return;
                        }
                    }
                    await skillTarget.changeZhiLiao(1,player);
                },
                        "ai": {
                            "result": {
                                "target": function(player,target){
                            return get.zhiLiaoEffect(target,2);
                        },
                            },
                            "order": 3,
                        },
                        "_priority": 0,
                    },
                    "shengLingZhu": {
                        "trigger": {
                            "player": "wuLingXianShuStart",
                        },
                        "filter": function(event,player){
                    return player.countMark('lingLi')>=2 &&
                        lib.skill.wuLingXianShu.getLegalTargets(player).length >= 2;

                },
                        "cost": async function cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('lingLi');
                    var targetCount =
                        lib.skill.wuLingXianShu.getLegalTargets(player).length;
                    if(num>=2 && targetCount>=2) {
                        list.push(2);
                    }
                    if(num>=4 && targetCount>=3) {
                        list.push(4);
                    }

                    list.push('cancel2');
                    var result=await player.chooseControl(list)
                    .set('prompt',get.prompt('shengLingZhu'))
                    .set('prompt2',lib.translate.shengLingZhu_info)
                    .set('ai',function(){
                        return _status.event.num;
                    })
                    .set('num',list.length-2)
                    .forResultControl();
                    event.result={
                        bool:result!='cancel2',
                        cost_data:result,
                    }
                },
                        "content": function(){
                    event.num=event.cost_data;
                    player.removeZhiShiWu('lingLi',event.num);
                    if(event.num==4)
                    trigger.getParent().charNum=3;
                    else
                    trigger.getParent().charNum=2;

                },
                        "_priority": 0,
                    },
                    "shengLingPiFeng": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event,player){
                    return player.canBiShaShuiJing();
                },
                        "content": async function(event, trigger, player){
                    player.removeBiShaShuiJing();
                    player.addZhiShiWu('lingLi',2);
                },
                        "check": function(event,player){
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return player.countZhiShiWu('lingLi') < 6;
                },
                        "ai": {
                            "baoShi": true,
                            "shuiJing": true,
                        },
                        "_priority": 0,
                    },
                    "wuShen": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    return player.canBiShaBaoShi();
                },
                        "filterTarget": function(card, player, target) {
                    return target.countCards('h') <
                        target.getHandcardLimit();
                },
                        "content": function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var linkedBonus=0;
                    if(lib.skill.suMingWanGeLianDong
                        .hasCharacter('liXiaoYao')) linkedBonus++;
                    if(lib.skill.suMingWanGeLianDong
                        .hasCharacter('linYueRu')) linkedBonus++;
                    var num=player.countNengLiangAll()+2+linkedBonus;
                    event.num=num;
                    'step 2'
                    target.faShuDamage(event.num,player);
                },
                        "ai": {
                            "baoShi": true,
                            "order": function(item,player){
                        return 3.4+(player.countNengLiangAll()-1)*0.1;
                    },
                            "result": {
                                "target": function(player,target){
                            return get.damageEffect(target,2);
                        },
                            },
                        },
                        "_priority": 0,
                    },
                    "lingLi": {
                        "intro": {
                            "name": "灵力",
                            "content": "mark",
                            "max": 6,
                        },
                        "onremove": "storage",
                        "markimage": "extension/宿命挽歌/mark_lingLi.png",
                        "_priority": 0,
                    },
                    "yuJianShu": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "forced": true,
                        "content": function(){
                    player.addZhiShiWu('jianY');
                },
                        "_priority": 0,
                    },
                    "qiXingJian": {
                        "mod": {
                            "maxNengLiang": function(player,num){
                        return num+4;
                    },
                        },
                        "forced": true,
                        "trigger": {
                            "source": "zaoChengShangHai",
                        },
                        "filter": function(event,player){
                    if(event.faShu!=true&&event.num>3)
                    return true;
               },
                        "content": function(){
                    player.addNengLiang('shuiJing',1);
               },
                    },
                    "tianGangZhanQi": {
                        "forced": true,
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "priority": 1,
                        "filter": function(event,player){
                    return event.yingZhan!=true&&player.getStat('gongJi').zhuDong.length==3;
                },
                        "content": function(){
                    var hasLinkedCharacter=
                        lib.skill.suMingWanGeLianDong
                            .hasCharacter('zhaoLingEr')||
                        lib.skill.suMingWanGeLianDong
                            .hasCharacter('linYueRu');
                    trigger.changeDamageNum(hasLinkedCharacter?1:2);
                },
                    },
                    "feiLongTanYunShou": {
                        "trigger": {
                            "global": "_tiLian_backupEnd",
                        },
                        "forced": true,
                        "filter": function(event,player){
                    return event.player!=player;
                },
                        "content": async function (event, trigger, player) {
                    var isLinkedRefiner=
                        lib.skill.suMingWanGeLianDong
                            .isCharacter(trigger.player,'zhaoLingEr')||
                        lib.skill.suMingWanGeLianDong
                            .isCharacter(trigger.player,'linYueRu');
                    var linkedStones=[];
                    if(isLinkedRefiner){
                        if(trigger.player.countNengLiang('shuiJing')>0){
                            linkedStones.push('shuiJing');
                        }
                        if(trigger.player.countNengLiang('baoShi')>0){
                            linkedStones.push('baoShi');
                        }
                    }
                    if(linkedStones.length){
                        var direct=await player.chooseBool(
                            '【柔情侠骨】：是否直接获得'+
                            get.translation(trigger.player)+'的1个星石？'
                        ).set('ai',function(){
                            var target=_status.event.target;
                            return get.attitude(_status.event.player,target)<=0||
                                _status.event.player.countNengLiangAll()==0;
                        }).set('target',trigger.player).forResultBool();
                        if(direct){
                            var directStone=linkedStones[0];
                            if(linkedStones.length>1){
                                directStone=await player
                                    .chooseControl(linkedStones)
                                    .set('prompt',
                                        '【柔情侠骨】：选择直接获得的星石')
                                    .set('ai',function(){
                                        return 'baoShi';
                                    }).forResultControl();
                            }
                            player.logSkill(
                                'liXiaoYaoRouQingXiaGu',trigger.player
                            );
                            await trigger.player
                                .removeNengLiang(directStone,1);
                            await player.addNengLiang(directStone,1);
                        }
                        return;
                    }
                    let cards = get.cards();
                    await player.showHiddenCards(cards);
                    if (get.type(cards[0]) == "faShu"){
                        var stones=[];
                        if(trigger.player.countNengLiang('shuiJing')>0) {
                            stones.push('shuiJing');
                        }
                        if(trigger.player.countNengLiang('baoShi')>0) {
                            stones.push('baoShi');
                        }
                        if(stones.length){
                            var stone=stones[0];
                            if(stones.length>1){
                                stone=await player.chooseControl(stones)
                                    .set('prompt','飞龙探云手：选择获得的星石')
                                    .set('ai',function(){
                                        return 'baoShi';
                                    }).forResultControl();
                            }
                            await trigger.player.removeNengLiang(stone,1);
                            await player.addNengLiang(stone,1);
                        }
                    }
                    await game.cardsDiscard(cards);
                },
                        "group": [
                            "feiLongTanYunShou_buNengTiLian",
                        ],
                        "subSkill": {
                            "buNengTiLian": {
                                "init": function(player){
                        player.tempBanSkill('_tiLian','forever');
                    },
                                "onremove": function(player){
                        delete player.storage.temp_ban__tiLian;
                    },
                                "content": async function(event, trigger, player) {
                },
                            },
                        },
                    },
                    "tianShiFuFa": {
                        "priority": 1,
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "filter": function(event,player){
                    return player.countCards('h',function(card){
                        return get.type(card)=='faShu';
                    }) >= 2;
                },
                        "cost": async function cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[2,3],function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('prompt',get.prompt(event.skill))
                    .set('prompt2',lib.translate[event.skill+'_info'])
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                        "content": function(){
					player.discard(event.cards).set('showCards',true);
					event.num=event.cards.length-1;
                    trigger.changeDamageNum(event.num);// 加一点伤害
                },
                        "check": function(card){
                    return 6-get.value(card);
                },
                    },
                    "wanJianJue": {
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "filter": function(event,player){
                    if(event.getParent('xingDong').wanJianJue==false) return false;// 不能与醉仙望月步在同一回合发动
                    if(player.countZhiShiWu('jianY')<5) return false;// 剑小于4不能发动
                    if(event.yingZhan==true) return false;
                    return game.countPlayer(function(current){
                        return player.canUse('anMie',current);
                    }) >= 2;
                },
                        "check": function(event, player) {
                    return game.countPlayer(function(target) {
                        return target.side != player.side &&
                            player.canUse('anMie', target);
                    }) >= 2;
                },
                        "_priority": 1,
                        "content": function(){
                    'step 0'
                    trigger.getParent('xingDong').zuiXianWangYueBu=false// 标记醉仙望月步不能发动
                    player.removeZhiShiWu('jianY',5);// 移除剑
                    player.chooseTarget(2,true, function(card, player, target){
                        return player.canUse('anMie', target); // 只能选择可使用暗灭的目标
                    }).set('ai', function(target) {
                        return get.damageEffect2(
                            target,
                            _status.event.player,
                            1
                        );
                    });
                'step 1'
                    for(var i=0;i<result.targets.length;i++){
                        player.useCard({name: 'anMie', xiBie: 'an'}, result.targets[i]).set('wanJianJue',true);// 向两个目标发射暗灭
                    }
                },
                        "group": [
                            "wanJianJue_1",
                        ],
                        "subSkill": {
                            "1": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "direct": true,
                                "filter": function(event,player){
                            return event.wanJianJue==true;
                        },
                                "content": function(){
                            trigger.changeDamageNum(-1);
                        },
                            },
                        },
                    },
                    "xianFengYunTiShu": {
                        "trigger": {
                            "global": "shouDaoGongJiBefore",
                        },
                        "filter": function(event,player){
                    if(event.target != player) return false; // 只能保护自己
                    if(event.canYingZhan == false) return false; // 必须能迎战
                    return true;
                },
                        "check": function(event, player) {
                    return player.countCards('h') < player.getHandcardLimit();
                },
                        "content": async function (event, trigger, player) {
                    let cards =  await get.cards();
                    player.showHiddenCards(cards);//牌库翻一张
                    player.gain(cards[0]);// 获得该牌
                },
                    },
                    "zuiXianWangYueBu": {
                        "trigger": {
                            "source": "gongJiAfter",
                        },
                        "usable": 3,
                        "filter": function(event,player){
                    if(event.getParent('xingDong').zuiXianWangYueBu==false) return false;// 不能与万剑诀在同一回合发动
                    if(!player.hasZhiShiWu('jianY')) return false;// 剑气小于1不能发动
                    if(event.yingZhan==true) return false;
					return true;
                },
                        "check": function(event, player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "content": async function (event, trigger, player) {
                    trigger.getParent('xingDong').wanJianJue=false;;// 标记醉仙望月步不能发动
                    await player.removeZhiShiWu('jianY');// 移除剑
                    var linkedPlayers=
                        lib.skill.suMingWanGeLianDong.getCharacters(
                            ['zhaoLingEr','linYueRu']
                        ).filter(function(current){
                            return current.countCards('h')>0;
                        }).sortBySeat(player);
                    for(var linkedPlayer of linkedPlayers){
                        var discarded=await linkedPlayer
                            .chooseToDiscard(
                                'h',
                                '【柔情侠骨】：是否弃置1张手牌，代替'+
                                get.translation(player)+'进行【醉仙望月步】判定？'
                            ).set('showCards',true)
                            .set('ai',function(card){
                                var owner=_status.event.player;
                                var beneficiary=_status.event.beneficiary;
                                if(get.attitude(owner,beneficiary)<=0) return 0;
                                if(beneficiary.countCards('h') + 1 >
                                    beneficiary.getHandcardLimit()) return 0;
                                if(get.type(card)=='gongJi'){
                                    return 8-get.value(card);
                                }
                                return 4-get.value(card);
                            }).set('beneficiary',player).forResultCards();
                        if(discarded&&discarded.length){
                            player.logSkill(
                                'liXiaoYaoRouQingXiaGu',linkedPlayer
                            );
                            await player.gain(discarded,'gain2');
                            if(get.type(discarded[0])=='gongJi'){
                                await player.addGongJi();
                            }
                            return;
                        }
                    }
					let cards =  await get.cards();
                    await player.showHiddenCards(cards);// 翻一张
                    var list=['是','否'];
                        var control =  await player.chooseControl(list).set('prompt','是否获得该牌')
                        .set('ai', function() {
                            var player = _status.event.player;
                            return player.countCards('h') + 1 <=
                                player.getHandcardLimit() ? '是' : '否';
                        }).forResultControl();
                    if (control =='是') {
                        await player.gain(cards);// 获得
                        if (get.type(cards[0]) == 'gongJi') {
                            await player.addGongJi();// 增加攻击行动
                        }
                    }else{
                        await game.cardsDiscard(cards);
                    }
                },
                    },
                    "xiaoYaoShenJian": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event,player){
                    return player.canBiShaShuiJing();
                },
                        "check": function(event, player) {
                    if(player.countCards('h') + 2 >
                        player.getHandcardLimit()) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return true;
                },
                        "content": function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('jianY',2);
                    'step 2'
                    player.draw(2);
                },
                    },
                    "jiuShenZhou": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    return player.canBiShaShuiJing();
                },
                        "filterTarget": function(card,player,target){
                    return target!=player;
                },
                        "content": async function(event,trigger,player){
                    var skillTarget=event.target;
                    if(!skillTarget || !skillTarget.isIn()) return;
                    var baoShi=player.countNengLiang('baoShi');
                    var shuiJing=player.countNengLiang('shuiJing');
                    var num=baoShi+shuiJing;
                    if(baoShi>0) await player.removeNengLiang('baoShi',baoShi);
                    if(shuiJing>0) await player.removeNengLiang('shuiJing',shuiJing);
                    await skillTarget.faShuDamage(num,player)
                        .set('jiuShenZhou',true);
                    await player.faShuDamage(num,player)
                        .set('jiuShenZhou',true);
                    player.storage.jiuShenZhou_active=true;
                    player.syncStorage('jiuShenZhou_active');
                    await player.hengZhi();
                },
                        "ai": {
                            "shuiJing": true,
                            "order": function(item, player) {
                    var num = player.countNengLiangAll();
                    if(num <= 0) return 0;
                    var best = 0;
                    game.countPlayer(function(target) {
                        if(target != player && target.side != player.side) {
                            best = Math.max(best, get.damageEffect2(
                                target, player, num
                            ));
                        }
                    });
                    return best + get.damageEffect2(player, player, num) > 0 ?
                        4.2 : 0;
                },
                            "result": {
                                "player": function(player) {
                    var num = player.countNengLiangAll();
                    return get.damageEffect2(player, player, num) - 1;
                },
                                "target": function(player, target) {
                    return get.damageEffect(
                        target, player.countNengLiangAll()
                    );
                },
                            },
                        },
                        "group": [
                            "jiuShenZhou_chongZhi",
                        ],
                        "subSkill": {
                            "chongZhi": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "direct": true,
                                "firstDo": true,
                                "filter": function(event,player){
                            return player.storage.jiuShenZhou_active==true;
                        },
                                "content": async function(event,trigger,player){
                            player.storage.jiuShenZhou_active=false;
                            player.syncStorage('jiuShenZhou_active');
                            await player.chongZhi();
                        },
                            },
                        },
                        "mod": {
                            "maxHandcardFinal": function(player,num){
                        if(player.storage.jiuShenZhou_active) return 4;
                    },
                        },
                    },
                    "jianY": {
                        "intro": {
                            "name": "剑",
                            "content": "mark",
                            "max": 5,
                        },
                        "onremove": "storage",
                        "markimage": "extension/宿命挽歌/mark_jianY.png",
                        "_priority": 0,
                    },
                    "linJiaQianJin": {
                        "mod": {
                            "maxNengLiang": function(player, num) {
                        return num + 2;
                    },
                        },
                        "init": function(player) {
                    player.addNengLiang('shuiJing', 2);
                },
                        "trigger": {
                            "player": "teShuEnd",
                        },
                        "forced": true,
                        "content": async function(event,trigger,player) {
                    var zhaoLingEr=
                        lib.skill.suMingWanGeLianDong
                            .getCharacters(['zhaoLingEr'])
                            .filter(function(current){
                                return current.countNengLiangAll()<2;
                            }).sortBySeat(player)[0];
                    if(zhaoLingEr){
                        player.logSkill(
                            'linYueRuRouQingXiaGu',zhaoLingEr
                        );
                        await zhaoLingEr.addNengLiang('shuiJing',1);
                    }
                    else{
                        await player.addNengLiang('shuiJing',1);
                    }
                },
                    },
                    "ningShenGuiYuan": {
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return event.player.side === player.side && event.player !== player && event.yingZhan!=true;
                },
                        "content": async function(event,trigger,player){
                    var oldQiJing = player.countZhiShiWu('qiJing');
                    await player.addZhiShiWu('qiJing');
                    if (player.countZhiShiWu('qiJing') === oldQiJing) {
                        player.changeZhiLiao(1);
                    }
                },
                    },
                    "qiJianZhi": {
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "filter": function(event, player) {
                    return !event.yingZhan && player.countZhiShiWu('qiJing') >= 1;
                },
                        "check": function(event,player){
                    return player.canFaShu();
                },
                        "content": function() {
                    player.removeZhiShiWu('qiJing', 1);
                    player.addFaShu();
                },
                    },
                    "yiYangZhi": {
                        "getGaiPaiTag": function(card) {
                    var tags = Array.from(card.gaintag || []);
                    for (var tag of tags) {
                        var info = get.info(tag);
                        if (info && info.intro && info.intro.markcount == 'gaiPai') {
                            return tag;
                        }
                    }
                    return null;
                },
                        "getGaiPaiEntries": function(target) {
                    var entries = [];
                    var cards = target.getCards('x');
                    for (var card of cards) {
                        var tag = lib.skill.yiYangZhi.getGaiPaiTag(card);
                        if (tag) entries.push({
                            card: card,
                            tag: tag
                        });
                    }
                    return entries;
                },
                        "removeOneGaiPai": async function(target) {
                    var entries = lib.skill.yiYangZhi.getGaiPaiEntries(target);
                    if (!entries.length) return false;
                    var cards = entries.map(function(entry) {
                        return entry.card;
                    });
                    var selected = await target.chooseCardButton(
                        cards,
                        true,
                        "移除一个盖牌"
                    ).forResultLinks();
                    var card = selected[0] || cards[0];
                    var entry = entries.find(function(current) {
                        return current.card == card;
                    });
                    if (!entry) return false;
                    await target.discard(entry.card, entry.tag);
                    return true;
                },
                        "trigger": {
                            "player": "gongJiBefore",
                        },
                        "filter": function(event, player) {
                    if(player.countZhiShiWu('qiJing') < 1) return false;
                    if(player.countNengLiang('shuiJing') < 1) return false;
                    return event.yingZhan!=true;
                },
                        "check": function(event, player) {
                    var target = event.target;
                    if(!target || target.side == player.side) return false;
                    return lib.skill.yiYangZhi.getGaiPaiEntries(target).length > 0 ||
                        player.countNengLiang('shuiJing') >= 2;
                },
                        "content": async function(event,trigger,player) {
					await player.removeZhiShiWu('qiJing',1);
					trigger.customArgs.yiYangZhi=true;
                    await player.removeNengLiang('shuiJing');
                    await player.addNengLiang('baoShi',1);
                },
                        "group": [
                            "yiYangZhi_MingZhong",
                            "yiYangZhi_weiMingZhong",
                        ],
                        "subSkill": {
                            "MingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event,player){
                            return event.customArgs.yiYangZhi;
                        },
                                "content": async function(event,trigger,player){
                            var removed = await lib.skill.yiYangZhi.removeOneGaiPai(trigger.target);
                            if (!removed) {
                                trigger.changeDamageNum(1);
                            }
                        },
                            },
                            "weiMingZhong": {
                                "trigger": {
                                    "source": "gongJiWeiMingZhong",
                                },
                                "filter": function(event,player){
                            return event.customArgs.yiYangZhi;
                        },
                                "forced": true,
                                "content": async function(event,trigger,player) {
                            if(player.countNengLiang('shuiJing')>0){
                                await player.removeNengLiang('shuiJing');
                                await player.addNengLiang('baoShi',1);
                            }
                        },
                            },
                        },
                    },
                    "qiJueJianQi": {
                        "group": [
                            "qiJueJianQi_mingZhong",
                            "qiJueJianQi_weiMingZhong",
                        ],
                        "subSkill": {
                            "mingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "filter": function(event,player){
                            if(player.countZhiShiWu('qiJing') < 2) return false;
                            return event.customArgs.yiYangZhi;
                        },
                                "content": async function(event,trigger,player) {
                            player.removeZhiShiWu('qiJing',2);
                            var removed = await lib.skill.yiYangZhi.removeOneGaiPai(trigger.target);
                            if (!removed) {
                                trigger.changeDamageNum(1);
                            }
                        },
                            },
                            "weiMingZhong": {
                                "trigger": {
                                    "source": "gongJiWeiMingZhong",
                                },
                                "filter": function(event,player){
                            if(player.countZhiShiWu('qiJing') < 2) return false;
                            return event.customArgs.yiYangZhi;
                        },
                                "content": async function(event,trigger,player) {
                            await player.removeZhiShiWu('qiJing',2);
                            var num=player.countNengLiang('shuiJing');
                            if(num>0){
                                await player.removeNengLiang('shuiJing',num);
                                await player.addNengLiang('baoShi',num);
                            }
                        },
                            },
                        },
                    },
                    "zhenYuanHuTi": {
                        "trigger": {
                            "global": "zaoChengShangHai",
                        },
                        "filter": function(event, player) {
                    if(!event.faShu||event.num<=0||
                        player.countZhiShiWu('qiJing')<1||
                        !event.player) return false;
                    if(event.player==player) return true;
                    return lib.skill.suMingWanGeLianDong
                        .isCharacter(event.player,'liXiaoYao')||
                        lib.skill.suMingWanGeLianDong
                        .isCharacter(event.player,'zhaoLingEr');
                },
                        "check": function(event,player){
                    return event.player==player||
                        get.attitude(player,event.player)>0;
                },
                        "logTarget": "player",
                        "content": async function(event,trigger,player) {
                    if(trigger.player!=player){
                        player.logSkill(
                            'linYueRuRouQingXiaGu',trigger.player
                        );
                    }
                    await player.removeZhiShiWu('qiJing',1);
                    if(typeof trigger.changeDamageNum=='function'){
                        trigger.changeDamageNum(-1);
                    }
                    else{
                        trigger.num--;
                    }
                },
                    },
                    "zhanLongJue": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.countZhiShiWu('qiJing') >= 2;
                },
                        "selectTarget": -1,
                        "filterTarget": function(card,player,target){
                    return target!=player;
                },
                        "content": function() {
                    var damage = Math.ceil(player.countZhiShiWu('qiJing') / 3);
                    target.faShuDamage(damage,player);
                },
                        "contentAfter": function(){
                    player.removeZhiShiWu('qiJing', player.countZhiShiWu('qiJing'));
                },
                        "ai": {
                            "order": function(item, player) {
                    var damage = Math.ceil(
                        player.countZhiShiWu('qiJing') / 3
                    );
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target != player) {
                            score += get.damageEffect2(target, player, damage);
                        }
                    });
                    return score > 0 ? 4 : 0;
                },
                            "result": {
                                "player": function(player) {
                    var damage = Math.ceil(
                        player.countZhiShiWu('qiJing') / 3
                    );
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target != player) {
                            score += get.damageEffect2(target, player, damage);
                        }
                    });
                    return score;
                },
                            },
                        },
                    },
                    "tongQianBiao": {
                        "trigger": {
                            "player": "gongJiShi",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi();
                },
                        "content": function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    player.storage.tongQianBiao=false;
                    'step 1'
                    player.chooseTarget('对目标造成1点法术伤害③',true,function(card,player,target){
                        return true
                    }).set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    });
                    'step 2'
                    result.targets[0].faShuDamage(1,player).set('tongQianBiao',true);
                    'step 3'
                    player.addZhiShiWu('qiJing');
                    'step 4'
                    if(player.storage.tongQianBiao){
                        player.addZhiShiWu('qiJing');
                    }
                },
                        "group": "tongQianBiao_shiQiXiaJiang",
                        "subSkill": {
                            "shiQiXiaJiang": {
                                "trigger": {
                                    "global": "changeShiQiAfter",
                                },
                                "lastDo": true,
                                "direct": true,
                                "filter": function(event,player){
                            return event.getParent('damage').tongQianBiao==true&&event.num<0;
                        },
                                "content": function(){
                            player.storage.tongQianBiao=true;
                        },
                            },
                        },
                    },
                    "qianKunYiZhi": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi();
                },
                        "filterTarget": function(card, player, target) {
                    var manual = player.isOnline() ||
                        (player.isUnderControl(true) && !_status.auto);
                    return manual || target.side != player.side;
                },
                        "contentBefore": async function(event, trigger, player){
                    await player.removeBiShaBaoShi();
                    player.storage.qianKunYiZhi_num = 0;
                    player.storage.qianKunYiZhi_num_1 = 0;
                    var numXingBei = 0;
                    var zhanJi=get.zhanJi(player.side);
                    var side=player.side;
                        if(side==true){
                            numXingBei = game.hongXingBei;
                        }else if(side==false){
                            numXingBei = game.lanXingBei;
                        }
                    if(zhanJi.length>0){
                        var list=['是','否'];
                        var control=await player.chooseControl(list).set('prompt','是否额外移除【战绩区】所有星石')
                        .set('ai', function(){
                            var player= _status.event.player;
                            var zhanJi=get.zhanJi(player.side);
                            var shiQi=get.shiQi(!player.side);
                            if(shiQi>1 && zhanJi.includes('baoShi')) return '是';
                            if(zhanJi.length>3) return '是';
                            return '否';
                        }).forResult('control');
                        if (control =='是') {
                            var xlist = get.zhanJi(player.side).slice();
                            for (var i of xlist){
                                await player.removeZhanJi(i,1);
                            }
                            var num=xlist.length;
                            player.storage.qianKunYiZhi_num = Math.floor(num/2);
                        }
                    }
                    if(numXingBei>0){
                        var list=['是','否'];
                        var control=await player.chooseControl(list).set('prompt','是否额外移除【战绩区】所有星杯')
                        .set('ai', function(){
                            return '是';
                        }).forResult('control');
                        if (control =='是') {
                             player.storage.qianKunYiZhi_num_1 = numXingBei;
                        }
                    }
                },
                        "content": function() {
                    var baoShi = player.countNengLiang('baoShi');
                    var shuiJing = player.countNengLiang('shuiJing');
                    var damage = Math.ceil(baoShi / 2) + Math.ceil(shuiJing / 4) + 1 + player.storage.qianKunYiZhi_num + player.storage.qianKunYiZhi_num_1;
                    target.faShuDamage(damage, player);
                    if(player.countNengLiang('baoShi')>0) player.removeNengLiang('baoShi',player.countNengLiang('baoShi'));
                    if(player.countNengLiang('shuiJing')>0) player.removeNengLiang('shuiJing',player.countNengLiang('shuiJing'));
                    player.changeXingBei(-player.storage.qianKunYiZhi_num_1);
                },
                        "ai": {
                            "baoShi": true,
                            "order": function(item, player) {
                    var damage = Math.ceil(
                        player.countNengLiang('baoShi') / 2
                    ) + Math.ceil(
                        player.countNengLiang('shuiJing') / 4
                    ) + 1;
                    var best = 0;
                    game.countPlayer(function(target) {
                        if(target.side != player.side) {
                            best = Math.max(
                                best,
                                get.damageEffect2(target, player, damage)
                            );
                        }
                    });
                    return best > 0 ? 5 : 0;
                },
                            "result": {
                                "target": function(player, target) {
                    var damage = Math.ceil(
                        player.countNengLiang('baoShi') / 2
                    ) + Math.ceil(
                        player.countNengLiang('shuiJing') / 4
                    ) + 1;
                    return get.damageEffect(target, damage);
                },
                            },
                        },
                    },
                    "qiJing": {
                        "intro": {
                            "name": "气劲",
                            "content": "mark",
                            "max": 7,
                        },
                        "onremove": "storage",
                        "markimage": "extension/宿命挽歌/mark_qiJing.png",
                    },
                    "miaoJiangShengNv": {
                        "subSkill": {
                            "huoQou": {
                                "sub": true,
                                "sourceSkill": "miaoJiangShengNv",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "huoQou",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('huoQou');
                    }else{
                        return get.xiBie(card)=='huo'
                    }
                },
                                "filterOk": function(){
                    if(ui.selected.cards[0].hasDuYou('huoQou')){
                        return true;
                    }else{
                        return false;
                    }
                },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filterTarget": true,
                                "filter": function(event,player){
                        return player.hasCard(function(card){
                            return lib.skill.huoQou.filterCard(card);
                            });
		        		},
                                "content": async function (event, trigger, player) {
                            player.storage.huoQou_num = 2
                            await event.trigger("miaoJiangShengNv_huoQouStart");
                            event.num = player.storage.huoQou_num;
                            if(event.cards.length==2){
                            event.num++;
                            }
                            await event.target.faShuDamage(event.num,player,event.cards[0]);
                            if(event.yanShaZhou){
                                event.target.storage.baoZhaGu_source=player;
                                event.target.addSkill("baoZhaGu_xiaoGuo");
                                event.target.markSkill("baoZhaGu_xiaoGuo");
                                game.log(event.target,'获得了【爆炸蛊】状态');
                            }
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target,2);
                                },
                                    },
                                },
                            },
                            "leiJi": {
                                "sub": true,
                                "sourceSkill": "miaoJiangShengNv",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "leiJi",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('leiJi');
                            }else{
                                return get.xiBie(card)=='lei'
                            }
                        },
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('leiJi')
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);;
                            }
                        },
                                "position": "h",
                                "filterTarget": true,
                                "filter": function(event,player){
                            return player.hasCard(function(card){
                                return lib.skill.leiJi.filterCard(card);
                            });
			        	},
                                "content": async function (event, trigger, player) {
                            await event.trigger("miaoJiangShengNv_leiJiStart");
                            'step 0'
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            'step 1'
                            event.target.faShuDamage(event.num,player);
                            'step 2'
                            if(player.storage.leiJi_num!=1){
                                player.changeZhanJi('baoShi',1);
                            }
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target);
                                },
                                    },
                                },
                            },
                            "lianGuShu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "content": function(){
                        var cards=get.cards(1);
                        player.addGaiPai(cards,'gu');
                        },
                            },
                        },
                        "group": [
                            "miaoJiangShengNv_huoQou",
                            "miaoJiangShengNv_leiJi",
                            "miaoJiangShengNv_lianGuShu",
                        ],
                        "trigger": {
                            "player": [
                                "logSkillBegin",
                            ],
                        },
                        "forced": true,
                        "filter": function(event,player){
                    return event.skill&&event.skill.startsWith('miaoJiangShengNv_');
                },
                        "content": async function(event,trigger,player){
                },
                        "_priority": 0,
                    },
                    "yanShaZhou": {
                        "trigger": {
                            "player": "miaoJiangShengNv_huoQouStart",
                        },
                        "content": function() {
                    player.storage.huoQou_num--;
                    trigger.yanShaZhou=true;
                },
                        "check": function(event, player) {
                    var target = event.target;
                    return !!target && target.side != player.side &&
                        !target.hasSkill('baoZhaGu_xiaoGuo');
                },
                    },
                    "tianLeiPo": {
                        "trigger": {
                            "player": "miaoJiangShengNv_leiJiStart",
                        },
                        "content": function() {
                    player.storage.leiJi_num = 1;
                    var cards=get.cards(2);
                    player.addGaiPai(cards,'gu');
                },
                        "check": function(event, player) {
                    return player.countGaiPai('gu') <= 3;
                },
                    },
                    "yuFengShu": {
                        "subSkill": {
                            "du": {
                                "trigger": {
                                    "player": "daChuPai",
                                },
                                "filter": function(event,player){
                            if (event.card.name != 'zhongDu') return false;
                            if (!event.target) return false;
                            return event.target.hasJiChuXiaoGuo('_zhongDu');
                        },
                                "content": function(){
                            trigger.target.faShuDamage(1,player);
                        },
                            },
                        },
                        "group": [
                            "yuFengShu_du",
                        ],
                        "trigger": {
                            "player": "gongJiShi",
                        },
                        "filter": function(event,player){
                    return event.target.hasJiChuXiaoGuo('_zhongDu');
                },
                        "content": function(){
					'step 0'
                    trigger.changeDamageNum(1);
                    if(player.countCards('h')>0){
                        player.chooseCard('h',1,true).set('prompt','将自己1张手牌作为蛊').set('ai',function(card){
                            var xiBie=get.xiBie(card);
                            var type=get.type(card);
                            if(xiBie=='guang'||xiBie=='huo'||type=='faShu') return 1;
                            return 0;
                        })
                    };
					'step 1'
                    player.addGaiPai('gu',result.cards);
                },
                    },
                    "jinCanWang": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    var cards=player.getGaiPai('gu');
                    var xiBieSet = new Set();
                    var result = [];
                    for(var i=0;i<cards.length;i++)
                    {
                        var currentXiBie = get.xiBie(cards[i]);
                        if (!xiBieSet.has(currentXiBie)) {
                            xiBieSet.add(currentXiBie);
                            result.push(cards[i]);
                            // 如果已经找到5个不同系别，就提前结束
                            if (result.length >= 5) {
                                return true;
                            }
                        }
                    }
                },
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                    var manual = player.isOnline() ||
                        (player.isUnderControl(true) && !_status.auto);
                    return manual || target.side == player.side;
                },
                        "contentBefore": async function(event,trigger,player){
                    var cards=player.getGaiPai('gu');
                    game.log(cards);
                    var result = await player.chooseCardButton(cards,5,'是否发动【金蟾王】')
                        .set('filterButton',function(button){
                        if(ui.selected.buttons.length==0) return true;
                        var xiBie1=get.xiBie(button.link);
                        for(var i=0;i<ui.selected.buttons.length;i++){
                             var xiBie2=get.xiBie(ui.selected.buttons[i].link);
                             if(xiBie1==xiBie2) return false;
                        }
                        return true;
                        }).forResult();
                    game.log(result.links);
                    player.discard(result.links,'gu').set('showHiddenCards',true);//}
                },
                        "content": function(){
                    'step 0'
                    //player.discard(event.cost_data,'gu').set('showHiddenCards',true);
                    'step 1'
                    target.addNengLiang('baoShi',2);
                    'step 2'
                    player.addNengLiang('baoShi',1)
                },
                        "ai": {
                            "order": 5,
                            "result": {
                                "player": 1,
                                "target": function(player, target) {
                    if(target.side != player.side) return 100;
                    return 2;
                },
                            },
                        },
                    },
                    "baoZhaGu": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    var cards=player.getGaiPai('gu');
                    if(cards.length==0) return false;
                    for(var i=0;i<cards.length;i++){
                        if(get.xiBie(cards[i])=='huo') return true;
                    }
                    return false;
                },
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                    var manual = player.isOnline() ||
                        (player.isUnderControl(true) && !_status.auto);
                    return manual || target.side != player.side;
                },
                        "contentBefore": async function(event,trigger,player){
                    var cards=player.getGaiPai('gu');
                    var selectedCards = await player.chooseCardButton(cards,true,1,'爆炸蛊：选择1张火系【蛊】弃置')
                        .set('filterButton',function(button){
                        if(get.xiBie(button.link)!='huo') return false;
                        return true;
                        }).forResultLinks();
                    await player.discard(selectedCards,'gu').set('showHiddenCards',true);
                },
                        "content": function(event,trigger,player){
                    event.target.storage.baoZhaGu_source=player;
                    event.target.addSkill("baoZhaGu_xiaoGuo");
                    event.target.markSkill("baoZhaGu_xiaoGuo");
                    game.log(event.target,'获得了【爆炸蛊】状态');
                },
                        "ai": {
                            "order": 3.8,
                            "result": {
                                "target": function(player, target) {
                    if(target.side == player.side) return 100;
                    return -2;
                },
                            },
                        },
                        "subSkill": {
                            "xiaoGuo": {
                                "mark": true,
                                "marktext": "爆",
                                "intro": {
                                    "content": "受到火系攻击或火系法术伤害后，受到2点法术伤害",
                                },
                                "onremove": function(player){
                            delete player.storage.baoZhaGu_source;
                        },
                                "trigger": {
                                    "player": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event,player){
                            return event.num>0&&event.card&&get.xiBie(event.card)=='huo'&&!event.baoZhaGu;
                        },
                                "content": async function(event,trigger,player){
                            var source=player.storage.baoZhaGu_source;
                            var damageEvent;
                            if(source&&!source.isDead()){
                                damageEvent=player.faShuDamage(2,source,'nocard');
                            }else{
                                damageEvent=player.faShuDamage(2,'nosource','nocard');
                            }
                            await damageEvent.set('baoZhaGu',true);
                            game.log(player,'因【爆炸蛊】受到2点法术伤害');
                        },
                            },
                        },
                    },
                    "sanShiGu": {
                        "type": "faShu",
                        "enable": "faShu",
                        "usable": 1,
                        "filter": function(event,player){
                    var cards=player.getGaiPai('gu');
                    if(cards.length==0) return false;
                    for(var i=0;i<cards.length;i++){
                        if(get.type(cards[i])=='faShu') return true;
                    }
                    return false;
                },
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                    var manual = player.isOnline() ||
                        (player.isUnderControl(true) && !_status.auto);
                    return manual || target.side != player.side;
                },
                        "contentBefore": async function(event,trigger,player){
                    var cards=player.getGaiPai('gu');
                    var selectedCards = await player.chooseCardButton(cards,true,1,'三尸蛊：选择1张法术【蛊】弃置')
                        .set('filterButton',function(button){
                        if(get.type(button.link)!='faShu') return false;
                        return true;
                        }).forResultLinks();
                    await player.discard(selectedCards,'gu').set('showHiddenCards',true);
                },
                        "content": async function(event,trigger,player){
                    var poisonCard=game.createCard2('zhongDu');
                    await player.useCard(poisonCard,event.target);
                    player.addGongJiOrFaShu();
                },
                        "ai": {
                            "order": 4.5,
                            "result": {
                                "player": 1,
                                "target": function(player, target) {
                    if(target.side == player.side) return 100;
                    return -1.5;
                },
                            },
                        },
                    },
                    "yinGu": {
                        "trigger": {
                            "global": "changeShiQiBefore",
                        },
                        "filter": function(event,player){
                    if(event.side!=player.side) return false;
                    if(event.num>=0) return false;
                    return player.getGaiPai('gu').some(function(card) {
                        return get.xiBie(card) == 'guang';
                    });
                },
                        "cost": async function cost(event, trigger, player) {
                    var guangGuCards = player.getGaiPai('gu').filter(card => get.xiBie(card) == 'guang');
                    var result = await player.chooseCardButton(
                        guangGuCards,
                        1,
                        "是否发动【隐蛊】，弃置1张光系【蛊】，免疫本次士气下降？"
                    )
                    .set('ai', function(button) {
                        return 1;
                        }).forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    };
                },
                        "logTarget": "player",
                        "content": async function(event,trigger,player) {
                    await player.discard(event.cost_data, 'gu').set('showHiddenCards', true);
                    trigger.cancel();
                    game.log(player, '发动【隐蛊】，免疫了本次士气下降');
                },
                    },
                    "wanGuShiTian": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() && player.getGaiPai('gu').length > 0;
                },
                        "content": async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    var guCards=player.getGaiPai('gu').slice();
                    await player.discard(guCards,'gu').set('showHiddenCards',true);
                    var playerCount=game.filterPlayer().length;
                    var extraCount=Math.floor(playerCount/2);
                    var releaseCount=guCards.length+extraCount;
                    game.log(
                        player,
                        '本次【万蛊蚀天】共释放',
                        releaseCount,
                        '次【中毒】（X=' + guCards.length +
                            '，Y=' + extraCount + '）'
                    );
                    for(var i=0;i<releaseCount;i++){
                        var targets=game.filterPlayer();
                        if(!targets.length) break;
                        var target=targets[Math.floor(Math.random()*targets.length)];
                        var poisonCard=game.createCard2('zhongDu');
                        await player.useCard(poisonCard,target);
                        game.log(target,'被【万蛊蚀天】施加了【中毒】');
                    }
                },
                        "ai": {
                            "order": function(item, player) {
                    var score = lib.skill.wanGuShiTian.getAiScore(player);
                    var releases = player.getGaiPai('gu').length +
                        Math.floor(game.filterPlayer().length / 2);
                    return score > 0 && releases >= 3 ? 4.8 : 0;
                },
                            "result": {
                                "player": function(player) {
                    return lib.skill.wanGuShiTian.getAiScore(player);
                },
                            },
                        },
                        "getAiScore": function(player) {
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target.hasZhiShiWu('wuDuZhu')) return;
                        score += target.side == player.side ? -1 : 1;
                    });
                    if(get.shiQi(!player.side) <= 2) score += 0.75;
                    return score;
                },
                    },
                    "gu": {
                        "intro": {
                            "name": "蛊",
                            "content": "gaiPai",
                            "markcount": "gaiPai",
                        },
                        "onremove": function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                        "trigger": {
                            "player": "addGaiPaiAfter",
                        },
                        "filter": function(event,player){
                    return event.gaiPai=='gu'&&player.getGaiPai('gu').length>9;
                },
                        "direct": true,
                        "content": function(){
                    'step 0'
                    var cards=player.getGaiPai('gu');
                    player.chooseCardButton(cards,'舍弃'+(cards.length-9)+'张【蛊】',true,cards.length-9);
                    'step 1'
                    if(result.links){
                        player.discard(result.links,'gu').set('sheQi',true);
                    }
                },
                    },
                    "wuDuZhu": {
                        "intro": {
                            "name": "(专)[五毒珠]",
                            "content": "免疫来自中毒的伤害<br>（回合结束时）从以下两项选择一个发动：<br>①将五毒珠传递给左手边的玩家<br>②（移除战绩区1星石）将五毒珠传给目标玩家",
                            "nocount": true,
                        },
                        "markimage": "extension/宿命挽歌/mark_wuDuZhu.png",
                        "global": [
                            "wuDuZhu_mianYi",
                            "wuDuZhu_chuanDi",
                        ],
                        "group": [
                            "wuDuZhu_kaiShi",
                        ],
                        "subSkill": {
                            "mianYi": {
                                "trigger": {
                                    "player": "shouDaoShangHai",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            if(!player.hasZhiShiWu('wuDuZhu')) return false;
                            if(event.card && event.card.name == 'zhongDu') return true;
                            var poisonEvent=event.getParent('_zhongDu',true);
                            return poisonEvent && poisonEvent.name=='_zhongDu';
                        },
                                "content": function() {
                            trigger.num=0;
                            game.log(player, '因持有【五毒珠】，免疫了【中毒】伤害');
                        },
                            },
                            "kaiShi": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "content": async function(event,trigger,player) {
                            if(!player.hasZhiShiWu('wuDuZhu')){
                                await player.addZhiShiWu('wuDuZhu');
                            }
                        },
                            },
                            "chuanDi": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return player.hasZhiShiWu('wuDuZhu');
                        },
                                "content": async function (event,trigger,player){
                            var leftTarget=player.getPrevious();
                            if(!leftTarget) return;

                            var zhanJi=get.zhanJi(player.side);
                            var target=leftTarget;
                            if(zhanJi.length>0){
                                var control=await player.chooseControl(
                                    '传给左手边角色',
                                    '移除战绩区1星石并指定目标'
                                ).set('prompt','五毒珠：选择传递方式')
                                .set('ai',function(){
                                    return '传给左手边角色';
                                }).forResultControl();

                                if(control=='移除战绩区1星石并指定目标'){
                                    var targets=await player.chooseTarget(
                                        true,
                                        '五毒珠：选择一名其他角色获得【五毒珠】',
                                        function(card,player,target){
                                            return target!=player;
                                        }
                                    ).set('ai',function(target){
                                        return get.attitude(_status.event.player,target);
                                    }).forResultTargets();
                                    if(!targets.length) return;
                                    target=targets[0];

                                    zhanJi=get.zhanJi(player.side);
                                    var list=[];
                                    for(var i=0;i<zhanJi.length;i++){
                                        list.push([zhanJi[i],get.translation(zhanJi[i])]);
                                    }
                                    var links=await player.chooseButton([
                                        '五毒珠：移除我方【战绩区】1星石',
                                        [list,'tdnodes'],
                                    ],true).forResultLinks();
                                    if(!links.length) return;
                                    await player.removeZhanJi(links[0],1);
                                }
                            }

                            await target.addZhiShiWu('wuDuZhu',1,true);
                            if(!target.hasZhiShiWu('wuDuZhu')){
                                game.log('【五毒珠】传递失败，仍由',player,'持有');
                                return;
                            }
                            await player.removeZhiShiWu('wuDuZhu');
                            game.log(player,'将【五毒珠】传递给了',target);
                        },
                            },
                        },
                    },
                },
                "translate": {
                    "wuLingXianShu": "被动【五灵仙术】",
                    "wuLingXianShu_bingDong": "[法术]冰咒",
                    "wuLingXianShu_yunShi": "[法术]土咒",
                    "wuLingXianShu_huoQou": "[法术]火咒",
                    "wuLingXianShu_fengRen": "[法术]风咒",
                    "wuLingXianShu_leiJi": "[法术]雷咒",
                    "wuLingXianShu_info": "你可以使用元素师的独有技.",
                    "nvWaHouRen": "被动【女娲后人】",
                    "nvWaHouRen_info": "你造成的伤害都视为法术伤害<br>你的【五灵仙术】与【武神】不能以满手牌的角色为目标。",
                    "tianSheZhang": "响应【天蛇杖】",
                    "tianSheZhang_info": "<span class='tiaoJian'>（造成法术伤害时发动）</span>+1<span class='hong'>【灵力】</span>，不能与【圣灵珠】同时发动",
                    "wuQiChaoYuan": "法术【五气朝元】",
                    "wuQiChaoYuan_info": "<span class='tiaoJian'>（消耗5点<span class='hong'>【灵力】</span>）</span>我方所有角色+2治疗",
                    "guanYinZhou": "法术【观音咒】",
                    "guanYinZhou_info": "目标角色+1治疗。<br><span class='tiaoJian'>（李逍遥或林月如为目标时）</span>你可以改为移除1<span class='hong'>【灵力】</span>，令目标+1<span class='hong'>【剑】</span>或<span class='hong'>【气劲】</span>。",
                    "shengLingZhu": "响应【圣灵珠】",
                    "shengLingZhu_info": "<span class='tiaoJian'>（【五灵仙术】触发时发动，消耗2点<span class='hong'>【灵力】</span>）</span>【火球】【陨石】【雷击】【风刃】【冰冻】的目标变为两个；<span class='tiaoJian'>（消耗4点<span class='hong'>【灵力】</span>）</span>目标变为三个",
                    "shengLingPiFeng": "启动【圣灵披风】",
                    "shengLingPiFeng_info": "【水晶】*1，+2<span class='hong'>【灵力】</span>",
                    "wuShen": "法术【武神】",
                    "wuShen_info": "【宝石】*1，对目标角色造成剩余能量+2的伤害。李逍遥、林月如每有一人在场，此伤害额外+1。",
                    "zhaoLingErRouQingXiaGu": "被动【柔情侠骨】",
                    "zhaoLingErRouQingXiaGu_info": "李逍遥或林月如在场时，【观音咒】可以改为移除1<span class='hong'>【灵力】</span>，令对应目标+1<span class='hong'>【剑】</span>或<span class='hong'>【气劲】</span>；李逍遥、林月如每有一人在场，【武神】伤害额外+1。",
                    "lingLi": "灵力",
                    "lingLi_info": "<span class='hong'>【灵力】</span>为赵灵儿专有指示物，上限为6。",
                    "yuJianShu": "被动【御剑术】",
                    "yuJianShu_info": "<span class='tiaoJian'>（攻击命中时发动）</span>你+1<span class='hong'>【剑】</span>。",
                    "qiXingJian": "被动【七星剑】",
                    "qiXingJian_info": "你的能量上限+4，你造成攻击伤害时，若此次伤害＞3，你+1【水晶】",
                    "tianGangZhanQi": "被动【天罡战气】",
                    "tianGangZhanQi_info": "若你的主动攻击为本次行动阶段的第3次【攻击行动】，则此攻击伤害+2；赵灵儿或林月如在场时，改为伤害+1。",
                    "feiLongTanYunShou": "被动【飞龙探云手】",
                    "feiLongTanYunShou_info": "你无法执行【提炼】。<br><span class='tiaoJian'>（当其他玩家提炼后）</span>翻开牌库顶1张牌【展示】；若为法术牌，你获得该玩家的1个星石。<br><span class='tiaoJian'>（赵灵儿或林月如提炼后）</span>若其拥有星石，你改为选择是否直接获得其1个星石。",
                    "tianShiFuFa": "响应【天师符法】",
                    "tianShiFuFa_info": "<span class='tiaoJian'>（攻击命中时发动，弃两张法术牌）</span>此次攻击伤害+1<span class='tiaoJian'><br>（额外弃一张法术牌）</span>此次攻击伤害额外+1",
                    "wanJianJue": "响应【万剑诀】",
                    "wanJianJue_info": "（<span class='tiaoJian'>攻击行动结束后发动，移除5<span class='hong'>【剑】</span>）</span>视为对两个目标先后发动一次暗属性的攻击，攻击伤害-1，本回合你不能再发动【醉仙望月步】",
                    "xianFengYunTiShu": "响应【仙风云体术】",
                    "xianFengYunTiShu_info": "<span class='tiaoJian'>（受到可应战的攻击时发动）</span>摸一张牌（展示）",
                    "zuiXianWangYueBu": "响应【醉仙望月步】",
                    "zuiXianWangYueBu_info": "【回合限定：3】<span class='tiaoJian'>（攻击行动结束后发动，移除1<span class='hong'>【剑】</span>）</span>赵灵儿、林月如依次可以弃置1张手牌【展示】进行判定，你获得该判定牌；若均未弃牌，翻开牌库顶1张牌【展示】，你可以获得该牌。以此法获得的牌为攻击牌时，+1【攻击行动】。本回合你不能再发动【万剑诀】。",
                    "xiaoYaoShenJian": "启动【逍遥神剑】",
                    "xiaoYaoShenJian_info": "【水晶】*1，+2<span class='hong'>【剑】</span>，摸两张牌。",
                    "jiuShenZhou": "法术【酒神咒】",
                    "jiuShenZhou_info": "【水晶】*x，移除所有能量，对目标角色与自己造成能量数量的伤害。（横置）持续到下个回合开始（重置），你的手牌上限恒定为4。",
                    "liXiaoYaoRouQingXiaGu": "被动【柔情侠骨】",
                    "liXiaoYaoRouQingXiaGu_info": "赵灵儿或林月如在场时，【天罡战气】的伤害加成改为+1；她们提炼后，你可以直接获得其1个星石；【醉仙望月步】优先由她们依次选择是否弃置1张手牌【展示】进行判定，你获得该判定牌。",
                    "jianY": "剑",
                    "jianY_info": "<span class='hong'>【剑】</span>为李逍遥专属指示物，上限为5。",
                    "linJiaQianJin": "被动【林家千金】",
                    "linJiaQianJin_info": "你的能量上限+2，你初始获得2【水晶】。<br><span class='tiaoJian'>（你执行【特殊行动】时）</span>+1【水晶】；若赵灵儿在场且其能量少于2，改为令赵灵儿获得此【水晶】。",
                    "ningShenGuiYuan": "被动【凝神归元】",
                    "ningShenGuiYuan_info": "<span class='tiaoJian'>（队友的主动攻击命中后发动）</span>你+1<span class='hong'>【气劲】</span><br><span class='tiaoJian'>（若<span class='hong'>【气劲】</span>因此溢出）</span>你+1【治疗】。",
                    "qiJianZhi": "响应【气剑指】",
                    "qiJianZhi_info": "<span class='tiaoJian'>（攻击行动结束后发动，移除1<span class='hong'>【气劲】</span>）</span>+1【法术行动】。",
                    "yiYangZhi": "响应【一阳指】",
                    "yiYangZhi_info": "<span class='tiaoJian'>（主动攻击前，移除1【气劲】发动）</span>将自身战绩区的一颗【水晶】翻面为【宝石】<br><span class='tiaoJian'>（若攻击命中）</span>移除对方一张盖牌，<span class='tiaoJian'>（若对方不存在盖牌）</span>此次攻击伤害+1；<span class='tiaoJian'><br>（若攻击未命中）</span>额外将自身战绩区的一颗【水晶】翻面为【宝石】",
                    "qiJueJianQi": "响应【七诀剑气】",
                    "qiJueJianQi_info": "<span class='tiaoJian'>（一阳指结算前发动，移除2<span class='hong'>【气劲】</span>）<br>（若一阳指命中）</span>使一阳指的效果再触发一次。<br><span class='tiaoJian'>（若一阳指未命中）</span>将自身战绩区的全部【水晶】翻面为【宝石】",
                    "qiJueJianQi_mingZhong": "响应【七诀剑气】命中",
                    "qiJueJianQi_weiMingZhong": "响应【七诀剑气】未命中",
                    "zhenYuanHuTi": "响应【真元护体】",
                    "zhenYuanHuTi_info": "<span class='tiaoJian'>（你受到法术伤害时发动，移除1<span class='hong'>【气劲】</span>）</span>本次受到的伤害-1。李逍遥或赵灵儿在场时，你也可以在其受到法术伤害时发动。",
                    "zhanLongJue": "法术【斩龙诀】",
                    "zhanLongJue_info": "<span class='tiaoJian'>（移除所有<span class='hong'>【气劲】</span>，至少为2）</span>对其它所有角色造成<span class='hong'>【气劲】</span>/3（向上取整）的法术伤害",
                    "tongQianBiao": "响应【铜钱镖】",
                    "tongQianBiao_info": "<span class='tiaoJian'>（自身攻击时）</span>【宝石】*1，对目标角色造成1法术伤害，你+1<span class='hong'>【气劲】</span>（若因此导致士气下降）你额外+1<span class='hong'>【气劲】</span>",
                    "qianKunYiZhi": "法术【乾坤一掷】",
                    "qianKunYiZhi_info": "【宝石】*1，移除所有能量，对目标角色造成宝石数量/2（向上取整）+ 水晶数量/4（向上取整） + 1 的伤害，<span class='tiaoJian'><br>（若你移除我方战绩区所有能量）</span>每移除2星石，伤害+1，<span class='tiaoJian'><br>（若你移除我方战绩区所有星杯）</span>每移除1星杯，伤害+1。",
                    "linYueRuRouQingXiaGu": "被动【柔情侠骨】",
                    "linYueRuRouQingXiaGu_info": "李逍遥或赵灵儿在场时，【真元护体】可以对其发动；你执行【特殊行动】时，若赵灵儿的能量少于2，令其获得【林家千金】产生的【水晶】。",
                    "qiJing": "气劲",
                    "qiJing_info": "<span class='hong'>【气劲】</span>为林月如专属指示物，上限为7。",
                    "miaoJiangShengNv": "被动【苗疆圣女】",
                    "miaoJiangShengNv_info": "你可以使用独有技【雷击】、【火球】<br><span class='tiaoJian'>（你的回合结束时）</span>从牌堆抽一张牌作为你的<span class='lan'>【蛊】</span>",
                    "miaoJiangShengNv_huoQou": "[法术]火球",
                    "miaoJiangShengNv_leiJi": "[法术]雷击",
                    "miaoJiangShengNv_lianGuShu": "【炼蛊术】",
                    "yanShaZhou": "响应【炎杀咒】",
                    "yanShaZhou_info": "<span class='tiaoJian'>（使用【火球】时发动）</span>伤害-1，而为对方赋予爆炸蛊状态",
                    "tianLeiPo": "响应【天雷破】",
                    "tianLeiPo_info": "<span class='tiaoJian'>（使用【雷击】发动）</span>不获得宝石，而选择从牌堆抽两张牌作为<span class='lan'>【蛊】</span>",
                    "yuFengShu": "响应【御蜂术】",
                    "yuFengShu_info": "<span class='tiaoJian'>（攻击带有【中毒】的目标时）</span>本次伤害+1，将自己一张手牌作为<span class='lan'>【蛊】</span><br><span class='tiaoJian'>（对已经拥有中毒的目标使用中毒时）</span>该目标受到1点法术伤害",
                    "jinCanWang": "法术【金蚕王】",
                    "jinCanWang_info": "<span class='tiaoJian'>（弃置五张异系<span class='lan'>【蛊】</span>）</span>目标+2【宝石】，你+1【宝石】",
                    "baoZhaGu": "法术【爆炸蛊】",
                    "baoZhaGu_info": "<span class='tiaoJian'>（弃置一张火系<span class='lan'>【蛊】</span>）</span>赋予目标【爆炸蛊】状态<br><span class='tiaoJian'>（拥有【爆炸蛊】的目标受到火系攻击或火系法术伤害后）</span>该目标受到2点法术伤害",
                    "sanShiGu": "法术【三尸蛊】",
                    "sanShiGu_info": "（回合限定）<span class='tiaoJian'>（弃置一张法术<span class='lan'>【蛊】</span>）</span>视为对目标使用一次中毒，你+1【攻击行动】或【法术行动】",
                    "yinGu": "响应【隐蛊】",
                    "yinGu_info": "<span class='tiaoJian'>（士气即将下降时，弃置1张光系<span class='lan'>【蛊】</span>）</span>免疫这一次士气下降",
                    "wanGuShiTian": "法术【万蛊蚀天】",
                    "wanGuShiTian_info": "【宝石】×1，移除所有<span class='lan'>【蛊】</span>；对全场随机角色总共使用X+Y次【中毒】，X为本次实际移除的<span class='lan'>【蛊】</span>数量，Y为全场总人数/2（向下取整）。同一角色可以被随机选中多次。",
                    "gu": "蛊",
                    "gu_info": "<span class='lan'>【蛊】</span>为阿奴专有盖牌，上限为9，超出上限可选择弃置",
                    "wuDuZhu": "专属【五毒珠】",
                    "wuDuZhu_info": "开场自身带有五毒珠<br><span class='tiaoJian'>（持有五毒珠时）</span>不会受到来自中毒的伤害,<br><span class='tiaoJian'>（回合结束时）</span>从以下两项选择一个发动：<br>①将五毒珠传递给左手边的玩家<br>②<span class='tiaoJian'>（移除战绩区1星石）</span>将五毒珠传给目标玩家",
                },
            },
            "intro": "添加角色赵灵儿、李逍遥、林月如、阿奴。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "1.1",
        },
        "files": {
            "character": [
                "zhaoLingEr.jpg",
                "liXiaoYao.jpg",
                "linYueRu.jpg",
                "aNu.jpg",
            ],
            "card": [],
            "skill": [
                "wuDuZhu.jpg",
                "mark_lingLi.png",
                "mark_jianY.png",
                "mark_qiJing.png",
                "mark_wuDuZhu.png",
            ],
            "audio": [],
        },
        "connect": true,
    };
});
