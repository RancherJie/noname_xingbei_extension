game.import("extension",function(lib,game,ui,get,ai,_status){ return {name:"终末祷铸",arenaReady:function(){
    
},content:function(config,pack){
    lib.characterReplace['hongYiZhuJiao']=['tieLvZhe','hongYiZhuJiao'];
    lib.characterReplace['tieLvZhe']=['tieLvZhe','hongYiZhuJiao'];
},prepare:function(){
    
},precontent:function(){
    
},help:{},config:{},package:{
    character: {
        connect: true,
        character: {
            tieLvZhe: ["tieLvZhe_name","xueGroup",5,["shenLvFengSuo","shengXueZhiJi","wangCheYiWei","zuiDuanHuoMian","shengYinSongEn","wangQuanBaoZhu","xinYangChongZhu","shengYiWu","yinZhiZiDan"],["des:红衣主教对于教义的理解总是那么深刻，即使五饼二鱼的布教，他总能依靠自己的政治觉悟在其中牟利，达成自己的目的。圣vs血，哪个才是他真正的面目呢？无人知晓","ext:终末祷铸/character/tieLvZhe.jpg","forbidai","die:ext:终末祷铸/audio/die/tieLvZhe.mp3"]],
            hongYiZhuJiao: ["tieLvZhe_name","shengGroup",5,["shengYueYinQi","quMoShi","daoGaoShi","quanNengNiWei","shenXuanDaoYan","shengDian","shengYiWu","yinZhiZiDan"],["des:红衣主教对于教义的理解总是那么深刻，即使五饼二鱼的布教，他总能依靠自己的政治觉悟在其中牟利，达成自己的目的。圣vs血，哪个才是他真正的面目呢？无人知晓","ext:终末祷铸/character/hongYiZhuJiao.jpg","die:ext:终末祷铸/audio/die/hongYiZhuJiao.mp3"]],
        },
        translate: {
            tieLvZhe: "铁律者",
            hongYiZhuJiao: "红衣主教",
            "tieLvZhe_name": "阿斯兰",
            "终末祷铸": "终末祷铸",
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
            shenLvFengSuo: {
                trigger: {
                    player: "changeZhiLiaoEnd",
                },
                forced: true,
                filter: function (event,player){
                    return event.num>0;
                },
                content: function (){
                    var shiQi=get.shiQi(player.side);
                    if(shiQi>1){
                        player.changeShiQi(-1);
                    }
                },
                global: "shenLvFengSuo_zhiLiao",
                init: function(player,skill){
                    for(var current of game.players){
                        current.storage['shenLvFengSuo']=player;
                    }
                },
                subSkill: {
                    zhiLiao: {
                        mod: {
                            maxHandcard: function (player,num){
                                if(player.storage.shenLvFengSuo.zhiLiao<player.storage.shenLvFengSuo.getZhiLiaoLimit()&&player.zhiLiao==0){
                                    return num-1;
                                }
                            
                            },
                        },
                        sub: true,
                        sourceSkill: "shenLvFengSuo",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            shengXueZhiJi: {
                trigger: {
                    source: "gongJiMingZhong",
                },
                forced: true,
                filter: function (event,player){
                    return event.yingZhan!=true;
                },
                content: function (){
                    trigger.changeDamageNum(1);
                    player.changeZhiLiao(1);
                },
                "_priority": 0,
            },
            wangCheYiWei: {
                type: "faShu",
                enable: "faShu",
                filter: function (event,player){
                    var num=0;
                    for(var current of game.players){
                        num+=current.zhiLiao;
                    }
                    return num>=2;
                },
                selectTarget: [1,2],
                filterTarget: function (card,player,target){
                    return target.zhiLiao>0;
                },
                filterOk: function (){
                    var num=0;
                    var players=ui.selected.targets;
                    for(var player of players){
                        num+=player.zhiLiao;
                    }
                    return num>=2;
                },
                contentBefore: function (){
                    player.addZhiShiWu('yinZhiZiDan',2);
                },
                content: function (){
                    if(targets.length==1){
                        target.changeZhiLiao(-2);
                    }else if(targets.length==2){
                        target.changeZhiLiao(-1);
                    }
                },
                contentAfter: async function (event,trigger,player){
                    var list=player.jiChuXiaoGuoList();
                    if(list.length>0){
                        for(var xiaoGuo of list){
                            let cards=player.getExpansions(xiaoGuo);
                            await player.loseToDiscardpile(cards);
                            if(xiaoGuo=='_zhongDu') player.storage.zhongDu=[];
                        }
                    }
                    if(player.zhiLiao>0) await player.changeZhiLiao(-player.zhiLiao);
                    await player.init('hongYiZhuJiao');
                    player.update();
                    if(player.hasZhiShiWu('shengYiWu')) player.markSkill('shengYiWu');
                    if(player.hasZhiShiWu('yinZhiZiDan')) player.markSkill('yinZhiZiDan');
                    player.addGongJi();
                },
                ai: {
                    order: 3.1,
                    result: {
                        target: function(player,target){
                            return -target.zhiLiao;
                        },
                    },
                },
                "_priority": 0,
            },
            zuiDuanHuoMian: {
                trigger: {
                    global: "changeShiQiBefore",
                },
                filter: function (event,player){
                    if(event.side!=player.side) return false;
                    return player.hasZhiShiWu('shengYiWu')&&event.num<0&&event.cause!='damage';
                },
                cost: async function (event,trigger,player){
                    var list=[];
                    for(var i=1;i<=player.countZhiShiWu('shengYiWu');i++){
                        if(i>-trigger.num) break;
                        list.push(i);
                    }
                    list.push('cancel2');
                    var next=player.chooseControl(list);
                    next.set('prompt',get.prompt('zuiDuanHuoMian'));
                    next.set('prompt2',lib.translate.zuiDuanHuoMian_info);
                    next.set('num',list.length);
                    next.set('ai',function(){
                        return _status.event.num-2;
                    });
                    var control=await next.forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    };
                },
                content: async function (event,trigger,player){
                    trigger.num+=event.cost_data;
                    await player.changeZhiShiWu('shengYiWu',-event.cost_data);
                    await player.addZhiShiWu('yinZhiZiDan',event.cost_data);
                },
                "_priority": 0,
            },
            shengYinSongEn: {
                trigger: {
                    player: "gongJiEnd",
                },
                useable: 1,
                filter: function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>=2&&event.yingZhan!=true;
                },
                cost: async function (event,trigger,player){
                    var next=player.chooseTarget();
                    next.set('prompt',get.prompt('shengYinSongEn'));
                    next.set('prompt2',lib.translate.shengYinSongEn_info);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    event.result=await next.forResult();
                },
                content: async function (event,trigger,player){
                    player.addGongJi();
                    await player.removeZhiShiWu('yinZhiZiDan',2);
                    await event.targets[0].changeZhiLiao(1);
                },
                "_priority": 0,
            },
            wangQuanBaoZhu: {
                "_priority": 0,
            },
            wangQuanBaoZhuX: {
                global: ["wangQuanBaoZhuX_biaoJi","wangQuanBaoZhuX_shengLvWeiYa","wangQuanBaoZhuX_shenYanYongZan1","wangQuanBaoZhuX_shenYanYongZan2"],
                subSkill: {
                    biaoJi: {
                        intro: {
                            content: "expansion",
                            nocount: true,
                        },
                        markimage: "extension/终末祷铸/zhuanShu/wangQuanBaoZhu.png",
                        sub: true,
                        sourceSkill: "wangQuanBaoZhuX",
                        "_priority": 0,
                    },
                    shengLvWeiYa: {
                        trigger: {
                            player: "addToExpansionAfter",
                        },
                        filter: function (event,player){
                            return event.gaintag.includes('wangQuanBaoZhuX_biaoJi')&&player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0;
                        },
                        forced: true,
                        content: async function (event,trigger,player){
                            var type=get.type(trigger.cards[0]);
                            var next=player.chooseCard('h',card=>get.type(card)==_status.event.type);
                            next.set('ai',function(card){
                                var player=_status.event.player;
                                if(player.side!=player.storage.wangQuanBaoZhuX_player.side&&player.countCards('h')+2<=player.getHandcardLimit()) return 0;
                                return 8-get.value(card);
                            });
                            next.set('type',type);
                            next.set('prompt','请选择一张与【王权宝珠】上牌种类相同的牌,弃置之[展示],否则摸2张牌，铁律者阵营士气-1，若【圣遗物】数<1移除此卡');
                            var result=await next.forResult();
                            if(result.bool){
                                await player.discard(result.cards[0],'showCards');
                            }else{
                                await player.draw(2);
                                await player.changeShiQi(-1,player.storage.wangQuanBaoZhuX_player.side);
                                if(player.storage.wangQuanBaoZhuX_player.countZhiShiWu('shengYiWu')<1){
                                    await player.discard(player.getExpansions('wangQuanBaoZhuX_biaoJi'));
                                    player.storage.wangQuanBaoZhuX_player.removeSkill('wangQuanBaoZhuX');
                                }
                            }
                        },
                        sub: true,
                        sourceSkill: "wangQuanBaoZhuX",
                        "_priority": 0,
                    },
                    "shenYanYongZan1": {
                        trigger: {
                            player: "wangQuanBaoZhuX_shengLvWeiYaAfter",
                        },
                        forced: true,
                        filter: function (event,player){
                            return player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0;
                        },
                        content: async function (event,trigger,player){
                            await player.getNext().addToExpansion(player.getExpansions('wangQuanBaoZhuX_biaoJi'),player,'gain2').set('type','zhuanYi').gaintag.add('wangQuanBaoZhuX_biaoJi'); 
                        },
                        sub: true,
                        sourceSkill: "wangQuanBaoZhuX",
                        "_priority": 0,
                    },
                    "shenYanYongZan2": {
                        trigger: {
                            player: "addToExpansionEnd",
                        },
                        forced: true,
                        filter: function (event,player){
                            return event.gaintag.includes('wangQuanBaoZhuX_biaoJi')&&player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0&&event.type=='zhuanYi'&&player.name=='tieLvZhe';
                        },
                        content: async function (event,trigger,player){
                            var choiceList=["将角色卡替换为【红衣主教】，然后移除此卡","<span class='tiaoJian'>(移除X点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>，X<3)</span>目标角色摸X张牌[强制]，然后移除此卡"];
                            var list=['选项一'];
                            if(player.hasZhiShiWu('yinZhiZiDan')) list.push('选项二');
                            var next=player.chooseControl(list);
                            next.set('choiceList',choiceList);
                            next.set('ai',function(){
                                if(_status.event.bool) {
                                    var num=Math.random();
                                    if(num<0.5) return 0;
                                    return 1;
                                }
                                return 0;
                            });
                            next.set('bool',list.length>1);
                            var control=await next.forResultControl();
                            if(control=='选项一'){
                                player.init('hongYiZhuJiao');
                                if(player.hasZhiShiWu('shengYiWu')) player.markSkill('shengYiWu');
                                if(player.hasZhiShiWu('yinZhiZiDan')) player.markSkill('yinZhiZiDan');
                            }else if(control=='选项二'){
                                let list=[];
                                for(let i=1;i<=player.countZhiShiWu('yinZhiZiDan');i++){
                                    if(i>=3) break;
                                    list.push(i);
                                }
                                let control=await player.chooseControl(list).set('prompt','移除X点【银质子弹】，目标角色摸X张牌').forResultControl();
                                await player.changeZhiShiWu('yinZhiZiDan',-control);
                                var targets=await player.chooseTarget(true,`目标角色摸${control}张牌`).set('ai',function(target){
                                    var player=_status.event.player;
                                    if(player.side==target.side) return 0;
                                    else return target.countCards('h');
                                }).forResultTargets();
                                await targets[0].draw(control); 
                            }
                            await player.discard(player.getExpansions('wangQuanBaoZhuX_biaoJi'));
                            player.storage.wangQuanBaoZhuX_player.removeSkill('wangQuanBaoZhuX');
                        },
                        sub: true,
                        sourceSkill: "wangQuanBaoZhuX",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            xinYangChongZhu: {
                trigger: {
                    player: "phaseEnd",
                },
                filter: function (event,player){
                    return player.canBiShaShuiJing()&&!event.teShu&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    var next=player.chooseCard('h');
                    next.set('ai',function(card){
                        return 8-get.value(card);
                    });
                    next.set('prompt',get.prompt('xinYangChongZhu'));
                    next.set('prompt2',lib.translate.xinYangChongZhu_info);
                    event.result=await next.forResult();
                },
                content: async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.lose(event.cards);
                    await player.showCards(event.cards);
                    await player.draw();
                    await player.addZhiShiWu('shengYiWu',2);
                    if(!player.hasSkill('wangQuanBaoZhuX')) player.addSkill('wangQuanBaoZhuX');
                    for(var current of game.players) current.storage.wangQuanBaoZhuX_player=player;
                    await player.addToExpansion(event.cards,player,'gain2').set('type','fangZhi').gaintag.add('wangQuanBaoZhuX_biaoJi');
                },
                group: "xinYangChongZhu_teShu",
                subSkill: {
                    teShu: {
                        trigger: {
                            player: "teShuAfter",
                        },
                        direct: true,
                        content: function(){
                            trigger.getParent('phase').teShu=true;
                        },
                        sub: true,
                        sourceSkill: "xinYangChongZhu",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            shengYiWu: {
                intro: {
                    content: "mark",
                    max: 3,
                },
                onremove: function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage: "image/card/zhiShiWu/lan.png",
                "_priority": 0,
            },
            yinZhiZiDan: {
                intro: {
                    content: "mark",
                    max: 3,
                },
                onremove: function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage: "image/card/zhiShiWu/hong.png",
                "_priority": 0,
            },
            shengYueYinQi: {
                forced: true,
                trigger: {
                    player: ["gongJiEnd","faShuEnd"],
                },
                filter: function (event,player,name){
                    if(name=='gongJiEnd') return event.yingZhan!=true;
                    return true;
                },
                content: function (){
                    player.addZhiShiWu('yinZhiZiDan');
                },
                "_priority": 0,
            },
            quMoShi: {
                type: "qiDong",
                trigger: {
                    player: "qiDong",
                },
                filter: function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>=2;
                },
                content: async function (event,trigger,player){
                    await player.removeZhiShiWu('yinZhiZiDan',2);
                    var targets=await player.chooseTarget(true,'我方目标角色弃1张牌',function(card,player,target){
                        return player.side==target.side;
                    }).set('ai',function(target){
                        return target.countCards('h');
                    }).forResultTargets();
                    var cards=await targets[0].chooseToDiscard('he',true,'showCards').forResultCards();
                    if(get.mingGe(cards[0])=='sheng'){
                        await player.changeZhiLiao(1);
                        await player.draw();
                    }
                },
                check: function (event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                "_priority": 0,
            },
            daoGaoShi: {
                trigger: {
                    player: "gongJiBefore",
                },
                filter: function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>0&&event.yingZhan!=true;
                },
                cost: async function (event,trigger,player){
                    var next=player.chooseTarget();
                    next.set('prompt',get.prompt('daoGaoShi'));
                    next.set('prompt2',lib.translate.daoGaoShi_info);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1)-0.1;
                    });
                    event.result=await next.forResult();
                },
                content: async function (event,trigger,player){
                    await player.removeZhiShiWu('yinZhiZiDan');
                    await event.targets[0].changeZhiLiao(1);
                },
                "_priority": 0,
            },
            quanNengNiWei: {
                type: "faShu",
                enable: "faShu",
                filter: function (event,player){
                    var num=0;
                    for(var current of game.players){
                        num+=current.zhiLiao;
                    }
                    return num>=2||player.countZhiShiWu('yinZhiZiDan')>=1;
                },
                selectTarget: [0,2],
                filterTarget: function (card,player,target){
                    return target.zhiLiao>0&&player.side==target.side;
                },
                filterOk: function (){
                    if(ui.selected.targets.length==0){
                        var player=_status.event.player;
                        return player.countZhiShiWu('yinZhiZiDan')>=1;
                    }else{
                        var num=0;
                        var players=ui.selected.targets;
                        for(var player of players){
                            num+=player.zhiLiao;
                        }
                        return num>=2;
                    }
                },
                content: async function (event,trigger,player){
                    if(event.targets.length==0){
                        await player.removeZhiShiWu('yinZhiZiDan');
                    }else if(event.targets.length==1){
                        await event.target.changeZhiLiao(-2);
                    }else if(event.targets.length==2){
                        await event.target.changeZhiLiao(-1);
                    }
                },
                contentAfter: async function (event,trigger,player){
                    await player.addZhiShiWu('shengYiWu',2);
                    var list=player.jiChuXiaoGuoList();
                    if(list.length>0){
                        for(var xiaoGuo of list){
                            let cards=player.getExpansions(xiaoGuo);
                            await player.loseToDiscardpile(cards);
                            if(xiaoGuo=='_zhongDu') player.storage.zhongDu=[];
                        }
                    }
                    if(player.zhiLiao>0) await player.changeZhiLiao(-player.zhiLiao);
                    if(player.countCards('h')>4) player.chooseToDiscard('h',true,player.countCards('h')-4);
                    await player.init('tieLvZhe');
                    player.update();
                    if(player.hasZhiShiWu('shengYiWu')) player.markSkill('shengYiWu');
                    if(player.hasZhiShiWu('yinZhiZiDan')) player.markSkill('yinZhiZiDan');
                },
                ai: {
                    order: 3.1,
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            shenXuanDaoYan: {
                trigger: {
                    global: "changeShiQiBefore",
                },
                filter: function (event,player){
                    if(event.side!=player.side) return false;
                    return player.hasZhiShiWu('shengYiWu')&&event.num<0&&event.cause!='damage';
                },
                content: async function (event,trigger,player){
                    trigger.num+=1;
                    await player.changeZhiShiWu('shengYiWu',-1);
                    await player.addZhiShiWu('yinZhiZiDan',1);
                },
                "_priority": 0,
            },
            shengDian: {
                type: "qiDong",
                trigger: {
                    player: "qiDong",
                },
                filter: function (event,player){
                    return player.canBiShaShuiJing();
                },
                content: async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    for(var current of game.players){
                        if(current.zhiLiao==0&&current.side==player.side) await current.changeZhiLiao(1);
                    }
                },
                check: function (event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                "_priority": 0,
            },
        },
        translate: {
            shenLvFengSuo: "[被动]神律封锁",
            "shenLvFengSuo_info": "<span class='tiaoJian'>(你的[治疗]数未达到上限时)</span>所有未拥有[治疗]的角色手牌上限-1。<span class='tiaoJian'>(每次你[治疗]数增加时)</span>我方士气-1，但至少为1(强制)。",
            shengXueZhiJi: "[被动]圣血之击",
            "shengXueZhiJi_info": "<span class='tiaoJian'>(主动攻击命中时②)</span>本次攻击伤害额外+1，你+1[治疗]。",
            wangCheYiWei: "[法术]王车易位",
            "wangCheYiWei_info": "<span class='tiaoJian'>(移除场上合计2[治疗])</span>你+2<span class='hong'>【银质子弹】</span>，移除你的所有基础效果和[治疗]，将你的角色卡替换为【红衣主教】并额外+1[攻击行动]。",
            zuiDuanHuoMian: "[响应]罪断豁免",
            "zuiDuanHuoMian_info": "<span class='tiaoJian'>(我方非因承受伤害而导致士气下降时，移除X点</span><span class='lan'>【圣遗物】</span><span class='tiaoJian'>)</span>抵御X点士气下降，你+X<span class='hong'>【银质子弹】</span>。",
            shengYinSongEn: "[响应]圣银颂恩(回合限定)",
            "shengYinSongEn_info": "<span class='tiaoJian'>([攻击行动]结束时，移除2点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>)</span>额外+1[攻击行动]，目标角色+1[治疗]。",
            wangQuanBaoZhu: "(专)王权宝珠",
            "wangQuanBaoZhu_info": "\n            <span class=\"greentext\">[被动]圣律威压</span><br>\n            <span class='tiaoJian'>(此卡转移或放置到你面前是)</span>选择一下一项发动：<br>·<span class='tiaoJian'>(选择1张与此卡上牌种类相同的牌)</span>弃置之[展示]。<br>·摸2张牌[强制]，铁律者阵营士气-1。<span class='tiaoJian'>(若</span><span class='lan'>【圣遗物】</span><span class='tiaoJian'>数<1)</span>移除此卡。<br>\n            <span class=\"greentext\">[被动]神言咏赞</span><br>\n            <span class='tiaoJian'>(【圣律威压】结算完后)</span>将此卡转移到你右手边最近的玩家面前。<span class='tiaoJian'>(若因此转移至铁律者面前)</span>铁律者选择以下一项发动：<br>·将角色卡替换为【红衣主教】，然后移除此卡。<br>·<span class='tiaoJian'>(移除X点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>，X<3)</span>目标角色摸X张牌[强制]，然后移除此卡。\n            ",
            wangQuanBaoZhuX: "(专)王权宝珠",
            "wangQuanBaoZhuX_shengLvWeiYa": "[被动]圣律威压",
            "wangQuanBaoZhuX_shenYanYongZan1": "[被动]神言咏赞",
            "wangQuanBaoZhuX_shenYanYongZan2": "[被动]神言咏赞",
            xinYangChongZhu: "[响应]信仰重铸(回合限定)",
            "xinYangChongZhu_info": "[水晶]<span class='tiaoJian'>(你的回合结束时，若本回合你未执行【特殊行动】，将1张手牌面朝上放置在【王权宝珠】上[展示][强制])</span>你摸1张牌[强制]，你+2<span class='lan'>【圣遗物】</span>，将【王权宝珠】放置在你面前。",
            shengYiWu: "圣遗物",
            "shengYiWu_info": "<span class='lan'>【圣遗物】</span>为红衣主教与铁律者共有指示物，上限为3。",
            yinZhiZiDan: "银质子弹",
            "yinZhiZiDan_info": "<span class='hong'>【银质子弹】</span>为红衣主教与铁律者共有指示物，上限为3。",
            shengYueYinQi: "[被动]圣约银契",
            "shengYueYinQi_info": "<span class='tiaoJian'>([攻击行动]或[法术行动]结束时)</span>你+1<span class='hong'>【银质子弹】</span>。",
            quMoShi: "[启动]驱魔式",
            "quMoShi_info": "<span class='tiaoJian'>(移除2点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>)</span>我方目标角色弃1张牌[展示]。<span class='tiaoJian'>(若该弃牌为圣类命格)</span>你+1[治疗]，摸1张牌[强制]。",
            daoGaoShi: "[响应]祷告式",
            "daoGaoShi_info": "<span class='tiaoJian'>(主动攻击前①，移除1点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>)</span>目标角色+1[治疗]。",
            quanNengNiWei: "[法术]权能逆位",
            "quanNengNiWei_info": "<span class='tiaoJian'>(移除1点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>或我方角色合计2[治疗])</span>你+2<span class='lan'>【圣遗物】</span>，移除你的所有基础效果与[治疗]，将手牌弃到4张，然后将你的角色卡替换为【铁律者】。",
            shenXuanDaoYan: "[响应]神宣祷言",
            "shenXuanDaoYan_info": "<span class='tiaoJian'>(我方非因承受伤害而导致士气下降时，移除1点</span><span class='lan'>【圣遗物】</span><span class='tiaoJian'>)</span>抵御1点士气下降，你+1<span class='hong'>【银质子弹】</span>。",
            shengDian: "[启动]圣典",
            "shengDian_info": "[水晶]我方所有未拥有[治疗]的角色各+1[治疗]。",
        },
    },
    intro: "三扩(目前阿斯兰)，本体最低版本1.0.18",
    author: "农杰",
    diskURL: "",
    forumURL: "",
    version: "1.1",
},files:{"character":[],"card":[],"skill":[],"audio":[]},connect:false} 
});