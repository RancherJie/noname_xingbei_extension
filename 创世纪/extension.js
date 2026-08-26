game.import("extension", function(lib, game, ui, get, ai, _status) {
    return {
        "name": "创世纪",
        "arenaReady": function(){

},
        "content": function(config,pack){

},
        "prepare": function(){

},
        "precontent": function(){
            var proto = lib.element && lib.element.Player &&
                lib.element.Player.prototype;
            if(!proto ||
                proto._tianQiZheBaoShiPatchedVersion == '1.8') return;
            proto._tianQiZheBaoShiPatched = true;
            proto._tianQiZheBaoShiPatchedVersion = '1.8';
            if(!proto._tianQiZheOriginalCanBiShaBaoShi) {
                proto._tianQiZheOriginalCanBiShaBaoShi =
                    proto.canBiShaBaoShi;
            }
            if(!proto._tianQiZheOriginalRemoveBiShaBaoShi) {
                proto._tianQiZheOriginalRemoveBiShaBaoShi =
                    proto.removeBiShaBaoShi;
            }
            proto.canBiShaBaoShi = function() {
                if(proto._tianQiZheOriginalCanBiShaBaoShi.call(this)) {
                    return true;
                }
                return this.getExpansions(
                    'tianQiZheTianShiZhuFu'
                ).length > 0;
            };
            proto.removeBiShaBaoShi = function() {
                var player = this;
                var hasBlessing =
                    player.getExpansions(
                        'tianQiZheTianShiZhuFu'
                    ).length > 0;
                if(!hasBlessing) {
                    return proto._tianQiZheOriginalRemoveBiShaBaoShi
                        .call(player);
                }
                var next = game.createEvent(
                    'tianShiZhuFuPay',
                    false
                );
                next.player = player;
                next.setContent(async function(event, trigger, player) {
                    var useBlessing = !player.hasNengLiang('baoShi');
                    if(!useBlessing) {
                        var control = await player.chooseControl([
                            '支付1【宝石】',
                            '发动【天使祝福】',
                        ]).set(
                            'prompt',
                            '请选择本次1【宝石】费用的支付方式'
                        ).set('ai', function() {
                            return '支付1【宝石】';
                        }).forResultControl();
                        useBlessing =
                            control == '发动【天使祝福】';
                    }
                    if(!useBlessing) {
                        await proto
                            ._tianQiZheOriginalRemoveBiShaBaoShi
                            .call(player);
                        return;
                    }
                    player.logSkill('tianQiZheTianShiZhuFu');
                    await lib.skill.tianQiZheZhuFuManager.removeCard(
                        player,
                        'tianQiZheTianShiZhuFu'
                    );
                    game.log(
                        player,
                        '以【天使祝福】视为支付了1个',
                        '#g【宝石】'
                    );
                });
                return next;
            };
},
        "help": {},
        "config": {},
        "package": {
            "character": {
                "connect": true,
                "character": {
                    "beiyanadopushen": [
                        null,
                        "huanGroup",
                        4.5,
                        [
                            "moFaHuDun",
                            "xuanWenShengCheng",
                            "ziDongXuanWen",
                            "xuanWenFaShe",
                            "huangLongYanYue",
                            "bianShenBeiYaNa",
                            "xuanWenQiangYa",
                            "xuanWen",
                        ],
                        [
                            "des:通过泰拉的科技将自己贝亚娜化，拥有着贤者的智慧和战神的力量，接近使徒的力量。",
                            "ext:创世纪/beiyanadopushen.png",
                            "die:ext:创世纪/audio/die/beiyanadopushen.mp3",
                        ],
                    ],
                    "baiHuaLiaoLuan": [
                        null,
                        "yongGroup",
                        5,
                        [
                            "nianQiHuanRao",
                            "lieRiGuangHui",
                            "guangZhiQinHe",
                            "nianQiBo",
                            "luanWuQianYeHua",
                            "nianQiZhao",
                            "nianZhiAoYi",
                            "qianLianNuFang",
                            "nianQi",
                        ],
                        [
                            "des:以念气淬炼身体、守护同伴的格斗家。她能在进攻与支援之间切换，并在念气彻底绽放时令千莲席卷全场。",
                            "ext:创世纪/baiHuaLiaoLuan.png",
                        ],
                    ],
                    "luMiYa": [
                        null,
                        "yongGroup",
                        5,
                        [
                            "faMiLiErShiYanShi",
                            "luMiYaShiYan",
                            "xingYunBangBangTang",
                            "gaiLiangMoFaXingDan",
                            "saoBaZhangWo",
                            "xuanZhuanSaoBa",
                            "rongYanYaoPing",
                            "suanYuYun",
                            "dianManPengZhuangJi",
                            "fanZhongLiZhuangZhi",
                            "jiYiRongHe",
                            "shiYanCaiLiao",
                            "luMiYaYanJiu",
                        ],
                        [
                            "des:以实验材料进行魔道实验的学者。露米娅能通过研究修正实验结果，并在魔弹、扫把、药剂与装置之间灵活切换。",
                            "ext:创世纪/luMiYa.png",
                        ],
                    ],
                    "tianQiZhe": [
                        null,
                        "shengGroup",
                        5,
                        [
                            "shouHuEnCi",
                            "lingHunXiSheng",
                            "guangZhiFuChou",
                            "shengLiZhiMao",
                            "chanHuiZhiChui",
                            "tianQiZheZhuFu",
                            "shengYuZhiFeng",
                            "kuaiSuYuHe",
                            "shengLingZhiChui",
                            "tianQiZheZhuFuManager",
                            "tianQiZheShenPan",
                        ],
                        [
                            "des:以治疗守护同伴、以审判惩戒敌人的圣职者。她能将祝福赐予队友，并在圣灵之槌降临时转入审判形态。",
                            "ext:创世纪/tianQiZhe.png",
                        ],
                    ],
                    "yuXueMoShen": [
                        null,
                        "xueGroup",
                        5,
                        [
                            "xueQiWangSheng",
                            "xueQiHuanXing",
                            "shiHunZhiShou",
                            "nuQiBaoFa",
                            "shiHunFengMoZhan",
                            "siWangKangJu",
                            "shiXue",
                            "bengShanLieDiZhan",
                            "moYuXueSha",
                            "yuXueMoShenXueQi",
                        ],
                        [
                            "des:被鬼神侵蚀后主动解开束缚的狂战士。伤痛会化为沸腾的血气，最终凝结为宣告狱血魔神降临的魔剑。",
                            "ext:创世纪/yuXueMoShen.png",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "创世纪": "创世纪",
                    "beiyanadopushen": "贝亚娜斗神",
                    "baiHuaLiaoLuan": "百花缭乱",
                    "luMiYa": "露米娅",
                    "tianQiZhe": "天启者",
                    "yuXueMoShen": "狱血魔神",
                },
            },
            "card": {
                "card": {
                    "tianQiZheRongYuZhuFuKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:创世纪/mark_rongYuZhuFu.png",
                    },
                    "tianQiZheShouHuHuiZhangKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:创世纪/mark_shouHuHuiZhang.png",
                    },
                    "tianQiZheWuQiZhuFuKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:创世纪/mark_wuQiZhuFu.png",
                    },
                    "tianQiZheTianShiZhuFuKa": {
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:创世纪/mark_tianShiZhuFu.png",
                    },
                },
                "translate": {
                    "tianQiZheRongYuZhuFuKa": "(专)【荣誉祝福】",
                    "tianQiZheRongYuZhuFuKa_info": "<span class='tiaoJian'>（响应【荣誉祝福】：拥有者令对方士气下降X点时）</span>移除此卡，选择一项：弃X张手牌【强制】，不足则全部弃置；或+X【治疗】。伤害及技能强制摸牌引发的爆牌均可触发。",
                    "tianQiZheShouHuHuiZhangKa": "(专)【守护徽章】",
                    "tianQiZheShouHuHuiZhangKa_info": "响应【守护徽章】：<span class='tiaoJian'>（拥有者被攻击命中时②）</span>若当前伤害＞0，移除此卡，令本次攻击伤害-2，最低为0。",
                    "tianQiZheWuQiZhuFuKa": "(专)【武器祝福】",
                    "tianQiZheWuQiZhuFuKa_info": "响应【武器祝福】：<span class='tiaoJian'>（拥有者的应战攻击命中时②）</span>移除此卡，本次攻击伤害+2。",
                    "tianQiZheTianShiZhuFuKa": "(专)【天使祝福】",
                    "tianQiZheTianShiZhuFuKa_info": "<span class='tiaoJian'>（响应【天使祝福】：拥有者支付技能的1【宝石】时）</span>可以移除此卡，视为已支付该【宝石】。无需移除战绩区资源，没有【宝石】也可发动。",
                },
                "list": [],
            },
            "skill": {
                "skill": {
                    "moFaHuDun": {
                        "trigger": {
                            "player": "zaoChengShangHai",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    // 条件1：必须是法术伤害
                    if(event.faShu!=true) return false;
                    // 条件2：玩家拥有【圣盾】标记（使用hasExpansions检查）
                    return player.hasExpansions('_shengDun'); // 修改为hasExpansions检查
                },
                        "content": function() {
                    // 法术伤害-1
                    trigger.num--;
                },
                        "_priority": 0,
                    },
                    "xuanWenShengCheng": {
                        "trigger": {
                            "player": [
                                "gongJiMingZhong",
                                "daChuPai",
                            ],
                        },
                        "filter": function(event, player) {
                    // 条件1：炫纹小于9个
                    if( player.getExpansions('xuanWen').length >= 9)
                        return false;
                    // 条件2：水系或火系攻击命中
                    if(event.gongJiMingZhong)
                        return get.xiBie(event.card) == 'shui' || get.xiBie(event.card) == 'huo';
                    // 条件3：打出牌名为【暗灭】或【圣光】
                    return event.card.name=='anMie' || event.card.name=='shengGuang';
                },
                        "content": function() {
                    'step 0'
                    // 将触发牌转化为炫纹标记
                    player.addToExpansion('draw',trigger.card.cards,'log').gaintag.add('xuanWen');
                    'step 1'
                    // 展示生成的炫纹
                    player.showCards(trigger.card.cards);

                },
                        "intro": "当你的火系、水系攻击命中时或打出【暗灭】、【圣光】时，将攻击牌或生效牌面向上置于角色旁作为【炫纹】",
                        "_priority": 0,
                    },
                    "ziDongXuanWen": {
                        "trigger": {
                            "global": "changeShiQiEnd",
                        },
                        "filter": function (event, player) {
                    if (event.side == player.side) return false;
                    if (event.num >= 0) return false;
                    if (player.countCards('h') == 0) return false;
                    if( player.getExpansions('xuanWen').length >= 9)
                        return false;
                    return true;
                },
                        "check": function(event, player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "content": function () {
                    'step 0'
                    // 将一张手牌转化为炫纹标记
                    player.chooseCard('h',true,'将1张手牌面朝下放置在你角色旁，作为【炫纹】')
                    'step 1'
                    // 添加炫纹标记
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('xuanWen');
                    'step 2'
                    player.draw(2);
                    // 抽一张牌
                },
                        "_priority": 0,
                    },
                    "xuanWenFaShe": {
                        "trigger": {
                            "source": "zaoChengShangHai",
                        },
                        "filter": function(event,player){
                    if(event.yingZhan==true) return false;                 // 排除迎战攻击
                    if(event.faShu) return false;
                    var cards=player.getExpansions("xuanWen");
                    if(!cards.length) return false;
                    var card=cards[cards.length-1];
                    var xiBie=player.isHengZhi() ?
                        'an' : get.xiBie(card);
                    if(xiBie=='shui'){
                        return game.hasPlayer(function(target){
                            return target.countCards('h')>0;
                        });
                    }
                    return true;

                },
                        "content": async function(event,trigger,player){
                    var cards=player.getExpansions('xuanWen');
                    var card=cards[cards.length-1];
                    var xuanWenFaShe_xiBie=get.xiBie(card);
                    if(player.isHengZhi()) {
                        xuanWenFaShe_xiBie='an';
                    }
                    game.log(
                        player,
                        '发射了',
                        card,
                        '（'+get.translation(xuanWenFaShe_xiBie)+'系【炫纹】）'
                    );
                    await player.discard(card,'xuanWen').set('visible',true);
                    var target;
                    switch(xuanWenFaShe_xiBie){
                        case 'huo':
                            target = await player.chooseTarget(
                                '火系炫纹：对目标角色造成1点法术伤害③',
                                true
                            ).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResultTargets();
                            target = target[0];
                            if(target) await target.faShuDamage(1,player);
                            break;
                        case'shui':
                            target = await player.chooseTarget(
                                '水系炫纹：令一名有手牌的角色弃1张牌',
                                true,
                                function(card,player,target){
                                    return target.countCards('h') > 0;
                                }
                            ).set('ai',function(target){
                                var player = _status.event.player;
                                if(target.side != player.side) return 0;
                                return get.attitude(player, target);
                            }).forResultTargets();
                            target = target[0];
                            if(target) {
                                await target.chooseToDiscard('h',true);
                            }
                            break;
                        case 'an':
                            target = await player.chooseTarget(
                                '暗系炫纹：对目标角色造成2点法术伤害③',
                                true
                            ).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,2);
                            }).forResultTargets();
                            target = target[0];
                            if(target) await target.faShuDamage(2,player);
                            break;
                        case 'guang':
                            await player.addGongJiOrFaShu();
                            break;
                    }
                },
                        "check": function(event, player) {
                    var cards = player.getExpansions('xuanWen');
                    if(!cards.length) return false;
                    var xiBie = player.isHengZhi() ?
                        'an' : get.xiBie(cards[cards.length - 1]);
                    if(xiBie != 'shui') return true;
                    return game.hasPlayer(function(target) {
                        return target.side == player.side &&
                            target.countCards('h') > 0;
                    });
                },
                        "_priority": 0,
                    },
                    "huangLongYanYue": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "usable": 1,
                        "filter": function(event,player){
                    if(event.yingZhan==true) return false; // 排除迎战攻击
                    //return player.getExpansions('xuanWen').length>0&&player.canBiShaShuiJing(); // 必须拥有炫纹标记和消耗水晶
                    var cards=player.getExpansions('xuanWen');
                    if(cards.length==0) return false;
                    for(var i=0;i<cards.length;i++){
                        if(get.xiBie(cards[i])=='an'||get.xiBie(cards[i])=='guang') return true;
                    }
                    return false;

                },
                        "check": function(event, player) {
                    return !!event.target && event.target.side != player.side;
                },
                        "logTarget": "target",
                        "content": function(){
                    'step 0.'
                    //player.removeBiShaShuiJing();

                    'step 1'
                    var Damage_num=0;       // 光暗系牌计数
                    var Damage_num_max=2;   // 最大增伤
                    var cards=player.getExpansions('xuanWen');
                    if(player.isHengZhi())
                    {
                        for(var i=0;i<cards.length;i++){
                            if(Damage_num < Damage_num_max){
                                Damage_num++;
                            }
                        };
                    }
                    else {
                        for(var i=0;i<cards.length;i++){
                            if((get.xiBie(cards[i])=='an'||get.xiBie(cards[i])=='guang')&&(Damage_num < Damage_num_max)){
                                Damage_num++;
                            }
                        };
                    }
                    'step 2'

                    trigger.target.faShuDamage(Damage_num,player );
                },
                        "_priority": 0,
                    },
                    "bianShenBeiYaNa": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event,player){
                    if(player.isHengZhi()) return false;
                    var cards=player.getExpansions('xuanWen');
                    if(cards.length<2) return false;
                    return player.canBiShaShuiJing();
                },
                        "content": function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.hengZhi();
                    'step 1'
                    var cards=player.getExpansions('xuanWen');
                    player.discard(cards[0],'xuanWen');
                    player.discard(cards[1],'xuanWen');
                },
                        "check": function(event,player){
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    if(!game.hasPlayer(function(target) {
                        return target.side != player.side;
                    })) return false;
                    return player.countCards('h', function(card) {
                        return get.type(card, player) == 'faShu';
                    }) > 0;
                },
                        "group": [
                            "bianShenBeiYaNa_chongZhi",
                            "bianShenBeiYaNa_zhuanHuan",
                        ],
                        "subSkill": {
                            "zhuanHuan": {
                                "enable": [
                                    "gongJi",
                                    "yingZhan",
                                ],
                                "filter": function(event,player){
                            //是否横置
                            if(!player.isHengZhi())return false;

                            var event=event||_status.event;
                            if(event.name=='yingZhan'){
                                if(event.canYingZhan==false) return false;
                                var cards=player.getCards('h');
                                for(var i=0;i<cards.length;i++){
                                    var card=cards[i];
                                    if(card.name!='shengGuang'&&get.type(card)=='faShu'){
                                        if(get.xiBie(card)==get.xiBie(event.card)) return true;
                                   }
                                }
                                return false;
                            }
                            return player.countCards('h',function(card){
                                return card.name!='shengGuang'&&get.type(card)=='faShu';
                            });
                        },
                                "filterCard": function(card,player,event){
                            if(card.name=='shengGuang'||get.type(card)!='faShu') return false;
                            var event=event||_status.event;
                            if(event.name=='yingZhan'){
                                return get.xiBie(card)==get.xiBie(event.card);
                            }
                        return card.name!='shengGuang'&&get.type(card)=='faShu';
                        },
                                "position": "h",
                                "viewAs": function(cards,player){
                            if(cards.length==0) return;
                            var xiBie=get.xiBie(cards[0]);
                            var name;
                            switch(xiBie){
                                case 'shui':
                                    name='shuiLianZhan';
                                    break;
                                case 'huo':
                                    name='huoYanZhan';
                                    break;
                                case 'feng':
                                    name='fengShenZhan';
                                    break;
                                case 'lei':
                                    name='leiGuangZhan';
                                    break;
                                case 'di':
                                    name='diLieZhan';
                                    break;
                                case 'an':
                                    name='anMie';
                                    break;
                            }
                            var dict={name:name,xiBie:xiBie};
                            return dict;
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "player": 1,
                                    },
                                },
                                "sub": true,
                                "sourceSkill": "bianShenBeiYaNa",
                                "_priority": 0,
                            },
                            "chongZhi": {
                                "trigger": {
                                    "global": "changeShiQiEnd",
                                },
                                "direct": true,
                                "filter": function(event,player){
                            if (event.num >= 0) return false;
                            if (event.side != player.side) return false;
                            return player.isHengZhi();
                        },
                                "content": function(){
                            'step 0'
                            player.chongZhi();
                            player.changeZhiLiao(1);
                        },
                                "sub": true,
                                "sourceSkill": "bianShenBeiYaNa",
                                "_priority": 0,
                            },
                        },
                        "mod": {
                            "cardEnabled": function(card, player) {
                        if(player.isHengZhi() && get.type(card, player) == 'faShu') {
                            return false;
                        }
                    },
                        },
                        "_priority": 0,
                    },
                    "xuanWenQiangYa": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    var cards=player.getExpansions('xuanWen');
                    if(cards.length<2) return false;
                    if(player.isHengZhi()) return false;
                    return player.canBiShaBaoShi();
                },
                        "contentBefore": async function(event, trigger, player){
                    await player.removeBiShaBaoShi();
                    player.storage.xuanWenQiangYa_cards =
                        player.getExpansions('xuanWen').slice();
                    player.storage.xuanWenQiangYa_damage = Math.ceil(
                        player.storage.xuanWenQiangYa_cards.length / 2
                    );
                },
                        "content": function(){
                    'step 0'
                    // 获取所有敌方目标
                    event.targets=game.filterPlayer(function(current){
                        return current.side!=player.side;
                    });
                    event.targets.sortBySeat(player);       // 按座位排序
                    'step 1'
                    var target=event.targets.shift();   // 取出第一个目标

                    target.faShuDamage(
                        player.storage.xuanWenQiangYa_damage,
                        player
                    );
                    if(event.targets.length>0){
                        event.redo();       // 还有目标就重复执行
                    }
                },
                        "contentAfter": async function(event, trigger, player){
                    var snapshot = player.storage.xuanWenQiangYa_cards || [];
                    var cards = player.getExpansions('xuanWen').filter(
                        function(card) {
                            return snapshot.includes(card);
                        }
                    );
                    if(cards.length) await player.discard(cards,'xuanWen');
                    delete player.storage.xuanWenQiangYa_cards;
                    delete player.storage.xuanWenQiangYa_damage;
                },
                        "ai": {
                            "baoShi": true,
                            "order": function(item, player) {
                    var cards = player.getExpansions('xuanWen');
                    if(cards.length < 2) return 0;
                    var damage = Math.ceil(cards.length / 2);
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target.side != player.side) {
                            score += get.damageEffect2(
                                target, player, damage
                            );
                        }
                    });
                    return score > 0 ? 3.7 : 0;
                },
                            "result": {
                                "player": function(player) {
                    var damage = Math.ceil(
                        player.getExpansions('xuanWen').length / 2
                    );
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target.side != player.side) {
                            score += get.damageEffect2(
                                target, player, damage
                            );
                        }
                    });
                    return score;
                        },
                            },
                        },
                        "_priority": 0,
                    },
                    "xuanWen": {
                        "intro": {
                            "name": "炫纹",
                            "markcount": "expansion",
                            "mark": function(dialog,storage,player){
                        var cards=player.getExpansions('xuanWen');
                        if(player.isUnderControl(true)) dialog.addAuto(cards);
                        else return '共有'+cards.length+'张牌';
                    },
                            "show": true,
                        },
                        "onremove": function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                        "_priority": 0,
                    },
                    "nianQiHuanRao": {
                        "trigger": {
                            "player": "faShuEnd",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !player.hasSkill('nianZhiAoYi_effect') &&
                        !player.isZhiShiWuMax('nianQi');
                },
                        "content": async function(event, trigger, player) {
                    await lib.skill.nianQi.addNianQi(player, 1);
                },
                    },
                    "lieRiGuangHui": {
                        "trigger": {
                            "player": "teShuEnd",
                            "source": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event, player, name) {
                    if(player.countZhiShiWu('nianQi') < 1) return false;
                    if(name == 'gongJiMingZhong') {
                        return !!event && get.is.zhuDongGongJi(event);
                    }
                    return name == 'teShuEnd';
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('nianQi', 1);
                },
                    },
                    "guangZhiQinHe": {
                        "mod": {
                            "maxZhiLiao": function(player, num) {
                        return num + 1;
                    },
                            "targetEnabled": function(card, source, target) {
                        if(game.jiChuXiaoGuo.all.includes(get.name(card))) {
                            return false;
                        }
                    },
                        },
                    },
                    "nianQiBo": {
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                    return lib.filter.cardDiscardable(card, player) &&
                        (get.type(card) == 'faShu' || get.mingGe(card) == 'yong');
                },
                        "filter": function(event, player) {
                    if(!game.hasPlayer(function(current) {
                        return current != player;
                    })) return false;
                    return player.countCards('h', function(card) {
                        return lib.filter.cardDiscardable(card, player) &&
                            (get.type(card) == 'faShu' || get.mingGe(card) == 'yong');
                    }) > 0;
                },
                        "filterTarget": function(card, player, target) {
                    return target != player;
                },
                        "content": async function(event, trigger, player) {
                    var target = event.target;
                    await player.faShuDamage(2, player);
                    if(target && target.isIn()) {
                        await target.faShuDamage(2, player);
                    }
                    if(player.isIn()) {
                        await lib.skill.nianQi.addNianQi(player, 1);
                    }
                },
                        "ai": {
                            "order": 3.5,
                            "result": {
                                "player": function(player) {
                            return get.damageEffect2(player, player, 2) + 1;
                        },
                                "target": function(player, target) {
                            return get.damageEffect(target, 2);
                        },
                            },
                        },
                    },
                    "luanWuQianYeHua": {
                        "trigger": {
                            "player": "chengShouShangHaiAfter",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !!event.source &&
                        event.source != player;
                },
                        "cost": async function(event, trigger, player) {
                    var controls = [];
                    if(player.countZhiShiWu('nianQi') > 0) {
                        controls.push('移除1【念气】，+1【治疗】');
                    }
                    controls.push('摸1张牌，然后+2【念气】');
                    controls.push('cancel2');
                    var control = await player.chooseControl(controls)
                        .set('prompt', '是否发动【乱舞·千叶花】？')
                        .set('ai', function() {
                            var player = _status.event.player;
                            if(player.countZhiShiWu('nianQi') > 0 &&
                                player.zhiLiao < player.getZhiLiaoLimit()) {
                                return '移除1【念气】，+1【治疗】';
                            }
                            if(player.countCards('h') + 1 <=
                                player.getHandcardLimit()) {
                                return '摸1张牌，然后+2【念气】';
                            }
                            return 'cancel2';
                        })
                        .forResultControl();
                    event.result = {
                        bool: !!control && control != 'cancel2',
                        cost_data: control,
                    };
                },
                        "content": async function(event, trigger, player) {
                    if(event.cost_data == '移除1【念气】，+1【治疗】') {
                        await player.removeZhiShiWu('nianQi', 1);
                        await player.changeZhiLiao(1, player);
                    } else if(event.cost_data == '摸1张牌，然后+2【念气】') {
                        await player.draw(1);
                        await lib.skill.nianQi.addNianQi(player, 2);
                    }
                },
                    },
                    "nianQiZhao": {
                        "type": "faShu",
                        "enable": "faShu",
                        "isSafeForAi": function(player) {
                    var canPay = player.countZhiShiWu('nianQi') >= 2 ||
                        player.countCards('h') + 2 <=
                            player.getHandcardLimit();
                    if(!canPay) return false;
                    return game.hasPlayer(function(target) {
                        return target.side == player.side &&
                            target.countCards('he', function(card) {
                                return lib.filter.cardDiscardable(
                                    card,
                                    target
                                );
                            }) > 0 &&
                            get.zhiLiaoEffect(target, 2) > 0;
                    });
                },
                        "filter": function(event, player) {
                    return game.hasPlayer(function(current) {
                        return current.side == player.side &&
                            current.countCards('he', function(card) {
                                return lib.filter.cardDiscardable(
                                    card,
                                    current
                                );
                            }) > 0;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side == player.side &&
                        target.countCards('he', function(current) {
                            return lib.filter.cardDiscardable(
                                current,
                                target
                            );
                        }) > 0;
                },
                        "content": async function(event, trigger, player) {
                    var selectedTarget = event.target;
                    var controls = ['摸2张牌'];
                    if(player.countZhiShiWu('nianQi') >= 2) {
                        controls.unshift('移除2【念气】');
                    }
                    var control = await player.chooseControl(controls)
                        .set('prompt', '念气罩：选择一项')
                        .set('ai', function() {
                            var player = _status.event.player;
                            if(player.countZhiShiWu('nianQi') >= 2 &&
                                player.countCards('h') + 2 > player.getHandcardLimit()) {
                                return '移除2【念气】';
                            }
                            return '摸2张牌';
                        })
                        .forResultControl();
                    if(control == '移除2【念气】') {
                        await player.removeZhiShiWu('nianQi', 2);
                    } else {
                        await player.draw(2);
                    }

                    if(selectedTarget && selectedTarget.isIn()) {
                        await selectedTarget.changeZhiLiao(2, player);
                    }
                    if(selectedTarget && selectedTarget.isIn() &&
                        selectedTarget.countCards('he', function(card) {
                            return lib.filter.cardDiscardable(card, selectedTarget);
                        }) > 0) {
                        await selectedTarget.chooseToDiscard(
                            'he',
                            1,
                            true,
                            '念气罩：弃置1张牌'
                        );
                    }
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.nianQiZhao
                            .isSafeForAi(player) ? 3.6 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.nianQiZhao
                                .isSafeForAi(player) ? 0 : -100;
                        },
                                "target": function(player, target) {
                            return get.zhiLiaoEffect(target, 2);
                        },
                            },
                        },
                    },
                    "nianZhiAoYi": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() &&
                        !player.hasSkill('nianZhiAoYi_effect');
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    if(player.zhiLiao > 0) {
                        await player.changeZhiLiao(-player.zhiLiao, player);
                    }
                    var drawNum = Math.max(
                        0,
                        player.getHandcardLimit() - player.countCards('h')
                    );
                    if(drawNum > 0) {
                        await player.draw(drawNum);
                    }
                    await player.hengZhi();
                    player.addSkill('nianZhiAoYi_effect');
                    player.addSkill('nianZhiAoYi_shiQi');
                },
                        "check": function(event, player) {
                    if(player.countZhiShiWu('nianQi') < 1 ||
                        !player.canFaShu()) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return true;
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "qianLianNuFang": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing() &&
                        player.countZhiShiWu('nianQi') >= 3 &&
                        player.countCards('h', function(card) {
                            return lib.filter.cardDiscardable(card, player);
                        }) > 0;
                },
                        "content": async function(event, trigger, player) {
                    var qiCount = player.countZhiShiWu('nianQi');
                    var qiChoices = [];
                    for(var i = 3; i <= qiCount; i++) {
                        qiChoices.push(String(i));
                    }
                    var recommended = String(Math.min(6, qiCount));
                    var qiControl = await player.chooseControl(qiChoices)
                        .set('prompt', '千莲怒放：选择移除的【念气】数量')
                        .set('choice', recommended)
                        .set('ai', function() {
                            return _status.event.choice;
                        })
                        .forResultControl();
                    var qiNum = parseInt(qiControl);
                    if(!qiNum || qiNum < 3) return;

                    var handcards = player.getCards('h').filter(function(card) {
                        return lib.filter.cardDiscardable(card, player);
                    });
                    var xiBieCount = {};
                    handcards.forEach(function(card) {
                        var xiBie = get.xiBie(card);
                        xiBieCount[xiBie] = (xiBieCount[xiBie] || 0) + 1;
                    });
                    var maxCards = Math.max.apply(null, Object.values(xiBieCount));
                    var cards = await player.chooseCard(
                        'h',
                        [1, maxCards],
                        '千莲怒放：弃置至少1张彼此同系的牌【展示】',
                        true
                    ).set('filterCard', function(card, player) {
                        if(!lib.filter.cardDiscardable(card, player)) return false;
                        if(!ui.selected.cards.length) return true;
                        return get.xiBie(card) == get.xiBie(ui.selected.cards[0]);
                    }).set('complexCard', true)
                        .set('ai', function(card) {
                            return 6 - get.value(card);
                        })
                        .forResultCards();
                    if(!cards.length) return;

                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu('nianQi', qiNum);
                    await player.discard(cards).set('showCards', true);

                    var targets = game.filterPlayer(function(current) {
                        return current != player;
                    }).sortBySeat(player);
                    var selfDamage = Math.min(4, qiNum + cards.length);
                    var otherDamage = Math.min(4, qiNum - 2);
                    await player.faShuDamage(selfDamage, player);
                    for(var target of targets) {
                        if(target.isIn()) {
                            await target.faShuDamage(otherDamage, player);
                        }
                    }

                    if(player.isIn() && player.countZhiShiWu('nianQi') >= 3) {
                        var addGem = await player.chooseBool(
                            '是否额外移除3【念气】，+1【宝石】？'
                        ).set('ai', function() {
                            var player = _status.event.player;
                            var qi = player.countZhiShiWu('nianQi');
                            var gems = player.countNengLiang('baoShi');
                            var enemyMorale = get.shiQi(!player.side);
                            // 没有宝石时优先完成资源转换；已有宝石时保留
                            // 足够发动技能/维持行动链的念气，除非已接近斩杀。
                            return gems == 0 || qi >= 5 || enemyMorale <= 2;
                        }).forResultBool();
                        if(addGem) {
                            await player.removeZhiShiWu('nianQi', 3);
                            await player.addNengLiang('baoShi', 1);
                        }
                    }
                },
                        "ai": {
                            "shuiJing": true,
                            "order": 3.9,
                            "result": {
                                "player": function(player) {
                            return game.countPlayer(function(current) {
                                return current != player &&
                                    get.damageEffect2(current, player, 2) > 0;
                            }) - 2;
                        },
                            },
                        },
                    },
                    "nianQi": {
                        "intro": {
                            "name": "念气",
                            "content": "mark",
                            "max": 8,
                        },
                        "onremove": "storage",
                        "markimage": "extension/创世纪/mark_nianQi.png",
                        "addNianQi": async function(player, num) {
                    if(!player ||
                        player.hasSkill('nianZhiAoYi_effect')) return;
                    if(typeof num != 'number') num = 1;
                    if(num <= 0) return;
                    await player.addZhiShiWu('nianQi', num);
                },
                    },
                    "faMiLiErShiYanShi": {
                        "trigger": {
                            "global": "gameStart",
                            "player": "teShuEnd",
                        },
                        "forced": true,
                        "priority": 10,
                        "content": async function(event, trigger, player) {
                    if(event.triggername == 'gameStart') {
                        for(var i = 0; i < 2; i++) {
                            await lib.skill.shiYanCaiLiao.addTopMaterial(
                                player
                            );
                        }
                    } else {
                        await lib.skill.shiYanCaiLiao.addTopMaterial(
                            player,
                            '法米利尔实验室：选择1张已有【实验材料】进行更换（取消则不更换）'
                        );
                    }
                },
                    },
                    "luMiYaShiYan": {
                        "run": async function(player, material, sourceEvent, requiredSuits) {
                    if(!player || !material || !sourceEvent) return null;
                    await player.showHiddenCards(
                        [material],
                        '移除【实验材料】'
                    );
                    await player.lose([material], ui.ordering);
                    var cards = get.cards(1);
                    var judgeCard = cards && cards[0];
                    if(!judgeCard) {
                        await game.cardsDiscard([material]);
                        return null;
                    }
                    await player.showCards(
                        [judgeCard],
                        '实验判定'
                    );
                    var result;
                    requiredSuits = Array.isArray(requiredSuits) ?
                        requiredSuits : [get.xiBie(material)];
                    if(requiredSuits.includes(get.xiBie(judgeCard))) {
                        result = '大成功';
                    } else if(get.type(judgeCard) == 'faShu') {
                        result = '成功';
                    } else {
                        result = '失败';
                    }
                    sourceEvent.luMiYaShiYanResult = result;
                    sourceEvent.luMiYaShiYanInitialResult = result;
                    sourceEvent.luMiYaBangBangTangUsed = false;
                    sourceEvent.luMiYaShiYanMaterial = material;
                    sourceEvent.luMiYaShiYanJudgeCard = judgeCard;
                    sourceEvent.luMiYaShiYanRequiredSuits =
                        requiredSuits.slice(0);
                    game.log(
                        player,
                        '的实验初始结果为',
                        '#y' + result
                    );
                    await sourceEvent.trigger('luMiYaShiYanPanDing');
                    return {
                        result: sourceEvent.luMiYaShiYanResult,
                        initialResult:
                            sourceEvent.luMiYaShiYanInitialResult,
                        material: material,
                        judgeCard: judgeCard,
                    };
                },
                        "finish": async function(player, experiment) {
                    if(!experiment) return;
                    if(experiment.result == '失败' &&
                        !player.isZhiShiWuMax('luMiYaYanJiu')) {
                        await player.addZhiShiWu(
                            'luMiYaYanJiu',
                            1
                        );
                    }
                    var discardCards = [];
                    var material = experiment.material;
                    if(material &&
                        get.position(material, true) != 'd') {
                        discardCards.push(material);
                    }
                    var judgeCard = experiment.judgeCard;
                    if(judgeCard &&
                        get.position(judgeCard, true) != 'd') {
                        discardCards.push(judgeCard);
                    }
                    if(discardCards.length) {
                        await game.cardsDiscard(discardCards);
                    }
                },
                    },
                    "xingYunBangBangTang": {
                        "trigger": {
                            "player": "luMiYaShiYanPanDing",
                        },
                        "filter": function(event, player) {
                    if(!event ||
                        event.luMiYaBangBangTangUsed === true) {
                        return false;
                    }
                    if(event.luMiYaShiYanResult == '失败') {
                        return player.countZhiShiWu('luMiYaYanJiu') >= 1;
                    }
                    if(event.luMiYaShiYanResult == '成功') {
                        return player.countZhiShiWu('luMiYaYanJiu') >= 2;
                    }
                    return false;
                },
                        "cost": async function(event, trigger, player) {
                    var need =
                        trigger.luMiYaShiYanResult == '失败' ? 1 : 2;
                    var next =
                        trigger.luMiYaShiYanResult == '失败' ?
                            '成功' : '大成功';
                    event.result = await player.chooseBool(
                        '是否移除' + need +
                        '【研究】，将本次实验结果改为【' +
                        next + '】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var result = trigger.luMiYaShiYanResult;
                        var research = player.countZhiShiWu(
                            'luMiYaYanJiu'
                        );
                        if(result == '失败') {
                            // 失败通常带来负面结果；研究已满时更应立即使用，
                            // 避免实验结束时新增研究溢出。
                            return research >= 3 ||
                                player.countCards('h') >=
                                    player.getHandcardLimit() ||
                                trigger.name != 'suanYuYun';
                        }
                        if(result != '成功') return false;
                        if(research >= 3) return true;
                        if(trigger.name == 'xuanZhuanSaoBa') {
                            return game.countPlayer(function(current) {
                                return current.side != player.side &&
                                    current != trigger.target;
                            }) >= 2;
                        }
                        if(trigger.name == 'suanYuYun') {
                            return game.countPlayer(function(current) {
                                return current.side != player.side &&
                                    current.countCards('he') > 0;
                            }) >= 2;
                        }
                        if(trigger.name == 'dianManPengZhuangJi') {
                            return player.countCards('h', function(card) {
                                return get.type(card, player) == 'faShu';
                            }) > 0 && game.hasPlayer(function(current) {
                                return current.side != player.side;
                            });
                        }
                        if(trigger.name == 'fanZhongLiZhuangZhi') {
                            return game.hasPlayer(function(current) {
                                return current.side != player.side &&
                                    !current.hasJiChuXiaoGuo('_xuRuo');
                            });
                        }
                        // 熔岩药瓶从2点提升到3点时，仅在确有合适敌方
                        // 伤害目标时消耗两点研究。
                        if(trigger.name == 'rongYanYaoPing') {
                            return game.hasPlayer(function(current) {
                                return current.side != player.side &&
                                    get.damageEffect2(
                                        current,
                                        player,
                                        3
                                    ) > 0;
                            });
                        }
                        return false;
                    }).forResult();
                    event.result.cost_data = {
                        need: need,
                        result: next,
                    };
                },
                        "content": async function(event, trigger, player) {
                    var data = event.cost_data;
                    if(!data ||
                        trigger.luMiYaBangBangTangUsed === true ||
                        player.countZhiShiWu('luMiYaYanJiu') <
                            data.need) {
                        return;
                    }
                    await player.removeZhiShiWu(
                        'luMiYaYanJiu',
                        data.need
                    );
                    trigger.luMiYaShiYanResult = data.result;
                    trigger.luMiYaBangBangTangUsed = true;
                    game.log(
                        player,
                        '将实验结果改为',
                        '#y' + data.result
                    );
                },
                    },
                    "gaiLiangMoFaXingDan": {
                        "trigger": {
                            "source": "chengShouShangHaiAfter",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !!event.card &&
                        get.name(event.card) == 'moDan';
                },
                        "cost": async function(event, trigger, player) {
                    var control = await player.chooseControl(
                        ['我方全体+1【治疗】', '所有对手受到1点法术伤害', '取消']
                    ).set('prompt', '改良魔法星弹：选择一项')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var needHeal = game.countPlayer(
                                function(current) {
                                    return current.side == player.side &&
                                        current.zhiLiao <
                                            current.getZhiLiaoLimit();
                                }
                            );
                            return needHeal >= 2 ?
                                '我方全体+1【治疗】' :
                                '所有对手受到1点法术伤害';
                        }).forResultControl();
                    event.result = {
                        bool: control != '取消',
                        cost_data: control,
                    };
                },
                        "content": async function(event, trigger, player) {
                    if(event.cost_data == '我方全体+1【治疗】') {
                        var allies = game.filterPlayer(function(current) {
                            return current.side == player.side;
                        }).sortBySeat(player);
                        for(var ally of allies) {
                            if(ally.isIn()) {
                                await ally.changeZhiLiao(1, player);
                            }
                        }
                    } else {
                        var opponents = game.filterPlayer(
                            function(current) {
                                return current.side != player.side;
                            }
                        ).sortBySeat(player);
                        for(var target of opponents) {
                            if(target.isIn()) {
                                await target.faShuDamage(
                                    1,
                                    player,
                                    'nocard'
                                );
                            }
                        }
                    }
                },
                    },
                    "saoBaZhangWo": {
                        "trigger": {
                            "player": "teShuEnd",
                        },
                        "forced": true,
                        "priority": 0,
                        "content": function(event, trigger, player) {
                    if(!Array.isArray(player.storage.extraXingDong)) {
                        player.storage.extraXingDong = [];
                    }
                    player.storage.extraXingDong.push({
                        xingDong: 'gongJi',
                        luMiYaSaoBaZhangWo: true,
                    });
                },
                        "group": [
                            "saoBaZhangWo_jianShang",
                            "saoBaZhangWo_huiShou",
                        ],
                        "subSkill": {
                            "jianShang": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.yingZhan != true &&
                                event.luMiYaSaoBaZhangWo === true;
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(-1);
                        },
                            },
                            "huiShou": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "filter": function(event, player) {
                            if(!event ||
                                event.yingZhan == true ||
                                event.luMiYaSaoBaZhangWo !== true ||
                                !!event.target ||
                                !Array.isArray(event.cards)) {
                                return false;
                            }
                            return event.cards.some(function(card) {
                                return get.position(card, true) == 'd';
                            });
                        },
                                "content": async function(event, trigger, player) {
                            var card = trigger.cards.find(function(current) {
                                return get.position(current, true) == 'd';
                            });
                            if(!card) return;
                            await lib.skill.shiYanCaiLiao.addMaterial(
                                player,
                                card,
                                '扫把掌握：选择1张已有【实验材料】进行更换（取消则不收取攻击牌）'
                            );
                        },
                            },
                        },
                    },
                    "xuanZhuanSaoBa": {
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        !!event.target &&
                        lib.skill.shiYanCaiLiao.getMatching(
                            player,
                            ['feng']
                        ).length > 0;
                },
                        "cost": async function(event, trigger, player) {
                    var material =
                        await lib.skill.shiYanCaiLiao.chooseMatching(
                            player,
                            ['feng'],
                            '旋转扫把：选择1张风系【实验材料】',
                            false,
                            Math.max(0, trigger.damageNum || 0) > 0 &&
                                game.hasPlayer(function(current) {
                                    return current.side != player.side &&
                                        current != trigger.target;
                                })
                        );
                    event.result = {
                        bool: !!material,
                        cards: material ? [material] : [],
                        cost_data: Math.max(
                            0,
                            typeof trigger.damageNum == 'number' ?
                                trigger.damageNum : 0
                        ),
                    };
                },
                        "content": async function(event, trigger, player) {
                    var material = event.cards && event.cards[0];
                    if(!material) return;
                    var amount = Math.max(0, event.cost_data || 0);
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['feng']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        if(amount > 0) {
                            await player.damage(
                                amount,
                                player,
                                'nocard'
                            );
                        }
                    } else {
                        var max = experiment.result == '大成功' ? 2 : 1;
                        var targets = await player.chooseTarget(
                            [0, max],
                            '旋转扫把：指定至多' + max +
                                '名其他目标对手',
                            function(card, player, target) {
                                var attack =
                                    _status.event.getTrigger();
                                return target.side != player.side &&
                                    target != attack.target;
                            }
                        ).set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                _status.event.amount
                            );
                        }).set('amount', amount).forResultTargets();
                        for(var target of targets.sortBySeat(player)) {
                            if(amount > 0 && target.isIn()) {
                                await target.damage(
                                    amount,
                                    player,
                                    'nocard'
                                );
                            }
                        }
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                    },
                    "rongYanYaoPing": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return lib.skill.shiYanCaiLiao.getMatching(
                        player,
                        ['huo', 'di']
                    ).length > 0;
                },
                        "content": async function(event, trigger, player) {
                    var material =
                        await lib.skill.shiYanCaiLiao.chooseMatching(
                            player,
                            ['huo', 'di'],
                            '熔岩药瓶：选择1张火系或地系【实验材料】',
                            true
                        );
                    if(!material) return;
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['huo', 'di']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        await player.faShuDamage(
                            1,
                            player,
                            'nocard'
                        );
                    } else {
                        var damage =
                            experiment.result == '大成功' ? 3 : 2;
                        var targets = await player.chooseTarget(
                            true,
                            '熔岩药瓶：指定任意一名角色',
                            function() {
                                return true;
                            }
                        ).set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                _status.event.damage
                            );
                        }).set('damage', damage).forResultTargets();
                        if(targets[0] && targets[0].isIn()) {
                            await targets[0].faShuDamage(
                                damage,
                                player,
                                'nocard'
                            );
                        }
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                        "ai": {
                            "order": 3.6,
                            "result": {
                                "player": 1,
                            },
                        },
                    },
                    "suanYuYun": {
                        "type": "faShu",
                        "enable": "faShu",
                        "isSafeForAi": function(player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "filter": function(event, player) {
                    return lib.skill.shiYanCaiLiao.getMatching(
                        player,
                        ['shui']
                    ).length > 0;
                },
                        "content": async function(event, trigger, player) {
                    var material =
                        await lib.skill.shiYanCaiLiao.chooseMatching(
                            player,
                            ['shui'],
                            '酸雨云：选择1张水系【实验材料】',
                            true
                        );
                    if(!material) return;
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['shui']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        await player.draw(1);
                    } else {
                        var max = experiment.result == '大成功' ? 2 : 1;
                        var candidates = game.filterPlayer(
                            function(current) {
                                return current.countCards(
                                        'he',
                                        function(card) {
                                            return lib.filter
                                                .cardDiscardable(
                                                    card,
                                                    current
                                                );
                                        }
                                    ) > 0;
                            }
                        );
                        if(candidates.length) {
                            var range = max == 1 ? 1 : [0, 2];
                            var targets = await player.chooseTarget(
                                range,
                                max == 1,
                                '酸雨云：指定' +
                                    (max == 1 ? '1' : '至多2') +
                                    '名有可弃置牌的角色',
                                function(card, player, target) {
                                    return target.countCards(
                                            'he',
                                            function(current) {
                                                return lib.filter
                                                    .cardDiscardable(
                                                        current,
                                                        target
                                                    );
                                            }
                                        ) > 0;
                                }
                            ).set('ai', function(target) {
                                return -get.attitude(
                                    _status.event.player,
                                    target
                                );
                            }).forResultTargets();
                            for(var target of targets.sortBySeat(player)) {
                                var canDiscard = target.isIn() &&
                                    target.countCards(
                                        'he',
                                        function(card) {
                                            return lib.filter
                                                .cardDiscardable(
                                                    card,
                                                    target
                                                );
                                        }
                                    ) > 0;
                                if(canDiscard) {
                                    await target.chooseToDiscard(
                                        'he',
                                        1,
                                        true,
                                        '酸雨云：弃置1张牌'
                                    );
                                }
                            }
                        }
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.suanYuYun
                            .isSafeForAi(player) ? 3.4 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.suanYuYun
                                .isSafeForAi(player) ? 1 : -100;
                        },
                            },
                        },
                    },
                    "dianManPengZhuangJi": {
                        "trigger": {
                            "player": "faShuEnd",
                        },
                        "filter": function(event, player) {
                    return lib.skill.shiYanCaiLiao.getMatching(
                        player,
                        ['lei', 'guang']
                    ).length > 0;
                },
                        "cost": async function(event, trigger, player) {
                    var hasFollowUp = player.countCards(
                        'h',
                        function(card) {
                            var type = get.type(card, player);
                            return type == 'gongJi' || type == 'faShu';
                        }
                    ) > 0 && game.hasPlayer(function(current) {
                        return current.side != player.side;
                    });
                    var safeFailure = player.countCards('h') + 1 <=
                        player.getHandcardLimit() ||
                        player.countZhiShiWu('luMiYaYanJiu') >= 1;
                    var material =
                        await lib.skill.shiYanCaiLiao.chooseMatching(
                            player,
                            ['lei', 'guang'],
                            '电鳗碰撞机：选择1张雷系或光系【实验材料】',
                            false,
                            hasFollowUp && safeFailure
                        );
                    event.result = {
                        bool: !!material,
                        cards: material ? [material] : [],
                    };
                },
                        "content": async function(event, trigger, player) {
                    var material = event.cards && event.cards[0];
                    if(!material) return;
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['lei', 'guang']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        await player.draw(1);
                    } else if(experiment.result == '成功') {
                        player.addGongJi();
                    } else {
                        player.addFaShu();
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                    },
                    "fanZhongLiZhuangZhi": {
                        "type": "faShu",
                        "enable": "faShu",
                        "isSafeForAi": function(player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "filter": function(event, player) {
                    return lib.skill.shiYanCaiLiao.getMatching(
                        player,
                        ['an']
                    ).length > 0;
                },
                        "content": async function(event, trigger, player) {
                    var material =
                        await lib.skill.shiYanCaiLiao.chooseMatching(
                            player,
                            ['an'],
                            '反重力装置：选择1张暗系【实验材料】',
                            true
                        );
                    if(!material) return;
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['an']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        await player.faShuDamage(
                            1,
                            player,
                            'nocard'
                        );
                        await player.draw(1);
                    } else if(experiment.result == '成功') {
                        var canUse = game.hasPlayer(function(current) {
                            return !current.hasJiChuXiaoGuo('_xuRuo');
                        });
                        if(canUse) {
                            var targets = await player.chooseTarget(
                                true,
                                '反重力装置：指定任意一名没有【虚弱】的角色',
                                function(card, player, target) {
                                    return !target.hasJiChuXiaoGuo(
                                        '_xuRuo'
                                    );
                                }
                            ).set('ai', function(target) {
                                return -get.attitude(
                                    _status.event.player,
                                    target
                                );
                            }).forResultTargets();
                            if(targets[0] && targets[0].isIn()) {
                                await player.useCard(
                                    game.createCard2('xuRuo'),
                                    targets[0]
                                );
                            }
                        }
                    } else {
                        var targets = await player.chooseTarget(
                            true,
                            '反重力装置：指定任意一名角色摸3张牌',
                            function() {
                                return true;
                            }
                        ).set('ai', function(target) {
                            var player = _status.event.player;
                            if(target == player &&
                                target.countCards('h') + 3 >
                                    target.getHandcardLimit()) {
                                return -100;
                            }
                            return get.attitude(
                                player,
                                target
                            );
                        }).forResultTargets();
                        if(targets[0] && targets[0].isIn()) {
                            await targets[0].draw(3);
                        }
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.fanZhongLiZhuangZhi
                            .isSafeForAi(player) ? 3.3 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.fanZhongLiZhuangZhi
                                .isSafeForAi(player) ? 1 : -100;
                        },
                            },
                        },
                    },
                    "jiYiRongHe": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing();
                },
                        "content": async function(event, trigger, player) {
                    var beforeBaoShi =
                        player.countNengLiang('baoShi');
                    await player.removeBiShaShuiJing();
                    var usedBaoShi =
                        player.countNengLiang('baoShi') < beforeBaoShi;
                    var targets = game.filterPlayer(function(current) {
                        return current.side == player.side;
                    }).sortBySeat(player);
                    for(var target of targets) {
                        if(!target.isIn() ||
                            target.countCards('h') == 0) {
                            continue;
                        }
                        var result = await target.chooseToDiscard(
                            'h',
                            1,
                            true,
                            '技艺融合：弃置1张手牌'
                        ).forResult();
                        if(!result.bool ||
                            !result.cards ||
                            !result.cards.length) {
                            continue;
                        }
                        var card = result.cards && result.cards[0];
                        if(!card ||
                            get.position(card, true) != 'd') {
                            continue;
                        }
                        var links = await player.chooseCardButton(
                            [card],
                            1,
                            '是否将' + get.translation(target) +
                            '弃置的' + get.translation(card) +
                            '作为【实验材料】？'
                        ).set('ai', function(button) {
                            return 6 - get.value(button.link);
                        }).forResultLinks() || [];
                        var take = links.includes(card);
                        if(take &&
                            get.position(card, true) == 'd') {
                            await lib.skill.shiYanCaiLiao.addMaterial(
                                player,
                                card,
                                '技艺融合：选择1张已有【实验材料】进行更换（取消则不收取该牌）'
                            );
                        }
                    }
                    if(!player.isZhiShiWuMax('luMiYaYanJiu')) {
                        await player.addZhiShiWu(
                            'luMiYaYanJiu',
                            1
                        );
                    }
                    if(usedBaoShi) {
                        var count =
                            player.countZhiShiWu('luMiYaYanJiu');
                        if(count < 3) {
                            await player.addZhiShiWu(
                                'luMiYaYanJiu',
                                3 - count
                            );
                        }
                    }
                },
                        "check": function(event, player) {
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return game.countPlayer(function(current) {
                        return current.side == player.side &&
                            current.countCards('h') > 0;
                    }) >= 2;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "shiYanCaiLiao": {
                        "intro": {
                            "name": "实验材料",
                            "markcount": "gaiPai",
                            "content": "gaiPai",
                            "max": 3,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                        "makeRoom": async function(player, prompt) {
                    if(player.countGaiPai('shiYanCaiLiao') < 3) {
                        return true;
                    }
                    var cards = player.getGaiPai('shiYanCaiLiao');
                    var links = await player.chooseCardButton(
                        cards,
                        1,
                        prompt || '选择1张已有【实验材料】进行更换'
                    ).set('ai', function(button) {
                        return 6 - get.value(button.link);
                    }).forResultLinks() || [];
                    if(!links.length) return false;
                    await player.discard(
                        links,
                        'shiYanCaiLiao'
                    ).set('showHiddenCards', true);
                    return true;
                },
                        "addMaterial": async function(player, card, prompt) {
                    if(!player || !card) return false;
                    var canAdd = await lib.skill.shiYanCaiLiao.makeRoom(
                        player,
                        prompt
                    );
                    if(!canAdd) return false;
                    await player.addGaiPai(
                        [card],
                        player,
                        'shiYanCaiLiao'
                    );
                    return true;
                },
                        "addTopMaterial": async function(player, prompt) {
                    var canAdd = await lib.skill.shiYanCaiLiao.makeRoom(
                        player,
                        prompt
                    );
                    if(!canAdd) return false;
                    var cards = get.cards(1);
                    var card = cards && cards[0];
                    if(!card) return false;
                    await player.addGaiPai(
                        [card],
                        player,
                        'shiYanCaiLiao'
                    );
                    return true;
                },
                        "getMatching": function(player, xiBies) {
                    return player.getGaiPai('shiYanCaiLiao')
                        .filter(function(card) {
                            return xiBies.includes(get.xiBie(card));
                        });
                },
                        "chooseMatching": async function(
                    player,
                    xiBies,
                    prompt,
                    forced,
                    aiCanChoose
                ) {
                    var cards = lib.skill.shiYanCaiLiao.getMatching(
                        player,
                        xiBies
                    );
                    if(!cards.length) return null;
                    var choose = forced === true ?
                        player.chooseCardButton(
                            cards,
                            true,
                            1,
                            prompt
                        ) :
                        player.chooseCardButton(cards, 1, prompt);
                    var links = await choose.set('ai', function(button) {
                        if(_status.event.aiCanChoose === false) return 0;
                        return 6 - get.value(button.link);
                    }).set(
                        'aiCanChoose',
                        aiCanChoose !== false
                    ).forResultLinks() || [];
                    return links[0] || null;
                },
                    },
                    "luMiYaYanJiu": {
                        "charlotte": true,
                        "intro": {
                            "name": "研究",
                            "content": "mark",
                            "max": 3,
                        },
                        "markimage": "extension/创世纪/mark_luMiYaYanJiu.png",
                    },
                    "nianZhiAoYi_effect": {
                        "charlotte": true,
                        "trigger": {
                            "player": "faShuEnd",
                        },
                        "forced": true,
                        "priority": -1,
                        "filter": function(event, player) {
                    return player.countZhiShiWu('nianQi') >= 1;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('nianQi', 1);
                    player.addFaShu();
                },
                        "group": [
                            "nianZhiAoYi_effect_jinZhiNianQi",
                            "nianZhiAoYi_effect_reset",
                        ],
                        "subSkill": {
                            "jinZhiNianQi": {
                                "trigger": {
                                    "player": "changeZhiShiWuBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                            return event.zhiShiWu == 'nianQi' &&
                                event.num > 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.num = 0;
                        },
                            },
                            "reset": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "content": async function(event, trigger, player) {
                            if(player.isHengZhi()) {
                                await player.chongZhi();
                            }
                            player.removeSkill('nianZhiAoYi_effect');
                        },
                            },
                        },
                    },
                    "nianZhiAoYi_shiQi": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "奥",
                        "intro": {
                            "content": "直到你的下个回合开始前，对方士气最少为1【强制】。",
                        },
                        "group": [
                            "nianZhiAoYi_shiQi_baoHu",
                            "nianZhiAoYi_shiQi_qingChu",
                        ],
                        "subSkill": {
                            "baoHu": {
                                "trigger": {
                                    "global": "changeShiQiBefore",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!event ||
                                event.side == player.side ||
                                event.num >= 0) return false;
                            var current = get.shiQi(event.side);
                            return typeof current == 'number' &&
                                current + event.num < 1;
                        },
                                "content": function(event, trigger, player) {
                            var current = get.shiQi(trigger.side);
                            trigger.num = Math.min(0, 1 - current);
                            if(trigger.result) {
                                trigger.result.num = trigger.num;
                            }
                            game.log(
                                player,
                                '的【念之奥义】令对方士气最低为1'
                            );
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            player.removeSkill('nianZhiAoYi_shiQi');
                        },
                            },
                        },
                    },
                    "shouHuEnCi": {
                        "trigger": {
                            "player": "changeZhiLiaoAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.num < 0 &&
                        _status.currentPhase == player &&
                        event.shengLingZhiChui !== true;
                },
                        "content": async function(event, trigger, player) {
                    await player.addZhiShiWu(
                        'tianQiZheShenPan',
                        -trigger.num
                    );
                },
                        "mod": {
                            "maxZhiLiao": function(player, num) {
                        return num + 2;
                    },
                        },
                    },
                    "lingHunXiSheng": {
                        "trigger": {
                            "player": "changeShiQiEnd",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.player == player &&
                        event.side == player.side &&
                        event.num < 0 &&
                        event.cause == 'damage' &&
                        game.hasPlayer(function(target) {
                            return target != player &&
                                target.side == player.side;
                        });
                },
                        "cost": async function(event, trigger, player) {
                    var targets = await player.chooseTarget(
                        '是否发动【灵魂牺牲】，指定一名目标队友？',
                        function(card, player, target) {
                            return target != player &&
                                target.side == player.side;
                        }
                    ).set('ai', function(target) {
                        return get.attitude(
                            _status.event.player,
                            target
                        );
                    }).forResultTargets();
                    event.result = {
                        bool: targets.length > 0,
                        targets: targets,
                    };
                },
                        "content": async function(event, trigger, player) {
                    var control = await player.chooseControl([
                        '+1【治疗】',
                        '+1【审判】',
                    ]).set(
                        'prompt',
                        '【灵魂牺牲】：选择一项'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        if(player.countZhiLiao() <
                            player.getZhiLiaoLimit()) {
                            return '+1【治疗】';
                        }
                        return '+1【审判】';
                    }).forResultControl();
                    if(control == '+1【治疗】') {
                        await player.changeZhiLiao(1, player);
                    } else {
                        await player.addZhiShiWu(
                            'tianQiZheShenPan',
                            1
                        );
                    }
                    var target = event.targets[0];
                    if(target) {
                        await target.addNengLiang('shuiJing', 1);
                    }
                },
                    },
                    "guangZhiFuChou": {
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        event.player &&
                        event.target &&
                        event.target != player &&
                        event.target.side == player.side &&
                        player.countCards('h', function(card) {
                            return get.type(card) == 'faShu' &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player
                                );
                        }) > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseToDiscard(
                        'h',
                        1,
                        '是否展示并弃置1张法术牌，发动【光之复仇】？',
                        function(card, player) {
                            return get.type(card) == 'faShu' &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player
                                );
                        }
                    ).set('showCards', true).set('ai', function(card) {
                        return 6 - get.value(card);
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await trigger.player.faShuDamage(1, player);
                },
                    },
                    "shengLiZhiMao": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        event.target &&
                        player.hasSkill('shenPanXingTai') &&
                        player.countZhiShiWu(
                            'tianQiZheShenPan'
                        ) > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除1【审判】，发动【胜利之矛】？'
                    ).set('ai', function() {
                        var trigger = _status.event.getTrigger();
                        return !!trigger.target &&
                            Math.min(
                                3,
                                trigger.target.countZhiLiao()
                            ) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var bonus = Math.min(
                        3,
                        trigger.target.countZhiLiao()
                    );
                    trigger.customArgs = trigger.customArgs || {};
                    trigger.customArgs.shengLiZhiMao = {
                        playerid: player.playerid,
                        bonus: bonus,
                    };
                    await player.removeZhiShiWu(
                        'tianQiZheShenPan',
                        1
                    );
                },
                        "group": [
                            "shengLiZhiMao_mingZhong",
                            "shengLiZhiMao_weiMingZhong",
                        ],
                        "subSkill": {
                            "mingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            var data = event.customArgs &&
                                event.customArgs.shengLiZhiMao;
                            return !!data &&
                                data.playerid == player.playerid;
                        },
                                "content": function(event, trigger, player) {
                            var bonus =
                                trigger.customArgs.shengLiZhiMao
                                    .bonus || 0;
                            if(bonus > 0) {
                                trigger.changeDamageNum(bonus);
                            }
                        },
                            },
                            "weiMingZhong": {
                                "trigger": {
                                    "source": "gongJiWeiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            var data = event.customArgs &&
                                event.customArgs.shengLiZhiMao;
                            return !!data &&
                                data.playerid == player.playerid;
                        },
                                "content": async function(event, trigger, player) {
                            await player.faShuDamage(1, player);
                        },
                            },
                        },
                    },
                    "chanHuiZhiChui": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        event.target &&
                        player.hasSkill('shenPanXingTai') &&
                        player.countZhiShiWu(
                            'tianQiZheShenPan'
                        ) >= 3;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除3【审判】，发动【忏悔之锤】？'
                    ).set('ai', function() {
                        var trigger = _status.event.getTrigger();
                        return get.damageEffect2(
                            trigger.target,
                            _status.event.player,
                            2
                        ) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var target = trigger.target;
                    await player.removeZhiShiWu(
                        'tianQiZheShenPan',
                        3
                    );
                    await target.faShuDamage(2, player);
                    await player.changeZhiLiao(1, player);
                },
                    },
                    "tianQiZheZhuFu": {
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                    return get.name(card) != 'anMie' &&
                        get.mingGe(card) == 'sheng' &&
                        lib.filter.cardDiscardable(card, player);
                },
                        "check": function(card) {
                    return 7 - get.value(card);
                },
                        "filter": function(event, player) {
                    if(!player.countCards('h', function(card) {
                        return lib.skill.tianQiZheZhuFu.filterCard(
                            card,
                            player
                        );
                    })) return false;
                    if(!lib.skill.tianQiZheZhuFuManager
                        .getAvailableCards().length) return false;
                    return game.hasPlayer(function(target) {
                        return target != player &&
                            target.side == player.side;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target != player &&
                        target.side == player.side;
                },
                        "getAiBlessingScore": function(player, target, skill) {
                    if(!target || target == player ||
                        target.side != player.side) return -100;
                    var hand = target.countCards('h');
                    var handLimit = target.getHandcardLimit();
                    var healing = target.zhiLiao || 0;
                    var healingLimit = target.getZhiLiaoLimit();
                    var healingRoom = Math.max(0, healingLimit - healing);
                    if(skill == 'shouHuHuiZhang') {
                        // 防止攻击伤害也等于减少后续摸牌与爆牌压力。
                        return 2.2 + (healing == 0 ? 1.5 : 0) +
                            Math.max(0, hand - handLimit + 2) * 0.5;
                    }
                    if(skill == 'wuQiZhuFu') {
                        return 1.4 + Math.min(3, target.countCards(
                            'h',
                            function(card) {
                                return get.type(card, target) == 'gongJi';
                            }
                        )) * 0.7;
                    }
                    if(skill == 'rongYuZhuFu') {
                        // 治疗有空间时，荣誉祝福才有稳定的正向分支。
                        return 1.1 + healingRoom * 0.9 +
                            Math.max(0, handLimit - hand) * 0.15;
                    }
                    if(skill == 'tianQiZheTianShiZhuFu') {
                        var score = 1.8;
                        var skills = target.getSkills ?
                            target.getSkills() : (target.skills || []);
                        for(var i = 0; i < skills.length; i++) {
                            var info = lib.skill[skills[i]];
                            if(info && info.ai && info.ai.baoShi) {
                                score += 2.5;
                                break;
                            }
                        }
                        if(target.countNengLiang('baoShi') == 0) {
                            score += 0.8;
                        }
                        return score;
                    }
                    return 0;
                },
                        "content": async function(event, trigger, player) {
                    var available =
                        lib.skill.tianQiZheZhuFuManager
                            .getAvailableCards();
                    if(!available.length) return;
                    var controls = available.map(function(skill) {
                        return get.translation(skill);
                    });
                    var choiceList = available.map(function(skill) {
                        var name = get.translation(skill);
                        var info = lib.translate[skill + '_info'] ||
                            get.translation(skill + '_info');
                        return '<span class="yellowtext">【' + name +
                            '】</span>：' + info;
                    });
                    var control = await player.chooseControl(
                        controls
                    ).set(
                        'prompt',
                        '【祝福】：选择置于' +
                            get.translation(event.target) +
                            '面前的专属卡'
                    ).set(
                        'choiceList',
                        choiceList
                    ).set(
                        'displayIndex',
                        false
                    ).set(
                        'blessingTarget',
                        event.target
                    ).set(
                        'availableBlessings',
                        available
                    ).set('ai', function() {
                        var controls = _status.event.controls;
                        var available =
                            _status.event.availableBlessings || [];
                        var target = _status.event.blessingTarget;
                        var player = _status.event.player;
                        var bestIndex = 0;
                        var bestScore = -Infinity;
                        for(var i = 0; i < available.length; i++) {
                            var score = lib.skill.tianQiZheZhuFu
                                .getAiBlessingScore(
                                    player,
                                    target,
                                    available[i]
                                );
                            if(score > bestScore) {
                                bestScore = score;
                                bestIndex = i;
                            }
                        }
                        return controls[bestIndex] || controls[0];
                    }).forResultControl();
                    var index = controls.indexOf(control);
                    if(index >= 0) {
                        await lib.skill.tianQiZheZhuFuManager.addCard(
                            event.target,
                            available[index]
                        );
                    }
                },
                        "ai": {
                            "order": 6,
                            "result": {
                                "target": function(player, target) {
                            var available = lib.skill
                                .tianQiZheZhuFuManager
                                .getAvailableCards();
                            var best = -100;
                            for(var i = 0; i < available.length; i++) {
                                best = Math.max(
                                    best,
                                    lib.skill.tianQiZheZhuFu
                                        .getAiBlessingScore(
                                            player,
                                            target,
                                            available[i]
                                        )
                                );
                            }
                            return best;
                        },
                            },
                        },
                    },
                    "shengYuZhiFeng": {
                        "type": "faShu",
                        "enable": "faShu",
                        "isSafeForAi": function(player) {
                    return player.countCards('h') + 2 <=
                        player.getHandcardLimit();
                },
                        "content": async function(event, trigger, player) {
                    await player.draw(2);
                    var targets = game.filterPlayer(function(target) {
                        return target.side == player.side;
                    });
                    for(var i = 0; i < targets.length; i++) {
                        await targets[i].changeZhiLiao(1, player);
                    }
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.shengYuZhiFeng
                            .isSafeForAi(player) ? 3.5 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.shengYuZhiFeng
                                .isSafeForAi(player) ? 1 : -100;
                        },
                            },
                        },
                    },
                    "kuaiSuYuHe": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    if(player.countZhiLiao() <= 0) return false;
                    return game.hasPlayer(function(target) {
                        return target.side == player.side &&
                            target.countCards('h', function(card) {
                                return lib.filter.cardDiscardable(
                                    card,
                                    target
                                );
                            }) > 0;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side == player.side &&
                        target.countCards('h', function(current) {
                            return lib.filter.cardDiscardable(
                                current,
                                target
                            );
                        }) > 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.changeZhiLiao(-1, player);
                    await event.target.chooseToDiscard(
                        'h',
                        1,
                        true
                    ).set('ai', function(card) {
                        return 6 - get.value(card);
                    });
                    await event.target.changeZhiLiao(1, player);
                },
                        "ai": {
                            "order": 3.7,
                            "result": {
                                "target": function(player, target) {
                            return target.side == player.side ? 1 : -1;
                        },
                            },
                        },
                    },
                    "shengLingZhiChui": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return !player.hasSkill('shenPanXingTai') &&
                        !player.isHengZhi() &&
                        (player.countZhiLiao() > 0 ||
                            player.countZhiShiWu(
                                'tianQiZheShenPan'
                            ) > 0) &&
                        player.canBiShaBaoShi();
                },
                        "check": function(event, player) {
                    var healing = player.countZhiLiao();
                    var judgement = player.countZhiShiWu(
                        'tianQiZheShenPan'
                    );
                    if(healing + judgement < 3) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return true;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    var healing = player.countZhiLiao();
                    if(healing > 0) {
                        var remove = player.changeZhiLiao(
                            -healing,
                            player
                        );
                        remove.shengLingZhiChui = true;
                        await remove;
                        var removed = Math.max(0, -remove.num);
                        if(removed > 0) {
                            await player.addZhiShiWu(
                                'tianQiZheShenPan',
                                removed
                            );
                        }
                    }
                    player.addSkill('shenPanXingTai');
                    await player.hengZhi();
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "shenPanXingTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "槌",
                        "intro": {
                            "content": "每次你的回合开始时+1【审判】；【审判】减少为0时立即【重置】并脱离此形态。你仍可正常执行【法术行动】。",
                        },
                        "trigger": {
                            "player": "phaseBegin",
                        },
                        "forced": true,
                        "content": async function(event, trigger, player) {
                    await player.addZhiShiWu(
                        'tianQiZheShenPan',
                        1
                    );
                },
                        "group": "shenPanXingTai_tuiChu",
                        "subSkill": {
                            "tuiChu": {
                                "trigger": {
                                    "player": "changeZhiShiWuAfter",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            return event.zhiShiWu ==
                                'tianQiZheShenPan' &&
                                event.num < 0 &&
                                player.countZhiShiWu(
                                    'tianQiZheShenPan'
                                ) == 0;
                        },
                                "content": async function(event, trigger, player) {
                            if(player.isHengZhi()) {
                                await player.chongZhi();
                            }
                            player.removeSkill('shenPanXingTai');
                        },
                            },
                        },
                    },
                    "tianQiZheShenPan": {
                        "charlotte": true,
                        "intro": {
                            "name": "审判",
                            "content": "mark",
                            "max": 8,
                        },
                        "markimage": "extension/创世纪/mark_shenPan.png",
                    },
                    "tianQiZheZhuFuManager": {
                        "charlotte": true,
                        "init": function() {
                    [
                        'rongYuZhuFu',
                        'shouHuHuiZhang',
                        'wuQiZhuFu',
                        'tianQiZheTianShiZhuFu',
                    ].forEach(function(skill) {
                        game.addGlobalSkill(skill);
                    });
                },
                        "trigger": {
                            "global": "gameStart",
                        },
                        "forced": true,
                        "firstDo": true,
                        "popup": false,
                        "content": function() {
                    lib.skill.tianQiZheZhuFuManager.init();
                },
                        "cardSkills": [
                            "rongYuZhuFu",
                            "shouHuHuiZhang",
                            "wuQiZhuFu",
                            "tianQiZheTianShiZhuFu",
                        ],
                        "cardNames": {
                            "rongYuZhuFu": "tianQiZheRongYuZhuFuKa",
                            "shouHuHuiZhang": "tianQiZheShouHuHuiZhangKa",
                            "wuQiZhuFu": "tianQiZheWuQiZhuFuKa",
                            "tianQiZheTianShiZhuFu": "tianQiZheTianShiZhuFuKa",
                        },
                        "hasCard": function(player, skill) {
                    return !!player &&
                        player.getExpansions(skill).length > 0;
                },
                        "addCard": async function(player, skill) {
                    var manager = lib.skill.tianQiZheZhuFuManager;
                    if(!player || manager.hasCard(player, skill)) {
                        return false;
                    }
                    var cardName = manager.cardNames[skill];
                    if(!cardName) return false;
                    var card = game.createCard2(cardName);
                    var next = player.addToExpansion(card, 'gain2');
                    next.gaintag.add(skill);
                    await next;
                    return manager.hasCard(player, skill);
                },
                        "removeCard": async function(player, skill) {
                    if(!player) return false;
                    var cards = player.getExpansions(skill);
                    if(!cards.length) return false;
                    var next = player.lose(cards, ui.special);
                    next.set('type', 'tianQiZheZhuFuRemove');
                    next.set('getlx', false);
                    await next;
                    if(!player.getExpansions(skill).length) {
                        player.unmarkSkill(skill);
                    }
                    return true;
                },
                        "getAvailableCards": function() {
                    return lib.skill.tianQiZheZhuFuManager
                        .cardSkills.filter(function(skill) {
                            return !game.hasPlayer(function(player) {
                                return lib.skill
                                    .tianQiZheZhuFuManager
                                    .hasCard(player, skill);
                            });
                        });
                },
                        "isMoraleCausedBy": function(event, player) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 30) {
                        if(current.source == player) return true;
                        if((current.name == 'useSkill' ||
                            current.name == 'useCard') &&
                            current.player == player) {
                            return true;
                        }
                        current = current.parent ||
                            (current.getParent &&
                                current.getParent());
                        guard++;
                    }
                    return false;
                },
                    },
                    "rongYuZhuFu": {
                        "charlotte": true,
                        "trigger": {
                            "global": "changeShiQiEnd",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return lib.skill.tianQiZheZhuFuManager
                        .hasCard(player, 'rongYuZhuFu') &&
                        event.num < 0 &&
                        event.side != player.side &&
                        lib.skill.tianQiZheZhuFuManager
                            .isMoraleCausedBy(event, player);
                },
                        "content": async function(event, trigger, player) {
                    var num = -trigger.num;
                    await lib.skill.tianQiZheZhuFuManager.removeCard(
                        player,
                        'rongYuZhuFu'
                    );
                    var control = await player.chooseControl([
                        '弃置' + num + '张手牌',
                        '+ ' + num + '【治疗】',
                    ]).set(
                        'prompt',
                        '【荣誉祝福】：选择一项'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        if(player.countCards('h') <
                            _status.event.num) {
                            return '+ ' +
                                _status.event.num +
                                '【治疗】';
                        }
                        return '弃置' +
                            _status.event.num +
                            '张手牌';
                    }).set('num', num).forResultControl();
                    if(control.indexOf('弃置') == 0) {
                        var count = Math.min(
                            num,
                            player.countCards('h')
                        );
                        if(count > 0) {
                            await player.chooseToDiscard(
                                'h',
                                count,
                                true
                            );
                        }
                    } else {
                        await player.changeZhiLiao(num, player);
                    }
                },
                        "intro": {
                            "name": "荣誉祝福",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions(
                            'rongYuZhuFu'
                        );
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.rongYuZhuFu_info;
                    },
                        },
                    },
                    "shouHuHuiZhang": {
                        "charlotte": true,
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return lib.skill.tianQiZheZhuFuManager
                        .hasCard(player, 'shouHuHuiZhang') &&
                        event.target == player &&
                        event.num > 0;
                },
                        "content": async function(event, trigger, player) {
                    await lib.skill.tianQiZheZhuFuManager.removeCard(
                        player,
                        'shouHuHuiZhang'
                    );
                    trigger.changeDamageNum(
                        -Math.min(2, trigger.num)
                    );
                },
                        "intro": {
                            "name": "守护徽章",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions(
                            'shouHuHuiZhang'
                        );
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.shouHuHuiZhang_info;
                    },
                        },
                    },
                    "wuQiZhuFu": {
                        "charlotte": true,
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return lib.skill.tianQiZheZhuFuManager
                        .hasCard(player, 'wuQiZhuFu') &&
                        event.player == player &&
                        event.yingZhan == true;
                },
                        "content": async function(event, trigger, player) {
                    await lib.skill.tianQiZheZhuFuManager.removeCard(
                        player,
                        'wuQiZhuFu'
                    );
                    trigger.changeDamageNum(2);
                },
                        "intro": {
                            "name": "武器祝福",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions(
                            'wuQiZhuFu'
                        );
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.wuQiZhuFu_info;
                    },
                        },
                    },
                    "tianQiZheTianShiZhuFu": {
                        "charlotte": true,
                        "intro": {
                            "name": "天使祝福",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions(
                            'tianQiZheTianShiZhuFu'
                        );
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate
                            .tianQiZheTianShiZhuFu_info;
                    },
                        },
                    },
                    "xueQiWangSheng": {
                        "trigger": {
                            "player": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event && event.num > 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.addZhiShiWu(
                        'yuXueMoShenXueQi',
                        Math.min(2, trigger.num)
                    );
                },
                    },
                    "xueQiHuanXing": {
                        "group": [
                            "xueQiHuanXing_gongJi",
                            "xueQiHuanXing_chengShou",
                        ],
                        "subSkill": {
                            "gongJi": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                player.countZhiLiao() == 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        },
                            },
                            "chengShou": {
                                "trigger": {
                                    "player": "chengShouShangHaiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                player.countZhiLiao() == 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        },
                            },
                        },
                    },
                    "shiHunZhiShou": {
                        "trigger": {
                            "source": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event && event.num > 0 && !!event.card &&
                        get.type(event.card) == 'gongJi';
                },
                        "content": async function(event, trigger, player) {
                    var before = player.countZhiLiao();
                    if(before < player.getZhiLiaoLimit()) {
                        await player.changeZhiLiao(1, player);
                    }
                    if(player.countZhiLiao() <= before) {
                        await player.addZhiShiWu(
                            'yuXueMoShenXueQi',
                            1
                        );
                    }
                },
                    },
                    "nuQiBaoFa": {
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        !!event.target &&
                        player.countZhiShiWu(
                            'yuXueMoShenXueQi'
                        ) >= 2;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除2【血气】，发动【怒气爆发】？'
                    ).set('ai', function() {
                        var target = _status.event.getTrigger().target;
                        return !!target &&
                            get.damageEffect2(
                                target,
                                _status.event.player,
                                1
                            ) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu(
                        'yuXueMoShenXueQi',
                        2
                    );
                    var primary = trigger.target;
                    if(primary && primary.isIn()) {
                        await primary.faShuDamage(
                            1,
                            player,
                            'nocard'
                        );
                    }
                    var candidates = game.players.filter(
                        function(target) {
                            return target.isIn() &&
                                target.side != player.side &&
                                target != primary;
                        }
                    );
                    if(candidates.length) {
                        var targets = await player.chooseTarget(
                            '怒气爆发：可以再指定另一名对手',
                            function(card, player, target) {
                                return target.isIn() &&
                                    target.side != player.side &&
                                    target != _status.event.primary;
                            }
                        ).set('primary', primary).set(
                            'ai',
                            function(target) {
                                return get.damageEffect2(
                                    target,
                                    _status.event.player,
                                    1
                                );
                            }
                        ).forResultTargets();
                        if(targets.length && targets[0].isIn()) {
                            await targets[0].faShuDamage(
                                1,
                                player,
                                'nocard'
                            );
                        }
                    }
                    await player.faShuDamage(
                        1,
                        player,
                        'nocard'
                    );
                },
                    },
                    "shiHunFengMoZhan": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        !!event.target &&
                        player.countZhiShiWu(
                            'yuXueMoShenXueQi'
                        ) >= 3;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除3【血气】，发动【嗜魂封魔斩】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger.target;
                        if(!target || target.side == player.side) return false;
                        var xiBie = get.xiBie(trigger.card);
                        var likelyResponse = target.countCards(
                            'h',
                            function(card) {
                                return get.type(card, target) == 'gongJi' &&
                                    (get.xiBie(card) == xiBie ||
                                        get.xiBie(card) == 'an');
                            }
                        ) > 0;
                        var discardValue = target.countCards('h') > 0;
                        return likelyResponse || discardValue ||
                            get.shiQi(!player.side) <= 2;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu(
                        'yuXueMoShenXueQi',
                        3
                    );
                    trigger.wuFaYingZhan();
                },
                    },
                    "siWangKangJu": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.countZhiLiao() == 0 &&
                        !player.hasSkill('xueShaJinLiao') &&
                        player.countZhiShiWu(
                            'yuXueMoShenXueQi'
                        ) >= 2;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu(
                        'yuXueMoShenXueQi',
                        2
                    );
                    await player.changeZhiLiao(2, player);
                    var discardCount = Math.min(
                        2,
                        player.countCards('he')
                    );
                    if(discardCount > 0) {
                        await player.chooseToDiscard(
                            'he',
                            discardCount,
                            true,
                            '【死亡抗拒】：弃置2张牌'
                        );
                    }
                },
                        "ai": {
                            "order": 6,
                            "result": {
                                "player": 2,
                            },
                        },
                    },
                    "shiXue": {
                        "type": "faShu",
                        "enable": "faShu",
                        "usable": 1,
                        "filter": function(event, player) {
                    return player.countZhiLiao() > 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.changeZhiLiao(-1, player);
                    await player.addZhiShiWu(
                        'yuXueMoShenXueQi',
                        2
                    );
                    player.addGongJi(1);
                },
                        "ai": {
                            "order": 5,
                            "result": {
                                "player": function(player) {
                            return player.countCards('h', function(card) {
                                return get.type(card) == 'gongJi';
                            }) > 0 ? 1.5 : 0;
                        },
                            },
                        },
                    },
                    "bengShanLieDiZhan": {
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": 1,
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing() &&
                        player.countZhiShiWu(
                            'yuXueMoShenXueQi'
                        ) >= 4 &&
                        game.hasPlayer(function(target) {
                            return target.side != player.side;
                        });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu(
                        'yuXueMoShenXueQi',
                        4
                    );
                    var primary = event.target;
                    var targets = game.players.slice();
                    if(primary && primary.isIn()) {
                        await primary.faShuDamage(
                            2,
                            player,
                            'nocard'
                        );
                    }
                    for(var target of targets) {
                        if(!target || !target.isIn() ||
                            target == primary ||
                            target.side == player.side) {
                            continue;
                        }
                        await target.faShuDamage(
                            1,
                            player,
                            'nocard'
                        );
                    }
                    await player.faShuDamage(
                        1,
                        player,
                        'nocard'
                    );
                },
                        "ai": {
                            "order": 4,
                            "result": {
                                "target": function(player, target) {
                            return get.damageEffect(target, 2);
                        },
                            },
                            "shuiJing": true,
                        },
                    },
                    "moYuXueSha": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() &&
                        !player.hasSkill('xueShaXingTai');
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    var count = player.countZhiLiao();
                    if(count > 0) {
                        await player.changeZhiLiao(
                            -count,
                            player
                        );
                    }
                    player.addSkill('xueShaJinLiao');
                    if(!player.isHengZhi()) {
                        await player.hengZhi();
                    }
                    player.storage.xueShaXingTaiPhaseCount = 0;
                    player.syncStorage('xueShaXingTaiPhaseCount');
                    player.addSkill('xueShaXingTai');
                },
                        "check": function(event, player) {
                    if(player.hasSkill('xueShaXingTai')) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    var enemies = game.countPlayer(function(target) {
                        return target.side != player.side;
                    });
                    return player.countZhiShiWu('yuXueMoShenXueQi') +
                        player.countZhiLiao() + enemies >= 4;
                },
                        "ai": {
                            "baoShi": true,
                        },
                        "onremove": function(player) {
                    if(player.hasSkill('xueShaXingTai')) {
                        player.removeSkill('xueShaXingTai');
                    } else {
                        if(player.isHengZhi()) player.chongZhi();
                        player.removeSkill('xueShaJinLiao');
                    }
                },
                    },
                    "xueShaJinLiao": {
                        "charlotte": true,
                        "trigger": {
                            "player": "changeZhiLiaoBefore",
                        },
                        "forced": true,
                        "firstDo": true,
                        "priority": 100,
                        "popup": false,
                        "filter": function(event, player) {
                    return !!event && event.num > 0;
                },
                        "content": function(event, trigger, player) {
                    trigger.cancel();
                },
                    },
                    "xueShaXingTai": {
                        "charlotte": true,
                        "mark": true,
                        "intro": {
                            "name": "血刹形态",
                            "content": "不能获得【治疗】；任意角色每次承受实际伤害后，你+1【血气】。持续至你的下下个回合开始并结算终结效果。",
                        },
                        "markimage": "extension/创世纪/mark_xueShaXingTai.png",
                        "group": [
                            "xueShaXingTai_xueQi",
                            "xueShaXingTai_jieSuan",
                        ],
                        "onremove": function(player) {
                    if(player.storage.xueShaXingTaiFinishing !== true) {
                        if(player.isHengZhi()) player.chongZhi();
                        player.removeSkill('xueShaJinLiao');
                    }
                    delete player.storage.xueShaXingTaiFinishing;
                    delete player.storage.xueShaXingTaiPhaseCount;
                },
                        "subSkill": {
                            "xueQi": {
                                "trigger": {
                                    "global": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                player.hasSkill('xueShaXingTai');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu(
                                'yuXueMoShenXueQi',
                                1
                            );
                        },
                            },
                            "jieSuan": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            return player.hasSkill('xueShaXingTai');
                        },
                                "content": async function(event, trigger, player) {
                            player.storage.xueShaXingTaiPhaseCount =
                                (player.storage.xueShaXingTaiPhaseCount || 0) + 1;
                            player.syncStorage('xueShaXingTaiPhaseCount');
                            if(player.storage.xueShaXingTaiPhaseCount < 2) {
                                return;
                            }
                            var removed = player.countZhiShiWu(
                                'yuXueMoShenXueQi'
                            );
                            if(removed > 0) {
                                await player.removeZhiShiWu(
                                    'yuXueMoShenXueQi',
                                    removed
                                );
                            }
                            var targets = await player.chooseTarget(
                                '魔狱血刹：指定一名对手',
                                true,
                                function(card, player, target) {
                                    return target.side != player.side;
                                }
                            ).set('ai', function(target) {
                                return get.damageEffect2(
                                    target,
                                    _status.event.player,
                                    Math.min(
                                        4,
                                        Math.ceil(
                                            _status.event.removed / 2
                                        )
                                    )
                                );
                            }).set(
                                'removed',
                                removed
                            ).forResultTargets();
                            var primary = targets[0];
                            var others = game.players.slice();
                            try {
                                var damage = Math.min(
                                    4,
                                    Math.ceil(removed / 2)
                                );
                                if(primary && primary.isIn()) {
                                    await primary.faShuDamage(
                                        damage,
                                        player,
                                        'nocard'
                                    );
                                }
                                if(removed >= 6) {
                                    for(var target of others) {
                                        if(!target || !target.isIn() ||
                                            target == primary ||
                                            target.side == player.side) {
                                            continue;
                                        }
                                        await target.faShuDamage(
                                            1,
                                            player,
                                            'nocard'
                                        );
                                    }
                                }
                            } finally {
                                player.storage.xueShaXingTaiFinishing = true;
                                if(player.isHengZhi()) {
                                    await player.chongZhi();
                                }
                                player.removeSkill('xueShaXingTai');
                                delete player.storage.xueShaXingTaiFinishing;
                                player.removeSkill('xueShaJinLiao');
                            }
                        },
                            },
                        },
                    },
                    "yuXueMoShenXueQi": {
                        "intro": {
                            "name": "血气",
                            "content": "mark",
                            "max": 8,
                        },
                        "onremove": "storage",
                        "markimage": "extension/创世纪/mark_xueQi.png",
                    },
                },
                "translate": {
                    "moFaHuDun": "被动【魔法护盾】",
                    "moFaHuDun_info": "<span class='tiaoJian'>（拥有【圣盾】时）</span>你承受的法术伤害-1⑤。",
                    "test": "test",
                    "test_info": "",
                    "xuanWenShengCheng": "响应【炫纹生成】",
                    "xuanWenShengCheng_info": "<span class='tiaoJian'>（火系或水系攻击命中时②，或打出【暗灭】【圣光】时）</span>将对应牌面向上置于角色旁作为【炫纹】。",
                    "xuanWen": "炫纹",
                    "xuanWen_info": "贝亚娜斗神的专属牌，上限为9；达到上限后不能继续生成。",
                    "ziDongXuanWen": "响应【自动炫纹】",
                    "ziDongXuanWen_info": "<span class='tiaoJian'>（对方士气下降时）</span>将1张手牌置于角色旁作为【炫纹】，然后摸2张牌【强制】。",
                    "huangLongYanYue": "响应【煌龙偃月】",
                    "huangLongYanYue_info": "【回合限定】<span class='tiaoJian'>（主动攻击命中时②）</span>对攻击目标造成X点法术伤害③；X为你的暗系与光系【炫纹】数量之和，最多为2。",
                    "bianShenBeiYaNa": "启动【变身贝亚娜】",
                    "bianShenBeiYaNa_info": "【持续】【水晶】<span class='tiaoJian'>（移除2【炫纹】）</span>【横置】：所有【炫纹】视为暗系；不能执行【法术行动】；除【圣光】外，所有牌均视为对应系攻击牌【强制】。<span class='tiaoJian'>（我方士气下降时）</span>【重置】并+1【治疗】。",
                    "xuanWenQiangYa": "法术【炫纹强压】",
                    "xuanWenQiangYa_info": "【宝石】<span class='tiaoJian'>（移除全部【炫纹】）</span>对所有对手各造成X点法术伤害③；X为移除数量的一半，向上取整。",
                    "xuanWenFaShe": "响应【炫纹发射】",
                    "xuanWenFaShe_info": "<span class='tiaoJian'>（主动攻击造成实际伤害时⑤，移除最新的1【炫纹】）</span>按其系别结算：<br>水：目标弃1张牌。<br>火：对目标造成1点法术伤害③。<br>暗：对目标造成2点法术伤害③。<br>光：+1【攻击行动】或【法术行动】。",
                    "nianQi": "念气",
                    "nianQi_info": "<span class='hong'>【念气】</span>为百花缭乱专属指示物，上限为8。",
                    "nianQiHuanRao": "被动【念气环绕】",
                    "nianQiHuanRao_info": "<span class='tiaoJian'>（你的【法术行动】结束后）</span>+1<span class='hong'>【念气】</span>。",
                    "lieRiGuangHui": "被动【烈日光辉】",
                    "lieRiGuangHui_info": "<span class='tiaoJian'>（你的【特殊行动】结束后，或你的主动攻击命中后②）</span>若你有<span class='hong'>【念气】</span>，移除1<span class='hong'>【念气】</span>。",
                    "guangZhiQinHe": "被动【光之亲和】",
                    "guangZhiQinHe_info": "你的【治疗】上限+1；你不能成为基础效果牌的目标。",
                    "nianQiBo": "法术【念气波】",
                    "nianQiBo_info": "<span class='tiaoJian'>（弃置1张法术牌或咏类命格牌【展示】，指定另一名角色）</span>对你与目标角色各造成2点法术伤害③，随后+1<span class='hong'>【念气】</span>。",
                    "luanWuQianYeHua": "响应【乱舞·千叶花】",
                    "luanWuQianYeHua_info": "<span class='tiaoJian'>（其他角色对你造成伤害后）</span>选择一项：移除1<span class='hong'>【念气】</span>，+1【治疗】；或摸1张牌【强制】，+2<span class='hong'>【念气】</span>。",
                    "nianQiZhao": "法术【念气罩】",
                    "nianQiZhao_info": "选择一名有可弃置牌的我方角色，再选择一项：移除2<span class='hong'>【念气】</span>；或摸2张牌【强制】。随后该角色+2【治疗】并弃1张牌。",
                    "nianZhiAoYi": "启动【念之奥义】",
                    "nianZhiAoYi_info": "【持续】【宝石】<span class='tiaoJian'>（移除全部【治疗】）</span>将手牌补至上限【强制】，然后【横置】。<br>本回合不能获得<span class='hong'>【念气】</span>；<span class='tiaoJian'>（【法术行动】结束后）</span>若有<span class='hong'>【念气】</span>，移除1<span class='hong'>【念气】</span>，+1【法术行动】；回合结束时【重置】。<br>直到你的下个回合开始前，对方士气最少为1【强制】。",
                    "nianZhiAoYi_effect": "念之奥义",
                    "nianZhiAoYi_effect_info": "本回合不能获得【念气】；<span class='tiaoJian'>（每次【法术行动】结束后）</span>若有【念气】，移除1【念气】，额外+1【法术行动】；回合结束时【重置】。",
                    "nianZhiAoYi_shiQi": "念之奥义·士气保护",
                    "nianZhiAoYi_shiQi_info": "直到百花缭乱的下个回合开始前，对方士气最少为1【强制】。",
                    "qianLianNuFang": "法术【千莲怒放】",
                    "qianLianNuFang_info": "【水晶】<span class='tiaoJian'>（移除A<span class='hong'>【念气】</span>并弃置B张同系牌【展示】，A≥3，B≥1）</span>对自己造成A+B点法术伤害③，对其他角色各造成A-2点法术伤害③，每次伤害至多为4。<span class='tiaoJian'>（结算后）</span>可以再移除3<span class='hong'>【念气】</span>，+1【宝石】。",
                    "shiYanCaiLiao": "实验材料",
                    "shiYanCaiLiao_info": "<span class='lan'>【实验材料】</span>为露米娅的专属盖牌，上限为3。露米娅可以查看牌面，其他角色只能看到数量。",
                    "luMiYaYanJiu": "研究",
                    "luMiYaYanJiu_info": "<span class='hong'>【研究】</span>为露米娅的专属指示物，上限为3。",
                    "faMiLiErShiYanShi": "被动【法米利尔实验室】",
                    "faMiLiErShiYanShi_info": "游戏开始时，将牌库顶2张牌面朝下置为<span class='lan'>【实验材料】</span>。<span class='tiaoJian'>（【特殊行动】结束后）</span>再放置牌库顶1张；材料已满时，可以弃置并更换1张。该效果先于【扫把掌握】结算，且不进行实验。",
                    "luMiYaShiYan": "被动【实验】",
                    "luMiYaShiYan_info": "<span class='tiaoJian'>（进行实验时，移除并展示符合需求的1张<span class='lan'>【实验材料】</span>）</span>再展示牌库顶牌：<br>与任一需求系别相同：【大成功】；与需求系别不同的法术牌：【成功】；与需求系别不同的攻击牌：【失败】。双系需求的任一系均可判定为【大成功】。<br>按最终结果结算；若仍为【失败】，+1<span class='hong'>【研究】</span>。两张牌均置入弃牌堆。",
                    "xingYunBangBangTang": "响应【幸运棒棒糖】",
                    "xingYunBangBangTang_info": "<span class='tiaoJian'>（实验的初始结果确定后）</span>每次实验限一次：移除1<span class='hong'>【研究】</span>，将【失败】改为【成功】；或移除2<span class='hong'>【研究】</span>，将【成功】改为【大成功】。",
                    "gaiLiangMoFaXingDan": "响应【改良魔法星弹】",
                    "gaiLiangMoFaXingDan_info": "<span class='tiaoJian'>（【魔弹】每对一名角色造成实际伤害后）</span>选择一项：所有我方角色各+1【治疗】；或对所有对手各造成1点法术伤害③。",
                    "saoBaZhangWo": "响应【扫把掌握】",
                    "saoBaZhangWo_info": "<span class='tiaoJian'>（【特殊行动】结束后）</span>+1【攻击行动】：以此行动发动的主动攻击伤害-1；若未命中，将攻击牌面朝下置为<span class='lan'>【实验材料】</span>，材料已满时可以更换1张。",
                    "xuanZhuanSaoBa": "响应【旋转扫把】",
                    "xuanZhuanSaoBa_info": "<span class='tiaoJian'>（主动攻击或应战攻击命中后②，移除1张风系<span class='lan'>【实验材料】</span>）</span>进行实验，Y为本次攻击伤害：<br>失败：对自己造成Y点攻击伤害。<br>成功：对至多一名原目标以外的对手造成Y点攻击伤害。<br>大成功：对至多两名原目标以外的对手各造成Y点攻击伤害。<br>其他对手不足时仍可发动。",
                    "rongYanYaoPing": "法术【熔岩药瓶】",
                    "rongYanYaoPing_info": "<span class='tiaoJian'>（移除1张火系或地系<span class='lan'>【实验材料】</span>）</span>进行实验：<br>失败：对自己造成1点法术伤害③。<br>成功：对任意角色造成2点法术伤害③。<br>大成功：对任意角色造成3点法术伤害③。",
                    "suanYuYun": "法术【酸雨云】",
                    "suanYuYun_info": "<span class='tiaoJian'>（移除1张水系<span class='lan'>【实验材料】</span>）</span>进行实验：<br>失败：摸1张牌【强制】。<br>成功：令一名有可弃置牌的角色弃1张牌。<br>大成功：令至多两名有可弃置牌的角色各弃1张牌。",
                    "dianManPengZhuangJi": "响应【电鳗碰撞机】",
                    "dianManPengZhuangJi_info": "<span class='tiaoJian'>（【法术行动】结束后，移除1张雷系或光系<span class='lan'>【实验材料】</span>）</span>进行实验：<br>失败：摸1张牌【强制】。<br>成功：+1【攻击行动】。<br>大成功：+1【法术行动】。<br>不限次数，增加的【法术行动】结束后也可发动。",
                    "fanZhongLiZhuangZhi": "法术【反重力装置】",
                    "fanZhongLiZhuangZhi_info": "<span class='tiaoJian'>（移除1张暗系<span class='lan'>【实验材料】</span>）</span>进行实验：<br>失败：对自己造成1点法术伤害③，再摸1张牌【强制】。<br>成功：对任意没有【虚弱】的角色使用1张实体【虚弱】。<br>大成功：令任意角色摸3张牌【强制】。",
                    "jiYiRongHe": "启动【技艺融合】",
                    "jiYiRongHe_info": "【水晶】从你开始，我方角色按座次依次弃1张手牌，无手牌者跳过。每张弃牌均可面朝下置为<span class='lan'>【实验材料】</span>，材料已满时可以逐张更换。然后你+1<span class='hong'>【研究】</span>；若实际支付【宝石】，额外将<span class='hong'>【研究】</span>补至上限。",
                    "tianQiZheShenPan": "审判",
                    "tianQiZheShenPan_info": "<span class='hong'>【审判】</span>为天启者的专属指示物，上限为8。",
                    "shouHuEnCi": "被动【守护恩赐】",
                    "shouHuEnCi_info": "你的【治疗】上限+2。<span class='tiaoJian'>（你的回合内，每当你实际移除【治疗】后）</span>+X<span class='hong'>【审判】</span>，X为此次实际移除的【治疗】数；【圣灵之槌】移除【治疗】时不触发。",
                    "lingHunXiSheng": "响应【灵魂牺牲】",
                    "lingHunXiSheng_info": "<span class='tiaoJian'>（你因承受伤害令我方士气下降时）</span>选择+1【治疗】或+1<span class='hong'>【审判】</span>，再令一名其他队友+1【水晶】。资源已满时仍可选择。",
                    "guangZhiFuChou": "响应【光之复仇】",
                    "guangZhiFuChou_info": "<span class='tiaoJian'>（其他队友被主动攻击命中时②，展示并弃1张法术牌）</span>对攻击来源造成1点法术伤害③。一次攻击命中多名队友时，每次命中均可发动。",
                    "shengLiZhiMao": "响应【胜利之矛】",
                    "shengLiZhiMao_info": "<span class='tiaoJian'>（【审判形态】下，主动攻击前①，移除1<span class='hong'>【审判】</span>）</span>记录目标当前【治疗】数X，至多为3：命中则攻击伤害+X；未命中则对自己造成1点法术伤害③。支付后退出形态不影响结算。",
                    "chanHuiZhiChui": "响应【忏悔之锤】",
                    "chanHuiZhiChui_info": "<span class='tiaoJian'>（【审判形态】下，主动攻击命中时②，移除3<span class='hong'>【审判】</span>）</span>对目标造成2点法术伤害③，然后+1【治疗】。支付后退出形态不影响结算。",
                    "tianQiZheZhuFu": "法术【祝福】",
                    "tianQiZheZhuFu_info": "<span class='tiaoJian'>（展示并弃1张圣类牌）</span>选择一名其他队友，将场外1张当前未在场的【荣誉祝福】【守护徽章】【武器祝福】或【天使祝福】置于其面前。",
                    "shengYuZhiFeng": "法术【圣愈之风】",
                    "shengYuZhiFeng_info": "摸2张牌【强制】，完整结算标准爆牌流程；然后我方所有角色各+1【治疗】。",
                    "kuaiSuYuHe": "法术【快速愈合】",
                    "kuaiSuYuHe_info": "<span class='tiaoJian'>（移除1【治疗】）</span>令一名有手牌的我方角色弃1张手牌，然后+1【治疗】。可以选择自己或【治疗】已满的角色。",
                    "shengLingZhiChui": "启动【圣灵之槌】",
                    "shengLingZhiChui_info": "【持续】【宝石】<span class='tiaoJian'>（【普通形态】下，【治疗】或<span class='hong'>【审判】</span>＞0，移除全部【治疗】）</span>获得等量<span class='hong'>【审判】</span>，然后【横置】进入【审判形态】。此次移除不触发【守护恩赐】。",
                    "shenPanXingTai": "审判形态",
                    "shenPanXingTai_info": "<span class='tiaoJian'>（【审判形态】下）</span>回合开始时+1<span class='hong'>【审判】</span>；<span class='hong'>【审判】</span>降至0时，立即【重置】并退出形态。仍可执行【法术行动】。",
                    "tianQiZheZhuFuManager": "天启者专属卡管理",
                    "tianQiZheZhuFuManager_info": "管理四张全场唯一的天启者专属实体卡；专属卡移除后返回场外，可再次通过【祝福】置入场上。",
                    "rongYuZhuFu": "荣誉祝福",
                    "rongYuZhuFu_info": "<span class='tiaoJian'>（拥有者令对方士气下降X点时）</span>移除此卡，选择一项：弃X张手牌【强制】，不足则全部弃置；或+X【治疗】。伤害及技能强制摸牌引发的爆牌均可触发。",
                    "shouHuHuiZhang": "守护徽章",
                    "shouHuHuiZhang_info": "<span class='tiaoJian'>（拥有者被攻击命中时②）</span>若当前伤害＞0，移除此卡，令本次攻击伤害-2，最低为0。",
                    "wuQiZhuFu": "武器祝福",
                    "wuQiZhuFu_info": "<span class='tiaoJian'>（拥有者的应战攻击命中时②）</span>移除此卡，本次攻击伤害+2。",
                    "tianQiZheTianShiZhuFu": "天使祝福",
                    "tianQiZheTianShiZhuFu_info": "<span class='tiaoJian'>（拥有者支付技能的1【宝石】时）</span>可以移除此卡，视为已支付该【宝石】。无需移除战绩区资源，没有【宝石】也可发动。",
                    "yuXueMoShenXueQi": "血气",
                    "yuXueMoShenXueQi_info": "<span class='hong'>【血气】</span>为狱血魔神的专属指示物，上限为8。",
                    "xueQiWangSheng": "被动【血气旺盛】",
                    "xueQiWangSheng_info": "<span class='tiaoJian'>（承受实际伤害后⑤）</span>+X<span class='hong'>【血气】</span>，X为实际伤害，至多为2。其他角色造成的伤害及自伤均可触发。",
                    "xueQiHuanXing": "被动【血气唤醒】",
                    "xueQiHuanXing_info": "<span class='tiaoJian'>（没有【治疗】时）</span>攻击伤害+1；承受的所有伤害+1【强制】，包括自伤。",
                    "shiHunZhiShou": "被动【嗜魂之手】",
                    "shiHunZhiShou_info": "<span class='tiaoJian'>（攻击造成实际伤害后⑤）</span>+1【治疗】；若【治疗】已满或无法实际获得【治疗】，改为+1<span class='hong'>【血气】</span>。",
                    "nuQiBaoFa": "响应【怒气爆发】",
                    "nuQiBaoFa_info": "【回合限定】<span class='tiaoJian'>（主动攻击命中时②，移除2<span class='hong'>【血气】</span>）</span>对目标造成1点法术伤害③；可以对另一名对手再造成1点法术伤害③；然后对自己造成1点法术伤害③。",
                    "shiHunFengMoZhan": "响应【嗜魂封魔斩】",
                    "shiHunFengMoZhan_info": "<span class='tiaoJian'>（主动攻击前①，移除3<span class='hong'>【血气】</span>）</span>本次攻击无法被应战。",
                    "siWangKangJu": "法术【死亡抗拒】",
                    "siWangKangJu_info": "<span class='tiaoJian'>（你没有【治疗】且未被禁止获得【治疗】，移除2<span class='hong'>【血气】</span>）</span>+2【治疗】，然后弃置2张牌；不足时弃置全部可弃置牌。",
                    "shiXue": "法术【嗜血】",
                    "shiXue_info": "【回合限定】<span class='tiaoJian'>（移除你的1【治疗】）</span>+2<span class='hong'>【血气】</span>，额外+1【攻击行动】。",
                    "bengShanLieDiZhan": "法术【崩山裂地斩】",
                    "bengShanLieDiZhan_info": "【水晶】<span class='tiaoJian'>（移除4<span class='hong'>【血气】</span>）</span>对一名对手造成2点法术伤害③，对其他对手各造成1点法术伤害③，然后对自己造成1点法术伤害③。",
                    "moYuXueSha": "启动【魔狱血刹】",
                    "moYuXueSha_info": "【持续】【宝石】<span class='tiaoJian'>（移除全部【治疗】）</span>【横置】并进入【血刹形态】；没有【治疗】也可发动。<br><span class='tiaoJian'>（下下个回合开始时）</span>移除全部<span class='hong'>【血气】</span>并选择一名对手，对其造成X点法术伤害③，X为移除数的一半（向上取整），至多为4；若移除数≥6，再对其他对手各造成1点法术伤害③。全部伤害结算后【重置】、退出形态并解除治疗禁止。",
                    "xueShaXingTai": "血刹形态",
                    "xueShaXingTai_info": "<span class='tiaoJian'>（【血刹形态】下）</span>不能获得【治疗】；<span class='tiaoJian'>（任意角色承受实际伤害后）</span>你+1<span class='hong'>【血气】</span>。自身受伤时可与【血气旺盛】叠加。持续至你的下下个回合开始并结算【魔狱血刹】。",
                },
            },
            "intro": "添加角色贝亚娜斗神、百花缭乱、露米娅、天启者、狱血魔神。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "2.0",
        },
        "files": {
            "character": [
                "beiyanadopushen.png",
                "baiHuaLiaoLuan.png",
                "luMiYa.png",
                "tianQiZhe.png",
                "yuXueMoShen.png",
            ],
            "card": [
                "mark_rongYuZhuFu.png",
                "mark_shouHuHuiZhang.png",
                "mark_wuQiZhuFu.png",
                "mark_tianShiZhuFu.png",
            ],
            "skill": [
                "mark_nianQi.png",
                "mark_luMiYaYanJiu.png",
                "mark_shenPan.png",
                "mark_xueQi.png",
                "mark_xueShaXingTai.png",
            ],
            "audio": [],
        },
        "connect": true,
    };
});
