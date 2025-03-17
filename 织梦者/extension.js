game.import("extension",function(lib,game,ui,get,ai,_status){
	return {name:"织梦者",arenaReady:function(){
    
},content:function(config,pack){
    
},prepare:function(){
    
},precontent:function(){
	var modeConfig={//模式设置
        translate:'梦境苏醒',
        connect:{
            connect_versus_mode:{
                name:'游戏模式',
                init:'2v2',
                item:{
                    '2v2':'2v2',
                    '3v3':'3v3',
                    '4v4':'4v4',
                },
                frequent:true
            },
            connect_team_sequence:{
                name:"队伍顺序",
                init:"random",
                item:{
                    'random':'随机',
                    'crossed':'交叉',
                    'near':'临近',
                    'CM':"CM",
                },
                frequent:true,
            },
            connect_viewHandcard:{
                name:'可见队友手牌',
                init:false,
                onclick:function(bool){
                    game.saveConfig('connect_viewHandcard',bool,this._link.config.mode);
                },
                frequent:true,
            },
            connect_chooseSide:{
                name:'手动选择队伍',
                init:false,
                onclick:function(bool){
                    game.saveConfig('connect_chooseSide',bool,this._link.config.mode);
                },
                frequent:true,
            },
        },
        config: {
            versus_mode:{
                name:'游戏模式',
                init:'two',
                item:{
                    three:'3v3',
                    two:'2v2',
                    four:'4v4',
                },
                restart:true,
                frequent:true,
            },
            team_sequence:{
                name:"队伍顺序",
                init:"random",
                item:{
                    random:'随机',
                    crossed:'交叉',
                    near:'临近',
                    CM:"CM",
                },
                frequent:true,
            },
            viewHandcard:{
                name:'可见队友手牌',
                init:false,
                onclick:function(bool){
                    game.saveConfig('viewHandcard',bool,this._link.config.mode);
                },
                frequent:true,
            },
            change_identity:{
                name:'自由选择座位',
                init:true,
                onclick:function(bool){
                    game.saveConfig('change_identity',bool,this._link.config.mode);
                    if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;

                    var dialog;
                    if(ui.cheat2&&ui.cheat2.backup) dialog=ui.cheat2.backup;
                    else dialog=_status.event.dialog;
                    if(!_status.brawl||!_status.brawl.noAddSetting){
                        if(!dialog.querySelector('table')&&get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                        else _status.event.getParent().removeSetting(dialog);
                    }
                    ui.update();
                }
            },
        },
    };
	var modeContent= {
        name:'梦境苏醒',
        start:function(){
            "step 0"
            _status.mode=get.config('versus_mode');
			if(_status.connectMode) _status.mode=lib.configOL.versus_mode;

            var playback=localStorage.getItem(lib.configprefix+'playback');
            if(playback){
                ui.create.me();
                ui.arena.style.display='none';
                ui.system.style.display='none';
                _status.playback=playback;
                localStorage.removeItem(lib.configprefix+'playback');
                var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
                store.get(parseInt(playback)).onsuccess=function(e){
                    if(e.target.result){
                        game.playVideoContent(e.target.result.video);
                    }
                    else{
                        alert('播放失败：找不到录像');
                        game.reload();
                    }
                }
                event.finish();
                return;
            }
            if(_status.connectMode){
                lib.configOL.guDingRenShu=true;
				game.waitForPlayer(function(){//联机人数确定
					switch(lib.configOL.versus_mode){
						case '2v2':lib.configOL.number=4;break;
						case '3v3':lib.configOL.number=6;break;
						case '4v4':lib.configOL.number=8;break;
					}
				});
			}
			else if(_status.mode=='two'){
				game.prepareArena(4);
			}else if(_status.mode=='three'){
				game.prepareArena(6);
			}else if(_status.mode=='four'){
				game.prepareArena(8);
			}
            game.delay(0.1);
            "step 1"
            if(_status.connectMode){
				game.randomMapOL();
			}
			else{
				for(var i=0;i<game.players.length;i++){
					game.players[i].getId();
				}
				game.chooseCharacter();
			}
            "step 2"
			if(_status.connectMode){
				_status.mode=lib.configOL.versus_mode;
                _status.onreconnect=[function(){
                    var players=game.players;
                    for(var i=0;i<players.length;i++){
                        if(players[i].side==true){
                            players[i].node.identity.firstChild.innerHTML='红';
                        }
                        else{
                            players[i].node.identity.firstChild.innerHTML='蓝';
                        }
                    }
                },];
			};
			var players=get.players(lib.sort.position);
			var info=[];
			for(var i=0;i<players.length;i++){
				info.push({
					name:players[i].name1,
					name2:players[i].name2,
					identity:players[i].node.identity.firstChild.innerHTML,
					color:players[i].node.identity.dataset.color,
                    side:players[i].side,
				});
			}
			_status.videoInited=true;
			info.push(false);
			game.addVideo('init',null,info);
			event.trigger('gameStart');
            'step 3'
            var firstChoose=(_status.firstAct||game.players.randomGet());
			game.gameDraw(firstChoose);
            game.phaseLoop(firstChoose);
        },
        game:{
            checkResult:function(me){
				if(game.players[0].side==true){
					if(game.hongShiQi<=0||game.lanXingBei>=game.xingBeiMax){
						game.over(false);
					}else if(game.lanShiQi<=0||game.hongXingBei>=game.xingBeiMax){
						game.over(true);
					}

				}
				else if(game.players[0].side==false){
					if(game.lanShiQi<=0||game.hongXingBei>=game.xingBeiMax){
						game.over(false);
					}else if(game.hongShiQi<=0||game.lanXingBei>=game.xingBeiMax){
						game.over(true);
					}
				}
			},
			checkOnlineResult:function(player){
				return game.players[0].side==player.side;
			},
            getRoomInfo:function(uiintro){
                switch(lib.configOL.team_sequence){
                    case 'random':uiintro.add('<div class="text chat">队伍顺序：随机');break;
                    case 'near':uiintro.add('<div class="text chat">队伍顺序：临近');break;
                    case 'crossed':uiintro.add('<div class="text chat">队伍顺序：交叉');break;
                    case 'CM':uiintro.add('<div class="text chat">队伍顺序：CM');break;
                }
				switch(lib.configOL.viewHandcard){
					case true:uiintro.add('<div class="text chat">可见队友手牌：是');break;
					case false:uiintro.add('<div class="text chat">可见队友手牌：否');break;
				}
				switch(lib.configOL.chooseSide){
					case true:uiintro.add('<div class="text chat">手动选择选队：是');break;
					case false:uiintro.add('<div class="text chat">手动选择选队：否');break;
				}
				var last=uiintro.add('<div class="text chat">出牌时限：'+lib.configOL.choose_timeout+'秒');
				if(lib.configOL.banned.length){
					last=uiintro.add('<div class="text chat">禁用角色：'+get.translation(lib.configOL.banned));
				}
				last.style.paddingBottom='8px';
			},
            getVideoName:function(){
				var str='梦境苏醒';
				var str2;
 				switch(_status.mode){
 					case 'two':str2='2v2';break;
 					case 'three':str2='3v3';break;
					case 'four':str2='4v4';break;
					case '2v2':str2='2v2';break;
					case '3v3':str2='3v3';break;
					case '4v4':str2='4v4';break;
				}
				if(game.me.side==true) str2+='红方';
				else str2+='蓝方';
				return [str,str2];
			},
            chooseSide:function(){
				var next=game.createEvent('chooseSide');
				next.setContent(function(){
					'step 0'
					var sides=['红方','蓝方'];
					var list=game.players.map(player=>[player,['选择阵营',[sides,'tdnodes']],true]);
					game.me.chooseButtonOL(list,function(){},function(){return 1+Math.random()}).set('switchToAuto',function(){
						_status.event.result='ai';
					}).set('processAI',function(){
						var buttons=_status.event.dialog.buttons;
						return {
							bool:true,
							links:[buttons.randomGet().link],
						}
					});
					'step 1'
					var red=0;
					var blue=0;
					var number=lib.configOL.number;
					for (var i in result) {//优先计算真人的选择
						//if(result[i].confirm!='ok') continue;
						if(!lib.playerOL[i].isOnline()) continue;
						if (result[i].links[0] == "红方") {
							lib.playerOL[i].side=true;
						}else{
							lib.playerOL[i].side=false;
						}

						if(lib.playerOL[i].side==true) red++;
						else blue++;
						if(red>number/2){
							lib.playerOL[i].side=false;
							red--;
						}
						else if(blue>number/2){
							lib.playerOL[i].side=true;
							blue--;
						}
					}

					for (var i in result) {//计算ai的选择
						//if(result[i].confirm=='ok') continue;
						if(lib.playerOL[i].isOnline()) continue;
						if (result[i].links[0] == "红方") {
							lib.playerOL[i].side=true;
						}else{
							lib.playerOL[i].side=false;
						}

						if(lib.playerOL[i].side==true) red++;
						else blue++;
						if(red>number/2){
							lib.playerOL[i].side=false;
							red--;
						}
						else if(blue>number/2){
							lib.playerOL[i].side=true;
							blue--;
						}
					}
				});
			},
			moveSeat:function(list,ref){
				var players=game.players;
				let trueToSwap = [];
				let falseToSwap = [];

				for (let i = 0; i < players.length; i++) {
					if (ref.side !== list[i]) {
						if (list[i] === true && ref.side === false) {
							trueToSwap.push(ref);
						} else if (list[i] === false && ref.side === true) {
							falseToSwap.push(ref);
						}
					}
					ref=ref.next;
				}
				while (trueToSwap.length > 0 && falseToSwap.length > 0) {
					const truePlayer = trueToSwap.pop();
					const falsePlayer = falseToSwap.pop();
					game.broadcastAll(function(truePlayer,falsePlayer){
						game.swapSeat(truePlayer,falsePlayer,false,false,true);
					},truePlayer,falsePlayer)
				}
			},
			getFirstRed:function(){
				var ref=game.players.randomGet();;
				while (ref.side!=true) {//确保红队第一个
					ref=ref.next;
				}
				return ref
			},
			teamSequenceList:function(){
				var number,team_sequence,mode;
				if(_status.connectMode){
					number=lib.configOL.number;
					team_sequence=lib.configOL.team_sequence;
					mode=lib.configOL.versus_mode;
					if(mode=='CM02'){
						team_sequence='CM';
					}
				}else{
					number=game.players.length;
					team_sequence=get.config('team_sequence');
				}
				
				var list=[];
				if(number==4){
					if(team_sequence=='CM'){
						list=[true,false,false,true];
					}else if(team_sequence=='near'){
						list=[true,true,false,false];
					}else if(team_sequence=='crossed'){
						list=[true,false,true,false];
					}else{
						list=[true,false,false,true];
						list.randomSort();
					}
				}else if(number==6){
					if(team_sequence=='CM'){
						list=[true,false,false,true,true,false];
					}else if(team_sequence=='near'){
						list=[true,true,true,false,false,false];
					}else if(team_sequence=='crossed'){
						list=[true,false,true,false,true,false];
					}else{
						list=[true,true,true,false,false,false];
						list.randomSort();
					}
				}else if(number==8){
					list=[true,true,true,false,false,false,true,false];
					list.randomSort();
				}
				return list;
			},
            chooseCharacter(){
                var next=game.createEvent('chooseCharacter');
				next.showConfig=true;
				next.setContent(function(){
					'step 0'
					var number=game.players.length;
					var choose_number=get.config('choose_number');
					ui.arena.classList.add('choose-character');
					
					var list=game.teamSequenceList();
					var ref=game.players.randomGet();
					for(var i=0;i<number;i++){
						ref.side=list[i];
						ref=ref.next;
					}
					
					var firstChoose=ref;
					_status.firstAct=firstChoose;
					for(var i=0;i<number;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						firstChoose=firstChoose.next;
					}

					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==true){
							game.players[i].node.identity.firstChild.innerHTML='红';
						}
						else if(game.players[i].side==false){
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}
					//22选将框分配
					var list=['zhiMengZhe'];

					var addSetting=function(dialog){
						dialog.add('选择座位').classList.add('add-setting');
						var seats=document.createElement('table');
						seats.classList.add('add-setting');
						seats.style.margin='0';
						seats.style.width='100%';
						seats.style.position='relative';
						for(var i=1;i<=game.players.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.innerHTML=get.cnNumber(i,true);
							td.link=i-1;
							seats.appendChild(td);
							if(get.distance(_status.firstAct,game.me,'absolute')===i-1){
								td.classList.add('bluebg');
							}
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;
								if(get.distance(_status.firstAct,game.me,'absolute')==this.link) return;
								var current=this.parentNode.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								this.classList.add('bluebg');
								_status.firstAct=game.me;
								var sideList=[]
								for(var i=0;i<game.players.length;i++){
									sideList.push(game.players[i].side);
								}
								for(var i=0;i<this.link;i++){
									_status.firstAct=_status.firstAct.previous;
								}
								var firstChoose=_status.firstAct;
								var start=firstChoose;
								for(var i=0;i<game.players.length;i++){
									start.side=sideList.shift();
									start=start.next;
								}
								
								/*
								var firstChoose=_status.firstAct;
								firstChoose.next.side=!firstChoose.side;
								firstChoose.next.next.side=!firstChoose.side;
								firstChoose.previous.side=firstChoose.side;
								*/
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].side==true){
										game.players[i].node.identity.firstChild.innerHTML='红';
									}
									else if(game.players[i].side==false){
										game.players[i].node.identity.firstChild.innerHTML='蓝';
									}
									game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
								}
								for(var i=0;i<number;i++){
									firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
									firstChoose=firstChoose.next;
								}
							});
						}
						dialog.content.appendChild(seats);
						if(game.me==game.zhu){
							seats.previousSibling.style.display='none';
							seats.style.display='none';
						}

						dialog.add(ui.create.div('.placeholder.add-setting'));
						dialog.add(ui.create.div('.placeholder.add-setting'));
						if(get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
					};
					var removeSetting=function(){
						var dialog=_status.event.dialog;
						if(dialog){
							dialog.style.height='';
							delete dialog._scrollset;
							var list=Array.from(dialog.querySelectorAll('.add-setting'));
							while(list.length){
								list.shift().remove();
							}
							ui.update();
						}
					};
					event.addSetting=addSetting;
					event.removeSetting=removeSetting;

					var basenum=1;
					var basestr='选择角色';

					var dialog=ui.create.dialog(basestr,[list,'character']);
					game.me.chooseButton(true,dialog,basenum).set('onfree',true);
					if(!_status.brawl||!_status.brawl.noAddSetting){
						if(get.config('change_identity')){
							addSetting(dialog);
						}
					}
					'step 1'
                    for(var i=0;i<game.players.length;i++){
                        game.players[i].init('zhiMengZhe');
                    }
					'step 2'
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
					var viewHandcard=get.config('viewHandcard');
					if(viewHandcard==true){
						game.addGlobalSkill('viewHandcard');
					}
				});
            },
            chooseCharacterOL:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					//获取顺位
					var chooseSide=lib.configOL.chooseSide;

					event.list=game.teamSequenceList();

					if(chooseSide){//自由选择队伍
						game.chooseSide();
					}
					'step 1'
					var team_sequence=lib.configOL.team_sequence;
					var chooseSide=lib.configOL.chooseSide;
					var number=lib.configOL.number;
					if(chooseSide){
						var ref=game.getFirstRed();
						if(team_sequence!='random'&&number!=8) game.moveSeat(event.list,ref);
					}else{
						var ref=game.players.randomGet();
						for(var i=0;i<number;i++){
							ref.side=event.list[i];
							ref=ref.next;
						}
					}
					
					var firstChoose=ref;
					_status.firstAct=firstChoose;
					for(var i=0;i<number;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						firstChoose=firstChoose.next;
					}

					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==true){
							game.players[i].node.identity.firstChild.innerHTML='红';
						}
						else if(game.players[i].side==false){
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}

					
					var map={};
					for(var i=0;i<number;i++){
						map[game.players[i].playerid]=[game.players[i].side,game.players[i].node.identity.firstChild.innerHTML,game.players[i].node.name.innerHTML];
					}

					var func=function(map){
						for(var i in map){
							var player=lib.playerOL[i];
							if(player){
								player.side=map[i][0];
								player.node.identity.firstChild.innerHTML=map[i][1];
								player.node.name.innerHTML=map[i][2];
								player.node.identity.dataset.color=player.side+'zhu';
							}
						}
					}


					game.broadcastAll(func,map);
                    'step 2'
                    for(var i in lib.playerOL){
						if(!lib.playerOL[i].name1){
							lib.playerOL[i].init('zhiMengZhe');
						}
						lib.playerOL[i].update();
					}
					game.broadcast(function(){
						for(var player of game.players){
							if(!player.name1){
								player.init('zhiMengZhe');
								player.update();
							}
						}
					});
					'step 3'
					var viewHandcard=lib.configOL.viewHandcard;
					if(viewHandcard==true){
						game.addGlobalSkill('viewHandcard');
					}
				});
			},
        },
        get:{
            rawAttitude:function(from,to){
                var num=6;
                return (from.side===to.side?num:-num);
            }
        },
	};
	game.addMode('mengJingSuXing',modeContent,modeConfig);
},help:{},config:{},package:{
    character: {
        connect: true,
        character: {
            zhiMengZhe: ["zhiMengZhe_name","huanGroup",5,["mengJingQieQu","memgJingBianZhi","mengJingRongHe","mingJingFuSu"],["des:织梦者从梦境中醒来的时候便遗忘了一切，她的所有记忆都是从梦境中获得的。","ext:织梦者/zhiMengZhe.jpg","die:ext:织梦者/audio/die/zhiMengZhe.mp3"]],
        },
        translate: {
            zhiMengZhe: "织梦者",
            "zhiMengZhe_name": "镜漪·忘川",
            "织梦者": "织梦者",
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
            mengJingQieQu: {
                type: "faShu",
                enable: ["faShu"],
                filter: function (event,player){
                    return player.countCards('h')>=2;
                },
                selectTarget: 1,
                selectCard: 2,
                filterCard: function (card){
                    return true;
                },
                discard: true,
                showCards: true,
                filterTarget: function (card,player,target){
                    return target!=player;
                },
                content: function (){
                    'step 0'
                    player.chooseSkill(target, function (info, skill) {
                        return !player.hasSkill(skill);
                    });
                    'step 1'
                    if (result.bool) {
                        var skill = result.skill;
                        player.addAdditionalSkill("mengJing", skill,true);
                        game.log(player, "获得了技能", skill);
                    }
                },
                "_priority": 0,
            },
            memgJingBianZhi: {
                trigger: {
                    player: "phaseBegin",
                },
                forced: true,
                init: function (player){
                    player.storage.skills=[];
                    for(var current in lib.character){
                        if(current!=player.name){
                            for(var i=0;i<lib.character[current][3].length;i++){
                                if(lib.character[current][3][i]!={}){
                                    player.storage.skills.add(lib.character[current][3][i]);
                                }
                            }

                        }
                    }
                },
                content: function (){
                    'step 0'
                    var skills=[];
                    for(var i of player.storage.skills){
                        if(!player.hasSkill(i)){
                            skills.push(i);
                        }
                    }
                    var skill=skills.randomGet();
                    player.addAdditionalSkill("mengJing", skill,true);
                    game.log(player, "获得了技能", skill);
                    'step 1'
                    if(player.additionalSkills['mengJing'].length>game.players.length+2){
                        var skils=player.additionalSkills['mengJing'];
                        var list=[];
                        for(var i=0;i<skils.length;i++){
                            if(lib.translate[skils[i]+'_info']){
                                var translation=get.translation(skils[i]);

                                list.push([skils[i],'<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+
                                translation+'】</div><div>'+lib.translate[skils[i]+'_info']+'</div></div>']);
                            }
                        }
                        var num=player.additionalSkills['mengJing'].length-game.players.length-2;
                        var next=player.chooseButton([
                            `移除${num}个技能`,
                            [list,'textbutton'],
                        ]);
                        next.set('selectButton',num);
                        next.set('forced',true);
                    }else{
                        event.finish();
                    }
                    'step 2'
                    var links=result.links;
                    for(var skill of links){
                        player.removeAdditionalSkill('mengJing',skill);
                    } 
                },
                "_priority": 0,
            },
            mengJingRongHe: {
                type: "faShu",
                enable: ["faShu"],
                filter: function (event,player){
                    return player.additionalSkills['mengJing'].length>=2;
                },
                chooseButton: {
                    dialog: function (event,player){
                        var dialog=ui.create.dialog('梦境融合','hidden');
                        
                        var skils=player.additionalSkills['mengJing'];
                        var list=[];
                        for(var i=0;i<skils.length;i++){
                            if(lib.translate[skils[i]+'_info']){
                                var translation=get.translation(skils[i]);

                                list.push([skils[i],'<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+
                                translation+'】</div><div>'+lib.translate[skils[i]+'_info']+'</div></div>']);
                            }
                        }
                        dialog.add([list,'textbutton']);
                        return dialog;
                    },
                    select: 2,
                    backup: function (links,player){
                        return{
                            links:links,
                            type:'faShu',
                            content:function(){
                                'step 0'
                                var links=lib.skill.mengJingRongHe_backup.links;
                                for(var skill of links){
                                    player.removeAdditionalSkill('mengJing',skill);
                                }
                                'step 1'
                                var skills=[];
                                for(var i of player.storage.skills){
                                    if(!player.hasSkill(i)){
                                        skills.push(i);
                                    }
                                }
                                var skill=skills.randomGet();
                                player.addAdditionalSkill("mengJing", skill,true);
                                game.log(player, "获得了技能", skill);
                            },
                        }
                    },
                },
                "_priority": 0,
            },
            mingJingFuSu: {
                type: "faShu",
                enable: ["faShu"],
                usable: 1,
                filter: function (event,player){
                    return player.canBiShaBaoShi();
                },
                content: function (){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    event.length=player.additionalSkills['mengJing'].length;
                    player.removeAdditionalSkill('mengJing');
                    'step 2'
                    var skills=[];
                    for(var i of player.storage.skills){
                        if(!player.hasSkill(i)){
                            skills.push(i);
                        }
                    }
                    var skill=skills.randomGets(event.length);
                    player.addAdditionalSkill("mengJing", skill,true);
                    game.log(player, "获得了技能", skill);
                },
                "_priority": 0,
            },
        },
        translate: {
            mengJingQieQu: "[法术]梦境窃取",
            "mengJingQieQu_info": "<span class='tiaoJian'>(弃2张牌[展示])</span>你选择一名其他角色复制其一个你没有的技能。",
            memgJingBianZhi: "[被动]梦境编制",
            "memgJingBianZhi_info": "<span class='tiaoJian'>(你的回合开始时)</span>你随机获得一个技能。<span class='tiaoJian'>(你的回合开始时，你获得的技能数大于(玩家数量+2))</span>你移除额外技能。",
            mengJingRongHe: "[法术]梦境融合",
            "mengJingRongHe_backup": "[法术]梦境融合",
            "mengJingRongHe_info": "<span class='tiaoJian'>(移除两个获得的技能)</span>你随机获得一个技能。",
            mingJingFuSu: "[法术]梦境复苏(回合限定)",
            "mingJingFuSu_info": "[宝石]你失去所有获得的技能，重新获得等量的技能。",
        },
    },
    intro: "玩弄技能的角色。游戏本体版本最低v1.0.2",
    author: "农之",
    diskURL: "",
    forumURL: "",
    version: "1.2",
},files:{"character":["zhiMengZhe.jpg"],"card":[],"skill":[],"audio":[]},connect:true}});