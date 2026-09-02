game.import("extension", function(lib, game, ui, get, ai, _status) {
    return {
        "name": "宿命挽歌",
        "arenaReady": function(){
            game.addGlobalSkill("suMingWanGeBgm");
            game.addGlobalSkill("suMingWanGeCharacterActionAudio");
},
        "content": function(config,pack){

},
        "prepare": function(){

},
        "precontent": function(){
            if(!lib.suMingWanGeShiQiUiGuard&&
                typeof ui.updateShiQiInfo=='function'){
                lib.suMingWanGeShiQiUiGuard=true;
                var updateShiQiInfo=ui.updateShiQiInfo;
                ui.updateShiQiInfo=function(){
                    if(!ui.shiQiInfo){
                        if(ui.window&&ui.create&&
                            typeof ui.create.zhanJi=='function'){
                            ui.create.zhanJi();
                        }
                        if(!ui.shiQiInfo) return;
                    }
                    return updateShiQiInfo.apply(this,arguments);
                };
            }
            var menuMusic =
                "ext:宿命挽歌/audio/bgm/yunGuHeFeng.mp3";
            lib.config.all.background_music.add(menuMusic);
            lib.configMenu.audio.config.background_music.item[menuMusic] =
                "云谷鹤峰";
            if(!lib.config.extension_宿命挽歌_menuMusicInstalled){
                if(lib.config.background_music != "music_off"){
                    game.saveConfig("background_music", menuMusic);
                }
                game.saveConfig(
                    "extension_宿命挽歌_menuMusicInstalled", true
                );
                if(ui.backgroundMusic) game.playBackgroundMusic();
            }
            if(!lib.suMingWanGeBgmRestoreRegistered){
                lib.suMingWanGeBgmRestoreRegistered=true;
                lib.onover.push(function(){
                    if(!_status.suMingWanGeBgmStarted) return;
                    if(ui.backgroundMusic) ui.backgroundMusic.loop=false;
                    if(_status.suMingWanGeHadTempMusic){
                        _status.tempMusic=_status.suMingWanGeOriginalTempMusic;
                    }
                    else{
                        delete _status.tempMusic;
                    }
                    delete _status.suMingWanGeBgmStarted;
                    delete _status.suMingWanGeHadTempMusic;
                    delete _status.suMingWanGeOriginalTempMusic;
                    game.playBackgroundMusic();
                });
            }
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
                            "mengShe",
                            "zhaoLingErMengSheTu",
                            "tianSheZhang",
                            "wuQiChaoYuan",
                            "guanYinZhou",
                            "shengLingZhu",
                            "shengLingPiFeng",
                            "wuShen",
                            "zhaoLingErRouQingXiaGu",
                            "lingLi",
                            "jueXingDu",
                            "suMingWanGeBgm",
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
                            "suMingWanGeBgm",
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
                            "suMingWanGeBgm",
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
                            "haiTangFuRen",
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
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:个性刁钻伶俐，活泼可爱，年纪小却很精明；口快心直，却不失俏皮；虽然外表天真烂漫，但巫术毒蛊却运用自如。",
                            "ext:宿命挽歌/aNu.jpg",
                            "die:ext:宿命挽歌/audio/die/aNu.mp3",
                        ],
                    ],
                    "baiYueJiaoZhu": [
                        null,
                        "xueGroup",
                        4.5,
                        [
                            "niTianWenDao",
                            "shuiMoShouHeTi",
                            "mieJueYiJi",
                            "duoHun",
                            "daZhouShe",
                            "duTunTianXia",
                            "qunMoLuanWu",
                            "guiJiang",
                            "shuiMoShouHuTi",
                            "xingFengXueYu",
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:南诏国拜月教教主，精通黑暗法术，以冷静而偏执的方式追问天地与人心。",
                            "ext:宿命挽歌/baiYueJiaoZhu.png",
                        ],
                    ],
                    "shuiMoShouBaiYueJiaoZhu": [
                        null,
                        "xueGroup",
                        4.5,
                        [
                            "niTianWenDao",
                            "shuiMoShouZhiQu",
                            "shuiMoShouZhiNu",
                            "nvWaZhiXue",
                            "yongSheng",
                            "zhangDuZhen",
                            "diLieTianBeng",
                            "taoTianJuLang",
                            "fengXueBingTian",
                            "hongShui",
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:拜月教主与水魔兽合体后的形态，仅能由【水魔兽合体】转化而来。",
                            "ext:宿命挽歌/shuiMoShouBaiYueJiaoZhu.png",
                            "unseen",
                            "forbidai",
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
                    "baiYueJiaoZhu": "拜月教主",
                    "shuiMoShouBaiYueJiaoZhu": "水魔兽·拜月教主",
                },
            },
            "card": {
                "card": {
                    "fengMo": {
                        "fullskin": true,
                        "type": "zhuanShu",
                        "enable": false,
                    },
                },
                "translate": {
                    "fengMo": "封魔",
                    "fengMo_info": "<span class='tiaoJian'>（位于角色旁时）</span>你无法发动响应技与法术；拥有者的回合结束时移除。",
                },
                "list": [],
            },
            "skill": {
                "skill": {
                    "suMingWanGeBgm": {
                        charlotte: true,
                        hasPackCharacter: function(packName, fallbackIds){
                            var pack=lib.characterPack&&lib.characterPack[packName];
                            var ids=pack ? Object.keys(pack) : fallbackIds;
                            return game.hasPlayer(function(current){
                                return ids.some(function(characterId){
                                    return lib.skill.suMingWanGeLianDong
                                        .isCharacter(current,characterId);
                                });
                            });
                        },
                        playTrack: function(src){
                            game.broadcastAll(function(src){
                                if(!_status.suMingWanGeBgmStarted){
                                    _status.suMingWanGeHadTempMusic=
                                        Object.prototype.hasOwnProperty.call(
                                            _status,"tempMusic"
                                        );
                                    _status.suMingWanGeOriginalTempMusic=
                                        _status.tempMusic;
                                }
                                _status.suMingWanGeBgmStarted=true;
                                _status.tempMusic=src;
                                game.playBackgroundMusic();
                                if(ui.backgroundMusic&&
                                    lib.config.background_music!="music_off"){
                                    ui.backgroundMusic.loop=true;
                                    ui.backgroundMusic.currentTime=0;
                                    var playResult=ui.backgroundMusic.play();
                                    if(playResult&&playResult.catch){
                                        playResult.catch(function(){});
                                    }
                                }
                            },src);
                        },
                        trigger: {global:"gameStart"},
                        forced: true,
                        popup: false,
                        firstDo: true,
                        priority: 100,
                        filter: function(){
                            return !_status.suMingWanGeBgmStarted;
                        },
                        content: function(){
                            var tracks=[
                                ["shuiMoShouBaiYueJiaoZhu","ext:宿命挽歌/audio/bgm/niTianErXing2.mp3"],
                                ["baiYueJiaoZhu","ext:宿命挽歌/audio/bgm/niTianErXing.mp3"],
                                ["linYueRu","ext:宿命挽歌/audio/bgm/biWuZhaoQin.mp3"],
                                ["aNu","ext:宿命挽歌/audio/bgm/taoHuaHuanMeng.mp3"],
                                ["zhaoLingEr","ext:宿命挽歌/audio/bgm/qingYuan.mp3"],
                                ["liXiaoYao","ext:宿命挽歌/audio/bgm/yuJianFuMo.mp3"],
                            ];
                            var music;
                            for(var i=0;i<tracks.length;i++){
                                if(game.hasPlayer(function(current){
                                    return lib.skill.suMingWanGeLianDong
                                        .isCharacter(current,tracks[i][0]);
                                })){
                                    music=tracks[i][1];
                                    break;
                                }
                            }
                            var bigCowTracks=[
                                ["zhaoFuQueJi","ext:宿命挽歌/audio/bgm/gangGangJiJi.mp3"],
                                ["tongGuHeRen","ext:宿命挽歌/audio/bgm/swordland.mp3"],
                                ["shiDiFu","ext:宿命挽歌/audio/bgm/pigstep.mp3"],
                                ["xiaoYan","ext:宿命挽歌/audio/bgm/douPoCangQiong.mp3"],
                            ];
                            if(!music){
                                for(var j=0;j<bigCowTracks.length;j++){
                                    if(game.hasPlayer(function(current){
                                        return lib.skill.suMingWanGeLianDong
                                            .isCharacter(current,bigCowTracks[j][0]);
                                    })){
                                        music=bigCowTracks[j][1];
                                        break;
                                    }
                                }
                            }
                            if(!music&&lib.skill.suMingWanGeBgm.hasPackCharacter(
                                "永夜残响",
                                ["wuHeQinLi","yeDaoShenShiXiang","siMiNai","shiQiKuangSan"]
                            )){
                                music="ext:宿命挽歌/audio/bgm/dateALive.mp3";
                            }
                            if(!music&&lib.skill.suMingWanGeBgm.hasPackCharacter(
                                "创世纪",
                                ["beiyanadopushen","baiHuaLiaoLuan","luMiYa","tianQiZhe","yuXueMoShen"]
                            )){
                                music="ext:宿命挽歌/audio/bgm/fengYiYangDeYongShi.mp3";
                            }
                            if(!music){
                                music="ext:宿命挽歌/audio/bgm/ending.mp3";
                            }
                            lib.skill.suMingWanGeBgm.playTrack(music);
                        },
                    },
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
                    "suMingWanGeCharacterActionAudio": {
                        trigger: {
                            player: ["gouMai", "heCheng", "tiLian"],
                        },
                        forced: true,
                        popup: false,
                        charlotte: true,
                        firstDo: true,
                        content: function(event, trigger, player) {
                            var files = {
                                gouMai: "gouMai.mp3",
                                heCheng: "heCheng.mp3",
                                tiLian: "tiLian.mp3",
                            };
                            var actionName = event.triggername || trigger.name;
                            var file = files[actionName];
                            if (!file) return;
                            var supported = [
                                "zhaoLingEr",
                                "liXiaoYao",
                                "linYueRu",
                                "aNu",
                                "baiYueJiaoZhu",
                                "shuiMoShouBaiYueJiaoZhu",
                            ];
                            var character = [
                                player.name,
                                player.name1,
                                player.name2,
                            ].find(function(characterId) {
                                return supported.includes(characterId);
                            });
                            if (!character) return;
                            var path = "ext:宿命挽歌/audio/action/" +
                                character + "/" + file;
                            game.broadcastAll(function(audioPath, audioSpeaker) {
                                if (!lib.config.background_audio) return;
                                game.playAudio({
                                    path: audioPath,
                                    spatialPlayer: audioSpeaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, path, player);
                        },
                    },
                    "zhaoLingErRouQingXiaGu": {},
                    "liXiaoYaoRouQingXiaGu": {
                        "audio": "ext:宿命挽歌/audio/skill/liXiaoYaoRouQingXiaGu.mp3",
                    },
                    "liXiaoYaoRouQingXiaGuZhaoLingEr": {
                        "audio": "ext:宿命挽歌/audio/skill/liXiaoYaoRouQingXiaGuZhaoLingEr.mp3",
                    },
                    "liXiaoYaoRouQingXiaGuLinYueRu": {
                        "audio": "ext:宿命挽歌/audio/skill/liXiaoYaoRouQingXiaGuLinYueRu.mp3",
                    },
                    "liXiaoYaoYuJianShuVoice": {
                        "audio": "ext:宿命挽歌/audio/skill/yuJianShu.mp3",
                    },
                    "liXiaoYaoQiXingJianVoice": {
                        "audio": "ext:宿命挽歌/audio/skill/qiXingJian.mp3",
                    },
                    "liXiaoYaoTianGangZhanQiVoice": {
                        "audio": "ext:宿命挽歌/audio/skill/tianGangZhanQi.mp3",
                    },
                    "linYueRuRouQingXiaGu": {},
                    "wuLingXianShu": {
                        "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
                        "isLegalTarget": function(player, target) {
                            return !player.hasSkill('nvWaHouRen') ||
                                target.countCards('h') < target.getHandcardLimit();
                        },
                        "getLegalTargets": function(player) {
                    return game.filterPlayer(function(target) {
                        return lib.skill.wuLingXianShu.isLegalTarget(player, target);
                    });
                        },
                        "subSkill": {
                            "faShuHua": {
                                "trigger": {"source": "zaoChengShangHai"},
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "filter": function(event) {
                                    return event.faShu !== true;
                                },
                                "content": function(event, trigger) {
                                    trigger.faShu = true;
                                },
                            },
                            "yunShi": {
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
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
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
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
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
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
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
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
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
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
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
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
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
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
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
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
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
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
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
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
                            "wuLingXianShu_faShuHua",
                            "wuLingXianShu_yunShi",
                            "wuLingXianShu_bingDong",
                            "wuLingXianShu_huoQou",
                            "wuLingXianShu_fengRen",
                            "wuLingXianShu_leiJi",
                        ],
                        "_priority": 0,
                    },
                    "nvWaHouRen": {
                        "trigger": {"player": "changeZhiShiWuEnd"},
                        "forced": true,
                        "group": ["nvWaHouRen_kaiJu"],
                        "subSkill": {
                            "kaiJu": {
                                "trigger": {"global": "gameStart"},
                                "forced": true,
                                "popup": false,
                                "firstDo": true,
                                "priority": 90,
                                "content": function(event, trigger, player) {
                                    var audioPath =
                                        'ext:宿命挽歌/audio/skill/nvWaHouRen.mp3';
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
                            },
                        },
                        "filter": function(event, player) {
                    return event.zhiShiWu == 'lingLi' && event.num < 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.addZhiShiWu('jueXingDu', -trigger.num);
                    if(player.countZhiShiWu('jueXingDu') < 10) return;
                    if(!player.isHengZhi()) await player.hengZhi();
                    player.addSkill('mengSheXingTai');
                    var audioPath =
                        'ext:宿命挽歌/audio/skill/mengShe.mp3';
                    game.broadcastAll(function(path, speaker) {
                        if(!lib.config.background_audio) return;
                        game.playAudio({
                            path: path,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, audioPath, player);
                    player.removeSkill('nvWaHouRen');
                },
                        "_priority": 0,
                    },
                    "mengShe": {
                        "audio": "ext:宿命挽歌/audio/skill/mengShe.mp3",
                        "trigger": {"source": "zaoChengShangHai"},
                        "forced": true,
                        "filter": function(event, player) {
                            return player.hasSkill('mengSheXingTai') &&
                                event.num > 0;
                        },
                        "content": function(event, trigger) {
                            trigger.changeDamageNum(1);
                        },
                        "priority": -1,
                    },
                    "mengSheXingTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "蛇",
                        "intro": {
                            "name": "梦蛇形态",
                            "content": "你已失去【女娲后人】；造成的攻击伤害与法术伤害+1。",
                        },
                    },
                    "zhaoLingErMengSheTu": {
                        "charlotte": true,
                        "trigger": {
                            "player": ["hengZhiAfter", "chongZhiAfter"],
                            "global": "gameStart",
                        },
                        "forced": true,
                        "popup": false,
                        "firstDo": true,
                        "setAvatar": function(target, dream) {
                            game.broadcastAll(function(target, dream) {
                                var setNode = function(node) {
                                    if(!node) return;
                                    if(dream) {
                                        node.setBackgroundImage(
                                            'extension/宿命挽歌/' +
                                            'zhaoLingEr_mengShe.png'
                                        );
                                    }
                                    else {
                                        node.setBackground(
                                            'zhaoLingEr', 'character'
                                        );
                                    }
                                };
                                if(target.name == 'zhaoLingEr' ||
                                    target.name1 == 'zhaoLingEr') {
                                    setNode(target.node.avatar);
                                }
                                if(target.name2 == 'zhaoLingEr') {
                                    setNode(target.node.avatar2);
                                }
                                if(target == game.me && ui.fakeme &&
                                    target.node.avatar) {
                                    ui.fakeme.style.backgroundImage =
                                        target.node.avatar.style.backgroundImage;
                                }
                            }, target, dream);
                        },
                        "content": function(event, trigger, player) {
                            lib.skill.zhaoLingErMengSheTu.setAvatar(
                                player, player.isHengZhi()
                            );
                        },
                    },
                    "tianSheZhang": {
                        "audio": "ext:宿命挽歌/audio/skill/tianSheZhang.mp3",
                        "logAudio": function(event) {
                    if(event && event.source &&
                        event.source.hasSkill('mengSheXingTai')) {
                        return false;
                    }
                    return 'ext:宿命挽歌/audio/skill/tianSheZhang.mp3';
                },
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
                        "audio": "ext:宿命挽歌/audio/skill/wuQiChaoYuan.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "shouldUse": function(player){
                    if(player.countZhiShiWu('lingLi')<5) return false;
                    return game.hasPlayer(function(current){
                        if(current==player||current.side!=player.side) return false;
                        var limit=current.getZhiLiaoLimit();
                        return limit-current.zhiLiao>limit*0.5;
                    });
                },
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
                            "order": function(item,player){
                    return lib.skill.wuQiChaoYuan.shouldUse(player)?8.5:3.7;
                },
                            "result": {
                                "player": function(player){
                            return lib.skill.wuQiChaoYuan.shouldUse(player)?2:0;
                        },
                                "target": function(player,target){
                            return get.zhiLiaoEffect(target,2);
                        },
                            },
                        },
                        "_priority": 0,
                    },
                    "guanYinZhou": {
                        "audio": "ext:宿命挽歌/audio/skill/guanYinZhou.mp3",
                        "enable": "faShu",
                        "type": "faShu",
                        "filterTarget": true,
                        "prompt": "令目标角色+1[治疗]，你+1[灵力]",
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
                            await player.addZhiShiWu('lingLi',1);
                            return;
                        }
                    }
                    await skillTarget.changeZhiLiao(1,player);
                    await player.addZhiShiWu('lingLi',1);
                },
                        "ai": {
                            "result": {
                                "target": function(player,target){
                            if(target.side != player.side) return -2;
                            var value = get.zhiLiaoEffect(target,1) + 1.2;
                            if(lib.skill.suMingWanGeLianDong
                                .isCharacter(target,'liXiaoYao') &&
                                target.countZhiShiWu('jianY') <
                                    lib.skill.jianY.intro.max) value += 1.2;
                            if(lib.skill.suMingWanGeLianDong
                                .isCharacter(target,'linYueRu') &&
                                target.countZhiShiWu('qiJing') <
                                    lib.skill.qiJing.intro.max) value += 1.2;
                            return value;
                        },
                            },
                            "order": 6.2,
                        },
                        "_priority": 0,
                    },
                    "shengLingZhu": {
                        "audio": "ext:宿命挽歌/audio/skill/shengLingZhu.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/shengLingPiFeng.mp3",
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
                    if(player.countNengLiang('shuiJing') < 1) return false;
                    if(!player.canFaShu() ||
                        player.countZhiShiWu('lingLi') != 3) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return game.hasPlayer(function(current) {
                        return current.side == player.side &&
                            current.zhiLiao < current.getZhiLiaoLimit();
                    });
                },
                        "ai": {
                            "shuiJing": true,
                        },
                        "mod": {
                            "aiOrder": function(player, item, num) {
                                if(item == '_tiLian') return Math.min(num, 2);
                            },
                        },
                        "_priority": -100,
                    },
                    "wuShen": {
                        "audio": "ext:宿命挽歌/audio/skill/wuShen.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    return player.canBiShaBaoShi();
                },
                        "filterTarget": function(card, player, target) {
                    return lib.skill.wuLingXianShu.isLegalTarget(player, target);
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
                    "jueXingDu": {
                        "intro": {
                            "name": "觉醒度",
                            "content": "mark",
                            "max": 10,
                        },
                        "mark": true,
                        "marktext": "醒",
                        "onremove": "storage",
                        "markimage": "extension/宿命挽歌/mark_jueXingDu.png",
                    },
                    "yuJianShu": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "forced": true,
                        "content": function(){
                    lib.skill.yuJianShu.recordVoice(
                        trigger,
                        'yuJianShu'
                    );
                    player.addZhiShiWu('jianY');
                },
                        "recordVoice": function(event, skill) {
                    var attack=lib.skill.yuJianShu
                        .getAttackEvent(event);
                    if(!attack) return null;
                    attack.customArgs=attack.customArgs||{};
                    attack.customArgs.liXiaoYaoAttackVoices=
                        attack.customArgs.liXiaoYaoAttackVoices||{};
                    attack.customArgs.liXiaoYaoAttackVoices[skill]=true;
                    return attack;
                },
                        "getAttackEvent": function(event) {
                    if(!event) return null;
                    var current=event;
                    var attack=null;
                    var depth=0;
                    while(current&&depth++<30){
                        if(current.customArgs&&
                            current.customArgs.liXiaoYaoAttackVoices){
                            return current;
                        }
                        if(!attack&&current.type=='gongJi'){
                            attack=current;
                        }
                        current=current.parent||
                            (current.getParent&&current.getParent());
                    }
                    return attack;
                },
                        "playVoice": function(attack, player, skill) {
                    if(!attack||!player||!skill) return false;
                    attack.customArgs=attack.customArgs||{};
                    var voices=attack.customArgs
                        .liXiaoYaoAttackVoices;
                    if(!voices||voices.played) return false;
                    voices.played=skill;
                    game.trySkillAudio(skill,player,true);
                    return true;
                },
                        "group": [
                            "yuJianShu_voice",
                            "yuJianShu_fallback",
                        ],
                        "subSkill": {
                            "voice": {
                                "trigger": {"source": "shouDaoShangHai"},
                                "forced": true,
                                "popup": false,
                                "filter": function(event) {
                            var attack=lib.skill.yuJianShu
                                .getAttackEvent(event);
                            var voices=attack&&attack.customArgs&&
                                attack.customArgs.liXiaoYaoAttackVoices;
                            return !!voices&&!voices.played&&
                                !!voices.yuJianShu;
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.yuJianShu.playVoice(
                                lib.skill.yuJianShu
                                    .getAttackEvent(trigger),
                                player,
                                'liXiaoYaoYuJianShuVoice'
                            );
                        },
                            },
                            "fallback": {
                                "trigger": {"source": "gongJiEnd"},
                                "forced": true,
                                "popup": false,
                                "filter": function(event) {
                            var attack=lib.skill.yuJianShu
                                .getAttackEvent(event);
                            var voices=attack&&attack.customArgs&&
                                attack.customArgs.liXiaoYaoAttackVoices;
                            return !!voices&&!voices.played;
                        },
                                "content": function(event, trigger, player) {
                            var attack=lib.skill.yuJianShu
                                .getAttackEvent(trigger);
                            var voices=attack.customArgs
                                .liXiaoYaoAttackVoices;
                            var voiceSkill=voices.tianGangZhanQi ?
                                'liXiaoYaoTianGangZhanQiVoice' :
                                voices.qiXingJian ?
                                    'liXiaoYaoQiXingJianVoice' :
                                    'liXiaoYaoYuJianShuVoice';
                            lib.skill.yuJianShu.playVoice(
                                attack,
                                player,
                                voiceSkill
                            );
                        },
                            },
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
                    var attack=lib.skill.yuJianShu.recordVoice(
                        trigger,
                        'qiXingJian'
                    );
                    lib.skill.yuJianShu.playVoice(
                        attack,
                        player,
                        'liXiaoYaoQiXingJianVoice'
                    );
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
                    var attack=lib.skill.yuJianShu.recordVoice(
                        trigger,
                        'tianGangZhanQi'
                    );
                    lib.skill.yuJianShu.playVoice(
                        attack,
                        player,
                        'liXiaoYaoTianGangZhanQiVoice'
                    );
                    var hasLinkedCharacter=
                        lib.skill.suMingWanGeLianDong
                            .hasCharacter('zhaoLingEr')||
                        lib.skill.suMingWanGeLianDong
                            .hasCharacter('linYueRu');
                    trigger.changeDamageNum(hasLinkedCharacter?1:2);
                },
                    },
                    "feiLongTanYunShou": {
                        "audio": "ext:宿命挽歌/audio/skill/feiLongTanYunShou.mp3",
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
                            var directAudioSkill=lib.skill
                                .suMingWanGeLianDong.isCharacter(
                                    trigger.player,
                                    'zhaoLingEr'
                                ) ?
                                'liXiaoYaoRouQingXiaGuZhaoLingEr' :
                                'liXiaoYaoRouQingXiaGuLinYueRu';
                            await trigger.player
                                .removeNengLiang(directStone,1);
                            await player.addNengLiang(directStone,1);
                            player.logSkill(
                                directAudioSkill,
                                trigger.player
                            );
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
                        "audio": "ext:宿命挽歌/audio/skill/tianShiFuFa.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/wanJianJue.mp3",
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "filter": function(event,player){
                    if(event.getParent('xingDong').wanJianJue==false) return false;// 不能与醉仙望月步在同一回合发动
                    if(player.countZhiShiWu('jianY')<4) return false;// 剑小于4不能发动
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
                    player.removeZhiShiWu('jianY',4);// 移除剑
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
                        "audio": "ext:宿命挽歌/audio/skill/xianFengYunTiShu.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/zuiXianWangYueBu.mp3",
                        "trigger": {
                            "source": "gongJiAfter",
                        },
                        "usable": 2,
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
                        "audio": "ext:宿命挽歌/audio/skill/xiaoYaoShenJian.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/jiuShenZhou.mp3",
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
                    var num=baoShi+shuiJing+2;
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
                    var num = player.countNengLiangAll() + 2;
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
                    var num = player.countNengLiangAll() + 2;
                    return get.damageEffect2(player, player, num) - 1;
                },
                                "target": function(player, target) {
                    return get.damageEffect(
                        target, player.countNengLiangAll() + 2
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
                        "group": ["linJiaQianJin_kaiJu"],
                        "subSkill": {
                            "kaiJu": {
                                "trigger": {"global": "gameStart"},
                                "forced": true,
                                "popup": false,
                                "firstDo": true,
                                "priority": 90,
                                "content": function(event, trigger, player) {
                                    var audioPath =
                                        'ext:宿命挽歌/audio/skill/linJiaQianJin.mp3';
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
                            },
                        },
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
                        var audioPath =
                            'ext:宿命挽歌/audio/skill/' +
                            'linJiaQianJinZhaoLingEr.mp3';
                        game.broadcastAll(function(path, speaker) {
                            if(!lib.config.background_audio) return;
                            game.playAudio({
                                path: path,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, audioPath, player);
                        await zhaoLingEr.addNengLiang('shuiJing',1);
                    }
                    else{
                        await player.addNengLiang('shuiJing',1);
                    }
                },
                    },
                    "ningShenGuiYuan": {
                        "audio": "ext:宿命挽歌/audio/skill/ningShenGuiYuan.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/qiJianZhi.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/yiYangZhi.mp3",
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
                    return event.yingZhan!=true;
                },
                        "check": function(event, player) {
                    var target = event.target;
                    if(!target || target.side == player.side) return false;
                    return true;
                },
                        "content": async function(event,trigger,player) {
					await player.removeZhiShiWu('qiJing',1);
					trigger.customArgs.yiYangZhi=true;
                    if(player.countNengLiang('shuiJing') > 0) {
                        await player.removeNengLiang('shuiJing');
                        await player.addNengLiang('baoShi',1);
                    }
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
                        "audio": "ext:宿命挽歌/audio/skill/qiJueJianQi.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/zhenYuanHuTi.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/zhanLongJue.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/tongQianBiao.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/qianKunYiZhi.mp3",
                        "audioname2": {
                            "aNu": "ext:宿命挽歌/audio/skill/aNuQianKunYiZhi.mp3",
                        },
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
                        "audio": "ext:宿命挽歌/audio/skill/miaoJiangShengNv.mp3",
                        "logAudio": function(event) {
                            if(event && event.skill ==
                                'miaoJiangShengNv_lianGuShu') {
                                return false;
                            }
                            var current = event;
                            while(current) {
                                var name = current.triggername || current.name;
                                if(name == 'miaoJiangShengNv_lianGuShu') {
                                    return false;
                                }
                                if(name == 'teShu' || name == 'teShuEnd' ||
                                    name == 'gouMai' || name == 'heCheng' ||
                                    name == 'tiLian') {
                                    return false;
                                }
                                if(typeof current.getParent != 'function') break;
                                var parent = current.getParent();
                                if(!parent || parent == current) break;
                                current = parent;
                            }
                            return 'ext:宿命挽歌/audio/skill/' +
                                'miaoJiangShengNv.mp3';
                        },
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
                                "content": async function(event,trigger,player){
                        var audioPath =
                            'ext:宿命挽歌/audio/skill/' +
                            'miaoJiangShengNvLianGu.mp3';
                        game.broadcastAll(function(path, speaker) {
                            if(!lib.config.background_audio) return;
                            game.playAudio({
                                path: path,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, audioPath, player);
                        await player.addGaiPai(get.cards(1),'gu');
                        var zhanJi=get.zhanJi(player.side);
                        if(!zhanJi.length) return;

                        var list=[];
                        for(var i=0;i<zhanJi.length;i++){
                            list.push([zhanJi[i],get.translation(zhanJi[i])]);
                        }
                        var desired=Math.max(0,Math.min(
                            zhanJi.length,6-player.countGaiPai('gu')
                        ));
                        var result=await player.chooseButton([
                            '苗疆圣女：可移除任意颗我方【战绩区】星石，额外获得等量的【蛊】',
                            [list,'tdnodes'],
                        ]).set('selectButton',[1,zhanJi.length])
                        .set('desired',desired).set('ai',function(button){
                            if(ui.selected.buttons.length>=_status.event.desired){
                                return 0;
                            }
                            return 6;
                        }).forResult();
                        if(!result.bool||!result.links||!result.links.length){
                            return;
                        }
                        for(var j=0;j<result.links.length;j++){
                            await player.removeZhanJi(result.links[j],1);
                        }
                        await player.addGaiPai(
                            get.cards(result.links.length),'gu'
                        );
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
                    "haiTangFuRen": {
                        "audio": "ext:宿命挽歌/audio/skill/haiTangFuRen.mp3",
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "forced": true,
                        "getAttackCards": function(event) {
                    var cards=[];
                    if(event&&Array.isArray(event.cards)){
                        cards=event.cards.slice();
                    }
                    else if(event&&event.card&&
                        Array.isArray(event.card.cards)){
                        cards=event.card.cards.slice();
                    }
                    return cards.filter(function(card){
                        return card&&get.position(card,true)=='o';
                    });
                },
                        "filter": function(event,player){
                    return !!event.player&&
                        lib.skill.suMingWanGeLianDong
                            .isCharacter(event.player,'liXiaoYao')&&
                        lib.skill.haiTangFuRen.getAttackCards(event).length>0;
                },
                        "content": async function(event,trigger,player){
                    var cards=lib.skill.haiTangFuRen
                        .getAttackCards(trigger);
                    if(!cards.length) return;
                    await player.addGaiPai(cards,'gu');
                },
                    },
                    "yanShaZhou": {
                        "audio": "ext:宿命挽歌/audio/skill/yanShaZhou.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/tianLeiPo.mp3",
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
                            var audioPath =
                                'ext:宿命挽歌/audio/skill/yuFengShu.mp3';
                            game.broadcastAll(function(path, speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: path,
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, audioPath, player);
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
                    var audioPath =
                        'ext:宿命挽歌/audio/skill/yuFengShu.mp3';
                    game.broadcastAll(function(path, speaker) {
                        if(!lib.config.background_audio) return;
                        game.playAudio({
                            path: path,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, audioPath, player);
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
                        "audio": "ext:宿命挽歌/audio/skill/jinCanWang.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/baoZhaGu.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/sanShiGu.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/yinGu.mp3",
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
                        "audio": "ext:宿命挽歌/audio/skill/wanGuShiTian.mp3",
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
                        "markimage": "extension/宿命挽歌/mark_gu.png",
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
                        "audio": "ext:宿命挽歌/audio/skill/wuDuZhu.mp3",
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
                    "niTianWenDao": {
                        "forced": true,
                        "group": ["niTianWenDao_zhuCe"],
                        "subSkill": {
                            "zhuCe": {
                                "trigger": {"global": "gameStart"},
                                "forced": true,
                                "popup": false,
                                "content": function(event, trigger, player) {
                                    game.addGlobalSkill('fengMo');
                                    game.broadcastAll(function(path, speaker) {
                                        if(!lib.config.background_audio) return;
                                        game.playAudio({
                                            path: path,
                                            spatialPlayer: speaker,
                                            addVideo: false,
                                            onError: function() {},
                                        });
                                    }, 'ext:宿命挽歌/audio/skill/niTianWenDao.mp3', player);
                                },
                            },
                        },
                        "mod": {
                            "cardEnabled": function(card, player) {
                                if(get.type(card, player) == 'faShu' ||
                                    get.name(card, player) == 'anMie') return false;
                            },
                        },
                        "trigger": {"source": "gongJiMingZhong"},
                        "filter": function(event, player) {
                            return event.target && event.target.isIn() &&
                                !event.target.hasJiChuXiaoGuo('fengMo');
                        },
                        "content": async function(event, trigger, player) {
                            var card = game.createCard2('fengMo');
                            await trigger.target.addJiChuXiaoGuo(
                                card, player, 'fengMo'
                            );
                            if(trigger.target.hasJiChuXiaoGuo('fengMo')) {
                                trigger.target.addSkill('fengMo');
                                game.broadcastAll(function(path, speaker) {
                                    if(!lib.config.background_audio) return;
                                    game.playAudio({
                                        path: path,
                                        spatialPlayer: speaker,
                                        addVideo: false,
                                        onError: function() {},
                                    });
                                }, 'ext:宿命挽歌/audio/skill/fengMo.mp3', player);
                            }
                        },
                    },
                    "shuiMoShouHeTi": {
                        "forced": true,
                        "mark": true,
                        "marktext": "合",
                        "playAudio": function(player) {
                            game.broadcastAll(function(path, speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: path,
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, 'ext:宿命挽歌/audio/skill/shuiMoShouHeTi.mp3', player);
                        },
                        "getTransformRoot": function(event) {
                            if(!event || typeof event.getParent != 'function') {
                                return event;
                            }
                            return event.getParent('faShu', true) ||
                                event.getParent('damage', true) ||
                                event.getParent('useCard', true) || event;
                        },
                        "isTransformChainEvent": function(event, player) {
                            if(!player || !player._shuiMoShouTransformRoot) {
                                return false;
                            }
                            var current = event;
                            var guard = 0;
                            while(current && guard++ < 64) {
                                if(current === player._shuiMoShouTransformRoot) {
                                    return true;
                                }
                                if(typeof current.getParent != 'function') break;
                                var parent = current.getParent();
                                if(!parent || parent === current) break;
                                current = parent;
                            }
                            return false;
                        },
                        "intro": {
                            "content": function(storage, player) {
                                var list = player.storage.shuiMoShouHeTi || [];
                                return "已释放不同法术：" + list.length + "/5" +
                                    (list.length ? "<br>" + get.translation(list) : "");
                            },
                        },
                        "trigger": {
                            "player": "faShuAfter",
                            "global": "changeShiQiEnd",
                        },
                        "filter": function(event, player) {
                            if(lib.skill.shuiMoShouHeTi.spells.includes(event.skill)) {
                                return true;
                            }
                            return event.name == 'changeShiQi' &&
                                event.side == player.side && event.num < 0 &&
                                get.shiQi(player.side) < 5;
                        },
                        "spells": [
                            "mieJueYiJi", "duoHun", "daZhouShe",
                            "duTunTianXia", "qunMoLuanWu", "xingFengXueYu",
                        ],
                        "content": async function(event, trigger, player) {
                            if(lib.skill.shuiMoShouHeTi.spells.includes(trigger.skill)) {
                                if(!Array.isArray(player.storage.shuiMoShouHeTi)) {
                                    player.storage.shuiMoShouHeTi = [];
                                }
                                player.storage.shuiMoShouHeTi.add(trigger.skill);
                                player.markSkill('shuiMoShouHeTi');
                            }
                            var spellsReady =
                                (player.storage.shuiMoShouHeTi || []).length >= 5;
                            var moraleReady = trigger.name == 'changeShiQi' &&
                                trigger.side == player.side && trigger.num < 0 &&
                                get.shiQi(player.side) < 5;
                            if(!spellsReady && !moraleReady) return;
                            player._shuiMoShouTransformRoot =
                                lib.skill.shuiMoShouHeTi.getTransformRoot(trigger);
                            player._shuiMoShouTransforming = true;
                            try {
                                await player.reinitCharacter(
                                    'baiYueJiaoZhu', 'shuiMoShouBaiYueJiaoZhu'
                                );
                                lib.skill.shuiMoShouHeTi.playAudio(player);
                                lib.skill.suMingWanGeBgm.playTrack(
                                    'ext:宿命挽歌/audio/bgm/niTianErXing2.mp3'
                                );
                                await player.setZhiShiWu('hongShui', 3);
                            } finally {
                                player._shuiMoShouTransforming = false;
                            }
                        },
                    },
                    "mieJueYiJi": {
                        "audio": "ext:宿命挽歌/audio/skill/mieJueYiJi.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'anMie';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'anMie'; },
                        "check": function(card) { return 8 - get.value(card); },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "filterTarget": function(card, player, target) {
                            return target.side != player.side;
                        },
                        "content": async function(event, trigger, player) {
                            var before = player.countCards('h');
                            await player.drawTo(player.getHandcardLimit());
                            var num = Math.min(4, Math.max(0, player.countCards('h') - before));
                            if(num > 0) await event.target.faShuDamage(num, player, 'nocard');
                            await player.addNengLiang('shuiJing', 1);
                        },
                        "ai": {
                            "order": 5.8,
                            "result": {"target": function(player, target) {
                                var num = Math.min(4, Math.max(1,
                                    player.getHandcardLimit() -
                                    player.countCards('h') + 1));
                                return get.damageEffect2(target, player, num);
                            }},
                        },
                    },
                    "duoHun": {
                        "audio": "ext:宿命挽歌/audio/skill/duoHun.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'shengGuang';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'shengGuang'; },
                        "check": function(card) { return 8 - get.value(card); },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "selectTarget": -1,
                        "filterTarget": function(card, player, target) {
                            return target != player;
                        },
                        "contentBefore": function(event, trigger, player) {
                            event.getParent().duoHunEnemyShiQiBefore =
                                get.shiQi(!player.side);
                        },
                        "content": async function(event, trigger, player) {
                            var cards = get.cards(1);
                            if(!cards.length) return;
                            await event.target.showCards(cards, '【夺魂】展示');
                            await game.cardsDiscard(cards);
                            if(get.type(cards[0]) != 'faShu') {
                                await event.target.changeShiQi(-1);
                            }
                        },
                        "contentAfter": async function(event, trigger, player) {
                            var before = event.getParent()
                                .duoHunEnemyShiQiBefore;
                            if(typeof before == 'number' &&
                                before - get.shiQi(!player.side) >= 2){
                                await player.addNengLiang('baoShi', 1);
                            }
                        },
                        "ai": {
                            "order": 3.6,
                            "result": {"player": function(player) {
                                var own = get.shiQi(player.side);
                                var enemy = get.shiQi(!player.side);
                                return enemy <= 2 && own > enemy ? 1 : -1;
                            }},
                        },
                    },
                    "daZhouShe": {
                        "audio": "ext:宿命挽歌/audio/skill/daZhouShe.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'xuRuo';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'xuRuo'; },
                        "check": function(card) { return 8 - get.value(card); },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "selectTarget": -1,
                        "filterTarget": function() { return true; },
                        "content": async function(event, trigger, player) {
                            if(event.target.hasJiChuXiaoGuo('_xuRuo')) return;
                            await player.useCard(
                                game.createCard2('xuRuo'), event.target, false
                            );
                        },
                        "contentAfter": async function(event, trigger, player) {
                            await player.addFaShu();
                        },
                        "ai": {
                            "order": 4.8,
                            "result": {"target": function(player, target) {
                                if(target.hasJiChuXiaoGuo('_xuRuo')) return 0;
                                return target.side == player.side ? -1.5 : 2;
                            }},
                        },
                    },
                    "duTunTianXia": {
                        "audio": "ext:宿命挽歌/audio/skill/duTunTianXia.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'zhongDu';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'zhongDu'; },
                        "check": function(card) { return 8 - get.value(card); },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "selectTarget": -1,
                        "filterTarget": function() { return true; },
                        "content": async function(event, trigger, player) {
                            for (var i = 0; i < 2; i++) {
                                await player.useCard(
                                    game.createCard2('zhongDu'), event.target, false
                                );
                            }
                        },
                        "ai": {
                            "order": 5,
                            "result": {"target": function(player, target) {
                                return target.side == player.side ? -2 : 2.5;
                            }},
                        },
                    },
                    "qunMoLuanWu": {
                        "audio": "ext:宿命挽歌/audio/skill/qunMoLuanWu.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'shengDun';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'shengDun'; },
                        "check": function(card) { return 8 - get.value(card); },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "selectTarget": -1,
                        "filterTarget": function(card, player, target) {
                            return target.isIn();
                        },
                        "content": async function(event, trigger, player) {
                            await player.useCard(
                                {name: 'anMie', xiBie: 'an'}, event.target, false
                            );
                        },
                        "ai": {
                            "order": 5.4,
                            "result": {"target": function(player, target) {
                                return get.damageEffect2(target, player, 2);
                            }},
                        },
                    },
                    "guiJiang": {
                        "audio": "ext:宿命挽歌/audio/skill/guiJiang.mp3",
                        "trigger": {"player": "chengShouShangHaiBefore"},
                        "filter": function(event, player) {
                            return event.num > 0 && player.countCards('h', function(card) {
                                return get.name(card) == 'moDan';
                            }) > 0 && game.hasPlayer(function(current) {
                                return current.side != player.side;
                            });
                        },
                        "cost": async function(event, trigger, player) {
                            var cards = await player.chooseToDiscard(
                                'h', 1, '【鬼降】：弃置1张【魔弹】转移此次伤害',
                                function(card) { return get.name(card) == 'moDan'; }
                            ).set('visible', true).set('ai', function(card) {
                                return 8 - get.value(card);
                            }).forResultCards() || [];
                            if(!cards.length) { event.result = {bool:false}; return; }
                            var targets = await player.chooseTarget(
                                true, '【鬼降】：选择承受转移伤害的对手',
                                function(card, player, target) {
                                    return target.side != player.side;
                                }
                            ).set('ai', function(target) {
                                return get.damageEffect2(target, _status.event.player,
                                    _status.event.getTrigger().num);
                            }).forResultTargets();
                            event.result = {bool:targets.length > 0, cost_data:targets[0]};
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.cost_data, num = trigger.num;
                            var faShu = trigger.faShu === true;
                            trigger.cancel();
                            if(faShu) await target.faShuDamage(num, player, 'nocard');
                            else await target.damage(num, player, 'nocard');
                        },
                    },
                    "shuiMoShouHuTi": {
                        "audio": "ext:宿命挽歌/audio/skill/shuiMoShouHuTi.mp3",
                        "trigger": {"player": "phaseBefore"},
                        "filter": function(event, player) {
                            return player.canBiShaShuiJing() &&
                                player.countCards('h') >= 2;
                        },
                        "cost": async function(event, trigger, player) {
                            var cards = await player.chooseToDiscard(
                                'h', 2, get.prompt('shuiMoShouHuTi')
                            ).set('prompt2', lib.translate.shuiMoShouHuTi_info)
                                .set('ai', function(card) {
                                    return 7 - get.value(card, _status.event.player);
                                }).forResultCards() || [];
                            event.result = {bool: cards.length == 2};
                        },
                        "content": async function(event, trigger, player) {
                            await player.removeBiShaShuiJing();
                            var list = player.jiChuXiaoGuoList().slice(0);
                            for(var xiaoGuo of list) {
                                var cards = player.getJiChuXiaoGuo(xiaoGuo);
                                if(cards && cards.length) {
                                    await player.loseToDiscardpile(cards);
                                }
                                if(xiaoGuo == '_zhongDu') player.storage.zhongDu = [];
                                if(!game.jiChuXiaoGuo.pai_xiaoGuo.includes(xiaoGuo)) {
                                    player.removeSkill(xiaoGuo);
                                }
                            }
                        },
                        "check": function(event, player) {
                            return get.jiChuXiaoGuoEffect(player) > 0;
                        },
                        "ai": {"shuiJing": true},
                    },
                    "xingFengXueYu": {
                        "audio": "ext:宿命挽歌/audio/skill/xingFengXueYu.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) { return player.canBiShaBaoShi(); },
                        "selectTarget": -1, "filterTarget": function() { return true; },
                        "contentBefore": async function(event, trigger, player) {
                            await player.removeBiShaBaoShi();
                        },
                        "content": async function(event, trigger, player) {
                            var oldMorale = get.shiQi(event.target.side);
                            await event.target.faShuDamage(2, player, 'nocard');
                            if(!event.target.isIn()) return;
                            if(get.shiQi(event.target.side) < oldMorale) {
                                await player.useCard(
                                    game.createCard2('zhongDu'), event.target, false
                                );
                            } else if(!event.target.hasJiChuXiaoGuo('_xuRuo')) {
                                await player.useCard(
                                    game.createCard2('xuRuo'), event.target, false
                                );
                            }
                        },
                        "ai": {
                            "baoShi": true,
                            "order": 6,
                            "result": {"target": function(player, target) {
                                return get.damageEffect2(target, player, 2);
                            }},
                        },
                    },
                    "shuiMoShouZhiQu": {
                        "forced": true,
                        "group": ["shuiMoShouZhiQu_qiPai"],
                        "playAudio": function(player) {
                            game.broadcastAll(function(path, speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: path,
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, 'ext:宿命挽歌/audio/skill/hongShui.mp3', player);
                        },
                        "mod": {
                            "maxHandcard": function(player, num) { return num + 2; },
                        },
                        "trigger": {"player": "chengShouShangHaiBefore"},
                        "filter": function(event) {
                            return event.faShu === true && event.num > 0;
                        },
                        "content": function(event, trigger, player) {
                            lib.skill.shuiMoShouZhiQu.playAudio(player);
                            trigger.changeDamageNum(-1);
                        },
                        "subSkill": {
                            "qiPai": {
                                "trigger": {"player": "discard"},
                                "forced": true,
                                "filter": function(event) {
                                    return event.cards && event.cards.length > 0;
                                },
                                "content": async function(event, trigger, player) {
                                    lib.skill.shuiMoShouZhiQu.playAudio(player);
                                    await player.changeZhiLiao(1, player);
                                },
                            },
                        },
                    },
                    "shuiMoShouZhiNu": {
                        "audio": "ext:宿命挽歌/audio/skill/shuiMoShouZhiNu.mp3",
                        "trigger": {"global": "changeShiQiEnd"},
                        "forced": true,
                        "filter": function(event, player) {
                            return event.num < 0 && event.side == player.side &&
                                event.player == player && event.baoPai === true &&
                                event.cause == 'damage';
                        },
                        "content": async function(event, trigger, player) {
                            await player.addNengLiang('shuiJing', 1);
                            await player.addZhiShiWu('hongShui', 1);
                        },
                    },
                    "nvWaZhiXue": {
                        "audio": "ext:宿命挽歌/audio/skill/nvWaZhiXue.mp3",
                        "trigger": {"global": "changeShiQiEnd"},
                        "forced": true,
                        "filter": function(event, player) {
                            if(event.num >= 0 || event.source != player ||
                                event.cause != 'damage' || !event.player) return false;
                            return lib.skill.suMingWanGeLianDong.isCharacter(
                                event.player, 'zhaoLingEr'
                            );
                        },
                        "content": async function(event, trigger, player) {
                            await player.addNengLiang('baoShi', 3);
                            player.storage.hongShuiLimit = 8;
                            player.syncStorage('hongShuiLimit');
                            var current = player.countZhiShiWu('hongShui');
                            if(current < 8) {
                                await player.addZhiShiWu('hongShui', 8 - current);
                            }
                            player.markSkill('hongShui');
                            player.removeSkill('nvWaZhiXue');
                        },
                    },
                    "yongSheng": {
                        "forced": true,
                        "group": ["yongSheng_hongShui", "yongSheng_shiQi"],
                        "playAudio": function(player) {
                            game.broadcastAll(function(path, speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: path,
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, 'ext:宿命挽歌/audio/skill/yongSheng.mp3', player);
                        },
                        "subSkill": {
                            "hongShui": {
                                "trigger": {
                                    "global": ["useCardAfter", "discard", "showCards"],
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                                    if(player._shuiMoShouTransforming ||
                                        lib.skill.shuiMoShouHeTi
                                            .isTransformChainEvent(event, player)) {
                                        return false;
                                    }
                                    var cards = event.cards || (event.card ? [event.card] : []);
                                    return cards.some(function(card) {
                                        var xiBie = get.xiBie(card);
                                        return xiBie == 'shui' || xiBie == 'guang';
                                    });
                                },
                                "content": async function(event, trigger, player) {
                                    var cards = trigger.cards ||
                                        (trigger.card ? [trigger.card] : []);
                                    var num = cards.filter(function(card) {
                                        var xiBie = get.xiBie(card);
                                        return xiBie == 'shui' || xiBie == 'guang';
                                    }).length;
                                    if(num > 0) {
                                        lib.skill.yongSheng.playAudio(player);
                                        await player.addZhiShiWu('hongShui', num);
                                    }
                                },
                            },
                            "shiQi": {
                                "trigger": {"global": "changeShiQiBefore"},
                                "forced": true,
                                "popup": false,
                                "lastDo": true,
                                "priority": -100,
                                "filter": function(event, player) {
                                    return event.side == player.side && event.num < 0 &&
                                        player.countZhiShiWu('hongShui') > 0 &&
                                        get.shiQi(player.side) + event.num < 1;
                                },
                                "content": async function(event, trigger, player) {
                                    lib.skill.yongSheng.playAudio(player);
                                    var current = get.shiQi(player.side);
                                    if(current == 1 && trigger.baoPai === true &&
                                        trigger.cause == 'damage') {
                                        var num = trigger.cards ? trigger.cards.length : 0;
                                        if(num > 0) {
                                            await player.removeZhiShiWu('hongShui', num);
                                            player.storage.hongShuiLimit = Math.max(
                                                0,
                                                lib.skill.hongShui.getLimit(player) - num
                                            );
                                            player.syncStorage('hongShuiLimit');
                                            if(player.countZhiShiWu('hongShui') > 0) {
                                                player.markSkill('hongShui');
                                            }
                                        }
                                    }
                                    trigger.num = Math.min(0, 1 - current);
                                },
                            },
                        },
                    },
                    "zhangDuZhen": {
                        "audio": "ext:宿命挽歌/audio/skill/zhangDuZhen.mp3",
                        "trigger": {"source": "chengShouShangHaiAfter"},
                        "forced": true,
                        "filter": function(event) {
                            return event.num > 0 && event.player && event.player.isIn();
                        },
                        "content": async function(event, trigger, player) {
                            if(trigger.player.isIn()) {
                                await player.useCard(
                                    game.createCard2('zhongDu'), trigger.player, false
                                );
                            }
                        },
                    },
                    "diLieTianBeng": {
                        "audio": "ext:宿命挽歌/audio/skill/diLieTianBeng.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'anMie';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'anMie'; },
                        "check": function(card) { return 8 - get.value(card); },
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "visible": true,
                        "selectTarget": -1,
                        "filterTarget": function() { return true; },
                        "content": async function(event) {
                            await event.target.drawTo(event.target.getHandcardLimit());
                        },
                        "contentAfter": async function(event, trigger, player) {
                            await player.addFaShu();
                        },
                        "ai": {
                            "order": function(item, player) {
                                var score = 0;
                                game.countPlayer(function(current) {
                                    var lack = Math.max(0,
                                        current.getHandcardLimit() -
                                        current.countCards('h'));
                                    score += get.attitude(player, current) * lack;
                                });
                                return score > 0 ? 5.6 : 1.8;
                            },
                            "result": {
                                "player": 0.8,
                                "target": function(player, target) {
                                    return Math.max(0,
                                        target.getHandcardLimit() -
                                        target.countCards('h')) * 0.8;
                                },
                            },
                        },
                    },
                    "taoTianJuLang": {
                        "audio": "ext:宿命挽歌/audio/skill/taoTianJuLang.mp3",
                        "type": "qiDong",
                        "trigger": {"player": "qiDong"},
                        "filter": function(event, player) {
                            return player.canBiShaShuiJing() && player.countCards('h') >= 2;
                        },
                        "cost": async function(event, trigger, player) {
                            var cards = await player.chooseToDiscard(
                                'h', 2, get.prompt('taoTianJuLang')
                            ).set('prompt2', lib.translate.taoTianJuLang_info)
                                .set('visible', true)
                                .set('ai', function(card) {
                                    return 7 - get.value(card, _status.event.player);
                                }).forResultCards() || [];
                            event.result = {bool: cards.length == 2};
                        },
                        "content": async function(event, trigger, player) {
                            await player.removeBiShaShuiJing();
                            await player.addZhiShiWu('hongShui', 2, 8);
                        },
                        "check": function(event, player) {
                            var current = player.countZhiShiWu('hongShui');
                            if(current >= 8) return false;
                            if(lib.skill._heCheng &&
                                lib.skill._heCheng.filter(event, player) &&
                                (get.shiQi(!player.side) <= 1 ||
                                    get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                                return false;
                            }
                            if(get.shiQi(player.side) <= 3) return true;
                            if(current > 6) return false;
                            var cards = player.getCards('h').sort(function(a, b) {
                                return get.value(a, player) - get.value(b, player);
                            });
                            var cost = (cards[0] ? get.value(cards[0], player) : 10) +
                                (cards[1] ? get.value(cards[1], player) : 10);
                            return current <= 4 || cost <= 9;
                        },
                        "ai": {"shuiJing": true},
                    },
                    "fengXueBingTian": {
                        "audio": "ext:宿命挽歌/audio/skill/fengXueBingTian.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                            return player.canBiShaBaoShi() && player.countCards('h', function(card) {
                                return get.type(card, player) == 'faShu';
                            }) > 0;
                        },
                        "filterCard": function(card, player) {
                            return get.type(card, player) == 'faShu';
                        },
                        "selectCard": -1,
                        "position": "h",
                        "discard": true,
                        "visible": true,
                        "selectTarget": -1,
                        "filterTarget": function() { return true; },
                        "contentBefore": async function(event, trigger, player) {
                            event.getParent().fengXueBingTianNum = event.cards.length;
                            await player.removeBiShaBaoShi();
                        },
                        "content": async function(event, trigger, player) {
                            var num = event.getParent().fengXueBingTianNum || 0;
                            await event.target.faShuDamage(Math.ceil(num / 2) + 1,
                                player, 'nocard');
                        },
                        "ai": {
                            "baoShi": true,
                            "order": function(item, player) {
                                var num = player.countCards('h', function(card) {
                                    return get.type(card, player) == 'faShu';
                                });
                                var damage = Math.ceil(num / 2) + 1;
                                var score = 0;
                                game.countPlayer(function(current) {
                                    score += get.damageEffect2(
                                        current, player, damage
                                    );
                                });
                                return score > 0 ? 6.8 : 1.2;
                            },
                            "result": {"target": function(player, target) {
                                var num = player.countCards('h', function(card) {
                                    return get.type(card, player) == 'faShu';
                                });
                                return get.damageEffect2(target, player,
                                    Math.ceil(num / 2) + 1);
                            }},
                        },
                    },
                    "hongShui": {
                        "audio": "ext:宿命挽歌/audio/skill/hongShui.mp3",
                        "charlotte": true,
                        "mark": true,
                        "markimage": "extension/宿命挽歌/mark_hongShui.png",
                        "marktext": "水",
                        "init": function(player) {
                            if(typeof player.storage.hongShuiLimit != 'number') {
                                player.storage.hongShuiLimit = 8;
                                player.syncStorage('hongShuiLimit');
                            }
                        },
                        "getLimit": function(player) {
                            if(typeof player.storage.hongShuiLimit != 'number') return 8;
                            return Math.max(0, player.storage.hongShuiLimit);
                        },
                        "intro": {
                            "name": "洪水",
                            "content": function(storage, player) {
                                return '当前【洪水】：' + player.countZhiShiWu('hongShui') +
                                    '<br>上限：' + lib.skill.hongShui.getLimit(player);
                            },
                            "max": function(player) {
                                var limit = lib.skill.hongShui.getLimit(player);
                                return limit > 0 ? limit : -1;
                            },
                        },
                    },
                    "fengMo": {
                        "audio": "ext:宿命挽歌/audio/skill/fengMo.mp3",
                        "charlotte": true,
                        "markimage": "extension/宿命挽歌/mark_fengMo.png",
                        "tag": {"jiChuXiaoGuo": true},
                        "trigger": {"player": "phaseEnd"},
                        "forced": true,
                        "popup": false,
                        "filter": function(event, player) {
                            return player.hasJiChuXiaoGuo('fengMo');
                        },
                        "content": async function(event, trigger, player) {
                            var cards = player.getJiChuXiaoGuo('fengMo');
                            if(cards && cards.length) {
                                await player.loseToDiscardpile(cards);
                            }
                            player.removeSkill('fengMo');
                        },
                        "init": function(player, skill) { player.addSkillBlocker(skill); },
                        "onremove": function(player, skill) {
                            player.removeSkillBlocker(skill);
                            var cards = player.getJiChuXiaoGuo(skill);
                            if(cards && cards.length) player.loseToDiscardpile(cards);
                        },
                        "skillBlocker": function(skill, player) {
                            if(skill == 'fengMo' || skill == 'shuiMoShouHuTi') return false;
                            var info = get.info(skill) || {};
                            var name = get.translation(skill) || '';
                            var plainName = String(name).replace(/<[^>]*>/g, '');
                            return info.type == 'faShu' ||
                                plainName.indexOf('法术【') >= 0 ||
                                plainName.indexOf('[法术]') >= 0 ||
                                plainName.indexOf('【法术】') >= 0 ||
                                plainName.indexOf('响应【') >= 0 ||
                                plainName.indexOf('[响应]') >= 0 ||
                                plainName.indexOf('【响应】') >= 0;
                        },
                        "mod": {
                            "cardEnabled": function(card, player) {
                                if(player.hasJiChuXiaoGuo('fengMo') &&
                                    get.type(card, player) == 'faShu'){
                                    return false;
                                }
                            },
                        },
                        "intro": {"name": "专属【封魔】", "content": "你无法发动响应技与法术；你的回合结束时移除。"},
                    },
                },
                "translate": {
                    "niTianWenDao": "被动【逆天问道】",
                    "niTianWenDao_info": "你无法使用法术牌与【暗灭】。<span class='tiaoJian'>（你的攻击命中后②）</span>对命中目标施加【封魔】。",
                    "shuiMoShouHeTi": "被动【水魔兽合体】",
                    "shuiMoShouHeTi_info": "每释放一次不同类型的角色法术，计数+1；计数＞4，或己方士气下降至小于5时，转化为【水魔兽·拜月教主】，+3<span class='hong'>【洪水】</span>。",
                    "mieJueYiJi": "法术【灭绝一击】",
                    "mieJueYiJi_info": "<span class='tiaoJian'>（弃置1张【暗灭】【展示】）</span>将手牌补至上限，对目标对手造成X点法术伤害；X为此次摸牌数，最多为4。你+1<span class='lan'>【水晶】</span>。",
                    "duoHun": "法术【夺魂】",
                    "duoHun_info": "<span class='tiaoJian'>（弃置1张【圣光】【展示】）</span>其他所有角色各翻开并弃置牌库顶1张牌【展示】；翻开的牌不为法术牌者，其所属阵营士气-1。若因此令对方阵营士气累计下降至少2点，你+1<span class='lan'>【宝石】</span>。",
                    "daZhouShe": "法术【大咒蛇】",
                    "daZhouShe_info": "<span class='tiaoJian'>（弃置1张【虚弱】【展示】）</span>对所有角色施加【虚弱】，你+1<span class='lan'>【法术行动】</span>。",
                    "duTunTianXia": "法术【毒吞天下】",
                    "duTunTianXia_info": "<span class='tiaoJian'>（弃置1张【中毒】【展示】）</span>对所有角色施加2层【中毒】。",
                    "qunMoLuanWu": "法术【群魔乱舞】",
                    "qunMoLuanWu_info": "<span class='tiaoJian'>（弃置1张【圣盾】【展示】）</span>对所有角色各释放一次【暗灭】。",
                    "guiJiang": "响应【鬼降】",
                    "guiJiang_info": "<span class='tiaoJian'>（受到伤害时，弃置1张【魔弹】【展示】）</span>取消此次伤害，改为令目标对手承受等量、同类别伤害。",
                    "shuiMoShouHuTi": "响应【水魔兽护体】",
                    "shuiMoShouHuTi_info": "【水晶】<span class='tiaoJian'>（你的回合开始前发动，弃置2张牌）</span>移除自己面前的所有基础效果。",
                    "xingFengXueYu": "法术【腥风血雨】",
                    "xingFengXueYu_info": "【宝石】对所有角色各造成2点法术伤害；因此导致士气下降者获得1层【中毒】，否则获得【虚弱】。",
                    "shuiMoShouZhiQu": "被动【水魔兽之躯】",
                    "shuiMoShouZhiQu_info": "手牌上限+2；承受的法术伤害-1⑤。每次弃牌后+1【治疗】。",
                    "shuiMoShouZhiNu": "被动【水魔兽之怒】",
                    "shuiMoShouZhiNu_info": "因你承受伤害而令己方士气实际下降后，你+1【水晶】、+1<span class='hong'>【洪水】</span>。",
                    "nvWaZhiXue": "被动【女娲之血】",
                    "nvWaZhiXue_info": "若你对赵灵儿造成了导致其士气下降的伤害，你+3【宝石】，并将<span class='hong'>【洪水】</span>与<span class='hong'>【洪水】</span>上限补满，随后移除此技能。",
                    "yongSheng": "被动【永生】",
                    "yongSheng_info": "每当有一位角色使用、弃置、展示一张水系或光系牌，你+1<span class='hong'>【洪水】</span>。<span class='tiaoJian'>（洪水不为0时）</span>我方士气最低为1；士气为1时，每当我方受到伤害导致爆牌，<span class='hong'>【洪水】</span>与<span class='hong'>【洪水】</span>上限-X，X为此次爆牌数。",
                    "zhangDuZhen": "被动【瘴毒阵】",
                    "zhangDuZhen_info": "你对目标角色造成伤害后，目标角色获得1层【中毒】。",
                    "diLieTianBeng": "法术【地裂天崩】",
                    "diLieTianBeng_info": "<span class='tiaoJian'>（弃置1张【暗灭】【展示】）</span>所有角色将手牌补至上限，你+1【法术行动】。",
                    "taoTianJuLang": "启动【滔天巨浪】",
                    "taoTianJuLang_info": "【水晶】<span class='tiaoJian'>（弃置2张牌【展示】）</span>无视你的上限+2<span class='hong'>【洪水】</span>，但你的<span class='hong'>【洪水】</span>最大为8。",
                    "fengXueBingTian": "法术【风雪冰天】",
                    "fengXueBingTian_info": "【宝石】<span class='tiaoJian'>（弃置所有法术牌【展示】）</span>对所有角色造成X点法术伤害；X＝⌈实际弃置的法术牌数÷2⌉＋1。",
                    "hongShui": "洪水",
                    "hongShui_info": "<span class='hong'>【洪水】</span>为水魔兽·拜月教主的专属指示物，初始上限为8。",
                    "fengMo": "专属【封魔】",
                    "fengMo_info": "<span class='tiaoJian'>（位于角色旁时）</span>你无法发动响应技与法术；拥有者的回合结束时移除。",
                    "wuLingXianShu": "被动【五灵仙术】",
                    "wuLingXianShu_bingDong": "[法术]冰咒",
                    "wuLingXianShu_yunShi": "[法术]土咒",
                    "wuLingXianShu_huoQou": "[法术]火咒",
                    "wuLingXianShu_fengRen": "[法术]风咒",
                    "wuLingXianShu_leiJi": "[法术]雷咒",
                    "wuLingXianShu_info": "你可以使用元素师独有技；你造成的伤害均视为法术伤害。",
                    "nvWaHouRen": "被动【女娲后人】",
                    "nvWaHouRen_info": "【五灵仙术】与【武神】不能以满手牌角色为目标。你每消耗1点<span class='hong'>【灵力】</span>，+1<span class='lan'>【觉醒度】</span>；<span class='lan'>【觉醒度】</span>达到10时，你【横置】并进入【梦蛇形态】。",
                    "mengShe": "被动【梦蛇】",
                    "mengShe_info": "<span class='tiaoJian'>（梦蛇形态下）</span>失去【女娲后人】；你造成的攻击伤害与法术伤害+1。",
                    "mengSheXingTai": "梦蛇形态",
                    "mengSheXingTai_info": "你已失去【女娲后人】；造成的攻击伤害与法术伤害+1。",
                    "tianSheZhang": "响应【天蛇杖】",
                    "tianSheZhang_info": "<span class='tiaoJian'>（造成法术伤害时）</span>+1<span class='hong'>【灵力】</span>；不能与【圣灵珠】同时发动。",
                    "wuQiChaoYuan": "法术【五气朝元】",
                    "wuQiChaoYuan_info": "<span class='tiaoJian'>（移除5<span class='hong'>【灵力】</span>）</span>我方所有角色+2【治疗】。",
                    "guanYinZhou": "法术【观音咒】",
                    "guanYinZhou_info": "目标角色+1【治疗】，然后你+1<span class='hong'>【灵力】</span>。<span class='tiaoJian'>（若目标为李逍遥或林月如）</span>可以改为移除1<span class='hong'>【灵力】</span>，令其+1<span class='hong'>【剑】</span>或<span class='hong'>【气劲】</span>，然后你+1<span class='hong'>【灵力】</span>。",
                    "shengLingZhu": "响应【圣灵珠】",
                    "shengLingZhu_info": "<span class='tiaoJian'>（【五灵仙术】触发时，移除2或4<span class='hong'>【灵力】</span>）</span>令本次技能的目标数分别变为2或3。",
                    "shengLingPiFeng": "启动【圣灵披风】",
                    "shengLingPiFeng_info": "【水晶】+2<span class='hong'>【灵力】</span>。",
                    "wuShen": "法术【武神】",
                    "wuShen_info": "【宝石】对目标角色造成X+2点法术伤害；X为支付后剩余能量数。李逍遥、林月如每有一人在场，伤害额外+1。",
                    "zhaoLingErRouQingXiaGu": "被动【柔情侠骨】",
                    "zhaoLingErRouQingXiaGu_info": "<span class='tiaoJian'>（李逍遥或林月如在场时）</span>【观音咒】可以改为移除1<span class='hong'>【灵力】</span>，令对应角色+1<span class='hong'>【剑】</span>或<span class='hong'>【气劲】</span>。李逍遥、林月如每有一人在场，【武神】伤害额外+1。",
                    "lingLi": "灵力",
                    "lingLi_info": "<span class='hong'>【灵力】</span>为赵灵儿专有指示物，上限为6。",
                    "jueXingDu": "觉醒度",
                    "jueXingDu_info": "<span class='lan'>【觉醒度】</span>为赵灵儿专属指示物，上限为10；每实际消耗1点【灵力】便增加1点。",
                    "yuJianShu": "被动【御剑术】",
                    "yuJianShu_info": "<span class='tiaoJian'>（攻击命中后②）</span>+1<span class='hong'>【剑】</span>。",
                    "qiXingJian": "被动【七星剑】",
                    "qiXingJian_info": "能量上限+4。<span class='tiaoJian'>（造成的攻击伤害＞3时）</span>+1【水晶】。",
                    "tianGangZhanQi": "被动【天罡战气】",
                    "tianGangZhanQi_info": "<span class='tiaoJian'>（行动阶段内第3次【攻击行动】的主动攻击）</span>伤害+2；赵灵儿或林月如在场时改为+1。",
                    "feiLongTanYunShou": "被动【飞龙探云手】",
                    "feiLongTanYunShou_info": "你无法执行【提炼】。<span class='tiaoJian'>（其他角色提炼后）</span>翻开牌库顶1张牌【展示】；若为法术牌，获得其1个星石。<span class='tiaoJian'>（赵灵儿或林月如提炼后）</span>可以改为直接获得其1个星石。获取星石时固定优先获得【水晶】，没有【水晶】时才获得【宝石】。",
                    "tianShiFuFa": "响应【天师符法】",
                    "tianShiFuFa_info": "<span class='tiaoJian'>（攻击命中后②，弃置2张法术牌）</span>本次攻击伤害额外+1；可以再弃置1张法术牌，伤害再额外+1。",
                    "wanJianJue": "响应【万剑诀】",
                    "wanJianJue_info": "<span class='tiaoJian'>（攻击行动结束后，移除4<span class='hong'>【剑】</span>）</span>视为对两个目标先后发动一次暗系攻击，攻击伤害-1；本回合不能再发动【醉仙望月步】。",
                    "xianFengYunTiShu": "响应【仙风云体术】",
                    "xianFengYunTiShu_info": "<span class='tiaoJian'>（受到可应战的攻击时①）</span>摸1张牌【展示】。",
                    "zuiXianWangYueBu": "响应【醉仙望月步】",
                    "zuiXianWangYueBu_info": "【回合限定：2】<span class='tiaoJian'>（攻击行动结束后，移除1<span class='hong'>【剑】</span>）</span>赵灵儿、林月如依次可以弃置1张手牌【展示】作为判定牌，你获得该牌；若均未弃牌，翻开牌库顶1张牌【展示】，可以获得之。获得攻击牌时，+1【攻击行动】。本回合不能再发动【万剑诀】。",
                    "xiaoYaoShenJian": "启动【逍遥神剑】",
                    "xiaoYaoShenJian_info": "【水晶】+2<span class='hong'>【剑】</span>，摸2张牌。",
                    "jiuShenZhou": "法术【酒神咒】",
                    "jiuShenZhou_info": "<span class='tiaoJian'>（【水晶】×X，移除所有能量）</span>对目标角色与自己造成等同于能量数量+2的法术伤害；你【横置】并持续到下个回合开始时【重置】，期间手牌上限恒定为4。",
                    "liXiaoYaoRouQingXiaGu": "被动【柔情侠骨】",
                    "liXiaoYaoRouQingXiaGu_info": "<span class='tiaoJian'>（赵灵儿或林月如在场时）</span>【天罡战气】的伤害加成改为+1；<span class='tiaoJian'>（她们提炼后）</span>可以直接获得其1个星石；【醉仙望月步】优先由她们依次选择是否弃置1张手牌【展示】进行判定，你获得该判定牌。",
                    "liXiaoYaoRouQingXiaGuZhaoLingEr": "被动【柔情侠骨】",
                    "liXiaoYaoRouQingXiaGuLinYueRu": "被动【柔情侠骨】",
                    "jianY": "剑",
                    "jianY_info": "<span class='hong'>【剑】</span>为李逍遥专属指示物，上限为5。",
                    "linJiaQianJin": "被动【林家千金】",
                    "linJiaQianJin_info": "能量上限+2，游戏开始时获得2【水晶】<span class='tiaoJian'>（执行【特殊行动】时）</span>+1【水晶】；若赵灵儿在场且能量＜2，改为由其获得。",
                    "ningShenGuiYuan": "被动【凝神归元】",
                    "ningShenGuiYuan_info": "<span class='tiaoJian'>（队友的主动攻击命中后②）</span>+1<span class='hong'>【气劲】</span>；若因此溢出，+1【治疗】。",
                    "qiJianZhi": "响应【气剑指】",
                    "qiJianZhi_info": "<span class='tiaoJian'>（攻击行动结束后，移除1<span class='hong'>【气劲】</span>）</span>+1【法术行动】。",
                    "yiYangZhi": "响应【一阳指】",
                    "yiYangZhi_info": "<span class='tiaoJian'>（主动攻击前①，移除1<span class='hong'>【气劲】</span>）</span>若有【水晶】，将自己的1【水晶】翻为【宝石】。若命中，移除目标1张盖牌；其没有盖牌时，本次攻击伤害额外+1。若未命中且有【水晶】，再将自己的1【水晶】翻为【宝石】。",
                    "qiJueJianQi": "响应【七诀剑气】",
                    "qiJueJianQi_info": "<span class='tiaoJian'>（【一阳指】结算前，移除2<span class='hong'>【气劲】</span>）</span>若攻击命中，再结算一次【一阳指】的命中效果；否则将自己的全部【水晶】翻为【宝石】。",
                    "qiJueJianQi_mingZhong": "响应【七诀剑气】命中",
                    "qiJueJianQi_weiMingZhong": "响应【七诀剑气】未命中",
                    "zhenYuanHuTi": "响应【真元护体】",
                    "zhenYuanHuTi_info": "<span class='tiaoJian'>（承受法术伤害时，移除1<span class='hong'>【气劲】</span>）</span>本次伤害-1。李逍遥或赵灵儿在场时，也可以为其发动。",
                    "zhanLongJue": "法术【斩龙诀】",
                    "zhanLongJue_info": "<span class='tiaoJian'>（移除全部<span class='hong'>【气劲】</span>，至少2）</span>对其他所有角色各造成X点法术伤害；X为移除数÷3，向上取整。",
                    "tongQianBiao": "响应【铜钱镖】",
                    "tongQianBiao_info": "<span class='tiaoJian'>（自己攻击时，【宝石】）</span>对目标角色造成1点法术伤害，然后+1<span class='hong'>【气劲】</span>；若因此导致士气下降，再+1<span class='hong'>【气劲】</span>。",
                    "qianKunYiZhi": "法术【乾坤一掷】",
                    "qianKunYiZhi_info": "【宝石】<span class='tiaoJian'>（移除全部能量）</span>对目标角色造成X点法术伤害；X＝⌈【宝石】数÷2⌉＋⌈【水晶】数÷4⌉＋1。可以额外移除我方全部星石或全部星杯，每移除2颗星石或1个星杯，伤害+1。",
                    "linYueRuRouQingXiaGu": "被动【柔情侠骨】",
                    "linYueRuRouQingXiaGu_info": "<span class='tiaoJian'>（李逍遥或赵灵儿在场时）</span>【真元护体】可以对其发动；<span class='tiaoJian'>（你执行【特殊行动】时，若赵灵儿的能量少于2）</span>令其获得【林家千金】产生的【水晶】。",
                    "qiJing": "气劲",
                    "qiJing_info": "<span class='hong'>【气劲】</span>为林月如专属指示物，上限为7。",
                    "miaoJiangShengNv": "被动【苗疆圣女】",
                    "miaoJiangShengNv_info": "你可以使用独有技【雷击】【火球】。<span class='tiaoJian'>（回合结束时）</span>从牌堆取得1张牌作为<span class='lan'>【蛊】</span>；可以移除我方战绩区X颗星石，再取得X张牌作为<span class='lan'>【蛊】</span>。",
                    "miaoJiangShengNv_huoQou": "[法术]火球",
                    "miaoJiangShengNv_leiJi": "[法术]雷击",
                    "miaoJiangShengNv_lianGuShu": "【炼蛊术】",
                    "haiTangFuRen": "被动【海棠夫人】",
                    "haiTangFuRen_info": "<span class='tiaoJian'>（李逍遥在场时，其攻击命中后②）</span>将此次攻击使用的实体牌作为你的<span class='lan'>【蛊】</span>。",
                    "yanShaZhou": "响应【炎杀咒】",
                    "yanShaZhou_info": "<span class='tiaoJian'>（使用【火球】时）</span>可以令其伤害-1，改为对目标施加【爆炸蛊】。",
                    "tianLeiPo": "响应【天雷破】",
                    "tianLeiPo_info": "<span class='tiaoJian'>（使用【雷击】时）</span>可以不获得【宝石】，改为从牌堆取得2张牌作为<span class='lan'>【蛊】</span>。",
                    "yuFengShu": "响应【御蜂术】",
                    "yuFengShu_info": "<span class='tiaoJian'>（攻击拥有【中毒】的目标时）</span>本次伤害额外+1，并将1张手牌作为<span class='lan'>【蛊】</span>。<span class='tiaoJian'>（对已有【中毒】的目标施加【中毒】时）</span>对其造成1点法术伤害③。",
                    "jinCanWang": "法术【金蚕王】",
                    "jinCanWang_info": "<span class='tiaoJian'>（弃置5张不同系的<span class='lan'>【蛊】</span>）</span>目标角色+2【宝石】，你+1【宝石】。",
                    "baoZhaGu": "法术【爆炸蛊】",
                    "baoZhaGu_info": "<span class='tiaoJian'>（弃置1张火系<span class='lan'>【蛊】</span>）</span>对目标施加【爆炸蛊】。<span class='tiaoJian'>（其承受火系攻击或火系法术伤害后⑤）</span>再承受2点法术伤害③。",
                    "sanShiGu": "法术【三尸蛊】",
                    "sanShiGu_info": "【回合限定】<span class='tiaoJian'>（弃置1张法术<span class='lan'>【蛊】</span>）</span>视为对目标使用一次【中毒】，然后选择+1【攻击行动】或【法术行动】。",
                    "yinGu": "响应【隐蛊】",
                    "yinGu_info": "<span class='tiaoJian'>（己方士气即将下降时，弃置1张光系<span class='lan'>【蛊】</span>）</span>取消此次士气下降。",
                    "wanGuShiTian": "法术【万蛊蚀天】",
                    "wanGuShiTian_info": "【宝石】<span class='tiaoJian'>（移除全部<span class='lan'>【蛊】</span>）</span>随机对场上角色使用共X+Y次【中毒】；X为实际移除的<span class='lan'>【蛊】</span>数，Y为场上角色数÷2，向下取整。角色可以被重复选中。",
                    "gu": "蛊",
                    "gu_info": "阿奴的专属盖牌，上限为9；<span class='tiaoJian'>（超过上限时）</span>选择多余的<span class='lan'>【蛊】</span>弃置。",
                    "wuDuZhu": "专属【五毒珠】",
                    "wuDuZhu_info": "游戏开始时持有【五毒珠】。<span class='tiaoJian'>（持有时）</span>不会承受【中毒】伤害。<span class='tiaoJian'>（回合结束时）</span>选择一项：<br>①将【五毒珠】传给左手边角色；<br>②移除我方战绩区1颗星石，将其传给目标角色。",
                },
            },
            "intro": "添加角色赵灵儿、李逍遥、林月如、阿奴、拜月教主及其水魔兽转化形态。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "2.13",
        },
        "files": {
            "character": [
                "zhaoLingEr.jpg",
                "zhaoLingEr_mengShe.png",
                "liXiaoYao.jpg",
                "linYueRu.jpg",
                "aNu.jpg",
                "baiYueJiaoZhu.png",
                "shuiMoShouBaiYueJiaoZhu.png",
            ],
            "card": [],
            "skill": [
                "mark_lingLi.png",
                "mark_jianY.png",
                "mark_qiJing.png",
                "mark_gu.png",
                "mark_wuDuZhu.png",
                "mark_fengMo.png",
                "mark_hongShui.png",
                "mark_jueXingDu.png",
            ],
            "audio": [
                "audio/action/zhaoLingEr/gouMai.mp3",
                "audio/action/zhaoLingEr/heCheng.mp3",
                "audio/action/zhaoLingEr/tiLian.mp3",
                "audio/action/liXiaoYao/gouMai.mp3",
                "audio/action/liXiaoYao/heCheng.mp3",
                "audio/action/liXiaoYao/tiLian.mp3",
                "audio/action/linYueRu/gouMai.mp3",
                "audio/action/linYueRu/heCheng.mp3",
                "audio/action/linYueRu/tiLian.mp3",
                "audio/action/aNu/gouMai.mp3",
                "audio/action/aNu/heCheng.mp3",
                "audio/action/aNu/tiLian.mp3",
                "audio/action/baiYueJiaoZhu/gouMai.mp3",
                "audio/action/baiYueJiaoZhu/heCheng.mp3",
                "audio/action/baiYueJiaoZhu/tiLian.mp3",
                "audio/action/shuiMoShouBaiYueJiaoZhu/gouMai.mp3",
                "audio/action/shuiMoShouBaiYueJiaoZhu/heCheng.mp3",
                "audio/action/shuiMoShouBaiYueJiaoZhu/tiLian.mp3",
                "audio/bgm/taoHuaHuanMeng.mp3",
                "audio/bgm/qingYuan.mp3",
                "audio/bgm/yuJianFuMo.mp3",
                "audio/bgm/niTianErXing.mp3",
                "audio/bgm/niTianErXing2.mp3",
                "audio/bgm/biWuZhaoQin.mp3",
                "audio/bgm/yunGuHeFeng.mp3",
                "audio/bgm/ending.mp3",
                "audio/bgm/dateALive.mp3",
                "audio/bgm/fengYiYangDeYongShi.mp3",
                "audio/bgm/swordland.mp3",
                "audio/bgm/gangGangJiJi.mp3",
                "audio/bgm/douPoCangQiong.mp3",
                "audio/bgm/pigstep.mp3",
                "audio/skill/yuJianShu.mp3",
                "audio/skill/qiXingJian.mp3",
                "audio/skill/tianGangZhanQi.mp3",
                "audio/skill/feiLongTanYunShou.mp3",
                "audio/skill/tianShiFuFa.mp3",
                "audio/skill/wanJianJue.mp3",
                "audio/skill/xianFengYunTiShu.mp3",
                "audio/skill/zuiXianWangYueBu.mp3",
                "audio/skill/xiaoYaoShenJian.mp3",
                "audio/skill/jiuShenZhou.mp3",
                "audio/skill/liXiaoYaoRouQingXiaGu.mp3",
                "audio/skill/liXiaoYaoRouQingXiaGuZhaoLingEr.mp3",
                "audio/skill/liXiaoYaoRouQingXiaGuLinYueRu.mp3",
                "audio/skill/linJiaQianJin.mp3",
                "audio/skill/linJiaQianJinZhaoLingEr.mp3",
                "audio/skill/ningShenGuiYuan.mp3",
                "audio/skill/qiJianZhi.mp3",
                "audio/skill/yiYangZhi.mp3",
                "audio/skill/qiJueJianQi.mp3",
                "audio/skill/zhenYuanHuTi.mp3",
                "audio/skill/zhanLongJue.mp3",
                "audio/skill/tongQianBiao.mp3",
                "audio/skill/qianKunYiZhi.mp3",
                "audio/skill/miaoJiangShengNv.mp3",
                "audio/skill/miaoJiangShengNvLianGu.mp3",
                "audio/skill/haiTangFuRen.mp3",
                "audio/skill/yanShaZhou.mp3",
                "audio/skill/tianLeiPo.mp3",
                "audio/skill/yuFengShu.mp3",
                "audio/skill/jinCanWang.mp3",
                "audio/skill/baoZhaGu.mp3",
                "audio/skill/sanShiGu.mp3",
                "audio/skill/yinGu.mp3",
                "audio/skill/wanGuShiTian.mp3",
                "audio/skill/aNuQianKunYiZhi.mp3",
                "audio/skill/wuDuZhu.mp3",
                "audio/skill/niTianWenDao.mp3",
                "audio/skill/fengMo.mp3",
                "audio/skill/shuiMoShouHeTi.mp3",
                "audio/skill/mieJueYiJi.mp3",
                "audio/skill/duoHun.mp3",
                "audio/skill/daZhouShe.mp3",
                "audio/skill/duTunTianXia.mp3",
                "audio/skill/qunMoLuanWu.mp3",
                "audio/skill/guiJiang.mp3",
                "audio/skill/shuiMoShouHuTi.mp3",
                "audio/skill/xingFengXueYu.mp3",
                "audio/skill/shuiMoShouZhiQu.mp3",
                "audio/skill/shuiMoShouZhiNu.mp3",
                "audio/skill/nvWaZhiXue.mp3",
                "audio/skill/yongSheng.mp3",
                "audio/skill/zhangDuZhen.mp3",
                "audio/skill/diLieTianBeng.mp3",
                "audio/skill/taoTianJuLang.mp3",
                "audio/skill/fengXueBingTian.mp3",
                "audio/skill/hongShui.mp3",
                "audio/skill/wuLingXianShu.mp3",
                "audio/skill/nvWaHouRen.mp3",
                "audio/skill/mengShe.mp3",
                "audio/skill/tianSheZhang.mp3",
                "audio/skill/wuQiChaoYuan.mp3",
                "audio/skill/guanYinZhou.mp3",
                "audio/skill/shengLingZhu.mp3",
                "audio/skill/shengLingPiFeng.mp3",
                "audio/skill/wuShen.mp3",
            ],
        },
        "connect": true,
    };
});
