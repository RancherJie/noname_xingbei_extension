game.import("extension", function(lib, game, ui, get, ai, _status) {
    return {
        "name": "电啸龙吟",
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
                    "naiLong": [
                        null,
                        "shengGroup",
                        3,
                        [
                            "woShiNaiLong",
                            "buShiZhuangTangShiZhenTang",
                            "naiLongDaXiao",
                        ],
                        [
                            "des:总会以出人意料的方式打乱战局的显眼包。奶龙让角色因其技能弃牌后获得治疗，也能在受到攻击时用摸牌结果改变应战与伤害。",
                            "ext:电啸龙吟/naiLong.jpg",
                        ],
                    ],
                    "dianGunOtto": [
                        null,
                        "xueGroup",
                        3.5,
                        [
                            "baiYinWanQi",
                            "shuaiOttoShuai",
                            "zunNiHuoJia",
                            "dianGunShengJing",
                            "hongWen",
                            "fangGuan",
                        ],
                        [
                            "des:在伤害与失控之间不断升温的红温主播。电棍Otto会把承受的伤害积累为红温，并在白银晚期状态下将怒火倾泻给所有对手。",
                            "ext:电啸龙吟/otto.jpg",
                        ],
                    ],
                    "yongChuTaFei": [
                        null,
                        "shengGroup",
                        4.5,
                        [
                            "suanFaTuiJian",
                            "guoQiZhuBao",
                            "guanZhuTaFeiMiao",
                            "qianShiHeiTaoYing",
                            "qianShiYiBaoShuTiaoXiXi",
                            "yuanShengYao",
                            "yongChuTaFeiLiuLiang",
                            "yongChuTaFeiShuTiao",
                        ],
                        [
                            "des:追逐热榜与流量的王牌主包。永雏塔菲会记录全场最后完成的行动类型，以薯条储存手牌，并在热度达到顶点时连续开启新的完整回合。",
                            "ext:电啸龙吟/yongChuTaFei.jpg",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "电啸龙吟": "电啸龙吟",
                    "naiLong": "奶龙",
                    "dianGunOtto": "电棍Otto",
                    "yongChuTaFei": "永雏塔菲",
                },
            },
            "card": {
                "card": {},
                "translate": {},
                "list": [],
            },
            "skill": {
                "skill": {
                    "woShiNaiLong": {
                        "isNaiLongDiscard": function(event, player) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 8) {
                        if(current.naiLongSkillSource == player.playerid) {
                            return true;
                        }
                        current = current.getParent && current.getParent();
                        guard++;
                    }
                    return false;
                },
                        "group": [
                            "woShiNaiLong_qiPaiZhiLiao",
                            "woShiNaiLong_gongJiMingZhong",
                        ],
                        "subSkill": {
                            "qiPaiZhiLiao": {
                                "trigger": {
                                    "global": "discard",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                !!event.player &&
                                event.nun > 0 &&
                                lib.skill.woShiNaiLong
                                    .isNaiLongDiscard(event, player);
                        },
                                "content": async function(event, trigger, player) {
                            await trigger.player.changeZhiLiao(1, player);
                        },
                            },
                            "gongJiMingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "filter": function(event, player) {
                            return game.hasPlayer(function(current) {
                                return current != player &&
                                    current.side == player.side &&
                                    current.countCards('h', function(card) {
                                        return lib.filter.cardDiscardable(
                                            card,
                                            current
                                        );
                                    }) > 0;
                            });
                        },
                                "cost": async function(event, trigger, player) {
                            event.result = await player.chooseTarget(
                                '【我是奶龙】：可以令一名其他队友弃置1张手牌',
                                function(card, player, target) {
                                    return target != player &&
                                        target.side == player.side &&
                                        target.countCards('h', function(card) {
                                            return lib.filter.cardDiscardable(
                                                card,
                                                target
                                            );
                                        }) > 0;
                                }
                            ).set('ai', function(target) {
                                return get.attitude(
                                    _status.event.player,
                                    target
                                ) > 0 ? 1 : 0;
                            }).forResult();
                        },
                                "content": async function(event, trigger, player) {
                            var target = event.targets[0];
                            if(!target || !target.isIn()) return;
                            var next = target.chooseToDiscard(
                                'h',
                                1,
                                true,
                                '【我是奶龙】：弃置1张手牌'
                            ).set('filterCard', function(card, target) {
                                return lib.filter.cardDiscardable(card, target);
                            }).set('naiLongSkillSource', player.playerid);
                            await next;
                        },
                            },
                        },
                    },
                    "buShiZhuangTangShiZhenTang": {
                        "trigger": {
                            "global": "shouDaoGongJiBefore",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.target == player &&
                        !!event.player &&
                        event.player != player;
                },
                        "content": async function(event, trigger, player) {
                    var bonus = Math.max(1, player.needsToDiscard(1));
                    player.storage.naiLongLinShiShouPai = bonus;
                    player.addSkill('naiLongLinShiShouPai');

                    var cards = [];
                    try {
                        cards = await player.draw(1).forResult();
                        if(cards.length) {
                            await player.showCards(
                                cards,
                                '【不是装唐，是真唐】：展示摸到的牌'
                            );
                            var card = cards[0];
                            if(get.xiBie(card) == get.xiBie(trigger.card)) {
                                trigger.wuFaYingZhan();
                            } else {
                                await player.discard([card])
                                    .set(
                                        'naiLongSkillSource',
                                        player.playerid
                                    );
                                trigger.changeDamageNum(-1);
                            }
                        }
                    } finally {
                        player.removeSkill('naiLongLinShiShouPai');
                    }

                    var overflow = player.qiPai();
                    if(overflow) {
                        overflow.set(
                            'naiLongSkillSource',
                            player.playerid
                        );
                        await overflow;
                    }
                },
                    },
                    "naiLongDaXiao": {
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    var targets = [];
                    var current = player;
                    var guard = 0;
                    do {
                        targets.push(current);
                        current = current.getNext();
                        guard++;
                    } while(
                        current &&
                        current != player &&
                        guard < game.players.length
                    );

                    for(var target of targets) {
                        if(!target || !target.isIn()) continue;
                        if(target.countCards('h', function(card) {
                            return lib.filter.cardDiscardable(card, target);
                        }) <= 0) continue;
                        var next = target.chooseToDiscard(
                            'h',
                            1,
                            true,
                            '【奶龙大笑】：弃置1张手牌'
                        ).set('filterCard', function(card, target) {
                            return lib.filter.cardDiscardable(card, target);
                        }).set('naiLongSkillSource', player.playerid);
                        await next;
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
                        if(target.countCards('h') <= 0) return;
                        var needsHealing = target.zhiLiao <
                            target.getZhiLiaoLimit();
                        if(target.side == player.side) {
                            score += needsHealing ? 1 : 0.2;
                        } else {
                            score += needsHealing ? 0 : 0.8;
                        }
                    });
                    return score >= 1.5;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "baiYinWanQi": {
                        "enterState": async function(player, relatedEvent) {
                    if(!player || player.hasSkill('baiYinWanQiZhuangTai')) {
                        return;
                    }
                    var count = player.countZhiShiWu('hongWen');
                    if(count > 0) {
                        await player.removeZhiShiWu('hongWen', count);
                    }
                    var actionPhase = relatedEvent &&
                        typeof relatedEvent.getParent == 'function' &&
                        relatedEvent.getParent('xingDong');
                    player.storage.baiYinWanQiSkipCurrent =
                        !!actionPhase &&
                        actionPhase.name == 'xingDong' &&
                        actionPhase.player == player;
                    player.addSkill('baiYinWanQiZhuangTai');
                    await player.hengZhi();
                },
                        "trigger": {
                            "player": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !player.hasSkill('baiYinWanQiZhuangTai') &&
                        !player.isZhiShiWuMax('hongWen');
                },
                        "content": async function(event, trigger, player) {
                    await player.addZhiShiWu('hongWen', 1);
                    if(player.countZhiShiWu('hongWen') >= 3) {
                        await lib.skill.baiYinWanQi.enterState(
                            player,
                            trigger
                        );
                    }
                },
                        "group": "baiYinWanQi_zhuCeFangGuan",
                        "subSkill": {
                            "zhuCeFangGuan": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "content": function() {
                            [
                                'fangGuan',
                                'fangGuan_gongJiJieShu',
                                'fangGuan_xingDongJieShu',
                            ].forEach(function(skill) {
                                game.addGlobalSkill(skill);
                            });
                        },
                            },
                        },
                    },
                    "shuaiOttoShuai": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event && event.yingZhan != true;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【帅otto帅】，对自己造成1点法术伤害并令本次攻击伤害额外+2？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var selfDamage = player.hasSkill(
                            'baiYinWanQiZhuangTai'
                        ) ? 3 : 1;
                        var score = get.damageEffect2(
                            target, player, 2
                        ) + get.damageEffect2(
                            player, player, selfDamage
                        );
                        if(player.countZhiShiWu('hongWen') >= 2 &&
                            !player.hasSkill('baiYinWanQiZhuangTai')) {
                            score += 1.2;
                        }
                        return score > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.faShuDamage(1, player);
                    trigger.changeDamageNum(2);
                },
                    },
                    "zunNiHuoJia": {
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
                    if(!player.countCards('h', function(card) {
                        return lib.skill.zunNiHuoJia
                            .filterCard(card, player);
                    })) return false;
                    return game.hasPlayer(function(current) {
                        return current.side != player.side &&
                            current.countZhiShiWu('fangGuan') == 0;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side &&
                        target.countZhiShiWu('fangGuan') == 0;
                },
                        "content": async function(event, trigger, player) {
                    var target = event.target;
                    target.storage.fangGuanSource = player.playerid;
                    target.syncStorage('fangGuanSource');
                    await target.addZhiShiWu('fangGuan', 1, true);
                    if(target.countZhiShiWu('fangGuan') == 0) {
                        delete target.storage.fangGuanSource;
                        target.syncStorage('fangGuanSource');
                    }
                },
                        "ai": {
                            "order": 3.5,
                            "result": {
                                "target": -1,
                            },
                        },
                    },
                    "dianGunShengJing": {
                        "trigger": {
                            "player": "changeShiQiEnd",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.player == player &&
                        event.num < 0 &&
                        event.cause == 'damage' &&
                        player.hasSkill('baiYinWanQiZhuangTai') &&
                        player.canBiShaBaoShi() &&
                        game.hasPlayer(function(current) {
                            return current.side != player.side;
                        });
                },
                        "cost": async function(event, trigger, player) {
                    var targets = await player.chooseTarget(
                        '是否发动【电棍圣经】，指定一名对手？',
                        function(card, player, target) {
                            return target.side != player.side;
                        }
                    ).set('ai', function(target) {
                        return get.damageEffect2(
                            target,
                            _status.event.player,
                            Math.max(
                                1,
                                -_status.event.getTrigger().num
                            )
                        );
                    }).forResultTargets();
                    event.result = {
                        bool: targets.length > 0,
                        targets: targets,
                        cost_data: Math.max(0, -trigger.num),
                    };
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    var primary = event.targets[0];
                    var damage = Math.max(0, event.cost_data || 0);
                    if(primary && primary.isIn()) {
                        await primary.faShuDamage(damage, player);
                    }
                    var others = game.filterPlayer(function(current) {
                        return current.side != player.side &&
                            current != primary;
                    }).sortBySeat(player);
                    for(var target of others) {
                        if(target.isIn()) {
                            await target.faShuDamage(1, player);
                        }
                    }
                    await player.chongZhi();
                    player.removeSkill('baiYinWanQiZhuangTai');
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "hongWen": {
                        "intro": {
                            "name": "红温",
                            "content": "mark",
                            "max": 3,
                        },
                        "onremove": "storage",
                        "markimage": "extension/电啸龙吟/mark_hongWen.png",
                    },
                    "fangGuan": {
                        "charlotte": true,
                        "intro": {
                            "name": "专属卡【房管】",
                            "content": "下个行动阶段内首次主动攻击只能指定电棍Otto；攻击行动结束后移除。行动阶段结束时仍存在，则电棍Otto对拥有者造成2点法术伤害。",
                            "max": 1,
                        },
                        "markimage": "extension/电啸龙吟/mark_fangGuan.png",
                        "mod": {
                            "playerEnabled": function(card, source, target) {
                        if(!source ||
                            source.countZhiShiWu('fangGuan') == 0 ||
                            get.type(card) != 'gongJi') return;
                        var current = _status.event;
                        var guard = 0;
                        while(current && guard < 20) {
                            if(current.name == '_yingZhan') return;
                            if(typeof current.getParent != 'function') break;
                            var parent = current.getParent();
                            if(!parent || parent == current) break;
                            current = parent;
                            guard++;
                        }
                        var id = source.storage.fangGuanSource;
                        var otto = game.players.find(function(current) {
                            return current.playerid == id;
                        });
                        if(!otto || !otto.isIn() || target != otto) {
                            return false;
                        }
                    },
                        },
                        "onremove": function(player) {
                    delete player.storage.fangGuan;
                    delete player.storage.fangGuanSource;
                    player.syncStorage('fangGuanSource');
                },
                        "subSkill": {
                            "gongJiJieShu": {
                                "trigger": {
                                    "global": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!event || !event.player ||
                                event.player.countZhiShiWu('fangGuan') == 0 ||
                                event.yingZhan == true) return false;
                            var phase = event.getParent &&
                                event.getParent('xingDong');
                            return !!phase &&
                                phase.name == 'xingDong' &&
                                phase.player == event.player;
                        },
                                "content": async function(event, trigger, player) {
                            var holder = trigger.player;
                            var count = holder.countZhiShiWu('fangGuan');
                            if(count > 0) {
                                await holder.removeZhiShiWu(
                                    'fangGuan',
                                    count
                                );
                            }
                            delete holder.storage.fangGuanSource;
                            holder.syncStorage('fangGuanSource');
                        },
                            },
                            "xingDongJieShu": {
                                "trigger": {
                                    "global": "xingDongEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                !!event.player &&
                                event.player.countZhiShiWu('fangGuan') > 0;
                        },
                                "content": async function(event, trigger, player) {
                            var holder = trigger.player;
                            var id = holder.storage.fangGuanSource;
                            var source = game.players.find(function(current) {
                                return current.playerid == id;
                            });
                            if(holder.isIn()) {
                                if(source && source.isIn()) {
                                    await holder.faShuDamage(2, source);
                                } else {
                                    await holder.faShuDamage(2, 'nosource');
                                }
                            }
                            var count = holder.countZhiShiWu('fangGuan');
                            if(count > 0) {
                                await holder.removeZhiShiWu(
                                    'fangGuan',
                                    count
                                );
                            }
                            delete holder.storage.fangGuanSource;
                            holder.syncStorage('fangGuanSource');
                        },
                            },
                        },
                    },
                    "baiYinWanQiZhuangTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "温",
                        "intro": {
                            "name": "白银晚期",
                            "content": "造成和承受的伤害额外+1，不能获得【红温】；持续到下个行动阶段结束。",
                        },
                        "group": [
                            "baiYinWanQiZhuangTai_zaoCheng",
                            "baiYinWanQiZhuangTai_chengShou",
                            "baiYinWanQiZhuangTai_jinZhiHongWen",
                            "baiYinWanQiZhuangTai_qingChu",
                        ],
                        "onremove": function(player) {
                    delete player.storage.baiYinWanQiSkipCurrent;
                },
                        "subSkill": {
                            "zaoCheng": {
                                "trigger": {
                                    "source": "zaoChengShangHai",
                                },
                                "forced": true,
                                "firstDo": true,
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
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        },
                            },
                            "jinZhiHongWen": {
                                "trigger": {
                                    "player": "changeZhiShiWuBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                event.zhiShiWu == 'hongWen' &&
                                event.num > 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.num = 0;
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "xingDongEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "content": async function(event, trigger, player) {
                            if(player.storage.baiYinWanQiSkipCurrent) {
                                player.storage.baiYinWanQiSkipCurrent = false;
                                return;
                            }
                            await player.chongZhi();
                            player.removeSkill('baiYinWanQiZhuangTai');
                        },
                            },
                        },
                    },
                    "suanFaTuiJian": {
                        "hotSkill": function(type) {
                    return {
                        gongJi: 'gongJiReBang',
                        faShu: 'faShuReBang',
                        teShu: 'teShuReBang',
                    }[type];
                },
                        "isCompletedAction": function(event) {
                    if(!event || !event.player) return false;
                    var triggername = event.triggername || event.name;
                    if(triggername == 'gongJiEnd' &&
                        event.yingZhan == true) {
                        return false;
                    }
                    if(triggername == 'gongJiEnd' ||
                        triggername == 'faShuEnd') {
                        if(get.is && get.is.xingDong &&
                            get.is.xingDong(event)) return true;
                        var phase = event.getParent &&
                            event.getParent('xingDong');
                        return !!phase && phase.player == event.player &&
                            phase.name == 'xingDong';
                    }
                    if(triggername == 'teShuEnd') return true;
                    return false;
                },
                        "actionType": function(event) {
                    if(!event) return null;
                    var triggername = event.triggername || event.name;
                    if(triggername == 'gongJiEnd') return 'gongJi';
                    if(triggername == 'faShuEnd') return 'faShu';
                    if(triggername == 'teShuEnd') return 'teShu';
                    return null;
                },
                        "setHot": async function(player, type) {
                    var old = player.storage.yongChuTaFeiReBang;
                    var oldSkill = lib.skill.suanFaTuiJian.hotSkill(old);
                    if(oldSkill && player.countZhiShiWu(oldSkill) > 0) {
                        await player.removeZhiShiWu(
                            oldSkill,
                            player.countZhiShiWu(oldSkill)
                        );
                    }
                    player.storage.yongChuTaFeiReBang = type;
                    player.syncStorage('yongChuTaFeiReBang');
                    var skill = lib.skill.suanFaTuiJian.hotSkill(type);
                    if(skill) await player.addZhiShiWu(skill, 1, true);
                },
                        "clearHot": async function(player) {
                    var old = player.storage.yongChuTaFeiReBang;
                    var skill = lib.skill.suanFaTuiJian.hotSkill(old);
                    if(skill && player.countZhiShiWu(skill) > 0) {
                        await player.removeZhiShiWu(
                            skill,
                            player.countZhiShiWu(skill)
                        );
                    }
                    delete player.storage.yongChuTaFeiReBang;
                    player.syncStorage('yongChuTaFeiReBang');
                },
                        "trigger": {
                            "global": "phaseEnd",
                        },
                        "forced": true,
                        "priority": 10,
                        "filter": function(event, player) {
                    return !!event.player &&
                        !!event.player.storage.yongChuTaFeiLastAction;
                },
                        "content": async function(event, trigger, player) {
                    var actor = trigger.player;
                    var type = actor.storage.yongChuTaFeiLastAction;
                    var hot = player.storage.yongChuTaFeiReBang;
                    if(!hot) {
                        await lib.skill.suanFaTuiJian.setHot(player, type);
                        return;
                    }
                    if(hot != type) {
                        if(actor != player &&
                            player.countZhiShiWu(
                                'yongChuTaFeiLiuLiang'
                            ) >= 3) {
                            player.logSkill('guanZhuTaFeiMiao', actor);
                            await actor.faShuDamage(2, player);
                        } else {
                            await lib.skill.suanFaTuiJian.setHot(
                                player,
                                type
                            );
                        }
                        return;
                    }
                    if(actor != player) {
                        await player.addZhiShiWu(
                            'yongChuTaFeiLiuLiang',
                            1
                        );
                        await actor.changeZhiLiao(1, player);
                    }
                },
                        "group": [
                            "suanFaTuiJian_jiLu",
                            "suanFaTuiJian_chongZhi",
                            "suanFaTuiJian_kaiJu",
                        ],
                        "subSkill": {
                            "jiLu": {
                                "trigger": {
                                    "global": [
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
                            return lib.skill.suanFaTuiJian
                                .isCompletedAction(event);
                        },
                                "content": function(event, trigger, player) {
                            trigger.player.storage
                                .yongChuTaFeiLastAction =
                                lib.skill.suanFaTuiJian
                                    .actionType(trigger);
                            trigger.player.syncStorage(
                                'yongChuTaFeiLastAction'
                            );
                        },
                            },
                            "chongZhi": {
                                "trigger": {
                                    "global": "phaseBegin",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            delete trigger.player.storage
                                .yongChuTaFeiLastAction;
                            trigger.player.syncStorage(
                                'yongChuTaFeiLastAction'
                            );
                        },
                            },
                            "kaiJu": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "content": async function(event, trigger, player) {
                            await lib.skill.suanFaTuiJian
                                .clearHot(player);
                        },
                            },
                        },
                    },
                    "guoQiZhuBao": {
                        "trigger": {
                            "player": "phaseEnd",
                        },
                        "forced": true,
                        "priority": -10,
                        "filter": function(event, player) {
                    return player.countZhiShiWu(
                        'yongChuTaFeiLiuLiang'
                    ) > 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu(
                        'yongChuTaFeiLiuLiang',
                        1
                    );
                    await player.changeZhiLiao(1, player);
                },
                    },
                    "guanZhuTaFeiMiao": {
                        "charlotte": true,
                    },
                    "qianShiHeiTaoYing": {
                        "findYingZhan": function(event) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 12) {
                        if(current.name == 'yingZhan') return current;
                        if(typeof current.getParent != 'function') break;
                        var parent = current.getParent();
                        if(!parent || parent == current) break;
                        current = parent;
                        guard++;
                    }
                    return null;
                },
                        "findBoundAttack": function(event, player) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 16) {
                        if(current.qianShiHeiTaoYingOwner ==
                            player.playerid) return current;
                        if(typeof current.getParent != 'function') break;
                        var parent = current.getParent();
                        if(!parent || parent == current) break;
                        current = parent;
                        guard++;
                    }
                    return null;
                },
                        "group": [
                            "qianShiHeiTaoYing_bangDing",
                            "qianShiHeiTaoYing_mingZhong",
                            "qianShiHeiTaoYing_weiMingZhong",
                            "qianShiHeiTaoYing_zhuanYi",
                        ],
                        "subSkill": {
                            "bangDing": {
                                "trigger": {
                                    "global": "gongJiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!event || event.yingZhan != true) return false;
                            var yingZhan = lib.skill.qianShiHeiTaoYing
                                .findYingZhan(event);
                            return !!yingZhan &&
                                yingZhan.source == player;
                        },
                                "content": async function(event, trigger, player) {
                            trigger.qianShiHeiTaoYingOwner =
                                player.playerid;
                            if(trigger.target && trigger.target.isIn()) {
                                await trigger.target.changeZhiLiao(
                                    1,
                                    player
                                );
                            }
                        },
                            },
                            "mingZhong": {
                                "trigger": {
                                    "global": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!lib.skill.qianShiHeiTaoYing
                                .findBoundAttack(event, player);
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu(
                                'yongChuTaFeiLiuLiang',
                                1
                            );
                        },
                            },
                            "weiMingZhong": {
                                "trigger": {
                                    "global": "gongJiEnd",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !event.gongJiMingZhong &&
                                !!lib.skill.qianShiHeiTaoYing
                                    .findBoundAttack(event, player);
                        },
                                "content": async function(event, trigger, player) {
                            await player.changeZhiLiao(1, player);
                        },
                            },
                            "zhuanYi": {
                                "trigger": {
                                    "global": "chengShouShangHai",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "filter": function(event, player) {
                            if(!event || event.faShu == true ||
                                event.player == player ||
                                event.qianShiHeiTaoYingTransfer) {
                                return false;
                            }
                            return !!lib.skill.qianShiHeiTaoYing
                                .findBoundAttack(event, player);
                        },
                                "content": async function(event, trigger, player) {
                            var num = Math.max(0, trigger.num || 0);
                            var source = trigger.source;
                            trigger.num = 0;
                            if(num > 0 && player.isIn()) {
                                await player.damage(num, source)
                                    .set('step', 6)
                                    .set(
                                        'qianShiHeiTaoYingTransfer',
                                        true
                                    );
                            }
                        },
                            },
                        },
                    },
                    "qianShiYiBaoShuTiaoXiXi": {
                        "trigger": {
                            "player": "phaseBegin",
                        },
                        "filter": function(event, player) {
                    return player.countZhiShiWu(
                        'yongChuTaFeiLiuLiang'
                    ) > 0 &&
                        player.countCards('h') > 0 &&
                        player.countGaiPai('yongChuTaFeiShuTiao') < 3;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseCard(
                        'h',
                        1,
                        '【前世·一包薯条嘻嘻】：移除1【流量】，将1张手牌作为【薯条】'
                    ).set('ai', function(card) {
                        return 6 - get.value(card);
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu(
                        'yongChuTaFeiLiuLiang',
                        1
                    );
                    await player.addGaiPai(
                        event.cards,
                        player,
                        'yongChuTaFeiShuTiao'
                    );
                },
                    },
                    "yongChuTaFeiShuTiao": {
                        "intro": {
                            "name": "薯条",
                            "markcount": "gaiPai",
                            "content": "gaiPai",
                            "max": 3,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                        "group": [
                            "yongChuTaFeiShuTiao_shiYong",
                        ],
                        "subSkill": {
                            "shiYong": {
                                "enable": [
                                    "gongJi",
                                    "faShu",
                                    "yingZhan",
                                ],
                                "position": "hs",
                                "filter": function(event, player) {
                            if(_status.currentPhase != player) return false;
                            return player.getCards('s', function(card) {
                                return card.hasGaintag(
                                    'yongChuTaFeiShuTiao'
                                ) && event.filterCard(
                                    card,
                                    player,
                                    event
                                );
                            }).length > 0;
                        },
                                "filterCard": function(card, player, event) {
                            return card.hasGaintag(
                                'yongChuTaFeiShuTiao'
                            ) && event.filterCard(card, player, event);
                        },
                                "viewAs": function(cards) {
                            if(!cards.length) return;
                            var card = cards[0];
                            return {
                                name: get.name(card),
                                xiBie: get.xiBie(card),
                                mingGe: get.mingGe(card),
                                duYou: card.duYou,
                            };
                        },
                                "check": function(card) {
                            return get.value(card);
                        },
                                "ai": {
                                    "order": function(event, player) {
                                var cards = player.getCards(
                                    's',
                                    function(card) {
                                        return card.hasGaintag(
                                            'yongChuTaFeiShuTiao'
                                        );
                                    }
                                );
                                if(!cards.length) return 0;
                                return Math.max.apply(
                                    null,
                                    cards.map(function(card) {
                                        return get.order(card);
                                    })
                                );
                            },
                                },
                            },
                        },
                    },
                    "yuanShengYao": {
                        "trigger": {
                            "player": [
                                "gongJiEnd",
                                "faShuEnd",
                                "teShuEnd",
                            ],
                        },
                        "filter": function(event, player) {
                    return lib.skill.suanFaTuiJian
                        .isCompletedAction(event) &&
                        player.storage.yongChuTaFeiReBang ==
                            lib.skill.suanFaTuiJian.actionType(event) &&
                        player.countZhiShiWu(
                            'yongChuTaFeiLiuLiang'
                        ) >= 3 &&
                        player.canBiShaShuiJing();
                },
                        "check": function(event, player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu(
                        'yongChuTaFeiLiuLiang',
                        3
                    );
                    await player.draw(1);
                    await lib.skill.suanFaTuiJian.clearHot(player);
                    player.storage.yongChuTaFeiExtraTurn = true;
                    player.insertPhase('yuanShengYao', true);
                    var action = trigger.getParent &&
                        trigger.getParent('xingDong');
                    if(action && action.player == player) action.finish();
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "yongChuTaFeiLiuLiang": {
                        "intro": {
                            "name": "流量",
                            "content": "mark",
                            "max": 3,
                        },
                        "onremove": "storage",
                        "markimage": "extension/电啸龙吟/mark_taFeiLiuLiang.png",
                    },
                    "gongJiReBang": {
                        "charlotte": true,
                        "intro": {
                            "name": "攻击热榜",
                            "content": "当前【热榜】为【攻击行动】。",
                            "max": 1,
                        },
                        "markimage": "extension/电啸龙吟/mark_gongJiReBang.png",
                    },
                    "faShuReBang": {
                        "charlotte": true,
                        "intro": {
                            "name": "法术热榜",
                            "content": "当前【热榜】为【法术行动】。",
                            "max": 1,
                        },
                        "markimage": "extension/电啸龙吟/mark_faShuReBang.png",
                    },
                    "teShuReBang": {
                        "charlotte": true,
                        "intro": {
                            "name": "特殊热榜",
                            "content": "当前【热榜】为【特殊行动】。",
                            "max": 1,
                        },
                        "markimage": "extension/电啸龙吟/mark_teShuReBang.png",
                    },
                    "naiLongLinShiShouPai": {
                        "charlotte": true,
                        "popup": false,
                        "mod": {
                            "maxHandcardFinal": function(player, num) {
                        return num +
                            (player.storage.naiLongLinShiShouPai || 0);
                    },
                        },
                        "onremove": function(player) {
                    delete player.storage.naiLongLinShiShouPai;
                },
                    },
                },
                "translate": {
                    "hongWen": "红温",
                    "hongWen_info": "<span class='hong'>【红温】</span>为电棍Otto专属指示物，上限为3。",
                    "baiYinWanQi": "被动【白银晚期】",
                    "baiYinWanQi_info": "<span class='tiaoJian'>（你承受实际伤害后⑤）</span>+1<span class='hong'>【红温】</span>。当<span class='hong'>【红温】</span>达到上限时，移除所有<span class='hong'>【红温】</span>并【横置】，进入【白银晚期】状态。该状态下你造成和承受的伤害额外+1，且不能获得<span class='hong'>【红温】</span>；持续到你的下个行动阶段结束，届时【重置】并退出状态。",
                    "baiYinWanQiZhuangTai": "白银晚期",
                    "baiYinWanQiZhuangTai_info": "你造成和承受的伤害额外+1；你不能获得<span class='hong'>【红温】</span>。持续到你的下个行动阶段结束。",
                    "shuaiOttoShuai": "响应【帅otto帅】",
                    "shuaiOttoShuai_info": "<span class='tiaoJian'>（主动攻击前）</span>可以对自己造成1点法术伤害③，令本次攻击伤害额外+2。",
                    "zunNiHuoJia": "法术【尊尼获加】",
                    "zunNiHuoJia_info": "<span class='tiaoJian'>（弃置1张法术牌【展示】，指定一名没有【房管】的目标对手）</span>将【房管】放置于其面前。",
                    "fangGuan": "(专)【房管】",
                    "fangGuan_info": "拥有者下个行动阶段内首次进行主动攻击时，只能指定电棍Otto为目标；该【攻击行动】结束后移除。拥有者的行动阶段结束时，若【房管】仍存在，电棍Otto对其造成2点法术伤害③，然后移除【房管】。",
                    "dianGunShengJing": "响应【电棍圣经】",
                    "dianGunShengJing_info": "【宝石】×1。<span class='tiaoJian'>（仅【白银晚期】状态下，你承受伤害导致士气下降时）</span>指定一名对手，对其造成X点法术伤害③，再对其他所有对手各造成1点法术伤害③；X为本次士气下降数。全部伤害享受【白银晚期】增伤，随后你【重置】并立即退出该状态。",
                    "woShiNaiLong": "被动【我是奶龙】",
                    "woShiNaiLong_info": "任意角色每次因你的技能产生一个弃牌事件后，该角色+1【治疗】；同一事件弃置多张牌仍只触发一次。<br><span class='tiaoJian'>（你的攻击命中后②）</span>可以指定一名奶龙以外且有可弃置手牌的同阵营角色，令其弃置1张手牌。",
                    "buShiZhuangTangShiZhenTang": "响应【不是装唐，是真唐】",
                    "buShiZhuangTangShiZhenTang_info": "<span class='tiaoJian'>（你成为其他角色攻击的目标时①）</span>摸1张牌【强制】并展示之，在标准爆牌结算前判断：若该牌与本次攻击同系，将其保留，本次攻击你无法应战；若不同系，弃置该牌，本次攻击伤害-1。完成系别处理后再执行标准爆牌；该爆牌弃牌视为因本技能弃置。",
                    "naiLongDaXiao": "启动【奶龙大笑】",
                    "naiLongDaXiao_info": "【水晶】×1。从你开始按座次依次结算：每名角色弃置1张可弃置的手牌；没有可弃置手牌的角色跳过。即使所有角色均无法弃牌，也可以发动。",
                    "suanFaTuiJian": "被动【算法推荐】",
                    "suanFaTuiJian_info": "游戏开始时，你没有【热榜】。每名角色的回合结束时，记录其本回合最后实际完成的【攻击行动】【法术行动】或【特殊行动】：没有【热榜】或类型不同时，放置或替换为对应【热榜】；类型相同且该角色不是你时，你+1<span class='lan'>【流量】</span>，该角色+1【治疗】。你自己的同类行动只保持【热榜】。",
                    "guoQiZhuBao": "被动【过气主包】",
                    "guoQiZhuBao_info": "<span class='tiaoJian'>（你的回合结束时，若<span class='lan'>【流量】</span>不为0）</span>移除1<span class='lan'>【流量】</span>，然后你+1【治疗】。",
                    "guanZhuTaFeiMiao": "被动【关注塔菲喵】",
                    "guanZhuTaFeiMiao_info": "你拥有3<span class='lan'>【流量】</span>时，其他角色回合结束后，若其最后实际完成的行动类型与当前【热榜】不同，不替换【热榜】，改为由你对其造成2点法术伤害③。",
                    "qianShiHeiTaoYing": "被动【前世·黑桃影】",
                    "qianShiHeiTaoYing_info": "你的主动攻击被成功应战时，应战攻击的目标+1【治疗】。该应战攻击若命中，将原目标完成【治疗】、减伤与抵御后最终将要承受的实际攻击伤害转移给你，来源仍为应战者，然后你+1<span class='lan'>【流量】</span>；最终伤害为0时仍增加<span class='lan'>【流量】</span>。若未命中，你+1【治疗】。",
                    "qianShiYiBaoShuTiaoXiXi": "响应【前世·一包薯条嘻嘻】",
                    "qianShiYiBaoShuTiaoXiXi_info": "<span class='tiaoJian'>（你的回合开始时，若你有至少1<span class='lan'>【流量】</span>、至少1张手牌且【薯条】未满）</span>可以移除1<span class='lan'>【流量】</span>，将1张手牌面朝下作为【薯条】。你可在自己的行动阶段将【薯条】如手牌般使用；其不计入手牌，不能用于普通弃牌或其他技能费用，且仅你可见。",
                    "yuanShengYao": "响应【原生摇】",
                    "yuanShengYao_info": "【水晶】×1。<span class='tiaoJian'>（你拥有3<span class='lan'>【流量】</span>，完整结算一个与当前【热榜】同类型的合法行动后）</span>移除3<span class='lan'>【流量】</span>，摸1张牌【强制】，移除【热榜】，结束当前回合并立即进行一个全新的完整回合。额外回合中可以再次发动。",
                    "yongChuTaFeiLiuLiang": "流量",
                    "yongChuTaFeiLiuLiang_info": "<span class='lan'>【流量】</span>为永雏塔菲专属指示物，上限为3。",
                    "gongJiReBang": "(专)【攻击热榜】",
                    "gongJiReBang_info": "正面朝上的【热榜】，记录【攻击行动】；三种【热榜】合计上限为1。",
                    "faShuReBang": "(专)【法术热榜】",
                    "faShuReBang_info": "正面朝上的【热榜】，记录【法术行动】；三种【热榜】合计上限为1。",
                    "teShuReBang": "(专)【特殊热榜】",
                    "teShuReBang_info": "正面朝上的【热榜】，记录【特殊行动】；三种【热榜】合计上限为1。",
                    "yongChuTaFeiShuTiao": "(专)【薯条】",
                    "yongChuTaFeiShuTiao_info": "面朝下放置于永雏塔菲角色旁的专属牌，上限为3，仅永雏塔菲可以查看；可在自己的行动阶段如手牌般使用。",
                    "yongChuTaFeiShuTiao_shiYong": "使用【薯条】",
                    "naiLongLinShiShouPai": "不是装唐，是真唐",
                },
            },
            "intro": "添加角色奶龙、电棍Otto、永雏塔菲。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "1.1",
        },
        "files": {
            "character": [
                "naiLong.jpg",
                "otto.jpg",
                "yongChuTaFei.jpg",
            ],
            "card": [],
            "skill": [
                "mark_hongWen.png",
                "mark_fangGuan.png",
                "mark_taFeiLiuLiang.png",
                "mark_gongJiReBang.png",
                "mark_faShuReBang.png",
                "mark_teShuReBang.png",
            ],
            "audio": [],
        },
        "connect": true,
    };
});
