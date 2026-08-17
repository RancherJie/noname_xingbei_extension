game.import("extension", function(lib, game, ui, get, ai, _status) {
    return {
        "name": "永夜残响",
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
                    "wuHeQinLi": [
                        null,
                        "huanGroup",
                        4,
                        [
                            "shuangSeFaDai",
                            "qinLiYanLing",
                            "lingLiShiKong",
                            "zhuoLanJianGui",
                            "yanMoXianXian",
                            "qinLiLingLi",
                        ],
                        [
                            "des:统率空中舰队的炎之精灵。五河琴里通过双色发带在妹妹与司令形态间切换，并以灼烂歼鬼释放积蓄的灵力。",
                            "ext:永夜残响/wHeQingLi.jpg",
                        ],
                    ],
                    "yeDaoShenShiXiang": [
                        null,
                        "jiGroup",
                        4,
                        [
                            "shenWeiLingZhuangShiFan",
                            "wangZuoXianXian",
                            "lingZhuangHuBi",
                            "gongZhuJiangLin",
                            "aoShaGong",
                            "huangDouFenMianBao",
                            "aoShaGongZuiHouZhiJian",
                            "shiXiangLingLi",
                        ],
                        [
                            "des:持有鏖杀公的公主。夜刀神十香在王座与剑刃形态之间切换，以灵力强化守御、斩击与最后之剑。",
                            "ext:永夜残响/shiXiang.jpg",
                        ],
                    ],
                    "siMiNai": [
                        null,
                        "shengGroup",
                        3.5,
                        [
                            "shenWeiLingZhuangSiFan",
                            "bingJieTuXi",
                            "bingZhiShouHu",
                            "siMiNaiDeEZuoJu",
                            "bingZhiQiYuan",
                            "bingJieKuiLeiSaDan",
                            "siMiNaiBingJing",
                            "siMiNaiDongJie",
                        ],
                        [
                            "des:以冰霜与灵装守护同伴的精灵少女。四糸乃能够借助手偶四糸奈与冰结傀儡·撒旦操纵寒气，在治疗队友、削弱攻击与冻结对手的额外行动之间切换。",
                            "ext:永夜残响/siMiNai.jpg",
                        ],
                    ],
                    "shiQiKuangSan": [
                        null,
                        "xueGroup",
                        5,
                        [
                            "keKeDi",
                            "baZhiDan",
                            "yiZhiDan",
                            "erZhiDan",
                            "siZhiDan",
                            "qiZhiDan",
                            "shiShiZhiCheng",
                            "shiCha",
                            "shiJianJingZhi",
                        ],
                        [
                            "des:操纵时间之力的梦魇。时崎狂三以刻刻帝的十二种能力夺取、积蓄并支配时间，在伤害、支援与时间静止之间不断转换。",
                            "ext:永夜残响/shiQiKuangSan.jpg",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "永夜残响": "永夜残响",
                    "wuHeQinLi": "五河琴里",
                    "yeDaoShenShiXiang": "夜刀神十香",
                    "siMiNai": "四糸乃",
                    "shiQiKuangSan": "时崎狂三",
                },
            },
            "card": {
                "card": {},
                "translate": {},
                "list": [],
            },
            "skill": {
                "skill": {
                    "shuangSeFaDai": {
                        "getForm": function(player) {
                    if(player.hasSkill('heiSeFaDai')) return 'heiSeFaDai';
                    if(player.hasSkill('baiSeFaDai')) return 'baiSeFaDai';
                    return null;
                },
                        "setForm": function(player, form) {
                    if(!player) return;
                    if(form != 'baiSeFaDai' && form != 'heiSeFaDai') return;
                    var current =
                        lib.skill.shuangSeFaDai.getForm(player);
                    if(current == form) return;
                    var other = form == 'baiSeFaDai' ?
                        'heiSeFaDai' : 'baiSeFaDai';
                    if(player.hasSkill(other)) player.removeSkill(other);
                    if(!player.hasSkill(form)) player.addSkill(form);
                    game.log(
                        player,
                        '将【双色发带】翻至',
                        form == 'baiSeFaDai' ?
                            '#g【白色发带】' : '#y【黑色发带】'
                    );
                },
                        "flip": function(player) {
                    var form = lib.skill.shuangSeFaDai.getForm(player);
                    lib.skill.shuangSeFaDai.setForm(
                        player,
                        form == 'heiSeFaDai' ?
                            'baiSeFaDai' : 'heiSeFaDai'
                    );
                },
                        "group": [
                            "shuangSeFaDai_chuShi",
                            "shuangSeFaDai_fanMian",
                        ],
                        "onremove": function(player) {
                    player.removeSkill('baiSeFaDai');
                    player.removeSkill('heiSeFaDai');
                },
                        "subSkill": {
                            "chuShi": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            lib.skill.shuangSeFaDai.setForm(
                                player,
                                'baiSeFaDai'
                            );
                        },
                            },
                            "fanMian": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "cost": async function(event, trigger, player) {
                            var current = lib.skill.shuangSeFaDai
                                .getForm(player);
                            var target = current == 'heiSeFaDai' ?
                                '【白色发带】' : '【黑色发带】';
                            event.result = await player.chooseBool(
                                '是否将【双色发带】翻至' + target + '？'
                            ).set('ai', function() {
                                var player = _status.event.player;
                                return player.zhiLiao <
                                    player.getZhiLiaoLimit();
                            }).forResult();
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.shuangSeFaDai.flip(player);
                        },
                            },
                        },
                    },
                    "qinLiYanLing": {
                        "group": [
                            "qinLiYanLing_zaoCheng",
                            "qinLiYanLing_chengShou",
                        ],
                        "subSkill": {
                            "zaoCheng": {
                                "trigger": {
                                    "source": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "usable": 1,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                !!event.player &&
                                !player.isZhiShiWuMax('qinLiLingLi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('qinLiLingLi', 1);
                        },
                            },
                            "chengShou": {
                                "trigger": {
                                    "player": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "usable": 1,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                !!event.source &&
                                event.source != player &&
                                !player.isZhiShiWuMax('qinLiLingLi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('qinLiLingLi', 1);
                        },
                            },
                        },
                    },
                    "lingLiShiKong": {
                        "trigger": {
                            "player": "changeZhiShiWuAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.zhiShiWu == 'qinLiLingLi' &&
                        event.num > 0 &&
                        player.countZhiShiWu('qinLiLingLi') >= 4;
                },
                        "content": async function(event, trigger, player) {
                    var form = lib.skill.shuangSeFaDai.getForm(player);
                    if(form == 'heiSeFaDai') {
                        lib.skill.shuangSeFaDai.setForm(
                            player,
                            'baiSeFaDai'
                        );
                        return;
                    }
                    lib.skill.shuangSeFaDai.setForm(
                        player,
                        'baiSeFaDai'
                    );
                    await player.faShuDamage(1, player);
                    if(player.isIn() &&
                        player.countZhiShiWu('qinLiLingLi') > 0) {
                        await player.removeZhiShiWu('qinLiLingLi', 1);
                    }
                },
                    },
                    "zhuoLanJianGui": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    if(!event || event.yingZhan == true) return false;
                    return player.hasSkill('yanMoXingTai') ||
                        player.countZhiShiWu('qinLiLingLi') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    var candidates = game.filterPlayer(function(current) {
                        return current.isIn() &&
                            current.side != player.side &&
                            current != trigger.target;
                    });
                    if(player.hasSkill('yanMoXingTai')) {
                        if(!candidates.length) {
                            var activate = await player.chooseBool(
                                '是否发动【灼烂歼鬼·斧】，令本次攻击伤害+1？'
                            ).set('ai', function() {
                                var player = _status.event.player;
                                var trigger = _status.event.getTrigger();
                                return !!trigger.target &&
                                    trigger.target.side != player.side &&
                                    get.damageEffect2(
                                        trigger.target, player, 1
                                    ) > 0;
                            }).forResult();
                            event.result = {
                                bool: !!activate.bool,
                                cost_data: {
                                    axe: true,
                                    cannon: false,
                                },
                            };
                            return;
                        }
                        var targets = await player.chooseTarget(
                            '是否发动【灼烂歼鬼】，选择炮击目标？',
                            function(card, player, target) {
                                var trigger = _status.event.getTrigger();
                                return target.side != player.side &&
                                    target != trigger.target;
                            }
                        ).set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                2
                            );
                        }).forResultTargets();
                        event.result = {
                            bool: targets.length > 0,
                            targets: targets,
                            cost_data: {
                                axe: true,
                                cannon: targets.length > 0,
                            },
                        };
                        return;
                    }
                    var controls = ['灼烂歼鬼·斧'];
                    if(candidates.length) controls.push('灼烂歼鬼·炮');
                    controls.push('cancel2');
                    var control = await player.chooseControl(controls)
                        .set('prompt', '是否发动【灼烂歼鬼】？')
                        .set('ai', function() {
                            return '灼烂歼鬼·斧';
                        })
                        .forResultControl();
                    if(!control || control == 'cancel2') {
                        event.result = { bool: false };
                        return;
                    }
                    if(control == '灼烂歼鬼·炮') {
                        var targets = await player.chooseTarget(
                            true,
                            '灼烂歼鬼·炮：指定攻击目标以外的一名对手',
                            function(card, player, target) {
                                var trigger = _status.event.getTrigger();
                                return target.side != player.side &&
                                    target != trigger.target;
                            }
                        ).set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                2
                            );
                        }).forResultTargets();
                        event.result = {
                            bool: targets.length > 0,
                            targets: targets,
                            cost_data: {
                                axe: false,
                                cannon: targets.length > 0,
                            },
                        };
                        return;
                    }
                    event.result = {
                        bool: true,
                        cost_data: {
                            axe: true,
                            cannon: false,
                        },
                    };
                },
                        "content": async function(event, trigger, player) {
                    if(!player.hasSkill('yanMoXingTai')) {
                        await player.removeZhiShiWu('qinLiLingLi', 1);
                    }
                    var data = event.cost_data || {};
                    if(data.axe) trigger.changeDamageNum(1);
                    if(data.cannon && event.targets && event.targets[0]) {
                        trigger.customArgs = trigger.customArgs || {};
                        trigger.customArgs.zhuoLanJianGuiPao =
                            event.targets[0].playerid;
                    }
                },
                        "group": "zhuoLanJianGui_pao",
                        "subSkill": {
                            "pao": {
                                "trigger": {
                                    "source": "gongJiMingZhongAfter",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                !!event.customArgs &&
                                !!event.customArgs.zhuoLanJianGuiPao;
                        },
                                "content": async function(event, trigger, player) {
                            var id = trigger.customArgs.zhuoLanJianGuiPao;
                            var target = game.players.find(function(current) {
                                return current.playerid == id;
                            });
                            if(target && target.isIn()) {
                                await target.faShuDamage(2, player);
                            }
                        },
                            },
                        },
                    },
                    "yanMoXianXian": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return !player.hasSkill('yanMoXingTai') &&
                        player.canBiShaShuiJing() &&
                        player.countZhiShiWu('qinLiLingLi') >= 3;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu('qinLiLingLi', 3);
                    player.addGongJi();
                    await player.hengZhi();
                    player.addSkill('yanMoXingTai');
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
                        },
                    },
                    "qinLiLingLi": {
                        "intro": {
                            "name": "灵力",
                            "content": "mark",
                            "max": 4,
                        },
                        "onremove": "storage",
                        "markimage": "extension/永夜残响/mark_qinLiLingLi.png",
                    },
                    "shenWeiLingZhuangShiFan": {
                        "getForm": function(player) {
                    if(player.hasSkill('aoShaGongJianRen')) {
                        return 'aoShaGongJianRen';
                    }
                    if(player.hasSkill('aoShaGongWangZuo')) {
                        return 'aoShaGongWangZuo';
                    }
                    return null;
                },
                        "setForm": function(player, form) {
                    if(!player ||
                        !['aoShaGongWangZuo', 'aoShaGongJianRen']
                            .includes(form)) return;
                    var other = form == 'aoShaGongWangZuo' ?
                        'aoShaGongJianRen' : 'aoShaGongWangZuo';
                    if(player.hasSkill(other)) player.removeSkill(other);
                    if(!player.hasSkill(form)) player.addSkill(form);
                },
                        "group": [
                            "shenWeiLingZhuangShiFan_chuShi",
                            "shenWeiLingZhuangShiFan_wangZuo",
                            "shenWeiLingZhuangShiFan_jianRen",
                        ],
                        "onremove": function(player) {
                    player.removeSkill('aoShaGongWangZuo');
                    player.removeSkill('aoShaGongJianRen');
                },
                        "subSkill": {
                            "chuShi": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "content": async function(event, trigger, player) {
                            lib.skill.shenWeiLingZhuangShiFan.setForm(
                                player,
                                'aoShaGongWangZuo'
                            );
                            await player.addZhiShiWu('shiXiangLingLi', 2);
                        },
                            },
                            "wangZuo": {
                                "trigger": {
                                    "player": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                player.hasSkill('aoShaGongWangZuo') &&
                                !player.isZhiShiWuMax('shiXiangLingLi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('shiXiangLingLi', 1);
                        },
                            },
                            "jianRen": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                player.hasSkill('aoShaGongJianRen') &&
                                !player.isZhiShiWuMax('shiXiangLingLi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('shiXiangLingLi', 1);
                        },
                            },
                        },
                    },
                    "wangZuoXianXian": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan == true &&
                        player.hasSkill('aoShaGongWangZuo') &&
                        player.countZhiShiWu('shiXiangLingLi') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除1【灵力】发动【王座显现】，令本次应战攻击伤害额外+1？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        return !!trigger.target &&
                            trigger.target.side != player.side &&
                            get.damageEffect2(
                                trigger.target, player, 1
                            ) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('shiXiangLingLi', 1);
                    trigger.changeDamageNum(1);
                    trigger.customArgs = trigger.customArgs || {};
                    trigger.customArgs.wangZuoXianXian = true;
                },
                        "group": "wangZuoXianXian_jieShu",
                        "subSkill": {
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                event.yingZhan == true &&
                                !!event.target &&
                                !!event.customArgs &&
                                event.customArgs.wangZuoXianXian === true;
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.shenWeiLingZhuangShiFan.setForm(
                                player,
                                'aoShaGongJianRen'
                            );
                        },
                            },
                        },
                    },
                    "lingZhuangHuBi": {
                        "trigger": {
                            "player": "chengShouShangHaiBefore",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        player.hasSkill('aoShaGongWangZuo');
                },
                        "cost": async function(event, trigger, player) {
                    var max = Math.min(
                        2,
                        trigger.num,
                        player.countZhiShiWu('shiXiangLingLi'),
                        player.countCards('he', function(card) {
                            return lib.filter.cardDiscardable(card, player);
                        })
                    );
                    var controls = [];
                    for(var i = 0; i <= max; i++) {
                        controls.push('X=' + i);
                    }
                    controls.push('cancel2');
                    var control = await player.chooseControl(controls)
                        .set('prompt', '是否发动【灵装护壁】？')
                        .set('ai', function() {
                            var trigger = _status.event.getTrigger();
                            var player = _status.event.player;
                            var max = Math.min(
                                2,
                                trigger.num,
                                player.countZhiShiWu('shiXiangLingLi'),
                                player.countCards('he')
                            );
                            return 'X=' + max;
                        })
                        .forResultControl();
                    var x = control && control.startsWith('X=') ?
                        parseInt(control.slice(2)) : -1;
                    event.result = {
                        bool: x >= 0,
                        cost_data: x,
                    };
                },
                        "content": async function(event, trigger, player) {
                    var x = Math.max(0, event.cost_data || 0);
                    if(x > 0) {
                        await player.removeZhiShiWu('shiXiangLingLi', x);
                        await player.chooseToDiscard(
                            'he',
                            x,
                            true,
                            '灵装护壁：弃置' + x + '张牌'
                        );
                        trigger.changeDamageNum(-x);
                    }
                },
                    },
                    "gongZhuJiangLin": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.hasSkill('aoShaGongWangZuo') &&
                        player.countZhiShiWu('shiXiangLingLi') > 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('shiXiangLingLi', 1);
                    lib.skill.shenWeiLingZhuangShiFan.setForm(
                        player,
                        'aoShaGongJianRen'
                    );
                    player.addGongJi();
                },
                        "ai": {
                            "order": function(item, player) {
                    if(!player.countCards('h', function(card) {
                        return get.type(card, player) == 'gongJi';
                    })) return 0;
                    return game.hasPlayer(function(target) {
                        return target.side != player.side;
                    }) ? 4 : 0;
                },
                            "result": {
                                "player": 1,
                            },
                        },
                    },
                    "aoShaGong": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        event.aoShaGongZuiHouZhiJian !== true &&
                        !player.hasSkill('zuiHouZhiJianXingDong') &&
                        player.hasSkill('aoShaGongJianRen') &&
                        player.countZhiShiWu('shiXiangLingLi') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    var controls = ['X=1'];
                    if(player.countZhiShiWu('shiXiangLingLi') >= 2) {
                        controls.push('X=2');
                    }
                    controls.push('cancel2');
                    var control = await player.chooseControl(controls)
                        .set('prompt', '是否发动【鏖杀公】？')
                        .set('ai', function() {
                            var player = _status.event.player;
                            return player.countZhiShiWu('shiXiangLingLi') >= 2 ?
                                'X=2' : 'X=1';
                        })
                        .forResultControl();
                    var x = control == 'X=2' ? 2 :
                        (control == 'X=1' ? 1 : 0);
                    event.result = {
                        bool: x > 0,
                        cost_data: x,
                    };
                },
                        "content": async function(event, trigger, player) {
                    var x = event.cost_data;
                    await player.removeZhiShiWu('shiXiangLingLi', x);
                    trigger.changeDamageNum(1);
                    if(x == 2) trigger.wuFaYingZhan();
                    trigger.customArgs = trigger.customArgs || {};
                    trigger.customArgs.aoShaGong = true;
                },
                        "group": "aoShaGong_jieShu",
                        "subSkill": {
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                !!event.customArgs &&
                                event.customArgs.aoShaGong === true &&
                                player.countZhiShiWu('shiXiangLingLi') == 0 &&
                                player.hasSkill('aoShaGongJianRen');
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.shenWeiLingZhuangShiFan.setForm(
                                player,
                                'aoShaGongWangZuo'
                            );
                        },
                            },
                        },
                    },
                    "huangDouFenMianBao": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing() &&
                        player.countCards('he', function(card) {
                            return lib.filter.cardDiscardable(card, player);
                        }) > 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.chooseToDiscard(
                        'he',
                        1,
                        true,
                        '黄豆粉面包：弃置1张牌'
                    );
                    var control = await player.chooseControl([
                        '+1【治疗】',
                        '+2【灵力】',
                    ]).set('prompt', '黄豆粉面包：选择一项')
                        .set('ai', function() {
                            var player = _status.event.player;
                            return player.zhiLiao <
                                player.getZhiLiaoLimit() ?
                                '+1【治疗】' : '+2【灵力】';
                        })
                        .forResultControl();
                    if(control == '+1【治疗】') {
                        await player.changeZhiLiao(1, player);
                    } else {
                        await player.addZhiShiWu('shiXiangLingLi', 2);
                    }
                },
                        "check": function(event, player) {
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return player.zhiLiao < player.getZhiLiaoLimit() ||
                        player.countZhiShiWu('shiXiangLingLi') < 5;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "aoShaGongZuiHouZhiJian": {
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "filter": function(event, player) {
                    if(!event ||
                        event.aoShaGongZuiHouZhiJian === true ||
                        player.hasSkill('zuiHouZhiJianXingDong') ||
                        !player.hasSkill('aoShaGongJianRen') ||
                        player.countZhiShiWu('shiXiangLingLi') < 3 ||
                        !player.canBiShaBaoShi()) return false;
                    var phase = event.getParent &&
                        event.getParent('xingDong');
                    return !!phase &&
                        phase.name == 'xingDong' &&
                        phase.player == player;
                },
                        "cost": async function(event, trigger, player) {
                    var activate = await player.chooseBool(
                        '是否发动【鏖杀公·最后之剑】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var hasAttack = player.countCards('h', function(card) {
                            return get.type(card, player) == 'gongJi';
                        }) > 0;
                        if(!hasAttack) return false;
                        var enemies = game.filterPlayer(function(target) {
                            return target.side != player.side;
                        });
                        if(!enemies.length) return false;
                        var maxHand = Math.max.apply(null, enemies.map(
                            function(target) {
                                return target.countCards('h');
                            }
                        ));
                        return enemies.length >= 2 || maxHand >= 2 ||
                            get.shiQi(!player.side) <= 3;
                    }).forResult();
                    if(!activate.bool) {
                        event.result = { bool: false };
                        return;
                    }
                    var all = ['剑锋', '斩空', '剑压'];
                    var first = await player.chooseControl(all)
                        .set('prompt', '最后之剑：选择第一项效果')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var enemies = game.filterPlayer(function(target) {
                                return target.side != player.side;
                            });
                            var maxHand = enemies.reduce(function(max, target) {
                                return Math.max(max, target.countCards('h'));
                            }, 0);
                            var scores = {
                                '剑锋': 1.5,
                                '斩空': maxHand >= 3 ? 2.4 : 1.1,
                                '剑压': Math.max(0, enemies.length - 1) * 1.4,
                            };
                            return _status.event.controls.slice().sort(
                                function(a, b) {
                                    return scores[b] - scores[a];
                                }
                            )[0];
                        })
                        .forResultControl();
                    var remaining = all.filter(function(current) {
                        return current != first;
                    });
                    var second = await player.chooseControl(remaining)
                        .set('prompt', '最后之剑：选择第二项效果')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var enemies = game.filterPlayer(function(target) {
                                return target.side != player.side;
                            });
                            var maxHand = enemies.reduce(function(max, target) {
                                return Math.max(max, target.countCards('h'));
                            }, 0);
                            var scores = {
                                '剑锋': 1.5,
                                '斩空': maxHand >= 3 ? 2.4 : 1.1,
                                '剑压': Math.max(0, enemies.length - 1) * 1.4,
                            };
                            return _status.event.controls.slice().sort(
                                function(a, b) {
                                    return scores[b] - scores[a];
                                }
                            )[0];
                        })
                        .forResultControl();
                    event.result = {
                        bool: !!first && !!second,
                        cost_data: [first, second],
                    };
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    await player.removeZhiShiWu('shiXiangLingLi', 3);
                    var effects = event.cost_data.slice();
                    if(!Array.isArray(player.storage.extraXingDong)) {
                        player.storage.extraXingDong = [];
                    }
                    player.storage.aoShaGongZuiHouZhiJianEffects =
                        effects.slice();
                    player.addSkill('zuiHouZhiJianXingDong');
                    game.log(
                        player,
                        '为【鏖杀公·最后之剑】选择了',
                        '#y【' + effects[0] + '】',
                        '和',
                        '#y【' + effects[1] + '】'
                    );
                    player.storage.extraXingDong.push({
                        xingDong: 'gongJi',
                        aoShaGongZuiHouZhiJian: true,
                        aoShaGongZuiHouZhiJianEffects: effects.slice(),
                    });
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "shiXiangLingLi": {
                        "intro": {
                            "name": "灵力",
                            "content": "mark",
                            "max": 5,
                        },
                        "onremove": "storage",
                        "markimage": "extension/永夜残响/mark_shiXiangLingLi.png",
                    },
                    "shenWeiLingZhuangSiFan": {
                        "trigger": {
                            "global": "gameStart",
                            "player": "teShuEnd",
                        },
                        "forced": true,
                        "filter": function(event, player, name) {
                    if(name == 'gameStart') {
                        return !player.isZhiShiWuMax('siMiNaiBingJing');
                    }
                    return !player.isZhiShiWuMax('siMiNaiBingJing');
                },
                        "content": async function(event, trigger, player) {
                    var num = event.triggername == 'gameStart' ? 2 : 1;
                    await player.addZhiShiWu('siMiNaiBingJing', num);
                },
                    },
                    "bingJieTuXi": {
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                    return lib.filter.cardDiscardable(card, player) &&
                        ['shui', 'guang'].includes(get.xiBie(card));
                },
                        "filter": function(event, player) {
                    if(!player.countCards('h', function(card) {
                        return lib.skill.bingJieTuXi.filterCard(card, player);
                    })) return false;
                    return game.hasPlayer(function(current) {
                        return current.side != player.side &&
                            current.countZhiShiWu('siMiNaiDongJie') == 0;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side &&
                        target.countZhiShiWu('siMiNaiDongJie') == 0;
                },
                        "content": async function(event, trigger, player) {
                    var target = event.target;
                    await target.faShuDamage(1, player);
                    if(target && target.isIn()) {
                        await lib.skill.siMiNaiDongJie.addDongJie(player, target);
                    }
                },
                        "ai": {
                            "order": 3.5,
                            "result": {
                                "target": function(player, target) {
                            return get.damageEffect(target, 1) - 1;
                        },
                            },
                        },
                    },
                    "bingZhiShouHu": {
                        "trigger": {
                            "global": "chengShouShangHaiBefore",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        event.player &&
                        event.player != player &&
                        event.player.side == player.side;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【冰之守护】，摸1张牌并令' +
                        get.translation(trigger.player) +
                        '受到的伤害-1？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        if(player.countCards('h') + 1 >
                            player.getHandcardLimit()) return false;
                        return get.attitude(
                            player,
                            _status.event.getTrigger().player
                        ) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.draw(1);
                    trigger.changeDamageNum(-1);
                },
                    },
                    "siMiNaiDeEZuoJu": {
                        "trigger": {
                            "global": "shouDaoGongJiBefore",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.target == player &&
                        event.player &&
                        event.player != player &&
                        event.yingZhan != true &&
                        player.countZhiShiWu('siMiNaiBingJing') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除1【冰晶】，发动【四糸奈的恶作剧】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var attacker = trigger && trigger.player;
                        if(!attacker || attacker.side == player.side) {
                            return false;
                        }
                        var xiBie = get.xiBie(trigger.card);
                        return player.countCards('h', function(card) {
                            return get.type(card, player) == 'gongJi' &&
                                (get.xiBie(card) == xiBie ||
                                    get.xiBie(card) == 'an');
                        }) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('siMiNaiBingJing', 1);
                    trigger.customArgs = trigger.customArgs || {};
                    trigger.customArgs.siMiNaiDeEZuoJu = player.playerid;
                },
                        "group": "siMiNaiDeEZuoJu_weiMingZhong",
                        "subSkill": {
                            "weiMingZhong": {
                                "trigger": {
                                    "global": "gongJiWeiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.yingZhan != true &&
                                event.player == player &&
                                event.source &&
                                event.source != player &&
                                event.customArgs &&
                                event.customArgs.siMiNaiDeEZuoJu == player.playerid;
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill.siMiNaiDongJie.addDongJie(
                                player,
                                trigger.source
                            );
                        },
                            },
                        },
                    },
                    "bingZhiQiYuan": {
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "useCard": true,
                        "filterCard": function(card) {
                    return !!card &&
                        typeof card.hasDuYou == 'function' &&
                        (
                            card.hasDuYou('zhiLiaoShu') ||
                            card.hasDuYou('zhiYuZhiGuang')
                        );
                },
                        "filter": function(event, player) {
                    if(!player.hasCard(function(card) {
                        return lib.skill.bingZhiQiYuan.filterCard(card);
                    }, 'h')) return false;
                    return game.hasPlayer(function(current) {
                        if(current == player) {
                            return current.countCards('h') > 1;
                        }
                        return current.countCards('h') > 0;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    if(target == player) {
                        return target.countCards('h') > 1;
                    }
                    return target.countCards('h') > 0;
                },
                        "content": async function(event, trigger, player) {
                    var target = event.target;
                    var cards = await target.chooseCard(
                        'h',
                        1,
                        '冰之祈愿：选择1张手牌',
                        true
                    ).set('ai', function(card) {
                        var xiBie = get.xiBie(card);
                        if(['shui', 'guang'].includes(xiBie)) {
                            return 7 - get.value(card);
                        }
                        return 5 - get.value(card);
                    }).forResultCards();
                    if(!cards.length) return;
                    var card = cards[0];
                    var enhanced = ['shui', 'guang'].includes(get.xiBie(card));
                    if(enhanced) {
                        await target.showCards(
                            [card],
                            '冰之祈愿：展示水系或光系牌'
                        );
                    }
                    await target.changeZhiLiao(enhanced ? 2 : 1, player);
                    await target.discard([card]).set('visible', true);
                    await player.addZhiShiWu('siMiNaiBingJing', 1);
                },
                        "ai": {
                            "order": 3.4,
                            "result": {
                                "target": function(player, target) {
                            if(target.side != player.side) return 0;
                            return get.zhiLiaoEffect2(target, player, 1) - 0.5;
                        },
                            },
                        },
                    },
                    "bingJieKuiLeiSaDan": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing() &&
                        player.countZhiShiWu('siMiNaiBingJing') >= 3;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu('siMiNaiBingJing', 3);
                    var control = await player.chooseControl([
                        '冰结结界',
                        '极寒风暴',
                    ]).set('prompt', '冰结傀儡·撒旦：选择一项发动')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var weakAllies = game.countPlayer(function(current) {
                                return current.side == player.side &&
                                    current.zhiLiao < current.getZhiLiaoLimit();
                            });
                            return weakAllies >= 2 ? '冰结结界' : '极寒风暴';
                        })
                        .forResultControl();
                    if(control == '冰结结界') {
                        var allies = game.filterPlayer(function(current) {
                            return current.side == player.side;
                        }).sortBySeat(player);
                        for(var target of allies) {
                            if(!target.isIn()) continue;
                            var canDiscard = target.countCards('he', function(card) {
                                return lib.filter.cardDiscardable(card, target);
                            }) > 0;
                            var canHeal = target.zhiLiao < target.getZhiLiaoLimit();
                            if(!canDiscard && !canHeal) continue;
                            var choice;
                            if(canDiscard && canHeal) {
                                choice = await target.chooseControl([
                                    '弃置1张牌',
                                    '+1【治疗】',
                                ]).set('prompt', '冰结结界：选择一项')
                                    .set('ai', function() {
                                        return '+1【治疗】';
                                    })
                                    .forResultControl();
                            } else {
                                choice = canHeal ? '+1【治疗】' : '弃置1张牌';
                            }
                            if(choice == '+1【治疗】') {
                                await target.changeZhiLiao(1, player);
                            } else {
                                await target.chooseToDiscard(
                                    'he',
                                    1,
                                    true,
                                    '冰结结界：弃置1张牌'
                                );
                            }
                        }
                    } else {
                        var targets = await player.chooseTarget(
                            [1, 2],
                            true,
                            '极寒风暴：指定1至2名对手',
                            function(card, player, target) {
                                return target.side != player.side;
                            }
                        ).set('ai', function(target) {
                            var count = target.countZhiShiWu('siMiNaiDongJie');
                            return -get.attitude(_status.event.player, target) +
                                count * 2;
                        }).forResultTargets();
                        for(var target of targets) {
                            await lib.skill.siMiNaiDongJie.addDongJie(
                                player,
                                target
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
                    return game.hasPlayer(function(current) {
                        return current.side != player.side &&
                            current.countZhiShiWu('siMiNaiDongJie') > 0;
                    }) || game.countPlayer(function(current) {
                        return current.side == player.side &&
                            current.zhiLiao < current.getZhiLiaoLimit();
                    }) >= 2;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "siMiNaiBingJing": {
                        "charlotte": true,
                        "intro": {
                            "name": "冰晶",
                            "content": "mark",
                            "max": 5,
                        },
                        "onremove": "storage",
                        "markimage": "extension/永夜残响/mark_siMiNaiBingJing.png",
                    },
                    "siMiNaiDongJie": {
                        "charlotte": true,
                        "intro": {
                            "name": "(专)【冻结】",
                            "content": "mark",
                            "max": 2,
                        },
                        "markimage": "extension/永夜残响/mark_siMiNaiDongJie.png",
                        "global": [
                            "siMiNaiDongJie_gongJi",
                            "siMiNaiDongJie_faShu",
                        ],
                        "addDongJie": async function(source, target) {
                    if(!target || !target.isIn()) return;
                    if(target.countZhiShiWu('siMiNaiDongJie') >= 2) return;
                    target.storage.siMiNaiDongJieSource =
                        source && source.playerid ? source.playerid : null;
                    target.syncStorage('siMiNaiDongJieSource');
                    await target.addZhiShiWu('siMiNaiDongJie', 1, true);
                    if(target.countZhiShiWu('siMiNaiDongJie') >= 2) {
                        var sourceId = target.storage.siMiNaiDongJieSource;
                        var damageSource = game.players.find(function(current) {
                            return current.playerid == sourceId;
                        });
                        if(damageSource) {
                            await target.faShuDamage(2, damageSource);
                        } else {
                            await target.faShuDamage(2, 'nosource');
                        }
                        await lib.skill.siMiNaiDongJie.clearDongJie(target);
                    }
                },
                        "clearDongJie": async function(target) {
                    if(!target) return;
                    var num = target.countZhiShiWu('siMiNaiDongJie');
                    if(num > 0) {
                        await target.removeZhiShiWu('siMiNaiDongJie', num);
                    }
                    delete target.storage.siMiNaiDongJieSource;
                    target.syncStorage('siMiNaiDongJieSource');
                },
                        "isExtraAction": function(event, action, player) {
                    if(!event || typeof event.getParent != 'function') {
                        return false;
                    }
                    var phase = event.getParent('xingDong');
                    if(!phase || phase.name != 'xingDong') return false;
                    if(!player ||
                        event.player != player ||
                        phase.player != player ||
                        event.yingZhan === true) {
                        return false;
                    }
                    if(event.extraXingDongType == action) return true;
                    if(event.action !== true) return false;
                    return phase.xingDong == action;
                },
                        "cancelExtraAction": async function(trigger, player) {
                    await lib.skill.siMiNaiDongJie.clearDongJie(player);
                    var phase = trigger.getParent('xingDong');
                    if(phase && phase.name == 'xingDong') {
                        phase.skipped = true;
                    }
                    trigger.cancel();
                    game.log(player, '的额外行动被【冻结】取消，本回合结束');
                },
                        "onremove": function(player) {
                    delete player.storage.siMiNaiDongJie;
                    delete player.storage.siMiNaiDongJieSource;
                },
                        "subSkill": {
                            "gongJi": {
                                "trigger": {
                                    "player": "gongJiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "filter": function(event, player) {
                            return player.countZhiShiWu('siMiNaiDongJie') == 1 &&
                                lib.skill.siMiNaiDongJie.isExtraAction(
                                    event,
                                    'gongJi',
                                    player
                                );
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill.siMiNaiDongJie.cancelExtraAction(
                                trigger,
                                player
                            );
                        },
                            },
                            "faShu": {
                                "trigger": {
                                    "player": "faShuBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "filter": function(event, player) {
                            return player.countZhiShiWu('siMiNaiDongJie') == 1 &&
                                lib.skill.siMiNaiDongJie.isExtraAction(
                                    event,
                                    'faShu',
                                    player
                                );
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill.siMiNaiDongJie.cancelExtraAction(
                                trigger,
                                player
                            );
                        },
                            },
                        },
                    },
                    "keKeDi": {
                        "trigger": {
                            "source": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !!event.player &&
                        event.player.isIn() &&
                        !event.player.isZhiShiWuMax('shiCha');
                },
                        "content": async function(event, trigger, player) {
                    await trigger.player.addZhiShiWu('shiCha', 1, true);
                },
                    },
                    "baZhiDan": {
                        "trigger": {
                            "player": "chengShouShangHaiBefore",
                        },
                        "forced": true,
                        "firstDo": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !player.isZhiShiWuMax('shiCha');
                },
                        "content": async function(event, trigger, player) {
                    trigger.changeDamageNum(-1);
                    await player.addZhiShiWu('shiCha', 1, true);
                },
                    },
                    "yiZhiDan": {
                        "trigger": {
                            "global": "shouDaoGongJiBefore",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        !!event.player &&
                        !!event.target &&
                        event.player.side == player.side &&
                        event.target.side != player.side &&
                        event.target.countZhiShiWu('shiCha') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除' + get.translation(trigger.target) +
                            '的1【时差】，发动【一之弹】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var attack = _status.event.getTrigger();
                        if(!attack || !attack.target) return false;
                        var target = attack.target;
                        var source = attack.player;
                        var targetWillOverflow = target.countCards('h') + 1 >
                            target.getHandcardLimit();
                        if(source == player) {
                            return targetWillOverflow ||
                                get.damageEffect2(target, player, 1) > 0;
                        }
                        if(player.countCards('h') + 2 >
                            player.getHandcardLimit()) return false;
                        return targetWillOverflow &&
                            get.attitude(player, source) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var source = trigger.player;
                    var target = trigger.target;
                    await target.removeZhiShiWu('shiCha', 1);
                    await target.draw(1);
                    trigger.changeDamageNum(1);
                    if(source != player) {
                        await player.faShuDamage(
                            2,
                            player,
                            'nocard'
                        );
                        if(source && source.isIn()) {
                            await source.addZhiShiWu('shiCha', 2, true);
                        }
                    }
                },
                    },
                    "erZhiDan": {
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "lastDo": true,
                        "priority": -100,
                        "filter": function(event, player) {
                    return !!event &&
                        !!event.target &&
                        (!event.customArgs ||
                            !event.customArgs.shiQiKuangSanMingZhong);
                },
                        "cost": async function(event, trigger, player) {
                    if(trigger.customArgs &&
                        trigger.customArgs.shiQiKuangSanMingZhong) {
                        event.result = { bool: false };
                        return;
                    }
                    var damage = Math.max(
                        0,
                        typeof trigger.damageNum == 'number' ?
                            trigger.damageNum : 0
                    );
                    var result = await player.chooseBool(
                        '是否发动【二之弹】，取消本次攻击伤害并放置' +
                        (damage + 1) + '【时差】？'
                    ).set('ai', function() {
                        var trigger = _status.event.getTrigger();
                        var target = trigger.target;
                        var damage = Math.max(
                            0,
                            typeof trigger.damageNum == 'number' ?
                                trigger.damageNum : 0
                        );
                        var capacity = Math.max(
                            0,
                            5 - target.countZhiShiWu('shiCha')
                        );
                        return capacity > 0;
                    }).forResult();
                    event.result = {
                        bool: !!result.bool,
                        cost_data: damage,
                    };
                },
                        "content": async function(event, trigger, player) {
                    trigger.customArgs = trigger.customArgs || {};
                    if(trigger.customArgs.shiQiKuangSanMingZhong) return;
                    trigger.customArgs.shiQiKuangSanMingZhong = 'erZhiDan';
                    var damage = Math.max(0, event.cost_data || 0);
                    trigger.setDamageNum(0);
                    if(trigger.target && trigger.target.isIn()) {
                        await trigger.target.addZhiShiWu(
                            'shiCha',
                            damage + 1,
                            true
                        );
                    }
                },
                    },
                    "siZhiDan": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.countZhiShiWu('shiCha') >= 2;
                },
                        "content": async function(event, trigger, player) {
                    var controls = ['1'];
                    if(player.countZhiShiWu('shiCha') >= 4) {
                        controls.push('2');
                    }
                    var control = await player.chooseControl(controls)
                        .set('prompt', '四之弹：选择X，移除2X【时差】并获得X【治疗】')
                        .set('ai', function() {
                            var player = _status.event.player;
                            if(player.countZhiShiWu('shiCha') >= 4 &&
                                player.zhiLiao + 1 <
                                    player.getZhiLiaoLimit()) {
                                return '2';
                            }
                            return '1';
                        })
                        .forResultControl();
                    var count = parseInt(control);
                    if(count != 1 && count != 2) return;
                    await player.removeZhiShiWu('shiCha', count * 2);
                    await player.changeZhiLiao(count, player);
                },
                        "ai": {
                            "order": 3.7,
                            "result": {
                                "player": function(player) {
                            return player.zhiLiao <
                                player.getZhiLiaoLimit() ? 2 : 0.2;
                        },
                            },
                        },
                    },
                    "qiZhiDan": {
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "lastDo": true,
                        "priority": -100,
                        "filter": function(event, player) {
                    return !!event &&
                        !!event.target &&
                        event.target.countZhiShiWu('shiJianJingZhi') == 0 &&
                        (!event.customArgs ||
                            !event.customArgs.shiQiKuangSanMingZhong);
                },
                        "cost": async function(event, trigger, player) {
                    if(trigger.customArgs &&
                        trigger.customArgs.shiQiKuangSanMingZhong) {
                        event.result = { bool: false };
                        return;
                    }
                    event.result = await player.chooseBool(
                        '是否受到2点法术伤害，对' +
                        get.translation(trigger.target) +
                        '发动【七之弹】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        if(target.countZhiShiWu('shiCha') >= 4) return false;
                        return player.countZhiShiWu('shiCha') < 5 ||
                            player.countZhiLiao() > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    trigger.customArgs = trigger.customArgs || {};
                    if(trigger.customArgs.shiQiKuangSanMingZhong) return;
                    trigger.customArgs.shiQiKuangSanMingZhong = 'qiZhiDan';
                    await player.faShuDamage(
                        2,
                        player,
                        'nocard'
                    );
                    if(trigger.target &&
                        trigger.target.isIn() &&
                        trigger.target.countZhiShiWu('shiJianJingZhi') == 0) {
                        await trigger.target.addZhiShiWu(
                            'shiJianJingZhi',
                            1,
                            true
                        );
                    }
                },
                    },
                    "shiShiZhiCheng": {
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
                    var targets = game.players.slice().sortBySeat(player);
                    for(var target of targets) {
                        if(target && target.isIn()) {
                            await target.faShuDamage(
                                1,
                                player,
                                'nocard'
                            );
                        }
                    }
                    if(usedBaoShi) {
                        for(var target of targets) {
                            if(target && target.isIn()) {
                                await target.addZhiShiWu(
                                    'shiCha',
                                    1,
                                    true
                                );
                            }
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
                    var score = 0;
                    game.countPlayer(function(target) {
                        score += get.damageEffect2(target, player, 1);
                    });
                    return score > 0;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "shiCha": {
                        "charlotte": true,
                        "intro": {
                            "name": "时差",
                            "content": "mark",
                            "max": 5,
                        },
                        "markimage": "extension/永夜残响/mark_shiCha.png",
                        "global": "shiCha_huiHe",
                        "subSkill": {
                            "huiHe": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.countZhiShiWu('shiCha') > 0 &&
                                event.shiJianJingZhiSkipShiCha !== true;
                        },
                                "content": async function(event, trigger, player) {
                            var count = player.countZhiShiWu('shiCha');
                            if(count >= 5) {
                                await player.removeZhiShiWu('shiCha', count);
                                await player.draw(3);
                            } else {
                                await player.removeZhiShiWu('shiCha', 1);
                                await player.draw(1);
                            }
                        },
                            },
                        },
                    },
                    "shiJianJingZhi": {
                        "charlotte": true,
                        "intro": {
                            "name": "专属卡【时间静止】",
                            "content": "拥有者回合结束时，移除【时间静止】并+1【时差】；若增加后【时差】未达到上限，本次不结算【时差】。",
                            "max": 1,
                        },
                        "markimage": "extension/永夜残响/mark_shiJianJingZhi.png",
                        "global": "shiJianJingZhi_huiHe",
                        "subSkill": {
                            "huiHe": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.countZhiShiWu('shiJianJingZhi') > 0;
                        },
                                "content": async function(event, trigger, player) {
                            var count = player.countZhiShiWu('shiJianJingZhi');
                            await player.removeZhiShiWu('shiJianJingZhi', count);
                            await player.addZhiShiWu('shiCha', 1, true);
                            if(player.countZhiShiWu('shiCha') < 5) {
                                trigger.shiJianJingZhiSkipShiCha = true;
                            }
                        },
                            },
                        },
                    },
                    "baiSeFaDai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "白",
                        "intro": {
                            "name": "专属【白色发带】",
                            "content": "你的【治疗】上限+1；你可以发动【妹妹形态】。",
                        },
                        "group": "meiMeiXingTai",
                        "mod": {
                            "maxZhiLiao": function(player, num) {
                        return num + 1;
                    },
                        },
                    },
                    "heiSeFaDai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "黑",
                        "intro": {
                            "name": "专属【黑色发带】",
                            "content": "你可以发动【司令形态】与【司令调度】。",
                        },
                        "group": [
                            "siLingXingTai",
                            "siLingDiaoDu",
                        ],
                    },
                    "yanMoXingTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "炎",
                        "intro": {
                            "name": "炎魔形态",
                            "content": "发动【灼烂歼鬼】无需移除【灵力】，斧与炮同时生效；攻击每造成一次实际伤害，+1【治疗】。",
                        },
                        "group": [
                            "yanMoXingTai_zhiLiao",
                            "yanMoXingTai_qingChu",
                        ],
                        "subSkill": {
                            "zhiLiao": {
                                "trigger": {
                                    "source": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                event.faShu !== true &&
                                !!event.card &&
                                get.type(event.card) == 'gongJi';
                        },
                                "content": async function(event, trigger, player) {
                            await player.changeZhiLiao(1, player);
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "content": async function(event, trigger, player) {
                            await player.chongZhi();
                            player.removeSkill('yanMoXingTai');
                        },
                            },
                        },
                    },
                    "aoShaGongWangZuo": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "座",
                        "intro": {
                            "name": "专属【鏖杀公·王座形态】",
                            "content": "承受实际伤害后，+1【灵力】；可以发动王座形态技能。",
                        },
                    },
                    "aoShaGongJianRen": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "剑",
                        "intro": {
                            "name": "专属【鏖杀公·剑刃形态】",
                            "content": "攻击命中后，+1【灵力】；可以发动剑刃形态技能。",
                        },
                    },
                    "zuiHouZhiJianXingDong": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "终",
                        "intro": {
                            "name": "鏖杀公·最后之剑",
                            "content": function(storage, player) {
                        var effects =
                            player.storage.aoShaGongZuiHouZhiJianEffects ||
                            [];
                        return '下一次额外【攻击行动】获得：' +
                            effects.join('、');
                    },
                        },
                        "cleanup": function(player) {
                    delete player.storage.aoShaGongZuiHouZhiJianEffects;
                    lib.skill.shenWeiLingZhuangShiFan.setForm(
                        player,
                        'aoShaGongWangZuo'
                    );
                    player.removeSkill('zuiHouZhiJianXingDong');
                },
                        "group": [
                            "zuiHouZhiJianXingDong_sheZhi",
                            "zuiHouZhiJianXingDong_jieShu",
                            "zuiHouZhiJianXingDong_xingDongJieShu",
                            "zuiHouZhiJianXingDong_houBeiQingChu",
                        ],
                        "onremove": function(player) {
                    delete player.storage.aoShaGongZuiHouZhiJianEffects;
                },
                        "subSkill": {
                            "sheZhi": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "firstDo": true,
                                "filter": function(event, player) {
                            if(!event) return false;
                            var action = event.getParent &&
                                event.getParent('gongJi');
                            return !!action &&
                                action.name == 'gongJi' &&
                                action.player == player &&
                                action.aoShaGongZuiHouZhiJian === true;
                        },
                                "content": function(event, trigger, player) {
                            var action = trigger.getParent &&
                                trigger.getParent('gongJi');
                            var effects =
                                action &&
                                    action
                                        .aoShaGongZuiHouZhiJianEffects ||
                                player.storage
                                    .aoShaGongZuiHouZhiJianEffects ||
                                [];
                            trigger.aoShaGongZuiHouZhiJian = true;
                            trigger.aoShaGongZuiHouZhiJianEffects =
                                effects.slice();
                            if(effects.includes('剑锋')) {
                                trigger.changeDamageNum(1);
                            }
                            if(effects.includes('斩空')) {
                                trigger.wuFaYingZhan();
                            }
                        },
                            },
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.aoShaGongZuiHouZhiJian === true;
                        },
                                "content": async function(event, trigger, player) {
                            var effects =
                                trigger.aoShaGongZuiHouZhiJianEffects ||
                                player.storage
                                    .aoShaGongZuiHouZhiJianEffects ||
                                [];
                            if(effects.includes('剑压') &&
                                trigger.target) {
                                var targets = game.filterPlayer(
                                    function(current) {
                                        return current.side != player.side &&
                                            current != trigger.target;
                                    }
                                ).sortBySeat(player);
                                for(var target of targets) {
                                    if(target.isIn()) {
                                        await target.faShuDamage(2, player);
                                    }
                                }
                            }
                            lib.skill.zuiHouZhiJianXingDong.cleanup(player);
                        },
                            },
                            "xingDongJieShu": {
                                "trigger": {
                                    "player": "gongJiAfter",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                event.name == 'gongJi' &&
                                event.aoShaGongZuiHouZhiJian === true &&
                                player.hasSkill(
                                    'zuiHouZhiJianXingDong'
                                );
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.zuiHouZhiJianXingDong.cleanup(player);
                        },
                            },
                            "houBeiQingChu": {
                                "trigger": {
                                    "player": "xingDongEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'zuiHouZhiJianXingDong'
                            );
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.zuiHouZhiJianXingDong.cleanup(player);
                        },
                            },
                        },
                    },
                    "meiMeiXingTai": {
                        "trigger": {
                            "player": "chengShouShangHaiAfter",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !!event.source &&
                        event.source != player;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【妹妹形态】，弃置1张牌并+1【治疗】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        if(player.countZhiLiao() >=
                            player.getZhiLiaoLimit()) return false;
                        var cards = player.getCards('he').filter(
                            function(card) {
                                return lib.filter.cardDiscardable(card, player);
                            }
                        );
                        if(!cards.length) return true;
                        return Math.min.apply(null, cards.map(function(card) {
                            return get.value(card);
                        })) < 7;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    if(player.countCards('he', function(card) {
                        return lib.filter.cardDiscardable(card, player);
                    }) > 0) {
                        await player.chooseToDiscard(
                            'he',
                            1,
                            true,
                            '妹妹形态：弃置1张牌'
                        );
                    }
                    await player.changeZhiLiao(1, player);
                },
                    },
                    "siLingXingTai": {
                        "trigger": {
                            "global": [
                                "gongJiEnd",
                                "faShuEnd",
                            ],
                        },
                        "filter": function(event, player, name) {
                    if(!event || !event.player ||
                        event.player == player ||
                        event.player.side != player.side ||
                        player.countZhiShiWu('qinLiLingLi') < 2) {
                        return false;
                    }
                    var phase = event.getParent &&
                        event.getParent('xingDong');
                    if(!phase || phase.name != 'xingDong' ||
                        phase.player != event.player) return false;
                    return name == 'gongJiEnd' || name == 'faShuEnd';
                },
                        "cost": async function(event, trigger, player) {
                    var type = event.triggername == 'gongJiEnd' ?
                        '攻击行动' : '法术行动';
                    event.result = await player.chooseBool(
                        '是否移除2【灵力】，令' +
                        get.translation(trigger.player) +
                        '额外+1【' + type + '】？'
                    ).set('ai', function() {
                        return get.attitude(
                            _status.event.player,
                            _status.event.getTrigger().player
                        ) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('qinLiLingLi', 2);
                    var target = trigger.player;
                    if(!Array.isArray(target.storage.extraXingDong)) {
                        target.storage.extraXingDong = [];
                    }
                    var action = event.triggername == 'gongJiEnd' ?
                        'gongJi' : 'faShu';
                    target.storage.extraXingDong.push({
                        xingDong: action,
                        qinLiSiLingXingTai: true,
                    });
                    game.log(
                        target,
                        '因',
                        player,
                        '的【司令形态】额外获得1个【' +
                            (action == 'gongJi' ?
                                '攻击行动' : '法术行动') +
                            '】'
                    );
                    lib.skill.shuangSeFaDai.flip(player);
                },
                    },
                    "siLingDiaoDu": {
                        "trigger": {
                            "global": "drawAfter",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    if(!event || !event.player ||
                        event.player == player ||
                        event.player.side != player.side) return false;
                    var target = event.player;
                    return player.countCards('he', function(card) {
                        return lib.filter.cardDiscardable(card, player);
                    }) > 0 && target.countCards('he', function(card) {
                        return lib.filter.cardDiscardable(card, target);
                    }) > 0;
                },
                        "cost": async function(event, trigger, player) {
                    var cards = await player.chooseCard(
                        'he',
                        1,
                        '是否弃置1张牌，对' +
                            get.translation(trigger.player) +
                            '发动【司令调度】？'
                    ).set('filterCard', function(card, player) {
                        return lib.filter.cardDiscardable(card, player);
                    }).set('ai', function(card) {
                        return 6 - get.value(card);
                    }).forResultCards();
                    cards = Array.isArray(cards) ? cards : [];
                    event.result = {
                        bool: cards.length > 0,
                        cards: cards,
                    };
                },
                        "content": async function(event, trigger, player) {
                    var target = trigger.player;
                    await player.discard(event.cards);
                    if(target && target.isIn() &&
                        target.countCards('he', function(card) {
                            return lib.filter.cardDiscardable(card, target);
                        }) > 0) {
                        await target.chooseToDiscard(
                            'he',
                            1,
                            true,
                            '司令调度：弃置1张牌'
                        );
                        if(target.isIn()) await target.draw(1);
                    }
                },
                    },
                },
                "translate": {
                    "siMiNaiBingJing": "冰晶",
                    "siMiNaiBingJing_info": "<span class='lan'>【冰晶】</span>为四糸乃专属指示物，上限为5。",
                    "siMiNaiDongJie": "(专)【冻结】",
                    "siMiNaiDongJie_info": "<span class='lan'>【冻结】</span>为专属卡式计数指示物，每名角色上限为2。1层时，拥有者将要开始额外的【攻击行动】或【法术行动】，移除其所有【冻结】，取消该额外行动并结束其回合；增加至2层时，四糸乃对其造成2点法术伤害③，然后移除其所有【冻结】。",
                    "shenWeiLingZhuangSiFan": "被动【神威灵装·四番】",
                    "shenWeiLingZhuangSiFan_info": "游戏开始时，+2<span class='lan'>【冰晶】</span>；<span class='tiaoJian'>（你发动【冰之祈愿】或执行【特殊行动】后）</span>+1<span class='lan'>【冰晶】</span>。",
                    "bingJieTuXi": "法术【冰结吐息】",
                    "bingJieTuXi_info": "<span class='tiaoJian'>（弃置1张水系或光系牌【展示】，指定一名没有【冻结】的对手）</span>对其造成1点法术伤害③，然后在其面前放置1<span class='lan'>【冻结】</span>。",
                    "bingZhiShouHu": "响应【冰之守护】",
                    "bingZhiShouHu_info": "<span class='tiaoJian'>（一名其他我方角色即将承受伤害时④）</span>你摸1张牌【强制】，使其受到的伤害-1。",
                    "siMiNaiDeEZuoJu": "响应【四糸奈的恶作剧】",
                    "siMiNaiDeEZuoJu_info": "<span class='tiaoJian'>（你成为其他角色主动攻击的目标时①，移除1<span class='lan'>【冰晶】</span>）</span>若本次攻击未命中，在攻击者面前放置1<span class='lan'>【冻结】</span>。",
                    "bingZhiQiYuan": "法术【冰之祈愿】【独】",
                    "bingZhiQiYuan_info": "你可以将带有独有技【治疗术】或【治愈之光】的手牌作为【冰之祈愿】使用。选择一名有手牌的角色，该角色+1【治疗】并弃置1张牌；若其以此法弃置水系或光系牌【展示】，改为+2【治疗】。",
                    "bingJieKuiLeiSaDan": "启动【冰结傀儡·撒旦】",
                    "bingJieKuiLeiSaDan_info": "【水晶】×1，移除3<span class='lan'>【冰晶】</span>，选择一项：<br>·【冰结结界】：所有我方角色各必须选择当前可以执行的一项：弃置1张牌；或+1【治疗】。两项均不能执行则无效果。<br>·【极寒风暴】：指定1至2名对手，分别在其面前放置1<span class='lan'>【冻结】</span>。",
                    "shiCha": "时差",
                    "shiCha_info": "<span class='hong'>【时差】</span>为时崎狂三的专属指示物，每名角色上限为5。拥有者回合结束时：若未达到上限，移除1<span class='hong'>【时差】</span>并摸1张牌【强制】；若已达到上限，改为移除所有<span class='hong'>【时差】</span>并摸3张牌【强制】。",
                    "shiJianJingZhi": "(专)【时间静止】",
                    "shiJianJingZhi_info": "拥有者回合结束时，移除【时间静止】并+1<span class='hong'>【时差】</span>；若增加后<span class='hong'>【时差】</span>未达到上限，本次不结算<span class='hong'>【时差】</span>。",
                    "keKeDi": "被动【刻刻帝】",
                    "keKeDi_info": "<span class='tiaoJian'>（你对一名角色，包括你自己，造成实际伤害后⑤）</span>在其面前放置1<span class='hong'>【时差】</span>。",
                    "baZhiDan": "被动【八之弹】",
                    "baZhiDan_info": "<span class='tiaoJian'>（你承受伤害时④，若你面前的<span class='hong'>【时差】</span>未达到上限）</span>本次伤害-1，并在你面前放置1<span class='hong'>【时差】</span>【强制】；即使本次伤害因此减至0，仍放置<span class='hong'>【时差】</span>。",
                    "yiZhiDan": "响应【一之弹】",
                    "yiZhiDan_info": "<span class='tiaoJian'>（一名我方角色主动攻击拥有<span class='hong'>【时差】</span>的对手时①，移除该对手的1<span class='hong'>【时差】</span>）</span>该对手摸1张牌【强制】，本次攻击伤害额外+1；若攻击来源不是你，你受到2点法术伤害③，然后在攻击来源面前放置2<span class='hong'>【时差】</span>。",
                    "erZhiDan": "响应【二之弹】",
                    "erZhiDan_info": "<span class='tiaoJian'>（你的攻击命中后②）</span>取消本次攻击伤害，改为在攻击目标面前放置X+1<span class='hong'>【时差】</span>，X为本次攻击原本将实际造成的伤害值；超过上限的部分舍弃。X为0时仍可发动并放置1<span class='hong'>【时差】</span>。不能与【七之弹】同时发动。",
                    "siZhiDan": "法术【四之弹】",
                    "siZhiDan_info": "选择X为1或2，移除你面前的2X<span class='hong'>【时差】</span>，然后+X【治疗】。你达到【治疗】上限时仍可发动并移除<span class='hong'>【时差】</span>。",
                    "qiZhiDan": "响应【七之弹】",
                    "qiZhiDan_info": "<span class='tiaoJian'>（你的攻击命中后②，若攻击目标没有【时间静止】）</span>对你造成2点法术伤害③，将【时间静止】放置于攻击目标面前。不能与【二之弹】同时发动。",
                    "shiShiZhiCheng": "启动【噬时之城】",
                    "shiShiZhiCheng_info": "【水晶】×1。对全场所有角色各造成1点法术伤害③；若本次实际消耗的是【宝石】，在上述伤害全部结算后，再在所有角色面前各放置1<span class='hong'>【时差】</span>。",
                    "qinLiLingLi": "灵力",
                    "qinLiLingLi_info": "<span class='hong'>【灵力】</span>为五河琴里专属指示物，上限为4。",
                    "shuangSeFaDai": "被动【双色发带】",
                    "shuangSeFaDai_info": "游戏开始时，将【双色发带】以【白色发带】一面放置于你的面前。你的回合开始时，可以将【双色发带】翻面。<br><br><span class='greentext'>【白色发带】</span><br>你的【治疗】上限+1。<br>响应【妹妹形态】【回合限定】：承受其他角色造成的实际伤害后⑤，可以发动；若你有可弃置牌，弃置1张牌，然后+1【治疗】。没有可弃置牌或已达到【治疗】上限时仍可发动。<br><br><span class='yellowtext'>【黑色发带】</span><br>响应【司令形态】：一名队友的【攻击行动】或【法术行动】结束后，可以移除2<span class='hong'>【灵力】</span>，将1个相同类型的行动加入该队友的额外行动列表，然后将【双色发带】翻面。<br>响应【司令调度】【回合限定】：一名有可弃置牌的队友因任意原因摸牌后，可以弃置1张牌，令该队友弃置1张牌，然后该队友摸1张牌。",
                    "baiSeFaDai": "(专)【白色发带】",
                    "baiSeFaDai_info": "你的【治疗】上限+1。<br><span class='tiaoJian'>（承受其他角色造成的实际伤害后⑤；回合限定）</span>可以发动【妹妹形态】：若你有可弃置牌，弃置1张牌；然后+1【治疗】。没有可弃置牌或已达到治疗上限时仍可发动。",
                    "heiSeFaDai": "(专)【黑色发带】",
                    "heiSeFaDai_info": "<span class='tiaoJian'>（一名队友的【攻击行动】或【法术行动】结束后）</span>可以移除2<span class='hong'>【灵力】</span>，令其获得1个相同类型的额外行动，然后将发带翻面。<br><span class='tiaoJian'>（一名有可弃置牌的队友摸牌后；回合限定）</span>可以弃置1张牌，令该队友弃置1张牌，然后重新摸1张牌。",
                    "qinLiYanLing": "被动【炎灵】",
                    "qinLiYanLing_info": "以下两项每回合各限一次：<br>·你造成实际伤害后，+1<span class='hong'>【灵力】</span>，对自己造成的伤害也包括在内；<br>·你承受其他角色造成的实际伤害后⑤，+1<span class='hong'>【灵力】</span>。",
                    "lingLiShiKong": "被动【灵力失控】",
                    "lingLiShiKong_info": "<span class='tiaoJian'>（你的<span class='hong'>【灵力】</span>达到上限时）</span>立即将【双色发带】翻至【白色发带】；若已经是【白色发带】，你承受1点法术伤害③，然后移除1<span class='hong'>【灵力】</span>。",
                    "zhuoLanJianGui": "响应【灼烂歼鬼】",
                    "zhuoLanJianGui_info": "<span class='tiaoJian'>（主动攻击前，移除1<span class='hong'>【灵力】</span>）</span>选择一项：<br>·【斧】：本次攻击伤害额外+1；<br>·【炮】：指定攻击目标以外的一名对手，若本次攻击命中，额外对其造成2点法术伤害③。<br>【炎魔形态】下无需移除<span class='hong'>【灵力】</span>，斧与炮同时生效；没有合法炮目标时只结算斧。",
                    "yanMoXianXian": "启动【炎魔显现】",
                    "yanMoXianXian_info": "【水晶】×1，移除3<span class='hong'>【灵力】</span>，额外+1【攻击行动】，然后【横置】并进入【炎魔形态】直到本回合结束。",
                    "yanMoXingTai": "炎魔形态",
                    "yanMoXingTai_info": "发动【灼烂歼鬼】无需移除<span class='hong'>【灵力】</span>且斧、炮同时生效；主动攻击或应战攻击每产生一个独立的实际伤害事件，+1【治疗】。本回合结束时【重置】并退出该状态。",
                    "meiMeiXingTai": "响应【妹妹形态】",
                    "meiMeiXingTai_info": "<span class='tiaoJian'>（处于【白色发带】，承受其他角色造成的实际伤害后⑤；回合限定）</span>若有可弃置牌，弃置1张牌；然后+1【治疗】。",
                    "siLingXingTai": "响应【司令形态】",
                    "siLingXingTai_info": "<span class='tiaoJian'>（处于【黑色发带】，一名队友的【攻击行动】或【法术行动】结束后）</span>可以移除2<span class='hong'>【灵力】</span>，将1个相同类型的行动加入该队友的额外行动列表，然后将【双色发带】翻面。",
                    "siLingDiaoDu": "响应【司令调度】",
                    "siLingDiaoDu_info": "<span class='tiaoJian'>（处于【黑色发带】，一名有可弃置牌的队友摸牌后；回合限定）</span>可以弃置1张牌，令该队友弃置1张牌，然后该队友摸1张牌。",
                    "shiXiangLingLi": "灵力",
                    "shiXiangLingLi_info": "<span class='lan'>【灵力】</span>为夜刀神十香专属指示物，上限为5；游戏开始时获得2<span class='lan'>【灵力】</span>。",
                    "shenWeiLingZhuangShiFan": "被动【神威灵装·十番】",
                    "shenWeiLingZhuangShiFan_info": "游戏开始时，将【鏖杀公】以【王座形态】一面放置于面前，并获得2<span class='lan'>【灵力】</span>。【王座形态】下承受实际伤害后⑤，+1<span class='lan'>【灵力】</span>；【剑刃形态】下攻击命中后②，+1<span class='lan'>【灵力】</span>。",
                    "aoShaGongWangZuo": "(专)【鏖杀公·王座形态】",
                    "aoShaGongWangZuo_info": "承受实际伤害后⑤，+1<span class='lan'>【灵力】</span>；可以发动【王座显现】【灵装护壁】与【公主降临】。",
                    "aoShaGongJianRen": "(专)【鏖杀公·剑刃形态】",
                    "aoShaGongJianRen_info": "攻击命中后②，+1<span class='lan'>【灵力】</span>；可以发动【鏖杀公】与【鏖杀公·最后之剑】。",
                    "wangZuoXianXian": "响应【王座显现】",
                    "wangZuoXianXian_info": "<span class='tiaoJian'>（处于【王座形态】，应战攻击前，移除1<span class='lan'>【灵力】</span>）</span>本次应战攻击伤害额外+1；若命中，攻击结算结束后将【鏖杀公】翻至【剑刃形态】。",
                    "lingZhuangHuBi": "响应【灵装护壁】",
                    "lingZhuangHuBi_info": "<span class='tiaoJian'>（处于【王座形态】，即将承受伤害时④）</span>选择X，0≤X≤2且不能超过本次伤害；移除X<span class='lan'>【灵力】</span>并弃置X张牌，使本次伤害-X。X=0时可以发动。",
                    "gongZhuJiangLin": "法术【公主降临】",
                    "gongZhuJiangLin_info": "<span class='tiaoJian'>（处于【王座形态】，移除1<span class='lan'>【灵力】</span>）</span>将【鏖杀公】翻至【剑刃形态】，然后额外+1【攻击行动】。",
                    "aoShaGong": "响应【鏖杀公】",
                    "aoShaGong_info": "<span class='tiaoJian'>（处于【剑刃形态】，主动攻击前）</span>选择并移除X<span class='lan'>【灵力】</span>：X=1，本次攻击伤害额外+1；X=2，本次攻击伤害额外+1且无法被应战。该攻击行动结束后，若<span class='lan'>【灵力】</span>为0，将【鏖杀公】翻至【王座形态】。",
                    "huangDouFenMianBao": "启动【黄豆粉面包】",
                    "huangDouFenMianBao_info": "【水晶】×1，弃置1张牌，选择一项：+1【治疗】；或+2<span class='lan'>【灵力】</span>。达到对应上限时仍可选择，溢出无效。",
                    "aoShaGongZuiHouZhiJian": "响应【鏖杀公·最后之剑】",
                    "aoShaGongZuiHouZhiJian_info": "【宝石】×1。<span class='tiaoJian'>（处于【剑刃形态】，【攻击行动】结束后，移除3<span class='lan'>【灵力】</span>）</span>从【剑锋】【斩空】【剑压】中选择两项，然后额外+1【攻击行动】。该额外行动不能发动普通【鏖杀公】或再次发动本技能；主动攻击获得所选效果：剑锋令伤害额外+1；斩空令攻击无法被应战；剑压在命中并结算攻击后，对攻击目标外所有对手各造成2点法术伤害③。行动结束后翻至【王座形态】并清除效果。",
                    "zuiHouZhiJianXingDong": "鏖杀公·最后之剑",
                    "zuiHouZhiJianXingDong_info": "下一次额外【攻击行动】获得最后之剑所选择的两项效果；该行动结束或被取消后翻至【王座形态】并清除效果。",
                },
            },
            "intro": "添加角色五河琴里、夜刀神十香、四糸乃、时崎狂三。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "1.0",
        },
        "files": {
            "character": [
                "wHeQingLi.jpg",
                "shiXiang.jpg",
                "siMiNai.jpg",
                "shiQiKuangSan.jpg",
            ],
            "card": [],
            "skill": [
                "mark_qinLiLingLi.png",
                "mark_shiXiangLingLi.png",
                "mark_siMiNaiBingJing.png",
                "mark_siMiNaiDongJie.png",
                "mark_shiCha.png",
                "mark_shiJianJingZhi.png",
            ],
            "audio": [],
        },
        "connect": true,
    };
});
