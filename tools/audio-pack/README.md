# 音频 JSON 发布工具

扩展发布目录只保留音频 JSON；图片不转换。Base64 是文本编码，不是有损音频压缩，体积约为原音频的 4/3。

## 分包规则

- 编码后总量不超过 8 MiB：所有音频合成一个 JSON。
- 超过 8 MiB：按每包最多 **5 MiB** 分包，多个小音频合并，大音频可以跨包。
- 每个扩展另有一个 `audio-data/manifest.json`，保存音频路径、大小、SHA-256、分包 SHA-256 和资源版本。
- 路径包含中文也可以处理；图片及其他非音频文件保持原样。

## 制作更新

需要 Python 3.9+、Node.js，无第三方依赖。在仓库根目录执行，例如：

```powershell
py -3 tools/audio-pack/audio_pack.py pack "原音频工作目录/bigcowcow" bigcowcow/audio-data
node tools/audio-pack/prepare-release.cjs
```

第一个参数是完整扩展根目录，保留 `audio/...` 等相对路径。音频原件应保存在独立工作目录或从 Git 历史恢复，不要把只有 JSON 的发布目录作为重新编码的来源。默认参数为 `--single-mib 8 --part-mib 5`。

编码后自动逐字节比对还原数据和原文件。`prepare-release.cjs` 将解码器内嵌到各扩展入口，更新两个下载清单和版本号；未变化的输入重复执行不会继续增加版本。已有 `precontent` 的行为、参数和 `this` 均保留，先等待音频就绪再执行。脚本仅处理带有本工具清单的扩展。

原音频删除不由编码脚本自动执行；应先通过全部校验，再从发布副本删除清单已覆盖的音频。新一轮编码采用内容哈希文件名，旧数据包会保留；发布清单只引用新清单中的包，旧包可在确认不再引用后清理。不要仅提供本次新增的几条语音进行整包重建。

## 游戏内还原

无需玩家执行任何脚本。每个启用的扩展启动时：

1. 使用客户端 `game.promises.readFileAsText()` 读取本地清单；入口内固定清单 SHA-256，防止混用不同版本。
2. 若保存的版本和哈希一致，只读取清单，不解码、不写音频、不重启。
3. 需要还原时逐包校验，用 `atob()` 解码，使用 `createDir()` / `writeFile()` 写回原路径。
4. 使用 `readFile()` 读回并校验真实文件；Cordova 写入比旧文件短的音频时会补做截断，避免尾部残留。
5. 全部成功后保存资源版本和每个音频的 SHA-256。所有启用扩展通过同一队列还原，完成后在客户端 `onprepare` 阶段统一重启一次。

失败会提示并保留重试机会，不保存失败扩展的新版本，也不自动重启。其他已成功的扩展不需要重新解码。已保存状态代表上次成功写入结果，后续启动不重新扫描全部音频；手工删除还原文件后，可在控制台删除对应的 `noname-audio-pack-v2:扩展名` localStorage 项，再重启修复。

**`audio-data` 必须保留**，供后续启动判断版本、更新器检查和修复使用。运行后 JSON 与音频会各占一份空间。内存以一包 JSON 和当前音频为主，所有扩展串行还原；跨包的单个大音频仍需完整缓冲。

客户端依据：已检查当前星杯客户端等待异步 `precontent`、`lib.onprepare`、Electron/Node 和 Cordova 文件 API 的本地实现。多个扩展统一重启及 Cordova 截断已通过模拟测试，本次批量发布仍需安卓实机与 GitCode 下载验证。

## 校验

```powershell
py -3 tools/audio-pack/test_audio_pack.py
node tools/audio-pack/test-runtime.cjs
py -3 tools/audio-pack/audio_pack.py verify bigcowcow/audio-data
```

测试覆盖单包/跨包、中文路径、空音频、哈希损坏、写入失败、读回失败、重试、重复启动、强制修复、统一重启、实际扩展注册入口及下载清单。运行时测试模拟文件 API，不向真实客户端写入资源；原音频还存在时还会逐字节对比。
