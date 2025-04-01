game.import("extension",function(lib,game,ui,get,ai,_status){ return {name:"终末祷铸",arenaReady:function(){
    
},content:function(config,pack){
    lib.characterReplace['hongYiZhuJiao']=['tieLvZhe','hongYiZhuJiao'];
    lib.characterReplace['tieLvZhe']=['tieLvZhe','hongYiZhuJiao'];
},prepare:function(){
    
},precontent:function(){
    
},config:{},help:{},package:{
    character: {
        connect:true,
        character: {
            tieLvZhe:['tieLvZhe_name','xueGroup',5,['shenLvFengSuo','shengXueZhiJi','wangCheYiWei','zuiDuanHuoMian','shengYinSongEn','wangQuanBaoZhu','xinYangChongZhu','shengYiWu','yinZhiZiDan'],['des:红衣主教对于教义的理解总是那么深刻，有的时候是一人之下万人之上的红衣主教，而有的时候却是铁血暗流的铸律者。而他真正的目的，只有他自己知晓~','ext:终末祷铸/character/tieLvZhe.jpg','forbidai']],
            hongYiZhuJiao:['tieLvZhe_name','shengGroup',5,['shengYueYinQi','quMoShi','daoGaoShi','quanNengNiWei','shenXuanDaoYan','shengDian','shengYiWu','yinZhiZiDan'],['des:有的时候是一人之下万人之上的红衣主教，而有的时候却是铁血暗流的铸律者。而他真正的目的，只有他自己知晓~','ext:终末祷铸/character/hongYiZhuJiao.jpg']],
            jiLuZhe:['jiLuZhe_name','huanGroup','4/5',['chuanShuoZhiDi','zhiXingHeYi','jiGuShiDian','yiJiLunPo','xuanCuiJingLian','miJingWanXiang','shiShu','guJinHuzheng','yiJi','shiLiao'],['des:多拉贡幻，一个落后于时代的记录者罢了~想要了解么？尝试读懂字里行间的意义吧','ext:终末祷铸/character/jiLuZhe.jpg']],
        },
        translate: {
            tieLvZhe:'铁律者',
            hongYiZhuJiao:'红衣主教',
            tieLvZhe_name:'阿斯兰',
            jiLuZhe:'记录者',
            jiLuZhe_name:'多拉贡幻',
        },
    },
    card: {
        card: {
            shiShuCard:{
                type: "gongJi",
                enable: true,
                selectTarget: 1,
                filterTarget: function(card,player,target){
                    return target.side!=player.side;
                },
                fullskin: true,
                image: "ext:终末祷铸/zhuanShu/shiShuCard.png",
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
            }
        },
        translate: {
            shiShuCard:'史书',
            shiShuCard_info:`
            <span class="greentext">[被动]以史为镜</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得)</span>此卡视为地系的幻类命格攻击牌。<span class='tiaoJian'>(此卡被使用、打出、弃置、或者转移拥有者，或因技能放置在角色旁)</span>移除此卡。<br>
            <span class="greentext">[响应]引稽编鉴</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得，使用此卡进行主动攻击时①)</span>指定攻击目标将1张手牌加入【遗迹】，然后将你手上X张牌与X个【遗迹】交换，X<3。
            `,
        },
        list: [],
    },
    skill: {
        skill: {
            chuanShuoZhiDi:{
                trigger:{global:'gameStart'},
                forced:true,
                content:async function (event,trigger,player){
                    for(var current of game.players) current.update();
                    var cards=get.cards(3);
                    await player.addToExpansion('draw',cards,'log').gaintag.add('yiJi');
                    await player.showHiddenCards(cards);
                }
            },
            zhiXingHeYi:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    return ui.cardPile.childElementCount>=2;
                },
                content:async function (event,trigger,player){
                    var cards=get.cards(2);
                    game.cardsGotoOrdering(cards);
                    await player.showHiddenCards(cards);
                    var next=player.chooseCardButton(cards);
                    next.set('prompt','你可选择1张牌打出，并弃1张牌');
                    next.set('filterButton',function(button){
                        var player=_status.event.player;
                        for(var current of game.players){
                            if(player.canUseXingBei(button.link,current)) return true;
                        }
                        return false;
                    });
                    var result=await next.forResult();
                    if(result.bool){
                        cards.remove(result.links[0]);
                        await player.chooseToDiscard('h',true);
                        await player.chooseUseTarget(result.links[0],true);
                    }
                    await player.addZhiShiWu('shiLiao',cards.length);
                },
                ai:{
                    order:3.3,
                    player:1,
                }
            },
            jiGuShiDian:{
                trigger:{player:'changeZhiShiWuAfter'},
                forced:true,
                filter:function (event,player){
                    return event.zhiShiWu=='shiLiao'&&player.countZhiShiWu('shiLiao')>=lib.skill.shiLiao.intro.max;
                },
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('shiLiao',player.countZhiShiWu('shiLiao'));
                    await player.chooseToDiscard('h',true);
                    if(!player.hasSkill('shiShuX')){
                        player.addSkill('shiShuX');
                    }
                    if(!player.hasCard(card=>get.name(card)=='shiShuCard')){
                        var card=game.createCard('shiShuCard','di','huan');
                        await player.gain(card,'gain2').set('skill','jiGuShiDian');
                    }
                }
            },
            yiJiLunPo:{
                usable:1,
                trigger:{player:'gongJiBefore'},
                filter:function (event,player){
                    return player.getExpansions('yiJi').length>0&&event.yingZhan!=true;s
                },
                cost: async function (event,trigger,player){
                    event.list=player.getExpansions('yiJi');
                    event.chuLi=[];
                    for(var card of event.list){
                        let fakeCard=game.createCard(card.name,card.xiBie,card.mingGe,card.duYou);
                        fakeCard.storage.oriCard=card;
                        event.chuLi.push(fakeCard);
                    }
                    
                    await event.trigger('yiJiLunPo');
                    var next=player.chooseCardButton(event.chuLi,[1,Infinity],`是否发动【遗迹论破】<br><span class='tiaoJian'>(移除与攻击牌同系的X个【遗迹】)</span>本次攻击伤害额外+(X-1)；<span class='tiaoJian'>(若X>1)</span>额外+1[法术行动]；<span class='tiaoJian'>(若因此使【遗迹】数减少为0)</span>我方【战绩区】+1[宝石]。`);
                    next.set('select',[1,Infinity]);
                    next.set('filterButton',function(button){
                        return get.xiBie(button.link)==_status.event.xiBie;
                    });
                    next.set('xiBie',get.xiBie(trigger.card));
                    var result=await next.forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:async function (event,trigger,player){
                    var list=[];
                    for(var card of event.cost_data){
                        list.push(card.storage.oriCard);
                    }
                    await player.discard(list,'yiJi');
                    var num=event.cost_data.length;
                    if(num>1){
                        trigger.changeDamageNum(num.length-1);
                        player.addFaShu();
                    }
                    if(player.getExpansions('yiJi').length==0) await player.addZhanJi('baoShi');
                }
            },
            xuanCuiJingLian:{
                trigger:{player:'yiJiLunPo'},
                getIndex(event,player) {
                    const cards = event.chuLi;
                    var list=[];
                    for(var card of cards){
                        let xiBie=get.xiBie(card);
                        if(xiBie=='an'||xiBie=='guang') list.push(card);
                    }
                    return list;
                },
                filter:function (event,player){
                    const cards = event.chuLi;
                    var list=[];
                    for(var card of cards){
                        let xiBie=get.xiBie(card);
                        if(xiBie=='an'||xiBie=='guang') list.push(card);
                    }
                    return list.length>0; 
                },
                cost: async function (event,trigger,player){
                    var list=lib.xiBie.slice();
                    list.push('cancel2');
                    var dialog = ui.create.dialog("选淬精炼：选择视为的系别",[[event.indexedData], "card"]);
                    var next=player.chooseControl(list);
                    next.set('dialog',dialog);
                    var control=await next.forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                content:async function (event,trigger,player){
                    game.broadcastAll(function(card,xiBie){
                        game.setXiBie(card,xiBie);
                        card.$init([card.xiBie,card.mingGe,card.name,card.duYou]);
                    },event.indexedData,event.cost_data);
                }
            },
            miJingWanXiang:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    return player.hasCard(function(card){
                        return get.name(card)=='shiShuCard';
                    });
                },
                content:async function (event,trigger,player){
                    var card=player.getCards('h',function(card){
                        return get.name(card)=='shiShuCard';
                    })[0];
                    await player.lose(card);
                    card.fix();
                    card.remove();
                    card.destroyed = true;
                    game.log(card, "被移除了");
                    await player.discard(player.getExpansions('yiJi'),'yiJi');
                    var cards=[];
                    while(!(get.countTongXiPai(cards)>=2)){
                        let card=get.cards()[0];
                        await player.showHiddenCards([card]);
                        cards.push(card);
                    }
                    await player.addToExpansion('draw',cards,'log').gaintag.add('yiJi');
                    if(cards.length>3){
                        var targets=await player.chooseTarget(true,cards.length-3,`对${cards.length-3}名目标角色造成2点法术伤害③。`).set('ai',function(target){
                            var player=_status.event.player;
                            return get.zhiLiaoEffect2(target,player,2);
                        }).forResultTargets();
                        for(var target of targets){
                            await target.faShuDamage(2,player);
                        }
                    }
                },
            },
            shiShu:{},
            shiShuX:{
                group:['shiShuX_yiShiWeiJing','shiShuX_yinJiBianJian'],
                subSkill:{
                    yiShiWeiJing:{
                        forced:true,
                        trigger:{player:['daChuPai','discard','gainEnd','addToExpansionEnd']},
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(get.name(event.cards[i]) == 'shiShuCard') {
                                    if(event.cards[i].destroyed) continue;
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        filter: function(event,player,name){
                            if(name=='gainEnd'&&event.skill=='jiGuShiDian') return false;
                            var bool=false;
                            for(var card of event.cards){
                                if(get.name(card)=='shiShuCard'){
                                    bool=true;
                                    break;
                                }
                            }
                            return bool;
                        },
                        content: async function(event, trigger, player){
                            trigger.cards.remove(event.indexedData);
                            event.indexedData.fix();
                            event.indexedData.remove();
                            event.indexedData.destroyed = true;
                            game.log(event.indexedData, "被移除了");
                        }
                    },
                    yinJiBianJian:{
                        trigger:{player:'gongJiShi'},
                        filter:function (event,player){
                            return get.name(event.card)=='shiShuCard'&&event.yingZhan!=true;
                        },
                        content:async function (event,trigger,player){
                            var cards=await trigger.target.chooseCard('h',true).forResultCards();
                            if(cards.length>0){
                                let next=player.addToExpansion('draw',cards,'log');
                                next.set('gaintag',['yiJi']);
                                await next;
                            }

                            var cards=player.getExpansions('yiJi');
                            if(player.countCards('h')==0||cards.length==0) return;
                            var next = player.chooseToMove("引稽编鉴：是否将手上X张牌与X个【遗迹】交换，X<3");
                            next.set("list", [
                                ["遗迹", cards],
                                ["手牌", player.getCards("h")],
                            ]);
                            next.set("filterMove", function (from, to, moved) {
                                if (typeof to == "number") return false;
                                var player = _status.event.player;
                                var hs = player.getCards("h");
                                var changed = hs.filter(function (card) {
                                    return !moved[1].includes(card);
                                });
                                var changed2 = moved[1].filter(function (card) {
                                    return !hs.includes(card);
                                });
                                if (changed.length < 2) return true;
                                var pos1 = moved[0].includes(from.link) ? 0 : 1,
                                    pos2 = moved[0].includes(to.link) ? 0 : 1;
                                if (pos1 == pos2) return true;
                                if (pos1 == 0) {
                                    if (changed.includes(from.link)) return true;
                                    return changed2.includes(to.link);
                                }
                                if (changed2.includes(from.link)) return true;
                                return changed.includes(to.link);
                            });
                            var result=await next.forResult();
                            if(!result.moved) return;
                            var pushs = result.moved[0],
                                gains = result.moved[1];
                            pushs.removeArray(player.getExpansions("yiJi"));
                            gains.removeArray(player.getCards("h"));
                            if (!pushs.length || pushs.length != gains.length) return;
                            await player.lose(pushs);
                            await player.lose(gains);
                            await player.addToExpansion(pushs, "draw",'log').set('gaintag',['yiJi']);
                            game.log(player,`获得了${gains.length}张牌`);
                            await player.gain(gains, "draw");
                        }
                    }
                }
            },
            guJinHuzheng:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.addZhiShiWu('shiLiao',2);
                    if(player.countCards('h')>1){
                        var cards=player.getExpansions('yiJi');
                            var next = player.chooseToMove("古今互鉴：是否将2张手牌与X个【遗迹】交换，X>0");
                            next.set("list", [
                                ["遗迹", cards],
                                ["手牌", player.getCards("h")],
                            ]);
                            next.set("filterMove", function (from, to, moved) {
                                var player = _status.event.player;
                                //交换前
                                if (moved[0].length < 2||moved.length==0) return true;
                                var h=player.getCards("h");
                                var yiJi = player.getExpansions("yiJi");
                                if(typeof to != "number"){
                                    //交换回去
                                    if((moved[0].includes(from.link)&&moved[1].includes(to.link))||moved[0].includes(to.link)&&moved[1].includes(from.link)) return true;
                                    //遗迹间交换
                                    if(yiJi.includes(from.link)&&yiJi.includes(to.link)) return true;
                                    //手牌间交换
                                    if (h.includes(from.link) == h.includes(to.link)) return true;
                                    //移动后，移动的牌在遗迹区交换
                                    if(moved[0].includes(from.link)&&yiJi.includes(to.link)) return true;
                                    if(moved[0].includes(to.link)&&yiJi.includes(from.link)) return true;
                                    //移动后，移动的牌在手牌区交换
                                    if(moved[1].includes(from.link)&&h.includes(to.link)) return true;
                                    if(moved[1].includes(to.link)&&h.includes(from.link)) return true;
                                }else if(to==1){
                                    return true;
                                }else if(to==0){//移动到遗迹区
                                    if(yiJi.includes(from.link)) return true;
                                    return moved[0].length <2
                                }
                            });
                            next.set('filterOk',function(moved){
                                var player=_status.event.player;
                                var pushs = moved[0],
                                    gains = moved[1];
                                pushs.removeArray(player.getExpansions("yiJi"));
                                gains.removeArray(player.getCards("h"));
                                return pushs.length==2&&gains.length>0;
                            });
                            var result=await next.forResult();
                            if(!result.moved) return;
                            var pushs = result.moved[0],
                                gains = result.moved[1];
                            if (!pushs.length) return;
                            await player.lose(pushs);
                            await player.lose(gains);
                            await player.addToExpansion(pushs, player, "giveAuto").set('gaintag',['yiJi']);
                            await player.gain(gains, "draw");
                    }
                },
                ai:{
                    shuiJing:true,
                }

            },
            yiJi:{
                intro:{
                    content:'expansion',
                    markcount:'expansion',
                },
                trigger:{player:'addToExpansionAfter'},
                direct:true,
                filter:function (event,player){
                    return event.gaintag.includes('shiShu')&&player.getExpansions('shiShu').length>8;
                },
                content:async function (event,trigger,player){
                    var list=player.getExpansions('shiShu');
                    var next=player.chooseCardButton(list,true,list.length-8);
                    next.set('prompt',`舍弃${list.length-8}张【遗迹】`);
                    var result=await next.forResult();
                    player.discard(result.links);
                }
            },
            shiLiao:{
                intro:{
                    max:3,
                    content:'mark',
                },
                markimage:'image/card/zhiShiWu/hong.png',
                onremove:'storage',
            },

            shenLvFengSuo:{
                trigger:{player:'changeZhiLiaoEnd'},
                forced:true,
                filter:function (event,player){
                    return event.num>0;
                },
                content:function (){
                    var shiQi=get.shiQi(player.side);
                    if(shiQi>1){
                        player.changeShiQi(-1);
                    }
                },
                global:'shenLvFengSuo_zhiLiao',
                init:function(player,skill){
                    for(var current of game.players){
                        current.storage['shenLvFengSuo']=player;
                    }
                },
                subSkill:{
                    zhiLiao:{
                        mod:{
                            maxHandcard:function (player,num){
                                if(player.storage.shenLvFengSuo.zhiLiao<player.storage.shenLvFengSuo.getZhiLiaoLimit()&&player.zhiLiao==0){
                                    return num-1;
                                }
                            
                            }
                        }
                    }
                }
            },
            shengXueZhiJi:{
                trigger:{source:'gongJiMingZhong'},
                forced:true,
                filter:function (event,player){
                    return event.yingZhan!=true;
                },
                content:function (){
                    trigger.changeDamageNum(1);
                    player.changeZhiLiao(1);
                }
            },
            wangCheYiWei:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    var num=0;
                    for(var current of game.players){
                        num+=current.zhiLiao;
                    }
                    return num>=2;
                },
                selectTarget:[1,2],
                filterTarget:function (card,player,target){
                    return target.zhiLiao>0;
                },
                filterOk:function (){
                    var num=0;
                    var players=ui.selected.targets;
                    for(var player of players){
                        num+=player.zhiLiao;
                    }
                    return num>=2;
                },
                contentBefore:function (){
                    player.addZhiShiWu('yinZhiZiDan',2);
                },
                content:function (){
                    if(targets.length==1){
                        target.changeZhiLiao(-2);
                    }else if(targets.length==2){
                        target.changeZhiLiao(-1);
                    }
                },
                contentAfter:async function (event,trigger,player){
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
                ai:{
                    order:3.1,
                    result:{
                        target:function(player,target){
                            return -target.zhiLiao;
                        },
                    }
                }
            },
            zuiDuanHuoMian:{
                trigger:{global:'changeShiQiBefore'},
                filter:function (event,player){
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
                content:async function (event,trigger,player){
                    trigger.num+=event.cost_data;
                    await player.changeZhiShiWu('shengYiWu',-event.cost_data);
                    await player.addZhiShiWu('yinZhiZiDan',event.cost_data);
                }
            },
            shengYinSongEn:{
                trigger:{player:'gongJiEnd'},
                usable:1,
                filter:function (event,player){
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
                content:async function (event,trigger,player){
                    player.addGongJi();
                    await player.removeZhiShiWu('yinZhiZiDan',2);
                    await event.targets[0].changeZhiLiao(1);
                }
            },
            wangQuanBaoZhu:{},
            wangQuanBaoZhuX:{
                global:['wangQuanBaoZhuX_biaoJi','wangQuanBaoZhuX_shengLvWeiYa','wangQuanBaoZhuX_shenYanYongZan1','wangQuanBaoZhuX_shenYanYongZan2'],
                subSkill:{
                    biaoJi:{
                        intro:{
                            content:'expansion',
                            nocount:true,
                        },
                        markimage:'extension/终末祷铸/zhuanShu/wangQuanBaoZhu.png',
                    },
                    shengLvWeiYa:{
                        trigger:{player:'addToExpansionAfter'},
                        filter:function (event,player){
                            return event.gaintag.includes('wangQuanBaoZhuX_biaoJi')&&player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0;
                        },
                        forced:true,
                        content:async function (event,trigger,player){
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
                        }
                    },
                    shenYanYongZan1:{
                        trigger:{player:'wangQuanBaoZhuX_shengLvWeiYaAfter'},
                        forced:true,
                        filter:function (event,player){
                            return player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0;
                        },
                        content:async function (event,trigger,player){
                            await player.getNext().addToExpansion(player.getExpansions('wangQuanBaoZhuX_biaoJi'),player,'gain2').set('type','zhuanYi').gaintag.add('wangQuanBaoZhuX_biaoJi'); 
                        },     
                    },
                    shenYanYongZan2:{
                        trigger:{player:'addToExpansionEnd'},
                        forced:true,
                        filter:function (event,player){
                            return event.gaintag.includes('wangQuanBaoZhuX_biaoJi')&&player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0&&event.type=='zhuanYi'&&player.name=='tieLvZhe';
                        },
                        content:async function (event,trigger,player){
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
                    }
                },
                
            },
            xinYangChongZhu:{
                trigger:{player:'phaseEnd'},
                filter:function (event,player){
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
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.lose(event.cards);
                    await player.showCards(event.cards);
                    await player.draw();
                    await player.addZhiShiWu('shengYiWu',2);
                    if(!player.hasSkill('wangQuanBaoZhuX')) player.addSkill('wangQuanBaoZhuX');
                    for(var current of game.players) current.storage.wangQuanBaoZhuX_player=player;
                    await player.addToExpansion(event.cards,player,'gain2').set('type','fangZhi').gaintag.add('wangQuanBaoZhuX_biaoJi');
                },
                group:'xinYangChongZhu_teShu',
                subSkill:{
                    teShu:{
                        trigger:{player:'teShuAfter'},
                        direct:true,
                        content:function(){
                            trigger.getParent('phase').teShu=true;
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            shengYiWu:{
                intro:{
                    content:'mark',
                    max:3,
                },
                onremove:function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage:'image/card/zhiShiWu/lan.png',
            },
            yinZhiZiDan:{
                intro:{
                    content:'mark',
                    max:3,
                },
                onremove:function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage:'image/card/zhiShiWu/hong.png',
            },

            shengYueYinQi:{
                forced:true,
                trigger:{player:['gongJiEnd','faShuEnd']},
                filter:function (event,player,name){
                    if(name=='gongJiEnd') return event.yingZhan!=true;
                    return true;
                },
                content:function (){
                    player.addZhiShiWu('yinZhiZiDan');
                }
            },
            quMoShi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>=2;
                },
                content:async function (event,trigger,player){
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
                check:function (event,player){
                    return player.canGongJi()||player.canFaShu();
                }
            },
            daoGaoShi:{
                trigger:{player:'gongJiBefore'},
                filter:function (event,player){
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
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('yinZhiZiDan');
                    await event.targets[0].changeZhiLiao(1);
                }
            },
            quanNengNiWei:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    var num=0;
                    for(var current of game.players){
                        num+=current.zhiLiao;
                    }
                    return num>=2||player.countZhiShiWu('yinZhiZiDan')>=1;
                },
                selectTarget:[0,2],
                filterTarget:function (card,player,target){
                    return target.zhiLiao>0&&player.side==target.side;
                },
                filterOk:function (){
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
                content:async function (event,trigger,player){
                    if(event.targets.length==0){
                        await player.removeZhiShiWu('yinZhiZiDan');
                    }else if(event.targets.length==1){
                        await event.target.changeZhiLiao(-2);
                    }else if(event.targets.length==2){
                        await event.target.changeZhiLiao(-1);
                    }
                },
                contentAfter:async function (event,trigger,player){
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
                ai:{
                    order:3.1,
                    result:{
                        player:1
                    }
                }
            },
            shenXuanDaoYan:{
                trigger:{global:'changeShiQiBefore'},
                filter:function (event,player){
                    if(event.side!=player.side) return false;
                    return player.hasZhiShiWu('shengYiWu')&&event.num<0&&event.cause!='damage';
                },
                content:async function (event,trigger,player){
                    trigger.num+=1;
                    await player.changeZhiShiWu('shengYiWu',-1);
                    await player.addZhiShiWu('yinZhiZiDan',1);
                }
            },
            shengDian:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    for(var current of game.players){
                        if(current.zhiLiao==0&&current.side==player.side) await current.changeZhiLiao(1);
                    }
                },
                check:function (event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    shuiJing:true,
                }
            },
        },
        translate: {
            shenLvFengSuo:'[被动]神律封锁',
            shenLvFengSuo_info:"<span class='tiaoJian'>(你的[治疗]数未达到上限时)</span>所有未拥有[治疗]的角色手牌上限-1。<span class='tiaoJian'>(每次你[治疗]数增加时)</span>我方士气-1，但至少为1(强制)。",
            shengXueZhiJi:'[被动]圣血之击',
            shengXueZhiJi_info:"<span class='tiaoJian'>(主动攻击命中时②)</span>本次攻击伤害额外+1，你+1[治疗]。",
            wangCheYiWei:'[法术]王车易位',
            wangCheYiWei_info:"<span class='tiaoJian'>(移除场上合计2[治疗])</span>你+2<span class='hong'>【银质子弹】</span>，移除你的所有基础效果和[治疗]，将你的角色卡替换为【红衣主教】并额外+1[攻击行动]。",
            zuiDuanHuoMian:'[响应]罪断豁免',
            zuiDuanHuoMian_info:"<span class='tiaoJian'>(我方非因承受伤害而导致士气下降时，移除X点</span><span class='lan'>【圣遗物】</span><span class='tiaoJian'>)</span>抵御X点士气下降，你+X<span class='hong'>【银质子弹】</span>。",
            shengYinSongEn:'[响应]圣银颂恩(回合限定)',
            shengYinSongEn_info:"<span class='tiaoJian'>([攻击行动]结束时，移除2点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>)</span>额外+1[攻击行动]，目标角色+1[治疗]。",
            wangQuanBaoZhu:'(专)王权宝珠',
            wangQuanBaoZhu_info:`
            <span class="greentext">[被动]圣律威压</span><br>
            <span class='tiaoJian'>(此卡转移或放置到你面前是)</span>选择一下一项发动：<br>·<span class='tiaoJian'>(选择1张与此卡上牌种类相同的牌)</span>弃置之[展示]。<br>·摸2张牌[强制]，铁律者阵营士气-1。<span class='tiaoJian'>(若</span><span class='lan'>【圣遗物】</span><span class='tiaoJian'>数<1)</span>移除此卡。<br>
            <span class="greentext">[被动]神言咏赞</span><br>
            <span class='tiaoJian'>(【圣律威压】结算完后)</span>将此卡转移到你右手边最近的玩家面前。<span class='tiaoJian'>(若因此转移至铁律者面前)</span>铁律者选择以下一项发动：<br>·将角色卡替换为【红衣主教】，然后移除此卡。<br>·<span class='tiaoJian'>(移除X点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>，X<3)</span>目标角色摸X张牌[强制]，然后移除此卡。
            `,
            wangQuanBaoZhuX:'(专)王权宝珠',
            wangQuanBaoZhuX_shengLvWeiYa:'[被动]圣律威压',
            wangQuanBaoZhuX_shenYanYongZan1:'[被动]神言咏赞',
            wangQuanBaoZhuX_shenYanYongZan2:'[被动]神言咏赞',
            xinYangChongZhu:'[响应]信仰重铸(回合限定)',
            xinYangChongZhu_info:"[水晶]<span class='tiaoJian'>(你的回合结束时，若本回合你未执行【特殊行动】，将1张手牌面朝上放置在【王权宝珠】上[展示][强制])</span>你摸1张牌[强制]，你+2<span class='lan'>【圣遗物】</span>，将【王权宝珠】放置在你面前。",
            shengYiWu:'圣遗物',
            shengYiWu_info:"<span class='lan'>【圣遗物】</span>为红衣主教与铁律者共有指示物，上限为3。",
            yinZhiZiDan:'银质子弹',
            yinZhiZiDan_info:"<span class='hong'>【银质子弹】</span>为红衣主教与铁律者共有指示物，上限为3。",

            shengYueYinQi:"[被动]圣约银契",
            shengYueYinQi_info:"<span class='tiaoJian'>([攻击行动]或[法术行动]结束时)</span>你+1<span class='hong'>【银质子弹】</span>。",
            quMoShi:"[启动]驱魔式",
            quMoShi_info:"<span class='tiaoJian'>(移除2点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>)</span>我方目标角色弃1张牌[展示]。<span class='tiaoJian'>(若该弃牌为圣类命格)</span>你+1[治疗]，摸1张牌[强制]。",
            daoGaoShi:"[响应]祷告式",
            daoGaoShi_info:"<span class='tiaoJian'>(主动攻击前①，移除1点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>)</span>目标角色+1[治疗]。",
            quanNengNiWei:"[法术]权能逆位",
            quanNengNiWei_info:"<span class='tiaoJian'>(移除1点</span><span class='hong'>【银质子弹】</span><span class='tiaoJian'>或我方角色合计2[治疗])</span>你+2<span class='lan'>【圣遗物】</span>，移除你的所有基础效果与[治疗]，将手牌弃到4张，然后将你的角色卡替换为【铁律者】。",
            shenXuanDaoYan:"[响应]神宣祷言",
            shenXuanDaoYan_info:"<span class='tiaoJian'>(我方非因承受伤害而导致士气下降时，移除1点</span><span class='lan'>【圣遗物】</span><span class='tiaoJian'>)</span>抵御1点士气下降，你+1<span class='hong'>【银质子弹】</span>。",
            shengDian:"[启动]圣典",
            shengDian_info:"[水晶]我方所有未拥有[治疗]的角色各+1[治疗]。",

            chuanShuoZhiDi:"[被动]传说之地",
            chuanShuoZhiDi_info:"游戏初始时，将牌库顶3张牌面朝上放置在你角色旁[展示]，作为【遗迹】。",
            zhiXingHeYi:"[法术]知行合一",
            zhiXingHeYi_info:"展示牌堆顶2张牌[展示]；你可选择其中1张牌，将次牌作为相应行动发出并起1张牌。<span class='tiaoJian'>(结算完成后)</span>将以此法展示的剩余X张牌弃掉，你+X<span class='hong'>【史料】</span>。",
            jiGuShiDian:"[被动]稽古识典",
            jiGuShiDian_info:"<span class='tiaoJian'>(</span><span class='hong'>【史料】</span><span class='tiaoJian'>达到上限时)</span>移除所有<span class='hong'>【史料】</span>，你弃1张牌，将【史书】加入手牌[强制]。",
            yiJiLunPo:"[响应]遗迹论破(回合限定)",
            yiJiLunPo_info:"<span class='tiaoJian'>(主动攻击时①，移除与攻击牌同系的X个【遗迹】)</span>本次攻击伤害额外+(X-1)；<span class='tiaoJian'>(若X>1)</span>额外+1[法术行动]；<span class='tiaoJian'>(若因此使【遗迹】数减少为0)</span>我方【战绩区】+1[宝石]。",
            xuanCuiJingLian:"[响应]选淬精炼",
            xuanCuiJingLian_info:"<span class='tiaoJian'>(每当你移除【遗迹】时)</span>将光系与暗系的【遗迹】视为任意系别。",
            miJingWanXiang:"[法术]秘境万象",
            miJingWanXiang_info:"<span class='tiaoJian'>(移除【史书】)</span>移除所有【遗迹】，展示牌堆顶牌[展示]直至展示牌中有同系牌为止；将以此法展示的所有X张牌面朝上放置在你角色旁[展示]，作为【遗迹】。<span class='tiaoJian'>(若X>3)</span>对(X-3)名目标角色造成2点法术伤害③。",
            shiShu:"(专)史书",
            shiShu_info:`
            <span class="greentext">[被动]以史为镜</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得)</span>此卡视为地系的幻类命格攻击牌。<span class='tiaoJian'>(此卡被使用、打出、弃置、或者转移拥有者，或因技能放置在角色旁)</span>移除此卡。<br>
            <span class="greentext">[响应]引稽编鉴</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得，使用此卡进行主动攻击时①)</span>指定攻击目标将1张手牌加入【遗迹】，然后将你手上X张牌与X个【遗迹】交换，X<3。
            `,
            shiShuX_yiShiWeiJing:'[被动]以史为镜',
            shiShuX_yinJiBianJian:'[响应]引稽编鉴',
            guJinHuzheng:"[启动]古今互鉴",
            guJinHuzheng_info:"[水晶]你+2<span class='hong'>【史料】</span>；<span class='tiaoJian'>(若你手牌数>1)</span>你可将2张手牌与X个【遗迹】交换。",
            yiJi:'遗迹',
            yiJi_info:"【遗迹】为记录者专有展示盖牌，上限为8。",
            shiLiao:'史料',
            shiLiao_info:"<span class='hong'>【史料】</span>为记录者专有指示物，上限为3。",
        },
    },
    intro: "三扩(目前阿斯兰、记录者)，本体最低版本1.0.20，反馈QQ群966951007",
    author: "农杰",
    diskURL: "",
    forumURL: "",
    version: "2.0",
},files:{"character":[],"card":[],"skill":[],"audio":[]},connect:true};
});