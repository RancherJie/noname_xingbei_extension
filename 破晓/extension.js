game.import("extension",function(lib,game,ui,get,ai,_status){ 
    lib.translate.longGroup = "龙魂帝国";
    return {name:"破晓",arenaReady:function(){
        
},content:function(config,pack){
    
},prepare:function(){
    
},precontent:function(){
    
},help:{},config:{},package:{
    character: {
        character: {
            youXia: ["youXia_name","jiGroup",1,["zhuiFengJi","zhuRiJian","lingDongZhiWu"],["des:与风元素毫无阻碍进行沟通的能力，是精灵族的种族天赋。在风元素的加持之下，任何敌人都无法有效应战温蒂斯的致命攻击。","ext:破晓/youXia.jpg","die:ext:破晓/audio/die/youXia.mp3"]],
            zhanXingJia: ["zhanXingJia_name","yongGroup",2,["zhanPuWeiLai","lieHuoFenShen","hanBingHuTi","leiTingZhiNu","guangYingJiaoCuo","daYuYanShu"],["des:首席观测者蒂雅擅长通过【预兆】操控未来，转换多系元素力量左右战局。她不靠蛮力决胜，而以预见与元素融合化解危机、击溃敌手。","ext:破晓/zhanXingJia.jpg","die:ext:破晓/audio/die/zhanXingJia.mp3"]],
            tianmaqishi: ["tianmaqishi_name","jiGroup",1,["jianta","zhuixing"],["des:天马骑士团副团长，银翼奥拉琪尔之主，身披星辰合金，手持坠星长枪，如流星般碾碎敌军。","ext:破晓/tianmaqishi.jpg","die:ext:破晓/audio/die/tianmaqishi.mp3"]],
            shengtangcike: ["shengtangcike_name","jiGroup",1,["zhuiYingJi","tiGu"],["des:","ext:破晓/shengtangcike.jpg","die:ext:破晓/audio/die/shengtangcike.mp3"]],
            dasiji: ["dasiji_name","shengGroup",1,["shengGuangShanYao","jiuShu","shenShengCaiJue"],["des:","ext:破晓/dasiji.jpg","die:ext:破晓/audio/die/dasiji.mp3"]],
            lianjinshushi: ["lianjinshushi_name","yongGroup",1,["tanLanZhiXin","wanWuYanMie"],["des:","ext:破晓/lianjinshushi.jpg","die:ext:破晓/audio/die/lianjinshushi.mp3"]],
            xuetianshi: ["xuetianshi_name","xueGroup",1,["lieDiMaiChong","lianLeiDiYu","shiXueZhiXin"],["des:","ext:破晓/xuetianshi.jpg","die:ext:破晓/audio/die/xuetianshi.mp3"]],
            xinlingsushi: ["xinlingsushi_name","huanGroup",4,["huanXiangChongJi","xinLingFengBao","zhenShiHuanJue","gaiBianShiJie"],["des:","ext:破晓/xinlingsushi.jpg","die:ext:破晓/audio/die/xinlingsushi.mp3"]],
            zhenLongNvWang: ["zhenLongNvWang_name","longGroup",4,["yuanGuJinZhi","zhenLongJueXing","longHunShouHu","longShenEnHui","longWangZhiLi","shengLongWeiYa","baiWanLongYan","longZuFuXing","longKuangMiSuo","longMaiShuFu","longYuFengYin","yuLongJieJie"],["des:","ext:破晓/zhenlongnvwang.jpg","die:ext:破晓/audio/die/zhenlongnvwang.mp3"]],
            caijuezhe: ["caijuezhe_name","shengGroup","3/4",["zhengYiZhuiJi","caiJueZhiXin","zhenLiCaiJue","songZhongDaoFeng","wuJinZhiRen"]],
            jianwuzhe: ["jianwuzhe_name","yongGroup",2,["weiJianErSheng","duiJianErShi","jianWuYiShi"]],
            shuangxuegongzhu: ["shuangxuegongzhu_name","shengGroup",3,["bingShuangLingYu","shuiJingDaoQiang","lingFengZhuFu","shuangYuZhiHuan"]],
            shouwangzhe: ["shouwangzhe_name","shengGroup",1,["huJiaoZhiXin","wuJinZhuiJi","jingZhunJuJi"]],
            wudoujia: ["wudoujia_name","jiGroup",2,["zhiYueZhiHuan","sheShenZhiDao","jianRenZhiZhi"]],
        },
        translate: {
            "破晓": "破晓",
            youXia: "游侠",
            youXia_name: "温蒂",
            zhanXingJia: "占星家",
            zhanXingJia_name: "蒂雅",
            tianmaqishi: "天马骑士",
            tianmaqishi_name: "伊莎贝拉",
            shengtangcike: "圣堂刺客",
            shengtangcike_name: "残月",
            dasiji: "大司祭",
            dasiji_name: "罗格",
            lianjinshushi: "炼金术士",
            lianjinshushi_name: "陶",
            xuetianshi: "血天使",
            xuetianshi_name: "茜拉",
            xinlingsushi: "心灵塑师",
            xinlingsushi_name: "艾莉西娅",
            zhenLongNvWang: "真龙女王",
            zhenLongNvWang_name: "索菲亚",
            caijuezhe: "裁决者",
            caijuezhe_name: "路西菲尔",
            jianwuzhe: "剑舞者",
            jianwuzhe_name: "黛",
            shuangxuegongzhu: "霜雪公主",
            shuangxuegongzhu_name: "萨纹蕾缇",
            shouwangzhe: "守望者",
            shouwangzhe_name: "米莉塔",
            wudoujia: "武斗家",
            wudoujia_name: "孟克",
        },
    },
    card: {
        card: {
        },
        translate: {
        },
        list: [],
    },
    skill: {
        skill: {
            zhuiFengJi: {
                forced: true,
                trigger: {
                    player: "gongJiSheZhi",
                },
                filter: function(event, player) {
                    return get.xiBie(event.card) === 'feng';
                },
                content: function() {
                    trigger.wuFaYingZhan();
                },
                mod: {
                    aiOrder: function(player, card, num) {
                        if (get.xiBie(card) === 'feng' && get.type(card) === 'gongJi') {
                            return num - 0.3; // 降低使用成本，提高优先级
                        }
                    },
                },
                "_priority": 0,
            },
            zhuRiJian: {
                type: "faShu",
                enable: "faShu",
                filter: function(event, player) {
                    return player.hasCard(function(card) {
                        return get.xiBie(card) === 'huo';
                    });
                },
                selectCard: 1,
                filterCard: function(card) {
                    return get.xiBie(card) === 'huo';
                },
                selectTarget: 1,
                filterTarget: function(card, player, target) {
                    return target.side !== player.side;
                },
                discard: true,
                showCards: true,
                content: function() {
                    // 对目标造成2点法术伤害
                    target.faShuDamage(2, player);
                },
                ai: {
                    order: 3.5,
                    result: {
                        target: function(player, target) {
                            // 基础伤害收益
                            let value = get.damageEffect(target, 2);
                            
                            // 如果目标没有治疗，优先选择
                            if (target.zhiLiao == 0) value += 0.3;
                            
                            // 如果目标手牌多，优先选择（可以爆士气）
                            if (target.countCards('h') > 4) value += 0.5;
                            return value;
                        },
                    },
                },
                "_priority": 0,
            },
            lingDongZhiWu: {
                type: "biSha",
                usable: 1,
                trigger: {
                    player: "gongJiAfter",
                },
                filter: function(event, player) {
                    return player.canBiShaShuiJing() && !event.yingZhan;
                },
                content: function() {
                    'step 0'
                    // 消耗水晶
                    player.removeBiShaShuiJing();
                    
                    'step 1'
                    // 获得额外法术行动
                    player.addFaShu();
                },
                ai: {
                    order: 9.5,
                    useful: function(player) {
                        // 有可用法术牌时优先使用
                        if (player.hasCard(card => get.type(card) === 'faShu')) {
                            return true;
                        }
                        // 手牌多优先跑牌
                        if (player.countCards('h') > 3) {
                            return true;
                        }
                        // 关键回合必用
                        if (get.shiQi(player.side) < 10) {
                            return true;
                        }
                        return false;
                    },
                    shuiJing: true,
                },
                "_priority": 0,
            },
            jianta: {
                trigger: {
                    player: "gongJiSheZhi",
                },
                charlotte: true,
                forced: true,
                filter: function (event, player) {
                    return get.type(event.card) === 'gongJi'; // 所有攻击伤害
                },
                content: function () {
                    trigger.changeDamageNum(1);
                    console.log(player, '【践踏】发动，伤害+1 →', trigger.num);
                },
                ai: {
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.type(card) === 'gongJi') return [1, 2]; // 提升攻击威胁
                        },
                    },
                },
                "_priority": 0,
            },
            zhuixing: {
                trigger: {
                    player: "gongJiBefore",
                },
                filter: function (event, player) {
                    return get.type(event.card) === 'gongJi' && player.canBiShaShuiJing();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    trigger.wuFaYingZhan();
                    game.log(player, '发动【坠星】，本次攻击不可被应战');
                },
                ai: {
                    order: 10,
                    result: {
                        target: function (player, target) {
                            return -1; // 倾向压制敌方
                        },
                    },
                },
                "_priority": 0,
            },
            zhuiYingJi: {
                trigger: {
                    player: "gongJiAfter",
                },
                usable: 1,
                filter: function (event, player) {
                    if (event.yingZhan) return false;
                    return event.targets && event.targets.length > 0;
                },
                content: function () {
                    // 记录本回合已主动攻击过的目标
                    if (!player.storage.zhuiYingJiTargets) {
                        player.storage.zhuiYingJiTargets = [];
                    }
                    player.storage.zhuiYingJiTargets.addArray(trigger.targets);

                    player.storage.extraXingDong.push({
                        xingDong: 'gongJi',
                        filterTarget: function (card, player, target) {
                            return player.storage.zhuiYingJiTargets.includes(target);
                        },
                        prompt: '追影击：攻击本回合主动攻击过的对手',
                    });
                },
                group: "zhuiYingJi_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseAfter",
                        },
                        silent: true,
                        content: function () {
                            delete player.storage.zhuiYingJiTargets;
                        },
                        sub: true,
                        sourceSkill: "zhuiYingJi",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                ai: {
                    combo: "gongJi",
                    order: 10,
                },
                "_priority": 0,
            },
            tiGu: {
                trigger: {
                    source: "gongJiMingZhong",
                },
                usable: 1,
                filter: function (event, player) {
                    return player.countNengLiang('baoShi') > 0;
                },
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi(); // 移除1个宝石
                    'step 1'
                    trigger.changeDamageNum(2); // 额外+2伤害
                },
                ai: {
                    baoShi: true,
                    skillTagFilter: function (player, tag, arg) {
                        if (tag == 'baoShi' && player.countNengLiang('baoShi') == 0) return false;
                    },
                    effect: {
                        target: function (card, player, target, current) {
                            if (card.name == 'gongJi' && get.attitude(player, target) < 0) {
                                return [1, 3];
                            }
                        },
                    },
                },
                "_priority": 0,
            },
            tanLanZhiXin: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card, player, selected) {
                    return get.xuanZeTongXiPai(card)
                },
                position: "h",
                selectCard: 2,
                discard: true,
                selectTarget: 1,
                filter: function (event, player) {
                    return player.countTongXiPai() >= 2;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.isEnemyOf(player);
                },
                content: function () {
                    'step 0'
                    console.log(target.hasCard(card => get.name(card) === 'anMie' || get.name(card) === 'shengGuang'))
                    const result = target.chooseToDiscard(1,'弃置一张【暗灭】或【圣光】，否则受到2点法术伤害', 'h', "showCards", function (card) {
                        return get.name(card) === 'anMie' || get.name(card) === 'shengGuang';
                    }).set('ai', function (card) {
                        return 100 - get.value(card);;
                    });
                    'step 1'
                    if (!result.bool) {
                        target.faShuDamage(2, player);
                    }
                },
                ai: {
                    order: 6,
                    result: {
                        target: function (player, target) {
                            return -2;
                        },
                    },
                },
                "_priority": 0,
            },
            wanWuYanMie: {
                type: "faShu",
                enable: "faShu",
                filter: function (event, player) {
                    return player.canBiShaBaoShi();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var targets = game.filterPlayer(p => p != player && p.isEnemyOf(player));
                    for (let i = 0; i < targets.length; i++) {
                        targets[i].faShuDamage(2, player);
                    }
                },
                ai: {
                    baoShi: true,
                    order: 8,
                    result: {
                        player: function (player) {
                            return 6;
                        },
                    },
                },
                "_priority": 0,
            },
            zhanPuWeiLai: {
                trigger: {
                    player: "phaseBegin",
                },
                forced: true,
                content: async function (event,trigger,player) {
                    var cards = get.cards(2);
                    await player.showCards(cards, '展示预兆牌');
                    game.cardsGotoOrdering(cards);
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i];
                        game.log(player, '翻开', card, '作为【预兆】');
                        game.broadcastAll(function (card) {
                            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                            card.style.display = 'block';
                            card.style.transform = 'none';
                        }, card);
                        player.loseToSpecial([card], '预兆', player);
                        // card.addGaintag('预兆');
                        if(get.xiBie(card)=="shui"){
                            await event.trigger("yuZhaoCardAdded")
                        }else if(["guang","an"].includes(get.xiBie(card))){
                            await event.trigger("guangAnYuZhaoCardAdded")
                        }
                    }
                },
                group: "zhanPuWeiLai_endClear",
                subSkill: {
                    endClear: {
                        trigger: {
                            player: "phaseEnd",
                        },
                        forced: true,
                        content: function () {
                            var cards = player.getCards('s');
                            if (cards.length) {
                                player.discard(cards, '预兆');
                                game.log(player, '弃置全部【预兆】');
                            }
                        },
                        sub: true,
                        sourceSkill: "zhanPuWeiLai",
                        "_priority": 0,
                    },
                },
                mod: {
                    "cardEnabled2": function (card, player) {
                        if (card.hasGaintag('预兆')) return false;
                    },
                    cardUsable: function (card, player) {
                        if (card.hasGaintag('预兆')) return false;
                    },
                    cardRespondable: function (card, player) {
                        if (card.hasGaintag('预兆')) return false;
                    },
                    cardSavable: function (card, player) {
                        if (card.hasGaintag('预兆')) return false;
                    },
                },
                "_priority": 0,
            },
            lieHuoFenShen: {
                forced: true,
                trigger: {
                    player: "gongJiMingZhong",
                },
                filter: function(event, player) {
                    return !event.yingZhan && player.getCards('s', card => card.hasGaintag('预兆') && get.xiBie(card) == 'huo'); // 仅主动攻击
                },
                content: function() {
                    // 计算火系预兆数量
                    var huo_count = player.getCards('s', card => card.hasGaintag('预兆') && get.xiBie(card) == 'huo').length;
                    if (huo_count > 0) {
                        trigger.changeDamageNum(huo_count);
                        game.log(player, `烈焰焚身：火系预兆${huo_count}个，伤害+${huo_count}`);
                    }
                },
                "_priority": 0,
            },
            hanBingHuTi: {
                trigger: {
                    global: "yuZhaoCardAdded",
                },
                forced: true,
                content: function() {
                    'step 0'
                    player.chooseTarget(true,'【寒冰护体】：选择1名角色增加1点[治疗]').set('ai', function (target) {
                        var player = _status.event.player;
                        let value = get.zhiLiaoEffect2(target, player, 1);
                        return get.zhiLiaoEffect2(target, player, 1);
                    });
                    'step 1'
                    if (result.bool && result.targets.length) {
                        result.targets[0].changeZhiLiao(1, player);
                    }
                },
                "_priority": 0,
            },
            leiTingZhiNu: {
                trigger: {
                    player: "phaseEnd",
                },
                forced: true,
                filter: function (event, player) {
                    return player.getCards('s', card => card.hasGaintag('预兆') && ['lei', 'guang', 'an'].includes(get.xiBie(card))).length > 0;
                },
                content: function () {
                    'step 0'
                    var count = player.getCards('s', card => {
                        return card.hasGaintag('预兆') && ['lei', 'guang', 'an'].includes(get.xiBie(card));
                    }).length;
                    player.chooseTarget(true,'雷霆之怒：选择一名对手造成' + count + '点法术伤害③', function (card, player, target) {
                        return target.side != player.side;
                    }).set('ai', function (target) {
                        var player=_status.event.player;
                        let value = get.damageEffect(target,player,count);
                        // 如果目标没有治疗，优先选择
                        if (target.zhiLiao == 0) value += 0.3;
                        // 如果目标手牌多，优先选择（可以爆士气）
                        if (target.countCards('h') > 4) value += 0.5;
                        return value;
                    });
                    'step 1'
                    var count = player.getCards('s', card => {
                        return card.hasGaintag('预兆') && ['lei', 'guang', 'an'].includes(get.xiBie(card));
                    }).length;
                    if (result.bool && result.targets.length) {
                        result.targets[0].faShuDamage(count, player);
                    }
                },
                "_priority": 1,
            },
            guangYingJiaoCuo: {
                trigger: {
                    global: "guangAnYuZhaoCardAdded",
                },
                forced: true,
                content: async function (event,trigger,player) {
                    var card = get.cards(1)[0];
                    await player.showCards(card, '展示预兆牌');
                    game.log(player, '因【光影交错】额外翻开', card, '作为【预兆】');
                    game.broadcastAll(function (card) {
                        ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                        card.style.display = 'block';
                        card.style.transform = 'none';
                    }, card);
                    player.loseToSpecial([card], '预兆', player);
                    // card.addGaintag('预兆');
                    if(get.xiBie(card)=="shui"){
                        await event.trigger("yuZhaoCardAdded")
                    }else if(["guang","an"].includes(get.xiBie(card))){
                        await event.trigger("guangAnYuZhaoCardAdded")
                    }
                },
                "_priority": 0,
            },
            daYuYanShu: {
                type: "faShu",
                enable: "faShu",
                filter: function(event, player) {
                    return player.canBiShaBaoShi();
                },
                content: async function (event,trigger,player) {
                    // 消耗宝石
                    await player.removeBiShaBaoShi();
                    var cards = get.cards(2);
                    await player.showCards(cards, '展示预兆牌');
                    game.cardsGotoOrdering(cards);
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i];
                        game.log(player, '翻开', card, '作为【预兆】');
                        game.broadcastAll(function (card) {
                            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                            card.style.display = 'block';
                            card.style.transform = 'none';
                        }, card);
                        player.loseToSpecial([card], '预兆', player);
                        // card.addGaintag('预兆');
                        if(get.xiBie(card)=="shui"){
                            await event.trigger("yuZhaoCardAdded")
                        }else if(["guang","an"].includes(get.xiBie(card))){
                            await event.trigger("guangAnYuZhaoCardAdded")
                        }
                    }
                    await player.addGongJiOrFaShu();
                },
                ai: {
                    baoShi: true,
                    order: 4,
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            shengGuangShanYao: {
                type: "faShu",
                enable: "faShu",
                duYou: "shengGuangShanYao",
                filterCard: function (card) {
                    return get.type(card) == 'faShu';
                },
                position: "h",
                filter: function (event, player) {
                    return player.countCards('h', card => get.type(card) == 'faShu') > 0;
                },
                selectCard: 1,
                discard: true,
                prompt: "任意分配3点[治疗]给目标角色",
                content: function () {
                    'step 0'
                    event.count = 0;
                    event.nextStep = function () {
                        if (event.count >= 3) return event.finish();
                        player.chooseTarget('第' + (event.count + 1) + '次：选择治疗目标（剩余' + (3 - event.count) + '）', true,function(card, player, target){
                            return target.side == player.side;
                        }).set('ai', function (target) {
                            return get.zhiLiaoEffect(target, 1);
                        });
                    };
                    event.nextStep();
                    'step 1'
                    if (result.bool && result.targets && result.targets.length) {
                        result.targets[0].changeZhiLiao(1, player);
                    }
                    event.count++;
                    if (event.count < 3) {
                        event.nextStep();
                        event.goto(1);
                    }
                },
                ai: {
                    order: 4,
                    result: {
                        target: function (target) {
                            return get.zhiLiaoEffect(target, 1);
                        },
                        player: function (player) {
                            return get.zhiLiaoEffect(player, 1) + 1;
                        },
                    },
                },
                "_priority": 0,
            },
            jiuShu: {
                type: "faShu",
                enable: "faShu",
                filterTarget: function (card, player, target) {
                    return target != player && target.side == player.side;
                },
                selectTarget: 1,
                content: function () {
                    'step 0'
                    player.draw();
                    'step 1'
                    player.changeZhiLiao(1);
                    target.changeZhiLiao(1);
                },
                ai: {
                    order: 3.6,
                    skillTagFilter: function (player) {
                        // 如果玩家即将摸1牌，且手牌已接近上限，则不发动
                        if (player.countCards('h') >= 5) return false;
                        return true;
                    },
                    result: {
                        target: function (target) {
                            return get.zhiLiaoEffect(target, 1);
                        },
                        player: function (player) {
                            return get.zhiLiaoEffect(player, 1) + 1;
                        },
                    },
                },
                "_priority": 0,
            },
            shenShengCaiJue: {
                type: "faShu",
                enable: "faShu",
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                selectTarget: 1,
                content: async function (event,trigger,player) {
                    'step 0'
                    await player.removeBiShaShuiJing();
                    var options = ['你们各弃2张牌', '你们各摸2张牌'];
                    var res = await player.chooseControl(['选项一', '选项二'])
                        .set('choiceList', options)
                        .set('prompt', '选择神圣裁决的效果')
                        .set('ai', function () {
                            var player = _status.event.player;
                            if (player.countCards('h') > 3 && target.countCards('h') > 3) return '选项一';
                            return '选项二';
                        })
                        .forResult();

                    event.effect = res.control;
                    'step 1'
                    var target = _status.event.target;
                    if (event.effect == '选项一') {
                        if (player.countCards('h') >= 2) {
                            await player.chooseToDiscard('h', 2, true);
                        }
                        if (target.countCards('h') >= 2) {
                            await target.chooseToDiscard('h', 2, true);
                        }
                    } else {
                        await player.draw(2);
                        await target.draw(2);
                    }
                },
                ai: {
                    shuiJing: true,
                    order: 4,
                    result: {
                        target: function (player, target) {
                            // if (target.countCards('h') > 4) return 1;
                            return -2;
                        },
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            lieDiMaiChong: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card) {
                    return get.xiBie(card) == 'lei' || get.xiBie(card) == 'di';
                },
                selectCard: 1,
                discard: true,
                selectTarget: 1,
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'lei' || get.xiBie(card) == 'di') > 0;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.side != player.side;
                },
                content: function () {
                    target.faShuDamage(1, player);
                },
                ai: {
                    order: 3,
                    result: {
                        target: function (target) {
                            return get.damageEffect(target, player, 1);
                        },
                    },
                },
                "_priority": 0,
            },
            lianLeiDiYu: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card) {
                    return (get.xiBie(card) === 'lei' || get.xiBie(card) === 'di') && get.xuanZeTongXiPai(card);  // 两张必须同系
                },
                position: "h",
                selectCard: 2,
                discard: true,
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'lei') >= 2 || player.countCards('h', card => get.xiBie(card) == 'di') >= 2;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.side != player.side;
                },
                selectTarget: 1,
                content: function () {
                    target.faShuDamage(2, player);
                },
                ai: {
                    order: 6,
                    result: {
                        target: function (player, target) {
                            return get.damageEffect(target, player, 2);
                        },
                    },
                },
                "_priority": 0,
            },
            shiXueZhiXin: {
                trigger: {
                    global: "chanShengShangHai",
                },
                filter: function (event, player) {
                    return !player.storage._shiXueUsed && event.faShu==true && player.canBiShaBaoShi() && event.source == player;
                },
                content: async function (event,trigger,player) {
                    await player.removeBiShaBaoShi();  // 消耗1颗宝石
                    await trigger.changeDamageNum(2);  //增加两点法术伤害
                    player.storage._shiXueUsed = true;
                },
                group: "shiXueZhiXin_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseBegin",
                        },
                        silent: true,
                        content: function () {
                            player.storage._shiXueUsed = false;
                        },
                        sub: true,
                        sourceSkill: "shiXueZhiXin",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                ai: {
                    baoShi: true,
                    effect: {
                        target: function (player, target) {
                            return get.damageEffect(target, player, 2);
                        },
                    },
                },
                "_priority": 0,
            },
            huanXiangChongJi: {
                enable: "gongJi",
                filter: function(event, player) {
                    // 手牌至少要有3张才能发动
                    return player.countCards('h') >= 3;
                },
                selectCard: 3,
                filterCard:function(card){
                    return true;
                },
                discard:true,
                selectTarget: 1,
                filterTarget: function(card, player, target){
                    return target.side != player.side;
                },
                content: async function(event, trigger, player) {
                    player.storage.hiddenCards = event.cards;
                    console.log(event.cards);
                    var target = event.target;
                    var options = ['翻开', '不翻开'];
                    var fankai = await target.chooseControl(['选项一', '选项二'])
                        .set('choiceList', options)
                        .set('prompt', '受到3点暗灭伤害，是否选择翻开暗置牌？<br>翻开对方的暗置牌，若为同系，对方额外选择一名队友+1宝石<br>若否，本次攻击无效且对方受到5点法术伤害，你+1治疗。')
                        .set('ai',function(){
                            //ai随机选择翻开和不翻开
                            var num=Math.random();
                            if(num>0.5) return "选项一";
                            else return "选项二";
                        }).forResult('control');
                    
                    event.effect = fankai;
                    if (event.effect == '选项一') {
                        // 选择翻开，先将暗置的牌展示出来
                        await player.showCards(player.storage.hiddenCards);
                        // 判断三同系
                        const xiBie = get.xiBie(player.storage.hiddenCards[0]);
                        if(player.storage.hiddenCards.every(card => get.xiBie(card) === xiBie)){
                            // 三同系，玩家选择一个队友加1宝石，正常结算三点暗灭伤害
                            var card={name:'anMie',xiBie:'an'};
                            await player.useCard(card,target).set('damageNum',3).set('action',true);
                            var xingshi = await player.chooseTarget(1,true,'选择一个队友加1宝石',true,function(card, player, target){
                                return player != target && target.side == player.side;
                            }).forResult();
                            var xingshi_target = xingshi.targets[0];
                            await xingshi_target.changeNengLiang('baoShi',1);
                        }else{
                            //否，伤害无效，玩家受到5点法术伤害，目标加1治疗
                            await player.faShuDamage(5,player);
                            await event.trigger("anZhiFail");
                            await target.changeZhiLiao(1);
                        }
                    } else {
                        // 不选择翻开，正常结算三点暗灭伤害
                        var card={name:'anMie',xiBie:'an'};
                        await player.useCard(card,target).set('damageNum',3).set('action',true);
                        await await event.set("source","huanXiangChongJi").set("target",target).trigger("anZhiSuccess");;
                    }
                },
                "_priority": 0,
            },
            xinLingFengBao: {
                type: "faShu",
                enable: "faShu",
                selectCard: 2,
                filterCard: function(card) {
                    return true;
                },
                filterTarget: function(card, player, target){
                    return target.side != player.side;
                },
                filter: function(event, player) {
                    // 手牌至少要有2张才能发动
                    return player.countCards('h') >= 2;
                },
                content: async function(event, trigger, player) {
                    player.storage.hiddenCards = event.cards;
                    var target = event.target;
                    var zhiliao = await player.chooseTarget(1,"选择任意角色+1治疗", true).forResult();
                    zhiliao.targets[0].changeZhiLiao(1,player);
                    var options = ['翻开', '不翻开'];
                    var fankai = await target.chooseControl(['选项一', '选项二'])
                        .set('choiceList', options)
                        .set('prompt', '受到1点法术伤害，是否选择翻开暗置牌？<br>翻开对方的暗置牌，若都为法术，本次法术伤害额外+1，对方额外为任意角色+1治疗<br>若否，本次法术无效且对方受到5点法术伤害，我方战绩区+1宝石。')
                        .set('ai',function(){
                            //ai随机选择翻开和不翻开
                            var num=Math.random();
                            if(num>0.5) return "选项一";
                            else return "选项二";
                        }).forResult('control');
                    
                    event.effect = fankai;
                    if (event.effect == '选项一') {
                        // 选择翻开，先将暗置的牌展示出来
                        await player.showCards(player.storage.hiddenCards);
                        // 判断是否都为法术
                        if(player.storage.hiddenCards.every(card => get.type(card) === 'faShu')){
                            // 都为法术，再选择一个角色加1治疗，结算2点法术伤害
                            target.faShuDamage(2,player);
                            var zhiliao = await player.chooseTarget(1,"额外选择任意角色+1治疗", true).forResult();
                            zhiliao.targets[0].changeZhiLiao(1,player);
                        }else{
                            //否，伤害无效，玩家受到5点法术伤害，目标战绩区加1宝石
                            await player.faShuDamage(5,player);
                            await event.trigger("anZhiFail");
                            await target.changeZhanJi('baoShi',1,target.side);
                        }
                    } else {
                        // 不选择翻开，结算1点法术伤害
                        target.faShuDamage(1,player);
                        await event.set("source","xinLingFengBao").set("target",target).trigger("anZhiSuccess");
                    }
                },
                "_priority": 0,
            },
            zhenShiHuanJue: {
                trigger: {
                    player: "anZhiFail",
                },
                filter: function(event, player) {
                    return !player.storage._huanJueUsed;
                },
                content: function() {
                    player.addGongJiOrFaShu();
                    player.storage._huanJueUsed = true;
                },
                group: "zhenShiHuanJue_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseBegin",
                        },
                        silent: true,
                        content: function () {
                            player.storage._huanJueUsed = false;
                        },
                        sub: true,
                        sourceSkill: "zhenShiHuanJue",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                "_priority": 0,
            },
            gaiBianShiJie: {
                trigger: {
                    player: "anZhiSuccess",
                },
                filter: function(event, player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    var trigger_name = event.getTrigger().name;
                    var target = event.getTrigger().target;
                    if(trigger_name === "huanXiangChongJi"){
                        var xingshi = await player.chooseTarget(1,true,'选择一个队友加1宝石',true,function(card, player, target){
                            return player != target && target.side == player.side;
                        }).forResult();
                        var xingshi_target = xingshi.targets[0];
                        await xingshi_target.changeNengLiang('baoShi',1);
                    }else if(trigger_name === "xinLingFengBao"){
                        target.faShuDamage(1,player);
                        var zhiliao = await player.chooseTarget(1,"额外选择任意角色+1治疗", true).forResult();
                        zhiliao.targets[0].changeZhiLiao(1,player);
                    }
                },
                "_priority": 0,
            },
            yuanGuJinZhi: {
                trigger:{
                    global: "gameStart"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    if (!player.storage.longZuFuXing_removed)
                        player.storage.longZuFuXing_removed = [];
                    await player.addZhiShiWu("longKuangMiSuo");
                    await player.addZhiShiWu("longMaiShuFu");
                    await player.addZhiShiWu("longYuFengYin");
                    await player.addZhiShiWu("yuLongJieJie");
                },
                "_priority": 0,
            },
            zhenLongJueXing: {
                trigger: {
                    global: ["changeShiQiAfter","heCheng"]
                },
                forced: true,
                filter:function(event,player){
                    // 四张全翻就无需再询问
                    if(player.hasZhiShiWu("baiWanLongYan") &&
                    player.hasZhiShiWu("longWangZhiLi") &&
                    player.hasZhiShiWu("longShenEnHui") &&
                    player.hasZhiShiWu("shengLongWeiYa")) return false;
                    // 改变士气增加判断是否我方士气下降
                    if(event.name === "changeShiQi") return player.side==event.side && event.num<0;
                    // 合杯则一定执行
                    else return true;
                },
                content: async function(event,trigger,player) {
                    var skillMap = {
                        "龙狂迷锁": {
                            id: "baiWanLongYan",
                            text: "龙狂迷锁=>百万龙炎:(摸0-2张牌，弃X张同系牌)对自己和任一对手各造成X点法术伤害"
                        },
                        "龙脉束缚": {
                            id: "longWangZhiLi",
                            text: "龙脉束缚=>龙王之力:(攻击命中后弃X张异系牌)本次伤害额外+X"
                        },
                        "龙语封印": {
                            id: "longShenEnHui",
                            text: "龙语封印=>龙神恩惠:(攻击行动结束后发动)额外获得1个法术行动"
                        },
                        "驭龙结界": {
                            id: "shengLongWeiYa",
                            text: "驭龙结界=>圣龙威压:你的攻击不能被应战，你也不能应战攻击"
                        }
                    };
                    var options = [];
                    var buttons = [];
                    for (var key in skillMap) {
                        if (!player.hasZhiShiWu(skillMap[key].id)) {
                            options.push(skillMap[key].text);
                            buttons.push(key);
                        }
                    }
                    var jinzhi = await player.chooseControl(buttons)
                        .set('choiceList', options)
                        .set('prompt', '翻转任意一张【禁制】牌')
                        .set('ai',function(){
                            //优先龙狂迷锁和龙脉束缚，其次龙语封印，最后驭龙结界
                            var ids = ["baiWanLongYan", "longWangZhiLi", "longShenEnHui", "shengLongWeiYa"];
                            for (var id of ids) {
                                if (!player.hasZhiShiWu(id)) {
                                    if(id == "baiWanLongYan") return "龙狂迷锁";
                                    if(id == "longWangZhiLi") return "龙脉束缚";
                                    if(id == "longShenEnHui") return "龙语封印";
                                    if(id == "shengLongWeiYa") return "驭龙结界";
                                }
                            }
                        }).forResult('control');
                    
                    if (jinzhi == '龙狂迷锁') {
                        await player.setZhiShiWu("longKuangMiSuo",0);
                        await player.setZhiShiWu("baiWanLongYan",1);
                    }else if(jinzhi == '龙脉束缚') {
                        await player.setZhiShiWu("longMaiShuFu",0);
                        await player.setZhiShiWu("longWangZhiLi",1);
                    }else if(jinzhi == '龙语封印') {
                        await player.setZhiShiWu("longYuFengYin",0);
                        await player.setZhiShiWu("longShenEnHui",1);
                    }else if(jinzhi == '驭龙结界') {
                        await player.setZhiShiWu("yuLongJieJie",0);
                        await player.setZhiShiWu("shengLongWeiYa",1);
                    }
                },
                group: "zhenLongJueXing_clear",
                subSkill: {
                    //回合结束强制翻回所有禁制牌
                    clear: {
                        trigger:{
                            player: "phaseEnd"
                        },
                        forced: true,
                        content: async function(event,trigger,player) {
                            if (!player.storage.longZuFuXing_removed.includes("baiWanLongYan")) {
                                await player.setZhiShiWu("baiWanLongYan",0);
                                await player.setZhiShiWu("longKuangMiSuo",1);
                            }
                            if (!player.storage.longZuFuXing_removed.includes("longWangZhiLi")) {
                                await player.setZhiShiWu("longWangZhiLi",0);
                                await player.setZhiShiWu("longMaiShuFu",1);
                            }
                            if (!player.storage.longZuFuXing_removed.includes("longShenEnHui")) {
                                await player.setZhiShiWu("longShenEnHui",0);
                                await player.setZhiShiWu("longYuFengYin",1);
                            }
                            if (!player.storage.longZuFuXing_removed.includes("shengLongWeiYa")) {
                                await player.setZhiShiWu("shengLongWeiYa",0);
                                await player.setZhiShiWu("yuLongJieJie",1);
                            }
                        },
                        silent: true,
                        sub: true,
                        sourceSkill: "zhenLongJueXing",
                        popup: false,
                        "_priority": 0,
                    }
                },
                "_priority": 0,
            },
            longHunShouHu: {
                trigger: {
                    player: "faShuEnd"
                },
                forced: true,
                content: function() {
                    player.changeZhiLiao(1);
                },
                "_priority": 0,
            },
            longShenEnHui: {
                intro:{
                    name:'龙神恩惠',
                    content:"<span class='tiaoJian'>(攻击行动结束后发动)</span>额外获得1个法术行动，<span class='greentext'>【龙语封印】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'extension/破晓/longShenEnHui.jpg',
                trigger:{
                    player: "gongJiEnd"
                },
                forced: true,
                filter: function(event, player) {
                    return player.hasZhiShiWu('longShenEnHui');
                },
                content: function() {
                    player.addFaShu();
                },
                "_priority": 0,
            },
            longWangZhiLi: {
                intro:{
                    name:'龙王之力',
                    content:"<span class='tiaoJian'>(攻击命中后弃X张异系牌)</span>本次伤害额外+X，<span class='greentext'>【龙脉束缚】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'extension/破晓/longWangZhiLi.jpg',
                trigger:{
                    player: "gongJiMingZhong"
                },
                filter: function(event, player) {
                    return player.hasZhiShiWu('longWangZhiLi') && player.countYiXiPai() >=2;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard([2,Infinity],'h', true, card => get.xuanZeYiXiPai(card))
                    .set('prompt',"攻击命中后弃X张异系牌,本次伤害额外+X")
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    await player.discard(event.cards).set('showCards',true);
                    await trigger.changeDamageNum(event.cards.length);
                },
                "_priority": 0,
            },
            shengLongWeiYa: {
                intro:{
                    name:'圣龙威压',
                    content:"你的攻击不能被应战，你也不能应战攻击，<span class='greentext'>【驭龙结界】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'extension/破晓/shengLongWeiYa.jpg',
                trigger:{
                    global: "gongJiShi"
                },
                forced: true,
                filter: function(event, player) {
                    if(!player.hasZhiShiWu('shengLongWeiYa')) return false;
                    return event.source==player || event.target==player;
                },
                content: function() {
                    trigger.wuFaYingZhan();
                },
                "_priority": 0,
            },
            baiWanLongYan: {
                intro:{
                    name:'百万龙炎',
                    content:"<span class='tiaoJian'>(摸0-2张牌，弃X张同系牌)</span>对自己和任一对手各造成X点法术伤害，<span class='greentext'>【龙狂迷锁】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'extension/破晓/baiWanLongYan.jpg',
                type: 'faShu',
                enable: 'faShu',
                filter: function(event, player) {
                    return player.hasZhiShiWu('baiWanLongYan');
                },
                content: async function(event,trigger,player) {
                    // 选择摸0-2张牌
                    var list=[];
                    for(var i=0;i<3;i++){
                        list.push(i);
                    }
                    var mopai_num = await player.chooseControl(list).set('prompt','选择摸0-2张牌').set('ai',function(){
                        if(player.countCards('h')<=4) return 2;
                        else if(player.countCards('h') == 5) return 1;
                        else return 0;
                    }).forResult('control');
                    await player.draw(mopai_num);
                    if(player.countTongXiPai()<2){
                        // 没有同系牌，直接结束
                        event.finish();
                    }
                    // 弃X张同系
                    var qiPai = await player.chooseCard([2,Infinity],'h', card => get.xuanZeTongXiPai(card))
                    .set('prompt',"弃X张同系牌,对自己和任一对手各造成X点法术伤害")
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                    // 各造成X点法术伤害
                    if(qiPai){
                        await player.discard(qiPai.cards).set('showCards',true);
                        var duishou = await player.chooseTarget(1,'选择任意对手，各造成X点法术伤害',true,function(card, player, target){
                                return player != target && target.side != player.side;
                        }).forResult();
                        var target = duishou.targets[0];
                        await target.faShuDamage(qiPai.cards.length,player);
                        await player.faShuDamage(qiPai.cards.length,player);
                    }
                },
                "_priority": 0,
            },
            longZuFuXing: {
                trigger: {
                    player: "phaseEnd"
                },
                filter: function(event, player) {
                    if (player.canBiShaBaoShi()) {
                        var ids = ["baiWanLongYan", "longWangZhiLi", "longShenEnHui", "shengLongWeiYa"];
                        for (var id of ids) {
                            if (player.hasZhiShiWu(id) && !player.storage.longZuFuXing_removed.includes(id)) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    var skillMap = {
                        "龙狂迷锁": {
                            id: "baiWanLongYan",
                            text: "龙狂迷锁=>百万龙炎:(摸0-2张牌，弃X张同系牌)对自己和任一对手各造成X点法术伤害"
                        },
                        "龙脉束缚": {
                            id: "longWangZhiLi",
                            text: "龙脉束缚=>龙王之力:(攻击命中后弃X张异系牌)本次伤害额外+X"
                        },
                        "龙语封印": {
                            id: "longShenEnHui",
                            text: "龙语封印=>龙神恩惠:(攻击行动结束后发动)额外获得1个法术行动"
                        },
                        "驭龙结界": {
                            id: "shengLongWeiYa",
                            text: "驭龙结界=>圣龙威压:你的攻击不能被应战，你也不能应战攻击"
                        }
                    };
                    var options = [];
                    var buttons = [];
                    for (var key in skillMap) {
                        if (player.hasZhiShiWu(skillMap[key].id) && !player.storage.longZuFuXing_removed.includes(skillMap[key].id)) {
                            options.push(skillMap[key].text);
                            buttons.push(key);
                        }
                    }
                    var toRemove = await player.chooseControl(buttons)
                    .set('choiceList', options)
                    .set('prompt', '选择一张【禁制】永久移除')
                    .set('ai', function(){
                        var ids = ["baiWanLongYan", "longWangZhiLi", "longShenEnHui", "shengLongWeiYa"];
                        for (var id of ids) {
                            if (player.hasZhiShiWu(id) && !player.storage.longZuFuXing_removed.includes(id)) {
                                if(id == "baiWanLongYan") return "龙狂迷锁";
                                if(id == "longWangZhiLi") return "龙脉束缚";
                                if(id == "longShenEnHui") return "龙语封印";
                                if(id == "shengLongWeiYa") return "驭龙结界";
                            }
                        }
                    }).forResult('control');
                    player.storage.longZuFuXing_removed.push(skillMap[toRemove].id);
                    lib.skill[skillMap[toRemove].id].intro.name = lib.skill[skillMap[toRemove].id].intro.name + "  <span class='hong'>【禁制】已永久移除</span>";
                },
                "_priority": 1,
            },
            longKuangMiSuo:{
                intro:{
                    name:'龙狂迷锁',
                    content:"<span class='tiaoJian'>(摸0-2张牌，弃X张同系牌)</span>对自己和任一对手各造成X点法术伤害，<span class='greentext'>【龙狂迷锁】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'extension/破晓/longKuangMiSuo.jpg'
            },
            longMaiShuFu:{
                intro:{
                    name:'龙脉束缚',
                    content:"<span class='tiaoJian'>(攻击命中后弃X张异系牌)</span>本次伤害额外+X，<span class='greentext'>【龙脉束缚】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'extension/破晓/longMaiShuFu.jpg'
            },
            longYuFengYin:{
                intro:{
                    name:'龙语封印',
                    content:"<span class='tiaoJian'>(攻击行动结束后发动)</span>额外获得1个法术行动，<span class='greentext'>【龙语封印】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'extension/破晓/longYuFengYin.jpg'
            },
            yuLongJieJie:{
                intro:{
                    name:'驭龙结界',
                    content:"你的攻击不能被应战，你也不能应战攻击，<span class='greentext'>【驭龙结界】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'extension/破晓/yuLongJieJie.jpg'
            },
            zhengYiZhuiJi: {
                trigger: {
                    global: "changeShiQiAfter"
                },
                forced: true,
                filter: function(event, player) {
                    if(event.getParent().name =="_heCheng_backup" && event.getParent().player==player) 
                        return true; //合杯必定掉对面士气，先触发
                    //正常打伤害的触发判定
                    if(event.source!=player) return false;  //改变士气的人不是玩家自己不发动
                    if(event.side==player.side) return false;    //改变自己方士气不发动
                    if(event.num>=0) return false;  //增加士气不发动
                    return player.storage._zhuiJi;
                },
                group: ["zhengYiZhuiJi_start","zhengYiZhuiJi_end"],
                subSkill: {
                    start: {
                        trigger: {
                            player: "phaseBegin"
                        },
                        silent: true,
                        content: function () {
                            player.storage._zhuiJi = true;
                        },
                        sub: true,
                        sourceSkill: "zhengYiZhuiJi",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                    end: {
                        trigger: {
                            player: "phaseEnd"
                        },
                        silent: true,
                        content: function () {
                            player.storage._zhuiJi = false;
                        },
                        sub: true,
                        sourceSkill: "zhengYiZhuiJi",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    }
                },
                content: function() {
                    player.insertPhase();
                },
                "_priority": 0
            },
            caiJueZhiXin: {
                trigger: {
                    global: "gameStart",
                    player: "changeXingBeiBegin"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    if(event.triggername === "gameStart"){
                        player.changeNengLiang("shuiJing",2)
                    }else if (event.triggername === "changeXingBeiBegin"){
                        trigger.cancel();
                    }
                },
                "_priority": 0

            },
            zhenLiCaiJue: {
                trigger: {
                    global: "zhiLiaoSheZhi"
                },
                forced: true,
                filter: function(event, player){
                    var damage_event = event.getParent("damage");   //获取造成此次治疗的伤害事件
                    return damage_event.source == player;   // 并判断伤害是否玩家产生
                },
                content: function(){
                    trigger.zhiLiaoLimit = 1;   // 限制治疗使用量为1
                },
                "_priority": 0
            },
            songZhongDaoFeng: {
                trigger: {
                    player: "gongJiBefore"
                },
                filter:function(event,player){
                    return player.canBiShaShuiJing() && !event.yingZhan;
                }, 
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    if(player.countCards('h') + 1 <= trigger.target.countCards('h')){
                        trigger.changeDamageNum(1);
                    }
                    if(player.countCards('h') + 1 >= trigger.target.countCards('h')){
                        trigger.wuFaYingZhan();
                    }
                },
                "_priority": 0
            },
            wuJinZhiRen: {
                type: "faShu",
                enable: "faShu",
                filter:function(event,player){
                    return player.canBiShaShuiJing() && (player.countCards('h',card => get.type(card)=="faShu")>=2 || player.countTongXiPai()>=3);
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    if(player.countCards('h',card => get.type(card)=="faShu")>=2 && player.countTongXiPai()>=3){
                        event.qiPaiWay = await player.chooseControl(["弃法术","弃同系"])
                        .set('prompt', '弃2张法术牌或3张同系牌')
                        .set('ai', function(){
                            return "弃同系";
                        }).forResult('control');
                    }else if (player.countCards('h',card => get.type(card)=="faShu")>=2){
                        event.qiPaiWay = "弃法术";
                    }else if (player.countTongXiPai()>=3){
                        event.qiPaiWay = "弃同系";
                    }
                    if(event.qiPaiWay == "弃法术"){
                        await player.chooseToDiscard(2,'h', "showCards", card => get.type(card)=="faShu")
                        .set('prompt',"弃2张法术牌")
                        .set('complexCard',true)
                        .set('ai',function(card){
                                return 1;
                        });
                    }else if (event.qiPaiWay == "弃同系") {
                        await player.chooseToDiscard(3,'h', "showCards", card => get.xuanZeTongXiPai(card))
                        .set('prompt',"弃3张同系牌")
                        .set('complexCard',true)
                        .set('ai',function(card){
                                return 1;
                        });
                    }
                    var duishou = await player.chooseTarget(1,'选择任意玩家，各造成2点法术伤害',true).forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(2,player);
                    await player.faShuDamage(2,player);
                },
                "_priority": 0
            },
            weiJianErSheng: {
                trigger:{
                    source: "gongJiWeiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.countCards('h',card => get.type(card)=='faShu') > 0;
                },
                async cost(event, trigger, player) {
                    console.log(event);
                    console.log(trigger);
                    event.result=await player.chooseCard('h',[1,Infinity],function(card){
                        return get.type(card) == 'faShu';
                    })
                    .set('prompt',get.prompt('weiJianErSheng'))
                    .set('prompt2',lib.translate.weiJianErSheng_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                content: async function(event,trigger,player) {
                    await player.discard(event.cards).set('showCards',true);
                    var choose = await player.chooseTarget(1,"选择除本次攻击的角色以外的另一角色造成X点伤害", true, function(card, player, target) {
                        return trigger.player != target && player.side !=target.side;
                    }).forResult();
                    await choose.targets[0].faShuDamage(event.cards.length,player);
                },
                "_priority": 0
            },
            duiJianErShi: {
                trigger:{
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.countTongXiPai() >=2;
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[2,Infinity],function(card){
                        return get.xuanZeTongXiPai(card);
                    })
                    .set('prompt',get.prompt('duiJianErShi'))
                    .set('prompt2',lib.translate.duiJianErShi_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                content: async function(event,trigger,player) {
                    await player.discard(event.cards).set('showCards',true);
                    var choose = await player.chooseTarget(1,"选择除本次攻击的角色以外的另一角色造成X点伤害", true, function(card, player, target) {
                        return trigger.target != target && player.side !=target.side;
                    }).forResult();
                    await choose.targets[0].faShuDamage(event.cards.length,player);
                },
                "_priority": 0
            },
            jianWuYiShi: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.canBiShaBaoShi();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    player.storage.jianWu = true;
                    await player.draw(3);
                    await player.addGongJi();
                },
                mod:{
                    maxHandcard:function(player,num){
                        if(player.storage.jianWu) return num+3;
                    },
                    aiOrder:function(player,card,num){
                        if(get.type(card)=='gongJi') return num+1;
                    }
                },
                group:['jianWuYiShi_clear'],
                subSkill:{
                    clear:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            return player.storage.jianWu;
                        },
                        content:function(){
                            player.storage.jianWu = false;
                            if(player.countCards('h') > player.getHandcardLimit()){
                                player.qiPai();
                            }
                        },
                        "_priority": 1
                    },
                },
                ai:{
                    baoShi:true,
                },
                "_priority": 0
            },
            bingShuangLingYu: {
                trigger: {
                    global: "gameStart"
                },
                forced: true,
                content: function() {
                    var targets = game.filterPlayer(p => p.side == player.side);
                    for (let i = 0; i < targets.length; i++) {
                        targets[i].changeZhiLiao(1, player);
                    }
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+1;
                    }
                },
                "_priority": 0
            },
            shuiJingDaoQiang: {
                trigger: {
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.zhiLiao > 0;
                },
                content: async function(event,trigger,player){
                    // 选择消耗的治疗量
                    var list=[];
                    for(var i=0;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    var zhiLiao_num = await player.chooseControl(list).set('prompt','选择移除X点治疗,额外造成X点法术伤害').set('ai',function(){
                        return player.zhiLiao;
                    }).forResult('control');
                    await player.changeZhiLiao(zhiLiao_num*(-1));
                    await trigger.target.faShuDamage(zhiLiao_num,player);
                },
                "_priority": 0
            },
            lingFengZhuFu: {
                trigger: {
                    source: "gongJiWeiMingZhong"
                },
                forced: true,
                filter: function(event,player) {
                    return ['feng','shui'].includes(get.xiBie(event.card));
                },
                content: async function(event,trigger,player){
                    var zhiliao = await player.chooseTarget(1,"攻击未命中，选择任意角色+1治疗，若其没有治疗，额外+1治疗", true).forResult();
                    if(zhiliao.targets[0].zhiLiao == 0) {
                        await zhiliao.targets[0].changeZhiLiao(2,player);
                    }else{
                        await zhiliao.targets[0].changeZhiLiao(1,player);
                    }
                },
                "_priority": 0
            },
            shuangYuZhiHuan: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    var targets = game.filterPlayer(p => p.side == player.side && p.zhiLiao == 0);
                    for (let i = 0; i < targets.length; i++) {
                        await targets[i].changeZhiLiao(2, player);
                    }
                    await player.addGongJiOrFaShu();
                },
                "_priority": 0
            },
            huJiaoZhiXin: {
                trigger: {
                    source: "gongJiMingZhongAfter"
                },
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: function() {
                    player.changeZhiLiao(1);
                },
                "_priority": 0
            },
            wuJinZhuiJi: {
                trigger: {
                    player: "gongJiAfter"
                },
                filter: function(event,player) {
                    return player.zhiLiao > 0;
                },
                content: async function(event,trigger,player) {
                    await player.changeZhiLiao(-1);
                    await player.addGongJi();
                },
                "_priority": 1
            },
            jingZhunJuJi: {
                trigger: {
                    player: "gongJiAfter"
                },
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    await player.addSkill('jingZhunJuJi_wuFaYingZhan');
                    await player.addGongJi();
                },
                subSkill:{
                    wuFaYingZhan:{
                        trigger:{player:'gongJiSheZhi'},
                        direct:true,
                        filter:function(event,player){
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            'step 0'
                            trigger.wuFaYingZhan();
                            'step 1'
                            player.removeSkill('jingZhunJuJi_wuFaYingZhan');
                        }
                    }
                },
                "_priority": 0
            },
            zhiYueZhiHuan: {
                trigger: {
                    source: "gongJiBefore"
                },
                filter: function(event,player){
                    return player.countTongXiPai() >=2;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard(2,'h', true, card => get.xuanZeTongXiPai(card))
                    .set('prompt',"弃2张同系牌")
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                },
                content: function() {
                    player.discard(event.cards).set('showCards',true);
                    player.storage._zhiYue = true;
                },
                subSkill:{
                    weiMingZhong: {
                        trigger: {
                            source: "gongJiWeiMingZhong"
                        },
                        filter: function(event,player) {
                            return player.storage._zhiYue;
                        },
                        content: async function(event,trigger,player) {
                            await player.faShuDamage(4);
                            player.storage._zhiYue = false;
                        }
                    }
                },
                "_priority": 0
            },
            sheShenZhiDao: {
                trigger: {
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    // 选择摸2-4张牌
                    var list=[];
                    for(var i=2;i<=4;i++){
                        list.push(i);
                    }
                    var mopai_num = await player.chooseControl(list).set('prompt','摸2-4张牌，本次攻击伤害额外+X-1').set('ai',function(){
                        if(player.countCards('h')<=2) return 4;
                        else if(player.countCards('h') == 3) return 3;
                        else return 2;
                    }).forResult('control');
                    await player.draw(mopai_num);
                    await trigger.changeDamageNum(mopai_num-1);
                },
                "_priority": 0
            },
            jianRenZhiZhi: {
                trigger: {
                    player: "shouDaoShangHai"
                },
                filter: function(event,player) {
                    return player.canBiShaBaoShi() && event.faShu;
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    trigger.num = 0;
                },
                "_priority": 0
            },
        },
        translate: {
            zhuiFengJi: "[被动]追风技",
            "zhuiFengJi_info": "你使用风神斩攻击时对方不能应战。",
            zhuRiJian: "[法术]逐日箭",
            "zhuRiJian_info": "<span class='tiaoJian'>(弃一张火系牌[展示])</span>对一名对手造成2点法术伤害③。",
            lingDongZhiWu: "[响应]灵动之舞",
            "lingDongZhiWu_info": "[水晶] [攻击行动]后发动，你额外获得一个[法术行动]。",
            zhanPuWeiLai: "[被动]占卜未来",
            "zhanPuWeiLai_info": "回合开始时，将2张牌库顶的牌放置在你的角色旁成为预兆，回合结束后弃置所有预兆。",
            lieHuoFenShen: "[被动]烈焰焚身",
            "lieHuoFenShen_info": "你的主动攻击伤害额外+X(X为火系预兆总数量)。",
            hanBingHuTi: "[被动]寒冰护体",
            "hanBingHuTi_info": "每翻开1个水系预兆，你立刻为任意一名角色+1治疗。",
            leiTingZhiNu: "[被动]雷霆之怒",
            "leiTingZhiNu_info": "你的回合结束时对任一对手造成X点法术伤害(X为雷系、光系和暗系预兆的总数量)。",
            guangYingJiaoCuo: "[被动]光影交错",
            "guangYingJiaoCuo_info": "每翻开1个光系或暗系预兆，你可以额外翻开1张牌作为预兆。",
            daYuYanShu: "[法术]大预言术",
            "daYuYanShu_info": "[宝石]将额外2张牌库顶的牌放置在你的角色旁成为预兆，你额外获得1个[攻击行动]或[法术行动]。",
            jianta: "[被动]践踏",
            "jianta_info": "你的所有攻击伤害额外+1。",
            zhuixing: "[响应]坠星",
            "zhuixing_info": "[水晶]<span class='tiaoJian'>(攻击前发动)</span>本次攻击对方不能应战。",
            zhuiYingJi: "[响应]追影击",
            "zhuiYingJi_info": "<span class='tiaoJian'>(主动攻击行动后发动)</span>你额外获得1个攻击行动，但只能攻击本回合主动攻击过的对手，本技能一回合只能发动一次。",
            tiGu: "[响应]剔骨",
            "tiGu_info": "[宝石]<span class='tiaoJian'>(攻击命中后发动)</span>本次攻击伤害额外+2，本技能一回合只能发动一次。",
            shengGuangShanYao: "[法术]圣光闪耀",
            "shengGuangShanYao_info": "<span class='tiaoJian'>(弃1张法术牌)</span>任意分配3点治疗给场上角色。",
            jiuShu: "[法术]救赎",
            "jiuShu_info": "<span class='tiaoJian'>(摸1张牌)</span>你和一名队友各+1治疗。",
            shenShengCaiJue: "[法术]神圣裁决",
            "shenShengCaiJue_info": "[水晶]你和任意一名角色各弃2张牌或各摸2张牌。",
            tanLanZhiXin: "[法术]贪婪之心",
            "tanLanZhiXin_info": "<span class='tiaoJian'>(弃2张同系牌)</span>指定一名对手弃1张暗灭或圣光，若他未弃置，则对他造成2点法术伤害。",
            wanWuYanMie: "[法术]万物湮灭",
            "wanWuYanMie_info": "[宝石]对所有对手各造成2点法术伤害。",
            lieDiMaiChong: "[法术]裂地脉冲",
            "lieDiMaiChong_info": "<span class='tiaoJian'>(弃1张雷系或地系牌)</span>对一名对手造成1点法术伤害。",
            lianLeiDiYu: "[法术]炼雷地狱",
            "lianLeiDiYu_info": "<span class='tiaoJian'>(弃2张雷系或地系牌)</span>对一名对手造成2点法术伤害。",
            shiXueZhiXin: "[响应]嗜血之心",
            "shiXueZhiXin_info": "[宝石]由你造成的本次法术伤害额外+2。",
            huanXiangChongJi: "[响应]幻象冲击",
            "huanXiangChongJi_info": "<span class='tiaoJian'>(主动攻击时暗置三张牌)</span>视为一次3点伤害的暗灭攻击，对方可选择翻开暗置的牌，若为同系，你额外选择一名队友+1宝石，若否，本次攻击无效且你受到5点法术伤害，被攻击的对手+1治疗。",
            xinLingFengBao: "[法术]心灵风暴",
            "xinLingFengBao_info": "<span class='tiaoJian'>(暗置两张牌)</span>指定对一名敌方玩家造成1点法术伤害，为任意角色+1治疗，对方可选择翻开暗置的两张牌，若都为法术牌，本次法术伤害额外+1，你额外为任意角色+1治疗，若否，本次法术无效且你受到5点法术伤害，对方战绩区+1宝石。",
            zhenShiHuanJue: "[响应]真实幻觉",
            "zhenShiHuanJue_info": "<span class='tiaoJian'>(若你因【幻象冲击】或【心灵风暴】受到法术伤害)</span>你额外获得1个攻击或法术行动，本技能一回合只能发动一次。",
            gaiBianShiJie: "[响应]改变世界",
            "gaiBianShiJie_info": "[水晶]<span class='tiaoJian'>(若你使用【幻象冲击】或【心灵风暴】后对方不选择翻开暗置牌)</span>你发动翻开暗置牌成功的额外效果。",
            yuanGuJinZhi: "[被动]远古禁制",
            "yuanGuJinZhi_info": "回合开始时你拥有<span class='greentext'>【龙语封印】</span>，<span class='greentext'>【驭龙结界】</span>，<span class='greentext'>【龙狂迷锁】</span>，<span class='greentext'>【龙脉束缚】</span>4种<span class='hong'>【禁制】</span>。",
            zhenLongJueXing: "[被动]真龙觉醒",
            "zhenLongJueXing_info": "满足以下条件时，翻转任意1张<span class='hong'>【禁制】</span>牌，在你的回合结束时，强制重新翻回所有<span class='hong'>【禁制】</span>牌。<br>1.我方士气下降时。<br>2.场上有星杯合成时。",
            longHunShouHu: "[被动]龙魂守护",
            "longHunShouHu_info": "<span class='tiaoJian'>(法术行动结束后发动)</span>你+1治疗。",
            longShenEnHui: "(专)[被动]龙神恩惠",
            longShenEnHui_xiaoGuo: "龙神恩惠",
            "longShenEnHui_info": "<span class='tiaoJian'>(攻击行动结束后发动)</span>额外获得1个法术行动，<span class='greentext'>【龙语封印】</span>存在时不能发动该技能。",
            longWangZhiLi: "(专)[响应]龙王之力",
            longWangZhiLi_xiaoGuo: "龙王之力",
            "longWangZhiLi_info": "<span class='tiaoJian'>(攻击命中后弃X张异系牌)</span>本次伤害额外+X，<span class='greentext'>【龙脉束缚】</span>存在时不能发动该技能。",
            shengLongWeiYa: "(专)[被动]圣龙威压",
            shengLongWeiYa_xiaoGuo: "圣龙威压",
            "shengLongWeiYa_info": "你的攻击不能被应战，你也不能应战攻击，<span class='greentext'>【驭龙结界】</span>存在时不能发动该技能。",
            baiWanLongYan: "(专)[法术]百万龙炎",
            baiWanLongYan_xiaoGuo: "百万龙炎",
            "baiWanLongYan_info": "<span class='tiaoJian'>(摸0-2张牌，弃X张同系牌)</span>对自己和任一对手各造成X点法术伤害，<span class='greentext'>【龙狂迷锁】</span>存在时不能发动该技能。",
            longZuFuXing: "[响应]龙族复兴",
            "longZuFuXing_info": "[宝石]<span class='tiaoJian'>(回合结束翻回任一<span class='hong'>【禁制】</span>时发动)</span>该<span class='hong'>【禁制】</span>永久移除，不再受到真龙觉醒的影响，回合限定。",
            longKuangMiSuo: "龙狂迷锁",
            longMaiShuFu: "龙脉束缚",
            longYuFengYin: "龙语封印",
            yuLongJieJie: "驭龙结界",
            zhengYiZhuiJi: "[被动]正义追击",
            "zhengYiZhuiJi_info": "若在你的回合造成对方士气下降，回合结束后你额外获得一个回合。",
            caiJueZhiXin: "[被动]裁决之心",
            "caiJueZhiXin_info": "游戏开始时你获得2水晶，你执行【合成】时不会增加星杯。",
            zhenLiCaiJue: "[被动]真理裁决",
            "zhenLiCaiJue_info": "你造成的所有伤害只能被最多1点治疗抵御。",
            songZhongDaoFeng: "[响应]送终刀锋",
            "songZhongDaoFeng_info": "[水晶]<span class='tiaoJian'>(主动攻击前发动)</span>若你的手牌数小于等于对方的手牌数，则本次攻击伤害额外+1，若你的手牌数大于等于对方的手牌数，则本次攻击不能被应战。",
            wuJinZhiRen: "[法术]无尽之刃",
            "wuJinZhiRen_info": "[水晶]<span class='tiaoJian'>(弃2张法术牌或3张同系牌)</span>对任意玩家和自己造成2点法术伤害。",
            weiJianErSheng: "[响应]为剑而生",
            "weiJianErSheng_info": "<span class='tiaoJian'>(主动攻击未命中时发动，弃X张法术牌)</span>对除本次攻击的角色以外的另一角色造成X点法术伤害。",
            duiJianErShi: "[响应]对剑而誓",
            "duiJianErShi_info": "<span class='tiaoJian'>(主动攻击命中时发动，弃X张同系牌)</span>对除本次攻击的角色以外的另一角色造成X点法术伤害。",
            jianWuYiShi: "[法术]剑舞仪式",
            "jianWuYiShi_info": "[宝石]你的手牌上限+3直到回合结束，你摸3张牌，你额外获得1个攻击行动。",
            bingShuangLingYu: "[被动]冰霜领域",
            "bingShuangLingYu_info": "你的治疗上限+1，游戏开始时本方所有角色+1治疗。",
            shuiJingDaoQiang: "[响应]水晶刀墙",
            "shuiJingDaoQiang_info": "<span class='tiaoJian'>(主动攻击命中时，移除你的X点治疗)</span>对攻击的角色造成额外X点法术伤害。",
            lingFengZhuFu: "[被动]凛风祝福",
            "lingFengZhuFu_info": "<span class='tiaoJian'>(你的风系或水系攻击未命中时)</span>为任一角色+1治疗，若他没有治疗，则额外+1治疗。",
            shuangYuZhiHuan: "[法术]霜语之环",
            "shuangYuZhiHuan_info": "[水晶]为本方所有没有治疗的角色+2治疗，额外获得1个攻击或法术行动。",
            huJiaoZhiXin: "[响应]护教之心",
            "huJiaoZhiXin_info": "<span class='tiaoJian'>(主动攻击命中后)</span>你+1治疗。",
            wuJinZhuiJi: "[响应]无尽追击",
            "wuJinZhuiJi_info": "<span class='tiaoJian'>(攻击行动结束后，移除你的1治疗)</span>额外+1攻击行动。",
            jingZhunJuJi: "[响应]精准射击",
            "jingZhunJuJi_info": "[水晶]<span class='tiaoJian'>(攻击行动结束后)</span>额外+1攻击行动，本次攻击无法应战。",
            zhiYueZhiHuan: "[响应]制约之环",
            "zhiYueZhiHuan_info": "<span class='tiaoJian'>(攻击前发动，弃2张同系牌)</span>若本次攻击未命中，你对自己造成4点法术伤害③",
            sheShenZhiDao: "[响应]舍身之道",
            "sheShenZhiDao_info": "<span class='tiaoJian'>(主动攻击命中后发动)</span>摸X张牌，本次攻击伤害额外+(X-1)。(2≤X≤4)",
            jianRenZhiZhi: "[响应]坚忍之志",
            "jianRenZhiZhi_info": "[宝石]<span class='tiaoJian'>(受到法术伤害时)</span>本次法术伤害数值为0。",
        },
    },
    intro: "星杯传说：破晓ver1.4。增加星杯传说破晓角色。bug反馈：aabbcczhy@163.com",
    author: "LerU丶",
    diskURL: "",
    forumURL: "",
    version: "1.4",
},files:{"character":["youXia.jpg","zhanXingJia.jpg","tianmaqishi.jpg","shengtangcike.jpg","dasiji.jpg","lianjinshushi.jpg","xuetianshi.jpg","xinlingsushi.jpg","zhenLongNvWang.jpg","jianwuzhe.jpg","caijuezhe.jpg"],"card":["longKuangMiSuo.jpg","longMaiShuFu.jpg","longYuFengYin.jpg","yuLongJieJie.jpg","baiWanLongYan.jpg","longWangZhiLi.jpg","longShenEnHui.jpg","shengLongWeiYa.jpg","shuangxuegongzhu.jpg","shouwangzhe.jpg","wudoujia.jpg"],"skill":[],"audio":[]},connect:true} 
});