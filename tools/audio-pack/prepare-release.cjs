// Run after audio_pack.py pack for each extension. Updates only packed extensions.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const root = path.resolve(__dirname, '../..');
const audio = /\.(mp3|wav|ogg|m4a|aac|flac|opus|wma|aif|aiff|amr|webm)$/i;
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, text) => fs.writeFileSync(path.join(root, file), text);
const runtime = read('tools/audio-pack/runtime.js');
const begin = '/* AUDIO_PACK_RUNTIME_BEGIN */\n';
const end = '\n/* AUDIO_PACK_RUNTIME_END */\n';
let catalogText = read('catalog.js');
const catalogContext = { extension: {}, localStorage: { getItem: () => true } };
vm.runInNewContext(catalogText, catalogContext);
function list(directory, prefix = '') {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
        if (['tests', 'audio-data', '.git', '.idea', '__pycache__'].includes(entry.name)) return [];
        const relative = prefix + entry.name;
        return entry.isDirectory() ? list(path.join(directory, entry.name), relative + '/') : [relative];
    });
}
function bump(versions) {
    const arrays = versions.filter(v => /^\d+(\.\d+)+$/.test(v)).map(v => v.split('.').map(Number));
    arrays.sort((a, b) => { for (let i = 0; i < Math.max(a.length, b.length); i++) { const delta = (a[i] || 0) - (b[i] || 0); if (delta) return delta; } return 0; });
    const value = arrays.pop();
    if (!value) throw Error('Missing numeric extension version');
    value[value.length - 1]++;
    return value.join('.');
}
for (const name of fs.readdirSync(root)) {
    const directory = path.join(root, name);
    const manifestPath = name + '/audio-data/manifest.json';
    if (!fs.existsSync(path.join(root, manifestPath))) continue;
    const manifestText = read(manifestPath), manifest = JSON.parse(manifestText);
    if (manifest.format !== 2) throw Error('Unsupported manifest: ' + name);
    const meta = { name, sha256: digest(manifestText) };
    let source = read(name + '/extension.js');
    const oldSource = source;
    const prefix = 'game.import("extension", globalThis.NonameAudioPacks.wrap(' + JSON.stringify(meta) + ', ';
    if (source.startsWith(begin)) {
        source = source.slice(source.indexOf(end) + end.length);
        source = source.replace(/^game\.import\("extension", globalThis\.NonameAudioPacks\.wrap\(\{[^\n]*?\}, /, prefix);
    } else {
        if (!/^game\.import\((['"])extension\1,\s*/.test(source) || !/\}\);\s*$/.test(source)) throw Error('Unsupported extension entry: ' + name);
        source = source.replace(/^game\.import\((['"])extension\1,\s*/, prefix).replace(/\}\);\s*$/, '}));\n');
    }
    source = begin + runtime + end + source;
    const info = JSON.parse(read(name + '/info.json'));
    let packageText = read(name + '/package.js');
    const context = { extension: {} };
    vm.runInNewContext(packageText, context);
    const pack = context.extension[name];
    const versionPattern = /(["']?version["']?\s*:\s*)(["'])(\d+(?:\.\d+)+)\2/g;
    const versions = [info.version, pack.version, catalogContext.extension[name]?.version, ...Array.from(source.matchAll(versionPattern), m => m[3])];
    const version = oldSource === source ? info.version : bump(versions);
    source = source.replace(versionPattern, (_, label, quote) => label + quote + version + quote);
    new vm.Script(source, { filename: name + '/extension.js' });
    write(name + '/extension.js', source);
    info.version = version;
    write(name + '/info.json', JSON.stringify(info, null, 4) + '\n');
    const candidates = [...list(directory), ...pack.files.filter(f => fs.existsSync(path.join(directory, f)))];
    const files = [...new Set(candidates.filter(f => !audio.test(f) && !f.startsWith('audio-data/')).concat(
        'extension.js', 'audio-data/manifest.json', manifest.bundles.map(bundle => 'audio-data/' + bundle.name)
    ))].sort();
    for (const file of files) if (!fs.statSync(path.join(directory, file)).isFile()) throw Error('Not a file: ' + file);
    packageText = packageText.replace(versionPattern, (_, label, quote) => label + quote + version + quote);
    packageText = packageText.replace(/files\s*:\s*\[[\s\S]*?\]/, 'files: ' + JSON.stringify(files, null, 4));
    let size;
    for (let i = 0; i < 3; i++) {
        write(name + '/package.js', packageText);
        size = (files.reduce((sum, file) => sum + fs.statSync(path.join(directory, file)).size, 0) / 1048576).toFixed(2) + 'MB';
        packageText = packageText.replace(/size\s*:\s*(['"])[^'"]*\1/, 'size: ' + JSON.stringify(size));
    }
    write(name + '/package.js', packageText);
    const entry = { ...catalogContext.extension[name], date: '2026/09/16', version, files, size };
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp('extension\\["' + escaped + '"\\]\\s*=\\s*\\{[\\s\\S]*?\\n\\};');
    if (!pattern.test(catalogText)) throw Error('Catalog entry missing: ' + name);
    catalogText = catalogText.replace(pattern, () => 'extension[' + JSON.stringify(name) + '] = ' + JSON.stringify(entry, null, '\t') + ';');
    console.log(JSON.stringify({ name, version, audio: manifest.files.length, bundles: manifest.bundles.length, size }));
}
write('catalog.js', catalogText);
