game.import("extension", function(lib, game, ui, get, ai, _status) {
    var suoNaYuYinSkills = [
        'suoNaYingYongYuYin',
        'suoNaJianYiYuYin',
        'suoNaXunJieYuYin',
    ];
    var suoNaSongData = {
        yingYongZanMeiShi: {
            name: '英勇赞美诗',
            unique: ['weiLiCiFu'],
            echo: 'suoNaYingYongYuYin',
        },
        jianYiYongTanDiao: {
            name: '坚毅咏叹调',
            unique: ['zhiLiaoShu', 'zhiYuZhiGuang'],
            echo: 'suoNaJianYiYuYin',
        },
        xunJieZouMingQu: {
            name: '迅捷奏鸣曲',
            unique: ['xunJieCiFu'],
            echo: 'suoNaXunJieYuYin',
        },
    };
    function suoNaHasUnique(card, ids) {
        if(!card || typeof card.hasDuYou != 'function') return false;
        return ids.some(function(id) { return card.hasDuYou(id); });
    }
    function suoNaDiscardableCount(player) {
        return player.countCards('h', function(card) {
            return lib.filter.cardDiscardable(card, player);
        });
    }
    function suoNaWillEmpower(player, song) {
        return player.storage.suoNaLastSong != song &&
            player.countZhiShiWu('suoNaHeXian') >= 2;
    }
    async function suoNaPrepareSong(event, player, song) {
        var parent = event.getParent();
        var different = player.storage.suoNaLastSong != song;
        player.storage.suoNaLastSong = song;
        player.syncStorage('suoNaLastSong');
        parent.suoNaSong = song;
        parent.suoNaEmpowered = false;
        if(different) {
            await player.addZhiShiWu('suoNaHeXian', 1);
            if(player.countZhiShiWu('suoNaHeXian') >= 3) {
                await player.removeZhiShiWu(
                    'suoNaHeXian',
                    player.countZhiShiWu('suoNaHeXian')
                );
                parent.suoNaEmpowered = true;
                game.broadcastAll(function(speaker) {
                    if(!lib.config.background_audio) return;
                    game.playAudio({
                        path: 'ext:峡谷幻音/audio/skill/suoNa/' +
                            'qinYinGongMing.mp3',
                        spatialPlayer: speaker,
                        addVideo: false,
                        onError: function() {},
                    });
                }, player);
            }
        }
    }
    function suoNaSetEcho(target, echo) {
        suoNaYuYinSkills.forEach(function(skill) {
            if(skill != echo && target.hasSkill(skill)) target.removeSkill(skill);
        });
        if(!target.hasSkill(echo)) target.addSkill(echo);
    }
    function suoNaShareScore(player, echo) {
        game.filterPlayer(function(current) {
            return current != player && current.side == player.side;
        }).forEach(function(current) {
            suoNaSetEcho(current, echo);
        });
    }
    function suoNaShareValue(player, echo) {
        var allies = game.filterPlayer(function(current) {
            return current != player && current.side == player.side;
        });
        if(echo == 'suoNaYingYongYuYin') {
            return allies.some(function(current) {
                return current.countCards('h', function(card) {
                    return get.type(card, current) == 'gongJi';
                }) > 0;
            });
        }
        if(echo == 'suoNaJianYiYuYin') {
            return allies.some(function(current) {
                return current.countCards('h') >= current.getHandcardLimit() - 1 ||
                    current.zhiLiao <= 1;
            });
        }
        return allies.some(function(current) {
            return current.countCards('h') >= 3;
        });
    }
    async function suoNaChooseShare(player, song) {
        var data = suoNaSongData[song];
        var uniqueCards = player.getCards('h', function(card) {
            return lib.filter.cardDiscardable(card, player) &&
                suoNaHasUnique(card, data.unique);
        });
        var canImprovise = player.hasSkill('jiXingBianZou') &&
            player.canBiShaShuiJing() && suoNaDiscardableCount(player) >= 2;
        if(!uniqueCards.length && !canImprovise) return false;
        var controls = ['不追加'];
        if(uniqueCards.length) controls.push('弃置指定独有技牌');
        if(canImprovise) controls.push('发动【即兴变奏】');
        var result = await player.chooseControl(controls)
            .set('prompt', data.name + '：是否为队友附加对应余音？')
            .set('ai', function() {
                var player = _status.event.player;
                var controls = _status.event.controls;
                if(!suoNaShareValue(player, _status.event.echo)) return '不追加';
                if(controls.includes('弃置指定独有技牌')) return '弃置指定独有技牌';
                return controls.includes('发动【即兴变奏】') ?
                    '发动【即兴变奏】' : '不追加';
            }).set('echo', data.echo).forResult();
        if(!result || result.control == '不追加') return false;
        if(result.control == '弃置指定独有技牌') {
            var cards = await player.chooseToDiscard(
                'h', 1, true, data.name + '：弃置指定独有技牌',
                function(card) {
                    if(!lib.filter.cardDiscardable(card, _status.event.player) ||
                        !card || typeof card.hasDuYou != 'function') return false;
                    var uniqueIds = _status.event.uniqueIds || [];
                    for(var i = 0; i < uniqueIds.length; i++) {
                        if(card.hasDuYou(uniqueIds[i])) return true;
                    }
                    return false;
                }
            ).set('uniqueIds', data.unique).set('visible', true)
                .set('ai', function(card) { return 8 - get.value(card); })
                .forResultCards() || [];
            if(!cards.length) return false;
        } else {
            var substitute = await player.chooseToDiscard(
                'h', 2, true, '即兴变奏：弃置两张手牌',
                function(card) {
                    return lib.filter.cardDiscardable(card, _status.event.player);
                }
            ).set('ai', function(card) {
                return 8 - get.value(card);
            }).forResultCards() || [];
            if(substitute.length < 2) return false;
            await player.removeBiShaShuiJing();
            player.logSkill('jiXingBianZou');
        }
        suoNaShareScore(player, data.echo);
        return true;
    }
    async function suoNaFinishSong(event, player, song) {
        var parent = event.getParent();
        suoNaSetEcho(player, suoNaSongData[song].echo);
        if(parent.suoNaEmpowered === true) player.addGongJi();
        delete parent.suoNaSong;
        delete parent.suoNaEmpowered;
    }
    return {
        "name": "峡谷幻音",
        "arenaReady": function(){

},
        "content": function(config,pack){

},
        "prepare": function(){

},
        "precontent": function(){
            var actionAudioSkill = 'xiaGuHuanYin_actionAudio';
            if(!lib.skill[actionAudioSkill]) {
                lib.skill[actionAudioSkill] = {
                    trigger: { player: ['gouMai', 'heCheng', 'tiLian'] },
                    forced: true,
                    popup: false,
                    charlotte: true,
                    firstDo: true,
                    filter: function(event, player) {
                        return ['tiMo', 'suoNa', 'yaTuoKeSi'].some(function(id) {
                            return player.name == id || player.name1 == id ||
                                player.name2 == id;
                        });
                    },
                    content: function(event, trigger, player) {
                        var action = event.triggername || trigger.name;
                        if(!['gouMai', 'heCheng', 'tiLian'].includes(action)) {
                            return;
                        }
                        var character = ['tiMo', 'suoNa', 'yaTuoKeSi']
                            .find(function(id) {
                                return player.name == id || player.name1 == id ||
                                    player.name2 == id;
                            });
                        if(!character) return;
                        var audioPath = 'ext:峡谷幻音/audio/action/' +
                            character + '/' + action + '.mp3';
                        game.broadcastAll(function(path, speaker) {
                            if(!lib.config.background_audio) return;
                            game.playAudio({
                                path: path,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, audioPath, player);
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
                    "tiMo": [
                        null,
                        "huanGroup",
                        4,
                        [
                            "yinXingDeChiBang",
                            "zhiMangChuiJian",
                            "xiaoMoKuaiPao",
                            "duXingSheJi",
                            "moGuFangZhi",
                            "zhongMoGu",
                            "tiMoZhuanShu",
                            "tiMoMoGu",
                            "tiMoZhiMang",
                            "tiMoZhongMoGuKa",
                            "tiMoZhongMoGuPai",
                        ],
                        [
                            "des:班德尔城的迅捷斥候。提莫擅长隐蔽行动、致盲吹箭与蘑菇陷阱，总能在对手最意想不到的位置发起袭击。",
                            "ext:峡谷幻音/tiMo.jpg",
                        ],
                    ],
                    "suoNa": [
                        null,
                        "yongGroup",
                        4,
                        [
                            "qinYinGongMing",
                            "yingYongZanMeiShi",
                            "jianYiYongTanDiao",
                            "xunJieZouMingQu",
                            "liLiangHeXian",
                            "jiXingBianZou",
                            "kuangWuZhongLeZhang",
                            "suoNaHeXian",
                        ],
                        [
                            "des:以琴音连接队友心灵的琴瑟仙女。娑娜轮换演奏三种乐章积累和弦，并将对应余音分享给队友。",
                            "ext:峡谷幻音/suoNa.jpg",
                        ],
                    ],
                    "yaTuoKeSi": [
                        null,
                        "xueGroup",
                        5,
                        [
                            "mieJueXingTai",
                            "ciSiJianQi",
                            "anYiLiRen",
                            "eHuoShuLian",
                            "anYingChongJue",
                            "daMie",
                            "xueRen",
                            "xueJi",
                        ],
                        [
                            "des:以鲜血与战意维系灭绝形态的暗裔剑魔。亚托克斯通过暗裔利刃积累血刃，并以恶火束链锁定猎物展开追击。",
                            "ext:峡谷幻音/yaTuoKeSi.jpg",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "峡谷幻音": "峡谷幻音",
                    "tiMo": "提莫",
                    "suoNa": "娑娜",
                    "yaTuoKeSi": "亚托克斯",
                },
            },
            "card": {
                "card": {},
                "translate": {},
                "list": [],
            },
            "skill": {
                "skill": {
                    "qinYinGongMing": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/qinYinGongMing.mp3",
                        "locked": true,
                        "onremove": function(player) {
                            delete player.storage.suoNaLastSong;
                        },
                    },
                    "yingYongZanMeiShi": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/yingYongZanMeiShi.mp3",
                        "logAudio": function(event, player) {
                            if(player && suoNaWillEmpower(player, 'yingYongZanMeiShi')) return false;
                            return "ext:峡谷幻音/audio/skill/suoNa/yingYongZanMeiShi.mp3";
                        },
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": function() {
                            var player = _status.event.player;
                            return suoNaWillEmpower(player, 'yingYongZanMeiShi') ?
                                [1, 2] : 1;
                        },
                        "filterTarget": function(card, player, target) {
                            return target.side != player.side;
                        },
                        "contentBefore": async function(event, trigger, player) {
                            await suoNaPrepareSong(event, player, 'yingYongZanMeiShi');
                            await suoNaChooseShare(player, 'yingYongZanMeiShi');
                        },
                        "content": async function(event, trigger, player) {
                            if(event.target && event.target.isIn()) {
                                await event.target.faShuDamage(1, player, 'nocard');
                            }
                        },
                        "contentAfter": async function(event, trigger, player) {
                            await suoNaFinishSong(event, player, 'yingYongZanMeiShi');
                        },
                        "ai": {
                            "order": function(item, player) {
                                return suoNaWillEmpower(player, 'yingYongZanMeiShi') ?
                                    6.2 : 4.2;
                            },
                            "result": {
                                "target": function(player, target) {
                                    return get.damageEffect2(target, player, 1);
                                },
                            },
                        },
                    },
                    "jianYiYongTanDiao": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/jianYiYongTanDiao.mp3",
                        "logAudio": function(event, player) {
                            if(player && suoNaWillEmpower(player, 'jianYiYongTanDiao')) return false;
                            return "ext:峡谷幻音/audio/skill/suoNa/jianYiYongTanDiao.mp3";
                        },
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                            return target.side == player.side;
                        },
                        "contentBefore": async function(event, trigger, player) {
                            await suoNaPrepareSong(event, player, 'jianYiYongTanDiao');
                            await suoNaChooseShare(player, 'jianYiYongTanDiao');
                        },
                        "content": async function(event, trigger, player) {
                            var parent = event.getParent();
                            var amount = parent.suoNaEmpowered === true ? 2 : 1;
                            await event.target.changeZhiLiao(amount, player);
                        },
                        "contentAfter": async function(event, trigger, player) {
                            await suoNaFinishSong(event, player, 'jianYiYongTanDiao');
                        },
                        "ai": {
                            "order": function(item, player) {
                                return suoNaWillEmpower(player, 'jianYiYongTanDiao') ?
                                    7 : 5;
                            },
                            "result": {
                                "target": function(player, target) {
                                    var missing = Math.max(0, 2 - target.zhiLiao);
                                    if(!missing) return 0;
                                    return target.side == player.side ? 1 + missing : -1;
                                },
                            },
                        },
                    },
                    "xunJieZouMingQu": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/xunJieZouMingQu.mp3",
                        "logAudio": function(event, player) {
                            if(player && suoNaWillEmpower(player, 'xunJieZouMingQu')) return false;
                            return "ext:峡谷幻音/audio/skill/suoNa/xunJieZouMingQu.mp3";
                        },
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                            var count = suoNaWillEmpower(player, 'xunJieZouMingQu') ?
                                2 : 1;
                            return target.side == player.side &&
                                suoNaDiscardableCount(target) >= count;
                        },
                        "contentBefore": async function(event, trigger, player) {
                            await suoNaPrepareSong(event, player, 'xunJieZouMingQu');
                            await suoNaChooseShare(player, 'xunJieZouMingQu');
                        },
                        "content": async function(event, trigger, player) {
                            var parent = event.getParent();
                            var empowered = parent.suoNaEmpowered === true;
                            var amount = empowered ? 2 : 1;
                            var discarded = await event.target.chooseToDiscard(
                                'h', amount, true,
                                '迅捷奏鸣曲：弃置' + amount + '张手牌',
                                function(card) {
                                    return lib.filter.cardDiscardable(
                                        card, _status.event.player
                                    );
                                }
                            ).set('ai', function(card) {
                                return 8 - get.value(card);
                            }).forResultCards() || [];
                            if(discarded.length < amount) return;
                            if(empowered && event.target.isIn()) {
                                await event.target.draw(1);
                            }
                        },
                        "contentAfter": async function(event, trigger, player) {
                            await suoNaFinishSong(event, player, 'xunJieZouMingQu');
                        },
                        "ai": {
                            "order": function(item, player) {
                                return suoNaWillEmpower(player, 'xunJieZouMingQu') ?
                                    6.5 : 4.5;
                            },
                            "result": {
                                "target": function(player, target) {
                                    if(target.side != player.side) return -1;
                                    var excess = target.countCards('h') -
                                        target.getHandcardLimit();
                                    return 0.5 + Math.max(0, excess) +
                                        target.countCards('h') * 0.08;
                                },
                            },
                        },
                    },
                    "liLiangHeXian": {
                        "locked": true,
                    },
                    "jiXingBianZou": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/jiXingBianZou.mp3",
                        "locked": true,
                        "ai": { "shuiJing": true },
                    },
                    "suoNaYingYongYuYin": {
                        "charlotte": true,
                        "mark": true,
                        "markimage": "extension/峡谷幻音/mark_suoNaYingYongYuYin.png",
                        "marktext": "勇",
                        "intro": { "content": "攻击命中时，本次攻击伤害额外+1，随后移除。" },
                        "trigger": { "source": "gongJiMingZhong" },
                        "forced": true,
                        "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                            player.removeSkill('suoNaYingYongYuYin');
                        },
                    },
                    "suoNaJianYiYuYin": {
                        "charlotte": true,
                        "mark": true,
                        "markimage": "extension/峡谷幻音/mark_suoNaJianYiYuYin.png",
                        "marktext": "毅",
                        "intro": { "content": "承受其他角色造成的伤害时，该伤害-1，随后移除。" },
                        "trigger": { "player": "chengShouShangHaiBefore" },
                        "forced": true,
                        "filter": function(event, player) {
                            return event && event.num > 0 && event.source &&
                                event.source != player;
                        },
                        "content": function(event, trigger, player) {
                            trigger.changeDamageNum(-1);
                            player.removeSkill('suoNaJianYiYuYin');
                        },
                    },
                    "suoNaXunJieYuYin": {
                        "charlotte": true,
                        "mark": true,
                        "markimage": "extension/峡谷幻音/mark_suoNaXunJieYuYin.png",
                        "marktext": "迅",
                        "intro": { "content": "下一次执行特殊行动后，强制弃置1张牌。" },
                        "trigger": { "player": "teShuEnd" },
                        "forced": true,
                        "content": async function(event, trigger, player) {
                            var amount = Math.min(1, suoNaDiscardableCount(player));
                            if(amount > 0) {
                                await player.chooseToDiscard(
                                    'h', amount, true,
                                    '迅捷余音：弃置' + amount + '张手牌',
                                    function(card) {
                                        return lib.filter.cardDiscardable(
                                            card, _status.event.player
                                        );
                                    }
                                ).set('ai', function(card) {
                                    return 8 - get.value(card);
                                }).forResultCards();
                            }
                            player.removeSkill('suoNaXunJieYuYin');
                        },
                    },
                    "suoNaHeXian": {
                        "charlotte": true,
                        "intro": { "content": "当前有#点【和弦】。", "max": 3 },
                        "markimage": "extension/峡谷幻音/mark_suoNaHeXian.png",
                    },
                    "kuangWuZhongLeZhang": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/kuangWuZhongYueZhang.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countNengLiang('baoShi') >= 2 &&
                                game.hasPlayer(function(current) {
                                    return current.side != player.side;
                                });
                        },
                        "selectTarget": [1, 2],
                        "filterTarget": function(card, player, target) {
                            return target.side != player.side;
                        },
                        "contentBefore": async function(event, trigger, player) {
                            await player.removeNengLiang('baoShi', 2);
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.target;
                            if(!target || !target.isIn()) return;
                            await target.faShuDamage(1, player, 'nocard');
                            if(target.isIn()) {
                                await player.useCard(
                                    game.createCard2('xuRuo'), target, false
                                );
                            }
                        },
                        "ai": {
                            "baoShi": true,
                            "order": 7.5,
                            "result": {
                                "target": function(player, target) {
                                    var score = get.damageEffect2(target, player, 1);
                                    if(!target.hasJiChuXiaoGuo('_xuRuo')) score += 1.5;
                                    return score;
                                },
                            },
                        },
                    },
                    "yinXingDeChiBang": {
                        "group": [
                            "yinXingDeChiBang_teShu",
                            "yinXingDeChiBang_huiHeKaiShi",
                            "yinXingDeChiBang_xingDong",
                            "yinXingDeChiBang_gongJi",
                            "yinXingDeChiBang_shouShang",
                            "yinXingDeChiBang_qingChu",
                        ],
                        "subSkill": {
                            "teShu": {
                                "audio": "ext:峡谷幻音/audio/skill/tiMo/yinXingDeChiBang.mp3",
                                "trigger": {
                                    "player": "teShuEnd",
                                },
                                "forced": true,
                                "content": async function(event, trigger, player) {
                            if(player.storage.tiMoYinXingExtraGongJiPending == true) {
                                if(typeof player.storage.gongJi == 'number' &&
                                    player.storage.gongJi > 0) {
                                    player.storage.gongJi--;
                                }
                                delete player.storage.tiMoYinXingExtraGongJiPending;
                            }
                            if(!player.isHengZhi()) {
                                await player.hengZhi();
                            }
                            player.storage.tiMoYinXingPhase = player.phaseNumber || 0;
                            player.addSkill('tiMoYinXing');
                        },
                            },
                            "huiHeKaiShi": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return player.isHengZhi();
                        },
                                "content": async function(event, trigger, player) {
                            await player.chongZhi();
                            // 行动数会在随后进入xingDong时初始化，因此这里只记录奖励。
                            player.storage.tiMoYinXingExtraGongJi = true;
                        },
                            },
                            "xingDong": {
                                "trigger": {
                                    "player": "xingDongBefore",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.storage.tiMoYinXingExtraGongJi == true;
                        },
                                "content": function(event, trigger, player) {
                            delete player.storage.tiMoYinXingExtraGongJi;
                            player.storage.tiMoYinXingExtraGongJiPending = true;
                            player.addGongJi();
                        },
                            },
                            "gongJi": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.storage.tiMoYinXingExtraGongJiPending == true &&
                                get.is.gongJiXingDong(event);
                        },
                                "content": function(event, trigger, player) {
                            delete player.storage.tiMoYinXingExtraGongJiPending;
                        },
                            },
                            "shouShang": {
                                "trigger": {
                                    "player": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return event && event.num > 0 && player.isHengZhi();
                        },
                                "content": async function(event, trigger, player) {
                            await player.chongZhi();
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.hasSkill('tiMoYinXing') &&
                                typeof player.storage.tiMoYinXingPhase == 'number' &&
                                player.phaseNumber > player.storage.tiMoYinXingPhase;
                        },
                                "content": function() {
                            player.removeSkill('tiMoYinXing');
                        },
                            },
                        },
                    },
                    "zhiMangChuiJian": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/zhiMangChuiJian.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "selectCard": 1,
                        "position": "h",
                        "discard": false,
                        "lose": false,
                        "filter": function(event, player) {
                    if(!player.hasCard(function(card) {
                        return get.type(card) == 'faShu';
                    }, 'h')) return false;
                    return game.hasPlayer(function(current) {
                        return current.side != player.side &&
                            !current.hasJiChuXiaoGuo('tiMoZhiMang');
                    });
                },
                        "filterCard": function(card, player) {
                    return get.type(card) == 'faShu';
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side &&
                        !target.hasJiChuXiaoGuo('tiMoZhiMang');
                },
                        "content": async function(event, trigger, player) {
                    if(!event.cards || !event.cards.length || !event.target) return;
                    await player.discard(event.cards).set('showCards', true);
                    await event.target.addJiChuXiaoGuo(
                        event.cards,
                        player,
                        'tiMoZhiMang'
                    );
                },
                        "check": function(card) {
                    return 6 - get.value(card);
                },
                        "ai": {
                            "order": 3.7,
                            "result": {
                                "target": function(player, target) {
                            return -2;
                        },
                            },
                        },
                    },
                    "xiaoMoKuaiPao": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/xiaoMoKuaiPao.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": -1,
                        "isSafeForAi": function(player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "filter": function(event, player) {
                    return player.countCards('h') > 2;
                },
                        "filterTarget": function(card, player, target) {
                    return target == player;
                },
                        "content": async function(event, trigger, player) {
                    await player.draw();
                    await player.chooseToDiscard(
                        'h',
                        2,
                        true,
                        '小莫快跑：面朝下弃置2张牌'
                    );
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.xiaoMoKuaiPao
                            .isSafeForAi(player) ? 3.6 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.xiaoMoKuaiPao
                                .isSafeForAi(player) ? 0.5 : -100;
                        },
                            },
                        },
                    },
                    "duXingSheJi": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/duXingSheJi.mp3",
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return event && event.target && event.target.isIn();
                },
                        "content": async function(event, trigger, player) {
                    await trigger.target.faShuDamage(1, player);
                },
                    },
                    "moGuFangZhi": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/moGuShengCheng.mp3",
                        "trigger": {
                            "player": "loseEnd",
                        },
                        "filter": function(event, player) {
                    if(!event || event.type != 'discard' || !Array.isArray(event.cards)) {
                        return false;
                    }
                    if(player.countNengLiang('baoShi') < 1) return false;
                    var discardEvent = event.getParent && event.getParent('discard', true);
                    if(discardEvent && (
                        discardEvent.showCards ||
                        discardEvent.showHiddenCards ||
                        discardEvent.visible
                    )) return false;
                    var hasCard = event.cards.some(function(card) {
                        return get.position(card, true) == 'd';
                    });
                    if(!hasCard) return false;
                    return player.countGaiPai('tiMoMoGu') < 3;
                },
                        "cost": async function(event, trigger, player) {
                    var cards = trigger.cards.filter(function(card) {
                        return get.position(card, true) == 'd';
                    });
                    var capacity = Math.max(
                        0,
                        3 - player.countGaiPai('tiMoMoGu')
                    );
                    var count = Math.min(cards.length, capacity);
                    var selected = [];
                    if(count <= 0) {
                        event.result = { bool: false };
                        return;
                    }
                    if(cards.length <= capacity) {
                        selected = cards.slice();
                    } else {
                        selected = await player.chooseCardButton(
                            cards,
                            true,
                            count,
                            '蘑菇生成：选择' + count +
                                '张本次弃置的牌作为【蘑菇】'
                        ).set('ai', function(button) {
                            return 6 - get.value(button.link);
                        }).forResultLinks();
                    }
                    event.result = {
                        bool: selected.length > 0,
                        targets: [player],
                        cards: selected,
                    };
                },
                        "content": async function(event, trigger, player) {
                    if(!event.cards || !event.cards.length) return;
                    await player.addGaiPai(
                        event.cards,
                        player,
                        'tiMoMoGu'
                    );
                },
                    },
                    "zhongMoGu": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/zhongMoGu.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "getHolder": function() {
                    var players = game.players.slice();
                    if(game.dead) players.addArray(game.dead);
                    return players.find(function(current) {
                        return current && current.hasZhiShiWu &&
                            current.hasZhiShiWu('tiMoZhongMoGuKa');
                    });
                },
                        "getLooseHolders": function() {
                    return game.players.filter(function(current) {
                        return current.countGaiPai('tiMoMoGu') > 0;
                    });
                },
                        "filter": function(event, player) {
                    if(!player.canBiShaShuiJing()) return false;
                    if(!lib.skill.zhongMoGu.getLooseHolders().length) return false;
                    var holder = lib.skill.zhongMoGu.getHolder();
                    if(holder && holder.countGaiPai('tiMoZhongMoGuPai') >= 2) {
                        return false;
                    }
                    return game.hasPlayer(function(current) {
                        return lib.skill.zhongMoGu.filterTarget(null, player, current);
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    var looseHolders = lib.skill.zhongMoGu.getLooseHolders();
                    if(!looseHolders.length || !event.target ||
                        (event.target.isIn && !event.target.isIn())) return;

                    var mushroomHolder;
                    if(looseHolders.length == 1) {
                        mushroomHolder = looseHolders[0];
                    } else {
                        var targets = await player.chooseTarget(
                            true,
                            '种蘑菇：选择一名拥有【蘑菇】的角色',
                            function(card, player, target) {
                                return target.countGaiPai('tiMoMoGu') > 0;
                            }
                        ).set('ai', function(target) {
                            var player = _status.event.player;
                            return target == player ? 2 : 1;
                        }).forResultTargets();
                        mushroomHolder = targets[0];
                    }
                    if(!mushroomHolder) return;

                    var looseCards = mushroomHolder.getGaiPai('tiMoMoGu');
                    var mushroom;
                    if(looseCards.length == 1) {
                        mushroom = looseCards[0];
                    } else {
                        var links = await player.chooseCardButton(
                            looseCards,
                            true,
                            '种蘑菇：选择置于专属卡上的1个【蘑菇】'
                        ).set('ai', function(button) {
                            return 6 - get.value(button.link);
                        }).forResultLinks();
                        mushroom = links[0];
                    }
                    if(!mushroom) return;

                    var receiver = event.target;
                    var oldHolder = lib.skill.zhongMoGu.getHolder();
                    var attached = oldHolder ?
                        oldHolder.getGaiPai('tiMoZhongMoGuPai').slice() : [];

                    if(oldHolder && oldHolder != receiver) {
                        await oldHolder.removeZhiShiWu('tiMoZhongMoGuKa');
                        delete oldHolder.storage.tiMoZhongMoGuSource;
                    }

                    if(mushroomHolder == receiver) {
                        receiver.removeGaintag('tiMoMoGu', [mushroom]);
                        receiver.addGaintag([mushroom], 'tiMoZhongMoGuPai');
                        if(receiver.countGaiPai('tiMoMoGu') > 0) {
                            receiver.markSkill('tiMoMoGu');
                        } else {
                            receiver.unmarkSkill('tiMoMoGu');
                        }
                        receiver.markSkill('tiMoZhongMoGuPai');
                    } else {
                        await receiver.addToExpansion(mushroom)
                            .set('gaintag', ['tiMoZhongMoGuPai'])
                            .set('log', true);
                    }

                    if(attached.length && oldHolder != receiver) {
                        await receiver.addToExpansion(attached)
                            .set('gaintag', ['tiMoZhongMoGuPai'])
                            .set('log', true);
                    }

                    await receiver.addZhiShiWu('tiMoZhongMoGuKa', 1, true);
                    receiver.storage.tiMoZhongMoGuSource = player;
                    game.log(player, '将【种蘑菇】转移给了', receiver);
                },
                        "ai": {
                            "shuiJing": true,
                            "order": 3.5,
                            "result": {
                                "target": function(player, target) {
                            return -2;
                        },
                            },
                        },
                    },
                    "tiMoZhuanShu": {
                        "charlotte": true,
                        "trigger": {
                            "global": "gameStart",
                        },
                        "forced": true,
                        "firstDo": true,
                        "popup": false,
                        "content": function() {
                    [
                        'tiMoMoGu',
                        'tiMoZhiMang',
                        'tiMoZhiMang_jianShang',
                        'tiMoZhiMang_qingChu',
                        'tiMoZhongMoGuKa',
                        'tiMoZhongMoGuPai',
                    ].forEach(function(skill) {
                        game.addGlobalSkill(skill);
                    });
                },
                    },
                    "tiMoMoGu": {
                        "intro": {
                            "name": "蘑菇",
                            "markcount": "gaiPai",
                            "content": "gaiPai",
                            "max": 3,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                    },
                    "tiMoZhiMang": {
                        "intro": {
                            "name": "致盲",
                            "content": "jiChuXiaoGuo",
                            "max": 1,
                        },
                        "tag": {
                            "jiChuXiaoGuo": true,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getJiChuXiaoGuo(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                        "group": [
                            "tiMoZhiMang_jianShang",
                            "tiMoZhiMang_qingChu",
                        ],
                        "subSkill": {
                            "jianShang": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return event &&
                                player.hasJiChuXiaoGuo('tiMoZhiMang');
                        },
                                "content": function() {
                            trigger.changeDamageNum(trigger.yingZhan == true ? -1 : -2);
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return player.hasJiChuXiaoGuo('tiMoZhiMang');
                        },
                                "content": async function(event, trigger, player) {
                            var cards = player.getJiChuXiaoGuo('tiMoZhiMang').slice();
                            if(cards.length) {
                                await player.discard(cards, 'tiMoZhiMang').set('visible', true);
                            }
                        },
                            },
                        },
                    },
                    "tiMoZhongMoGuKa": {
                        "intro": {
                            "name": "种蘑菇",
                            "nocount": true,
                            "max": 1,
                            "content": function(storage, player) {
                        return '专属卡上共有' +
                            player.countGaiPai('tiMoZhongMoGuPai') +
                            '个【蘑菇】；打出或展示同系牌时触发。';
                    },
                        },
                        "markimage": "extension/峡谷幻音/mark_tiMoZhongMoGuKa.png",
                        "getMatchingCards": function(event, player) {
                    if(!event) return [];
                    var xiBies = [];
                    if(event.card) {
                        var cardXiBie = get.xiBie(event.card);
                        if(cardXiBie) xiBies.add(cardXiBie);
                    }
                    if(Array.isArray(event.cards)) {
                        event.cards.forEach(function(card) {
                            var xiBie = get.xiBie(card);
                            if(xiBie) xiBies.add(xiBie);
                        });
                    }
                    return player.getGaiPai('tiMoZhongMoGuPai').filter(function(card) {
                        return xiBies.includes(get.xiBie(card));
                    }).slice(0, 1);
                },
                        "trigger": {
                            "player": [
                                "daChuPai",
                                "showCardsEnd",
                            ],
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return player.hasZhiShiWu('tiMoZhongMoGuKa') &&
                        lib.skill.tiMoZhongMoGuKa.getMatchingCards(event, player).length > 0;
                },
                        "content": async function(event, trigger, player) {
                    var cards = lib.skill.tiMoZhongMoGuKa
                        .getMatchingCards(trigger, player);
                    if(!cards.length) return;
                    await player.discard(cards, 'tiMoZhongMoGuPai').set('visible', true);
                    var source = player.storage.tiMoZhongMoGuSource;
                    if(source && source.isIn && source.isIn()) {
                        game.broadcastAll(function(speaker) {
                            if(!lib.config.background_audio) return;
                            game.playAudio({
                                path: 'ext:峡谷幻音/audio/skill/tiMo/' +
                                    'zhongMoGu_trigger.mp3',
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, source);
                    }
                    if(source && source.isIn && source.isIn()) {
                        await player.faShuDamage(3, source);
                    } else {
                        await player.faShuDamage(3, 'nosource');
                    }
                },
                    },
                    "tiMoZhongMoGuPai": {
                        "intro": {
                            "name": "种蘑菇上的蘑菇",
                            "markcount": "gaiPai",
                            "max": 2,
                            "mark": function(dialog, storage, player) {
                        var cards = player.getGaiPai('tiMoZhongMoGuPai');
                        if(!cards.length) return "没有【蘑菇】";
                        var source = player.storage.tiMoZhongMoGuSource;
                        var viewer = game.me;
                        var canSee = source && viewer && (
                            source == viewer ||
                            source._trueMe == viewer ||
                            viewer._trueMe == source
                        );
                        if(canSee) {
                            dialog.addText("仅提莫可见的【蘑菇】");
                            dialog.addAuto(cards);
                            return false;
                        }
                        return "共有" + cards.length + "张牌";
                    },
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                    },
                    "mieJueXingTai": {
                        "group": [
                            "mieJueXingTai_zhuCeShuLian",
                            "mieJueXingTai_gongJi",
                            "mieJueXingTai_jinZhiZhiLiao",
                            "mieJueXingTai_xueJi",
                            "mieJueXingTai_weiChi",
                        ],
                        "subSkill": {
                            "zhuCeShuLian": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            [
                                'eHuoShuLianKa',
                                'eHuoShuLianKa_yingZhan',
                                'eHuoShuLianKa_qingChu',
                                'eHuoShuLianKa_biaoJiQingLi',
                            ].forEach(function(skill) {
                                game.addGlobalSkill(skill);
                            });
                        },
                            },
                            "gongJi": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'mieJueXingTaiZhuangTai'
                            );
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        },
                            },
                            "jinZhiZhiLiao": {
                                "trigger": {
                                    "player": "zhiLiao",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'mieJueXingTaiZhuangTai'
                            );
                        },
                                "content": function(event, trigger, player) {
                            trigger.cancel();
                        },
                            },
                            "xueJi": {
                                "trigger": {
                                    "global": "changeShiQiEnd",
                                },
                                "usable": 1,
                                "forced": true,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'mieJueXingTaiZhuangTai'
                            ) &&
                                _status.currentPhase == player &&
                                event &&
                                event.num < 0 &&
                                event.side != player.side &&
                                event.source == player &&
                                !player.isZhiShiWuMax('xueJi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('xueJi', 1);
                        },
                            },
                            "weiChi": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'mieJueXingTaiZhuangTai'
                            );
                        },
                                "content": async function(event, trigger, player) {
                            if(player.countZhiShiWu('xueJi') > 0) {
                                await player.removeZhiShiWu('xueJi', 1);
                                return;
                            }
                            if(player.isHengZhi()) {
                                await player.chongZhi();
                            }
                            game.broadcastAll(function(speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: 'ext:峡谷幻音/audio/skill/' +
                                        'yaTuoKeSi/mieJueXingTai_end.mp3',
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, player);
                            player.removeSkill(
                                'mieJueXingTaiZhuangTai'
                            );
                        },
                            },
                        },
                    },
                    "ciSiJianQi": {
                        "audio": "ext:峡谷幻音/audio/skill/yaTuoKeSi/ciSiJianQi.mp3",
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        !!event.target;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【赐死剑气】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var healingGain = player.countZhiLiao() <
                            player.getZhiLiaoLimit() ? 1 : 0;
                        var attackGain = target.countZhiLiao() > 0 ? 1 :
                            get.damageEffect2(target, player, 1);
                        return healingGain + attackGain > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.changeZhiLiao(1, player);
                    var target = trigger.target;
                    if(target && target.isIn() && target.zhiLiao > 0) {
                        await target.changeZhiLiao(-1, player);
                    } else if(target && target.zhiLiao == 0) {
                        trigger.changeDamageNum(1);
                    }
                },
                    },
                    "anYiLiRen": {
                        "audio": false,
                        "getAttackEvent": function(event) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 20) {
                        if(current.name == 'useCard' &&
                            current.type == 'gongJi') {
                            return current;
                        }
                        if(typeof current.getParent != 'function') break;
                        var parent = current.getParent();
                        if(!parent || parent == current) break;
                        current = parent;
                        guard++;
                    }
                    return null;
                },
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event && event.yingZhan != true;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【暗裔利刃】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var tier = Math.min(
                            3,
                            player.countZhiShiWu('xueRen') + 1
                        );
                        var bonus = tier >= 3 ? 2 : 1;
                        var selfDamage = player.countZhiLiao() == 0 ? 2 : 1;
                        var score = get.damageEffect2(
                            target, player, bonus
                        ) + get.damageEffect2(
                            player, player, selfDamage
                        );
                        if(tier == 2 && target.hasSkill('eHuoShuLian')) {
                            score += 1.5;
                        }
                        if(tier == 3) score += 0.8;
                        return score > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.faShuDamage(1, player, 'nocard');
                    await player.addZhiShiWu('xueRen', 1);
                    var tier = player.countZhiShiWu('xueRen');
                    trigger.anYiLiRenTier = tier;
                    var tierAudio = 'anYiLiRen_' + (
                        tier >= 3 ? 'third' :
                            tier == 2 ? 'second' : 'first'
                    ) + '.mp3';
                    game.broadcastAll(function(file, speaker) {
                        if(!lib.config.background_audio) return;
                        game.playAudio({
                            path: 'ext:峡谷幻音/audio/skill/yaTuoKeSi/' + file,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, tierAudio, player);
                    trigger.anYiLiRenTargetId =
                        trigger.target && trigger.target.playerid;
                    if(tier == 1 || tier == 2) {
                        trigger.changeDamageNum(1);
                    } else if(tier >= 3) {
                        trigger.changeDamageNum(2);
                    }
                },
                        "group": [
                            "anYiLiRen_jiLuShangHai",
                            "anYiLiRen_jieShu",
                        ],
                        "subSkill": {
                            "jiLuShangHai": {
                                "trigger": {
                                    "source": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!event || event.num <= 0 ||
                                event.faShu === true) return false;
                            var attack = lib.skill.anYiLiRen
                                .getAttackEvent(event);
                            return !!attack &&
                                attack.player == player &&
                                !!attack.anYiLiRenTier &&
                                event.player == attack.target;
                        },
                                "content": function(event, trigger, player) {
                            var attack = lib.skill.anYiLiRen
                                .getAttackEvent(trigger);
                            if(attack) {
                                attack.anYiLiRenDidDamage = true;
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
                            return !!event && !!event.anYiLiRenTier;
                        },
                                "content": async function(event, trigger, player) {
                            var tier = trigger.anYiLiRenTier;
                            if(tier >= 3) {
                                var count =
                                    player.countZhiShiWu('xueRen');
                                if(count > 0) {
                                    await player.removeZhiShiWu(
                                        'xueRen',
                                        count
                                    );
                                }
                                if(trigger.anYiLiRenDidDamage) {
                                    await player.addZhiShiWu('xueJi', 1);
                                }
                                return;
                            }
                            if(tier != 2 ||
                                !trigger.anYiLiRenDidDamage) return;
                            var target = trigger.target;
                            if(!target || !target.isIn() ||
                                target.countZhiShiWu(
                                    'eHuoShuLianKa'
                                ) <= 0) return;
                            player.storage.anYiLiRenZhuiJiTarget =
                                target.playerid;
                            player.syncStorage(
                                'anYiLiRenZhuiJiTarget'
                            );
                            player.addSkill('anYiLiRenZhuiJi');
                            if(!Array.isArray(
                                player.storage.extraXingDong
                            )) {
                                player.storage.extraXingDong = [];
                            }
                            player.storage.extraXingDong.push({
                                xingDong: 'gongJi',
                                anYiLiRenZhuiJi: true,
                                anYiLiRenTargetId: target.playerid,
                            });
                        },
                            },
                        },
                    },
                    "eHuoShuLian": {
                        "audio": "ext:峡谷幻音/audio/skill/yaTuoKeSi/eHuoShuLian.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "usable": 1,
                        "isSafeForAi": function(player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "filter": function(event, player) {
                    return player.countCards('h', function(card) {
                        return get.type(card, player) == 'faShu';
                    }) > 0 && !game.hasPlayer(function(current) {
                        return current.countZhiShiWu(
                            'eHuoShuLianKa'
                        ) > 0;
                    }) && game.hasPlayer(function(current) {
                        return current.side != player.side;
                    });
                },
                        "filterCard": function(card, player) {
                    return get.type(card, player) == 'faShu';
                },
                        "check": function(card) {
                    return 8 - get.value(card);
                },
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "content": async function(event, trigger, player) {
                    await player.draw(2);
                    var targets = await player.chooseTarget(
                        '恶火束链：选择一名对手',
                        true,
                        function(card, player, target) {
                            return target.side != player.side;
                        }
                    ).set('ai', function(target) {
                        return get.damageEffect2(
                            target,
                            _status.event.player,
                            1
                        );
                    }).forResultTargets();
                    var target = targets[0];
                    if(!target || !target.isIn()) return;
                    await target.faShuDamage(1, player);
                    if(!target.isIn()) return;
                    target.storage.eHuoShuLianSource =
                        player.playerid;
                    target.syncStorage('eHuoShuLianSource');
                    await target.addZhiShiWu(
                        'eHuoShuLianKa',
                        1,
                        true
                    );
                    player.addGongJi();
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.eHuoShuLian
                            .isSafeForAi(player) ? 4 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.eHuoShuLian
                                .isSafeForAi(player) ? 1 : -100;
                        },
                            },
                        },
                    },
                    "anYingChongJue": {
                        "audio": "ext:峡谷幻音/audio/skill/yaTuoKeSi/anYingChongJue.mp3",
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    return !!event && event.yingZhan != true;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【暗影冲决】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var xiBie = get.xiBie(trigger.card);
                        var canRespond = target.countCards('h', function(card) {
                            return get.type(card, target) == 'gongJi' &&
                                (get.xiBie(card) == xiBie ||
                                    get.xiBie(card) == 'an');
                        }) > 0;
                        if(!canRespond) return false;
                        var currentDamage = Math.max(0, trigger.damageNum || 2);
                        var reducedDamage = Math.max(0, currentDamage - 2);
                        var pressure = target.countCards('h') + reducedDamage >
                            target.getHandcardLimit();
                        return reducedDamage > 0 || pressure ||
                            get.shiQi(!player.side) <= 2;
                    }).forResult();
                },
                        "content": function(event, trigger, player) {
                    trigger.wuFaYingZhan();
                    trigger.changeDamageNum(-2);
                },
                    },
                    "daMie": {
                        "audio": "ext:峡谷幻音/audio/skill/yaTuoKeSi/daMie.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() &&
                        player.countZhiShiWu('xueJi') > 0 &&
                        !player.hasSkill(
                            'mieJueXingTaiZhuangTai'
                        ) &&
                        !player.isHengZhi();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    await player.faShuDamage(2, player, 'nocard');
                    await player.hengZhi();
                    player.addSkill('mieJueXingTaiZhuangTai');
                },
                        "check": function(event, player) {
                    if(player.countZhiShiWu('xueJi') <= 0) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return player.countCards('h', function(card) {
                        return get.type(card, player) == 'gongJi';
                    }) > 0;
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "xueRen": {
                        "intro": {
                            "name": "血刃",
                            "content": "mark",
                            "max": 3,
                        },
                        "onremove": "storage",
                        "markimage": "extension/峡谷幻音/mark_xueRen.png",
                    },
                    "xueJi": {
                        "intro": {
                            "name": "血祭",
                            "content": "mark",
                            "max": 2,
                        },
                        "onremove": "storage",
                        "markimage": "extension/峡谷幻音/mark_xueJi.png",
                    },
                    "tiMoYinXing": {
                        "mark": true,
                        "intro": {
                            "content": "持续到你的下个回合结束；你不能成为主动攻击的目标。",
                        },
                        "onremove": function(player) {
                    delete player.storage.tiMoYinXingPhase;
                    delete player.storage.tiMoYinXingExtraGongJi;
                    delete player.storage.tiMoYinXingExtraGongJiPending;
                },
                        "mod": {
                            "targetEnabled": function(card, player, target) {
                        if(get.type(card) != 'gongJi') return;
                        if(!_status.event || _status.event.yingZhan != true) return false;
                    },
                        },
                    },
                    "mieJueXingTaiZhuangTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "灭",
                        "intro": {
                            "name": "灭绝形态",
                            "content": "攻击伤害额外+1，无法以【治疗】抵御伤害；自身回合首次令对方士气下降后获得1【血祭】。",
                        },
                    },
                    "anYiLiRenZhuiJi": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "追",
                        "isPursuitAction": function(player) {
                    var current = _status.event;
                    var guard = 0;
                    while(current && guard < 20) {
                        if(current.name == 'gongJi' &&
                            current.player == player &&
                            current.action === true &&
                            current.anYiLiRenZhuiJi === true) {
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
                        "intro": {
                            "name": "暗裔利刃·断空",
                            "content": function(storage, player) {
                        var id =
                            player.storage.anYiLiRenZhuiJiTarget;
                        var target = game.players.find(function(current) {
                            return current.playerid == id;
                        });
                        return '下一次额外【攻击行动】只能主动攻击' +
                            (target ? get.translation(target) : '原目标');
                    },
                        },
                        "mod": {
                            "playerEnabled": function(card, source, target) {
                        if(!source ||
                            !source.hasSkill('anYiLiRenZhuiJi') ||
                            !lib.skill.anYiLiRenZhuiJi
                                .isPursuitAction(source) ||
                            get.type(card) != 'gongJi') return;
                        var id =
                            source.storage.anYiLiRenZhuiJiTarget;
                        if(!target ||
                            target.playerid != id ||
                            target.countZhiShiWu(
                                'eHuoShuLianKa'
                            ) <= 0) {
                            return false;
                        }
                    },
                        },
                        "group": [
                            "anYiLiRenZhuiJi_quXiao",
                            "anYiLiRenZhuiJi_qingChu",
                        ],
                        "onremove": function(player) {
                    delete player.storage.anYiLiRenZhuiJiTarget;
                    player.syncStorage('anYiLiRenZhuiJiTarget');
                },
                        "subSkill": {
                            "quXiao": {
                                "trigger": {
                                    "player": "gongJiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            if(!player.hasSkill(
                                'anYiLiRenZhuiJi'
                            ) ||
                                event.anYiLiRenZhuiJi !== true) {
                                return false;
                            }
                            var id =
                                player.storage.anYiLiRenZhuiJiTarget;
                            var target = game.players.find(
                                function(current) {
                                    return current.playerid == id;
                                }
                            );
                            return !target ||
                                !target.isIn() ||
                                target.countZhiShiWu(
                                    'eHuoShuLianKa'
                                ) <= 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.cancel();
                            player.removeSkill('anYiLiRenZhuiJi');
                            game.log(
                                player,
                                '的【暗裔利刃·断空】追击被取消'
                            );
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "gongJiAfter",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!player.hasSkill(
                                'anYiLiRenZhuiJi'
                            )) return false;
                            if(event.anYiLiRenZhuiJi === true) {
                                return true;
                            }
                            var action = event.getParent &&
                                event.getParent('gongJi');
                            return !!action &&
                                action.anYiLiRenZhuiJi === true;
                        },
                                "content": function(event, trigger, player) {
                            player.removeSkill('anYiLiRenZhuiJi');
                        },
                            },
                        },
                    },
                    "eHuoShuLianKa": {
                        "charlotte": true,
                        "intro": {
                            "name": "专属卡【恶火束链】",
                            "content": "应战攻击伤害-1；拥有者回合结束时移除。",
                            "max": 1,
                        },
                        "markimage": "extension/峡谷幻音/mark_eHuoShuLianKa.png",
                        "group": [
                            "eHuoShuLianKa_yingZhan",
                            "eHuoShuLianKa_qingChu",
                            "eHuoShuLianKa_biaoJiQingLi",
                        ],
                        "onremove": function(player) {
                    delete player.storage.eHuoShuLianKa;
                    delete player.storage.eHuoShuLianSource;
                    player.syncStorage('eHuoShuLianSource');
                },
                        "subSkill": {
                            "yingZhan": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return event.yingZhan === true &&
                                player.countZhiShiWu(
                                    'eHuoShuLianKa'
                                ) > 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(-1);
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "filter": function(event, player) {
                            return player.countZhiShiWu(
                                'eHuoShuLianKa'
                            ) > 0;
                        },
                                "content": async function(event, trigger, player) {
                            var count = player.countZhiShiWu(
                                'eHuoShuLianKa'
                            );
                            await player.removeZhiShiWu(
                                'eHuoShuLianKa',
                                count
                            );
                            delete player.storage.eHuoShuLianSource;
                            player.syncStorage(
                                'eHuoShuLianSource'
                            );
                        },
                            },
                            "biaoJiQingLi": {
                                "trigger": {
                                    "player": "changeZhiShiWuAfter",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return event.zhiShiWu ==
                                'eHuoShuLianKa' &&
                                player.countZhiShiWu(
                                    'eHuoShuLianKa'
                                ) == 0 &&
                                !!player.storage
                                    .eHuoShuLianSource;
                        },
                                "content": function(event, trigger, player) {
                            delete player.storage.eHuoShuLianSource;
                            player.syncStorage(
                                'eHuoShuLianSource'
                            );
                        },
                            },
                        },
                    },
                },
                "translate": {
                    "qinYinGongMing": "被动【琴音共鸣】",
                    "qinYinGongMing_info": "<span class='tiaoJian'>（你演奏一种乐章时）</span>若与上一次演奏的乐章不同，+1<span class='lan'>【和弦】</span>。若因此达到3，移除全部<span class='lan'>【和弦】</span>，强化本次乐章，并在结算后+1【攻击行动】。",
                    "yingYongZanMeiShi": "法术【英勇赞美诗】",
                    "yingYongZanMeiShi_info": "对目标对手造成1点法术伤害③；可以额外弃置一张【威力赐福】，为其他所有我方角色附加【英勇余音】。<span class='tiaoJian'>（受到【琴音共鸣】强化时）</span>改为指定至多两名对手并依次对其各造成1点法术伤害③。",
                    "jianYiYongTanDiao": "法术【坚毅咏叹调】",
                    "jianYiYongTanDiao_info": "目标我方角色+1【治疗】；可以额外弃置一张【治疗术】或【治愈之光】，为其他所有我方角色附加【坚毅余音】。<span class='tiaoJian'>（受到【琴音共鸣】强化时）</span>改为目标+2【治疗】。",
                    "xunJieZouMingQu": "法术【迅捷奏鸣曲】",
                    "xunJieZouMingQu_info": "目标我方角色弃置1张手牌【强制】；可以额外弃置一张【迅捷赐福】，为其他所有我方角色附加【迅捷余音】。<span class='tiaoJian'>（受到【琴音共鸣】强化时）</span>改为弃置2张手牌【强制】，然后摸1张牌。",
                    "liLiangHeXian": "被动【力量和弦】",
                    "liLiangHeXian_info": "娑娜的三种乐章结算后，根据此次乐章获得对应余音。余音只能存在一种，释放其他乐章时会被替换。<br>【英勇余音】：<span class='tiaoJian'>（攻击命中时）</span>本次攻击伤害额外+1，随后移除。<br>【坚毅余音】：<span class='tiaoJian'>（承受其他角色造成的伤害时）</span>该伤害-1⑤，随后移除。<br>【迅捷余音】：<span class='tiaoJian'>（下一次执行【特殊行动】后）</span>弃1张牌【强制】，随后移除。",
                    "jiXingBianZou": "响应【即兴变奏】",
                    "jiXingBianZou_info": "演奏乐章需要额外弃置指定独有技牌时，可以支付【水晶】×1并弃置两张手牌，代替此次需要弃置的独有技牌。每次演奏至多发动一次。",
                    "suoNaYingYongYuYin": "英勇余音",
                    "suoNaYingYongYuYin_info": "<span class='tiaoJian'>（攻击命中时）</span>本次攻击伤害额外+1，随后移除。",
                    "suoNaJianYiYuYin": "坚毅余音",
                    "suoNaJianYiYuYin_info": "<span class='tiaoJian'>（承受其他角色造成的伤害时）</span>该伤害-1⑤，随后移除。",
                    "suoNaXunJieYuYin": "迅捷余音",
                    "suoNaXunJieYuYin_info": "<span class='tiaoJian'>（下一次执行【特殊行动】后）</span>弃1张牌【强制】，随后移除。",
                    "suoNaHeXian": "和弦",
                    "suoNaHeXian_info": "娑娜的专属指示物，上限为3。",
                    "kuangWuZhongLeZhang": "法术【狂舞终乐章】",
                    "kuangWuZhongLeZhang_info": "【宝石】×2，指定一至两名对手，依次对其各造成1点法术伤害③，并为其使用一张【虚弱】。",
                    "yinXingDeChiBang": "被动【隐形的翅膀】",
                    "yinXingDeChiBang_info": "<span class='tiaoJian'>（【特殊行动】结束后）</span>【横置】；直到你的下个回合结束，你不能成为主动攻击的目标。<span class='tiaoJian'>（你的回合开始时，若你【横置】）</span>【重置】，本回合额外+1【攻击行动】。<span class='tiaoJian'>（你在【横置】时受到伤害后）</span>【重置】。",
                    "tiMoYinXing": "隐形",
                    "tiMoYinXing_info": "持续到提莫的下个回合结束，不能成为主动攻击的目标。",
                    "zhiMangChuiJian": "法术【致盲吹箭】",
                    "zhiMangChuiJian_info": "<span class='tiaoJian'>（弃置1张法术牌【展示】）</span>对目标对手施加【致盲】；已有【致盲】的角色不能成为目标。",
                    "tiMoZhiMang": "专属【致盲】",
                    "tiMoZhiMang_info": "持有者主动攻击伤害-2、应战攻击伤害-1；<span class='tiaoJian'>（其回合结束后）</span>移除。",
                    "xiaoMoKuaiPao": "法术【小莫快跑】",
                    "xiaoMoKuaiPao_info": "<span class='tiaoJian'>（手牌数大于2时）</span>摸1张牌【强制】，然后面朝下弃置2张牌。",
                    "duXingSheJi": "被动【毒性射击】",
                    "duXingSheJi_info": "<span class='tiaoJian'>（攻击命中时）</span>对攻击目标额外造成1点法术伤害。",
                    "moGuFangZhi": "响应【蘑菇生成】",
                    "moGuFangZhi_info": "<span class='tiaoJian'>（你的能量区有【宝石】且你面朝下弃牌时）</span>将弃牌置于自己角色旁作为<span class='lan'>【蘑菇】</span>，最多放置至上限。",
                    "tiMoMoGu": "蘑菇",
                    "tiMoMoGu_info": "提莫的专属盖牌；自己角色旁上限为3。",
                    "zhongMoGu": "法术【种蘑菇】",
                    "zhongMoGu_info": "【水晶】<span class='tiaoJian'>（移除场上1个<span class='lan'>【蘑菇】</span>）</span>将其置于专属卡【种蘑菇】上，然后将该卡转移给目标对手；其上最多有2个【蘑菇】。",
                    "tiMoZhongMoGuKa": "专属卡【种蘑菇】",
                    "tiMoZhongMoGuKa_info": "其上的【蘑菇】仅提莫可见。<span class='tiaoJian'>（持有者打出或展示与其中1个【蘑菇】同系的牌时）</span>移除该【蘑菇】【展示】，提莫对其造成3点法术伤害③。",
                    "tiMoZhongMoGuPai": "种蘑菇上的蘑菇",
                    "tiMoZhongMoGuPai_info": "置于专属卡【种蘑菇】上的【蘑菇】，上限为2；实体牌仅提莫可见。",
                    "xueRen": "血刃",
                    "xueRen_info": "亚托克斯的专属指示物，上限为3；跨回合保留，<span class='tiaoJian'>（第3层【暗裔利刃】的攻击行动结束后）</span>清空。",
                    "xueJi": "血祭",
                    "xueJi_info": "亚托克斯的专属指示物，上限为2。",
                    "mieJueXingTai": "被动【灭绝形态】",
                    "mieJueXingTai_info": "<span class='tiaoJian'>（【灭绝形态】下）</span>攻击伤害额外+1；不能以【治疗】抵御伤害；<span class='tiaoJian'>（你的回合内首次令对方士气下降后）</span>+1<span class='hong'>【血祭】</span>。<span class='tiaoJian'>（你的回合开始时）</span>若有【血祭】，移除1点；否则【重置】并退出该形态。",
                    "mieJueXingTaiZhuangTai": "灭绝形态",
                    "mieJueXingTaiZhuangTai_info": "攻击伤害额外+1；不能以【治疗】抵御伤害；自身回合首次令对方士气下降后+1<span class='hong'>【血祭】</span>。",
                    "ciSiJianQi": "响应【赐死剑气】",
                    "ciSiJianQi_info": "【回合限定】<span class='tiaoJian'>（主动攻击命中后②）</span>+1【治疗】。移除目标1【治疗】；若其没有【治疗】，本次攻击伤害额外+1。",
                    "anYiLiRen": "响应【暗裔利刃】",
                    "anYiLiRen_info": "<span class='tiaoJian'>（主动攻击前①）</span>对自己造成1点法术伤害③，然后+1<span class='hong'>【血刃】</span>并按其数量结算；即使未承受此次伤害，仍继续结算：<br>1层：本次攻击伤害额外+1。<br>2层：本次攻击伤害额外+1；若对【恶火束链】持有者造成实际伤害，行动结束后额外+1【攻击行动】，只能攻击该角色。<br>3层：本次攻击伤害额外+2；行动结束后移除全部<span class='hong'>【血刃】</span>，若造成过实际伤害，+1<span class='hong'>【血祭】</span>。",
                    "anYiLiRenZhuiJi": "暗裔利刃·断空",
                    "anYiLiRenZhuiJi_info": "下一次额外【攻击行动】只能主动攻击本次【暗裔利刃·断空】命中的【恶火束链】拥有者；目标或束链失效时取消该行动。",
                    "eHuoShuLian": "法术【恶火束链】",
                    "eHuoShuLian_info": "【回合限定】<span class='tiaoJian'>（场上没有【恶火束链】，弃置1张法术牌）</span>摸2张牌【强制】，指定一名对手，对其造成1点法术伤害③，并将【恶火束链】放置于其面前，然后额外+1【攻击行动】。",
                    "eHuoShuLianKa": "(专)【恶火束链】",
                    "eHuoShuLianKa_info": "全场上限为1。持有者应战攻击伤害-1；<span class='tiaoJian'>（其回合结束时）</span>移除。",
                    "anYingChongJue": "响应【暗影冲决】",
                    "anYingChongJue_info": "【回合限定】<span class='tiaoJian'>（主动攻击前①）</span>本次攻击无法被应战，但伤害-2。",
                    "daMie": "启动【大灭】",
                    "daMie_info": "【宝石】<span class='tiaoJian'>（【普通形态】下，<span class='hong'>【血祭】</span>＞0）</span>对自己造成2点法术伤害③，然后【横置】并进入【灭绝形态】。",
                },
            },
            "intro": "添加角色提莫、娑娜、亚托克斯。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "1.6",
        },
        "files": {
            "character": [
                "tiMo.jpg",
                "suoNa.jpg",
                "yaTuoKeSi.jpg",
            ],
            "card": [],
            "skill": [
                "mark_tiMoZhongMoGuKa.png",
                "mark_suoNaHeXian.png",
                "mark_suoNaYingYongYuYin.png",
                "mark_suoNaJianYiYuYin.png",
                "mark_suoNaXunJieYuYin.png",
                "mark_xueRen.png",
                "mark_xueJi.png",
                "mark_eHuoShuLianKa.png",
            ],
            "audio": [
                "audio/skill/tiMo/yinXingDeChiBang.mp3",
                "audio/skill/tiMo/zhiMangChuiJian.mp3",
                "audio/skill/tiMo/xiaoMoKuaiPao.mp3",
                "audio/skill/tiMo/duXingSheJi.mp3",
                "audio/skill/tiMo/moGuShengCheng.mp3",
                "audio/skill/tiMo/zhongMoGu.mp3",
                "audio/skill/tiMo/zhongMoGu_trigger.mp3",
                "audio/action/tiMo/gouMai.mp3",
                "audio/action/tiMo/heCheng.mp3",
                "audio/action/tiMo/tiLian.mp3",
                "audio/skill/suoNa/qinYinGongMing.mp3",
                "audio/skill/suoNa/yingYongZanMeiShi.mp3",
                "audio/skill/suoNa/jianYiYongTanDiao.mp3",
                "audio/skill/suoNa/xunJieZouMingQu.mp3",
                "audio/skill/suoNa/jiXingBianZou.mp3",
                "audio/skill/suoNa/kuangWuZhongYueZhang.mp3",
                "audio/action/suoNa/gouMai.mp3",
                "audio/action/suoNa/heCheng.mp3",
                "audio/action/suoNa/tiLian.mp3",
                "audio/skill/yaTuoKeSi/ciSiJianQi.mp3",
                "audio/skill/yaTuoKeSi/anYiLiRen_first.mp3",
                "audio/skill/yaTuoKeSi/anYiLiRen_second.mp3",
                "audio/skill/yaTuoKeSi/anYiLiRen_third.mp3",
                "audio/skill/yaTuoKeSi/eHuoShuLian.mp3",
                "audio/skill/yaTuoKeSi/anYingChongJue.mp3",
                "audio/skill/yaTuoKeSi/daMie.mp3",
                "audio/skill/yaTuoKeSi/mieJueXingTai_end.mp3",
                "audio/action/yaTuoKeSi/gouMai.mp3",
                "audio/action/yaTuoKeSi/heCheng.mp3",
                "audio/action/yaTuoKeSi/tiLian.mp3",
            ],
        },
        "connect": true,
    };
});
