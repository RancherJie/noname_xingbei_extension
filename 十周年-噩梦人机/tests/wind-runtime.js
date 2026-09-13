lib.skill.windRuntimeFixture={
 trigger:{global:'phaseBegin'},forced:true,firstDo:true,priority:10000,popup:false,
 filter:(event,player)=>player===game.me&&!window.__windDone&&_status.auto&&window.__xingbeiSimulator.accelerated,
 content:async function(event,trigger,player){
  window.__windDone=true;
  const {lib,game}=await import('./noname.js');
  const skill=lib.skill.nightmare_kuangFengZhouYu;
  const checks=[];
  const check=(name,pass)=>checks.push({name,pass:!!pass});
  player.addSkill('nightmare_kuangFengZhouYu');
  await skill.subSkill.reset.content({},null,player);
  const target=game.players.find(p=>p.side!==player.side);
  async function attack(response,miss){
   if(target.countCards('h'))await target.discard(target.getCards('h'));
   const card=game.createCard('huoYanZhan','huo','huan');
   await player.gain(card);
   window.__windMiss=miss;
   const next=player.useCard(card,target);
   next.yingZhan=response;
   next.canYingZhan=false;next.canShengGuang=false;next.canShengDun=false;
   await next;
   return next.damageNum;
  }
  await attack(false,true);
  check('miss does not stack',!player.storage.nightmareJiFengCount);
  await attack(false,false);
  check('active hit stacks',player.storage.nightmareJiFengCount===1);
  const second=await attack(false,false);
  check('later active damage increases',second>=3);
  check('second hit stacks again',player.storage.nightmareJiFengCount===2);
  await attack(true,false);
  check('response hit stacks',player.storage.nightmareJiFengCount===3);
  await skill.subSkill.reset.content({},null,player);
  check('reset clears count',player.storage.nightmareJiFengCount===0);
  player.storage.nightmareJiFengCount=2;player.removeSkill('nightmare_kuangFengZhouYu');
  check('removal clears count',player.storage.nightmareJiFengCount===undefined);
  game.log(checks.every(c=>c.pass)?'WIND_RUNTIME_PASS':'WIND_RUNTIME_FAIL',JSON.stringify(checks));
 }
};
lib.skill.windRuntimeMiss={
 trigger:{global:'shouDaoGongJiBefore'},forced:true,firstDo:true,priority:99999,popup:false,
 filter:()=>!!window.__windMiss,
 content:async function(event,trigger){window.__windMiss=false;trigger.weiMingZhong();}
};
game.addGlobalSkill('windRuntimeFixture');game.addGlobalSkill('windRuntimeMiss');
