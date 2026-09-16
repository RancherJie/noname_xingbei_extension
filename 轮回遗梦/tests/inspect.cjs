(async()=>{
    const tabs=await(await fetch('http://127.0.0.1:9241/json')).json();
    const w=new WebSocket(tabs[0].webSocketDebuggerUrl);
    const expression=process.argv[2]||`(async()=>{
        const {game,lib,_status,ui}=await import('./noname.js');
        return {event:_status.event?.name,phase:game.phaseNumber,auto:_status.auto,
            controls:ui.controls.map(x=>x.innerText),players:game.players.map(p=>({name:p.name,sword:p.storage.lhym_sword,stones:p.countZhiShiWu('lhym_longJing'),energy:p.countNengLiangAll(),skills:p.getSkills()})),errors:window.__xingbeiSimulator?.errors};
    })()`;
    w.onopen=()=>w.send(JSON.stringify({id:1,method:'Runtime.evaluate',params:{expression,awaitPromise:true,returnByValue:true}}));
    w.onmessage=e=>{console.log(e.data);w.close();};
})().catch(console.error);
