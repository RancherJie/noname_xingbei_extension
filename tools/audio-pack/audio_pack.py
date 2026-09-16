#!/usr/bin/env python3
"""Pack extension audio into bounded JSON bundles. Python 3.9+, standard library only."""
import argparse
import base64
import hashlib
import json
from pathlib import Path

AUDIO = {'.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.opus', '.wma', '.aif', '.aiff', '.amr', '.webm'}
MIB = 1024 * 1024


def encoded(obj):
    return json.dumps(obj, ensure_ascii=True, separators=(',', ':')).encode('ascii')


def sha(data):
    return hashlib.sha256(data).hexdigest()


def safe(root, relative):
    if not isinstance(relative, str) or '\\' in relative or ':' in relative or any(p in ('', '.', '..') for p in relative.split('/')):
        raise ValueError('Unsafe path: ' + str(relative))
    target = (root / relative).resolve()
    if root.resolve() not in target.parents:
        raise ValueError('Path escapes root: ' + relative)
    return target


def audio_files(root):
    return sorted(p for p in root.rglob('*') if p.is_file() and p.suffix.lower() in AUDIO
                  and not {'.git', '.idea', '__pycache__', 'audio-data'}.intersection(p.relative_to(root).parts))


def pack(root, output, single_limit=8*MIB, part_limit=5*MIB):
    root, output = Path(root).resolve(), Path(output).resolve()
    if output == root or min(single_limit, part_limit) < 1024:
        raise ValueError('Invalid output or bundle limit')
    sources = audio_files(root)
    if not sources:
        raise ValueError('No audio files found; use the complete original audio working directory to repack')
    estimate = len(encoded({'format': 2, 'records': []}))
    for source in sources:
        name = source.relative_to(root).as_posix()
        safe(root, name)
        estimate += len(encoded({'path': name, 'offset': 0, 'base64': ''})) + 4*((source.stat().st_size+2)//3) + 1
    limit = single_limit if estimate <= single_limit else part_limit
    output.mkdir(parents=True, exist_ok=True)
    bundles, entries, records = [], [], []
    envelope = len(encoded({'format': 2, 'records': []}))
    used = envelope

    def flush():
        nonlocal records, used
        if not records:
            return
        payload = encoded({'format': 2, 'records': records})
        assert len(payload) <= limit
        checksum = sha(payload)
        name = 'pack-' + checksum + '.json'
        (output / name).write_bytes(payload)
        bundles.append({'name': name, 'size': len(payload), 'sha256': checksum})
        records, used = [], envelope

    for source in sources:
        name, size = source.relative_to(root).as_posix(), source.stat().st_size
        offset, checksum = 0, hashlib.sha256()
        with source.open('rb') as stream:
            while offset < size or (size == 0 and offset == 0):
                overhead = len(encoded({'path': name, 'offset': offset, 'base64': ''})) + bool(records)
                capacity = ((limit - used - overhead)//4)*3
                if capacity <= 0:
                    if not records:
                        raise ValueError('Path too long for bundle limit')
                    flush()
                    continue
                data = stream.read(min(size-offset, capacity))
                if len(data) != min(size-offset, capacity):
                    raise ValueError('Source changed while packing: ' + name)
                checksum.update(data)
                record = {'path': name, 'offset': offset, 'base64': base64.b64encode(data).decode('ascii')}
                used += len(encoded(record)) + bool(records)
                records.append(record)
                offset += len(data)
                if size == 0:
                    break
        entries.append({'path': name, 'size': size, 'sha256': checksum.hexdigest()})
    flush()
    manifest = {'format': 2, 'files': entries, 'bundles': bundles}
    manifest['version'] = sha(encoded(manifest))
    temp = output / 'manifest.json.tmp'
    temp.write_bytes(encoded(manifest))
    temp.replace(output / 'manifest.json')
    verify(output, root)
    return manifest


def verify(directory, originals=None):
    """Verify all bundles and reconstructed files; optionally byte-compare originals."""
    directory = Path(directory)
    manifest = json.loads((directory / 'manifest.json').read_bytes())
    if manifest.get('format') != 2:
        raise ValueError('Unsupported format')
    content = {key: value for key, value in manifest.items() if key != 'version'}
    if sha(encoded(content)) != manifest['version']:
        raise ValueError('Manifest version mismatch')
    files = manifest['files']
    index, data = 0, bytearray()
    for bundle in manifest['bundles']:
        payload = safe(directory, bundle['name']).read_bytes()
        if len(payload) != bundle['size'] or sha(payload) != bundle['sha256']:
            raise ValueError('Bundle checksum mismatch: ' + bundle['name'])
        body = json.loads(payload)
        if body.get('format') != 2:
            raise ValueError('Unsupported bundle format')
        for record in body['records']:
            if index >= len(files):
                raise ValueError('Unexpected record')
            entry = files[index]
            safe(directory, record['path'])
            if record['path'] != entry['path'] or record['offset'] != len(data):
                raise ValueError('Unordered or duplicate record')
            data.extend(base64.b64decode(record['base64'], validate=True))
            if len(data) > entry['size']:
                raise ValueError('File size overflow')
            if len(data) == entry['size']:
                if sha(data) != entry['sha256']:
                    raise ValueError('File checksum mismatch: ' + entry['path'])
                if originals is not None and safe(Path(originals), entry['path']).read_bytes() != data:
                    raise ValueError('Original differs: ' + entry['path'])
                index, data = index+1, bytearray()
    if index != len(files) or data:
        raise ValueError('Incomplete bundle set')
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    p = sub.add_parser('pack')
    p.add_argument('source', type=Path)
    p.add_argument('output', type=Path)
    p.add_argument('--single-mib', type=float, default=8)
    p.add_argument('--part-mib', type=float, default=5)
    p = sub.add_parser('verify')
    p.add_argument('source', type=Path)
    p.add_argument('--originals', type=Path)
    args = parser.parse_args()
    if args.command == 'pack':
        manifest = pack(args.source, args.output, int(args.single_mib*MIB), int(args.part_mib*MIB))
    else:
        manifest = verify(args.source, args.originals)
    print(f'{len(manifest["files"])} audio files, {len(manifest["bundles"])} JSON bundles; SHA-256 verified')


if __name__ == '__main__':
    main()
