game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"破晓",content:function (config,pack){
    
},precontent:function (){
    
},help:{},config:{},package:{
    character:{
        character:{
            daDiWuShi:['male','xue',2,['diMaiZhiLi','poXieZhan','shengShengBuXi','gaiYaHuaShen'],
            ["des:阿基特"]],
            xinLinSuShi:["female","huan",4,["huanXiangChongJi","xinLingFengBao","zhenShiHuanJue","gaiBianShiJie"],
            ["des:对于胜利为主要目的而不择手段的人，被称之为胜负师，而将这一切运用到极致的艾莉西娅，完全无愧于命运胜负师的这一称号。对于心灵魔法下属的魅惑魔法、暗示魔法、命令魔法以及支配魔法全部精通的她来说，利用这些能力将他人操纵于鼓掌之中甚至已经成为了一种习惯。<br>对于这次的龙族入侵，艾西莉娅自然不会放弃这个为自己和幻影联盟谋取利益的绝好机会，没人知道她究竟有什么打算，但所有人都相信，她的所作所为会永远的改变整个世界。<br>博弈色彩浓重的角色，发挥既取决于自身的能力和牌运，也受对面的影响。"]],
            caiJueZheP:['female','sheng',3.5,['zhengYiZhuiJi','caiJueZhiXing','zhenLiCaiJue','songZhongDaoFeng','wuJinZhiRen'],
            ["des:仲裁厅一直是神圣教廷内部最为神秘的部门，如果说光辉神殿的使命是向世人散布神的荣光和怜悯，那么仲裁厅便是他冷酷而无情的另一面。仲裁厅的执行人员，主要负责处理『神秘遗物』以及处理相关的事件以及清除拥有危险力量的渎神者和叛教者。仲裁厅所属的人员包括圣殿骑士和战争祭司，总人数极少，由被称为『裁决者』的十余名特别骑士所管辖。<br>面对突如其来的龙族入侵，这个神秘而特殊的机构终于将他的面目展露在世人面前，这次事件中带队的裁决者的代号为“路西菲尔”。<br>拥有额外行动能力的魔武双修的角色，节奏顺的时候很强，节奏不顺的时候发挥大受限制。"]],
            zhanXingJia:['female','yong',2,['zhanBuWeiLai','lieYanFenShen','hanBingHuTi','leiTingZhiNu','guangYingXiangSheng','daYuYanShu','yuZhao'],
            ["des:作为咏歌城的首席占星家，蒂雅拥有着令人难以想象的天赋，由他所创造的快速占卜法术让占星家真正有了在战场上正面作战的能力，这对于星象法术的贡献可谓是居功至伟。但由于深知关于命运法术的难测与危险性，与其兄斯通的分歧日益严重，并最终因他错误的决定导致了两人反目成仇。而斯通的叛逃，一直是蒂雅心中最大的阴影。"]],
        
        },
        translate:{
            daDiWuShi:"大地武士",
            xinLinSuShi:"心灵塑师",
            caiJueZheP:"裁决者",
            zhanXingJia:"占星家",
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
            //大地武士
            diMaiZhiLi:{
                forced:true,
                trigger:{player:'useCardToTargeted'},
				filter:function(event){
                    if(!event.card)return false;
					if(get.type(event.card)!='gongJi')return false;
					return get.xiBie(event.card)=='di'||get.xiBie(event.card)=='an';
				},
				firstDo:true,
				content:function(){
					trigger.getParent().baseDamage++;
				},
            },
            poXieZhan:{
                type:'gongJi',
                enable:['chooseToUse','gongJi'],
                filter:function(event,player){
                    if(event.yingZhan) return false;
                    if(player.storage.shengShengBuXi) return false;
                    var dict={};
                    var hs=player.getCards('h');
                    if(hs.length<2) return false;
                    for(var i=0;i<hs.length;i++){
                        var type=get.xiBie(hs[i]);
                        if(!dict[type]) dict[type]=0;
                        dict[type]++;
                    }
                    for(var i in dict){
                        if(dict[i]>1){
                            return true;
                        }
                    }
                    return player.isLinked();
                },
                selectCard:[2,3],
                prepare:'showCards',
                filterCard:function(card,player){
                    if(player.isLinked())return true;
                    if(!ui.selected.cards.length){
                        return true;
                    }
                    var xiBie=get.xiBie(card);
                    if(get.xiBie(ui.selected.cards[0])!=xiBie){
                        return false;
                    }
                    return true;
                },
                complexCard:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    var cardx={name:'anMie'};
                    return player.canUse(cardx,target);
                },
                content:function(){
                    var name='diLieZhan';
                    if(cards.length==3){
                        name='anMie';
                    }
                    var xiBie='di';
                    if(cards.length==3){
                        xiBie='an';
                    }
                    var card={name:name,xiBie:xiBie};
                    player.useCard(card,target).set('action',true);
                },
                check: function (card) {
					return 6 - get.value(card);
				},
                ai:{
                    order:3.7,
                    result:{
                        target:-1,
                    }
                },
            },
            shengShengBuXi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return true;
                },
                content:function(){
                    player.draw(2);
                    player.storage.gongJi++;
                    player.storage.shengShengBuXi=true;
                },
                ai:{
                    order:3,
                    result:{
                        player:function(player, target){
                            if(player.isLinked()) return 1;
                            if(player.countCards('h')+1>player.getHandcardLimit()) return 2;
                            else return 0;
                        },
                    }
                },
                group:['shengShengBuXi_end'],
                subSkill:{
                    end:{
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            return player.storage.shengShengBuXi;
                        },
                        content:function(){
                            player.storage.shengShengBuXi=false;
                        }
                    },
                },
            },
            gaiYaHuaShen:{
                trigger:{player:'phaseEnd'},
                // direct:true,
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return !player.isLinked();
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    player.hengZhi();
                },
                group:['gaiYaHuaShen_yinZhan','gaiYaHuaShen_yinZhanXiaoGuo','gaiYaHuaShen_xiaoGuo','gaiYaHuaShen_jiaShang','gaiYaHuaShen_chongZhi'],
                subSkill:{
                    yinZhan:{
                        enable:['chooseToUse_yingZhan'],
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            if(event.canYingZhan==false||get.xiBie(event.trigger_card)!='di') return false;
                            return player.countCards('h',card=>get.type(card)=='faShu'||get.type(card)=='gongJi')>0;
                        },
                        filterCard:function(card,player,event){
                            return get.type(card)=='faShu'||get.type(card)=='gongJi';
                        },
                        position:'h',
                        viewAs:function(cards,player){
                            var event=_status.event;
                            return {name:get.name(event.trigger_card),xiBie:get.xiBie(event.trigger_card),isCard:true};
                        },
                    },
                    yinZhanXiaoGuo:{
                        trigger:{player:'useCard1'},
                        firstDo:true,
                        direct:true,
                        filter:function(event,player){
                            if(event.skill!='gaiYaHuaShen_yinZhan') return false;
                            return true;
                        },
                        content:function(){
                            'step 0'
                            game.setXiBie(trigger.card,'di');
                            'step 1'
                            event.player=player;
                            event.trigger('gaiYaHuaShen_yinZhan');
                        }
                    },
                    xiaoGuo:{
                        type:'gongJi',
                        enable:['chooseToUse','gongJi'],
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        selectCard:1,
                        prepare:'showCards',
                        filterCard:function(card){
                            return get.type(card)=='faShu'||get.type(card)=='gongJi';
                        },
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            var cardx={name:'anMie'};
                            return player.canUse(cardx,target);
                        },
                        content:function(){
                            player.useCard({name:'diLieZhan',xiBie:'di'},target).set('action',true);
                        },
                        check: function (card) {
                            return 6 - get.value(card);
                        },
                    },
                    jiaShang:{
                        forced:true,
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            if(event.card&&get.type(event.card)=='gongJi'){
                                return true;
                            }
                            return false;
                        },
                        firstDo:true,
                        content:function(){
                            trigger.getParent().baseDamage++;
                        },
                    },
                    chongZhi:{
                        trigger:{player:'damageEnd'},
                        forced:true,
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            return event.faShu!=true;
                        },
                        content:function(){
                            player.chongZhi();
                        },
                    },
                },
                ai:{
                    baoShi:true,
                }
            },

            //心灵塑师
            huanXiangChongJi:{
                type:"gongJi",
                enable:["chooseToUse","gongJi"],
                filter:function (event,player){
                    if(event.yingZhan) return false;
                    return player.countCards('h')>=3;
                },
                selectCard:3,
                filterCard:function (card){
                    return true;
                },
                complexCard:true,
                selectTarget:1,
                filterTarget:function (card,player,target){
                    var cardx={name:'anMie'};
                    return player.canUse(cardx,target);
                },
                content:function (){
                    'step 0'
                    var choices=['选项一', '选项二'];
                    var choiceList=[`不翻开暗置的牌，受到${lib.translate[player.name]}的3伤暗灭`,`翻开暗置的牌：<span class='tiaoJian'>（若为同系）</span>${lib.translate[player.name]}选择一名队友+1[宝石]，<span class='tiaoJian'>（若否）</span>本次攻击无效且${lib.translate[player.name]}受到5点法术伤害③，你+1[治疗]。`];
                    target.chooseControl(choices).set('prompt',"幻象冲击：你选择以下一项发动").set('choiceList',choiceList).set('ai',function(){
                        if(Math.random()>0.5) return '选项二';
                        return '选项一';
                    });
                    'step 1'
                    if(result.control=='选项一'){
                        if(player.canBiShaShuiJing()){
                            player.chooseControl(['是','否']).set('prompt','是否发动[响应]改变世界?').set('ai',function(){
                                return '是';
                            });
                        }
                        else event.goto(7);
                    }
                    else event.goto(3);
                    'step 2'
                    if(result.control=='是'){
                        player.logSkill('gaiBianShiJie');
                        player.removeBiShaShuiJing();
                        event.goto(5);
                    }
                    else event.goto(7);
                    'step 3'
                    player.showGaiPai(cards);
                    if(get.xiBie(cards[0])==get.xiBie(cards[1])&&get.xiBie(cards[1])==get.xiBie(cards[2])){
                        event.goto(5);
                    }
                    'step 4'
                    player.storage.zhenShiHuanJue=true;
                    player.damageFaShu(5,player);
                    target.changeZhiLiao(1);
                    event.finish();
                    'step 5'
                    player.chooseTarget('选择一名队友+1[宝石]',true,function(card,player,target){
                        return target.side==player.side&&target!=player;
                    })
                    'step 6'
                    if(result.bool){
                        result.targets[0].addMark('_tiLian_r');
                    }
                    'step 7'
                    player.addTempSkill('huanXiangChongJi_jiaShang');
                    player.useCard({name:'anMie',xiBie:'an'},target).set('action',true);
                },
                subSkill:{
                    jiaShang:{
                        forced:true,
                        trigger:{
                            player:"useCardToTargeted",
                        },
                        filter:function (event,player){
                            if(event.card&&get.type(event.card)=='gongJi'){
                                return true;
                            }
                            return false;
                        },
                        firstDo:true,
                        content:function (){
                            trigger.getParent().baseDamage++;
                        },
                        sub:true,
                        "_priority":0,
                    },
                },
                "_priority":0,
            },
            xinLingFengBao:{
                type:"faShu",
                enable:["chooseToUse","faShu"],
                filter:function (event,player){
                    return player.countCards('h')>=2;
                },
                selectCard:2,
                filterCard:function (card){
                    return true;
                },
                complexCard:true,
                selectTarget:1,
                filterTarget:function (card,player,target){
                    return target.side!=player.side;
                },
                content:function (){
                    'step 0'
                    event.num=1;
                    var choices=['选项一', '选项二'];
                    var choiceList=[`不翻开暗置的牌，受到1点法术伤害③，${lib.translate[player.name]}选择一名角色+1[治疗]`,`翻开暗置的牌：<span class='tiaoJian'>（若都为法术牌）</span>本次法术伤害额外+1，${lib.translate[player.name]}额外选择一名角色+1[治疗]，<span class='tiaoJian'>（若否）</span>本次法术伤害无效且${lib.translate[player.name]}受到5点法术伤害③，己方战绩区+1[宝石]。`];
                    target.chooseControl(choices).set('prompt',"心灵风暴：你选择以下一项发动").set('choiceList',choiceList).set('ai',function(){
                        if(Math.random()>0.5) return '选项二';
                        return '选项一';
                    });
                    'step 1'
                    if(result.control=='选项一'){
                        if(player.canBiShaShuiJing()){
                            player.chooseControl(['是','否']).set('prompt','是否发动[响应]改变世界?');
                        }
                        else event.goto(6);
                    }
                    else event.goto(3);
                    'step 2'
                    if(result.control=='是'){
                        player.logSkill('gaiBianShiJie');
                        player.removeBiShaShuiJing();
                        event.goto(5);
                    }
                    else event.goto(6);
                    'step 3'
                    player.showGaiPai(cards);
                    if(get.type(cards[0])=='faShu'&&get.type(cards[1])=='faShu'){
                        event.goto(5);
                    }
                    'step 4'
                    player.storage.zhenShiHuanJue=true;
                    player.damageFaShu(5,player);
                    target.addZhanJi('r');
                    event.finish();
                    'step 5'
                    event.num++;
                    'step 6'
                    target.damageFaShu(event.num,player);
                    player.chooseTarget(`选择${event.num}名角色+1[治疗]`,event.num,true,function(card,player,target){
                        return true;
                    })
                    'step 7'
                    if(result.bool){
                        for(var i=0;i<result.targets.length;i++){
                            result.targets[i].changeZhiLiao(1);
                        }
                    }
                },
                "_priority":0,
            },
            zhenShiHuanJue:{
                trigger:{
                    player:"damageEnd",
                },
                usable:1,
                filter:function (event,player){
                    return player.storage.zhenShiHuanJue;
                },
                content:function (){
                    player.storage.zhenShiHuanJue=false;
                    player.storage.all++;
                },
                "_priority":0,
            },
            gaiBianShiJie:{
                "_priority":0,
            },

            //裁决者
            zhengYiZhuiJi:{
                trigger:{player:'phaseEnd'},
                forced:true,
                filter:function(event,player){
                    return player.storage.zhengYiZhuiJi;
                },
                content:function(event, player){
                    player.storage.zhengYiZhuiJi=false;
                    player.phase();
                },
                group:'zhengYiZhuiJi1',
            },
            zhengYiZhuiJi1:{
                trigger:{global:'changeShiQiEnd'},
                forced:true,
                filter:function(event,player){
                    if(event.side==player.side) return false;
                    if(event.num>=0) return false;
                    if(event.getParent('damage').source!=player) return false;
                    return _status.currentPhase==player;
                },
                content:function(){
                    player.storage.zhengYiZhuiJi=true;
                }
            },
            caiJueZhiXing:{
                firstDo:true,
                trigger:{global:'phaseBefore'},
                filter:function(event,player){
                    return game.phaseNumber==0;
                },
                forced:true,
                content:function(){
                    player.addNengLiang('b',2);
                },
                group:'caiJueZhiXing1',
            },
            caiJueZhiXing1:{
                trigger:{player:'heCheng'},
                forced:true,
                filter:function(event,player){
                    return event.player==player;
                },
                content:function(){
                    player.storage.zhengYiZhuiJi=true;
                    player.changeXingBei(-1);
                }
            },
            zhenLiCaiJue:{
                trigger:{global:'phaseBefore'},
                filter:function(event,player){
                    return game.phaseNumber==0;
                },
                forced:true,
                content:function(event,player){
                    for(var p of game.players){
                        p.addSkill('zhenLiCaiJue1');
                    }
                },
            },
            zhenLiCaiJue1:{
                trigger:{player:'zhiLiao'},
                firstDo:true,
                forced:true,
                filter:function(event,player){
                    return event.source.hasSkill('zhenLiCaiJue');
                },
                content:function(){
                    'step 0'
                    var num=trigger.getParent().num;
                    var list=[0,1];
                    player.chooseControl(list).set('prompt','使用的[治疗]数量，目前伤害量'+num).set('ai',function(){return _status.event.num;}).set('num',list.length-1);
                    'step 1'
                    var zhiLiaonum=result.control;
                    if(zhiLiaonum>0){
                        trigger.getParent().num-=zhiLiaonum;
                        game.log(player,'的','[治疗]','抵挡了'+zhiLiaonum+'点伤害');
                        player.changeZhiLiao(-zhiLiaonum).type='damage';
                    }
                    'step 2'
                    trigger.cancel();
                }
            },
            songZhongDaoFeng:{
                trigger:{player:'useCardToPlayer'},
                firstDo:true,
                priority:1,
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    return get.is.zhuDongGongJi(event.getParent());
                },
                content:function(){
                    player.removeBiShaShuiJing();
                    var target=trigger.target;
                    if(player.countCards('h')<=target.countCards('h')){
                        trigger.getParent().baseDamage++;
                    }
                    if(player.countCards('h')>=target.countCards('h')){
                        trigger.getParent().canYingZhan=false;
                    }
                },
                ai:{
                    order:4,
                    result:{
                        player:function(player, target){
                            if(target.countCards('h')+3>target.getHandcardLimit()&&target.countCards('h')==player.countCards('h')) return 1;
                            if(target.countCards('h')+2>target.getHandcardLimit()&&target.countCards('h')<player.countCards('h')) return 1;
                            return -3;
                        },
                    }
                },
            },
            wuJinZhiRen:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    var dict={'faShu':0};
                    var hs=player.getCards('h');
                    for(var i=0;i<hs.length;i++){
                        var xiBie=get.xiBie(hs[i]);
                        if(!dict[xiBie]) dict[xiBie]=0;
                        dict[xiBie]++;
                        if (get.type(hs[i])=='faShu') dict['faShu']++;
                    }
                    for(var i in dict){
                        if(dict[i]>=3){
                            return true;
                        }
                    }
                    return dict['faShu']>=2;
                },
                selectCard:[2,3],
                filterCard:function(card,player){
                    if(ui.selected.cards.length==0) return true;
                    if(get.type(ui.selected.cards[0])=='faShu'&&get.type(card)=='faShu') return true;
                    if(get.xiBie(card)==get.xiBie(ui.selected.cards[0])) return true;
                    return false;
                },
                filterOk:function(){
                    var cs = ui.selected.cards;
                    if(cs.length==2){
                        return get.type(cs[0])=='faShu'&&get.type(cs[1])=='faShu';
                    }
                    return cs.length==3&&get.xiBie(cs[0])==get.xiBie(cs[1])&&get.xiBie(cs[1])==get.xiBie(cs[2]);
                },
                complexCard:true,
                prepare:'showCards',
				position:'h',
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.damageFaShu(2,player);
                    'step 2'
                    player.damageFaShu(2,player);
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        },
                        player:function(player, target){
                            if(target.countCards('h')+2>target.getHandcardLimit()) return -3;
                            return 1;
                        },
                    }
                }
            },

            //占星家
            zhanBuWeiLai:{
                trigger:{player:['phaseBegin','daYuYanShu']},
                forced:true,
                content:function(){
                    'step 0'
                    event.num=2;
                    'step 1'
                    event.num--;
                    var cards=get.cards(1);
                    player.showGaiPai(cards);
                    player.addToExpansion('draw',cards,'log').gaintag.add('yuZhao');
                    var xiBie=get.xiBie(cards[0]);
                    if(xiBie=='shui'){
                        event.player=player;
                        event.trigger('hanBingHuTiTrriger');
                    }
                    else if(xiBie=='guang'||xiBie=='an'){
                        player.logSkill('guangYingXiangSheng');
                        event.num++;
                    }
                    'step 2'
                    if(event.num>0) event.goto(1);
                },
                group:'zhanBuWeiLai1',
            },
            zhanBuWeiLai1:{
                priority:1,
                trigger:{player:'phaseEnd'},
                forced:true,
                content:function(){
                    player.discard(player.getExpansions('yuZhao'),'yuZhao');
                },
            },
            lieYanFenShen:{
                forced:true,
                trigger:{player:'useCardToTargeted'},
				filter:function(event,player){
                    if(!event.card)return false;
                    if(!get.is.zhuDongGongJi(event.getParent())) return false;
					if(get.type(event.card)!='gongJi')return false;
                    for(var c of player.getExpansions('yuZhao')){
                        if(get.xiBie(c)=='huo') return true;
                    }
                    return false;
				},
				firstDo:true,
				content:function(){
                    var num=0;
                    for(var c of player.getExpansions('yuZhao')){
                        if(get.xiBie(c)=='huo') num++;
                    }
                    trigger.getParent().baseDamage+=num;
				},
            },
            hanBingHuTi:{
                trigger:{player:"hanBingHuTiTrriger"},
                forced:true,
                content:function(){
                    'step 0'
                    player.chooseTarget('目标角色+1[治疗]',true);
                    'step 1'
                    if(result.bool){
                        result.targets[0].changeZhiLiao(1);
                    }
                },
            },
            leiTingZhiNu:{
                priority:99,
                trigger:{player:'phaseEnd'},
                forced:true,
                filter:function(event,player){
                    for(var c of player.getExpansions('yuZhao')){
                        var xiBie=get.xiBie(c);
                        if(xiBie=='lei'||xiBie=='guang'||xiBie=='an') return true;
                    }
                    return false;
                },
                content:function(){
                    'step 0'
                    event.num=0;
                    for(var c of player.getExpansions('yuZhao')){
                        var xiBie=get.xiBie(c);
                        if(xiBie=='lei'||xiBie=='guang'||xiBie=='an') event.num++;
                    }
                    'step 1'
                    player.chooseTarget(`对目标对手造成${event.num}点法术伤害③`,true,function(card,player,target){
                        return player.side!=target.side;
                    }).set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,event.num);
                    });
                    'step 2'
                    var target=result.targets[0];
                    game.log(player,'选择了',target);
                    target.damageFaShu(event.num,player);
                },
            },
            guangYingXiangSheng:{
            },
            daYuYanShu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                priority:1,
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    event.player=player;
                    event.trigger('daYuYanShu');
                    'step 2'
                    player.storage.all++;
                },
                ai:{
                    order:3,
                },
            },
            yuZhao:{
                intro:{
					content:'expansion',
                    markcount:'expansion',
                },
            },
        },
        translate:{
            diMaiZhiLi:"[被动]地脉之力",
            diMaiZhiLi_info:"你的地裂斩和暗灭伤害额外+1。",
            poXieZhan:"[响应]破邪斩",
            poXieZhan_info:"<span class='tiaoJian'>(弃2张同系牌[展示])</span>视为一次地系的主动攻击；或<span class='tiaoJian'>(弃3张同系牌[展示])</span>视为一次暗系的主动攻击。",
            shengShengBuXi:"[法术]生生不息",
            shengShengBuXi_info:"<span class='tiaoJian'>(弃1张牌)</span>，摸2张牌，+1[攻击行动]，本回合你不能发动【破邪斩】。",
            gaiYaHuaShen:"[响应]盖亚化身",
            gaiYaHuaShen_info:"[宝石]<span class='tiaoJian'>(回合结束时)</span>，[横置]转为【盖亚化身形态】，你所有的基础牌都可以视为地裂斩；你发动的所有攻击伤害额外+1，若有角色对你造成攻击伤害，[重置]脱离此形态。",
        
            huanXiangChongJi:"[响应]幻象冲击",
            "huanXiangChongJi_info":"<span class='tiaoJian'>(暗置三张牌)</span>视为一次3点伤害的暗系主动攻击，对方可以翻开暗置的牌：<span class='tiaoJian'>（若为同系）</span>你选择一名队友+1[宝石]，<span class='tiaoJian'>（若否）</span>本次攻击无效且你受到5点法术伤害③，对方+1[治疗]。",
            xinLingFengBao:"[法术]心灵风暴",
            "xinLingFengBao_info":"<span class='tiaoJian'>(暗置两张牌)</span>，对目标对手造成1点法术伤害③，再选择一名角色+1[治疗]，对方可以翻开暗置的牌：<span class='tiaoJian'>（若都为法术牌）</span>本次法术伤害额外+1，你额外选择一名角色+1[治疗]，<span class='tiaoJian'>（若否）</span>本次法术伤害无效且你受到5点法术伤害③，对方战绩区+1[宝石]。",
            zhenShiHuanJue:"[响应]真实幻觉[回合限定]",
            "zhenShiHuanJue_info":"<span class='tiaoJian'>(因【幻象冲击】或【心灵风暴】受到法术伤害③时)</span>你+1[攻击行动]或[法术行动]。",
            gaiBianShiJie:"[响应]改变世界",
            "gaiBianShiJie_info":"[水晶]<span class='tiaoJian'>(使用【幻象冲击】或【心灵风暴】后对方不翻开暗置牌)</span>你发动翻开暗置牌且满足了条件时触发的额外效果。",   
                 
            zhengYiZhuiJi:"[被动]正义追击",
            zhengYiZhuiJi_info:"<span class='tiaoJian'>(回合结束时，若该回合你造成过对方士气下降)</span>你额外获得一个回合。",
            caiJueZhiXing:"[被动]裁决之心",
            caiJueZhiXing_info:"游戏开始时你获得2水晶，你执行【合成】时不会增加星杯。",
            zhenLiCaiJue:"[被动]真理裁决",
            zhenLiCaiJue_info:"你造成的所有伤害只能被最多1点治疗抵御。",
            zhenLiCaiJue1:"[被动]真理裁决",
            songZhongDaoFeng:"[响应]送终刀锋",
            songZhongDaoFeng_info:"[水晶]<span class='tiaoJian'>(主动攻击时①)</span>若你的手牌数≤对方手牌数，则本次攻击伤害额外+1，若你的手牌数≥对方手牌数，则本次攻击不能被应战。",
            wuJinZhiRen:"[法术]无尽之刃",
            wuJinZhiRen_info:"[水晶]<span class='tiaoJian'>(弃2张法术牌或3张同系牌[展示])</span>对目标角色和自己造成2点法术伤害③。",

            zhanBuWeiLai:"[被动]占卜未来",
            zhanBuWeiLai_info:"<span class='tiaoJian'>(回合开始时)</span>将牌堆顶2张牌翻开放置在你的角色旁，作为【预兆】；(回合结束后)弃置所有【预兆】。",
            lieYanFenShen:"[被动]烈焰焚身",
            lieYanFenShen_info:"<span class='tiaoJian'>(主动攻击命中时②)</span>攻击伤害额外+X<span class='tiaoJian'>(X为火系【预兆】数量)</span>。",
            hanBingHuTi:"[被动]寒冰护体",
            hanBingHuTi_info:"<span class='tiaoJian'>(翻开1张水系【预兆】时)</span>目标角色+1[治疗]。",
            leiTingZhiNu:"[被动]雷霆之怒",
            leiTingZhiNu_info:"<span class='tiaoJian'>(回合结束时)</span>对目标对手造成X点法术伤害③<span class='tiaoJian'>(X为雷系、光系和暗系【预兆】数量)</span>。",
            guangYingXiangSheng:"[被动]光影相生",
            guangYingXiangSheng_info:"<span class='tiaoJian'>(翻开1张光系或暗系【预兆】时)</span>，额外翻开1张牌作为【预兆】。",
            daYuYanShu:"[法术]大预言术",
            daYuYanShu_info:"[宝石]额外翻开2张牌作为【预兆】，你+1[攻击行动]或[法术行动]。",
            yuZhao:"预兆",
            yuZhao_info:"【预兆】为占星家专有展示盖牌。",
        },
    },
    intro:"复活了破晓中的几个好玩的角色，占星和大地武士缺少高清卡图，能提供的话感激不尽。",
    author:"连桑",
    diskURL:"",
    forumURL:"",
    version:"0.1",
},files:{"character":["xinLinSuShi.jpg", "daDiWuShi.jpg", "caiJueZheP.jpg", "zhanXingJia.jpg"],"card":[],"skill":[],"audio":[]}}})