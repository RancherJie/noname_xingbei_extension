// 独立实引擎定向夹具；注入手牌及资源，不计入自然胜率。
lib.skill.lhym_companionFixture={trigger:{player:'xingDongBegin'},forced:true,popup:false,priority:1000,
 filter:(e,p)=>p.name==='jingTian'&&!p.storage.lhym_companionFixture,
 content:async function(event,trigger,player){
  player.storage.lhym_companionFixture=true;
  try {
  const H=lib.lunHuiYiMeng,C=lib.lhymCompanion;
  const snow=game.players.find(p=>p.name==='xueJian'),kui=game.players.find(p=>p.name==='longKui'),foe=H.enemies(player)[0];
  const checks=[];const check=(ok,msg)=>{if(!ok)throw Error('Companion fixture: '+msg);checks.push(msg);};
  game.hongShiQi=1000;game.lanShiQi=1000;
  const card=x=>game.createCard2(({di:'diLieZhan',huo:'huoYanZhan',feng:'fengShenZhan'})[x],x);
  const empty=async p=>{if(p.countCards('h'))await p.discard(p.getCards('h'));};
  check(!!snow&&!!kui,'three companions in same team');
  for(const p of [player,snow,kui])for(const x of ['baoShi','shuiJing'])if(p.countNengLiang(x))await p.removeNengLiang(x,p.countNengLiang(x));
  await player.addNengLiang('baoShi',1);
  await player.addNengLiang('baoShi',1);
  check(snow.countNengLiang('shuiJing')+kui.countNengLiang('shuiJing')===1,'pawn gifts exactly one generated crystal');
  check(player.countNengLiang('shuiJing')===1,'pawn retains other crystal');
  const top=game.createCard2('huoYanZhan','huo');ui.cardPile.insertBefore(top,ui.cardPile.firstChild);
  await snow.addZhanJi('shuiJing',2);
  const oldBackup=lib.skill._tiLian_backup;
  const otherThieves=game.players.filter(p=>p.hasSkill('feiLongTanYunShou'));
  for(const p of otherThieves)p.removeSkill('feiLongTanYunShou');
  lib.skill._tiLian_backup=lib.skill._tiLian.chooseButton.backup(['shuiJing','shuiJing'],snow);
  try{await snow.useSkill('_tiLian_backup');}finally{lib.skill._tiLian_backup=oldBackup;for(const p of otherThieves)p.addSkill('feiLongTanYunShou');}
  check(ui.cardPile.firstChild===top,'companion refinement does not reveal or discard top card');
  check(player.countNengLiang('shuiJing')===2,'companion refinement transfers one crystal');
  // 护主：真实伤害、真实爆牌、真实士气结算。
  if(C.dew(snow).length)await snow.loseToDiscardpile(C.dew(snow).slice());
  check(C.dew(snow).length===0,'flower scenario starts empty');
  C.move(snow,player);await empty(player);player.zhiLiao=0;
  await player.gain(Array.from({length:player.getHandcardLimit()},()=>card('di')),'gain2');
  const before=get.shiQi(player.side);await player.faShuDamage(2,foe,'nocard');
  check(C.dew(snow).length===1,'flower intercepts one overflow card');
  check(get.shiQi(player.side)===before-1,'flower saves exactly one morale');
  await snow.useSkill('lhym_shenShu',[player]);check(H.state(player).stage===1,'free forge advances one stage');
  check(snow.getHandcardLimit()===4,'snow permanent cap minus two');
  // 神树照胆：普通主动攻击命中。
  await empty(foe);for(const t of game.players)if(t.getExpansions('_shengDun').length)await t.discard(t.getExpansions('_shengDun'),'_shengDun');
  C.move(snow,snow);player.zhiLiao=0;
  await empty(player);
  const evasion=foe.hasSkill('xianFengYunTiShu');if(evasion)foe.removeSkill('xianFengYunTiShu');
  const attack=card('huo');await player.gain(attack,'gain2');
  try{await player.useCard(attack,[attack],[foe]);}finally{if(evasion)foe.addSkill('xianFengYunTiShu');}
  check(C.holder(snow)===player&&player.zhiLiao>=1,'sword hit moves flower and heals');
  // 红衣残影虚拟攻击，经真实 chooseToUse/backup 流程。
  await empty(kui);C.form(kui,true);const shadow=card('di');await kui.addGaiPai([shadow],'lhym_canYingPai');
  await empty(foe);
  await kui.gongJi().set('forced',true).set('filterTarget',(c,p,t)=>t===_status.event.lhymFoe).set('lhymFoe',foe);
  check(!C.shadows(kui).includes(shadow),'red shadow consumed by real attack action');
  check(C.red(kui),'original-element boost retains red form');
  H.state(player).weapon='魔剑';H.sync(player);
  for(const target of H.enemies(player))await empty(target);
  const borrowed=card('huo');await player.addGaiPai([borrowed],'lhym_soul');
  await empty(kui);const reserve=game.createCard2('shengDun','shui');await kui.gain([card('di'),reserve],'gain2');C.form(kui,true);
  const oldShadows=C.shadows(kui).length;
  await kui.useSkill('lhym_hongYing');
  check(!H.souls(player).includes(borrowed),'borrowed sword soul is spent');
  check(C.shadows(kui).length===oldShadows+1,'borrowed attack triggers unwilling-to-return shadow refill');
  check(kui.getCards('h').includes(reserve),'borrowed attack no longer discards replacement soul');
  check(!lib.skill.lhym_cangFeng.filter({yingZhan:false,lhym_borrowed:true,cards:[borrowed]},kui),'borrowed sword cannot be recaptured by cangfeng');
  game.log('Companion fixture PASS',checks.join('；'));
  window.__lhymCompanionChecks=checks;
  game.over(player.side===game.me.side);
  } catch(error) {
   // 测试失败记入报告并结束本次夹具，不弹窗挂住用户正在工作的桌面。
   const message=String(error.stack||error);game.log('Companion fixture FAILED',message);
   window.__lhymCompanionFailure=message;
   if(window.__xingbeiSimulator?.errors)window.__xingbeiSimulator.errors.push(message);
   game.over(false);
  }
 }};
game.finishSkill('lhym_companionFixture');game.addGlobalSkill('lhym_companionFixture');
