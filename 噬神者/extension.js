game.import("extension",function(lib,game,ui,get,ai,_status){ return {name:"噬神者",arenaReady:function(){
    
},content:function(config,pack){
    
},prepare:function(){
    
},precontent:function(){
    
},help:{},config:{},package:{
    character: {
        connect: true,
        character: {
            shiShenZhe: ["shiShenZhe_name","xueGroup",5,["yuRen","qingKe","shiMie","shangMie","tongDiao","ren","gongZhen","zhuShenZhongYan"],["des:耶梦加得与教廷的爱恨情仇，从她的招式上就可看得出来。她喜欢用手上双刃玩弄对手，将刀刃扎上身躯，然后享受拔出时鲜血狂喷的快感。战斗已经不是战斗，而是一场噬神者的个人表演","ext:噬神者/shiShenZhe.jpg","die:ext:噬神者/audio/die/shiShenZhe.mp3"]],
        },
        translate: {
            shiShenZhe: "噬神者",
            "shiShenZhe_name": "耶梦加得",
            "噬神者": "噬神者",
        },
    },
    card: {
        card: {
            moRenCard: {
                type: "gongJi",
                enable: true,
                selectTarget: 1,
                filterTarget: function(card,player,target){
                    return target.side!=player.side;
                },
                image: "ext:噬神者/moRenCard.jpg",
                fullimage: true,
                content: function(){
                    "step 0"
                    target.damage(event.damageNum);
                },
                ai: {
                    basic: {
                        useful: 4,
                        value: [4,2,0],
                    },
                },
            },
            yiRenCard: {
                type: "gongJi",
                enable: true,
                selectTarget: 1,
                filterTarget: function(card,player,target){
                    return target.side!=player.side;
                },
                image: "ext:噬神者/yiRenCard.jpg",
                fullimage: true,
                content: function(){
                    "step 0"
                    target.damage(event.damageNum);
                },
                ai: {
                    basic: {
                        useful: 4,
                        value: [4,2,0],
                    },
                },
            },
        },
        translate: {
            moRenCard: "魔刃",
            "moRenCard_info": "<span class=\"greentext\">[被动]魔刃</span><br>            <span class='tiaoJian'>(此卡视为手牌，若你拥有【魔刃】，使用、打出或弃置【魔刃】时)</span>你选择此卡视为火系或水系的血类命格攻击牌。<br>            <span class=\"greentext\">[被动]渗蚀</span><br>            <span class='tiaoJian'>(若你拥有【刃】，使用、打出或弃置【刃】时)</span>噬神者对你造成3点法术伤害③，然后移除【刃】。 <span class='tiaoJian'>(【刃】因技能放置在角色旁时)</span>对该角色造成1点法术伤害③，然后移除【刃】。            ",
            yiRenCard: "异刃",
            "yiRenCard_info": "<span class=\"greentext\">[被动]异刃</span><br>            <span class='tiaoJian'>(此卡视为手牌，若你拥有【异刃】，使用、打出或弃置【异刃】时)</span>你选择此卡视为雷系或风系的血类命格攻击牌。<br>            <span class=\"greentext\">[被动]渗蚀</span><br>            <span class='tiaoJian'>(若你拥有【刃】，使用、打出或弃置【刃】时)</span>噬神者对你造成3点法术伤害③，然后移除【刃】。 <span class='tiaoJian'>(【刃】因技能放置在角色旁时)</span>对该角色造成1点法术伤害③，然后移除【刃】",
            "噬神者": "噬神者",
        },
        list: [],
    },
    skill: {
        skill: {
            yuRen: {
                type: "qiDong",
                trigger: {
                    player: "qiDong",
                },
                filter: function(event,player){
                    var bool1,bool2;
                    if(player.storage.moRen) bool1=true;
                    if(player.storage.yiRen) bool2=true;
                    return !(bool1&&bool2);
                },
                content: function(){
                    'step 0'
                    var bool1,bool2;
                    if(player.storage.moRen) bool1=true;
                    if(player.storage.yiRen) bool2=true;

                    var list=[];
                    if(!bool1){
                        list.push('moRenCard');
                    }
                    if(!bool2){
                        list.push('yiRenCard');
                    }
                    var next=player.chooseButton(['选择获得的【刃】',[list,'vcard']]);
                    next.set('selectButton',[1,1]);
                    next.set('forced',true);
                    'step 1'
                    var card;
                    if(result.links[0][2]=='moRenCard'){
                        card=game.createCard("moRenCard", "huo", 'xue');
                        player.storage.moRen=true;
                    }else if(result.links[0][2]=='yiRenCard'){
                        card=game.createCard("yiRenCard", "lei", 'xue');
                        player.storage.yiRen=true;
                    }
                    if(card){
                        card.renMaster=player;
                        game.log(player, "获得了1张【刃】")
                        player.gain(card,'draw');
                    }
                },
                "_priority": 0,
            },
            qingKe: {
                trigger: {
                    source: "gongJiMingZhong",
                },
                filter: function(event,player){
                    return event.card.name=='moRenCard'||event.card.name=='yiRenCard';
                },
                content: function(){
                    var card;
                    if(trigger.card.name=='moRenCard'){
                        card=game.createCard("moRenCard", "huo", 'xue');
                        player.storage.moRen=true;
                    }else if(trigger.card.name=='yiRenCard'){
                        card=game.createCard("yiRenCard", "lei", 'xue');
                        player.storage.yiRen=true;
                    }
                    card.renMaster=player;
                    game.log(trigger.target,'获得了',card);
                    trigger.target.gain(card,'draw');
                },
                "_priority": 0,
            },
            shiMie: {
                trigger: {
                    player: "gongJiShi",
                },
                filter: function(event,player){
                    return event.card.name=='moRenCard'&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    var next=player.chooseCard('h',function(card){
                        var xiBie=get.xiBie(card);
                        return xiBie=='shui'||xiBie=='huo';
                    }).set('ai',function(){
                        var target=_status.event.target;
                        if(target.zhiLiao>0){
                            return Math.random;
                        }else{
                            return 0;
                        }
                    }).set('target',trigger.target);
                    next.set('prompt',get.prompt('shiMie'));
                    next.set('prompt2',lib.translate.shiMie_info);
                    event.result=await next.forResult();
                },
                content: function(){
                    'step 0'
                    player.discard(event.cards,'showCards');
                    'step 1'
                    trigger.target.changeZhiLiao(-1);
                },
                "_priority": 0,
            },
            shangMie: {
                trigger: {
                    player: "gongJiShi",
                },
                filter: function(event,player){
                    return event.card.name=='yiRenCard'&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    var bool=game.hasPlayer(function(current){
                        return current.zhiLiao>0||current.side!=player.side;
                    });
                    var next=player.chooseCardTarget({
                        filterCard:function(card){
                            var xiBie=get.xiBie(card);
                            return xiBie=='feng'||xiBie=='lei';
                        },
                        filterTarget:function(card,player,target){
                            var targetx=_status.event.targetx;
                            return targetx!=target&&target.side!=player.side;
                        },
                        ai1(card) {
                            return 6- get.value(card);
                        },
                        ai2(target) {
                            var player=_status.event.player;
                            if(target.side==player.side) return 0;
                            return target.zhiLiao;
                        },
                    });
                    next.set('targetx',trigger.target);
                    next.set('prompt',get.prompt('shangMie'));
                    next.set('prompt2',lib.translate.shangMie_info);
                    event.result=await next.forResult();
                },
                content: function(){
                    'step 0'
                    player.discard(event.cards,'showCards');
                    'step 1'
                    event.targets[0].changeZhiLiao(-1);
                },
                "_priority": 0,
            },
            tongDiao: {
                trigger: {
                    player: "ren_daChuQiZhiBefore",
                },
                forced: true,
                content: function(){
                    trigger.num=1;
                },
                "_priority": 0,
            },
            ren: {
                global: ["ren_zhuanHuan1","ren_zhuanHuan2","ren_daChuQiZhi","ren_gaiPai"],
                contentx: function(){
                    for(var card of event.cards){
                        if(get.name(card)=='moRenCard'){
                            if(get.xiBie(card,false)=='huo') game.setXiBie(card,'shui');
                            else game.setXiBie(card,'huo');
                        }else if(get.name(card)=='yiRenCard'){
                            if(get.xiBie(card,false)=='lei') game.setXiBie(card,'feng');
                            else game.setXiBie(card,'lei');
                        }
                        card.$init([card.xiBie,card.mingGe,card.name]);
                    }
                },
                subSkill: {
                    "zhuanHuan1": {
                        enable: ["gongJiOrFaShu"],
                        filter: function(event,player){
                            return player.hasCard(function(card){
                                return get.name(card)=='moRenCard'||get.name(card)=='yiRenCard';
                            });
                        },
                        filterCard: function(card){
                            return get.name(card)=='moRenCard'||get.name(card)=='yiRenCard';
                        },
                        selectCard: [1,2],
                        discard: false,
                        lose: false,
                        content: function(){
                            var next=game.createEvent('zhuanHuan');
                            next.cards=cards;
                            next.setContent(lib.skill.ren.contentx);
                            if(_status.currentPhase==player){
                                player.storage[event.getParent('phaseUse').xingDong]++;
                                if(event.getParent().firstAction) event.getParent('phaseUse').firstAction=true;
                            }
                        },
                        sub: true,
                        sourceSkill: "ren",
                        "_priority": 0,
                    },
                    "zhuanHuan2": {
                        trigger: {
                            player: ["chooseToDiscardBefore","yingZhanBefore","chooseCardBefore"],
                        },
                        filter: function(event,player){
                            if(event.zhuanHuan==true) return false;
                            return player.hasCard(function(card){
                                return get.name(card)=='moRenCard'||get.name(card)=='yiRenCard';
                            });
                        },
                        async cost(event,trigger,player){
                            var next=player.chooseCard('h',function(card){
                                return get.name(card)=='moRenCard'||get.name(card)=='yiRenCard';
                            });
                            next.set('prompt','是否转化【刃】的系别');
                            next.set('selectCard',[1,2]);
                            next.set('zhuanHuan',true);
                            event.result=await next.forResult();
                        },
                        content: function(){
                            var next=game.createEvent('zhuanHuan');
                            next.cards=event.cards;
                            next.setContent(lib.skill.ren.contentx);
                        },
                        sub: true,
                        sourceSkill: "ren",
                        "_priority": 0,
                    },
                    daChuQiZhi: {
                        trigger: {
                            player: ["daChuPai","discard"],
                        },
                        forced: true,
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(get.name(event.cards[i]) == 'moRenCard' || get.name(event.cards[i]) == 'yiRenCard') {
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        filter: function(event,player){
                            var bool=false;
                            for(var card of event.cards){
                                if(get.name(card)=='moRenCard'||get.name(card)=='yiRenCard'){
                                    bool=true;
                                    break;
                                }
                            }
                            return bool;
                        },
                        content: function(){
                            'step 0'
                            player.faShuDamage(event.num||3,event.indexedData.renMaster);
                            'step 1'
                            let name=get.name(event.indexedData).slice(0,-4);
                            event.indexedData.renMaster.storage[name]=false;
                            event.indexedData.fix();
                            event.indexedData.remove();
                            event.indexedData.destroyed = true;
                            game.log(event.indexedData, "被移除了");
                        },
                        sub: true,
                        sourceSkill: "ren",
                        "_priority": 0,
                    },
                    gaiPai: {
                        trigger: {
                            player: "addToExpansionEnd",
                        },
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(get.name(event.cards[i]) == 'moRenCard' || get.name(event.cards[i]) == 'yiRenCard') {
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        forced: true,
                        filter: function(event,player){
                            var bool=false;
                            for(var card of event.cards){
                                if(get.name(card)=='moRenCard'||get.name(card)=='yiRenCard'){
                                    bool=true;
                                    break;
                                }
                            }
                            return bool;
                        },
                        content: function(){
                            'step 0'
                            player.faShuDamage(1,event.indexedData.renMaster);
                            'step 1'
                            let name=get.name(event.indexedData).slice(0,-4);
                            event.indexedData.renMaster.storage[name]=false;
                            event.indexedData.fix();
                            event.indexedData.remove();
                            event.indexedData.destroyed = true;
                            game.log(event.indexedData, "被移除了");
                        },
                        sub: true,
                        sourceSkill: "ren",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            gongZhen: {
                trigger: {
                    player: "zaoChengShangHai",
                },
                filter: function(event,player){
                    return player.canBiShaShuiJing()&&event.faShu;
                },
                content: function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    var num=player.countTongXiPai();
                    if(num>=2){
                        var next=player.chooseToDiscard('弃2-3张同系牌[展示]',[2,3],true,function(card){
                            var xiBie2=get.xiBie(card);
                            if(!xiBie2) return false;
                            if(!ui.selected.cards.length) return true;
                            var xiBie1=get.xiBie(ui.selected.cards[0]);
                            return xiBie1==xiBie2;
                        });
                        next.set('complexCard',true);
                        next.ai=function(card){
                            return 1;
                        };
                        next.set('filterOk',function(){
                            return ui.selected.cards.length>=2;
                        });
                    }else if(num>=1){
                        var next=player.chooseToDiscard('弃2-3张同系牌[展示]',1,true,function(card){
                            var xiBie2=get.xiBie(card);
                            if(!xiBie2) return false;
                            else return true;
                        });
                        next.ai=function(card){
                            return 1;
                        };
                    }else{
                        event.goto(3);
                    }
                    'step 2'
                    player.showCards(result.cards);
                    'step 3'
                    var bool1,bool2;
                    if(player.storage.moRen) bool1=true;
                    if(player.storage.yiRen) bool2=true;
                    var list=[];
                    if(!bool1){
                        list.push('moRenCard');
                    }
                    if(!bool2){
                        list.push('yiRenCard');
                    }
                    if(list.length==0) event.finish();
                    else{
                        var next=player.chooseButton(['选择获得的【刃】',[list,'vcard']]);
                        next.set('selectButton',[1,2]);
                        next.set('forced',true);
                    }
                    'step 4'
                    var cards=[];
                    for(var i=0;i<result.links.length;i++){
                        let card;
                        if(result.links[i][2]=='moRenCard'){
                            card=game.createCard('moRenCard','huo','xue');
                            player.storage.moRen=true;
                        }else if(result.links[i][2]=='yiRenCard'){
                            card=game.createCard('yiRenCard','lei','xue');
                            player.storage.yiRen=true;
                        }
                        card.renMaster=player;
                        cards.push(card);
                    }
                    game.log(player,`获得了${cards.length}张【刃】`);
                    player.gain(cards,'draw');
                },
                ai: {
                    shuiJing: true,
                },
                "_priority": 0,
            },
            zhuShenZhongYan: {
                type: "faShu",
                enable: ["faShu"],
                filter: function(event,player){
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.faShuDamage(2,player);
                    var players=[];
                    for(var current of game.players){
                        var cards=current.getCards('h');
                        for(var j=0;j<cards.length;j++){
                            if(cards[j].name=='moRenCard'){
                                players.push(current);
                                player.storage.moRen=false;
                                let card=cards[j];
                                await current.lose(card);
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                                game.log(card, "被移除了");
                            }else if(cards[j].name=='yiRenCard'){
                                players.push(current);
                                player.storage.yiRen=false;
                                let card=cards[j];
                                await current.lose(card);
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                                game.log(card, "被移除了");
                            }
                            if(players.length>=2) break;
                        }
                        if(players.length>=2) break;
                    }
                    if(players.length==0) return;

                    players.sortBySeat(player);
                    for(var i=0;i<players.length;i++){
                        await players[i].faShuDamage(3,player);
                    }
                    if(players.length>=2){
                        var targets=await player.chooseTarget('对1名目标对手造成2点法术伤害③',true,function(card,player,target){
                            return target.side!=player.side;
                        }).set('ai',function(target){
                            return get.damageEffect(target,player,2);
                        }).forResultTargets();
                        await targets[0].faShuDamage(2,player);
                    }
                    
                },
                ai: {
                    shuiJing: true,
                    order: function(event,player){
                        var num=player.countCards('h',card=>card.nmae=='moRenCard'||card.name=='yiRenCard');
                        if(num>0) return 0;
                        if((!player.storage.yiRen)&&(!player.storage.moRen)) return 0;
                        return 3.6;
                    },
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
        },
        translate: {
            "renSkill_moRen": "[被动]魔刃",
            "renSkill_yiRen": "[被动]异刃",
            shenShi: "[被动]渗蚀",
            "renSkill_addToExpansion": "[被动]渗蚀",
            yuRen: "[启动]御刃",
            "yuRen_info": "<span class='tiaoJian'>(当【魔刃】或【异刃】未在场时)</span>将【魔刃】或【异刃】加入你手牌[强制]。",
            qingKe: "[响应]侵刻",
            "qingKe_info": "<span class='tiaoJian'>(使用【魔刃】或【异刃】攻击命中时发动②)</span>将该卡加入攻击目标手牌[强制]。",
            shiMie: "[响应]噬灭",
            "shiMie_info": "<span class='tiaoJian'>(当你使用【魔刃】对目标角色攻击时发动①，额外弃1张水系或火系牌[展示])</span>移除该攻击目标1[治疗]。",
            shangMie: "[响应]殇灭",
            "shangMie_info": "<span class='tiaoJian'>(当你使用【异刃】对目标角色攻击时发动①，额外弃1张风系或雷系牌[展示])</span>移除该攻击目标外1名敌方角色1[治疗]。",
            tongDiao: "[被动]同调",
            "tongDiao_info": "<span class='tiaoJian'>(你触发【渗蚀】时)</span>3点法术伤害变更为1点法术伤害。",
            ren: "(专)刃",
            "ren_zhuanHuan1": "转换刃系别",
            "ren_zhuanHuan2": "转换刃系别",
            "ren_daChuQiZhi": "[被动]渗蚀",
            "ren_gaiPai": "[被动]渗蚀",
            "ren_info": "<span class=\"greentext\">[被动]魔刃</span><br><span class='tiaoJian'>(此卡视为手牌，若你拥有【魔刃】，使用、打出或弃置【魔刃】时)</span>你选择此卡视为火系或水系的血类命格攻击牌。<br><span class=\"greentext\">[被动]异刃</span><br><span class='tiaoJian'>(此卡视为手牌，若你拥有【异刃】，使用、打出或弃置【异刃】时)</span>你选择此卡视为雷系或风系的血类命格攻击牌。<br><span class=\"greentext\">[被动]渗蚀</span><br><span class='tiaoJian'>(若你拥有【刃】，使用、打出或弃置【刃】时)</span>噬神者对你造成3点法术伤害③，然后移除【刃】。 <span class='tiaoJian'>(【刃】因技能放置在角色旁时)</span>对该角色造成1点法术伤害③，然后移除【刃】。",
            gongZhen: "[被动]共振",
            "gongZhen_info": "[水晶]<span class='tiaoJian'>(目标角色对你造成法术伤害时发动③)</span>弃2-3张同系牌[展示]，你可将未在场的【魔刃】和【异刃】加入你手牌[强制]。",
            zhuShenZhongYan: "[法术]诸神终焉",
            "zhuShenZhongYan_info": "[水晶]<span class='tiaoJian'>(对自己造成2点法术伤害③)</span>移除【魔刃】和【异刃】，对原持有【魔刃】和【异刃】的目标角色各造成3点法术伤害③；<span class='tiaoJian'>(若以此法同时移除【魔刃】和【异刃】)</span>对1名目标对手造成2点法术伤害③。",
        },
    },
    intro: "噬神者，游戏本体版本最低1.0.8",
    author: "农杰",
    diskURL: "",
    forumURL: "",
    version: "1.1",
},files:{"character":["shiShenZhe.jpg"],"card":["yiRenCard.jpg","moRenCard.jpg"],"skill":[],"audio":[]},connect:true} 
});