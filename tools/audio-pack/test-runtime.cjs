const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const crypto = require('crypto');
const root = path.resolve(__dirname, '../..');
const runtime = fs.readFileSync(path.join(__dirname, 'runtime.js'), 'utf8');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const originals = new Map();
const metadata = fs.readdirSync(root).filter(name => fs.existsSync(path.join(root, name, 'audio-data/manifest.json'))).map(name => {
    const text = fs.readFileSync(path.join(root, name, 'audio-data/manifest.json'), 'utf8');
    for (const file of JSON.parse(text).files) originals.set('extension/' + name + '/' + file.path, file);
    return { name, sha256: hash(text) };
});
function environment(storage = new Map()) {
    const writes = new Map();
    const state = { writes: 0, reads: 0, reloads: 0, progress: 0 };
    const lib = { onprepare: [] };
    const game = {
        promises: {
            readFileAsText: async filename => {
                state.reads++;
                return fs.readFileSync(path.join(root, filename.slice('extension/'.length)), 'utf8');
            },
            createDir: async () => {},
            writeFile: async (data, directory, name) => {
                const filename = directory + '/' + name, bytes = Buffer.from(data);
                const expected = originals.get(filename);
                if (expected) {
                    assert.equal(bytes.length, expected.size);
                    assert.equal(hash(bytes), expected.sha256);
                    const original = path.join(root, filename.slice('extension/'.length));
                    if (fs.existsSync(original)) assert.deepEqual(bytes, fs.readFileSync(original));
                }
                writes.set(filename, bytes);
                state.writes++;
            },
            readFile: async filename => {
                if (!writes.has(filename)) throw Error('File missing');
                const bytes = writes.get(filename);
                // Exercise both Node Buffer and Cordova ArrayBuffer results.
                return state.writes % 2 ? bytes : bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
            },
        },
        reload: () => { state.reloads++; },
    };
    const context = vm.createContext({
        console, crypto: crypto.webcrypto, atob, setTimeout, game, lib,
        localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    });
    vm.runInContext(runtime, context);
    return { context, api: context.NonameAudioPacks, storage, game, lib, writes, state };
}
function fixture(env) {
    const raw = Buffer.from('fixture audio'), bundle = JSON.stringify({ format: 2, records: [{ path: 'audio/test.mp3', offset: 0, base64: raw.toString('base64') }] });
    const manifest = JSON.stringify({ format: 2, version: 'test-version', files: [{ path: 'audio/test.mp3', size: raw.length, sha256: hash(raw) }], bundles: [{ name: 'pack.json', size: bundle.length, sha256: hash(bundle) }] });
    env.game.promises.readFileAsText = async filename => filename.endsWith('manifest.json') ? manifest : bundle;
    return { meta: { name: 'fixture', sha256: hash(manifest) }, raw, manifest, bundle };
}
(async () => {
    const first = environment();
    for (const length of [0, 1, 55, 56, 64, 10000, 100000]) {
        const raw = crypto.randomBytes(length);
        assert.equal(first.api.sha256(raw), hash(raw));
    }
    let initialized = 0;
    const start = metadata.map(meta => {
        const factory = first.api.wrap(meta, () => ({ name: meta.name, precontent(config) { assert.equal(this.name, meta.name); assert.equal(config, 'config'); initialized++; } }));
        return factory(first.lib, first.game).precontent('config');
    });
    await Promise.all(start);
    assert.equal(initialized, metadata.length);
    assert.equal(first.state.writes, originals.size);
    assert.equal(first.state.reloads, 0);
    assert.equal(first.lib.onprepare.length, 1);
    await first.lib.onprepare[0]();
    assert.equal(first.state.reloads, 1);
    const next = environment(first.storage);
    await Promise.all(metadata.map(meta => next.api.prepare(meta, next.lib, next.game)));
    await next.lib.onprepare[0]();
    assert.equal(next.state.reads, metadata.length);
    assert.equal(next.state.writes, 0);
    assert.equal(next.state.reloads, 0);
    console.log(`Full restore passed: ${metadata.length} extensions, ${first.state.writes} audio files; one restart, second boot reads manifests only.`);

    const bad = environment(), badFixture = fixture(bad);
    bad.game.promises.readFileAsText = async filename => filename.endsWith('manifest.json') ? badFixture.manifest : badFixture.bundle + ' ';
    await assert.rejects(bad.api.install(badFixture.meta, bad.game));
    assert.equal(bad.storage.size, 0);
    assert.equal(bad.state.writes, 0);
    fixture(bad);
    bad.game.promises.writeFile = async () => { throw Error('disk full'); };
    await assert.rejects(bad.api.install(badFixture.meta, bad.game), /disk full/);
    assert.equal(bad.storage.size, 0);
    // A client can resolve writeFile even when the underlying Cordova operation failed.
    bad.game.promises.writeFile = async () => {};
    await assert.rejects(bad.api.install(badFixture.meta, bad.game), /File missing/);
    assert.equal(bad.storage.size, 0);

    const retry = environment(), retryFixture = fixture(retry);
    assert.equal(await retry.api.install(retryFixture.meta, retry.game), true);
    assert.equal(await retry.api.install(retryFixture.meta, retry.game), false);
    assert.equal(await retry.api.install(retryFixture.meta, retry.game, { force: true }), true);
    const mismatch = { ...retryFixture.meta, sha256: '0'.repeat(64) };
    await assert.rejects(retry.api.install(mismatch, retry.game));

    const cordova = environment(), cf = fixture(cordova);
    cordova.storage.set('noname_inited', 'file:///game/');
    cordova.game.promises.writeFile = async (bytes, dir, name) => cordova.writes.set(dir + '/' + name, Buffer.concat([Buffer.from(bytes), Buffer.from('old trailing bytes')]));
    let truncations = 0;
    cordova.context.resolveLocalFileSystemURL = (url, success) => success({
        createWriter: ready => {
            const writer = { truncate: length => {
                truncations++;
                const filename = url.slice('file:///game/'.length);
                cordova.writes.set(filename, cordova.writes.get(filename).subarray(0, length));
                writer.onwriteend();
            } };
            ready(writer);
        },
    });
    assert.equal(await cordova.api.install(cf.meta, cordova.game), true);
    assert.equal(truncations, 1);
    console.log('Failure/retry, forced repair, manifest/bundle corruption, SHA fallback and Cordova shorter-file overwrite passed.');

    const catalog = { extension: {}, localStorage: { getItem: () => true } };
    vm.runInNewContext(fs.readFileSync(path.join(root, 'catalog.js'), 'utf8'), catalog);
    let imports = 0;
    const registration = environment();
    registration.game.import = (type, factory) => { assert.equal(type, 'extension'); assert.equal(typeof factory, 'function'); imports++; };
    for (const meta of metadata) {
        const source = fs.readFileSync(path.join(root, meta.name, 'extension.js'), 'utf8');
        assert(source.includes(JSON.stringify(meta)));
        vm.runInContext(source, registration.context, { filename: meta.name + '/extension.js' });
        const c = { extension: {} };
        vm.runInNewContext(fs.readFileSync(path.join(root, meta.name, 'package.js'), 'utf8'), c);
        const info = JSON.parse(fs.readFileSync(path.join(root, meta.name, 'info.json')));
        for (const entry of [catalog.extension[meta.name], c.extension[meta.name]]) {
            assert.equal(entry.version, info.version);
            assert(entry.files.includes('extension.js'));
            assert(entry.files.includes('audio-data/manifest.json'));
            assert(!entry.files.some(file => /\.(mp3|wav|ogg|m4a|aac|flac|opus|wma|aif|aiff|amr|webm)$/i.test(file)));
            for (const file of entry.files) assert(fs.existsSync(path.join(root, meta.name, file)), file);
            const manifest = JSON.parse(fs.readFileSync(path.join(root, meta.name, 'audio-data/manifest.json')));
            for (const bundle of manifest.bundles) assert(entry.files.includes('audio-data/' + bundle.name));
        }
    }
    assert.equal(imports, metadata.length);
    console.log('All real extension entries register successfully; versions and both download manifests verified.');
})().catch(error => { console.error(error); process.exitCode = 1; });
