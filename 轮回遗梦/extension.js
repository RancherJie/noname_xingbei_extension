/* AUDIO_PACK_RUNTIME_BEGIN */
/* Audio JSON runtime v2. Source: tools/audio-pack/runtime.js; bundled into each extension. */
(function (root) {
    'use strict';
    if (root.NonameAudioPacks && root.NonameAudioPacks.format === 2) return;
    function sha256(bytes) {
        var k = [], h = [], n = 2;
        while (k.length < 64) {
            var prime = true;
            for (var d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
            if (prime) {
                if (h.length < 8) h.push((Math.sqrt(n) % 1 * 4294967296) | 0);
                k.push((Math.pow(n, 1 / 3) % 1 * 4294967296) | 0);
            }
            n++;
        }
        var length = Math.ceil((bytes.length + 9) / 64) * 64;
        var padded = new Uint8Array(length);
        padded.set(bytes); padded[bytes.length] = 128;
        var view = new DataView(padded.buffer);
        view.setUint32(length - 8, Math.floor(bytes.length / 536870912));
        view.setUint32(length - 4, (bytes.length * 8) >>> 0);
        function r(x, c) { return (x >>> c) | (x << (32 - c)); }
        for (var offset = 0; offset < length; offset += 64) {
            var w = new Int32Array(64);
            for (var i = 0; i < 64; i++) {
                if (i < 16) w[i] = view.getInt32(offset + i * 4);
                else {
                    var x = w[i - 15], y = w[i - 2];
                    w[i] = (w[i - 16] + (r(x, 7) ^ r(x, 18) ^ (x >>> 3)) + w[i - 7] + (r(y, 17) ^ r(y, 19) ^ (y >>> 10))) | 0;
                }
            }
            var a = h[0], b = h[1], c = h[2], dd = h[3], e = h[4], f = h[5], g = h[6], hh = h[7];
            for (i = 0; i < 64; i++) {
                var t1 = (hh + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + k[i] + w[i]) | 0;
                var t2 = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
                hh = g; g = f; f = e; e = (dd + t1) | 0; dd = c; c = b; b = a; a = (t1 + t2) | 0;
            }
            [a, b, c, dd, e, f, g, hh].forEach(function (v, j) { h[j] = (h[j] + v) | 0; });
        }
        return h.map(function (v) { return ('00000000' + (v >>> 0).toString(16)).slice(-8); }).join('');
    }
    async function hash(bytes) {
        if (root.crypto && root.crypto.subtle) {
            var value = new Uint8Array(await root.crypto.subtle.digest('SHA-256', bytes));
            return Array.from(value).map(function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
        }
        return sha256(bytes);
    }
    function ascii(text) {
        var bytes = new Uint8Array(text.length);
        for (var i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) > 127) throw new Error('音频 JSON 不是原始 ASCII 数据');
            bytes[i] = text.charCodeAt(i);
        }
        return bytes;
    }
    function safe(path) {
        if (typeof path !== 'string' || /[\\:\x00-\x1f]/.test(path) || path.split('/').some(function (p) { return !p || p === '.' || p === '..'; })) throw new Error('非法音频路径: ' + path);
        return path;
    }
    function buffer(value) {
        return ArrayBuffer.isView(value) ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength) : new Uint8Array(value);
    }
    // Cordova's writeFile does not truncate a previously longer file. Truncate only
    // after writing, then verify the actual bytes with the client's readFile API.
    async function truncateCordova(path, length) {
        if (typeof root.resolveLocalFileSystemURL !== 'function') return;
        var base = root.localStorage.getItem('noname_inited');
        if (!base || base === 'nodejs') return;
        await new Promise(function (resolve, reject) {
            root.resolveLocalFileSystemURL(base + path, function (entry) {
                entry.createWriter(function (writer) {
                    writer.onerror = reject;
                    writer.onwriteend = resolve;
                    writer.truncate(length);
                }, reject);
            }, reject);
        });
    }
    function notice(name) {
        if (!root.document) return { update: function () {}, remove: function () {} };
        var node = root.document.createElement('div');
        node.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.9);color:white;display:flex;align-items:center;justify-content:center;font-size:20px;white-space:pre-wrap;text-align:center;';
        node.textContent = name + '：正在检查音频资源…';
        (root.document.body || root.document.documentElement).appendChild(node);
        return {
            update: function (done, total) { node.textContent = name + '：正在还原音频 ' + done + '/' + total + '\n所有扩展完成后自动重启，请勿关闭游戏。'; },
            remove: function () { node.remove(); },
        };
    }
    var queue = Promise.resolve(), pending = new Map();
    var changed = false, failed = false, restartScheduled = false;
    async function install(meta, game, options) {
        options = options || {};
        var base = 'extension/' + safe(meta.name);
        var storage = options.storage || root.localStorage;
        var text = await game.promises.readFileAsText(base + '/audio-data/manifest.json');
        if (await hash(ascii(text)) !== meta.sha256) throw new Error('音频清单 SHA-256 不匹配，请完整更新扩展');
        var manifest = JSON.parse(text);
        if (manifest.format !== 2 || !Array.isArray(manifest.files) || !Array.isArray(manifest.bundles)) throw new Error('无效音频清单');
        var key = 'noname-audio-pack-v2:' + meta.name;
        var previous;
        try { previous = JSON.parse(storage.getItem(key) || 'null'); } catch (_) {}
        if (!options.force && previous && previous.version === manifest.version && previous.manifest === meta.sha256 && manifest.files.every(function (file) {
            return previous.files && previous.files[file.path] === file.sha256;
        })) return false;
        var index = 0, position = 0, bytes = null, hashes = Object.create(null), directories = new Set();
        for (var bundle of manifest.bundles) {
            safe(bundle.name);
            text = await game.promises.readFileAsText(base + '/audio-data/' + bundle.name);
            if (text.length !== bundle.size || await hash(ascii(text)) !== bundle.sha256) throw new Error('音频数据包 SHA-256 不匹配: ' + bundle.name);
            var body = JSON.parse(text);
            if (body.format !== 2 || !Array.isArray(body.records)) throw new Error('无效音频数据包');
            for (var record of body.records) {
                var file = manifest.files[index];
                if (!file || safe(record.path) !== file.path || record.offset !== position) throw new Error('音频分片顺序错误');
                if (!bytes) {
                    if (!Number.isSafeInteger(file.size) || file.size < 0) throw new Error('无效音频长度');
                    bytes = new Uint8Array(file.size);
                }
                var raw = root.atob(record.base64);
                if (position + raw.length > bytes.length) throw new Error('音频长度超限');
                for (var j = 0; j < raw.length; j++) bytes[position++] = raw.charCodeAt(j);
                if (position !== file.size) continue;
                if (await hash(bytes) !== file.sha256) throw new Error('音频 SHA-256 不匹配: ' + file.path);
                var target = base + '/' + safe(file.path), split = target.lastIndexOf('/');
                var parts = target.slice(0, split).split('/');
                for (j = 1; j <= parts.length; j++) {
                    var directory = parts.slice(0, j).join('/');
                    if (!directories.has(directory)) {
                        await game.promises.createDir(directory);
                        directories.add(directory);
                    }
                }
                await game.promises.writeFile(bytes.buffer, target.slice(0, split), target.slice(split + 1));
                await truncateCordova(target, bytes.length);
                var written = buffer(await game.promises.readFile(target));
                if (written.length !== file.size || await hash(written) !== file.sha256) throw new Error('写入校验失败: ' + file.path);
                hashes[file.path] = file.sha256;
                index++; position = 0; bytes = null;
                if (options.onProgress) options.onProgress(index, manifest.files.length);
                // Let the browser paint progress during long voice-pack installations.
                await new Promise(function (resolve) { root.setTimeout(resolve, 0); });
            }
        }
        if (index !== manifest.files.length || bytes) throw new Error('音频数据包不完整');
        storage.setItem(key, JSON.stringify({ version: manifest.version, manifest: meta.sha256, files: hashes }));
        return true;
    }
    function prepare(meta, lib, game) {
        if (pending.has(meta.name)) return pending.get(meta.name);
        if (!Array.isArray(lib.onprepare)) return Promise.reject(new Error('客户端缺少 onprepare 启动钩子'));
        if (!restartScheduled) {
            restartScheduled = true;
            lib.onprepare.push(async function () {
                await queue;
                if (changed && !failed) game.reload();
            });
        }
        var task = queue.then(async function () {
            var progress = notice(meta.name);
            try {
                if (await install(meta, game, { onProgress: progress.update })) changed = true;
            } catch (error) {
                failed = true;
                console.error('[音频还原失败] ' + meta.name, error);
                if (root.alert) root.alert(meta.name + ' 音频还原失败，下次启动会重试：' + (error.message || error));
                throw error;
            } finally { progress.remove(); }
        });
        queue = task.catch(function () {});
        pending.set(meta.name, task);
        task.catch(function () { pending.delete(meta.name); });
        return task;
    }
    root.NonameAudioPacks = {
        format: 2, sha256: sha256, install: install, prepare: prepare,
        wrap: function (meta, factory) {
            return function (lib, game, ui, get, ai, _status) {
                var object = factory.apply(this, arguments);
                object.audioPackMetadata = meta;
                object.audioPackOriginalPrecontent = object.precontent;
                object.precontent = async function () {
                    await globalThis.NonameAudioPacks.prepare(this.audioPackMetadata, lib, game);
                    if (this.audioPackOriginalPrecontent) return this.audioPackOriginalPrecontent.apply(this, arguments);
                };
                return object;
            };
        },
    };
})(typeof globalThis !== 'undefined' ? globalThis : window);

/* AUDIO_PACK_RUNTIME_END */
game.import("extension", globalThis.NonameAudioPacks.wrap({"name":"轮回遗梦","sha256":"30f3d1b641b40f2ec9fd459c95e73e6d822dbaa39a4faf23823803dfe042a039"}, function(lib, game, ui, get, ai, _status) {
    'use strict';
    const menuTrack='ext:轮回遗梦/audio/bgm/yuJianJiangHu.mp3';
    const sharedMenuKey='lhym_suMing_menu_random';
    const sharedMenuTracks=['ext:宿命挽歌/audio/bgm/yunGuHeFeng.mp3',menuTrack];
    lib.lhymMenuMusicKey=sharedMenuKey;
    lib.lhymBattleMusic={
        chooseTrack:function(){
            const matches=(id)=>game.hasPlayer(p=>p.isIn()&&[p.name,p.name1,p.name2].includes(id));
            if(matches('jingTian'))return 'ext:轮回遗梦/audio/bgm/yuManTang.mp3';
            if(matches('longKui')){
                const red=game.hasPlayer(p=>p.isIn()&&[p.name,p.name1,p.name2].includes('longKui')&&p.storage.lhym_red===true);
                return 'ext:轮回遗梦/audio/bgm/'+(red?'zhuShaBian':'qingYuAn')+'.mp3';
            }
            if(matches('xueJian'))return 'ext:轮回遗梦/audio/bgm/huanHunCao.mp3';
            return null;
        },
        playTrack:function(src){
            game.broadcastAll(function(track){
                if(!_status.lhymBgmStarted){
                    _status.lhymHadTempMusic=Object.prototype.hasOwnProperty.call(_status,'tempMusic');
                    _status.lhymOriginalTempMusic=_status.tempMusic;
                }
                _status.lhymBgmStarted=true;
                _status.tempMusic=track;
                game.playBackgroundMusic();
                if(ui.backgroundMusic&&lib.config.background_music!=='music_off'){
                    ui.backgroundMusic.loop=true;
                    ui.backgroundMusic.currentTime=0;
                    const playing=ui.backgroundMusic.play();
                    if(playing?.catch)playing.catch(function(){});
                }
            },src);
        },
    };
    // Explicit speech queue: standard skill audio remains false to prevent double playback.
    const V=lib.lhymVoice={
        files:["audio/skill/jingTian/choose_magic.mp3","audio/skill/jingTian/choose_sword.mp3","audio/skill/jingTian/yongAn.mp3","audio/skill/jingTian/dianDang.mp3","audio/skill/jingTian/feiLong.mp3","audio/skill/jingTian/zhuJian.mp3","audio/skill/jingTian/huiYan.mp3","audio/skill/jingTian/yinDan.mp3","audio/skill/jingTian/renJian.mp3","audio/skill/jingTian/jingHua.mp3","audio/skill/jingTian/canYing.mp3","audio/skill/jingTian/complete_magic.mp3","audio/skill/jingTian/recipe_0.mp3","audio/skill/jingTian/recipe_1.mp3","audio/skill/jingTian/recipe_2.mp3","audio/skill/jingTian/recipe_3.mp3","audio/skill/jingTian/recipe_4.mp3","audio/skill/jingTian/recipe_5.mp3","audio/skill/jingTian/recipe_6.mp3","audio/skill/jingTian/recipe_7.mp3","audio/skill/jingTian/recipe_8.mp3","audio/skill/jingTian/recipe_9.mp3","audio/skill/jingTian/recipe_10.mp3","audio/skill/jingTian/zhaoDan.mp3","audio/skill/jingTian/forge_1.mp3","audio/skill/jingTian/forge_2.mp3","audio/skill/jingTian/forge_3.mp3","audio/skill/jingTian/fengMang.mp3","audio/skill/jingTian/houFa.mp3","audio/skill/jingTian/poZhen.mp3","audio/skill/jingTian/lianZhan.mp3","audio/skill/jingTian/leiDong.mp3","audio/skill/jingTian/baHuang.mp3","audio/skill/jingTian/gift_snow.mp3","audio/skill/jingTian/gift_kui.mp3","audio/skill/jingTian/take_snow.mp3","audio/skill/jingTian/take_kui.mp3","audio/skill/jingTian/flower.mp3","audio/skill/jingTian/resonance.mp3","audio/skill/jingTian/gouMai.mp3","audio/skill/jingTian/heCheng.mp3","audio/skill/xueJian/huaYing.mp3","audio/skill/xueJian/huZhu.mp3","audio/skill/xueJian/wuDu.mp3","audio/skill/xueJian/wuDu_pearl.mp3","audio/skill/xueJian/lvBo.mp3","audio/skill/xueJian/tianLing.mp3","audio/skill/xueJian/shenShu.mp3","audio/skill/xueJian/gift.mp3","audio/skill/xueJian/take.mp3","audio/skill/xueJian/flower.mp3","audio/skill/xueJian/complete_sword.mp3","audio/skill/xueJian/gouMai.mp3","audio/skill/xueJian/heCheng.mp3","audio/skill/xueJian/tiLian.mp3","audio/skill/longKui/start_blue.mp3","audio/skill/longKui/cangFeng.mp3","audio/skill/longKui/moJianHuTi.mp3","audio/skill/longKui/twin_blue.mp3","audio/skill/longKui/qianNian_blue.mp3","audio/skill/longKui/qianNian_red.mp3","audio/skill/longKui/youLan.mp3","audio/skill/longKui/twin_reply.mp3","audio/skill/longKui/daiJun.mp3","audio/skill/longKui/buYuan.mp3","audio/skill/longKui/twin_red.mp3","audio/skill/longKui/huanGui.mp3","audio/skill/longKui/hongYing.mp3","audio/skill/longKui/gift_blue.mp3","audio/skill/longKui/take_blue.mp3","audio/skill/longKui/gift_red.mp3","audio/skill/longKui/take_red.mp3","audio/skill/longKui/resonance_blue.mp3","audio/skill/longKui/resonance_red.mp3","audio/skill/longKui/complete_blue.mp3","audio/skill/longKui/complete_red.mp3","audio/skill/longKui/gouMai_blue.mp3","audio/skill/longKui/heCheng_blue.mp3","audio/skill/longKui/tiLian_blue.mp3","audio/skill/longKui/gouMai_red.mp3","audio/skill/longKui/heCheng_red.mp3","audio/skill/longKui/tiLian_red.mp3"],
        seen:new WeakMap(),sequence:0,received:new Set(),queue:[],busy:false,maxWait:5000,maxPlayback:20000,
        say(p,key,event){this.batch(p,[key],event);},
        batch(p,keys,event){
            if(event&&typeof event==='object'){
                let used=this.seen.get(event);if(!used)this.seen.set(event,used=new Set());
                const key=(p.playerid||p.name||'')+':'+keys.join('|');
                if(used.has(key))return;used.add(key);
            }
            game.broadcastAll(function(token,lines,queuedAt){
                const v=lib.lhymVoice;if(!v||!lib.config.background_speak||v.received.has(token))return;
                v.received.add(token);if(v.received.size>2048)v.received.delete(v.received.values().next().value);
                v.queue.push(...lines.map(key=>({key,queuedAt})));v.pump();
            },Date.now()+':'+(++this.sequence),keys,Date.now());
        },
        pump(){
            if(this.busy||!this.queue.length)return;
            if(!lib.config.background_speak){this.queue.length=0;return;}
            let item=this.queue.shift();
            while(item&&Date.now()-item.queuedAt>this.maxWait)item=this.queue.shift();
            if(!item)return;
            this.busy=true;const key=item.key;let done=false,timer;
            const next=()=>{if(done)return;done=true;clearTimeout(timer);this.busy=false;this.pump();};
            try{
                const audio=game.playAudio({path:'ext:轮回遗梦/audio/skill/'+key+'.mp3'});
                if(!audio||!audio.addEventListener){next();return;}
                audio.addEventListener('ended',next,{once:true});audio.addEventListener('error',next,{once:true});
                timer=setTimeout(()=>{audio.pause();audio.remove();next();},this.maxPlayback);
            }catch(error){next();}
        },
        transfer(p,t,kind,event){
            const snow=[t.name,t.name1,t.name2].includes('xueJian');
            this.batch(p,['jingTian/'+kind+'_'+(snow?'snow':'kui'),snow?'xueJian/'+kind:'longKui/'+kind+'_'+(C.red(t)?'red':'blue')],event);
        },
        complete(p,event){
            const s=H.state(p);if(s.weapon!=='魔剑'||s.faces.length!==10||s.voiceComplete)return;
            s.voiceComplete=true;p.syncStorage('lhym_sword');
            const kui=game.players.find(t=>t.side===p.side&&t.hasSkill('lhym_jianZhongRen'));
            this.batch(p,['jingTian/complete_magic',...(kui?['longKui/complete_'+(C.red(kui)?'red':'blue')]:[])],event);
        },
        forge(p,event){
            const s=H.state(p);if(s.stage<1||s.stage>3)return;
            const keys=['jingTian/forge_'+s.stage];
            if(s.stage===3&&!s.voiceComplete){
                s.voiceComplete=true;p.syncStorage('lhym_sword');
                if(game.players.some(t=>t.side===p.side&&t.hasSkill('lhym_huaYing')))keys.push('xueJian/complete_sword');
            }
            this.batch(p,keys,event);
        },
    };
    // 独立命名空间；不依赖宿命挽歌或修改本体原型。
    const H = lib.lunHuiYiMeng = {
        elements: ['shui', 'huo', 'lei', 'feng', 'di'],
        labels: {shui:'水', huo:'火', lei:'雷', feng:'风', di:'地'},
        recipes: [
            ['凝寒雪',['shui'], '对一名对手造成1点法术伤害③，指定一名我方角色+1【治疗】。'],
            ['燎天火',['huo'], '对一名对手造成2点法术伤害③。'],
            ['惊魂雷',['lei'], '对一名对手造成1点法术伤害③，你+1【宝石】。'],
            ['乱刃风',['feng'], '对一名对手造成1点法术伤害③，你+1【攻击行动】。'],
            ['裂地岩',['di'], '对一名对手造成1点法术伤害③，你+1【法术行动】。'],
            ['幻水惊雷',['shui','lei'], '我方所有角色获得【威力赐福】，你额外+1【攻击行动】。'],
            ['风水流转',['shui','feng'], '移除我方所有角色面前的【中毒】和【虚弱】，你额外+1【攻击行动】或【法术行动】。'],
            ['流光诛仙斩',['feng','huo','lei'], '对所有对手各造成3点法术伤害③。'],
            ['万灵还神光',['shui','feng','di'], '我方所有角色无视上限各+2【治疗】。'],
            ['极咒返阴阳',['shui','lei','feng','di'], '移除我方所有角色面前的【中毒】和【虚弱】，我方所有角色无视上限各+2【治疗】，你额外+1【攻击行动】或【法术行动】。'],
            ['天地元灵斩',['shui','huo','lei','feng','di'], '对所有对手各造成4点法术伤害③。'],
        ],
        branches: [
            ['lhym_fengMang','lhym_houFa'],
            ['lhym_poZhen','lhym_lianZhan'],
            ['lhym_leiDong','lhym_baHuang'],
        ],
        state(p) { return p.storage.lhym_sword || {weapon:null, faces:[], stage:0, branches:[]}; },
        sync(p) {
            p.syncStorage('lhym_sword');
            H.syncMarks(p);
            if(typeof C!=='undefined') C.refreshAllBonds();
        },
        lampState(p, element) {
            const faces=H.state(p).faces;
            const yin=faces.includes(element+'_yin'), yang=faces.includes(element+'_yang');
            return yin ? (yang ? 'both' : 'yin') : (yang ? 'yang' : 'empty');
        },
        lampText(p, element) {
            const faces=H.state(p).faces;
            return H.labels[element]+'灵灯：阴面'+(faces.includes(element+'_yin')?'已激活':'未激活')+
                '；阳面'+(faces.includes(element+'_yang')?'已激活':'未激活')+'。';
        },
        syncMarks(p) {
            const state=H.state(p), desired=[];
            if(state.weapon==='魔剑') {
                desired.push('lhym_moJianMark');
                desired.push('lhym_moRoute');
                for(const element of H.elements) desired.push('lhym_wuLing_'+element+'_'+H.lampState(p,element));
            } else if(state.weapon==='镇妖剑') {
                desired.push('lhym_zhenYaoJianMark');
                desired.push('lhym_zhenRoute');
            }
            const all=['lhym_moRoute','lhym_zhenRoute','lhym_moJianMark','lhym_zhenYaoJianMark'];
            for(const element of H.elements) for(const status of ['empty','yin','yang','both']) all.push('lhym_wuLing_'+element+'_'+status);
            for(const id of all) {
                if(desired.includes(id)) {
                    if(!p.hasSkill(id)) p.addSkill(id);
                    p.markSkill(id);
                } else if(p.hasSkill(id)) p.removeSkill(id);
            }
            const lamps=desired.filter(id=>id.startsWith('lhym_wuLing_'));
            game.broadcastAll(function(player, ids) {
                if(!player?.node || !player.marks) return;
                let box=player.node.lhymWuLingMarks;
                if(!ids.length) {
                    if(box) box.remove();
                    delete player.node.lhymWuLingMarks;
                    return;
                }
                if(!box) {
                    box=ui.create.div('.lhym-wuLing-marks',player);
                    player.node.lhymWuLingMarks=box;
                    Object.assign(box.style,{
                        position:'absolute',left:'50%',top:'5px',width:'142px',height:'26px',zIndex:'4',
                        transform:'translateX(-50%)',
                        pointerEvents:'none',
                    });
                }
                ids.forEach(function(id,index) {
                    const node=player.marks[id];
                    if(!node) return;
                    node.classList.add('lhym-wuLing-mark');
                    node.classList.remove('drawinghidden');
                    if(node.parentNode!==box) box.appendChild(node);
                    Object.assign(node.style,{
                        position:'absolute',left:'0',top:'0',margin:'0',width:'26px',height:'26px',
                        transform:'translateX('+(index*29)+'px)',pointerEvents:'auto',opacity:'1',
                    });
                });
            },p,lamps);
        },
        enemies(p) { return game.filterPlayer(t => t.side !== p.side); },
        team(p) { return game.filterPlayer(t => t.side === p.side); },
        souls(p) { return p.getExpansions('lhym_soul'); },
        setPortrait(p, file, character='jingTian') {
            game.broadcastAll(function(target, image, characterId) {
                const setNode = function(node) {
                    if(node) node.setBackgroundImage('extension/轮回遗梦/' + image);
                };
                let activeNode;
                if(target.name === characterId || target.name1 === characterId) {
                    activeNode=target.node?.avatar;
                    setNode(activeNode);
                }
                if(target.name2 === characterId) {
                    activeNode=target.node?.avatar2;
                    setNode(activeNode);
                }
                if(target === game.me && ui.fakeme && activeNode) {
                    ui.fakeme.style.backgroundImage = activeNode.style.backgroundImage;
                }
            }, p, file, character);
        },
        material(card, face) {
            const [element, side] = face.split('_');
            if(side === 'yin' && get.name(card) === 'anMie') return true;
            if(side === 'yang' && get.name(card) === 'shengGuang') return true;
            return get.xiBie(card) === element && get.type(card) === (side === 'yin' ? 'gongJi' : 'faShu');
        },
        faces(p, cards) {
            const done = H.state(p).faces;
            return H.elements.flatMap(x => [x+'_yin', x+'_yang'])
                .filter(f => !done.includes(f) && (!cards || cards.some(c => H.material(c,f))));
        },
        faceLabel(f) { const [x,y] = f.split('_'); return H.labels[x]+(y==='yin'?'阴面':'阳面'); },
        useful(p,card) {
            const s = H.state(p);
            return s.weapon === '魔剑' ? H.faces(p,[card]).length > 0 :
                s.weapon === '镇妖剑' && s.stage < 3 && get.xiBie(card) === 'lei';
        },
        canForge(p) {
            const s = H.state(p), n = s.stage;
            return s.weapon === '镇妖剑' && n < 3 &&
                p.countZhiShiWu('lhym_longJing') >= [1,1,2][n] &&
                p.countCards('h', c => get.xiBie(c)==='lei') >= n+1;
        },
        unlocked(p,r) { return r[1].every(x => ['yin','yang'].every(y => H.state(p).faces.includes(x+'_'+y))); },
        available(p) {
            return H.recipes.filter(r => H.unlocked(p,r) &&
                r[1].every(x => H.souls(p).some(c => get.xiBie(c) === x)) &&
                (r[1].length === 1 || p.countCards('h') > 0));
        },
        damageScore(p,t,n) {
            const actual=Math.max(0,n-(t.zhiLiao||0));
            const spill = Math.max(0,t.countCards('h') + actual - t.getHandcardLimit());
            const forge=actual>0 && H.state(p).weapon==='魔剑' && H.faces(p).length && p.countZhiShiWu('lhym_longJing')<4;
            return spill*2 + Math.min(n,t.zhiLiao||0)*0.3 + actual*0.2 + (forge?1.5:0);
        },
        materialNeed(p,c) {
            if(!H.useful(p,c)) return 0;
            if(H.state(p).weapon==='镇妖剑') return 6;
            return Math.max(0,...H.faces(p,[c]).map(f=>{
                const [x,y]=f.split('_');
                return (H.state(p).faces.includes(x+'_'+(y==='yin'?'yang':'yin'))?12:4)+
                    (x==='di'?3:x==='feng'?2:0);
            }));
        },
        afterRecipe(p,r) {
            const souls=H.souls(p).slice(),hand=p.getCards('h').slice();
            for(const x of r[1]) { const i=souls.findIndex(c=>get.xiBie(c)===x); if(i>=0)souls.splice(i,1); }
            if(r[1].length>1 && hand.length) {
                hand.sort((a,b)=>H.handCost(p,b)-H.handCost(p,a));hand.shift();
            }
            const attacks=hand.filter(c=>get.type(c)==='gongJi');
            const attack=Math.max(0,...attacks.flatMap(c=>H.enemies(p).map(t=>H.comboHit(p,t,c)*H.damageScore(p,t,2))));
            const another=H.recipes.some(next=>H.unlocked(p,next) && next[1].every(x=>souls.some(c=>get.xiBie(c)===x)) &&
                (next[1].length===1||hand.length>0));
            const damageCard=hand.some(c=>['moDan','zhongDu'].includes(get.name(c)) && H.enemies(p).some(t=>H.forgeDamageScore(p,t,c)>0));
            return {attack:Math.min(2,attack),spell:another?1.5:damageCard?1:0,souls};
        },
        shouldBoost(p,r) {
            const base=r[0]==='燎天火'?2:1, enemies=H.enemies(p);
            if(r[0]==='裂地岩') return !enemies.some(t=>(t.zhiLiao||0)<base) && enemies.some(t=>(t.zhiLiao||0)<base+1);
            const now=Math.max(0,...enemies.map(t=>H.damageScore(p,t,base+1)-H.damageScore(p,t,base)));
            const remaining=H.souls(p).filter(c=>get.xiBie(c)===r[1][0]).length;
            return now>(remaining<=2?2.5:1.5);
        },
        healScore(t,n) { return Math.max(0,Math.min(n,t.getZhiLiaoLimit()-(t.zhiLiao||0))); },
        recipeScore(p,r) {
            const name=r[0], team=H.team(p), enemies=H.enemies(p);
            const hit=n => Math.max(0,...enemies.map(t=>H.damageScore(p,t,n)));
            const {attack,spell}=H.afterRecipe(p,r);
            const clean = team.reduce((v,t)=>v+t.getExpansions('_zhongDu').length+t.getExpansions('_xuRuo').length*2,0);
            const heal=(n,unlimited)=>team.reduce((v,t)=>v+(unlimited?n:H.healScore(t,n)),0);
            if(name==='凝寒雪') return hit(1)+Math.max(0,...team.map(t=>H.healScore(t,1)));
            if(name==='燎天火') return hit(2);
            if(name==='惊魂雷') return hit(1)+(p.countEmptyNengLiang()>0?1.5:0);
            if(name==='乱刃风') return hit(1)+attack;
            if(name==='裂地岩') return hit(1)+spell;
            if(name==='幻水惊雷') return team.filter(t=>!t.hasJiChuXiaoGuo('weiLiCiFu_xiaoGuo')&&!t.hasJiChuXiaoGuo('lhym_weiLiBlessing')).length*1.5+attack-0.4;
            if(name==='风水流转') return clean+Math.max(attack,spell)-0.4;
            if(name==='万灵还神光') return heal(2,true)-0.4;
            if(name==='极咒返阴阳') return clean+heal(2,true)+Math.max(attack,spell)-0.6;
            return enemies.reduce((v,t)=>v+H.damageScore(p,t,name==='天地元灵斩'?4:3),0)-0.6;
        },
        faceScore(p,f) {
            const [x,y]=f.split('_');
            const other=x+'_'+(y==='yin'?'yang':'yin');
            const half=H.state(p).faces.includes(other), hand=p.getCards('h');
            const pair=p.countZhiShiWu('lhym_longJing')>=2 && hand.some(c=>H.material(c,f) &&
                hand.some(d=>d!==c&&H.material(d,other)));
            return (half?80:pair?40:0) +
                Math.min(5,H.souls(p).filter(c=>get.xiBie(c)===x).length) + ({huo:2,lei:1.8,feng:10,di:12,shui:1.4}[x]);
        },
        preferPurify(p) {
            return H.state(p).weapon==='魔剑' && p.countZhiShiWu('lhym_longJing')>=1 &&
                H.faces(p,p.getCards('h')).length>0 && H.startupSafe(p,1);
        },
        startupSafe(p,n) {
            if(p.countNengLiang&&H.canSilver(p)) return true;
            if(H.state(p).weapon==='魔剑'&&H.available(p).some(r=>r[1].length===1)) return true;
            // 保守预留：即使费用全部取自可行动牌，也至少剩下一张合法行动牌。
            return p.getCards('h').filter(c=>H.isActionCard(c)&&get.name(c)!=='shengGuang'&&
                lib.filter.cardEnabled(c,p)&&[p,...H.enemies(p)].some(t=>p.canUseXingBei(c,t))).length>n;
        },
        comboReady(p) {
            // 仅规划本人主动行动；已有专用法术行动时先兑现，不再为了连招延后施法。
            const e=_status.event;
            return _status.currentPhase===p && !e?.yingZhan && !e?.getParent?.('_yingZhan',true) &&
                H.state(p).weapon==='魔剑' && !(p.storage.faShu>0) &&
                H.available(p).some(r=>H.recipeScore(p,r)>0);
        },
        needsForgeDamage(p) {
            const e=_status.event;
            return _status.currentPhase===p && !e?.yingZhan && !e?.getParent?.('_yingZhan',true) &&
                H.state(p).weapon==='魔剑' && H.faces(p).length>0 && p.countZhiShiWu('lhym_longJing')<4;
        },
        magicTurn(p) {
            const e=_status.event;
            return _status.currentPhase===p && H.state(p).weapon==='魔剑' &&
                !e?.yingZhan && e?.name!=='_yingZhan' && !e?.getParent?.('_yingZhan',true);
        },
        isActionCard(c) {
            // effect.player也会收到技能ID/技能载荷；cardEnabled只接受存在卡牌定义的牌。
            return !!c && typeof c==='object' && !!lib.card[get.name(c)];
        },
        reserveYang(p,c) {
            if(!H.isActionCard(c)) return false;
            if(!['shengDun','xuRuo'].includes(get.name(c))) return false;
            const face=get.xiBie(c)+'_yang';
            return H.elements.includes(get.xiBie(c)) && !H.state(p).faces.includes(face) &&
                !p.getCards('h').some(other=>other!==c && get.name(other)!=='shengGuang' &&
                    get.xiBie(other)===get.xiBie(c) && get.type(other)==='faShu');
        },
        hasDamageSpell(p) {
            const e=_status.event;
            // 专用攻击行动不能改成法术；不得因此把所有攻击都压成零分。
            if(e?.name==='gongJi'||e?.getParent?.('gongJi',true)) return false;
            return H.silverForge(p) || H.available(p).some(r=>(r[1].length===1 || ['流光诛仙斩','天地元灵斩'].includes(r[0])) && H.recipeScore(p,r)>0) || p.getCards('h').some(c=>
                ['moDan','zhongDu'].includes(get.name(c)) &&
                H.enemies(p).some(t=>H.forgeDamageScore(p,t,c)>0));
        },
        bestHit(p,c) { return Math.max(0,...H.enemies(p).map(t=>H.comboHit(p,t,c))); },
        reserveAttack(p,c) {
            const x=get.xiBie(c);
            if(get.type(c)!=='gongJi'||!['di','feng'].includes(x)||H.state(p).faces.includes(x+'_yin')) return false;
            if(p.getCards('h').some(o=>o!==c&&get.type(o)==='gongJi'&&get.xiBie(o)===x)) return false;
            if(H.bestHit(p,c)<0.7) return true;
            return p.getCards('h').some(o=>o!==c&&get.type(o)==='gongJi'&&
                (!['di','feng'].includes(get.xiBie(o))||H.state(p).faces.includes(get.xiBie(o)+'_yin'))&&H.bestHit(p,o)>=0.7);
        },
        silverForge(p) {
            return !!p.countNengLiang && H.canSilver(p) && H.state(p).weapon==='魔剑' &&
                H.faces(p).length>0 && p.countZhiShiWu('lhym_longJing')<4 &&
                H.enemies(p).some(t=>(t.zhiLiao||0)<p.countNengLiang('shuiJing'));
        },
        attackScore(p,t,c) {
            const hit=H.comboHit(p,t,c);
            if(!hit) return 0;
            const blind=p.getExpansions('tiMoZhiMang').length>0;
            const damage=blind?0:H.damageScore(p,t,2);
            const follow=H.comboReady(p)?1.5:0;
            return hit*(damage+follow+0.2);
        },
        forgeDamageScore(p,t,c) {
            if(!H.isActionCard(c)) return 0;
            if(!t || !t.isIn() || t.side===p.side || !lib.filter.cardEnabled(c,p) || !p.canUseXingBei(c,t)) return 0;
            const treatment=Math.max(0,t.zhiLiao||0), name=get.name(c);
            if(get.type(c)==='gongJi') return treatment>=2?0:H.comboHit(p,t,c);
            if(name==='moDan') {
                // 魔弹可能被传走；只按保守预期加分，保留本体的方向与目标限制。
                if(t.getExpansions('_shengDun').length) return 0;
                return treatment>=(game.moDan||2)?0.25:0.65;
            }
            // 中毒延后结算，不等同于当场获得龙精石；已有毒时降低重复投资。
            if(name==='zhongDu') return (treatment<1?0.55:0.25)/(1+t.getExpansions('_zhongDu').length);
            return 0;
        },
        comboHit(p,t,c) {
            if(!H.isActionCard(c)) return 0;
            if(!t || !t.isIn() || t.side===p.side || get.type(c)!=='gongJi' ||
                !lib.filter.cardEnabled(c,p) || !p.canUseXingBei(c,t)) return 0;
            // 只读公开圣盾与手牌张数，不检查敌方隐藏手牌。暗灭不能应战，但仍可能被圣光抵挡。
            if(t.getExpansions('_shengDun').length) return 0;
            const n=t.countCards('h');
            if(n===0) return 0.95;
            if(get.xiBie(c)==='an') return Math.max(0.55,0.9-n*0.045);
            return n===1?0.8:n===2?0.65:0.5*Math.pow(0.75,n-3);
        },
        handCost(p,c) { return 8-get.value(c,p)-H.materialNeed(p,c)+(p.countCards('h')>=p.getHandcardLimit()?2:0); },
        materialValue(p,c) {
            if(!c || !H.useful(p,c)) return 0;
            const s=H.state(p);
            if(s.weapon==='镇妖剑') return p.countCards('h',card=>get.xiBie(card)==='lei')<=s.stage+1?2:0.5;
            const faces=H.faces(p,[c]);
            return faces.some(f=>H.faceScore(p,f)>=40)?2:0.7;
        },
        canSilver(p) {
            const a=p.countNengLiang('baoShi');
            return a>0 && p.countNengLiang('shuiJing')>0 && H.enemies(p).length>=a;
        },
        async target(p,prompt,n) {
            const ts=(await p.chooseTarget(prompt,true,(c,p,t)=>t.side!==p.side)
                .set('ai',t=>{ var H = lib.lunHuiYiMeng; var p = _status.event["online_9304_p"]; var n = _status.event["online_9304_n"]; return H.damageScore(p,t,n); }).set("online_9304_p", p).set("online_9304_n", n).forResultTargets() || []);
            return ts && ts[0];
        },
        async clear(t) {
            for(const tag of ['_zhongDu','_xuRuo']) {
                const cards=t.getExpansions(tag);
                if(cards.length) await t.discard(cards,tag);
            }
            // 核心毒来源以实体牌为键保存，移除后清理悬空来源。
            if(!t.getExpansions('_zhongDu').length) t.storage.zhongDu=[];
        },
        async bless(t,p) {
            if(t.hasJiChuXiaoGuo('weiLiCiFu_xiaoGuo')||t.hasJiChuXiaoGuo('lhym_weiLiBlessing')) return;
            const effect=lib.skill.weiLiCiFu_xiaoGuo?'weiLiCiFu_xiaoGuo':'lhym_weiLiBlessing';
            if(!t.hasSkill(effect)) t.addSkill(effect);
            // 本体【威力赐福】以盖牌为基础效果；生成即逝标记牌以复用原效果。
            const card=game.createCard('shengGuang');
            await t.addJiChuXiaoGuo(card,p,effect);
        },
        async cast(p,r,boost) {
            const name=r[0];V.say(p,'jingTian/recipe_'+H.recipes.findIndex(x=>x[0]===name),_status.event);
            // 具体配方已支付完费用：同步显示实际招式，不额外触发 logSkill 的发动事件。
            p.trySkillAnimate('lhym_moJianJi',name);
            game.log(p,'发动', '【'+name+'】');
            if(r[1].length===1) {
                const n=(name==='燎天火'?2:1)+(boost?1:0);
                const target=await H.target(p,name+'：选择对手',n);
                if(target) await target.faShuDamage(n,p,'nocard');
                if(name==='凝寒雪') {
                    const ts=(await p.chooseTarget('凝寒雪：一名我方角色+1治疗',true,(c,p,t)=>t.side===p.side)
                        .set('ai',t=>{ var H = lib.lunHuiYiMeng; return H.healScore(t,1); }).forResultTargets() || []);
                    if(ts?.[0]) await ts[0].changeZhiLiao(1,p);
                }
                if(name==='惊魂雷') await p.addNengLiang('baoShi',1);
                if(name==='乱刃风') p.addGongJi();
                if(name==='裂地岩') p.addFaShu();
                return;
            }
            if(name==='流光诛仙斩'||name==='天地元灵斩') {
                for(const t of H.enemies(p).sortBySeat(p)) if(t.isIn()) await t.faShuDamage(name==='天地元灵斩'?4:3,p,'nocard');
                return;
            }
            for(const t of H.team(p).sortBySeat(p)) {
                if(name==='风水流转'||name==='极咒返阴阳') await H.clear(t);
                if(name==='幻水惊雷') await H.bless(t,p);
                if(name==='万灵还神光'||name==='极咒返阴阳') await t.changeZhiLiao(2,Infinity,p);
            }
            if(name==='幻水惊雷') p.addGongJi();
            if(name==='风水流转'||name==='极咒返阴阳') p.addGongJiOrFaShu();
        },
        routeText(p) {
            const s=H.state(p);
            if(s.weapon==='魔剑') {
                return [
                    get.translation('lhym_renJian')+'：'+get.translation('lhym_renJian_info'),
                    get.translation('lhym_jingHua')+'：'+get.translation('lhym_jingHua_info'),
                    get.translation('lhym_moJianJi')+'：'+get.translation('lhym_moJianJi_info'),
                    get.translation('lhym_canYing')+'：'+get.translation('lhym_canYing_info'),
                    get.translation('lhym_yinYang')+'：'+get.translation('lhym_yinYang_info'),
                    get.translation('lhym_jianPo')+'：'+get.translation('lhym_jianPo_info'),
                    get.translation('lhym_qianNianGongMing')+'：'+get.translation('lhym_qianNianGongMing_info'),
                ].join('<br><br>');
            }
            if(s.weapon==='镇妖剑') {
                const items = [
                    get.translation('lhym_zhaoDan')+'：'+get.translation('lhym_zhaoDan_info'),
                    get.translation('lhym_chongZhu')+'：'+get.translation('lhym_chongZhu_info'),
                    get.translation('lhym_shenShuZhaoDan')+'：'+get.translation('lhym_shenShuZhaoDan_info'),
                ];
                if(s.branches.length) {
                    items.push('<b>当前修复</b>：'+s.stage+'/3阶段');
                    const branchNames={
                        lhym_fengMang:'被动【锋芒毕露】',
                        lhym_houFa:'被动【后发制人】',
                        lhym_poZhen:'响应【镇妖破阵】',
                        lhym_lianZhan:'响应【御剑追锋】',
                        lhym_leiDong:'被动【九霄雷动】',
                        lhym_baHuang:'响应【剑荡八荒】',
                    };
                    for(const branch of s.branches) {
                        items.push((branchNames[branch]||get.translation(branch))+'：'+get.translation(branch+'_info'));
                    }
                } else {
                    items.push('<b>当前修复</b>：'+s.stage+'/3阶段');
                }
                return items.join('<br><br>');
            }
            return '尚未选择武器';
        },
        async collect(p,cards) {
            cards=[...new Set(cards)].filter(c=>get.position(c,true)==='d' && H.elements.includes(get.xiBie(c)));
            if(!cards.length || !p.hasSkill('lhym_soul')) return;
            cards=cards.filter(c=>get.position(c,true)==='d');
            if(!cards.length) return;
            p.logSkill('lhym_renJian');V.say(p,'jingTian/renJian',_status.event);
            await p.addGaiPai(cards,'lhym_soul');
            const all=H.souls(p);
            if(all.length>10) {
                const overflow=all.length-10;
                const drop=(await p.chooseCardButton(all,'剑魂上限10：选择丢弃的'+overflow+'张',overflow,true)
                    .set('ai',b=>{
                        var H = lib.lunHuiYiMeng;
                        var p = _status.event["online_13554_p"];

                        const same=H.souls(p).filter(c=>get.xiBie(c)===get.xiBie(b.link)).length;
                        return same*0.6 + get.value(b.link,p)*0.08;
                    }).set("online_13554_p", p).forResultLinks() || []);
                if(drop?.length===overflow) await p.discard(drop,'lhym_soul');
            }
            H.sync(p);
        },
    };
    const skill = {
        lhym_weiLiBlessing:{
            mark:true,marktext:'威',intro:{content:'jiChuXiaoGuo'},
            tag:{jiChuXiaoGuo:true},
            onremove:function(player,skill){
                const cards=player.getGaiPai(skill);
                if(cards.length) player.loseToDiscardpile(cards);
            },
            trigger:{source:'gongJiMingZhong'},priority:-1,forced:true,
            filter:function(event,player){return player.hasGaiPai('lhym_weiLiBlessing');},
            content:async function(event,trigger,player){
                await player.discard(player.getGaiPai('lhym_weiLiBlessing'),'lhym_weiLiBlessing').set('visible',true);
                trigger.changeDamageNum(2);
                player.removeSkill('lhym_weiLiBlessing');
            },
        },
        lhym_bgm:{
            charlotte:true,trigger:{global:'gameStart'},forced:true,popup:false,
            firstDo:true,priority:90,
            filter:function(){return !_status.suMingWanGeBgmStarted&&!_status.lhymBgmStarted&&
                !!lib.lhymBattleMusic.chooseTrack();},
            content:function(){
                const music=lib.lhymBattleMusic.chooseTrack();
                if(music)lib.lhymBattleMusic.playTrack(music);
            },
        },
        lhym_actionVoice:{
            trigger:{player:['gouMai','heCheng','tiLian','_tiLian_backupAfter']},forced:true,popup:false,charlotte:true,firstDo:true,
            filter:function(event,player){return [player.name,player.name1,player.name2].some(function(id){return id==='jingTian'||id==='xueJian'||id==='longKui';});},
            content:function(event,trigger,player){
                var action=event.triggername||trigger.name;
                var ids=[player.name,player.name1,player.name2];
                var companion=ids.includes('xueJian')||ids.includes('longKui');
                if(action==='tiLian'&&companion)return;
                if(action==='_tiLian_backupAfter'){
                    if(!companion||trigger.lhym_feiLongTaken)return;
                    action='tiLian';
                }
                if(!['gouMai','heCheng','tiLian'].includes(action))return;
                if(ids.includes('jingTian')){
                    lib.lhymVoice.say(player,action==='tiLian'?'jingTian/zhuJian':'jingTian/'+action,event);
                }else if(ids.includes('xueJian')){
                    lib.lhymVoice.say(player,'xueJian/'+action,event);
                }else if(ids.includes('longKui')){
                    lib.lhymVoice.say(player,'longKui/'+action+'_'+(lib.lhymCompanion.red(player)?'red':'blue'),event);
                }
            },
        },
        lhym_shuangJian: {
            trigger:{global:'gameStart'}, forced:true, priority:5,
            filter:(e,p)=>!H.state(p).weapon,
            content:async function(event,trigger,player) {
                const weapon=await player.chooseControl('魔剑','镇妖剑').set('prompt','双剑宿缘：选择本局武器（不可更改）')
                    .set('ai',()=>{ var player=_status.event.online_14250_player; return game.players.some(function(current){ return current.side===player.side&&[current.name,current.name1,current.name2].includes('xueJian'); })?'镇妖剑':'魔剑'; }).set('online_14250_player',player).forResultControl();
                player.storage.lhym_sword={weapon,faces:[],stage:0,branches:[]};V.say(player,weapon==='魔剑'?'jingTian/choose_magic':'jingTian/choose_sword',event);
                if(!player.hasSkill('lhym_sword')) player.addSkill('lhym_sword');
                // 路线技能由“魔剑/镇妖剑”专属剑容器通过 group 承载，
                // 不再逐个 addSkill 到角色技能列表，避免角色面板重复显示。
                if(weapon === '镇妖剑') H.setPortrait(player, 'jingTian_zhenYaoJian.png');
                H.sync(player);
            },
        },
        lhym_yongAn: {
            mod:{maxNengLiang:(p,n)=>n+2},
            trigger:{player:'teShuEnd'},forced:true,group:'lhym_yongAnStart',
            content:async function(event,trigger,player) { V.say(player,'jingTian/yongAn',event);
                await player.addNengLiang('baoShi',1);
            },
            ai:{baoShi:true,shuiJing:true},
        },
        lhym_yongAnStart: {
            trigger:{global:'gameStart'},forced:true,popup:false,
            content:async function(event,trigger,player) { V.say(player,'jingTian/yongAn',event); await player.addNengLiang('shuiJing',2); },
        },
        lhym_dianDang: {
            trigger:{player:'changeNengLiangBefore'},direct:true,priority:10,
            filter:(e,p)=>e.xingShi==='baoShi'&&e.num>0,
            content:async function(event,trigger,player) {
                const count=trigger.num;
                let converted=0;
                for(let i=0;i<count;i++) {
                    const yes=await player.chooseBool('典当：将第'+(i+1)+'颗宝石改为2水晶？')
                        .set('ai',()=>{ var player = _status.event["online_15765_player"]; return player.countEmptyNengLiang()>=2 && player.countNengLiang('shuiJing')<3 &&
                            (player.countNengLiang('baoShi')+_status.event.lhymKept>0); }).set("online_15765_player", player).set('lhymKept',i-converted)
                        .forResultBool();
                    if(yes) converted++;
                }
                trigger.num=count-converted;
                if(converted) {
                    player.logSkill('lhym_dianDang');
                    // 先保留未典当宝石的容量，避免先加水晶挤占后令原事件超上限。
                    const capacity=Math.max(0,player.countEmptyNengLiang()-trigger.num);
                    let grant=converted*2, gifted=false;
                    if(player.hasSkill('lhym_suYuan')&&game.hasPlayer(t=>t!==player&&C.isCompanion(t)&&t.countEmptyNengLiang()>0)){
                        const targets=await player.chooseTarget('宿缘相应：将本次典当的1颗水晶给予雪见或龙葵？',
                            (c,p,t)=>t!==p&&lib.lhymCompanion.isCompanion(t)&&t.countEmptyNengLiang()>0)
                            .set('ai',t=>t.side===_status.event.player.side?2:-2).forResultTargets()||[];
                        if(targets[0]){player.logSkill('lhym_suYuan',targets[0]);await targets[0].addNengLiang('shuiJing',1);grant--;gifted=true;V.transfer(player,targets[0],'gift',event);}
                    }
                    if(!gifted)V.say(player,'jingTian/dianDang',event);
                    if(capacity>0&&grant>0) await player.addNengLiang('shuiJing',Math.min(capacity,grant));
                }
            },
        },
        lhym_feiLong: {
            init:p=>p.tempBanSkill('_tiLian','forever'),
            onremove:p=>{delete p.storage.temp_ban__tiLian;},
            trigger:{global:'_tiLian_backupEnd'},forced:true,
            filter:(e,p)=>e.player!==p && p.countEmptyNengLiang()>0 &&
                ['baoShi','shuiJing'].some(x=>(e.lhym_refined?.[x]||0)>0 && e.player.countNengLiang(x)>0),
            content:async function(event,trigger,player) {
                if(!(player.hasSkill('lhym_suYuan')&&lib.lhymCompanion.isCompanion(trigger.player))){
                    V.say(player,'jingTian/feiLong',event);
                    const cards=get.cards(1);
                    await player.showCards(cards,'飞龙探云手');
                    await game.cardsDiscard(cards);
                    if(!cards[0]||get.type(cards[0])!=='faShu') return;
                }
                const types=['baoShi','shuiJing'].filter(x=>(trigger.lhym_refined?.[x]||0)>0 && trigger.player.countNengLiang(x)>0);
                if(!types.length||player.countEmptyNengLiang()<1) return;
                const x=types.length===1 ? types[0] :
                    await player.chooseControl(types).set('prompt','飞龙探云手：选择取得本次提炼所得的1颗星石')
                        .set('ai',()=>{ var types = _status.event["online_17510_types"]; return types.includes('shuiJing')?'shuiJing':types[0]; }).set("online_17510_types", types).forResultControl();
                if(!types.includes(x)) return;
                const before=trigger.player.countNengLiang(x);
                await trigger.player.removeNengLiang(x,1);
                await player.addNengLiang(x,1);
                if(C.isCompanion(trigger.player)&&trigger.player.countNengLiang(x)<before)
                    trigger.lhym_feiLongTaken=true;
                if(player.hasSkill('lhym_suYuan')&&C.isCompanion(trigger.player))V.transfer(player,trigger.player,'take',event);
            },
        },
        // 提炼事务账本：只记提炼本体直接产生的实际增量；后续支出优先扣该批。
        lhym_refineBegin: {
            trigger:{global:'tiLian'},forced:true,popup:false,priority:100,
            filter:(e,p)=>e.player===p,
            content:async function(event,trigger,player) {
                trigger.lhym_refined={baoShi:0,shuiJing:0};
                trigger.player._lhym_refine=trigger;
            },
        },
        lhym_energyBefore: {
            trigger:{global:'changeNengLiangBefore'},forced:true,popup:false,priority:100,
            filter:(e,p)=>e.player===p,
            content:async function(event,trigger,player) {
                trigger._lhym_before=trigger.player.countNengLiang(trigger.xingShi);
            },
        },
        lhym_energyAfter: {
            trigger:{global:'changeNengLiangAfter'},forced:true,popup:false,priority:100,
            filter:(e,p)=>e.player===p&&!!e.player._lhym_refine,
            content:async function(event,trigger,player) {
                const txn=trigger.player._lhym_refine, x=trigger.xingShi;
                const delta=trigger.player.countNengLiang(x)-(trigger._lhym_before??trigger.player.countNengLiang(x));
                if(delta>0&&trigger.getParent()===txn) txn.lhym_refined[x]+=delta;
                else if(delta<0) txn.lhym_refined[x]=Math.max(0,txn.lhym_refined[x]+delta);
            },
        },
        lhym_refineEnd: {
            trigger:{global:'_tiLian_backupAfter'},forced:true,popup:false,lastDo:true,
            filter:(e,p)=>e.player===p,
            content:async function(event,trigger,player) { delete trigger.player._lhym_refine; },
        },
        lhym_zhuJian: {
            group:'lhym_longJing',
            mod:{aiOrder:function(player,card,num) {
                var H=lib.lunHuiYiMeng;
                if(!H.magicTurn(player)) return;
                if(card==='lhym_moJianJi') return Math.max(num,5.2);
                if(!H.isActionCard(card)) return;
                if(H.reserveYang(player,card)) return -1;
                if(H.reserveAttack(player,card)) return -1;
                if(['shengDun','xuRuo'].includes(get.name(card))&&H.hasDamageSpell(player)) return 0.5;
                if(get.type(card)==='gongJi') {
                    if(H.bestHit(player,card)>=0.7 && H.enemies(player).some(t=>H.comboHit(player,t,card)>=0.7&&H.attackScore(player,t,card)>0.5)) return Math.max(num,6);
                    if(H.hasDamageSpell(player)) return 1;
                    return;
                }
                var score=Math.max(0,...H.enemies(player).map(t=>H.forgeDamageScore(player,t,card)));
                if(score>0) return Math.max(num,get.name(card)==='moDan'?5:4.8);
            }},
            ai:{effect:{player:function(card,player,target) {
                var H=lib.lunHuiYiMeng;
                if(!H.isActionCard(card)||!H.magicTurn(player)) return;
                if(H.reserveYang(player,card)) return 'zeroplayertarget';
                if(H.reserveAttack(player,card)) return 'zeroplayertarget';
                if(['shengDun','xuRuo'].includes(get.name(card))&&H.hasDamageSpell(player)) return 'zeroplayertarget';
                if(get.type(card)==='gongJi') {
                    var hit=H.comboHit(player,target,card),best=H.bestHit(player,card);
                    if(best>=0.7) return hit>=0.7?[0,H.attackScore(player,target,card),0,0]:'zeroplayertarget';
                    if(H.hasDamageSpell(player)) return 'zeroplayertarget';
                    // 低命中后备不能退回本体的爆牌收益评分。
                    var candidates=H.enemies(player).filter(t=>H.comboHit(player,t,card)>0);
                    var fewest=Math.min(...candidates.map(t=>t.countCards('h')));
                    if(!hit || target.countCards('h')!==fewest) return 'zeroplayertarget';
                    return [0,H.attackScore(player,target,card),0,0];
                }
                var score=H.forgeDamageScore(player,target,card);
                if(score>0) return [1,4+3*score];
            }}},
            init:p=>{
                if(!p.hasSkill('lhym_longJing')) p.addSkill('lhym_longJing');
            },
            trigger:{source:'chengShouShangHaiAfter'},forced:true,
            filter:(e,p)=>e.num>0&&p.countZhiShiWu('lhym_longJing')<4,
            content:async function(event,trigger,player) { V.say(player,'jingTian/zhuJian',event);
                if(!player.hasSkill('lhym_longJing')) player.addSkill('lhym_longJing');
                await player.addZhiShiWu('lhym_longJing',1);
            },
        },
        lhym_longJing:{
            charlotte:true,mark:true,
            markimage:'extension/轮回遗梦/mark_longJingShi.png',
            intro:{name:'龙精石',content:'持有#枚龙精石（上限4）',max:4}
        },
        lhym_sword:{charlotte:true,init:p=>H.syncMarks(p)},
        lhym_huiYan: {
            type:'qiDong',trigger:{player:'qiDong'},
            filter:(e,p)=>!!H.state(p).weapon&&p.canBiShaShuiJing()&&game.hasPlayer(t=>{
                const linked=H.state(p).weapon==='魔剑'&&t.hasSkill('lhym_qianNian');
                return t!==p&&(t.countCards('h')>0||(linked&&t.getExpansions('lhym_canYingPai').length>0));
            }),
            check:(e,p)=>{ var H = lib.lunHuiYiMeng; return !H.preferPurify(p) && p.countCards('h')<p.getHandcardLimit()-1 &&
                (H.state(p).weapon==='魔剑'?H.faces(p).length>0:H.state(p).stage<3); },
            content:async function(event,trigger,player) { V.say(player,'jingTian/huiYan',event);
                const ts=(await player.chooseTarget('慧眼识珍：选择交牌的角色',true,(c,p,t)=>{
                    const linked=lib.lunHuiYiMeng.state(p).weapon==='魔剑'&&t.hasSkill('lhym_qianNian');
                    return t!==p&&(t.countCards('h')>0||(linked&&t.getExpansions('lhym_canYingPai').length>0));
                })
                    .set('ai',t=>t.countCards('h')).forResultTargets() || []);
                const target=ts?.[0]; if(!target) return;
                await player.removeBiShaShuiJing();
                let shadows=[];
                if(H.state(player).weapon==='魔剑'&&target.hasSkill('lhym_qianNian')&&C.shadows(target).length){
                    shadows=await C.pick(target,C.shadows(target),'千年相随：可用1张残影替代慧眼交牌',1,target.countCards('h')===0);
                    if(shadows.length)target.logSkill('lhym_qianNian',player);
                }
                const cards=shadows.length?shadows:(await target.chooseCard('h',1,true,'慧眼识珍：选择交给景天的牌【展示】')
                    .set('ai',c=>{ var H = lib.lunHuiYiMeng; var player = _status.event["online_21080_player"]; var target = _status.event["online_21080_target"]; return H.materialNeed(player,c)*3+H.handCost(target,c); }).set("online_21080_player", player).set("online_21080_target", target).forResultCards() || []);
                if(!cards?.length) return;
                const reward=H.useful(player,cards[0]);
                await target.showCards(cards,'慧眼识珍');
                await target.give(cards,player);
                if(shadows.length){V.say(target,'longKui/qianNian_'+(C.red(target)?'red':'blue'),event);await C.lightFace(player,cards[0]);}
                if(reward) await target.addNengLiang('baoShi',1);
            },
        },
        lhym_yinDan: {
            type:'faShu',enable:'faShu',filter:(e,p)=>H.canSilver(p),
            filterTarget:(c,p,t)=>p.side!==t.side,
            selectTarget:()=>_status.event.player.countNengLiang('baoShi'),multitarget:true,multiline:true,
            content:async function(event,trigger,player) { V.say(player,'jingTian/yinDan',event);
                const a=player.countNengLiang('baoShi'), b=player.countNengLiang('shuiJing');
                if(!H.canSilver(player)||event.targets?.length!==a) return;
                await player.removeNengLiang('baoShi',a);
                await player.removeNengLiang('shuiJing',b);
                for(const t of event.targets.slice().sortBySeat(player)) if(t.isIn()) await t.faShuDamage(b,player,'nocard');
            },
            ai:{order:4.8,baoShi:true,shuiJing:true,result:{target:(p,t)=>{ var H = lib.lunHuiYiMeng; return -H.damageScore(p,t,p.countNengLiang('shuiJing')); },
                player:p=>H.silverForge(p)||p.countNengLiang('shuiJing')>=2?1:-1}},
        },
        lhym_soul:{
            charlotte:true,
            markimage:'extension/轮回遗梦/mark_jianHun.png',
            intro:{name:'剑魂',markcount:'gaiPai',mark:function(dialog,storage,owner){
                const cards=H.souls(owner);
                const isJingTian=[owner.name,owner.name1,owner.name2].includes('jingTian');
                const dragonViewer=isJingTian&&game.players.some(p=>p.isIn()&&
                    [p.name,p.name1,p.name2].includes('longKui')&&C.localViewer(p));
                if(cards.length&&(C.localViewer(owner)||dragonViewer)){
                    dialog.addText('角色专有盖牌');
                    dialog.addAuto(cards);
                    return false;
                }
                return cards.length?'共有'+cards.length+'张牌':'没有卡牌';
            }},
            mod:{cardEnabled2:(c,p)=>{if(c.hasGaintag?.('lhym_soul')) return false;}},
            onremove:p=>{const cards=H.souls(p); if(cards.length) p.loseToDiscardpile(cards);},
        },
        lhym_renJian: {
            charlotte:true,
            trigger:{player:'loseAfter'},forced:true,popup:false,
            filter:e=>e.hs?.length>0&&(e.type==='discard'||e.getParent().name==='useCard'||e.getParent().name==='respond'),
            content:async function(event,trigger,player) {
                const cards=trigger.hs.filter(c=>H.elements.includes(get.xiBie(c)));
                if(!cards.length) return;
                // 放到所属用牌/弃牌事件的 after 队列，确保实体牌结算结束；只携带本次失去的手牌。
                const parent=trigger.getParent();
                const next=game.createEvent('lhym_collectSoul',false);
                next.player=player; next.cards=cards;
                next.setContent(async function(event,trigger,player) { await lib.lunHuiYiMeng.collect(player,event.cards); });
                _status.event.next.remove(next);
                parent.after.push(next);
            },
        },
        lhym_jingHua: {
            charlotte:true,
            type:'qiDong',trigger:{player:'qiDong'},
            filter:(e,p)=>p.countZhiShiWu('lhym_longJing')>0&&H.faces(p,p.getCards('h')).length>0,
            check:(e,p)=>H.startupSafe(p,1),
            content:async function(event,trigger,player) { V.say(player,'jingTian/jingHua',event);
                for(let i=0;i<2;i++) {
                    const faces=H.faces(player,player.getCards('h'));
                    if(!faces.length||player.countZhiShiWu('lhym_longJing')<1) break;

                    const labels=faces.map(H.faceLabel);
                    const controls=i?labels.concat('cancel2'):labels;

                    // 联机客户端会重新执行 chooseControl/chooseCard 的 AI 与过滤函数。
                    // 不让这些回调捕获 H / faces / face / player 等外层变量，
                    // 所需数据统一通过事件字段传入。
                    const bestFace=faces.slice().sort((a,b)=>H.faceScore(player,b)-H.faceScore(player,a))[0];
                    const bestControl=i&&!H.startupSafe(player,1)?'cancel2':H.faceLabel(bestFace);

                    const f=await player.chooseControl(controls)
                        .set('prompt','魔剑净化：选择第'+(i+1)+'面（每面1龙精石+1匹配手牌）')
                        .set('lhymBestControl',bestControl)
                        .set('ai',function() {
                            return _status.event.lhymBestControl;
                        })
                        .forResultControl();

                    if(f==='cancel2') break;

                    const face=faces[labels.indexOf(f)];
                    if(!face) break;

                    const cards=(await player.chooseCard('h',1,true,'净化'+f+'：弃置匹配手牌【展示】')
                        .set('lhymFace',face)
                        .set('filterCard',function(card,player) {
                            var face=_status.event.lhymFace;
                            if(!face) return false;

                            var parts=face.split('_');
                            var element=parts[0];
                            var side=parts[1];

                            if(side==='yin' && get.name(card,player)==='anMie') return true;
                            if(side==='yang' && get.name(card,player)==='shengGuang') return true;

                            return get.xiBie(card,player)===element &&
                                get.type(card,player)===(side==='yin' ? 'gongJi' : 'faShu');
                        })
                        .set('ai',function(card) {
                            var player=_status.event.player;
                            var value=get.value(card,player);
                            var hand=player.countCards('h');
                            var limit=player.getHandcardLimit();
                            var wildcard=['anMie','shengGuang'].includes(get.name(card,player));
                            return 8-value+(hand>=limit?2:0)-(wildcard?12:0);
                        })
                        .forResultCards() || []);

                    if(!cards?.length) break;

                    await player.removeZhiShiWu('lhym_longJing',1);
                    await player.discard(cards).set('showCards',true);
                    H.state(player).faces.push(face);V.complete(player,event);
                    H.sync(player);
                }
            },
        },
        lhym_moJianJi: {
            charlotte:true,
            type:'faShu',enable:'faShu',filter:(e,p)=>H.available(p).length>0,
            group:['lhym_yinYang','lhym_jianPo'],
            selectTarget:-1,filterTarget:(c,p,t)=>p===t,
            content:async function(event,trigger,player) {
                const recipes=H.available(player); if(!recipes.length) return;
                const name=await player.chooseControl(recipes.map(r=>r[0])).set('prompt','魔剑技：选择已解锁且有剑魂的配方')
                    .set('choiceList',recipes.map(r=>r[1].map(x=>H.labels[x]).join('、')+'：'+r[2]))
                    .set('ai',()=>{ var recipes = _status.event["online_27329_recipes"]; var H = lib.lunHuiYiMeng; var player = _status.event["online_27329_player"]; return recipes.slice().sort((a,b)=>H.recipeScore(player,b)-H.recipeScore(player,a))[0][0]; }).set("online_27329_recipes", recipes).set("online_27329_player", player).forResultControl();
                const r=recipes.find(r=>r[0]===name); if(!r) return;
                const paid=[];
                for(const x of r[1]) {
                    const pool=H.souls(player).filter(c=>get.xiBie(c)===x&&!paid.includes(c));
                    const cs=(await player.chooseCardButton(pool,'移除1张'+H.labels[x]+'系剑魂',1,true).set('ai',b=>{ var player = _status.event["online_27911_player"]; return 8-get.value(b.link,player); }).set("online_27911_player", player).forResultLinks() || []);
                    if(!cs?.length) return; paid.push(cs[0]);
                }
                let boost=false, extraHand=[];
                if(r[1].length===1) {
                    const pool=H.souls(player).filter(c=>get.xiBie(c)===r[1][0]&&!paid.includes(c));
                    if(pool.length) {
                        const cs=(await player.chooseCardButton(pool,'可额外移除1张同系剑魂，法术伤害+1',1)
                            .set('ai',function(){ return _status.event.lhymBoost?1:0; }).set('lhymBoost',H.shouldBoost(player,r)).forResultLinks() || []);
                        if(cs?.length) {paid.push(cs[0]); boost=true;}
                    }
                } else {
                    extraHand=(await player.chooseCard('h',1,true,'多属性魔剑技：另弃置1张手牌')
                        .set('ai',c=>{ var H = lib.lunHuiYiMeng; var player = _status.event["online_28715_player"]; return H.handCost(player,c); }).set("online_28715_player", player).forResultCards() || []);
                    if(!extraHand?.length) return;
                }
                await player.discard(paid,'lhym_soul');
                if(extraHand.length) await player.discard(extraHand);
                await H.cast(player,r,boost); H.sync(player);
            },
            ai:{order:4.5,result:{player:p=>{ var H = lib.lunHuiYiMeng; return Math.max(0,...H.available(p).map(r=>H.recipeScore(p,r))); }}},
        },
        lhym_canYing: {
            charlotte:true,
            trigger:{source:'gongJiMingZhong'},forced:true,filter:e=>!e.yingZhan,
            content:async function(event,trigger,player) { V.say(player,'jingTian/canYing',event); player.addFaShu(); },
        },
        lhym_yinYang:{
            charlotte:true,},
        lhym_jianPo:{
            charlotte:true,},
        lhym_zhaoDan: {
            charlotte:true,
            trigger:{player:'gongJiBefore'},priority:20,
            filter:e=>!e.yingZhan&&get.xiBie(e.card)!=='lei',
            check:(e,p)=>get.xiBie(e.card)!=='an' || (p.hasSkill('lhym_leiDong')&&p.hasSkill('lhym_poZhen')&&p.canBiShaShuiJing()),
            content:async function(event,trigger,player) { V.say(player,'jingTian/zhaoDan',event);
                trigger.card={name:trigger.card.name,xiBie:'lei',mingGe:trigger.card.mingGe,duYou:trigger.card.duYou,
                    isCard:true,cards:trigger.cards.slice()};
            },
        },
        lhym_chongZhu: {
            charlotte:true,
            type:'qiDong',trigger:{player:'qiDong'},filter:(e,p)=>H.canForge(p),check:(e,p)=>H.startupSafe(p,H.state(p).stage+1),
            content:async function(event,trigger,player) {
                const s=H.state(player), stage=s.stage;
                if(!H.canForge(player)) return;
                const options=H.branches[stage], labels=options.map(x=>get.translation(x));
                const label=await player.chooseControl(labels).set('prompt',['续接剑身','重铸剑锋','神剑复明'][stage]+'：选择永久强化')
                    .set('choiceList',options.map(x=>get.translation(x+'_info')))
                    .set('ai',()=>{ var labels = _status.event["online_30576_labels"]; var stage = _status.event["online_30576_stage"]; var player = _status.event["online_30576_player"]; var H = lib.lunHuiYiMeng; return labels[stage===0?0:stage===1?(player.countCards('h',c=>get.type(c)==='gongJi')>=stage+3?1:0):(H.enemies(player).length>1?1:0)]; }).set("online_30576_labels", labels).set("online_30576_stage", stage).set("online_30576_player", player)
                    .forResultControl();
                const branch=options[labels.indexOf(label)]; if(!branch) return;
                const cards=(await player.chooseCard('h',stage+1,true,'神剑重铸：弃置'+(stage+1)+'张雷系牌【展示】')
                    .set('filterCard',c=>get.xiBie(c)==='lei').set('ai',c=>{ var H = lib.lunHuiYiMeng; var player = _status.event["online_31059_player"]; return H.handCost(player,c); }).set("online_31059_player", player).forResultCards() || []);
                if(cards?.length!==stage+1) return;
                await player.removeZhiShiWu('lhym_longJing',[1,1,2][stage]);
                await player.discard(cards).set('showCards',true);
                s.stage++; s.branches.push(branch); H.sync(player);V.forge(player,event);
            },
        },
        lhym_fengMang: {
            charlotte:true,
            trigger:{player:'gongJiSheZhi'},forced:true,filter:(e,p)=>!e.yingZhan&&H.state(p).branches.includes('lhym_fengMang'),
            content:async function(event,trigger,player) { V.say(player,'jingTian/fengMang',event); trigger.changeDamageNum(1); },
        },
        lhym_houFa: {
            charlotte:true,
            trigger:{player:'gongJiSheZhi'},forced:true,filter:(e,p)=>!!e.yingZhan&&H.state(p).branches.includes('lhym_houFa'),
            content:async function(event,trigger,player) { V.say(player,'jingTian/houFa',event); trigger.changeDamageNum(2); },
        },
        lhym_poZhen: {
            charlotte:true,
            trigger:{player:'gongJiBefore'},filter:(e,p)=>H.state(p).branches.includes('lhym_poZhen')&&!e.yingZhan&&p.canBiShaShuiJing(),
            check:(e,p)=>get.xiBie(e.card)!=='an' && e.target?.countCards('h')>0 &&
                !e.target.hasExpansions('_shengDun'),
            content:async function(event,trigger,player) { V.say(player,'jingTian/poZhen',event); await player.removeBiShaShuiJing(); trigger.wuFaYingZhan(); },
        },
        lhym_lianZhan: {
            charlotte:true,
            trigger:{player:'gongJiEnd'},usable:1,forced:true,filter:(e,p)=>H.state(p).branches.includes('lhym_lianZhan')&&!e.yingZhan,
            content:async function(event,trigger,player) { V.say(player,'jingTian/lianZhan',event); player.addGongJi(); },
        },
        lhym_leiDong: {
            charlotte:true,
            trigger:{player:'gongJiSheZhi'},forced:true,filter:(e,p)=>H.state(p).branches.includes('lhym_leiDong')&&get.xiBie(e.card)==='lei',
            content:async function(event,trigger,player) { V.say(player,'jingTian/leiDong',event); trigger.changeDamageNum(1); },
        },
        lhym_baHuang: {
            charlotte:true,
            trigger:{source:'gongJiMingZhong'},
            filter:(e,p)=>H.state(p).branches.includes('lhym_baHuang')&&e.damageNum>0&&H.enemies(p).some(t=>t!==e.target),
            check:()=>true,
            content:async function(event,trigger,player) { V.say(player,'jingTian/baHuang',event);
                const n=trigger.damageNum;
                const ts=(await player.chooseTarget('剑荡八荒：对另一名对手造成'+n+'点攻击伤害',true,(c,p,t)=>t.side!==p.side&&t.playerid!==_status.event.onlineSwordExcludedId).set('onlineSwordExcludedId', trigger.target && trigger.target.playerid)
                    .set('ai',t=>{ var H = lib.lunHuiYiMeng; var player = _status.event["online_33540_player"]; var n = _status.event["online_33540_n"]; return H.damageScore(player,t,n); }).set("online_33540_player", player).set("online_33540_n", n).forResultTargets() || []);
                if(ts?.[0]) await ts[0].damage(n,player,'nocard').set('lhym_sweep',true);
            },
        },
        lhym_moRoute:{
            charlotte:true,mark:true,markimage:'extension/轮回遗梦/mark_route_moJian.png',intro:{content:()=>H.recipes.map(r=>'<b>'+r[0]+'</b>（'+r[1].map(x=>H.labels[x]).join('、')+'）：'+colorResourceKeywords(r[2])).join('<br>')}},
        lhym_zhenRoute:{
            charlotte:true,mark:true,markimage:'extension/轮回遗梦/mark_route_zhenYaoJian.png',intro:{content:()=>H.branches.map((bs,i)=>'<b>'+['续接剑身','重铸剑锋','神剑复明'][i]+'</b>：'+[1,1,2][i]+'龙精石＋'+(i+1)+'雷系手牌。二选一：<br>'+bs.map(x=>get.translation(x)+'：'+get.translation(x+'_info')).join('<br>')).join('<br><br>')}},
    };
    skill.lhym_moJianMark={
        charlotte:true,mark:true,markimage:'extension/轮回遗梦/mark_moJian.png',
        group:['lhym_soul','lhym_renJian','lhym_jingHua','lhym_moJianJi','lhym_canYing','lhym_yinYang','lhym_jianPo','lhym_qianNianGongMing'],
        intro:{name:'魔剑专属',content:(s,p)=>H.routeText(p)}
    };
    skill.lhym_zhenYaoJianMark={
        charlotte:true,mark:true,markimage:'extension/轮回遗梦/mark_zhenYaoJian.png',
        group:['lhym_zhaoDan','lhym_chongZhu','lhym_fengMang','lhym_houFa','lhym_poZhen','lhym_lianZhan','lhym_leiDong','lhym_baHuang','lhym_shenShuZhaoDan'],
        intro:{name:'镇妖剑专属',content:(s,p)=>H.routeText(p)}
    };
    const lampFileElement={shui:'shui',huo:'huo',lei:'lei',feng:'feng',di:'tu'};
    for(const element of H.elements) for(const status of ['empty','yin','yang','both']) {
        skill['lhym_wuLing_'+element+'_'+status]={
            charlotte:true,
            mark:true,
            markimage:'extension/轮回遗梦/mark_wuLing_'+lampFileElement[element]+'_'+status+'.png',
            intro:{name:H.labels[element]+'灵阴阳灯',content:(s,p)=>H.lampText(p,element)},
        };
    }
    skill.lhym_sword.mod={
        aiValue:(p,c,n)=>n+H.materialValue(p,c),
        aiUseful:(p,c,n)=>n+H.materialValue(p,c),
    };
    const descriptions = {
        lhym_shuangJian:['被动【双剑宿缘】','（游戏开始时）选择魔剑或镇妖剑，获得对应武器及专属技能；本局不能更改。'],
        lhym_yongAn:['被动【永安当】','能量上限+2。（游戏开始时）+2【水晶】。（执行特殊行动后）+1【宝石】。'],
        lhym_dianDang:['响应【典当】','（获得【宝石】时）可将每颗【宝石】改为2【水晶】。'],
        lhym_feiLong:['被动【飞龙探云手】','不能提炼。（其他角色提炼结算后）翻开并弃置牌库顶1张牌【展示】；若为法术牌，取得该角色此次提炼获得且仍持有的1颗星石。'],
        lhym_zhuJian:['被动【铸剑】','（造成实际伤害后）+1【龙精石】。'],
        lhym_longJing:['龙精石','上限4，用于魔剑净化或镇妖剑修复。'],
        lhym_sword:['双剑宿缘','本局武器及永久培养记录。'],
        lhym_huiYan:['启动【慧眼识珍】','【水晶】选择一名有手牌的目标，其选择1张手牌交给你【展示】；若你选择魔剑，没有手牌但拥有【剑中残影】的龙葵仍可被选择，并可用1张【剑中残影】代替手牌。<br>若该牌符合魔剑未激活面或镇妖剑下一阶段材料要求，该角色+1【宝石】。'],
        lhym_yinDan:['法术【倾国银弹波】','（至少持有1【宝石】和1【水晶】）移除全部能量，选择【宝石】数名不同对手，各造成【水晶】数点法术伤害③。'],
        lhym_soul:['剑魂','上限10；超出时选择要丢弃的剑魂。景天与操控龙葵的玩家可以查看牌面，其他玩家只能看到张数；不能直接作为手牌使用。'],
        lhym_renJian:['被动【人剑相应】','（你使用或弃置非光暗实体手牌后）若该牌结算后仍在弃牌区，暗置为剑魂。'],
        lhym_jingHua:['启动【魔剑净化】','选择1至2个未激活面；每面移除1【龙精石】并展示弃置1张匹配手牌。攻击牌激活阴面，法术牌激活阳面；【暗灭】可激活任意阴面，【圣光】可激活任意阳面。'],
        lhym_moJianJi:['法术【魔剑技】','（对应属性均已解锁）移除配方所需【剑魂】，发动已解锁魔剑技。详见魔剑路线。<br>单系可额外移除1张同系【剑魂】，使法术伤害+1；<br>多系另弃置1张手牌。'],
        lhym_canYing:['被动【残影剑】','（主动攻击命中时）+1法术行动。'],
        lhym_yinYang:['被动【阴阳五灵】','魔剑有水、火、雷、风、地五系阴阳十面，初始全部未激活；同系双面激活后永久解锁该属性。'],
        lhym_jianPo:['被动【剑魄通灵】','（配方涉及属性全部解锁后）可发动对应魔剑技。'],
        lhym_zhaoDan:['响应【神剑照胆】','（主动攻击时）将本次攻击视为雷系。'],
        lhym_chongZhu:['启动【神剑重铸】','支付修复费用，完成该阶段修复，并从两项强化中选择一项永久获得。详见镇妖剑路线。'],
        lhym_fengMang:['被动【锋芒毕露】','（主动攻击时）攻击伤害+1。'],
        lhym_houFa:['被动【后发制人】','（应战攻击时）攻击伤害+2。'],
        lhym_poZhen:['响应【镇妖破阵】','【水晶】（主动攻击前①）使本次攻击无法被应战。'],
        lhym_lianZhan:['响应【御剑追锋】','【回合限定】（攻击行动结束后）+1【攻击行动】。'],
        lhym_leiDong:['被动【九霄雷动】','你的雷系攻击伤害+1。'],
        lhym_baHuang:['响应【剑荡八荒】','（攻击命中后②）对另一名对手造成等额攻击伤害。'],
        lhym_moRoute:['魔剑路线专属','五灵配方与效果，点击标记查看。'],
        lhym_zhenRoute:['镇妖剑路线专属','三阶段材料与二选一强化，点击标记查看。'],
    };
    // 仙剑三同伴：实体盖牌始终挂在其所有者名下，花楹持有者只保存公开引用。
    const C=lib.lhymCompanion={
        blueSkills:['lhym_cangFeng','lhym_moJianHuTi','lhym_youLan'],
        redSkills:['lhym_daiJun','lhym_buYuan','lhym_huanGui','lhym_hongYing'],
        bondSkills:['lhym_qianNian','lhym_youLan','lhym_hongYing'],
        isCompanion:p=>[p.name,p.name1,p.name2].some(id=>id==='xueJian'||id==='longKui'),
        localViewer:p=>{
            const viewer=game.me;
            return !!viewer&&!!p&&(viewer===p||viewer._trueMe===p||p._trueMe===viewer||
                !!viewer._trueMe&&viewer._trueMe===p._trueMe);
        },
        magicJings:()=>game.players.filter(t=>H.state(t).weapon==='魔剑'),
        refreshBond(p){
            if(!p?.isIn()||!p.hasSkill('lhym_jianZhongRen'))return;
            const key='lhym_longKuiBond',active=C.magicJings().length>0;
            if(p.additionalSkills?.[key]?.length)p.removeAdditionalSkill(key);
            for(const id of C.bondSkills){
                if(active&&!p.hasSkill(id))p.addSkill(id);
                else if(!active&&p.hasSkill(id))p.removeSkill(id);
            }
            C.syncFormSkills(p,C.red(p));
        },
        refreshAllBonds(){for(const p of game.players.filter(t=>t.hasSkill('lhym_jianZhongRen')))C.refreshBond(p);},
        async lightFace(p,card){
            const faces=H.faces(p,[card]);if(!faces.length)return;
            const best=faces.slice().sort((a,b)=>H.faceScore(p,b)-H.faceScore(p,a))[0];
            const face=faces.length===1?faces[0]:await p.chooseControl(faces).set('prompt','千年相随：选择免费激活的属性面')
                .set('choiceList',faces.map(H.faceLabel)).set('lhymBestFace',best).set('ai',()=>_status.event.lhymBestFace).forResultControl();
            if(!faces.includes(face)||H.state(p).faces.includes(face))return;
            H.state(p).faces.push(face);H.sync(p);V.complete(p,_status.event);game.log(p,'通过【千年相随】激活',H.faceLabel(face));
        },
        dew:p=>p.getExpansions('lhym_huaLu'),
        shadows:p=>p.getExpansions('lhym_canYingPai'),
        red:p=>p.storage.lhym_red===true,
        canTwin:p=>C.shadows(p).length>0||C.shadows(p).length<4&&p.countCards('h',c=>get.type(c)==='gongJi')>0,
        async twin(p,free=false){
            if(!C.canTwin(p)||(!free&&!p.canBiShaShuiJing()))return;
            const red=C.red(p);if(!free)await p.removeBiShaShuiJing();C.form(p,!red);
            V.batch(p,free?['longKui/resonance_'+(red?'red':'blue')]:red?['longKui/twin_red']:['longKui/twin_blue','longKui/twin_reply'],_status.event);
            const opts=[];
            if(C.shadows(p).length<4&&p.countCards('h',c=>get.type(c)==='gongJi')>0)opts.push('收入残影');
            if(C.shadows(p).length>0)opts.push('取回残影');
            const choice=opts.length===1?opts[0]:await p.chooseControl(opts).set('prompt','双生：选择转形后的效果').set('ai',()=>0).forResultControl();
            if(choice==='收入残影'){
                const cs=await p.chooseCard('h',1,true,c=>get.type(c)==='gongJi').set('ai',c=>8-get.value(c)).forResultCards()||[];
                if(cs.length)await p.addGaiPai(cs,'lhym_canYingPai');
            }else if(choice==='取回残影'){
                const cs=await C.pick(p,C.shadows(p),'双生：将1张残影收入手牌',1,true);
                if(cs.length)await p.gain(cs,'gain2');
            }
        },
        syncFormSkills(p,red){
            game.broadcastAll(function(target,isRed,blueSkills,redSkills){
                target.enableSkill('lhym_longKuiForm');
                target.disableSkill('lhym_longKuiForm',isRed?blueSkills:redSkills);
            },p,red,C.blueSkills,C.redSkills);
        },
        form(p,red){
            p.storage.lhym_red=red;p.syncStorage('lhym_red');
            if(p.marks?.lhym_jianZhongRen)p.unmarkSkill('lhym_jianZhongRen');
            H.setPortrait(p,red?'longKui_red.png':'longKui_blue.png','longKui');
            C.refreshBond(p);
        },
        holder(p){return game.players.find(t=>t.playerid===p.storage.lhym_flowerHolder)||p;},
        move(p,t){
            const old=C.holder(p);if(old!==t&&[t.name,t.name1,t.name2].includes('jingTian'))V.say(p,'xueJian/flower',_status.event);
            old.unmarkSkill('lhym_flowerGuest');
            p.storage.lhym_flowerHolder=t.playerid;p.syncStorage('lhym_flowerHolder');
            t.storage.lhym_flowerGuest=p.playerid;t.syncStorage('lhym_flowerGuest');t.markSkill('lhym_flowerGuest');
            game.log(p,'将【花楹】移至',t);
        },
        jing(p,weapon){return game.players.filter(t=>t!==p&&t.side===p.side&&H.state(t).weapon===weapon);},
        async pick(p,cards,prompt,n=1,forced=false){
            if(!cards.length)return [];
            return await p.chooseCardButton(cards,prompt,n,forced).set('ai',b=>8-get.value(b.link,_status.event.player)).forResultLinks()||[];
        },
        async friend(p,prompt){return (await p.chooseTarget(prompt,true,(c,p,t)=>t.side===p.side)
            .set('ai',t=>Math.max(0,t.getZhiLiaoLimit()-(t.zhiLiao||0))+t.countCards('h')*.1).forResultTargets()||[])[0];},
        async healMove(p,n){const t=await C.friend(p,'选择花楹的新持有者');if(t){C.move(p,t);await t.changeZhiLiao(n,p);}},
        async spend(p,cards,tag){if(!cards.length)return;await p.showCards(cards);await p.loseToDiscardpile(cards);},
        async counter(p,e,card){
            const targets=await p.chooseTarget('魔剑护体：选择应战目标',true,(c,p,t)=>t.side!==p.side&&t.playerid!==_status.event.lhymExcluded&&lib.filter.targetEnabled(_status.event.lhymCard,p,t))
                .set('lhymExcluded',e.player.playerid).set('lhymCard',card).set('ai',t=>-t.countCards('h')).forResultTargets()||[];
            if(!targets.length)return;
            await p.showCards([card]);e.weiMingZhong();
            const next=p.useCard(card,[card],targets);next.yingZhan=true;next.lhym_shadow=true;
            await next;if(p.isIn())C.form(p,true);
        },
    };
    Object.assign(skill,{
        lhym_suYuan:{},
        lhym_shenShuZhaoDan:{trigger:{source:'gongJiMingZhong'},direct:true,
            filter:(e,p)=>!e.yingZhan&&H.state(p).weapon==='镇妖剑'&&game.hasPlayer(t=>t.hasSkill('lhym_huaYing')),
            content:async function(event,trigger,player){
                if(!await player.chooseBool('宿缘相应·神树照胆：花楹移至你面前并+1治疗？').set('ai',()=>true).forResultBool())return;
                const snow=game.players.find(t=>t.hasSkill('lhym_huaYing'));if(!snow)return;
                player.logSkill('lhym_suYuan');V.say(player,'jingTian/flower',event);C.move(snow,player);await player.changeZhiLiao(1,player);
            }},
        lhym_qianNianGongMing:{trigger:{player:'lhym_moJianJiAfter'},direct:true,
            filter:(e,p)=>H.state(p).weapon==='魔剑'&&game.hasPlayer(t=>t.side===p.side&&t.hasSkill('lhym_shuangSheng')&&C.canTwin(t)),
            content:async function(event,trigger,player){
                for(const kui of game.players.filter(t=>t.side===player.side&&t.hasSkill('lhym_shuangSheng')&&C.canTwin(t))){
                    if(await kui.chooseBool('宿缘相应·千年共鸣：无水晶费用发动双生？').set('ai',()=>true).forResultBool()){
                        player.logSkill('lhym_suYuan',kui);V.say(player,'jingTian/resonance',event);kui.logSkill('lhym_shuangSheng');await C.twin(kui,true);
                    }
                }
            }},
        lhym_huaYing:{
            trigger:{global:'gameStart'},forced:true,
            content:async function(event,trigger,player){ V.say(player,'xueJian/huaYing',event);lib.lhymCompanion.move(player,player);},
            group:['lhym_huaLu','lhym_huaYingEnd'],
        },
        lhym_flowerGuest:{charlotte:true,mark:true,marktext:'楹',markimage:'extension/轮回遗梦/mark_huaYing.png',intro:{content:'花楹在此；花露由雪见保管并随花楹移动，不属于手牌或基础效果。'}},
        lhym_huaLu:{charlotte:true,marktext:'露',intro:{name:'花露',content:'gaiPai',markcount:'gaiPai'},
            onremove:p=>{const cards=C.dew(p);if(cards.length)p.loseToDiscardpile(cards);}},
        lhym_huaYingEnd:{trigger:{player:'phaseEnd'},forced:true,
            filter:(e,p)=>C.dew(p).length>0||C.holder(p)===p,
            content:async function(event,trigger,player){
                if(C.dew(player).length){const cards=await C.pick(player,C.dew(player),'花楹：丢弃1张花露，己方士气-1',1,true);if(cards.length){await player.loseToDiscardpile(cards);await player.changeShiQi(-1);}}
                if(player.isIn()&&C.holder(player)===player)await player.changeZhiLiao(1,player);
            }},
        lhym_huZhu:{trigger:{global:'discardBefore'},direct:true,
            filter:(e,p)=>e.baoPai===true&&e.cards?.length>0&&e.player===C.holder(p)&&C.dew(p).length<2&&!e.lhym_flowerSaved,
            content:async function(event,trigger,player){
                if(!(await player.chooseBool('花楹护主：收取1张爆牌弃牌，避免其士气损失？').set('ai',()=>true).forResultBool()))return;
                if(trigger.lhym_flowerSaved)return;
                const cards=await C.pick(trigger.player,trigger.cards,'花楹护主：选择1张已选弃牌交给雪见暗置',1,true);
                if(!cards.length)return;trigger.lhym_flowerSaved=true;player.logSkill('lhym_huZhu',trigger.player);V.say(player,'xueJian/huZhu',event);
                trigger.cards.remove(cards[0]);await player.addGaiPai(cards,'lhym_huaLu');
            }},
        lhym_wuDuGuiYuan:{type:'faShu',enable:'faShu',filter:(e,p)=>C.dew(p).length>0,filterTarget:(c,p,t)=>t.side===p.side,
            content:async function(event,trigger,player){
                const t=event.target;V.say(player,t.hasZhiShiWu('wuDuZhu')?'xueJian/wuDu_pearl':'xueJian/wuDu',event);C.move(player,t);const pool=C.dew(player);
                if(pool.length){const bad=t.getExpansions('_zhongDu').concat(t.getExpansions('_xuRuo'));
                    const opts=[];if(bad.length)opts.push('净化');if(t.countCards('h')>=2)opts.push('弃牌收入');
                    if(opts.length){const choice=opts.length===1?opts[0]:await t.chooseControl(opts).set('ai',()=>0).forResultControl();
                        const cards=await C.pick(player,pool,'五毒归元：选择花露',1,true);
                        if(choice==='净化'){await player.loseToDiscardpile(cards);const remove=await C.pick(t,bad,'移除1张中毒或虚弱',1,true);if(remove.length)await t.discard(remove,t.getExpansions('_zhongDu').includes(remove[0])?'_zhongDu':'_xuRuo');if(!t.getExpansions('_zhongDu').length)t.storage.zhongDu=[];}
                        else{await t.chooseToDiscard('h',2,true);await t.gain(cards,player,'giveAuto');}
                    }
                }
                if(t.hasZhiShiWu('wuDuZhu'))await t.changeZhiLiao(2,player);
            },ai:{order:5,result:{target:(p,t)=>C.dew(p).length?(t.getExpansions('_zhongDu').length+t.getExpansions('_xuRuo').length+1):t.hasZhiShiWu('wuDuZhu')?H.healScore(t,2):0}}},
        lhym_lvBo:{trigger:{player:'gongJiSheZhi'},direct:true,filter:(e,p)=>!!e.card&&C.dew(p).length>0,
            content:async function(event,trigger,player){const cs=await C.pick(player,C.dew(player),'绿波红露斩：展示并移除1张花露');if(!cs.length)return;
                player.logSkill('lhym_lvBo');V.say(player,'xueJian/lvBo',event);const same=get.xiBie(cs[0])===get.xiBie(trigger.card);await C.spend(player,cs,'lhym_huaLu');
                if(same)trigger.changeDamageNum(1);else trigger.lhym_flowerMove=true;
            },group:'lhym_lvBoHit'},
        lhym_lvBoHit:{trigger:{source:'gongJiMingZhong'},direct:true,filter:e=>e.lhym_flowerMove===true,
            content:async function(event,trigger,player){if(await player.chooseBool('绿波红露斩：移动花楹并治疗？').set('ai',()=>true).forResultBool())await C.healMove(player,1);}},
        lhym_tianLing:{type:'faShu',enable:'faShu',filter:(e,p)=>p.canBiShaShuiJing(),filterTarget:(c,p,t)=>p.side!==t.side,
            content:async function(event,trigger,player){ V.say(player,'xueJian/tianLing',event);await player.removeBiShaShuiJing();let n=1,count=0;const cards=C.dew(player).slice();
                if(cards.length&&await player.chooseBool('天灵千裂破：移除全部花露追加效果？').set('ai',()=>true).forResultBool()){
                    count=cards.length;n+=count===1?1:get.xiBie(cards[0])===get.xiBie(cards[1])?2:0;await C.spend(player,cards,'lhym_huaLu');
                }await event.target.faShuDamage(n,player,'nocard');if(player.isIn())await C.healMove(player,1);
            },ai:{order:5.5,shuiJing:true,result:{target:(p,t)=>-H.damageScore(p,t,C.dew(p).length?2:1)}}},
        lhym_shenShu:{type:'faShu',enable:'faShu',filter:(e,p)=>!p.storage.lhym_shenShu&&game.hasPlayer(t=>H.state(t).weapon==='镇妖剑'&&H.state(t).stage<3),
            filterTarget:(c,p,t)=>t!==p&&H.state(t).weapon==='镇妖剑'&&H.state(t).stage<3,
            content:async function(event,trigger,player){ V.say(player,'xueJian/shenShu',event);const t=event.target,s=H.state(t);if(s.stage>=3||player.storage.lhym_shenShu)return;
                const opts=H.branches[s.stage];const branch=await t.chooseControl(opts).set('ai',()=>0).forResultControl();if(!opts.includes(branch))return;
                player.storage.lhym_shenShu=true;player.syncStorage('lhym_shenShu');s.stage++;s.branches.push(branch);H.sync(t);V.forge(t,event);
            },mod:{maxHandcard:(p,n)=>n-(p.storage.lhym_shenShu?2:0)},ai:{order:6,result:{target:2,player:-.5}}},
        lhym_jianZhongRen:{charlotte:true,nopop:true,popup:false,
            trigger:{global:'gameStart'},forced:true,content:async function(event,trigger,player){ V.say(player,'longKui/start_blue',event);C.form(player,false);},group:['lhym_canYingPai','lhym_longKuiBondWatch']},
        lhym_longKuiBondWatch:{charlotte:true,trigger:{global:['dieAfter','phaseBefore']},forced:true,popup:false,lastDo:true,
            filter:(e,p)=>p.isIn(),content:async function(event,trigger,player){C.refreshBond(player);}},
        lhym_canYingPai:{marktext:'影',markimage:'extension/轮回遗梦/mark_canYing.png',intro:{name:'剑中残影',content:'gaiPai',markcount:'gaiPai'},
            onremove:p=>{const cards=C.shadows(p);if(cards.length)p.loseToDiscardpile(cards);}},
        lhym_cangFeng:{trigger:{player:'gongJiEnd'},direct:true,
            filter:(e,p)=>!C.red(p)&&!e.target&&!e.lhym_shadow&&!e.lhym_borrowed&&!e.getParent?.('useCard',true)?.lhym_shadow&&C.shadows(p).length<4&&e.cards?.some(c=>get.type(c)==='gongJi'&&['o','d'].includes(get.position(c,true))),
            content:async function(event,trigger,player){const cs=await C.pick(player,trigger.cards.filter(c=>get.type(c)==='gongJi'&&['o','d'].includes(get.position(c,true))),'藏锋：收取未命中的攻击牌');if(cs.length){player.logSkill('lhym_cangFeng');V.say(player,'longKui/cangFeng',event);await player.addGaiPai(cs,'lhym_canYingPai');}}},
        lhym_moJianHuTi:{trigger:{global:'shouDaoGongJiBefore'},direct:true,
            filter:(e,p)=>!C.red(p)&&e.target!==p&&e.target?.side===p.side&&e.canYingZhan!==false&&C.shadows(p).some(c=>(get.xiBie(c)===get.xiBie(e.card)||(get.name(c)==='anMie'&&e.canAnMie!==false))&&lib.filter.cardEnabled(c,p,'forceEnable'))&&game.hasPlayer(t=>t.side!==p.side&&t!==e.player),
            content:async function(event,trigger,player){const pool=C.shadows(player).filter(c=>(get.xiBie(c)===get.xiBie(trigger.card)||(get.name(c)==='anMie'&&trigger.canAnMie!==false))&&lib.filter.cardEnabled(c,player,'forceEnable'));
                const cards=await C.pick(player,pool,'魔剑护体：选择残影代队友应战');if(cards.length){player.logSkill('lhym_moJianHuTi',trigger.target);V.say(player,'longKui/moJianHuTi',event);await C.counter(player,trigger,cards[0]);}
            }},
        lhym_shuangSheng:{type:'qiDong',trigger:{player:'qiDong'},filter:(e,p)=>p.canBiShaShuiJing()&&C.canTwin(p),
            check:(e,p)=>C.shadows(p).length>0||p.countCards('h')>1,
            content:async function(event,trigger,player){await lib.lhymCompanion.twin(player,false);},ai:{shuiJing:true}},
        lhym_daiJun:{type:'gongJi',enable:'gongJi',filter:(e,p)=>C.red(p)&&C.shadows(p).length>0,
            chooseButton:{dialog:(e,p)=>ui.create.dialog('代君出鞘',[lib.lhymCompanion.shadows(p),'card']),check:b=>6-get.value(b.link),
                backup:links=>({type:'gongJi',selectCard:-1,filterCard:()=>false,viewAs:{name:get.name(links[0]),xiBie:get.xiBie(links[0]),isCard:true},
                    lhymShadowCard:links[0],precontent:async function(event,trigger,player){const c=lib.skill.lhym_daiJun_backup.lhymShadowCard;event.result.cards=[c];event.result.card.cards=[c];event.result.card.lhym_shadow=true;}})},ai:{order:5,result:{target:-1}}},
        lhym_daiJunChoice:{trigger:{player:'gongJiSheZhi'},forced:true,filter:e=>!e.yingZhan&&e.card?.lhym_shadow===true,
            content:async function(event,trigger,player){ V.say(player,'longKui/daiJun',event);trigger.lhym_shadow=true;const choices=['原系增伤',...H.elements,'an'];const x=await player.chooseControl(choices).set('ai',()=>0).forResultControl();
                trigger.lhym_returnBlue=true;
                if(x==='原系增伤')trigger.changeDamageNum(1);else{trigger.card={...trigger.card,xiBie:x};if(x==='an')trigger.canYingZhan=false;}
            }},
        lhym_buYuan:{trigger:{source:'gongJiMingZhong'},direct:true,filter:(e,p)=>C.red(p)&&!e.yingZhan&&e.lhym_shadow&&C.shadows(p).length<4&&p.countCards('h',c=>get.type(c)==='gongJi')>0,
            content:async function(event,trigger,player){const cs=await player.chooseCard('h',1,'不愿归去：暗置1张攻击牌为残影',c=>get.type(c)==='gongJi').set('ai',c=>7-get.value(c)).forResultCards()||[];
                if(cs.length){player.logSkill('lhym_buYuan');V.say(player,'longKui/buYuan',event);await player.addGaiPai(cs,'lhym_canYingPai');trigger.lhym_returnBlue=false;}
            }},
        lhym_guiLan:{trigger:{player:'gongJiEnd'},forced:true,popup:false,filter:e=>e.lhym_returnBlue===true,content:async function(event,trigger,player){C.form(player,false);}},
        lhym_huanGui:{type:'faShu',enable:'faShu',filter:(e,p)=>C.red(p)&&p.canBiShaBaoShi()&&C.shadows(p).length>0,
            content:async function(event,trigger,player){ V.say(player,'longKui/huanGui',event);const cs=await C.pick(player,C.shadows(player),'幻鬼三叠杀：移除1至2残影',[1,Math.min(2,H.enemies(player).length)],true);if(!cs.length)return;
                const ts=await player.chooseTarget('选择等量不同对手',cs.length,true,(c,p,t)=>t.side!==p.side).set('ai',t=>get.damageEffect2(t,_status.event.player,2)).forResultTargets()||[];if(ts.length!==cs.length)return;
                await player.removeBiShaBaoShi();await C.spend(player,cs,'lhym_canYingPai');
                for(const t of ts.sortBySeat(player))if(t.isIn())await t.faShuDamage(2,player,'nocard');
                if(cs.length===2&&get.xiBie(cs[0])===get.xiBie(cs[1])&&H.enemies(player).some(t=>!ts.includes(t))){const extra=await player.chooseTarget('同系追加：另一名对手',true,(c,p,t)=>t.side!==p.side&&!_status.event.lhymExcluded.includes(t.playerid)).set('lhymExcluded',ts.map(t=>t.playerid)).set('ai',t=>get.damageEffect2(t,_status.event.player,2)).forResultTargets()||[];if(extra[0])await extra[0].faShuDamage(2,player,'nocard');}
            },ai:{order:6,baoShi:true,result:{player:2}}},
        lhym_youLan:{trigger:{player:'phaseBegin'},direct:true,filter:(e,p)=>!C.red(p)&&p.countCards('h',c=>H.elements.includes(get.xiBie(c)))>0&&C.magicJings().some(t=>H.souls(t).length),
            content:async function(event,trigger,player){const pool=C.magicJings().filter(t=>H.souls(t).length);if(!pool.length)return;
                const jt=pool[0];
                const own=await player.chooseCard('h',1,'幽蓝理魂：交换一张非光暗手牌',c=>lib.lunHuiYiMeng.elements.includes(get.xiBie(c))).set('ai',c=>5-get.value(c)).forResultCards()||[];if(!own.length)return;
                const soul=await C.pick(jt,H.souls(jt),'幽蓝理魂：选择与龙葵交换的剑魂',1,true);if(!soul.length)return;
                player.logSkill('lhym_youLan',jt);V.say(player,'longKui/youLan',event);await player.showCards(own);await jt.showCards(soul);await player.gain(soul,jt,'giveAuto');await jt.addGaiPai(own,'lhym_soul');
            }},
        lhym_qianNian:{charlotte:true},
        lhym_hongYing:{type:'faShu',enable:'faShu',usable:1,filter:(e,p)=>C.red(p)&&C.magicJings().some(t=>H.souls(t).some(c=>get.type(c)==='gongJi')),
            content:async function(event,trigger,player){ V.say(player,'longKui/hongYing',event);const pool=C.magicJings().filter(t=>H.souls(t).some(c=>get.type(c)==='gongJi'));if(!pool.length)return;
                const jt=pool[0];
                const agreed=await jt.chooseBool('红影借锋：是否为龙葵展示并借出1张攻击牌剑魂？')
                    .set('lhymBorrowerSide',player.side).set('ai',()=>_status.event.player.side===_status.event.lhymBorrowerSide).forResultBool();
                if(!agreed){player.addGongJiOrFaShu();return;}
                const cs=await C.pick(jt,H.souls(jt).filter(c=>get.type(c)==='gongJi'),'红影借锋：选择借给龙葵的攻击牌',1,true);if(!cs.length)return;
                const ts=await player.chooseTarget('红影借锋：选择攻击目标',true,(c,p,t)=>t.side!==p.side&&p.canUseXingBei(_status.event.lhymCard,t)).set('lhymCard',cs[0]).set('ai',t=>-t.countCards('h')).forResultTargets()||[];if(!ts.length)return;
                await jt.showCards(cs);
                const virtual={name:get.name(cs[0]),xiBie:get.xiBie(cs[0]),isCard:true,cards:cs,lhym_shadow:true};
                const next=player.useCard(virtual,cs,ts);next.lhym_borrowed=true;next.lhym_shadow=true;await next;
            },ai:{order:4.5,result:{player:1}}},
    });
    skill.lhym_daiJun.group=['lhym_daiJunChoice','lhym_guiLan'];
    Object.assign(descriptions,{
        lhym_daiJunChoice:['被动【代君出鞘】','残影与借来剑魂发动主动攻击时，选择原系增伤或改系；无论选择哪项，攻击结束后均转为蓝葵。'],
        lhym_flowerGuest:['花楹','花楹当前持有者；花露仅雪见可查看。'],
        lhym_lvBoHit:['绿波红露斩·移花','异系花露强化的攻击命中后，可移动花楹并治疗。'],
        lhym_suYuan:['响应【宿缘相应】','（你发动【典当】时）你可以将其中1枚星石给予【雪见】或【龙葵】。<br>（【雪见】或【龙葵】【提炼】后）你可以获得其本次提炼所得且仍持有的1枚星石。'],
        lhym_shenShuZhaoDan:['【镇妖剑·神树照胆】','（任意阵营雪见在场）（你的主动攻击命中时②）你可以将【花楹】移至你的角色面前，然后你+1【治疗】。'],
        lhym_qianNianGongMing:['【魔剑·千年共鸣】','（龙葵在场）（你的【魔剑技】结算结束后）【龙葵】可以无消耗发动一次【双生】。'],
        lhym_huaYing:['被动【花楹】','（游戏开始时）将【花楹】置于你面前。【花露】随【花楹】移动，仅你可以查看。<br>（你的回合结束时，若【花楹】在你面前）先结算【花楹·散露】，再+1【治疗】。'],
        lhym_huaLu:['【花露】','暗置实体牌，上限为2，仅雪见可以查看。'],
        lhym_huZhu:['响应【花楹护主】','（【花楹】持有者爆牌时）你可以将其1张应弃手牌暗置为【花露】，该牌不令己方士气下降。每次爆牌至多收取1张；【花露】已达上限时不能发动。'],
        lhym_huaYingEnd:['花楹·散露','（你的回合结束时）若【花露】不为空，弃置其中1张，然后己方士气-1。'],
        lhym_wuDuGuiYuan:['法术【五毒归元】','（【花露】不为0时）将【花楹】移至一名我方角色面前，该角色选择一项：<br>·移除1张【花露】，并移除自身1个【中毒】或【虚弱】<br>·弃两张牌，将1张【花露】加入手牌<br>若其拥有【五毒珠】，其+2【治疗】。'],
        lhym_lvBo:['响应【绿波红露斩】','（你攻击时①）你可以展示并移除1张【花露】：<br>·若其与本次攻击系别相同，本次攻击伤害+1<br>·若不同，本次攻击命中后②，你可以将【花楹】移至一名我方角色面前，并使其+1【治疗】。'],
        lhym_tianLing:['法术【天灵千裂破】','【水晶】对一名对手造成1点法术伤害③；伤害结算后，将【花楹】移至一名我方角色面前，该角色+1【治疗】。<br>你可以额外展示并移除全部【花露】：<br>·移除1张时，本次伤害+1<br>·移除2张且同系时，本次伤害+2。'],
        lhym_shenShu:['法术【神树献灵】','（每局限1次）（景天选择镇妖剑且尚未完成第三阶段）免除全部材料费用，使其完成下一锻造阶段并选择分支；你的手牌上限永久-2。'],
        lhym_cangFeng:['被动【藏锋】','（仅蓝葵形态下）（攻击未命中）你可以将本次使用的攻击牌置为【剑中残影】。【剑中残影】已达上限时不能发动。'],
        lhym_moJianHuTi:['响应【魔剑护体】','（仅蓝葵形态下）（其他队友成为攻击目标时①）你可以展示并打出1张符合正常应战条件的【剑中残影】，代其应战，然后你转为红葵。此次攻击无法发动【藏锋】。'],
        lhym_daiJun:['被动【代君出鞘】','（仅红葵形态下）你可以使用残影执行主动攻击，但不能以残影支付其他技能费用。（以残影主动攻击时①）选择一项：<br>·保留原系别，本次攻击伤害+1<br>·将本次攻击视为任意系，伤害不变<br>此次攻击结束后转为蓝葵。'],
        lhym_buYuan:['响应【不愿归去】','（仅红葵形态下）（你以【剑中残影】发动的主动攻击命中后②）你可以将1张手中攻击牌置为【剑中残影】，并取消本次攻击结束后的蓝葵转换。'],
        lhym_shuangSheng:['启动【双生】','【水晶】转为另一形态，然后选择一项：<br>·将手牌1张攻击牌收入【剑中残影】<br>·将1张残影加入手牌<br>只能选择当前可执行的选项。'],
        lhym_huanGui:['法术【幻鬼三叠杀】','（仅红葵形态下）（【宝石】）展示并移除1至2张【剑中残影】，指定等量的不同对手，对其各造成2点法术伤害③。<br>若移除的2张牌系别相同，再对另一名未被指定的对手造成2点法术伤害③。'],
        lhym_qianNian:['响应【千年相随】','（景天对你发动【慧眼识珍】时）你可以展示并交付1张【剑中残影】代替手牌，并免费激活其对应属性面。没有手牌但拥有【剑中残影】时，你仍可被选择。'],
        lhym_youLan:['响应【幽蓝理魂】','（仅蓝葵形态下）（你的回合开始时）你可以展示1张非光暗手牌，与景天交换1张【剑魂】。'],
        lhym_hongYing:['法术【红影借锋】【回合限定】','（仅红葵形态下）景天可以展示1张攻击牌【剑魂】，由你使用该牌发动本次攻击；若景天拒绝，你+1【攻击行动】或【法术行动】。<br>本次攻击视为以【剑中残影】发动，可以触发【代君出鞘】与【不愿归去】。该【剑魂】正常进入弃牌区。'],
        lhym_canYingPai:['专属【剑中残影】','暗置实体牌，上限为4。'],
    });
    const conditionColor = '#e6b85c';
    const colorConditions = text => String(text).replace(/（[^）]+）/g, function(condition) {
        return '<span style="color:'+conditionColor+'">'+condition+'</span>';
    });
    const exclusiveResourceColors={
        '【龙精石】':'#43cfe8',
        '【剑魂】':'#9b72e8',
        '【花楹】':'#e5b94f',
        '【花露】':'#f08fbd',
        '【五毒珠】':'#62c96b',
        '【剑中残影】':'#7652cc',
    };
    const colorResourceKeywords = text => String(text).replace(/【[^】]+】/g, function(keyword) {
        if(keyword==='【水晶】')return '<span class="lan">'+keyword+'</span>';
        if(keyword==='【宝石】')return '<span class="hong">'+keyword+'</span>';
        if(exclusiveResourceColors[keyword])return '<span style="color:'+exclusiveResourceColors[keyword]+';font-weight:bold">'+keyword+'</span>';
        return keyword;
    });
    const translate={};
    for(const [id,[name,info]] of Object.entries(descriptions)) {
        translate[id]=name;
        translate[id+'_info']=colorResourceKeywords(colorConditions(info));
    }
    translate.lhym_jianZhongRen='剑中人';
    translate.lhym_weiLiBlessing='威力赐福';
    translate.lhym_weiLiBlessing_info='下一次攻击命中时，本次攻击伤害+2，然后移除此效果。';
    translate.lhym_moJianMark='魔剑专属';
    translate.lhym_zhenYaoJianMark='镇妖剑专属';
    for(const element of H.elements) for(const status of ['empty','yin','yang','both']) {
        translate['lhym_wuLing_'+element+'_'+status]=H.labels[element]+'灵阴阳灯';
    }
    for(const s of Object.values(skill)) if(s.audio===undefined) s.audio=false;
    const markFiles=[
        'mark_moJian.png','mark_longJingShi.png','mark_jianHun.png','mark_zhenYaoJian.png',
        'mark_route_moJian.png','mark_route_zhenYaoJian.png','mark_huaYing.png','mark_canYing.png',
    ];
    for(const element of ['shui','huo','lei','feng','tu']) for(const status of ['empty','yin','yang','both']) {
        markFiles.push('mark_wuLing_'+element+'_'+status+'.png');
    }
    return {
        name:'轮回遗梦',connect:true,config:{},
        arenaReady:function() { for(const id of ['lhym_refineBegin','lhym_energyBefore','lhym_energyAfter','lhym_refineEnd','lhym_actionVoice','lhym_bgm']) game.addGlobalSkill(id); },
        content:function(){},
        precontent:function(){
            lib.config.all.background_music.add(menuTrack);
            lib.configMenu.audio.config.background_music.item[menuTrack]='御剑江湖';
            if(lib.config.extension_宿命挽歌_enable){
                lib.config.all.background_music.add(sharedMenuKey);
                lib.configMenu.audio.config.background_music.item[sharedMenuKey]='云谷鹤峰／御剑江湖（随机）';
            }else if(lib.config.background_music===sharedMenuKey){
                game.saveConfig('background_music',menuTrack);
            }
            if(!lib.lhymMenuMusicWrapped){
                lib.lhymMenuMusicWrapped=true;
                const originalPlay=game.playBackgroundMusic;
                game.playBackgroundMusic=function(){
                    if(lib.config.background_music!==sharedMenuKey||_status.tempMusic||_status._aozhan)
                        return originalPlay.apply(this,arguments);
                    const selected=sharedMenuTracks[Math.floor(Math.random()*sharedMenuTracks.length)];
                    _status.tempMusic=selected;
                    try{return originalPlay.apply(this,arguments);}
                    finally{delete _status.tempMusic;}
                };
            }
            if(!lib.config.extension_轮回遗梦_menuMusicInstalled){
                if(['music_default',menuTrack,
                    'ext:宿命挽歌/audio/bgm/yunGuHeFeng.mp3'].includes(lib.config.background_music)){
                    game.saveConfig('background_music',
                        lib.config.extension_宿命挽歌_enable?sharedMenuKey:menuTrack);
                }
                game.saveConfig('extension_轮回遗梦_menuMusicInstalled',true);
                if(ui.backgroundMusic)game.playBackgroundMusic();
            }else if(lib.config.extension_宿命挽歌_enable&&
                !lib.config.extension_轮回遗梦_sharedMenuMusicInstalled&&
                [menuTrack,'ext:宿命挽歌/audio/bgm/yunGuHeFeng.mp3'].includes(lib.config.background_music)){
                game.saveConfig('background_music',sharedMenuKey);
                if(ui.backgroundMusic)game.playBackgroundMusic();
            }
            if(lib.config.extension_宿命挽歌_enable)
                game.saveConfig('extension_轮回遗梦_sharedMenuMusicInstalled',true);
            if(!lib.lhymBgmRestoreRegistered){
                lib.lhymBgmRestoreRegistered=true;
                lib.onover.push(function(){
                    if(!_status.lhymBgmStarted)return;
                    if(ui.backgroundMusic)ui.backgroundMusic.loop=false;
                    if(_status.lhymHadTempMusic)_status.tempMusic=_status.lhymOriginalTempMusic;
                    else delete _status.tempMusic;
                    delete _status.lhymBgmStarted;
                    delete _status.lhymHadTempMusic;
                    delete _status.lhymOriginalTempMusic;
                    game.playBackgroundMusic();
                });
            }
            // 真正的联机角色包注册。外层扩展 connect:true 只代表扩展允许联机，
            // 角色本身还需要作为 connect:true 的 character pack 注册，才能稳定进入联机选将。
            if(!lib.characterPack?.lunHuiYiMeng && !(lib.imported?.character?.lunHuiYiMeng)) {
                game.import('character', function(lib, game, ui, get, ai, _status) {
                    return {
                        name:'lunHuiYiMeng',
                        connect:true,
                        character:{
                            xueJian:[null,'jiGroup',4.5,['lhym_huaYing','lhym_huZhu','lhym_wuDuGuiYuan','lhym_lvBo','lhym_tianLing','lhym_shenShu'],['ext:轮回遗梦/xueJian.png']],
                            longKui:[null,'huanGroup',4.5,['lhym_jianZhongRen','lhym_cangFeng','lhym_moJianHuTi','lhym_daiJun','lhym_buYuan','lhym_shuangSheng','lhym_huanGui','lhym_qianNian','lhym_youLan','lhym_hongYing','lhym_canYingPai'],['ext:轮回遗梦/longKui_blue.png']],
                            jingTian:[
                                null,
                                'huanGroup',
                                5,
                                ['lhym_shuangJian','lhym_yongAn','lhym_dianDang','lhym_feiLong','lhym_zhuJian','lhym_huiYan','lhym_yinDan','lhym_suYuan'],
                                ['ext:轮回遗梦/jingTian_moJian.png']
                            ],
                        },
                        translate:{
                            lunHuiYiMeng:'轮回遗梦',
                            jingTian:'景天',
                            jingTian_ab:'景天',
                            xueJian:'雪见',longKui:'龙葵',
                        },
                        characterTitle:{
                            jingTian:'永安少侠',
                            xueJian:'唐门千金',longKui:'千年剑灵',
                        },
                        characterIntro:{
                            jingTian:'永安当少侠，双剑宿缘。开局选择魔剑或镇妖剑，走不同的永久培养路线。',
                        },
                    };
                });
            }
            lib.translate.lunHuiYiMeng_character_config='轮回遗梦';
        },
        package:{
            // 景天已在 precontent 中以 connect:true 的独立 character pack 注册；
            // 这里保持为空，避免单机/联机出现双份武将定义。
            character:{character:{},translate:{},characterTitle:{},characterIntro:{}},
            card:{card:{},translate:{},list:[]},skill:{skill,translate},
            intro:'仙剑奇侠传三主题角色包：景天、雪见、龙葵。',author:'蒙牛',version:'1.2',diskURL:'',forumURL:'',
        },
        files:{character:['jingTian_moJian.png','jingTian_zhenYaoJian.png','xueJian.png','longKui_blue.png','longKui_red.png'],card:[],skill:markFiles,audio:V.files.concat(['audio/bgm/yuJianJiangHu.mp3','audio/bgm/yuManTang.mp3','audio/bgm/qingYuAn.mp3','audio/bgm/zhuShaBian.mp3','audio/bgm/huanHunCao.mp3'])},
    };
}));
