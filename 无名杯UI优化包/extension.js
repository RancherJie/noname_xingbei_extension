game.import("extension", function (lib, game, ui, get, ai, _status) {
    "use strict";

    var extensionName = "无名杯UI优化包";
    var observer = null;
    var decorateTimer = null;
    var combatLines = [];
    var combatLineHookInstalled = false;
    var combatLineSequence = 0;
    var currentCombatLineId = null;
    var skillFxInstalled = false;
    var recentSkillFx = new WeakMap();
    var clickFxInstalled = false;
    var targetDoubleClickGuardInstalled = false;
    var cardArtMap = {
        anMie: "anMie_xianxia.png",
        shuiLianZhan: "shuiLianZhan_xianxia.png",
        huoYanZhan: "huoYanZhan_xianxia.png",
        fengShenZhan: "fengShenZhan_xianxia.png",
        leiGuangZhan: "leiGuangZhan_xianxia.png",
        diLieZhan: "diLieZhan_xianxia.png",
        shengGuang: "shengGuang_xianxia.png",
        shengDun: "shengDun_xianxia.png",
        xuRuo: "xuRuo_xianxia.png",
        zhongDu: "zhongDu_xianxia.png",
        moDan: "moDan_xianxia.png",
        moRen: "moRen_xianxia.png",
        yiRen: "yiRen_xianxia.png"
    };
    var markArtMap = {
        _shengDun: "shengDun_xianxia.png",
        _xuRuo: "xuRuo_xianxia.png",
        _zhongDu: "zhongDu_xianxia.png",
        _moDan: "moDan_xianxia.png"
    };
    var resourceMarkArtMap = {
        baoShi: "baoShi_xianxia.png",
        shuiJing: "shuiJing_xianxia.png"
    };
    var lightMarkArtMap = {
        "image/card/zhiShiWu/hong.png": "huangDeng_xianxia.png",
        "image/card/zhiShiWu/lan.png": "lanDeng_xianxia.png"
    };

    function configValue(key, fallback) {
        var name = "extension_" + extensionName + "_" + key;
        return lib.config[name] === undefined ? fallback : lib.config[name];
    }

    function currentTheme() {
        return configValue("uiTheme", "xianjian");
    }

    function isXianJianTheme() {
        return currentTheme() === "xianjian";
    }

    function isWaterbearTheme() {
        return currentTheme() === "waterbear";
    }

    function isCustomTheme() {
        return isXianJianTheme() || isWaterbearTheme();
    }

    function toggleClass(node, name, enabled) {
        if (!node || !node.classList) return;
        node.classList.toggle(name, !!enabled);
    }

    function decorateScoreboard() {
        if (!isCustomTheme()) return;
        var board = ui.shiQiInfo || document.querySelector(".zhanJi.table");
        if (!board) return;
        board.classList.add("wmb-scoreboard");
        board.setAttribute(
            "data-wmb-title",
            isWaterbearTheme() ? "战局纪要" : "仙缘 · 战局"
        );

        var rows = board.querySelectorAll("tr");
        if (rows[1]) rows[1].classList.add("wmb-team-red");
        if (rows[2]) rows[2].classList.add("wmb-team-blue");
        if (isXianJianTheme()) {
            var imageRoot = lib.assetURL + "extension/" + extensionName + "/image/";
            board.querySelectorAll("td:nth-child(2) img").forEach(function (image) {
                var source = image.getAttribute("src") || "";
                if (source.indexOf("baoShi") !== -1) {
                    image.src = imageRoot + "baoShi_xianxia.png";
                } else if (source.indexOf("shuiJing") !== -1) {
                    image.src = imageRoot + "shuiJing_xianxia.png";
                }
                image.classList.add("wmb-starstone");
            });
        }
    }

    function applyCardDefinitions() {
        if (!isXianJianTheme()) return;
        if (!configValue("cardArt", true)) return;
        Object.keys(cardArtMap).forEach(function (name) {
            if (!lib.card[name]) return;
            lib.card[name].image = "ext:" + extensionName + "/image/card/" + cardArtMap[name];
        });
        Object.keys(markArtMap).forEach(function (name) {
            if (!lib.skill[name]) return;
            lib.skill[name].markimage = "extension/" + extensionName + "/image/card/" + markArtMap[name];
        });
        Object.keys(resourceMarkArtMap).forEach(function (name) {
            var image = "extension/" + extensionName + "/image/" + resourceMarkArtMap[name];
            var expandedName = "_tiLian_" + name;
            if (lib.skill[expandedName]) lib.skill[expandedName].markimage = image;
            if (lib.skill._tiLian && lib.skill._tiLian.subSkill && lib.skill._tiLian.subSkill[name]) {
                lib.skill._tiLian.subSkill[name].markimage = image;
            }
        });
        Object.keys(lib.skill).forEach(function (name) {
            var skill = lib.skill[name];
            if (!skill || !lightMarkArtMap[skill.markimage]) return;
            skill.markimage = "extension/" + extensionName + "/image/" + lightMarkArtMap[skill.markimage];
        });
    }

    function decorateLightMarks() {
        if (!isXianJianTheme()) return;
        document.querySelectorAll(".player .card.mark").forEach(function (mark) {
            var skill = mark.name && lib.skill[mark.name];
            if (!skill || typeof skill.markimage != "string" ||
                skill.markimage.indexOf("extension/" + extensionName + "/image/") !== 0) return;
            if (skill.markimage.indexOf("huangDeng_xianxia.png") === -1 &&
                skill.markimage.indexOf("lanDeng_xianxia.png") === -1) return;
            if (mark.setBackgroundImage) mark.setBackgroundImage(skill.markimage);
        });
    }

    function decorateCards() {
        if (!isXianJianTheme()) return;
        if (!configValue("cardArt", true)) return;
        var imageRoot = "extension/" + extensionName + "/image/card/";
        document.querySelectorAll(".card").forEach(function (card) {
            var name = card.name;
            if (!name || !cardArtMap[name] || card.dataset.wmbCardArt === name) return;
            if (card.node && card.node.image && card.node.image.setBackgroundImage) {
                card.node.image.setBackgroundImage(imageRoot + cardArtMap[name]);
                card.dataset.wmbCardArt = name;
            }
        });
    }

    function decorateTeamIdentities() {
        if (!isCustomTheme()) return;
        document.querySelectorAll(".player .identity").forEach(function (identity) {
            var text = (identity.textContent || "").replace(/\s/g, "");
            var isRed = text.indexOf("红") !== -1;
            var isBlue = text.indexOf("蓝") !== -1;
            identity.classList.toggle("wmb-identity-red", isRed);
            identity.classList.toggle("wmb-identity-blue", isBlue);
            var player = identity.closest(".player");
            if (player) {
                player.classList.toggle("wmb-team-slot-red", isRed);
                player.classList.toggle("wmb-team-slot-blue", isBlue);
            }
        });
    }

    function decorateTargetSelection() {
        if (!isXianJianTheme() || !ui.arena) return;
        var selecting = ui.arena.classList.contains("selecting");
        var selected = ui.selected && Array.isArray(ui.selected.targets) ?
            ui.selected.targets : Array.prototype.slice.call(
                document.querySelectorAll("#arena .player.selected")
            );
        var numerals = ["壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        document.querySelectorAll("#arena .player").forEach(function (player) {
            var index = selected.indexOf(player);
            var badge = player.querySelector(":scope > .wmb-target-order");
            if (selecting && index !== -1) {
                if (!badge) {
                    badge = document.createElement("div");
                    badge.className = "wmb-target-order";
                    player.appendChild(badge);
                }
                var orderText = numerals[index] || String(index + 1);
                if (badge.textContent !== orderText) badge.textContent = orderText;
            } else if (badge) {
                badge.remove();
            }
        });

        var counter = document.querySelector(".wmb-target-counter");
        var range = null;
        if (selecting && _status.event && _status.event.selectTarget !== undefined) {
            try { range = get.select(_status.event.selectTarget); } catch (error) {}
        }
        var maximum = range && range[1];
        var multiple = maximum === Infinity || maximum === -1 || maximum > 1;
        if (selecting && multiple) {
            if (!counter) {
                counter = document.createElement("div");
                counter.className = "wmb-target-counter";
                document.body.appendChild(counter);
            }
            var counterText = "已选 " + selected.length + "/" +
                (maximum === Infinity || maximum === -1 ? "不限" : maximum);
            if (counter.textContent !== counterText) counter.textContent = counterText;
        } else if (counter) {
            counter.remove();
        }
    }

    function decorateTurnIndicators() {
        if (!isXianJianTheme()) return;
        document.querySelectorAll("#arena .player:not(.minskin)").forEach(function (player) {
            if (!player.querySelector(":scope > .wmb-xj-turn-shade")) {
                var shade = document.createElement("div");
                shade.className = "wmb-xj-turn-shade";
                player.appendChild(shade);
            }
            if (!player.querySelector(":scope > .wmb-xj-turn-label")) {
                var label = document.createElement("div");
                label.className = "wmb-xj-turn-label";
                label.textContent = "当前回合";
                player.appendChild(label);
            }
        });
    }

    function applyRootClasses() {
        var body = document.body;
        if (!body) return false;
        if (!isCustomTheme()) return false;
        toggleClass(body, "wmb-ui-waterbear", isWaterbearTheme());
        toggleClass(body, "wmb-ui-no-motion", !configValue("motion", true));
        if (isWaterbearTheme()) return true;
        body.classList.add("wmb-ui-optimized");
        toggleClass(body, "wmb-ui-compact", configValue("compactLayout", false));
        toggleClass(body, "wmb-ui-strong-glass", configValue("glass", "standard") === "strong");
        return true;
    }

    function decorateGlobalUi() {
        if (!isCustomTheme()) return;
        document.querySelectorAll("#system1 > div, #system2 > div").forEach(function (button) {
            button.classList.add("wmb-system-button");
        });
        document.querySelectorAll(".dialog.popped, .menubg.charactercard").forEach(function (detail) {
            detail.classList.add("wmb-detail-panel");
        });
        document.querySelectorAll(".player.connect").forEach(function (player) {
            player.classList.add("wmb-connect-player");
        });
        document.querySelectorAll(".connectbutton").forEach(function (button) {
            button.classList.add("wmb-connect-button");
        });
        document.querySelectorAll(".dialog.fullwidth.fullheight.fixed").forEach(function (rooms) {
            rooms.classList.add("wmb-room-list");
        });
        document.querySelectorAll(".connectevents").forEach(function (button) {
            button.classList.add("wmb-connect-hall-button");
        });
    }

    function decorateFactionFrames() {
        if (!isWaterbearTheme()) return;
        var factionClasses = [
            "wmb-wb-faction-xue", "wmb-wb-faction-sheng",
            "wmb-wb-faction-ji", "wmb-wb-faction-huan",
            "wmb-wb-faction-yong", "wmb-wb-faction-other"
        ];
        document.querySelectorAll(".player").forEach(function (player) {
            factionClasses.forEach(function (name) {
                player.classList.remove(name);
            });
            var group = player.group;
            if (!group) {
                var character = lib.character[player.name1 || player.name];
                if (character) group = character[1];
            }
            var faction = {
                xueGroup: "xue",
                shengGroup: "sheng",
                jiGroup: "ji",
                huanGroup: "huan",
                yongGroup: "yong"
            }[group] || "other";
            player.classList.add("wmb-wb-faction-" + faction);
            player.setAttribute("data-wmb-faction", faction);
            if (!player.querySelector(":scope > .wmb-wb-frame-left")) {
                var frame = document.createElement("div");
                frame.className = "wmb-wb-frame-left";
                player.appendChild(frame);
            }
        });
    }

    function skillFxType(name) {
        var title = get.translation(name) || "";
        var info = lib.skill[name] || {};
        if (info.type === "faShu" || title.indexOf("法术") === 0 ||
            title.indexOf("启动") === 0) return "spell";
        if (title.indexOf("响应") === 0) return "response";
        return "passive";
    }

    function skillFxText(name, player) {
        var internalName = typeof name === "string" ? name : "";
        var healingSuffix = /_zhiliao$/i.test(internalName);
        if (healingSuffix) {
            var baseName = internalName.replace(/_zhiliao$/i, "");
            var baseText = baseName ? get.translation(baseName) : "";
            if (baseText && baseText !== baseName) return baseText + "·治疗";
            return "治疗";
        }
        var text = get.skillTranslation ?
            get.skillTranslation(internalName, player) : get.translation(internalName);
        if (!text || text === internalName) {
            text = get.translation(internalName);
        }
        return text && text !== internalName ? text : "技能发动";
    }

    function refreshSkillFxPositions() {
        document.querySelectorAll(".wmb-skill-banner").forEach(function (banner, index) {
            banner.style.setProperty("--wmb-skill-offset", (index * 62) + "px");
        });
    }

    function playSkillFx(player, name) {
        if (!isCustomTheme() || !document.body || !player) return;
        var now = Date.now();
        var recent = recentSkillFx.get(player);
        if (recent && recent.name === name && now - recent.time < 220) return;
        recentSkillFx.set(player, { name: name, time: now });
        var type = skillFxType(name);
        var prefix = isWaterbearTheme() ? "wmb-wb" : "wmb-xj";
        var banner = document.createElement("div");
        banner.className = "wmb-skill-banner " + prefix +
            "-skill-banner " + prefix + "-skill-" + type;
        banner.textContent = skillFxText(name, player);
        document.body.appendChild(banner);
        refreshSkillFxPositions();
        player.classList.add(prefix + "-skill-source", prefix + "-skill-source-" + type);
        setTimeout(function () {
            banner.remove();
            refreshSkillFxPositions();
            player.classList.remove(
                prefix + "-skill-source",
                prefix + "-skill-source-" + type
            );
        }, 1650);
    }

    function installSkillFx() {
        if (skillFxInstalled || !isCustomTheme() ||
            !lib.element || !lib.element.player ||
            typeof lib.element.player.logSkill !== "function" ||
            typeof lib.element.player.useSkill !== "function") return;
        skillFxInstalled = true;
        var originalLogSkill = lib.element.player.logSkill;
        lib.element.player.logSkill = function (name) {
            var skillName = Array.isArray(name) ? name[0] : name;
            var result = originalLogSkill.apply(this, arguments);
            playSkillFx(this, skillName);
            return result;
        };
        var originalUseSkill = lib.element.player.useSkill;
        lib.element.player.useSkill = function () {
            var skillName = "";
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === "string") skillName = arguments[i];
            }
            var result = originalUseSkill.apply(this, arguments);
            if (skillName) playSkillFx(this, skillName);
            return result;
        };
    }

    function attackColor(card) {
        var xiBie = card ? get.xiBie(card) : "";
        return ["shui", "huo", "feng", "lei", "di", "guang", "an"]
            .includes(xiBie) ? xiBie : "default";
    }

    function combatFxPrefix() {
        return isWaterbearTheme() ? "wmb-wb" : "wmb-xj";
    }

    function clearCombatLines() {
        combatLines.forEach(function (line) { line.remove(); });
        combatLines.length = 0;
        currentCombatLineId = null;
    }

    function addCombatLineFallback(source, target, color) {
        var parent = game.chess && ui.chess ? ui.chess : ui.arena;
        if (!source || !target || !parent) return;
        var x1 = source.getLeft() + source.offsetWidth / 2;
        var y1 = source.getTop() + source.offsetHeight / 2;
        var x2 = target.getLeft() + target.offsetWidth / 2;
        var y2 = target.getTop() + target.offsetHeight / 2;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var deg = Math.atan(Math.abs(dy) / Math.abs(dx)) / Math.PI * 180;
        if (dx >= 0) {
            if (dy <= 0) deg += 90;
            else deg = 90 - deg;
        } else if (dy <= 0) {
            deg = 270 - deg;
        } else {
            deg += 270;
        }
        var line = document.createElement("div");
        var prefix = combatFxPrefix();
        line.className = prefix + "-attack-fallback " + prefix + "-line-" + color;
        line.style.left = (x1 - 3.5) + "px";
        line.style.top = y1 + "px";
        line.style.height = Math.sqrt(dx * dx + dy * dy) + "px";
        var transform = "rotate(" + (-deg) + "deg)";
        line.style.transitionProperty = "transform";
        line.style.transitionDuration = ((Number(lib.config.duration) || 500) * 2 / 3000) + "s";
        line.style.transitionTimingFunction = "ease-out";
        line.style.transform = transform + " scaleY(0)";
        parent.appendChild(line);
        ui.refresh(line);
        line.style.transform = transform + " scaleY(1)";
        combatLines.push(line);
    }

    function installCombatLineHook() {
        if (combatLineHookInstalled || !isCustomTheme() ||
            !lib.element || !lib.element.player ||
            typeof lib.element.player.line !== "function") return;
        combatLineHookInstalled = true;
        var original = lib.element.player.line;
        lib.element.player.line = function (target, config) {
            var current = _status.event;
            var attackCard = current && current.card &&
                get.type(current.card, this) === "gongJi" ? current.card : null;
            var marker = config;
            if (attackCard) {
                if (!marker || typeof marker !== "object") marker = {};
                marker._wmbAttackColor = attackColor(attackCard);
                if (!current._wmbAttackLineId) {
                    combatLineSequence++;
                    current._wmbAttackLineId = "wmb-attack-" + combatLineSequence;
                }
                marker._wmbAttackLineId = current._wmbAttackLineId;
            }
            var result = original.call(this, target, marker);
            if (marker && typeof marker === "object" &&
                marker._wmbAttackColor && get.itemtype(target) === "player") {
                if (currentCombatLineId !== marker._wmbAttackLineId) {
                    clearCombatLines();
                    currentCombatLineId = marker._wmbAttackLineId;
                }
                addCombatLineFallback(this, target, marker._wmbAttackColor);
            }
            return result;
        };
    }

    function showHitFx(trigger) {
        var target = trigger.target;
        if (!target || !document.body) return;
        var rect = target.getBoundingClientRect();
        var fx = document.createElement("div");
        var prefix = combatFxPrefix();
        fx.className = prefix + "-hit-fx " + prefix + "-hit-" + attackColor(trigger.card);
        fx.style.left = (rect.left + rect.width / 2) + "px";
        fx.style.top = (rect.top + rect.height / 2) + "px";
        document.body.appendChild(fx);
        setTimeout(function () { fx.remove(); }, 850);
    }

    function installCombatFx() {
        if (!isCustomTheme() || lib.skill._wmbCombatFx) return;
        lib.skill._wmbCombatFx = {
            trigger: {
                global: ["gongJiMingZhong", "gongJiEnd"]
            },
            forced: true,
            silent: true,
            popup: false,
            priority: -999,
            showHitFx: showHitFx,
            clearCombatLines: clearCombatLines,
            content: function (event, trigger) {
                var name = event.triggername || trigger.name;
                if (name === "gongJiMingZhong") {
                    lib.skill._wmbCombatFx.showHitFx(trigger);
                } else if (name === "gongJiEnd") {
                    lib.skill._wmbCombatFx.clearCombatLines();
                }
            }
        };
        if (!lib.skill.global.includes("_wmbCombatFx")) {
            lib.skill.global.push("_wmbCombatFx");
        }
    }

    function installClickFx() {
        if (clickFxInstalled || !isWaterbearTheme()) return;
        clickFxInstalled = true;
        document.addEventListener("pointerdown", function (event) {
            if (!isWaterbearTheme()) return;
            var target = event.target.closest(
                ".control, .menubutton, .button, .card, .wmb-system-button, .connectbutton"
            );
            if (!target) return;
            var rect = target.getBoundingClientRect();
            var ripple = document.createElement("span");
            ripple.className = "wmb-wb-click-ripple";
            ripple.style.left = (event.clientX - rect.left) + "px";
            ripple.style.top = (event.clientY - rect.top) + "px";
            target.appendChild(ripple);
            setTimeout(function () { ripple.remove(); }, 520);
        }, true);
    }

    function installTargetDoubleClickGuard() {
        if (targetDoubleClickGuardInstalled) return;
        targetDoubleClickGuardInstalled = true;

        function blockTargetDoubleClick(event) {
            if (!isCustomTheme() || !ui.arena ||
                !ui.arena.classList.contains("selecting")) return;
            if (event.type === "click" && event.detail < 2) return;
            if (!event.target || !event.target.closest) return;
            var avatar = event.target.closest("#arena .player .avatar, #arena .player .avatar2");
            if (!avatar || !ui.arena.contains(avatar)) return;
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        }

        // 核心通过头像的连续两次 click 打开属性；同时拦截 dblclick 作为兼容保护。
        document.addEventListener("click", blockTargetDoubleClick, true);
        document.addEventListener("dblclick", blockTargetDoubleClick, true);
    }

    function queueDecoration() {
        if (decorateTimer) return;
        decorateTimer = setTimeout(function () {
            decorateTimer = null;
            decorateArena();
        }, 0);
    }

    function isTransientWaterbearFx(node) {
        if (!node || node.nodeType !== 1 || !node.classList) return false;
        return node.classList.contains("wmb-wb-attack-line") ||
            node.classList.contains("wmb-wb-attack-fallback") ||
            node.classList.contains("wmb-wb-hit-fx") ||
            node.classList.contains("wmb-xj-attack-line") ||
            node.classList.contains("wmb-xj-attack-fallback") ||
            node.classList.contains("wmb-xj-hit-fx") ||
            node.classList.contains("wmb-skill-banner") ||
            node.classList.contains("wmb-wb-skill-banner") ||
            node.classList.contains("wmb-xj-skill-banner") ||
            node.classList.contains("wmb-wb-click-ripple");
    }

    function observeUiChanges(records) {
        var needsDecoration = records.some(function (record) {
            if (record.type === "attributes" && record.target &&
                record.target.classList &&
                (record.target === ui.arena || record.target.classList.contains("player"))) {
                return true;
            }
            var changed = Array.prototype.slice.call(record.addedNodes || [])
                .concat(Array.prototype.slice.call(record.removedNodes || []));
            return changed.some(function (node) {
                return node.nodeType === 1 && !isTransientWaterbearFx(node);
            });
        });
        if (needsDecoration) queueDecoration();
    }

    function decorateArena() {
        if (!applyRootClasses()) return;
        applyCardDefinitions();
        decorateGlobalUi();
        decorateScoreboard();
        decorateCards();
        decorateLightMarks();
        decorateTeamIdentities();
        decorateTargetSelection();
        decorateTurnIndicators();
        decorateFactionFrames();
        installClickFx();
        installTargetDoubleClickGuard();

        if (!observer && document.documentElement) {
            observer = new MutationObserver(observeUiChanges);
            // 联机大厅和对局会重建大块界面，监听根节点才能跨场景持续生效。
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ["class"]
            });
        }
    }

    function startDecoration() {
        if (!isCustomTheme()) return;
        if (document.body) {
            decorateArena();
        } else {
            document.addEventListener("DOMContentLoaded", decorateArena, { once: true });
        }
    }

    function loadStyle() {
        if (!isCustomTheme()) return;
        if (document.querySelector("link[data-wmb-ui-style]")) return;
        var style = lib.init.css(
            lib.assetURL + "extension/" + extensionName,
            isWaterbearTheme() ? "waterbear" : "extension"
        );
        if (style) style.setAttribute("data-wmb-ui-style", "true");
    }

    return {
        name: extensionName,
        version: "2.1",
        editable: false,
        precontent: function () {
            loadStyle();
            applyCardDefinitions();
            installSkillFx();
            installCombatLineHook();
            installCombatFx();
            // 联机大厅先于 arenaReady 创建，必须从预加载阶段启用全局皮肤。
            startDecoration();
        },
        arenaReady: function () {
            applyCardDefinitions();
            decorateArena();
        },
        content: function () {
            applyCardDefinitions();
            if (document.body) decorateArena();
        },
        config: {
            uiTheme: {
                name: "界面版本",
                init: "xianjian",
                item: {
                    original: "原版",
                    xianjian: "仙剑版（当前版本）",
                    waterbear: "水熊版"
                },
                intro: "切换后请重新启动游戏。原版不加载本扩展样式；仙剑版为水墨仙侠主题；水熊版为羊皮纸桌游主题。"
            },
            compactLayout: {
                name: "紧凑角色与操作面板",
                init: false,
                intro: "适合较小分辨率；缩小面板间距，但不缩小卡牌与关键数值。"
            },
            glass: {
                name: "磨砂面板强度",
                init: "standard",
                item: {
                    standard: "标准",
                    strong: "浓郁"
                }
            },
            motion: {
                name: "启用轻量动效",
                init: true,
                intro: "为可操作按钮、当前角色与战况面板启用轻微呼吸和悬停反馈。"
            },
            cardArt: {
                name: "启用仙侠风卡面与状态图",
                init: true,
                intro: "替换无名杯六系攻击牌、基础效果牌、魔弹、魔刃与异刃的卡面；关闭后保留原卡面。"
            }
        },
        help: {
            "无名杯UI优化包": "独立优化无名杯对局界面。采用水墨青黛、旧宣纸、青玉、暗金铜饰与云气剑纹，覆盖战况面板、角色框、手牌、行动按钮、技能栏、选择弹窗与日志显示，不修改游戏规则或核心文件。"
        },
        package: {
            intro: "优化无名杯对局UI：重绘战况面板视觉，统一角色框、行动按钮、技能栏、卡牌、弹窗与日志的美术语言。",
            author: "蒙牛 / Codex",
            diskURL: "",
            forumURL: "",
            version: "2.1"
        },
        files: {
            character: [],
            card: [],
            skill: []
        }
    };
});
