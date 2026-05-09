game.import("extension",function(lib,game,ui,get,ai,_status){ return {name:"tom扩",arenaReady:function(){
    
},content:function(config,pack){
    
},prepare:function(){
    
},precontent:function(){
    
},config:{},help:{},package:{
    character: {
        connect:true,
        character: {
            shengTangMuShi:['shengTangMuShi_name','shengGroup',3, ['shenShengHuZhao','xiLi','fengZhiZhuFu','shenShengLianJie','tianFa'],[]],
            yingLiuWuShi:['yingLiuWuShi_name','jiGroup',4,['dongZhen','tuNa','zhanZhiXing','yuZhiXing','yingLiuZhan','jiZhiXing','shan','yiShan', 'juHe'],[]],
            lvXingShangRen:['lvXingShangRen_name','huanGroup',4, ['jingShangZhiDao','diXiaFaZe1','liuZhiDaJi','jinNangMiaoJi','qianKeWanLai'],[]],
            huangMoNvWu:['huangMoNvWu_name','yongGroup',4, ['huangShaJueYing','fengHua','zhanShaShu','shaChenBao','shiKongShaLou','liuShaXianJing','shaChen'],[]],
            shouRenJun:['shouRenJun_name','xueGroup',4, ['shanMengXueShi','xingHongDaJi','yiYanHuanYan','luLiTongXin','shaXueZhiShi','fanJiZiTai','xueChou'],[]],
            gaoJieQiShi:['gaoJieQiShi_name','shengGroup',4, ['shengJieZhiDao','shenShengDaJi','shouHuJieJie','shenShengZhaoZhao','shengJianHengSao','jianDingBuYi'],[]],
            longJianShi:['longJianShi_name','jiGroup',4,['longZhiKuangAo','cangLongLianZhan','kangMoLinJia','linLongSuJi','yuanGuZhiMing','longZhiChiShou','longPo'],[]],
            longShuShi:['longShuShi_name','yongGroup',4, ['longZhiJiDian','longZhiYiJi','aoShuChongJi','huanLongYu','yuanGuZhaoHuan','longHunFuMo','longHun'],[]],
            longQiShi:['longQiShi_name','xueGroup',4,['longZhiWeiYi','nuHuoLiaoYuan','longNuGuanTian','jiaoLongDan','yuanGuXianJi','longZhiBaoLie','longXi'],[]],
            shuangMianNvLang:['shuangMianNvLang_name','huanGroup',5, ['changAnZhiYing','dianMoZhan','huanLeiJue','fengMoShi','niRiSiGangShan','anChaoLianYaTu','anYing'],[]],
            liuLiNvWu:['liuLiNvWu_name','yongGroup',4, ['liuLiZhiXin','jingGuangChongJi','lingJingZhangBi','qiYiGuangCai','cuiCanLiYu','ruiGuang'],[]],
            jianHuang:['jianHuang_name','jiGroup',5, ['jianHunJiaHu','lingQiZhan','jiFengJiX','lieFengJiX','zhenWangWuShuang','buHuiShengYi','tianShiWenZhang','eMoWenZhang'],[]],
            shouLingLieShou:['shouLingLieShou_name','jiGroup',4, ['wuZheJingJue','linZhanTaiShi','yangJingXuRui','xunLeiYiShan','shunYingChongJi','gongJiZhuangTai','fangYuZhuangTai','shouHunJueTu','shouLing'],],
            daiXingZhe:['daiXingZhe_name','shengGroup',4, ['zhuAnZhe','shenZhiJianFeng','wuXiShengYue','liuMangXingYue','wanShengZhiZi','zhuEKuiSan','shengMang','xingMang'],],

            
        },
        translate: {
            shengTangMuShi: "圣堂牧师",
            yingLiuWuShi: "樱流武士",
            lvXingShangRen: "旅行商人",
            huangMoNvWu: "荒漠女巫",
            shouRenJun: "首刃军",
            gaoJieQiShi: "高洁骑士",
            longJianShi: "龙剑士",
            longShuShi: "龙术士",
            longQiShi: "龙骑士",
            shuangMianNvLang: "双面女郎",
            liuLiNvWu: "琉璃女巫",
            jianHuang: "剑皇",
            shouLingLieShou: "兽灵猎手",
            daiXingZhe: "代行者",

            
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

            //圣堂牧师
            shenShengHuZhao: {
                trigger: { source: 'zaoChengShangHai' },
                filter: function (event, player) {
                    return event.faShu && event.player;
                },
                content: function () {
                    'step 0'
                    event.num = 3 - trigger.player.countCards('h');
                    if (event.num <= 0){
                        player.chooseToDiscard('h',true);
                        event.finish();
                    }else{
                        player.chooseTarget(`令一名我方角色+${event.num}点[治疗]`, true, function (card, player, target) {
                        return target.side == player.side;
                    }).set('num', event.num);
                    }
                    
                    'step 1'
                    result.targets[0].changeZhiLiao(event.num, player);
                },
            },

            xiLi: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'shui') > 0;
                },
                filterCard: function (card) {
                    return get.xiBie(card) == 'shui';
                },
                selectCard: 1,
                discard: true,
                showCards: true,
                filterTarget: function (card, player, target) {
                    return target.side != player.side;
                },
                selectTarget: 1,
                content: function () {
                    'step 0'
                    target.faShuDamage(1, player);
                    'step 1'
                    player.chooseTarget('令目标我方角色+1点[治疗]', true, function (card, player, target) {
                        return target.side == player.side;
                    });
                    'step 2'
                    result.targets[0].changeZhiLiao(1, player);
                },
            },

            fengZhiZhuFu: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'feng') > 0;
                },
                filterCard: function (card) {
                    return get.xiBie(card) == 'feng';
                },
                selectCard: 1,
                discard: true,
                showCards: true,
                filterTarget: true,
                selectTarget: 1,
                content: function () {
                    'step 0'
                    target.chooseToDiscard(true);
                    'step 1'
                    if (target.jiChuXiaoGuoList && target.jiChuXiaoGuoList().length > 0) {
                        player.chooseTarget('对另一名目标角色造成1点法术伤害③', true, function (card, player, targetx) {
                            return targetx != _status.event.originalTarget;
                        }).set('originalTarget', target);
                    } else {
                        event.finish();
                    }
                    'step 2'
                    result.targets[0].faShuDamage(1, player);
                },
            },

            shenShengLianJie: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    await player.chooseToDiscard(2,true,'h');
                    var choiceList=["目标角色和你各+1点[治疗]","对目标角色和你各造成1点法术伤害③"];
                    var list=['选项一','选项二'];
                    var control=await player.chooseControl(list).set('prompt','神圣链接').set('choiceList',choiceList).forResultControl();
                    'step 2'
                    if(control=='选项一'){
                        var targets=await player.chooseTarget('目标角色+1[治疗]',true,function(card,player,target){
                            return true;
                        }).forResultTargets();
                        var target=targets[0];
                        await target.changeZhiLiao(1,player);
                        await player.changeZhiLiao(1);
                    }else if(control=='选项二'){
                        var targets=await player.chooseTarget('对目标角色造成1点伤害',true,function(card,player,target){
                            return true;
                        }).forResultTargets();
                        var target=targets[0];
                        await target.faShuDamage(1,player);
                        await player.faShuDamage(1,player);
                    }
                },
            },

            tianFa: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.canBiShaBaoShi();
                },
                filterTarget: true,
                selectTarget: 1,
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    if (target.countCards('h') > 0) {
                        target.chooseToDiscard(target.countCards('h'), true);
                    }
                    'step 2'
                    player.addFaShu();
                },
            },

            //樱流武士
            juHe: {
                intro: {
                    content: 'mark',
                    max: 6,
                },
                onremove: 'storage',
                markimage: 'image/card/zhiShiWu/hong.png',
            },

            dongZhen: {
                type: 'qiDong',
                trigger: { player: 'qiDong' },
                filter: function (event, player) {
                    return true;
                },
                content: function () {
                    'step 0'
                    player.draw(1);
                    'step 1'
                    player.addZhiShiWu('juHe', 2);
                },
            },

            tuNa: {
                type: 'qiDong',
                trigger: {player: 'qiDong'},
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'feng') > 0;
                },
                async cost(event, trigger, player) {
					event.result = await player
						.chooseCard(1,function(card){
                            return get.xiBie(card)=='feng';
                        })
                        .set('prompt',get.prompt('tuNa'))
                        .set('prompt2',lib.translate.tuNa_info)
						.forResult();
				},
                content: function () {
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                    'step 1'
                    player.addZhiShiWu('juHe', 1);
                },
            },

            zhanZhiXing: {
                trigger: { player: 'gongJiBefore' },
                filter: function (event, player) {
                    return player.countZhiShiWu('juHe') >= 3 && event.yingZhan!=true;;
                },
                content: function () {
                    'step 0'
                    player.removeZhiShiWu('juHe', 3);
                    trigger.wuFaYingZhan();
                    trigger.customArgs.zhanZhiXing=true;
                },
                group:"zhanZhiXing_weiMingZhong",
                subSkill:{
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        priority:0.1,
                        filter:function(event,player){
                            return event.customArgs.zhanZhiXing;
                        },
                        direct:true,
                        content:function(){
                            player.addZhiShiWu('juHe');
                        }
                    }
                }
            },

            yuZhiXing: {
                trigger: {player:'zaoChengShangHai'},
                priority: 2,
                filter: function (event, player) {
                    return event.faShu!=true && player.countZhiShiWu('juHe') >= 2;
                },
                
                content: function () {
                    'step 0'
                    player.removeZhiShiWu('juHe', 2);
                    player.storage.yuZhiXing=false;
                    'step 1'
                    trigger.num--
                    if (trigger.num == 0) player.addZhiShiWu('juHe');
                    trigger.set('yuZhiXing',true);
                },
                group:['yuZhiXing_shiQiXiaJiang', 'yuZhiXing_xiaoGuo', 'yuZhiXing_zhiLiao'],
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{global:'changeShiQiAfter'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('damage').yuZhiXing==true&&event.num<0;
                        },
                        content:function(){
                            player.storage.yuZhiXing=true;
                        }
                    },

                    xiaoGuo:{
                        trigger:{player:'chengShouShangHaiAfter'},
                        direct:true,
                        filter:function(event,player){
                            return event.yuZhiXing == true && !player.storage.yuZhiXing;
                        },
                        content:function(){
                            player.addZhiShiWu('juHe');
                        }
                    },

                    zhiLiao:{
                        trigger:{player:'changeZhiLiaoAfter'},
                        direct:true,
                        filter:function(event,player){
                            return event.num<0 && event.type=='damage' && event.getParent('damage').yuZhiXing==true && event.getParent('damage').num == 0;
                        },
                        content:function(){
                            player.addZhiShiWu('juHe');
                        }
                    },
                },
            },

            yingLiuZhan: {
                trigger: { player: 'gongJiBefore' },
                filter: function (event, player) {
                    return player.countZhiShiWu('juHe') >= 2 && event.yingZhan != true && event.targets[0].jiChuXiaoGuoList && event.targets[0].jiChuXiaoGuoList().length > 0;
                },
                content: function () {
                    'step 0'
                    player.removeZhiShiWu('juHe', 2);
                    trigger.qiangZhiMingZhong();
                    trigger.changeDamageNum(-1);
                    trigger.customArgs.yingLiuZhan = true;
                },
                group: 'yingLiuZhan_limit',
                subSkill: {
                    limit: {
                        trigger: {source:'gongJiMingZhong'},
                        direct: true,
                        filter: function (event, player) {
                            return event.customArgs.yingLiuZhan==true && event.damageNum > 3;
                        },
                        content: function () {
                            trigger.damageNum = 3;
                        },
                    },
                },
            },

            jiZhiXing: {
                trigger: { source: 'gongJiMingZhong' },
                filter: function (event, player) {
                    return event.yingZhan != true && player.countZhiShiWu('juHe') >= 3 && player.canBiShaShuiJing();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.removeZhiShiWu('juHe', 3);
                    'step 1'
                    trigger.changeDamageNum(2);
                    trigger.customArgs.jiZhiXing = true;
                },
            },

            yiShan: {
                trigger: { source: 'gongJiMingZhong' },
                filter: function (event, player) {
                    return (event.customArgs.jiZhiXing == true || event.customArgs.zhanZhiXing == true || event.customArgs.yingLiuZhan == true)
                    && player.countCards('h') > 0 && player.canBiShaShuiJing() && event.yingZhan != true;
                },
                async cost(event, trigger, player) {
                    event.result = await player
                        .chooseCard([2, Infinity], function (card) {
                            return get.type(card) == 'faShu';
                        })
                        .set('prompt', get.prompt('yiShan'))
                        .set('prompt2', lib.translate.yiShan_info)
                        .forResult();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.discard(event.cards).set('showCards', true);
                    'step 2'
                    trigger.changeDamageNum(event.cards.length - 1);
                },
            },

            //旅行商人

            jingShangZhiDao: {
                trigger: {global:'gameStart'},
                forced: true,
                content: function () {
                    player.storage.jingShangZhiDao_use = true;
                    player.storage.jingShangZhiDao_locked = true;
                    game.removeGlobalSkill('_gouMai');
                    game.addGlobalSkill('shangRen_gouMai');
                },
                group: ['jingShangZhiDao_unlock'],
                subSkill: {
                    unlock: {
                        trigger: { player: ['gongJiAfter', 'faShuAfter'] },
                        forced: true,
                        filter: function (event, player) {
                            return event.yingZhan!=true && player.storage.jingShangZhiDao_locked;
                        },
                        content: function () {
                            player.storage.jingShangZhiDao_locked = false;
                        }
                    },
                }
            },

            shangRen_gouMai:{
                enable:'xingDong',
                type:'teShu',
                filter:function(event,player){
                    if(player.storage.jingShangZhiDao_locked == true) return false;
                    if(player.storage.jingShangZhiDao_use == true){
                        return player.countEmptyCards()>=2;
                    }else return player.countEmptyCards()>=3;
                },
                content:async function(event,trigger,player){
                    game.broadcastAll(function(){
                        if(lib.config.background_audio){
                            game.playAudio('skill','_gouMai');
                        }
                    });
                    await event.trigger('gouMai');

                    if(player.storage.jingShangZhiDao_use == true){
                        await player.draw(2).set('cause','teShuXingDong');
                    }else await player.draw(3).set('cause','teShuXingDong');
                    
                    var num=0;
                    var emptyZhanJi=get.emptyZhanJi(player.side);
                    if(emptyZhanJi>=2){
                        num=2;
                    }else if(emptyZhanJi>=1){
                        num=1;
                    }

                    if(num==0){
                        await player.addZhanJi('baoShi',1);
                    }else if(num==2){
                        if (player.storage.jingShangZhiDao_use == true) {
                            await player.addZhanJi('baoShi',2);
                        }else{
                            await player.addZhanJi('baoShi',1);
                            await player.addZhanJi('shuiJing',1);
                        }
                    }else if(num==1){
                        if (player.storage.jingShangZhiDao_use == true) {
                            await player.addZhanJi('baoShi',1);
                        }else{
                            var list = ['baoShi', 'shuiJing'];
                            let control = await player.chooseControl(list).set('prompt', '选择获得的星石').set('ai', function () { return 0; }).forResultControl();
                            if (control == 'baoShi') {
                                await player.addZhanJi('baoShi', 1).set('yiChu', true);
                            } else if (control == 'shuiJing') {
                                await player.addZhanJi('shuiJing', 1).set('yiChu', true);
                            }
                        }
                        
                    }        
                },
                ai:{
                    order:function(item,player){
                        var num=3;
                        num+=(0.15*get.emptyZhanJi(player.side));
                        return num;
                    },
                    result:{
                        player:function(player){
                            if(get.emptyZhanJi(player.side)<2) return 0;
                            if(player.countCards('h')==0) return 1;
                            var num=0.1;
                            num+=(0.2*(player.countEmptyCards()));
                            var numx=Math.random();
                            if(numx<=num) return 1;
                            else return 0;
                        },
                    },
                }
            },

            diXiaFaZe1:{
                trigger:{player:'gouMai'},
                forced:true,
                content:function(){
                }
            },

            liuZhiDaJi: {
                trigger:{player:'zaoChengShangHai'},
                usable: 1,
                filter: function (event, player) {
                    return player.countCards('h') == player.getHandcardLimit();
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',2,card=>get.xuanZeTongXiPai(card))
                        .set('complexCard',true)
                        .set('prompt',get.prompt('liuZhiDaJi'))
                        .set('prompt2',lib.translate.liuZhiDaJi_info)
                        .forResult();
                },
                content: function () {
                    player.discard(event.cards).set('showCards', true);
                },
            },


            jinNangMiaoJi: {
                type: 'faShu',
                enable: ['faShu'],
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                filter: function (event, player) {
                    return player.countCards('h', card => get.type(card) == 'faShu') >= 2;
                },
                content:async function(event, trigger, player) {

                    var choiceList=['对目标角色造成2点法术伤害③，你摸1张牌','将我方战绩区[水晶]全部替换成[宝石]，你+1[水晶]'];
                    var choices=['选项一','选项二'];
                    var control = await player.chooseControl(choices).set('prompt','锦囊妙计：选择一项').set('choiceList',choiceList).forResult('control');;

                    if (control=='选项一') {
                        var targets= await player.chooseTarget(1, "对1名角色造成2点法术伤害③", true).forResult('targets');
                        await targets[0].faShuDamage(2, player);
                        player.draw(1);
                    }else if(control=='选项二'){
                        var zhanJi=get.zhanJi(player.side).slice();
                        var num = 0;
                        for (var xingShi of zhanJi) {
                            if (xingShi == 'shuiJing') num++;
                        }
                        if (num > 0) {
                            await player.changeZhanJi('shuiJing', -num);
                            await player.changeZhanJi('baoShi', num);
                        }
                        player.addNengLiang('shuiJing');
                    }
                },
            },

            qianKeWanLai:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var zhanJi = get.zhanJi(player.side).slice();
                    var num = 0;
                    for (var xingShi of zhanJi) {
                        if (xingShi == 'baoShi') num++;
                    }
                    return num >= 2 && player.canBiShaShuiJing();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('千客万来','hidden');
                        var list=[['ti','将2[宝石]分配给最多2名我方角色，你弃1张牌'],['he','<span class="tiaoJian">(对自己造成4点法术伤害③)</span>我方【星杯区】+1【星杯】，我方士气+1。']]
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='ti'){
                            return true
                        }
                        if(link=='he'){
                            return true;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='ti'){
                            var next=get.copy(lib.skill['qianKeWanLai_ti']);
                        }else if(links[0]=='he'){
                            var next=get.copy(lib.skill['qianKeWanLai_he']);
                        }
						return next;
					},
                },
                subSkill:{
                    ti:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            player.removeZhanJi('baoShi',2);
                            'step 1'
                            player.chooseTarget([1, 2], `任意分配2[宝石]给1~2位我方角色`, true, function (card, player, target) {
                                return target.side == player.side;
                            });
                            'step 2'
                            if (result.targets.length == 1) {
                                result.targets[0].addNengLiang('baoShi', 2);
                            } else {
                                result.targets[0].addNengLiang('baoShi', 1);
                                result.targets[1].addNengLiang('baoShi', 1);
                            }
                            'step 3'
                            player.chooseToDiscard('h',true);
                        }
                    },
                    he:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            player.removeZhanJi('baoShi',2);
                            'step 1'
                            player.faShuDamage(4,player);
                            'step 2'
                            player.changeXingBei(1);
                            player.changeShiQi(1);
                        }
                    }
                },

            },

            //荒漠女巫

            shaChen: {
                intro: {
                    content: 'mark',
                    max: 5,
                },
                onremove: 'storage',
                markimage: 'image/card/zhiShiWu/hong.png',
            },

            huangShaJueYing: {
                trigger: {player:'zaoChengShangHai'},
                filter: function (event, player) {
                    return player.countCards('h')>0;
                },
                async cost(event, trigger, player) {
                    event.result = await trigger.player
                        .chooseCard('h', [1, Infinity], function (card) {
                            return get.xiBie(card) == 'di';
                        })
                        .set('prompt', get.prompt('huangShaJueYing'))
                        .set('prompt2', lib.translate.huangShaJueYing_info)
                        .forResult();
                },
                logTarget: 'player',
                content: function () {
                    player.discard(event.cards).set('showCards', true);
                },
            },


            fengHua: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'shui') > 0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                discard:true,
                showCards:true,
                content: function () {
                    'step 0'
                    var cards = get.cards(5);
                    event.cards = cards;
                    player.showCards(cards);
                    'step 1'
                    var gain = [];
                    for (var card of event.cards) {
                        if (get.xiBie(card) == 'di' || get.type(card) == 'faShu') {
                            gain.push(card);
                        }
                    }
                    if (gain.length > 0) {
                        player.gain(gain, 'gain2');
                        player.addZhiShiWu('shaChen', gain.length);
                    }
                    
                },
            },


            zhanShaShu: {
                type: 'qiDong',
                trigger: { player: 'qiDong' },
                filter: function (event, player) {
                    return player.countCards('h') > 0;
                },
                async cost(event, trigger, player) {
                    event.result = await player
                        .chooseCard('h', 1, function (card) {
                            return get.type(card) == 'faShu';
                        })
                        .set('prompt', get.prompt('zhanShaShu'))
                        .set('prompt2', lib.translate.zhanShaShu_info)
                        .forResult();
                },
                content: function () {
                    'step 0'
                    player.discard(event.cards).set('showCards', true);
                    'step 1'
                    player.addZhiShiWu('shaChen');
                },
            },

            shaChenBao: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.countZhiShiWu('shaChen') >= 3;
                },
                filterTarget: true,
                selectTarget: 1,
                content: function () {
                    'step 0'
                    player.removeZhiShiWu('shaChen', 3);
                    'step 1'
                    target.faShuDamage(2, player);
                },
            },

            shiKongShaLou:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing() && !player.storage.shiKongShaLou;
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.addSkill('shiKongShaLouX');
                    player.storage.shiKongShaLou=true;
                    target.storage.shiKongShaLouPlayer=player;
                    'step 2'
                    target.addZhiShiWu('shiKongShaLouX');
                },
            },

            shiKongShaLouX:{
                intro: {
                    content: "<span class='tiaoJian'>(你的回合结束时，强制移除此牌触发⑤)</span>你摸X张牌，X等同于你在本回合行动阶段自手牌中打出与弃置的手牌总数。",
                    nocount: true,
                },
                onremove: 'storage',
                markimage: '/extension/tom扩/shiKongShaLou.jpg',
                group: ['shiKongShaLouX_start', 'shiKongShaLouX_count', 'shiKongShaLouX_end'],
                subSkill: {
                    start: {
                        direct:true,
                        trigger:{player:'xingDongBegin'},
                        priority:5,
                        filter: function (event, player) {
                            return player.hasZhiShiWu('shiKongShaLouX');
                        },
                        content: function () {
                            if (!player.storage.shiKongShaLou_num) player.storage.shiKongShaLou_num = 1;
                        },
                    },

                    count: {
                        trigger: {player: ["daChuPai","discard"]},
                        direct:true,
                        filter: function (event, player) {
                            if (!player.hasZhiShiWu('shiKongShaLouX')) return false;
                            if (!player.storage.shiKongShaLou_num) return false;
                            for (var card of event.cards) {
                                if (!(card.original == "h")) return false;
                            }
                            return event.cards && event.cards.length > 0;
                        },
                        content: function () {
                            player.storage.shiKongShaLou_num += trigger.cards.length;
                        },
                    },
                    end: {
                        trigger: {player: 'phaseEnd'},
                        forced:true,
                        filter: function (event, player) {
                            return player.hasZhiShiWu('shiKongShaLouX');
                        },
                        content: function () {
                            'step 0'
                            var num = player.storage.shiKongShaLou_num-1 || 0;
                            if (num > 0) player.draw(num);
                            
                            'step 1'
                            delete player.storage.shiKongShaLou_num;
                            delete player.storage.shiKongShaLouPlayer.storage.shiKongShaLou;
                            delete player.storage.shiKongShaLouPlayer
                            'step 2'
                            player.removeZhiShiWu('shiKongShaLouX');
                            player.removeSkill('shiKongShaLouX');
                        },
                    },
                },
            },
        
            liuShaXianJing: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaShuiJing();

                    var choiceList = ["目标角色和你各弃2张牌，你+2<span class='hong'>【沙尘】</span>。", "<span class='tiaoJian'>(移除X<span class='hong'>【沙尘】</span>)</span>将X点法术伤害任意分配给至少2名目标角色③<span class='tiaoJian'>(X>2)</span>，每次伤害最高为2。"];
                    var list = ['选项一'];
                    if (player.countZhiShiWu('shaChen') > 2) {
                        list.push('选项二');
                    }
                    var control = await player.chooseControl(list).set('prompt', '流沙陷阱').set('choiceList', choiceList).forResultControl();
                    'step 2'
                    if (control == '选项一') {
                        var targets = await player.chooseTarget('目标角色弃2张牌', true).forResultTargets();
                        var target = targets[0];
                        await target.chooseToDiscard(2, true, 'h');
                        await player.chooseToDiscard(2, true, 'h');
                        await player.addZhiShiWu('shaChen',2);
                    } else if (control == '选项二') {
                        let max = player.countZhiShiWu('shaChen');

                        let choice = await player.chooseControl(
                            Array.from({length:max-2},(_,i)=>String(i+3))
                        ).set('prompt', '选择移除多少【沙尘】')
                            .set('max', max)
                            .forResultControl();

                        let num = Number(choice);
                        await player.removeZhiShiWu('shaChen', num);

                        // 每名角色最多2点，所以至少需要 ceil(num/2) 人；同时至少2人
                        let minTarget = Math.max(2, Math.ceil(num / 2));

                        // 至多为消耗沙尘数、本局人数、5 三者较小值
                        let maxTarget = Math.min(num, game.players.length, 5);

                        if (minTarget > maxTarget) return;

                        let targets = await player.chooseTarget(
                            [minTarget, maxTarget],
                            `将${num}点法术伤害分配给${minTarget}至${maxTarget}名目标角色`,
                            true
                        ).set('ai', function (target) {
                            var player = _status.event.player;
                            return get.damageEffect2(target, player, 1);
                        }).forResultTargets();

                        // 从当前角色逆时针第一名被选角色开始结算
                        targets.sortBySeat(player);

                        let remain = num;

                        while (targets.length && remain > 0) {
                            // 剩余伤害刚好等于剩余人数×2：剩下每人2点
                            if (remain == targets.length * 2) {
                                for (let target of targets) {
                                    await target.faShuDamage(2, player);
                                }
                                break;
                            }

                            // 剩余伤害刚好等于剩余人数：剩下每人1点
                            if (remain == targets.length) {
                                for (let target of targets) {
                                    await target.faShuDamage(1, player);
                                }
                                break;
                            }

                            // 只剩1名角色：自动给剩余伤害
                            if (targets.length == 1) {
                                await targets[0].faShuDamage(remain, player);
                                break;
                            }

                            let target = targets.shift();

                            // 这里要保证后续每人至少1点、至多2点
                            let remainTarget = targets.length;
                            let minDamage = Math.max(1, remain - remainTarget * 2);
                            let maxDamage = Math.min(2, remain - remainTarget);

                            let list = [];
                            for (let i = minDamage; i <= maxDamage; i++) {
                                list.push(String(i));
                            }

                            let damageChoice = await player.chooseControl(list)
                                .set('prompt', '分配给' + get.translation(target) + '几点伤害？')
                                .set('ai', function () {
                                    return _status.event.list.includes('2') ? '2' : '1';
                                })
                                .set('list', list)
                                .forResultControl();

                            let damage = Number(damageChoice);
                            remain -= damage;

                            await target.faShuDamage(damage, player);
                        }
                    }
                },
            },

            //首刃军
            shanMengXueShi: {
                trigger: { global: 'gameStart' },
                forced: true,
                content: async function (event, trigger, player) {
                    let target = await player.chooseTarget('选择1名队友成为【盟友】', true, function (card, player, target) {
                        return target.side == player.side && target != player;
                    }).forResultTargets();

                    player.storage.mengYou = target[0]

                    // 放置专属牌
                    await target[0].addSkill('shaXueZhiShiX');
                    await target[0].addZhiShiWu('shaXueZhiShiX');

                    target[0].storage.mengYouFrom = player;
                },
                group: 'shanMengXueShi_shiQi',
                subSkill: {
                    shiQi: {
                        trigger: { global: 'changeShiQiAfter' },
                        forced: true,
                        filter: function (event, player) {
                            let ally = player.storage.mengYou;
                            if (!ally) return false;
                            if(event.cause!='damage') return false;
                            return (event.player == player || event.player == ally) && event.num < 0;
                        },
                        content: function () {
                            player.addZhiShiWu('xueChou');
                        }
                    }
                }
            },

            shaXueZhiShi:{},

            shaXueZhiShiX: {
                intro: {
                    name: '[响应]歃血之誓[回合限定]',
                    content: '<span class="tiaoJian">(当你承受任何伤害时发动③)</span>本次伤害-1③，并对首刃军造成1点法术伤害③。',
                    nocount: true,
                },
                onremove:'storage',
                markimage: '/extension/tom扩/shaXueZhiShi.jpg',
                trigger: {player:'zaoChengShangHai'},
                priority: 0,
                usable: 1,
                filter: function (event, player) {
                    let ally = player.storage.mengYouFrom;
                    if (!ally) return false;
                    if (!player.hasZhiShiWu('shaXueZhiShiX')) return false;
                    return true;
                },
                content: function () {
                    'step 0'
                    trigger.changeDamageNum(-1);
                    'step 1'
                    let source = player.storage.mengYouFrom;
                    if (source) source.faShuDamage(1, source);
                }
            },

            xingHongDaJi:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return event.yingZhan!=true && !event.customArgs.yiYanHuanYan;
                },
                content:function(){
                    'step 0'
                    player.faShuDamage(2, player);
                    'step 1'
                    trigger.changeDamageNum(2);
                    trigger.customArgs.xingHongDaJi=true;
                },
            },

            yiYanHuanYan:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return player.countZhiShiWu('xueChou')>0 && event.yingZhan!=true && !event.customArgs.xingHongDaJi;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('xueChou',1);
                    'step 1'
                    trigger.changeDamageNum(2);
                    trigger.customArgs.yiYanHuanYan=true;
                },
            },

            luLiTongXin:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return player.countZhiShiWu('xueChou')>1 && event.yingZhan!=true;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('xueChou',2);
                    'step 1'
                    trigger.wuFaYingZhan();
                    trigger.customArgs.luLiTongXin=true;
                },
                group:"luLiTongXin_MingZhong",
                subSkill:{
                    MingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        priority:0.1,
                        filter:function(event,player){
                            return event.customArgs.luLiTongXin && player.storage.mengYou;
                        },
                        direct:true,
                        content:function(){
                            'step 0'
                            player.draw(1);
                            'step 1'
                            player.storage.mengYou.draw(1);
                        }
                    }
                }
            },

            fanJiZiTai: {
                type: 'faShu',
                enable: ['faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaShuiJing();

                    let ally = player.storage.mengYou;
                    if (!ally) return;

                    // ===== 处理 a =====
                    let selfLimit = player.getHandcardLimit();
                    let a;

                    if (selfLimit <= 3) {
                        a = selfLimit; // 不询问，直接取上限
                    } else {
                        let selfChoices = [];
                        for (let i = 3; i <= selfLimit; i++) {
                            selfChoices.push(String(i));
                        }

                        let aChoice = await player.chooseControl(selfChoices)
                            .set('prompt', '选择你的手牌调整数量a')
                            .set('ai', function () {
                                return selfChoices[Math.floor(selfChoices.length / 2)];
                            })
                            .forResultControl();

                        a = Number(aChoice);
                    }

                    // ===== 处理 b =====
                    let allyLimit = ally.getHandcardLimit();
                    let b;

                    if (allyLimit <= 3) {
                        b = allyLimit; // 不询问
                    } else {
                        let allyChoices = [];
                        for (let i = 3; i <= allyLimit; i++) {
                            allyChoices.push(String(i));
                        }

                        let bChoice = await player.chooseControl(allyChoices)
                            .set('prompt', '选择盟友的手牌调整数量b')
                            .set('ai', function () {
                                return allyChoices[Math.floor(allyChoices.length / 2)];
                            })
                            .forResultControl();

                        b = Number(bChoice);
                    }

                    // ===== 调整手牌 =====
                    await player.tiaoZhengShouPai(a);
                    await ally.tiaoZhengShouPai(b);

                    // ===== 条件效果 =====
                    if (a + b > 8) {
                        await player.addZhiShiWu('xueChou');
                        player.addGongJi();
                    }
                },
            },

            xueChou: {
                intro: {
                    content: 'mark',
                    max: 4,
                },
                markimage: 'image/card/zhiShiWu/hong.png',
                onremove: 'storage',
            },

            //高洁骑士
            shengJieZhiDao: {
                mod: {
                    maxZhiLiao: function (player, num) {
                        return num + 2;
                    },
                },
                trigger:{player:'zhiLiao'},
                filter:function(event,player){
                    return event.faShu;
                },
                forced:true,
                content:function(){
                    trigger.cancel();
                },
            },

            shenShengDaJi:{
                trigger:{source:['gongJiMingZhong','gongJiWeiMingZhong']},
                filter:function(event,player,name){
                    if(get.is.zhuDongGongJi(event)){
                        if(name=='gongJiMingZhong') return true;
                        else if(name=='gongJiWeiMingZhong'){
                            return get.mingGe(event.card)=='sheng';
                        }
                    }else return false;
                },
                content:async function(event, trigger, player){
                    await event.trigger('shenShengDaJi');
                    if(event.shengJianHengSao==true){
                        var choiceList = ["你弃2张牌，所有我方角色+1[治疗]", "<span class='tiaoJian'>(移除你的X[治疗])</span>对攻击目标以外的一名目标对手造成X点攻击伤害③<span class='tiaoJian'>(X&lt;4)</span>"];
                        var list = ['选项一'];
                        if (player.zhiLiao > 0) {
                            list.push('选项二');
                        }

                        var control = await player.chooseControl(list).set('prompt', '圣剑横扫').set('choiceList', choiceList).forResultControl();

                        if (control == '选项一') {
                            await player.chooseToDiscard(2,true);
                            for (var current of game.players) {
                                if (current.side == player.side) await current.changeZhiLiao(1);
                            }
                        } else if (control == '选项二') {
                            let max = Math.min(3, player.zhiLiao);
                            if (max <= 0) return;

                            let list = [];
                            for (let i = 1; i <= max; i++) list.push(String(i));

                            let choice = await player.chooseControl(list)
                                .set('prompt', '移除多少点[治疗]？')
                                .forResultControl();

                            let num = Number(choice);
                            await player.changeZhiLiao(-num);

                            let target = await player.chooseTarget('对攻击目标以外的一名目标对手造成攻击伤害', true, function (card, player, target) {
                                return target.side != player.side && target != _status.event.originalTarget;
                            }).set('originalTarget', trigger.target)
                                .set('ai', function (target) {
                                    var player = _status.event.player;
                                    return get.damageEffect(target, player, _status.event.num);
                                }).set('num', num)
                                .forResultTargets();

                            await target[0].damage(num, player);
                        }

                    }else{
                        var targets = await player.chooseTarget(1, '神圣打击：选择1名目标角色+1[治疗]', true).forResult('targets');
                        targets[0].changeZhiLiao(1, player);
                    }
                    
                }
            },

            shouHuJieJie: {
                trigger: {global:'shouDaoGongJiBefore'},
                filter: function (event, player) {
                    if (event.yingZhan==true) return false;
                    if (event.target.side != player.side) return false;
                    if (event.target == player) return false;
                    if (event.canYingZhan==false) return false
                    return player.zhiLiao >= 2;
                },
                content: function () {
                    'step 0'
                    player.changeZhiLiao(-2);
                    'step 1'
                    trigger.weiMingZhong();
                    'step 2'
                    player.chooseToDiscard(1,true)
                },
            },

            shenShengZhaoZhao: {
                type: 'faShu',
                enable: ['faShu'],
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                filter: function (event, player) {
                    return player.countCards('h', card => get.type(card) == 'faShu') >= 2;
                },
                content: function () {
                    'step 0'
                    player.changeZhiLiao(2, player);
                    'step 1'
                    player.draw(2);
                    'step 2'
                    player.addGongJi();
                },
            },

            shengJianHengSao: {
                trigger: {player: 'shenShengDaJi'},
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    trigger.shengJianHengSao=true;
                },
            },

            jianDingBuYi: {
                trigger: {player:'zaoChengShangHai'},
                filter: function (event, player) {
                    return player.canBiShaShuiJing() && event.faShu == true && event.num > 0;
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    let num = Math.min(3, trigger.num);
                    await player.changeZhiLiao(num, player);
                },
            },

            //龙剑士
            longPo: {
                intro: {
                    content: 'mark',
                    max: 2,
                },
                onremove: 'storage',
                markimage: 'image/card/zhiShiWu/hong.png',
            },

            longZhiKuangAo: {
                trigger: { source: 'gongJiMingZhong' },
                forced: true,
                filter: function (event, player) {
                    return !player.isHengZhi();
                },
                content: function () {
                    'step 0'
                    player.faShuDamage(1, player);
                    'step 1'
                    player.addZhiShiWu('longPo');
                },
            },

            cangLongLianZhan:{
                usable:1,
                trigger:{player:"gongJiAfter"},
                filter:function(event,player){
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        filterCard:function(card,player,event){
                            if(get.xiBie(card)!='shui'||get.type(card)!='gongJi') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        prompt:'苍龙连斩：水系[攻击行动]',
                    });
                },
            },

            kangMoLinJia: {
                trigger: {player:'zaoChengShangHai'},
                filter: function (event, player) {
                    return event.faShu == true && player.countZhiShiWu('longPo') > 0;
                },
                async cost(event, trigger, player) {
                    var choices=['选项一', '选项二', 'cancel2'];
                    var choiceList=['抵御1点法术伤害③',"对目标对手造成1点法术伤害③"];
                    var result=await player.chooseControl(choices).set('prompt',"抗魔鳞甲：选择以下一项发动").set('choiceList',choiceList)
                    .forResult();
                    event.result = {
                        bool: result.control!='cancel2',
                        cost_data: result.control,
                    };
                },
                content:async function(event, trigger, player) {
                    await player.removeZhiShiWu('longPo');

                    if(event.cost_data=='选项一'){
                        trigger.changeDamageNum(-1);
                    }else if(event.cost_data=="选项二"){
                        var targets=await player.chooseTarget(1,'抗魔鳞甲：对目标对手造成1点法术伤害③',function(card,player,target){
                            return target.side!=player.side;
                        }).forResult('targets');
                        targets[0].faShuDamage(1,player);
                    }
                },
            },

            linLongSuJi: {
                trigger: {player: 'gongJiBefore'},
                filter: function (event, player) {
                    return event.yingZhan!=true && player.countZhiShiWu('longPo') >= 2 && event.targets[0].hasJiChuXiaoGuo();;
                },
                content: function () {
                    'step 0'
                    player.removeZhiShiWu('longPo', 2);
                    'step 1'
                    player.removeJiChuXiaoGuo(trigger.targets[0])
                    'step 2'
                    trigger.wuFaYingZhan();
                    trigger.customArgs.linLongSuJi = true;
                },
                group: 'linLongSuJi_miss',
                subSkill: {
                    miss: {
                        trigger: { source: 'gongJiWeiMingZhong' },
                        direct: true,
                        filter: function (event, player) {
                            return event.customArgs && event.customArgs.linLongSuJi;
                        },
                        content: function () {
                            player.addZhiShiWu('longPo');
                        },
                    },
                },
            },

            yuanGuZhiMing: {
                type: 'qiDong',
                trigger: { player: 'qiDong' },
                filter: function (event, player) {
                    return !player.isHengZhi() && player.canBiShaBaoShi();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi();
                    player.hengZhi();
                },

                group:['yuanGuZhiMing_zhuDong','yuanGuZhiMing_yingZhan','yuanGuZhiMing_jianShao'],
                subSkill:{
                    zhuDong:{
                        trigger:{player:'gongJiBefore'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan!=true;
                        },
                        priority:-1,
                        direct:true,
                        content:function(){
                            trigger.changeDamageNum(2);
                        }
                    },
                    yingZhan:{
                        trigger:{player:'gongJiBefore'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan==true;
                        },
                        priority:-1,
                        direct:true,
                        content:function(){
                            trigger.changeDamageNum(1);
                        }
                    },
                    jianShao:{
                        trigger:{player:'phaseEndBefore'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:async function(event, trigger, player){
                            if (player.countZhiShiWu('longPo') >= 1){
                                var list=['是','否'];
                                var control = await player.chooseControl(list).set('prompt',`是否移除1点<span class='hong'>【龙魄】</span>维持【狂暴形态】`).forResult('control');
                                if (control == '是'){
                                    player.removeZhiShiWu('longPo', 1);
                                }else{
                                    player.chongZhi();
                                }
                            }else{
                                player.chongZhi();
                            }
                        }
                    },
                },
                
            },


            longZhiChiShou: {
                type: 'qiDong',
                trigger: { player: 'qiDong' },
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.tiaoZhengShouPai(4);
                    'step 2'
                    player.addZhiShiWu('longPo',2,999);
                },
            },

            //龙术士
            longHun: {
                intro: {
                    content: 'mark',
                    max: 3,
                },
                onremove: 'storage',
                markimage: 'image/card/zhiShiWu/hong.png',
            },

            longZhiJiDian: {
                trigger: {source: 'zaoChengShangHai'},
                forced: true,
                filter: function (event, player) {
                    if(event.huanLongYu==true) return false;
                    return event.faShu == true && player.storage.longShuShi_faShuCount == 2;
                },
                content: function () {
                    player.addZhiShiWu('longHun');
                },
                group: ['longZhiJiDian_count', 'longZhiJiDian_chongZhi'],
                subSkill: {
                    count: {
                        trigger: {source: 'zaoChengShangHai'},
                        direct: true,
                        firstDo: true,
                        filter: function (event, player) {
                            if(event.huanLongYu==true) return false;
                            return event.faShu == true;
                        },
                        content: function () {
                            if (!player.storage.longShuShi_faShuCount) player.storage.longShuShi_faShuCount = 0;
                            player.storage.longShuShi_faShuCount++;
                        },
                    },

                    chongZhi:{
                        trigger:{global:'phaseBefore'},
                        direct:true,
                        priority:1,
                        content:function(){
                            player.storage.longShuShi_faShuCount=0;
                        }
                    },
                },
            },

            longZhiYiJi: {
                trigger: {source: 'gongJiMingZhong'},
                filter: function (event, player) {
                    return event.yingZhan!=true;
                },
                async cost(event, trigger, player) {
                    event.result = await player.chooseCard('h', 1, function (card) {
                        return get.xiBie(card) == get.xiBie(_status.event.card);
                    })
                        .set('card', trigger.card)
                        .set('prompt', get.prompt('longZhiYiJi'))
                        .set('prompt2', lib.translate.longZhiXiJi_info)
                        .set('ai', function (card) {
                            return 6 - get.value(card);
                        })
                        .forResult();
                },
                content: async function (event, trigger, player) {
                    await player.discard(event.cards).set('showCards', true);
                    let targets = await player.chooseTarget(2, true, '对2名目标角色造成1点法术伤害③', function (card, player, target) {
                        return true;
                    }).set('ai', function (target) {
                        var player = _status.event.player;
                        return get.damageEffect2(target, player, 1);
                    }).forResultTargets();
                    targets = targets.sortBySeat(player);
                    for (let target of targets) {
                        await target.faShuDamage(1, player);
                    }
                    trigger.weiMingZhong();
                },
            },

            aoShuChongJi: {
                type: 'faShu',
                enable: ['faShu'],
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                filter:function(event,player){
                    return player.countCards('h',card=>lib.skill.aoShuChongJi.filterCard(card))>=1;
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                content: async function (event, trigger, player) {
                    await event.target.faShuDamage(1, player);
                    await player.faShuDamage(1, player);
                },
            },

            huanLongYu: {
                type: 'faShu',
                enable: ['faShu'],
                filterTarget:true,
                selectTarget:3,
                filter: function (event, player) {
                    return player.countZhiShiWu('longHun') >= 2;
                },
                contentBefore:function(){
                    player.removeZhiShiWu('longHun', 2);
                },
                content: async function (event, trigger, player) {
                    target.faShuDamage(1, player).set('huanLongYu', true);
                },
            },

            yuanGuZhaoHuan: {
                type: 'qiDong',
                trigger: { player: 'qiDong' },
                filter: function (event, player) {
                    return !player.isHengZhi() && player.canBiShaBaoShi();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi();
                    player.hengZhi();
                },

                group:['yuanGuZhaoHuan_shangHai','yuanGuZhaoHuan_jianShao'],
                subSkill:{
                    shangHai:{
                        trigger:{source:"zaoChengShangHai"},
                        forced:true,
                        priority:0.5,
                        filter:function(event,player){
                            return event.faShu==true && player.isHengZhi();
                        },
                        content:function(){
                            trigger.changeDamageNum(1);
                        }
                    },
                    jianShao:{
                        trigger:{player:'phaseEndBefore'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:async function(event, trigger, player){
                            if (player.countZhiShiWu('longHun') >= 1){
                                var list=['是','否'];
                                var control = await player.chooseControl(list).set('prompt',`是否移除1点<span class='hong'>【龙魂】</span>维持【附魔形态】`).forResult('control');
                                if (control == '是'){
                                    player.removeZhiShiWu('longHun', 1);
                                }else{
                                    player.chongZhi();
                                }
                            }else{
                                player.chongZhi();
                            }
                        }
                    },
                },
            },

            longHunFuMo:{
                trigger:{player:['gongJiAfter','faShuAfter']},
                usable:1,
                filter:function(event,player,name){
                    if(!player.canBiShaShuiJing()) return false;
                    if(player.countZhiShiWu('longHun')<1) return false;
                    if(name=='gongJiAfter') return get.is.gongJiXingDong(event);
                    else return true;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.removeZhiShiWu('longHun', 1)
                    'step 1'
                    player.chooseToDiscard(1, true);
                    'step 2'
                    player.addFaShu();
                },
            },

            //龙骑士
            longXi: {
                intro: {
                    content: 'mark',
                    max: 3,
                },
                markimage: 'image/card/zhiShiWu/hong.png',
                onremove: 'storage',
            },

            longZhiWeiYi: {
                trigger: {global: 'chengShouShangHaiAfter'},
                forced: true,
                usable: 1,
                filter: function (event, player) {
                    return player.storage.longZhiWeiYi_self&&player.storage.longZhiWeiYi_enemy;
                },
                content: function () {
                    player.addZhiShiWu('longXi');
                },
                group: ['longZhiWeiYi_count', 'longZhiWeiYi_chongZhi'],
                subSkill: {
                    count: {
                        trigger: {global: 'chengShouShangHaiAfter'},
                        direct: true,
                        firstDo: true,
                        filter: function (event, player) {
                            if (!player.storage.longZhiWeiYi_self && event.player.side == player.side) return true;
                            if (!player.storage.longZhiWeiYi_enemy && event.player.side != player.side) return true;
                            return false;
                        },
                        content: function () {
                            if (trigger.player.side == player.side) player.storage.longZhiWeiYi_self = true;
                            if (trigger.player.side != player.side) player.storage.longZhiWeiYi_enemy = true;
                        },
                    },
                    chongZhi:{
                        trigger:{global:'phaseBefore'},
                        direct:true,
                        priority:1,
                        content:function(){
                            player.storage.longZhiWeiYi_self=false;
                            player.storage.longZhiWeiYi_enemy=false;
                        }
                    },
                },
            },

            nuHuoLiaoYuan: {
                trigger: { source: 'gongJiWeiMingZhong' },
                filter: function (event, player) {
                    if(event.yingZhan==true) return false;
                    return player.countCards('h')>0;
                },
                async cost(event, trigger, player) {
                    event.result = await player.chooseCard(1, function (card) {
                        return get.xiBie(card) == 'huo';
                    })
                        .set('prompt', get.prompt('nuHuoLiaoYuan'))
                        .set('prompt2', lib.translate.nuHuoLiaoYuan_info)
                        .forResult();
                },
                content: async function (event, trigger, player) {
                    await player.discard(event.cards).set('showCards', true);

                    await trigger.player.faShuDamage(2,player);
                    await player.faShuDamage(2, player);
                },
            },

            longNuGuanTian: {
                trigger: { player: 'gongJiBefore' },
                filter: function (event, player) {
                    return event.yingZhan!=true && player.countZhiShiWu('longXi') >= 2;
                },
                content: function () {
                    player.removeZhiShiWu('longXi', 2);
                    trigger.changeDamageNum(2);
                    trigger.customArgs.longYanFenTian = true;
                },
                group: 'longNuGuanTian_miss',
                subSkill: {
                    miss: {
                        trigger: {source:'gongJiWeiMingZhong'},
                        direct: true,
                        priority:2,
                        filter: function (event, player) {
                            return event.customArgs && event.customArgs.longYanFenTian;
                        },
                        content: function () {
                            player.addZhiShiWu('longXi');
                        }
                    }
                }
            },

            jiaoLongDan: {
                type: 'faShu',
                enable: ['faShu'],
                filterCard:function(card){
                    return get.xiBie(card) == 'shui';
                },
                selectTarget:1,
                filterTarget:true,
                discard:true,
                showCards:true,
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'shui') > 0 &&
                        player.countZhiShiWu('longXi') > 0;
                },
                content: async function (event, trigger, player) {
                    var list = [];
                    var max = player.countZhiShiWu('longXi');

                    for (var i = 1; i <= max; i++) {
                        list.push(String(i));
                    }

                    var result = await player.chooseControl(list)
                        .set('prompt', '选择移除几点【龙息】')
                        .set('ai', function () {
                            return _status.event.list[_status.event.list.length - 1];
                        })
                        .set('list', list)
                        .forResultControl();

                    var num = Number(result);

                    await player.removeZhiShiWu('longXi', num);
                    await event.target.faShuDamage(num, player);
                },
            },

            yuanGuXianJi: {
                type: 'qiDong',
                trigger: { player: 'qiDong' },
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                async cost(event, trigger, player) {
                    var choices=['选项一', '选项二'];
                    choices.push('cancel2');
                    var choiceList=['+1<span class="hong">【龙息】</span>，并弃1张牌','将手牌调整到上限，+2<span class="hong">【龙息】</span>，【战绩区】+1[宝石]'];
                    var result=await player.chooseControl(choices)
                    .set('prompt',"远古献祭：选择以下一项发动").set('choiceList',choiceList).forResult();
                    event.result = {
                        bool: result.control!='cancel2',
                        cost_data: result.control,
                    };

                },
                content: async function (event, trigger, player) {
                    player.removeBiShaShuiJing();
                    if (event.cost_data=='选项一') {
                        await player.addZhiShiWu('longXi');
                        await player.chooseToDiscard(1,true);
                    }else if(event.cost_data=="选项二"){
                        await player.tiaoZhengShouPai(player.getHandcardLimit());
                        await player.addZhiShiWu('longXi', 2);
                        player.addZhanJi('baoShi',1);
                    }
                }
            },

            longZhiBaoLie: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.canBiShaBaoShi();
                },
                selectTarget: 2,
                filterTarget: function (card, player, target) {
                    if (!ui.selected.targets.length) return true;
                    var targetx = ui.selected.targets[0];
                    return target == targetx.getNext() || target == targetx.getPrevious();
                },
                contentBefore: function () {
                    player.removeBiShaBaoShi();
                },
                content: function () {
                    target.faShuDamage(2, player);
                },
                contentAfter: function () {
                    'step 0'
                    // 是否额外移除龙息
                    if (player.countZhiShiWu('longXi') >= 3) {
                        player.chooseBool('是否移除3点【龙息】，对其中1名目标对手额外造成1点法术伤害？')
                            .set('ai', function () {
                                return true;
                            });
                    } else {
                        event.finish();
                    }

                    'step 1'
                    if (!result.bool) {
                        event.finish();
                        return;
                    }

                    player.removeZhiShiWu('longXi', 3);

                    player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });

                    'step 2'
                    result.targets[0].faShuDamage(1, player);
                },
            },


            //双面女郎
            anYing: {
                intro: {
                    content: 'mark',
                    max: 2,
                },
                onremove: 'storage',
                markimage: 'image/card/zhiShiWu/hong.png',
            },

            changAnZhiYing: {
                trigger: {player:'phaseEndBefore'},
                forced: true,
                filter: function (event, player) {
                    return player.storage.changYingZhiYing_used == true;
                },
                content: function () {
                    player.addZhiShiWu('anYing');
                },
                group: ['changAnZhiYing_record', 'changAnZhiYing_add', 'changAnZhiYing_damage', 'changAnZhiYing_chongZhi'],
                subSkill: {
                    record: {
                        trigger: { player: ['gongJiAfter', 'faShuAfter', 'teShuAfter'] },
                        direct: true,
                        priority: 5,
                        filter: function (event, player) {
                            if(get.is.xingDong(event)) return true;
                        },
                        content: function () {
                            if (trigger.firstAction==true){
                                player.storage.changYingZhiYing_used = true;
                            } else {
                                player.storage.changYingZhiYing_used = false;
                            }
                        },
                    },
                    add: {
                        trigger: {player:'changeZhiShiWuEnd'},
                        direct: true,
                        filter: function (event, player) {
                            return event.zhiShiWu=='anYing'&&event.num>0;
                        },
                        content: function () {
                            player.storage.changYingZhiYing_add = true;
                        },
                    },
                    damage: {
                        trigger:{player:'phaseEnd'},
                        forced: true,
                        filter: function (event, player) {
                            return player.storage.changYingZhiYing_add == true && player.countZhiShiWu('anYing') > 0;
                        },
                        content: function () {
                            player.faShuDamage(player.countZhiShiWu('anYing'),player).set('shiQiXiaJiang',false);
                        },
                    },
                    chongZhi:{
                        trigger:{player:'phaseBefore'},
                        direct:true,
                        priority:1,
                        content:function(){
                            player.storage.changYingZhiYing_add=false;
                            player.storage.changYingZhiYing_used=false;
                        }
                    },
                },
            },

            dianMoZhan: {
                trigger: {player:'gongJiAfter'},
                filter: function (event, player) {
                    var evt=_status.event.getParent('xingDong');
                    if(evt.skipped==true) return false;
                    return event.yingZhan!=true &&
                        (get.xiBie(event.card) == 'lei' || get.mingGe(event.card) == 'huan') &&
                        player.countZhiShiWu('anYing') > 0;
                },
                content: function () {
                    'step 0'
                    player.removeZhiShiWu('anYing');
                    'step 1'
                    player.addFaShu();
                },
            },

            huanLeiJue: {
                trigger: {player:'faShuAfter'},
                filter: function (event, player) {
                    var evt=_status.event.getParent('xingDong');
                    if(evt.skipped==true) return false;
                    return (get.xiBie(event.card) == 'lei' || get.mingGe(event.card) == 'huan') &&
                    player.countZhiShiWu('anYing') > 0;
                },
                content: function () {
                    'step 0'
                    player.removeZhiShiWu('anYing');
                    'step 1'
                    player.addGongJi();
                },
            },

            fengMoShi: {
                trigger: {player: ['gongJiAfter', 'faShuAfter']},
                usable: 1,
                filter: function (event, player, name) {
                    var evt=_status.event.getParent('xingDong');
                    if(evt.skipped==true) return false;
                    if (!get.xiBie(event.card) ) return false;
                    if(name=='gongJiAfter') return get.is.gongJiXingDong(event);
                    return true;
                },
                content: function () {
                    'step 0'
                    if (player.isHengZhi()) player.chongZhi();
                    if (!player.isHengZhi()) player.hengZhi();
                    'step 1'
                    player.addZhiShiWu('anYing');
                    'step 2'
                    var xiBie = get.xiBie(trigger.card);
                    const name = get.translation(xiBie);
                    player.storage.extraXingDong.push({
                        xingDong: "gongJiOrFaShu",
                        xiBie: xiBie,
                        filterCard: function (card, player, event) {
                            if (get.xiBie(card) != this.xiBie) return false;
                            return lib.filter.cardEnabled(card, player, "forceEnable");
                        },
                        prompt: `【逢魔时】:${name}系[攻击行动]或[法术行动]`,
                    });
                },
            },

            niRiSiGangShan: {
                trigger: { source: 'gongJiMingZhong' },
                filter: function (event, player) {
                    return player.canBiShaShuiJing() && !player.isHengZhi() && event.yingZhan!=true && player.countZhiShiWu('anYing') > 0;
                },
                async cost(event, trigger, player) {
                    var list=[];
                    var max=player.countZhiShiWu('anYing');
                    for (var i = 1; i <= max; i++) {
                        list.push(i);
                    }
                    list.push('cancel2');
                    var result = await player.chooseControl(list)
                        .set('prompt', get.prompt('niRiSiGangShan'))
                        .set('list', list)
                        .forResultControl();

                    event.result={
                        bool:result!='cancel2',
                        cost_data:result,
                    }
                },
                content: function () {
                    'step 0'
                    event.num=event.cost_data;
                    player.removeBiShaShuiJing();
                    player.removeZhiShiWu('anYing', event.num);
                    'step 1'
                    trigger.changeDamageNum(event.num);
                    'step 2'
                    var evt=_status.event.getParent('xingDong');
                    if(evt&&evt.name=='xingDong'){
						evt.skipped=true;
					}
                },
            },

            anChaoLianYaTu: {
                trigger: { player: ['gongJiAfter', 'faShuAfter'] },
                filter: function (event, player, name) {
                    var num = player.storage.anChaoLianYaTu;
                    if (num == 0) return false;
                    if (name == 'gongJiAfter' && event.yingZhan == true) return false;
                    return player.canBiShaShuiJing() && player.isHengZhi();
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaShuiJing();

                    var num = player.storage.anChaoLianYaTu;

                    var targets = await player.chooseTarget(
                        true,
                        '对本回合未曾发动过主动攻击的目标对手造成' + num + '次1点法术伤害',
                        function (card, player, target) {
                            if (target.side == player.side) return false;
                            if (!player.storage.anChaoLianYaTu_targets) return true;
                            return !player.storage.anChaoLianYaTu_targets.includes(target);
                        }
                    ).set('ai', function (target) {
                        var player = _status.event.player;
                        return get.damageEffect2(target, player, 1);
                    }).forResultTargets();

                    if (targets) var target = targets[0];

                    for (var i = 0; i < num; i++) {
                        await target.faShuDamage(1, player);
                    }

                    await player.addZhiShiWu('anYing', num);

                    var evt=_status.event.getParent('xingDong');
                    if(evt&&evt.name=='xingDong'){
						evt.skipped=true;
					}
                },
                group: ['anChaoLianYaTu_jiShu', 'anChaoLianYaTu_chongZhi', 'anChaoLianYaTu_record', 'anChaoLianYaTu_clear'],
                subSkill: {
                    jiShu:{
                        priority:1,
                        trigger:{player:['gongJiEnd','faShuEnd']},
                        direct:true,
                        filter:function(event,player){
                            return get.is.xingDong(event) && event.firstAction!=true;
                        },
                        content:function(){
                            player.storage.anChaoLianYaTu++;
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseBefore'},
                        direct:true,
                        priority:-2,
                        content:function(){
                            player.storage.anChaoLianYaTu=0;
                        }
                    },
                    record: {
                        trigger: { player: 'gongJiBefore' },
                        direct: true,
                        filter: function (event, player) {
                            return get.is.zhuDongGongJi(event);
                        },
                        content: function () {
                            if (!player.storage.anChaoLianYaTu_targets) {
                                player.storage.anChaoLianYaTu_targets = [];
                            }
                            player.storage.anChaoLianYaTu_targets.add(trigger.target);
                        },
                        
                    },
                    clear: {
                        trigger: { player: 'phaseBefore' },
                        direct: true,
                        priority: -3,
                        content: function () {
                            delete player.storage.anChaoLianYaTu_targets;
                        },
                    },
                },
            },

            //琉璃女巫
            ruiGuang: {
                intro: {
                    content: 'mark',
                    max: 6,
                },
                onremove: 'storage',
                markimage: 'image/card/zhiShiWu/hong.png',
            },

            liuLiZhiXin: {
                mod: {
                    maxNengLiang: function (player, num) {
                        return num + 3;
                    },
                },
                trigger: { player: 'faShuEnd' },
                filter:function(event,player){
                    return event.skill!='qiYiGuangCai';
                },
                forced: true,
                content: function () {
                    player.addZhiShiWu('ruiGuang');
                },
            },

            jingGuangChongJi: {
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countTongXiPai()>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.xuanZeTongXiPai(card);
                },
                complexCard:true,
                discard:true,
                showCards:true,
                content: async function (event, trigger, player) {
                    if (player.countNengLiang('baoShi')>0){
                        await player.removeNengLiang('baoShi', 1);
                        await player.addNengLiang('shuiJing', 2);
                    }
                    
                    if (event.cards.some(card => get.type(card) == 'faShu')) {
                        let targets = await player.chooseTarget('对目标对手造成1点法术伤害③', true, function (card, player, target) {
                            return target.side != player.side;
                        }).set('ai', function (target) {
                            var player = _status.event.player;
                            return get.damageEffect2(target, player, 1);
                        }).forResultTargets();

                        await targets[0].faShuDamage(1, player);
                    }
                },
            },

            lingJingZhangBi:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    return player.countZhiShiWu('ruiGuang')>=3;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('ruiGuang', 3);
                    trigger.num--;
                },
            },

            qiYiGuangCai: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.countZhiShiWu('ruiGuang') >= 4;
                },
                filterTarget: function (card, player, target) {
                    return target.side != player.side;
                },
                selectTarget: 1,
                content: async function (event, trigger, player) {
                    await player.removeZhiShiWu('ruiGuang', 4);
                    await event.target.faShuDamage(1, player);

                    var choiceList=["移除该目标1个<span class='hong'>[黄色指示物]</span>","你+1[水晶]"];
                    var list=['选项二'];
                    if(event.target.countHong()>0){
                        list.unshift('选项一');
                    }
                    var control=await player.chooseControl(list).set('prompt','奇异光彩').set('choiceList',choiceList).forResultControl();
                    if(control=='选项一'){
                        await event.target.removeHong(1);
                    }else if(control=='选项二'){
                        await player.addNengLiang('shuiJing', 1);
                    }
                },
            },


            cuiCanLiYu: {
                type: 'faShu',
                enable: ['faShu'],
                filter: function (event, player) {
                    return player.countNengLiangAll() > player.countSkill('cuiCanLiYu');
                },
                filterTarget: function (card, player, target) {
                    return target.side != player.side;
                },
                selectTarget: 1,
                content: async function (event, trigger, player) {
                    var num = player.countSkill('cuiCanLiYu');

                    if(player.countNengLiang('baoShi')==0){
                        await player.removeNengLiang('shuiJing',num);
                    }else if(player.countNengLiang('shuiJing')==0){
                        await player.removeNengLiang('baoShi',num);
                    }else if(player.countNengLiangAll() == num){
                        await player.removeNengLiang('baoShi',player.countNengLiang('baoShi'));
                        await player.removeNengLiang('shuiJing',player.countNengLiang('shuiJing'));
                    }else{
                        var list = [];
                        for (var i = 0; i < player.countNengLiang('baoShi'); i++) {
                            list.push(['baoShi', get.translation('baoShi')]);
                        }
                        for (var i = 0; i < player.countNengLiang('shuiJing'); i++) {
                            list.push(['shuiJing', get.translation('shuiJing')]);
                        }
                        var result = await player.chooseButton(['选择消耗的能量', [list, 'tdnodes']])
                            .set('selectButton', num).forResult();

                        event.dict = { baoShi: 0, shuiJing: 0 };
                        for (var i = 0; i < result.links.length; i++) {
                            event.dict[result.links[i]]++;
                        }
                        if (event.dict.baoShi > 0) await player.removeNengLiang('baoShi', event.dict.baoShi);
                        if (event.dict.shuiJing > 0) await player.removeNengLiang('shuiJing', event.dict.shuiJing);
                    }

                    await event.target.faShuDamage(1, player);
                    player.addFaShu();
                },
            },

            //剑皇
            tianShiWenZhang:{
                intro:{
                    name:'天使纹章',
                    content:'mark',
                },
                onremove:'storage',
                markimage:'/extension/tom扩/tianShiWenZhang.jpg',
            },
            eMoWenZhang:{
                intro:{
                    name:'恶魔纹章',
                    content:'mark',
                },
                onremove:'storage',
                markimage:'/extension/tom扩/eMoWenZhang.jpg',
            },

            jianHunJiaHu: {
                trigger: { global: 'gameStart' },
                forced: true,
                content: function () {
                    player.addZhiShiWu('tianShiWenZhang', 2);
                    player.addZhiShiWu('eMoWenZhang', 1);
                },
                fanZhuanTianShiWenZhang: function (player, num) {
                    num = num || 1;
                    if (!player.hasZhiShiWu('tianShiWenZhang')) return;
                    var next = game.createEvent('fanZhuanTianShiWenZhang');
                    next.player = player;
                    if (num > player.countZhiShiWu('tianShiWenZhang')) num = player.countZhiShiWu('tianShiWenZhang');
                    next.num = num;
                    next.setContent(function () {
                        'step 0'
                        player.removeZhiShiWu('tianShiWenZhang', event.num);
                        'step 1'
                        player.addZhiShiWu('eMoWenZhang', event.num);
                    });
                    return next;
                },
                fanZhuanEMoWenZhang: function (player, num) {
                    num = num || 1;
                    if (!player.hasZhiShiWu('eMoWenZhang')) return;
                    var next = game.createEvent('fanZhuanEMoWenZhang');
                    next.player = player;
                    if (num > player.countZhiShiWu('eMoWenZhang')) num = player.countZhiShiWu('eMoWenZhang');
                    next.num = num;
                    next.setContent(function () {
                        'step 0'
                        player.removeZhiShiWu('eMoWenZhang', event.num);
                        'step 1'
                        player.addZhiShiWu('tianShiWenZhang', event.num);
                    });
                    return next;
                },
            },

            lingQiZhan: {
                trigger: { source: 'gongJiMingZhong' },
                filter: function (event, player) {
                    if (event.yingZhan==true) return false;
                    if (!player.isHengZhi() && player.countCards('h') == 0) return false;
                    return player.countZhiShiWu('tianShiWenZhang') > 0 || player.countZhiShiWu('eMoWenZhang') > 0;
                },
                async cost(event, trigger, player) {
                    if (!player.isHengZhi()) {
                        event.result = await player.chooseCard('h', 1, function (card) {
                            return get.type(card) == 'faShu';
                        })
                            .set('prompt', get.prompt(event.skill))
                            .set('prompt2', lib.translate[event.skill + '_info'])
                            .forResult();
                    } else {
                        event.result = await player.chooseBool()
                            .set('prompt', get.prompt(event.skill))
                            .set('prompt2', lib.translate[event.skill + '_info'])
                            .set('ai', function () {
                                return true;
                            })
                            .forResult();
                    }
                },
                content: async function (event, trigger, player) {
                    if (event.cards && event.cards.length) {
                        await player.discard(event.cards).set('showCards', true);
                    }

                    var hasTianShi = player.countZhiShiWu('tianShiWenZhang') > 0;
                    var hasEMo = player.countZhiShiWu('eMoWenZhang') > 0;
                    var choice;

                    if (hasTianShi && hasEMo) {
                        choice = await player.chooseControl(['tianShi', 'eMo'])
                            .set('prompt', '请选择翻转的纹章')
                            .set('choiceList', [
                                '翻转1【天使纹章】：对攻击目标以外的一名目标对手造成1点法术伤害③',
                                '翻转1【恶魔纹章】：本次攻击伤害额外+1',
                            ])
                            .set('ai', function () {
                                var trigger = _status.event.getTrigger();
                                if (trigger && trigger.target && get.damageEffect(trigger.target, _status.event.player, 1) > 0) {
                                    return 'eMo';
                                }
                                return 'tianShi';
                            })
                            .forResultControl();
                    } else if (hasTianShi) {
                        choice = 'tianShi';
                    } else {
                        choice = 'eMo';
                    }

                    var plus = player.isHengZhi() ? 1 : 0;

                    if (choice == 'tianShi') {
                        await lib.skill.jianHunJiaHu.fanZhuanTianShiWenZhang(player, 1);

                        let targets = await player.chooseTarget('对攻击目标以外的一名目标对手造成' + (1 + plus) + '点法术伤害③', true, function (card, player, target) {
                            return target.side != player.side && target != _status.event.gongJiTarget;
                        })
                            .set('gongJiTarget', trigger.target)
                            .set('ai', function (target) {
                                var player = _status.event.player;
                                return get.damageEffect2(target, player, _status.event.num);
                            })
                            .set('num', 1 + plus)
                            .forResultTargets();

                        await targets[0].faShuDamage(1 + plus, player);

                        if (player.countZhiShiWu('tianShiWenZhang') > 0) {
                            let bool = await player.chooseBool('是否额外翻转1【天使纹章】，你+' + (1 + plus) + '[治疗]？')
                                .set('ai', function () { return true; })
                                .forResultBool();

                            if (bool) {
                                await lib.skill.jianHunJiaHu.fanZhuanTianShiWenZhang(player, 1);
                                player.changeZhiLiao(1 + plus, player);
                            }
                        }
                    } else {
                        await lib.skill.jianHunJiaHu.fanZhuanEMoWenZhang(player, 1);
                        trigger.changeDamageNum(1 + plus);

                        if (player.countZhiShiWu('eMoWenZhang') > 0) {
                            let bool = await player.chooseBool('是否额外翻转1【恶魔纹章】，你+' + (1 + plus) + '[水晶]？')
                                .set('ai', function () { return true; })
                                .forResultBool();

                            if (bool) {
                                await lib.skill.jianHunJiaHu.fanZhuanEMoWenZhang(player, 1);
                                for (var i = 0; i < 1 + plus; i++) {
                                    await player.addNengLiang('shuiJing', 1);
                                }
                            }
                        }
                    }
                },
            },

            jiFengJiX: {
                duYou: 'jiFengJi',
                trigger: { player: 'gongJiShi' },
                filter: function (event, player) {
                    return event.card.hasDuYou('jiFengJi') &&
                        player.countZhiShiWu('tianShiWenZhang') >= 3 &&
                        event.yingZhan != true;
                },
                content: function () {
                    'step 0'
                    lib.skill.jianHunJiaHu.fanZhuanTianShiWenZhang(player, 3);
                    'step 1'
                    player.addGongJi();
                },
            },

            lieFengJiX: {
                duYou: 'lieFengJi',
                trigger: { player: 'gongJiShi' },
                filter: function (event, player) {
                    return event.card.hasDuYou('lieFengJi') &&
                        player.countZhiShiWu('eMoWenZhang') >= 3 &&
                        event.yingZhan != true;
                },
                content: function () {
                    'step 0'
                    lib.skill.jianHunJiaHu.fanZhuanEMoWenZhang(player, 3);
                    'step 1'
                    trigger.wuFaYingZhan();
                },
            },

            zhenWangWuShuang:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.canBiShaBaoShi();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    await player.hengZhi();
                    await player.chooseDraw(2, true);

                    let list = [];
                    if (player.countZhiShiWu('tianShiWenZhang') > 0) list.push('天使纹章');
                    if (player.countZhiShiWu('eMoWenZhang') > 0) list.push('恶魔纹章');
                    list.push('cancel2');

                    let choice = await player.chooseControl(list)
                        .set('prompt', '是否翻转1个纹章？')
                        .forResultControl();

                    if (choice == '天使纹章') {
                        await lib.skill.jianHunJiaHu.fanZhuanTianShiWenZhang(player, 1);
                    } else if (choice == '恶魔纹章') {
                        await lib.skill.jianHunJiaHu.fanZhuanEMoWenZhang(player, 1);
                    }
                },
                group:['zhenWangWuShuang_chongZhi'],
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                        }
                    },
                },
            },

            buHuiShengYi: {
                trigger: { player: 'gongJiAfter' },
                usable:1,
                filter: function (event, player) {
                    return event.yingZhan!=true && player.canBiShaShuiJing();
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaShuiJing();

                    let max = Math.min(2, player.getHandcardLimit() - player.countCards('h'));
                    if (max > 0) await player.chooseDraw(max, true);

                    let list = [];
                    if (player.countZhiShiWu('tianShiWenZhang') > 0) list.push('天使纹章');
                    if (player.countZhiShiWu('eMoWenZhang') > 0) list.push('恶魔纹章');

                    if (list.length) {
                        let choice = await player.chooseControl(list)
                            .set('prompt', '翻转1个纹章')
                            .forResultControl();

                        if (choice == '天使纹章') {
                            await lib.skill.jianHunJiaHu.fanZhuanTianShiWenZhang(player, 1);
                        } else {
                            await lib.skill.jianHunJiaHu.fanZhuanEMoWenZhang(player, 1);
                        }
                    }

                    player.addGongJi();
                },
            },

            //兽灵猎手
            shouLing: {
                intro: {
                    content: 'mark',
                    max: 2,
                },
                onremove: 'storage',
                markimage: 'image/card/zhiShiWu/hong.png',
            },


            
            gongJiZhuangTai: {
                intro: {
                    name: '幻兽：攻击状态',
                    content: `
        <span class="greentext">[被动]攻击状态</span><br>
        根据你的形态获得以下效果：<br>
        ● 普通形态：<span class="tiaoJian">(主动攻击未命中时发动②)</span>攻击的目标摸1张牌[强制]。<br>
        ● 狩猎形态：你的主动攻击伤害额外+1。
        `,
                    nocount: true,
                },
                markimage: '/extension/tom扩/gongJiZhuangTai.jpg',
                onremove: 'storage',
                group: ['gongJiZhuangTai_puTong', 'gongJiZhuangTai_shouLie'],
                subSkill: {
                    puTong: {
                        trigger: {source: 'gongJiWeiMingZhong'},
                        forced: true,
                        filter: function (event, player) {
                            return player.hasZhiShiWu('gongJiZhuangTai') &&
                                !player.isHengZhi() &&
                                event.yingZhan!=true;
                        },
                        content: function () {
                            trigger.player.draw();
                        },
                    },
                    shouLie: {
                        trigger: { source: 'gongJiMingZhong' },
                        forced: true,
                        filter: function (event, player) {
                            return player.hasZhiShiWu('gongJiZhuangTai') &&
                                player.isHengZhi() &&
                                event.yingZhan!=true;
                        },
                        content: function () {
                            trigger.changeDamageNum(1);
                        },
                    },
                },
            },

            fangYuZhuangTai: {
                intro: {
                    name: '幻兽：防御状态',
                    content: `
        <span class="greentext">[被动]防御状态</span><br>
        根据你的形态获得以下效果：<br>
        ● 普通形态：<span class="tiaoJian">(当你受到法术伤害时发动③)</span>本次伤害-1③，目标我方角色摸1张牌[强制]。<br>
        ● 狩猎形态：<span class="tiaoJian">(当你受到法术伤害时发动③)</span>移除1点<span class="hong">【兽灵】</span>，本次伤害-1③，目标角色摸1张牌[强制]。
        `,
                    nocount: true,
                },
                markimage: '/extension/tom扩/fangYuZhuangTai.jpg',
                onremove: 'storage',
                group: ['fangYuZhuangTai_puTong', 'fangYuZhuangTai_shouLie'],
                subSkill: {
                    puTong: {
                        trigger: { player: 'zaoChengShangHai' },
                        forced: true,
                        filter: function (event, player) {
                            return player.hasZhiShiWu('fangYuZhuangTai') &&
                                !player.isHengZhi() &&
                                event.faShu == true;
                        },
                        content: function () {
                            'step 0'
                            trigger.changeDamageNum(-1);
                            'step 1'
                            player.chooseTarget('幻兽-防御状态：目标我方角色摸1张牌', true, function (card, player, target) {
                                return target.side == player.side;
                            }).set('ai', function (target) {
                                return target.countCards('h') < target.getHandcardLimit() ? 1 : 0.5;
                            });
                            'step 2'
                            result.targets[0].draw();
                        },
                    },
                    shouLie: {
                        trigger: { player: 'zaoChengShangHai' },
                        forced: true,
                        filter: function (event, player) {
                            return player.hasZhiShiWu('fangYuZhuangTai') &&
                                player.isHengZhi() &&
                                event.faShu == true &&
                                player.countZhiShiWu('shouLing') > 0;
                        },
                        content: function () {
                            'step 0'
                            player.removeZhiShiWu('shouLing');
                            'step 1'
                            trigger.changeDamageNum(-1);
                            'step 2'
                            player.chooseTarget('目标角色摸1张牌', true).set('ai', function (target) {
                                return target.side == _status.event.player.side ? 1 : 0;
                            });
                            'step 3'
                            result.targets[0].draw();
                        },
                    },
                },
            },

            wuZheJingJue: {
                trigger: { global: 'gameStart' },
                forced: true,
                content: function () {
                    lib.skill.wuZheJingJue.changeShouLingState(player, 'gongJi');
                },
                changeShouLingState: function (player, state) {
                    if (state == 'gongJi') {
                        player.removeZhiShiWu('fangYuZhuangTai');
                        player.removeSkill('fangYuZhuangTai');

                        player.addSkill('gongJiZhuangTai');
                        player.addZhiShiWu('gongJiZhuangTai');
                    } else {
                        player.removeZhiShiWu('gongJiZhuangTai');
                        player.removeSkill('gongJiZhuangTai');

                        player.addSkill('fangYuZhuangTai');
                        player.addZhiShiWu('fangYuZhuangTai');
                    }
                },
                toggleShouLingState: function (player) {
                    if (player.hasZhiShiWu('gongJiZhuangTai')) {
                        lib.skill.wuZheJingJue.changeShouLingState(player, 'fangYu');
                    } else {
                        lib.skill.wuZheJingJue.changeShouLingState(player, 'gongJi');
                    }
                },
                group: 'wuZheJingJue_gain',
                subSkill: {
                    gain: {
                        trigger: { global: 'changeZhiShiWuAfter' },
                        forced: true,
                        filter: function (event, player) {
                            var info=get.info(event.zhiShiWu);
                            if(!info.intro||info.markimage!='image/card/zhiShiWu/hong.png') return false;
                            if (player.isHengZhi()) return false;
                            if (!event.player || event.player == player) return false;
                            if (_status.currentPhase != event.player) return false;
                            if (event.num <= 0) return false;
                            return true;
                        },
                        content: function () {
                            player.addZhiShiWu('shouLing');
                        },
                    },
                },
            },

            linZhanTaiShi: {
                trigger: { player: 'zhiShiWuYiChu' },
                forced: true,
                filter: function (event, player) {
                    return event.zhiShiWu === 'shouLing' && !player.isHengZhi();
                },
                content: async function (event, trigger, player) {
                    await player.hengZhi();

                    await player.chooseControl(['攻击状态', '防御状态'])
                        .set('prompt', '任意调整幻兽的状态')
                        .set('ai', function () {
                            return '攻击状态';
                        })
                        .forResultControl().then(function (control) {
                            if (control == '攻击状态') {
                                lib.skill.wuZheJingJue.changeShouLingState(player, 'gongJi');
                            } else {
                                lib.skill.wuZheJingJue.changeShouLingState(player, 'fangYu');
                            }
                        });
                },
                group: ['linZhanTaiShi_phaseEnd', 'linZhanTaiShi_zero'],
                subSkill: {
                    phaseEnd: {
                        trigger: { player: 'phaseEnd' },
                        forced: true,
                        filter: function (event, player) {
                            return player.isHengZhi();
                        },
                        content: function () {
                            'step 0'
                            if (player.countZhiShiWu('shouLing') > 0) {
                                player.removeZhiShiWu('shouLing');
                            }
                        },
                    },
                    zero: {
                        trigger: { player: 'changeZhiShiWuAfter' },
                        forced: true,
                        filter: function (event, player) {
                            return player.isHengZhi() &&
                                event.zhiShiWu == 'shouLing' &&
                                player.countZhiShiWu('shouLing') <= 0;
                        },
                        content: function () {
                            player.chongZhi();
                        },
                    },
                },
            },

            yangJingXuRui: {
                type: 'qiDong',
                trigger: { player: 'qiDong' },
                filter: function (event, player) {
                    return !player.isHengZhi();
                },
                content: function () {
                    'step 0'
                    player.draw();
                    'step 1'
                    player.addZhiShiWu('shouLing');
                    'step 2'
                    if(!player.isHengZhi()) lib.skill.wuZheJingJue.toggleShouLingState(player);
                },
            },

            xunLeiYiShan: {
                trigger: { player: 'gongJiBefore' },
                filter: function (event, player) {
                    if (!get.is.zhuDongGongJi(event)) return false;
                    if (get.xiBie(event.card) == 'an') return false;
                    return player.countCards('h') > 0 || player.countZhiShiWu('shouLing') > 0;
                },
                async cost(event, trigger, player) {
                    var list = [];
                    if (player.countCards('h', card => get.xiBie(card) == 'lei') > 0) list.push('弃1张雷系牌');
                    if (player.countZhiShiWu('shouLing') > 0) list.push('移除1【兽灵】');
                    list.push('cancel2');

                    var result = await player.chooseControl(list)
                        .set('prompt', get.prompt('xunLeiYiShan'))
                        .set('prompt2', lib.translate.xunLeiYiShan_info)
                        .forResult();

                    event.result = {bool: result.control!='cancel2', cost_data: result.control};
                },
                content: async function (event, trigger, player) {
                    if (event.cost_data == '弃1张雷系牌') {
                        await player.chooseToDiscard(`迅雷一闪：弃置1张雷系牌`, 1, true,  function (card) {
                            return get.xiBie(card) == 'lei';
                        }).set('showCards', true);
                    } else {
                        await player.removeZhiShiWu('shouLing');
                    }

                    trigger.wuFaShengDun();
                    trigger.wuFaShengGuang();
                },
            },


            shunYingChongJi: {
                type: 'faShu',
                enable: 'faShu',
                selectCard:2,
                discard:true,
                showCards:true,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                filter: function (event, player) {
                    return player.countCards('h', card => get.type(card) == 'faShu') >= 2;
                },
                filterTarget: function (card, player, target) {
                    return target.side != player.side;
                },
                selectTarget: 1,
                content: async function (event, trigger, player) {
                    var num = player.countZhiShiWu('shouLing');
                    if (num > 0) {
                        await event.target.faShuDamage(num, player);
                    }
                },
            },

            shouHunJueTu: {
                trigger: { player: 'gongJiAfter' },
                usable: 1,
                filter: function (event, player) {
                    return get.is.gongJiXingDong(event) && player.canBiShaBaoShi();
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaBaoShi();

                    player.addZhiShiWu('shouLing');

                    var list=['摸','弃','放弃'];
                    var result=await player.chooseControl(list).set('prompt','摸或弃1张牌').forResult('control');

                    if(result.control=='摸'){
                        player.draw();
                    }else if(result.control=='弃'){
                        player.chooseToDiscard('h',true,1);
                    }

                    var state = await player.chooseControl(['攻击状态', '防御状态'])
                        .set('prompt', '任意调整幻兽的状态')
                        .set('ai', function () {
                            return '攻击状态';
                        })
                        .forResultControl();

                    if (state == '攻击状态') {
                        lib.skill.wuZheJingJue.changeShouLingState(player, 'gongJi');
                    } else {
                        lib.skill.wuZheJingJue.changeShouLingState(player, 'fangYu');
                    }

                    player.addGongJiOrFaShu();
                },
            },

            //代行者
            shengMang: {
                intro: {
                    content: 'mark',
                    max: 2,
                },
                onremove: 'storage',
                markimage: 'image/card/zhiShiWu/hong.png',
            },

            xingMang: {
                intro: {
                    name: '圣绩',
                    content: 'gaiPai',
                    markcount: 'gaiPai',
                },
                onremove: function (player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                direct: true,
                trigger: { player: 'addGaiPaiAfter' },
                filter: function (event, player) {
                    return player.getGaiPai('xingMang').length > 2;
                },
                content: function () {
                    'step 0'
                    var cards = player.getGaiPai('xingMang');
                    player.chooseCardButton(cards, true, cards.length - 2, '舍弃' + (cards.length - 2) + '张【圣绩】');
                    'step 1'
                    player.discard(result.links, 'xingMang').set('sheQi', true);
                },
            },

            zhuAnZhe: {
                trigger: { target: 'shouDaoGongJiBefore' },
                forced: true,
                filter: function (event, player) {
                    return get.xiBie(event.card) == 'an';
                },
                content: function () {
                    trigger.weiMingZhong();
                },
                group: 'zhuAnZhe_anMie',
                subSkill: {
                    anMie: {
                        trigger: { player: ['daChuPai','showCardsEnd'] },
                        forced: true,
                        filter: function (event, player) {
                            if (!event.cards || !event.cards.length) return false;
                            return event.cards.some(card => get.name(card) == 'anMie');
                        },
                        content: function () {
                            player.faShuDamage(3, player);
                        },
                    },
                },
            },

            shenZhiJianFeng: {
                trigger: { player: 'gongJiBefore' },
                filter: function (event, player) {
                    return get.is.zhuDongGongJi(event) && get.xiBie(event.card) != 'an';
                },
                content: function () {
                    trigger.customArgs.shenZhiJianFeng = true;
                },
                group: ['shenZhiJianFeng_mingZhong', 'shenZhiJianFeng_weiMingZhong'],
                subSkill: {
                    mingZhong: {
                        trigger: { source: 'gongJiMingZhong' },
                        direct: true,
                        filter: function (event, player) {
                            return event.customArgs.shenZhiJianFeng == true;
                        },
                        content: function () {
                            player.addZhiShiWu('shengMang');
                        },
                    },
                    weiMingZhong: {
                        trigger: { source: 'gongJiWeiMingZhong' },
                        direct: true,
                        filter: function (event, player) {
                            return event.customArgs.shenZhiJianFeng == true;
                        },
                        content: function () {
                            player.addGaiPai(trigger.card.cards, 'xingMang');
                        },
                    },
                },
            },

            wuXiShengYue: {
                trigger: { global: 'gongJiMingZhong' },
                filter: function (event, player) {
                    return event.player &&
                        event.source.side == player.side &&
                        get.is.zhuDongGongJi(event) &&
                        player.getGaiPai('xingMang').length > 0;
                },
                async cost(event, trigger, player) {
                    var name=get.colorName(trigger.source);
                    var cards=player.getGaiPai('xingMang');
                    var result = await player.chooseCardButton(cards, 1,'是否发动【五系圣约】，移除1张【圣绩】,令'+ name +'+1[治疗]')
                        .set('ai', function (button) {
                            var trigger = _status.event.getTrigger();
                            if (trigger && get.xiBie(button.link) == get.xiBie(trigger.card)) return 2;
                            return 1;
                        })
                        .forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    };
                },
                content: async function (event, trigger, player) {
                    var card = event.cost_data;
                    await player.discard(card, 'xingMang').set('showCards', true);

                    await trigger.source.changeZhiLiao(1, player);

                    if (get.xiBie(card) == get.xiBie(trigger.card)) {
                        trigger.changeDamageNum(1);
                    }
                },
            },


            liuMangXingYue: {
                trigger: {global:'shouDaoShangHai'},
                filter: function (event, player) {
                    if (event.player.side != player.side) return false;
                    if (event.player == player) return false;
                    if (event.faShu != true) return false;
                    return player.countZhiShiWu('shengMang') > 0;
                },
                content: async function (event, trigger, player) {
                    await player.removeZhiShiWu('shengMang');

                    if (player.isHengZhi()) {
                        var num = trigger.num;
                        trigger.changeDamageNum(-num);
                        await player.faShuDamage(num, player);

                        player.chongZhi();
                        player.addZhanJi('baoShi');
                    } else {
                        trigger.changeDamageNum(-1);
                        await player.faShuDamage(1, player);
                    }
                },
            },

            wanShengZhiZi: {
                type: 'qiDong',
                trigger: { player: 'qiDong' },
                filter: function (event, player) {
                    return player.canBiShaBaoShi() && !player.isHengZhi();
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    player.addZhiShiWu('shengMang');
                    player.hengZhi();
                },
                group: ['wanShengZhiZi_removeShengMang', 'wanShengZhiZi_removeXingMang'],
                subSkill: {
                    removeShengMang: {
                        trigger: { player: 'changeZhiShiWuAfter' },
                        direct: true,
                        filter: function (event, player) {
                            return player.isHengZhi() &&
                                event.zhiShiWu == 'shengMang' &&
                                event.num < 0 &&
                                player.countCards('h') > 0;
                        },
                        content: async function (event, trigger, player) {
                            var num = Math.min(Math.abs(trigger.num), player.countCards('h'));
                            var cards = await player.chooseCard('h', num, true, '将' + num + '张手牌面朝下置于你角色旁，作为【圣绩】')
                                .set('ai', function (card) {
                                    return 6 - get.value(card);
                                })
                                .forResultCards();

                            if (cards.length) {
                                player.addGaiPai(cards, 'xingMang');
                            }
                        },
                    },
                    removeXingMang: {
                        trigger: { player: 'discard' },
                        direct: true,
                        filter: function (event, player) {
                            return player.isHengZhi() &&
                                event.gaiPai == 'xingMang' &&
                                event.cards.length > 0;
                        },
                        content: function () {
                            player.changeZhiLiao(trigger.cards.length, player);
                        },
                    },
                },
            },

            zhuEKuiSan: {
                type: 'faShu',
                enable: 'faShu',
                filter: function (event, player) {
                    return player.canBiShaShuiJing() &&
                        (player.countZhiShiWu('shengMang') > 0 || player.getGaiPai('xingMang').length > 0);
                },
                filterTarget: function (card, player, target) {
                    return target.side != player.side;
                },
                selectTarget: 1,

                content: async function (event, trigger, player) {
                    await player.removeBiShaShuiJing();

                    var list = [];
                    var sheng = player.countZhiShiWu('shengMang');
                    var xing = player.getGaiPai('xingMang').length;

                     var dam = Math.max(sheng, xing);

                    for (var j = 1; j <= dam; j++) {
                        list.push(j);
                    }

                    var num = await player.chooseControl(list)
                        .set('prompt', '选择要造成的伤害')
                        .forResultControl();


                    num = Number(num);
                    var costType;

                    // 如果其中一个不足，自动选另一个
                    if (sheng < num && xing >= num) {
                        costType = 'xingMang';
                    }
                    else if (xing < num && sheng >= num) {
                        costType = 'shengMang';
                    }
                    else {
                        costType = await player.chooseControl(['shengMang', 'xingMang'])
                            .set('prompt', '选择消耗【圣芒】或【圣绩】')
                            .set('choiceList', [
                                '移除' + num + '【圣芒】',
                                '移除' + num + '【圣绩】',
                            ])
                            .forResultControl();
                    }

                    if (costType == 'shengMang') {
                        await player.removeZhiShiWu('shengMang', num);
                    }
                    else {
                        var cards = player.getGaiPai('xingMang');
                        var links = await player.chooseCardButton(cards, num, true, '移除' + num + '张【圣绩】')
                            .set('ai', function (button) {
                                return 1;
                            })
                            .forResultLinks();

                        await player.discard(links, 'xingMang');
                    }

                    var extra = 0;

                    if (player.isHengZhi()) {
                        var bool = await player.chooseBool('是否[重置]脱离【飞昇形态】，令本次法术伤害额外+1？')
                            .set('ai', function () {
                                return true;
                            })
                            .forResultBool();

                        if (bool) {
                            player.chongZhi();
                            extra = 1;
                        }
                    }

                    await event.target.faShuDamage(num + extra, player);
                }
            },







            
        },
        translate: {

            //角色名字
            shengTangMuShi_name: "露西尔",
            yingLiuWuShi_name: "静",
            lvXingShangRen_name: "惠美子",
            huangMoNvWu_name: "忒伊亚",
            shouRenJun_name: "达鲁克",
            gaoJieQiShi_name: "伊莉斯",
            longJianShi_name: "赫蜜恩妮",
            longShuShi_name: "奥伯隆",
            longQiShi_name: "塔蒂亚娜",
            shuangMianNvLang_name: "夜空",
            liuLiNvWu_name:"芮娜",
            jianHuang_name:'傑克',
            shouLingLieShou_name:'莉莎娜',
            daiXingZhe_name:'雷诺',



            //圣堂牧师
            shenShengHuZhao: '[响应]神圣呼召',
            shenShengHuZhao_info: '<span class="tiaoJian">(当你对目标角色造成法术伤害时发动③)</span>若他的手牌数<3，一名我方角色+3-X点[治疗]，X为该目标的手牌数；反之，你弃1张牌。',

            xiLi: '[法术]洗礼',
            xiLi_info: '<span class="tiaoJian">(弃1张水系牌[展示])</span>对目标对手造成1点法术伤害③，目标我方角色+1点[治疗]。',

            fengZhiZhuFu: '[法术]风之祝福',
            fengZhiZhuFu_info: '<span class="tiaoJian">(弃1张风系牌[展示])</span>目标角色弃1张牌。<span class="tiaoJian">(若该角色面前有任何基础效果)</span>对另一名目标角色造成1点法术伤害③。',

            shenShengLianJie: '[法术]神圣链接',
            shenShengLianJie_info: '[水晶]你弃2张牌，并选择一项：目标角色和你各+1点[治疗]；或对目标角色和你各造成1点法术伤害③。',

            tianFa: '[法术]天罚',
            tianFa_info: '[宝石]目标角色弃掉所有手牌，额外+1[法术行动]。',


            //樱流武士
            dongZhen: '[启动]血振',
            dongZhen_info: '<span class="tiaoJian">(摸1张牌[强制])</span>你+2<span class="hong">【居合】</span>。',

            tuNa: '[启动]吐纳',
            tuNa_info: '<span class="tiaoJian">(弃1张风系牌[展示])</span>你+1<span class="hong">【居合】</span>。',

            zhanZhiXing: '[响应]斩之型',
            zhanZhiXing_info: '<span class="tiaoJian">(主动攻击前发动①)</span>移除3<span class="hong">【居合】</span>，本次攻击无法应战；<span class="tiaoJian">(若未命中②)</span>你+1<span class="hong">【居合】</span>。',

            yuZhiXing: '[响应]钢之型',
            yuZhiXing_info: '<span class="tiaoJian">(当你受到攻击伤害时发动③)</span>移除2<span class="hong">【居合】</span>，该次伤害-1；<span class="tiaoJian">(若你承受伤害后敌方士气未下降⑥)</span>你+1<span class="hong">【居合】</span>。',

            yingLiuZhan: '[响应]翔之型',
            yingLiuZhan_info: '<span class="tiaoJian">(主动攻击的目标拥有基础效果时发动①，移除2<span class="hong">【居合】</span>)</span>，本次攻击强制命中，但造成伤害-1。【翔之型】最高只能造成3点伤害③。',

            jiZhiXing: '[响应]极之型',
            jiZhiXing_info: '[水晶]<span class="tiaoJian">(主动攻击命中时发动②)</span>移除3<span class="hong">【居合】</span>，本次攻击伤害额外+2。',

            yiShan: '[响应]一闪',
            yiShan_info: '[水晶]<span class="tiaoJian">(主动攻击命中时发动②)</span>弃X张法术牌（X>1）本次攻击伤害额外+(X-1)。【一闪】必须与其他【型】于同一次攻击行动一同发动。',
            
            juHe: "居合",
            juHe_info:"<span class='hong'>【居合】</span>为樱流武士专有指示物，上限为6。",


            //旅行商人

            jingShangZhiDao: '[被动]经商之道',
            jingShangZhiDao_info: '你执行【购买】时，改为摸2张牌。游戏开始时, 你必须先执行至少一次[攻击行动]或[法术行动]，才能执行【购买】。',

            diXiaFaZe1: '[被动]地下法则',
            diXiaFaZe1_info: '你执行【购买】时，改为我方【战绩区】+2[宝石]。',

            liuZhiDaJi: '[响应]溜之大吉[回合限定]',
            liuZhiDaJi_info: '<span class="tiaoJian">(当你受到任何伤害时发动③)</span>若你的手牌达到上限，弃2张同系牌[展示]。',

            jinNangMiaoJi: '[法术]锦囊妙计',
            jinNangMiaoJi_info: '<span class="tiaoJian">(弃2张法术牌[展示])</span>你选择一项：<br>● 对目标角色造成2点法术伤害③，你摸1张牌[强制]。<br>● 将我方战绩区[水晶]全部替换成[宝石]，你+1[水晶]。',

            qianKeWanLai: '[法术]千客万来',
            qianKeWanLai_backup: '[法术]千客万来',
            qianKeWanLai_info: '[水晶]<span class="tiaoJian">(移除我方【战绩区】的2[宝石])</span>你选择一项：<br>● 将2[宝石]分配给最多2名我方角色，你弃1张牌。<br>● <span class="tiaoJian">(对自己造成4点法术伤害③)</span>我方【星杯区】+1【星杯】，我方士气+1。',

            shangRen_gouMai: '购买',

            //荒漠女巫
            huangShaJueYing: '[响应]荒沙绝影',
            huangShaJueYing_info: '<span class="tiaoJian">(任何人对你造成伤害时发动③)</span>弃X张地系牌[展示]。',

            fengHua: '[法术]风化',
            fengHua_info: '<span class="tiaoJian">(弃1张水系牌[展示])</span>展示并弃置牌库顶的5张牌[展示]，并将其所包含的地系牌或法术牌收入手中[强制]，你每以此法获得1张牌，你+1<span class="hong">【沙尘】</span>。',

            zhanShaShu: '[启动]占沙术',
            zhanShaShu_info: '<span class="tiaoJian">(弃1张法术牌[展示]])</span>你+1<span class="hong">【沙尘】</span>。',

            shaChenBao: '[法术]沙尘暴',
            shaChenBao_info: '<span class="tiaoJian">(移除3<span class="hong">【沙尘】</span>)</span>对目标角色造成2点法术伤害③。',

            shiKongShaLou: '[法术]时空沙漏',
            shiKongShaLou_info: '[水晶]将【时空沙漏】放置于目标角色前。该角色获得：<span class="tiaoJian">(你的回合结束时，强制移除此牌触发[强制])</span>你摸X张牌，X等同于你在本回合行动阶段自手牌中打出与弃置的手牌总数。',

            liuShaXianJing: '[法术]流沙陷阱',
            liuShaXianJing_info: '[水晶]你选择一项：<br>● 目标角色和你各弃2张牌，你+2<span class="hong">【沙尘】</span>。<br>● <span class="tiaoJian">(移除X<span class="hong">【沙尘】</span>)</span>将X点法术伤害任意分配给至少2名目标角色③<span class="tiaoJian">(X>2)</span>，每次伤害最高为2。',

            shaChen: '沙尘',
            shaChen_info: '<span class="hong">【沙尘】</span>为荒漠女巫专有指示物，上限为5。',

            shiKongShaLouX: '时空沙漏',
            shiKongShaLouX_info: '<span class="tiaoJian">(你的回合结束时，强制移除此牌触发[强制])</span>你摸X张牌，X等同于你在本回合行动阶段自手牌中打出与弃置的手牌总数。',

            //首刃军
            shanMengXueShi: '[被动]山盟血誓',
            shanMengXueShi_info: '<span class="tiaoJian">(游戏开始时)</span>你选择1名队友成为【盟友】，并将【歃血之誓】放置于其面前。<span class="tiaoJian">(当你们之中有人因承受伤害导致士气下降时)</span>你+1<span class="hong">【血仇】</span>。',

            xingHongDaJi: '[响应]腥红打击',
            xingHongDaJi_info: '<span class="tiaoJian">(主动攻击前发动①)</span>对自己造成2点法术伤害③，本次攻击伤害额外+2，不能和【以眼还眼】同时发动。',

            yiYanHuanYan: '[响应]以眼还眼',
            yiYanHuanYan_info: '<span class="tiaoJian">(主动攻击前发动①)</span>移除1<span class="hong">【血仇】</span>，本次攻击伤害额外+2，不能和【腥红打击】同时发动。',

            luLiTongXin: '[响应]戮力同心',
            luLiTongXin_info: '<span class="tiaoJian">(主动攻击前发动①)</span>移除2<span class="hong">【血仇】</span>，本次攻击无法应战。<span class="tiaoJian">(若命中②)</span>你和<span class="hong">【盟友】</span>各摸1张牌。',

            shaXueZhiShi:'(专)歃血之誓',
            shaXueZhiShiX:'[响应]歃血之誓[回合限定]',
            shaXueZhiShi_info:'<span class="tiaoJian">(当你承受任何伤害时发动③)</span>本次伤害-1③，并对首刃军造成1点法术伤害③。',
            shaXueZhiShiX_info:'<span class="tiaoJian">(当你承受任何伤害时发动③)</span>本次伤害-1③，并对首刃军造成1点法术伤害③。',

            fanJiZiTai: '[法术]反击姿态',
            fanJiZiTai_info: '[水晶]你将手牌调整至a张，【盟友】将手牌调整至b张。a、b值为至少为3，但不能超过手牌上限。<span class="tiaoJian">(若a值之和>8)</span>你+1<span class="hong">【血仇】</span>，额外+1<span class="hong">[攻击行动]</span>。',

            xueChou: '血仇',
            xueChou_info: '<span class="hong">【血仇】</span>为首刃军专有指示物，上限为4。',

            //高洁骑士
            shengJieZhiDao: '[被动]圣洁之道',
            shengJieZhiDao_info: '你的[治疗]无法用来抵御法术伤害；你的[治疗]上限+2。',

            shenShengDaJi: '[响应]神圣打击',
            shenShengDaJi_info: '<span class="tiaoJian">(主动攻击命中时发动②)</span>目标角色+1[治疗]；<span class="tiaoJian">(主动攻击未命中时②，若攻击牌为神圣类命格)</span>目标角色+1<span class="hong">[治疗]</span>。',

            shouHuJieJie: '[响应]守护结界',
            shouHuJieJie_info: '<span class="tiaoJian">(目标队友受到主动攻击时①，若此攻击可应战)</span>移除你的2[治疗]抵挡该次攻击②，你弃1张牌。',

            shenShengZhaoZhao: '[法术]神圣映照',
            shenShengZhaoZhao_info: '<span class="tiaoJian">(弃2张法术牌[展示])</span>你+2[治疗]并摸2张牌[强制]，额外+1[攻击行动]。',

            shengJianHengSao: '[响应]圣剑横扫',
            shengJianHengSao_info: '[水晶]<span class="tiaoJian">(发动【神圣打击】时)</span>效果改为你选择以下一项发动：<br>● 你弃2张牌，所有我方角色+1[治疗]。<br>● <span class="tiaoJian">(移除你的X[治疗])</span>对攻击目标以外的一名目标对手造成X点攻击伤害③<span class="tiaoJian">(X&lt;4)</span>。',

            jianDingBuYi: '[响应]坚定不移',
            jianDingBuYi_info: '[水晶]<span class="tiaoJian">(当你受到法术伤害时发动③)</span>你+X[治疗]，X与本次法术伤害相同<span class="tiaoJian">(X&lt;4)</span>。',

            //龙剑士
            longZhiKuangAo: '[被动]龙之狂傲',
            longZhiKuangAo_info: '<span class="tiaoJian">(仅【普通形态】下，攻击命中时发动②)</span>攻击结算后，你对自己造成1点法术伤害③，你+1<span class="hong">【龙魄】</span>。',

            cangLongLianZhan: '[响应]苍龙连斩[回合限定]',
            cangLongLianZhan_info: '<span class="tiaoJian">(一次[攻击行动]结束后发动)</span>额外+1水系[攻击行动]。',

            kangMoLinJia: '[响应]抗魔鳞甲',
            kangMoLinJia_info: '<span class="tiaoJian">(当你受到法术伤害时发动③)</span>移除1<span class="hong">【龙魄】</span>，你选择一项：<br>● 抵御1点法术伤害③。<br>● 对目标对手造成1点法术伤害③。',

            linLongSuJi: '[响应]铁龙棘',
            linLongSuJi_info: '<span class="tiaoJian">(主动攻击的目标拥有基础效果时发动①)</span>移除2<span class="hong">【龙魄】</span>，移除该目标面前的一项基础效果，本次攻击无法应战。<span class="tiaoJian">(若未命中②)</span>你+1<span class="hong">【龙魄】</span>。',

            yuanGuZhiMing: '[启动]远古烙印',
            yuanGuZhiMing_info: '[宝石][横置]你转为【狂暴形态】，此形态下你的主动攻击伤害额外+2，应战攻击伤害额外+1。你的回合结束时，移除1点<span class="hong">【龙魄】</span>，若不如此做，则脱离【狂暴形态】。',

            longZhiChiShou: '[启动]龙之持守',
            longZhiChiShou_info: '[水晶]你将手牌调整到4张[强制]，并无视上限+2<span class="hong">【龙魄】</span>。',

            longPo: '龙魄',
            longPo_info: '<span class="hong">【龙魄】</span>为龙剑士专有指示物，上限为2。',

            //龙术士
            longZhiJiDian: '[被动]龙之祭奠',
            longZhiJiDian_info: '<span class="tiaoJian">(同一回合内，至少产生2次法术伤害时③)</span>你+1<span class="hong">【龙魂】</span>。',

            longZhiYiJi: '[响应]龙之翼击',
            longZhiYiJi_info: '<span class="tiaoJian">(主动攻击命中时发动②)</span>弃1张与攻击牌同系牌[展示]，取消该次伤害，改为你对2名目标角色造成1点法术伤害③。',

            aoShuChongJi: '[法术]奥术冲击',
            aoShuChongJi_info: '<span class="tiaoJian">(弃1张法术牌[展示])</span>对目标对手和你造成1点法术伤害③。',

            huanLongYu: '[法术]幻龙玉',
            huanLongYu_info: '<span class="tiaoJian">(移除2<span class="hong">【龙魂】</span>)</span>对3名目标角色造成1点法术伤害③，【幻龙玉】造成的伤害不触发【龙之祭奠】。',

            yuanGuZhaoHuan: '[启动]远古召唤',
            yuanGuZhaoHuan_info: '[宝石][横置]你转为【附魔形态】，此形态下你造成的所有法术伤害额外+1。你的回合开始时，移除1点<span class="hong">【龙魂】</span>，若不如此做，则脱离【附魔形态】。',

            longHunFuMo: '[响应]龙魂赋魔',
            longHunFuMo_info: '[水晶]<span class="tiaoJian">([攻击行动]或[法术行动]结束后发动)</span>移除1<span class="hong">【龙魂】</span>，你弃1张牌，额外+1[法术行动]。',

            longHun: '龙魂',
            longHun_info: '<span class="hong">【龙魂】</span>为龙术士专有指示物，上限为3。',

            //龙骑士
            longZhiWeiYi: '[被动]龙之威仪',
            longZhiWeiYi_info: '<span class="tiaoJian">(同一回合内，至少一名我方角色和一名敌方角色承受伤害时③)</span>你+1<span class="hong">【龙息】</span>。',

            nuHuoLiaoYuan: '[响应]怒火燎原',
            nuHuoLiaoYuan_info: '<span class="tiaoJian">(主动攻击未命中时发动②，弃1张火系牌[展示])</span>对攻击的目标和你造成2点法术伤害③。',

            longNuGuanTian: '[响应]龙怒贯天',
            longNuGuanTian_info: '<span class="tiaoJian">(主动攻击前发动①)</span>移除2<span class="hong">【龙息】</span>，本次攻击伤害额外+2。<span class="tiaoJian">(若未命中②)</span>你+1<span class="hong">【龙息】</span>。',

            jiaoLongDan: '[法术]蛟龙弹',
            jiaoLongDan_info: '<span class="tiaoJian">(弃1张水系牌[展示]，移除X<span class="hong">【龙息】</span>)</span>对目标角色造成X点法术伤害③。',

            yuanGuXianJi: '[启动]远古献祭',
            yuanGuXianJi_info: '[水晶]你选择一项：<br>● 你+1<span class="hong">【龙息】</span>，并弃1张牌。<br>● 你将手牌调整到上限，你+2<span class="hong">【龙息】</span>，我方【战绩区】+1[宝石]。',

            longZhiBaoLie: '[法术]龙之爆裂',
            longZhiBaoLie_info: '[宝石]对目标及其相邻角色造成2点法术伤害③。<span class="tiaoJian">(若你额外移除3<span class="hong">【龙息】</span>)</span>对目标再造成1点法术伤害③。',

            longXi: '龙息',
            longXi_info: '<span class="hong">【龙息】</span>为龙骑士专有指示物，上限为3。',


            //双面女郎
            changAnZhiYing: '[被动]常闇之影',
            changAnZhiYing_info: '<span class="tiaoJian">(你的回合结束前，若你本回合中仅执行一次[攻击行动]、[法术行动]或[特殊行动]</span>)</span>你+1<span class="hong">【暗影】</span>。<span class="tiaoJian">(你的回合结束时，若你本回合曾增加<span class="hong">【暗影】</span>的数量)</span>对自己造成等同于<span class="hong">【暗影】</span>数量的法术伤害③，此伤害不会造成我方士气下降。',

            dianMoZhan: '[响应]淀魔斩',
            dianMoZhan_info: '<span class="tiaoJian">([攻击行动]结束后，若该牌为雷系或幻类命格，移除1<span class="hong">【暗影】</span>)</span>额外+1[法术行动]。',

            huanLeiJue: '[响应]幻雷诀',
            huanLeiJue_info: '<span class="tiaoJian">([法术行动]结束后，若该牌为雷系或幻类命格，移除1<span class="hong">【暗影】</span>)</span>额外+1[攻击行动]。',

            fengMoShi: '[响应]逢魔时[回合限定]',
            fengMoShi_info: '<span class="tiaoJian">([攻击行动]或[法术行动]结束后发动)</span>进入或脱离【绝影形态】，额外+1同系之[攻击行动]或[法术行动]，你+1<span class="hong">【暗影】</span>。',

            niRiSiGangShan: '[响应]逆日死钢闪',
            niRiSiGangShan_info: '[水晶]<span class="tiaoJian">(仅【普通形态】下，主动攻击命中时发动②)</span>移除X<span class="hong">【暗影】</span>，本次攻击伤害额外+X，你跳过本回合接下来的行动阶段。',

            anChaoLianYaTu: '[响应]暗潮连犽突',
            anChaoLianYaTu_info: '[水晶]<span class="tiaoJian">(仅【绝影形态】下，[攻击行动]或[法术行动]结束后发动)</span>对你本回合未曾发动过主动攻击的目标对手造成X次1点法术伤害③，X为本回合你的额外行动次数，你+X<span class="hong">【暗影】</span>，你跳过本回合接下来的行动阶段。',

            anYing: '暗影',
            anYing_info: '<span class="hong">【暗影】</span>为双面女郎专有指示物，上限为2。',


            //琉璃女巫
            liuLiZhiXin: '[被动]琉璃之心',
            liuLiZhiXin_info: '你的【能量】上限+3。<span class="tiaoJian">([法术行动]结束时发动)</span>你+1<span class="hong">【璃光】</span>。',

            jingGuangChongJi: '[法术]镜光冲击',
            jingGuangChongJi_info: '<span class="tiaoJian">(弃2张同系牌[展示])</span>将你【能量区】的1[宝石]替换为2[水晶]。<span class="tiaoJian">(若弃牌包含法术牌)</span>对目标对手造成1点法术伤害③。',

            lingJingZhangBi: '[响应]棱镜障壁',
            lingJingZhangBi_info: '<span class="tiaoJian">(当你受到法术伤害时发动③)</span>移除3<span class="hong">【璃光】</span>，抵御1点伤害③。',

            qiYiGuangCai: '[法术]奇异光彩',
            qiYiGuangCai_info: '<span class="tiaoJian">(移除4<span class="hong">【璃光】</span>)</span>对目标对手造成1点法术伤害③，你选择一项，不能触发<span class="hong">【琉璃之心】</span>：<br>● 移除目标1个<span class="hong">[黄色指示物]</span>。<br>● 你+1[水晶]。',

            cuiCanLiYu: '[法术]璀璨璃玉',
            cuiCanLiYu_info: '[水晶]对目标对手造成1点法术伤害③，额外+1[法术行动]。本回合你每施放1次【璀璨璃玉】，施放【璀璨璃玉】消耗的【能量】数+1。',

            ruiGuang: '璃光',
            ruiGuang_info: '<span class="hong">【璃光】</span>为琉璃女巫专有指示物，上限为6。',

            //剑皇
            jianHunJiaHu: '[被动]剑魂加护',
            jianHunJiaHu_info: '<span class="tiaoJian">(游戏开始时)</span>你+2【天使纹章】，+1【恶魔纹章】。',

            lingQiZhan: '[响应]灵气斩',
            lingQiZhan_info: '<span class="tiaoJian">(主动攻击命中时发动②，弃1张法术牌[展示])</span>你选择一项：<br>● <span class="tiaoJian">(翻转1【天使纹章】)</span>对除你攻击目标以外的一名目标对手造成1点法术伤害③；<span class="tiaoJian">(若你额外翻转1【天使纹章】)</span>你+1[治疗]。<br>● <span class="tiaoJian">(翻转1【恶魔纹章】)</span>本次攻击伤害额外+1；<span class="tiaoJian">(若你额外翻转1【恶魔纹章】)</span>你+1[攻击行动]。',

            jiFengJiX: '[响应]疾风技',
            jiFengJiX_info: '<span class="tiaoJian">(作为主动攻击打出时发动，翻转3【天使纹章】)</span>额外+1[攻击行动]。',

            lieFengJiX: '[响应]烈风技',
            lieFengJiX_info: '<span class="tiaoJian">(作为主动攻击打出时发动，翻转3【恶魔纹章】)</span>本次攻击无法应战。',

            zhenWangWuShuang: '[启动]真王无双',
            zhenWangWuShuang_info: '[宝石][横置]转为【真王形态】，你摸0~2张牌，你可以选择翻转1【天使纹章】或【恶魔纹章】。此形态下你发动【灵气斩】无需弃置法术牌，且所有效果额外+1。你的回合结束时[重置]脱离【真王形态】。',

            buHuiShengYi: '[响应]不灭战意[回合限定]',
            buHuiShengYi_info: '[水晶]你摸0~2张牌<span class="tiaoJian">(最高补到手牌上限)</span>，翻转1【天使纹章】或【恶魔纹章】，额外+1[攻击行动]。',

            tianShi: '天使',
            eMo: '恶魔',

            tianShiWenZhang: '天使纹章',
            tianShiWenZhang_info: '剑皇专属指示物，可翻转为【恶魔纹章】，上限为3。',

            eMoWenZhang: '恶魔纹章',
            eMoWenZhang_info: '剑皇专属指示物，可翻转为【天使纹章】，上限为3。',

            //兽灵猎手
            wuZheJingJue: '[被动]武者警觉',
            wuZheJingJue_info: '<span class="tiaoJian">(游戏开始时)</span>你的幻兽为【攻击状态】。<span class="tiaoJian">(每当其他角色在他的回合内获得<span class="hong">[黄色指示物]</span>时)</span>你+1<span class="hong">【兽灵】</span>。',

            linZhanTaiShi: '[被动]临战态势',
            linZhanTaiShi_info: '<span class="tiaoJian">(当你的<span class="hong">【兽灵】</span>溢出时)</span>[横置]你转为【狩猎形态】，任意调整幻兽的状态。此形态下你无法发动<span class="hong">【武者警觉】</span>与<span class="hong">【蓄精蓄锐】</span>。你回合结束前，移除1点<span class="hong">【兽灵】</span>。<span class="tiaoJian">(当你的<span class="hong">【兽灵】</span>为0时)</span>脱离<span class="hong">【狩猎形态】</span>。',

            yangJingXuRui: '[启动]蓄精蓄锐',
            yangJingXuRui_info: '<span class="tiaoJian">(摸1张牌[强制])</span>你+1<span class="hong">【兽灵】</span>，改变幻兽的<span class="hong">【状态】</span>。',

            xunLeiYiShan: '[响应]迅雷一闪',
            xunLeiYiShan_info: '<span class="tiaoJian">(主动攻击前①，若攻击牌非暗系，弃1张雷系牌[展示]或移除1<span class="hong">【兽灵】</span>)</span>本次攻击无视【圣盾】且无法使用【圣光】抵挡。',

            shunYingChongJi: '[法术]瞬影冲击',
            shunYingChongJi_info: '<span class="tiaoJian">(弃2张法术牌[展示])</span>对目标对手造成等同于<span class="hong">【兽灵】</span>数量的法术伤害③。',

            shouHunJueTu: '[响应]兽魂突袭[回合限定]',
            shouHunJueTu_info: '[宝石]<span class="tiaoJian">([攻击行动]结束后发动)</span>你+1<span class="hong">【兽灵】</span>，摸或弃1张牌，任意调整幻兽的状态，额外+1[攻击行动]或[法术行动]。',

            gongJiZhuangTai: '幻兽：攻击状态',
            gongJiZhuangTai_info: '根据你的形态获得以下效果：<br>● 普通形态：<span class="tiaoJian">(主动攻击未命中时发动②)</span>攻击的目标摸1张牌[强制]。<br>● 狩猎形态：你的主动攻击伤害额外+1。',

            fangYuZhuangTai: '幻兽：防御状态',
            fangYuZhuangTai_info: '根据你的形态获得以下效果：<br>● 普通形态：<span class="tiaoJian">(当你受到法术伤害时发动③)</span>本次伤害-1③，目标我方角色摸1张牌[强制]。<br>● 狩猎形态：<span class="tiaoJian">(当你受到法术伤害时发动③)</span>移除1点<span class="hong">【兽灵】</span>，本次伤害-1③，目标角色摸1张牌[强制]。',

            shouLing: '兽灵',
            shouLing_info: '<span class="hong">【兽灵】</span>为兽灵猎手专有指示物，上限为2。',

            //雷诺
            zhuAnZhe: '[被动]逐暗者',
            zhuAnZhe_info: '你始终不会被暗系攻击命中②。<span class="tiaoJian">(你从手中打出或展示【暗灭】时[展示])</span>你对自己造成3点法术伤害③。',

            shenZhiJianFeng: '[响应]神之剑锋',
            shenZhiJianFeng_info: '<span class="tiaoJian">(主动攻击时①，若攻击牌非暗系)</span>本次攻击若命中②，你+1<span class="hong">【圣芒】</span>；若未命中②，将本次攻击牌面朝下置于你角色旁，作为【圣绩】。',

            wuXiShengYue: '[响应]五系圣约',
            wuXiShengYue_info: '<span class="tiaoJian">(我方角色主动攻击命中时②)</span>移除1【圣绩】，该名我方角色+1[治疗]；<span class="tiaoJian">(若移除的【圣绩】与本次攻击同系)</span>本次攻击伤害额外+1。',

            liuMangXingYue: '[响应]六芒圣约',
            liuMangXingYue_info: '<span class="tiaoJian">(目标队友承受法术伤害时发动③)</span>移除1<span class="hong">【圣芒】</span>，将1点伤害转移给你③。<span class="tiaoJian">(若你处于【飞昇形态】)</span>改为将所有伤害转移给你③，[重置]脱离【飞昇形态】，我方【战绩区】+1[宝石]。',

            wanShengZhiZi: '[启动]完圣之姿',
            wanShengZhiZi_info: '[宝石]你+1<span class="hong">【圣芒】</span>，[横置]进入【飞升形态】。此形态下你每移除1<span class="hong">【圣芒】</span>，将1张手牌面朝下置于你角色旁，作为【圣绩】。你每移除1【圣绩】，你+1[治疗]。',

            zhuEKuiSan: '[法术]诸恶溃散',
            zhuEKuiSan_info: '[水晶]<span class="tiaoJian">(移除X<span class="hong">【圣芒】</span>或【圣绩】)</span>对目标对手造成X点法术伤害③；<span class="tiaoJian">(若你选择[重置]脱离【飞昇形态】)</span>本次法术伤害额外+1。',

            shengMang: '圣芒',
            shengMang_info: '<span class="hong">【圣芒】</span>为代行者专有指示物，上限为2。',

            xingMang: '圣绩',
            xingMang_info: '【圣绩】为代行者专有盖牌，上限为2。',





        },
    },
    intro: "",
    author: "诸神无限",
    diskURL: "",
    forumURL: "",
    version: "1.0",
},files:{"character":[],"card":[],"skill":[],"audio":[]},connect:true} 
});