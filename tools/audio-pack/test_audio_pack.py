import json
from pathlib import Path
import tempfile
import unittest
from audio_pack import pack, verify, safe


class PackTests(unittest.TestCase):
    def test_single_split_determinism_and_corruption(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            source = root / 'source'
            (source / '语音').mkdir(parents=True)
            (source / '语音' / '角色.MP3').write_bytes(bytes(range(256))*37)
            (source / 'empty.wav').write_bytes(b'')
            (source / 'image.png').write_bytes(b'not audio')
            single = pack(source, root / 'single', 20000, 1024)
            self.assertEqual(len(single['bundles']), 1)
            self.assertEqual(len(single['files']), 2)
            split = pack(source, root / 'split', 1024, 2048)
            self.assertGreater(len(split['bundles']), 1)
            self.assertTrue(all(b['size'] <= 2048 for b in split['bundles']))
            self.assertEqual(split, pack(source, root / 'split', 1024, 2048))
            verify(root / 'split', source)
            file = root / 'split' / split['bundles'][0]['name']
            file.write_bytes(file.read_bytes() + b' ')
            with self.assertRaises(ValueError):
                verify(root / 'split')
            for name in ['../escape.mp3', '/absolute.mp3', 'C:/bad.mp3', 'a\\b.mp3']:
                with self.assertRaises(ValueError):
                    safe(source, name)


if __name__ == '__main__':
    unittest.main()
