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
