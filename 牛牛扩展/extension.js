game.import("extension", function(lib, game, ui, get, ai, _status) {
    return {
        "name": "bigcowcow",
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
                    "youLa": [
                        null,
                        "jiGroup",
                        4,
                        [
                            "lengKuZhiXin",
                            "ningLangZhiGuangJian",
                            "guangJiangZhiJian",
                            "chaoJuanBingXiao",
                            "bingChaoDeWoXuan",
                            "fuChou",
                        ],
                        [
                            "des:生于旧日宗室，身负罪恶血脉之人，的确需要独特的处世技巧，才能在偏见的高墙下安然行走。当然，这并不妨碍她与家族决裂，作为卓越的“浪花骑士”，在外游猎蒙德的敌人，完成她那意义独特的“复仇”。",
                            "ext:bigcowcow/youLa.jpg",
                            "die:ext:bigcowcow/audio/die/youLa.mp3",
                        ],
                    ],
                    "heKeTuo": [
                        null,
                        "jiGroup",
                        3,
                        [
                            "jieShi",
                            "lianHuanTuCi",
                            "hengQiangJiaShi",
                            "poZhenHuiQiang",
                            "qiangShi",
                        ],
                        [
                            "des:赫克托曾是帝国边境军的枪术教官。比起追逐速度，他更擅长等待破绽，借敌我攻势以长枪反制。",
                            "ext:bigcowcow/huiFengQiangShi.jpg",
                        ],
                    ],
                    "shiDiFu": [
                        null,
                        "huanGroup",
                        5,
                        [
                            "shengCunQiDian",
                            "caiJi",
                            "gongZuoTai",
                            "zhanDouFuMo",
                            "jingYanXiuBu",
                            "shiDiFuSuCai",
                            "muJian",
                            "jinJian",
                            "shiJian",
                            "tieJian",
                            "zuanShiJian",
                            "xiaJieHeJinJian",
                        ],
                        [
                            "des:来自方块世界的冒险家。史蒂夫能在战斗中采集素材、锻造武器，并通过附魔赋予攻击不同效果。",
                            "ext:bigcowcow/steve.jpg",
                        ],
                    ],
                    "tongGuHeRen": [
                        null,
                        "jiGroup",
                        4,
                        [
                            "fengBiZhe",
                            "erDaoLiu",
                            "yinSuChongJi",
                            "siFangZhan",
                            "xingBaoQiLiuZhan",
                            "lianJi",
                        ],
                        [
                            "des:以连续主动攻击积累连击的黑衣剑士。桐谷和人会在连击达到上限后进入二刀流，并以星爆气流斩终结本回合的追加攻势。",
                            "ext:bigcowcow/tongGuHeRen.jpg",
                        ],
                    ],
                    "zhaoFuQueJi": [
                        null,
                        "yongGroup",
                        4,
                        [
                            "baoPaiZhiShi",
                            "duanYaoJiuMiao",
                            "liZhiMiao",
                            "duiDuiHuMiao",
                            "haiDiLaoYueMiao",
                            "yiManShiJianMiao",
                            "miaoYun",
                            "yiJiBaoPai",
                        ],
                        [
                            "des:以公开宝牌引导牌势的招福雀姬。一姬会积累喵运，在断幺九、立直与役满之间不断更换宝牌并放大同系牌的收益。",
                            "ext:bigcowcow/yiJi.jpg",
                        ],
                    ],
                    "xiaoYan": [
                        null,
                        "jiGroup",
                        5,
                        [
                            "moQiShaoNianQiong",
                            "fenJue",
                            "baJiBeng",
                            "fenJueLianHua",
                            "tianHuoSanXuanBian",
                            "foNuHuoLian",
                            "xiaoYanDouQi",
                            "xiaoYanYiHuoManager",
                        ],
                        [
                            "des:以斗气炼化三种异火的炎帝。萧炎会在逆境中积蓄斗气，以暗劲延后爆发伤害，并通过天火三玄变与佛怒火莲释放异火的组合力量。",
                            "ext:bigcowcow/xiaoYan.jpg",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "bigcowcow": "牛牛扩展",
                    "youLa": "优菈",
                    "heKeTuo": "赫克托",
                    "shiDiFu": "史蒂夫",
                    "tongGuHeRen": "桐谷和人",
                    "zhaoFuQueJi": "一姬",
                    "xiaoYan": "萧炎",
                },
            },
            "card": {
                "card": {
                    "xiaoYanQingLianDiXinHuoKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:bigcowcow/mark_qingLianDiXinHuo.png",
                    },
                    "xiaoYanAnDanQingLianDiXinHuoKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:bigcowcow/mark_anDanQingLianDiXinHuo.png",
                    },
                    "xiaoYanYunLuoXinYanKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:bigcowcow/mark_yunLuoXinYan.png",
                    },
                    "xiaoYanAnDanYunLuoXinYanKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:bigcowcow/mark_anDanYunLuoXinYan.png",
                    },
                    "xiaoYanGuLingLengHuoKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:bigcowcow/mark_guLingLengHuo.png",
                    },
                    "xiaoYanAnDanGuLingLengHuoKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:bigcowcow/mark_anDanGuLingLengHuo.png",
                    },
                },
                "translate": {
                    "xiaoYanQingLianDiXinHuoKa": "(专)【青莲地心火】",
                    "xiaoYanQingLianDiXinHuoKa_info": "明亮面拥有响应【地火焚身】：你对目标造成攻击伤害后⑤，对该目标额外造成1点法术伤害③。",
                    "xiaoYanAnDanQingLianDiXinHuoKa": "(专)【黯淡的青莲地心火】",
                    "xiaoYanAnDanQingLianDiXinHuoKa_info": "黯淡面。萧炎回合开始时可通过【焚决】将此卡翻至明亮面。",
                    "xiaoYanYunLuoXinYanKa": "(专)【陨落心炎】",
                    "xiaoYanYunLuoXinYanKa_info": "明亮面拥有响应【心火重燃】：你执行【特殊行动】后，必须选择一项：+1【斗气】；或将另一张处于黯淡面的【异火】翻至明亮面。",
                    "xiaoYanAnDanYunLuoXinYanKa": "(专)【黯淡的陨落心炎】",
                    "xiaoYanAnDanYunLuoXinYanKa_info": "黯淡面。萧炎回合开始时可通过【焚决】将此卡翻至明亮面。",
                    "xiaoYanGuLingLengHuoKa": "(专)【骨灵冷火】",
                    "xiaoYanGuLingLengHuoKa_info": "明亮面拥有响应【冷火灼魂】：你对另一名目标造成正数实际法术伤害后⑤，对该目标额外造成1点法术伤害③。你对自己造成的法术伤害不能触发此技能。",
                    "xiaoYanAnDanGuLingLengHuoKa": "(专)【黯淡的骨灵冷火】",
                    "xiaoYanAnDanGuLingLengHuoKa_info": "黯淡面。萧炎回合开始时可通过【焚决】将此卡翻至明亮面。",
                },
                "list": [],
            },
            "skill": {
                "skill": {
                    "duanYaoJiuZhuangTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "断",
                        "intro": {
                            "name": "断幺九",
                            "content": "手牌数不少于3，且没有【圣光】【暗灭】【圣盾】【虚弱】【中毒】。",
                        },
                    },
                    "lengKuZhiXin": {
                        "trigger": {
                            "player": "gongJiShi",
                        },
                        "forced": true,
                        "filter": function(event,player){
                    return !event.yingZhan&&event.target.hasExpansions('_shengDun');
                },
                        "content": function(){
                    'step 0'
                    trigger.wuFaShengDun();
                },
                        "_priority": 0,
                    },
                    "ningLangZhiGuangJian": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event,player){
                    if(event.ningLangZhiGuangJian==false) return false;
                    return true;
                },
                        "content": function(){
                    player.addZhiShiWu('fuChou');
                },
                        "_priority": 0,
                    },
                    "guangJiangZhiJian": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "filter": function(event,player){

                    return player.countZhiShiWu('fuChou')>=2&&event.yingZhan!=true;
                },
                        "logTarget": "target",
                        "cost": async function cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',1,function(card,player){
                        if(get.xiBie(card)=='feng') {
                            return player.countCards('h') >= 2;
                        }
                        return true;
                    })
                    .set('prompt',get.prompt(event.skill))
                    .set('prompt2',lib.translate[event.skill+'_info'])
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                        "content": function(){
                    player.removeZhiShiWu('fuChou',2);
                    player.discard(event.cards).set('showCards',true);
                    switch(get.xiBie(event.cards)){
                                case 'huo':
                                    player.logSkill('guangJiangZhiJian_huo');
                                    trigger.changeDamageNum(1);
                                    break;
                                case 'feng':
                                    trigger.changeDamageNum(-1);
                                    player.addTempSkill('guangJiangZhiJian_feng');
                                    player.storage.guangJiangZhiJian_feng=true;
                                    break;
                                case 'di':
                                    player.addTempSkill('guangJiangZhiJian_di');
                                    player.storage.guangJiangZhiJian_di=true;
                                    break;
                            }
                },
                        "group": [
                            "guangJiangZhiJian_di",
                            "guangJiangZhiJian_feng",
                        ],
                        "subSkill": {
                            "feng": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "direct": true,
                                "filter": function(event,player){
                            if(player.storage.guangJiangZhiJian_feng==true) return true;
                            return false;
                        },
                                "content": async function(event,trigger,player){
                            var result = await player.chooseToDiscard(
                                1,
                                "h",
                                true
                            ).forResult();
                            player.storage.guangJiangZhiJian_feng=false;
                            if(!result.bool) return;
                            if(!trigger.oriTarget ||
                                !player.canUse('anMie',trigger.oriTarget)) {
                                return;
                            }
                            await player.useCard(
                                {name: 'anMie', xiBie: 'an'},
                                trigger.oriTarget
                            );
                        },
                                "sub": true,
                                "sourceSkill": "guangJiangZhiJian",
                                "_priority": 0,
                            },
                            "di": {
                                "trigger": {
                                    "source": "zaoChengShangHai",
                                },
                                "filter": function(event,player){
                            if(player.storage.guangJiangZhiJian_di==true) return !event.faShu&&!event.yingZhan;;
                            return false;
                        },
                                "direct": true,
                                "content": function(){
                            'step 0'
                            event.targets=game.filterPlayer(function(current){
                                if(current.side==player.side) return false;// 只能选择对手
                                if(current == trigger.player) return false; // 只能选择原目标之外的对手
                                return true;
                            });
                            var damage=trigger.num-1;
                            for(var i=0;i<event.targets.length;i++){
                                        event.targets[i].faShuDamage(damage,player);
                            }
                            player.storage.guangJiangZhiJian_di=false;

                        },
                                "sub": true,
                                "sourceSkill": "guangJiangZhiJian",
                                "_priority": 0,
                            },
                        },
                        "_priority": 0,
                    },
                    "chaoJuanBingXiao": {
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "usable": 1,
                        "filter": function(event,player){
                    if(player.countZhiShiWu('fuChou')<1 ||
                        event.yingZhan==true ||
                        !event.oriTarget) {
                        return false;
                    }
                    return player.countCards('h',function(card){
                        return get.type(card)=='gongJi' &&
                            player.canUse(card,event.oriTarget);
                    }) > 0;
                },
                        "cost": async function cost(event,trigger,player){
                    var cards=player.getCards('h');
                    var result=await player.chooseCardButton(cards,'是否发动【潮卷冰削】，选择一张攻击牌，对该角色再进行一次主动攻击')
                        .set('filterButton',function(button){
                            var player=_status.event.player;
                            var target=_status.event.target;
                            return get.type(button.link)=='gongJi' &&
                                player.canUse(button.link,target);
                        })
                        .set('target',trigger.oriTarget)
                        .set('ai',function(button){
                            if(get.type(button.link)=='gongJi') return 1;
                            return 0;
                        }).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                        "content": async function(event,trigger,player){
                    await player.removeZhiShiWu('fuChou');
                    var card=event.cost_data[0];
                    if(!card || !trigger.oriTarget ||
                        !player.canUse(card,trigger.oriTarget)) {
                        return;
                    }
                    await player.useCard(card,trigger.oriTarget)
                        .set('chaoJuanBingXiao',true)
                        .set('extraXingDongType','gongJi')
                        .set('ningLangZhiGuangJian',false);
                },
                        "group": [
                            "chaoJuanBingXiao_zhuiJi",
                        ],
                        "subSkill": {
                            "zhuiJi": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "direct": true,
                                "filter": function(event,player){
                            return event.chaoJuanBingXiao==true;
                        },
                                "content": function(){
                            trigger.changeDamageNum(+1);
                        },
                                "sub": true,
                                "sourceSkill": "chaoJuanBingXiao",
                                "_priority": 0,
                            },
                        },
                        "check": function(event,player){
                    if(player.countZhiShiWu('fuChou')>=2) return true;
                    if(player.countCards('h',card=>get.xiBie(card)=='an')>0) return true;

                    if(player.countCards('h')+2>player.getHandcardLimit()) return false;
                    else return true;
                },
                        "_priority": 0,
                    },
                    "bingChaoDeWoXuan": {
                        "trigger": {
                            "player": "gongJiBefore",
                        },
                        "filter": function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    return event.yingZhan!=true;
                },
                        "content": function(){
                    player.removeBiShaShuiJing();
                    player.addZhiShiWu('fuChou');
                    var num=player.getHandcardLimit();
                    player.drawTo(num);
                    trigger.wuFaYingZhan();
                },
                        "check": function(event,player){
                    if(get.xiBie(event.card)=='an') return false;
                    var target=event.targets[0];
                    if(!target || target.side == player.side) return false;
                    var zhanJi=get.zhanJi(player.side);
                    var damage = Math.max(1, event.num || 2);
                    var score = get.damageEffect2(target, player, damage);
                    var drawGain = Math.max(
                        0,
                        player.getHandcardLimit() - player.countCards('h')
                    );
                    score += Math.min(1.5, drawGain * 0.35);
                    if(zhanJi.length < game.zhanJiMax) score += 1;
                    var xiBie = get.xiBie(event.card);
                    var mayRespond = target.countCards('h', function(card) {
                        return get.type(card, target) == 'gongJi' &&
                            (get.xiBie(card) == xiBie ||
                                get.xiBie(card) == 'an');
                    }) > 0;
                    if(mayRespond) score += 1;
                    return score > 1.25;
                },
                        "ai": {
                            "baoShi": true,
                        },
                        "_priority": 0,
                    },
                    "fuChou": {
                        "intro": {
                            "name": "复仇",
                            "content": "mark",
                            "max": 4,
                        },
                        "onremove": "storage",
                        "markimage": "extension/bigcowcow/mark_fuChou.png",
                        "_priority": 0,
                    },
                    "jieShi": {
                        "trigger": {
                            "player": "gongJiShi",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return event.target && event.target.hasJiChuXiaoGuo &&
                        event.target.hasJiChuXiaoGuo('_shengDun');
                },
                        "content": function() {
                    // 参考剑圣【烈风技】：仅绕过【圣盾】，不禁止目标应战。
                    trigger.wuFaShengDun();
                },
                        "intro": {
                            "content": function(storage, player) {
                        var num = player.storage.jieShiWeiMingZhong || 0;
                        return '本回合内攻击已未命中' + num + '次，后续攻击伤害+' + num;
                    },
                        },
                        "onremove": function(player) {
                    delete player.storage.jieShiWeiMingZhong;
                },
                        "group": [
                            "jieShi_zhuDongWeiMingZhong",
                            "jieShi_yingZhanMingZhong",
                            "jieShi_jiLuWeiMingZhong",
                            "jieShi_shangHai",
                            "jieShi_qingLing",
                        ],
                        "subSkill": {
                            "zhuDongWeiMingZhong": {
                                "trigger": {
                                    "source": "gongJiWeiMingZhong",
                                },
                                "forced": true,
                                "priority": 10,
                                "filter": function(event, player) {
                            return event.yingZhan != true;
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('qiangShi');
                        },
                            },
                            "yingZhanMingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "forced": true,
                                "priority": 10,
                                "filter": function(event, player) {
                            return event.yingZhan == true;
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('qiangShi');
                        },
                            },
                            "jiLuWeiMingZhong": {
                                "trigger": {
                                    "source": "gongJiWeiMingZhong",
                                },
                                "forced": true,
                                "priority": 9,
                                "content": function() {
                            if(typeof player.storage.jieShiWeiMingZhong != 'number') {
                                player.storage.jieShiWeiMingZhong = 0;
                            }
                            player.storage.jieShiWeiMingZhong++;
                            player.markSkill('jieShi');
                        },
                            },
                            "shangHai": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return player.storage.jieShiWeiMingZhong > 0;
                        },
                                "content": function() {
                            trigger.changeDamageNum(player.storage.jieShiWeiMingZhong);
                        },
                            },
                            "qingLing": {
                                "trigger": {
                                    "global": [
                                        "phaseAfter",
                                        "phaseBeforeStart",
                                    ],
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.storage.jieShiWeiMingZhong > 0;
                        },
                                "content": function() {
                            delete player.storage.jieShiWeiMingZhong;
                            player.unmarkSkill('jieShi');
                        },
                            },
                        },
                    },
                    "lianHuanTuCi": {
                        "usable": 1,
                        "trigger": {
                            "source": "gongJiWeiMingZhong",
                        },
                        "priority": 0,
                        "filter": function(event, player) {
                    return event.yingZhan != true;
                },
                        "cost": async function(event, trigger, player) {
                    if(player.countZhiShiWu('qiangShi') < 1) {
                        event.result = {bool: false};
                        return;
                    }
                    event.result = await player.chooseBool(
                        '连环突刺：是否移除1【枪势】，获得1【攻击行动】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        return player.countCards('h', function(card) {
                            return get.type(card, player) == 'gongJi';
                        }) > 0 && game.hasPlayer(function(current) {
                            return current.side != player.side;
                        });
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('qiangShi');
                    await player.addGongJi();
                },
                    },
                    "hengQiangJiaShi": {
                        "usable": 1,
                        "enable": "yingZhan",
                        "filter": function(event, player) {
                    event = event || _status.event;
                    if(!event || event.canYingZhan == false || !event.card) return false;
                    if(player.countZhiShiWu('qiangShi') < 1) return false;
                    var xiBie = get.xiBie(event.card);
                    return player.hasCard(function(card) {
                        return get.type(card) == 'gongJi' &&
                            (get.name(card) != 'anMie' || event.canAnMie == false) &&
                            get.xiBie(card) != xiBie;
                    }, 'h');
                },
                        "filterCard": function(card, player, event) {
                    event = event || _status.event;
                    if(!event || !event.card) return false;
                    return get.type(card) == 'gongJi' &&
                        (get.name(card) != 'anMie' || event.canAnMie == false) &&
                        get.xiBie(card) != get.xiBie(event.card);
                },
                        "position": "h",
                        "filterTarget": function(card, player, target) {
                    var yingZhanEvent = _status.event.getParent('_yingZhan');
                    if(!yingZhanEvent || !yingZhanEvent.source) return false;
                    return player != target &&
                        player.side != target.side &&
                        target != yingZhanEvent.source &&
                        lib.filter.targetEnabled(card, player, target);
                },
                        "viewAs": function(cards, player) {
                    if(!cards.length) return;
                    var card = cards[0];
                    var event = _status.event;
                    return {
                        name: get.name(card),
                        xiBie: get.xiBie(event.card),
                        mingGe: get.mingGe(card),
                        duYou: get.duYou(card),
                        isCard: true,
                    };
                },
                        "group": "hengQiangJiaShi_xiaoGuo",
                        "ai": {
                            "order": 5,
                        },
                        "subSkill": {
                            "xiaoGuo": {
                                "trigger": {
                                    "player": "gongJiBefore",
                                },
                                "firstDo": true,
                                "forced": true,
                                "priority": 10,
                                "filter": function(event, player) {
                            return event.skill == 'hengQiangJiaShi' &&
                                player.countZhiShiWu('qiangShi') > 0;
                        },
                                "content": async function(event, trigger, player) {
                            await player.removeZhiShiWu('qiangShi');
                            // viewAs只创建独立虚拟牌；保留本次攻击的视为系别，
                            // 不修改实体牌或下一名角色打出的攻击牌。
                            trigger.changeDamageNum(-1);
                        },
                            },
                        },
                    },
                    "poZhenHuiQiang": {
                        "usable": 1,
                        "trigger": {
                            "player": "gongJiBefore",
                        },
                        "filter": function(event, player) {
                    return event.yingZhan != true &&
                        player.countZhiShiWu('qiangShi') > 0 &&
                        player.canBiShaShuiJing();
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '破阵回枪：是否移除1【水晶】和1【枪势】，令本次攻击伤害+1？'
                    ).set('ai', function() {
                        return get.attitude(player, trigger.target) < 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu('qiangShi');
                    trigger.customArgs = trigger.customArgs || {};
                    trigger.customArgs.poZhenHuiQiang = true;
                    trigger.changeDamageNum(1);
                },
                        "group": "poZhenHuiQiang_weiMingZhong",
                        "subSkill": {
                            "weiMingZhong": {
                                "trigger": {
                                    "source": "gongJiWeiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return event.yingZhan != true &&
                                event.customArgs &&
                                event.customArgs.poZhenHuiQiang;
                        },
                                "content": async function(event, trigger, player) {
                            await player.addGongJi();
                        },
                            },
                        },
                    },
                    "qiangShi": {
                        "intro": {
                            "name": "枪势",
                            "content": "mark",
                            "max": 2,
                        },
                        "onremove": "storage",
                        "markimage": "extension/bigcowcow/mark_qiangShi.png",
                    },
                    "shengCunQiDian": {
                        "trigger": {
                            "global": "gameStart",
                        },
                        "forced": true,
                        "firstDo": true,
                        "filter": function(event, player) {
                    return !lib.skill.shiDiFuJian.getSword(player);
                },
                        "content": function(event, trigger, player) {
                    lib.skill.shiDiFuJian.setSword(player, 'muJian');
                },
                        "group": "shengCunQiDian_sunHuai",
                        "subSkill": {
                            "sunHuai": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "filter": function(event, player) {
                            return !!lib.skill.shiDiFuJian.getSword(player) &&
                                lib.skill.shiDiFuJian.getDurability(player) <= 0;
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.shiDiFuJian.removeSword(player);
                        },
                            },
                        },
                    },
                    "caiJi": {
                        "trigger": {
                            "player": "shiDiFuYiChuNaiJiu",
                        },
                        "filter": function(event, player) {
                    return player.isIn() &&
                        player.countGaiPai('shiDiFuSuCai') < 5;
                },
                        "content": async function(event, trigger, player) {
                    await lib.skill.caiJi.collect(player, false);
                },
                        "collect": async function(player, logSkill) {
                    if(!player || !player.isIn() ||
                        player.countGaiPai('shiDiFuSuCai') >= 5) {
                        return false;
                    }
                    if(logSkill !== false) player.logSkill('caiJi');
                    var sword = lib.skill.shiDiFuJian.getSword(player);

                    if(sword == 'zuanShiJian') {
                        var canPrecise = game.hasPlayer(function(current) {
                            return current.isIn() && current.countCards('he', function(card) {
                                return lib.filter.cardDiscardable(card, current);
                            }) > 0;
                        });
                        if(canPrecise) {
                            var hasFriendlyPreciseTarget =
                                game.hasPlayer(function(current) {
                                    return current.isIn() &&
                                        current.side == player.side &&
                                        current.countCards('he', function(card) {
                                            return lib.filter.cardDiscardable(
                                                card,
                                                current
                                            );
                                        }) > 0;
                                });
                            var control = await player.chooseControl(
                                '牌堆采集',
                                '精准开采'
                            ).set('prompt', '采集：选择采集方式')
                            .set('ai', function() {
                                return _status.event
                                    .hasFriendlyPreciseTarget ?
                                    '精准开采' : '牌堆采集';
                            }).set(
                                'hasFriendlyPreciseTarget',
                                hasFriendlyPreciseTarget
                            ).forResultControl();
                            if(control == '精准开采') {
                                var targets = await player.chooseTarget(
                                    true,
                                    '精准开采：选择一名有可弃置牌的角色',
                                    function(card, player, target) {
                                        return target.countCards('he', function(current) {
                                            return lib.filter.cardDiscardable(current, target);
                                        }) > 0;
                                    }
                                ).set('ai', function(target) {
                                    var player = _status.event.player;
                                    if(target.side != player.side) return 0;
                                    return get.attitude(player, target);
                                }).forResultTargets();
                                var target = targets[0];
                                if(target) {
                                    var discarded = await target.chooseToDiscard(
                                        'he',
                                        1,
                                        true,
                                        '精准开采：弃置1张牌作为史蒂夫的【素材】'
                                    ).forResultCards();
                                    var preciseCard = discarded[0];
                                    if(preciseCard && !preciseCard.destroyed &&
                                        player.countGaiPai('shiDiFuSuCai') < 5) {
                                        await player.addGaiPai(
                                            preciseCard,
                                            player,
                                            'shiDiFuSuCai'
                                        );
                                        return player.hasGaiPai('shiDiFuSuCai');
                                    }
                                }
                                return false;
                            }
                        }
                    }

                    var deckCollect = {
                        jinJian: {
                            count: 4,
                            name: '矿物勘探',
                        },
                        shiJian: {
                            count: 2,
                            name: '粗糙采掘',
                        },
                        tieJian: {
                            count: 3,
                            name: '矿脉精炼',
                        },
                    }[sword];
                    if(deckCollect) {
                        var topCards = get.cards(deckCollect.count);
                        if(!topCards.length) return false;
                        await game.cardsGotoOrdering(topCards);
                        var links = await player.chooseCardButton(
                            topCards,
                            true,
                            deckCollect.name + '：查看牌堆顶' +
                                topCards.length +
                                '张牌，选择1张作为【素材】'
                        ).set('ai', function(button) {
                            return get.value(button.link);
                        }).forResultLinks();
                        var selected = links[0] || topCards[0];
                        var discardedCards = topCards.filter(function(card) {
                            return card != selected;
                        });
                        await player.addGaiPai(
                            selected,
                            player,
                            'shiDiFuSuCai'
                        );
                        if(discardedCards.length) {
                            await game.cardsDiscard(discardedCards);
                        }
                        return player.hasGaiPai('shiDiFuSuCai');
                    }

                    var cards = get.cards(1);
                    if(!cards.length) return false;
                    await player.addGaiPai(
                        cards[0],
                        player,
                        'shiDiFuSuCai'
                    );
                    return player.hasGaiPai('shiDiFuSuCai');
                },
                    },
                    "gongZuoTai": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "getCraftableSwords": function(player) {
                    var materials = player.getGaiPai('shiDiFuSuCai');
                    var counts = {};
                    materials.forEach(function(card) {
                        var xiBie = get.xiBie(card);
                        counts[xiBie] = (counts[xiBie] || 0) + 1;
                    });
                    var list = [];
                    if(materials.length >= 1) list.push('muJian');
                    if((counts.guang || 0) >= 1) list.push('jinJian');
                    if((counts.di || 0) >= 1) list.push('shiJian');
                    if(Object.keys(counts).some(function(xiBie) {
                        return counts[xiBie] >= 2;
                    })) list.push('tieJian');
                    if((counts.shui || 0) >= 3) list.push('zuanShiJian');
                    if(lib.skill.shiDiFuJian.getSword(player) == 'zuanShiJian' &&
                        (counts.huo || 0) >= 1 &&
                        (counts.an || 0) >= 1) {
                        list.push('xiaJieHeJinJian');
                    }
                    return list;
                },
                        "filter": function(event, player) {
                    return lib.skill.gongZuoTai.getCraftableSwords(player).length > 0;
                },
                        "check": function(event, player) {
                    if(lib.skill.shiDiFuJian.getDurability(player) !== 0) {
                        return false;
                    }
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return true;
                },
                        "content": async function(event, trigger, player) {
                    var craftable = lib.skill.gongZuoTai.getCraftableSwords(player);
                    if(!craftable.length) return;
                    var sword = await player.chooseControl(craftable)
                        .set('prompt', '工作台：选择要锻造的剑专属卡')
                        .set('ai', function() {
                            var list = _status.event.controls;
                            var order = [
                                'xiaJieHeJinJian',
                                'zuanShiJian',
                                'tieJian',
                                'shiJian',
                                'jinJian',
                                'muJian',
                            ];
                            return order.find(function(current) {
                                return list.includes(current);
                            }) || list[0];
                        }).forResultControl();
                    if(!sword) return;

                    var materials = player.getGaiPai('shiDiFuSuCai').slice();
                    var recipeCards = [];
                    if(sword == 'muJian') {
                        recipeCards = await player.chooseCardButton(
                            materials,
                            1,
                            true,
                            '工作台：展示并弃置任意1张【素材】制作【木剑】'
                        ).forResultLinks();
                    } else if(sword == 'jinJian') {
                        recipeCards = await player.chooseCardButton(
                            materials,
                            1,
                            true,
                            '工作台：展示并弃置1张光系【素材】制作【金剑】'
                        ).set('filterButton', function(button) {
                            return get.xiBie(button.link) == 'guang';
                        }).forResultLinks();
                    } else if(sword == 'shiJian') {
                        recipeCards = await player.chooseCardButton(
                            materials,
                            1,
                            true,
                            '工作台：展示并弃置1张地系【素材】制作【石剑】'
                        ).set('filterButton', function(button) {
                            return get.xiBie(button.link) == 'di';
                        }).forResultLinks();
                    } else if(sword == 'tieJian') {
                        recipeCards = await player.chooseCardButton(
                            materials,
                            2,
                            true,
                            '工作台：展示并弃置2张同系【素材】制作【铁剑】'
                        ).set('filterButton', function(button) {
                            if(!ui.selected.buttons.length) return true;
                            return get.xiBie(button.link) ==
                                get.xiBie(ui.selected.buttons[0].link);
                        }).set('complexSelect', true).forResultLinks();
                    } else if(sword == 'zuanShiJian') {
                        recipeCards = await player.chooseCardButton(
                            materials,
                            3,
                            true,
                            '工作台：展示并弃置3张水系【素材】制作【钻石剑】'
                        ).set('filterButton', function(button) {
                            return get.xiBie(button.link) == 'shui';
                        }).forResultLinks();
                    } else if(sword == 'xiaJieHeJinJian') {
                        recipeCards = await player.chooseCardButton(
                            materials,
                            2,
                            true,
                            '工作台：展示并弃置1张火系和1张暗系【素材】制作【下界合金剑】'
                        ).set('filterButton', function(button) {
                            var xiBie = get.xiBie(button.link);
                            if(!['huo', 'an'].includes(xiBie)) return false;
                            if(!ui.selected.buttons.length) return true;
                            return xiBie != get.xiBie(ui.selected.buttons[0].link);
                        }).set('complexSelect', true).forResultLinks();
                    }
                    if(!recipeCards.length) return;

                    await player.showCards(
                        recipeCards,
                        '工作台：展示制作【' +
                            lib.skill.shiDiFuJian.swordName[sword] +
                            '】的素材'
                    );
                    await player.discard(
                        recipeCards,
                        'shiDiFuSuCai'
                    ).set('visible', true);
                    if(lib.skill.shiDiFuJian.getSword(player)) {
                        lib.skill.shiDiFuJian.removeSword(player);
                    }
                    lib.skill.shiDiFuJian.setSword(player, sword);
                },
                    },
                    "zhanDouFuMo": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "filter": function(event, player) {
                    if(!event || !event.target ||
                        !lib.skill.shiDiFuJian.getSword(player)) return false;
                    var sword = lib.skill.shiDiFuJian.getSword(player);
                    var num = ['jinJian', 'xiaJieHeJinJian'].includes(sword) ? 2 : 1;
                    return player.getGaiPai('shiDiFuSuCai').filter(function(card) {
                        return get.type(card) == 'faShu';
                    }).length >= num;
                },
                        "cost": async function(event, trigger, player) {
                    var sword = lib.skill.shiDiFuJian.getSword(player);
                    var num = ['jinJian', 'xiaJieHeJinJian'].includes(sword) ? 2 : 1;
                    var spellMaterials = player.getGaiPai('shiDiFuSuCai').filter(function(card) {
                        return get.type(card) == 'faShu';
                    });
                    var result = await player.chooseCardButton(
                        spellMaterials,
                        num,
                        '战斗附魔：是否弃置' + num + '张法术【素材】？'
                    ).set('ai', function(button) {
                        var player = _status.event.player;
                        var target = _status.event.attackTarget;
                        if(get.xiBie(button.link) == 'feng' &&
                            target &&
                            target.side != player.side) {
                            return 0;
                        }
                        return 6 - get.value(button.link);
                    }).set('attackTarget', trigger.target).forResult();
                    event.result = {
                        bool: result.bool && result.links && result.links.length == num,
                        cards: result.links || [],
                    };
                },
                        "content": async function(event, trigger, player) {
                    if(!event.cards || !event.cards.length) return;
                    await player.showCards(event.cards, '战斗附魔');
                    await player.discard(
                        event.cards,
                        'shiDiFuSuCai'
                    ).set('visible', true);

                    var counts = {
                        lei: 0,
                        huo: 0,
                        di: 0,
                        shui: 0,
                        feng: 0,
                        guang: 0,
                    };
                    event.cards.forEach(function(card) {
                        var xiBie = get.xiBie(card);
                        if(Object.prototype.hasOwnProperty.call(counts, xiBie)) {
                            counts[xiBie]++;
                        }
                    });

                    if(counts.lei > 0) {
                        trigger.changeDamageNum(counts.lei);
                    }
                    if(counts.huo > 0 && trigger.target && trigger.target.isIn()) {
                        await trigger.target.faShuDamage(counts.huo, player);
                    }
                    if(counts.di > 0) {
                        var candidates = game.players.filter(function(current) {
                            return current.isIn() && current != trigger.target;
                        });
                        var targetCount = Math.min(counts.di, candidates.length);
                        if(targetCount > 0) {
                            var sweepTargets = await player.chooseTarget(
                                [targetCount, targetCount],
                                true,
                                '横扫之刃：选择' + targetCount +
                                    '名攻击目标以外的角色，依次造成等同本次攻击伤害的法术伤害',
                                function(card, player, target) {
                                    return target.isIn() &&
                                        target != _status.event.originalTarget;
                                }
                            ).set('originalTarget', trigger.target)
                            .set('ai', function(target) {
                                return get.damageEffect2(
                                    target,
                                    _status.event.player,
                                    _status.event.damageNum
                                );
                            }).set('damageNum', trigger.damageNum || 0)
                            .forResultTargets();
                            var sweepDamage = Math.max(0, trigger.damageNum || 0);
                            for(var sweepTarget of sweepTargets.sortBySeat(player)) {
                                if(sweepDamage > 0 && sweepTarget.isIn()) {
                                    await sweepTarget.faShuDamage(sweepDamage, player);
                                }
                            }
                        }
                    }
                    if(counts.shui > 0) {
                        for(var i = 0; i < counts.shui; i++) {
                            if(player.countGaiPai('shiDiFuSuCai') >= 5) break;
                            await lib.skill.caiJi.collect(player);
                        }
                    }
                    if(counts.feng > 0 && trigger.target && trigger.target.isIn()) {
                        var discardNum = Math.min(
                            counts.feng,
                            trigger.target.countCards('h')
                        );
                        if(discardNum > 0) {
                            await trigger.target.chooseToDiscard(
                                'h',
                                discardNum,
                                true,
                                '击退：弃置' + discardNum + '张手牌'
                            );
                        }
                    }
                    if(counts.guang > 0 &&
                        lib.skill.shiDiFuJian.getSword(player)) {
                        lib.skill.shiDiFuJian.changeDurability(player, counts.guang);
                    }
                },
                    },
                    "jingYanXiuBu": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "filter": function(event, player) {
                    var sword = lib.skill.shiDiFuJian.getSword(player);
                    if(!event || !event.target || !sword) return false;
                    return player.canBiShaShuiJing() &&
                        player.countCards('h') > 0 &&
                        lib.skill.shiDiFuJian.getDurability(player) <
                            lib.skill.shiDiFuJian.getMaxDurability(player, sword);
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseCard(
                        'h',
                        1,
                        '经验修补：是否弃置1张牌并移除1【水晶】，令当前剑+2【耐久】？'
                    ).set('ai', function(card) {
                        return 6 - get.value(card);
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    if(!event.cards || !event.cards.length) return;
                    var sword = lib.skill.shiDiFuJian.getSword(player);
                    if(!sword ||
                        lib.skill.shiDiFuJian.getDurability(player) >=
                            lib.skill.shiDiFuJian.getMaxDurability(player, sword)) {
                        return;
                    }
                    if(!player.canBiShaShuiJing()) return;
                    await player.removeBiShaShuiJing();
                    await player.discard(event.cards);
                    lib.skill.shiDiFuJian.changeDurability(player, 2);
                },
                    },
                    "shiDiFuSuCai": {
                        "intro": {
                            "name": "素材",
                            "content": "gaiPai",
                            "markcount": "gaiPai",
                            "max": 5,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                    },
                    "muJian": {
                        "marktext": "木",
                        "intro": {
                            "name": "专属卡：木剑",
                            "markcount": function(storage, player) {
                        return lib.skill.shiDiFuJian.getDurability(player);
                    },
                            "content": function(storage, player) {
                        return lib.skill.shiDiFuJian.getSwordIntro(player, 'muJian');
                    },
                        },
                        "onremove": "storage",
                        "group": [
                            "jianYiGongJu",
                            "jianYiGongJu_weiMingZhong",
                        ],
                    },
                    "jinJian": {
                        "marktext": "金",
                        "intro": {
                            "name": "专属卡：金剑",
                            "markcount": function(storage, player) {
                        return lib.skill.shiDiFuJian.getDurability(player);
                    },
                            "content": function(storage, player) {
                        return lib.skill.shiDiFuJian.getSwordIntro(player, 'jinJian');
                    },
                        },
                        "onremove": "storage",
                        "group": [
                            "jiSuHuiKan",
                            "kuangWuKanTan",
                        ],
                    },
                    "shiJian": {
                        "marktext": "石",
                        "intro": {
                            "name": "专属卡：石剑",
                            "markcount": function(storage, player) {
                        return lib.skill.shiDiFuJian.getDurability(player);
                    },
                            "content": function(storage, player) {
                        return lib.skill.shiDiFuJian.getSwordIntro(player, 'shiJian');
                    },
                        },
                        "onremove": "storage",
                        "group": [
                            "chenZhongGeDang",
                            "chenZhongGeDang_xiaoGuo",
                            "chenZhongGeDang_mingZhong",
                            "cuCaoCaiJue",
                        ],
                    },
                    "tieJian": {
                        "marktext": "铁",
                        "intro": {
                            "name": "专属卡：铁剑",
                            "markcount": function(storage, player) {
                        return lib.skill.shiDiFuJian.getDurability(player);
                    },
                            "content": function(storage, player) {
                        return lib.skill.shiDiFuJian.getSwordIntro(player, 'tieJian');
                    },
                        },
                        "onremove": "storage",
                        "group": [
                            "wenDingFengRen",
                            "kuangMaiJingLian",
                        ],
                    },
                    "zuanShiJian": {
                        "marktext": "钻",
                        "intro": {
                            "name": "专属卡：钻石剑",
                            "markcount": function(storage, player) {
                        return lib.skill.shiDiFuJian.getDurability(player);
                    },
                            "content": function(storage, player) {
                        return lib.skill.shiDiFuJian.getSwordIntro(player, 'zuanShiJian');
                    },
                        },
                        "onremove": "storage",
                        "group": [
                            "zuanShiPoJia",
                            "jingZhunKaiCai",
                        ],
                    },
                    "xiaJieHeJinJian": {
                        "marktext": "界",
                        "intro": {
                            "name": "专属卡：下界合金剑",
                            "markcount": function(storage, player) {
                        return lib.skill.shiDiFuJian.getDurability(player);
                    },
                            "content": function(storage, player) {
                        return lib.skill.shiDiFuJian.getSwordIntro(player, 'xiaJieHeJinJian');
                    },
                        },
                        "onremove": "storage",
                        "group": [
                            "buHuiZhiFeng",
                            "xiaJieDuanZao",
                        ],
                    },
                    "fengBiZhe": {
                        "isNormal": function(player) {
                    return !player.hasSkill('erDaoLiuZhuangTai') &&
                        !player.isHengZhi();
                },
                        "group": [
                            "fengBiZhe_lianJi",
                            "fengBiZhe_fengSuoYingZhan",
                        ],
                        "subSkill": {
                            "lianJi": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "priority": 20,
                                "filter": function(event, player) {
                            return !!event &&
                                event.name == 'useCard' &&
                                event.type == 'gongJi' &&
                                event.yingZhan != true &&
                                lib.skill.fengBiZhe.isNormal(player) &&
                                !player.isZhiShiWuMax('lianJi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('lianJi', 1);
                        },
                            },
                            "fengSuoYingZhan": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            if(!event || event.yingZhan == true) {
                                return false;
                            }
                            var stat = player.getStat('gongJi');
                            return !!stat &&
                                Array.isArray(stat.zhuDong) &&
                                stat.zhuDong.length >= 4;
                        },
                                "content": function(event, trigger, player) {
                            trigger.wuFaYingZhan();
                        },
                            },
                        },
                    },
                    "erDaoLiu": {
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "forced": true,
                        "priority": 10,
                        "filter": function(event, player) {
                    return !!event &&
                        event.name == 'useCard' &&
                        event.type == 'gongJi' &&
                        event.yingZhan != true &&
                        lib.skill.fengBiZhe.isNormal(player) &&
                        player.countZhiShiWu('lianJi') >= 3;
                },
                        "content": async function(event, trigger, player) {
                    player.storage.erDaoLiuRuXingXiBie =
                        get.xiBie(trigger.card);
                    player.storage.erDaoLiuDiYiDao = true;
                    player.syncStorage('erDaoLiuRuXingXiBie');
                    player.addSkill('erDaoLiuZhuangTai');
                    await player.hengZhi();
                    player.addGongJi();
                },
                    },
                    "yinSuChongJi": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        lib.skill.fengBiZhe.isNormal(player);
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【音速冲击】，摸1张牌？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        return player.countCards('h') + 1 <=
                            player.getHandcardLimit();
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.draw(1);
                    trigger.yinSuChongJi = true;
                },
                        "group": [
                            "yinSuChongJi_mingZhong",
                            "yinSuChongJi_jieShu",
                        ],
                        "subSkill": {
                            "mingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return event.yinSuChongJi === true;
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        },
                            },
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "priority": 0,
                                "filter": function(event, player) {
                            return !!event &&
                                event.name == 'useCard' &&
                                event.type == 'gongJi' &&
                                event.yinSuChongJi === true &&
                                !event.target;
                        },
                                "content": function(event, trigger, player) {
                            if(!player.hasSkill(
                                'xingBaoQiLiuZhanFengSuo'
                            )) {
                                player.addGongJi();
                            }
                        },
                            },
                        },
                    },
                    "siFangZhan": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        player.hasSkill('erDaoLiuZhuangTai') &&
                        player.countZhiShiWu('lianJi') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    var activate = await player.chooseBool(
                        '是否移除1【连击】，发动【四方斩】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var damageGain = get.damageEffect2(
                            target, player, 1
                        );
                        var canFollow = player.countCards('h', function(card) {
                            return get.type(card, player) == 'gongJi';
                        }) > 0 && game.hasPlayer(function(current) {
                            return current.side != player.side;
                        });
                        return damageGain > 0 || canFollow;
                    }).forResultBool();
                    if(!activate) {
                        event.result = { bool: false };
                        return;
                    }
                    var damage = '本次攻击伤害额外+1';
                    var action =
                        '本次攻击伤害-1，行动结束后额外+1【攻击行动】';
                    var choice = await player.chooseControl(
                        [damage, action]
                    ).set('prompt', '四方斩：选择一项')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var trigger = _status.event.getTrigger();
                            var target = trigger && trigger.target;
                            var damageGain = target ? get.damageEffect2(
                                target, player, 1
                            ) : 0;
                            var canFollow = player.countCards('h', function(card) {
                                return get.type(card, player) == 'gongJi';
                            }) > 0 && game.hasPlayer(function(current) {
                                return current.side != player.side;
                            });
                            var futureGain = canFollow ? 1.6 : 0;
                            return futureGain > damageGain + 0.6 ?
                                '本次攻击伤害-1，行动结束后额外+1【攻击行动】' :
                                '本次攻击伤害额外+1';
                        }).forResultControl();
                    event.result = {
                        bool: !!choice,
                        cost_data: choice,
                    };
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('lianJi', 1);
                    if(event.cost_data ==
                        '本次攻击伤害额外+1') {
                        trigger.changeDamageNum(1);
                    } else {
                        trigger.changeDamageNum(-1);
                        trigger.siFangZhanExtra = true;
                    }
                },
                        "group": "siFangZhan_jieShu",
                        "subSkill": {
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "priority": -10,
                                "filter": function(event, player) {
                            return event.siFangZhanExtra === true;
                        },
                                "content": function(event, trigger, player) {
                            if(!player.hasSkill(
                                'xingBaoQiLiuZhanFengSuo'
                            )) {
                                player.addGongJi();
                            }
                        },
                            },
                        },
                    },
                    "xingBaoQiLiuZhan": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        player.hasSkill('erDaoLiuZhuangTai') &&
                        player.canBiShaBaoShi();
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【星爆气流斩】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var currentXiBie = get.xiBie(trigger.card);
                        var seen = [];
                        var usefulCards = player.getCards('h').filter(
                            function(card) {
                                if(get.type(card, player) != 'gongJi' ||
                                    get.xiBie(card) == currentXiBie ||
                                    get.value(card) >= 7 ||
                                    seen.includes(get.xiBie(card))) {
                                    return false;
                                }
                                seen.push(get.xiBie(card));
                                return true;
                            }
                        ).length;
                        var removed = Math.min(
                            3,
                            player.countZhiShiWu('lianJi')
                        );
                        var bonus = 1 + Math.min(removed, usefulCards);
                        var pressure = target.countCards('h') + bonus >
                            target.getHandcardLimit() ? 1.5 : 0;
                        return get.damageEffect2(
                            target, player, bonus
                        ) + pressure > 1.5;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    var removed = Math.min(
                        3,
                        player.countZhiShiWu('lianJi')
                    );
                    if(removed > 0) {
                        await player.removeZhiShiWu(
                            'lianJi',
                            removed
                        );
                    }
                    var cards = [];
                    var currentXiBie = get.xiBie(trigger.card);
                    if(removed > 0 &&
                        player.countCards('h', function(card) {
                            return get.type(card) == 'gongJi' &&
                                get.xiBie(card) != currentXiBie;
                        }) > 0) {
                        cards = await player.chooseCard(
                            'h',
                            [0, removed],
                            '星爆气流斩：可以展示并弃置至多' +
                                removed + '张彼此异系、且与本次攻击异系的攻击牌'
                        ).set('filterCard', function(card, player) {
                            if(get.type(card) != 'gongJi' ||
                                get.xiBie(card) ==
                                    _status.event.currentXiBie) {
                                return false;
                            }
                            return !ui.selected.cards.some(
                                function(selected) {
                                    return get.xiBie(selected) ==
                                        get.xiBie(card);
                                }
                            );
                        }).set('complexCard', true)
                            .set('currentXiBie', currentXiBie)
                            .set('ai', function(card) {
                                return 6 - get.value(card);
                            }).forResultCards();
                    }
                    if(cards.length) {
                        await player.discard(cards)
                            .set('showCards', true);
                    }
                    trigger.changeDamageNum(cards.length + 1);
                    trigger.xingBaoQiLiuZhan = true;
                    player.addSkill('xingBaoQiLiuZhanFengSuo');
                    lib.skill.xingBaoQiLiuZhanFengSuo.sanitize(
                        player,
                        trigger
                    );
                },
                        "group": "xingBaoQiLiuZhan_jieShu",
                        "subSkill": {
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "filter": function(event, player) {
                            return event.xingBaoQiLiuZhan === true;
                        },
                                "content": async function(event, trigger, player) {
                            if(player.isHengZhi()) {
                                await player.chongZhi();
                            }
                            player.removeSkill('erDaoLiuZhuangTai');
                        },
                            },
                        },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "lianJi": {
                        "intro": {
                            "name": "连击",
                            "content": "mark",
                            "max": 3,
                        },
                        "onremove": "storage",
                        "markimage": "extension/bigcowcow/mark_lianJi.png",
                    },
                    "baoPaiZhiShi": {
                        "trigger": {
                            "global": "gameStart",
                        },
                        "forced": true,
                        "firstDo": true,
                        "priority": 100,
                        "content": async function(event, trigger, player) {
                    await lib.skill.yiJiBaoPai.replace(
                        player,
                        null,
                        false
                    );
                },
                        "group": "baoPaiZhiShi_daChuPai",
                        "subSkill": {
                            "daChuPai": {
                                "trigger": {
                                    "player": "daChuPai",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            var baoPai =
                                lib.skill.yiJiBaoPai.getCard(player);
                            return !!baoPai &&
                                !!event.card &&
                                get.xiBie(event.card) ==
                                    get.xiBie(baoPai) &&
                                !player.isZhiShiWuMax('miaoYun');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('miaoYun', 1);
                        },
                            },
                        },
                    },
                    "duanYaoJiuMiao": {
                        "isDuanYaoJiu": function(player) {
                    if(!player || player.countCards('h') < 3) {
                        return false;
                    }
                    var forbidden = [
                        'shengGuang',
                        'anMie',
                    ].concat(game.jiChuXiaoGuo.pai || []);
                    return player.countCards('h', function(card) {
                        return forbidden.includes(get.name(card));
                    }) == 0;
                },
                        "trigger": {
                            "player": "teShuEnd",
                        },
                        "filter": function(event, player) {
                    return !!lib.skill.yiJiBaoPai.getCard(player) &&
                        lib.skill.duanYaoJiuMiao
                            .isDuanYaoJiu(player);
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【断幺九喵】，展示并弃置全部手牌？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var cards = player.getCards('h');
                        var baoPai =
                            lib.skill.yiJiBaoPai.getCard(player);
                        var same = cards.filter(function(card) {
                            return baoPai &&
                                get.xiBie(card) ==
                                    get.xiBie(baoPai);
                        }).length;
                        return same + 1 >= 2;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var cards = player.getCards('h').slice();
                    var baoPai =
                        lib.skill.yiJiBaoPai.getCard(player);
                    if(!cards.length || !baoPai) return;
                    var y = cards.length;
                    var x = cards.filter(function(card) {
                        return get.xiBie(card) ==
                            get.xiBie(baoPai);
                    }).length;
                    await player.discard(cards)
                        .set('showCards', true);
                    await player.addZhiShiWu(
                        'miaoYun',
                        x + 1
                    );
                    var drawNum = Math.max(0, y - x);
                    if(drawNum > 0) {
                        await player.draw(drawNum);
                    }
                    await lib.skill.yiJiBaoPai.replace(
                        player,
                        null,
                        false
                    );
                },
                    },
                    "liZhiMiao": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    var baoPai =
                        lib.skill.yiJiBaoPai.getCard(player);
                    return !!event &&
                        event.yingZhan != true &&
                        !!event.card &&
                        !!baoPai &&
                        get.xiBie(event.card) ==
                            get.xiBie(baoPai);
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【立直喵】，令本次攻击伤害额外+1？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        if(!trigger.target ||
                            trigger.target.side == player.side) return false;
                        var damageGain = get.damageEffect2(
                            trigger.target,
                            player,
                            1
                        );
                        var spellFollowUp = player.countCards(
                            'h',
                            function(card) {
                                return get.type(card, player) == 'faShu';
                            }
                        ) > 0;
                        return damageGain > 0 || spellFollowUp;
                    }).forResult();
                },
                        "content": function(event, trigger, player) {
                    trigger.liZhiMiao = true;
                    trigger.changeDamageNum(1);
                },
                        "group": "liZhiMiao_mingZhong",
                        "subSkill": {
                            "mingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return event.liZhiMiao === true;
                        },
                                "content": function(event, trigger, player) {
                            player.addFaShu();
                        },
                            },
                        },
                    },
                    "duiDuiHuMiao": {
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                    return get.type(card) == 'faShu' &&
                        lib.filter.cardDiscardable(card, player);
                },
                        "filter": function(event, player) {
                    return !!lib.skill.yiJiBaoPai.getCard(player) &&
                        player.countCards('h', function(card) {
                            return lib.skill.duiDuiHuMiao
                                .filterCard(card, player);
                        }) > 0 &&
                        game.hasPlayer(function(current) {
                            return current.side != player.side;
                        });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side;
                },
                        "content": async function(event, trigger, player) {
                    var target = event.target;
                    await player.addZhiShiWu('miaoYun', 1);
                    var cards = get.cards(1);
                    var card = cards && cards[0];
                    if(!card) return;
                    await game.cardsGotoOrdering([card]);
                    await player.showCards(
                        [card],
                        '【对对胡喵】：展示牌库顶牌'
                    );
                    var baoPai =
                        lib.skill.yiJiBaoPai.getCard(player);
                    if(baoPai &&
                        get.xiBie(card) == get.xiBie(baoPai)) {
                        if(target && target.isIn()) {
                            await target.faShuDamage(2, player);
                        }
                    } else {
                        await player.faShuDamage(1, player);
                        if(target && target.isIn()) {
                            await target.faShuDamage(1, player);
                        }
                    }
                    await lib.skill.yiJiBaoPai.replace(
                        player,
                        card,
                        true
                    );
                },
                        "ai": {
                            "order": 3.8,
                            "result": {
                                "target": function(player, target) {
                            return get.damageEffect(target, 2);
                        },
                            },
                        },
                    },
                    "haiDiLaoYueMiao": {
                        "trigger": {
                            "player": "gainAfter",
                        },
                        "forced": true,
                        "firstDo": true,
                        "priority": 100,
                        "filter": function(event, player) {
                    return event.cause == 'damage' &&
                        Array.isArray(event.cards) &&
                        event.cards.length > 0 &&
                        player.hasSkill(
                            'yiJiHaiDiLinShiShouPai'
                        );
                },
                        "content": async function(event, trigger, player) {
                    var card =
                        trigger.cards[trigger.cards.length - 1];
                    if(!card) return;
                    try {
                        await player.showCards(
                            [card],
                            '【海底捞月喵】：展示最后摸到的牌'
                        );
                        var baoPai =
                            lib.skill.yiJiBaoPai.getCard(player);
                        if(!baoPai) return;
                        if(get.xiBie(card) == get.xiBie(baoPai)) {
                            await player.changeZhiLiao(1, player);
                            await player.addZhiShiWu(
                                'miaoYun',
                                1
                            );
                        } else {
                            var exchange = await player.chooseBool(
                                '是否将最后摸到的牌与当前【宝牌】交换？'
                            ).set('ai', function() {
                                var player =
                                    _status.event.player;
                                var oldCard =
                                    lib.skill.yiJiBaoPai
                                        .getCard(player);
                                var newCard =
                                    _status.event.newCard;
                                return oldCard && newCard &&
                                    get.value(oldCard, player) >
                                        get.value(newCard, player);
                            }).set('newCard', card)
                                .forResultBool();
                            if(exchange &&
                                get.position(card, true) == 'h') {
                                var oldCards = player.getGaiPai(
                                    'yiJiBaoPai'
                                ).slice();
                                if(oldCards.length) {
                                    await player.gain(
                                        oldCards,
                                        'gain2'
                                    );
                                    await player.addGaiPai(
                                        [card],
                                        player,
                                        'yiJiBaoPai'
                                    );
                                }
                            }
                        }
                    } finally {
                        player.removeSkill(
                            'yiJiHaiDiLinShiShouPai'
                        );
                        var overflow = player.qiPai();
                        if(overflow) await overflow;
                    }
                },
                        "group": "haiDiLaoYueMiao_zhunBei",
                        "subSkill": {
                            "zhunBei": {
                                "trigger": {
                                    "player": "gainBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                            return event.cause == 'damage' &&
                                Array.isArray(event.cards) &&
                                event.cards.length > 0 &&
                                !!lib.skill.yiJiBaoPai
                                    .getCard(player);
                        },
                                "content": function(event, trigger, player) {
                            player.storage
                                .yiJiHaiDiLinShiShouPai =
                                player.countCards('h') +
                                trigger.cards.length;
                            player.addSkill(
                                'yiJiHaiDiLinShiShouPai'
                            );
                        },
                            },
                        },
                    },
                    "yiManShiJianMiao": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() &&
                        player.countZhiShiWu('miaoYun') >= 5 &&
                        !!lib.skill.yiJiBaoPai.getCard(player) &&
                        game.hasPlayer(function(current) {
                            return current.side != player.side;
                        });
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    await player.removeZhiShiWu('miaoYun', 5);
                    var cards = get.cards(5);
                    if(!cards || !cards.length) return;
                    await game.cardsGotoOrdering(cards);
                    await player.showCards(
                        cards,
                        '【役满时间喵】：展示牌库顶5张牌'
                    );
                    var baoPai =
                        lib.skill.yiJiBaoPai.getCard(player);
                    var x = cards.filter(function(card) {
                        return baoPai &&
                            get.xiBie(card) ==
                                get.xiBie(baoPai);
                    }).length;
                    await game.cardsDiscard(cards);
                    var targets = await player.chooseTarget(
                        '役满时间喵：选择一名对手，造成' +
                            (x + 1) + '点法术伤害',
                        true,
                        function(card, player, target) {
                            return target.side != player.side;
                        }
                    ).set('damage', x + 1)
                        .set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                _status.event.damage
                            );
                        }).forResultTargets();
                    var target = targets[0];
                    if(target && target.isIn()) {
                        await target.faShuDamage(x + 1, player);
                    }
                },
                        "check": function(event, player) {
                    if(player.countZhiShiWu('miaoYun') < 5) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return game.hasPlayer(function(target) {
                        return target.side != player.side &&
                            get.damageEffect2(target, player, 2) > 0;
                    });
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "miaoYun": {
                        "intro": {
                            "name": "喵运",
                            "content": "mark",
                            "max": 5,
                        },
                        "onremove": "storage",
                        "markimage": "extension/bigcowcow/mark_miaoYun.png",
                    },
                    "yiJiBaoPai": {
                        "intro": {
                            "name": "宝牌",
                            "markcount": "gaiPai",
                            "content": "gaiPai",
                            "max": 1,
                            "show": true,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                        "getCard": function(player) {
                    var cards = player.getGaiPai('yiJiBaoPai');
                    return cards && cards[0];
                },
                        "discardCurrent": async function(player) {
                    var cards = player.getGaiPai(
                        'yiJiBaoPai'
                    ).slice();
                    if(!cards.length) return;
                    await player.discard(
                        cards,
                        'yiJiBaoPai'
                    ).set('visible', true)
                        .set('showCards', true);
                },
                        "replace": async function(player, card, shown) {
                    await lib.skill.yiJiBaoPai
                        .discardCurrent(player);
                    if(!card) {
                        var cards = get.cards(1);
                        card = cards && cards[0];
                        if(!card) return null;
                        await game.cardsGotoOrdering([card]);
                    }
                    if(!shown) {
                        await player.showCards(
                            [card],
                            '展示新的【宝牌】'
                        );
                    }
                    await player.addGaiPai(
                        [card],
                        player,
                        'yiJiBaoPai'
                    );
                    return card;
                },
                    },
                    "shiDiFuJian": {
                        "charlotte": true,
                        "durability": {
                            "muJian": 2,
                            "jinJian": 1,
                            "shiJian": 2,
                            "tieJian": 3,
                            "zuanShiJian": 4,
                            "xiaJieHeJinJian": 5,
                        },
                        "swordName": {
                            "muJian": "木剑",
                            "jinJian": "金剑",
                            "shiJian": "石剑",
                            "tieJian": "铁剑",
                            "zuanShiJian": "钻石剑",
                            "xiaJieHeJinJian": "下界合金剑",
                        },
                        "swordInfo": {
                            "muJian": "响应【简易工具】：攻击时移除1【耐久】；若未命中，攻击结算结束后将本次使用的攻击牌作为【素材】。",
                            "jinJian": "响应【急速挥砍】【回合限定】：【攻击行动】结束时移除1【耐久】，+1【攻击行动】或【法术行动】。<br>被动【矿物勘探】：【采集】改为查看牌库顶4张牌，选择1张作为【素材】，弃置其余牌。",
                            "shiJian": "响应【沉重格挡】：应战时移除1【耐久】，可以将任意攻击牌视为与当前攻击同系的攻击牌应战；若命中，额外发动一次【采集】。<br>被动【粗糙采掘】：【采集】改为查看牌库顶2张牌，选择1张作为【素材】，弃置另一张。",
                            "tieJian": "响应【稳定锋刃】：攻击时移除1【耐久】，本次攻击伤害+1。<br>被动【矿脉精炼】：【采集】改为查看牌库顶3张牌，选择1张作为【素材】，弃置其余牌。",
                            "zuanShiJian": "响应【钻石破甲】：攻击时移除1【耐久】，本次攻击伤害+1；若为主动攻击，则无法被应战。<br>响应【精准开采】：【采集】时可以改为令任意一名有可弃置牌的角色弃置1张牌作为【素材】。",
                            "xiaJieHeJinJian": "响应【不毁之锋】：攻击时移除1【耐久】，本次攻击伤害+1且无法被应战。<br>被动【下界锻造】：攻击结算结束时，若【耐久】为0，展示并弃置所有【素材】，以其中火系或暗系【素材】恢复【耐久】。",
                        },
                        "getSword": function(player) {
                    return player.storage.shiDiFuDangQianJian || null;
                },
                        "getMaxDurability": function(player, sword) {
                    sword = sword || lib.skill.shiDiFuJian.getSword(player);
                    return lib.skill.shiDiFuJian.durability[sword] || 0;
                },
                        "getDurability": function(player) {
                    return Math.max(0, player.storage.shiDiFuNaiJiu || 0);
                },
                        "getSwordIntro": function(player, sword) {
                    var durability = lib.skill.shiDiFuJian.getDurability(player);
                    var max = lib.skill.shiDiFuJian.getMaxDurability(player, sword);
                    var info = (lib.translate && lib.translate[sword + '_info']) ||
                        lib.skill.shiDiFuJian.swordInfo[sword];
                    return "【耐久】：" + durability + "/" + max + "<br>" +
                        info;
                },
                        "setSword": function(player, sword) {
                    var oldSword = lib.skill.shiDiFuJian.getSword(player);
                    if(oldSword && oldSword != sword) {
                        player.unmarkSkill(oldSword);
                    }
                    var max = lib.skill.shiDiFuJian.getMaxDurability(player, sword);
                    player.storage.shiDiFuDangQianJian = sword;
                    player.storage.shiDiFuNaiJiu = max;
                    player.markSkill(sword);
                    player.update();
                    game.log(player, '将专属卡', '#g【' + lib.skill.shiDiFuJian.swordName[sword] + '】', '置于面前，并在其上放置', max, '【耐久】');
                },
                        "changeDurability": function(player, num) {
                    if(typeof num != 'number' || !num) return 0;
                    var sword = lib.skill.shiDiFuJian.getSword(player);
                    if(!sword) return 0;
                    var old = lib.skill.shiDiFuJian.getDurability(player);
                    var max = lib.skill.shiDiFuJian.getMaxDurability(player, sword);
                    var current = Math.max(0, Math.min(max, old + num));
                    player.storage.shiDiFuNaiJiu = current;
                    player.markSkill(sword);
                    player.update();
                    var changed = current - old;
                    if(changed > 0) {
                        game.log(player, '的', '#g【' + lib.skill.shiDiFuJian.swordName[sword] + '】', '+', changed, '【耐久】');
                    } else if(changed < 0) {
                        game.log(player, '的', '#g【' + lib.skill.shiDiFuJian.swordName[sword] + '】', '移除', -changed, '【耐久】');
                    }
                    return changed;
                },
                        "removeSword": function(player) {
                    var sword = lib.skill.shiDiFuJian.getSword(player);
                    if(!sword) return;
                    game.log(player, '将', '#g【' + lib.skill.shiDiFuJian.swordName[sword] + '】', '置于游戏外');
                    player.unmarkSkill(sword);
                    delete player.storage.shiDiFuDangQianJian;
                    delete player.storage.shiDiFuNaiJiu;
                    player.update();
                },
                        "onremove": function(player) {
                    var sword = lib.skill.shiDiFuJian.getSword(player);
                    if(sword) player.unmarkSkill(sword);
                    delete player.storage.shiDiFuDangQianJian;
                    delete player.storage.shiDiFuNaiJiu;
                },
                    },
                    "jianYiGongJu": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        lib.skill.shiDiFuJian.getSword(player) == 'muJian' &&
                        lib.skill.shiDiFuJian.getDurability(player) > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '简易工具：是否移除1【耐久】发动？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger.target;
                        if(!target || target.side == player.side ||
                            player.countGaiPai('shiDiFuSuCai') >= 5) {
                            return false;
                        }
                        var xiBie = get.xiBie(trigger.card);
                        // 仅在目标较可能拥有合法应战牌、从而有机会把
                        // 未命中的攻击牌转成素材时消耗木剑耐久。
                        return target.countCards('h', function(card) {
                            return get.type(card, target) == 'gongJi' &&
                                (get.xiBie(card) == xiBie ||
                                    get.xiBie(card) == 'an');
                        }) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    trigger.customArgs = trigger.customArgs || {};
                    trigger.customArgs.jianYiGongJu = true;
                    lib.skill.shiDiFuJian.changeDurability(player, -1);
                    await event.trigger('shiDiFuYiChuNaiJiu');
                },
                        "group": "jianYiGongJu_weiMingZhong",
                        "subSkill": {
                            "weiMingZhong": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                !event.target &&
                                event.customArgs &&
                                event.customArgs.jianYiGongJu &&
                                Array.isArray(event.cards) &&
                                event.cards.some(function(card) {
                                    return card && !card.destroyed;
                                }) &&
                                player.countGaiPai('shiDiFuSuCai') < 5;
                        },
                                "content": async function(event, trigger, player) {
                            var card = trigger.cards.find(function(current) {
                                return current && !current.destroyed;
                            });
                            if(!card) return;
                            await player.addGaiPai(
                                card,
                                player,
                                'shiDiFuSuCai'
                            );
                        },
                            },
                        },
                    },
                    "jiSuHuiKan": {
                        "usable": 1,
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        get.is.gongJiXingDong(event) &&
                        lib.skill.shiDiFuJian.getSword(player) == 'jinJian' &&
                        lib.skill.shiDiFuJian.getDurability(player) > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '急速挥砍：是否移除1【耐久】，+1【攻击行动】或【法术行动】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var hasActionCard = player.countCards(
                            'h',
                            function(card) {
                                var type = get.type(card, player);
                                return type == 'gongJi' || type == 'faShu';
                            }
                        ) > 0;
                        return hasActionCard && game.hasPlayer(function(current) {
                            return current.side != player.side;
                        });
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    lib.skill.shiDiFuJian.changeDurability(player, -1);
                    await event.trigger('shiDiFuYiChuNaiJiu');
                    player.addGongJiOrFaShu();
                },
                    },
                    "chenZhongGeDang": {
                        "enable": "yingZhan",
                        "filter": function(event, player) {
                    if(!event || event.canYingZhan == false || !event.card ||
                        lib.skill.shiDiFuJian.getSword(player) != 'shiJian' ||
                        lib.skill.shiDiFuJian.getDurability(player) <= 0) {
                        return false;
                    }
                    return player.hasCard(function(card) {
                        return get.type(card) == 'gongJi' &&
                            (get.name(card) != 'anMie' || event.canAnMie != false);
                    }, 'h');
                },
                        "filterCard": function(card, player, event) {
                    event = event || _status.event;
                    if(!event || !event.card) return false;
                    return get.type(card) == 'gongJi' &&
                        (get.name(card) != 'anMie' || event.canAnMie != false);
                },
                        "position": "h",
                        "filterTarget": function(card, player, target) {
                    var yingZhanEvent = _status.event.getParent('_yingZhan');
                    if(!yingZhanEvent || !yingZhanEvent.source) return false;
                    return player != target &&
                        player.side != target.side &&
                        target != yingZhanEvent.source &&
                        lib.filter.targetEnabled(card, player, target);
                },
                        "viewAs": function(cards, player) {
                    if(!cards.length) return;
                    var card = cards[0];
                    var event = _status.event;
                    return {
                        name: get.name(card),
                        xiBie: get.xiBie(event.card),
                        mingGe: get.mingGe(card),
                        duYou: get.duYou(card),
                        isCard: true,
                    };
                },
                        "group": [
                            "chenZhongGeDang_xiaoGuo",
                            "chenZhongGeDang_mingZhong",
                        ],
                        "ai": {
                            "order": 5,
                        },
                        "subSkill": {
                            "xiaoGuo": {
                                "trigger": {
                                    "player": "gongJiBefore",
                                },
                                "firstDo": true,
                                "forced": true,
                                "priority": 10,
                                "filter": function(event, player) {
                            return !!event &&
                                event.skill == 'chenZhongGeDang' &&
                                lib.skill.shiDiFuJian.getSword(player) == 'shiJian' &&
                                lib.skill.shiDiFuJian.getDurability(player) > 0;
                        },
                                "content": async function(event, trigger, player) {
                            trigger.customArgs = trigger.customArgs || {};
                            trigger.customArgs.chenZhongGeDang = true;
                            lib.skill.shiDiFuJian.changeDurability(player, -1);
                            if(trigger.cards && trigger.cards.length) {
                                game.setXiBie(
                                    trigger.card,
                                    get.xiBie(trigger.cards[0])
                                );
                            }
                            await event.trigger('shiDiFuYiChuNaiJiu');
                        },
                            },
                            "mingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.yingZhan == true &&
                                event.customArgs &&
                                event.customArgs.chenZhongGeDang;
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill.caiJi.collect(player);
                        },
                            },
                        },
                    },
                    "wenDingFengRen": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        lib.skill.shiDiFuJian.getSword(player) == 'tieJian' &&
                        lib.skill.shiDiFuJian.getDurability(player) > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '稳定锋刃：是否移除1【耐久】，令本次攻击伤害+1？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var target = _status.event.getTrigger().target;
                        return !!target && target.side != player.side &&
                            get.damageEffect2(target, player, 1) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    lib.skill.shiDiFuJian.changeDurability(player, -1);
                    trigger.changeDamageNum(1);
                    await event.trigger('shiDiFuYiChuNaiJiu');
                },
                    },
                    "kuangMaiJingLian": {
                        "charlotte": true,
                    },
                    "kuangWuKanTan": {
                        "charlotte": true,
                    },
                    "cuCaoCaiJue": {
                        "charlotte": true,
                    },
                    "zuanShiPoJia": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        lib.skill.shiDiFuJian.getSword(player) == 'zuanShiJian' &&
                        lib.skill.shiDiFuJian.getDurability(player) > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '钻石破甲：是否移除1【耐久】，令本次攻击伤害+1？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var target = _status.event.getTrigger().target;
                        if(!target || target.side == player.side) return false;
                        return get.damageEffect2(target, player, 1) > 0 ||
                            target.countCards('h') >= 3;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    lib.skill.shiDiFuJian.changeDurability(player, -1);
                    trigger.changeDamageNum(1);
                    if(trigger.yingZhan != true) {
                        trigger.wuFaYingZhan();
                    }
                    await event.trigger('shiDiFuYiChuNaiJiu');
                },
                    },
                    "jingZhunKaiCai": {
                        "charlotte": true,
                    },
                    "buHuiZhiFeng": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        lib.skill.shiDiFuJian.getSword(player) == 'xiaJieHeJinJian' &&
                        lib.skill.shiDiFuJian.getDurability(player) > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '不毁之锋：是否移除1【耐久】，令本次攻击伤害+1且无法被应战？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var target = _status.event.getTrigger().target;
                        if(!target || target.side == player.side) return false;
                        return get.damageEffect2(target, player, 1) > 0 ||
                            target.countCards('h') >= 2 ||
                            get.shiQi(!player.side) <= 2;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    lib.skill.shiDiFuJian.changeDurability(player, -1);
                    trigger.changeDamageNum(1);
                    trigger.wuFaYingZhan();
                    await event.trigger('shiDiFuYiChuNaiJiu');
                },
                    },
                    "xiaJieDuanZao": {
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        lib.skill.shiDiFuJian.getSword(player) == 'xiaJieHeJinJian' &&
                        lib.skill.shiDiFuJian.getDurability(player) <= 0 &&
                        player.countGaiPai('shiDiFuSuCai') > 0;
                },
                        "content": async function(event, trigger, player) {
                    var materials = player.getGaiPai('shiDiFuSuCai').slice();
                    if(!materials.length) return;
                    await player.showCards(materials, '下界锻造：展示所有【素材】');
                    var matching = materials.filter(function(card) {
                        return ['huo', 'an'].includes(get.xiBie(card));
                    });
                    await player.discard(
                        materials,
                        'shiDiFuSuCai'
                    ).set('visible', true);
                    if(matching.length) {
                        lib.skill.shiDiFuJian.changeDurability(
                            player,
                            matching.length
                        );
                    }
                },
                    },
                    "erDaoLiuZhuangTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "双",
                        "intro": {
                            "name": "二刀流",
                            "content": function(storage, player) {
                        var xiBie =
                            player.storage.erDaoLiuRuXingXiBie;
                        var first =
                            player.storage.erDaoLiuDiYiDao === true;
                        return '入形攻击系别：' +
                            (xiBie ? get.translation(xiBie) : '未知') +
                            '；首次异系增伤' +
                            (first ? '尚未结算' : '已结算');
                    },
                        },
                        "group": [
                            "erDaoLiuZhuangTai_diYiDao",
                            "erDaoLiuZhuangTai_qingChu",
                        ],
                        "onremove": function(player) {
                    delete player.storage.erDaoLiuRuXingXiBie;
                    delete player.storage.erDaoLiuDiYiDao;
                    player.syncStorage('erDaoLiuRuXingXiBie');
                },
                        "subSkill": {
                            "diYiDao": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "priority": 30,
                                "filter": function(event, player) {
                            return !!event &&
                                event.yingZhan != true &&
                                player.storage.erDaoLiuDiYiDao ===
                                    true;
                        },
                                "content": function(event, trigger, player) {
                            var oldXiBie =
                                player.storage
                                    .erDaoLiuRuXingXiBie;
                            if(get.xiBie(trigger.card) != oldXiBie) {
                                trigger.changeDamageNum(1);
                            }
                            player.storage.erDaoLiuDiYiDao = false;
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'erDaoLiuZhuangTai'
                            );
                        },
                                "content": async function(event, trigger, player) {
                            var count =
                                player.countZhiShiWu('lianJi');
                            if(count > 0) {
                                await player.removeZhiShiWu(
                                    'lianJi',
                                    count
                                );
                            }
                            if(player.isHengZhi()) {
                                await player.chongZhi();
                            }
                            player.removeSkill('erDaoLiuZhuangTai');
                        },
                            },
                        },
                    },
                    "xingBaoQiLiuZhanFengSuo": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "封",
                        "intro": {
                            "name": "星爆气流斩",
                            "content": "本回合不能再获得或执行额外【攻击行动】；复合行动不能选择攻击。",
                        },
                        "isActionAttackChoice": function(player) {
                    var current = _status.event;
                    var guard = 0;
                    while(current && guard < 20) {
                        if(current.name == '_yingZhan') return false;
                        if((current.name == 'gongJi' ||
                            current.name == 'gongJiOrFaShu') &&
                            current.action === true) {
                            return true;
                        }
                        if(typeof current.getParent != 'function') break;
                        var parent = current.getParent();
                        if(!parent || parent == current) break;
                        current = parent;
                        guard++;
                    }
                    return false;
                },
                        "sanitize": function(player, relatedEvent) {
                    if(!player) return;
                    if(!Array.isArray(
                        player.storage.extraXingDong
                    )) {
                        player.storage.extraXingDong = [];
                    }
                    player.storage.extraXingDong =
                        player.storage.extraXingDong.reduce(
                            function(result, action) {
                                if(!action ||
                                    action.xingDong == 'gongJi') {
                                    return result;
                                }
                                if(action.xingDong ==
                                    'gongJiOrFaShu') {
                                    var copy = Object.assign(
                                        {},
                                        action,
                                        { xingDong: 'faShu' }
                                    );
                                    result.push(copy);
                                } else {
                                    result.push(action);
                                }
                                return result;
                            },
                            []
                        );
                    var phase = relatedEvent &&
                        relatedEvent.getParent &&
                        relatedEvent.getParent('xingDong');
                    var currentPureAttack = !!phase &&
                        phase.name == 'xingDong' &&
                        phase.player == player &&
                        phase.xingDong == 'gongJi' &&
                        phase.extraXingDong !== true;
                    player.storage.gongJi =
                        currentPureAttack ? 1 : 0;
                },
                        "mod": {
                            "cardEnabled": function(card, player) {
                        if(get.type(card) == 'gongJi' &&
                            lib.skill
                                .xingBaoQiLiuZhanFengSuo
                                .isActionAttackChoice(player)) {
                            return false;
                        }
                    },
                        },
                        "group": [
                            "xingBaoQiLiuZhanFengSuo_zhengLi",
                            "xingBaoQiLiuZhanFengSuo_zhiJieGongJi",
                            "xingBaoQiLiuZhanFengSuo_qingChu",
                        ],
                        "subSkill": {
                            "zhengLi": {
                                "trigger": {
                                    "player": [
                                        "useSkillAfter",
                                        "useCardAfter",
                                        "gongJiEnd",
                                        "faShuEnd",
                                        "teShuEnd",
                                    ],
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'xingBaoQiLiuZhanFengSuo'
                            );
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.xingBaoQiLiuZhanFengSuo
                                .sanitize(player, trigger);
                        },
                            },
                            "zhiJieGongJi": {
                                "trigger": {
                                    "player": "gongJiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                            return event.extraXingDongType ==
                                'gongJi';
                        },
                                "content": function(event, trigger, player) {
                            trigger.cancel();
                            game.log(
                                player,
                                '的额外攻击被【星爆气流斩】取消'
                            );
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            player.removeSkill(
                                'xingBaoQiLiuZhanFengSuo'
                            );
                        },
                            },
                        },
                    },
                    "moQiShaoNianQiong": {
                        "isMoraleCausedBy": function(event, player) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 30) {
                        if(current.source == player) return true;
                        if((current.name == 'useSkill' ||
                            current.name == 'useCard') &&
                            current.player == player) return true;
                        current = current.parent ||
                            (current.getParent && current.getParent());
                        guard++;
                    }
                    return false;
                },
                        "trigger": {
                            "player": "phaseEnd",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !player.storage.xiaoYanUsedTeShu &&
                        !player.storage.xiaoYanReducedEnemyMorale;
                },
                        "content": async function(event, trigger, player) {
                    if(get.shiQi(player.side) <
                        get.shiQi(!player.side)) {
                        await player.addZhiShiWu('xiaoYanDouQi', 2);
                        await player.addNengLiang('shuiJing', 1);
                    } else {
                        await player.addZhiShiWu('xiaoYanDouQi', 1);
                    }
                },
                        "group": [
                            "moQiShaoNianQiong_chongZhi",
                            "moQiShaoNianQiong_teShu",
                            "moQiShaoNianQiong_shiQi",
                        ],
                        "subSkill": {
                            "chongZhi": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            player.storage.xiaoYanUsedTeShu = false;
                            player.storage.xiaoYanReducedEnemyMorale = false;
                        },
                            },
                            "teShu": {
                                "trigger": {
                                    "player": "teShuEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            player.storage.xiaoYanUsedTeShu = true;
                        },
                            },
                            "shiQi": {
                                "trigger": {
                                    "global": "changeShiQiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return _status.currentPhase == player &&
                                event.num < 0 &&
                                event.side != player.side &&
                                lib.skill.moQiShaoNianQiong
                                    .isMoraleCausedBy(event, player);
                        },
                                "content": function(event, trigger, player) {
                            player.storage.xiaoYanReducedEnemyMorale = true;
                        },
                            },
                        },
                    },
                    "fenJue": {
                        "trigger": {
                            "player": "phaseBegin",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return lib.skill.xiaoYanYiHuoManager
                        .getDim(player).length > 0;
                },
                        "content": async function(event, trigger, player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var cards = manager.getDimCards(player);
                    if(!cards.length) return;
                    var links = await player.chooseCardButton(
                        cards,
                        true,
                        '【焚决】：选择1张黯淡的【异火】翻至明亮面'
                    ).set('ai', function(button) {
                        var fire = manager.getFireByCard(button.link);
                        return {
                            qingLianDiXinHuo: 3,
                            guLingLengHuo: 2,
                            yunLuoXinYan: 1,
                        }[fire] || 0;
                    }).forResultLinks();
                    var fire = manager.getFireByCard(links[0]);
                    if(fire) await manager.setForm(player, fire, 'bright');
                },
                    },
                    "baJiBeng": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "filter": function(event, player) {
                    return event.yingZhan != true &&
                        player.countZhiShiWu('xiaoYanDouQi') > 0 &&
                        event.target &&
                        event.target.countZhiShiWu('xiaoYanAnJin') == 0;
                },
                        "check": function(event, player) {
                    return !!event.target && event.target.side != player.side;
                },
                        "logTarget": "target",
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('xiaoYanDouQi', 1);
                    trigger.target.storage.xiaoYanAnJinSource =
                        player.playerid;
                    trigger.target.syncStorage('xiaoYanAnJinSource');
                    await trigger.target.addZhiShiWu(
                        'xiaoYanAnJin',
                        1,
                        true
                    );
                },
                    },
                    "fenJueLianHua": {
                        "nextFire": function(player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    if(!manager.isRefined(player, 'qingLianDiXinHuo')) {
                        return {
                            fire: 'qingLianDiXinHuo',
                            energy: 'shuiJing',
                            cost: 2,
                            damage: 3,
                        };
                    }
                    if(!manager.isRefined(player, 'yunLuoXinYan')) {
                        return {
                            fire: 'yunLuoXinYan',
                            energy: 'baoShi',
                            cost: 3,
                            damage: 3,
                        };
                    }
                    if(!manager.isRefined(player, 'guLingLengHuo')) {
                        return {
                            fire: 'guLingLengHuo',
                            energy: 'baoShi',
                            cost: 3,
                            damage: 4,
                        };
                    }
                    return null;
                },
                        "findTrack": function(event, token) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 30) {
                        if(current.xiaoYanLianHuaMoraleTrack == token) {
                            return true;
                        }
                        current = current.parent ||
                            (current.getParent && current.getParent());
                        guard++;
                    }
                    return false;
                },
                        "aiCanRefine": function(player) {
                    var info = lib.skill.fenJueLianHua.nextFire(player);
                    if(!info) return false;
                    var current = _status.event;
                    if(lib.skill._heCheng && current &&
                        lib.skill._heCheng.filter(current, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return player.countCards('h') + info.damage <=
                        player.getHandcardLimit();
                },
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    var info = lib.skill.fenJueLianHua.nextFire(player);
                    if(!info ||
                        player.countZhiShiWu('xiaoYanDouQi') <
                            info.cost) return false;
                    return info.energy == 'shuiJing' ?
                        player.canBiShaShuiJing() :
                        player.canBiShaBaoShi();
                },
                        "content": async function(event, trigger, player) {
                    var info = lib.skill.fenJueLianHua.nextFire(player);
                    if(!info) return;
                    if(info.energy == 'shuiJing') {
                        await player.removeBiShaShuiJing();
                    } else {
                        await player.removeBiShaBaoShi();
                    }
                    await player.removeZhiShiWu(
                        'xiaoYanDouQi',
                        info.cost
                    );
                    var token = player.playerid + '_' +
                        Date.now() + '_' + Math.random();
                    player.storage.xiaoYanLianHuaMoraleTrack = token;
                    player.storage.xiaoYanLianHuaFailed = false;
                    await player.faShuDamage(info.damage, player)
                        .set('xiaoYanLianHuaMoraleTrack', token);
                    var failed =
                        player.storage.xiaoYanLianHuaFailed === true;
                    delete player.storage.xiaoYanLianHuaMoraleTrack;
                    delete player.storage.xiaoYanLianHuaFailed;
                    if(failed) {
                        await player.addZhiShiWu('xiaoYanDouQi', 1);
                        game.log(
                            player,
                            '炼化',
                            get.translation(info.fire),
                            '失败'
                        );
                        return;
                    }
                    var added = await lib.skill.xiaoYanYiHuoManager.addFire(
                        player,
                        info.fire
                    );
                    if(!added) {
                        game.log(player, '未能放置', get.translation(info.fire));
                        return;
                    }
                    game.log(
                        player,
                        '成功炼化了',
                        get.translation(info.fire)
                    );
                    if(info.fire == 'guLingLengHuo') {
                        player.removeSkill('fenJueLianHua');
                    }
                },
                        "check": function(event, player) {
                    return lib.skill.fenJueLianHua.aiCanRefine(player);
                },
                        "group": "fenJueLianHua_jiLu",
                        "subSkill": {
                            "jiLu": {
                                "trigger": {
                                    "global": "changeShiQiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            var token = player.storage
                                .xiaoYanLianHuaMoraleTrack;
                            return !!token &&
                                event.num < 0 &&
                                event.side == player.side &&
                                lib.skill.fenJueLianHua
                                    .findTrack(event, token);
                        },
                                "content": function(event, trigger, player) {
                            player.storage.xiaoYanLianHuaFailed = true;
                        },
                            },
                        },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.fenJueLianHua
                            .aiCanRefine(player) ? 4 : 0;
                    },
                        },
                    },
                    "tianHuoSanXuanBian": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    var count = lib.skill.xiaoYanYiHuoManager
                        .getBright(player).length;
                    return player.canBiShaShuiJing() &&
                        count > 0 &&
                        player.countZhiShiWu('xiaoYanDouQi') > 0 &&
                        player.countCards('h', function(card) {
                            return get.type(card, player) == 'gongJi';
                        }) > 0 &&
                        game.hasPlayer(function(target) {
                            return target.side != player.side;
                        });
                },
                        "cost": async function(event, trigger, player) {
                    var fires = lib.skill.xiaoYanYiHuoManager
                        .getBright(player);
                    var max = Math.min(
                        3,
                        fires.length,
                        player.countZhiShiWu('xiaoYanDouQi')
                    );
                    var fireNames = {
                        qingLianDiXinHuo: '青莲地心火',
                        yunLuoXinYan: '陨落心炎',
                        guLingLengHuo: '骨灵冷火',
                    };
                    var choices = fires.map(function(fire) {
                        return [fire, fireNames[fire] || get.translation(fire)];
                    });
                    var desired = 1;
                    if(max >= 2 && game.hasPlayer(function(target) {
                        return target.side != player.side &&
                            target.countZhiLiao() > 0;
                    })) desired = 2;
                    if(max >= 3 && game.hasPlayer(function(target) {
                        return target.side != player.side &&
                            (target.countCards('h') >= 3 ||
                                get.shiQi(!player.side) <= 3);
                    })) desired = 3;
                    var links = await player.chooseButton(
                        [
                            '【天火三玄变】：选择1至' + max +
                                '张明亮【异火】',
                            [choices, 'textbutton'],
                        ],
                        [1, max]
                    ).set('desiredCount', desired)
                        .set('ai', function(button) {
                        return ui.selected.buttons.length <
                            _status.event.desiredCount ? 1 : -1;
                    }).forResultLinks() || [];
                    event.result = {
                        bool: links.length > 0,
                        cost_data: links,
                    };
                },
                        "content": async function(event, trigger, player) {
                    var fires = event.cost_data.slice();
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu(
                        'xiaoYanDouQi',
                        fires.length
                    );
                    player.storage.tianHuoSanXuanBianState = {
                        fires: fires,
                        x: fires.length,
                    };
                    player.addSkill('tianHuoSanXuanBianState');
                    player.addTempSkill(
                        'tianHuoSanXuanBianJinZhiFoNu',
                        { player: 'phaseEnd' }
                    );
                },
                        "check": function(event, player) {
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    if(!player.countCards('h', function(card) {
                        return get.type(card, player) == 'gongJi';
                    })) return false;
                    return game.hasPlayer(function(target) {
                        return target.side != player.side;
                    });
                },
                        "ai": {
                            "shuiJing": true,
                            "order": 5,
                        },
                    },
                    "foNuHuoLian": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() &&
                        !player.hasSkill(
                            'tianHuoSanXuanBianJinZhiFoNu'
                        ) &&
                        lib.skill.xiaoYanYiHuoManager
                            .getBright(player).length >= 2 &&
                        game.hasPlayer(function(target) {
                            return target.side != player.side;
                        });
                },
                        "cost": async function(event, trigger, player) {
                    var fires = lib.skill.xiaoYanYiHuoManager
                        .getBright(player);
                    var desired = fires.length >= 3 &&
                        game.countPlayer(function(target) {
                            return target.side != player.side;
                        }) >= 2 ? 3 : 2;
                    var links = await player.chooseButton(
                        [
                            '【佛怒火莲】：选择2张或3张明亮【异火】',
                            [fires, 'textbutton'],
                        ],
                        [2, Math.min(3, fires.length)],
                        true
                    ).set('desiredCount', desired)
                        .set('ai', function(button) {
                        return ui.selected.buttons.length <
                            _status.event.desiredCount ? 1 : -1;
                    }).forResultLinks();
                    if(links.length < 2) {
                        event.result = { bool: false };
                        return;
                    }
                    var targets = await player.chooseTarget(
                        true,
                        '【佛怒火莲】：选择一名目标对手',
                        function(card, player, target) {
                            return target.side != player.side;
                        }
                    ).set('ai', function(target) {
                        return get.damageEffect(target, 3);
                    }).forResultTargets();
                    event.result = {
                        bool: targets.length > 0,
                        targets: targets,
                        cost_data: links,
                    };
                },
                        "content": async function(event, trigger, player) {
                    var fires = event.cost_data.slice();
                    var target = event.targets[0];
                    await player.removeBiShaBaoShi();
                    if(fires.length == 2) {
                        if(target && target.isIn()) {
                            await target.faShuDamage(2, player);
                        }
                        await player.faShuDamage(1, player);
                    } else {
                        if(target && target.isIn()) {
                            await target.faShuDamage(3, player);
                        }
                        var others = game.filterPlayer(function(current) {
                            return current.side != player.side &&
                                current != target;
                        }).sortBySeat(player);
                        for(var current of others) {
                            await current.faShuDamage(1, player);
                        }
                    }
                    await lib.skill.xiaoYanYiHuoManager.dimFires(
                        player,
                        fires
                    );
                },
                        "ai": {
                            "baoShi": true,
                            "order": function(item, player) {
                        var enemies = game.countPlayer(function(target) {
                            return target.side != player.side;
                        });
                        var fires = lib.skill.xiaoYanYiHuoManager
                            .getBright(player).length;
                        return enemies > 0 && fires >= 2 ? 6 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            var enemies = game.countPlayer(function(target) {
                                return target.side != player.side;
                            });
                            var fires = lib.skill.xiaoYanYiHuoManager
                                .getBright(player).length;
                            return fires >= 3 && enemies >= 2 ? 3 : 1;
                        },
                            },
                        },
                    },
                    "xiaoYanDouQi": {
                        "intro": {
                            "name": "斗气",
                            "content": "mark",
                            "max": 4,
                        },
                        "onremove": "storage",
                        "markimage": "extension/bigcowcow/mark_douQi.png",
                    },
                    "xiaoYanYiHuoManager": {
                        "charlotte": true,
                        "fires": [
                            "qingLianDiXinHuo",
                            "yunLuoXinYan",
                            "guLingLengHuo",
                        ],
                        "dimSkills": {
                            "qingLianDiXinHuo": "anDanQingLianDiXinHuo",
                            "yunLuoXinYan": "anDanYunLuoXinYan",
                            "guLingLengHuo": "anDanGuLingLengHuo",
                        },
                        "faces": {
                            "qingLianDiXinHuo": {
                                "bright": "xiaoYanQingLianDiXinHuoKa",
                                "dim": "xiaoYanAnDanQingLianDiXinHuoKa",
                            },
                            "yunLuoXinYan": {
                                "bright": "xiaoYanYunLuoXinYanKa",
                                "dim": "xiaoYanAnDanYunLuoXinYanKa",
                            },
                            "guLingLengHuo": {
                                "bright": "xiaoYanGuLingLengHuoKa",
                                "dim": "xiaoYanAnDanGuLingLengHuoKa",
                            },
                        },
                        "getCards": function(player, fire) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var dim = manager.dimSkills[fire];
                    return player.getExpansions(fire)
                        .concat(dim ? player.getExpansions(dim) : []);
                },
                        "getCard": function(player, fire) {
                    return lib.skill.xiaoYanYiHuoManager
                        .getCards(player, fire)[0] || null;
                },
                        "getFireByCard": function(card) {
                    if(!card) return null;
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    return manager.fires.find(function(fire) {
                        var faces = manager.faces[fire];
                        return faces && (card.name == faces.bright ||
                            card.name == faces.dim);
                    }) || null;
                },
                        "isRefined": function(player, fire) {
                    return !!lib.skill.xiaoYanYiHuoManager
                        .getCard(player, fire);
                },
                        "isBright": function(player, fire) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var card = manager.getCard(player, fire);
                    return !!card && card.name == manager.faces[fire].bright;
                },
                        "getBright": function(player) {
                    return lib.skill.xiaoYanYiHuoManager.fires
                        .filter(function(fire) {
                            return lib.skill.xiaoYanYiHuoManager
                                .isBright(player, fire);
                        });
                },
                        "getDim": function(player) {
                    return lib.skill.xiaoYanYiHuoManager.fires
                        .filter(function(fire) {
                            return lib.skill.xiaoYanYiHuoManager
                                .isRefined(player, fire) &&
                                !lib.skill.xiaoYanYiHuoManager
                                    .isBright(player, fire);
                        });
                },
                        "getBrightCards": function(player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    return manager.getBright(player).map(function(fire) {
                        return manager.getCard(player, fire);
                    }).filter(Boolean);
                },
                        "getDimCards": function(player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    return manager.getDim(player).map(function(fire) {
                        return manager.getCard(player, fire);
                    }).filter(Boolean);
                },
                        "placeForm": async function(player, fire, form) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var dim = manager.dimSkills[fire];
                    var targetSkill = form == 'bright' ? fire : dim;
                    var otherSkill = form == 'bright' ? dim : fire;
                    var faces = manager.faces[fire];
                    if(!dim || !faces) return false;
                    var oldCards = manager.getCards(player, fire);
                    if(oldCards.length) {
                        var lose = player.lose(oldCards, ui.special);
                        lose.set('type', 'xiaoYanYiHuoFlip');
                        lose.set('getlx', false);
                        await lose;
                    }
                    if(otherSkill && player.hasSkill(otherSkill)) {
                        player.removeSkill(otherSkill);
                    }
                    if(!player.hasSkill(targetSkill)) {
                        player.addSkill(targetSkill);
                    }
                    var card = game.createCard2(faces[form]);
                    var gain = player.addToExpansion(card, 'gain2');
                    gain.gaintag.add(targetSkill);
                    await gain;
                    if(!player.getExpansions(targetSkill).includes(card)) {
                        if(player.hasSkill(targetSkill)) {
                            player.removeSkill(targetSkill);
                        }
                        return false;
                    }
                    return card;
                },
                        "addFire": async function(player, fire) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    if(manager.isRefined(player, fire)) return false;
                    return !!(await manager.placeForm(player, fire, 'bright'));
                },
                        "setForm": async function(player, fire, form) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    if(!manager.isRefined(player, fire)) return false;
                    var card = manager.getCard(player, fire);
                    if(card && card.name == manager.faces[fire][form]) return true;
                    if(!await manager.placeForm(player, fire, form)) return false;
                    game.log(
                        player,
                        '将',
                        '#' + get.translation(fire),
                        '翻至',
                        form == 'bright' ? '#y明亮面' : '#g黯淡面'
                    );
                    return true;
                },
                        "dimFires": async function(player, fires) {
                    for(var fire of fires) {
                        await lib.skill.xiaoYanYiHuoManager.setForm(
                            player,
                            fire,
                            'dim'
                        );
                    }
                },
                        "trigger": {
                            "global": "gameStart",
                        },
                        "forced": true,
                        "firstDo": true,
                        "priority": 100,
                        "popup": false,
                        "content": async function(event, trigger, player) {
                    game.addGlobalSkill('xiaoYanAnJin');
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    for(var fire of manager.fires) {
                        var cards = manager.getCards(player, fire);
                        if(cards.length) {
                            var lose = player.lose(cards, ui.special);
                            lose.set('type', 'xiaoYanYiHuoInit');
                            lose.set('getlx', false);
                            await lose;
                        }
                        var dim = manager.dimSkills[fire];
                        if(player.hasSkill(fire)) player.removeSkill(fire);
                        if(dim && player.hasSkill(dim)) {
                            player.removeSkill(dim);
                        }
                    }
                },
                        "onremove": function(player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    for(var fire of manager.fires) {
                        var cards = manager.getCards(player, fire);
                        if(cards.length) {
                            var lose = player.lose(cards, ui.special);
                            lose.set('type', 'xiaoYanYiHuoRemove');
                            lose.set('getlx', false);
                        }
                        var dim = manager.dimSkills[fire];
                        player.removeSkill(fire);
                        if(dim) player.removeSkill(dim);
                    }
                },
                    },
                    "xiaoYanAnJin": {
                        "charlotte": true,
                        "trigger": {
                            "player": "phaseBegin",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return player.countZhiShiWu('xiaoYanAnJin') > 0;
                },
                        "content": async function(event, trigger, player) {
                    var id = player.storage.xiaoYanAnJinSource;
                    var source = game.players.find(function(current) {
                        return current.playerid == id;
                    });
                    await player.removeZhiShiWu('xiaoYanAnJin', 1);
                    delete player.storage.xiaoYanAnJinSource;
                    player.syncStorage('xiaoYanAnJinSource');
                    var oldMorale = get.shiQi(player.side);
                    if(source && source.isIn()) {
                        await player.faShuDamage(1, source);
                    } else {
                        await player.faShuDamage(1, 'nosource');
                    }
                    if(source && source.isIn() &&
                        get.shiQi(player.side) < oldMorale) {
                        await source.changeZhanJi('shuiJing', 1);
                    }
                },
                        "intro": {
                            "name": "暗劲",
                            "content": "拥有者回合开始时，先移除【暗劲】，再由萧炎对其造成1点法术伤害③；若因此造成对方士气下降，萧炎令己方战绩区+1【水晶】。",
                            "max": 1,
                        },
                        "markimage": "extension/bigcowcow/mark_anJin.png",
                        "onremove": function(player) {
                    delete player.storage.xiaoYanAnJinSource;
                    player.syncStorage('xiaoYanAnJinSource');
                },
                    },
                    "qingLianDiXinHuo": {
                        "charlotte": true,
                        "mark": true,
                        "group": "diHuoFenShen",
                        "intro": {
                            "name": "青莲地心火",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions('qingLianDiXinHuo');
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.qingLianDiXinHuo_info;
                    },
                        },
                        "markimage": "extension/bigcowcow/mark_qingLianDiXinHuo.png",
                    },
                    "yunLuoXinYan": {
                        "charlotte": true,
                        "mark": true,
                        "group": "xinHuoChongRan",
                        "intro": {
                            "name": "陨落心炎",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions('yunLuoXinYan');
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.yunLuoXinYan_info;
                    },
                        },
                        "markimage": "extension/bigcowcow/mark_yunLuoXinYan.png",
                    },
                    "guLingLengHuo": {
                        "charlotte": true,
                        "mark": true,
                        "group": "lengHuoZhuoHun",
                        "intro": {
                            "name": "骨灵冷火",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions('guLingLengHuo');
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.guLingLengHuo_info;
                    },
                        },
                        "markimage": "extension/bigcowcow/mark_guLingLengHuo.png",
                    },
                    "anDanQingLianDiXinHuo": {
                        "charlotte": true,
                        "mark": true,
                        "intro": {
                            "name": "黯淡的青莲地心火",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions('anDanQingLianDiXinHuo');
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.anDanQingLianDiXinHuo_info;
                    },
                        },
                        "markimage": "extension/bigcowcow/mark_anDanQingLianDiXinHuo.png",
                    },
                    "anDanYunLuoXinYan": {
                        "charlotte": true,
                        "mark": true,
                        "intro": {
                            "name": "黯淡的陨落心炎",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions('anDanYunLuoXinYan');
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.anDanYunLuoXinYan_info;
                    },
                        },
                        "markimage": "extension/bigcowcow/mark_anDanYunLuoXinYan.png",
                    },
                    "anDanGuLingLengHuo": {
                        "charlotte": true,
                        "mark": true,
                        "intro": {
                            "name": "黯淡的骨灵冷火",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions('anDanGuLingLengHuo');
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.anDanGuLingLengHuo_info;
                    },
                        },
                        "markimage": "extension/bigcowcow/mark_anDanGuLingLengHuo.png",
                    },
                    "diHuoFenShen": {
                        "trigger": {
                            "source": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return event.num > 0 &&
                        event.faShu != true &&
                        event.player &&
                        !event.diHuoFenShenTriggered &&
                        lib.skill.xiaoYanYiHuoManager
                            .isBright(player, 'qingLianDiXinHuo');
                },
                        "content": async function(event, trigger, player) {
                    trigger.diHuoFenShenTriggered = true;
                    await trigger.player.faShuDamage(1, player)
                        .set('diHuoFenShenExtra', true);
                },
                    },
                    "xinHuoChongRan": {
                        "trigger": {
                            "player": "teShuEnd",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return lib.skill.xiaoYanYiHuoManager
                        .isBright(player, 'yunLuoXinYan');
                },
                        "content": async function(event, trigger, player) {
                    var dim = lib.skill.xiaoYanYiHuoManager
                        .getDim(player).filter(function(fire) {
                            return fire != 'yunLuoXinYan';
                        });
                    var controls = ['+1【斗气】'];
                    if(dim.length) controls.push('翻转黯淡异火');
                    var control = await player.chooseControl(controls)
                        .set('prompt', '【心火重燃】：选择一项')
                        .set('ai', function() {
                            var player = _status.event.player;
                            return player.countZhiShiWu(
                                'xiaoYanDouQi'
                            ) < 4 ? '+1【斗气】' :
                                '翻转黯淡异火';
                        }).forResultControl();
                    if(control == '+1【斗气】') {
                        await player.addZhiShiWu('xiaoYanDouQi', 1);
                        return;
                    }
                    var links = await player.chooseButton(
                        [
                            '【心火重燃】：选择另一张黯淡异火',
                            [dim, 'textbutton'],
                        ],
                        true
                    ).forResultLinks();
                    if(links.length) {
                        await lib.skill.xiaoYanYiHuoManager.setForm(
                            player,
                            links[0],
                            'bright'
                        );
                    }
                },
                    },
                    "lengHuoZhuoHun": {
                        "trigger": {
                            "source": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return event.num > 0 &&
                        event.faShu == true &&
                        event.player &&
                        event.player != player &&
                        !event.lengHuoZhuoHunExtra &&
                        !event.lengHuoZhuoHunTriggered &&
                        lib.skill.xiaoYanYiHuoManager
                            .isBright(player, 'guLingLengHuo');
                },
                        "content": async function(event, trigger, player) {
                    trigger.lengHuoZhuoHunTriggered = true;
                    await trigger.player.faShuDamage(1, player)
                        .set('lengHuoZhuoHunExtra', true);
                },
                    },
                    "tianHuoSanXuanBianState": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "变",
                        "intro": {
                            "name": "天火三玄变",
                            "content": "本回合下一次主动攻击获得所选异火数量对应的累计强化。",
                        },
                        "findAttack": function(event, player) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 20) {
                        if(current.tianHuoSanXuanBianOwner ==
                            player.playerid) return current;
                        current = current.parent ||
                            (current.getParent && current.getParent());
                        guard++;
                    }
                    return null;
                },
                        "clear": async function(player) {
                    var state = player.storage.tianHuoSanXuanBianState;
                    if(state && state.fires) {
                        await lib.skill.xiaoYanYiHuoManager.dimFires(
                            player,
                            state.fires
                        );
                    }
                    delete player.storage.tianHuoSanXuanBianState;
                    player.removeSkill('tianHuoSanXuanBianState');
                },
                        "group": [
                            "tianHuoSanXuanBianState_sheZhi",
                            "tianHuoSanXuanBianState_jinZhiZhiLiao",
                            "tianHuoSanXuanBianState_zhuanHuan",
                            "tianHuoSanXuanBianState_gongJiJieShu",
                            "tianHuoSanXuanBianState_huiHeJieShu",
                        ],
                        "subSkill": {
                            "sheZhi": {
                                "trigger": {
                                    "player": "gongJiShi",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            return event.yingZhan != true &&
                                !!player.storage
                                    .tianHuoSanXuanBianState;
                        },
                                "content": function(event, trigger, player) {
                            var state = player.storage
                                .tianHuoSanXuanBianState;
                            trigger.tianHuoSanXuanBianOwner =
                                player.playerid;
                            trigger.tianHuoSanXuanBianX = state.x;
                            trigger.changeDamageNum(1);
                            if(state.x >= 2) trigger.wuFaShengDun();
                            if(state.x >= 3) trigger.wuFaYingZhan();
                        },
                            },
                            "jinZhiZhiLiao": {
                                "trigger": {
                                    "source": "zaoChengShangHai",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                            var attack = lib.skill
                                .tianHuoSanXuanBianState
                                .findAttack(event, player);
                            return !!attack &&
                                attack.tianHuoSanXuanBianX >= 2 &&
                                event.faShu != true;
                        },
                                "content": function(event, trigger, player) {
                            trigger.canZhiLiao = false;
                        },
                            },
                            "zhuanHuan": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "filter": function(event, player) {
                            return !!lib.skill
                                .tianHuoSanXuanBianState
                                .findAttack(event, player) &&
                                get.zhanJi(player.side)
                                    .includes('shuiJing');
                        },
                                "content": async function(event, trigger, player) {
                            await player.changeZhanJi('shuiJing', -1);
                            await player.changeZhanJi('baoShi', 1);
                        },
                            },
                            "gongJiJieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "filter": function(event, player) {
                            return !!lib.skill
                                .tianHuoSanXuanBianState
                                .findAttack(event, player);
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill
                                .tianHuoSanXuanBianState.clear(player);
                        },
                            },
                            "huiHeJieShu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "filter": function(event, player) {
                            return !!player.storage
                                .tianHuoSanXuanBianState;
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill
                                .tianHuoSanXuanBianState.clear(player);
                        },
                            },
                        },
                        "onremove": function(player) {
                    delete player.storage.tianHuoSanXuanBianState;
                },
                    },
                    "tianHuoSanXuanBianJinZhiFoNu": {
                        "charlotte": true,
                    },
                    "yiJiHaiDiLinShiShouPai": {
                        "charlotte": true,
                        "popup": false,
                        "mod": {
                            "maxHandcardFinal": function(player, num) {
                        return Math.max(
                            num,
                            player.storage
                                .yiJiHaiDiLinShiShouPai || 0
                        );
                    },
                        },
                        "onremove": function(player) {
                    delete player.storage
                        .yiJiHaiDiLinShiShouPai;
                },
                    },
                },
                "translate": {
                    "lengKuZhiXin": "被动【冷酷之心】",
                    "lengKuZhiXin_info": "你的主动攻击无视【圣盾】的效果。",
                    "ningLangZhiGuangJian": "被动【凝浪之光剑】",
                    "ningLangZhiGuangJian_info": "<span class='tiaoJian'>（攻击命中时②）</span>你+1<span class='hong'>【复仇】</span>。",
                    "guangJiangZhiJian": "响应【光降之剑】",
                    "guangJiangZhiJian_info": "<span class='tiaoJian'>（主动攻击命中时②，移除2点<span class='hong'>【复仇】</span>，弃1张牌【展示】）</span> <br>·<span class='tiaoJian'>（若弃牌为火系）</span>本次攻击伤害额外+1； <br>·<span class='tiaoJian'>（若弃牌为地系）</span>对除攻击目标外的对手各造成（x-1）点法术伤害③，x为此次主动攻击伤害； <br>·<span class='tiaoJian'>（若弃牌为风系）</span>你弃1张牌，视为本次攻击伤害-1。本次【攻击行动】结束后，对该角色进行一次暗系的主动攻击。",
                    "guangJiangZhiJian_feng": "响应【光降之剑-风】",
                    "guangJiangZhiJian_di": "响应【光降之剑-地】",
                    "chaoJuanBingXiao": "响应【潮卷冰削】",
                    "chaoJuanBingXiao_info": "【回合限定】<span class='tiaoJian'>（本回合若你已经对一名角色进行主动攻击，移除1点<span class='hong'>【复仇】</span>）</span>你可以对该角色再进行一次【攻击行动】。本次攻击伤害额外+1。不能和【凝浪之光剑】同时发动。",
                    "bingChaoDeWoXuan": "响应【冰潮的涡旋】",
                    "bingChaoDeWoXuan_info": "【水晶】x1 （主动攻击前发动）你手牌直接补至上限【强制】，+1<span class='hong'>【复仇】</span>，本次攻击无法应战。",
                    "fuChou": "复仇",
                    "fuChou_info": "<span class='hong'>【复仇】</span>为浪花骑士（优菈）专属指示物，上限为4。",
                    "jieShi": "被动【借势】",
                    "jieShi_info": "你的攻击无视【圣盾】；主动攻击未命中或应战攻击命中时，+1<span class='hong'>【枪势】</span>；本回合内你的攻击每有一次未命中，后续攻击造成的伤害累计+1。",
                    "lianHuanTuCi": "响应【连环突刺】",
                    "lianHuanTuCi_info": "【回合限定】<span class='tiaoJian'>（主动攻击未命中时，移除1<span class='hong'>【枪势】</span>）</span>+1【攻击行动】。",
                    "hengQiangJiaShi": "响应【横枪架势】",
                    "hengQiangJiaShi_info": "【回合限定】<span class='tiaoJian'>（应战时，移除1<span class='hong'>【枪势】</span>）</span>可以将1张任意系攻击牌视为与当前攻击同系的攻击牌使用，本次应战攻击伤害-1。该虚拟攻击在本次攻击结算期间保持视为后的系别，后续角色按该系别应战，但不会改写实体牌、独有技或下一名角色打出的攻击牌。",
                    "poZhenHuiQiang": "响应【破阵回枪】",
                    "poZhenHuiQiang_info": "【回合限定】【水晶】×1。<span class='tiaoJian'>（主动攻击前，移除1<span class='hong'>【枪势】</span>）</span>本次攻击伤害+1；若本次攻击未命中，+1【攻击行动】。",
                    "qiangShi": "枪势",
                    "qiangShi_info": "<span class='hong'>【枪势】</span>为赫克托专属指示物，上限为2。",
                    "shengCunQiDian": "被动【生存起点】",
                    "shengCunQiDian_info": "游戏开始时，将【木剑】放置于你的面前，并在其上放置2【耐久】；其余剑专属卡置于游戏外。剑的【耐久】不能超过其上限；回合结束时，若当前剑的【耐久】为0，将其移除。",
                    "caiJi": "响应【采集】",
                    "caiJi_info": "<span class='tiaoJian'>（你因发动剑的专属技能而移除【耐久】后）</span>若<span class='lan'>【素材】</span>未达到上限，将牌堆顶1张牌面朝下置于角色旁作为<span class='lan'>【素材】</span>。",
                    "gongZuoTai": "启动【工作台】",
                    "gongZuoTai_info": "展示并弃置符合制作配方的<span class='lan'>【素材】</span>，选择满足锻造条件的剑专属卡；将面前的当前剑置于游戏外，再将所选剑放置于面前，并在其上放置等同于耐久上限的【耐久】。",
                    "zhanDouFuMo": "响应【战斗附魔】",
                    "zhanDouFuMo_info": "<span class='tiaoJian'>（拥有任意剑且攻击命中后）</span>弃置X张法术<span class='lan'>【素材】</span>；当前剑为【金剑】或【下界合金剑】时X=2，否则X=1。素材可以是不同系别，按雷、火、地、水、风、光依次结算：雷系令本次攻击伤害+Y；火系对攻击目标造成Y点法术伤害；地系对另外Y名目标造成等同本次攻击伤害的法术伤害；水系发动Y次【采集】；风系令目标弃置Y张手牌；光系令当前剑+Y【耐久】。",
                    "jingYanXiuBu": "响应【经验修补】",
                    "jingYanXiuBu_info": "【水晶】×1。<span class='tiaoJian'>（攻击命中后，弃置1张牌）</span>令面前的当前剑+2【耐久】，最多增加至其耐久上限。",
                    "shiDiFuSuCai": "素材",
                    "shiDiFuSuCai_info": "<span class='lan'>【素材】</span>为史蒂夫专属盖牌，上限为5。",
                    "shiDiFuJian": "史蒂夫剑专属卡管理",
                    "shiDiFuJian_info": "史蒂夫面前同一时间最多存在1把剑专属卡；【耐久】记录在当前剑上，不占用或改变角色自身的【治疗】，且不能超过该剑的耐久上限。",
                    "muJian": "(专)[响应]木剑",
                    "muJian_info": "【耐久上限：2】制作配方为任意1张【素材】。<br><span class='tiaoJian'>（攻击时移除1【耐久】）</span>发动【简易工具】；若本次攻击未命中，结算结束后将本次使用的攻击牌作为<span class='lan'>【素材】</span>盖放于角色旁。",
                    "jinJian": "(专)[响应]金剑",
                    "jinJian_info": "【耐久上限：1】制作配方为1张光系【素材】。<br>【回合限定】<span class='tiaoJian'>（【攻击行动】结束时移除1【耐久】）</span>发动【急速挥砍】，+1【攻击行动】或【法术行动】。<br><span class='tiaoJian'>（发动【采集】时）</span>被动【矿物勘探】：改为查看牌库顶4张牌，选择1张作为<span class='lan'>【素材】</span>，弃置其余牌。",
                    "shiJian": "(专)[响应]石剑",
                    "shiJian_info": "【耐久上限：2】制作配方为1张地系【素材】。<br><span class='tiaoJian'>（应战攻击时移除1【耐久】）</span>发动【沉重格挡】，可以将任意1张攻击牌视为与当前攻击同系的攻击牌应战；若本次应战攻击命中，额外发动一次【采集】。<br><span class='tiaoJian'>（发动【采集】时）</span>被动【粗糙采掘】：改为查看牌库顶2张牌，选择1张作为<span class='lan'>【素材】</span>，弃置另一张。",
                    "tieJian": "(专)[响应]铁剑",
                    "tieJian_info": "【耐久上限：3】制作配方为2张系别相同的【素材】。<br><span class='tiaoJian'>（攻击时移除1【耐久】）</span>发动【稳定锋刃】，本次攻击伤害+1。<br><span class='tiaoJian'>（发动【采集】时）</span>被动【矿脉精炼】：改为查看牌库顶3张牌，选择1张作为<span class='lan'>【素材】</span>，弃置其余牌。",
                    "zuanShiJian": "(专)[响应]钻石剑",
                    "zuanShiJian_info": "【耐久上限：4】制作配方为3张水系【素材】。<br><span class='tiaoJian'>（攻击时移除1【耐久】）</span>发动【钻石破甲】，本次攻击伤害+1；若为主动攻击，则无法被应战。<br><span class='tiaoJian'>（发动【采集】时）</span>可以发动【精准开采】，改为令任意一名有可弃置牌的角色弃置1张牌作为<span class='lan'>【素材】</span>。",
                    "xiaJieHeJinJian": "(专)[响应]下界合金剑",
                    "xiaJieHeJinJian_info": "【耐久上限：5】当前剑为【钻石剑】时，展示并弃置1张火系和1张暗系【素材】制作。<br><span class='tiaoJian'>（攻击时移除1【耐久】）</span>发动【不毁之锋】，本次攻击伤害+1且无法被应战。<br><span class='tiaoJian'>（攻击结算结束时，若【耐久】为0）</span>被动【下界锻造】：展示并弃置所有<span class='lan'>【素材】</span>，以其中火系或暗系<span class='lan'>【素材】</span>恢复【耐久】。",
                    "jianYiGongJu": "响应【简易工具】",
                    "jianYiGongJu_info": "<span class='tiaoJian'>（当前剑为【木剑】，攻击时移除1【耐久】）</span>若本次攻击未命中，结算结束后将本次使用的攻击牌作为<span class='lan'>【素材】</span>盖放于角色旁。",
                    "jiSuHuiKan": "响应【急速挥砍】",
                    "jiSuHuiKan_info": "【回合限定】<span class='tiaoJian'>（当前剑为【金剑】，【攻击行动】结束时移除1【耐久】）</span>+1【攻击行动】或【法术行动】。",
                    "kuangWuKanTan": "被动【矿物勘探】",
                    "kuangWuKanTan_info": "<span class='tiaoJian'>（当前剑为【金剑】，发动【采集】时）</span>改为查看牌库顶4张牌，选择1张作为<span class='lan'>【素材】</span>，弃置其余牌。",
                    "chenZhongGeDang": "响应【沉重格挡】",
                    "chenZhongGeDang_info": "<span class='tiaoJian'>（当前剑为【石剑】，应战时移除1【耐久】）</span>可以将任意1张攻击牌视为与当前攻击同系的攻击牌应战；若本次应战攻击命中，额外发动一次【采集】。",
                    "cuCaoCaiJue": "被动【粗糙采掘】",
                    "cuCaoCaiJue_info": "<span class='tiaoJian'>（当前剑为【石剑】，发动【采集】时）</span>改为查看牌库顶2张牌，选择1张作为<span class='lan'>【素材】</span>，弃置另一张。",
                    "wenDingFengRen": "响应【稳定锋刃】",
                    "wenDingFengRen_info": "<span class='tiaoJian'>（当前剑为【铁剑】，攻击时移除1【耐久】）</span>本次攻击伤害+1。",
                    "kuangMaiJingLian": "被动【矿脉精炼】",
                    "kuangMaiJingLian_info": "<span class='tiaoJian'>（当前剑为【铁剑】，发动【采集】时）</span>改为查看牌库顶3张牌，选择1张作为<span class='lan'>【素材】</span>，弃置其余牌。",
                    "zuanShiPoJia": "响应【钻石破甲】",
                    "zuanShiPoJia_info": "<span class='tiaoJian'>（当前剑为【钻石剑】，攻击时移除1【耐久】）</span>本次攻击伤害+1；若为主动攻击，则无法被应战。",
                    "jingZhunKaiCai": "响应【精准开采】",
                    "jingZhunKaiCai_info": "<span class='tiaoJian'>（当前剑为【钻石剑】，发动【采集】时）</span>可以改为选择任意一名有可弃置牌的角色，令其弃置1张牌作为<span class='lan'>【素材】</span>。",
                    "buHuiZhiFeng": "响应【不毁之锋】",
                    "buHuiZhiFeng_info": "<span class='tiaoJian'>（当前剑为【下界合金剑】，攻击时移除1【耐久】）</span>本次攻击伤害+1且无法被应战。",
                    "xiaJieDuanZao": "被动【下界锻造】",
                    "xiaJieDuanZao_info": "<span class='tiaoJian'>（当前攻击结算结束时，若【下界合金剑】的【耐久】为0）</span>展示并弃置所有<span class='lan'>【素材】</span>；其中每有1张火系或暗系<span class='lan'>【素材】</span>，令【下界合金剑】+1【耐久】。",
                    "lianJi": "连击",
                    "lianJi_info": "<span class='lan'>【连击】</span>为桐谷和人的专属指示物，上限为3；普通状态下跨回合保留。",
                    "fengBiZhe": "被动【封弊者】",
                    "fengBiZhe_info": "普通状态下，你的主动【攻击行动】结束后+1<span class='lan'>【连击】</span>。统计本回合所有来源的主动攻击；从第四次主动攻击开始，你的主动攻击无法被应战。",
                    "erDaoLiu": "被动【二刀流】",
                    "erDaoLiu_info": "<span class='tiaoJian'>（主动【攻击行动】结束后，若<span class='lan'>【连击】</span>达到上限且处于普通状态）</span>【横置】进入【二刀流】，记录本次攻击系别并额外+1【攻击行动】。进入后的第一刀若与入形攻击异系，伤害额外+1；无论是否同系均只检查第一刀。回合结束时移除全部<span class='lan'>【连击】</span>并【重置】。",
                    "erDaoLiuZhuangTai": "二刀流",
                    "erDaoLiuZhuangTai_info": "进入后的第一次主动攻击若与入形攻击异系，伤害额外+1；回合结束时移除全部<span class='lan'>【连击】</span>并【重置】。",
                    "yinSuChongJi": "响应【音速冲击】",
                    "yinSuChongJi_info": "【回合限定】仅普通状态下，<span class='tiaoJian'>（主动攻击前①）</span>摸1张牌【强制】。若命中，本次攻击伤害额外+1；若未命中，本次【攻击行动】结束后额外+1【攻击行动】。",
                    "siFangZhan": "响应【四方斩】",
                    "siFangZhan_info": "仅【二刀流】状态下，<span class='tiaoJian'>（主动攻击前①，移除1<span class='lan'>【连击】</span>）</span>选择一项：本次攻击伤害额外+1；或本次攻击伤害-1，行动结束后额外+1【攻击行动】。",
                    "xingBaoQiLiuZhan": "响应【星爆气流斩】",
                    "xingBaoQiLiuZhan_info": "【宝石】×1。仅【二刀流】状态下，<span class='tiaoJian'>（主动攻击命中后②）</span>移除全部<span class='lan'>【连击】</span>，可以展示并弃置至多X张攻击牌，X不超过移除数且最大为3；这些牌与本次攻击牌及彼此之间均须异系。本次攻击伤害额外+Y+1，Y为弃牌数。0连击或0弃牌时仍可发动。行动结束后【重置】，清除并封锁本回合全部额外【攻击行动】。",
                    "xingBaoQiLiuZhanFengSuo": "星爆气流斩",
                    "xingBaoQiLiuZhanFengSuo_info": "本回合不能再获得或执行额外【攻击行动】；“攻击或法术行动”不能选择攻击，直接创建的追加攻击也会被取消。",
                    "miaoYun": "喵运",
                    "miaoYun_info": "<span class='lan'>【喵运】</span>为一姬的专属指示物，上限为5。",
                    "yiJiBaoPai": "宝牌",
                    "yiJiBaoPai_info": "<span class='lan'>【宝牌】</span>为一姬的正面朝上专属盖牌，上限为1，牌面与系别对所有角色公开。替换时原【宝牌】公开进入弃牌堆，新展示的牌库顶实体牌成为【宝牌】。",
                    "baoPaiZhiShi": "被动【宝牌指示】",
                    "baoPaiZhiShi_info": "游戏开始时，展示牌库顶1张牌并将其正面朝上作为<span class='lan'>【宝牌】</span>。你每次使用或打出与当前<span class='lan'>【宝牌】</span>最终同系的牌后，+1<span class='lan'>【喵运】</span>。",
                    "duanYaoJiuZhuangTai": "断幺九",
                    "duanYaoJiuZhuangTai_info": "手牌数不少于3，且没有【圣光】【暗灭】【圣盾】【虚弱】【中毒】。",
                    "duanYaoJiuMiao": "响应【断幺九喵】",
                    "duanYaoJiuMiao_info": "<span class='tiaoJian'>（【特殊行动】结束后，若手牌数不少于3且没有【圣光】【暗灭】【圣盾】【虚弱】【中毒】）</span>可以展示并弃置全部手牌。令Y为弃牌数，X为其中与<span class='lan'>【宝牌】</span>同系的牌数：+X+1<span class='lan'>【喵运】</span>；摸Y-X张牌【强制】；公开弃置原<span class='lan'>【宝牌】</span>并展示牌库顶1张牌作为新<span class='lan'>【宝牌】</span>。",
                    "liZhiMiao": "响应【立直喵】",
                    "liZhiMiao_info": "【回合限定】<span class='tiaoJian'>（主动攻击前①，若本次攻击牌与当前<span class='lan'>【宝牌】</span>同系）</span>本次攻击伤害额外+1；若命中，额外+1【法术行动】。",
                    "duiDuiHuMiao": "法术【对对胡喵】",
                    "duiDuiHuMiao_info": "弃置1张法术牌【展示】，+1<span class='lan'>【喵运】</span>，指定一名对手并展示牌库顶1张牌：若与当前<span class='lan'>【宝牌】</span>同系，对目标造成2点法术伤害③；否则对你和目标各造成1点法术伤害③。结算后公开弃置原<span class='lan'>【宝牌】</span>，将展示牌作为新<span class='lan'>【宝牌】</span>。",
                    "haiDiLaoYueMiao": "响应【海底捞月喵】",
                    "haiDiLaoYueMiao_info": "<span class='tiaoJian'>（承受实际伤害后⑤，在因该伤害摸牌时）</span>于标准爆牌前展示最后摸到的1张牌。若与当前<span class='lan'>【宝牌】</span>同系，+1【治疗】并+1<span class='lan'>【喵运】</span>；若不同系，可以将该牌与<span class='lan'>【宝牌】</span>交换。交换后正常检查手牌上限与爆牌。",
                    "yiManShiJianMiao": "启动【役满时间喵】",
                    "yiManShiJianMiao_info": "【宝石】×1，移除5<span class='lan'>【喵运】</span>。向全场展示牌库顶5张牌并将其全部弃置，指定一名对手，对其造成X+1点法术伤害③，X为其中与当前<span class='lan'>【宝牌】</span>同系的牌数。",
                    "moQiShaoNianQiong": "被动【莫欺少年穷】",
                    "moQiShaoNianQiong_info": "<span class='tiaoJian'>（你的回合结束时，若本回合未执行【特殊行动】，且没有因攻击、法术、技能摸牌爆牌或其他任何由你产生的效果使对方士气下降）</span>你+1<span class='lan'>【斗气】</span>；若此时己方士气低于对方，改为+2<span class='lan'>【斗气】</span>，并令自己+1【水晶】。即使<span class='lan'>【斗气】</span>已经达到上限，仍正常获得【水晶】。",
                    "fenJue": "被动【焚决】",
                    "fenJue_info": "游戏开始时你没有任何【异火】。<span class='tiaoJian'>（你的回合开始时）</span>若你拥有黯淡的【异火】，选择其中1张强制翻至明亮面。",
                    "baJiBeng": "响应【八极崩】",
                    "baJiBeng_info": "<span class='tiaoJian'>（你的主动攻击命中后②，移除1<span class='lan'>【斗气】</span>，且目标没有【暗劲】）</span>将【暗劲】正面朝上放置于攻击目标面前。",
                    "fenJueLianHua": "启动【焚诀·炼化】",
                    "fenJueLianHua_info": "按【青莲地心火】→【陨落心炎】→【骨灵冷火】的顺序炼化下一张异火。青莲支付【水晶】×1与2<span class='lan'>【斗气】</span>并自伤3；陨落支付【宝石】×1与3<span class='lan'>【斗气】</span>并自伤3；骨灵支付【宝石】×1与3<span class='lan'>【斗气】</span>并自伤4。若该次自伤及其爆牌未令己方士气下降，炼化成功；否则失败并返还1<span class='lan'>【斗气】</span>。",
                    "tianHuoSanXuanBian": "启动【天火三玄变】",
                    "tianHuoSanXuanBian_info": "【回合限定】【水晶】×1。移除X<span class='lan'>【斗气】</span>并选择X张明亮【异火】，X为1至3；本回合不能发动【佛怒火莲】。下一次主动攻击累计获得：X≥1伤害+1；X≥2不能以【治疗】抵伤且无视【圣盾】；X=3无法被应战。命中时可将己方战绩区1【水晶】转为1【宝石】。该攻击结束后，或本回合未攻击时于回合结束，将所选异火翻暗。",
                    "foNuHuoLian": "法术【佛怒火莲】",
                    "foNuHuoLian_info": "【宝石】×1，选择2张或3张明亮【异火】，结算后翻暗。融合两种：对一名目标对手造成2点法术伤害③，再对自己造成1点法术伤害③。融合三种：对一名目标对手造成3点法术伤害③，对其他所有对手各造成1点法术伤害③。",
                    "xiaoYanDouQi": "斗气",
                    "xiaoYanDouQi_info": "<span class='lan'>【斗气】</span>为萧炎专属指示物，上限为4。",
                    "xiaoYanYiHuoManager": "异火管理",
                    "xiaoYanYiHuoManager_info": "三张【异火】炼化前位于场外；炼化成功后以明亮面放置于萧炎角色旁，翻至黯淡面时失去对应的明亮面技能，重新翻亮后恢复。",
                    "xiaoYanAnJin": "(专)【暗劲】",
                    "xiaoYanAnJin_info": "拥有者回合开始时，先移除【暗劲】，再由萧炎对其造成1点法术伤害③；若因此造成对方士气下降，萧炎令己方战绩区+1【水晶】。每名角色上限为1。",
                    "qingLianDiXinHuo": "(专)【青莲地心火】",
                    "qingLianDiXinHuo_info": "专属【青莲地心火】。响应【地火焚身】：<span class='tiaoJian'>（你对目标造成攻击伤害后⑤）</span>对该目标额外造成1点法术伤害③。翻面后为【黯淡的青莲地心火】。",
                    "yunLuoXinYan": "(专)【陨落心炎】",
                    "yunLuoXinYan_info": "专属【陨落心炎】。响应【心火重燃】：<span class='tiaoJian'>（你执行【特殊行动】后）</span>必须选择一项：+1<span class='lan'>【斗气】</span>；或将另一张处于黯淡面的【异火】翻至明亮面。翻面后为【黯淡的陨落心炎】。",
                    "guLingLengHuo": "(专)【骨灵冷火】",
                    "guLingLengHuo_info": "专属【骨灵冷火】。响应【冷火灼魂】：<span class='tiaoJian'>（你对另一名目标造成正数实际法术伤害后⑤）</span>对该目标额外造成1点法术伤害③。你对自己造成的法术伤害不能触发此技能。翻面后为【黯淡的骨灵冷火】。",
                    "anDanQingLianDiXinHuo": "(专)【黯淡的青莲地心火】",
                    "anDanQingLianDiXinHuo_info": "黯淡的【青莲地心火】，通过【焚决】可重新翻至明亮面。",
                    "anDanYunLuoXinYan": "(专)【黯淡的陨落心炎】",
                    "anDanYunLuoXinYan_info": "黯淡的【陨落心炎】，通过【焚决】可重新翻至明亮面。",
                    "anDanGuLingLengHuo": "(专)【黯淡的骨灵冷火】",
                    "anDanGuLingLengHuo_info": "黯淡的【骨灵冷火】，通过【焚决】可重新翻至明亮面。",
                    "diHuoFenShen": "响应【地火焚身】",
                    "diHuoFenShen_info": "<span class='tiaoJian'>（你对目标造成正数实际攻击伤害后⑤）</span>对该目标额外造成1点法术伤害③；每个原始伤害事件最多追加一次。",
                    "xinHuoChongRan": "响应【心火重燃】",
                    "xinHuoChongRan_info": "<span class='tiaoJian'>（你执行【特殊行动】后）</span>必须选择一项：+1<span class='lan'>【斗气】</span>；或将另一张黯淡【异火】翻至明亮面。",
                    "lengHuoZhuoHun": "响应【冷火灼魂】",
                    "lengHuoZhuoHun_info": "<span class='tiaoJian'>（你对另一名目标造成正数实际法术伤害后⑤）</span>对该目标额外造成1点法术伤害③。不能响应你对自己的法术伤害或本技能追加的伤害；每个原始伤害事件最多追加一次。",
                    "tianHuoSanXuanBianState": "天火三玄变",
                    "tianHuoSanXuanBianJinZhiFoNu": "天火三玄变",
                },
            },
            "intro": "添加角色优菈、赫克托、史蒂夫、桐谷和人、一姬、萧炎。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "2.2",
        },
        "files": {
            "character": [
                "youLa.jpg",
                "huiFengQiangShi.jpg",
                "steve.jpg",
                "tongGuHeRen.jpg",
                "yiJi.jpg",
                "xiaoYan.jpg",
            ],
            "card": [
                "mark_qingLianDiXinHuo.png",
                "mark_yunLuoXinYan.png",
                "mark_guLingLengHuo.png",
                "mark_anDanQingLianDiXinHuo.png",
                "mark_anDanYunLuoXinYan.png",
                "mark_anDanGuLingLengHuo.png",
            ],
            "skill": [
                "mark_fuChou.png",
                "mark_qiangShi.png",
                "mark_lianJi.png",
                "mark_miaoYun.png",
                "mark_douQi.png",
                "mark_anJin.png",
            ],
            "audio": [],
        },
        "connect": true,
    };
});
