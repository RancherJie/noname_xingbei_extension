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
            var actionAudioSkill = 'bigcowcow_actionAudio';
            if(!lib.skill[actionAudioSkill]) {
                lib.skill[actionAudioSkill] = {
                    trigger: { player: ['gouMai', 'heCheng', 'tiLian'] },
                    forced: true,
                    popup: false,
                    charlotte: true,
                    firstDo: true,
                    filter: function(event, player) {
                        return ['youLa', 'heKeTuo', 'tongGuHeRen', 'shiDiFu', 'xiaoYan', 'zhaoFuQueJi'].some(function(id) {
                            return player.name == id ||
                                player.name1 == id ||
                                player.name2 == id;
                        });
                    },
                    content: function(event, trigger, player) {
                        var action = event.triggername ||
                            (trigger && trigger.name);
                        if(!['gouMai', 'heCheng', 'tiLian']
                            .includes(action)) return;
                        var character = ['youLa', 'heKeTuo', 'tongGuHeRen', 'shiDiFu', 'xiaoYan', 'zhaoFuQueJi']
                            .find(function(id) {
                                return player.name == id ||
                                    player.name1 == id ||
                                    player.name2 == id;
                            });
                        if(!character) return;
                        var path = 'ext:bigcowcow/audio/action/' + character +
                            '/' + action + '.mp3';
                        game.broadcastAll(function(audioPath, speaker) {
                            if(!lib.config.background_speak) return;
                            game.playAudio({
                                path: audioPath,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, path, player);
                    },
                };
            }
            game.addGlobalSkill(actionAudioSkill);
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
                            "ext:bigcowcow/youLa.png",
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
                            "ext:bigcowcow/huiFengQiangShi.png",
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
                            "ext:bigcowcow/steve.png",
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
                            "ext:bigcowcow/tongGuHeRen.png",
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
                            "gangMiao",
                            "yiManShiJianMiao",
                            "miaoYun",
                            "yiJiBaoPai",
                        ],
                        [
                            "des:以公开宝牌引导牌势的招福雀姬。一姬会积累喵运，在断幺九、立直与役满之间不断更换宝牌并放大同系牌的收益。",
                            "ext:bigcowcow/yiJi.png",
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
                            "yanFenShiLangChi",
                            "fenJueLianHua",
                            "tianHuoSanXuanBian",
                            "foNuHuoLian",
                            "xiaoYanDouQi",
                            "xiaoYanYiHuoManager",
                        ],
                        [
                            "des:以斗气炼化三种异火的炎帝。萧炎会在逆境中积蓄斗气，以暗劲延后爆发伤害，并通过天火三玄变与佛怒火莲释放异火的组合力量。",
                            "ext:bigcowcow/xiaoYan.png",
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
                    "xiaoYanQingLianDiXinHuoKa_info": "明亮面拥有响应【地火焚身】：<span class='tiaoJian'>（你对目标造成攻击伤害后⑤）</span>对该目标额外造成1点法术伤害③。",
                    "xiaoYanAnDanQingLianDiXinHuoKa": "(专)【黯淡的青莲地心火】",
                    "xiaoYanAnDanQingLianDiXinHuoKa_info": "黯淡面。萧炎回合开始时可通过【焚决】将此卡翻至明亮面。",
                    "xiaoYanYunLuoXinYanKa": "(专)【陨落心炎】",
                    "xiaoYanYunLuoXinYanKa_info": "<span class='tiaoJian'>（明亮面拥有响应【心火重燃】：你执行【特殊行动】后）</span>必须选择一项：+1【斗气】；或将另一张处于黯淡面的【异火】翻至明亮面。",
                    "xiaoYanAnDanYunLuoXinYanKa": "(专)【黯淡的陨落心炎】",
                    "xiaoYanAnDanYunLuoXinYanKa_info": "黯淡面。萧炎回合开始时可通过【焚决】将此卡翻至明亮面。",
                    "xiaoYanGuLingLengHuoKa": "(专)【骨灵冷火】",
                    "xiaoYanGuLingLengHuoKa_info": "明亮面拥有响应【冷火灼魂】：<span class='tiaoJian'>（你对另一名目标造成正数实际法术伤害后⑤）</span>对该目标额外造成1点法术伤害③。你对自己造成的法术伤害不能触发此技能。",
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
                        "audio": "ext:bigcowcow/audio/skill/youLa/lengKuZhiXin.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/youLa/ningLangZhiGuangJian.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/youLa/guangJiangZhiJian.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/youLa/chaoJuanBingXiao.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/youLa/bingChaoDeWoXuan.mp3",
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
                        return '攻击已累计未命中' + num + '次，后续攻击伤害+' + num +
                            '；你的回合结束时清零';
                    },
                            "markcount": function(storage, player) {
                        return player.storage.jieShiWeiMingZhong || 0;
                    },
                        },
                        "markimage": "extension/bigcowcow/mark_jieShi.png",
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
                            game.broadcastAll(function(speaker) {
                                if(!lib.config.background_speak) return;
                                game.playAudio({
                                    path: 'ext:bigcowcow/audio/skill/heKeTuo/' +
                                        'jieShi.mp3',
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, player);
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
                            game.broadcastAll(function(speaker) {
                                if(!lib.config.background_speak) return;
                                game.playAudio({
                                    path: 'ext:bigcowcow/audio/skill/heKeTuo/' +
                                        'jieShi.mp3',
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, player);
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
                                    "player": "phaseEnd",
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
                        "audio": "ext:bigcowcow/audio/skill/heKeTuo/lianHuanTuCi.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/heKeTuo/hengQiangJiaShi.mp3",
                        "usable": 1,
                        "enable": "yingZhan",
                        "filter": function(event, player) {
                    event = event || _status.event;
                    if(!event || event.canYingZhan == false || !event.card) return false;
                    if(player.countZhiShiWu('qiangShi') < 1) return false;
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
                        "check": function(card) {
                    var event = _status.event;
                    if(event && event.card &&
                        get.xiBie(card) == get.xiBie(event.card)) return 0;
                    return 6 - get.value(card, event && event.player);
                },
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
                        "audio": "ext:bigcowcow/audio/skill/heKeTuo/poZhenHuiQiang.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/shiDiFu/shengCunQiDian.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/shiDiFu/caiJi.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/shiDiFu/gongZuoTai.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/shiDiFu/zhanDouFuMo.mp3",
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "filter": function(event, player) {
                    if(!event || !event.target ||
                        !lib.skill.shiDiFuJian.getSword(player)) return false;
                    return player.countGaiPai('shiDiFuSuCai') >= 1;
                },
                        "cost": async function(event, trigger, player) {
                    var sword = lib.skill.shiDiFuJian.getSword(player);
                    var max = ['jinJian', 'xiaJieHeJinJian'].includes(sword) ? 2 : 1;
                    max = Math.min(max, player.countGaiPai('shiDiFuSuCai'));
                    var materials = player.getGaiPai('shiDiFuSuCai');
                    var result = await player.chooseCardButton(
                        materials,
                        [1, max],
                        '战斗附魔：选择弃置1' + (max > 1 ? '至2' : '') +
                            '张【素材】'
                    ).set('ai', function(button) {
                        var player = _status.event.player;
                        var target = _status.event.attackTarget;
                        var xiBie = get.xiBie(button.link);
                        if(xiBie == 'an') return 9;
                        if(xiBie == 'lei' || xiBie == 'huo') return 8;
                        if(xiBie == 'feng' && target &&
                            target.side != player.side &&
                            target.countCards('h') > 0) {
                            return 7.5;
                        }
                        if(xiBie == 'guang') {
                            var sword = lib.skill.shiDiFuJian.getSword(player);
                            if(lib.skill.shiDiFuJian.getDurability(player) <
                                lib.skill.shiDiFuJian.getMaxDurability(player, sword)) {
                                return 7;
                            }
                        }
                        return 6 - get.value(button.link);
                    }).set('attackTarget', trigger.target).forResult();
                    event.result = {
                        bool: result.bool && result.links &&
                            result.links.length >= 1 && result.links.length <= max,
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
                        an: 0,
                    };
                    event.cards.forEach(function(card) {
                        var xiBie = get.xiBie(card);
                        if(Object.prototype.hasOwnProperty.call(counts, xiBie)) {
                            counts[xiBie]++;
                        }
                    });

                    var voiceOrder = ['lei', 'huo', 'di', 'shui', 'feng', 'guang', 'an']
                        .filter(function(xiBie) {
                            return counts[xiBie] > 0;
                        });
                    var playBranchVoice = async function(xiBie) {
                        var voiceIndex = voiceOrder.indexOf(xiBie);
                        if(voiceIndex < 0) return;
                        voiceOrder.splice(voiceIndex, 1);
                        game.broadcastAll(function(audioXiBie, speaker) {
                            if(!lib.config.background_speak) return;
                            game.playAudio({
                                path: 'ext:bigcowcow/audio/skill/shiDiFu/' +
                                    'zhanDouFuMo_' + audioXiBie + '.mp3',
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, xiBie, player);
                        if(voiceOrder.length) await game.delay(0.8);
                    };

                    if(counts.lei > 0) {
                        await playBranchVoice('lei');
                        trigger.changeDamageNum(counts.lei);
                    }
                    if(counts.huo > 0 && trigger.target && trigger.target.isIn()) {
                        await playBranchVoice('huo');
                        await trigger.target.faShuDamage(counts.huo, player);
                    }
                    if(counts.di > 0) {
                        await playBranchVoice('di');
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
                        await playBranchVoice('shui');
                        for(var i = 0; i < counts.shui + 1; i++) {
                            if(player.countGaiPai('shiDiFuSuCai') >= 5) break;
                            await lib.skill.caiJi.collect(player);
                        }
                    }
                    if(counts.feng > 0 && trigger.target && trigger.target.isIn()) {
                        await playBranchVoice('feng');
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
                        await playBranchVoice('guang');
                        lib.skill.shiDiFuJian.changeDurability(
                            player,
                            counts.guang + 1
                        );
                    }
                    if(counts.an > 0) {
                        await playBranchVoice('an');
                        await player.addNengLiang('shuiJing', counts.an + 1);
                    }
                },
                    },
                    "jingYanXiuBu": {
                        "audio": "ext:bigcowcow/audio/skill/shiDiFu/jingYanXiuBu.mp3",
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "filter": function(event, player) {
                    var sword = lib.skill.shiDiFuJian.getSword(player);
                    if(!event || !event.target || !sword) return false;
                    return player.canBiShaShuiJing() &&
                        player.countCards('h') >= 2 &&
                        lib.skill.shiDiFuJian.getDurability(player) <
                            lib.skill.shiDiFuJian.getMaxDurability(player, sword);
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseCard(
                        'h',
                        2,
                        '经验修补：是否弃置2张手牌并移除1【水晶】，令当前剑+2【耐久】？'
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
                                "audio": "ext:bigcowcow/audio/skill/tongGuHeRen/fengBiZhe.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/tongGuHeRen/erDaoLiu.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/tongGuHeRen/yinSuChongJi.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/tongGuHeRen/siFangZhan.mp3",
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
                        "audio": "ext:bigcowcow/audio/skill/tongGuHeRen/xingBaoQiLiuZhan.mp3",
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
                    await lib.skill.yiJiBaoPai.drawAndAdd(player, 1);
                },
                        "group": "baoPaiZhiShi_daChuPai",
                        "subSkill": {
                            "daChuPai": {
                                "trigger": {
                                    "player": "daChuPai",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return lib.skill.yiJiBaoPai
                                .matches(player, event.card) &&
                                !player.isZhiShiWuMax('miaoYun');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('miaoYun', 1);
                        },
                            },
                        },
                    },
                    "duanYaoJiuMiao": {
                        "audio": "ext:bigcowcow/audio/skill/zhaoFuQueJi/duanYaoJiuMiao.mp3",
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
                        var same = cards.filter(function(card) {
                            return lib.skill.yiJiBaoPai
                                .matches(player, card);
                        }).length;
                        return same + 1 >= 2;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var cards = player.getCards('h').slice();
                    var baoPaiNum = lib.skill.yiJiBaoPai
                        .getCards(player).length;
                    if(!cards.length || !baoPaiNum) return;
                    var y = cards.length;
                    var x = cards.filter(function(card) {
                        return lib.skill.yiJiBaoPai
                            .matches(player, card);
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
                    var newBaoPai = get.cards(baoPaiNum);
                    if(newBaoPai && newBaoPai.length) {
                        await game.cardsGotoOrdering(newBaoPai);
                    }
                    await lib.skill.yiJiBaoPai.replaceAll(
                        player,
                        newBaoPai || []
                    );
                },
                    },
                    "liZhiMiao": {
                        "audio": "ext:bigcowcow/audio/skill/zhaoFuQueJi/liZhiMiao.mp3",
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        !!event.card &&
                        lib.skill.yiJiBaoPai
                            .matches(player, event.card);
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
                        "audio": "ext:bigcowcow/audio/skill/zhaoFuQueJi/duiDuiHuMiao.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
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
                    if(lib.skill.yiJiBaoPai.matches(player, card)) {
                        if(target && target.isIn()) {
                            await target.faShuDamage(2, player);
                        }
                    } else {
                        await player.faShuDamage(1, player);
                        if(target && target.isIn()) {
                            await target.faShuDamage(1, player);
                        }
                    }
                    var baoPai = lib.skill.yiJiBaoPai.getCards(player);
                    if(!baoPai.length) {
                        await lib.skill.yiJiBaoPai.add(player, card, true);
                        return;
                    }
                    var links = await player.chooseCardButton(
                        baoPai,
                        true,
                        '【对对胡喵】：选择1张【宝牌】移除'
                    ).set('ai', function(button) {
                        return -get.value(button.link, _status.event.player);
                    }).forResultLinks();
                    var oldCard = links[0] || baoPai[0];
                    await lib.skill.yiJiBaoPai.discard(player, [oldCard]);
                    await lib.skill.yiJiBaoPai.add(player, card, true);
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
                        "audio": "ext:bigcowcow/audio/skill/zhaoFuQueJi/haiDiLaoYueMiao.mp3",
                        "trigger": {
                            "player": "drawAfter",
                        },
                        "filter": function(event, player) {
                    return Array.isArray(event.result) &&
                        event.result.length > 0 &&
                        !!lib.skill.yiJiBaoPai.getCard(player);
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【海底捞月喵】，展示本次最后摸到的牌？'
                    ).set('ai', function() {
                        return true;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var card = trigger.result[trigger.result.length - 1];
                    if(!card) return;
                    await player.showCards(
                        [card],
                        '【海底捞月喵】：展示最后摸到的牌'
                    );
                    var baoPai = lib.skill.yiJiBaoPai.getCards(player);
                    if(lib.skill.yiJiBaoPai.matches(player, card)) {
                        await player.changeZhiLiao(1, player);
                        await player.addZhiShiWu('miaoYun', 1);
                        return;
                    }
                    var links = await player.chooseCardButton(
                        baoPai,
                        [0, 1],
                        '可以选择1张【宝牌】与展示的牌交换'
                    ).set('newCard', card)
                        .set('ai', function(button) {
                            return get.value(
                                button.link,
                                _status.event.player
                            ) - get.value(
                                _status.event.newCard,
                                _status.event.player
                            );
                        }).forResultLinks();
                    if(links.length && get.position(card, true) == 'h') {
                        var oldBaoPai = links[0];
                        await player.lose(card);
                        await player.lose(oldBaoPai);
                        await lib.skill.yiJiBaoPai.add(player, card, true);
                        await player.gain(oldBaoPai, 'gain2');
                    }
                },
                    },
                    "gangMiao": {
                        "audio": "ext:bigcowcow/audio/skill/zhaoFuQueJi/gangMiao.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing() &&
                        player.countZhiShiWu('miaoYun') >= 2 &&
                        lib.skill.yiJiBaoPai.getCards(player).length < 4;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu('miaoYun', 2);
                    await lib.skill.yiJiBaoPai.drawAndAdd(player, 1);
                },
                        "check": function(event, player) {
                    return lib.skill.yiJiBaoPai.getCards(player).length < 3 ||
                        player.countZhiShiWu('miaoYun') >= 4;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "yiManShiJianMiao": {
                        "audio": "ext:bigcowcow/audio/skill/zhaoFuQueJi/yiManShiJianMiao.mp3",
                        "type": "faShu",
                        "enable": "faShu",
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
                    await player.viewCards(
                        '【役满时间喵】：查看牌库顶5张牌',
                        cards
                    );
                    var x = cards.filter(function(card) {
                        return lib.skill.yiJiBaoPai
                            .matches(player, card);
                    }).length;
                    await game.cardsDiscard(cards);
                    var targets = await player.chooseTarget(
                        '役满时间喵：选择一名对手，造成' +
                            x + '点法术伤害',
                        true,
                        function(card, player, target) {
                            return target.side != player.side;
                        }
                    ).set('damage', x)
                        .set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                _status.event.damage
                            );
                        }).forResultTargets();
                    var target = targets[0];
                    if(x > 0 && target && target.isIn()) {
                        await target.faShuDamage(x, player);
                    }
                    if(x > 2) {
                        await player.addFaShu();
                    }
                    if(x > 4) {
                        await player.addZhiShiWu('miaoYun', 5);
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
                            "max": 4,
                            "show": true,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                        "getCards": function(player) {
                    return player.getGaiPai('yiJiBaoPai').slice();
                },
                        "getCard": function(player) {
                    return lib.skill.yiJiBaoPai.getCards(player)[0];
                },
                        "matches": function(player, card) {
                    if(!card) return false;
                    var xiBie = get.xiBie(card);
                    return lib.skill.yiJiBaoPai.getCards(player)
                        .some(function(baoPai) {
                            return get.xiBie(baoPai) == xiBie;
                        });
                        },
                        "playAudio": function(player) {
                    game.broadcastAll(function(speaker) {
                        if(!lib.config.background_speak) return;
                        game.playAudio({
                            path: 'ext:bigcowcow/audio/skill/' +
                                'zhaoFuQueJi/baoPaiZhiShi.mp3',
                            spatialPlayer: speaker,
                            addVideo: false,
                        });
                    }, player);
                },
                        "discard": async function(player, cards) {
                    cards = (cards || []).filter(function(card) {
                        return lib.skill.yiJiBaoPai
                            .getCards(player).includes(card);
                    });
                    if(!cards.length) return;
                    await player.discard(
                        cards,
                        'yiJiBaoPai'
                    ).set('visible', true)
                        .set('showCards', true);
                },
                        "add": async function(player, cards, shown) {
                    cards = (Array.isArray(cards) ? cards : [cards])
                        .filter(Boolean);
                    var room = 4 - lib.skill.yiJiBaoPai
                        .getCards(player).length;
                    cards = cards.slice(0, Math.max(0, room));
                    if(!cards.length) return [];
                    if(!shown) {
                        await player.showCards(
                            cards,
                            '展示新的【宝牌】'
                        );
                    }
                    await player.addGaiPai(
                        cards,
                        player,
                        'yiJiBaoPai'
                    );
                    lib.skill.yiJiBaoPai.playAudio(player);
                    return cards;
                },
                        "drawAndAdd": async function(player, num) {
                    var cards = get.cards(num || 1);
                    if(!cards || !cards.length) return [];
                    await game.cardsGotoOrdering(cards);
                    return lib.skill.yiJiBaoPai.add(
                        player,
                        cards,
                        false
                    );
                },
                        "replaceAll": async function(player, cards) {
                    await lib.skill.yiJiBaoPai.discard(
                        player,
                        lib.skill.yiJiBaoPai.getCards(player)
                    );
                    return lib.skill.yiJiBaoPai.add(player, cards, false);
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
                        "audio": "ext:bigcowcow/audio/skill/xiaoYan/moQiShaoNianQiong.mp3",
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
                        await player.changeZhiLiao(1, player);
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
                        "audio": "ext:bigcowcow/audio/skill/xiaoYan/fenJue.mp3",
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
                        return manager.aiFireKeepValue(
                            _status.event.player,
                            fire
                        );
                    }).forResultLinks();
                    var fire = manager.getFireByCard(links[0]);
                    if(fire) await manager.setForm(player, fire, 'bright');
                },
                    },
                    "baJiBeng": {
                        "audio": "ext:bigcowcow/audio/skill/xiaoYan/baJiBeng.mp3",
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "filter": function(event, player) {
                    return player.countZhiShiWu('xiaoYanDouQi') > 0 &&
                        event.target &&
                        event.target.countZhiShiWu('xiaoYanAnJin') == 0;
                },
                        "check": function(event, player) {
                    if(!event.target || event.target.side == player.side) {
                        return false;
                    }
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var blood = player.countZhiShiWu('xiaoYanDouQi');
                    if(blood == 3 && manager.aiYanFenPlan(
                        player,
                        event.target
                    )) return false;
                    var next = lib.skill.fenJueLianHua.nextFire(player);
                    if(next && blood <= next.cost &&
                        lib.skill.fenJueLianHua.aiCanRefine(player)) {
                        return manager.aiOverflow(event.target, 1) > 0;
                    }
                    return true;
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
                    "yanFenShiLangChi": {
                        "audio": "ext:bigcowcow/audio/skill/xiaoYan/yanFenShiLangChi.mp3",
                        "trigger": {"source": "gongJiMingZhongAfter"},
                        "priority": 5,
                        "filter": function(event, player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    return player.countZhiShiWu('xiaoYanDouQi') >= 3 &&
                        manager.getRefined(player).length > 0 &&
                        game.countPlayer(function(target) {
                            return target.isIn() && target != event.target;
                        }) >= 2;
                },
                        "cost": async function(event, trigger, player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var fireCount = manager.getRefined(player).length;
                    var damage = Math.ceil(fireCount / 2);
                    var plan = manager.aiYanFenPlan(player, trigger.target);
                    event.result = await player.chooseTarget(
                        [2, 2],
                        '【焰分噬浪尺】：移除3【斗气】，选择攻击目标以外的两名角色，各造成' +
                            damage + '点法术伤害',
                        function(card, player, target) {
                            return target.isIn() &&
                                target != _status.event.attackTarget;
                        }
                    ).set('attackTarget', trigger.target)
                        .set('damageNum', damage)
                        .set('planTargets', plan ? plan.targets : [])
                        .set('ai', function(target) {
                            var planned = _status.event.planTargets || [];
                            if(planned.includes(target)) return 20;
                            return -20;
                        }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var targets = event.targets || [];
                    if(targets.length != 2) return;
                    await player.removeZhiShiWu('xiaoYanDouQi', 3);
                    var fireCount = lib.skill.xiaoYanYiHuoManager
                        .getRefined(player).length;
                    var damage = Math.ceil(fireCount / 2);
                    for(var target of targets.sortBySeat(player)) {
                        if(target.isIn()) {
                            await target.faShuDamage(damage, player, 'nocard');
                        }
                    }
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
                            damage: 2,
                        };
                    }
                    if(!manager.isRefined(player, 'yunLuoXinYan')) {
                        return {
                            fire: 'yunLuoXinYan',
                            energy: 'shuiJing',
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
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var actual = Math.max(
                        0,
                        info.damage - manager.aiTreatment(player)
                    );
                    if(player.countCards('h') + actual >
                        player.getHandcardLimit()) return false;
                    var value = {
                        qingLianDiXinHuo: 3.4,
                        yunLuoXinYan: 4,
                        guLingLengHuo: 5,
                    }[info.fire] || 2;
                    value -= manager.aiSelfDamageRisk(player, info.damage);
                    value -= info.cost * 0.3;
                    value -= info.energy == 'baoShi' ? 1.4 : 0.75;
                    if(player.countZhiShiWu('xiaoYanDouQi') >= 5) {
                        value += 0.7;
                    }
                    return value > 0.45;
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
                    var fireAudio = {
                        qingLianDiXinHuo: 'qingLianDiXinHuo.mp3',
                        yunLuoXinYan: 'yunLuoXinYan.mp3',
                        guLingLengHuo: 'guLingLengHuo.mp3',
                    }[info.fire];
                    if(fireAudio) {
                        game.broadcastAll(function(audioFile, speaker) {
                            if(!lib.config.background_speak) return;
                            game.playAudio({
                                path: 'ext:bigcowcow/audio/skill/xiaoYan/' +
                                    audioFile,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, fireAudio, player);
                    }
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
                        "audio": "ext:bigcowcow/audio/skill/xiaoYan/tianHuoSanXuanBian.mp3",
                        "aiPlan": function(player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    if(!player || !player.canBiShaShuiJing ||
                        !player.canBiShaShuiJing()) return null;
                    var bright = manager.getBright(player);
                    var max = Math.min(
                        3,
                        bright.length,
                        player.countZhiShiWu('xiaoYanDouQi')
                    );
                    if(!max) return null;
                    var attacks = player.getCards('h', function(card) {
                        return get.type(card, player) == 'gongJi';
                    });
                    var enemies = game.filterPlayer(function(target) {
                        return target.isIn() && target.side != player.side;
                    });
                    if(!attacks.length || !enemies.length) return null;
                    var plans = [];
                    for(var x = 1; x <= max; x++) {
                        var best = null;
                        attacks.forEach(function(card) {
                            enemies.forEach(function(target) {
                                var response = target.countCards('h', function(current) {
                                    if(get.type(current, target) != 'gongJi') {
                                        return false;
                                    }
                                    return get.xiBie(current) == 'an' ||
                                        get.xiBie(current) == get.xiBie(card);
                                });
                                var shield = target.hasExpansions &&
                                    target.hasExpansions('_shengDun');
                                var hit = x >= 3 ? 0.98 :
                                    response > 0 ? 0.42 : 0.9;
                                if(x < 2 && shield) hit *= 0.25;
                                var damage = 3;
                                var score = manager.aiDamageScore(
                                    target,
                                    player,
                                    damage,
                                    x >= 2
                                ) * hit;
                                if(x >= 2) {
                                    score += Math.min(
                                        damage,
                                        manager.aiTreatment(target)
                                    ) * 0.65;
                                    if(shield) score += 1.2;
                                }
                                if(x >= 3 && response > 0) {
                                    score += Math.min(1.5, response * 0.55);
                                }
                                if(!best || score > best.score) {
                                    best = {
                                        target: target,
                                        card: card,
                                        score: score,
                                    };
                                }
                            });
                        });
                        if(!best) continue;
                        var fires = bright.slice().sort(function(a, b) {
                            return manager.aiFireKeepValue(player, a) -
                                manager.aiFireKeepValue(player, b);
                        }).slice(0, x);
                        var score = best.score - x * 0.5 - 0.8;
                        fires.forEach(function(fire) {
                            score -= manager.aiFireKeepValue(player, fire) * 0.25;
                        });
                        if(get.zhanJi(player.side).includes('shuiJing')) {
                            score += 0.8;
                        }
                        plans.push({
                            x: x,
                            fires: fires,
                            target: best.target,
                            card: best.card,
                            score: score,
                        });
                    }
                    plans.sort(function(a, b) { return b.score - a.score; });
                    var plan = plans[0] || null;
                    var lotus = manager.aiFoNuPlan(player);
                    if(lotus && plan && lotus.score > plan.score + 0.35) {
                        return null;
                    }
                    return plan && plan.score > 0.45 ? plan : null;
                },
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
                    var plan = lib.skill.tianHuoSanXuanBian.aiPlan(player);
                    var desired = plan ? plan.x : 1;
                    var links = await player.chooseButton(
                        [
                            '【天火三玄变】：选择1至' + max +
                                '张明亮【异火】',
                            [choices, 'textbutton'],
                        ],
                        [1, max]
                    ).set('desiredCount', desired)
                        .set('desiredFires', plan ? plan.fires : [])
                        .set('ai', function(button) {
                        var fire = Array.isArray(button.link) ?
                            button.link[0] : button.link;
                        if((_status.event.desiredFires || []).includes(fire)) {
                            return 10;
                        }
                        return ui.selected.buttons.length <
                            _status.event.desiredCount ? 1 : -10;
                    }).forResultLinks() || [];
                    event.result = {
                        bool: links.length > 0,
                        cost_data: {
                            fires: links,
                            aiTarget: plan && plan.target || null,
                            aiCard: plan && plan.card || null,
                        },
                    };
                },
                        "content": async function(event, trigger, player) {
                    var data = event.cost_data || {};
                    var fires = (data.fires || []).slice();
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu(
                        'xiaoYanDouQi',
                        fires.length
                    );
                    player.storage.tianHuoSanXuanBianState = {
                        fires: fires,
                        x: fires.length,
                        aiTarget: data.aiTarget && data.aiTarget.playerid,
                        aiCard: data.aiCard && data.aiCard.cardid,
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
                    return !!lib.skill.tianHuoSanXuanBian.aiPlan(player);
                },
                        "ai": {
                            "shuiJing": true,
                            "order": function(item, player) {
                        var plan = lib.skill.tianHuoSanXuanBian.aiPlan(player);
                        return plan ? 5 + Math.min(1, plan.score * 0.1) : 0;
                    },
                        },
                    },
                    "foNuHuoLian": {
                        "audio": "ext:bigcowcow/audio/skill/xiaoYan/foNuHuoLian.mp3",
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
                        "content": async function(event, trigger, player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var fires = manager.getBright(player);
                    var plan = manager.aiFoNuPlan(player);
                    var desired = plan ? plan.count : 2;
                    var links = await player.chooseButton(
                        [
                            '【佛怒火莲】：选择2张或3张明亮【异火】',
                            [fires, 'textbutton'],
                        ],
                        [2, Math.min(3, fires.length)],
                        true
                    ).set('desiredCount', desired)
                        .set('desiredFires', plan ? plan.fires : [])
                        .set('ai', function(button) {
                        if((_status.event.desiredFires || [])
                            .includes(button.link)) return 10;
                        return ui.selected.buttons.length <
                            _status.event.desiredCount ? 1 : -10;
                    }).forResultLinks();
                    if(!links || links.length < 2) return;
                    var targets = await player.chooseTarget(
                        true,
                        '【佛怒火莲】：选择一名目标对手',
                        function(card, player, target) {
                            return target.side != player.side;
                        }
                    ).set('ai', function(target) {
                        var plan = lib.skill.xiaoYanYiHuoManager
                            .aiFoNuPlan(_status.event.player);
                        if(plan && plan.target == target) return 20;
                        return lib.skill.xiaoYanYiHuoManager.aiDamageScore(
                            target,
                            _status.event.player,
                            3
                        );
                    }).forResultTargets();
                    if(!targets || !targets.length) return;
                    fires = links.slice();
                    var target = targets[0];
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
                        var plan = lib.skill.xiaoYanYiHuoManager
                            .aiFoNuPlan(player);
                        return plan ? 6 + Math.min(1, plan.score * 0.1) : 0;
                    },
                            "result": {
                                "player": function(player) {
                            var plan = lib.skill.xiaoYanYiHuoManager
                                .aiFoNuPlan(player);
                            return plan ? plan.score : -10;
                        },
                            },
                        },
                    },
                    "xiaoYanDouQi": {
                        "intro": {
                            "name": "斗气",
                            "content": "mark",
                            "max": 5,
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
                        "aiTreatment": function(player) {
                    return Math.max(0, player && player.zhiLiao || 0);
                },
                        "aiOverflow": function(target, damage, ignoreTreatment) {
                    if(!target || typeof target.getHandcardLimit != 'function') {
                        return 0;
                    }
                    var actual = Math.max(
                        0,
                        (damage || 0) - (ignoreTreatment ? 0 :
                            lib.skill.xiaoYanYiHuoManager.aiTreatment(target))
                    );
                    return Math.max(
                        0,
                        target.countCards('h') + actual -
                            target.getHandcardLimit()
                    );
                },
                        "aiDamageScore": function(
                            target,
                            player,
                            damage,
                            ignoreTreatment
                        ) {
                    if(!target || !player || damage <= 0) return 0;
                    var score = get.damageEffect2(target, player, damage);
                    var overflow = lib.skill.xiaoYanYiHuoManager
                        .aiOverflow(target, damage, ignoreTreatment);
                    if(target.side != player.side) {
                        score += overflow * 3;
                        if(overflow > 0 && overflow >= get.shiQi(target.side)) {
                            score += 20;
                        }
                    } else {
                        score -= overflow * 3;
                        if(overflow > 0 && overflow >= get.shiQi(target.side)) {
                            score -= 20;
                        }
                    }
                    return score;
                },
                        "aiSelfDamageRisk": function(player, damage) {
                    if(!player) return 99;
                    var actual = Math.max(
                        0,
                        (damage || 0) -
                            lib.skill.xiaoYanYiHuoManager.aiTreatment(player)
                    );
                    var overflow = lib.skill.xiaoYanYiHuoManager
                        .aiOverflow(player, damage);
                    var risk = actual * 0.5 + overflow * 4;
                    if(overflow > 0 && overflow >= get.shiQi(player.side)) {
                        risk += 30;
                    }
                    return risk;
                },
                        "aiFireKeepValue": function(player, fire) {
                    if(fire == 'guLingLengHuo') return 2.2;
                    if(fire == 'qingLianDiXinHuo') {
                        return player && player.countCards('h', function(card) {
                            return get.type(card, player) == 'gongJi';
                        }) > 0 ? 1.8 : 1.1;
                    }
                    if(fire == 'yunLuoXinYan') {
                        var need = player ? Math.max(
                            0,
                            3 - player.countZhiShiWu('xiaoYanDouQi')
                        ) : 0;
                        return 1.1 + need * 0.35;
                    }
                    return 1;
                },
                        "aiBestEnemy": function(player, damage) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var best = null;
                    game.countPlayer(function(target) {
                        if(!target.isIn() || target.side == player.side) return;
                        var score = manager.aiDamageScore(
                            target,
                            player,
                            damage
                        );
                        if(!best || score > best.score) {
                            best = { target: target, score: score };
                        }
                    });
                    return best;
                },
                        "aiYanFenPlan": function(player, attackTarget) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    var refined = manager.getRefined(player).length;
                    if(!refined) return null;
                    var damage = Math.ceil(refined / 2);
                    var cold = manager.isBright(player, 'guLingLengHuo') ? 1 : 0;
                    var choices = [];
                    game.countPlayer(function(target) {
                        if(!target.isIn() || target == attackTarget ||
                            target.side == player.side) return;
                        choices.push({
                            target: target,
                            score: manager.aiDamageScore(
                                target,
                                player,
                                damage
                            ) + (cold && damage > manager.aiTreatment(target) ?
                                manager.aiDamageScore(
                                target,
                                player,
                                1
                            ) * 0.7 : 0),
                        });
                    });
                    choices.sort(function(a, b) { return b.score - a.score; });
                    if(choices.length < 2) return null;
                    var score = choices[0].score + choices[1].score - 1.8;
                    if(score <= 0.5) return null;
                    return {
                        targets: [choices[0].target, choices[1].target],
                        damage: damage,
                        score: score,
                    };
                },
                        "aiFoNuPlan": function(player) {
                    var manager = lib.skill.xiaoYanYiHuoManager;
                    if(!player || !player.canBiShaBaoShi ||
                        !player.canBiShaBaoShi() ||
                        player.hasSkill && player.hasSkill(
                            'tianHuoSanXuanBianJinZhiFoNu'
                        )) return null;
                    var bright = manager.getBright(player);
                    if(bright.length < 2) return null;
                    var enemies = game.filterPlayer(function(target) {
                        return target.isIn() && target.side != player.side;
                    });
                    if(!enemies.length) return null;
                    var cold = manager.isBright(player, 'guLingLengHuo');
                    var plans = [];
                    [2, 3].forEach(function(count) {
                        if(bright.length < count) return;
                        var targetDamage = count == 3 ? 3 : 2;
                        var best = manager.aiBestEnemy(player, targetDamage);
                        if(!best) return;
                        var score = best.score;
                        if(cold && targetDamage >
                            manager.aiTreatment(best.target)) {
                            score += manager.aiDamageScore(
                            best.target,
                            player,
                            1
                        ) * 0.7;
                        }
                        if(count == 2) {
                            score -= manager.aiSelfDamageRisk(player, 1);
                        } else {
                            enemies.forEach(function(target) {
                                if(target == best.target) return;
                                score += manager.aiDamageScore(
                                    target,
                                    player,
                                    1
                                );
                                if(cold && 1 > manager.aiTreatment(target)) {
                                    score += manager.aiDamageScore(
                                    target,
                                    player,
                                    1
                                ) * 0.7;
                                }
                            });
                        }
                        var fires = bright.slice().sort(function(a, b) {
                            return manager.aiFireKeepValue(player, a) -
                                manager.aiFireKeepValue(player, b);
                        }).slice(0, count);
                        fires.forEach(function(fire) {
                            score -= manager.aiFireKeepValue(player, fire) * 0.35;
                        });
                        score -= 1.4;
                        plans.push({
                            count: count,
                            fires: fires,
                            target: best.target,
                            score: score,
                        });
                    });
                    plans.sort(function(a, b) { return b.score - a.score; });
                    return plans.length && plans[0].score > 0.6 ? plans[0] : null;
                },
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
                        "getRefined": function(player) {
                    return lib.skill.xiaoYanYiHuoManager.fires
                        .filter(function(fire) {
                            return lib.skill.xiaoYanYiHuoManager
                                .isRefined(player, fire);
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
                            var manager = lib.skill.xiaoYanYiHuoManager;
                            var blood = player.countZhiShiWu(
                                'xiaoYanDouQi'
                            );
                            var next = lib.skill.fenJueLianHua.nextFire(player);
                            if(blood < 3 || next && blood < next.cost) {
                                return '+1【斗气】';
                            }
                            var bestDim = manager.getDim(player).sort(
                                function(a, b) {
                                    return manager.aiFireKeepValue(player, b) -
                                        manager.aiFireKeepValue(player, a);
                                }
                            )[0];
                            return bestDim ? '翻转黯淡异火' : '+1【斗气】';
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
                    ).set('ai', function(button) {
                        return lib.skill.xiaoYanYiHuoManager
                            .aiFireKeepValue(
                                _status.event.player,
                                button.link
                            );
                    }).forResultLinks();
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
                        "ai": {
                            "effect": {
                                "player_use": function(card, player, target) {
                            if(!card || get.type(card, player) != 'gongJi' ||
                                !target || target.side == player.side) return;
                            var state = player.storage
                                .tianHuoSanXuanBianState;
                            if(!state) return;
                            var matchedTarget = !state.aiTarget ||
                                target.playerid == state.aiTarget;
                            var matchedCard = !state.aiCard ||
                                card.cardid == state.aiCard;
                            if(matchedTarget && matchedCard) {
                                return [1, 0, 1, -3];
                            }
                            if(matchedTarget || matchedCard) {
                                return [1, 0, 1, -1];
                            }
                        },
                            },
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
                },
                "translate": {
                    "lengKuZhiXin": "被动【冷酷之心】",
                    "lengKuZhiXin_info": "你的主动攻击无视【圣盾】的效果。",
                    "ningLangZhiGuangJian": "被动【凝浪之光剑】",
                    "ningLangZhiGuangJian_info": "<span class='tiaoJian'>（攻击命中时②）</span>你+1<span class='hong'>【复仇】</span>。",
                    "guangJiangZhiJian": "响应【光降之剑】",
                    "guangJiangZhiJian_info": "<span class='tiaoJian'>（主动攻击命中时②，移除2<span class='hong'>【复仇】</span>并弃1张牌【展示】）</span>按弃牌系别结算：<br>火：本次伤害+1。<br>地：对其他对手各造成X-1点法术伤害③，X为本次攻击伤害。<br>风：再弃1张牌，本次伤害-1；行动结束后对该目标进行一次暗系主动攻击。",
                    "guangJiangZhiJian_feng": "响应【光降之剑-风】",
                    "guangJiangZhiJian_di": "响应【光降之剑-地】",
                    "chaoJuanBingXiao": "响应【潮卷冰削】",
                    "chaoJuanBingXiao_info": "【回合限定】<span class='tiaoJian'>（本回合已主动攻击过一名角色，移除1<span class='hong'>【复仇】</span>）</span>对其再执行一次【攻击行动】，伤害+1；不能与【凝浪之光剑】同时发动。",
                    "bingChaoDeWoXuan": "响应【冰潮的涡旋】",
                    "bingChaoDeWoXuan_info": "【水晶】<span class='tiaoJian'>（主动攻击前①）</span>将手牌补至上限【强制】，+1<span class='hong'>【复仇】</span>；本次攻击无法应战。",
                    "fuChou": "复仇",
                    "fuChou_info": "<span class='hong'>【复仇】</span>为浪花骑士（优菈）专属指示物，上限为4。",
                    "jieShi": "被动【借势】",
                    "jieShi_info": "你的攻击无视【圣盾】。<span class='tiaoJian'>（主动攻击未命中或应战攻击命中时）</span>+1<span class='hong'>【枪势】</span>；你的攻击每有一次未命中，后续攻击伤害累计+1；你的回合结束时将累计值置为0。",
                    "lianHuanTuCi": "响应【连环突刺】",
                    "lianHuanTuCi_info": "【回合限定】<span class='tiaoJian'>（主动攻击未命中时，移除1<span class='hong'>【枪势】</span>）</span>+1【攻击行动】。",
                    "hengQiangJiaShi": "响应【横枪架势】",
                    "hengQiangJiaShi_info": "【回合限定】<span class='tiaoJian'>（应战时，移除1<span class='hong'>【枪势】</span>）</span>将任意系攻击牌视为与当前攻击同系使用，应战伤害-1；不改变原攻击牌系别。",
                    "poZhenHuiQiang": "响应【破阵回枪】",
                    "poZhenHuiQiang_info": "【回合限定】【水晶】<span class='tiaoJian'>（主动攻击前，移除1<span class='hong'>【枪势】</span>）</span>本次攻击伤害+1；若本次攻击未命中，+1【攻击行动】。",
                    "qiangShi": "枪势",
                    "qiangShi_info": "<span class='hong'>【枪势】</span>为赫克托专属指示物，上限为2。",
                    "shengCunQiDian": "被动【生存起点】",
                    "shengCunQiDian_info": "<span class='tiaoJian'>（游戏开始时）</span>将具有2【耐久】的【木剑】置于面前，其余剑置于场外。剑的【耐久】不超过上限；回合结束时移除0【耐久】的当前剑。",
                    "caiJi": "响应【采集】",
                    "caiJi_info": "<span class='tiaoJian'>（你因发动剑的专属技能而移除【耐久】后）</span>若<span class='lan'>【素材】</span>未达到上限，将牌堆顶1张牌面朝下置于角色旁作为<span class='lan'>【素材】</span>。",
                    "gongZuoTai": "启动【工作台】",
                    "gongZuoTai_info": "<span class='tiaoJian'>（展示并弃置配方所需<span class='lan'>【素材】</span>）</span>制作1把可锻造的剑；将当前剑置于场外，新剑以满【耐久】置于面前。",
                    "zhanDouFuMo": "响应【战斗附魔】",
                    "zhanDouFuMo_info": "<span class='tiaoJian'>（持剑攻击命中后②，弃置X张<span class='lan'>【素材】</span>；【金剑】或【下界合金剑】X可为1或2，否则X=1）</span>每系数量为Y：<br>雷：伤害+Y。　火：对目标造成Y点法术伤害③。<br>地：对另外Y名角色各造成等额法术伤害③。　水：发动Y+1次【采集】。<br>风：目标弃Y张手牌。　光：当前剑+（Y+1）【耐久】。<br>暗：你+（Y+1）【水晶】。",
                    "jingYanXiuBu": "响应【经验修补】",
                    "jingYanXiuBu_info": "【水晶】<span class='tiaoJian'>（攻击命中后②，弃2张手牌）</span>当前剑+2【耐久】，不超过上限。",
                    "shiDiFuSuCai": "素材",
                    "shiDiFuSuCai_info": "<span class='lan'>【素材】</span>为史蒂夫专属盖牌，上限为5。",
                    "shiDiFuJian": "史蒂夫剑专属卡管理",
                    "shiDiFuJian_info": "面前至多有1把剑；【耐久】记录于当前剑且不超过上限，与角色【治疗】无关。",
                    "muJian": "(专)[响应]木剑",
                    "muJian_info": "【耐久2｜配方：任意1<span class='lan'>【素材】</span>】<br>【简易工具】：攻击时移除1【耐久】；若未命中，结算后将攻击牌盖为<span class='lan'>【素材】</span>。",
                    "jinJian": "(专)[响应]金剑",
                    "jinJian_info": "【耐久1｜配方：1光系<span class='lan'>【素材】</span>】<br>【急速挥砍】【回合限定】：<span class='tiaoJian'>（攻击行动结束时，移除1【耐久】）</span>+1【攻击行动】或【法术行动】。<br>【矿物勘探】：【采集】改为四选一，其余牌弃置。",
                    "shiJian": "(专)[响应]石剑",
                    "shiJian_info": "【耐久2｜配方：1地系<span class='lan'>【素材】</span>】<br>【沉重格挡】：应战时移除1【耐久】，将任意攻击牌视为当前攻击同系；若命中，额外发动1次【采集】。<br>【粗糙采掘】：【采集】改为二选一，另一张弃置。",
                    "tieJian": "(专)[响应]铁剑",
                    "tieJian_info": "【耐久3｜配方：2张同系<span class='lan'>【素材】</span>】<br>【稳定锋刃】：攻击时移除1【耐久】，伤害+1。<br>【矿脉精炼】：【采集】改为三选一，其余牌弃置。",
                    "zuanShiJian": "(专)[响应]钻石剑",
                    "zuanShiJian_info": "【耐久4｜配方：3水系<span class='lan'>【素材】</span>】<br>【钻石破甲】：攻击时移除1【耐久】，伤害+1；主动攻击无法应战。<br>【精准开采】：【采集】可改为令任意角色弃1张牌作为<span class='lan'>【素材】</span>。",
                    "xiaJieHeJinJian": "(专)[响应]下界合金剑",
                    "xiaJieHeJinJian_info": "【耐久5｜配方：持有【钻石剑】，1火系+1暗系<span class='lan'>【素材】</span>】<br>【不毁之锋】：攻击时移除1【耐久】，伤害+1且无法应战。<br>【下界锻造】：攻击结算后若耐久为0，弃置全部<span class='lan'>【素材】</span>；每张火系或暗系素材恢复1【耐久】。",
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
                    "lianJi_info": "<span class='lan'>【连击】</span>为桐谷和人专属指示物，上限为3；<span class='tiaoJian'>（【普通形态】下）</span>跨回合保留。",
                    "fengBiZhe": "被动【封弊者】",
                    "fengBiZhe_info": "<span class='tiaoJian'>（【普通形态】下）</span>主动【攻击行动】结束后+1<span class='lan'>【连击】</span>；本回合第4次及之后的主动攻击无法应战。",
                    "erDaoLiu": "被动【二刀流】",
                    "erDaoLiu_info": "<span class='tiaoJian'>（【普通形态】下，主动攻击行动结束后，<span class='lan'>【连击】</span>已满）</span>【横置】进入【二刀流形态】并+1【攻击行动】。入形后的第一次主动攻击若与入形攻击异系，伤害+1。回合结束时清空<span class='lan'>【连击】</span>并【重置】。",
                    "erDaoLiuZhuangTai": "二刀流形态",
                    "erDaoLiuZhuangTai_info": "<span class='tiaoJian'>（【二刀流形态】下）</span>入形后的第一次主动攻击若与入形攻击异系，伤害+1；回合结束时清空<span class='lan'>【连击】</span>并【重置】。",
                    "yinSuChongJi": "响应【音速冲击】",
                    "yinSuChongJi_info": "【回合限定】<span class='tiaoJian'>（【普通形态】下，主动攻击前①）</span>摸1张牌【强制】；命中则伤害+1，未命中则行动结束后+1【攻击行动】。",
                    "siFangZhan": "响应【四方斩】",
                    "siFangZhan_info": "<span class='tiaoJian'>（【二刀流形态】下，主动攻击前①，移除1<span class='lan'>【连击】</span>）</span>选择：伤害+1；或伤害-1，行动结束后+1【攻击行动】。",
                    "xingBaoQiLiuZhan": "响应【星爆气流斩】",
                    "xingBaoQiLiuZhan_info": "【宝石】<span class='tiaoJian'>（【二刀流形态】下，主动攻击命中后②，清空<span class='lan'>【连击】</span>）</span>可弃至多X张攻击牌，X不超过移除数且至多为3；弃牌须与本次攻击及彼此异系。伤害+Y+1，Y为弃牌数。行动结束后【重置】，本回合不能再获得或执行额外【攻击行动】。",
                    "xingBaoQiLiuZhanFengSuo": "星爆气流斩",
                    "xingBaoQiLiuZhanFengSuo_info": "本回合不能再获得或执行额外【攻击行动】。",
                    "miaoYun": "喵运",
                    "miaoYun_info": "<span class='lan'>【喵运】</span>为一姬的专属指示物，上限为5。",
                    "yiJiBaoPai": "宝牌",
                    "yiJiBaoPai_info": "<span class='lan'>【宝牌】</span>为全场公开的专属牌，上限为4。与<span class='lan'>【宝牌】</span>同系，指与当前任意一张<span class='lan'>【宝牌】</span>同系。",
                    "baoPaiZhiShi": "被动【宝牌指示】",
                    "baoPaiZhiShi_info": "<span class='tiaoJian'>（游戏开始时）</span>展示牌库顶1张牌作为<span class='lan'>【宝牌】</span>。使用或打出与当前某张<span class='lan'>【宝牌】</span>同系的牌后，+1<span class='lan'>【喵运】</span>。",
                    "duanYaoJiuZhuangTai": "断幺九",
                    "duanYaoJiuZhuangTai_info": "手牌数不少于3，且没有【圣光】【暗灭】【圣盾】【虚弱】【中毒】。",
                    "duanYaoJiuMiao": "响应【断幺九喵】",
                    "duanYaoJiuMiao_info": "当你的手牌数不少于3，且手牌中没有【圣光】【暗灭】或基础效果牌时，你处于<span class='lan'>【断幺九】</span>状态。<br><span class='tiaoJian'>（特殊行动结束后，处于<span class='lan'>【断幺九】</span>状态）</span>可以展示并弃置全部手牌。令Y为弃置手牌数，X为其中与当前任意<span class='lan'>【宝牌】</span>同系的牌数，Z为当前<span class='lan'>【宝牌】</span>数：+X+1<span class='lan'>【喵运】</span>；摸Y-X张牌【强制】；移除全部<span class='lan'>【宝牌】</span>，展示牌库顶Z张牌，将其作为新的<span class='lan'>【宝牌】</span>。",
                    "liZhiMiao": "响应【立直喵】",
                    "liZhiMiao_info": "【回合限定】<span class='tiaoJian'>（主动攻击前①，攻击牌与某张<span class='lan'>【宝牌】</span>同系）</span>伤害+1；若命中，+1【法术行动】。",
                    "duiDuiHuMiao": "法术【对对胡喵】",
                    "duiDuiHuMiao_info": "<span class='tiaoJian'>（弃1张法术牌）</span>+1<span class='lan'>【喵运】</span>，指定一名对手并展示牌库顶牌：与某张<span class='lan'>【宝牌】</span>同系，对目标造成2点法术伤害③；否则你与目标各受1点法术伤害③。结算后，选择移除1张<span class='lan'>【宝牌】</span>，将展示牌作为新的<span class='lan'>【宝牌】</span>。",
                    "haiDiLaoYueMiao": "响应【海底捞月喵】",
                    "haiDiLaoYueMiao_info": "<span class='tiaoJian'>（你摸牌时）</span>可以展示最后摸到的1张牌。<br>若与某张<span class='lan'>【宝牌】</span>同系：+1【治疗】，+1<span class='lan'>【喵运】</span>。<br>若与所有<span class='lan'>【宝牌】</span>不同系，可以将该牌与其中1张<span class='lan'>【宝牌】</span>交换。",
                    "gangMiao": "启动【杠喵】",
                    "gangMiao_info": "【水晶】<span class='tiaoJian'>（移除2<span class='lan'>【喵运】</span>）</span>展示牌库顶1张牌，额外作为你的<span class='lan'>【宝牌】</span>。",
                    "yiManShiJianMiao": "法术【役满时间喵】",
                    "yiManShiJianMiao_info": "【宝石】<span class='tiaoJian'>（移除5<span class='lan'>【喵运】</span>）</span>查看并弃置牌库顶5张牌，对一名对手造成X点法术伤害③；X为其中与某张<span class='lan'>【宝牌】</span>同系的牌数。若X＞2，+1【法术行动】；若X＞4，额外+5<span class='lan'>【喵运】</span>。",
                    "moQiShaoNianQiong": "被动【莫欺少年穷】",
                    "moQiShaoNianQiong_info": "<span class='tiaoJian'>（回合结束时，本回合未执行【特殊行动】且未因你的效果令对方士气下降）</span>+1<span class='lan'>【斗气】</span>、+1【治疗】；若己方士气较低，改为+2<span class='lan'>【斗气】</span>并+1【水晶】。【斗气】已满仍获得【水晶】。",
                    "fenJue": "被动【焚决】",
                    "fenJue_info": "游戏开始时没有【异火】。<span class='tiaoJian'>（回合开始时）</span>若有黯淡【异火】，将其中1张翻亮【强制】。",
                    "baJiBeng": "响应【八极崩】",
                    "baJiBeng_info": "<span class='tiaoJian'>（攻击命中后③，目标没有【暗劲】，移除1<span class='lan'>【斗气】</span>）</span>将专属卡【暗劲】置于攻击目标面前。",
                    "yanFenShiLangChi": "响应【焰分噬浪尺】",
                    "yanFenShiLangChi_info": "<span class='tiaoJian'>（已炼化至少1张【异火】，攻击命中后③，移除3<span class='lan'>【斗气】</span>）</span>选择攻击目标以外的另外两名角色，对其各造成X点法术伤害；X为已炼化【异火】数量÷2，向上取整。",
                    "fenJueLianHua": "启动【焚诀·炼化】",
                    "fenJueLianHua_info": "依次炼化【青莲地心火】→【陨落心炎】→【骨灵冷火】：<br>青莲：【水晶】、2<span class='lan'>【斗气】</span>，自伤2。<br>陨落：【水晶】、3<span class='lan'>【斗气】</span>，自伤3。<br>骨灵：【宝石】、3<span class='lan'>【斗气】</span>，自伤4。<br>若自伤及爆牌令己方士气下降，炼化失败并返还1<span class='lan'>【斗气】</span>；否则放置对应【异火】，骨灵成功后失去此技能。",
                    "tianHuoSanXuanBian": "启动【天火三玄变】",
                    "tianHuoSanXuanBian_info": "【回合限定】【水晶】<span class='tiaoJian'>（移除X<span class='lan'>【斗气】</span>，选择X张明亮【异火】，1≤X≤3）</span>本回合不能发动【佛怒火莲】。下一次主动攻击：<br>X≥1：伤害+1。　X≥2：无视【圣盾】且不能以【治疗】抵伤。　X=3：无法应战。<br>命中时可将己方1【水晶】转为1【宝石】；攻击结束后将所选异火翻暗，未攻击则于回合结束翻暗。",
                    "foNuHuoLian": "法术【佛怒火莲】",
                    "foNuHuoLian_info": "【宝石】<span class='tiaoJian'>（选择2或3张明亮【异火】）</span>结算后翻暗：<br>2张：对一名对手造成2点法术伤害③，再对自己造成1点法术伤害③。<br>3张：对一名对手造成3点法术伤害③，对其他对手各造成1点法术伤害③。",
                    "xiaoYanDouQi": "斗气",
                    "xiaoYanDouQi_info": "<span class='lan'>【斗气】</span>为萧炎专属指示物，上限为5。",
                    "xiaoYanYiHuoManager": "异火管理",
                    "xiaoYanYiHuoManager_info": "【异火】炼化前位于场外；炼化后以明亮面放置。翻暗时失去对应技能，翻亮后恢复。",
                    "xiaoYanAnJin": "(专)【暗劲】",
                    "xiaoYanAnJin_info": "<span class='tiaoJian'>（拥有者回合开始时）</span>移除【暗劲】，萧炎对其造成1点法术伤害③；若因此令对方士气下降，己方+1【水晶】。每名角色上限为1。",
                    "qingLianDiXinHuo": "(专)【青莲地心火】",
                    "qingLianDiXinHuo_info": "【地火焚身】：<span class='tiaoJian'>（对目标造成实际攻击伤害后⑤）</span>对其额外造成1点法术伤害③。翻面后变为黯淡。",
                    "yunLuoXinYan": "(专)【陨落心炎】",
                    "yunLuoXinYan_info": "【心火重燃】：<span class='tiaoJian'>（特殊行动后）</span>必须选择：+1<span class='lan'>【斗气】</span>；或将另一张黯淡【异火】翻亮。翻面后变为黯淡。",
                    "guLingLengHuo": "(专)【骨灵冷火】",
                    "guLingLengHuo_info": "【冷火灼魂】：<span class='tiaoJian'>（对另一名角色造成实际法术伤害后⑤）</span>对其额外造成1点法术伤害③；对自己的伤害不能触发。翻面后变为黯淡。",
                    "anDanQingLianDiXinHuo": "(专)【黯淡的青莲地心火】",
                    "anDanQingLianDiXinHuo_info": "黯淡的【青莲地心火】，通过【焚决】可重新翻至明亮面。",
                    "anDanYunLuoXinYan": "(专)【黯淡的陨落心炎】",
                    "anDanYunLuoXinYan_info": "黯淡的【陨落心炎】，通过【焚决】可重新翻至明亮面。",
                    "anDanGuLingLengHuo": "(专)【黯淡的骨灵冷火】",
                    "anDanGuLingLengHuo_info": "黯淡的【骨灵冷火】，通过【焚决】可重新翻至明亮面。",
                    "diHuoFenShen": "响应【地火焚身】",
                    "diHuoFenShen_info": "<span class='tiaoJian'>（对目标造成实际攻击伤害后⑤）</span>对其额外造成1点法术伤害③。",
                    "xinHuoChongRan": "响应【心火重燃】",
                    "xinHuoChongRan_info": "<span class='tiaoJian'>（特殊行动后）</span>必须选择：+1<span class='lan'>【斗气】</span>；或将另一张黯淡【异火】翻亮。",
                    "lengHuoZhuoHun": "响应【冷火灼魂】",
                    "lengHuoZhuoHun_info": "<span class='tiaoJian'>（对另一名角色造成实际法术伤害后⑤）</span>对其额外造成1点法术伤害③；对自己的伤害不能触发。",
                    "tianHuoSanXuanBianState": "天火三玄变",
                    "tianHuoSanXuanBianJinZhiFoNu": "天火三玄变",
                },
            },
            "intro": "添加角色优菈、赫克托、史蒂夫、桐谷和人、一姬、萧炎。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "2.8",
        },
        "files": {
            "character": [
                "youLa.png",
                "huiFengQiangShi.png",
                "steve.png",
                "tongGuHeRen.png",
                "yiJi.png",
                "xiaoYan.png",
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
                "mark_jieShi.png",
                "mark_lianJi.png",
                "mark_miaoYun.png",
                "mark_douQi.png",
                "mark_anJin.png",
            ],
            "audio": [
                "audio/skill/youLa/lengKuZhiXin.mp3",
                "audio/skill/youLa/ningLangZhiGuangJian.mp3",
                "audio/skill/youLa/guangJiangZhiJian.mp3",
                "audio/skill/youLa/chaoJuanBingXiao.mp3",
                "audio/skill/youLa/bingChaoDeWoXuan.mp3",
                "audio/action/youLa/gouMai.mp3",
                "audio/action/youLa/heCheng.mp3",
                "audio/action/youLa/tiLian.mp3",
                "audio/skill/heKeTuo/jieShi.mp3",
                "audio/skill/heKeTuo/lianHuanTuCi.mp3",
                "audio/skill/heKeTuo/hengQiangJiaShi.mp3",
                "audio/skill/heKeTuo/poZhenHuiQiang.mp3",
                "audio/action/heKeTuo/gouMai.mp3",
                "audio/action/heKeTuo/heCheng.mp3",
                "audio/action/heKeTuo/tiLian.mp3",
                "audio/skill/tongGuHeRen/fengBiZhe.mp3",
                "audio/skill/tongGuHeRen/erDaoLiu.mp3",
                "audio/skill/tongGuHeRen/yinSuChongJi.mp3",
                "audio/skill/tongGuHeRen/siFangZhan.mp3",
                "audio/skill/tongGuHeRen/xingBaoQiLiuZhan.mp3",
                "audio/action/tongGuHeRen/gouMai.mp3",
                "audio/action/tongGuHeRen/heCheng.mp3",
                "audio/action/tongGuHeRen/tiLian.mp3",
                "audio/skill/shiDiFu/shengCunQiDian.mp3",
                "audio/skill/shiDiFu/caiJi.mp3",
                "audio/skill/shiDiFu/gongZuoTai.mp3",
                "audio/skill/shiDiFu/zhanDouFuMo.mp3",
                "audio/skill/shiDiFu/zhanDouFuMo_lei.mp3",
                "audio/skill/shiDiFu/zhanDouFuMo_huo.mp3",
                "audio/skill/shiDiFu/zhanDouFuMo_di.mp3",
                "audio/skill/shiDiFu/zhanDouFuMo_shui.mp3",
                "audio/skill/shiDiFu/zhanDouFuMo_feng.mp3",
                "audio/skill/shiDiFu/zhanDouFuMo_guang.mp3",
                "audio/skill/shiDiFu/zhanDouFuMo_an.mp3",
                "audio/skill/shiDiFu/jingYanXiuBu.mp3",
                "audio/action/shiDiFu/gouMai.mp3",
                "audio/action/shiDiFu/heCheng.mp3",
                "audio/action/shiDiFu/tiLian.mp3",
                "audio/skill/xiaoYan/moQiShaoNianQiong.mp3",
                "audio/skill/xiaoYan/fenJue.mp3",
                "audio/skill/xiaoYan/baJiBeng.mp3",
                "audio/skill/xiaoYan/yanFenShiLangChi.mp3",
                "audio/skill/xiaoYan/qingLianDiXinHuo.mp3",
                "audio/skill/xiaoYan/yunLuoXinYan.mp3",
                "audio/skill/xiaoYan/guLingLengHuo.mp3",
                "audio/skill/xiaoYan/tianHuoSanXuanBian.mp3",
                "audio/skill/xiaoYan/foNuHuoLian.mp3",
                "audio/action/xiaoYan/gouMai.mp3",
                "audio/action/xiaoYan/heCheng.mp3",
                "audio/action/xiaoYan/tiLian.mp3",
                "audio/skill/zhaoFuQueJi/baoPaiZhiShi.mp3",
                "audio/skill/zhaoFuQueJi/duanYaoJiuMiao.mp3",
                "audio/skill/zhaoFuQueJi/liZhiMiao.mp3",
                "audio/skill/zhaoFuQueJi/duiDuiHuMiao.mp3",
                "audio/skill/zhaoFuQueJi/haiDiLaoYueMiao.mp3",
                "audio/skill/zhaoFuQueJi/gangMiao.mp3",
                "audio/skill/zhaoFuQueJi/yiManShiJianMiao.mp3",
                "audio/action/zhaoFuQueJi/gouMai.mp3",
                "audio/action/zhaoFuQueJi/heCheng.mp3",
                "audio/action/zhaoFuQueJi/tiLian.mp3",
            ],
        },
        "connect": true,
    };
});
