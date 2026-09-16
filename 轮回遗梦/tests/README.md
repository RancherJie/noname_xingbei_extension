# 景天固定角色模拟

双击 `start.bat`，或运行 `node runtime.cjs`，默认读取同目录 `smoke.json`。只检查脚本、不启动游戏：`node runtime.cjs --check`。

3v3固定一名景天，其他五席从创世纪、电啸龙吟、宿命挽歌、轮回遗梦、峡谷幻音、永夜残响、bigcowcow中随机抽取合法角色，不重复角色或互斥形态。隐藏转化形态不参与选将；景天由AI选择武器，不注入测试材料。禁用其他扩展自动加载后，仅显式初始化七包。

默认10局，阶段上限90、单局超时100秒，其余设置见smoke.json。报告仍输出到smoke-reports，旧报告保留。

fixture-runtime.cjs保留原定向测试入口，不用于这里的正常随机对局。

`node ai-strategy.cjs` 检查魔剑AI的净化优先级、同属性双面费用、万能材料保留与攻击接法术评分；不启动游戏。`node runtime.cjs ai-smoke.json` 单独运行1局引擎回归，报告放入ai-smoke-reports，不改变start.bat默认10局。
