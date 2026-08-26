game.import("extension", function (lib, game, ui, get, ai, _status) {
    "use strict";

    var extensionName = "无名杯UI优化包";
    var observer = null;
    var decorateTimer = null;
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

    function toggleClass(node, name, enabled) {
        if (!node || !node.classList) return;
        node.classList.toggle(name, !!enabled);
    }

    function decorateScoreboard() {
        var board = ui.shiQiInfo || document.querySelector(".zhanJi.table");
        if (!board) return;
        board.classList.add("wmb-scoreboard");
        board.setAttribute("data-wmb-title", "仙缘 · 战局");

        var rows = board.querySelectorAll("tr");
        if (rows[1]) rows[1].classList.add("wmb-team-red");
        if (rows[2]) rows[2].classList.add("wmb-team-blue");
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

    function applyCardDefinitions() {
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
        document.querySelectorAll(".player .identity").forEach(function (identity) {
            var text = (identity.textContent || "").replace(/\s/g, "");
            var isRed = text.indexOf("红") !== -1;
            var isBlue = text.indexOf("蓝") !== -1;
            identity.classList.toggle("wmb-identity-red", isRed);
            identity.classList.toggle("wmb-identity-blue", isBlue);
        });
    }

    function applyRootClasses() {
        var body = document.body;
        if (!body) return false;
        body.classList.add("wmb-ui-optimized");
        toggleClass(body, "wmb-ui-compact", configValue("compactLayout", false));
        toggleClass(body, "wmb-ui-no-motion", !configValue("motion", true));
        toggleClass(body, "wmb-ui-strong-glass", configValue("glass", "standard") === "strong");
        return true;
    }

    function decorateGlobalUi() {
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

    function queueDecoration() {
        if (decorateTimer) return;
        decorateTimer = setTimeout(function () {
            decorateTimer = null;
            decorateArena();
        }, 0);
    }

    function decorateArena() {
        if (!applyRootClasses()) return;
        applyCardDefinitions();
        decorateGlobalUi();
        decorateScoreboard();
        decorateCards();
        decorateLightMarks();
        decorateTeamIdentities();

        if (!observer && document.documentElement) {
            observer = new MutationObserver(queueDecoration);
            // 联机大厅和对局会重建大块界面，监听根节点才能跨场景持续生效。
            observer.observe(document.documentElement, { childList: true, subtree: true });
        }
    }

    function startDecoration() {
        if (document.body) {
            decorateArena();
        } else {
            document.addEventListener("DOMContentLoaded", decorateArena, { once: true });
        }
    }

    function loadStyle() {
        if (document.querySelector("link[data-wmb-ui-style]")) return;
        var style = lib.init.css(
            lib.assetURL + "extension/" + extensionName,
            "extension"
        );
        if (style) style.setAttribute("data-wmb-ui-style", "true");
    }

    return {
        name: extensionName,
        version: "1.4",
        editable: false,
        precontent: function () {
            loadStyle();
            applyCardDefinitions();
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
            version: "1.4"
        },
        files: {
            character: [],
            card: [],
            skill: []
        }
    };
});
