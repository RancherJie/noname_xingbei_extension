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
    var musicPanel = null;
    var musicTimer = null;
    var musicLayoutObserver = null;
    var musicObservedBoard = null;
    var musicPositionFrame = null;
    var musicEndedHookInstalled = false;
    var musicMode = "single";
    var musicTracks = [];
    var musicUserPaused = false;
    var musicCollapsed = true;
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

    function battleMusicTracks() {
        var tracks = [];
        var players = (game.players || []).filter(function (player) {
            return player && (!player.isIn || player.isIn());
        });
        function hasCharacter(id) {
            return players.some(function (player) {
                return [player.name, player.name1, player.name2].includes(id);
            });
        }
        function add(name, path) {
            if (!tracks.some(function (track) { return track.path === path; }))
                tracks.push({ name: name, path: path });
        }
        if (lib.config.extension_宿命挽歌_enable) {
            [
                ["shuiMoShouBaiYueJiaoZhu", "逆天而行2", "niTianErXing2"],
                ["baiYueJiaoZhu", "逆天而行", "niTianErXing"],
                ["guiJiangJun", "兵凶战危", "bingXiongZhanWei"],
                ["sheYaoNan", "心急如焚", "xinJiRuFen"],
                ["huYaoNv", "心急如焚", "xinJiRuFen"],
                ["linYueRu", "比武招亲", "biWuZhaoQin"],
                ["aNu", "桃花幻梦", "taoHuaHuanMeng"],
                ["zhaoLingEr", "情怨", "qingYuan"],
                ["liXiaoYao", "御剑伏魔", "yuJianFuMo"],
                ["zhaoFuQueJi", "杠杠姬姬", "gangGangJiJi"],
                ["tongGuHeRen", "Swordland", "swordland"],
                ["shiDiFu", "Pigstep", "pigstep"],
                ["xiaoYan", "斗破苍穹", "douPoCangQiong"]
            ].forEach(function (entry) {
                if (hasCharacter(entry[0]))
                    add(entry[1], "ext:宿命挽歌/audio/bgm/" + entry[2] + ".mp3");
            });
        }
        if (hasCharacter("jingTian")) add("玉满堂", "ext:轮回遗梦/audio/bgm/yuManTang.mp3");
        if (hasCharacter("longKui")) {
                var red = players.some(function (player) {
                    return [player.name, player.name1, player.name2].includes("longKui") &&
                        player.storage && player.storage.lhym_red === true;
                });
                var longKuiSongs = red ? [
                    ["朱砂变", "zhuShaBian"], ["青玉案", "qingYuAn"]
                ] : [
                    ["青玉案", "qingYuAn"], ["朱砂变", "zhuShaBian"]
                ];
                longKuiSongs.forEach(function (song) {
                    add(song[0], "ext:轮回遗梦/audio/bgm/" + song[1] + ".mp3");
                });
        }
        if (hasCharacter("xueJian")) add("还魂草", "ext:轮回遗梦/audio/bgm/huanHunCao.mp3");
        if (hasCharacter("xieLing"))
            add("临危·变调", "ext:轮回遗梦/audio/bgm/linWeiBianDiao.mp3");
        else if (hasCharacter("xieJianXian"))
            add("临危", "ext:轮回遗梦/audio/bgm/linWei.mp3");
        if (lib.config.extension_宿命挽歌_enable) {
            add("ending", "ext:宿命挽歌/audio/bgm/ending.mp3");
            add("Date a Live", "ext:宿命挽歌/audio/bgm/dateALive.mp3");
            add("风一样的勇士", "ext:宿命挽歌/audio/bgm/fengYiYangDeYongShi.mp3");
        }
        return tracks;
    }

    function musicPath(source) {
        var path = String(source || "");
        var marker = "/extension/";
        var index = path.indexOf(marker);
        return index >= 0 ? "ext:" + decodeURI(path.slice(index + marker.length)) : path;
    }

    function positionMusicPanel() {
        if (!musicPanel) return;
        var board = ui.shiQiInfo || document.querySelector(".zhanJi.table");
        if (!isXianJianTheme() || _status.over || !board || !board.isConnected ||
            !ui.window || !ui.window.isConnected) {
            musicPanel.hidden = true;
            if (_status.over) musicUserPaused = false;
            return;
        }
        var rect = board.getBoundingClientRect();
        var windowRect = ui.window.getBoundingClientRect();
        var width = musicCollapsed ? 38 : Math.min(264, rect.width);
        if (musicPanel.style.width !== width + "px") musicPanel.style.width = width + "px";
        musicPanel.hidden = false;
        if (rect.top - windowRect.top < musicPanel.offsetHeight + 18) {
            musicPanel.hidden = true;
            return;
        }
        var right = Math.max(8, windowRect.right - rect.right) + "px";
        var bottom = windowRect.bottom - rect.top + 10 + "px";
        if (musicPanel.style.right !== right) musicPanel.style.right = right;
        if (musicPanel.style.bottom !== bottom) musicPanel.style.bottom = bottom;
    }

    function scheduleMusicPosition() {
        if (musicPositionFrame !== null) return;
        musicPositionFrame = requestAnimationFrame(function () {
            musicPositionFrame = null;
            positionMusicPanel();
        });
    }

    function syncMusicPanel() {
        if (!musicPanel || musicPanel.hidden) return;
        function setText(selector, value) {
            var node = musicPanel.querySelector(selector);
            if (node && node.textContent !== value) node.textContent = value;
            return node;
        }
        musicTracks = battleMusicTracks();
        var audio = ui.backgroundMusic;
        if (musicUserPaused && audio && !audio.paused) audio.pause();
        var source = audio && musicPath(audio.currentSrc || audio.src);
        var track = musicTracks.find(function (entry) { return entry.path === source; });
        var title = track ? track.name : source ? decodeURI(source.split("/").pop()).replace(/\.mp3$/i, "") :
            lib.config.background_music === "music_off" ? "音乐已关闭" : "暂无音乐";
        var titleNode = setText(".wmb-bgm-title", title);
        if (titleNode) titleNode.title = title;
        var playButton = musicPanel.querySelector(".wmb-bgm-play");
        var playingNow = !!(audio && !audio.paused);
        if (playButton.dataset.playing !== String(playingNow))
            playButton.dataset.playing = String(playingNow);
        var playTitle = playingNow ? "暂停" : "播放";
        if (playButton.title !== playTitle) playButton.title = playTitle;
        if (playButton.getAttribute("aria-label") !== playTitle)
            playButton.setAttribute("aria-label", playTitle);
        var modeButton = musicPanel.querySelector(".wmb-bgm-mode");
        setText(".wmb-bgm-mode", musicMode === "single" ? "↻¹" : "↻");
        modeButton.title = musicMode === "single" ? "单曲循环，点击切换列表循环" : "列表循环，点击切换单曲循环";
        modeButton.setAttribute("aria-label", modeButton.title);
        if (audio && audio.src) audio.loop = musicMode === "single";
    }

    function selectMusicTrack(offset) {
        if (lib.config.background_music === "music_off") return;
        musicTracks = battleMusicTracks();
        if (!musicTracks.length) return;
        var audio = ui.backgroundMusic;
        var source = audio && musicPath(audio.currentSrc || audio.src);
        var index = musicTracks.findIndex(function (entry) { return entry.path === source; });
        index = index < 0 ? (offset < 0 ? 0 : -1) : index;
        var track = musicTracks[(index + offset + musicTracks.length) % musicTracks.length];
        _status.tempMusic = track.path;
        musicUserPaused = false;
        game.playBackgroundMusic();
        if (audio) {
            audio.loop = musicMode === "single";
            audio.currentTime = 0;
            var playing = audio.play();
            if (playing && playing.catch) playing.catch(function () {});
        }
        syncMusicPanel();
    }

    function ensureMusicPanel() {
        if (!isXianJianTheme()) return;
        var board = ui.shiQiInfo || document.querySelector(".zhanJi.table");
        if (!board || !board.isConnected) return;
        if (!musicPanel) {
            musicPanel = document.createElement("section");
            musicPanel.className = "wmb-bgm-panel wmb-bgm-collapsed";
            musicPanel.setAttribute("aria-label", "战局背景音乐控制");
            var previousIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 7v18"/><path d="M23 8 11 16l12 8z"/></svg>';
            var playIcon = '<svg class="wmb-bgm-icon-play" viewBox="0 0 32 32" aria-hidden="true"><path d="M11 7.5 25 16 11 24.5z"/></svg>';
            var pauseIcon = '<svg class="wmb-bgm-icon-pause" viewBox="0 0 32 32" aria-hidden="true"><path d="M11 8v16M21 8v16"/></svg>';
            var nextIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M24 7v18"/><path d="m9 8 12 8-12 8z"/></svg>';
            var collapseIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 10h16"/><path d="m10 16 6 6 6-6"/></svg>';
            var restoreIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M13 7H7v6M19 7h6v6M7 19v6h6M25 19v6h-6"/><path d="m12 12-5-5m13 5 5-5m-13 13-5 5m13-5 5 5"/></svg>';
            musicPanel.innerHTML =
                '<div class="wmb-bgm-heading"><span class="wmb-bgm-title" title="当前播放音乐">暂无音乐</span></div>' +
                '<div class="wmb-bgm-controls">' +
                '<button type="button" class="wmb-bgm-prev" title="上一首" aria-label="上一首">' + previousIcon + '</button>' +
                '<button type="button" class="wmb-bgm-play" title="播放" aria-label="播放">' + playIcon + pauseIcon + '</button>' +
                '<button type="button" class="wmb-bgm-next" title="下一首" aria-label="下一首">' + nextIcon + '</button>' +
                '<button type="button" class="wmb-bgm-mode" title="单曲循环" aria-label="单曲循环">↻¹</button>' +
                '<button type="button" class="wmb-bgm-collapse" title="收起音乐窗" aria-label="收起音乐窗">' + collapseIcon + '</button>' +
                '</div>' +
                '<button type="button" class="wmb-bgm-restore" title="展开音乐窗" aria-label="展开音乐窗">' + restoreIcon + '</button>';
            ui.window.appendChild(musicPanel);
            musicPanel.querySelector(".wmb-bgm-prev").addEventListener("click", function () { selectMusicTrack(-1); });
            musicPanel.querySelector(".wmb-bgm-next").addEventListener("click", function () { selectMusicTrack(1); });
            musicPanel.querySelector(".wmb-bgm-play").addEventListener("click", function () {
                var audio = ui.backgroundMusic;
                if (!audio || lib.config.background_music === "music_off") return;
                if (audio.paused) {
                    musicUserPaused = false;
                    if (!audio.src) selectMusicTrack(1);
                    else {
                        var playing = audio.play();
                        if (playing && playing.catch) playing.catch(function () {});
                    }
                } else {
                    musicUserPaused = true;
                    audio.pause();
                }
                syncMusicPanel();
            });
            musicPanel.querySelector(".wmb-bgm-mode").addEventListener("click", function () {
                musicMode = musicMode === "single" ? "list" : "single";
                syncMusicPanel();
            });
            musicPanel.querySelector(".wmb-bgm-collapse").addEventListener("click", function () {
                musicCollapsed = true;
                musicPanel.classList.add("wmb-bgm-collapsed");
                scheduleMusicPosition();
            });
            musicPanel.querySelector(".wmb-bgm-restore").addEventListener("click", function () {
                musicCollapsed = false;
                musicPanel.classList.remove("wmb-bgm-collapsed");
                scheduleMusicPosition();
            });
        }
        if (musicPanel.parentNode !== ui.window) ui.window.appendChild(musicPanel);
        if (typeof ResizeObserver !== "undefined" && musicObservedBoard !== board) {
            if (musicLayoutObserver) musicLayoutObserver.disconnect();
            musicLayoutObserver = new ResizeObserver(scheduleMusicPosition);
            musicLayoutObserver.observe(board);
            musicLayoutObserver.observe(ui.window);
            musicObservedBoard = board;
        }
        scheduleMusicPosition();
        syncMusicPanel();
        if (!musicTimer) {
            musicTimer = setInterval(syncMusicPanel, 700);
            window.addEventListener("resize", scheduleMusicPosition);
        }
        if (ui.backgroundMusic && !musicEndedHookInstalled) {
            musicEndedHookInstalled = true;
            ui.backgroundMusic.addEventListener("ended", function (event) {
                if (musicMode !== "list" || !musicPanel || musicPanel.hidden ||
                    lib.config.background_music === "music_off") return;
                event.stopImmediatePropagation();
                selectMusicTrack(1);
            }, true);
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
        ensureMusicPanel();
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
        version: "2.3",
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
            version: "2.3"
        },
        files: {
            character: [],
            card: [],
            skill: []
        }
    };
});
