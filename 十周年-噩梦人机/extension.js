game.import("extension", function (lib, game, ui, get, ai, _status) {
    "use strict";

    var extensionName = "十周年-噩梦人机";
    var startupSkills = [
        "lianMin", "qianXing", "yiShiZhongDuan", "zhongCaiYiShi",
        "jingLingMiYi", "anYingNingJu", "sanHuaLunWu", "qiDao",
        "xueXingDaoYan", "fuWenGaiZao", "shenShengQiYue", "moNvZhiNu",
        "chongNeng", "moYan", "anZhiJieFang", "huanYingXingChen",
        "xiWangFuGeQu", "baiShiHuanLongQuan", "douShenTianQu",
        "yuHunLiuJuHeShi", "lingHunLianJie", "lingHunZengFu", "xueZhiAiShang"
    ];

    // 70名角色均提供默认版与噩梦版头像；键名同时作为图片文件名。
    var nightmareCharacterImageIds = [
        "fengZhiJianSheng", "kuangZhanShi", "shenJianShou", "fengYinShi", "anShaZhe",
        "shengNv", "tianShi", "moFaShaoNv", "moJianShi", "shengQiangQiShi", "yuanSuShi",
        "maoXianJia", "wenYiFaShi", "zhongCaiZhe", "shenGuan", "qiDaoShi", "xianZhe",
        "lingFuShi", "jianDi", "geDouJia", "yongZhe", "lingHunShuShi", "xueZhiWuNv",
        "dieWuZhe", "nvWuShen", "moGong", "hongLianQiShi", "yingLingRenXing", "moQiang",
        "cangYanMoNv", "yinYouShiRen", "jingLingSheShou", "yinYangShi", "xueSeJianLing",
        "yueZhiNvShen", "shengGong", "shouLingWuShi",
        "shengDianQiShi", "shengTingJianChaShi", "yuanChuZhiGong", "xingZhuiNvWu",
        "zhanDouFaShi", "lieWuRen", "nvPuZhang", "jinGuiZhiNv", "shiShenZhe", "ranWuZhe",
        "jieJieShi", "shenMiXueZhe", "hongYiZhuJiao", "zhuLvZhe", "jiLuZhe", "chuanJiaoShi",
        "yiJiaoTu", "nong_baoShiShaoNv", "youJiShi", "jianZhiMoNv", "jieRiMoDao",
        "luoLiFanZhang", "tanLanShaoNv", "lingXiZhiChao", "jianXiZhiPian", "daoDanLuoLi",
        "yueTuanShouXi", "zhouFuShi", "sheng_zhongCaiZhe", "daiDuoShaoNv", "jiDuShaoNv",
        "jianZhiZi", "moGongEX"
    ];
    var nightmareCharacterImageSet = Object.create(null);
    nightmareCharacterImageIds.forEach(function (id) { nightmareCharacterImageSet[id] = true; });

    // 角色ID到噩梦强化技能ID的运行时注册表。
    var nightmareSkillRegistry = Object.create(null);
    var nightmareInfrastructureInstalled = false;
    // 技能实现依赖十周年角色包延迟载入，但联机客户端需要提前取得名称与说明，
    // 否则 addSkill 只同步技能ID后，非主机无法生成噩梦词条。
    var nightmareDisplayMetadata = {
        "nightmare_yuFengErXing": ["【御风而行】", "回合开始时，你+1【水晶】。"],
        "nightmare_kuangFengZhouYu": ["【狂风骤雨】", "本回合每发动1次主动攻击，后续主动攻击伤害+1。"],
        "nightmare_xueZhiKeWang": ["【血之渴望】", "你的主动攻击同时附带【血影狂刀】与【血腥咆哮】的效果。"],
        "nightmare_shiXueKuangHua": ["【嗜血狂化】", "主动攻击命中后，若我方战绩区有【宝石】，可以消耗1【宝石】，发动【狂化】。"],
        "nightmare_yingYan": ["【鹰眼】", "【贯穿射击】造成的伤害+1。"],
        "nightmare_zhiMingJuJi": ["【致命狙击】", "【狙击】改为令目标将手牌补至7张。"],
        "nightmare_wanXiangFengYin": ["【万象封印】", "你可以将法术牌当作对应系别的【X之封印】使用。"],
        "nightmare_wuXingJinJue": ["【五行禁绝】", "你的五种【X之封印】造成的法术伤害均改为4点。"],
        "nightmare_anYingChuBei": ["【暗影储备】", "【潜行】计算攻击伤害加成时，你的能量数至少视为2。"],
        "nightmare_shuiYingWuHen": ["【水影无痕】", "发动【水影】时，可以额外将1张非水系手牌视为水系牌弃置。"],
        "nightmare_shenEn": ["【神恩】", "回合开始时，选择一名我方角色+1【治疗】。"],
        "nightmare_shenShengLingYu": ["【神圣领域】", "我方角色的【治疗】被消耗后，令另一名【治疗】未满的我方角色+1【治疗】。"],
        "nightmare_shouHuZhiYi": ["【守护之翼】", "有己方角色受到伤害时，若其没有【圣盾】，使其获得【圣盾】。"],
        "nightmare_tianShiJiangLin": ["【天使降临】", "我方角色触发【圣盾】时，其+1【治疗】；若其治疗已满，改为你+1【治疗】。"],
        "nightmare_moLiXunHuan": ["【魔力循环】", "回合结束时，若你的手牌数大于4，弃置2张手牌。"],
        "nightmare_wuXianMoLi": ["【无限魔力】", "造成法术伤害后，你+1【宝石】。"],
        "nightmare_anYingTunShi": ["【暗影吞噬】", "发动【暗影凝聚】时不再对自己造成法术伤害。"],
        "nightmare_xiuLuoBuMie": ["【修罗不灭】", "【修罗连斩】使用的攻击牌不再有系别要求，且伤害+2。"],
        "nightmare_shengQiangLueDuo": ["【圣枪掠夺】", "回合开始时，可以将其他一名有【治疗】的角色的1【治疗】转移给你。"],
        "nightmare_shenShengWuZhuang": ["【神圣武装】", "发动【天枪】或【地枪】时，移除的【治疗】数-1。"],
        "nightmare_yuanSuGongMing": ["【元素共鸣】", "【陨石】【冰冻】【火球】【风刃】【雷击】造成的伤害+1。"],
        "nightmare_yuanSuLunZhuan": ["【元素轮转】", "回合开始时，+1【元素】。"],
        "nightmare_touLiangHuanZhu": ["【飞龙探云】", "【偷天换日】会同时转移1【水晶】。"],
        "nightmare_qiangYunJiaShen": ["【强运加身】", "发动【强运】时，选择一名队友也+1【水晶】。"],
        "nightmare_yiBingZiSheng": ["【疫病滋生】", "回合结束时，+1【治疗】。"],
        "nightmare_bingYuanChongZu": ["【病原重组】", "【瘟疫】与【剧毒新星】不再以我方角色为目标。"],
        "nightmare_zuiNieJiaShen": ["【罪孽加深】", "因承受伤害获得【审判】时，额外+1【审判】。"],
        "nightmare_zuiZhongCaiJue": ["【最终裁决】", "回合开始时，你受到1点法术伤害；发动【末日审判】时，弃置2张牌。"],
        "nightmare_shenShengDiaoDu": ["【神圣调度】", "回合开始时，你+1【治疗】，然后将自己的1【治疗】转移给1名己方角色。"],
        "nightmare_shenShengDaiChang": ["【神圣代偿】", "其他我方角色将承受伤害时，移除你的1【治疗】，令该伤害-1。"],
        "nightmare_shenQi": ["【神启】", "游戏开始时，+1【宝石】。"],
        "nightmare_qianChengXinYang": ["【虔诚信仰】", "进入【祈祷形态】时，立即获得3个【祈祷符文】；回合开始时，你+1【祈祷符文】。"],
        "nightmare_wanJuanGuiYi": ["【万卷归一】", "【魔道法典】造成的法术伤害额外+1。"],
        "nightmare_jinJiFaDian": ["【禁忌法典】", "你造成大于3点的伤害后，+1【宝石】。"],
        "nightmare_wanFuGuiZong": ["【万符归宗】", "【雷鸣】造成的伤害+1。"],
        "nightmare_fuZhenLunZhuan": ["【符阵轮转】", "发动【念咒】时，+1【水晶】。"],
        "nightmare_jianYiBuJue": ["【剑意不绝】", "回合开始时，+1【剑气】；攻击命中时，+1【剑气】。"],
        "nightmare_wanJianChenFu": ["【万剑臣服】", "发动【剑气斩】时，可以弃置与本次伤害数相同数量的手牌。"],
        "nightmare_douQiFeiTeng": ["【斗气沸腾】", "攻击命中后，+1【斗气】。"],
        "nightmare_wuJi": ["【武极】", "【百式幻龙拳】不再消耗【斗气】。"],
        "nightmare_yingXiongBenNeng": ["【英雄本能】", "游戏开始时，你+1【宝石】；回合开始时，你随机+1【怒气】或【知性】。"],
        "nightmare_buMieYongZhe": ["【不灭勇者】", "处于【精疲力尽】状态时，手牌上限提高至5。"],
        "nightmare_hunSeDiaoLv": ["【魂色调律】", "回合开始时，可以将最多2点已有【灵魂】转换颜色。"],
        "nightmare_wangHunHuiXiang": ["【亡魂回响】", "发动【灵魂吞噬】时，额外获得1点【蓝色灵魂】。"],
        "nightmare_xueQiZhuZai": ["【血契主宰】", "转移【同生共死】的目标时，自身不再受到伤害。"],
        "nightmare_xianXueZhiPei": ["【鲜血支配】", "【流血状态】下，你受到的伤害-1。"],
        "nightmare_dieMengRanSe": ["【蝶梦染色】", "回合开始时，将牌堆顶3张牌作为【茧】。"],
        "nightmare_diaoLingZhiMeng": ["【凋零之梦】", "发动【凋零】时，你受到的伤害-1。"],
        "nightmare_kaiXuanZhiGe": ["【凯旋之歌】", "你的【治疗】上限+2。"],
        "nightmare_shengLiZhuiJi": ["【胜利追击】", "通过【神圣追击】获得的额外攻击命中后，+1【治疗】。"],
        "nightmare_guoZaiDanCang": ["【过载弹仓】", "你的手牌上限+2；游戏开始时，你+3【宝石】。"],
        "nightmare_ziDongZhuangTian": ["【自动装填】", "回合开始时，将牌堆顶3张牌面朝下放置为【充能】。"],
        "nightmare_xianXueYongRan": ["【鲜血永燃】", "因【热血沸腾】避免己方士气下降后，获得1【治疗】或1【血印】。"],
        "nightmare_xianXueHuiXiang": ["【鲜血回响】", "退出【热血沸腾】状态时，我方士气+1。"],
        "nightmare_wenZhangHuiLu": ["【纹章回路】", "【战纹碎击】与【魔纹融合】造成的伤害+1。"],
        "nightmare_chaoPinGaiZao": ["【超频改造】", "发动【符文改造】时，将手牌补至上限。"],
        "nightmare_qiangZhiChongYing": ["【强制充盈】", "所有己方队友弃置的牌均视为雷系牌。"],
        "nightmare_qiHeiZengFu": ["【漆黑增幅】", "你命中手牌数小于3的目标时，伤害+4。"],
        "nightmare_cangYanZhuanSheng": ["【苍炎转生】", "获得【重生】时，我方士气+1。"],
        "nightmare_buMieCangYan": ["【不灭苍炎】", "受到伤害导致己方士气下降时，此次士气下降值-1，最少为1。"],
        "nightmare_yongHengXuanLv": ["【永恒旋律】", "【激昂狂想曲】与【胜利交响诗】的效果不再选择，而是依次发动。"],
        "nightmare_jueDuiYinGan": ["【绝对音感】", "【禁忌诗篇】对自己造成的伤害减少为1点。"],
        "nightmare_wuSeShenJian": ["【五色神箭】", "【元素射击】造成的伤害+1。"],
        "nightmare_senZhiZhuFu": ["【森之祝福】", "发动【精灵秘仪】时，改为查看牌堆顶5张牌，将这5张牌均作为【祝福】。"],
        "nightmare_shuangHunGongMing": ["【双魂共鸣】", "【鬼火】上限+2；发动【黑暗祭礼】后，保留2【鬼火】。"],
        "nightmare_shiShenHuZhu": ["【式神护主】", "【式神咒束】不再移除【宝石】和【水晶】。"],
        "nightmare_xueSeKeWang": ["【血色渴望】", "你的【鲜血】大于1时，造成的伤害+1。"],
        "nightmare_xianXueHuiLiu": ["【鲜血回流】", "攻击未命中时，+1【鲜血】。"],
        "nightmare_yueShiSheMian": ["【月蚀赦免】", "移除【暗月】时，不触发本次【暗月诅咒】造成的己方士气下降。"],
        "nightmare_yueZhiLunZhuan": ["【月之轮转】", "我方士气下降时，移除1个【暗月】。"],
        "nightmare_ziDongQiDao": ["【自动祈祷】", "回合开始时，你+1【宝石】。"],
        "nightmare_shengHuangShenYu": ["【圣煌神谕】", "取消【圣煌辉光炮】的基础【信仰】消耗。"],
        "nightmare_shouLieBenNeng": ["【狩猎本能】", "回合开始时，若处于【普通形态】，进入【御魂流居合形态】；然后+1【兽魂】。"],
        "nightmare_jueJingShouLie": ["【绝境狩猎】", "【逆反居合斩】强制命中，并移除命中目标1颗星石。"]
    };

    // 第二批噩梦人机（38-48）。元数据在角色包尚未载入时也会同步给联机客户端。
    Object.assign(nightmareDisplayMetadata, {
        nightmare_shenEnManYi: ["【神恩满溢】", "回合开始时，你+1【治疗】；队友获得【治疗】后，你+1【治疗】。"],
        nightmare_shengYinChiLing: ["【圣印敕令】", "你的【圣印】溢出时，你+1【水晶】。"],
        nightmare_shenShengBiHuLing: ["【神圣庇护令】", "发动【庇护领域】时，所需移除的【治疗】-2。"],
        nightmare_yiDuanWuZui: ["【异端无罪】", "我方士气将下降时，移除【异端裁决所】等量【治疗】，防止此次士气下降。"],
        nightmare_yongHengShengHuang: ["【永恒圣煌】", "发动【圣煌降临】无需支付消耗。"],
        nightmare_shengHuangShenYu2: ["【圣煌神谕】", "【圣煌辉光炮】与【圣煌余晖】不再支付基础【信仰】消耗。"],
        nightmare_xingHenCanXiang: ["【星痕残响】", "你受到的伤害-X，X为你的【律法】数。"],
        nightmare_mingDingXingTu: ["【命定星图】", "你的【卢恩】上限+6；【卢恩】增加后，将牌堆顶1张牌作为【卢恩】。"],
        nightmare_shangZhiShiKong: ["【熵值失控】", "游戏开始时+3【水晶】；发动【魔力熵增】后+1【水晶】。"],
        nightmare_zhanFaYanSuan: ["【战法演算】", "攻击行动结束后+1法术行动；法术行动结束后+1攻击行动。"],
        nightmare_lieWuShenXun: ["【猎巫审讯】", "【狩魔刺】对应的攻击强制命中；造成伤害后，目标将手牌补至上限。"],
        nightmare_lieWuChuXing: ["【猎巫处刑】", "发动【灌银毒刃】后，额外转移目标1颗星石。"],
        nightmare_wuJianFengXue: ["【无间风穴】", "【影之穴】与【影缝】额外移除目标1颗星石。"],
        nightmare_qianYingYiXing: ["【千影易形】", "你的【糸】增加时，选择令对方士气-1或我方士气+1。"],
        nightmare_keQianYuXi: ["【课前预习】", "回合开始时，若手牌数大于3，弃置3张手牌。"],
        nightmare_daXiaoJieTeQuan: ["【大小姐特权】", "其他队友提炼时，你+1【水晶】；【魔法入门】伤害+1。"],
        nightmare_shenShiKeYin: ["【神蚀刻印】", "手牌上限+2；回合结束时，若【魔刃】或【异刃】不在场上，将其加入手牌。"],
        nightmare_zhuShenJieMie: ["【诸神皆灭】", "使用【魔刃】或【异刃】发动的攻击不能被响应。"],
        nightmare_eYiManYing: ["【恶意满盈】", "你的攻击令对方士气下降后，我方士气+X。"],
        nightmare_shenQiLingYu: ["【神弃领域】", "狂戾形态下，受到伤害令我方士气下降后，对方士气-X。"],
        nightmare_wanXiangJieJie: ["【万象结界】", "队友发动与【结界】系别相同的攻击时，伤害+2。"],
        nightmare_huangShenGongMing: ["【荒神共鸣】", "【伏魔境】造成的伤害+1。"]
    });

    Object.assign(nightmareDisplayMetadata, {
        nightmare_miShuHuiXiang: ["【秘术回响】", "发动【言灵术】后，+1法术行动。"],
        nightmare_wanYanTongXiao: ["【万言通晓】", "发动【真言术】后，+1【水晶】。"],
        nightmare_shuangMianZhiZheng: ["【双面执政】", "【银制子弹】和【圣遗物】上限+2；回合开始时二者各+1。"],
        nightmare_shengLvTeShe: ["【圣律特赦】", "发动【罪断豁免】时，对方士气-1。"],
        nightmare_shiLiaoXuBian: ["【史料续编】", "回合开始时，若手牌中没有【史书】，弃1张牌并将【史书】加入手牌。"],
        nightmare_liShiChongYan: ["【历史重演】", "每回合限一次，发动【秘境万象】后+1法术行动，弃1张牌并将【史书】加入手牌。"],
        nightmare_shenYiYinLu: ["【神意引路】", "将【路标】转移给对手后，对其造成2点法术伤害。"],
        nightmare_shiJieBuDao: ["【世界布道】", "将【路标】转移给队友后，令其+1【宝石】。"],
        nightmare_moRiQiShi: ["【末日启示】", "手牌上限+2；发动【末日预言】后+1【水晶】。"],
        nightmare_yuYanBianZuan: ["【预言编纂】", "【天雷劫火】与【地裂波涛】的X固定为4。"],
        nightmare_wuDiWeiDai: ["【无底胃袋】", "回合开始时弃1张手牌，将【魔弹】加入手牌。"],
        nightmare_heiDongXiaoHua: ["【黑洞消化】", "发动【食欲的黑洞】后弃置2张手牌。"],
        nightmare_wanNengDanCang: ["【万能弹仓】", "【元素射击】同时触发五种元素效果。"],
        nightmare_zhanShuHuanDan: ["【战术换弹】", "攻击命中后，将1张手牌面朝下放置为【子弹】。"],
        nightmare_yiXiangLianZhan: ["【臆想连斩】", "【臆想剑】令目标弃攻击牌时伤害+2；弃法术牌时+1攻击行动。"],
        nightmare_moNvJianYu: ["【魔女剑域】", "你的回合内每发动一次主动攻击，后续主动攻击伤害+1。"],
        nightmare_jieRiLiZhuang: ["【节日礼装】", "回合开始时弃1张手牌，随机将【圣光】【圣盾】【魔弹】【虚弱】【中毒】之一加入手牌。"],
        nightmare_shengDanJiaBan: ["【圣诞加班】", "【魔爆冲击】造成实际伤害后，+1法术行动。"],
        nightmare_maDaMaDa: ["【马达马达】", "【喧哗上等】第一次遭到阻止时，忽略该阻止。"],
        nightmare_moYiQiDuo: ["【莫一启多】", "【喧哗上等】移除3张牌后，+1攻击行动。"]
    });

    Object.assign(nightmareDisplayMetadata, {
        nightmare_yiBenWanLi: ["【一本万利】", "发动【殓金魔法】后，所有队友各+1【宝石】。"],
        nightmare_wangGuoYiChan: ["【亡国遗产】", "【亡女金库】额外移除所有我方角色的【宝石】，每移除1颗伤害+1。"],
        nightmare_chaoManSanFen: ["【潮满三分】", "你的【灵涌】上限-2。"],
        nightmare_haiShenDaiXing: ["【海神代行】", "发动【邪灵退散】后，+1法术行动并+1【水晶】。"],
        nightmare_woYaoYanPai: ["【我要验牌】", "回合开始时，若手牌中没有元素师独有牌，弃置全部手牌并摸等量牌。"],
        nightmare_yuanZiHuanCun: ["【元子缓存】", "获得【元子】时，+1【宝石】。"],
        nightmare_fuBiHuiShou: ["【伏笔回收】", "【神秘伏笔】的效果额外结算一次。"],
        nightmare_trickAndTreat: ["【Trick AND Treat】", "发动【Trick or Treat】时，所有对手受到2点伤害。"],
        nightmare_jueDuiYinGan2: ["【绝对音感】", "【新乐章】第二个音符的效果改为三倍。"],
        nightmare_jiXingGaiPu: ["【即兴改谱】", "发动【新乐章】期间，队友受到伤害后，我方士气+X。"],
        nightmare_huShenJiangLin: ["【狐神降临】", "攻击命中后执行一次【念咒】，其放置牌改为地系。"],
        nightmare_huShenDaiChang: ["【狐神代偿】", "发动【念咒】时，目标队友弃1张牌，然后+1【治疗】。"],
        nightmare_eShanBiJi: ["【恶善必计】", "队友造成伤害后，将1张手牌放置到【天平】左侧或右侧。"],
        nightmare_wuZhengZhongShen: ["【五证终审】", "你的【罪】溢出时，对方士气-1。"],
        nightmare_rangBieRenGan: ["【让别人干】", "队友主动攻击命中后，你+1【宝石】。"],
        nightmare_gaoZhiLiangShuiMian: ["【高质量睡眠】", "队友受到伤害后，你弃1张手牌。"],
        nightmare_zongYouRenZhiDeJiDu: ["【总有人值得忌妒】", "回合开始时，若对方持有【暗灭】或【圣光】，弃1张牌并转移其中一张。"],
        nightmare_suanYiShangTou: ["【酸意上头】", "【暗灭】伤害+2；使用【圣光】后我方士气+1。"],
        nightmare_jianShengJiCheng: ["【剑圣继承】", "发动【风之剑】后，+1【水晶】。"],
        nightmare_shiYanBiDa: ["【誓言必达】", "由【剑残影】增加的攻击行动强制命中且伤害+1。"],
        nightmare_shenFengJiaoZhun: ["【神风校准】", "你的主动攻击均视为风系。"],
        nightmare_wuShiYiDao: ["【午时已到】", "发动【狙击】后，所有对手将手牌补至上限。"]
    });

    function publishNightmareDisplayMetadata() {
        var visible = nightmareConfig("showNightmareSkills", true);
        var install = function (metadata, shouldShow) {
            Object.keys(metadata || {}).forEach(function (skillName) {
                var entry = metadata[skillName];
                // 非主机可能尚未载入十周年角色包和完整技能对象；占位对象只供界面识别。
                // 完整定义载入后，defineNightmareSkills 会覆盖该对象。
                if (!lib.skill[skillName]) {
                    lib.skill[skillName] = {
                        charlotte: true,
                        popup: false,
                        nopop: !shouldShow,
                        _nightmareDisplayPlaceholder: true
                    };
                } else if (lib.skill[skillName]._nightmareDisplayPlaceholder) {
                    lib.skill[skillName].nopop = !shouldShow;
                }
                lib.translate[skillName] = entry[0];
                lib.translate[skillName + "_info"] = shouldShow ? entry[1] : "";
            });
        };
        install(nightmareDisplayMetadata, visible);
        if (typeof game.broadcastAll == "function") {
            game.broadcastAll(install, nightmareDisplayMetadata, visible);
        }
    }

    function nightmareConfig(key, fallback) {
        var value = lib.config["extension_" + extensionName + "_" + key];
        return value === undefined ? fallback : value;
    }

    function isHumanControlled(player) {
        if (!player) return false;
        if (_status.playback) return true;
        if (typeof player.isOnline == "function" && player.isOnline()) return true;
        // 托管时本地角色交给AI；未托管时，本地角色及多控角色均视为玩家操控。
        if (!_status.auto) {
            if (player == game.me || player._trueMe == game.me) return true;
            try {
                if (typeof player.isUnderControl == "function" && player.isUnderControl(true)) return true;
            } catch (e) { }
        }
        return false;
    }

    function isNightmareAi(player) {
        if (!nightmareConfig("enableNightmareSkills", true)) return false;
        if (!player || isHumanControlled(player)) return false;
        if (!nightmareConfig("affectFriendlyAi", true) && game.me && player.side == game.me.side) return false;
        return true;
    }

    function playerCharacterIds(player) {
        var ids = [];
        [player && player.name, player && player.name1, player && player.name2].forEach(function (id) {
            if (id && !ids.includes(id)) ids.push(id);
        });
        return ids;
    }

    function registeredSkillsFor(player) {
        var result = [];
        playerCharacterIds(player).forEach(function (characterId) {
            var skills = nightmareSkillRegistry[characterId] || [];
            skills.forEach(function (skill) {
                if (skill && !result.includes(skill)) result.push(skill);
            });
        });
        return result;
    }

    function installDefaultCharacterImages() {
        nightmareCharacterImageIds.forEach(function (characterId) {
            var info = lib.character && lib.character[characterId];
            if (!info) return;
            var tag = "ext:" + extensionName + "/image/character/default/" + characterId + ".png";
            var tags;
            if (Array.isArray(info)) {
                if (!Array.isArray(info[4])) info[4] = [];
                tags = info[4];
            } else {
                if (!Array.isArray(info.trashBin)) info.trashBin = [];
                tags = info.trashBin;
            }
            if (!tags.includes(tag)) tags.unshift(tag);
        });
    }

    function syncNightmareCharacterImage(player) {
        if (!player || !player.node) return;
        var nightmare = isNightmareAi(player);
        var slots = [];
        var first = player.name1 || player.name;
        if (first && nightmareCharacterImageSet[first] && player.node.avatar) slots.push(["avatar", first]);
        if (player.name2 && nightmareCharacterImageSet[player.name2] && player.node.avatar2) slots.push(["avatar2", player.name2]);
        if (!slots.length) return;
        var folder = nightmare ? "nightmare" : "default";
        var signature = slots.map(function (entry) { return entry[0] + ":" + entry[1]; }).join("|") + ":" + folder;
        var imageAlreadyApplied = slots.every(function (entry) {
            var node = player.node[entry[0]];
            return node && String(node.style.backgroundImage || "").includes("/" + folder + "/" + entry[1] + ".png");
        });
        if (player.storage && player.storage.xingBeiNightmareCharacterImage == signature && imageAlreadyApplied) return;
        if (!player.storage) player.storage = {};
        player.storage.xingBeiNightmareCharacterImage = signature;
        var apply = function (target, imageSlots, useNightmare, name) {
            if (!target || !target.node) return;
            var folder = useNightmare ? "nightmare" : "default";
            imageSlots.forEach(function (entry) {
                var node = target.node[entry[0]];
                if (node && typeof node.setBackgroundImage == "function") {
                    node.setBackgroundImage("extension/" + name + "/image/character/" + folder + "/" + entry[1] + ".png");
                }
            });
            if (target == game.me && ui.fakeme && target.node.avatar) {
                ui.fakeme.style.backgroundImage = target.node.avatar.style.backgroundImage;
            }
        };
        apply(player, slots, nightmare, extensionName);
        if (typeof game.broadcastAll == "function") game.broadcastAll(apply, player, slots, nightmare, extensionName);
    }

    function guardNightmareSkillObject(skill) {
        if (!skill || skill._xingBeiNightmareAiGuarded) return;
        skill._xingBeiNightmareAiGuarded = true;
        var oldFilter = skill.filter;
        skill.filter = function (event, player) {
            if (!isNightmareAi(player)) return false;
            return typeof oldFilter == "function" ? oldFilter.apply(this, arguments) : true;
        };
        if (skill.subSkill) {
            Object.keys(skill.subSkill).forEach(function (key) {
                guardNightmareSkillObject(skill.subSkill[key]);
            });
        }
    }

    function guardNightmareSkill(skillName) {
        var skill = lib.skill && lib.skill[skillName];
        if (!skill) return false;
        guardNightmareSkillObject(skill);
        return true;
    }

    function registerNightmareSkills(characterIds, skillNames) {
        if (!Array.isArray(characterIds)) characterIds = [characterIds];
        if (!Array.isArray(skillNames)) skillNames = [skillNames];
        characterIds.forEach(function (characterId) {
            if (!characterId) return;
            if (!nightmareSkillRegistry[characterId]) nightmareSkillRegistry[characterId] = [];
            skillNames.forEach(function (skillName) {
                if (!skillName || nightmareSkillRegistry[characterId].includes(skillName)) return;
                nightmareSkillRegistry[characterId].push(skillName);
                guardNightmareSkill(skillName);
            });
        });
        syncAllNightmareSkills();
    }

    function syncNightmareSkills(player) {
        if (!player || typeof player.addSkill != "function" || typeof player.removeSkill != "function") return;
        if (!player.storage) player.storage = {};
        var previouslyAdded = Array.isArray(player.storage.xingBeiNightmareSkills) ? player.storage.xingBeiNightmareSkills.slice() : [];
        var desired = isNightmareAi(player) ? registeredSkillsFor(player) : [];
        var addedByFramework = [];

        previouslyAdded.forEach(function (skillName) {
            if (!desired.includes(skillName) && player.hasSkill(skillName)) player.removeSkill(skillName);
        });
        desired.forEach(function (skillName) {
            guardNightmareSkill(skillName);
            if (!player.hasSkill(skillName)) {
                player.addSkill(skillName);
                addedByFramework.push(skillName);
            } else if (previouslyAdded.includes(skillName)) {
                addedByFramework.push(skillName);
            }
        });
        // 若角色包在 gameStart 的触发队列生成后才载入，补发一次开局资源；存储标记保证不会重复。
        if (_status.gameStarted) {
            if (desired.includes("nightmare_shenQi")) {
                if (!game.phaseNumber) grantNightmareOpeningResource(player, "nightmareShenQiGranted", "baoShi");
                else player.storage.nightmareShenQiGranted = true;
            }
            if (desired.includes("nightmare_yingXiongBenNeng")) {
                if (!game.phaseNumber) grantNightmareOpeningResource(player, "nightmareYingXiongBenNengGranted", "baoShi");
                else player.storage.nightmareYingXiongBenNengGranted = true;
            }
            if (desired.includes("nightmare_guoZaiDanCang")) {
                if (!game.phaseNumber) grantNightmareOpeningResource(player, "nightmareGuoZaiDanCangGranted", "baoShi", 3);
                else player.storage.nightmareGuoZaiDanCangGranted = true;
            }
        }
        // 只记录框架实际添加的技能，控制权变化时不会误删角色原本拥有的同名技能。
        player.storage.xingBeiNightmareSkills = addedByFramework;
        syncNightmareCharacterImage(player);
    }

    function syncAllNightmareSkills() {
        if (!game.players) return;
        game.players.forEach(syncNightmareSkills);
    }

    function installNightmareInfrastructure() {
        if (nightmareInfrastructureInstalled || !lib.skill) return;
        nightmareInfrastructureInstalled = true;
        publishNightmareDisplayMetadata();
        lib.xingBeiNightmare = {
            register: registerNightmareSkills,
            registry: nightmareSkillRegistry,
            isHumanControlled: isHumanControlled,
            isNightmareAi: isNightmareAi,
            skillsFor: registeredSkillsFor,
            syncPlayer: syncNightmareSkills,
            syncAll: syncAllNightmareSkills,
            defineSkills: function () {
                defineNightmareSkills();
                defineSecondBatchNightmareSkills();
            },
            grantOpeningResource: grantNightmareOpeningResource,
            config: nightmareConfig,
            strength: function () { return nightmareConfig("strength", "standard"); },
            mayUseHiddenInformation: function () { return nightmareConfig("allowHiddenInformation", false); },
            showSkills: function () { return nightmareConfig("showNightmareSkills", true); }
        };

        lib.skill._xingBeiNightmareManager = {
            trigger: {
                global: ["gameStart", "enterGame", "phaseBefore"],
                player: ["phaseBegin", "xingDongBegin"]
            },
            forced: true,
            charlotte: true,
            silent: true,
            popup: false,
            priority: 10000,
            filter: function () { return true; },
            content: function (event) {
                // 联机或延迟载入角色包时，原角色技能可能晚于扩展 precontent 才注册。
                var runtime = lib.xingBeiNightmare;
                if (!runtime) return;
                runtime.defineSkills();
                runtime.syncAll();
                if (event.triggername == "gameStart" || event.triggername == "enterGame") {
                    game.players.forEach(function (current) {
                        var skills = runtime.skillsFor(current);
                        if (!runtime.isNightmareAi(current)) return;
                        if (skills.includes("nightmare_shenQi")) {
                            runtime.grantOpeningResource(current, "nightmareShenQiGranted", "baoShi");
                        }
                        if (skills.includes("nightmare_yingXiongBenNeng")) {
                            runtime.grantOpeningResource(current, "nightmareYingXiongBenNengGranted", "baoShi");
                        }
                        if (skills.includes("nightmare_guoZaiDanCang")) {
                            runtime.grantOpeningResource(current, "nightmareGuoZaiDanCangGranted", "baoShi", 3);
                        }
                    });
                }
            }
        };
        game.addGlobalSkill("_xingBeiNightmareManager");
        syncAllNightmareSkills();
    }

    function grantNightmareOpeningResource(player, storageKey, resource, amount) {
        if (!player || player.storage[storageKey]) return;
        player.storage[storageKey] = true;
        player.addNengLiang(resource, amount || 1);
    }

    function defineNightmareSkills() {
        publishNightmareDisplayMetadata();
        // 扩展的 precontent 可能早于十周年角色包载入；等原技能完整可用后再克隆和打补丁。
        if (!lib.skill || lib._xingBeiNightmareSkillsDefined
            || !lib.skill.jingZhunSheJi || !lib.skill.anYingNingJu
            || !lib.skill.lingFu_leiMing || !lib.skill.guiHuo) return;
        lib._xingBeiNightmareSkillsDefined = true;

        function addSkill(name, info, title, description) {
            lib.skill[name] = info;
            lib.translate[name] = title;
            lib.translate[name + "_info"] = description;
        }

        function addHiddenClone(name, sourceName, overrides) {
            var info = get.copy(lib.skill[sourceName]);
            Object.keys(overrides || {}).forEach(function (key) {
                info[key] = overrides[key];
            });
            info.charlotte = true;
            info.popup = false;
            lib.skill[name] = info;
            lib.translate[name] = lib.translate[sourceName] || sourceName;
            lib.translate[name + "_info"] = lib.translate[sourceName + "_info"] || "";
        }

        function register(character, skills) {
            registerNightmareSkills(character, skills);
        }

        function activeAttack(event) {
            return event && event.yingZhan != true;
        }

        function sameDamageEvent(event, watched) {
            if (!event || !watched) return false;
            try {
                return event.getParent && watched.getParent && event.getParent() === watched.getParent();
            } catch (e) {
                return false;
            }
        }

        function allies(player, includeSelf) {
            return game.filterPlayer(function (current) {
                return current.side == player.side && (includeSelf || current != player);
            });
        }

        function enemies(player) {
            return game.filterPlayer(function (current) {
                return current.side != player.side;
            });
        }

        function chooseBestAlly(player, list, evaluator) {
            if (!list || !list.length) return null;
            return list.slice().sort(function (a, b) {
                return evaluator(b) - evaluator(a);
            })[0];
        }

        function getParentEvent(event, names, depth) {
            if (!event) return null;
            if (!Array.isArray(names)) names = [names];
            var current = event;
            var limit = typeof depth == "number" ? depth : 12;
            for (var i = 0; i <= limit && current; i++) {
                if (names.includes(current.name)) return current;
                current = current.getParent && current.getParent();
            }
            return null;
        }

        // 1. 风之剑圣
        addSkill("nightmare_yuFengErXing", {
            trigger: { player: "phaseBegin" },
            forced: true,
            content: function () { player.addNengLiang("shuiJing"); }
        }, "【御风而行】", "回合开始时，你+1【水晶】。");
        addSkill("nightmare_kuangFengZhouYu", {
            trigger: { player: "gongJiAfter" },
            forced: true,
            silent: true,
            popup: false,
            filter: function (event) {
                return activeAttack(event);
            },
            content: function () {
                player.storage.nightmareJiFengCount = (player.storage.nightmareJiFengCount || 0) + 1;
            },
            group: ["nightmare_kuangFengZhouYu_damage", "nightmare_kuangFengZhouYu_reset"],
            subSkill: {
                damage: {
                    trigger: { player: "gongJiSheZhi" },
                    forced: true,
                    filter: function (event, player) {
                        return activeAttack(event) && (player.storage.nightmareJiFengCount || 0) > 0;
                    },
                    content: function () { trigger.changeDamageNum(player.storage.nightmareJiFengCount); }
                },
                reset: {
                    trigger: { player: "phaseBegin" },
                    forced: true,
                    silent: true,
                    popup: false,
                    content: function () { player.storage.nightmareJiFengCount = 0; }
                }
            }
        }, "【狂风骤雨】", "本回合每发动1次主动攻击，后续主动攻击伤害+1。");
        register("fengZhiJianSheng", ["nightmare_yuFengErXing", "nightmare_kuangFengZhouYu"]);

        // 2. 狂战士
        addSkill("nightmare_xueZhiKeWang", {
            trigger: { player: "gongJiShi" },
            forced: true,
            priority: 2,
            filter: function (event) { return activeAttack(event); },
            content: function () {
                if (trigger.target && trigger.target.zhiLiao == 2) trigger.qiangZhiMingZhong();
                player.when({ source: "gongJiMingZhong" })
                    .filter(function (evt) {
                        return evt && trigger && evt.getParent && trigger.getParent &&
                            evt.getParent() === trigger.getParent() && evt.target &&
                            (evt.target.countCards("h") == 2 || evt.target.countCards("h") == 3);
                    })
                    .step(async function (event, trigger) {
                        trigger.changeDamageNum(trigger.target.countCards("h") == 2 ? 2 : 1);
                    });
            }
        }, "【血之渴望】", "你的主动攻击同时附带【血影狂刀】与【血腥咆哮】的效果。");
        addSkill("nightmare_shiXueKuangHua", {
            trigger: { source: "gongJiMingZhongAfter" },
            filter: function (event, player) {
                return activeAttack(event) && get.zhanJi(player.side).includes("baoShi");
            },
            check: function (event, player) {
                return event.target && event.target.side != player.side && event.num > 0;
            },
            content: async function (event, trigger, player) {
                await player.changeZhanJi("baoShi", -1);
                trigger.changeDamageNum(1);
                if (player.countCards("h") > 3) trigger.changeDamageNum(1);
            }
        }, "【嗜血狂化】", "主动攻击命中后，若我方战绩区有【宝石】，可以消耗1【宝石】，发动【狂化】。");
        register("kuangZhanShi", ["nightmare_xueZhiKeWang", "nightmare_shiXueKuangHua"]);

        // 3. 神箭手
        addSkill("nightmare_yingYan", {
            trigger: { source: "chengShouShangHai" },
            forced: true,
            priority: 10,
            filter: function (event) { return event.faShu && !!getParentEvent(event, "guanChuanSheJi"); },
            content: function () { trigger.changeDamageNum(1); }
        }, "【鹰眼】", "【贯穿射击】造成的伤害+1。");
        addSkill("nightmare_zhiMingJuJi", {
            charlotte: true
        }, "【致命狙击】", "【狙击】改为令目标将手牌补至7张。");
        register("shenJianShou", ["nightmare_yingYan", "nightmare_zhiMingJuJi"]);
        if (!lib.skill.juJi._nightmareContentPatched) {
            lib.skill.juJi._nightmareContentPatched = true;
            lib.skill.juJi.content = function () {
                "step 0"
                player.removeBiShaShuiJing();
                "step 1"
                target.drawTo(lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_zhiMingJuJi") ? 7 : 5);
                player.addGongJi();
            };
        }

        // 4. 封印师：复制原封印流程，仅放宽噩梦AI的支付牌限制。
        var sealMap = { di: "diZhiFengYin", shui: "shuiZhiFengYin", huo: "huoZhiFengYin", feng: "fengZhiFengYin", lei: "leiZhiFengYin" };
        var sealCloneNames = [];
        Object.keys(sealMap).forEach(function (suit) {
            var sourceName = sealMap[suit];
            var cloneName = "nightmare_wanXiangFengYin_" + suit;
            addHiddenClone(cloneName, sourceName, {
                duYou: false,
                filterCard: function (card) { return get.type(card) == "faShu" && get.xiBie(card) == suit; },
                filter: function (event, player) {
                    return player.hasCard(function (card) { return get.type(card) == "faShu" && get.xiBie(card) == suit; }) &&
                        game.hasPlayer(function (current) { return lib.skill[sourceName].filterTarget("", player, current); });
                }
            });
            sealCloneNames.push(cloneName);
        });
        addSkill("nightmare_wanXiangFengYin", {
            group: sealCloneNames,
            charlotte: true
        }, "【万象封印】", "你可以将法术牌当作对应系别的【X之封印】使用。");
        addSkill("nightmare_wuXingJinJue", {
            trigger: { source: "chengShouShangHai" },
            forced: true,
            priority: 10,
            filter: function (event) {
                if (!event.faShu || event.num >= 4 || !event.getParent) return false;
                var current = event;
                for (var i = 0; i < 8 && current; i++, current = current.getParent && current.getParent()) {
                    if (current.name && /^(di|shui|huo|feng|lei)ZhiFengYin_xiaoGuo$/.test(current.name)) return true;
                }
                return false;
            },
            content: function () { trigger.changeDamageNum(4 - trigger.num); }
        }, "【五行禁绝】", "你的五种【X之封印】造成的法术伤害均改为4点。");
        register("fengYinShi", ["nightmare_wanXiangFengYin", "nightmare_wuXingJinJue"]);

        // 5. 暗杀者
        addSkill("nightmare_anYingChuBei", {
            charlotte: true
        }, "【暗影储备】", "【潜行】计算攻击伤害加成时，你的能量数至少视为2。");
        addSkill("nightmare_shuiYingWuHen", {
            trigger: { player: "shuiYingAfter" },
            filter: function (event, player) {
                return player.countCards("h", function (card) { return get.xiBie(card) != "shui"; }) > 0;
            },
            async cost(event, trigger, player) {
                event.result = await player.chooseCard("h", function (card) { return get.xiBie(card) != "shui"; })
                    .set("prompt", "【水影无痕】：可以额外弃置1张非水系手牌")
                    .set("ai", function (card) { return 6 - get.value(card); }).forResult();
            },
            content: async function (event, trigger, player) {
                await player.discard(event.cards).set("showCards", true);
            }
        }, "【水影无痕】", "发动【水影】时，可以额外将1张非水系手牌视为水系牌弃置。");
        register("anShaZhe", ["nightmare_anYingChuBei", "nightmare_shuiYingWuHen"]);
        if (lib.skill.qianXing && lib.skill.qianXing.subSkill && lib.skill.qianXing.subSkill.xiaoGuo && !lib.skill.qianXing.subSkill.xiaoGuo._nightmareContentPatched) {
            lib.skill.qianXing.subSkill.xiaoGuo._nightmareContentPatched = true;
            var originalQianXingEffect = lib.skill.qianXing.subSkill.xiaoGuo.content;
            lib.skill.qianXing.subSkill.xiaoGuo.content = async function (event, trigger, player) {
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_anYingChuBei")) {
                    var num = Math.max(2, player.countNengLiangAll());
                    trigger.changeDamageNum(num);
                    trigger.wuFaYingZhan();
                    return;
                }
                return originalQianXingEffect.apply(this, arguments);
            };
        }

        // 6. 圣女
        addSkill("nightmare_shenEn", {
            trigger: { player: "phaseBegin" },
            forced: true,
            async content(event, trigger, player) {
                var list = allies(player, true);
                var target = chooseBestAlly(player, list, function (current) {
                    return current.zhiLiao < current.getZhiLiaoLimit() ? get.zhiLiaoEffect2(current, player, 1) : -10;
                });
                if (target) await target.changeZhiLiao(1, player);
            }
        }, "【神恩】", "回合开始时，选择一名我方角色+1【治疗】。");
        addSkill("nightmare_shenShengLingYu", {
            trigger: { global: "changeZhiLiaoAfter" },
            forced: true,
            filter: function (event, player) {
                return event.player && event.player.side == player.side && event.num < 0 && !!getParentEvent(event, "damage") &&
                    game.hasPlayer(function (current) { return current.side == player.side && current != event.player && current.zhiLiao < current.getZhiLiaoLimit(); });
            },
            async content(event, trigger, player) {
                var list = allies(player, true).filter(function (current) {
                    return current != trigger.player && current.zhiLiao < current.getZhiLiaoLimit();
                });
                var target = chooseBestAlly(player, list, function (current) { return get.zhiLiaoEffect2(current, player, 1); });
                if (target) await target.changeZhiLiao(1, player);
            }
        }, "【神圣领域】", "我方角色的【治疗】被消耗后，令另一名【治疗】未满的我方角色+1【治疗】。");
        register("shengNv", ["nightmare_shenEn", "nightmare_shenShengLingYu"]);

        // 7. 守护天使
        addSkill("nightmare_shouHuZhiYi", {
            trigger: { global: "chengShouShangHaiAfter" },
            forced: true,
            filter: function (event, player) {
                if (!event.player || event.player.side != player.side || event.num <= 0) return false;
                if (event.player.hasJiChuXiaoGuo && event.player.hasJiChuXiaoGuo("_shengDun")) return false;
                return !!get.cardPile(function (card) { return get.name(card) == "shengDun"; }, "cardPile");
            },
            async content(event, trigger, player) {
                var cards = Array.from(ui.cardPile.childNodes || []).filter(function (card) { return get.name(card) == "shengDun"; });
                if (!cards.length) return;
                var chosen = cards.length == 1 ? cards : await player.chooseCardButton(cards, true, "【守护之翼】：选择1张【圣盾】置于受伤角色面前").forResultLinks();
                var card = Array.isArray(chosen) ? chosen[0] : chosen;
                if (card) await trigger.player.addJiChuXiaoGuo("_shengDun", player, [card]);
            }
        }, "【守护之翼】", "有己方角色受到伤害时，若其没有【圣盾】，使其获得【圣盾】。");
        addSkill("nightmare_tianShiJiangLin", {
            trigger: { global: "discardAfter" },
            forced: true,
            filter: function (event, player) {
                return event.player && event.player.side == player.side && event.gaiPai == "_shengDun" && event.cards && event.cards.length > 0;
            },
            content: function () {
                var target = trigger.player;
                if (target.zhiLiao < target.getZhiLiaoLimit()) target.changeZhiLiao(1, player);
                else player.changeZhiLiao(1, player);
            }
        }, "【天使降临】", "我方角色触发【圣盾】时，其+1【治疗】；若其治疗已满，改为你+1【治疗】。");
        register("tianShi", ["nightmare_shouHuZhiYi", "nightmare_tianShiJiangLin"]);

        // 8. 魔法少女
        addSkill("nightmare_moLiXunHuan", {
            trigger: { player: "phaseEnd" },
            forced: true,
            filter: function (event, player) { return player.countCards("h") > 4; },
            content: async function (event, trigger, player) { await player.chooseToDiscard("h", 2, true); }
        }, "【魔力循环】", "回合结束时，若你的手牌数大于4，弃置2张手牌。");
        addSkill("nightmare_wuXianMoLi", {
            trigger: { source: "chengShouShangHaiAfter" },
            forced: true,
            filter: function (event) { return event.faShu && event.num > 0; },
            content: function () { player.addNengLiang("baoShi"); }
        }, "【无限魔力】", "造成法术伤害后，你+1【宝石】。");
        register("moFaShaoNv", ["nightmare_moLiXunHuan", "nightmare_wuXianMoLi"]);

        // 9. 魔剑士
        addSkill("nightmare_anYingTunShi", { charlotte: true }, "【暗影吞噬】", "发动【暗影凝聚】时不再对自己造成法术伤害。");
        addSkill("nightmare_xiuLuoBuMie", {
            trigger: { player: "xiuLuoLianZhanAfter" },
            forced: true,
            content: function () {
                var list = player.storage.extraXingDong || [];
                var latest = list[list.length - 1];
                if (latest && latest.prompt && latest.prompt.indexOf("修罗连斩") != -1) {
                    latest.filterCard = function (card, player) {
                        return get.type(card) == "gongJi" && lib.filter.cardEnabled(card, player, "forceEnable");
                    };
                    latest.prompt = "修罗连斩：任意系【攻击行动】";
                    player.storage.nightmareXiuLuoBuMie = true;
                }
            },
            group: ["nightmare_xiuLuoBuMie_damage", "nightmare_xiuLuoBuMie_clear"],
            subSkill: {
                damage: {
                    trigger: { player: "gongJiSheZhi" }, forced: true,
                    filter: function (event, player) { return activeAttack(event) && player.storage.nightmareXiuLuoBuMie; },
                    content: function () { delete player.storage.nightmareXiuLuoBuMie; trigger.changeDamageNum(2); }
                },
                clear: {
                    trigger: { player: "phaseEnd" }, forced: true, silent: true, popup: false,
                    content: function () { delete player.storage.nightmareXiuLuoBuMie; }
                }
            }
        }, "【修罗不灭】", "【修罗连斩】使用的攻击牌不再有系别要求，且伤害+2。");
        register("moJianShi", ["nightmare_anYingTunShi", "nightmare_xiuLuoBuMie"]);
        if (!lib.skill.anYingNingJu._nightmareContentPatched) {
            lib.skill.anYingNingJu._nightmareContentPatched = true;
            lib.skill.anYingNingJu.content = function () {
                "step 0"
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_anYingTunShi")) event.goto(1);
                else player.faShuDamage(1, player);
                "step 1"
                player.hengZhi();
            };
        }

        // 10. 圣枪骑士
        addSkill("nightmare_shengQiangLueDuo", {
            trigger: { player: "phaseBegin" },
            direct: true,
            filter: function (event, player) {
                return player.zhiLiao < player.getZhiLiaoLimit() && game.hasPlayer(function (current) { return current != player && current.zhiLiao > 0; });
            },
            async cost(event, trigger, player) {
                event.result = await player.chooseTarget("【圣枪掠夺】：选择一名有【治疗】的其他角色", function (card, player, target) {
                    return target != player && target.zhiLiao > 0;
                }).set("ai", function (target) {
                    var player = _status.event.player;
                    return target.side != player.side ? 4 + target.zhiLiao : -2;
                }).forResult();
            },
            async content(event, trigger, player) {
                var target = event.targets && event.targets[0];
                if (!target) return;
                await target.changeZhiLiao(-1, player);
                await player.changeZhiLiao(1, player);
            }
        }, "【圣枪掠夺】", "回合开始时，可以将其他一名有【治疗】的角色的1【治疗】转移给你。");
        addSkill("nightmare_shenShengWuZhuang", {
            trigger: { player: "changeZhiLiaoBefore" },
            forced: true,
            priority: 20,
            filter: function (event) {
                if (event.num >= 0) return false;
                return !!getParentEvent(event, ["tianQiang", "diQiang"]);
            },
            content: function () { trigger.num = Math.min(0, trigger.num + 1); }
        }, "【神圣武装】", "发动【天枪】或【地枪】时，移除的【治疗】数-1。");
        register("shengQiangQiShi", ["nightmare_shengQiangLueDuo", "nightmare_shenShengWuZhuang"]);
        if (!lib.skill.tianQiang._nightmareFilterPatched) {
            lib.skill.tianQiang._nightmareFilterPatched = true;
            var originalTianQiangFilter = lib.skill.tianQiang.filter;
            lib.skill.tianQiang.filter = function (event, player) {
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_shenShengWuZhuang")) {
                    var action = getParentEvent(event, "xingDong");
                    if (action && action.tianQiang === false) return false;
                    return event.yingZhan != true && player.zhiLiao >= 1;
                }
                return originalTianQiangFilter.apply(this, arguments);
            };
        }

        // 11. 元素师
        addSkill("nightmare_yuanSuGongMing", {
            trigger: { source: "chengShouShangHai" },
            forced: true,
            priority: 10,
            filter: function (event) {
                return event.faShu && !!getParentEvent(event, ["yunShi", "bingDong", "huoQou", "fengRen", "leiJi"]);
            },
            content: function () { trigger.changeDamageNum(1); }
        }, "【元素共鸣】", "【陨石】【冰冻】【火球】【风刃】【雷击】造成的伤害+1。");
        addSkill("nightmare_yuanSuLunZhuan", {
            trigger: { player: "phaseBegin" },
            forced: true,
            content: function () { player.addZhiShiWu("yuanSu"); }
        }, "【元素轮转】", "回合开始时，+1【元素】。");
        register("yuanSuShi", ["nightmare_yuanSuGongMing", "nightmare_yuanSuLunZhuan"]);

        // 12. 冒险家
        addSkill("nightmare_touLiangHuanZhu", {
            trigger: { player: "touTianHuanRi_touAfter" },
            forced: true,
            filter: function (event, player) { return get.zhanJi(!player.side).includes("shuiJing"); },
            content: async function (event, trigger, player) {
                if (get.zhanJi(!player.side).includes("shuiJing")) {
                    await player.changeZhanJi("shuiJing", -1, !player.side);
                    await player.addZhanJi("shuiJing", 1);
                }
            }
        }, "【飞龙探云】", "【偷天换日】会同时转移1【水晶】。");
        addSkill("nightmare_qiangYunJiaShen", {
            trigger: { player: "qiZha" },
            forced: true,
            priority: -1,
            filter: function (event, player) {
                return allies(player, false).some(function (current) { return current.countEmptyNengLiang() > 0; });
            },
            content: function () {
                var candidates = game.filterPlayer(function (current) {
                    return current != player && current.side == player.side && current.countEmptyNengLiang() > 0;
                });
                var target = candidates.sort(function (a, b) {
                    return b.countEmptyNengLiang() - a.countEmptyNengLiang();
                })[0];
                if (target) target.addNengLiang("shuiJing");
            }
        }, "【强运加身】", "发动【强运】时，选择一名队友也+1【水晶】。");
        register("maoXianJia", ["nightmare_touLiangHuanZhu", "nightmare_qiangYunJiaShen"]);

        // 13. 瘟疫法师
        addSkill("nightmare_yiBingZiSheng", {
            trigger: { player: "phaseEnd" },
            forced: true,
            content: function () { player.changeZhiLiao(1); }
        }, "【疫病滋生】", "回合结束时，+1【治疗】。");
        addSkill("nightmare_bingYuanChongZu", {
            charlotte: true
        }, "【病原重组】", "【瘟疫】与【剧毒新星】不再以我方角色为目标。");
        register("wenYiFaShi", ["nightmare_yiBingZiSheng", "nightmare_bingYuanChongZu"]);
        ["wenYi", "juDuXinXing"].forEach(function (skillName) {
            var info = lib.skill[skillName];
            if (!info || info._nightmareTargetPatched) return;
            info._nightmareTargetPatched = true;
            var originalTarget = info.filterTarget;
            info.filterTarget = function (card, player, target) {
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_bingYuanChongZu") && target.side == player.side) return false;
                return originalTarget.apply(this, arguments);
            };
        });

        // 14. 仲裁者
        addSkill("nightmare_zuiNieJiaShen", {
            trigger: { player: "chengShouShangHaiAfter" },
            forced: true,
            priority: -10,
            filter: function (event, player) {
                var original = lib.skill.shenPanLangChao;
                return !original.filter || original.filter(event, player);
            },
            content: function () { player.addZhiShiWu("shenPan", 1); }
        }, "【罪孽加深】", "因承受伤害获得【审判】时，额外+1【审判】。");
        addSkill("nightmare_zuiZhongCaiJue", {
            trigger: { player: ["phaseBegin", "moRiShenPanAfter"] },
            forced: true,
            filter: function (event, player) { return event.triggername == "phaseBegin" || player.countCards("h") > 0; },
            content: async function (event, trigger, player) {
                if (event.triggername == "phaseBegin") await player.faShuDamage(1, player);
                else await player.chooseToDiscard("h", Math.min(2, player.countCards("h")), true);
            }
        }, "【最终裁决】", "回合开始时，你受到1点法术伤害；发动【末日审判】时，弃置2张牌。");
        register("zhongCaiZhe", ["nightmare_zuiNieJiaShen", "nightmare_zuiZhongCaiJue"]);

        // 15. 神官
        addSkill("nightmare_shenShengDiaoDu", {
            trigger: { player: "phaseBegin" },
            filter: function (event, player) { return allies(player, false).some(function (current) { return current.zhiLiao < current.getZhiLiaoLimit(); }); },
            check: function (event, player) {
                return allies(player, false).some(function (current) {
                    return current.zhiLiao < current.getZhiLiaoLimit() && get.zhiLiaoEffect2(current, player, 1) > get.zhiLiaoEffect2(player, player, 1);
                });
            },
            async content(event, trigger, player) {
                await player.changeZhiLiao(1);
                var target = chooseBestAlly(player, allies(player, false).filter(function (current) { return current.zhiLiao < current.getZhiLiaoLimit(); }), function (current) { return get.zhiLiaoEffect2(current, player, 1); });
                if (!target) return;
                await player.changeZhiLiao(-1);
                await target.changeZhiLiao(1, player);
            }
        }, "【神圣调度】", "回合开始时，你+1【治疗】，然后将自己的1【治疗】转移给1名己方角色。");
        addSkill("nightmare_shenShengDaiChang", {
            trigger: { global: "chengShouShangHai" },
            priority: 5,
            filter: function (event, player) { return event.player && event.player != player && event.player.side == player.side && event.num > 0 && player.zhiLiao > 0; },
            check: function (event, player) { return get.damageEffect2(event.player, event.source, event.num) < 0; },
            content: async function (event, trigger, player) {
                await player.changeZhiLiao(-1);
                trigger.changeDamageNum(-1);
            }
        }, "【神圣代偿】", "其他我方角色将承受伤害时，移除你的1【治疗】，令该伤害-1。");
        register("shenGuan", ["nightmare_shenShengDiaoDu", "nightmare_shenShengDaiChang"]);

        // 16. 祈祷师
        addSkill("nightmare_shenQi", {
            trigger: { global: ["gameStart", "enterGame"] },
            forced: true,
            filter: function (event, player) { return !player.storage.nightmareShenQiGranted; },
            content: function () { lib.xingBeiNightmare.grantOpeningResource(player, "nightmareShenQiGranted", "baoShi"); }
        }, "【神启】", "游戏开始时，+1【宝石】。");
        addSkill("nightmare_qianChengXinYang", {
            trigger: { player: ["qiDaoAfter", "phaseBegin"] },
            forced: true,
            content: function () {
                if (event.triggername == "phaseBegin") player.addZhiShiWu("qiDaoFuWen");
                else {
                    var current = player.countZhiShiWu("qiDaoFuWen");
                    if (current < 3) player.addZhiShiWu("qiDaoFuWen", 3 - current);
                }
            }
        }, "【虔诚信仰】", "进入【祈祷形态】时，立即获得3个【祈祷符文】；回合开始时，你+1【祈祷符文】。");
        register("qiDaoShi", ["nightmare_shenQi", "nightmare_qianChengXinYang"]);

        // 17. 贤者
        addSkill("nightmare_wanJuanGuiYi", {
            trigger: { source: "chengShouShangHai" },
            forced: true,
            priority: 5,
            filter: function (event) {
                if (!event.faShu || !event.getParent) return false;
                var current = event;
                for (var i = 0; i < 8 && current; i++, current = current.getParent && current.getParent()) if (current.name == "moDaoFaDian") return true;
                return false;
            },
            content: function () { trigger.changeDamageNum(1); }
        }, "【万卷归一】", "【魔道法典】造成的法术伤害额外+1。");
        addSkill("nightmare_jinJiFaDian", {
            trigger: { source: "chengShouShangHaiAfter" },
            forced: true,
            filter: function (event) { return event.num > 3; },
            content: function () { player.addNengLiang("baoShi"); }
        }, "【禁忌法典】", "你造成大于3点的伤害后，+1【宝石】。");
        register("xianZhe", ["nightmare_wanJuanGuiYi", "nightmare_jinJiFaDian"]);

        // 18. 灵符师
        addSkill("nightmare_wanFuGuiZong", {
            trigger: { source: "chengShouShangHai" },
            forced: true,
            priority: 10,
            filter: function (event) { return event.faShu && !!getParentEvent(event, "lingFu_leiMing"); },
            content: function () { trigger.changeDamageNum(1); }
        }, "【万符归宗】", "【雷鸣】造成的伤害+1。");
        addSkill("nightmare_fuZhenLunZhuan", {
            trigger: { player: "nianZhouAfter" },
            forced: true,
            content: function () { player.addNengLiang("shuiJing"); }
        }, "【符阵轮转】", "发动【念咒】时，+1【水晶】。");
        register("lingFuShi", ["nightmare_wanFuGuiZong", "nightmare_fuZhenLunZhuan"]);

        // 19. 剑帝
        addSkill("nightmare_jianYiBuJue", {
            trigger: { player: "phaseBegin", source: "gongJiMingZhong" },
            forced: true,
            content: function () { player.addZhiShiWu("jianQi"); }
        }, "【剑意不绝】", "回合开始时，+1【剑气】；攻击命中时，+1【剑气】。");
        addSkill("nightmare_wanJianChenFu", {
            charlotte: true
        }, "【万剑臣服】", "发动【剑气斩】时，可以弃置与本次伤害数相同数量的手牌。");
        register("jianDi", ["nightmare_jianYiBuJue", "nightmare_wanJianChenFu"]);
        if (!lib.skill.jianQiZhan._nightmareContentPatched) {
            lib.skill.jianQiZhan._nightmareContentPatched = true;
            lib.skill.jianQiZhan.content = function () {
                "step 0"
                event.num = event.cost_data;
                player.removeZhiShiWu("jianQi", event.num);
                "step 1"
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_wanJianChenFu") && player.countCards("h") >= event.num) {
                    player.chooseToDiscard("h", event.num)
                        .set("prompt", "【万剑臣服】：可以弃置" + event.num + "张手牌")
                        .set("ai", function (card) { return 6 - get.value(card); });
                }
                "step 2"
                var targetx = trigger.target;
                var name = get.translation(targetx);
                var next = player.chooseTarget("对除" + name + "以外的任意一名角色造成" + event.num + "点法术伤害③", true, function (card, player, target) {
                    return target != _status.event.targetx;
                });
                next.set("targetx", targetx);
                next.set("num", event.num);
                next.set("ai", function (target) {
                    return get.damageEffect2(target, _status.event.player, _status.event.num);
                });
                "step 3"
                result.targets[0].faShuDamage(event.num, player);
            };
        }

        // 20. 格斗家
        addSkill("nightmare_douQiFeiTeng", {
            trigger: { source: "gongJiMingZhongAfter" },
            forced: true,
            content: function () { player.addZhiShiWu("douQi"); }
        }, "【斗气沸腾】", "攻击命中后，+1【斗气】。");
        addSkill("nightmare_wuJi", {
            trigger: { player: "changeZhiShiWuBefore" },
            forced: true,
            priority: 100,
            filter: function (event) {
                return event.zhiShiWu == "douQi" && event.num < 0 && !!getParentEvent(event, "baiShiHuanLongQuan");
            },
            content: function () { trigger.num = 0; }
        }, "【武极】", "【百式幻龙拳】不再消耗【斗气】。");
        register("geDouJia", ["nightmare_douQiFeiTeng", "nightmare_wuJi"]);

        // 21. 勇者
        addSkill("nightmare_yingXiongBenNeng", {
            trigger: { global: ["gameStart", "enterGame"], player: "phaseBegin" },
            forced: true,
            filter: function (event, player) { return event.triggername == "phaseBegin" || !player.storage.nightmareYingXiongBenNengGranted; },
            content: function () {
                if (event.triggername == "phaseBegin") player.addZhiShiWu(Math.random() < 0.5 ? "nuQi" : "zhiXing");
                else lib.xingBeiNightmare.grantOpeningResource(player, "nightmareYingXiongBenNengGranted", "baoShi");
            }
        }, "【英雄本能】", "游戏开始时，你+1【宝石】；回合开始时，你随机+1【怒气】或【知性】。");
        addSkill("nightmare_buMieYongZhe", {
            mod: {
                maxHandcardFinal: function (player, num) {
                    if (lib.xingBeiNightmare.isNightmareAi(player) && player.isHengZhi()) return Math.max(num, 5);
                }
            }
        }, "【不灭勇者】", "处于【精疲力尽】状态时，手牌上限提高至5。");
        register("yongZhe", ["nightmare_yingXiongBenNeng", "nightmare_buMieYongZhe"]);

        // 22. 灵魂术士
        addSkill("nightmare_hunSeDiaoLv", {
            trigger: { player: "phaseBegin" },
            filter: function (event, player) {
                return player.countZhiShiWu("huangSeLingHun") + player.countZhiShiWu("lanSeLingHun") > 0;
            },
            async cost(event, trigger, player) {
                var yellow = player.countZhiShiWu("huangSeLingHun");
                var blue = player.countZhiShiWu("lanSeLingHun");
                var source = yellow >= blue ? "huangSeLingHun" : "lanSeLingHun";
                var max = Math.min(2, player.countZhiShiWu(source));
                var controls = ["不转换"];
                for (var i = 1; i <= max; i++) controls.push("转换" + i + "点");
                var control = await player.chooseControl(controls)
                    .set("prompt", "【魂色调律】：将最多2点已有【灵魂】转换颜色")
                    .set("ai", function () {
                        var y = _status.event.player.countZhiShiWu("huangSeLingHun");
                        var b = _status.event.player.countZhiShiWu("lanSeLingHun");
                        var n = Math.min(2, Math.floor(Math.abs(y - b) / 2));
                        return n > 0 ? "转换" + n + "点" : "不转换";
                    }).forResultControl();
                event.result = { bool: control != "不转换", cost_data: { source: source, num: parseInt(control.replace("转换", "")) || 0 } };
            },
            async content(event, trigger, player) {
                var source = event.cost_data.source;
                var target = source == "huangSeLingHun" ? "lanSeLingHun" : "huangSeLingHun";
                await player.removeZhiShiWu(source, event.cost_data.num);
                await player.addZhiShiWu(target, event.cost_data.num);
            }
        }, "【魂色调律】", "回合开始时，可以将最多2点已有【灵魂】转换颜色。");
        addSkill("nightmare_wangHunHuiXiang", {
            trigger: { global: "changeShiQiAfter" },
            forced: true,
            priority: -1,
            filter: function (event, player) {
                return event.side == player.side && event.num < 0 && player.hasSkill("lingHunTunShi") && !event.nightmareWangHunHuiXiang;
            },
            content: function () { player.addZhiShiWu("lanSeLingHun"); }
        }, "【亡魂回响】", "发动【灵魂吞噬】时，额外获得1点【蓝色灵魂】。");
        register("lingHunShuShi", ["nightmare_hunSeDiaoLv", "nightmare_wangHunHuiXiang"]);

        // 23. 血之巫女
        addSkill("nightmare_xueQiZhuZai", {
            trigger: { player: "chengShouShangHaiBefore" },
            forced: true,
            priority: 100,
            filter: function (event) {
                return event.source == event.player && !!getParentEvent(event, "xueZhiAiShang");
            },
            content: function () { trigger.cancel(); }
        }, "【血契主宰】", "转移【同生共死】的目标时，自身不再受到伤害。");
        addSkill("nightmare_xianXueZhiPei", {
            trigger: { player: "chengShouShangHai" },
            forced: true,
            priority: 20,
            filter: function (event, player) { return player.isHengZhi() && event.num > 0; },
            content: function () { trigger.changeDamageNum(-1); }
        }, "【鲜血支配】", "【流血状态】下，你受到的伤害-1。");
        register("xueZhiWuNv", ["nightmare_xueQiZhuZai", "nightmare_xianXueZhiPei"]);

        // 24. 蝶舞者
        addSkill("nightmare_dieMengRanSe", {
            trigger: { player: "phaseBegin" },
            forced: true,
            async content(event, trigger, player) {
                var cards = get.cards(3);
                await player.loseToSpecial(cards, "jian", player);
                player.markSkill("jian");
            }
        }, "【蝶梦染色】", "回合开始时，将牌堆顶3张牌作为【茧】。");
        addSkill("nightmare_diaoLingZhiMeng", {
            trigger: { player: "chengShouShangHai" },
            forced: true,
            priority: 20,
            filter: function (event) { return event.source == event.player && event.num > 0 && !!getParentEvent(event, "diaoLing"); },
            content: function () { trigger.changeDamageNum(-1); }
        }, "【凋零之梦】", "发动【凋零】时，你受到的伤害-1。");
        register("dieWuZhe", ["nightmare_dieMengRanSe", "nightmare_diaoLingZhiMeng"]);

        // 25. 女武神
        addSkill("nightmare_kaiXuanZhiGe", {
            mod: { maxZhiLiao: function (player, num) { if (lib.xingBeiNightmare.isNightmareAi(player)) return num + 2; } }
        }, "【凯旋之歌】", "你的【治疗】上限+2。");
        addSkill("nightmare_shengLiZhuiJi", {
            trigger: { player: "shenShengZhuiJiAfter" },
            forced: true,
            silent: true,
            popup: false,
            content: function () { player.storage.nightmareShengLiZhuiJi = true; },
            group: ["nightmare_shengLiZhuiJi_hit", "nightmare_shengLiZhuiJi_clear"],
            subSkill: {
                hit: {
                    trigger: { source: "gongJiMingZhongAfter" }, forced: true,
                    filter: function (event, player) { return activeAttack(event) && player.storage.nightmareShengLiZhuiJi; },
                    content: function () { delete player.storage.nightmareShengLiZhuiJi; player.changeZhiLiao(1); }
                },
                clear: {
                    trigger: { player: "gongJiAfter" }, forced: true, silent: true, popup: false, priority: -100,
                    filter: function (event, player) { return activeAttack(event) && player.storage.nightmareShengLiZhuiJi; },
                    content: function () { delete player.storage.nightmareShengLiZhuiJi; }
                }
            }
        }, "【胜利追击】", "通过【神圣追击】获得的额外攻击命中后，+1【治疗】。");
        register("nvWuShen", ["nightmare_kaiXuanZhiGe", "nightmare_shengLiZhuiJi"]);

        // 26. 魔弓
        addSkill("nightmare_guoZaiDanCang", {
            trigger: { global: ["gameStart", "enterGame"] },
            forced: true,
            filter: function (event, player) { return !player.storage.nightmareGuoZaiDanCangGranted; },
            content: function () {
                lib.xingBeiNightmare.grantOpeningResource(player, "nightmareGuoZaiDanCangGranted", "baoShi", 3);
            },
            mod: { maxHandcardFinal: function (player, num) { if (lib.xingBeiNightmare.isNightmareAi(player)) return num + 2; } }
        }, "【过载弹仓】", "你的手牌上限+2；游戏开始时，你+3【宝石】。");
        addSkill("nightmare_ziDongZhuangTian", {
            trigger: { player: "phaseBegin" },
            forced: true,
            async content(event, trigger, player) {
                var cards = get.cards(3);
                await player.loseToSpecial(cards, "chongNengPai", player);
                player.markSkill("chongNengPai");
            }
        }, "【自动装填】", "回合开始时，将牌堆顶3张牌面朝下放置为【充能】。");
        register("moGong", ["nightmare_guoZaiDanCang", "nightmare_ziDongZhuangTian"]);

        // 27. 红莲骑士
        addSkill("nightmare_xianXueYongRan", {
            trigger: { player: "chengShouShangHaiAfter" },
            forced: true,
            filter: function (event, player) { return player.isHengZhi() && event.num > 0 && event.shiQiXiaJiang === false; },
            async content(event, trigger, player) {
                var choice = await player.chooseControl(["治疗", "血印"])
                    .set("prompt", "【鲜血永燃】：获得1【治疗】或1【血印】")
                    .set("ai", function () { return _status.event.player.zhiLiao < _status.event.player.getZhiLiaoLimit() ? "治疗" : "血印"; }).forResultControl();
                if (choice == "治疗") await player.changeZhiLiao(1);
                else await player.addZhiShiWu("xueYin");
            }
        }, "【鲜血永燃】", "因【热血沸腾】避免己方士气下降后，获得1【治疗】或1【血印】。");
        addSkill("nightmare_xianXueHuiXiang", {
            trigger: { player: "chongZhiAfter" },
            forced: true,
            filter: function (event) { return !!getParentEvent(event, "reXueFeiTeng_chongZhi"); },
            content: function () { game.changeShiQi(1, player.side); }
        }, "【鲜血回响】", "退出【热血沸腾】状态时，我方士气+1。");
        register("hongLianQiShi", ["nightmare_xianXueYongRan", "nightmare_xianXueHuiXiang"]);

        // 28. 英灵人形
        addSkill("nightmare_wenZhangHuiLu", {
            charlotte: true
        }, "【纹章回路】", "【战纹碎击】与【魔纹融合】造成的伤害+1。");
        addSkill("nightmare_chaoPinGaiZao", {
            trigger: { player: "fuWenGaiZaoAfter" },
            forced: true,
            filter: function (event, player) { return player.countCards("h") < player.getHandcardLimit(); },
            content: function () { player.drawTo(player.getHandcardLimit()); }
        }, "【超频改造】", "发动【符文改造】时，将手牌补至上限。");
        register("yingLingRenXing", ["nightmare_wenZhangHuiLu", "nightmare_chaoPinGaiZao"]);
        if (!lib.skill.zhanWenSuiJi._nightmareDamagePatched) {
            lib.skill.zhanWenSuiJi._nightmareDamagePatched = true;
            lib.skill.zhanWenSuiJi.content = async function (event, trigger, player) {
                var num = event.cards.length - 1;
                var zhanWenNum = 1;
                if (player.isHengZhi() && player.countZhiShiWu("zhanWen") > 1) {
                    var list = [];
                    for (var i = 0; i <= player.countZhiShiWu("zhanWen") - 1; i++) list.push(i);
                    var control = await player.chooseControl(list)
                        .set("prompt", "额外翻转Y个【战纹】，本次攻击伤害额外+(" + num + "+Y)")
                        .set("ai", function () { return _status.event.list.length - 1; })
                        .set("list", list).forResultControl();
                    if (control > 0) {
                        num += control;
                        zhanWenNum += control;
                    }
                }
                await lib.skill.zhanWenZhangWo.fanZhuanZhanWen(player, zhanWenNum);
                await player.discard(event.cards).set("showCards", true);
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_wenZhangHuiLu")) num++;
                trigger.changeDamageNum(num);
            };
        }
        if (!lib.skill.moWenRongHe._nightmareDamagePatched) {
            lib.skill.moWenRongHe._nightmareDamagePatched = true;
            var originalMoWenContent = lib.skill.moWenRongHe.content;
            lib.skill.moWenRongHe.content = async function (event, trigger, player) {
                trigger.nuHuoYaZhi = false;
                var num = event.cards.length - 1;
                var moWenNum = 1;
                if (player.isHengZhi() && player.countZhiShiWu("moWen") > 1) {
                    var list = [];
                    for (var i = 0; i <= player.countZhiShiWu("moWen") - 1; i++) list.push(i);
                    var control = await player.chooseControl(list)
                        .set("prompt", "额外翻转Y个【魔纹】，本次法术伤害为" + num + "+Y")
                        .set("ai", function () { return _status.event.list.length - 1; })
                        .set("list", list).forResultControl();
                    if (control > 0) {
                        num += control;
                        moWenNum += control;
                    }
                }
                await lib.skill.zhanWenZhangWo.fanZhuanMoWen(player, moWenNum);
                await player.discard(event.cards).set("showCards", true);
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_wenZhangHuiLu")) num++;
                await trigger.player.faShuDamage(num, player);
            };
        }

        // 29. 魔枪
        addSkill("nightmare_qiangZhiChongYing", {
            trigger: { global: "discardAfter" },
            forced: true,
            silent: true,
            popup: false,
            filter: function (event, player) {
                if (!event.player || event.player == player || event.player.side != player.side || !event.cards || !event.cards.length) return false;
                return event.cards.some(function (card) { return get.type(card) != "faShu" && get.xiBie(card) != "lei"; });
            },
            content: function () {
                var count = trigger.cards.filter(function (card) {
                    return get.type(card) != "faShu" && get.xiBie(card) != "lei";
                }).length;
                player.storage.chongYing = (player.storage.chongYing || 0) + count;
            }
        }, "【强制充盈】", "所有己方队友弃置的牌均视为雷系牌。");
        addSkill("nightmare_qiHeiZengFu", {
            trigger: { source: "gongJiMingZhong" },
            forced: true,
            priority: 10,
            filter: function (event) { return event.target && event.target.countCards("h") < 3; },
            content: function () { trigger.changeDamageNum(4); }
        }, "【漆黑增幅】", "你命中手牌数小于3的目标时，伤害+4。");
        register("moQiang", ["nightmare_qiangZhiChongYing", "nightmare_qiHeiZengFu"]);

        // 30. 苍炎魔女
        addSkill("nightmare_cangYanZhuanSheng", {
            trigger: { player: "yongShengYinShiJiAfter" },
            forced: true,
            content: function () { game.changeShiQi(1, player.side); }
        }, "【苍炎转生】", "获得【重生】时，我方士气+1。");
        addSkill("nightmare_buMieCangYan", {
            trigger: { global: "changeShiQiBefore" },
            forced: true,
            priority: 100,
            filter: function (event, player) {
                if (event.side != player.side || event.num >= -1) return false;
                var damage = getParentEvent(event, "damage");
                return event.cause == "damage" && damage && damage.player == player;
            },
            content: function () { trigger.num += 1; }
        }, "【不灭苍炎】", "受到伤害导致己方士气下降时，此次士气下降值-1，最少为1。");
        register("cangYanMoNv", ["nightmare_cangYanZhuanSheng", "nightmare_buMieCangYan"]);

        // 31. 吟游诗人
        addSkill("nightmare_yongHengXuanLv", {
            trigger: { global: ["phaseBegin", "phaseEnd"] },
            forced: true,
            filter: function (event, player) {
                return event.player && event.player.hasZhiShiWu && event.player.hasZhiShiWu("yongHengYueZhang") && event.player.storage.yongHengYueZhang_player == player;
            },
            async content(event, trigger, player) {
                var holder = trigger.player;
                if (event.triggername == "phaseBegin") {
                    var targets = enemies(player).slice().sort(function (a, b) { return get.damageEffect2(b, player, 1) - get.damageEffect2(a, player, 1); }).slice(0, 2);
                    for (var target of targets) await target.faShuDamage(1, player);
                    if (holder.countCards("h")) await holder.chooseToDiscard("h", Math.min(2, holder.countCards("h")), true);
                } else {
                    var zhanJi = get.zhanJi(player.side);
                    if (zhanJi.length && holder.countEmptyNengLiang() > 0) {
                        var stone = zhanJi.includes("baoShi") ? "baoShi" : zhanJi[0];
                        await holder.changeZhanJi(stone, -1);
                        await holder.addNengLiang(stone);
                    }
                    await holder.addZhanJi("baoShi");
                    await holder.changeZhiLiao(1);
                }
                await event.trigger("yongHengYueZhang");
            }
        }, "【永恒旋律】", "【激昂狂想曲】与【胜利交响诗】的效果不再选择，而是依次发动。");
        addSkill("nightmare_jueDuiYinGan", {
            trigger: { player: "chengShouShangHai" },
            forced: true,
            priority: 100,
            filter: function (event) { return event.source == event.player && event.num > 1 && !!getParentEvent(event, "jinJiShiPian"); },
            content: function () { trigger.changeDamageNum(1 - trigger.num); }
        }, "【绝对音感】", "【禁忌诗篇】对自己造成的伤害减少为1点。");
        register("yinYouShiRen", ["nightmare_yongHengXuanLv", "nightmare_jueDuiYinGan"]);
        if (lib.skill.yongHengYueZhang && !lib.skill.yongHengYueZhang._nightmareFiltersPatched) {
            lib.skill.yongHengYueZhang._nightmareFiltersPatched = true;
            ["jiAngKuangXiangQu", "shengLiJiaoXiangShi"].forEach(function (key) {
                var skill = lib.skill.yongHengYueZhang.subSkill[key];
                var original = skill.filter;
                skill.filter = function (event, holder) {
                    var bard = holder.storage.yongHengYueZhang_player;
                    if (bard && lib.xingBeiNightmare.isNightmareAi(bard) && bard.hasSkill("nightmare_yongHengXuanLv")) return false;
                    return original.apply(this, arguments);
                };
            });
        }

        // 32. 精灵射手
        addSkill("nightmare_wuSeShenJian", {
            trigger: { source: ["gongJiMingZhong", "chengShouShangHai"] },
            forced: true,
            priority: 20,
            filter: function (event) {
                if (event.name == "gongJi") return event.customArgs && event.customArgs.yuanSuSheJi == true;
                return event.faShu && !!getParentEvent(event, "yuanSuSheJi_di");
            },
            content: function () { trigger.changeDamageNum(1); }
        }, "【五色神箭】", "【元素射击】造成的伤害+1。");
        addSkill("nightmare_senZhiZhuFu", {
            trigger: { player: "jingLingMiYiAfter" },
            forced: true,
            async content(event, trigger, player) {
                var extra = get.cards(2);
                if (extra.length) await player.loseToSpecial(extra, "zhuFu", player);
                player.markSkill("zhuFu");
            }
        }, "【森之祝福】", "发动【精灵秘仪】时，改为查看牌堆顶5张牌，将这5张牌均作为【祝福】。");
        register("jingLingSheShou", ["nightmare_wuSeShenJian", "nightmare_senZhiZhuFu"]);

        // 33. 阴阳师
        addSkill("nightmare_shuangHunGongMing", {
            trigger: { player: "heiAnJiLiAfter" },
            forced: true,
            content: function () { player.addZhiShiWu("guiHuo", 2); }
        }, "【双魂共鸣】", "【鬼火】上限+2；发动【黑暗祭礼】后，保留2【鬼火】。");
        addSkill("nightmare_shiShenHuZhu", { charlotte: true }, "【式神护主】", "【式神咒束】不再移除【宝石】和【水晶】。");
        register("yinYangShi", ["nightmare_shuangHunGongMing", "nightmare_shiShenHuZhu"]);
        if (lib.skill.guiHuo && !lib.skill.guiHuo._nightmareMaxPatched) {
            lib.skill.guiHuo._nightmareMaxPatched = true;
            var originalGuiHuoMax = lib.skill.guiHuo.intro.max;
            lib.skill.guiHuo.intro.max = function (player) {
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_shuangHunGongMing")) return 5;
                return typeof originalGuiHuoMax == "function" ? originalGuiHuoMax(player) : originalGuiHuoMax;
            };
            lib.skill.heiAnJiLi.filter = function (event, player) {
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_shuangHunGongMing")) {
                    return player.countZhiShiWu("guiHuo") >= player.getZhiShiWuLimit("guiHuo");
                }
                var max = typeof originalGuiHuoMax == "function" ? originalGuiHuoMax(player) : originalGuiHuoMax;
                return player.countZhiShiWu("guiHuo") >= max;
            };
        }
        if (!lib.skill.shiShenZhouShu._nightmarePatched) {
            lib.skill.shiShenZhouShu._nightmarePatched = true;
            var originalShiShenFilter = lib.skill.shiShenZhouShu.filter;
            lib.skill.shiShenZhouShu.filter = function (event, player) {
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_shiShenHuZhu")) {
                    return player.countCards("h") > 0 && event.yingZhan != true && event.target.side == player.side && event.target != player && event.canYingZhan != false && player.isHengZhi();
                }
                return originalShiShenFilter.apply(this, arguments);
            };
            var originalTiaoJianFilter = lib.skill.shiShenZhouShu.subSkill.tiaoJian.filter;
            lib.skill.shiShenZhouShu.subSkill.tiaoJian.filter = function (event, player) {
                var parent = event.getParent && event.getParent();
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_shiShenHuZhu") && parent && parent.shiShenZhouShu == true) return false;
                return originalTiaoJianFilter.apply(this, arguments);
            };
        }

        // 34. 血色剑灵
        addSkill("nightmare_xueSeKeWang", {
            trigger: { source: "chengShouShangHai" },
            forced: true,
            priority: 10,
            filter: function (event, player) { return event.num > 0 && player.countZhiShiWu("xianXue") > 1; },
            content: function () { trigger.changeDamageNum(1); }
        }, "【血色渴望】", "你的【鲜血】大于1时，造成的伤害+1。");
        addSkill("nightmare_xianXueHuiLiu", {
            trigger: { source: "gongJiWeiMingZhong" },
            forced: true,
            content: function () { player.addZhiShiWu("xianXue"); }
        }, "【鲜血回流】", "攻击未命中时，+1【鲜血】。");
        register("xueSeJianLing", ["nightmare_xueSeKeWang", "nightmare_xianXueHuiLiu"]);

        // 35. 月之女神
        addSkill("nightmare_yueShiSheMian", {
            trigger: { player: "discard" },
            forced: true,
            priority: 100,
            silent: true,
            popup: false,
            filter: function (event) { return event.gaiPai == "anYue"; },
            content: function () { trigger.nightmareYueShiSheMian = true; }
        }, "【月蚀赦免】", "移除【暗月】时，不触发本次【暗月诅咒】造成的己方士气下降。");
        addSkill("nightmare_yueZhiLunZhuan", {
            trigger: { global: "changeShiQiEnd" },
            forced: true,
            filter: function (event, player) { return event.side == player.side && event.num < 0 && player.getGaiPai("anYue").length > 0; },
            async content(event, trigger, player) {
                var cards = player.getGaiPai("anYue");
                var links = cards.length == 1 ? cards : await player.chooseCardButton(cards, true, "【月之轮转】：移除1个【暗月】").forResultLinks();
                await player.discard([links[0]], "anYue");
            }
        }, "【月之轮转】", "我方士气下降时，移除1个【暗月】。");
        register("yueZhiNvShen", ["nightmare_yueShiSheMian", "nightmare_yueZhiLunZhuan"]);
        if (!lib.skill.anYueZuZhou._nightmareFilterPatched) {
            lib.skill.anYueZuZhou._nightmareFilterPatched = true;
            var originalAnYueFilter = lib.skill.anYueZuZhou.filter;
            lib.skill.anYueZuZhou.filter = function (event, player) {
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_yueShiSheMian") &&
                    event.gaiPai == "anYue") return false;
                return originalAnYueFilter.apply(this, arguments);
            };
        }

        // 36. 圣弓
        addSkill("nightmare_ziDongQiDao", {
            trigger: { player: "phaseBegin" },
            forced: true,
            content: function () { player.addNengLiang("baoShi"); }
        }, "【自动祈祷】", "回合开始时，你+1【宝石】。");
        addSkill("nightmare_shengHuangShenYu", {
            trigger: { player: "changeZhiShiWuBefore" },
            forced: true,
            priority: 100,
            filter: function (event) { return event.zhiShiWu == "xinYang" && event.num < 0 && !!getParentEvent(event, "shengHuangHuiGuangPao"); },
            content: function () { trigger.num = Math.min(0, trigger.num + 4); }
        }, "【圣煌神谕】", "取消【圣煌辉光炮】的基础【信仰】消耗。");
        register("shengGong", ["nightmare_ziDongQiDao", "nightmare_shengHuangShenYu"]);
        if (!lib.skill.shengHuangHuiGuangPao._nightmareFilterPatched) {
            lib.skill.shengHuangHuiGuangPao._nightmareFilterPatched = true;
            var originalPaoFilter = lib.skill.shengHuangHuiGuangPao.filter;
            lib.skill.shengHuangHuiGuangPao.filter = function (event, player) {
                if (lib.xingBeiNightmare.isNightmareAi(player) && player.hasSkill("nightmare_shengHuangShenYu")) {
                    if (!player.isHengZhi() || player.countZhiShiWu("shengHuangHuiGuangPaoX") < 1) return false;
                    var diff = player.side == true ? game.lanShiQi - game.hongShiQi : game.hongShiQi - game.lanShiQi;
                    return player.countZhiShiWu("xinYang") >= Math.max(0, diff);
                }
                return originalPaoFilter.apply(this, arguments);
            };
        }

        // 37. 兽灵武士
        addSkill("nightmare_shouLieBenNeng", {
            trigger: { player: "phaseBegin" },
            forced: true,
            content: function () {
                if (!player.isHengZhi()) player.hengZhi();
                player.addZhiShiWu("shouHun");
            }
        }, "【狩猎本能】", "回合开始时，若处于【普通形态】，进入【御魂流居合形态】；然后+1【兽魂】。");
        addSkill("nightmare_jueJingShouLie", {
            trigger: { player: "niFanJuHeZhanAfter" },
            forced: true,
            filter: function (event) {
                var attack = event.getTrigger && event.getTrigger();
                return attack && attack.customArgs && typeof attack.customArgs.niFanJuHeZhan_num == "number";
            },
            content: function () {
                var attack = trigger.getTrigger && trigger.getTrigger();
                if (attack) attack.qiangZhiMingZhong();
            },
            group: "nightmare_jueJingShouLie_removeStone",
            subSkill: {
                removeStone: {
                    trigger: { source: "gongJiMingZhong" }, forced: true,
                    filter: function (event) {
                        return event.customArgs && typeof event.customArgs.niFanJuHeZhan_num == "number" && event.target && event.target.canBiShaShuiJing();
                    },
                    content: async function (event, trigger) { await trigger.target.removeBiShaShuiJing(); }
                }
            }
        }, "【绝境狩猎】", "【逆反居合斩】强制命中，并移除命中目标1颗星石。");
        register("shouLingWuShi", ["nightmare_shouLieBenNeng", "nightmare_jueJingShouLie"]);

    }

    function getHelper() {
        if (lib.xingBeiShiZhouNianAi) return lib.xingBeiShiZhouNianAi;

        lib.xingBeiShiZhouNianAi = {
            handRoom: function (player) {
                if (!player || typeof player.getHandcardLimit != "function") return 0;
                return Math.max(0, player.getHandcardLimit() - player.countCards("h"));
            },
            signedHandRoom: function (player) {
                if (!player || typeof player.getHandcardLimit != "function") return 0;
                return player.getHandcardLimit() - player.countCards("h");
            },
            wouldOverflow: function (player, drawCount, cardsLeaving) {
                if (!player || typeof player.getHandcardLimit != "function") return false;
                drawCount = Math.max(0, drawCount || 0);
                cardsLeaving = Math.max(0, cardsLeaving || 0);
                return player.countCards("h") - cardsLeaving + drawCount > player.getHandcardLimit();
            },
            sameSide: function (player, target) {
                return !!player && !!target && player.side == target.side;
            },
            recordCount: function (player, name) {
                if (!player || typeof get.zhanJi != "function") return 0;
                var records = get.zhanJi(player.side) || [];
                var count = 0;
                for (var i = 0; i < records.length; i++) {
                    if (records[i] == name) count++;
                }
                return count;
            },
            hasActionCard: function (player, type) {
                if (!player || typeof player.countCards != "function") return false;
                return player.countCards("h", function (card) {
                    return get.type(card) == type;
                }) > 0;
            },
            responseCount: function (target, attackCard) {
                if (!target || !attackCard || typeof target.countCards != "function") return 0;
                var suit = get.xiBie(attackCard);
                return target.countCards("h", function (card) {
                    if (get.type(card) != "gongJi") return false;
                    var cardSuit = get.xiBie(card);
                    return cardSuit == "an" || cardSuit == suit;
                });
            },
            holyLightCount: function (target) {
                if (!target || typeof target.countCards != "function") return 0;
                return target.countCards("h", function (card) {
                    return get.name(card) == "shengGuang";
                });
            },
            shieldCount: function (target) {
                if (!target) return 0;
                if (typeof target.getGaiPai == "function") {
                    var cards = target.getGaiPai("_shengDun") || [];
                    if (cards.length) return cards.length;
                }
                if (typeof target.getExpansions == "function") {
                    var expansions = target.getExpansions("_shengDun") || [];
                    return expansions.length;
                }
                return 0;
            },
            isForcedHit: function (event, attackCard) {
                if (event) {
                    if (event.qiangZhiMingZhong == true || event.forceHit == true) return true;
                    if (event.canYingZhan == false && event.canShengGuang == false && event.canShengDun == false) return true;
                }
                return !!(attackCard && attackCard.qiangZhiMingZhong == true);
            },
            likelyHit: function (player, target, attackCard) {
                if (!target || !attackCard) return 0.5;
                var event = _status.event;
                if (this.isForcedHit(event, attackCard)) return 0.99;
                var canRespond = !event || event.canYingZhan !== false;
                var canHolyLight = !event || event.canShengGuang !== false;
                var canShield = !event || event.canShengDun !== false;
                var dark = get.xiBie(attackCard) == "an";
                var responses = this.responseCount(target, attackCard);
                var holyLight = canHolyLight ? this.holyLightCount(target) : 0;
                var shields = canShield ? this.shieldCount(target) : 0;
                if (!canRespond) responses = 0;
                if (dark) responses = 0;
                var defenses = responses + holyLight + shields;
                if (defenses <= 0) return 0.93;
                if (defenses == 1) return dark ? 0.62 : 0.46;
                if (defenses == 2) return dark ? 0.38 : 0.24;
                return dark ? 0.22 : 0.12;
            },
            canWinningSynthesis: function (event, player) {
                var skill = lib.skill && lib.skill._heCheng;
                if (!skill || !skill.filter || !player) return false;
                try {
                    if (!skill.filter(event || _status.event, player)) return false;
                    var enemyMorale = typeof get.shiQi == "function" ? get.shiQi(!player.side) : 99;
                    var cups = typeof get.xingBei == "function" ? get.xingBei(player.side) : 0;
                    return enemyMorale <= 1 || (typeof game.xingBeiMax == "number" && cups + 1 >= game.xingBeiMax);
                } catch (e) {
                    return false;
                }
            },
            shouldReserveSpecial: function (event, player) {
                if (this.canWinningSynthesis(event, player)) return true;

                var synthesis = lib.skill && lib.skill._heCheng;
                try {
                    if (synthesis && synthesis.filter && synthesis.filter(event || _status.event, player)) {
                        var enemyMorale = get.shiQi(!player.side);
                        if (enemyMorale <= 3 && get.zhanJi(player.side).length >= 4) return true;
                    }
                } catch (e) { }

                var purchase = lib.skill && lib.skill._gouMai;
                try {
                    if (purchase && purchase.filter && purchase.filter(event || _status.event, player)) {
                        if (player.countCards("h") == 0 && get.emptyZhanJi(player.side) >= 2) return true;
                    }
                } catch (e) { }
                return false;
            },
            damageScore: function (target, source, amount) {
                if (!target || !source) return 0;
                if (typeof get.damageEffect2 == "function") return get.damageEffect2(target, source, amount);
                if (typeof get.damageEffect == "function") {
                    var effect = get.damageEffect(target, amount);
                    return target.side == source.side ? effect : -effect;
                }
                return target.side == source.side ? -amount : amount;
            },
            healScore: function (target, source, amount) {
                if (!target || !source) return 0;
                if (typeof get.zhiLiaoEffect2 == "function") return get.zhiLiaoEffect2(target, source, amount);
                return target.side == source.side ? amount : -amount;
            },
            overflowAfterDamage: function (target, amount) {
                if (!target || typeof target.getHandcardLimit != "function") return 0;
                var treatment = Math.max(0, target.zhiLiao || 0);
                var actual = Math.max(0, (amount || 0) - treatment);
                return Math.max(0, target.countCards("h") + actual - target.getHandcardLimit());
            },
            damagePressure: function (target, source, amount) {
                if (!target || !source) return 0;
                amount = Math.max(0, amount || 0);
                var score = this.damageScore(target, source, amount);
                var overflow = this.overflowAfterDamage(target, amount);
                score += overflow * 3;
                if (target.side != source.side && overflow >= get.shiQi(target.side)) score += 20;
                return score;
            },
            selfDamageRisk: function (player, amount, cardsLeaving) {
                if (!player) return 99;
                amount = Math.max(0, amount || 0);
                cardsLeaving = Math.max(0, cardsLeaving || 0);
                var actual = Math.max(0, amount - Math.max(0, player.zhiLiao || 0));
                var handAfterCost = Math.max(0, player.countCards("h") - cardsLeaving);
                var overflow = Math.max(0, handAfterCost + actual - player.getHandcardLimit());
                var risk = actual * 0.45 + overflow * 3;
                if (overflow >= get.shiQi(player.side)) risk += 20;
                return risk;
            },
            countUsableCards: function (player, type, excludedCard) {
                if (!player || typeof player.countCards != "function") return 0;
                return player.countCards("h", function (card) {
                    if (card == excludedCard || get.type(card) != type) return false;
                    try {
                        if (typeof player.hasUseTargetXingBei == "function") return player.hasUseTargetXingBei(card);
                    } catch (e) { }
                    return true;
                });
            },
            actionSlots: function (player, type) {
                if (!player) return 0;
                var storage = player.storage || {};
                var count = Math.max(0, storage.gongJiOrFaShu || 0);
                if (type == "gongJi") count += Math.max(0, storage.gongJi || 0);
                else if (type == "faShu") count += Math.max(0, storage.faShu || 0);
                if (Array.isArray(storage.extraXingDong)) {
                    for (var i = 0; i < storage.extraXingDong.length; i++) {
                        var action = storage.extraXingDong[i];
                        if (!action) continue;
                        if (action.xingDong == type || action.xingDong == "gongJiOrFaShu") count++;
                    }
                }
                return count;
            },
            lowValueCards: function (cards, count) {
                cards = (cards || []).slice().sort(function (a, b) {
                    return get.value(a) - get.value(b);
                });
                return cards.slice(0, Math.max(0, count || 0));
            },
            bestEnemy: function (player, scorer, filter) {
                var best = null;
                var bestScore = -Infinity;
                game.filterPlayer(function (target) {
                    if (!target || target.side == player.side) return false;
                    if (typeof filter == "function" && !filter(target)) return false;
                    var score = typeof scorer == "function" ? scorer(target) : 0;
                    if (score > bestScore) {
                        best = target;
                        bestScore = score;
                    }
                    return false;
                });
                return { target: best, score: bestScore };
            }
        };
        return lib.xingBeiShiZhouNianAi;
    }

    function markPatched(skill, key) {
        if (!skill) return false;
        var marker = "_shiZhouNianAi_" + key;
        if (skill[marker]) return false;
        skill[marker] = true;
        return true;
    }

    // 主动技能先选择实体费用牌时，本体会把该实体牌作为默认选人依据，
    // 不会自动使用 skill.ai.result.target。将效果语义分数转换成 ai2 的
    // 直接选人分数，避免技能因费用牌原本的用途而取消或选错目标。
    function bindPhysicalCostTargetAi(skill) {
        if (!skill || !skill.ai || !skill.ai.result || skill.ai.result.target == null) return;
        if (!markPatched(skill, "physicalCostTargetAi")) return;
        skill.ai2 = function (target) {
            var player = _status.event.player;
            if (!player || !target) return 0;
            var scorer = skill.ai.result.target;
            var value = typeof scorer == "function" ? scorer(player, target) : scorer;
            if (typeof value != "number" || !isFinite(value) || value == 0) return 0;
            var attitude = typeof get.attitude == "function" ? get.attitude(player, target) : 0;
            if (!attitude) attitude = target.side == player.side ? 1 : -1;
            return value * (attitude > 0 ? 1 : -1);
        };
    }

    function patchPhysicalCostTargetAi() {
        [
            "zhiLiaoShu", "zhiYuZhiGuang",
            "diZhiFengYin", "shuiZhiFengYin", "huoZhiFengYin", "fengZhiFengYin", "leiZhiFengYin",
            "shanGuangXianJing", "weiLiCiFu", "xunJieCiFu",
            "lingHunZhenBao", "lingHunFuYu", "xueZhiBeiMing",
            "tianShiZhuFu", "moBaoChongJi", "chengJie", "xingHongShiZi",
            "moDaoFaDian", "shengJieFaDian", "lingFu_fengXing",
            "shuiZhiShenLi", "qiZha", "shengMingJieJie_2"
        ].forEach(function (name) {
            bindPhysicalCostTargetAi(lib.skill && lib.skill[name]);
        });

        // 兼容尚未展开为全局子技能名的加载阶段。
        var lifeBarrier = lib.skill && lib.skill.shengMingJieJie;
        if (lifeBarrier && lifeBarrier.subSkill) {
            bindPhysicalCostTargetAi(lifeBarrier.subSkill[2] || lifeBarrier.subSkill["2"]);
        }
    }

    function patchCoreActions(helper) {
        var purchase = lib.skill && lib.skill._gouMai;
        if (purchase && purchase.ai && purchase.ai.result && markPatched(purchase, "purchase")) {
            purchase.ai.order = function (item, player) {
                var room = helper.handRoom(player);
                var empty = get.emptyZhanJi(player.side);
                var order = 2.7 + Math.min(1.2, room * 0.18) + Math.min(0.7, empty * 0.25);
                if (player.countCards("h") == 0) order += 1.5;
                if (!helper.hasActionCard(player, "gongJi") && !helper.hasActionCard(player, "faShu")) order += 0.8;
                return order;
            };
            purchase.ai.result.player = function (player) {
                var empty = get.emptyZhanJi(player.side);
                if (empty <= 0) return 0;
                var hand = player.countCards("h");
                var room = helper.handRoom(player);
                var score = room * 0.18 + empty * 0.28;
                if (hand == 0) score += 1.2;
                else if (hand <= 2) score += 0.55;
                if (!helper.hasActionCard(player, "gongJi") && !helper.hasActionCard(player, "faShu")) score += 0.45;
                return score >= 0.95 ? score : 0;
            };
        }

        var synthesis = lib.skill && lib.skill._heCheng;
        if (synthesis && synthesis.ai && synthesis.ai.result && markPatched(synthesis, "synthesis")) {
            synthesis.ai.order = function (item, player) {
                if (helper.canWinningSynthesis(_status.event, player)) return 30;
                var enemyMorale = get.shiQi(!player.side);
                var records = get.zhanJi(player.side).length;
                return 4.2 + Math.max(0, 5 - enemyMorale) * 0.65 + Math.max(0, records - 3) * 0.35;
            };
            synthesis.ai.result.player = function (player) {
                if (helper.canWinningSynthesis(_status.event, player)) return 20;
                var enemyMorale = get.shiQi(!player.side);
                var records = get.zhanJi(player.side).length;
                var score = 0.3 + helper.handRoom(player) * 0.12;
                if (enemyMorale <= 3) score += 1.2;
                if (records >= 4) score += 0.9;
                if (player.countCards("h") <= 2) score += 0.55;
                return score;
            };
        }
    }

    function patchStartupSkills(helper) {
        for (var i = 0; i < startupSkills.length; i++) {
            var name = startupSkills[i];
            var skill = lib.skill && lib.skill[name];
            if (!skill || !markPatched(skill, "reserveSpecial")) continue;
            (function (skillInfo) {
                var oldCheck = skillInfo.check;
                skillInfo.check = function (event, player) {
                    if (helper.shouldReserveSpecial(event, player)) return false;
                    if (typeof oldCheck == "function") return oldCheck.apply(this, arguments);
                    return true;
                };
            })(skill);
        }

        var stealth = lib.skill && lib.skill.qianXing;
        if (stealth && markPatched(stealth, "postResetHandLimit")) {
            var oldStealthCheck = stealth.check;
            stealth.check = function (event, player) {
                if (player.countCards("h") + 1 > player.getHandcardLimit() - 1) return false;
                return typeof oldStealthCheck == "function" ? oldStealthCheck.apply(this, arguments) : true;
            };
        }
    }

    function patchTouTianHuanRi(helper) {
        var skill = lib.skill && lib.skill.touTianHuanRi;
        if (!skill || !skill.chooseButton || !markPatched(skill, "choice")) return;
        skill.chooseButton.check = function (button) {
            var player = _status.event.player;
            if (button.link == "tou") {
                return helper.recordCount({ side: !player.side }, "baoShi") > 0 ? 6 : -10;
            }
            if (button.link == "huan") {
                var crystals = helper.recordCount(player, "shuiJing");
                var gems = helper.recordCount(player, "baoShi");
                if (crystals <= 0) return 0.2;
                return 1.5 + crystals * 1.2 - gems * 0.15;
            }
            return 0;
        };
    }

    function patchQiZha(helper) {
        var skill = lib.skill && lib.skill.qiZha;
        if (!skill || !markPatched(skill, "suitChoice")) return;
        var attackNames = {
            shui: "shuiLianZhan",
            huo: "huoYanZhan",
            feng: "fengShenZhan",
            lei: "leiGuangZhan",
            di: "diLieZhan"
        };
        skill.content = async function (event, trigger, player) {
            await event.trigger("qiZha");
            var length = event.cards && event.cards.length || 0;
            var xiBie;
            var name;
            if (length == 2) {
                var list = ["shui", "huo", "feng", "lei", "di"];
                var control = await player.chooseControl(list).set("prompt", "选择攻击系别").set("target", event.target).set("ai", function () {
                    var target = _status.event.target;
                    var player = _status.event.player;
                    var best = "shui";
                    var bestScore = -Infinity;
                    for (var i = 0; i < list.length; i++) {
                        var suit = list[i];
                        var virtualCard = { name: attackNames[suit], xiBie: suit, isCard: true };
                        var score = helper.likelyHit(player, target, virtualCard) * 5;
                        score += helper.overflowAfterDamage(target, 2) * 3;
                        if (suit == "lei" && helper.responseCount(target, virtualCard) > 0) score += 0.6;
                        if (score > bestScore) {
                            best = suit;
                            bestScore = score;
                        }
                    }
                    return best;
                }).forResult("control");
                xiBie = control || "shui";
                name = attackNames[xiBie];
            } else if (length == 3) {
                xiBie = "an";
                name = "anMie";
            }
            if (!name || !event.target) return;
            await player.useCard({ name: name, xiBie: xiBie }, event.target).set("action", true);
        };
        skill.check = function (card) {
            var player = _status.event.player;
            var selected = ui.selected.cards || [];
            var lowCards = player.countCards("h", function (current) {
                return get.value(current, player) <= 5.5;
            });
            var desired = lowCards >= 3 ? 3 : 2;
            var bonus = selected.length < desired ? 1.2 : -1.5;
            return 7.2 + bonus - get.value(card, player);
        };
    }

    function patchAngelSkills(helper) {
        var song = lib.skill && lib.skill.tianShiZhiGe;
        if (song && markPatched(song, "validCheck")) {
            song.check = function (event, player) {
                var best = -Infinity;
                game.filterPlayer(function (target) {
                    if (!target.hasJiChuXiaoGuo || !target.hasJiChuXiaoGuo()) return false;
                    var value = get.jiChuXiaoGuoEffect(target);
                    var score = target.side == player.side ? value : -value;
                    if (score > best) best = score;
                    return false;
                });
                if (best <= 0) return false;
                if (helper.shouldReserveSpecial(event, player) && best < 2) return false;
                return true;
            };
        }

        var shelter = lib.skill && lib.skill.shenZhiBiHu;
        if (shelter && markPatched(shelter, "energyChoice")) {
            shelter.cost = async function (event, trigger, player) {
                var list = [];
                var gems = player.countNengLiang("baoShi");
                var crystals = player.countNengLiang("shuiJing");
                for (var i = 0; i < gems; i++) list.push(["baoShi", "宝石"]);
                for (var j = 0; j < crystals; j++) list.push(["shuiJing", "水晶"]);
                var loss = Math.max(1, -trigger.num);
                var result = await player.chooseButton(["是否发动【神之庇护】<br>" + lib.translate.shenZhiBiHu_info, [list, "tdnodes"]])
                    .set("selectButton", [1, Math.min(loss, list.length)])
                    .set("loss", loss)
                    .set("crystals", crystals)
                    .set("ai", function (button) {
                        var selected = ui.selected.buttons.length;
                        var loss = _status.event.loss;
                        var morale = get.shiQi(_status.event.player.side);
                        var need = morale <= loss ? loss : 1;
                        if (selected >= need) return 0;
                        var resource = Array.isArray(button.link) ? button.link[0] : button.link;
                        if (resource == "shuiJing") return 10;
                        return _status.event.crystals < need ? 7 : 2;
                    }).forResult();
                event.result = {
                    bool: !!(result.bool && result.links && result.links.length),
                    cost_data: result.links || []
                };
            };
            shelter.content = function () {
                var links = event.cost_data || [];
                if (!links.length) return;
                trigger.num += links.length;
                var dict = { baoShi: 0, shuiJing: 0 };
                for (var i = 0; i < links.length; i++) {
                    var resource = Array.isArray(links[i]) ? links[i][0] : links[i];
                    if (dict[resource] != null) dict[resource]++;
                }
                if (dict.baoShi) player.changeNengLiang("baoShi", -dict.baoShi);
                if (dict.shuiJing) player.changeNengLiang("shuiJing", -dict.shuiJing);
            };
        }
    }

    function patchTianQiang(helper) {
        var skill = lib.skill && lib.skill.tianQiang;
        if (!skill || !markPatched(skill, "check")) return;
        skill.check = function (event, player) {
            var target = event.target || (event.targets && event.targets[0]);
            if (!target || helper.sameSide(player, target)) return false;
            if (get.xiBie(event.card) == "an") return false;
            var responses = helper.responseCount(target, event.card);
            if (responses <= 0) return false;
            var pressure = target.countCards("h") >= target.getHandcardLimit() ? 1 : 0;
            return responses >= 2 || pressure > 0 || get.shiQi(!player.side) <= 3;
        };
    }

    function patchDiQiang(helper) {
        var skill = lib.skill && lib.skill.diQiang;
        if (!skill || !markPatched(skill, "healSpend")) return;
        skill.cost = async function (event, trigger, player) {
            var max = Math.min(4, player.zhiLiao || 0);
            var list = [];
            for (var i = 1; i <= max; i++) list.push(i);
            list.push("cancel2");
            var target = trigger.target;
            var result = await player.chooseControl(list).set("prompt", "是否发动【地枪】<br>" + lib.translate.diQiang_info)
                .set("target", target)
                .set("baseDamage", trigger.damageNum || 2)
                .set("ai", function () {
                    var player = _status.event.player;
                    var target = _status.event.target;
                    if (!target || target.side == player.side) return "cancel2";
                    var max = Math.min(4, player.zhiLiao || 0);
                    var base = _status.event.baseDamage || 2;
                    var best = "cancel2";
                    var bestScore = 0;
                    for (var amount = 1; amount <= max; amount++) {
                        var before = helper.overflowAfterDamage(target, base);
                        var after = helper.overflowAfterDamage(target, base + amount);
                        var score = (after - before) * 4 + amount * 0.35;
                        if (get.shiQi(!player.side) <= after) score += 20;
                        if (player.zhiLiao - amount <= 0) score -= 1.1;
                        if (score > bestScore) {
                            best = amount;
                            bestScore = score;
                        }
                    }
                    return best;
                }).forResult();
            event.result = {
                bool: result.control != "cancel2" && typeof result.control == "number",
                cost_data: result.control
            };
        };
    }

    function patchShengQiangQiShiActionChain(helper) {
        function treatmentLimit(player) {
            return typeof player.getZhiLiaoLimit == "function" ? player.getZhiLiaoLimit() : 0;
        }

        function canTarget(card, player, target) {
            if (!target || target.side == player.side) return false;
            try {
                if (lib.filter && typeof lib.filter.targetEnabled == "function") {
                    return lib.filter.targetEnabled(card, player, target);
                }
            } catch (e) { }
            return true;
        }

        function hitChance(player, target, card, ignoreResponse) {
            if (!target || !card) return 0;
            var responses = get.xiBie(card) == "an" || ignoreResponse ? 0 : helper.responseCount(target, card);
            var defenses = responses + helper.holyLightCount(target) + helper.shieldCount(target);
            if (defenses <= 0) return 0.93;
            if (defenses == 1) return 0.46;
            if (defenses == 2) return 0.24;
            return 0.12;
        }

        function attackOutcome(target, damage, predictedTreatment) {
            var healing = predictedTreatment == null ? Math.max(0, target.zhiLiao || 0) : Math.max(0, predictedTreatment);
            var drained = Math.min(healing, Math.max(0, damage || 0));
            var actual = Math.max(0, (damage || 0) - healing);
            var hand = target.countCards("h");
            var limit = target.getHandcardLimit();
            var overflow = Math.max(0, hand + actual - limit);
            var reachesLimit = actual > 0 && hand + actual >= limit;
            var score = drained * 0.38 + actual * 0.08 + overflow * 3.3 + (reachesLimit ? 0.45 : 0);
            if (overflow > 0 && overflow >= get.shiQi(target.side)) score += 20;
            return { drained: drained, actual: actual, overflow: overflow, score: score };
        }

        function bestDiSpend(player, target, baseDamage, availableTreatment, targetTreatment) {
            availableTreatment = Math.max(0, availableTreatment == null ? player.zhiLiao || 0 : availableTreatment);
            var max = Math.min(4, availableTreatment);
            var before = attackOutcome(target, baseDamage, targetTreatment);
            var best = { amount: 0, score: 0 };
            var futureAttack = helper.countUsableCards(player, "gongJi") > 0;
            for (var amount = 1; amount <= max; amount++) {
                var after = attackOutcome(target, baseDamage + amount, targetTreatment);
                var score = after.score - before.score - amount * 0.48 - 0.45;
                if (futureAttack && availableTreatment - amount < 2) score -= 0.35;
                if (after.overflow > before.overflow) score += 0.45;
                if (after.overflow >= get.shiQi(!player.side) && after.overflow > 0) score += 8;
                if (score > best.score + 0.05) best = { amount: amount, score: score };
            }
            return best;
        }

        function tianQiangValue(player, target, card, availableTreatment, targetTreatment) {
            if (!target || !card || availableTreatment < 2 || get.xiBie(card) == "an") return -10;
            if (helper.responseCount(target, card) <= 0) return -10;
            var normalHit = hitChance(player, target, card, false);
            var blockedHit = hitChance(player, target, card, true);
            var outcome = attackOutcome(target, 2, targetTreatment);
            var hitValue = 1.1 + outcome.score;
            var cost = 1.25 + (availableTreatment <= 2 ? 0.4 : 0);
            return (blockedHit - normalHit) * hitValue - cost;
        }

        function attackCards(player, excludedCard) {
            return player.getCards("h", function (card) {
                return card != excludedCard && get.type(card) == "gongJi";
            });
        }

        function bestAttackPlan(player, excludedCard, options) {
            options = options || {};
            var cards = attackCards(player, excludedCard);
            var availableTreatment = options.treatment == null ? player.zhiLiao || 0 : options.treatment;
            var best = null;
            for (var i = 0; i < cards.length; i++) {
                var card = cards[i];
                game.countPlayer(function (target) {
                    if (!canTarget(card, player, target)) return;
                    var targetTreatment = typeof options.targetTreatment == "function" ? options.targetTreatment(target) : target.zhiLiao || 0;
                    var normalHit = hitChance(player, target, card, false);
                    var outcome = attackOutcome(target, 2, targetTreatment);
                    var score = 0.7 + normalHit * (0.45 + outcome.score);
                    var di = bestDiSpend(player, target, 2, availableTreatment, targetTreatment);
                    if (di.amount) score += normalHit * di.score;
                    var tian = options.disableTian ? -10 : tianQiangValue(player, target, card, availableTreatment, targetTreatment);
                    if (tian > 0) score += tian;
                    if (!best || score > best.score) {
                        best = { card: card, target: target, score: score, di: di, tianValue: tian };
                    }
                });
            }
            return best;
        }

        function groupHealingValue(player) {
            var score = 0;
            game.countPlayer(function (target) {
                var gain = Math.min(1, Math.max(0, treatmentLimit(target) - (target.zhiLiao || 0)));
                if (!gain) return;
                score += target.side == player.side ? 0.68 : -0.72;
                if (target == player && player.zhiLiao < 2) score += 0.3;
            });
            return score;
        }

        function radiancePlan(player, costCard) {
            var ownTreatment = Math.min(treatmentLimit(player), (player.zhiLiao || 0) + 1);
            var attack = bestAttackPlan(player, costCard, {
                treatment: ownTreatment,
                targetTreatment: function (target) {
                    return Math.min(treatmentLimit(target), (target.zhiLiao || 0) + 1);
                }
            });
            var score = groupHealingValue(player) + (attack ? attack.score : 0);
            if (costCard) score -= Math.max(0.15, get.value(costCard, player) * 0.1);
            if (!attack && score < 1.25) score -= 2;
            return { attack: attack, score: score };
        }

        function bestRadiancePlan(player) {
            var cards = player.getCards("h", function (card) { return get.xiBie(card) == "shui"; });
            var best = null;
            for (var i = 0; i < cards.length; i++) {
                var plan = radiancePlan(player, cards[i]);
                plan.card = cards[i];
                if (!best || plan.score > best.score) best = plan;
            }
            return best;
        }

        function punishPlan(player, costCard, target) {
            if (!target || target.side == player.side || target.zhiLiao <= 0) return null;
            var ownGain = player.zhiLiao < treatmentLimit(player) ? 1 : 0;
            var attack = bestAttackPlan(player, costCard, {
                treatment: (player.zhiLiao || 0) + ownGain,
                targetTreatment: function (attackTarget) {
                    return Math.max(0, (attackTarget.zhiLiao || 0) - (attackTarget == target ? 1 : 0));
                }
            });
            var stripValue = target.zhiLiao == 1 ? 1.25 : 0.72;
            if (target.countCards("h") >= target.getHandcardLimit() - 2) stripValue += 0.45;
            var score = stripValue + ownGain * 0.62 + (attack ? attack.score : 0);
            if (costCard) score -= Math.max(0.15, get.value(costCard, player) * 0.1);
            if (!attack && ownGain == 0) score -= 0.55;
            return { attack: attack, score: score };
        }

        function bestPunishPlan(player, costCard) {
            var best = null;
            game.countPlayer(function (target) {
                var plan = punishPlan(player, costCard, target);
                if (!plan) return;
                plan.target = target;
                if (!best || plan.score > best.score) best = plan;
            });
            return best;
        }

        function bestPunishAiPlan(player) {
            var cards = player.getCards("h", function (card) {
                return get.type(card) == "faShu" && get.name(card, player) != "shengGuang";
            });
            var best = null;
            for (var i = 0; i < cards.length; i++) {
                var plan = bestPunishPlan(player, cards[i]);
                if (!plan) continue;
                plan.card = cards[i];
                if (!best || plan.score > best.score) best = plan;
            }
            return best;
        }

        function prayerPlan(player) {
            var treatment = Math.min(5, (player.zhiLiao || 0) + 2);
            var gain = treatment - (player.zhiLiao || 0);
            var attack = bestAttackPlan(player, null, { treatment: treatment, disableTian: true });
            if (!attack) return { score: -10, gain: gain, attack: null };
            var score = attack.score + gain * 0.62 - 1.45;
            if (gain <= 0 && (!attack.di || attack.di.score < 1.2)) score -= 1;
            return { score: score, gain: gain, attack: attack };
        }

        var radiance = lib.skill && lib.skill.huiYao;
        if (radiance && markPatched(radiance, "fullActionChain")) {
            radiance.check = function (card) {
                var plan = radiancePlan(_status.event.player, card);
                return plan.score >= 0.7 ? 10 + plan.score - get.value(card, _status.event.player) : -100;
            };
            if (!radiance.ai) radiance.ai = {};
            radiance.ai.order = function (item, player) {
                if (helper.shouldReserveSpecial(_status.event, player)) return 0;
                var plan = bestRadiancePlan(player);
                return plan && plan.score >= 0.7 ? 4.6 + Math.min(1.8, plan.score * 0.35) : 0;
            };
            radiance.ai.result = {
                player: function (player) {
                    var plan = bestRadiancePlan(player);
                    return plan && plan.score >= 0.7 ? plan.score : -8;
                },
                target: 0
            };
        }

        var punish = lib.skill && lib.skill.chengJie;
        if (punish && markPatched(punish, "fullActionChain")) {
            punish.check = function (card) {
                var player = _status.event.player;
                // 【圣光】是圣枪骑士的重要防御牌，AI不将其弃作【惩戒】费用。
                if (get.name(card, player) == "shengGuang") return -100;
                var plan = bestPunishPlan(player, card);
                return plan && plan.score >= 0.75 ? 10 + plan.score - get.value(card, player) : -100;
            };
            if (!punish.ai) punish.ai = {};
            punish.ai.order = function (item, player) {
                if (helper.shouldReserveSpecial(_status.event, player)) return 0;
                var plan = bestPunishAiPlan(player);
                return plan && plan.score >= 0.75 ? 4.8 + Math.min(1.7, plan.score * 0.3) : 0;
            };
            punish.ai.result = {
                player: 0,
                target: function (player, target) {
                    if (target.side == player.side) return 0;
                    var plan = punishPlan(player, null, target);
                    return plan && plan.score >= 0.75 ? -plan.score : 0;
                }
            };
        }

        var heavenly = lib.skill && lib.skill.tianQiang;
        if (heavenly && markPatched(heavenly, "fullActionChain")) {
            heavenly.check = function (event, player) {
                var target = event.target || event.targets && event.targets[0];
                return tianQiangValue(player, target, event.card, player.zhiLiao || 0, target && target.zhiLiao || 0) >= 0.35;
            };
        }

        var earthly = lib.skill && lib.skill.diQiang;
        if (earthly && markPatched(earthly, "fullActionChain")) {
            earthly.cost = async function (event, trigger, player) {
                var max = Math.min(4, player.zhiLiao || 0);
                var list = [];
                for (var i = 1; i <= max; i++) list.push(i);
                list.push("cancel2");
                var plan = bestDiSpend(player, trigger.target, trigger.damageNum || 2, player.zhiLiao || 0, trigger.target.zhiLiao || 0);
                var result = await player.chooseControl(list)
                    .set("prompt", "是否发动【地枪】<br>" + lib.translate.diQiang_info)
                    .set("choice", plan.amount && plan.score >= 0.45 ? plan.amount : "cancel2")
                    .set("ai", function () { return _status.event.choice; }).forResult();
                event.result = {
                    bool: result.control != "cancel2" && typeof result.control == "number",
                    cost_data: result.control
                };
            };
        }

        var prayer = lib.skill && lib.skill.shengGuangQiYu;
        if (prayer && markPatched(prayer, "fullActionChain")) {
            if (!prayer.ai) prayer.ai = {};
            prayer.ai.order = function (item, player) {
                if (helper.shouldReserveSpecial(_status.event, player)) return 0;
                var plan = prayerPlan(player);
                return plan.score >= 0.8 ? 4.9 + Math.min(1.5, plan.score * 0.3) : 0;
            };
            prayer.ai.result = {
                player: function (player) {
                    if (helper.shouldReserveSpecial(_status.event, player)) return -10;
                    var plan = prayerPlan(player);
                    return plan.score >= 0.8 ? plan.score : -10;
                }
            };
        }

        var holyStrike = lib.skill && lib.skill.shengJi;
        if (holyStrike && markPatched(holyStrike, "fullActionChainTarget")) {
            if (!holyStrike.ai) holyStrike.ai = {};
            if (!holyStrike.ai.effect) holyStrike.ai.effect = {};
            holyStrike.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side) return;
                var hit = hitChance(player, target, card, false);
                var outcome = attackOutcome(target, 2, target.zhiLiao || 0);
                var di = bestDiSpend(player, target, 2, player.zhiLiao || 0, target.zhiLiao || 0);
                var tian = tianQiangValue(player, target, card, player.zhiLiao || 0, target.zhiLiao || 0);
                var bonus = hit * (outcome.overflow * 1.15 + Math.max(0, di.score) * 0.55) + Math.max(0, tian) * 0.5;
                if (bonus > 0.1) return [1, 0, 1, -bonus];
            };
        }
    }

    function patchNvWuShen(helper) {
        var glory = lib.skill && lib.skill.junShenWeiGuang;
        if (glory && markPatched(glory, "phaseChoice")) {
            glory.content = function () {
                var helper = lib.xingBeiShiZhouNianAi;
                "step 0"
                var choiceList = ["你+1[治疗]，[重置]脱离【英灵形态】", "(移除我方【战绩区】X个星石，X<3)目标角色+X[治疗]"];
                var choices = ["选项一"];
                var records = get.zhanJi(player.side) || [];
                if (records.length >= 1) choices.push("选项二");
                player.chooseControl(choices).set("prompt", "军神威光：选择一项").set("choiceList", choiceList).set("ai", function () {
                    var player = _status.event.player;
                    var records = get.zhanJi(player.side) || [];
                    var bestHeal = 0;
                    game.filterPlayer(function (target) {
                        if (target.side != player.side) return false;
                        bestHeal = Math.max(bestHeal, target.getZhiLiaoLimit() - target.zhiLiao);
                        return false;
                    });
                    if (records.length && bestHeal >= 2 && !helper.shouldReserveSpecial(_status.event, player)) return "选项二";
                    return "选项一";
                });
                "step 1"
                if (result.index == 0 || result.control == "选项一") {
                    player.changeZhiLiao(1);
                    player.chongZhi();
                    event.finish();
                } else {
                    var records = get.zhanJi(player.side) || [];
                    var listx = [];
                    for (var i = 0; i < records.length; i++) listx.push([records[i], get.translation(records[i])]);
                    player.chooseButton(["移除X个星石，X<3", [listx, "tdnodes"]]).set("forced", true).set("selectButton", [1, 2]).set("ai", function (button) {
                        var player = _status.event.player;
                        if (ui.selected.buttons.length >= 1) {
                            var bestNeed = 0;
                            game.filterPlayer(function (target) {
                                if (target.side == player.side) bestNeed = Math.max(bestNeed, target.getZhiLiaoLimit() - target.zhiLiao);
                                return false;
                            });
                            if (bestNeed < 2) return 0;
                        }
                            var resource = Array.isArray(button.link) ? button.link[0] : button.link;
                            if (resource == "shuiJing") return 8;
                        return helper.shouldReserveSpecial(_status.event, player) ? 0 : 4;
                    });
                }
                "step 2"
                if (!result.links || !result.links.length) {
                    event.finish();
                } else {
                    event.number = result.links.length;
                    var dict = { baoShi: 0, shuiJing: 0 };
                    for (var i = 0; i < result.links.length; i++) {
                        var resource = Array.isArray(result.links[i]) ? result.links[i][0] : result.links[i];
                        if (dict[resource] != null) dict[resource]++;
                    }
                    if (dict.baoShi > 0) player.removeZhanJi("baoShi", dict.baoShi);
                    if (dict.shuiJing > 0) player.removeZhanJi("shuiJing", dict.shuiJing);
                }
                "step 3"
                player.chooseTarget(1, true, "选择一个目标角色+" + event.number + "点[治疗]").set("ai", function (target) {
                    return helper.healScore(target, _status.event.player, _status.event.number);
                }).set("number", event.number);
                "step 4"
                if (result.targets && result.targets.length) result.targets[0].changeZhiLiao(event.number, player);
            };
        }

        var summon = lib.skill && lib.skill.yingLingZhaoHuan;
        if (summon && markPatched(summon, "resourceCheck")) {
            summon.check = function (event, player) {
                var target = event.target || event.player;
                var base = event.damageNum || 2;
                var overflowGain = helper.overflowAfterDamage(target, base + 1) - helper.overflowAfterDamage(target, base);
                if (overflowGain > 0 || get.shiQi(!player.side) <= 3) return true;
                return !helper.shouldReserveSpecial(event, player) && player.countNengLiang("shuiJing") > 0;
            };
            summon.content = function () {
                var helper = lib.xingBeiShiZhouNianAi;
                "step 0"
                player.removeBiShaShuiJing();
                "step 1"
                trigger.changeDamageNum(1);
                "step 2"
                player.chooseCardTarget({
                    filterCard: function (card) {
                        return get.type(card) == "faShu";
                    },
                    filterTarget: true,
                    prompt: "若你额外弃置1张法术牌【展示】，目标角色+1【治疗】",
                    ai1: function (card) {
                        return 7 - get.value(card, _status.event.player);
                    },
                    ai2: function (target) {
                        var player = _status.event.player;
                        if (target.side != player.side) return 0;
                        return helper.healScore(target, player, 1);
                    },
                });
                "step 3"
                if (result.bool && result.cards && result.cards.length && result.targets && result.targets.length) {
                    player.discard(result.cards).set("showCards", true);
                    event.target = result.targets[0];
                } else event.goto(5);
                "step 4"
                event.target.changeZhiLiao(1, player);
                "step 5"
                event.trigger("yingLingZhaoHuan");
            };
        }
    }

    function patchHuangQuanZhengChan(helper) {
        var skill = lib.skill && lib.skill.huangQuanZhengChan;
        if (!skill || !markPatched(skill, "check")) return;
        skill.check = function (event, player) {
            var target = event.target || (event.targets && event.targets[0]);
            if (!target || helper.sameSide(player, target)) return false;
            if (get.xiBie(event.card) == "an") return false;
            var responses = helper.responseCount(target, event.card);
            var netCards = Math.max(0, helper.handRoom(player) - 2);
            var recordPressure = get.zhanJi(player.side).length >= get.zhanJiMax(player.side);
            var enemyLow = get.shiQi(!player.side) <= 3;
            if (responses <= 0 && netCards <= 0 && !enemyLow) return false;
            return responses >= 1 && (netCards >= 1 || recordPressure || enemyLow);
        };
    }

    function patchShengMingJieJie(helper) {
        var skill = lib.skill && lib.skill.shengMingJieJie;
        if (!skill || !skill.chooseButton || !markPatched(skill, "choice")) return;
        skill.chooseButton.check = function (button) {
            var player = _status.event.player;
            var ghostFire = typeof player.countZhiShiWu == "function" ? player.countZhiShiWu("guiHuo") : 0;
            if (button.link == "1") {
                var selfRisk = Math.max(0, ghostFire - (player.zhiLiao || 0) - helper.handRoom(player));
                var score = 4.2 - selfRisk * 2;
                if (ghostFire == 3) score += 1.2;
                return score;
            }
            if (button.link == "2") {
                var lowCards = player.countCards("h", function (card) { return get.value(card) <= 5; });
                var score2 = player.isHengZhi() ? 2.3 : -10;
                if (lowCards >= 2) score2 += 0.8;
                if (ghostFire >= 2) score2 += 1.2;
                return score2;
            }
            return 0;
        };
    }

    function patchXuLiYiJi(helper) {
        var skill = lib.skill && lib.skill.xuLiYiji;
        if (!skill || !markPatched(skill, "check")) return;
        skill.check = function (event, player) {
            var target = event.target || (event.targets && event.targets[0]);
            if (!target || helper.sameSide(player, target)) return false;
            var qi = player.countZhiShiWu("douQi") + 1;
            var hit = helper.likelyHit(player, target, event.card);
            var safeDamage = (player.zhiLiao || 0) + helper.handRoom(player);
            if (hit >= 0.8) return true;
            if (qi > safeDamage + 1) return false;
            if (player.isHengZhi() && qi >= 3 && hit < 0.55) return false;
            return hit >= 0.45 || get.shiQi(!player.side) <= 2;
        };
    }

    function patchFuWenGaiZao(helper) {
        var skill = lib.skill && lib.skill.fuWenGaiZao;
        if (!skill || !markPatched(skill, "decision")) return;
        var oldCheck = skill.check;
        skill.check = function (event, player) {
            if (helper.shouldReserveSpecial(event, player)) return false;
            // 横置后手牌上限先+1，再强制摸1；满手时发动并不会爆牌。
            if (helper.signedHandRoom(player) < 0) return false;
            if (typeof oldCheck == "function" && !oldCheck.apply(this, arguments)) return false;
            if (typeof helper.yingLingShouldRebuild == "function") return helper.yingLingShouldRebuild(player);
            var plan = typeof helper.yingLingRunePlan == "function" ? helper.yingLingRunePlan(player, true) : null;
            return !!(plan && plan.card && plan.target && plan.bonus >= 1.5);
        };
        skill.content = function () {
            "step 0"
            player.removeBiShaBaoShi();
            "step 1"
            player.hengZhi();
            "step 2"
            player.draw(1);
            "step 3"
            var list = [0, 1, 2, 3];
            player.chooseControl(list).set("prompt", "选择【战纹】数量").set("ai", function () {
                var currentPlayer = _status.event.player;
                var helper = lib.xingBeiShiZhouNianAi;
                var plan = helper && typeof helper.yingLingRunePlan == "function" ? helper.yingLingRunePlan(currentPlayer, true) : null;
                return plan && typeof plan.war == "number" ? plan.war : currentPlayer.countZhiShiWu("zhanWen");
            });
            "step 4"
            var num = result.control;
            if (player.countZhiShiWu("zhanWen") > num) {
                lib.skill.zhanWenZhangWo.fanZhuanZhanWen(player, player.countZhiShiWu("zhanWen") - num);
            } else if (player.countZhiShiWu("zhanWen") < num) {
                lib.skill.zhanWenZhangWo.fanZhuanMoWen(player, num - player.countZhiShiWu("zhanWen"));
            }
        };
    }

    function patchBuQuYiZhi(helper) {
        var skill = lib.skill && lib.skill.buQuYiZhi;
        if (!skill || !markPatched(skill, "check")) return;
        skill.check = function (event, player) {
            if (helper.handRoom(player) < 1) return false;
            if (helper.shouldReserveSpecial(event, player)) return false;
            if (!helper.hasActionCard(player, "gongJi")) return false;
            var enemies = game.filterPlayer(function (target) { return target.side != player.side; });
            return enemies.length > 0;
        };
    }

    function patchShouHunJingJie() {
        var skill = lib.skill && lib.skill.shouHunJingJie;
        if (!skill || !markPatched(skill, "target")) return;
        skill.content = function () {
            "step 0"
            player.removeZhiShiWu("shouHun");
            "step 1"
            player.hengZhi();
            "step 2"
            player.chooseTarget(true, "目标角色弃1张牌[展示]").set("ai", function (target) {
                var player = _status.event.player;
                if (target.countCards("h") <= 0) return -10;
                if (target.side != player.side) return -10;
                var pressure = target.countCards("h") - target.getHandcardLimit();
                return 5 + pressure * 4 + get.attitude(player, target);
            });
            "step 3"
            if (!result.bool || !result.targets || !result.targets.length) {
                event.finish();
                return;
            }
            event.target = result.targets[0];
            event.target.chooseToDiscard("h", true).set("showCards", true).set("ai", function (card) {
                return 7 - get.value(card);
            });
            "step 4"
            if (result.cards && result.cards.length && get.type(result.cards[0]) == "faShu") {
                player.addZhiShiWu("shouHun");
            }
        };
    }

    function patchNianDan() {
        var skill = lib.skill && lib.skill.nianDan;
        if (!skill || !markPatched(skill, "target")) return;
        skill.content = function () {
            "step 0"
            player.addZhiShiWu("douQi");
            "step 1"
            player.chooseTarget("对目标对手造成1点法术伤害③", true, function (card, player, target) {
                return target.side != player.side;
            }).set("ai", function (target) {
                var player = _status.event.player;
                var score = get.damageEffect2(target, player, 1);
                if (target.zhiLiao == 0) {
                    var selfDamage = player.countZhiShiWu("douQi");
                    score += get.damageEffect2(player, player, selfDamage);
                }
                return score;
            });
            "step 2"
            if (!result.bool || !result.targets || !result.targets.length) {
                event.finish();
                return;
            }
            event.target = result.targets[0];
            if (event.target.zhiLiao == 0) event.flag = true;
            "step 3"
            event.target.faShuDamage(1, player);
            "step 4"
            if (event.flag) player.faShuDamage(player.countZhiShiWu("douQi"), player);
        };
    }

    function patchYueDu() {
        var skill = lib.skill && lib.skill.yueDu;
        if (!skill || !markPatched(skill, "target")) return;
        skill.content = function () {
            "step 0"
            player.changeZhiLiao(-1);
            "step 1"
            player.chooseTarget(1, true, "对目标对手造成1点法术伤害③", function (card, player, target) {
                return target.side != player.side;
            }).set("ai", function (target) {
                var player = _status.event.player;
                return get.damageEffect2(target, player, 1);
            });
            "step 2"
            if (result.bool) result.targets[0].faShuDamage(1, player);
        };
    }

    function patchYueZhiLunHui() {
        var skill = lib.skill && lib.skill.yueZhiLunHui;
        if (!skill || !markPatched(skill, "target")) return;
        skill.content = async function (event, trigger, player) {
            if (event.cost_data == "选项一") {
                var anYue = player.getGaiPai("anYue");
                var links = await player.chooseCardButton(anYue, true, "移除1个【暗月】目标角色+1[治疗]").forResult("links");
                await player.discard(links, "anYue");
                var targets = await player.chooseTarget(1, "月之轮回：选择1名目标角色+1[治疗]", true).set("ai", function (target) {
                    return get.zhiLiaoEffect2(target, player, 1);
                }).forResult("targets");
                if (targets && targets.length) targets[0].changeZhiLiao(1, player);
            } else if (event.cost_data == "选项二") {
                await player.changeZhiLiao(-1);
                await player.addZhiShiWu("xinYue");
            }
        };
    }

    function patchYueZhiNvShenActionChain(helper) {
        function darkMoons(player) {
            return typeof player.getGaiPai == "function" ? player.getGaiPai("anYue") || [] : [];
        }

        function healingLimit(player) {
            return typeof player.getZhiLiaoLimit == "function" ? player.getZhiLiaoLimit() : 0;
        }

        function moonValue(player, card) {
            var value = get.type(card) == "faShu" ? 0.75 : 0.35;
            var suit = get.xiBie(card);
            var matchingAttacks = 0;
            game.countPlayer(function (target) {
                if (target.side == player.side) return;
                matchingAttacks += target.countCards("h", function (attack) {
                    return get.type(attack) == "gongJi" && get.xiBie(attack) == suit;
                });
            });
            value += Math.min(0.6, matchingAttacks * 0.12);
            var sameSuit = darkMoons(player).filter(function (moon) { return get.xiBie(moon) == suit; }).length;
            if (sameSuit <= 1) value += 0.25;
            return value;
        }

        function lowestDiscardCost(player) {
            var cards = player.getCards("h");
            if (!cards.length) return 0;
            cards.sort(function (a, b) { return get.value(a, player) - get.value(b, player); });
            return Math.max(0.12, get.value(cards[0], player) * 0.11);
        }

        function bestDamage(player, amount) {
            return helper.bestEnemy(player, function (target) {
                return helper.damagePressure(target, player, amount);
            });
        }

        function bestHealing(player) {
            var best = { target: null, score: 0 };
            game.countPlayer(function (target) {
                if (target.side != player.side) return;
                var missing = Math.max(0, healingLimit(target) - (target.zhiLiao || 0));
                if (!missing) return;
                var pressure = Math.max(0, target.countCards("h") - target.getHandcardLimit() + 1);
                var score = 0.72 + pressure * 0.45;
                if (target == player) score += 0.08;
                if (score > best.score) best = { target: target, score: score };
            });
            return best;
        }

        function hasDarkMoonExemption(player) {
            return typeof player.hasSkill == "function" && player.hasSkill("nightmare_yueShiSheMian");
        }

        function canSpendDarkMoon(player) {
            return darkMoons(player).length > 0 && (hasDarkMoonExemption(player) || get.shiQi(player.side) > 1);
        }

        function curseCost(player, amount) {
            amount = Math.max(0, amount || 0);
            if (!amount) return 0;
            if (hasDarkMoonExemption(player)) return 0;
            var morale = get.shiQi(player.side);
            if (morale <= 1) return 32;
            var cost = 1.65;
            if (morale <= 4) cost += 0.45;
            return cost;
        }

        function medusaCardScore(player, card) {
            if (!card || !canSpendDarkMoon(player)) return -20;
            var healGain = player.zhiLiao < healingLimit(player) ? 0.72 : 0;
            var stone = player.countZhiShiWu("shiHua");
            var stoneGain = stone < 3 ? 0.72 : 0;
            if (stone == 2) stoneGain += 1.25;
            var score = healGain + stoneGain - moonValue(player, card);
            if (get.type(card) == "faShu") {
                var damage = bestDamage(player, 1);
                score += (damage.target ? damage.score : 0) - lowestDiscardCost(player);
            }
            return score;
        }

        function attackHitChance(target, card, cannotRespond) {
            if (!target || !card) return 0;
            var responses = cannotRespond || get.xiBie(card) == "an" ? 0 : helper.responseCount(target, card);
            var defenses = responses + helper.holyLightCount(target) + helper.shieldCount(target);
            if (defenses <= 0) return 0.93;
            if (defenses == 1) return 0.46;
            if (defenses == 2) return 0.24;
            return 0.12;
        }

        function canAttackTarget(card, player, target) {
            if (!target || target.side == player.side) return false;
            try {
                if (lib.filter && typeof lib.filter.targetEnabled == "function") {
                    return lib.filter.targetEnabled(card, player, target);
                }
            } catch (e) { }
            return true;
        }

        function bestAttack(player, cannotRespond) {
            var cards = player.getCards("h", function (card) { return get.type(card) == "gongJi"; });
            var best = null;
            for (var i = 0; i < cards.length; i++) {
                var card = cards[i];
                game.countPlayer(function (target) {
                    if (!canAttackTarget(card, player, target)) return;
                    var hit = attackHitChance(target, card, cannotRespond);
                    var score = 0.65 + hit * (0.65 + helper.damagePressure(target, player, 2));
                    if (!best || score > best.score) best = { card: card, target: target, hit: hit, score: score };
                });
            }
            return best;
        }

        function darkSlashPlan(player, target, baseDamage) {
            var moons = darkMoons(player);
            if (!target || !moons.length) return { amount: 0, score: -10 };
            var max = Math.min(2, moons.length);
            var before = helper.damagePressure(target, player, baseDamage);
            var best = { amount: 0, score: -10 };
            for (var amount = 1; amount <= max; amount++) {
                var after = helper.damagePressure(target, player, baseDamage + amount);
                var overflowBefore = helper.overflowAfterDamage(target, baseDamage);
                var overflowAfter = helper.overflowAfterDamage(target, baseDamage + amount);
                var score = after - before - curseCost(player, amount) - 0.9;
                if (overflowAfter > overflowBefore) score += (overflowAfter - overflowBefore) * 0.8;
                if (overflowAfter > 0 && overflowAfter >= get.shiQi(!player.side)) score += 12;
                if (score > best.score + 0.05) best = { amount: amount, score: score };
            }
            return best;
        }

        function newMoonDamagePlan(player) {
            var newMoons = player.countZhiShiWu("xinYue");
            var discardCost = lowestDiscardCost(player);
            var stone = player.countZhiShiWu("shiHua");
            var stoneValue = stone < 3 ? 0.72 + (stone == 2 ? 1.25 : 0) : 0;
            var best = null;
            for (var amount = 0; amount <= newMoons; amount++) {
                var damage = bestDamage(player, amount + 1);
                if (!damage.target) continue;
                var score = damage.score + stoneValue - discardCost - amount * 0.48 - 1.45;
                if (!best || score > best.score) {
                    best = { mode: "damage", amount: amount, target: damage.target, score: score };
                }
            }
            return best;
        }

        function paleMoonPlan(player) {
            var damage = newMoonDamagePlan(player);
            var best = damage || { mode: "damage", amount: 0, target: null, score: -10 };
            if (player.countZhiShiWu("shiHua") >= 3) {
                var attack = bestAttack(player, true);
                if (attack) {
                    var actionCards = helper.countUsableCards(player, "gongJi") + helper.countUsableCards(player, "faShu");
                    var extraTurn = 2.35 + Math.min(1.2, actionCards * 0.35);
                    var score = attack.score + extraTurn - 1.45 - 1.15;
                    if (score > best.score) best = { mode: "turn", attack: attack, score: score };
                }
            }
            return best;
        }

        var medusa = lib.skill && lib.skill.meiDuShaZhiYan;
        if (medusa && markPatched(medusa, "fullActionChain")) {
            medusa.cost = async function (event, trigger, player) {
                var result = await player.chooseCardButton(darkMoons(player), "是否发动【美杜莎之眼】<br>" + lib.translate.meiDuShaZhiYan_info)
                    .set("filterButton", function (button) {
                        return get.xiBie(button.link) == _status.event.xiBie;
                    })
                    .set("xiBie", get.xiBie(trigger.card))
                    .set("ai", function (button) {
                        var player = _status.event.player;
                        var score = medusaCardScore(player, button.link);
                        return score >= 0.25 ? 10 + score : -20;
                    }).forResult();
                event.result = {
                    bool: !!(result.bool && result.links && result.links.length && medusaCardScore(player, result.links[0]) >= 0.25),
                    cost_data: result.links || []
                };
            };
            medusa.content = async function (event, trigger, player) {
                var card = event.cost_data && event.cost_data[0];
                if (!card) return;
                await player.discard(card, "anYue").set("showHiddenCards", true);
                await player.changeZhiLiao(1);
                await player.addZhiShiWu("shiHua");
                if (get.type(card) != "faShu") return;
                if (player.countCards("h") > 0) {
                    await player.chooseToDiscard("h", true).set("ai", function (discard) {
                        return 8 - get.value(discard, _status.event.player);
                    });
                }
                var targets = await player.chooseTarget(1, "美杜莎之眼：对目标对手造成1点法术伤害③", true, function (card, player, target) {
                    return target.side != player.side;
                }).set("ai", function (target) {
                    return lib.xingBeiShiZhouNianAi.damagePressure(target, _status.event.player, 1);
                }).forResult("targets");
                if (targets && targets.length) await targets[0].faShuDamage(1, player);
            };
        }

        var cycle = lib.skill && lib.skill.yueZhiLunHui;
        if (cycle && markPatched(cycle, "fullActionChain")) {
            cycle.cost = async function (event, trigger, player) {
                var choices = [];
                var choiceList = ["<span class='tiaoJian'>(移除1个【暗月】)</span>目标角色+1[治疗]", "<span class='tiaoJian'>(移除你的1[治疗])</span>你+1<span class='hong'>【新月】</span>"];
                var heal = bestHealing(player);
                var moons = darkMoons(player);
                var moonCost = moons.length ? Math.min.apply(null, moons.map(function (card) { return moonValue(player, card); })) : 20;
                var healScore = canSpendDarkMoon(player) && heal.target ? heal.score - moonCost : -20;
                var newMoonRoom = Math.max(0, 2 - player.countZhiShiWu("xinYue"));
                var reserve = get.shiQi(player.side) <= 4 ? 2 : 1;
                var newMoonScore = newMoonRoom && player.zhiLiao > 0 ? 0.82 + (newMoonRoom == 2 ? 0.2 : 0) - (player.zhiLiao <= reserve ? 0.75 : 0.35) : -20;
                if (darkMoons(player).length) choices.push("选项一");
                if (player.zhiLiao > 0) choices.push("选项二");
                choices.push("cancel2");
                var preferred = "cancel2";
                if (healScore >= 0.25) preferred = "选项一";
                else if (newMoonScore >= 0.35) preferred = "选项二";
                var result = await player.chooseControl(choices).set("prompt", "月之轮回：选择以下一项发动")
                    .set("choiceList", choiceList).set("preferred", preferred)
                    .set("ai", function () { return _status.event.preferred; }).forResult();
                event.result = { bool: result.control != "cancel2", cost_data: result.control };
            };
            cycle.content = async function (event, trigger, player) {
                if (event.cost_data == "选项一") {
                    var links = await player.chooseCardButton(darkMoons(player), true, "移除1个【暗月】，令目标角色+1[治疗]")
                        .set("ai", function (button) {
                            return 8 - moonValue(_status.event.player, button.link);
                        }).forResult("links");
                    if (!links || !links.length) return;
                    await player.discard(links, "anYue");
                    var targets = await player.chooseTarget(1, "月之轮回：选择1名目标角色+1[治疗]", true)
                        .set("ai", function (target) {
                            if (target.side != _status.event.player.side) return -10;
                            return get.zhiLiaoEffect2(target, _status.event.player, 1);
                        }).forResult("targets");
                    if (targets && targets.length) await targets[0].changeZhiLiao(1, player);
                } else if (event.cost_data == "选项二") {
                    await player.changeZhiLiao(-1);
                    await player.addZhiShiWu("xinYue");
                }
            };
        }

        var profanation = lib.skill && lib.skill.yueDu;
        if (profanation && markPatched(profanation, "fullActionChain")) {
            profanation.check = function (event, player) {
                var damage = bestDamage(player, 1);
                if (!damage.target) return false;
                var treatmentCost = player.zhiLiao >= healingLimit(player) ? 0.28 : player.countZhiShiWu("xinYue") < 2 ? 0.72 : 0.52;
                return damage.score - treatmentCost >= 0.35 || get.shiQi(!player.side) <= helper.overflowAfterDamage(damage.target, 1);
            };
            profanation.content = async function (event, trigger, player) {
                await player.changeZhiLiao(-1);
                var targets = await player.chooseTarget(1, true, "对目标对手造成1点法术伤害③", function (card, player, target) {
                    return target.side != player.side;
                }).set("ai", function (target) {
                    return lib.xingBeiShiZhouNianAi.damagePressure(target, _status.event.player, 1);
                }).forResult("targets");
                if (targets && targets.length) await targets[0].faShuDamage(1, player);
            };
        }

        var slash = lib.skill && lib.skill.anYueZhan;
        if (slash && markPatched(slash, "fullActionChain")) {
            slash.cost = async function (event, trigger, player) {
                var plan = darkSlashPlan(player, trigger.target, trigger.damageNum || 2);
                var result = await player.chooseCardButton(darkMoons(player), "是否发动【暗月斩】<br>" + lib.translate.anYueZhan_info, [1, 2])
                    .set("desired", plan.score >= 0.45 ? plan.amount : 0)
                    .set("ai", function (button) {
                        var desired = _status.event.desired;
                        if (!desired || ui.selected.buttons.length >= desired) return -20;
                        return 9 - moonValue(_status.event.player, button.link);
                    }).forResult();
                var selected = result.links || [];
                event.result = {
                    bool: !!(result.bool && selected.length && selected.length == plan.amount && plan.score >= 0.45),
                    cost_data: selected
                };
            };
            if (!slash.ai) slash.ai = {};
            if (!slash.ai.effect) slash.ai.effect = {};
            slash.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side) return;
                if (!player.isHengZhi() || !player.canBiShaShuiJing() || !darkMoons(player).length) return;
                var plan = darkSlashPlan(player, target, 2);
                if (plan.score >= 0.45) return [1, 0, 1, -plan.score * attackHitChance(target, card, false)];
            };
        }

        var pale = lib.skill && lib.skill.cangBaiZhiYue;
        if (pale && markPatched(pale, "fullActionChain")) {
            pale.content = async function (event, trigger, player) {
                var plan = paleMoonPlan(player);
                await player.removeBiShaBaoShi();
                var choiceList = ["<span class='tiaoJian'>(移除3个【石化】)</span>你的下次主动攻击对手无法应战，额外+1[攻击行动]。你额外获得一个回合", "移除X点【新月】，你+1【石化】，弃1张牌，对目标对手造成(X+1)点法术伤害③"];
                var choices = ["选项二"];
                if (player.countZhiShiWu("shiHua") >= 3) choices.unshift("选项一");
                var preferred = plan.mode == "turn" ? "选项一" : "选项二";
                var control = await player.chooseControl(choices).set("prompt", "苍白之月：选择以下一项发动")
                    .set("choiceList", choiceList).set("preferred", preferred)
                    .set("ai", function () { return _status.event.preferred; }).forResult("control");
                if (control == "选项一") {
                    await player.removeZhiShiWu("shiHua", 3);
                    await player.addSkill("cangBaiZhiYue_wuFaYingZhan");
                    await player.addGongJi();
                    player.insertPhase();
                    return;
                }
                var list = [];
                var newMoons = player.countZhiShiWu("xinYue");
                for (var i = 0; i <= newMoons; i++) list.push(i);
                var amount = await player.chooseControl(list).set("prompt", "移除X点【新月】，你+1【石化】，弃1张牌，对目标对手造成(X+1)点法术伤害③")
                    .set("preferred", plan.mode == "damage" ? plan.amount : 0)
                    .set("ai", function () { return _status.event.preferred; }).forResult("control");
                if (amount > 0) await player.removeMark("xinYue", amount);
                await player.addZhiShiWu("shiHua");
                if (player.countCards("h") > 0) {
                    await player.chooseToDiscard(1, "h", true).set("ai", function (card) {
                        return 8 - get.value(card, _status.event.player);
                    });
                }
                var targets = await player.chooseTarget(1, "对目标对手造成" + (amount + 1) + "点法术伤害③", true, function (card, player, target) {
                    return target.side != player.side;
                }).set("damage", amount + 1).set("ai", function (target) {
                    return lib.xingBeiShiZhouNianAi.damagePressure(target, _status.event.player, _status.event.damage);
                }).forResult("targets");
                if (targets && targets.length) await targets[0].faShuDamage(amount + 1, player);
            };
            if (!pale.ai) pale.ai = {};
            pale.ai.order = function (item, player) {
                var plan = paleMoonPlan(player);
                return plan.score >= 0.75 ? (plan.mode == "turn" ? 6.3 : 4.7) : 0;
            };
            pale.ai.result = {
                player: function (player) {
                    var plan = paleMoonPlan(player);
                    return plan.score >= 0.75 ? plan.score : -10;
                }
            };
        }
    }

    function patchLingHunLianJie() {
        var skill = lib.skill && lib.skill.lingHunLianJie;
        if (!skill || !markPatched(skill, "target")) return;
        skill.content = async function (event, trigger, player) {
            await player.removeZhiShiWu("huangSeLingHun");
            await player.removeZhiShiWu("lanSeLingHun");
            var targets = await player.chooseTarget("将【灵魂链接】放置于一名队友面前", true, function (card, player, target) {
                return target != player && target.side == player.side;
            }).set("ai", function (target) {
                var room = target.getHandcardLimit() - target.countCards("h");
                return get.attitude(player, target) + (target.zhiLiao || 0) * 0.8 + Math.max(0, room) * 0.35;
            }).forResultTargets();
            if (!targets || !targets.length) return;
            var target = targets[0];
            player.storage.lingHunLianJieTarget = target;
            await target.addZhiShiWu("lingHunLianJie", true);
        };
    }

    function patchLingHunShuShi(helper) {
        var mirror = lib.skill && lib.skill.lingHunJingXiang;
        if (mirror && markPatched(mirror, "friendlyDraw")) {
            if (!mirror.ai) mirror.ai = {};
            mirror.ai.order = function (item, player) {
                return player.countCards("h") >= player.getHandcardLimit() ? 5.2 : 2.8;
            };
            if (!mirror.ai.result) mirror.ai.result = {};
            mirror.ai.result.player = function (player) {
                return player.countCards("h") >= 2 ? 1.2 : -5;
            };
            mirror.ai.result.target = function (player, target) {
                if (target.side != player.side) return 100;
                var room = helper.handRoom(target);
                return room >= 2 ? 2.5 : room == 1 ? 0.8 : 0;
            };
        }

        var gift = lib.skill && lib.skill.lingHunFuYu;
        if (gift && markPatched(gift, "friendlyEnergy")) {
            if (!gift.ai) gift.ai = {};
            if (!gift.ai.result) gift.ai.result = {};
            gift.ai.result.target = function (player, target) {
                if (target.side != player.side) return 100;
                var room = Math.max(0, target.getHandcardLimit() - target.countNengLiangAll());
                return room >= 2 ? 3 : room == 1 ? 1 : 0;
            };
        }

        var blast = lib.skill && lib.skill.lingHunZhenBao;
        if (blast && markPatched(blast, "enemyTarget")) {
            if (!blast.ai) blast.ai = {};
            if (!blast.ai.result) blast.ai.result = {};
            blast.ai.result.target = function (player, target) {
                var damage = target.countCards("h") < 3 && target.getHandcardLimit() > 5 ? 5 : 3;
                return target.side == player.side ? -damage : -1 - helper.overflowAfterDamage(target, damage) * 2;
            };
        }

        var summon = lib.skill && lib.skill.lingHunZhaoHuan;
        if (summon && markPatched(summon, "resourceCap")) {
            summon.check = function (card) {
                var player = _status.event.player;
                var selected = ui.selected.cards.length;
                var current = player.countZhiShiWu("lanSeLingHun");
                if (current + selected >= 6) return 0;
                return 7 - get.value(card);
            };
        }
    }

    function patchLingFuShi(helper) {
        var wind = lib.skill && lib.skill.lingFu_fengXing;
        if (!wind || !markPatched(wind, "friendlyDiscard")) return;
        if (!wind.ai) wind.ai = {};
        if (!wind.ai.result) wind.ai.result = {};
        wind.ai.result.target = function (player, target) {
            if (target.side != player.side) return 100;
            if (target.countCards("h") <= 0) return 0;
            var pressure = Math.max(0, target.countCards("h") - target.getHandcardLimit());
            return 1.2 + pressure * 1.5;
        };
        wind.ai.result.player = function (player) {
            var allies = game.filterPlayer(function (target) {
                return target.side == player.side && target.countCards("h") > 0;
            });
            if (allies.length < 2) return -3;
            var pressure = 0;
            for (var i = 0; i < allies.length; i++) {
                pressure += Math.max(0, allies[i].countCards("h") - allies[i].getHandcardLimit());
            }
            return pressure > 0 ? 1.8 + pressure : 0.4;
        };
    }

    function patchJianDi(helper) {
        var slash = lib.skill && lib.skill.jianQiZhan;
        if (!slash || !markPatched(slash, "minimalResource")) return;
        slash.cost = async function (event, trigger, player) {
            var max = Math.min(3, player.countZhiShiWu("jianQi"));
            var list = [];
            for (var i = 1; i <= max; i++) list.push(i);
            list.push("cancel2");

            var bestAmount = "cancel2";
            var bestValue = 0;
            for (var amount = 1; amount <= max; amount++) {
                var plan = helper.bestEnemy(player, function (target) {
                    var value = helper.damageScore(target, player, amount);
                    value += helper.overflowAfterDamage(target, amount) * 2.2;
                    return value;
                }, function (target) {
                    return target != trigger.target;
                });
                var value = plan.score - amount * 0.35;
                if (value > bestValue) {
                    bestValue = value;
                    bestAmount = amount;
                }
            }

            var result = await player.chooseControl(list)
                .set("prompt", get.prompt("jianQiZhan"))
                .set("prompt2", lib.translate.jianQiZhan_info)
                .set("choice", bestAmount)
                .set("ai", function () {
                    return _status.event.choice;
                }).forResultControl();
            event.result = {
                bool: result != "cancel2",
                cost_data: result,
            };
        };
    }

    function patchCangYanMoNv(helper) {
        var reverse = lib.skill && lib.skill.moNengFanZhuan;
        if (!reverse || !markPatched(reverse, "costAndTarget")) return;
        reverse.cost = async function (event, trigger, player) {
            event.result = await player.chooseCardTarget({
                selectCard: [2, Infinity],
                filterCard: function (card) {
                    return get.type(card) == "faShu";
                },
                filterTarget: function (card, player, target) {
                    return target.side != player.side;
                },
                prompt: get.prompt("moNengFanZhuan"),
                prompt2: lib.translate.moNengFanZhuan_info,
                ai1: function (card) {
                    var player = _status.event.player;
                    var selected = ui.selected.cards.length;
                    var score = 8 - get.value(card, player);
                    if (selected < 2) return score;

                    var currentDamage = selected - 1;
                    var nextDamage = selected;
                    var improves = game.hasPlayer(function (target) {
                        if (target.side == player.side) return false;
                        return helper.overflowAfterDamage(target, nextDamage) > helper.overflowAfterDamage(target, currentDamage);
                    });
                    if (!improves && player.countCards("h") <= player.getHandcardLimit()) return -get.value(card, player);
                    return score - selected * 0.8;
                },
                ai2: function (target) {
                    var player = _status.event.player;
                    var amount = Math.max(1, ui.selected.cards.length - 1);
                    return helper.damageScore(target, player, amount) + helper.overflowAfterDamage(target, amount) * 2.5;
                },
            }).forResult();
        };
    }

    function patchYinYouShiRen(helper) {
        var chord = lib.skill && lib.skill.buXieHeXian;
        if (!chord || !chord.chooseButton || !markPatched(chord, "coordinatedChoice")) return;
        chord.chooseButton.check = function (button) {
            var player = _status.event.player;
            var selected = ui.selected.buttons || [];
            var selectedAmount = null;
            var selectedAction = null;
            for (var i = 0; i < selected.length; i++) {
                if (typeof selected[i].link == "number") selectedAmount = selected[i].link;
                if (typeof selected[i].link == "string") selectedAction = selected[i].link;
            }

            if (typeof button.link == "number") {
                var action = selectedAction;
                var amount = button.link - 1;
                if (!action) return button.link == 2 ? 1.5 : 0.2;
                if (action == "摸") return helper.handRoom(player) >= amount ? 4 - amount * 0.3 : -6;
                var pressure = player.countCards("h") - player.getHandcardLimit();
                return pressure >= amount ? 4 + amount : amount == 1 ? 1 : -2;
            }

            if (typeof button.link == "string") {
                var amount = selectedAmount ? selectedAmount - 1 : 1;
                if (button.link == "摸") return helper.handRoom(player) >= amount ? 3 : -6;
                return player.countCards("h") >= player.getHandcardLimit() ? 3.5 : 0.8;
            }
            return 0;
        };

        var oldBackup = chord.chooseButton.backup;
        chord.chooseButton.backup = function (links, player) {
            var next = oldBackup.call(this, links, player);
            var amount = 1;
            var action = "摸";
            for (var i = 0; i < links.length; i++) {
                if (typeof links[i] == "number") amount = links[i] - 1;
                if (typeof links[i] == "string") action = links[i];
            }
            next.ai = next.ai || {};
            next.ai.result = next.ai.result || {};
            next.ai.result.player = function (current) {
                if (action == "摸") return helper.wouldOverflow(current, amount, 0) ? -8 : 1.2;
                return current.countCards("h") >= amount ? 0.8 : -3;
            };
            next.ai.result.target = function (current, target) {
                if (action == "摸") {
                    if (target.side != current.side) return 100;
                    return helper.wouldOverflow(target, amount, 0) ? 0 : 1.5;
                }
                if (target.side != current.side) return 100;
                if (target.countCards("h") < amount) return 0;
                var pressure = target.countCards("h") - target.getHandcardLimit();
                return 1 + Math.max(0, pressure) * 2;
            };
            return next;
        };
    }

    function patchXueSeJianLing(helper) {
        var rose = lib.skill && lib.skill.xueRanQiangWei;
        if (rose && rose.ai && rose.ai.result && markPatched(rose, "enemyTarget")) {
            rose.ai.result.target = function (player, target) {
                var removed = Math.min(2, target.zhiLiao || 0);
                var value = 1 + removed * 1.4 + helper.overflowAfterDamage(target, player.hasMark("xueQiangWeiTingYuan") ? 1 : 0) * 2;
                return -value;
            };
        }

        var garden = lib.skill && lib.skill.sanHuaLunWu;
        if (garden && markPatched(garden, "resourceChoice")) {
            garden.content = async function (event, trigger, player) {
                var choiceList = [
                    "【水晶】将【血蔷薇庭院】放置于场上，你+2【鲜血】",
                    "【宝石】将【血蔷薇庭院】放置于场上，无视上限+2【鲜血】（最高为4），你弃到4张牌",
                ];
                var choices = ["选项一"];
                if (player.canBiShaBaoShi()) choices.push("选项二");
                var control = await player.chooseControl(choices).set("choiceList", choiceList).set("ai", function () {
                    var player = _status.event.player;
                    var blood = player.countZhiShiWu("xianXue");
                    if (!player.canBiShaBaoShi()) return "选项一";
                    if (helper.shouldReserveSpecial(_status.event, player)) return "选项一";
                    if (blood >= 2 || player.countCards("h") > 4) return "选项二";
                    return "选项一";
                }).forResultControl();
                if (control == "选项一") {
                    await player.removeBiShaShuiJing();
                    await player.addZhiShiWu("xueQiangWeiTingYuan");
                    await player.addZhiShiWu("xianXue", 2);
                } else {
                    await player.removeBiShaBaoShi();
                    await player.addZhiShiWu("xueQiangWeiTingYuan");
                    await player.addZhiShiWu("xianXue", 2, 4);
                    var discard = Math.max(0, player.countCards("h") - 4);
                    if (discard) await player.chooseToDiscard("h", true, discard);
                }
            };
        }
    }

    function patchSupportTargeting(helper) {
        var blessing = lib.skill && lib.skill.tianShiZhuFu;
        if (blessing && blessing.ai && blessing.ai.result && markPatched(blessing, "targetValue")) {
            blessing.ai.result.target = function (player, target) {
                if (target.side != player.side) return 100;
                if (target == player) return 0;
                if (target.countCards("h") <= 0) return 0;
                var pressure = Math.max(0, target.countCards("h") - target.getHandcardLimit());
                return 1 + pressure * 1.8;
            };
            blessing.ai.result.player = function (player) {
                return helper.handRoom(player) >= 2 ? 1.5 : helper.handRoom(player) == 1 ? 0.5 : -3;
            };
        }

        var heal = lib.skill && lib.skill.shengLiao;
        if (heal && heal.ai && heal.ai.result && markPatched(heal, "friendlyHealing")) {
            heal.ai.result.target = function (player, target) {
                if (target.side != player.side) return 100;
                return get.zhiLiaoEffect(target, Math.min(3, target.getZhiLiaoLimit() - target.zhiLiao));
            };
        }

        var force = lib.skill && lib.skill.weiLiCiFu;
        if (force && force.ai && force.ai.result && markPatched(force, "combatAlly")) {
            force.ai.result.target = function (player, target) {
                if (target.side != player.side || target == player) return 0;
                return target.canGongJi && target.canGongJi() ? 3 : 0.7;
            };
        }

        var speed = lib.skill && lib.skill.xunJieCiFu;
        if (speed && speed.ai && speed.ai.result && markPatched(speed, "actionAlly")) {
            speed.ai.result.target = function (player, target) {
                if (target.side != player.side || target == player) return 0;
                return target.canGongJi && target.canGongJi() ? 3.2 : target.canFaShu && target.canFaShu() ? 2.4 : 0.6;
            };
        }

        var radiance = lib.skill && lib.skill.huiYao;
        if (radiance && radiance.ai && radiance.ai.result && markPatched(radiance, "healingSides")) {
            radiance.ai.result.target = function (player, target) {
                return get.zhiLiaoEffect(target, 1);
            };
        }

        var punish = lib.skill && lib.skill.chengJie;
        if (punish && punish.ai && punish.ai.result && markPatched(punish, "treatmentTarget")) {
            punish.ai.result.target = function (player, target) {
                return target.zhiLiao > 0 ? -2 - target.zhiLiao * 0.5 : 0;
            };
        }

        var snipe = lib.skill && lib.skill.juJi;
        if (snipe && snipe.ai && snipe.ai.result && markPatched(snipe, "overflowTarget")) {
            snipe.ai.result.target = function (player, target) {
                if (!player.canGongJi()) return 0;
                var draw = Math.max(0, 5 - target.countCards("h"));
                if (!draw) return 0;
                var overflow = Math.max(0, 5 - target.getHandcardLimit());
                return overflow > 0 ? -1 - overflow * 3 : 1 + draw * 0.2;
            };
        }
    }

    function patchXiWangFuGeQu(helper) {
        var skill = lib.skill && lib.skill.xiWangFuGeQu;
        if (!skill || !markPatched(skill, "targetAndChoice")) return;
        skill.content = async function (event, trigger, player) {
            await player.removeBiShaShuiJing();
            if (!helper.wouldOverflow(player, 1, 0)) await player.chooseDraw(1, true);
            var holders = game.filterPlayer(function (current) {
                return current.side == player.side && current.hasZhiShiWu("yongHengYueZhang");
            });
            var targets;
            if (holders.length > 0) {
                targets = await player.chooseTarget("将【永恒乐章】转移给我方另一名目标角色", true, function (card, player, target) {
                    return target.side == player.side && _status.event.targetx != target;
                }).set("targetx", holders[0]).set("ai", function (target) {
                    var room = target.getHandcardLimit() - target.countCards("h");
                    return get.attitude(player, target) + Math.max(0, room) * 0.4 + (target.zhiLiao || 0) * 0.25;
                }).forResultTargets();
            } else {
                targets = await player.chooseTarget("将【永恒乐章】放置于目标队友面前", true, function (card, player, target) {
                    return target.side == player.side && target != player;
                }).set("ai", function (target) {
                    var room = target.getHandcardLimit() - target.countCards("h");
                    return get.attitude(player, target) + Math.max(0, room) * 0.4 + (target.zhiLiao || 0) * 0.25;
                }).forResultTargets();
            }
            if (!targets || !targets.length) return;
            if (holders.length > 0) await holders[0].removeZhiShiWu("yongHengYueZhang");
            var target = targets[0];
            if (!target.hasSkill("yongHengYueZhang")) await target.addSkill("yongHengYueZhang");
            await target.addZhiShiWu("yongHengYueZhang");
            player.storage.yongHengYueZhang_target = target;
            target.storage.yongHengYueZhang_player = player;
            if (holders.length > 0) {
                if (player.countCards("h") > 0) {
                    await player.chooseToDiscard(1, true).set("ai", function (card) { return 7 - get.value(card); });
                }
                var control = await player.chooseControl(["zhiLiao", "lingGan"]).set("prompt", "选择+1[治疗]或<span class='hong'>【灵感】</span>").set("ai", function () {
                    var player = _status.event.player;
                    if (player.countZhiShiWu("lingGan") >= 3) return "zhiLiao";
                    if (player.zhiLiao >= player.getZhiLiaoLimit()) return "lingGan";
                    if (player.zhiLiao == 0 && get.shiQi(player.side) <= 6) return "zhiLiao";
                    return "lingGan";
                }).forResultControl();
                if (control == "zhiLiao") await player.changeZhiLiao();
                else await player.addZhiShiWu("lingGan");
            }
        };
    }

    function patchShengHuangJiangLinReset() {
        var parent = lib.skill && lib.skill.shengHuangJiangLin;
        var skill = parent && parent.subSkill && parent.subSkill.chongZhi;
        if (!skill || !markPatched(skill, "choice")) return;
        skill.content = function () {
            "step 0"
            player.chongZhi();
            "step 1"
            player.chooseControl(["治疗", "信仰"]).set("prompt", "+1点[治疗]或<span class='hong'>【信仰】</span>").set("ai", function () {
                var player = _status.event.player;
                if (player.zhiLiao >= player.getZhiLiaoLimit()) return "信仰";
                if (player.countZhiShiWu("xinYang") >= 10) return "治疗";
                if (player.zhiLiao == 0 && get.shiQi(player.side) <= 7) return "治疗";
                return "信仰";
            });
            "step 2"
            if (result.control == "治疗") player.changeZhiLiao(1);
            else player.addZhiShiWu("xinYang", 1);
        };
    }

    function patchShouFanAndNiFan() {
        var shouFan = lib.skill && lib.skill.shouFan;
        if (shouFan && markPatched(shouFan, "cost")) {
            shouFan.cost = async function (event, trigger, player) {
                var list = [];
                var num = player.countZhiShiWu("shouHun");
                for (var i = 1; i <= num; i++) list.push(i);
                list.push("cancel2");
                var control = await player.chooseControl(list).set("prompt", get.prompt("shouFan")).set("prompt2", lib.translate.shouFan_info).set("source", trigger.source).set("ai", function () {
                    var player = _status.event.player;
                    var source = _status.event.source;
                    if (!source || get.attitude(player, source) >= 0) return "cancel2";
                    if (player.countCards("h") <= 0 || source.countCards("h") <= 0) return "cancel2";
                    var cards = player.getCards("h").slice();
                    cards.sort(function (a, b) { return get.value(a) - get.value(b); });
                    if (!cards.length || get.value(cards[0]) > 6.5) return "cancel2";
                    return 1;
                }).forResultControl();
                event.result = { bool: control != "cancel2", cost_data: control };
            };
        }

        var niFan = lib.skill && lib.skill.niFanJuHeZhan;
        if (niFan && markPatched(niFan, "cost")) {
            niFan.cost = async function (event, trigger, player) {
                var list = [];
                var souls = player.countZhiShiWu("shouHun");
                for (var i = 0; i <= souls; i++) list.push(i);
                list.push("cancel2");
                var control = await player.chooseControl(list).set("prompt", get.prompt("niFanJuHeZhan")).set("prompt2", lib.translate.niFanJuHeZhan_info).set("target", trigger.target).set("attackCard", trigger.card).set("souls", souls).set("ai", function () {
                    var player = _status.event.player;
                    var target = _status.event.target;
                    if (!target || get.attitude(player, target) >= 0) return "cancel2";
                    var need = Math.max(0, target.countCards("h") - 1);
                    if (need > _status.event.souls) return 0;
                    var attack = _status.event.attackCard;
                    if (need > 0 && attack && get.xiBie(attack) != "an") {
                        var suit = get.xiBie(attack);
                        var responses = target.countCards("h", function (card) {
                            return get.type(card) == "gongJi" && (get.xiBie(card) == suit || get.xiBie(card) == "an");
                        });
                        if (responses >= 2) return "cancel2";
                    }
                    return need;
                }).forResultControl();
                event.result = { bool: control != "cancel2", cost_data: control };
            };
        }
    }

    function patchXueZhiBeiMing() {
        var skill = lib.skill && lib.skill.xueZhiBeiMing;
        if (!skill || !markPatched(skill, "damageChoice")) return;
        skill.contentBefore = function () {
            "step 0"
            var list = [0, 1, 2];
            player.chooseControl(list).set("prompt", "对目标角色和自己各造成(X+1)点法术伤害③").set("target", target).set("ai", function () {
                var player = _status.event.player;
                var target = _status.event.target;
                var best = 0;
                var bestScore = -Infinity;
                for (var i = 0; i <= 2; i++) {
                    var damage = i + 1;
                    var score = get.damageEffect2(target, player, damage) + get.damageEffect2(player, player, damage);
                    if (target.side != player.side && get.shiQi(target.side) <= damage) score += 6;
                    if (score > bestScore) {
                        bestScore = score;
                        best = i;
                    }
                }
                return best;
            });
            "step 1"
            player.storage.xueZhiBeiMin = result.control + 1;
        };
    }

    function patchShengHuangHuiGuangPao() {
        var skill = lib.skill && lib.skill.shengHuangHuiGuangPao;
        if (!skill || !markPatched(skill, "moraleChoice")) return;
        skill.contentAfter = function () {
            "step 0"
            player.changeXingBei(1);
            "step 1"
            var choiceList = ["红方士气设置为蓝方士气", "蓝方士气设置为红方士气"];
            player.chooseControl().set("choiceList", choiceList).set("ai", function () {
                if (game.hongShiQi < game.lanShiQi) return "选项一";
                if (game.lanShiQi < game.hongShiQi) return "选项二";
                return "选项一";
            });
            "step 2"
            if (result.control == "选项一") {
                game.changeShiQi(game.lanShiQi - game.hongShiQi, true);
            } else {
                game.changeShiQi(game.hongShiQi - game.lanShiQi, false);
            }
        };
    }

    function patchZiDongTianChong(helper) {
        var skill = lib.skill && lib.skill.ziDongTianChong;
        if (!skill || !markPatched(skill, "choice")) return;
        skill.content = async function (event, trigger, player) {
            var choiceList = ["[水晶]你+1<span class='hong'>【信仰】</span>或+1[治疗]", "[宝石]你+1[水晶]，+2<span class='hong'>【信仰】</span>或+2[治疗]"];
            var paymentList = ["选项一"];
            if (player.canBiShaBaoShi()) paymentList.push("选项二");
            var control = await player.chooseControl(paymentList).set("choiceList", choiceList).set("ai", function () {
                var player = _status.event.player;
                if (!player.canBiShaBaoShi()) return "选项一";
                if (helper.shouldReserveSpecial(_status.event, player)) return "选项一";
                var faith = player.countZhiShiWu("xinYang");
                var healRoom = player.getZhiLiaoLimit() - player.zhiLiao;
                if (faith <= 6 || healRoom >= 2) return "选项二";
                return "选项一";
            }).forResultControl();
            var num;
            if (control == "选项一") {
                await player.removeBiShaShuiJing();
                num = 1;
            } else {
                await player.removeBiShaBaoShi();
                await player.addNengLiang("shuiJing", 1);
                num = 2;
            }
            control = await player.chooseControl(["信仰", "治疗"]).set("prompt", "+" + num + "点<span class='hong'>【信仰】</span>或[治疗]").set("num", num).set("ai", function () {
                var player = _status.event.player;
                var num = _status.event.num;
                var faith = player.countZhiShiWu("xinYang");
                var healRoom = player.getZhiLiaoLimit() - player.zhiLiao;
                if (faith >= 10) return "治疗";
                if (healRoom <= 0) return "信仰";
                if (player.zhiLiao == 0 && get.shiQi(player.side) <= 7) return "治疗";
                if (faith + num <= 8) return "信仰";
                return "治疗";
            }).forResultControl();
            if (control == "治疗") await player.changeZhiLiao(num);
            else await player.addZhiShiWu("xinYang", num);
        };
    }

    function patchOptionalSoulSkills(helper) {
        var angel = lib.skill && lib.skill.tianShiZhiHun;
        if (angel && markPatched(angel, "check")) {
            angel.check = function (event, player) {
                var target = event.target || (event.targets && event.targets[0]);
                var hit = helper.likelyHit(player, target, event.card);
                var healRoom = Math.max(0, player.getZhiLiaoLimit() - (player.zhiLiao || 0));
                return hit < 0.55 || healRoom >= 1 || get.shiQi(player.side) <= 5;
            };
        }
        var demon = lib.skill && lib.skill.eMoZhiHun;
        if (demon && markPatched(demon, "check")) {
            demon.check = function (event, player) {
                var target = event.target || (event.targets && event.targets[0]);
                if (!target || helper.sameSide(player, target)) return false;
                return helper.likelyHit(player, target, event.card) >= 0.35 || get.shiQi(!player.side) <= 3;
            };
        }
    }

    function patchExclusiveCards() {
        var elementExclusiveSkills = ["yunShi", "bingDong", "huoQou", "fengRen", "leiJi"];
        var exclusiveSkills = [
            "lieFengJi", "jiFengJi",
            "xueYingKuangDao", "xueXingPaoXiao",
            "zhiLiaoShu", "zhiYuZhiGuang",
            "diZhiFengYin", "shuiZhiFengYin", "huoZhiFengYin", "fengZhiFengYin", "leiZhiFengYin",
            "tianShiZhiQiang",
            "shanGuangXianJing", "jingZhunSheJi",
            "yunShi", "bingDong", "huoQou", "fengRen", "leiJi",
            "weiLiCiFu", "xunJieCiFu",
            "lingHunZhenBao", "lingHunFuYu",
            "xueZhiBeiMing"
        ];

        function isExclusiveCard(player, card) {
            if (!card || typeof card.hasDuYou != "function") return false;
            return exclusiveSkills.some(function (name) {
                return player.hasSkill(name) && card.hasDuYou(name);
            });
        }

        function isResponseChoice() {
            var current = _status.event;
            for (var depth = 0; current && depth < 8; depth++) {
                if (current.name == "yingZhan" || current.yingZhan === true) return true;
                current = typeof current.getParent == "function" ? current.getParent() : current.parent;
            }
            return false;
        }

        function isExclusiveSkillSelection(skillName) {
            var current = _status.event;
            for (var depth = 0; current && depth < 8; depth++) {
                if (current.skill == skillName || current.sourceSkill == skillName || current.name == skillName) return true;
                if (current._backup && (current._backup.skill == skillName || current._backup.sourceSkill == skillName)) return true;
                current = typeof current.getParent == "function" ? current.getParent() : current.parent;
            }
            return false;
        }

        function hasOrdinaryResponse(player, card) {
            if (!isResponseChoice()) return false;
            var event = _status.event;
            if (typeof event.filterCard != "function") return false;
            var cards = player.getCards("hs");
            for (var i = 0; i < cards.length; i++) {
                var current = cards[i];
                if (current == card || isExclusiveCard(player, current)) continue;
                try {
                    if (event.filterCard(current, player, event)) return true;
                } catch (e) { }
            }
            return false;
        }

        for (var i = 0; i < exclusiveSkills.length; i++) {
            (function (skillName) {
                var skill = lib.skill && lib.skill[skillName];
                if (!skill || !markPatched(skill, "exclusiveCardValue")) return;
                if (!skill.mod) skill.mod = {};
                var oldUseful = skill.mod.aiUseful;
                var oldValue = skill.mod.aiValue;
                var oldOrder = skill.mod.aiOrder;

                skill.mod.aiUseful = function (player, card, num) {
                    if (elementExclusiveSkills.indexOf(skillName) >= 0 && card && typeof card.hasDuYou == "function" && card.hasDuYou(skillName) && player.hasSkill(skillName)) {
                        if (typeof player.canFaShu == "function" && player.canFaShu()) return 10;
                        return 8;
                    }
                    if (typeof oldUseful == "function") return oldUseful.apply(this, arguments);
                };

                skill.mod.aiValue = function (player, card, num) {
                    if (elementExclusiveSkills.indexOf(skillName) >= 0 && card && typeof card.hasDuYou == "function" && card.hasDuYou(skillName) && player.hasSkill(skillName)) {
                        var value = 8;
                        if (typeof player.canFaShu == "function" && player.canFaShu()) value += 2;
                        if (player.countCards("h", function (current) {
                            return current != card && typeof current.hasDuYou == "function" && current.hasDuYou(skillName);
                        }) == 0) value += 0.8;
                        return value;
                    }
                    if (typeof oldValue == "function") return oldValue.apply(this, arguments);
                };

                skill.mod.aiOrder = function (player, card, num) {
                    if (typeof oldOrder == "function") {
                        var oldResult = oldOrder.apply(this, arguments);
                        if (typeof oldResult == "number") num = oldResult;
                    }
                    if (elementExclusiveSkills.indexOf(skillName) >= 0 && card && typeof card.hasDuYou == "function" && card.hasDuYou(skillName) && player.hasSkill(skillName) && !isResponseChoice() && !isExclusiveSkillSelection(skillName) && _status.currentPhase == player) {
                        // 元素师独有技牌只经对应法术技能使用，不作为普通卡牌行动消耗。
                        return -100;
                    }
                    if (card && typeof card.hasDuYou == "function" && card.hasDuYou(skillName) && player.hasSkill(skillName) && hasOrdinaryResponse(player, card)) {
                        return num - 20;
                    }
                    return num;
                };
            })(exclusiveSkills[i]);
        }
    }

    function patchYuanSuShiActionChain(helper) {
        var elementExclusiveSkills = ["yunShi", "bingDong", "huoQou", "fengRen", "leiJi"];
        var skillData = {
            bingDong: { damage: 1, suit: "shui", bonus: 0.45 },
            huoQou: { damage: 2, suit: "huo", bonus: 0 },
            fengRen: { damage: 1, suit: "feng", bonus: 0.55 },
            leiJi: { damage: 1, suit: "lei", bonus: 0.7 }
        };

        function uniqueCard(player, skillName) {
            var cards = player.getCards("h");
            for (var i = 0; i < cards.length; i++) {
                if (typeof cards[i].hasDuYou == "function" && cards[i].hasDuYou(skillName)) return cards[i];
            }
            return null;
        }

        function isOwnedElementExclusive(player, card) {
            if (!player || !card || typeof card.hasDuYou != "function") return false;
            return elementExclusiveSkills.some(function (name) {
                return player.hasSkill(name) && card.hasDuYou(name);
            });
        }

        var absorption = lib.skill && lib.skill.yuanSuXiShou;
        if (absorption && markPatched(absorption, "spellFirstAction")) {
            if (!absorption.mod) absorption.mod = {};
            var oldAbsorptionOrder = absorption.mod.aiOrder;
            absorption.mod.aiOrder = function (player, card, num) {
                if (typeof oldAbsorptionOrder == "function") {
                    var oldResult = oldAbsorptionOrder.apply(this, arguments);
                    if (typeof oldResult == "number") num = oldResult;
                }
                if (_status.currentPhase != player || typeof player.canFaShu != "function" || !player.canFaShu()) return num;
                // 【魔弹】能立即造成法术伤害并触发【元素吸收】，在未满3【元素】时优先完成法术积累。
                if (get.name(card, player) == "moDan") return num + (player.countMark("yuanSu") < 3 ? 3 : 1);
                // 【中毒】在目标行动前造成由元素师作为来源的延时法术伤害，同样能够补充【元素】。
                if (get.name(card, player) == "zhongDu" && player.countMark("yuanSu") < 3) return num + 2;
                return num;
            };
        }

        function cheapestExtra(player, suit, primary) {
            var cards = player.getCards("h", function (card) {
                // 只保留元素师自己能够发动的独有法术牌；卡牌附带的其他角色
                // 独有技字段不影响其作为普通同系牌支付追加费用。
                return card != primary && get.xiBie(card) == suit && !isOwnedElementExclusive(player, card);
            });
            if (!cards.length) return null;
            cards.sort(function (a, b) { return get.value(a, player) - get.value(b, player); });
            return cards[0];
        }

        function damageOptions(player, skillName, baseDamage, suit) {
            var primary = uniqueCard(player, skillName);
            if (!primary) return [];
            var options = [{ damage: baseDamage, cost: 0 }];
            var extra = cheapestExtra(player, suit, primary);
            // 追加同系普通牌能把独有法术的核心伤害提高1点，通常可跨过
            // 【治疗】、爆牌和士气阈值，因此只保留较低的手牌机会成本。
            if (extra) options.push({ damage: baseDamage + 1, cost: Math.max(0, get.value(extra, player)) * 0.06 });
            return options;
        }

        function hasOrdinaryFollowupSpell(player) {
            return player.getCards("h").some(function (card) {
                if (isOwnedElementExclusive(player, card) || get.type(card) != "faShu") return false;
                var info = get.info(card);
                if (!info || !info.enable) return false;
                if (info.notarget) return true;
                if (typeof player.hasUseTargetXingBei != "function") return true;
                try {
                    return player.hasUseTargetXingBei(card);
                } catch (e) {
                    return false;
                }
            });
        }

        function finishers(player) {
            // 【元素点燃】与【陨石】只是延长行动的连段组件，不能把“不接任何法术”
            // 当成合法终点；整条链必须至少还有一项可实际使用的其他法术承接。
            var list = [];
            Object.keys(skillData).forEach(function (name) {
                var data = skillData[name];
                damageOptions(player, name, data.damage, data.suit).forEach(function (option) {
                    list.push({ damage: option.damage, cost: option.cost, bonus: data.bonus, skill: name });
                });
            });
            if (typeof player.canBiShaBaoShi == "function" && player.canBiShaBaoShi()) {
                var energyDamage = typeof player.countNengLiangAll == "function" ? Math.max(1, player.countNengLiangAll()) : 1;
                list.push({ damage: energyDamage, cost: 1.25, bonus: 0, skill: "yueGuang" });
            }
            if (hasOrdinaryFollowupSpell(player)) {
                list.push({ damage: 0, cost: 0, bonus: 0.35, skill: "ordinarySpell" });
            }
            return list;
        }

        function simulateDamage(target, damages) {
            var hand = target.countCards("h");
            var limit = target.getHandcardLimit();
            var healing = Math.max(0, target.zhiLiao || 0);
            var totalDamage = 0;
            var moraleLoss = 0;
            for (var i = 0; i < damages.length; i++) {
                var damage = Math.max(0, damages[i] || 0);
                var blocked = Math.min(healing, damage);
                healing -= blocked;
                var actual = damage - blocked;
                totalDamage += actual;
                if (!actual) continue;
                var overflow = Math.max(0, hand + actual - limit);
                moraleLoss += overflow;
                hand = Math.min(limit, hand + actual);
            }
            return { totalDamage: totalDamage, moraleLoss: moraleLoss };
        }

        function evaluateBurstTarget(player, target) {
            if (!target || target.side == player.side) return null;
            var meteorOptions = damageOptions(player, "yunShi", 1, "di");
            var ignition = player.countMark("yuanSu") >= 3;
            if (!ignition && !meteorOptions.length) return null;
            // 【元素点燃】与【陨石】各自都能返还一次法术行动，但只有后续存在
            // 另一项可用法术时才进入计划；同时存在时按“点燃→陨石→终结技”计算。
            // 点燃优先可以先腾出【元素】容量，避免陨石伤害触发【元素吸收】时溢出。
            var meteorPlans = meteorOptions.length ? meteorOptions : [{ damage: 0, cost: 0, absent: true }];
            var options = finishers(player);
            if (!options.length) return null;
            var best = null;
            for (var i = 0; i < meteorPlans.length; i++) {
                for (var j = 0; j < options.length; j++) {
                    var damages = ignition ? [2] : [];
                    if (!meteorPlans[i].absent) damages.push(meteorPlans[i].damage);
                    if (options[j].damage > 0) damages.push(options[j].damage);
                    var result = simulateDamage(target, damages);
                    var effectiveMorale = Math.min(result.moraleLoss, get.shiQi(!player.side));
                    var score = result.totalDamage * 0.72 + effectiveMorale * 5.2 + options[j].bonus;
                    score -= meteorPlans[i].cost + options[j].cost;
                    if (result.moraleLoss > 0) score += 0.8;
                    if (result.moraleLoss >= get.shiQi(!player.side) && result.moraleLoss > 0) score += 40;
                    if (!best || score > best.score) {
                        best = {
                            target: target,
                            score: score,
                            totalDamage: result.totalDamage,
                            moraleLoss: result.moraleLoss,
                            lethal: result.moraleLoss >= get.shiQi(!player.side) && result.moraleLoss > 0,
                            ignition: ignition,
                            meteor: !meteorPlans[i].absent,
                            finisher: options[j].skill
                        };
                    }
                }
            }
            return best;
        }

        function bestBurst(player) {
            var best = null;
            game.countPlayer(function (target) {
                var plan = evaluateBurstTarget(player, target);
                if (plan && (!best || plan.score > best.score)) best = plan;
            });
            return best;
        }

        function elementGainDamage(player, target, skillName, baseDamage, suit) {
            if (!skillName || !target || player.countMark("yuanSu") >= 3) return 0;
            var options = damageOptions(player, skillName, baseDamage, suit);
            var maximum = baseDamage;
            for (var i = 0; i < options.length; i++) maximum = Math.max(maximum, options[i].damage || 0);
            return Math.max(0, maximum - Math.max(0, target.zhiLiao || 0));
        }

        function treatmentStrip(player, target, skillName, baseDamage, suit) {
            if (!target) return 0;
            var options = damageOptions(player, skillName, baseDamage, suit);
            var maximum = baseDamage;
            for (var i = 0; i < options.length; i++) maximum = Math.max(maximum, options[i].damage || 0);
            return Math.min(Math.max(0, target.zhiLiao || 0), maximum);
        }

        function hasElementGainTarget(player, skillName, baseDamage, suit) {
            if (player.countMark("yuanSu") >= 3) return false;
            return game.hasPlayer(function (target) {
                return target.side != player.side && elementGainDamage(player, target, skillName, baseDamage, suit) > 0;
            });
        }

        function bestIceHealing(player) {
            var best = 0;
            game.countPlayer(function (target) {
                if (target.side != player.side || typeof target.getZhiLiaoLimit != "function") return;
                var room = Math.max(0, target.getZhiLiaoLimit() - (target.zhiLiao || 0));
                if (!room) return;
                best = Math.max(best, 0.8, helper.healScore(target, player, 1));
            });
            return best;
        }

        function targetScore(player, target, baseDamage, skillName, suit) {
            if (!target || target.side == player.side) return -20;
            var plan = evaluateBurstTarget(player, target);
            var score = plan ? 1 + plan.score : helper.damagePressure(target, player, baseDamage);
            var gainDamage = elementGainDamage(player, target, skillName, baseDamage, suit);
            if (gainDamage > 0) score = Math.max(score, 3 + gainDamage * 0.6);
            var stripped = treatmentStrip(player, target, skillName, baseDamage, suit);
            if (stripped > 0) {
                var handPressure = target.getHandcardLimit() ? target.countCards("h") / target.getHandcardLimit() : 0;
                score = Math.max(score, 2.3 + stripped * 0.8 + Math.min(1.2, handPressure));
            }
            // 【冰冻】在伤害后必定还能治疗一名角色；不能只按前半段的1点伤害估值。
            if (skillName == "bingDong") {
                var healing = bestIceHealing(player);
                if (healing > 0) score = Math.max(score, 2.4 + healing * 0.6);
            }
            return score;
        }

        var ignition = lib.skill && lib.skill.yuanSuDianRan;
        if (ignition && markPatched(ignition, "burstChain")) {
            if (!ignition.ai) ignition.ai = {};
            if (!ignition.ai.result) ignition.ai.result = {};
            ignition.ai.order = function (item, player) {
                var plan = bestBurst(player);
                // 满3【元素】时必须先释放【元素点燃】返还法术行动，
                // 再结算陨石或终结法术，避免火球等独有技抢先消耗本轮行动。
                if (plan && plan.ignition) return plan.lethal ? 35 : 30 + Math.min(4, plan.moraleLoss * 0.8 + plan.totalDamage * 0.18);
                return 3.7;
            };
            ignition.ai.result.target = function (player, target) {
                if (!target || target.side == player.side) return 0;
                var plan = bestBurst(player);
                if (!plan || !plan.ignition) return 0;
                // result.target描述目标承受效果的语义；伤害对目标是负收益。
                return -Math.max(0.1, targetScore(player, target, 2));
            };
            // 【元素点燃】没有实体费用牌，也需要显式提供直接选人分数。
            // 否则本体会把上面的负面效果语义再次用于最终选人并取消技能。
            ignition.ai2 = function (target) {
                var player = _status.event.player;
                var plan = bestBurst(player);
                if (!plan || !plan.ignition) return 0;
                return targetScore(player, target, 2);
            };
        }

        var meteor = lib.skill && lib.skill.yunShi;
        if (meteor && markPatched(meteor, "burstChain")) {
            if (!meteor.ai) meteor.ai = {};
            if (!meteor.ai.result) meteor.ai.result = {};
            meteor.ai.order = function (item, player) {
                var plan = bestBurst(player);
                var gainElement = hasElementGainTarget(player, "yunShi", 1, "di");
                if (!plan || !plan.meteor) return 0;
                if (plan.ignition) return plan.lethal ? 26 : 12 + Math.min(4, plan.moraleLoss * 0.75 + plan.totalDamage * 0.16) + (gainElement ? 1 : 0);
                return plan.lethal ? 27 : 9 + Math.min(4, plan.moraleLoss * 0.75 + plan.totalDamage * 0.16) + (gainElement ? 1.5 : 0);
            };
            meteor.ai.result.target = function (player, target) {
                var plan = bestBurst(player);
                if (!plan || !plan.meteor) return 0;
                return targetScore(player, target, 1, "yunShi", "di");
            };
            // 本技能先选择实体牌；备份技能后必须直接替换选人AI，
            // 否则本体会按该实体攻击牌而不是【陨石】的法术效果评价目标。
            meteor.ai2 = function (target) {
                var player = _status.event.player;
                var plan = bestBurst(player);
                if (!plan || !plan.meteor) return 0;
                return targetScore(player, target, 1, "yunShi", "di");
            };
        }

        Object.keys(skillData).forEach(function (name) {
            var skill = lib.skill && lib.skill[name];
            if (!skill || !markPatched(skill, "burstChain")) return;
            var data = skillData[name];
            if (!skill.ai) skill.ai = {};
            if (!skill.ai.result) skill.ai.result = {};
            skill.ai.order = function (item, player) {
                var plan = bestBurst(player);
                if (plan && plan.finisher == name) {
                    if (plan.meteor) return plan.lethal ? 23 : 8.6;
                    return plan.lethal ? 25 : 13 + Math.min(4, plan.moraleLoss * 0.8 + plan.totalDamage * 0.18);
                }
                var direct = helper.bestEnemy(player, function (target) {
                    return helper.damagePressure(target, player, data.damage);
                });
                if (direct.target && helper.overflowAfterDamage(direct.target, data.damage) >= get.shiQi(!player.side)) return 24;
                var available = 0;
                ["yunShi"].concat(Object.keys(skillData)).forEach(function (current) {
                    if (uniqueCard(player, current)) available++;
                });
                var base = { huoQou: 9.8, leiJi: 9.5, fengRen: 9.2, bingDong: 8.9 }[name] || 8.8;
                if (available > 1) base += Math.min(1.2, (available - 1) * 0.4);
                if (hasElementGainTarget(player, name, data.damage, data.suit)) base += 1.5;
                if (name == "bingDong" && bestIceHealing(player) > 0) base += 1.4;
                return base;
            };
            skill.ai.result.target = function (player, target) {
                return targetScore(player, target, data.damage, name, data.suit);
            };
            // 带实体牌费用的技能在选牌后由event.ai2负责选人；
            // 显式使用技能评分，避免退回实体攻击牌的普通目标评价。
            skill.ai2 = function (target) {
                return targetScore(_status.event.player, target, data.damage, name, data.suit);
            };
        });

        var moonlight = lib.skill && lib.skill.yueGuang;
        if (moonlight && markPatched(moonlight, "burstChain")) {
            if (!moonlight.ai) moonlight.ai = {};
            if (!moonlight.ai.result) moonlight.ai.result = {};
            moonlight.ai.order = function (item, player) {
                var damage = typeof player.countNengLiangAll == "function" ? Math.max(1, player.countNengLiangAll()) : 1;
                var direct = helper.bestEnemy(player, function (target) {
                    return helper.damagePressure(target, player, damage);
                });
                if (direct.target && helper.overflowAfterDamage(direct.target, damage) >= get.shiQi(!player.side)) return 25;
                return 4.9 + Math.min(2.5, damage * 0.25);
            };
            moonlight.ai.result.target = function (player, target) {
                var damage = typeof player.countNengLiangAll == "function" ? Math.max(1, player.countNengLiangAll()) : 1;
                return targetScore(player, target, damage);
            };
        }

        ["yunShi", "bingDong", "huoQou", "fengRen", "leiJi"].forEach(function (name) {
            var skill = lib.skill && lib.skill[name];
            if (!skill) return;
            skill.check = function (card) {
                var player = _status.event.player;
                if (typeof card.hasDuYou == "function" && card.hasDuYou(name)) {
                    return ui.selected.cards.length == 0 ? 12 : -20;
                }
                if (isOwnedElementExclusive(player, card)) return -20;
                var plan = bestBurst(player);
                var value = get.value(card, player);
                // 除独有技牌外，所有符合系别的牌都可作为追加费用；
                // 提高最低支付分，确保AI优先完成+1伤害，再按牌面价值选择较便宜的材料。
                // 能直接造成士气下降或终结时进一步提高追加费用的选择顺序。
                if (plan && plan.lethal) return Math.max(9, 22 - value * 0.7);
                if (plan && plan.moraleLoss > 0) return Math.max(7, 19 - value * 0.75);
                return Math.max(4, 16 - value * 0.8);
            };
        });
    }

    function patchJingLingSheShou(helper) {
        var skill = lib.skill && lib.skill.yuanSuSheJi;
        if (!skill || !markPatched(skill, "costChoice")) return;
        skill.cost = async function (event, trigger, player) {
            var suit = get.xiBie(trigger.card);
            var target = trigger.target || trigger.oriTarget;
            var benefit = 1.5;
            if (suit == "feng") benefit = typeof player.canGongJi == "function" && player.canGongJi() ? 7 : 2;
            else if (suit == "lei") benefit = target ? 3 + helper.responseCount(target, trigger.card) * 1.4 : 3;
            else if (suit == "huo" || suit == "di") benefit = target ? 3 + helper.overflowAfterDamage(target, 1) * 2 : 3;
            else if (suit == "shui") {
                benefit = game.hasPlayer(function (current) {
                    return current.side == player.side && current.zhiLiao < current.getZhiLiaoLimit();
                }) ? 3 : 0.5;
            }
            var prompt2 = "弃1张法术牌【展示】或移除1个【祝福】";
            event.result = await player.chooseCard("hs", function (card) {
                if (get.position(card) == "h") return get.type(card) == "faShu";
                return get.position(card) == "s" && card.hasGaintag("zhuFu");
            }).set("prompt", get.prompt("yuanSuSheJi")).set("prompt2", prompt2).set("benefit", benefit).set("ai", function (card) {
                var player = _status.event.player;
                var score = _status.event.benefit - get.value(card, player);
                if (get.position(card) == "s") score += 1.2;
                if (player.countCards("h") > player.getHandcardLimit()) score += 3;
                return score;
            }).forResult();
        };

        var partner = lib.skill && lib.skill.dongWuHuoBan;
        if (partner && markPatched(partner, "drawTarget")) {
            partner.content = async function (event, trigger, player) {
                await event.trigger("dongWuHuoBan");
                var target = player;
                if (event.chongWuQiangHua) {
                    var targets = await player.chooseTarget("目标角色摸1张牌【强制】，弃1张牌", true).set("ai", function (current) {
                        var player = _status.event.player;
                        var pressure = current.countCards("h") - current.getHandcardLimit();
                        if (current.side == player.side) return pressure >= 0 ? 5 + pressure : 0.5;
                        return 0;
                    }).forResult("targets");
                    if (targets && targets.length) target = targets[0];
                }
                await target.draw(1);
                await target.chooseToDiscard(1, "h", true).set("ai", function (card) { return 7 - get.value(card); });
            };
        }
    }

    function patchShenGuan(helper) {
        var skill = lib.skill && lib.skill.shuiZhiShenLi;
        if (!skill || !markPatched(skill, "giveCard")) return;
        skill.content = function () {
            "step 0"
            if (player.countCards("h") > 0) {
                player.chooseCard("h", "交给目标队友1张牌", true, 1).set("target", target).set("ai", function (card) {
                    var player = _status.event.player;
                    var target = _status.event.target;
                    var score = 7 - get.value(card, player);
                    if (target.countCards("h") >= target.getHandcardLimit()) score -= 6;
                    return score;
                });
            }
            "step 1"
            if (result.bool && result.cards && result.cards.length) player.give(result.cards[0], target);
            "step 2"
            player.changeZhiLiao(1);
            "step 3"
            target.changeZhiLiao(1, player);
        };
        if (skill.ai && skill.ai.result) {
            skill.ai.result.target = function (player, target) {
                if (target.side != player.side) return 100;
                if (target.countCards("h") >= target.getHandcardLimit()) return 0.2;
                return get.zhiLiaoEffect(target, 1) + 0.8;
            };
        }
    }

    function patchHongLianQiShi(helper) {
        var skill = lib.skill && lib.skill.xueXingDaoYan;
        if (!skill || !markPatched(skill, "distribution")) return;
        skill.content = function () {
            "step 0"
            var list = [];
            for (var i = 1; i <= player.zhiLiao; i++) list.push(i);
            player.chooseControl(list).set("prompt", "血腥祷言：移除X点【治疗】，对自己造成X点法术伤害").set("ai", function () {
                var player = _status.event.player;
                var demand = 0;
                game.countPlayer(function (target) {
                    if (target != player && target.side == player.side) demand += Math.max(0, target.getZhiLiaoLimit() - target.zhiLiao);
                });
                var safe = Math.max(1, player.getHandcardLimit() - player.countCards("h") + player.zhiLiao);
                return Math.max(1, Math.min(player.zhiLiao, demand, safe));
            });
            "step 1"
            var amount = Number(result.control) || 1;
            player.changeZhiLiao(-amount);
            player.faShuDamage(amount, player);
            player.storage.xueXingDaoYan = amount;
            "step 2"
            event.num = player.storage.xueXingDaoYan || 1;
            var maxTargets = event.num > 1 ? 2 : 1;
            player.chooseTarget(function (card, player, target) {
                return target != player && target.side == player.side;
            }, [1, maxTargets], true, "选择1至" + maxTargets + "名目标队友分配" + event.num + "点【治疗】").set("ai", function (target) {
                var room = Math.max(0, target.getZhiLiaoLimit() - target.zhiLiao);
                return room * 3 + get.attitude(_status.event.player, target);
            });
            "step 3"
            if (!result.bool || !result.targets || !result.targets.length) {
                event.goto(7);
            } else if (result.targets.length == 1) {
                result.targets[0].changeZhiLiao(event.num);
                event.goto(7);
            } else {
                result.targets.sortBySeat(player);
                event.targets = result.targets;
                event.target = event.targets[0];
            }
            "step 4"
            var list = [];
            for (var i = 1; i < event.num; i++) list.push(i);
            player.chooseControl(list).set("target", event.target).set("total", event.num).set("ai", function () {
                var target = _status.event.target;
                return Math.max(1, Math.min(_status.event.total - 1, target.getZhiLiaoLimit() - target.zhiLiao));
            });
            "step 5"
            var first = Number(result.control) || 1;
            event.target.changeZhiLiao(first);
            event.num -= first;
            "step 6"
            event.targets[1].changeZhiLiao(event.num);
            "step 7"
            player.addZhiShiWu("xueYin");
        };
        skill.check = function (event, player) {
            if (player.countZhiShiWu("xueYin") >= lib.skill.xueYin.intro.max) return false;
            if (helper.shouldReserveSpecial(event, player)) return false;
            var demand = 0;
            game.countPlayer(function (target) {
                if (target != player && target.side == player.side) demand += Math.max(0, target.getZhiLiaoLimit() - target.zhiLiao);
            });
            return demand > 0 && player.zhiLiao > 0 && helper.signedHandRoom(player) + player.zhiLiao > 0;
        };
    }

    function patchYinYangShi(helper) {
        var skill = lib.skill && lib.skill.shiShenZhouShu;
        if (!skill || !markPatched(skill, "intercept")) return;
        skill.cost = async function (event, trigger, player) {
            event.source = trigger.player;
            event.yingZhan = trigger.yingZhan;
            event.card = trigger.card;
            var protectedTarget = trigger.target;
            var expectedDamage = Math.max(1, trigger.damageNum || trigger.num || 2);
            var pressure = helper.overflowAfterDamage(protectedTarget, expectedDamage);
            var worth = pressure * 4;
            if (get.shiQi(player.side) <= expectedDamage) worth += 6;
            if ((protectedTarget.zhiLiao || 0) == 0) worth += 1.5;
            if (helper.shouldReserveSpecial(event, player) && pressure <= 0) worth -= 6;
            var prompt = get.prompt("shiShenZhouShu") + get.translation(get.xiBie(event.card)) + "系主动攻击";
            event.result = await player.yingZhan(prompt)
                .set("filterCard", function (card, player) {
                    if (get.type(card) != "gongJi") return false;
                    if (_status.event.canYingZhan == false) return false;
                    if (_status.event.canAnMie == false) return get.xiBie(card) == get.xiBie(_status.event.card);
                    return get.name(card) == "anMie" || get.xiBie(card) == get.xiBie(_status.event.card);
                })
                .set("filterTarget", function (card, player, target) {
                    if (target == _status.event.source || target.side == player.side) return false;
                    return lib.filter.targetEnabled(card, player, target);
                })
                .set("card", event.card).set("source", event.source).set("yingZhan", true)
                .set("canYingZhan", trigger.canYingZhan).set("canShengGuang", trigger.canShengGuang)
                .set("canAnMie", trigger.canAnMie).set("prompt2", lib.translate.shiShenZhouShu_info)
                .set("interceptWorth", worth).set("ai1", function (card) {
                    return _status.event.interceptWorth + 6 - get.value(card, _status.event.player);
                }).set("ai2", function (target) {
                    return get.damageEffect2(target, _status.event.player, 2);
                }).set("oncard", function (card, player) {
                    _status.event.yingZhan = true;
                }).set("shiShenZhouShu", true).forResult();
        };
    }

    function patchMoGong(helper) {
        var multi = lib.skill && lib.skill.duoChongSheJi;
        if (multi && markPatched(multi, "target")) {
            multi.content = function () {
                var helper = lib.xingBeiShiZhouNianAi;
                "step 0"
                player.discard(event.cost_data, "chongNengPai").set("showHiddenCards", true);
                trigger.getParent("xingDong").moGuanChongJi = false;
                if (!game.hasPlayer(function (current) {
                    return current != trigger.oriTarget && player.canUse("anMie", current);
                })) {
                    delete player.storage._shiZhouNianAiMoGongWindTarget;
                    event.finish();
                    return;
                }
                player.chooseTarget(true, function (card, player, target) {
                    return target != _status.event.triggerTarget && player.canUse("anMie", target);
                }).set("triggerTarget", trigger.oriTarget).set("ai", function (target) {
                    var player = _status.event.player;
                    if (player.storage._shiZhouNianAiMoGongWindTarget == target) return 100;
                    var score = get.damageEffect2(target, player, 1);
                    if (target.side != player.side) score += helper.overflowAfterDamage(target, 1) * 3;
                    return score;
                });
                "step 1"
                delete player.storage._shiZhouNianAiMoGongWindTarget;
                if (result.bool && result.targets && result.targets.length) {
                    player.useCard({ name: "anMie", xiBie: "an" }, result.targets[0]).set("duoChongSheJi", true);
                }
            };
        }

        var eye = lib.skill && lib.skill.moYan;
        if (eye && markPatched(eye, "overflowChoice")) {
            eye.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                // 【魔眼】先完成摸3及标准爆牌，再将1张牌置为【充能】；
                // 不能把后续离手的牌提前计入摸牌安全空间。
                if (!helper.wouldOverflow(player, 3, 0)) return true;
                return game.hasPlayer(function (target) {
                    return target.countCards("h") > 0 && (target.side == player.side || target.countCards("h") >= target.getHandcardLimit());
                });
            };
            eye.content = function () {
                var helper = lib.xingBeiShiZhouNianAi;
                "step 0"
                player.removeBiShaBaoShi();
                "step 1"
                player.chooseControl().set("choiceList", ["目标角色弃1张牌", "你摸3张牌【强制】"]).set("ai", function () {
                    var player = _status.event.player;
                    if (helper.wouldOverflow(player, 3, 0)) return "选项一";
                    if (!(player.canGongJi() || player.canFaShu())) return "选项二";
                    var stock = player.getGaiPai("chongNengPai").length;
                    return player.countCards("h") <= 2 || stock <= 2 ? "选项二" : "选项一";
                });
                "step 2"
                if (result.control == "选项一") event.goto(3);
                else event.goto(5);
                "step 3"
                player.chooseTarget(true, "目标角色弃1张牌").set("ai", function (target) {
                    var player = _status.event.player;
                    var pressure = target.countCards("h") - target.getHandcardLimit();
                    if (target.side == player.side) return pressure >= 0 ? 8 + pressure : -2;
                    return -10;
                });
                "step 4"
                if (result.bool && result.targets && result.targets.length) result.targets[0].chooseToDiscard("h", true);
                event.goto(6);
                "step 5"
                player.draw(3);
                "step 6"
                if (player.countCards("h") > 0) {
                    player.chooseCard("h", 1, true).set("prompt", "将自己1张手牌作为充能").set("ai", function (card) {
                        if (typeof helper.moGongChargeCardScore == "function") {
                            return helper.moGongChargeCardScore(player, card);
                        }
                        var suit = get.xiBie(card);
                        return (suit == "lei" || suit == "huo" || suit == "feng" ? 8 : 5) - get.value(card);
                    });
                } else event.goto(8);
                "step 7"
                if (result.bool && result.cards && result.cards.length) player.addGaiPai("chongNengPai", result.cards);
                "step 8"
                player.addNengLiang("shuiJing", 1);
            };
        }

        var charge = lib.skill && lib.skill.chongNeng;
        if (charge && markPatched(charge, "drawRisk")) {
            charge.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                if (player.getHandcardLimit() < 4) return false;
                var stock = player.getGaiPai("chongNengPai").length;
                var useful = player.countCards("h", function (card) {
                    var suit = get.xiBie(card);
                    return suit == "lei" || suit == "huo" || suit == "feng";
                });
                return stock <= 4 || useful < 3 || player.countCards("h") <= 2;
            };
        }
    }

    function patchMoQiang(helper) {
        var barrier = lib.skill && lib.skill.anZhiZhangBi;
        if (barrier && markPatched(barrier, "discardValue")) {
            barrier.cost = async function (event, trigger, player) {
                var incoming = Math.max(0, trigger.num || trigger.damageNum || 0);
                ["zaoChengShangHaiMax", "shouDaoShangHaiMax", "chanShengShangHaiMax", "chengShouShangHaiMax"].forEach(function (key) {
                    if (typeof trigger[key] == "number") incoming = Math.min(incoming, Math.max(0, trigger[key]));
                });
                var treatment = trigger.canZhiLiao === false || trigger.diXiao === false ? 0 : Math.max(0, player.zhiLiao || 0);
                var predictedDraw = Math.max(0, incoming - treatment);
                var desired = Math.max(0, player.countCards("h") + predictedDraw - player.getHandcardLimit());
                var spellCount = player.countCards("h", function (card) { return get.type(card) == "faShu"; });
                var thunderCount = player.countCards("h", function (card) { return get.xiBie(card) == "lei"; });
                var preferred = spellCount >= desired ? "faShu" : thunderCount >= desired ? "lei" : spellCount >= thunderCount ? "faShu" : "lei";
                event.result = await player.chooseCard([1, Infinity], function (card) {
                    if (!ui.selected.cards.length) return get.type(card) == "faShu" || get.xiBie(card) == "lei";
                    var dict = { faShu: 0, lei: 0 };
                    for (var i = 0; i < ui.selected.cards.length; i++) {
                        if (get.type(ui.selected.cards[i]) == "faShu") dict.faShu++;
                        if (get.xiBie(ui.selected.cards[i]) == "lei") dict.lei++;
                    }
                    if (dict.faShu == dict.lei) return get.type(card) == "faShu" || get.xiBie(card) == "lei";
                    return dict.faShu > dict.lei ? get.type(card) == "faShu" : get.xiBie(card) == "lei";
                }).set("complexCard", true).set("prompt", get.prompt("anZhiZhangBi"))
                    .set("prompt2", lib.translate.anZhiZhangBi_info)
                    .set("desired", desired).set("spellCount", spellCount).set("thunderCount", thunderCount).set("preferred", preferred)
                    .set("ai", function (card) {
                        var player = _status.event.player;
                        var desired = _status.event.desired || 0;
                        if (desired <= 0) return -1 - get.value(card, player);
                        if (ui.selected.cards.length >= desired) return 0;
                        var spell = get.type(card) == "faShu";
                        var thunder = get.xiBie(card) == "lei";
                        var preferred = _status.event.preferred;
                        var matchesPreferred = preferred == "faShu" ? spell : thunder;
                        if (!ui.selected.cards.length && !matchesPreferred) return -20 - get.value(card, player);
                        var capacity = spell && thunder ? Math.max(_status.event.spellCount, _status.event.thunderCount) :
                            spell ? _status.event.spellCount : _status.event.thunderCount;
                        var shortage = Math.max(0, desired - capacity);
                        return (spell ? 20 : 12) + (matchesPreferred ? 8 : 0) +
                            (desired - ui.selected.cards.length) * 2 - shortage * 3 - get.value(card, player);
                    }).forResult();
            };
        }

        var spear = lib.skill && lib.skill.qiHeiZhiQiang;
        if (spear && markPatched(spear, "minimumPayment")) {
            spear.cost = async function (event, trigger, player) {
                var list = [];
                var gemCount = player.countNengLiang("baoShi");
                var crystalCount = player.countNengLiang("shuiJing");
                for (var i = 0; i < gemCount; i++) list.push(["baoShi", get.translation("baoShi")]);
                for (var j = 0; j < crystalCount; j++) list.push(["shuiJing", get.translation("shuiJing")]);
                var target = trigger.target;
                var base = Math.max(0, trigger.damageNum || trigger.num || 2);
                var desired = 1;
                if (target) {
                    var need = target.getHandcardLimit() - target.countCards("h") - Math.max(0, base - (target.zhiLiao || 0));
                    if (need > 3) desired = Math.min(list.length, need - 2);
                }
                desired = Math.max(1, Math.min(desired, list.length));
                var worth = target ? helper.overflowAfterDamage(target, base + desired + 2) : 0;
                if (target && get.shiQi(!player.side) <= Math.max(1, worth)) worth += 4;
                if (helper.shouldReserveSpecial(event, player) && worth <= 0) worth -= 5;
                var result = await player.chooseButton(["本次攻击伤害额外+(X+2)", [list, "tdnodes"]])
                    .set("selectButton", [1, Infinity]).set("desired", desired).set("worth", worth).set("ai", function (button) {
                        if (ui.selected.buttons.length >= _status.event.desired) return 0;
                        var resource = Array.isArray(button.link) ? button.link[0] : button.link;
                        var reservePenalty = resource == "baoShi" ? 1.2 : 0;
                        return 5 + _status.event.worth - reservePenalty;
                    }).forResult();
                event.result = { bool: !!(result.bool && result.links && result.links.length), cost_data: result.links || [] };
            };
            spear.content = function () {
                var costs = event.cost_data || [];
                if (!costs.length) return;
                trigger.changeDamageNum(costs.length + 2);
                var dict = { baoShi: 0, shuiJing: 0 };
                for (var i = 0; i < costs.length; i++) {
                    var resource = Array.isArray(costs[i]) ? costs[i][0] : costs[i];
                    if (dict[resource] != null) dict[resource]++;
                }
                if (dict.baoShi) player.removeNengLiang("baoShi", dict.baoShi);
                if (dict.shuiJing) player.removeNengLiang("shuiJing", dict.shuiJing);
            };
        }

        var fillingAttack = lib.skill && lib.skill.chongYing && lib.skill.chongYing.subSkill && lib.skill.chongYing.subSkill.shangHai;
        if (fillingAttack && markPatched(fillingAttack, "avoidShieldTarget")) {
            fillingAttack.ai = fillingAttack.ai || {};
            fillingAttack.ai.effect = fillingAttack.ai.effect || {};
            var oldFillingAttackEffect = fillingAttack.ai.effect.player;
            fillingAttack.ai.effect.player = function (card, player, target, current, isLink) {
                var oldResult = typeof oldFillingAttackEffect == "function" ? oldFillingAttackEffect.apply(this, arguments) : undefined;
                if (target && target.side != player.side && get.type(card) == "gongJi" &&
                    target.hasJiChuXiaoGuo && target.hasJiChuXiaoGuo("_shengDun")) {
                    return [1, 0, 1, 50];
                }
                return oldResult;
            };
        }
    }

    function patchYongZhe() {
        var skill = lib.skill && lib.skill.tiaoXinX;
        if (!skill || !skill.subSkill || !markPatched(skill, "phaseChoice")) return;
        var choosePhase = async function (event, trigger, player) {
            var target = player.storage.tiaoXinX_player;
            var canAttack = !!target && typeof player.canGongJi == "function" && player.canGongJi() && player.countCards("h", function (card) {
                if (get.type(card) != "gongJi") return false;
                try { return player.canUse(card, target); } catch (e) { return true; }
            }) > 0;
            var control = await player.chooseControl(["继续回合", "跳过回合"]).set("prompt", "你被挑衅了").set("canAttack", canAttack).set("ai", function () {
                return _status.event.canAttack ? "继续回合" : "跳过回合";
            }).forResultControl();
            if (control == "跳过回合") {
                await player.removeZhiShiWu("tiaoXinX");
                player.removeSkill("tiaoXinX");
                trigger.cancel();
            }
        };
        if (skill.subSkill.qiDongQian) skill.subSkill.qiDongQian.content = choosePhase;
        if (skill.subSkill.qiDongHou) skill.subSkill.qiDongHou.content = choosePhase;
    }

    function patchShengGong(helper) {
        var skill = lib.skill && lib.skill.shengXieJuBao;
        var sub = skill && skill.subSkill && skill.subSkill.gongJiWeiMingZhong;
        if (sub && markPatched(sub, "allyDiscard")) {
            sub.content = function () {
                "step 0"
                var bestPressure = -Infinity;
                game.countPlayer(function (target) {
                    if (target != player && target.side == player.side && target.countCards("h") > 0) {
                        bestPressure = Math.max(bestPressure, target.countCards("h") - target.getHandcardLimit());
                    }
                });
                var list = player.zhiLiao > 1 ? [1, 2, "cancel2"] : [1, "cancel2"];
                player.chooseControl(list).set("bestPressure", bestPressure).set("ai", function () {
                    var player = _status.event.player;
                    var pressure = _status.event.bestPressure;
                    if (pressure < 0) return "cancel2";
                    if (pressure >= 1 && player.zhiLiao > 1) return 2;
                    return 1;
                });
                "step 1"
                if (result.control == "cancel2") {
                    event.finish();
                    return;
                }
                event.num = Number(result.control) || 1;
                player.changeZhiLiao(-event.num);
                player.chooseTarget(true, function (card, player, target) {
                    return target != player && target.side == player.side && target.countCards("h") > 0;
                }).set("ai", function (target) {
                    return 5 + (target.countCards("h") - target.getHandcardLimit()) * 4 + get.attitude(_status.event.player, target);
                });
                "step 2"
                if (result.bool && result.targets && result.targets.length) result.targets[0].chooseToDiscard("h", true, event.num);
            };
        }

        var burst = lib.skill && lib.skill.shengGuangBaoLie;
        if (burst && burst.chooseButton && markPatched(burst, "overflowChoice")) {
            burst.chooseButton.check = function (button) {
                var player = _status.event.player;
                if (button.link == "1") {
                    if (helper.wouldOverflow(player, 1, 0)) return -4;
                    return game.hasPlayer(function (target) {
                        return target != player && target.side == player.side && target.zhiLiao < target.getZhiLiaoLimit();
                    }) ? 2.4 : 0.4;
                }
                return button.link == "2" ? 1.8 : 0;
            };
        }
    }

    function patchProactiveDrawSkills(helper) {
        var together = lib.skill && lib.skill.tongShengGongSi;
        if (together && markPatched(together, "drawRisk")) {
            if (!together.ai) together.ai = {};
            if (!together.ai.result) together.ai.result = {};
            together.ai.result.player = function (player) {
                return helper.wouldOverflow(player, 2, 0) ? -6 : 1.5;
            };
            together.ai.result.target = function (player, target) {
                if (player.isHengZhi()) return 1.5;
                return -Math.max(1, target.countCards("h") * 0.7);
            };
        }

        var dance = lib.skill && lib.skill.wuDong;
        if (dance && markPatched(dance, "drawRisk")) {
            dance.check = function (card) {
                var player = _status.event.player;
                if (card) return 7 - get.value(card, player);
                return helper.handRoom(player) > 0 ? 1 : 0;
            };
            if (!dance.ai) dance.ai = {};
            if (!dance.ai.result) dance.ai.result = {};
            dance.ai.result.player = function (player) {
                if (player.getGaiPai("jian").length > 6) return 0;
                if (helper.handRoom(player) <= 0 && player.countCards("h") == 0) return -3;
                return 1;
            };
        }
    }

    function patchResidualChoiceSafety(helper) {
        var judgment = lib.skill && lib.skill.panJueTianPing;
        if (judgment && markPatched(judgment, "drawOption")) {
            judgment.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                return helper.handRoom(player) > 0 || game.hasPlayer(function (target) {
                    return target.side != player.side && target.countCards("h") > target.getHandcardLimit();
                });
            };
        }

        var companion = lib.skill && lib.skill.chongWuQiangHua;
        if (companion && markPatched(companion, "targetPressure")) {
            companion.check = function (event, player) {
                return game.hasPlayer(function (target) {
                    return target.side == player.side && target.countCards("h") >= target.getHandcardLimit();
                });
            };
        }

        var summon = lib.skill && lib.skill.jingLingMiYi;
        if (summon && markPatched(summon, "resourceReserve")) {
            summon.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                return player.getCards("s", function (card) { return card.hasGaintag("zhuFu"); }).length == 0;
            };
        }

        var contract = lib.skill && lib.skill.shenShengQiYue;
        if (contract && markPatched(contract, "safeTransfer")) {
            var oldCheck = contract.check;
            contract.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                return typeof oldCheck == "function" ? oldCheck.apply(this, arguments) : false;
            };
        }

        var rage = lib.skill && lib.skill.nuHou;
        if (rage && markPatched(rage, "drawRisk")) {
            rage.check = function (event, player) {
                var target = event.target || (event.targets && event.targets[0]);
                if (!target || target.side == player.side) return false;
                var gain = helper.overflowAfterDamage(target, (event.damageNum || 2) + 2);
                return gain > 0 || helper.likelyHit(player, target, event.card) >= 0.55 || get.shiQi(!player.side) <= 3;
            };
        }

        var danceForm = lib.skill && lib.skill.yuHunLiuJuHeShi;
        if (danceForm && markPatched(danceForm, "reserveGem")) {
            danceForm.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                return player.countZhiShiWu("shouHun") < 2 || player.isHengZhi();
            };
        }

        var cocoon = lib.skill && lib.skill.yongHua;
        if (cocoon && markPatched(cocoon, "reserveGem")) {
            if (!cocoon.ai) cocoon.ai = {};
            if (!cocoon.ai.result) cocoon.ai.result = {};
            cocoon.ai.result.player = function (player) {
                if (helper.shouldReserveSpecial(_status.event, player)) return -6;
                return player.getGaiPai("jian").length <= 4 ? 2 : -1;
            };
        }

        var reverse = lib.skill && lib.skill.daoNiZhiDie;
        if (reverse && markPatched(reverse, "resourcePlan")) {
            if (!reverse.ai) reverse.ai = {};
            if (!reverse.ai.result) reverse.ai.result = {};
            reverse.ai.result.player = function (player) {
                if (helper.shouldReserveSpecial(_status.event, player)) return -5;
                if (player.countCards("h") < 2) return -4;
                return player.hasZhiShiWu("DWZyong") ? 1.4 : 0.6;
            };
        }
    }

    function patchMoGongActionChain(helper) {
        function chargeCount(player, suit) {
            return player.getGaiPai("chongNengPai").filter(function (card) {
                return !suit || get.xiBie(card) == suit;
            }).length;
        }

        function attackTarget(event) {
            return event && (event.target || event.oriTarget || (event.targets && event.targets[0]));
        }

        function scatterPlan(player, lightningOverride) {
            var lightning = typeof lightningOverride == "number" ? lightningOverride : chargeCount(player, "lei");
            var enemyMorale = get.shiQi(!player.side);
            if (!lightning || enemyMorale < 2) return null;
            var enemies = game.filterPlayer(function (target) {
                return target.side != player.side;
            });
            if (!enemies.length) return null;
            var baseLoss = 0;
            var baseByTarget = [];
            for (var i = 0; i < enemies.length; i++) {
                var loss = helper.overflowAfterDamage(enemies[i], 1);
                baseByTarget.push(loss);
                baseLoss += loss;
            }
            // 【雷光散射】一旦发动便移除全部雷系【充能】，以完整爆发判断阈值。
            var bestTarget = null;
            var bestRawLoss = -1;
            for (var j = 0; j < enemies.length; j++) {
                var rawLoss = baseLoss - baseByTarget[j] + helper.overflowAfterDamage(enemies[j], lightning);
                if (rawLoss > bestRawLoss) {
                    bestRawLoss = rawLoss;
                    bestTarget = enemies[j];
                }
            }
            var actualLoss = Math.min(enemyMorale, Math.max(0, bestRawLoss));
            if (actualLoss < 2) return null;
            return { spend: lightning, target: bestTarget, moraleLoss: actualLoss, rawMoraleLoss: bestRawLoss };
        }

        function windChainPlan(player, previousTarget) {
            var wind = chargeCount(player, "feng");
            var plan = { score: 0, moraleLoss: 0, sequence: [], spend: 0 };
            if (!wind) return plan;
            var states = [];
            game.countPlayer(function (target) {
                if (target.side == player.side) return;
                var legal = false;
                try {
                    legal = player.canUse({ name: "anMie", xiBie: "an" }, target);
                } catch (e) {
                    legal = player.canUse("anMie", target);
                }
                if (!legal) return;
                states.push({
                    target: target,
                    hand: target.countCards("h"),
                    limit: target.getHandcardLimit(),
                    heal: Math.max(0, target.zhiLiao || 0),
                    defense: helper.holyLightCount(target) + helper.shieldCount(target)
                });
            });
            if (!states.length) return plan;
            var previous = previousTarget;
            var morale = get.shiQi(!player.side);
            for (var shot = 0; shot < wind; shot++) {
                var best = null;
                for (var i = 0; i < states.length; i++) {
                    var state = states[i];
                    if (state.target == previous) continue;
                    var score = 0;
                    var loss = 0;
                    if (state.defense > 0) score = 0.35;
                    else if (state.heal > 0) score = 0.3;
                    else {
                        loss = Math.max(0, state.hand + 1 - state.limit);
                        score = 0.55 + loss * 3.5;
                        if (loss > 0 && loss >= morale) score += 20;
                    }
                    if (!best || score > best.score) best = { state: state, score: score, loss: loss };
                }
                if (!best || best.score < 0.25) break;
                plan.sequence.push(best.state.target);
                plan.score += best.score;
                plan.moraleLoss += best.loss;
                plan.spend++;
                if (best.state.defense > 0) best.state.defense--;
                else if (best.state.heal > 0) best.state.heal--;
                else {
                    best.state.hand++;
                    if (best.loss > 0) best.state.hand = best.state.limit;
                }
                morale = Math.max(0, morale - best.loss);
                previous = best.state.target;
            }
            return plan;
        }

        function fireRoutePlan(player, target, card, baseDamage) {
            var result = { use: false, score: -Infinity, advantage: -Infinity, second: false, secondGain: 0, hit: 0.5, windScore: 0 };
            var fire = chargeCount(player, "huo");
            if (!target || target.side == player.side || !fire || target.countCards("h") >= target.getHandcardLimit()) return result;
            baseDamage = Math.max(1, baseDamage || 2);
            var hit = helper.likelyHit(player, target, card || { name: "anMie", xiBie: "an" });
            var plainHit = helper.damagePressure(target, player, baseDamage);
            var firstHit = helper.damagePressure(target, player, baseDamage + 1);
            var missDamage = helper.damagePressure(target, player, 3);
            var firstGain = Math.max(0, firstHit - plainHit);
            var second = false;
            var secondGain = 0;
            if (fire >= 2) {
                var secondHit = helper.damagePressure(target, player, baseDamage + 2);
                secondGain = Math.max(0, secondHit - firstHit);
                second = secondGain >= 0.65 || helper.overflowAfterDamage(target, baseDamage + 2) > helper.overflowAfterDamage(target, baseDamage + 1);
            }
            var fireHit = firstHit + (second ? secondGain : 0);
            var fireCost = 0.28 + (second ? hit * 0.28 : 0);
            var fireTotal = hit * fireHit + (1 - hit) * missDamage - fireCost;
            var wind = windChainPlan(player, target);
            var plainWithWind = hit * plainHit + wind.score;
            var skillGain = hit * firstGain + (1 - hit) * missDamage - 0.28;
            result.use = skillGain >= 0.55 && fireTotal + 0.15 >= plainWithWind;
            result.score = fireTotal;
            result.advantage = fireTotal - plainWithWind;
            result.second = second;
            result.secondGain = secondGain;
            result.hit = hit;
            result.windScore = wind.score;
            return result;
        }

        function bestFireOpportunity(player) {
            var best = null;
            if (!player.canGongJi() || helper.countUsableCards(player, "gongJi") <= 0) return null;
            var cards = player.getCards("h", function (card) { return get.type(card) == "gongJi"; });
            for (var i = 0; i < cards.length; i++) {
                for (var j = 0; j < game.players.length; j++) {
                    var target = game.players[j];
                    if (!target || target.side == player.side || target.countCards("h") >= target.getHandcardLimit()) continue;
                    var legal = false;
                    try { legal = player.canUse(cards[i], target); } catch (e) { }
                    if (!legal) continue;
                    var plan = fireRoutePlan(player, target, cards[i], 2);
                    if (plan.use && (!best || plan.score > best.score)) best = { card: cards[i], target: target, score: plan.score };
                }
            }
            return best;
        }

        helper.moGongChargeCardScore = function (player, card) {
            var suit = get.xiBie(card);
            var value = get.value(card, player);
            var selected = ui.selected && ui.selected.cards ? ui.selected.cards : [];
            var selectedSuit = selected.filter(function (current) { return get.xiBie(current) == suit; }).length;
            if (!["huo", "lei", "feng"].includes(suit)) return -4 - value;
            var priority = 5;
            if (suit == "lei") {
                var now = chargeCount(player, "lei") + selectedSuit;
                priority = !scatterPlan(player, now) && scatterPlan(player, now + 1) ? 14 : 8 + Math.min(2, now * 0.5);
            } else if (suit == "huo") {
                var hasTarget = game.hasPlayer(function (target) {
                    return target.side != player.side && target.countCards("h") < target.getHandcardLimit();
                });
                priority = player.canGongJi() && hasTarget ? (chargeCount(player, "huo") + selectedSuit < 2 ? 11 : 8) : 6;
            } else if (suit == "feng") {
                var enemies = game.countPlayer(function (target) { return target.side != player.side; });
                priority = player.canGongJi() && enemies >= 2 ? 11 + Math.min(2, (chargeCount(player, "feng") + selectedSuit) * 0.35) : 7;
            }
            return priority - value * 0.55;
        };

        var pierce = lib.skill && lib.skill.moGuanChongJi;
        if (pierce && markPatched(pierce, "fullActionChain")) {
            if (!pierce.ai) pierce.ai = {};
            if (!pierce.ai.effect) pierce.ai.effect = {};
            pierce.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side || target.countCards("h") >= target.getHandcardLimit()) return;
                var plan = fireRoutePlan(player, target, card, 2);
                if (!plan.use) return;
                var bonus = Math.max(0.8, Math.min(4, plan.advantage));
                return [1, 0, 1, -bonus];
            };
            pierce.cost = async function (event, trigger, player) {
                var target = attackTarget(trigger);
                var plan = fireRoutePlan(player, target, trigger.card, trigger.damageNum || 2);
                var use = !!plan.use;
                var cards = player.getGaiPai("chongNengPai");
                var result = await player.chooseCardButton(cards, "是否发动【魔贯冲击】，移除1张火系【充能】[展示]")
                    .set("filterButton", function (button) { return get.xiBie(button.link) == "huo"; })
                    .set("use", use).set("ai", function (button) {
                        if (!_status.event.use || get.xiBie(button.link) != "huo") return 0;
                        return 10 - get.value(button.link);
                    }).forResult();
                event.result = { bool: !!(result.bool && result.links && result.links.length), cost_data: result.links || [] };
            };

            var hitSkill = pierce.subSkill && pierce.subSkill.mingZhong;
            if (hitSkill) hitSkill.cost = async function (event, trigger, player) {
                var target = attackTarget(trigger);
                var base = trigger.damageNum || 3;
                var before = target ? helper.damagePressure(target, player, base) : 0;
                var after = target ? helper.damagePressure(target, player, base + 1) : 0;
                var gain = after - before;
                var overflowGain = target ? helper.overflowAfterDamage(target, base + 1) - helper.overflowAfterDamage(target, base) : 0;
                var lethal = target && overflowGain > 0 && overflowGain >= get.shiQi(!player.side);
                var use = !!target && target.side != player.side && (lethal || overflowGain > 0 || gain >= 0.65);
                var result = await player.chooseCardButton(player.getGaiPai("chongNengPai"), "是否继续发动【魔贯冲击】，移除1张火系【充能】[展示]")
                    .set("filterButton", function (button) { return get.xiBie(button.link) == "huo"; })
                    .set("use", use).set("ai", function (button) {
                        if (!_status.event.use || get.xiBie(button.link) != "huo") return 0;
                        return 10 - get.value(button.link);
                    }).forResult();
                event.result = { bool: !!(result.bool && result.links && result.links.length), cost_data: result.links || [] };
            };
        }

        var scatter = lib.skill && lib.skill.leiGuangSanShe;
        if (scatter && scatter.chooseButton && markPatched(scatter, "fullActionChain")) {
            scatter.chooseButton.check = function (button) {
                if (get.xiBie(button.link) != "lei") return 0;
                var player = _status.event.player;
                var plan = scatterPlan(player);
                if (!plan) return 0;
                var selected = ui.selected.buttons.length;
                return selected < plan.spend ? 9 - selected : 0;
            };
            scatter.ai.order = function (item, player) {
                var plan = scatterPlan(player);
                return plan ? 5.8 + Math.min(2, plan.moraleLoss * 0.5) : 0;
            };
            scatter.ai.result = {
                player: function (player) {
                    var plan = scatterPlan(player);
                    return plan ? 2 + plan.moraleLoss : 0;
                }
            };
            var oldScatterBackup = scatter.chooseButton.backup;
            scatter.chooseButton.backup = function (links, player) {
                var backup = oldScatterBackup.apply(this, arguments);
                backup.contentBefore = function () {
                    var helper = lib.xingBeiShiZhouNianAi;
                    "step 0"
                    event.links = lib.skill.leiGuangSanShe_backup.links;
                    player.discard(event.links, "chongNengPai").set("showHiddenCards", true);
                    for (var i = 0; i < targets.length; i++) targets[i].storage.leiGuangSanShe = 1;
                    "step 1"
                    event.num = event.links.length - 1;
                    if (event.num <= 0) {
                        event.finish();
                        return;
                    }
                    player.chooseTarget("对其造成的伤害额外+" + event.num, true, function (card, player, target) {
                        return target.side != player.side;
                    }).set("amount", event.num + 1).set("ai", function (target) {
                        var baseLoss = helper.overflowAfterDamage(target, 1);
                        var boostedLoss = helper.overflowAfterDamage(target, _status.event.amount);
                        return (boostedLoss - baseLoss) * 12 + helper.damagePressure(target, _status.event.player, _status.event.amount);
                    });
                    "step 2"
                    if (result.bool && result.targets && result.targets.length) {
                        game.log(player, "选择了", result.targets[0], "伤害额外+" + event.num);
                        result.targets[0].storage.leiGuangSanShe += event.num;
                    }
                };
                return backup;
            };
        }

        var multi = lib.skill && lib.skill.duoChongSheJi;
        if (multi && markPatched(multi, "fullActionChain")) {
            if (!multi.ai) multi.ai = {};
            if (!multi.ai.effect) multi.ai.effect = {};
            multi.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side || chargeCount(player, "feng") <= 0) return;
                var plan = windChainPlan(player, target);
                if (!plan.spend || plan.score < 1.1) return;
                return [1, 0, 1, -Math.min(4, 0.6 + plan.score * 0.35)];
            };
            multi.cost = async function (event, trigger, player) {
                var original = trigger.oriTarget || trigger.target;
                var plan = windChainPlan(player, original);
                var nextTarget = plan.sequence.length ? plan.sequence[0] : null;
                var use = !!nextTarget && (plan.moraleLoss > 0 || plan.score >= 1.1);
                var result = await player.chooseCardButton(player.getGaiPai("chongNengPai"), "是否发动【多重射击】")
                    .set("filterButton", function (button) { return get.xiBie(button.link) == "feng"; })
                    .set("use", !!use).set("ai", function (button) {
                        if (!_status.event.use || get.xiBie(button.link) != "feng") return 0;
                        return 10 - get.value(button.link);
                    }).forResult();
                if (result.bool && result.links && result.links.length && nextTarget) {
                    player.storage._shiZhouNianAiMoGongWindTarget = nextTarget;
                }
                event.result = { bool: !!(result.bool && result.links && result.links.length), cost_data: result.links || [] };
            };
        }

        var charge = lib.skill && lib.skill.chongNeng;
        if (charge && markPatched(charge, "fullActionChain")) {
            charge.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                if (player.getHandcardLimit() < 4) return false;
                if (player.canFaShu() && scatterPlan(player)) return false;
                if (bestFireOpportunity(player)) return false;
                var stock = chargeCount(player);
                if (stock >= 8) return false;
                var usefulHand = player.countCards("h", function (card) {
                    return ["huo", "lei", "feng"].includes(get.xiBie(card));
                });
                var windSetup = player.canGongJi() && game.countPlayer(function (target) {
                    return target.side != player.side;
                }) >= 2 && player.countCards("h", function (card) { return get.xiBie(card) == "feng"; }) > 0;
                return stock <= 3 || usefulHand >= 2 || windSetup || (!player.canGongJi() && !player.canFaShu());
            };
            charge.content = function () {
                "step 0"
                player.removeBiShaShuiJing();
                "step 1"
                if (player.countCards("h") > 4) player.chooseToDiscard(true, player.countCards("h") - 4);
                "step 2"
                player.chooseDraw(4, true);
                "step 3"
                event.num = result.control;
                if (event.num == 0) event.goto(6);
                "step 4"
                player.chooseCard("h", [1, event.num]).set("prompt", "将至多" + event.num + "张手牌作为充能").set("ai", function (card) {
                    var player = _status.event.player;
                    if (ui.selected.cards.length + 1 >= player.countCards("h")) return 0;
                    if (ui.selected.cards.length >= Math.max(0, 8 - player.getGaiPai("chongNengPai").length)) return 0;
                    var helper = lib.xingBeiShiZhouNianAi;
                    if (helper && typeof helper.moGongChargeCardScore == "function") return helper.moGongChargeCardScore(player, card);
                    return -get.value(card, player);
                });
                "step 5"
                if (result.bool && result.cards && result.cards.length) player.addGaiPai("chongNengPai", result.cards);
                "step 6"
                trigger.moGuanChongJi = false;
                trigger.leiGuangSanShe = false;
            };
        }

        var eye = lib.skill && lib.skill.moYan;
        if (eye && markPatched(eye, "fullActionChain")) {
            eye.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                var drawSafe = !helper.wouldOverflow(player, 3, 0);
                var discardTarget = game.hasPlayer(function (target) {
                    return target.countCards("h") > 0 && target.side == player.side && target.countCards("h") >= target.getHandcardLimit();
                });
                var usefulStock = chargeCount(player, "huo") + chargeCount(player, "lei") + chargeCount(player, "feng");
                var canSelfCycle = player.countCards("h") >= 2;
                return drawSafe && (player.countCards("h") <= 2 || usefulStock <= 2) || discardTarget || usefulStock <= 2 && canSelfCycle;
            };
        }
    }

    function patchYingLingRenXingActionChain(helper) {
        function cardGroups(player, excludedCard) {
            var same = {};
            var suits = {};
            var excludedCards = Array.isArray(excludedCard) ? excludedCard : excludedCard && Array.isArray(excludedCard.cards) ? excludedCard.cards : [];
            player.getCards("h").forEach(function (card) {
                if (card == excludedCard || excludedCards.includes(card)) return;
                var suit = get.xiBie(card);
                if (!suit) return;
                if (!same[suit]) same[suit] = [];
                same[suit].push(card);
                suits[suit] = true;
            });
            var differentCards = [];
            Object.keys(same).forEach(function (suit) {
                same[suit].sort(function (a, b) { return get.value(a, player) - get.value(b, player); });
                differentCards.push(same[suit][0]);
            });
            differentCards.sort(function (a, b) { return get.value(a, player) - get.value(b, player); });
            return { same: same, different: differentCards.length, differentCards: differentCards };
        }

        function discardCost(cards, player) {
            var score = 0;
            (cards || []).forEach(function (card) {
                score += Math.max(0.15, get.value(card, player) * 0.055);
            });
            return score;
        }

        function sameRoute(groups, target, player, war, horizontal, baseDamage) {
            var result = { score: -Infinity, count: 0, extra: 0, suit: null };
            if (war < 1) return result;
            var basePressure = helper.damagePressure(target, player, baseDamage);
            Object.keys(groups.same).forEach(function (suit) {
                var cards = groups.same[suit];
                if (cards.length < 2) return;
                for (var count = 2; count <= cards.length; count++) {
                    var chosen = cards.slice(0, count);
                    var maxExtra = horizontal ? war - 1 : 0;
                    for (var extra = 0; extra <= maxExtra; extra++) {
                        var damage = baseDamage + count - 1 + extra;
                        var score = helper.damagePressure(target, player, damage) - basePressure - discardCost(chosen, player) - extra * 0.18;
                        if (score > result.score) result = { score: score, count: count, extra: extra, suit: suit, cards: chosen };
                    }
                }
            });
            return result;
        }

        function differentRoute(groups, target, player, magic, horizontal) {
            var result = { score: -Infinity, count: 0, extra: 0 };
            if (magic < 1 || groups.differentCards.length < 2) return result;
            for (var count = 2; count <= groups.differentCards.length; count++) {
                var chosen = groups.differentCards.slice(0, count);
                var maxExtra = horizontal ? magic - 1 : 0;
                for (var extra = 0; extra <= maxExtra; extra++) {
                    var damage = count - 1 + extra;
                    var score = helper.damagePressure(target, player, damage) - discardCost(chosen, player) - extra * 0.18;
                    if (score > result.score) result = { score: score, count: count, extra: extra, cards: chosen };
                }
            }
            return result;
        }

        function noMoraleDamagePressure(target, player, amount) {
            amount = Math.max(0, amount || 0);
            var treatment = Math.min(amount, Math.max(0, target.zhiLiao || 0));
            var actual = Math.max(0, amount - treatment);
            var room = Math.max(0, target.getHandcardLimit() - target.countCards("h"));
            var safeDraw = Math.min(actual, room);
            var forcedDiscard = Math.max(0, actual - room);
            return amount * 0.18 + treatment * 1.15 + forcedDiscard * 0.38 - safeDraw * 0.42;
        }

        helper.yingLingRunePlan = function (player, chooseAllocation, forcedCard, forcedTarget) {
            var best = { score: -Infinity, bonus: 0, war: player.countZhiShiWu("zhanWen"), card: null, target: null };
            var cards = forcedCard ? [forcedCard] : player.getCards("h").filter(function (card) {
                if (get.type(card) != "gongJi") return false;
                try { return player.hasUseTargetXingBei(card); } catch (e) { return true; }
            });
            var targets = forcedTarget ? [forcedTarget] : game.filterPlayer(function (target) { return target.side != player.side; });
            var warChoices = chooseAllocation ? [0, 1, 2, 3] : [player.countZhiShiWu("zhanWen")];
            for (var i = 0; i < cards.length; i++) {
                var card = cards[i];
                for (var j = 0; j < targets.length; j++) {
                    var target = targets[j];
                    if (!target || target.side == player.side) continue;
                    try { if (typeof player.canUse == "function" && !player.canUse(card, target)) continue; } catch (e) { }
                    var groups = cardGroups(player, card);
                    var hit = helper.likelyHit(player, target, card);
                    var baseDamage = 2;
                    var baseScore = helper.damagePressure(target, player, baseDamage) * hit;
                    for (var k = 0; k < warChoices.length; k++) {
                        var war = warChoices[k];
                        var magic = chooseAllocation ? 3 - war : player.countZhiShiWu("moWen");
                        var horizontal = chooseAllocation || player.isHengZhi();
                        var hitPlan = sameRoute(groups, target, player, war, horizontal, baseDamage);
                        var missPlan = differentRoute(groups, target, player, magic, horizontal);
                        var hitGain = Math.max(0, hitPlan.score);
                        var suppressGain = war > 0 && (magic == 0 || missPlan.score <= 0.25) ? 0.32 : 0;
                        var missGain = Math.max(suppressGain, Math.max(0, missPlan.score));
                        var bonus = hit * hitGain + (1 - hit) * missGain;
                        var score = baseScore + bonus;
                        if (score > best.score) {
                            best = { score: score, bonus: bonus, war: war, magic: magic, card: card, target: target, hit: hit, hitPlan: hitPlan, missPlan: missPlan, suppress: suppressGain >= Math.max(0, missPlan.score) };
                        }
                    }
                }
            }
            return best;
        };

        helper.yingLingShouldRebuild = function (player) {
            var current = helper.yingLingRunePlan(player, false);
            var burst = helper.yingLingRunePlan(player, true);
            if (!burst || !burst.card || !burst.target || burst.bonus < 1.4) return false;

            var currentScore = current && current.card ? current.score : 0;
            var currentBonus = current && current.card ? current.bonus : 0;
            var scoreGain = burst.score - currentScore;
            var bonusGain = burst.bonus - currentBonus;

            function branchDamage(plan, hitBranch) {
                if (!plan || !plan.card) return 0;
                if (hitBranch) {
                    var hitPlan = plan.hitPlan || {};
                    return 2 + Math.max(0, (hitPlan.count || 0) - 1) + Math.max(0, hitPlan.extra || 0);
                }
                var missPlan = plan.missPlan || {};
                return Math.max(0, (missPlan.count || 0) - 1) + Math.max(0, missPlan.extra || 0);
            }

            function expectedDamage(plan) {
                if (!plan || !plan.card) return 0;
                return plan.hit * branchDamage(plan, true) + (1 - plan.hit) * branchDamage(plan, false);
            }

            function expectedOverflow(plan) {
                if (!plan || !plan.card || !plan.target) return 0;
                return plan.hit * helper.overflowAfterDamage(plan.target, branchDamage(plan, true)) +
                    (1 - plan.hit) * helper.overflowAfterDamage(plan.target, branchDamage(plan, false));
            }

            var damageGain = expectedDamage(burst) - expectedDamage(current);
            var overflowGain = expectedOverflow(burst) - expectedOverflow(current);
            var burstOverflow = expectedOverflow(burst);
            var decisivePressure = burstOverflow > 0 && get.shiQi(!player.side) <= Math.ceil(burstOverflow);

            // 【宝石】只换取显著的连段提升：明显增加综合收益、预计伤害，或制造关键爆牌。
            if (scoreGain >= 1.15 && bonusGain >= 0.7) return true;
            if (damageGain >= 1.35 && bonusGain >= 0.55) return true;
            if (overflowGain >= 0.65 && bonusGain >= 0.45) return true;
            return decisivePressure && scoreGain >= 0.65 && bonusGain >= 0.4;
        };

        var mastery = lib.skill && lib.skill.zhanWenZhangWo;
        if (mastery && markPatched(mastery, "fullActionChain")) {
            if (!mastery.ai) mastery.ai = {};
            if (!mastery.ai.effect) mastery.ai.effect = {};
            mastery.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side) return;
                var plan = helper.yingLingRunePlan(player, false, card, target);
                var bonus = plan && plan.card ? plan.bonus : 0;
                if (bonus > 0.2) return [1, 0, 1, -Math.min(2.4, bonus)];
            };
        }

        var suppress = lib.skill && lib.skill.nuHuoYaZhi;
        if (suppress && markPatched(suppress, "fullActionChain")) {
            suppress.check = function (event, player) {
                var magic = player.countZhiShiWu("moWen");
                var fusionPlan = differentRoute(cardGroups(player), event.player, player, magic, player.isHengZhi());
                if (magic > 0 && fusionPlan.score > 0) return false;
                var war = player.countZhiShiWu("zhanWen");
                return war > 1 || magic == 0;
            };
        }

        var shatter = lib.skill && lib.skill.zhanWenSuiJi;
        if (shatter && markPatched(shatter, "fullActionChain")) {
            shatter.cost = async function (event, trigger, player) {
                var target = trigger.target;
                var plan = sameRoute(cardGroups(player), target, player, player.countZhiShiWu("zhanWen"), player.isHengZhi(), trigger.damageNum || 2);
                var bestSuit = plan.score > 0 ? plan.suit : null;
                var desired = plan.score > 0 ? plan.count : 0;
                var result = await player.chooseCard("h", [2, Infinity], function (card) { return get.xuanZeTongXiPai(card); })
                    .set("complexCard", true).set("prompt", get.prompt("zhanWenSuiJi")).set("prompt2", lib.translate.zhanWenSuiJi_info)
                    .set("bestSuit", bestSuit).set("desired", desired).set("ai", function (card) {
                        if (!_status.event.bestSuit || get.xiBie(card) != _status.event.bestSuit || ui.selected.cards.length >= _status.event.desired) return 0;
                        return 10 - get.value(card);
                    }).forResult();
                event.result = result;
            };
            shatter.content = async function (event, trigger, player) {
                var baseBonus = event.cards.length - 1;
                var extra = 0;
                if (player.isHengZhi() && player.countZhiShiWu("zhanWen") > 1) {
                    var max = player.countZhiShiWu("zhanWen") - 1;
                    var remaining = cardGroups(player, event.cards);
                    var hasNextShatter = helper.countUsableCards(player, "gongJi") > 0 && Object.keys(remaining.same).some(function (suit) { return remaining.same[suit].length >= 2; });
                    var aiMax = Math.max(0, max - (hasNextShatter ? 1 : 0));
                    var list = [];
                    for (var index = 0; index <= max; index++) list.push(index);
                    var bestScore = helper.damagePressure(trigger.target, player, (trigger.damageNum || 2) + baseBonus);
                    for (var amount = 1; amount <= aiMax; amount++) {
                        var score = helper.damagePressure(trigger.target, player, (trigger.damageNum || 2) + baseBonus + amount) - amount * 0.4;
                        if (score > bestScore + 0.35) { bestScore = score; extra = amount; }
                    }
                    extra = await player.chooseControl(list)
                        .set("choice", extra).set("ai", function () { return _status.event.choice; }).forResultControl();
                }
                await lib.skill.zhanWenZhangWo.fanZhuanZhanWen(player, 1 + Number(extra || 0));
                await player.discard(event.cards).set("showCards", true);
                trigger.changeDamageNum(baseBonus + Number(extra || 0));
            };
        }

        var fusion = lib.skill && lib.skill.moWenRongHe;
        if (fusion && markPatched(fusion, "fullActionChain")) {
            fusion.cost = async function (event, trigger, player) {
                var plan = differentRoute(cardGroups(player), trigger.player, player, player.countZhiShiWu("moWen"), player.isHengZhi());
                var selected = plan.score > 0 ? plan.cards : [];
                var result = await player.chooseCard("h", [2, Infinity], function (card) { return get.xuanZeYiXiPai(card); })
                    .set("complexCard", true).set("prompt", get.prompt("moWenRongHe")).set("prompt2", lib.translate.moWenRongHe_info)
                    .set("selectedPlan", selected).set("ai", function (card) {
                        return _status.event.selectedPlan.includes(card) ? 10 - get.value(card) : 0;
                    }).forResult();
                event.result = result;
            };
            fusion.content = async function (event, trigger, player) {
                var baseDamage = event.cards.length - 1;
                var extra = 0;
                if (player.isHengZhi() && player.countZhiShiWu("moWen") > 1) {
                    var max = player.countZhiShiWu("moWen") - 1;
                    var remaining = cardGroups(player, event.cards);
                    var hasNextFusion = helper.countUsableCards(player, "gongJi") > 0 && remaining.different >= 2;
                    var aiMax = Math.max(0, max - (hasNextFusion ? 1 : 0));
                    var list = [];
                    for (var index = 0; index <= max; index++) list.push(index);
                    var bestScore = helper.damagePressure(trigger.player, player, baseDamage);
                    for (var amount = 1; amount <= aiMax; amount++) {
                        var score = helper.damagePressure(trigger.player, player, baseDamage + amount) - amount * 0.4;
                        if (score > bestScore + 0.35) { bestScore = score; extra = amount; }
                    }
                    extra = await player.chooseControl(list)
                        .set("choice", extra).set("ai", function () { return _status.event.choice; }).forResultControl();
                }
                trigger.nuHuoYaZhi = false;
                await lib.skill.zhanWenZhangWo.fanZhuanMoWen(player, 1 + Number(extra || 0));
                await player.discard(event.cards).set("showCards", true);
                await trigger.player.faShuDamage(baseDamage + Number(extra || 0), player);
            };
        }

        var rebuild = lib.skill && lib.skill.fuWenGaiZao;
        if (rebuild && markPatched(rebuild, "fullActionChain")) {
            rebuild.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player) || helper.signedHandRoom(player) < 0 || !player.canGongJi()) return false;
                return helper.yingLingShouldRebuild(player);
            };
        }

        var echo = lib.skill && lib.skill.shuangChongHuiXiang;
        if (echo && markPatched(echo, "fullActionChain")) {
            echo.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                // AI仅在拥有真实【水晶】时考虑发动，不以【宝石】代替支付。
                if (!player.hasNengLiang("shuiJing")) return false;
                var amount = Math.min(3, Math.max(0, event.num || 0));
                var plan = helper.bestEnemy(player, function (target) {
                    return noMoraleDamagePressure(target, player, amount);
                }, function (target) { return target != event.player; });
                return amount > 0 && !!plan.target && (plan.score >= 2 || amount >= 3 && plan.score >= 1.45);
            };
            echo.content = async function (event, trigger, player) {
                await player.removeBiShaShuiJing();
                var amount = Math.min(3, Math.max(0, trigger.num || 0));
                var targets = await player.chooseTarget("对另一名目标角色造成" + amount + "点法术伤害", true, function (card, player, target) {
                    return target != _status.event.excludedTarget;
                }).set("excludedTarget", trigger.player).set("amount", amount).set("ai", function (target) {
                    var player = _status.event.player;
                    if (target.side == player.side) return -10;
                    return noMoraleDamagePressure(target, player, _status.event.amount);
                }).forResultTargets();
                if (targets && targets.length) await targets[0].faShuDamage(amount, player).set("shiQiXiaJiang", false);
            };
        }
    }

    function patchYongZheActionChain(helper) {
        function reserveFireForForbiddenPower(player, card) {
            return !!(player && card && player.hasSkill("yongZheZhiXin") && get.type(card) == "gongJi" &&
                get.xiBie(card) == "huo" && (player.hasNengLiang("baoShi") || player.hasNengLiang("shuiJing")));
        }

        function rawAttackCards(player) {
            return player.getCards("h", function (card) {
                return get.type(card) == "gongJi" && !reserveFireForForbiddenPower(player, card);
            });
        }

        function attackDamage(card, event) {
            if (event && typeof event.damageNum == "number") return event.damageNum;
            var info = card && get.info(card, false);
            return info && typeof info.damageNum == "number" ? info.damageNum : 2;
        }

        function hitWithoutResponse(player, target, card, event) {
            if (!target || !card) return 0.5;
            if (get.xiBie(card) == "an" || event && event.canYingZhan === false) return helper.likelyHit(player, target, card);
            var defenses = (event && event.canShengGuang === false ? 0 : helper.holyLightCount(target)) +
                (event && event.canShengDun === false ? 0 : helper.shieldCount(target));
            if (defenses <= 0) return 0.93;
            if (defenses == 1) return 0.5;
            if (defenses == 2) return 0.25;
            return 0.12;
        }

        function handResourcePlan(player, hit) {
            var cards = player.getCards("h");
            var fire = 0;
            var water = 0;
            var spells = 0;
            var discardCost = 0;
            cards.forEach(function (card) {
                if (get.xiBie(card) == "huo") fire++;
                if (get.xiBie(card) == "shui") water++;
                if (get.type(card) == "faShu") spells++;
                discardCost += Math.max(0.12, get.value(card, player) * 0.105);
            });
            var rageGain = Math.min(spells, Math.max(0, 4 - player.countZhiShiWu("nuQi")));
            var wisdomGain = hit ? 0 : Math.min(water, Math.max(0, 4 - player.countZhiShiWu("zhiXing")));
            return {
                cards: cards,
                fire: fire,
                water: water,
                spells: spells,
                rageGain: rageGain,
                wisdomGain: wisdomGain,
                discardCost: discardCost
            };
        }

        function enemyAttackPressure(player, target, card, damage, hit) {
            if (!target || target.side == player.side) return 0;
            damage = Math.max(0, damage || attackDamage(card));
            hit = typeof hit == "number" ? hit : helper.likelyHit(player, target, card);
            var pressure = Math.max(0, helper.damagePressure(target, player, damage));
            var overflow = helper.overflowAfterDamage(target, damage);
            var hand = target.countCards("h");
            var limit = target.getHandcardLimit();
            var score = Math.min(3.2, pressure * 0.22) * (0.55 + hit * 0.45);
            if (overflow > 0) score += 1.1 + Math.min(2, overflow) * 0.55;
            else if (hand >= limit) score += 0.75;
            else if (hand == limit - 1) score += 0.35;
            var enemyMorale = get.shiQi(!player.side);
            if (enemyMorale <= 5) score += 0.25;
            if (overflow >= enemyMorale && enemyMorale > 0) score += 4;
            return score;
        }

        // 勇者的基础策略是主动把【怒气】和【知性】转成攻击压力，而不是长期囤满资源。
        // 这里同时提高攻击牌行动顺序和高压目标权重；具体技能仍各自检查费用与自伤风险。
        var braveHeart = lib.skill && lib.skill.yongZheZhiXin;
        if (braveHeart && markPatched(braveHeart, "aggressiveActionChain")) {
            if (!braveHeart.mod) braveHeart.mod = {};
            var oldBraveOrder = braveHeart.mod.aiOrder;
            braveHeart.mod.aiOrder = function (player, card, num) {
                if (typeof oldBraveOrder == "function") {
                    var oldResult = oldBraveOrder.apply(this, arguments);
                    if (typeof oldResult == "number") num = oldResult;
                }
                if (!card || get.type(card) != "gongJi") return num;
                if (reserveFireForForbiddenPower(player, card)) return 0;
                var bonus = 0.45;
                var rage = player.countZhiShiWu("nuQi");
                var wisdom = player.countZhiShiWu("zhiXing");
                if (rage > 0) bonus += 0.45 + Math.max(0, rage - 1) * 0.18;
                if (wisdom >= 4) bonus += 0.4;
                if (game.hasPlayer(function (target) {
                    return target.side != player.side && target.countCards("h") >= target.getHandcardLimit() - 1;
                })) bonus += 0.5;
                return num + bonus;
            };
            if (!braveHeart.ai) braveHeart.ai = {};
            if (!braveHeart.ai.effect) braveHeart.ai.effect = {};
            braveHeart.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side) return;
                if (reserveFireForForbiddenPower(player, card)) return [0, -50, 0, 0];
                var hit = helper.likelyHit(player, target, card);
                var damage = attackDamage(card);
                if (player.hasZhiShiWu("nuQi")) damage += 2;
                if (player.countZhiShiWu("zhiXing") >= 4 && helper.responseCount(target, card) > 0 && get.xiBie(card) != "an") {
                    hit = Math.max(hit, hitWithoutResponse(player, target, card, _status.event));
                }
                var bonus = 0.35 + enemyAttackPressure(player, target, card, damage, hit);
                if (player.countZhiShiWu("nuQi") >= 3) bonus += 0.45;
                if (player.countZhiShiWu("zhiXing") >= 4) bonus += 0.3;
                return [1, 0, 1, -Math.min(7, bonus)];
            };
        }

        var roar = lib.skill && lib.skill.nuHou;
        if (roar && markPatched(roar, "fullActionChain")) {
            if (!roar.ai) roar.ai = {};
            if (!roar.ai.effect) roar.ai.effect = {};
            roar.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side || !player.hasZhiShiWu("nuQi")) return;
                var hit = helper.likelyHit(player, target, card);
                if (player.countZhiShiWu("zhiXing") >= 4 && helper.responseCount(target, card) > 0 && get.xiBie(card) != "an") {
                    hit = Math.max(hit, hitWithoutResponse(player, target, card, _status.event));
                }
                var damage = attackDamage(card) + 2;
                var pressure = enemyAttackPressure(player, target, card, damage, hit);
                return [1, 0, 1, -Math.min(7, 1.65 + pressure)];
            };
            roar.check = function (event, player) {
                var target = event.target || (event.targets && event.targets[0]);
                if (!target || target.side == player.side) return false;
                var base = event.damageNum || 2;
                var hit = helper.likelyHit(player, target, event.card);
                if (player.countZhiShiWu("zhiXing") >= 4 && helper.responseCount(target, event.card) > 0 && get.xiBie(event.card) != "an") {
                    hit = Math.max(hit, hitWithoutResponse(player, target, event.card, event));
                }
                var before = helper.damagePressure(target, player, base);
                var after = helper.damagePressure(target, player, base + 2);
                var rage = player.countZhiShiWu("nuQi");
                var wisdomValue = player.countZhiShiWu("zhiXing") < 4 ? 0.65 : 0;
                var drawSafe = helper.handRoom(player) > 0 ? 0.35 : 0;
                var aggression = rage >= 3 ? 0.55 : rage >= 2 ? 0.3 : 0;
                if (get.shiQi(!player.side) <= 5) aggression += 0.2;
                var rageReserve = rage <= 1 && !rawAttackCards(player).length ? 0.25 : 0;
                return (after - before) * hit + wisdomValue * (1 - hit) + drawSafe + aggression - rageReserve >= 0.65 ||
                    helper.overflowAfterDamage(target, base + 2) > helper.overflowAfterDamage(target, base) ||
                    rage >= 2 && hit >= 0.45 || get.shiQi(!player.side) <= 4 && hit >= 0.35;
            };
        }

        var stillWater = lib.skill && lib.skill.mingJingZhiShui;
        if (stillWater && markPatched(stillWater, "fullActionChain")) {
            if (!stillWater.ai) stillWater.ai = {};
            if (!stillWater.ai.effect) stillWater.ai.effect = {};
            stillWater.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side || player.countZhiShiWu("zhiXing") < 4) return;
                var hit = helper.likelyHit(player, target, card);
                if (hit >= 0.82) return;
                var damage = attackDamage(card) + (player.hasZhiShiWu("nuQi") ? 2 : 0);
                var improved = hitWithoutResponse(player, target, card, _status.event);
                var pressure = enemyAttackPressure(player, target, card, damage, improved);
                return [1, 0, 1, -Math.min(7, 1.75 + pressure)];
            };
            stillWater.check = function (event, player) {
                var target = event.target || (event.targets && event.targets[0]);
                if (!target || target.side == player.side) return false;
                if (event.canYingZhan === false || get.xiBie(event.card) == "an" || helper.responseCount(target, event.card) <= 0) return false;
                var normalHit = helper.likelyHit(player, target, event.card);
                var improvedHit = hitWithoutResponse(player, target, event.card, event);
                var damage = attackDamage(event.card, event) + (player.hasZhiShiWu("nuQi") ? 2 : 0);
                var pressure = helper.damagePressure(target, player, damage);
                var hitGain = Math.max(0, improvedHit - normalHit) * pressure;
                var crystalValue = 0.95;
                var fullResourceBonus = player.countZhiShiWu("zhiXing") >= 4 ? 0.35 : 0;
                return improvedHit > normalHit && (hitGain + crystalValue + fullResourceBonus >= 0.75 ||
                    helper.overflowAfterDamage(target, damage) > 0 && improvedHit >= 0.45 ||
                    get.shiQi(!player.side) <= 5 && improvedHit >= 0.4);
            };
        }

        var taunt = lib.skill && lib.skill.tiaoXin;
        if (taunt && markPatched(taunt, "fullActionChain")) {
            taunt.ai.order = function (item, player) {
                var attacks = rawAttackCards(player).length;
                return attacks > 0 ? 1.35 : 4.6;
            };
            taunt.ai.result.target = function (player, target) {
                if (target.side == player.side) return 100;
                var attacks = rawAttackCards(target);
                var score = 1.1;
                if (!attacks.length) score += 3.3;
                else {
                    var bestAttack = 0;
                    attacks.forEach(function (card) {
                        var hit = helper.likelyHit(target, player, card);
                        bestAttack = Math.max(bestAttack, hit * attackDamage(card));
                    });
                    // 有攻击牌时，【挑衅】仍能封锁法术/特殊行动并保护其他队友，
                    // 但勇者自身面临爆牌时不主动吸收高质量攻击。
                    score += Math.max(0, 1.8 - bestAttack * 0.55);
                    score -= helper.overflowAfterDamage(player, 2) * 1.7;
                }
                if (target.countCards("h") >= target.getHandcardLimit()) score += 0.7;
                return -score;
            };
        }

        var forbidden = lib.skill && lib.skill.jinDuanZhiLi;
        if (forbidden && forbidden.subSkill && markPatched(forbidden, "fullActionChain")) {
            if (forbidden.subSkill.mingZhong) forbidden.subSkill.mingZhong.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                var plan = handResourcePlan(player, true);
                if (!plan.cards.length) return false;
                var target = event.target || (event.targets && event.targets[0]);
                var base = attackDamage(event.card, event);
                var gain = target ? helper.damagePressure(target, player, base + plan.fire) - helper.damagePressure(target, player, base) : 0;
                var immediateRisk = helper.selfDamageRisk(player, plan.fire, plan.cards.length);
                var delayedRisk = helper.selfDamageRisk(player, 3, plan.cards.length) * 0.35;
                var resourceValue = plan.rageGain * 0.68;
                var lowValueDensity = plan.cards.length ? Math.max(0, 1.8 - plan.discardCost / plan.cards.length) : 0;
                var energyCost = player.hasNengLiang("shuiJing") ? 0.7 : 1.35;
                var offensiveBonus = plan.fire > 0 ? Math.min(0.75, plan.fire * 0.25) : 0;
                if (target && target.countCards("h") >= target.getHandcardLimit() - 1) offensiveBonus += 0.45;
                if (player.countCards("h") >= player.getHandcardLimit()) offensiveBonus += 0.35;
                var score = gain + resourceValue + lowValueDensity + offensiveBonus - plan.discardCost - immediateRisk - delayedRisk - energyCost;
                if (target && helper.overflowAfterDamage(target, base + plan.fire) > helper.overflowAfterDamage(target, base)) score += 1.3;
                return score >= 0.35;
            };
            if (forbidden.subSkill.weiMingZhong) forbidden.subSkill.weiMingZhong.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                var plan = handResourcePlan(player, false);
                if (!plan.cards.length) return false;
                var delayedRisk = helper.selfDamageRisk(player, 3, plan.cards.length) * 0.35;
                var resourceValue = plan.rageGain * 0.68 + plan.wisdomGain * 0.62;
                var lowValueDensity = Math.max(0, 1.8 - plan.discardCost / plan.cards.length);
                var energyCost = player.hasNengLiang("shuiJing") ? 0.85 : 1.55;
                return resourceValue + lowValueDensity - plan.discardCost - delayedRisk - energyCost >= 0.7;
            };
        }

        var duel = lib.skill && lib.skill.siDou;
        if (duel && markPatched(duel, "fullActionChain")) {
            duel.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                var damage = Math.max(0, event.num || 0);
                var overflow = Math.max(0, player.countCards("h") + damage - player.getHandcardLimit());
                var preventedMorale = Math.max(0, overflow - 1);
                var rageRoom = Math.max(0, 4 - player.countZhiShiWu("nuQi"));
                if (overflow > 0 && overflow >= get.shiQi(player.side)) return true;
                if (preventedMorale >= 2) return true;
                var futureAttacks = rawAttackCards(player).length;
                var rageValue = Math.min(3, rageRoom) * 0.7;
                return preventedMorale >= 1 && rageValue >= 0.7 ||
                    overflow == 0 && rageRoom >= 3 && futureAttacks >= 2 && get.shiQi(!player.side) <= 5;
            };
        }
    }

    function patchHongLianQiShiActionChain(helper) {
        function treatmentLimit(player) {
            return typeof player.getZhiLiaoLimit == "function" ? player.getZhiLiaoLimit() : 0;
        }

        function selfDamagePlan(player, amount, cardsLeaving, treatmentSpent, protectedMorale) {
            amount = Math.max(0, amount || 0);
            cardsLeaving = Math.max(0, cardsLeaving || 0);
            treatmentSpent = Math.max(0, treatmentSpent || 0);
            var protectedByForm = protectedMorale || player.isHengZhi();
            // 已进入【热血沸腾】时，AI会保留治疗并承受完整自伤来摸牌；
            // 未进入形态时，仍按可用治疗抵挡后的实际伤害评估。
            var treatment = protectedByForm ? 0 : Math.max(0, (player.zhiLiao || 0) - treatmentSpent);
            var actual = Math.max(0, amount - treatment);
            var hand = Math.max(0, player.countCards("h") - cardsLeaving);
            var overflow = Math.max(0, hand + actual - player.getHandcardLimit());
            var moraleLoss = protectedByForm ? 0 : overflow;
            var safeDraw = Math.min(actual, Math.max(0, player.getHandcardLimit() - hand));
            // 【热血沸腾】状态下自伤不会降低士气，实际伤害会转化为摸牌；
            // 因此只保留超限后整理手牌的轻微成本，不把伤害点数本身视为损失。
            var drawValue = protectedByForm ? safeDraw * 0.34 + overflow * 0.08 : safeDraw * 0.12;
            var risk = protectedByForm ? overflow * 0.12 : actual * 0.38 + moraleLoss * 3.2;
            if (moraleLoss > 0 && moraleLoss >= get.shiQi(player.side)) risk += 30;
            return { actual: actual, overflow: overflow, moraleLoss: moraleLoss, risk: risk, drawValue: drawValue, protectedByForm: protectedByForm };
        }

        function allyHealingDemand(player) {
            var demands = [];
            game.countPlayer(function (target) {
                if (target == player || target.side != player.side) return;
                demands.push(Math.max(0, treatmentLimit(target) - (target.zhiLiao || 0)));
            });
            demands.sort(function (a, b) { return b - a; });
            return (demands[0] || 0) + (demands[1] || 0);
        }

        function prayerPlan(player) {
            var demand = allyHealingDemand(player);
            var max = Math.min(player.zhiLiao || 0, demand);
            var best = null;
            for (var amount = 1; amount <= max; amount++) {
                var self = selfDamagePlan(player, amount, 0, amount, player.isHengZhi());
                var healValue = Math.min(amount, demand) * 0.92;
                var sealRoom = Math.max(0, 2 - player.countZhiShiWu("xueYin"));
                var sealValue = sealRoom > 0 ? 1.35 : 0;
                var score = healValue + sealValue + self.drawValue - self.risk;
                if (!best || score > best.score + 0.05 || Math.abs(score - best.score) <= 0.05 && amount < best.amount) {
                    best = { amount: amount, score: score, self: self, demand: demand };
                }
            }
            return best;
        }

        helper.hongLianPrayerPlan = prayerPlan;

        function bestEnemyDamage(player, amount) {
            return helper.bestEnemy(player, function (target) {
                return helper.damagePressure(target, player, amount);
            });
        }

        function rawActionCards(player) {
            return player.getCards("h", function (card) {
                return get.type(card) == "gongJi" || get.type(card) == "faShu";
            });
        }

        function extraActionValue(player) {
            var best = 0;
            rawActionCards(player).forEach(function (card) {
                game.countPlayer(function (target) {
                    if (!target || target.side == player.side) return;
                    try {
                        if (lib.filter && typeof lib.filter.targetEnabled == "function" && !lib.filter.targetEnabled(card, player, target)) return;
                    } catch (e) { }
                    if (get.type(card) == "gongJi") {
                        var info = get.info(card, false);
                        var damage = info && typeof info.damageNum == "number" ? info.damageNum : 2;
                        best = Math.max(best, helper.damagePressure(target, player, damage) * helper.likelyHit(player, target, card));
                    } else {
                        best = Math.max(best, 0.8 + Math.max(0, target.countCards("h") - target.getHandcardLimit()) * 0.5);
                    }
                });
            });
            return best;
        }

        function crossPlan(player) {
            var spells = player.getCards("h", function (card) { return get.type(card) == "faShu"; });
            if (spells.length < 2 || player.countZhiShiWu("xueYin") < 1) return null;
            spells.sort(function (a, b) { return get.value(a, player) - get.value(b, player); });
            var costs = spells.slice(0, 2);
            var discardCost = costs.reduce(function (sum, card) {
                return sum + Math.max(0.15, get.value(card, player) * 0.12);
            }, 0);
            var targetPlan = bestEnemyDamage(player, 3);
            if (!targetPlan.target) return null;
            var self = selfDamagePlan(player, 4, 2, 0, player.isHengZhi());
            var energyCost = player.hasNengLiang("shuiJing") ? 0.9 : 1.55;
            var sealCost = 0.85;
            var formValue = !player.isHengZhi() && self.moraleLoss > 0 ? 0.7 : 0;
            var score = targetPlan.score + formValue + self.drawValue - self.risk - discardCost - energyCost - sealCost;
            return { cards: costs, target: targetPlan.target, targetScore: targetPlan.score, self: self, score: score };
        }

        var covenant = lib.skill && lib.skill.xingHongShengYue;
        if (covenant && markPatched(covenant, "fullActionChain")) {
            covenant.check = function (event, player) {
                return player.zhiLiao < treatmentLimit(player);
            };
        }

        var prayer = lib.skill && lib.skill.xueXingDaoYan;
        if (prayer && markPatched(prayer, "fullActionChain")) {
            prayer.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                if (player.countZhiShiWu("xueYin") >= 2) return false;
                var plan = prayerPlan(player);
                return !!plan && plan.score >= 0.55 && plan.self.moraleLoss < get.shiQi(player.side);
            };
            prayer.content = function () {
                "step 0"
                var list = [];
                for (var i = 1; i <= player.zhiLiao; i++) list.push(i);
                var actionHelper = lib.xingBeiShiZhouNianAi;
                var plan = actionHelper && typeof actionHelper.hongLianPrayerPlan == "function" ? actionHelper.hongLianPrayerPlan(player) : null;
                player.chooseControl(list).set("prompt", "血腥祷言：移除X点【治疗】，对自己造成X点法术伤害")
                    .set("bestAmount", plan ? plan.amount : 1).set("ai", function () { return _status.event.bestAmount; });
                "step 1"
                event.num = Number(result.control) || 1;
                player.changeZhiLiao(-event.num);
                player.faShuDamage(event.num, player);
                "step 2"
                var maxTargets = event.num > 1 ? 2 : 1;
                player.chooseTarget(function (card, player, target) {
                    return target != player && target.side == player.side;
                }, [1, maxTargets], true, "选择1至" + maxTargets + "名目标队友分配" + event.num + "点【治疗】").set("ai", function (target) {
                    var room = Math.max(0, target.getZhiLiaoLimit() - target.zhiLiao);
                    return room * 3 + get.attitude(_status.event.player, target);
                });
                "step 3"
                if (!result.bool || !result.targets || !result.targets.length) {
                    event.goto(7);
                } else if (result.targets.length == 1) {
                    result.targets[0].changeZhiLiao(event.num);
                    event.goto(7);
                } else {
                    result.targets.sortBySeat(player);
                    event.targets = result.targets;
                    event.target = event.targets[0];
                }
                "step 4"
                var list = [];
                for (var i = 1; i < event.num; i++) list.push(i);
                player.chooseControl(list).set("target", event.target).set("total", event.num).set("ai", function () {
                    var target = _status.event.target;
                    return Math.max(1, Math.min(_status.event.total - 1, target.getZhiLiaoLimit() - target.zhiLiao));
                });
                "step 5"
                var first = Number(result.control) || 1;
                event.target.changeZhiLiao(first);
                event.num -= first;
                "step 6"
                event.targets[1].changeZhiLiao(event.num);
                "step 7"
                player.addZhiShiWu("xueYin");
            };
        }

        var feast = lib.skill && lib.skill.shaLuShengYan;
        if (feast && markPatched(feast, "fullActionChain")) {
            feast.check = function (event, player) {
                var target = event.target || event.player || (event.targets && event.targets[0]);
                if (!target || target.side == player.side) return false;
                var base = typeof event.damageNum == "number" ? event.damageNum : 2;
                var gain = helper.damagePressure(target, player, base + 2) - helper.damagePressure(target, player, base);
                var self = selfDamagePlan(player, 4, 0, 0, player.isHengZhi());
                if (self.moraleLoss >= get.shiQi(player.side) && self.moraleLoss > 0) return false;
                var formValue = !player.isHengZhi() && self.moraleLoss > 0 ? 0.65 : 0;
                var sealCost = player.countZhiShiWu("xueYin") >= 2 ? 0.55 : 0.9;
                return gain + formValue + self.drawValue - self.risk - sealCost >= 0.65 ||
                    helper.overflowAfterDamage(target, base + 2) > helper.overflowAfterDamage(target, base) && self.risk < 3 ||
                    get.shiQi(!player.side) <= 2 && gain > self.risk;
            };
        }

        var restraint = lib.skill && lib.skill.jieJiaoJieZao;
        if (restraint && markPatched(restraint, "fullActionChain")) {
            restraint.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                var actionValue = extraActionValue(player);
                if (actionValue <= 0) return false;
                var healRoom = Math.max(0, treatmentLimit(player) - player.zhiLiao);
                var lostHeal = Math.min(2, healRoom) * 0.75;
                var energyCost = player.hasNengLiang("shuiJing") ? 0.8 : 1.4;
                var protectionValue = get.shiQi(player.side) <= 4 ? 0.8 : 0.3;
                // 若额外行动准备使用【猩红十字】，重置后其4点自伤将不再
                // 享受【热血沸腾】的士气保护，需提高脱离形态的机会成本。
                var dangerousSelfCard = !!crossPlan(player);
                if (dangerousSelfCard) protectionValue += 0.65;
                return actionValue - lostHeal - energyCost - protectionValue >= 0.65 ||
                    get.shiQi(!player.side) <= 3 && actionValue >= 1.5;
            };
        }

        var cross = lib.skill && lib.skill.xingHongShiZi;
        if (cross && markPatched(cross, "fullActionChain")) {
            cross.check = function (card) {
                var player = _status.event.player;
                var plan = crossPlan(player);
                if (!plan || plan.score < 0.55 || !plan.cards.includes(card)) return 0;
                return 20 - get.value(card, player);
            };
            if (!cross.ai) cross.ai = {};
            cross.ai.order = function (item, player) {
                if (helper.shouldReserveSpecial(_status.event, player)) return 0;
                var plan = crossPlan(player);
                if (!plan || plan.score < 0.55) return 0;
                return player.isHengZhi() ? 5.3 : 3.4;
            };
            if (!cross.ai.result) cross.ai.result = {};
            cross.ai.result.player = function (player) {
                var plan = crossPlan(player);
                return plan && plan.score >= 0.55 ? plan.score : -5;
            };
            cross.ai.result.target = function (player, target) {
                if (target.side == player.side) return -100;
                var plan = crossPlan(player);
                if (!plan || plan.score < 0.55 || target != plan.target) return 0;
                return -Math.max(1, plan.targetScore);
            };
        }
    }

    function patchJianDiActionChain(helper) {
        function soulCards(player) {
            return player.getGaiPai("jianHun") || [];
        }

        function chooseSoul(event, trigger, player, mode) {
            var target = trigger.target || (trigger.targets && trigger.targets[0]);
            var hit = target ? helper.likelyHit(player, target, trigger.card) : 0.5;
            var use = false;
            if (mode == "angel") {
                var healNeed = Math.max(0, player.getZhiLiaoLimit() - (player.zhiLiao || 0));
                use = healNeed >= 2 || (1 - hit) >= 0.55 || get.shiQi(player.side) <= 4;
            } else {
                var base = trigger.damageNum || 2;
                var gain = target ? helper.damagePressure(target, player, base + 1) - helper.damagePressure(target, player, base) : 0;
                use = gain >= 0.75 || (1 - hit >= 0.55 && player.countZhiShiWu("jianQi") <= 3) || get.shiQi(!player.side) <= 3;
            }
            return player.chooseCardButton(soulCards(player), mode == "angel" ? "是否发动【天使之魂】" : "是否发动【恶魔之魂】")
                .set("use", use).set("ai", function (button) {
                    return _status.event.use ? 10 - get.value(button.link) : 0;
                }).forResult();
        }

        var angel = lib.skill && lib.skill.tianShiZhiHun;
        if (angel && markPatched(angel, "fullActionChain")) angel.cost = async function (event, trigger, player) {
            var result = await chooseSoul(event, trigger, player, "angel");
            event.result = { bool: !!(result.bool && result.links && result.links.length), cost_data: result.links || [] };
        };

        var demon = lib.skill && lib.skill.eMoZhiHun;
        if (demon && markPatched(demon, "fullActionChain")) demon.cost = async function (event, trigger, player) {
            var result = await chooseSoul(event, trigger, player, "demon");
            event.result = { bool: !!(result.bool && result.links && result.links.length), cost_data: result.links || [] };
        };

        var will = lib.skill && lib.skill.buQuYiZhi;
        if (will && markPatched(will, "fullActionChain")) {
            will.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player) || helper.handRoom(player) < 1) return false;
                if (helper.countUsableCards(player, "gongJi") <= 0) return false;
                var pressure = game.hasPlayer(function (target) {
                    return target.side != player.side && target.countCards("h") >= target.getHandcardLimit() - 2;
                });
                return pressure || player.countZhiShiWu("jianQi") < 3 || soulCards(player).length < 2;
            };
        }

        var soul = lib.skill && lib.skill.jianHun;
        if (soul && markPatched(soul, "fullActionChain")) {
            if (!soul.ai) soul.ai = {};
            if (!soul.ai.effect) soul.ai.effect = {};
            soul.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side) return;
                var hit = helper.likelyHit(player, target, card);
                var room = Math.max(0, 3 - soulCards(player).length);
                var missValue = room > 0 ? 0.5 + Math.max(0, 2 - player.countZhiShiWu("jianQi")) * 0.2 : 0;
                if (hit < 0.5 && missValue > 0) return [1, 0, 1, -missValue];
            };
        }
    }

    function patchXueZhiWuNvActionChain(helper) {
        var sorrow = lib.skill && lib.skill.xueZhiAiShang;
        if (sorrow && markPatched(sorrow, "fullActionChain")) {
            function linkTargetValue(player, target) {
                if (!target || target == player) return -Infinity;
                if (player.isHengZhi()) {
                    if (target.side != player.side) return -Infinity;
                    return 6 + Math.max(0, target.countCards("h") - target.getHandcardLimit()) * 2;
                }
                if (target.side == player.side) return -Infinity;
                return 5 + Math.max(0, target.countCards("h") - target.getHandcardLimit() + 2) * 2;
            }
            sorrow.check = function (event, player) {
                var current = player.storage.tongShengGongSi_target;
                if (!current || !(player.canGongJi() || player.canFaShu())) return false;
                var selfRisk = helper.selfDamageRisk(player, 2);
                var currentValue = linkTargetValue(player, current);
                var bestValue = -Infinity;
                game.countPlayer(function (target) {
                    if (target != current) bestValue = Math.max(bestValue, linkTargetValue(player, target));
                });
                return bestValue > currentValue + selfRisk + 0.8;
            };
            sorrow.content = async function (event, trigger, player) {
                await player.faShuDamage(2, player);
                var current = player.storage.tongShengGongSi_target;
                var result = await player.chooseTarget("转移【同生共死】目标，取消则移除【同生共死】", function (card, player, target) {
                    return target != _status.event.currentTarget;
                }).set("currentTarget", current).set("ai", function (target) {
                    return linkTargetValue(_status.event.player, target);
                }).forResult();
                if (result.bool && result.targets && result.targets.length) {
                    lib.skill.tongShengGongSi.removeTongShengGongSiSkill(player, current);
                    var target = result.targets[0];
                    lib.skill.tongShengGongSi.addTongShengGongSiSkill(player, target);
                    await current.removeZhiShiWu("tongShengGongSi_xiaoGuo");
                    player.storage.tongShengGongSi_target = target;
                    await target.addZhiShiWu("tongShengGongSi_xiaoGuo");
                } else {
                    lib.skill.tongShengGongSi.removeTongShengGongSiSkill(player, current);
                    await current.removeZhiShiWu("tongShengGongSi_xiaoGuo");
                    delete player.storage.tongShengGongSi_target;
                    player.storage.tongShengGongSi_use = false;
                }
            };
        }

        var reverse = lib.skill && lib.skill.niLiu;
        if (reverse && markPatched(reverse, "fullActionChain")) {
            reverse.check = function (card) {
                var player = _status.event.player;
                var selected = ui.selected.cards.length;
                var relief = Math.max(0, player.countCards("h") - player.getHandcardLimit());
                var healRoom = Math.max(0, player.getZhiLiaoLimit() - (player.zhiLiao || 0));
                if (selected >= 2) return 0;
                return 7 + relief * 1.5 + healRoom * 0.5 - get.value(card, player);
            };
            reverse.ai.order = function (item, player) {
                var relief = player.countCards("h") - player.getHandcardLimit();
                return relief > 0 ? 6.2 : 3.2;
            };
            reverse.ai.result.player = function (player) {
                if (player.countCards("h") < 2) return -10;
                return Math.max(0, player.getZhiLiaoLimit() - player.zhiLiao) + Math.max(0, player.countCards("h") - player.getHandcardLimit()) * 1.5;
            };
        }

        var lament = lib.skill && lib.skill.xueZhiBeiMing;
        if (lament && markPatched(lament, "fullActionChain")) {
            function lamentMoraleLoss(target, damage, cardsLeaving) {
                if (!target || typeof target.getHandcardLimit != "function") return 0;
                var actual = Math.max(0, damage - Math.max(0, target.zhiLiao || 0));
                var hand = Math.max(0, target.countCards("h") - Math.max(0, cardsLeaving || 0));
                return Math.max(0, hand + actual - target.getHandcardLimit());
            }

            function lamentPlan(player, target) {
                if (!player || !target || target.side == player.side) return null;
                var best = null;
                for (var damage = 1; damage <= 3; damage++) {
                    var enemyLoss = lamentMoraleLoss(target, damage, 0);
                    // 【血之悲鸣】的独有技牌在伤害结算前已离开手牌。
                    var selfLoss = lamentMoraleLoss(player, damage, 1);
                    var enemyLethal = enemyLoss > 0 && enemyLoss >= get.shiQi(target.side);
                    var selfLethal = selfLoss > 0 && selfLoss >= get.shiQi(player.side);

                    // 除非能先将敌方士气归零，否则绝不接受己方士气损失更多的档位。
                    if (!enemyLethal && (selfLethal || selfLoss > enemyLoss)) continue;

                    var score = helper.damagePressure(target, player, damage);
                    score -= helper.selfDamageRisk(player, damage, 1);
                    score += (enemyLoss - selfLoss) * 4;
                    if (enemyLethal) score += 20;
                    if (!best || score > best.score) {
                        best = {
                            damage: damage,
                            enemyLoss: enemyLoss,
                            selfLoss: selfLoss,
                            enemyLethal: enemyLethal,
                            score: score
                        };
                    }
                }
                return best;
            }

            lament.contentBefore = async function (event, trigger, player) {
                var target = event.target || event.targets && event.targets[0];
                var plan = lamentPlan(player, target);
                var bestDamage = plan ? plan.damage : 1;
                var list = [0, 1, 2];
                var control = await player.chooseControl(list).set("prompt", "对目标角色和自己各造成(X+1)点法术伤害③")
                    .set("choice", bestDamage - 1).set("ai", function () { return _status.event.choice; }).forResultControl();
                player.storage.xueZhiBeiMin = Number(control) + 1;
            };
            lament.ai.order = function (card, player) {
                var bestScore = -Infinity;
                game.countPlayer(function (target) {
                    var plan = lamentPlan(player, target);
                    if (plan) bestScore = Math.max(bestScore, plan.score);
                });
                if (bestScore <= 0.25) return 0;
                return bestScore >= 4 ? 5.8 : 3.4;
            };
            lament.check = function (card) {
                var player = _status.event.player;
                var bestScore = -Infinity;
                game.countPlayer(function (target) {
                    var plan = lamentPlan(player, target);
                    if (plan) bestScore = Math.max(bestScore, plan.score);
                });
                return bestScore > 0.25 ? 10 + bestScore - get.value(card, player) : -100;
            };
            lament.ai.result.target = function (player, target) {
                var plan = lamentPlan(player, target);
                if (!plan || plan.score <= 0.25) return 0;
                return -plan.score;
            };
        }

        var together = lib.skill && lib.skill.tongShengGongSi;
        if (together && markPatched(together, "fullActionChain")) {
            together.ai.order = function (item, player) {
                var futureLimit = player.getHandcardLimit() + (player.isHengZhi() ? 1 : -2);
                if (player.countCards("h") + 2 > futureLimit) return 0;
                return player.isHengZhi() ? 6.4 : 4.4;
            };
            together.ai.result.player = function (player) {
                var futureLimit = player.getHandcardLimit() + (player.isHengZhi() ? 1 : -2);
                return player.countCards("h") + 2 > futureLimit ? -10 : 1.5;
            };
            together.ai.result.target = function (player, target) {
                if (target == player) return -1;
                if (player.isHengZhi()) {
                    if (target.side != player.side) return 100;
                    return 1.5 + Math.max(0, target.countCards("h") - target.getHandcardLimit());
                }
                if (target.side == player.side) return -100;
                return -1.5 - Math.max(0, target.countCards("h") - target.getHandcardLimit()) * 1.5;
            };
        }

        var curse = lib.skill && lib.skill.xueZhiZuZhou;
        if (curse && markPatched(curse, "fullActionChain")) {
            curse.ai.order = function (item, player) {
                var relief = player.countCards("h") - player.getHandcardLimit();
                return relief >= 2 ? 5.8 : 2.2;
            };
            curse.ai.result.player = function (player) {
                var relief = Math.max(0, player.countCards("h") - player.getHandcardLimit());
                if (player.countCards("h") < 3 && relief == 0) return -3;
                return relief * 1.4;
            };
            curse.ai.result.target = function (player, target) {
                return target.side == player.side ? -100 : -1 - helper.overflowAfterDamage(target, 2) * 2;
            };
        }
    }

    function patchXianZheActionChain(helper) {
        function defenseEvent() {
            var current = _status.event;
            for (var depth = 0; current && depth < 8; depth++) {
                if (current.name == "yingZhan" && current.card) return current;
                current = current.parent;
            }
            return null;
        }

        function responseAttackTargetValue(event, player, card) {
            if (!event || !card || get.type(card, player) != "gongJi" || typeof event.filterTarget != "function") return -Infinity;
            var best = -Infinity;
            var targets = game.players || [];
            for (var i = 0; i < targets.length; i++) {
                var target = targets[i];
                var enabled = false;
                try {
                    enabled = event.filterTarget(card, player, target);
                } catch (e) { }
                if (!enabled) continue;
                var value = 0;
                try {
                    value = get.cacheEffectUse(target, card, player, player);
                } catch (e) { }
                if (value > best) best = value;
            }
            return best;
        }

        function responseTargetChoice(target) {
            var event = _status.event;
            var player = event.player;
            var value = get.cacheEffectUse(target);
            var selected = ui.selected.cards && ui.selected.cards[0];
            if (selected && get.type(selected, player) == "gongJi") {
                // 选中合法的应战攻击牌后必须完成目标选择，避免本体回退分支访问空卡。
                return Math.max(0.01, value);
            }
            return value;
        }

        function incomingAttackDamage(event) {
            var candidates = [];
            if (event) candidates.push(event);
            try {
                if (event && typeof event.getTrigger == "function") candidates.push(event.getTrigger());
            } catch (e) { }
            var current = event;
            for (var depth = 0; current && depth < 8; depth++) {
                candidates.push(current);
                current = current.parent;
            }
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i] && typeof candidates[i].damageNum == "number") {
                    return Math.max(0, candidates[i].damageNum);
                }
            }
            var card = event && event.card;
            var info = card && get.info(card, false);
            return Math.max(0, info && info.damageNum || 2);
        }

        function counterattackWorth(player, event, card, damage) {
            if (!card || get.type(card, player) != "gongJi") return 0;
            var source = event && event.source;
            var best = helper.bestEnemy(player, function (target) {
                if (target == source) return -Infinity;
                return helper.damagePressure(target, player, damage);
            }, function (target) {
                if (target == source) return false;
                try {
                    return lib.filter.targetEnabled(card, player, target);
                } catch (e) {
                    return true;
                }
            });
            return best.target ? best.score : 0;
        }

        function shouldTakeAttackForCodices(player, card) {
            var event = defenseEvent();
            if (!event || !player.hasSkill("zhiHuiFaDian") || player.countNengLiang("baoShi") <= 0) return false;

            // 【圣盾】等必然结算的防御会令本次攻击无法转化为摸牌，不能为攒牌而放弃其他防御。
            if (event.canShengDun !== false && typeof player.getExpansions == "function" && player.getExpansions("_shengDun").length) return false;

            var rawDamage = incomingAttackDamage(event);
            var maximumTreatment = Math.min(Math.max(0, player.zhiLiao || 0), rawDamage);
            var saveTreatment = shouldSaveTreatmentForCodex(player, {
                source: event.source,
                faShu: false
            }, rawDamage, maximumTreatment);
            var actualDraw = saveTreatment ? rawDamage : Math.max(0, rawDamage - Math.max(0, player.zhiLiao || 0));
            if (actualDraw <= 0) return false;
            if (player.countCards("h") + actualDraw > player.getHandcardLimit()) return false;

            var distinct = player.countYiXiPai();
            var futureHand = player.countCards("h") + actualDraw;
            if (futureHand < 2) return false;

            // 优先补齐【魔道法典】的2系起点与【圣洁法典】的3系起点；已有材料时也允许安全扩充X值。
            var preparation = actualDraw * 0.7;
            if (distinct < 2 && distinct + actualDraw >= 2) preparation += 1.4;
            if (distinct < 3 && distinct + actualDraw >= 3) preparation += 1;
            if (distinct >= 2 && distinct < 5) preparation += 0.45;

            // 能以应战直接制造爆牌或形成显著伤害压力时，不为攒牌放弃这次反击。
            var responseDamage = get.info(card, false) && get.info(card, false).damageNum || 2;
            var counter = counterattackWorth(player, event, card, responseDamage);
            if (counter >= 3 || get.shiQi(!player.side) <= Math.max(1, responseDamage) && counter > 0) return false;

            return preparation >= 1.15;
        }

        function canLeaveKnownReboundPair(player, count) {
            var groups = {};
            player.getCards("h").forEach(function (card) {
                var suit = get.xiBie(card);
                groups[suit] = (groups[suit] || 0) + 1;
            });
            var suits = Object.keys(groups);
            if (count > suits.length) return false;
            var found = false;
            function visit(index, selected) {
                if (found) return;
                if (selected.length == count) {
                    for (var i = 0; i < suits.length; i++) {
                        var remaining = groups[suits[i]] - (selected.includes(suits[i]) ? 1 : 0);
                        if (remaining >= 2) {
                            found = true;
                            return;
                        }
                    }
                    return;
                }
                for (var i = index; i < suits.length; i++) {
                    selected.push(suits[i]);
                    visit(i + 1, selected);
                    selected.pop();
                }
            }
            visit(0, []);
            return found;
        }

        function shouldSaveTreatmentForCodex(player, damageEvent, rawDamage, maximumTreatment) {
            if (!player.hasSkill("zhiHuiFaDian") || player.countNengLiang("baoShi") <= 0) return false;
            if (!damageEvent || damageEvent.source == player || maximumTreatment <= 0 || rawDamage <= 0) return false;
            if (player.countCards("h") + rawDamage > player.getHandcardLimit()) return false;

            // 当前法术伤害若能立即精确压至1点并形成有效反弹，当前连段优先于延后保存治疗。
            if (damageEvent.faShu == true && rawDamage > 1 && maximumTreatment >= rawDamage - 1) {
                var immediate = bestReboundPlan(player);
                if (immediate && immediate.score > 0.25) return false;
            }

            var currentDistinct = player.countYiXiPai();
            var futureHand = player.countCards("h") + rawDamage;
            var potentialDistinct = Math.min(6, currentDistinct + rawDamage);
            // 规划后续法典时要读取当前【治疗】总量，而不是本次伤害最多能消耗的数量。
            // 例如贤者有3点【治疗】而本次只承受1点伤害，保留下来仍能把X=5的
            // 法典自伤从4点精确压至1点。
            var maximumTunedCount = Math.min(potentialDistinct, Math.max(0, player.zhiLiao || 0) + 2);
            for (var count = 3; count <= maximumTunedCount; count++) {
                if (futureHand - count + 1 <= 1) continue;
                if (count <= currentDistinct && canLeaveKnownReboundPair(player, count)) return true;
                // 未知摸牌不能保证系别，但已有同系对子或本次至少摸2张时，具备合理的成型概率。
                if (player.countTongXiPai() >= 2 || rawDamage >= 2) return true;
            }
            return false;
        }

        function distinctCards(player) {
            var bySuit = {};
            player.getCards("h").forEach(function (card) {
                var suit = get.xiBie(card);
                if (!suit || (bySuit[suit] && get.value(bySuit[suit], player) <= get.value(card, player))) return;
                bySuit[suit] = card;
            });
            return helper.lowValueCards(Object.keys(bySuit).map(function (suit) { return bySuit[suit]; }), 99);
        }

        function cardCost(player, cards) {
            return (cards || []).reduce(function (sum, card) {
                return sum + Math.max(0.15, get.value(card, player)) * 0.14;
            }, 0);
        }

        function projectedDamage(player, rawDamage, treatmentBonus, cardsLeaving) {
            var treatment = Math.max(0, player.zhiLiao || 0) + Math.max(0, treatmentBonus || 0);
            var damage = Math.max(0, rawDamage || 0);
            var actual = Math.max(0, damage - treatment);
            var handAfterCost = Math.max(0, player.countCards("h") - Math.max(0, cardsLeaving || 0));
            var room = player.getHandcardLimit() - handAfterCost;
            // 【法术反弹】提供oneDamage标签：条件允许时，治疗会把伤害精确抵至1点，
            // 留下触发反弹所需的正数法术伤害，而不是无条件抵消至0。
            if (damage > 0 && treatment >= damage - 1 && player.hasSkillTag("oneDamage") &&
                (get.shiQi(player.side) > 3 || room >= 1)) actual = 1;
            return actual;
        }

        function projectedSelfRisk(player, rawDamage, cardsLeaving, treatmentBonus) {
            var actual = projectedDamage(player, rawDamage, treatmentBonus, cardsLeaving);
            var handAfterCost = Math.max(0, player.countCards("h") - Math.max(0, cardsLeaving || 0));
            var overflow = Math.max(0, handAfterCost + actual - player.getHandcardLimit());
            var risk = actual * 0.45 + overflow * 3;
            if (overflow >= get.shiQi(player.side)) risk += 20;
            return risk;
        }

        function wisdomResult(player, rawDamage, cardsLeaving, energyPayment, treatmentBonus) {
            var actual = projectedDamage(player, rawDamage, treatmentBonus, cardsLeaving);
            if (actual <= 3) return { triggered: false, actual: actual, energy: 0, score: 0 };
            var afterPayment = Math.max(0, player.countNengLiangAll() - Math.max(0, energyPayment || 0));
            var room = Math.max(0, player.getNengLiangLimit() - afterPayment);
            var energy = Math.min(2, room);
            var handAfterDamage = Math.max(0, player.countCards("h") - cardsLeaving + actual);
            var discardTax = handAfterDamage > 0 ? (handAfterDamage > player.getHandcardLimit() ? -0.1 : 0.22) : 0;
            return {
                triggered: true,
                actual: actual,
                energy: energy,
                score: energy * 1.45 - discardTax
            };
        }

        function remainingSameSuitPair(player, spentCards) {
            var spent = spentCards || [];
            var groups = {};
            player.getCards("h").forEach(function (card) {
                if (spent.includes(card)) return;
                var suit = get.xiBie(card);
                groups[suit] = (groups[suit] || 0) + 1;
            });
            return Object.keys(groups).some(function (suit) { return groups[suit] >= 2; });
        }

        function selfDamageBranchScore(player, rawDamage, cards, energyPayment, treatmentBonus) {
            var actual = projectedDamage(player, rawDamage, treatmentBonus, cards.length);
            var wisdom = wisdomResult(player, rawDamage, cards.length, energyPayment, treatmentBonus);
            var score = wisdom.score - projectedSelfRisk(player, rawDamage, cards.length, treatmentBonus);
            if (actual == 1 && remainingSameSuitPair(player, cards)) score += 0.75;
            else if (actual >= 2 && actual <= 3) score -= 0.65;
            return { actual: actual, wisdom: wisdom, score: score };
        }

        function bestReboundPlan(player) {
            var groups = {};
            player.getCards("h").forEach(function (card) {
                var suit = get.xiBie(card);
                if (!groups[suit]) groups[suit] = [];
                groups[suit].push(card);
            });
            var best = null;
            Object.keys(groups).forEach(function (suit) {
                var suitCards = helper.lowValueCards(groups[suit], 99);
                for (var count = 2; count <= suitCards.length; count++) {
                    var cards = suitCards.slice(0, count);
                    var enemy = helper.bestEnemy(player, function (target) {
                        return helper.damagePressure(target, player, count - 1);
                    });
                    if (!enemy.target) continue;
                    var branch = selfDamageBranchScore(player, count, cards, 0, 0);
                    var score = enemy.score + branch.score - cardCost(player, cards);
                    if (!best || score > best.score) {
                        best = { suit: suit, cards: cards, count: count, target: enemy.target, targetScore: enemy.score, score: score };
                    }
                }
            });
            return best;
        }

        function arcanePlanForCount(player, count) {
            var available = distinctCards(player);
            if (count < 2 || count > available.length) return null;
            var cards = available.slice(0, count);
            var enemy = helper.bestEnemy(player, function (target) {
                return helper.damagePressure(target, player, count - 1);
            });
            if (!enemy.target) return null;
            var branch = selfDamageBranchScore(player, count - 1, cards, 1, 0);
            var score = enemy.score + branch.score - cardCost(player, cards) - 1.35;
            return { cards: cards, count: count, target: enemy.target, targetScore: enemy.score, score: score, branch: branch };
        }

        function bestArcanePlan(player) {
            var available = distinctCards(player);
            var best = null;
            for (var count = 2; count <= available.length; count++) {
                var plan = arcanePlanForCount(player, count);
                if (plan && (!best || plan.score > best.score)) best = plan;
            }
            return best;
        }

        function alliedTargets(player) {
            var result = [];
            game.countPlayer(function (target) {
                if (target.side == player.side) result.push(target);
            });
            return result;
        }

        function targetSubsets(targets, maximum) {
            var result = [];
            function visit(index, selected) {
                if (selected.length > 0) result.push(selected.slice());
                if (selected.length >= maximum) return;
                for (var i = index; i < targets.length; i++) {
                    selected.push(targets[i]);
                    visit(i + 1, selected);
                    selected.pop();
                }
            }
            visit(0, []);
            return result;
        }

        function holyPlanForCount(player, count) {
            var available = distinctCards(player);
            if (count < 3 || count > available.length) return null;
            var cards = available.slice(0, count);
            var subsets = targetSubsets(alliedTargets(player), count - 2);
            var best = null;
            subsets.forEach(function (targets) {
                var healValue = 0;
                var selfTreatment = 0;
                targets.forEach(function (target) {
                    var room = Math.max(0, target.getZhiLiaoLimit() - (target.zhiLiao || 0));
                    var amount = Math.min(2, room);
                    if (amount > 0) healValue += helper.healScore(target, player, amount);
                    if (target == player) selfTreatment = amount;
                });
                var branch = selfDamageBranchScore(player, count - 1, cards, 1, selfTreatment);
                var score = healValue + branch.score - cardCost(player, cards) - 1.35;
                if (!best || score > best.score) {
                    best = { cards: cards, count: count, targets: targets, healValue: healValue, score: score, branch: branch };
                }
            });
            return best;
        }

        function bestHolyPlan(player) {
            var available = distinctCards(player);
            var best = null;
            for (var count = 3; count <= available.length; count++) {
                var plan = holyPlanForCount(player, count);
                if (plan && (!best || plan.score > best.score)) best = plan;
            }
            return best;
        }

        var wisdom = lib.skill && lib.skill.zhiHuiFaDian;
        if (wisdom && markPatched(wisdom, "codexDefensePreparation")) {
            if (!wisdom.mod) wisdom.mod = {};
            var oldDefenseOrder = wisdom.mod.aiOrder;
            wisdom.mod.aiOrder = function (player, card, num) {
                if (typeof oldDefenseOrder == "function") {
                    var oldResult = oldDefenseOrder.apply(this, arguments);
                    if (typeof oldResult == "number") num = oldResult;
                }
                if (!card || !shouldTakeAttackForCodices(player, card)) return num;
                var type = get.type(card, player);
                if (type == "gongJi" || get.name(card) == "shengGuang") return -100;
                return num;
            };
        }

        var commonDefense = lib.skill && lib.skill._yingZhan;
        if (commonDefense && markPatched(commonDefense, "xianZheCodexPreparation")) {
            commonDefense.content = async function (event, trigger, player) {
                event.source = trigger.player;
                event.yingZhan = trigger.yingZhan;
                event.card = trigger.card;
                var prompt = "受到" + get.translation(event.source) + "的" + get.translation(get.xiBie(event.card)) + "系";
                prompt += event.yingZhan ? "应战攻击" : "主动攻击";
                var result = await player.yingZhan(prompt)
                    .set("filterCard", function (card, player) {
                        if (get.type(card) == "gongJi") {
                            if (_status.event.canYingZhan == false) return false;
                            if (_status.event.canAnMie == false) {
                                if (get.xiBie(card) != get.xiBie(_status.event.card)) return false;
                            } else if (get.name(card) != "anMie" && get.xiBie(card) != get.xiBie(_status.event.card)) return false;
                        } else if (get.type(card) == "faShu") {
                            if (_status.event.canShengGuang == false || get.name(card) != "shengGuang") return false;
                        }
                        return lib.filter.cardEnabled(card, player, "forceEnable");
                    })
                    .set("filterTarget", function (card, player, target) {
                        if (target == _status.event.source || target.side == player.side) return false;
                        return lib.filter.targetEnabled(card, player, target);
                    })
                    .set("card", event.card)
                    .set("source", event.source)
                    .set("yingZhan", true)
                    .set("canYingZhan", trigger.canYingZhan)
                    .set("canShengGuang", trigger.canShengGuang)
                    .set("canAnMie", trigger.canAnMie)
                    .set("ai1", function (item) {
                        var player = _status.event.player;
                        if (item && typeof item == "object" && get.type(item, player) == "gongJi" && responseAttackTargetValue(_status.event, player, item) <= 0) return -100;
                        if (shouldTakeAttackForCodices(player, typeof item == "object" ? item : null)) return -100;
                        return get.cacheOrder(item);
                    })
                    .set("ai2", responseTargetChoice)
                    .set("oncard", function () {
                        _status.event.yingZhan = true;
                    }).forResult();
                if (result.bool) trigger.weiMingZhong();
            };
        }

        var treatmentDefense = lib.skill && lib.skill._zhiLiao;
        if (treatmentDefense && markPatched(treatmentDefense, "xianZheCodexPreparation")) {
            treatmentDefense.content = async function (event, trigger, player) {
                await event.trigger("zhiLiaoSheZhi");
                var damageEvent = trigger.getParent();
                var damage = Math.max(0, damageEvent.num || 0);
                var limit = typeof event.zhiLiaoLimit == "number" ? event.zhiLiaoLimit : Infinity;
                var maximum = Math.min(player.zhiLiao || 0, damage, limit);
                var list = [];
                for (var i = 0; i <= maximum; i++) list.push(i);

                var treatment = maximum;
                var room = player.getHandcardLimit() - player.countCards("h");
                if (room >= damage + 1) treatment = 0;
                var morale = get.shiQi(player.side);
                if (player.hasSkillTag("oneDamage") && (morale > 3 || room >= 1) && 1 + maximum >= damage) {
                    treatment = Math.max(0, damage - 1);
                }
                var protectedRedLotusSelfDamage = damageEvent.source == player && player.isHengZhi() && player.hasSkill("reXueFeiTeng");
                if (protectedRedLotusSelfDamage) treatment = 0;
                else if (shouldSaveTreatmentForCodex(player, damageEvent, damage, maximum)) treatment = 0;

                var result = await player.chooseControl(list)
                    .set("prompt", "选择使用多少【治疗】，目前伤害量" + damage)
                    .set("ai", function () { return _status.event.treatment; })
                    .set("treatment", treatment).forResult();
                var used = Number(result.control) || 0;
                if (used > 0) {
                    damageEvent.num -= used;
                    game.log(player, "的", "【治疗】", "抵挡了" + used + "点伤害");
                    var next = player.changeZhiLiao(-used);
                    next.type = "damage";
                    await next;
                }
            };
        }

        var rebound = lib.skill && lib.skill.faShuFanTan;
        if (rebound && markPatched(rebound, "fullActionChain")) {
            rebound.cost = async function (event, trigger, player) {
                var plan = bestReboundPlan(player);
                var bestSuit = plan && plan.score > 0.25 ? plan.suit : null;
                var desired = plan && plan.score > 0.25 ? plan.count : 0;
                var bestTarget = plan && plan.score > 0.25 ? plan.target : null;
                event.result = await player.chooseCardTarget({
                    filterCard: function (card) { if (!ui.selected.cards.length) return true; return get.xiBie(card) == get.xiBie(ui.selected.cards[0]); },
                    selectCard: [2, Infinity], filterTarget: true, complexCard: true,
                    prompt: get.prompt("faShuFanTan"), prompt2: lib.translate.faShuFanTan_info,
                    ai1: function (card) { if (get.xiBie(card) != bestSuit || ui.selected.cards.length >= desired) return 0; return 10 - get.value(card); },
                    ai2: function (target) { return target == bestTarget ? 10 : 0; }
                }).forResult();
            };
        }

        var arcane = lib.skill && lib.skill.moDaoFaDian;
        if (arcane && markPatched(arcane, "fullActionChain")) {
            arcane.check = function (card) {
                var player = _status.event.player;
                var plan = bestArcanePlan(player);
                if (!plan || plan.score <= 0.35 || !plan.cards.includes(card)) return 0;
                return 10 - get.value(card, player);
            };
            arcane.ai.order = function (item, player) {
                if (helper.shouldReserveSpecial(_status.event, player)) return 0;
                var plan = bestArcanePlan(player);
                return plan && plan.score > 0.35 ? 4.2 + Math.min(2, plan.score * 0.2) : 0;
            };
            arcane.ai.result.target = function (player, target) {
                if (target.side == player.side) return -100;
                var selected = ui.selected && ui.selected.cards ? ui.selected.cards.length : 0;
                var plan = selected ? arcanePlanForCount(player, selected) : bestArcanePlan(player);
                if (!plan || plan.score <= 0.35 || target != plan.target) return 0;
                return -Math.max(0.5, plan.targetScore);
            };
        }

        var holy = lib.skill && lib.skill.shengJieFaDian;
        if (holy && markPatched(holy, "fullActionChain")) {
            holy.check = function (card) {
                var player = _status.event.player;
                var plan = bestHolyPlan(player);
                if (!plan || plan.score <= 0.35 || !plan.cards.includes(card)) return 0;
                return 10 - get.value(card, player);
            };
            holy.ai.order = function (item, player) {
                if (helper.shouldReserveSpecial(_status.event, player)) return 0;
                var plan = bestHolyPlan(player);
                return plan && plan.score > 0.35 ? 4.4 + Math.min(2, plan.score * 0.2) : 0;
            };
            holy.ai.result.target = function (player, target) {
                if (target.side != player.side) return 100;
                var selected = ui.selected && ui.selected.cards ? ui.selected.cards.length : 0;
                var plan = selected ? holyPlanForCount(player, selected) : bestHolyPlan(player);
                if (!plan || plan.score <= 0.35 || !plan.targets.includes(target)) return 0;
                var room = Math.max(0, target.getZhiLiaoLimit() - (target.zhiLiao || 0));
                return 2 + helper.healScore(target, player, Math.min(2, room));
            };
        }
    }

    function patchGeDouJiaActionChain(helper) {
        function cappedDamage(amount) {
            return Math.min(4, Math.max(0, amount || 0));
        }

        function cappedSelfRisk(player, amount, cardsLeaving) {
            return helper.selfDamageRisk(player, cappedDamage(amount), cardsLeaving || 0);
        }

        function lockedDragonTarget(player) {
            var storage = player.storage && player.storage.baiShiHuanLongQuan;
            return Array.isArray(storage) && storage.length ? storage[0] : null;
        }

        function usableAttackCards(player) {
            return player.getCards("h", function (card) {
                if (get.type(card) != "gongJi") return false;
                try {
                    return typeof player.hasUseTargetXingBei != "function" || player.hasUseTargetXingBei(card);
                } catch (e) {
                    return true;
                }
            });
        }

        function bestDragonTarget(player, damage) {
            return helper.bestEnemy(player, function (target) {
                var best = -Infinity;
                usableAttackCards(player).forEach(function (card) {
                    var hit = helper.likelyHit(player, target, card);
                    var score = helper.damagePressure(target, player, damage) * hit;
                    score += helper.overflowAfterDamage(target, damage) * 0.8;
                    if (score > best) best = score;
                });
                return best;
            });
        }

        var charge = lib.skill && lib.skill.xuLiYiji;
        if (charge && markPatched(charge, "fullActionChain")) {
            if (!charge.ai) charge.ai = {};
            if (!charge.ai.effect) charge.ai.effect = {};
            charge.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side || player.countZhiShiWu("douQi") >= 6) return;
                var hit = helper.likelyHit(player, target, card);
                var risk = cappedSelfRisk(player, player.countZhiShiWu("douQi") + 1) * (1 - hit);
                return [1, 0, 1, hit >= 0.65 ? -1.2 : Math.min(1.2, risk * 0.35)];
            };
            charge.check = function (event, player) {
                var target = event.target || (event.targets && event.targets[0]);
                if (!target || target.side == player.side) return false;
                var qi = player.countZhiShiWu("douQi") + 1;
                var hit = helper.likelyHit(player, target, event.card);
                var base = event.damageNum || 2;
                var gain = (helper.damagePressure(target, player, base + 1) - helper.damagePressure(target, player, base)) * hit;
                var missRisk = cappedSelfRisk(player, qi) * (1 - hit);
                var needsDragon = player.countZhiShiWu("douQi") < 3 ? 0.7 : 0;
                // 【百式幻龙拳】形态下发动【蓄力一击】会立即重置并失去形态收益。
                if (player.isHengZhi()) return false;
                return gain + needsDragon > missRisk || hit >= 0.75 || get.shiQi(!player.side) <= 2;
            };
        }

        var bullet = lib.skill && lib.skill.nianDan;
        if (bullet && markPatched(bullet, "fullActionChain")) {
            bullet.check = function (event, player) {
                var qiAfter = player.countZhiShiWu("douQi") + 1;
                var best = helper.bestEnemy(player, function (target) {
                    var score = helper.damagePressure(target, player, 1);
                    if ((target.zhiLiao || 0) > 0) score += 1.35;
                    else score -= cappedSelfRisk(player, qiAfter);
                    return score;
                });
                return !!best.target && (best.score > 0.5 || player.countZhiShiWu("douQi") < 3);
            };
            bullet.content = async function (event, trigger, player) {
                await player.addZhiShiWu("douQi");
                var qiAfter = player.countZhiShiWu("douQi");
                var targets = await player.chooseTarget("对目标对手造成1点法术伤害③", true, function (card, player, target) {
                    return target.side != player.side;
                }).set("qiAfter", qiAfter).set("ai", function (target) {
                    var player = _status.event.player;
                    var score = helper.damagePressure(target, player, 1);
                    if ((target.zhiLiao || 0) > 0) return score + 3;
                    return score - cappedSelfRisk(player, _status.event.qiAfter);
                }).forResultTargets();
                if (!targets || !targets.length) return;
                var target = targets[0];
                var recoil = target.zhiLiao == 0;
                await target.faShuDamage(1, player);
                if (recoil) await player.faShuDamage(player.countZhiShiWu("douQi"), player);
            };
        }

        var dragon = lib.skill && lib.skill.baiShiHuanLongQuan;
        if (dragon && markPatched(dragon, "fullActionChain")) {
            dragon.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player) || !player.canGongJi()) return false;
                var attacks = usableAttackCards(player).length;
                if (!attacks) return false;
                var target = bestDragonTarget(player, 4);
                if (!target.target) return false;
                var followUps = Math.min(attacks, Math.max(1, helper.actionSlots(player, "gongJi")));
                var formValue = target.score + Math.max(0, followUps - 1) * 1.1;
                var spellOpportunity = player.canFaShu() && helper.countUsableCards(player, "faShu") > 0 ? 0.8 : 0;
                return formValue - spellOpportunity >= 2.2 || get.shiQi(!player.side) <= 4 && formValue >= 1.4;
            };
        }

        var stun = lib.skill && lib.skill.qiJueBengJi;
        if (stun && markPatched(stun, "fullActionChain")) {
            stun.check = function (event, player) {
                var target = event.target || (event.targets && event.targets[0]);
                if (!target || target.side == player.side || event.canYingZhan == false) return false;
                if (get.xiBie(event.card) == "an") return false;
                var normalHit = helper.likelyHit(player, target, event.card);
                var qiAfter = Math.max(0, player.countZhiShiWu("douQi") - 1);
                var damage = event.damageNum || 2;
                var otherDefense = (event.canShengGuang === false ? 0 : helper.holyLightCount(target)) +
                    (event.canShengDun === false ? 0 : helper.shieldCount(target));
                var noResponseHit = otherDefense <= 0 ? 0.93 : otherDefense == 1 ? 0.5 : 0.25;
                var responseGain = Math.max(0, noResponseHit - normalHit);
                var gain = helper.damagePressure(target, player, damage) * responseGain;
                gain += Math.min(1, helper.responseCount(target, event.card)) * 0.35;
                var risk = cappedSelfRisk(player, qiAfter);
                if (qiAfter == 0 && normalHit < noResponseHit) return true;
                return gain > risk + 0.25 || helper.overflowAfterDamage(target, damage) > 0 && risk < 1.5 || get.shiQi(!player.side) <= 3 && gain >= risk;
            };
        }

        var drive = lib.skill && lib.skill.douShenTianQu;
        if (drive && markPatched(drive, "fullActionChain")) {
            drive.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                var discard = Math.max(0, player.countCards("h") - 3);
                var heal = Math.min(2, Math.max(0, player.getZhiLiaoLimit() - player.zhiLiao));
                if (!heal || !player.canXingDong()) return false;
                var pressure = Math.max(0, player.countCards("h") - player.getHandcardLimit());
                var cards = helper.lowValueCards(player.getCards("h"), discard);
                var discardCost = cards.reduce(function (sum, card) {
                    return sum + Math.max(0.15, get.value(card, player) * 0.08);
                }, 0);
                var healValue = helper.healScore(player, player, heal);
                var resourceCost = player.hasNengLiang("shuiJing") ? 0.85 : 1.45;
                var score = healValue + pressure * 1.8 + discard * 0.2 - discardCost - resourceCost;
                if (get.shiQi(player.side) <= 5) score += 0.8;
                return score >= 0.75;
            };
        }

        if (dragon) {
            if (!dragon.ai) dragon.ai = {};
            if (!dragon.ai.effect) dragon.ai.effect = {};
            dragon.ai.effect.player_use = function (card, player, target) {
                if (!player.isHengZhi() || !card || get.type(card) != "gongJi" || !target) return;
                var storage = player.storage || {};
                var locked = storage.baiShiHuanLongQuan && storage.baiShiHuanLongQuan[0];
                if (locked && target != locked) return [0, 0, 0.05, 1];
                if (locked == target) return [1, 0, 1, -1.8];
                var plan = bestDragonTarget(player, (get.info(card, false) && get.info(card, false).damageNum || 2) + 2);
                if (plan.target == target) return [1, 0, 1, -1.5];
            };
        }
    }

    function patchDieWuZheActionChain(helper) {
        function cocoons(player) {
            return player.getGaiPai("jian") || [];
        }

        function handLimitAfterPupaChange(player, delta) {
            var currentPupa = player.countZhiShiWu("DWZyong");
            var nextPupa = Math.max(0, currentPupa + delta);
            // 由当前最终上限反推【生命之火】生效前的基础上限；当上限已经被压至3时，
            // 标记可能继续堆叠，因此移除1【蛹】未必立即提高最终上限。
            var currentLimit = player.getHandcardLimit();
            var estimatedBase = currentLimit > 3 ? currentLimit + currentPupa : (game.handcardLimit || 6);
            return Math.max(3, estimatedBase - nextPupa);
        }

        function hasSamePair(cards) {
            var suits = {};
            for (var i = 0; i < cards.length; i++) {
                var suit = get.xiBie(cards[i]);
                suits[suit] = (suits[suit] || 0) + 1;
                if (suits[suit] >= 2) return true;
            }
            return false;
        }

        function cocoonSuitCount(cards) {
            var suits = {};
            (cards || []).forEach(function (card) {
                var suit = get.xiBie(card);
                suits[suit] = (suits[suit] || 0) + 1;
            });
            return suits;
        }

        function combinations(cards, count) {
            var result = [];
            function visit(index, selected) {
                if (selected.length == count) {
                    result.push(selected.slice());
                    return;
                }
                for (var i = index; i < cards.length; i++) {
                    selected.push(cards[i]);
                    visit(i + 1, selected);
                    selected.pop();
                }
            }
            visit(0, []);
            return result;
        }

        function bestCocoonRemoval(player, count, options) {
            options = options || {};
            var cards = cocoons(player);
            if (cards.length < count) return null;
            var beforePair = hasSamePair(cards);
            var beforeSuits = cocoonSuitCount(cards);
            var best = null;
            combinations(cards, count).forEach(function (chosen) {
                if (options.sameSuit && chosen.some(function (card) {
                    return get.xiBie(card) != get.xiBie(chosen[0]);
                })) return;
                var remaining = cards.filter(function (card) { return !chosen.includes(card); });
                var score = 0;
                chosen.forEach(function (card) {
                    // 法术【茧】还能转化为【凋零】，通常比普通【茧】更值得保留。
                    score += Math.max(0.05, get.value(card, player) * 0.04);
                    if (get.type(card) == "faShu") score += options.preferSpell ? -1.15 : 0.65;
                    if (beforeSuits[get.xiBie(card)] == 2 && !options.sameSuit) score += 0.35;
                });
                if (options.preservePair !== false && beforePair && !hasSamePair(remaining)) score += 1.4;
                if (!best || score < best.score) best = { cards: chosen, score: score };
            });
            return best;
        }

        function selfWitherRisk(player, count) {
            var hand = player.countCards("h");
            var limit = player.getHandcardLimit();
            var treatment = Math.max(0, player.zhiLiao || 0);
            var morale = get.shiQi(player.side);
            var risk = 0;
            for (var i = 0; i < count; i++) {
                var room = limit - hand;
                var used = room >= 3 ? 0 : Math.min(2, treatment);
                treatment -= used;
                var actual = 2 - used;
                var overflow = Math.max(0, hand + actual - limit);
                risk += actual * 0.45 + overflow * 3;
                if (overflow >= morale) risk += 30;
                morale -= overflow;
                hand = Math.min(limit, hand + actual);
            }
            return risk;
        }

        function witherTargetPressure(target, player, count) {
            var hand = target.countCards("h");
            var limit = target.getHandcardLimit();
            var treatment = Math.max(0, target.zhiLiao || 0);
            var morale = get.shiQi(target.side);
            var score = 0;
            for (var i = 0; i < count; i++) {
                var room = limit - hand;
                var used = room >= 2 ? 0 : Math.min(1, treatment);
                treatment -= used;
                var actual = 1 - used;
                var overflow = Math.max(0, hand + actual - limit);
                var moraleLoss = Math.min(Math.max(0, morale - 1), overflow);
                score += helper.damageScore(target, player, actual) + moraleLoss * 3;
                morale -= moraleLoss;
                hand = Math.min(limit, hand + actual);
            }
            return score;
        }

        function bestWitherTarget(player, count) {
            return helper.bestEnemy(player, function (target) {
                return witherTargetPressure(target, player, count);
            });
        }

        function bestWitherCount(player, spellCocoons) {
            var enemyMorale = get.shiQi(!player.side);
            // 发动后会把对方士气锁在至少1；对方只剩2士气时禁止AI发动，
            // 避免封死本回合原本可以完成的终结机会。
            if (!spellCocoons.length || enemyMorale <= 2) return 0;
            var bestCount = 0;
            var bestScore = 0.55;
            for (var count = 1; count <= spellCocoons.length; count++) {
                var plan = bestWitherTarget(player, count);
                if (!plan.target) continue;
                // 【凋零】发动后对方士气最低为1，超出该区间的终结收益不会计入。
                var score = plan.score - selfWitherRisk(player, count);
                if (score > bestScore) {
                    bestScore = score;
                    bestCount = count;
                }
            }
            return bestCount;
        }

        function witherCountFromRemoval(player, cards, maximum) {
            var spells = (cards || []).filter(function (card) { return get.type(card) == "faShu"; });
            if (typeof maximum == "number") spells = spells.slice(0, maximum);
            return bestWitherCount(player, spells);
        }

        var dance = lib.skill && lib.skill.wuDong;
        if (dance && markPatched(dance, "fullActionChain")) {
            dance.check = function (card) {
                var player = _status.event.player;
                var count = cocoons(player).length;
                if (count >= 8) return 0;
                if (!card) return helper.wouldOverflow(player, 1, 0) ? 0 : 2;
                // 摸1张会爆牌时强制选择弃牌路线；安全时保留手牌并选择摸牌路线。
                if (!helper.wouldOverflow(player, 1, 0)) return 0;
                return 20 - get.value(card, player);
            };
            dance.ai.order = function (item, player) {
                var count = cocoons(player).length;
                if (count >= 8) return 0;
                return count <= 3 ? 5 : 3.2;
            };
            dance.ai.result.player = function (player) {
                if (cocoons(player).length >= 8) return -3;
                if (helper.wouldOverflow(player, 1, 0) && player.countCards("h") == 0) return -3;
                return 1 + Math.max(0, 4 - cocoons(player).length) * 0.3;
            };
        }

        var powder = lib.skill && lib.skill.duFen;
        if (powder && markPatched(powder, "fullActionChain")) {
            powder.cost = async function (event, trigger, player) {
                var target = trigger.player;
                var before = helper.damagePressure(target, player, trigger.num || 1);
                var after = helper.damagePressure(target, player, (trigger.num || 1) + 1);
                var witherCount = witherCountFromRemoval(player, cocoons(player), 1);
                var removal = bestCocoonRemoval(player, 1, { preservePair: true, preferSpell: witherCount > 0 });
                witherCount = removal ? bestWitherCount(player, removal.cards.filter(function (card) { return get.type(card) == "faShu"; })) : 0;
                var use = target && target.side != player.side && (after - before >= 0.7 || helper.overflowAfterDamage(target, (trigger.num || 1) + 1) > helper.overflowAfterDamage(target, trigger.num || 1));
                if (target && target.side != player.side && witherCount > 0) use = true;
                if (removal && removal.score >= 1.2 && get.shiQi(!player.side) > 3) use = false;
                var result = await player.chooseCardButton(cocoons(player), "是否发动【毒粉】，移除1个【茧】，该次伤害额外+1")
                    .set("use", use).set("chosen", removal && removal.cards[0]).set("ai", function (button) {
                        return _status.event.use && button.link == _status.event.chosen ? 20 : 0;
                    }).forResult();
                event.result = { bool: !!(result.bool && result.links && result.links.length), cost_data: result.links || [] };
            };
        }

        var pilgrimage = lib.skill && lib.skill.chaoSheng;
        if (pilgrimage && markPatched(pilgrimage, "fullActionChain")) {
            pilgrimage.cost = async function (event, trigger, player) {
                var before = helper.overflowAfterDamage(player, trigger.num || 1);
                var after = helper.overflowAfterDamage(player, Math.max(0, (trigger.num || 1) - 1));
                var witherCount = witherCountFromRemoval(player, cocoons(player), 1);
                var removal = bestCocoonRemoval(player, 1, { preservePair: true, preferSpell: witherCount > 0 });
                witherCount = removal ? bestWitherCount(player, removal.cards.filter(function (card) { return get.type(card) == "faShu"; })) : 0;
                var preventsMorale = before > after;
                var use = preventsMorale || get.shiQi(player.side) <= 4 || (trigger.num || 1) >= 3 || witherCount > 0;
                if (!preventsMorale && removal && removal.score >= 1.2 && get.shiQi(player.side) > 4) use = false;
                var result = await player.chooseCardButton(cocoons(player), "是否发动【朝圣】，移除1个【茧】，抵御1点伤害")
                    .set("use", use).set("chosen", removal && removal.cards[0]).set("ai", function (button) {
                        return _status.event.use && button.link == _status.event.chosen ? 20 : 0;
                    }).forResult();
                event.result = { bool: !!(result.bool && result.links && result.links.length), cost_data: result.links || [] };
            };
        }

        var mirror = lib.skill && lib.skill.jingHuaShuiYue;
        if (mirror && markPatched(mirror, "fullActionChain")) {
            mirror.cost = async function (event, trigger, player) {
                var cards = cocoons(player);
                var witherCount = witherCountFromRemoval(player, cards, 2);
                var removal = bestCocoonRemoval(player, 2, { sameSuit: true, preservePair: false, preferSpell: witherCount > 0 });
                witherCount = removal ? bestWitherCount(player, removal.cards.filter(function (card) { return get.type(card) == "faShu"; })) : 0;
                var target = trigger.player;
                var originalOverflow = helper.overflowAfterDamage(target, 2);
                var splitOverflow = helper.overflowAfterDamage(target, 1) * 2;
                var originalValue = helper.damagePressure(target, player, 2);
                var splitValue = helper.damagePressure(target, player, 1) * 2;
                // 两次1点伤害只有在治疗分段消耗、爆牌分段结算或相关1点伤害响应带来
                // 明确增量时才值得支付同系对子；不能仅因【茧】较多就发动。
                var splitGain = splitValue - originalValue + (splitOverflow - originalOverflow) * 1.5;
                if ((target.zhiLiao || 0) == 1) splitGain += 1.6;
                if (witherCount > 0) splitGain += 0.8 * witherCount;
                var use = target.side != player.side && !!removal && (splitGain > removal.score + 0.35 || get.shiQi(!player.side) > 1 && splitOverflow > originalOverflow);
                var result = await player.chooseCardButton(cards, 2, "是否发动【镜花水月】，移除2张同系【茧】")
                    .set("filterButton", function (button) {
                        return !ui.selected.buttons.length || get.xiBie(button.link) == get.xiBie(ui.selected.buttons[0].link);
                    }).set("use", use).set("chosen", removal && removal.cards || []).set("ai", function (button) {
                        return _status.event.use && _status.event.chosen.includes(button.link) ? 20 - _status.event.chosen.indexOf(button.link) : 0;
                    }).forResult();
                event.result = { bool: !!(result.bool && result.links && result.links.length == 2), cost_data: result.links || [] };
            };
        }

        var wither = lib.skill && lib.skill.diaoLing;
        if (wither && markPatched(wither, "fullActionChain")) {
            wither.cost = async function (event, trigger, player) {
                var spellCocoons = (trigger.cards || []).filter(function (card) { return get.type(card) == "faShu"; });
                var safeCount = bestWitherCount(player, spellCocoons);
                var selected = helper.lowValueCards(spellCocoons, safeCount);
                var result = await player.chooseCardButton(trigger.cards || [], [1, Infinity], "是否发动【凋零】，展示法术【茧】")
                    .set("filterButton", function (button) { return get.type(button.link) == "faShu"; })
                    .set("selected", selected).set("ai", function (button) {
                        return _status.event.selected.includes(button.link) ? 10 - get.value(button.link) : 0;
                    }).forResult();
                event.result = { bool: !!(result.bool && result.links && result.links.length), cost_data: result.links || [] };
            };
            wither.content = async function (event, trigger, player) {
                if (!player.hasSkill("diaoLing_xiaoGuo")) player.addTempSkill("diaoLing_xiaoGuo", { player: "phaseBefore" });
                await player.showHiddenCards(event.cost_data);
                for (var i = 0; i < event.cost_data.length; i++) {
                    var plan = bestWitherTarget(player, 1);
                    var targets = await player.chooseTarget("对目标角色造成1点法术伤害", true)
                        .set("bestTarget", plan.target).set("ai", function (target) {
                            if (target.side == _status.event.player.side) return -100;
                            if (target == _status.event.bestTarget) return 20;
                            return witherTargetPressure(target, _status.event.player, 1);
                        }).forResultTargets();
                    if (targets && targets.length) await targets[0].faShuDamage(1, player);
                    await player.faShuDamage(2, player);
                }
            };
        }

        var hatch = lib.skill && lib.skill.yongHua;
        if (hatch && markPatched(hatch, "fullActionChain")) {
            hatch.ai.order = function (item, player) {
                var room = 8 - cocoons(player).length;
                var futureLimit = handLimitAfterPupaChange(player, 1);
                var overflow = Math.max(0, player.countCards("h") - futureLimit);
                if (room < 4 || overflow > 0) return 0;
                return cocoons(player).length <= 2 ? 6.5 : 4.2;
            };
            hatch.ai.result.player = function (player) {
                if (helper.shouldReserveSpecial(_status.event, player)) return -6;
                var room = 8 - cocoons(player).length;
                var futureLimit = handLimitAfterPupaChange(player, 1);
                if (room < 4 || player.countCards("h") > futureLimit) return -5;
                return 1.7 + Math.max(0, 4 - cocoons(player).length) * 0.35;
            };
        }

        var inversion = lib.skill && lib.skill.daoNiZhiDie;
        if (inversion && markPatched(inversion, "fullActionChain")) {
            inversion.ai.order = function (item, player) {
                var handPressure = player.countCards("h") - player.getHandcardLimit();
                var hasPupa = player.countZhiShiWu("DWZyong") > 0;
                return handPressure > 0 || hasPupa ? 5.2 : 2.1;
            };
            inversion.ai.result.player = function (player) {
                if (player.countCards("h") < 2) return -10;
                var pupa = player.countZhiShiWu("DWZyong");
                var currentLimit = player.getHandcardLimit();
                var restoredLimit = pupa > 0 ? handLimitAfterPupaChange(player, -1) : currentLimit;
                var relief = Math.max(0, player.countCards("h") - 2 - currentLimit) + Math.max(0, restoredLimit - currentLimit) * 0.6;
                return relief + (pupa > 0 && cocoons(player).length >= 2 ? 1 : 0);
            };
            inversion.content = async function (event, trigger, player) {
                await player.removeBiShaShuiJing();
                await player.chooseToDiscard(2, true);

                var cocoonCards = cocoons(player);
                var hasPupa = player.countZhiShiWu("DWZyong") > 0;
                var noHealTarget = helper.bestEnemy(player, function (target) {
                    var overflow = Math.max(0, target.countCards("h") + 1 - target.getHandcardLimit());
                    return helper.damageScore(target, player, 1) + overflow * 3;
                });
                var damageValue = noHealTarget.target ? noHealTarget.score : 0;
                var witherCount = witherCountFromRemoval(player, cocoonCards, 2);
                var removalPlan = bestCocoonRemoval(player, 2, { preservePair: true, preferSpell: witherCount > 0 });
                witherCount = removalPlan ? bestWitherCount(player, removalPlan.cards.filter(function (card) { return get.type(card) == "faShu"; })) : 0;
                var removeCost = removalPlan ? 0.45 + removalPlan.score : helper.selfDamageRisk(player, 4, 2);
                var currentLimit = player.getHandcardLimit();
                var restoredLimit = hasPupa ? handLimitAfterPupaChange(player, -1) : currentLimit;
                var pupaValue = hasPupa ? 1 + Math.max(0, restoredLimit - currentLimit) * 0.8 : -20;
                if (cocoonCards.length >= 6) pupaValue += 0.8;
                var choice = hasPupa && pupaValue - removeCost > damageValue + 0.4 ? "选项二" : "选项一";

                var choiceList = ["对目标角色造成1点法术伤害③，该伤害不能用[治疗]抵御", "<span class='tiaoJian'>(移除2个【茧】或对自己造成4点法术伤害③)</span>移除1个<span class='hong'>【蛹】</span>"];
                var control = await player.chooseControl().set("choiceList", choiceList).set("choice", choice).set("ai", function () {
                    return _status.event.choice;
                }).forResultControl();

                if (control == "选项一") {
                    var targets = await player.chooseTarget("对目标角色造成1点法术伤害③，该伤害不能用[治疗]抵御", true).set("ai", function (target) {
                        var player = _status.event.player;
                        if (target.side == player.side) return -10;
                        var overflow = Math.max(0, target.countCards("h") + 1 - target.getHandcardLimit());
                        return helper.damageScore(target, player, 1) + overflow * 3;
                    }).forResultTargets();
                    if (targets && targets.length) await targets[0].faShuDamage(1, player).set("canZhiLiao", false);
                } else if (control == "选项二") {
                    var cards = cocoons(player);
                    var result = { bool: false, links: [] };
                    if (cards.length >= 2) {
                        var removal = bestCocoonRemoval(player, 2, { preservePair: true, preferSpell: witherCountFromRemoval(player, cards, 2) > 0 });
                        result = await player.chooseCardButton(cards, 2, "移除2个【茧】或对自己造成4点法术伤害③")
                            .set("chosen", removal && removal.cards || []).set("ai", function (button) {
                            return _status.event.chosen.includes(button.link) ? 20 - _status.event.chosen.indexOf(button.link) : 0;
                        }).forResult();
                    }
                    if (result.bool && result.links && result.links.length == 2) await player.discard(result.links, "jian").set("jian", true);
                    else await player.faShuDamage(4, player);
                    await player.removeZhiShiWu("DWZyong");
                }
            };
        }
    }

    function patchShouLingWuShiActionChain(helper) {
        function attackTargetEnabled(player, card, target) {
            if (!target || target.side == player.side) return false;
            try {
                if (lib.filter && typeof lib.filter.targetEnabled == "function") {
                    return lib.filter.targetEnabled(card, player, target);
                }
            } catch (e) { }
            return true;
        }

        function usableAttacks(player) {
            return player.getCards("h", function (card) {
                // 【一击无念】在当前攻击结束后才增加行动；此时用常规
                // hasUseTargetXingBei 会因尚无攻击行动而误判手牌不可用。
                return get.type(card) == "gongJi";
            });
        }

        function attackDamage(card) {
            var info = card && get.info(card, false);
            return info && typeof info.damageNum == "number" ? info.damageNum : 2;
        }

        function pendingNoMind(player) {
            return player.hasSkill("yiJiWuNian_1") && player.storage && player.storage.yiJiWuNian === false;
        }

        function noMindHit(player, target, card) {
            if (get.mingGe(card) == "ji") return 0.99;
            var responses = get.xiBie(card) == "an" ? 0 : helper.responseCount(target, card);
            if (responses <= 0) return 0.93;
            if (responses == 1) return 0.46;
            if (responses == 2) return 0.24;
            return 0.12;
        }

        function reversePlan(player, target, card, souls, assumeForm, enhancedAttack) {
            if (!target || target.side == player.side || target.countCards("h") >= 4) return null;
            var hand = target.countCards("h");
            var hit = enhancedAttack || pendingNoMind(player) ? noMindHit(player, target, card) : helper.likelyHit(player, target, card);
            var form = assumeForm === undefined ? player.isHengZhi() : assumeForm;
            var baseDamage = attackDamage(card) + (form && target.isHengZhi() ? 1 : 0);
            var normalValue = helper.damagePressure(target, player, baseDamage);
            var best = null;
            for (var x = 0; x <= souls; x++) {
                var required = x + 2;
                var discarded = Math.min(hand, required);
                var shortage = hand < required;
                var value = discarded * 0.72;
                if (shortage) {
                    value += 3.2;
                    if (get.shiQi(target.side) <= 1) value += 30;
                    else if (get.shiQi(target.side) <= 3) value += 1.5;
                }
                // 移除【兽魂】会等量转化为【残心】，因此仅计较低的资源机会成本。
                var residualRoom = Math.max(0, 4 - player.countZhiShiWu("canXin"));
                value += Math.min(x, residualRoom) * 0.24;
                var score = hit * (value - normalValue) - x * (1 - hit) * 0.32;
                if (!best || score > best.score + 0.05 || Math.abs(score - best.score) <= 0.05 && x < best.x) {
                    best = { x: x, score: score, shortage: shortage, hit: hit, value: value };
                }
            }
            return best;
        }

        function bestAttackPlan(player, noMind, assumeForm) {
            var cards = usableAttacks(player);
            var form = assumeForm === undefined ? player.isHengZhi() : assumeForm;
            var souls = player.countZhiShiWu("shouHun");
            var best = null;
            cards.forEach(function (card) {
                game.filterPlayer(function (target) {
                    if (!attackTargetEnabled(player, card, target)) return false;
                    var hit = noMind ? noMindHit(player, target, card) : helper.likelyHit(player, target, card);
                    var damage = attackDamage(card) + (form && target.isHengZhi() ? 1 : 0);
                    var score = helper.damagePressure(target, player, damage) * hit;
                    if (!form && souls < 2) score += hit * 0.55;
                    if (form && target.countCards("h") < 4) {
                        var reverse = reversePlan(player, target, card, souls, form, noMind);
                        if (reverse && reverse.score > 0.25) score += reverse.score;
                    }
                    if (noMind && get.mingGe(card) == "ji") score += 1.2;
                    else if (noMind && (helper.shieldCount(target) || helper.holyLightCount(target))) score += 0.75;
                    if (!best || score > best.score) best = { card: card, target: target, score: score, hit: hit };
                    return false;
                });
            });
            return best;
        }

        var noMind = lib.skill && lib.skill.yiJiWuNian;
        if (noMind && markPatched(noMind, "fullActionChain")) {
            noMind.check = function (event, player) {
                var plan = bestAttackPlan(player, true);
                return !!plan && plan.score > 0.35;
            };
            if (!noMind.mod) noMind.mod = {};
            var oldOrder = noMind.mod.aiOrder;
            noMind.mod.aiOrder = function (player, card, num) {
                if (typeof oldOrder == "function") {
                    var oldResult = oldOrder.apply(this, arguments);
                    if (typeof oldResult == "number") num = oldResult;
                }
                if (!pendingNoMind(player) || !card || get.type(card) != "gongJi") return;
                if (get.mingGe(card) == "ji") return num + 3.2;
                return num + 0.8;
            };
        }

        var soulMind = lib.skill && lib.skill.shouHunYiNian;
        if (soulMind && markPatched(soulMind, "fullActionChain")) {
            if (!soulMind.ai) soulMind.ai = {};
            if (!soulMind.ai.effect) soulMind.ai.effect = {};
            soulMind.ai.effect.player_use = function (card, player, target) {
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side) return;
                var bonus = 0;
                var enhanced = pendingNoMind(player);
                var hit = enhanced ? noMindHit(player, target, card) : helper.likelyHit(player, target, card);
                if (!player.isHengZhi() && player.countZhiShiWu("shouHun") < 2) bonus += 0.55 * hit;
                if (player.isHengZhi() && target.isHengZhi()) {
                    bonus += Math.max(0.5, helper.damagePressure(target, player, attackDamage(card) + 1) - helper.damagePressure(target, player, attackDamage(card)));
                }
                if (player.isHengZhi() && target.countCards("h") < 4) {
                    var reverse = reversePlan(player, target, card, player.countZhiShiWu("shouHun"));
                    if (reverse && reverse.score > 0.25) bonus += reverse.score;
                }
                if (enhanced && get.mingGe(card) == "ji") bonus += 1.5;
                else if (enhanced && (helper.shieldCount(target) || helper.holyLightCount(target))) bonus += 0.8;
                if (bonus > 0.15) return [1, 0, 1, -Math.min(6, bonus)];
            };
        }

        var warning = lib.skill && lib.skill.shouHunJingJie;
        if (warning && markPatched(warning, "fullActionChain")) {
            warning.check = function (event, player) {
                var enemyDiscard = game.hasPlayer(function (target) {
                    return target.side != player.side && target.countCards("h") > 0;
                });
                var horizontalTarget = game.hasPlayer(function (target) {
                    return target.side != player.side && target.isHengZhi();
                });
                var pressuredAlly = game.hasPlayer(function (target) {
                    return target.side == player.side && target.countCards("h") > target.getHandcardLimit();
                });
                return enemyDiscard || pressuredAlly || horizontalTarget && usableAttacks(player).length > 0;
            };
            warning.content = function () {
                "step 0"
                player.removeZhiShiWu("shouHun");
                "step 1"
                player.hengZhi();
                "step 2"
                player.chooseTarget(true, "目标角色弃1张牌[展示]").set("owner", player).set("ai", function (target) {
                    var owner = _status.event.owner;
                    if (target.countCards("h") <= 0) return -20;
                    var pressure = target.countCards("h") - target.getHandcardLimit();
                    if (target.side != owner.side) {
                        var spells = target.countCards("h", function (card) { return get.type(card) == "faShu"; });
                        return 7 + Math.max(0, pressure) * 2 + target.countCards("h") * 0.08 + spells * 0.15;
                    }
                    var cheapSpell = target.countCards("h", function (card) {
                        return get.type(card) == "faShu" && get.value(card, target) <= 5.5;
                    });
                    if (pressure > 0) return 3 + pressure * 2 + cheapSpell;
                    if (target == owner && cheapSpell) return 0.8;
                    return -5;
                });
                "step 3"
                if (!result.bool || !result.targets || !result.targets.length) {
                    event.finish();
                    return;
                }
                event.target = result.targets[0];
                event.target.chooseToDiscard("h", true).set("showCards", true).set("owner", player).set("ai", function (card) {
                    var owner = _status.event.owner;
                    var target = _status.event.player;
                    var score = 8 - get.value(card, target);
                    if (get.type(card) == "faShu") score += target.side == owner.side ? 2.2 : -1.1;
                    return score;
                });
                "step 4"
                if (result.cards && result.cards.length && get.type(result.cards[0]) == "faShu") {
                    player.addZhiShiWu("shouHun");
                }
            };
        }

        var counter = lib.skill && lib.skill.shouFan;
        if (counter && markPatched(counter, "fullActionChain")) {
            counter.cost = async function (event, trigger, player) {
                var souls = player.countZhiShiWu("shouHun");
                var source = trigger.source;
                var list = [];
                for (var i = 1; i <= souls; i++) list.push(i);
                list.push("cancel2");
                var cards = helper.lowValueCards(player.getCards("h"), souls);
                var bestX = "cancel2";
                var bestScore = 0.45;
                if (source && source.side != player.side) {
                    for (var x = 1; x <= souls && x <= cards.length; x++) {
                        var score = source.countCards("h") > 0 ? 1.05 : 0;
                        var pressure = Math.max(0, player.countCards("h") - player.getHandcardLimit());
                        score += Math.min(x, pressure) * 0.75;
                        var residualAfter = Math.min(4, player.countZhiShiWu("canXin") + x);
                        score += x * 0.28;
                        if (residualAfter >= 4 && player.countZhiShiWu("canXin") < 4 && bestAttackPlan(player, true)) score += 2.2;
                        for (var c = 0; c < x; c++) score -= Math.max(0.12, get.value(cards[c], player) * 0.105);
                        if (source.countCards("h", function (card) { return get.type(card) == "faShu"; }) > 0) score += 0.25;
                        if (score > bestScore) {
                            bestScore = score;
                            bestX = x;
                        }
                    }
                }
                var control = await player.chooseControl(list).set("prompt", get.prompt("shouFan")).set("prompt2", lib.translate.shouFan_info)
                    .set("bestX", bestX).set("ai", function () { return _status.event.bestX; }).forResultControl();
                event.result = { bool: control != "cancel2", cost_data: control };
            };
        }

        var reverse = lib.skill && lib.skill.niFanJuHeZhan;
        if (reverse && markPatched(reverse, "fullActionChain")) {
            reverse.cost = async function (event, trigger, player) {
                var souls = player.countZhiShiWu("shouHun");
                var list = [];
                for (var i = 0; i <= souls; i++) list.push(i);
                list.push("cancel2");
                var plan = reversePlan(player, trigger.target, trigger.card, souls);
                var bestX = plan && plan.score > 0.35 ? plan.x : "cancel2";
                var control = await player.chooseControl(list).set("prompt", get.prompt("niFanJuHeZhan")).set("prompt2", lib.translate.niFanJuHeZhan_info)
                    .set("bestX", bestX).set("ai", function () { return _status.event.bestX; }).forResultControl();
                event.result = { bool: control != "cancel2", cost_data: control };
            };
        }

        var form = lib.skill && lib.skill.yuHunLiuJuHeShi;
        if (form && markPatched(form, "fullActionChain")) {
            form.check = function (event, player) {
                if (helper.shouldReserveSpecial(event, player)) return false;
                var current = bestAttackPlan(player, false, player.isHengZhi());
                if (!current) return false;
                var souls = player.countZhiShiWu("shouHun");
                var residual = player.countZhiShiWu("canXin");
                if (player.isHengZhi()) {
                    if (residual >= 3) return true;
                    var unlocksMorale = game.hasPlayer(function (target) {
                        if (target.side == player.side || target.countCards("h") >= 4) return false;
                        return Math.max(0, target.countCards("h") - 1) > souls && Math.max(0, target.countCards("h") - 1) <= souls + 1;
                    });
                    return unlocksMorale || souls == 0 && current.score >= 2.4;
                }
                var transformed = bestAttackPlan(player, false, true);
                var gain = transformed ? transformed.score - current.score : 0;
                var hasHorizontal = game.hasPlayer(function (target) {
                    return target.side != player.side && target.isHengZhi();
                });
                var reverseWindow = game.hasPlayer(function (target) {
                    return target.side != player.side && target.countCards("h") < 4;
                });
                return gain >= 1.15 || hasHorizontal && transformed && transformed.score >= 2.2 || reverseWindow && souls == 0 && transformed && transformed.score >= 2.6;
            };
            form.content = function () {
                "step 0"
                player.removeBiShaBaoShi();
                "step 1"
                player.addZhiShiWu("shouHun", 1, Infinity);
                "step 2"
                player.chooseControl(["摸", "弃", "放弃"]).set("ai", function () {
                    var player = _status.event.player;
                    var actionHelper = lib.xingBeiShiZhouNianAi;
                    if (actionHelper && !actionHelper.wouldOverflow(player, 1, 0)) return "摸";
                    if (player.countCards("h") > 0) return "弃";
                    return "放弃";
                });
                "step 3"
                if (result.control == "摸") player.draw();
                else if (result.control == "弃") player.chooseToDiscard("h", true, 1).set("ai", function (card) { return 8 - get.value(card); });
                "step 4"
                if (player.isHengZhi()) player.addZhiShiWu("canXin");
                else player.hengZhi();
            };
        }
    }

    function patchFengZhiJianSheng(helper) {
        function activeAttackCount(player) {
            var stat = player.getStat("gongJi");
            return stat && stat.zhuDong ? stat.zhuDong.length : 0;
        }

        function canReachThirdAttack(player, currentCard) {
            var count = activeAttackCount(player);
            var needed = 3 - count;
            if (needed <= 1) return true;

            var usableAttacks = player.countCards("h", function (card) {
                return get.type(card) == "gongJi" && player.hasUseTargetXingBei(card);
            });
            if (usableAttacks < needed) return false;

            var storage = player.storage || {};
            var actionSlots = Math.max(0, storage.gongJiOrFaShu || 0) + Math.max(0, storage.gongJi || 0);
            if (Array.isArray(storage.extraXingDong)) {
                for (var i = 0; i < storage.extraXingDong.length; i++) {
                    var action = storage.extraXingDong[i];
                    if (action && (action.xingDong == "gongJi" || action.xingDong == "gongJiOrFaShu")) actionSlots++;
                }
            }
            actionSlots = Math.max(1, actionSlots);

            var galeActions = player.countCards("h", function (card) {
                return get.type(card) == "gongJi" && typeof card.hasDuYou == "function" && card.hasDuYou("jiFengJi") && player.hasUseTargetXingBei(card);
            });

            var pursuitAction = 0;
            var pursuitUnused = player.hasSkill("fengNuZhuiJi") && (typeof player.countSkill != "function" || player.countSkill("fengNuZhuiJi") == 0);
            if (pursuitUnused) {
                var remainingWind = player.countCards("h", function (card) {
                    if (card == currentCard) return false;
                    return get.type(card) == "gongJi" && get.xiBie(card) == "feng" && player.hasUseTargetXingBei(card);
                });
                if (remainingWind > 0) pursuitAction = 1;
            }

            var shadowAction = 0;
            var shadowUnused = player.hasSkill("jianYing") && (typeof player.countSkill != "function" || player.countSkill("jianYing") == 0);
            if (shadowUnused && typeof player.canBiShaShuiJing == "function" && player.canBiShaShuiJing()) shadowAction = 1;

            return Math.min(usableAttacks, actionSlots + galeActions + pursuitAction + shadowAction) >= needed;
        }

        var pursuit = lib.skill && lib.skill.fengNuZhuiJi;
        if (pursuit && markPatched(pursuit, "comboPlanning")) {
            pursuit.cost = async function (event, trigger, player) {
                var list = ["cancel2"];
                if (player.countCards("h", function (card) {
                    return get.xiBie(card) == "feng" && get.type(card) == "gongJi" && player.hasUseTargetXingBei(card);
                }) > 0) list.unshift("ok2");
                var control = await player.chooseControl(list).set("prompt", get.prompt2("fengNuZhuiJi")).set("ai", function () {
                    var player = _status.event.player;
                    var stat = player.getStat("gongJi");
                    var count = stat && stat.zhuDong ? stat.zhuDong.length : 0;
                    if (count < 3) return "ok2";
                    if (get.shiQi(!player.side) <= 2) return "ok2";
                    var pressure = game.hasPlayer(function (target) {
                        return target.side != player.side && target.countCards("h") >= target.getHandcardLimit() - 1;
                    });
                    return pressure ? "ok2" : "cancel2";
                }).forResultControl();
                event.result = { bool: control == "ok2" };
            };
            pursuit.check = function (event, player) {
                var usableWind = player.countCards("h", function (card) {
                    return get.xiBie(card) == "feng" && get.type(card) == "gongJi" && player.hasUseTargetXingBei(card);
                });
                if (usableWind <= 0) return false;
                var stat = player.getStat("gongJi");
                var count = stat && stat.zhuDong ? stat.zhuDong.length : 0;
                if (count < 3) return true;
                if (get.shiQi(!player.side) <= 2) return true;
                return game.hasPlayer(function (target) {
                    return target.side != player.side && target.countCards("h") >= target.getHandcardLimit() - 1;
                });
            };
        }

        var shadow = lib.skill && lib.skill.jianYing;
        if (shadow && markPatched(shadow, "comboPlanning")) {
            shadow.check = function (event, player) {
                var usableAttacks = player.countCards("h", function (card) {
                    return get.type(card) == "gongJi" && player.hasUseTargetXingBei(card);
                });
                if (usableAttacks <= 0) return false;
                var stat = player.getStat("gongJi");
                var count = stat && stat.zhuDong ? stat.zhuDong.length : 0;
                if (count < 3) return true;
                if (get.shiQi(!player.side) <= 2) return true;
                return game.hasPlayer(function (target) {
                    return target.side != player.side && target.countCards("h") >= target.getHandcardLimit() - 1;
                });
            };
        }

        var gale = lib.skill && lib.skill.jiFengJi;
        if (gale && markPatched(gale, "starterCard")) {
            if (!gale.mod) gale.mod = {};
            var oldGaleUseful = gale.mod.aiUseful;
            var oldGaleValue = gale.mod.aiValue;
            var oldGaleOrder = gale.mod.aiOrder;
            gale.mod.aiUseful = function (player, card, num) {
                if (card && typeof card.hasDuYou == "function" && card.hasDuYou("jiFengJi") && player.hasSkill("jiFengJi")) return 8.8;
                if (typeof oldGaleUseful == "function") return oldGaleUseful.apply(this, arguments);
            };
            gale.mod.aiValue = function (player, card, num) {
                if (card && typeof card.hasDuYou == "function" && card.hasDuYou("jiFengJi") && player.hasSkill("jiFengJi")) return 8.8;
                if (typeof oldGaleValue == "function") return oldGaleValue.apply(this, arguments);
            };
            gale.mod.aiOrder = function (player, card, num) {
                if (typeof oldGaleOrder == "function") {
                    var oldResult = oldGaleOrder.apply(this, arguments);
                    if (typeof oldResult == "number") num = oldResult;
                }
                if (!card || typeof card.hasDuYou != "function" || !card.hasDuYou("jiFengJi")) return;
                var stat = player.getStat("gongJi");
                var count = stat && stat.zhuDong ? stat.zhuDong.length : 0;
                if (count == 0) return num + 2.5;
                if (count < 2) return num + 1.4;
                return num + 0.4;
            };
        }

        var fierce = lib.skill && lib.skill.lieFengJi;
        if (fierce && markPatched(fierce, "shieldBreakerCard")) {
            if (!fierce.mod) fierce.mod = {};
            var oldFierceUseful = fierce.mod.aiUseful;
            var oldFierceValue = fierce.mod.aiValue;
            fierce.mod.aiUseful = function (player, card, num) {
                if (card && typeof card.hasDuYou == "function" && card.hasDuYou("lieFengJi") && player.hasSkill("lieFengJi")) {
                    var shielded = game.hasPlayer(function (target) {
                        return target.side != player.side && target.hasJiChuXiaoGuo("_shengDun");
                    });
                    return shielded ? 9.2 : 6;
                }
                if (typeof oldFierceUseful == "function") return oldFierceUseful.apply(this, arguments);
            };
            fierce.mod.aiValue = function (player, card, num) {
                if (card && typeof card.hasDuYou == "function" && card.hasDuYou("lieFengJi") && player.hasSkill("lieFengJi")) {
                    var shielded = game.hasPlayer(function (target) {
                        return target.side != player.side && target.hasJiChuXiaoGuo("_shengDun");
                    });
                    return shielded ? 9.5 : 6.2;
                }
                if (typeof oldFierceValue == "function") return oldFierceValue.apply(this, arguments);
            };
        }

        var holySword = lib.skill && lib.skill.shengJian;
        if (holySword && markPatched(holySword, "thirdAttackTarget")) {
            if (!holySword.ai) holySword.ai = {};
            if (!holySword.ai.effect) holySword.ai.effect = {};
            var oldPlayerUse = holySword.ai.effect.player_use;
            holySword.ai.effect.player_use = function (card, player, target, current) {
                if (typeof oldPlayerUse == "function") {
                    var oldResult = oldPlayerUse.apply(this, arguments);
                    if (oldResult !== undefined) return oldResult;
                }
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side) return;
                var count = activeAttackCount(player);
                var burstTarget = target.countCards("h") >= 5;
                var hasBurstTarget = game.hasPlayer(function (current) {
                    return current.side != player.side && current.countCards("h") >= 5;
                });

                if (count < 2 && burstTarget && canReachThirdAttack(player, card)) {
                    var hasAlternative = game.hasPlayer(function (current) {
                        return current != target && current.side != player.side;
                    });
                    if (hasAlternative) return [1, 0, 0.05, 1.5];
                }

                if (count == 2) {
                    if (burstTarget) return [1, 0, 1, -6];
                    if (hasBurstTarget) return [1, 0, 0.05, 1.5];
                }
            };
        }
    }

    function patchKuangZhanShi(helper) {
        function predictedHandAfterAttack(player, card) {
            var hand = player.countCards("h");
            var used = player.countCards("h", function (current) {
                if (current == card) return true;
                return card && Array.isArray(card.cards) && card.cards.indexOf(current) != -1;
            });
            return Math.max(0, hand - used);
        }

        function enemyHas(player, card, filter) {
            return game.hasPlayer(function (target) {
                if (target.side == player.side) return false;
                if (lib.filter && typeof lib.filter.targetEnabled == "function" && !lib.filter.targetEnabled(card, player, target)) return false;
                return filter(target);
            });
        }

        var frenzy = lib.skill && lib.skill.kuangHua;
        if (frenzy && markPatched(frenzy, "attackPairValue")) {
            if (!frenzy.ai) frenzy.ai = {};
            if (!frenzy.ai.effect) frenzy.ai.effect = {};
            var oldFrenzyPlayerUse = frenzy.ai.effect.player_use;
            frenzy.ai.effect.player_use = function (card, player, target, current) {
                if (typeof oldFrenzyPlayerUse == "function") {
                    var oldResult = oldFrenzyPlayerUse.apply(this, arguments);
                    if (oldResult !== undefined) return oldResult;
                }
                if (!card || get.type(card) != "gongJi" || !target || target.side == player.side) return;
                if (predictedHandAfterAttack(player, card) <= 3) return;
                var hit = helper.likelyHit(player, target, card);
                if (typeof card.hasDuYou == "function" && card.hasDuYou("xueXingPaoXiao") && target.zhiLiao == 2) hit = 1;
                return [1, 0, 1, -0.9 * hit];
            };
        }

        var bloodyBlade = lib.skill && lib.skill.xueYingKuangDao;
        if (bloodyBlade && markPatched(bloodyBlade, "preferredHandTarget")) {
            if (!bloodyBlade.ai) bloodyBlade.ai = {};
            if (!bloodyBlade.ai.effect) bloodyBlade.ai.effect = {};
            var oldBladePlayerUse = bloodyBlade.ai.effect.player_use;
            bloodyBlade.ai.effect.player_use = function (card, player, target, current) {
                if (typeof oldBladePlayerUse == "function") {
                    var oldResult = oldBladePlayerUse.apply(this, arguments);
                    if (oldResult !== undefined) return oldResult;
                }
                if (!card || typeof card.hasDuYou != "function" || !card.hasDuYou("xueYingKuangDao")) return;
                if (!target || target.side == player.side) return;
                var hasTwo = enemyHas(player, card, function (current) {
                    return current.countCards("h") == 2;
                });
                var hasThree = !hasTwo && enemyHas(player, card, function (current) {
                    return current.countCards("h") == 3;
                });
                var preferred = hasTwo ? 2 : (hasThree ? 3 : 0);
                if (!preferred) return;
                if (target.countCards("h") != preferred) return [1, 0, 0.15, 1];
                var hit = helper.likelyHit(player, target, card);
                return [1, 0, 1, preferred == 2 ? -3.8 * hit : -2.2 * hit];
            };
        }

        var bloodyRoar = lib.skill && lib.skill.xueXingPaoXiao;
        if (bloodyRoar && markPatched(bloodyRoar, "forcedHitTarget")) {
            if (!bloodyRoar.ai) bloodyRoar.ai = {};
            if (!bloodyRoar.ai.effect) bloodyRoar.ai.effect = {};
            var oldRoarPlayerUse = bloodyRoar.ai.effect.player_use;
            bloodyRoar.ai.effect.player_use = function (card, player, target, current) {
                if (typeof oldRoarPlayerUse == "function") {
                    var oldResult = oldRoarPlayerUse.apply(this, arguments);
                    if (oldResult !== undefined) return oldResult;
                }
                if (!card || typeof card.hasDuYou != "function" || !card.hasDuYou("xueXingPaoXiao")) return;
                if (!target || target.side == player.side) return;
                var hasExactHeal = enemyHas(player, card, function (current) {
                    return current.zhiLiao == 2;
                });
                if (!hasExactHeal) return;
                if (target.zhiLiao != 2) return [1, 0, 0.12, 1];
                var normalHit = helper.likelyHit(player, target, card);
                return [1, 0, 1, -2.4 - (1 - normalHit) * 2];
            };
        }

        var tear = lib.skill && lib.skill.siLie;
        if (tear && markPatched(tear, "gemDamageValue")) {
            tear.check = function (event, player) {
                var target = event && event.target;
                if (!target || target.side == player.side) return false;
                var damage = event.damageNum;
                if (typeof damage != "number" && event.getParent) damage = event.getParent().damageNum;
                if (typeof damage != "number") damage = 2;
                var heal = Math.max(0, target.zhiLiao || 0);
                var hand = target.countCards("h");
                var limit = target.getHandcardLimit();
                var baseActual = Math.max(0, damage - heal);
                var boostedActual = Math.max(0, damage + 2 - heal);
                var baseOverflow = Math.max(0, hand + baseActual - limit);
                var boostedOverflow = Math.max(0, hand + boostedActual - limit);
                if (boostedOverflow > baseOverflow) return true;
                var enemyMorale = get.shiQi(!player.side);
                return enemyMorale <= 4 && hand + baseActual < limit && hand + boostedActual >= limit;
            };
            if (!tear.ai) tear.ai = {};
            tear.ai.baoShi = true;
        }
    }

    function patchMoFaShaoNv(helper) {
        function spellCount(target) {
            return target.countCards("h", function (card) {
                return get.type(card) == "faShu";
            });
        }

        function blastCostCount(player) {
            return player.countCards("h", function (card) {
                return get.type(card) == "faShu" && get.xiBie(card) != "guang";
            });
        }

        function magicResponseCount(target) {
            return target.countCards("h", function (card) {
                var name = get.name(card);
                return name == "moDan" || name == "shengGuang";
            });
        }

        function effectiveDamage(target, amount) {
            return Math.max(0, amount - Math.max(0, target.zhiLiao || 0));
        }

        function overflowFromDamage(target, amount) {
            var actual = effectiveDamage(target, amount);
            return Math.max(0, target.countCards("h") + actual - target.getHandcardLimit());
        }

        function damagePressure(target, amount) {
            var actual = effectiveDamage(target, amount);
            var room = target.getHandcardLimit() - target.countCards("h");
            var overflow = Math.max(0, actual - room);
            var score = actual * 0.2 + overflow * 1.7;
            if (room <= 1 && actual > 0) score += 0.8;
            else if (room == 2 && actual >= 2) score += 0.45;
            return score;
        }

        function stormPlan(player) {
            var targets = [];
            game.countPlayer(function (target) {
                if (target.side == player.side) return;
                var actual = effectiveDamage(target, 2);
                var room = target.getHandcardLimit() - target.countCards("h");
                targets.push({
                    overflow: Math.max(0, actual - room),
                    pressured: actual >= room && actual > 0,
                    score: damagePressure(target, 2)
                });
            });
            targets.sort(function (a, b) {
                if (a.overflow != b.overflow) return b.overflow - a.overflow;
                return b.score - a.score;
            });
            targets = targets.slice(0, 2);
            var plan = { overflow: 0, pressured: 0 };
            for (var i = 0; i < targets.length; i++) {
                plan.overflow += targets[i].overflow;
                if (targets[i].pressured) plan.pressured++;
            }
            return plan;
        }

        function firstRecipient(source, direction, originalUser) {
            var current = source;
            var max = game.players && game.players.length ? game.players.length + 1 : 10;
            for (var i = 0; i < max; i++) {
                current = direction == "left" ? current.getPrevious() : current.getNext();
                if (!current) return null;
                if (current == originalUser) continue;
                if (typeof current.hasMark == "function" && current.hasMark("_moDan")) continue;
                if (current.side == source.side) continue;
                return current;
            }
            return null;
        }

        function firstOpponent(player, direction) {
            var current = player;
            var max = game.players && game.players.length ? game.players.length + 1 : 10;
            for (var i = 0; i < max; i++) {
                current = direction == "left" ? current.getPrevious() : current.getNext();
                if (!current) return null;
                if (typeof current.hasMark == "function" && current.hasMark("_moDan")) continue;
                if (current.side == player.side) continue;
                return current;
            }
            return null;
        }

        function magicBulletRouteBonus(player, target) {
            var damage = typeof game.moDan == "number" ? game.moDan : 2;
            var responses = magicResponseCount(target);
            var bonus = -damagePressure(target, damage);
            if (responses <= 0) return bonus - 0.8;

            var left = firstOpponent(player, "left");
            var right = firstOpponent(player, "right");
            var direction = target == left && target != right ? "left" : "right";
            var next = firstRecipient(target, direction, player);
            if (!next) return bonus * 0.45;

            var nextDamage = damage + 1;
            var nextPressure = damagePressure(next, nextDamage);
            var nextResponses = magicResponseCount(next);
            if (next.side == player.side) {
                bonus += nextPressure * (nextResponses > 0 ? 0.45 : 1.25);
                if (nextResponses <= 0) bonus += 1;
            } else {
                bonus -= nextPressure * (nextResponses > 0 ? 0.45 : 1);
            }
            return bonus;
        }

        var blast = lib.skill && lib.skill.moBaoChongJi;
        if (blast && markPatched(blast, "handAndGemPlan")) {
            blast.check = function (card) {
                var player = _status.event.player;
                if (get.xiBie(card) == "guang") return -100;
                var value = get.value(card, player);
                if (get.name(card) == "moDan" && player.countCards("h", function (current) {
                    return get.name(current) == "moDan";
                }) <= 1) value += 2.2;
                return 10 - value;
            };
            if (!blast.ai) blast.ai = {};
            blast.ai.order = function (item, player) {
                if (blastCostCount(player) <= 0) return 0;
                var hand = player.countCards("h");
                var limit = player.getHandcardLimit();
                var order = 4.4;
                if (hand >= limit) order += 2.2;
                else if (hand >= limit - 1) order += 1.2;
                if (!player.canBiShaBaoShi() && helper.recordCount(player, "baoShi") == 0) order += 1;
                var exposed = game.hasPlayer(function (target) {
                    return target.side != player.side && spellCount(target) == 0 && target.countCards("h") >= target.getHandcardLimit() - 2;
                });
                if (exposed) order += 1.1;
                return order;
            };
            if (!blast.ai.result) blast.ai.result = {};
            blast.ai.result.player = function (player) {
                if (blastCostCount(player) <= 0) return -20;
                var room = player.getHandcardLimit() - player.countCards("h");
                var score = 0.8;
                if (room <= 0) score += 1.5;
                else if (room == 1) score += 0.8;
                if (!player.canBiShaBaoShi() && helper.recordCount(player, "baoShi") == 0) score += 0.7;
                return score;
            };
            blast.ai.result.target = function (player, target) {
                var spells = spellCount(target);
                if (spells > 0) return -0.9 - Math.min(0.6, spells * 0.15);
                var pressure = damagePressure(target, 2);
                var selfRoom = player.getHandcardLimit() - player.countCards("h");
                if (selfRoom <= 1) pressure += 0.7;
                return -1.1 - pressure;
            };
        }

        var mastery = lib.skill && lib.skill.moDanZhangWo;
        if (mastery && markPatched(mastery, "routeValue")) {
            if (!mastery.ai) mastery.ai = {};
            if (!mastery.ai.effect) mastery.ai.effect = {};
            var oldMasteryPlayerUse = mastery.ai.effect.player_use;
            mastery.ai.effect.player_use = function (card, player, target, current) {
                if (typeof oldMasteryPlayerUse == "function") {
                    var oldResult = oldMasteryPlayerUse.apply(this, arguments);
                    if (oldResult !== undefined) return oldResult;
                }
                if (!card || get.name(card) != "moDan" || !target || target.side == player.side) return;
                return [1, 0, 1, magicBulletRouteBonus(player, target)];
            };
        }

        var fusion = lib.skill && lib.skill.moDanRongHe;
        if (fusion && markPatched(fusion, "handPressure")) {
            fusion.check = function (card) {
                var player = _status.event.player;
                var pressure = player.countCards("h") - player.getHandcardLimit();
                return 8.5 + Math.max(0, pressure) * 1.3 - get.value(card, player);
            };
            if (!fusion.ai) fusion.ai = {};
            fusion.ai.order = function (item, player) {
                var room = player.getHandcardLimit() - player.countCards("h");
                var order = 3.1;
                if (room <= 0) order += 2;
                else if (room == 1) order += 0.9;
                var pressuredEnemy = game.hasPlayer(function (target) {
                    return target.side != player.side && target.countCards("h") >= target.getHandcardLimit() - 2;
                });
                if (pressuredEnemy) order += 0.7;
                return order;
            };
        }

        var storm = lib.skill && lib.skill.huiMieFengBao;
        if (storm && markPatched(storm, "gemOpportunityCost")) {
            if (!storm.ai) storm.ai = {};
            storm.ai.order = function (item, player) {
                var plan = stormPlan(player);
                if (plan.overflow >= get.shiQi(!player.side)) return 8;
                if (plan.pressured >= 2) return 5.8;
                return 1.4;
            };
            if (!storm.ai.result) storm.ai.result = {};
            storm.ai.result.player = function (player) {
                var plan = stormPlan(player);
                if (plan.overflow >= get.shiQi(!player.side)) return 6;
                var canShedHand = player.countCards("h", function (card) {
                    return get.type(card) == "faShu";
                }) > 0;
                if (player.countCards("h") >= player.getHandcardLimit() - 1 && canShedHand) return -2;
                return plan.pressured >= 2 ? 1.2 : -4;
            };
            storm.ai.result.target = function (player, target) {
                var pressure = damagePressure(target, 2);
                return pressure > 0.5 ? -1 - pressure : 0;
            };
        }
    }

    function defineSecondBatchNightmareSkills() {
        publishNightmareDisplayMetadata();
        if (!lib.skill || lib._xingBeiNightmareSkillsSecondBatchDefined) return;

        // 第二批噩梦技能会直接改写若干原技能的 content/filter/intro/chooseButton。
        // 扩展的 precontent/content/arenaReady 都可能早于十周年角色包完整注册，
        // 因此必须在“任何写入发生之前”一次性确认依赖结构完整，避免 undefined.xxx。
        function hasSkillPath(name, path) {
            var current = lib.skill && lib.skill[name];
            if (!current) return false;
            if (!path) return true;
            var parts = path.split(".");
            for (var i = 0; i < parts.length; i++) {
                if (current == null || !(parts[i] in Object(current))) return false;
                current = current[parts[i]];
            }
            return current !== undefined && current !== null;
        }
        function hasSkillFunction(name, path) {
            if (!hasSkillPath(name, path)) return false;
            var current = lib.skill[name];
            path.split(".").forEach(function (part) { current = current[part]; });
            return typeof current == "function";
        }

        var secondBatchDependencies = [
            ["shenXuanZhe"],
            ["biHuLingYu", "filter", true],
            ["yiDuanCaiJueSuo", "removeZhiLiao", true],
            ["yuanChu_shengHuangJiangLin", "filter", true],
            ["yuanChu_shengHuangJiangLin", "chooseButton.dialog", true],
            ["yuanChu_shengHuangJiangLin", "chooseButton.backup", true],
            ["yuanChu_shengHuangHuiGuangPao", "filter", true],
            ["yuanChu_shengHuangHuiGuangPao", "contentBefore", true],
            ["yuanChu_shengHuangYuHui", "filter", true],
            ["yuanChu_shengHuangYuHui", "contentBefore", true],
            ["moLiShangZeng"],
            ["shouMoCi"],
            ["yingZhiXue"],
            ["moFaRuMen"],
            ["yuRen", "createRen", true],
            ["kuangLiZhiTi"],
            ["fuMoJing"],
            ["yinZhiZiDan", "intro.max"],
            ["shengYiWu", "intro.max"],
            ["shenDeMenTu", "getPrevious", true],
            ["yuYan_tianLeiJieHuo", "content", true],
            ["yuYan_diLieBoTao", "content", true],
            ["yuanSuSheJi*sora", "filter", true],
            ["yiXiangJian", "filter", true],
            ["xuanHuaShangDeng", "content", true],
            ["wangNvJinKu", "contentBefore", true],
            ["wangNvJinKu", "content", true],
            ["lingYong", "intro.max"],
            ["boYongZhiLi", "content", true],
            ["nuChaoHuangTao", "filter", true],
            ["nuChaoHuangTao", "content", true],
            ["shenMiFuBi"],
            ["xinYueZhang", "prompt2", true],
            ["xinYueZhang", "content", true],
            ["tianPing", "addPai", true]
        ];
        var missingDependencies = secondBatchDependencies.filter(function (item) {
            return item[2] ? !hasSkillFunction(item[0], item[1]) : !hasSkillPath(item[0], item[1]);
        }).map(function (item) {
            return item[0] + (item[1] ? "." + item[1] : "");
        });
        if (missingDependencies.length) {
            var missingSignature = missingDependencies.join("|");
            if (lib._xingBeiNightmareSecondBatchMissingSignature !== missingSignature) {
                lib._xingBeiNightmareSecondBatchMissingSignature = missingSignature;
                console.warn(
                    "[十周年-噩梦人机] 第二批噩梦技能等待原角色包完成加载，当前缺少：",
                    missingDependencies
                );
            }
            return;
        }
        delete lib._xingBeiNightmareSecondBatchMissingSignature;

        function addSkill(name, info) {
            var placeholder = lib.skill[name];
            lib.skill[name] = info;
            if (placeholder && placeholder.nopop) info.nopop = true;
            guardNightmareSkill(name);
        }
        function register(character, skills) { registerNightmareSkills(character, skills); }
        function parentNamed(event, names) {
            if (!Array.isArray(names)) names = [names];
            for (var current = event, i = 0; current && i < 12; i++) {
                if (names.includes(current.name)) return current;
                current = current.getParent && current.getParent();
            }
            return null;
        }
        function enemySide(player) { return !player.side; }

        addSkill("nightmare_shenEnManYi", {
            trigger: { player: "phaseBegin", global: "zhiLiao" }, forced: true,
            filter: function (event, player, name) {
                return name == "phaseBegin" || (event.player && event.player != player && event.player.side == player.side && event.num > 0);
            },
            content: function () { player.changeZhiLiao(1); }
        });
        addSkill("nightmare_shengYinChiLing", {
            trigger: { player: "zhiShiWuYiChu" }, forced: true,
            filter: function (event) { return event.zhiShiWu == "shengYin" && event.num > 0; },
            content: function () { player.addNengLiang("shuiJing", 1); }
        });
        register("shengDianQiShi", ["nightmare_shenEnManYi", "nightmare_shengYinChiLing"]);

        // 庇护领域原消耗为3；噩梦技能独立处理1点消耗，并阻止原技能重复结算。
        var oldBiHuFilter = lib.skill.biHuLingYu.filter;
        lib.skill.biHuLingYu.filter = function (event, player) {
            if (player.hasSkill && player.hasSkill("nightmare_shenShengBiHuLing")) return false;
            return oldBiHuFilter.apply(this, arguments);
        };
        addSkill("nightmare_shenShengBiHuLing", {
            trigger: { global: "shouDaoShangHai" }, forced: true, firstDo: true,
            filter: function (event, player) { return player.storage.yiDuanCaiJueSuo >= 1 && event.player.side == player.side; },
            content: function () {
                lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player, 1);
                trigger.num--;
                player.addZhiShiWu("caiJue", 1);
            }
        });
        addSkill("nightmare_yiDuanWuZui", {
            trigger: { global: "changeShiQiBefore" }, forced: true, priority: 20,
            filter: function (event, player) { return event.side == player.side && event.num < 0 && player.storage.yiDuanCaiJueSuo >= -event.num; },
            content: function () {
                lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player, -trigger.num);
                trigger.num = 0;
            }
        });
        register("shengTingJianChaShi", ["nightmare_shenShengBiHuLing", "nightmare_yiDuanWuZui"]);

        addSkill("nightmare_yongHengShengHuang", { charlotte: true });
        addSkill("nightmare_shengHuangShenYu2", { charlotte: true });
        var jiangLin = lib.skill.yuanChu_shengHuangJiangLin;
        var oldJiangLinFilter = jiangLin.filter;
        jiangLin.filter = function (event, player) {
            if (player.hasSkill && player.hasSkill("nightmare_yongHengShengHuang")) return !player.isHengZhi();
            return oldJiangLinFilter.apply(this, arguments);
        };
        var oldJiangLinDialog = jiangLin.chooseButton.dialog;
        jiangLin.chooseButton.dialog = function (event, player) {
            if (player.hasSkill && player.hasSkill("nightmare_yongHengShengHuang")) {
                var dialog = ui.create.dialog("圣煌降临：无需支付消耗", "hidden");
                dialog.add([["无消耗"], "tdnodes"]);
                return dialog;
            }
            return oldJiangLinDialog.apply(this, arguments);
        };
        var oldJiangLinBackup = jiangLin.chooseButton.backup;
        jiangLin.chooseButton.backup = function (links, player) {
            if (!(player.hasSkill && player.hasSkill("nightmare_yongHengShengHuang"))) return oldJiangLinBackup.apply(this, arguments);
            return {
                links: links,
                type: "faShu",
                content: async function (event, trigger, player) {
                    await player.hengZhi();
                    player.addFaShu();
                }
            };
        };
        ["yuanChu_shengHuangHuiGuangPao", "yuanChu_shengHuangYuHui"].forEach(function (name) {
            var skill = lib.skill[name];
            var oldFilter = skill.filter;
            var oldContentBefore = skill.contentBefore;
            skill.filter = function (event, player) {
                if (player.hasSkill && player.hasSkill("nightmare_shengHuangShenYu2")) {
                    var gap = player.side ? game.lanShiQi - game.hongShiQi : game.hongShiQi - game.lanShiQi;
                    return player.isHengZhi() && player.hasZhiShiWu(name)
                        && player.countZhiShiWu("yuanChu_xinYang") >= Math.max(0, gap);
                }
                return oldFilter.apply(this, arguments);
            };
            skill.contentBefore = async function (event, trigger, player) {
                if (!(player.hasSkill && player.hasSkill("nightmare_shengHuangShenYu2"))) return oldContentBefore.apply(this, arguments);
                var gap = player.side ? game.lanShiQi - game.hongShiQi : game.hongShiQi - game.lanShiQi;
                if (gap > 0) await player.removeZhiShiWu("yuanChu_xinYang", gap);
            };
        });
        register("yuanChuZhiGong", ["nightmare_yongHengShengHuang", "nightmare_shengHuangShenYu2"]);

        addSkill("nightmare_xingHenCanXiang", {
            trigger: { player: "chengShouShangHai" }, forced: true, priority: 10,
            filter: function (event, player) {
                return event.num > 0 && ["fanXing", "yingYue", "shiRi"].some(function (name) { return player.hasZhiShiWu(name); });
            },
            content: function () {
                var count = ["fanXing", "yingYue", "shiRi"].filter(function (name) { return player.hasZhiShiWu(name); }).length;
                trigger.changeDamageNum(-count);
            }
        });
        var oldLuEnFilter = lib.skill.luEn && lib.skill.luEn.filter;
        var oldLuEnContent = lib.skill.luEn && lib.skill.luEn.content;
        if (oldLuEnFilter) lib.skill.luEn.filter = function (event, player) {
            if (player.hasSkill && player.hasSkill("nightmare_mingDingXingTu")) return player.countGaiPai("luEn") > 12;
            return oldLuEnFilter.apply(this, arguments);
        };
        if (oldLuEnContent) lib.skill.luEn.content = async function (event, trigger, player) {
            if (!(player.hasSkill && player.hasSkill("nightmare_mingDingXingTu"))) return oldLuEnContent.apply(this, arguments);
            var cards = player.getGaiPai("luEn");
            if (cards.length <= 12) return;
            var removed = await player.chooseCardButton(cards, true, cards.length - 12, "舍弃多余的【卢恩】")
                .set("ai", function (button) { return 8 - get.value(button.link, _status.event.player); })
                .forResultLinks();
            if (removed.length) await player.discard(removed, "luEn").set("sheQi", true);
        };
        addSkill("nightmare_mingDingXingTu", {
            trigger: { player: "addGaiPaiAfter" }, forced: true,
            filter: function (event, player) { return event.gaiPai == "luEn" && !player.storage.nightmareMingDingXingTuAdding; },
            content: async function (event, trigger, player) {
                player.storage.nightmareMingDingXingTuAdding = true;
                await player.addGaiPai(get.cards(1), "luEn");
                delete player.storage.nightmareMingDingXingTuAdding;
            }
        });
        register("xingZhuiNvWu", ["nightmare_xingHenCanXiang", "nightmare_mingDingXingTu"]);

        addSkill("nightmare_shangZhiShiKong", {
            trigger: { player: ["gameStart", "moLiShangZengAfter"] }, forced: true,
            filter: function (event, player, name) { return name == "gameStart" || name == "moLiShangZengAfter"; },
            content: function (event, trigger, player) { player.addNengLiang("shuiJing", event.triggername == "gameStart" ? 3 : 1); }
        });
        addSkill("nightmare_zhanFaYanSuan", {
            trigger: { player: ["gongJiAfter", "faShuAfter"] }, forced: true,
            filter: function (event, player, name) { return name == "faShuAfter" || get.is.gongJiXingDong(event); },
            content: function (event, trigger, player) {
                if (event.triggername == "gongJiAfter") player.addFaShu();
                else player.addGongJi();
            }
        });
        register("zhanDouFaShi", ["nightmare_shangZhiShiKong", "nightmare_zhanFaYanSuan"]);

        addSkill("nightmare_lieWuShenXun", {
            trigger: { player: "gongJiShi", source: "gongJiMingZhongAfter" }, forced: true,
            filter: function (event, player, name) { return name != "gongJiShi" || (get.is.zhuDongGongJi(event) && event.target && event.target.countCards("h") < 4); },
            content: function (event, trigger) {
                if (event.triggername == "gongJiShi") trigger.qiangZhiMingZhong();
                else if (trigger.target && trigger.target.countCards("h") < trigger.target.getHandcardLimit()) trigger.target.drawTo(trigger.target.getHandcardLimit());
            }
        });
        addSkill("nightmare_lieWuChuXing", {
            trigger: { player: "guanYinDuRenAfter" }, forced: true,
            filter: function (event, player) { var target = player.storage.guanYinDuRenPlayer; return target && get.zhanJi(target.side).length > 0; },
            content: async function (event, trigger, player) {
                var target = player.storage.guanYinDuRenPlayer;
                var stone = get.zhanJi(target.side)[0];
                if (!stone) return;
                await player.changeZhanJi(stone, -1, target.side);
                await player.changeZhanJi(stone, 1, player.side);
            }
        });
        register("lieWuRen", ["nightmare_lieWuShenXun", "nightmare_lieWuChuXing"]);

        addSkill("nightmare_wuJianFengXue", {
            trigger: { global: ["yingZhiXueAfter", "yingFengAfter"] }, forced: true,
            filter: function (event, player) { return event.player == player && event.target && get.zhanJi(event.target.side).length > 0; },
            content: function () { trigger.target.changeZhanJi("xingShi", -1); }
        });
        addSkill("nightmare_qianYingYiXing", {
            trigger: { player: "changeZhiShiWuEnd" }, forced: true,
            filter: function (event) { return event.zhiShiWu == "mi" && event.num > 0; },
            content: function () {
                if (get.shiQi(player.side) < get.shiQi(enemySide(player))) player.changeShiQi(1);
                else player.changeShiQi(-1, enemySide(player));
            }
        });
        register("nvPuZhang", ["nightmare_wuJianFengXue", "nightmare_qianYingYiXing"]);

        addSkill("nightmare_keQianYuXi", {
            trigger: { player: "phaseBegin" }, forced: true,
            filter: function (event, player) { return player.countCards("h") > 3; },
            content: function () { player.chooseToDiscard(3, "h", true).set("ai", function (card) { return 8 - get.value(card); }); }
        });
        addSkill("nightmare_daXiaoJieTeQuan", {
            trigger: { global: "_tiLian_backupEnd", source: "chengShouShangHai" }, forced: true,
            filter: function (event, player, name) {
                if (name == "_tiLian_backupEnd") return event.player && event.player != player && event.player.side == player.side;
                return !!parentNamed(event, "moFaRuMen");
            },
            content: function (event, trigger) {
                if (event.triggername == "_tiLian_backupEnd") player.addNengLiang("shuiJing", 1);
                else trigger.changeDamageNum(1);
            }
        });
        register("jinGuiZhiNv", ["nightmare_keQianYuXi", "nightmare_daXiaoJieTeQuan"]);

        addSkill("nightmare_shenShiKeYin", {
            mod: { maxHandcard: function (player, num) { return num + 2; } },
            trigger: { player: "phaseEnd" }, forced: true,
            content: function () {
                ["moRen", "yiRen"].forEach(function (name) {
                    if (!player.storage[name] && !player.countCards("h", { name: name })) player.gain(lib.skill.yuRen.createRen(name, player), "gain2");
                });
            }
        });
        addSkill("nightmare_zhuShenJieMie", {
            trigger: { player: "gongJiShi" }, forced: true, priority: 20,
            filter: function (event) { return event.card && ["moRen", "yiRen"].includes(event.card.name); },
            content: function () { trigger.wuFaYingZhan(); }
        });
        register("shiShenZhe", ["nightmare_shenShiKeYin", "nightmare_zhuShenJieMie"]);

        addSkill("nightmare_eYiManYing", {
            trigger: { global: "changeShiQiAfter" }, forced: true,
            filter: function (event, player) { var damage = parentNamed(event, "damage"); return event.num < 0 && damage && damage.source == player && parentNamed(damage, "gongJi"); },
            content: function () { player.changeShiQi(-trigger.num); }
        });
        addSkill("nightmare_shenQiLingYu", {
            trigger: { global: "changeShiQiAfter" }, forced: true,
            filter: function (event, player) { var damage = parentNamed(event, "damage"); return event.num < 0 && event.side == player.side && damage && damage.player == player && player.isHengZhi(); },
            content: function () { player.changeShiQi(trigger.num, enemySide(player)); }
        });
        register("ranWuZhe", ["nightmare_eYiManYing", "nightmare_shenQiLingYu"]);

        addSkill("nightmare_wanXiangJieJie", {
            trigger: { global: "gongJiSheZhi" }, forced: true,
            filter: function (event, player) {
                if (!event.player || event.player.side != player.side) return false;
                var cards = player.getGaiPai && player.getGaiPai("jieJie");
                return cards && cards.some(function (card) { return get.xiBie(card) == get.xiBie(event.card); });
            },
            content: function () { trigger.changeDamageNum(2); }
        });
        addSkill("nightmare_huangShenGongMing", {
            trigger: { source: "chengShouShangHai" }, forced: true,
            filter: function (event) { return !!parentNamed(event, "fuMoJing"); },
            content: function () { trigger.changeDamageNum(1); }
        });
        register("jieJieShi", ["nightmare_wanXiangJieJie", "nightmare_huangShenGongMing"]);

        addSkill("nightmare_miShuHuiXiang", {
            trigger: { player: "yanLingShuAfter" }, forced: true,
            content: function () { player.addFaShu(); }
        });
        addSkill("nightmare_wanYanTongXiao", {
            trigger: { player: "zhenYanShuContentAfterAfter" }, forced: true,
            content: function () { player.addNengLiang("shuiJing", 1); }
        });
        register("shenMiXueZhe", ["nightmare_miShuHuiXiang", "nightmare_wanYanTongXiao"]);

        addSkill("nightmare_shuangMianZhiZheng", {
            trigger: { player: "phaseBegin" }, forced: true,
            content: function () {
                player.addZhiShiWu("yinZhiZiDan", 1, 5);
                player.addZhiShiWu("shengYiWu", 1, 5);
            }
        });
        ["yinZhiZiDan", "shengYiWu"].forEach(function (name) {
            var info = lib.skill[name];
            var oldMax = info.intro.max;
            info.intro.max = function (player) {
                var base = typeof oldMax == "function" ? oldMax(player) : oldMax;
                return base + (player.hasSkill && player.hasSkill("nightmare_shuangMianZhiZheng") ? 2 : 0);
            };
        });
        addSkill("nightmare_shengLvTeShe", {
            trigger: { player: "logSkillBegin" }, forced: true,
            filter: function (event) { return event.skill == "zuiDuanHuoMian"; },
            content: function () { player.changeShiQi(-1, enemySide(player)); }
        });
        register(["hongYiZhuJiao", "zhuLvZhe"], ["nightmare_shuangMianZhiZheng", "nightmare_shengLvTeShe"]);

        function gainShiShu(player) {
            if (!player.countCards("h", { name: "shiShuCard" })) player.gain(game.createCard("shiShuCard"), "gain2");
        }
        addSkill("nightmare_shiLiaoXuBian", {
            trigger: { player: "phaseBegin" }, forced: true,
            filter: function (event, player) { return !player.countCards("h", { name: "shiShuCard" }) && player.countCards("h") > 0; },
            content: async function (event, trigger, player) {
                await player.chooseToDiscard(1, "h", true).set("ai", function (card) { return 8 - get.value(card); });
                gainShiShu(player);
            }
        });
        addSkill("nightmare_liShiChongYan", {
            trigger: { player: "miJingWanXiangAfter" }, forced: true, usable: 1,
            content: async function (event, trigger, player) {
                player.addFaShu();
                if (player.countCards("h")) await player.chooseToDiscard(1, "h", true).set("ai", function (card) { return 8 - get.value(card); });
                gainShiShu(player);
            }
        });
        register("jiLuZhe", ["nightmare_shiLiaoXuBian", "nightmare_liShiChongYan"]);

        addSkill("nightmare_shenYiYinLu", {
            trigger: { global: "luBiaoXZhuanYi" }, forced: true,
            filter: function (event, player) { var target = lib.skill.shenDeMenTu.getPrevious(event.player); return event.player.storage.luBiaoPlayer == player && target && target.side != player.side; },
            content: function () { lib.skill.shenDeMenTu.getPrevious(trigger.player).faShuDamage(2, player); }
        });
        addSkill("nightmare_shiJieBuDao", {
            trigger: { global: "luBiaoXZhuanYi" }, forced: true,
            filter: function (event, player) { var target = lib.skill.shenDeMenTu.getPrevious(event.player); return event.player.storage.luBiaoPlayer == player && target && target.side == player.side && target != player; },
            content: function () { lib.skill.shenDeMenTu.getPrevious(trigger.player).addNengLiang("baoShi", 1); }
        });
        register("chuanJiaoShi", ["nightmare_shenYiYinLu", "nightmare_shiJieBuDao"]);

        addSkill("nightmare_moRiQiShi", {
            mod: { maxHandcard: function (player, num) { return num + 2; } },
            trigger: { player: "moRiYuYanAfter" }, forced: true,
            content: function () { player.addNengLiang("shuiJing", 1); }
        });
        addSkill("nightmare_yuYanBianZuan", { charlotte: true });
        function patchFixedProphecy(name, suits) {
            var skill = lib.skill && lib.skill[name];
            if (!skill || typeof skill.content != "function") {
                console.warn("[十周年-噩梦人机] 预言技能补丁跳过，原技能不可用：" + name);
                return false;
            }
            if (skill._nightmareFixedProphecyPatched) return true;
            skill._nightmareFixedProphecyPatched = true;
            var oldContent = skill.content;
            skill.content = async function (event, trigger, player) {
                if (!(player.hasSkill && player.hasSkill("nightmare_yuYanBianZuan"))) return oldContent.apply(this, arguments);
                await event.trigger("yuYanJieGuo");
                var first = await player.chooseControl(["选项一", "选项二"])
                    .set("choiceList", ["先结算" + get.translation(suits[0]) + "系", "先结算" + get.translation(suits[1]) + "系"])
                    .forResultControl();
                var order = first == "选项一" ? suits.slice() : [suits[1], suits[0]];
                if (!event.bool) order.length = 1;
                for (var xiBie of order) {
                    var available = player.countCards("h", function (card) { return get.xiBie(card) == xiBie; });
                    var discardCount = Math.min(4, available);
                    var result = await player.chooseCardTarget({
                        forced: true,
                        xiBie: xiBie,
                        filterCard: function (card) { return get.xiBie(card) == _status.event.xiBie; },
                        selectCard: discardCount,
                        filterTarget: lib.filter.opponent,
                        selectTarget: 1,
                        prompt: "【预言编纂】：弃置至多4张对应系牌；X固定为4，摸4张牌并造成5点法术伤害③",
                        ai1: function (card) { return 6 - get.value(card); },
                        ai2: function (target) { return get.damageEffect2(target, _status.event.player, 5); }
                    }).forResult();
                    if (result.cards && result.cards.length) await player.discard(result.cards, "showCards");
                    await player.draw(4);
                    if (!result.targets || !result.targets.length) continue;
                    var target = result.targets[0];
                    await target.chooseToDiscard("h", true, [0, Infinity], "showCards", function (card) {
                        return get.xiBie(card) == _status.event.xiBie;
                    }, "弃置任意张对应系牌").set("xiBie", xiBie);
                    await target.faShuDamage(5, player);
                }
            };
            return true;
        }
        patchFixedProphecy("yuYan_tianLeiJieHuo", ["lei", "huo"]);
        patchFixedProphecy("yuYan_diLieBoTao", ["di", "shui"]);
        register("yiJiaoTu", ["nightmare_moRiQiShi", "nightmare_yuYanBianZuan"]);

        addSkill("nightmare_wuDiWeiDai", {
            trigger: { player: "phaseBegin" }, forced: true,
            filter: function (event, player) { return player.countCards("h") > 0; },
            content: async function (event, trigger, player) {
                await player.chooseToDiscard(1, "h", true).set("ai", function (card) { return 8 - get.value(card); });
                await player.gain(game.createCard("moDan"), "gain2");
            }
        });
        addSkill("nightmare_heiDongXiaoHua", {
            trigger: { player: "shiYuDeHeiDongAfter" }, forced: true,
            filter: function (event, player) { return player.countCards("h") >= 2; },
            content: function () { player.chooseToDiscard(2, "h", true).set("ai", function (card) { return 8 - get.value(card); }); }
        });
        register("nong_baoShiShaoNv", ["nightmare_wuDiWeiDai", "nightmare_heiDongXiaoHua"]);

        var oldYuanSuSheJiFilter = lib.skill["yuanSuSheJi*sora"].filter;
        lib.skill["yuanSuSheJi*sora"].filter = function (event, player) {
            if (player.hasSkill && player.hasSkill("nightmare_wanNengDanCang")) return false;
            return oldYuanSuSheJiFilter.apply(this, arguments);
        };
        addSkill("nightmare_wanNengDanCang", {
            trigger: { player: "gongJiShi" }, forced: true, priority: 15,
            filter: function (event, player) { return event.yingZhan != true && player.getGaiPai("ziDan").length > 0; },
            content: async function (event, trigger, player) {
                var cards = await player.chooseCardButton(player.getGaiPai("ziDan"), true, "【万能弹仓】：移除1个【子弹】")
                    .set("ai", function (button) { return 8 - get.value(button.link, _status.event.player); })
                    .forResultLinks();
                await player.discard(cards, "ziDan", "showHiddenCards");
                trigger.changeDamageNum(1);
                trigger.wuFaYingZhan();
                trigger.customArgs.nightmareWanNengDanCang = true;
            },
            group: ["nightmare_wanNengDanCang_hit", "nightmare_wanNengDanCang_after"],
            subSkill: {
                hit: {
                    trigger: { source: "gongJiMingZhong" }, forced: true,
                    filter: function (event) { return event.customArgs && event.customArgs.nightmareWanNengDanCang; },
                    content: async function (event, trigger, player) {
                        var healTargets = await player.chooseTarget("【万能弹仓·水】：选择目标角色+1【治疗】", true)
                            .set("ai", function (target) { return get.zhiLiaoEffect2(target, _status.event.player, 1); }).forResultTargets();
                        if (healTargets.length) await healTargets[0].changeZhiLiao(1, player);
                        var damageTargets = await player.chooseTarget("【万能弹仓·地】：选择目标对手受到1点法术伤害", lib.filter.opponent, true)
                            .set("ai", function (target) { return get.damageEffect2(target, _status.event.player, 1); }).forResultTargets();
                        if (damageTargets.length) await damageTargets[0].faShuDamage(1, player);
                    }
                },
                after: {
                    trigger: { player: "gongJiAfter" }, forced: true,
                    filter: function (event) { return event.customArgs && event.customArgs.nightmareWanNengDanCang; },
                    content: function () { player.addGongJi(); }
                }
            }
        });
        addSkill("nightmare_zhanShuHuanDan", {
            trigger: { source: "gongJiMingZhongAfter" }, forced: true,
            filter: function (event, player) { return event.yingZhan != true && player.countCards("h") > 0; },
            content: async function (event, trigger, player) {
                var cards = await player.chooseCard("h", 1, true).set("ai", function (card) { return 8 - get.value(card); }).forResultCards();
                if (cards.length) await player.addGaiPai(cards, "ziDan");
            }
        });
        register("youJiShi", ["nightmare_wanNengDanCang", "nightmare_zhanShuHuanDan"]);

        var oldYiXiangFilter = lib.skill.yiXiangJian.filter;
        lib.skill.yiXiangJian.filter = function (event, player) {
            if (player.hasSkill && player.hasSkill("nightmare_yiXiangLianZhan")) return false;
            return oldYiXiangFilter.apply(this, arguments);
        };
        addSkill("nightmare_yiXiangLianZhan", {
            trigger: { source: "gongJiMingZhong" }, forced: true, usable: 1,
            filter: function (event) { return event.yingZhan != true && event.target && event.target.countCards("h") > 0; },
            content: async function (event, trigger, player) {
                var result = await trigger.target.chooseToDiscard("h", 1, true).set("showCards", true)
                    .set("ai", function (card) { return 8 - get.value(card); }).forResult();
                if (!result.cards || !result.cards.length) return;
                if (get.type(result.cards[0]) == "gongJi") trigger.changeDamageNum(2);
                else if (get.type(result.cards[0]) == "faShu") player.addGongJi();
            }
        });
        addSkill("nightmare_moNvJianYu", {
            trigger: { player: ["phaseBegin", "gongJiAfter", "gongJiSheZhi"] }, forced: true, silent: true,
            filter: function (event, player, name) { return name == "phaseBegin" || event.yingZhan != true; },
            content: function (event, trigger, player) {
                if (event.triggername == "phaseBegin") player.storage.nightmareMoNvJianYu = 0;
                else if (event.triggername == "gongJiAfter") player.storage.nightmareMoNvJianYu = (player.storage.nightmareMoNvJianYu || 0) + 1;
                else if (player.storage.nightmareMoNvJianYu) trigger.changeDamageNum(player.storage.nightmareMoNvJianYu);
            }
        });
        register("jianZhiMoNv", ["nightmare_yiXiangLianZhan", "nightmare_moNvJianYu"]);

        addSkill("nightmare_jieRiLiZhuang", {
            trigger: { player: "phaseBegin" }, forced: true,
            filter: function (event, player) { return player.countCards("h") > 0; },
            content: async function (event, trigger, player) {
                await player.chooseToDiscard(1, "h", true).set("ai", function (card) { return 8 - get.value(card); });
                var names = ["shengGuang", "shengDun", "moDan", "xuRuo", "zhongDu"];
                await player.gain(game.createCard(names.randomGet()), "gain2");
            }
        });
        addSkill("nightmare_shengDanJiaBan", {
            trigger: { source: "zaoChengShangHaiAfter" }, forced: true,
            filter: function (event) { return event.num > 0 && !!parentNamed(event, "jiRi_moBaoChongJie"); },
            content: function () { player.addFaShu(); }
        });
        register("jieRiMoDao", ["nightmare_jieRiLiZhuang", "nightmare_shengDanJiaBan"]);

        var oldXuanHuaContent = lib.skill.xuanHuaShangDeng.content;
        lib.skill.xuanHuaShangDeng.content = async function (event, trigger, player) {
            if (!player.hasSkill || !player.hasSkill("nightmare_maDaMaDa")) return oldXuanHuaContent.apply(this, arguments);
            var num = 0, stopped = false;
            while (num < 6) {
                var cards = get.cards();
                await player.showHiddenCards(cards);
                num++;
                var continues = get.mingGe(cards[0]) == "xue" || get.type(cards[0]) == "faShu";
                if (!continues) {
                    if (!stopped) { stopped = true; continue; }
                    break;
                }
            }
            trigger.changeDamageNum(num);
            player.storage.nightmareMoYiQiDuo = num;
        };
        addSkill("nightmare_maDaMaDa", { charlotte: true });
        addSkill("nightmare_moYiQiDuo", {
            trigger: { player: "xuanHuaShangDengAfter" }, forced: true,
            filter: function (event, player) { return (player.storage.nightmareMoYiQiDuo || 0) >= 3; },
            content: function () { player.storage.nightmareMoYiQiDuo = 0; player.addGongJi(); }
        });
        register("luoLiFanZhang", ["nightmare_maDaMaDa", "nightmare_moYiQiDuo"]);

        addSkill("nightmare_yiBenWanLi", {
            trigger: { player: "lianJinMoFaAfter" }, forced: true,
            content: function () { game.filterPlayer(function (target) { return target.side == player.side; }).forEach(function (target) { target.addNengLiang("baoShi", 1); }); }
        });
        addSkill("nightmare_wangGuoYiChan", { charlotte: true });
        var oldJinKuBefore = lib.skill.wangNvJinKu.contentBefore;
        var oldJinKuContent = lib.skill.wangNvJinKu.content;
        lib.skill.wangNvJinKu.contentBefore = async function (event, trigger, player) {
            await oldJinKuBefore.apply(this, arguments);
            if (!(player.hasSkill && player.hasSkill("nightmare_wangGuoYiChan"))) return;
            player.storage.nightmareWangGuoYiChan = 0;
            for (var target of game.filterPlayer(function (current) { return current.side == player.side; })) {
                var count = target.countNengLiang("baoShi");
                if (count > 0) {
                    await target.removeNengLiang("baoShi", count);
                    player.storage.nightmareWangGuoYiChan += count;
                }
            }
        };
        lib.skill.wangNvJinKu.content = function (event, trigger, player) {
            if (player.hasSkill && player.hasSkill("nightmare_wangGuoYiChan")) {
                return event.target.faShuDamage(1 + (player.storage.wangNvJinKu_num || 0) + (player.storage.nightmareWangGuoYiChan || 0), player);
            }
            return oldJinKuContent.apply(this, arguments);
        };
        register("tanLanShaoNv", ["nightmare_yiBenWanLi", "nightmare_wangGuoYiChan"]);

        var oldLingYongMax = lib.skill.lingYong.intro.max;
        lib.skill.lingYong.intro.max = function (player) {
            var base = typeof oldLingYongMax == "function" ? oldLingYongMax(player) : oldLingYongMax;
            return base - (player.hasSkill && player.hasSkill("nightmare_chaoManSanFen") ? 2 : 0);
        };
        var oldBoYongContent = lib.skill.boYongZhiLi.content;
        lib.skill.boYongZhiLi.content = async function (event, trigger, player) {
            if (player.hasSkill && player.hasSkill("nightmare_chaoManSanFen")) return player.addZhiShiWu("lingYong", 1, 2);
            return oldBoYongContent.apply(this, arguments);
        };
        var oldNuChaoFilter = lib.skill.nuChaoHuangTao.filter;
        var oldNuChaoContent = lib.skill.nuChaoHuangTao.content;
        lib.skill.nuChaoHuangTao.filter = function (event, player) {
            if (player.hasSkill && player.hasSkill("nightmare_chaoManSanFen")) return player.countZhiShiWu("lingYong") >= 2;
            return oldNuChaoFilter.apply(this, arguments);
        };
        lib.skill.nuChaoHuangTao.content = async function (event, trigger, player) {
            if (!(player.hasSkill && player.hasSkill("nightmare_chaoManSanFen"))) return oldNuChaoContent.apply(this, arguments);
            await player.removeZhiShiWu("lingYong", 2);
            var targets = await player.chooseTarget("对4名目标角色造成1点法术伤害③；目标每有1个基础效果，伤害+1", 4, true)
                .set("ai", function (target) { return get.damageEffect2(target, _status.event.player, 1 + target.jiChuXiaoGuoList().length); }).forResultTargets();
            for (var target of targets.sortBySeat(player)) await target.faShuDamage(1 + target.jiChuXiaoGuoList().length, player);
        };
        addSkill("nightmare_chaoManSanFen", { charlotte: true });
        addSkill("nightmare_haiShenDaiXing", {
            trigger: { player: "xieLingTuiSanAfter" }, forced: true,
            content: function () { player.addFaShu(); player.addNengLiang("shuiJing", 1); }
        });
        register("lingXiZhiChao", ["nightmare_chaoManSanFen", "nightmare_haiShenDaiXing"]);

        addSkill("nightmare_woYaoYanPai", {
            trigger: { player: "phaseBegin" }, forced: true,
            filter: function (event, player) {
                var exclusive = ["yunShi", "bingDong", "huoQou", "fengRen", "leiJi"];
                return player.countCards("h") > 0 && !player.hasCard(function (card) {
                    var list = get.duYouList(card) || [];
                    return exclusive.some(function (name) { return list.includes(name); });
                });
            },
            content: async function (event, trigger, player) {
                var num = player.countCards("h");
                await player.discard(player.getCards("h"));
                await player.draw(num);
            }
        });
        addSkill("nightmare_yuanZiHuanCun", {
            trigger: { player: "changeZhiShiWuEnd" }, forced: true,
            filter: function (event) { return event.zhiShiWu == "yuanZi" && event.num > 0; },
            content: function () { player.addNengLiang("baoShi", 1); }
        });
        register("jianXiZhiPian", ["nightmare_woYaoYanPai", "nightmare_yuanZiHuanCun"]);

        var fuBiClone = get.copy(lib.skill.shenMiFuBi);
        fuBiClone.charlotte = true;
        addSkill("nightmare_fuBiHuiShou", fuBiClone);
        addSkill("nightmare_trickAndTreat", {
            trigger: { player: "trickOrTreatBegin" }, forced: true,
            content: async function (event, trigger, player) {
                var targets = game.filterPlayer(function (target) { return target.side != player.side; }).sortBySeat(player);
                for (var target of targets) await target.damage(2, player);
            }
        });
        register("daoDanLuoLi", ["nightmare_fuBiHuiShou", "nightmare_trickAndTreat"]);

        addSkill("nightmare_jueDuiYinGan2", { charlotte: true });
        var oldXinYuePrompt = lib.skill.xinYueZhang.prompt2;
        var oldXinYueContent = lib.skill.xinYueZhang.content;
        lib.skill.xinYueZhang.prompt2 = function (event, player) {
            var text = oldXinYuePrompt.apply(this, arguments);
            if (player.hasSkill && player.hasSkill("nightmare_jueDuiYinGan2")) {
                return text.replace("+1[治疗]", "+3[治疗]").replace("弃1张牌", "弃3张牌").replace("受到1点法术伤害", "受到3点法术伤害");
            }
            return text;
        };
        lib.skill.xinYueZhang.content = async function (event, trigger, player) {
            if (!(player.hasSkill && player.hasSkill("nightmare_jueDuiYinGan2"))) return oldXinYueContent.apply(this, arguments);
            var yinFu = player.getGaiPai("yinFu");
            var first = get.xiBie(yinFu[0]), second = get.xiBie(yinFu[1]), third = get.xiBie(yinFu[2]);
            var choose = first == "shui" ? "all" : (["feng", "di"].includes(first) ? "opponent" : "self");
            var action = second == "shui" ? "zhiLiao" : (["feng", "di"].includes(second) ? "discard" : "damage");
            var targetCount = 1;
            if (third == "shui") { choose = "all"; targetCount = 2; }
            else if (["feng", "di"].includes(third)) { choose = "opponent"; targetCount = 2; }
            var amount = 3;
            async function resolve(target) {
                if (action == "zhiLiao") await target.changeZhiLiao(amount, player);
                else if (action == "discard") await target.chooseToDiscard("h", amount, true, "新乐章：弃3张牌");
                else await target.faShuDamage(amount, player);
            }
            if (choose == "self") return resolve(player);
            var filter = choose == "opponent" ? lib.filter.opponent : lib.filter.all;
            var targets = await player.chooseTarget("新乐章：选择目标结算三倍音符效果", filter, true, targetCount)
                .set("ai", function (target) {
                    var player = _status.event.player, action = _status.event.action;
                    if (action == "zhiLiao") return get.zhiLiaoEffect2(target, player, 3);
                    if (action == "discard") return target.side == player.side ? target.countCards("h") : -target.countCards("h");
                    return get.damageEffect2(target, player, 3);
                }).set("action", action).forResultTargets();
            for (var target of targets.sortBySeat(player)) await resolve(target);
        };
        addSkill("nightmare_jiXingGaiPu", {
            trigger: { global: "chengShouShangHaiAfter" }, forced: true,
            filter: function (event, player) { return event.player && event.player != player && event.player.side == player.side && !!parentNamed(event, "xinYueZhang"); },
            content: function () { player.changeShiQi(trigger.num || 1); }
        });
        register("yueTuanShouXi", ["nightmare_jueDuiYinGan2", "nightmare_jiXingGaiPu"]);

        addSkill("nightmare_huShenJiangLin", {
            trigger: { source: "gongJiMingZhongAfter" }, forced: true,
            filter: function (event, player) { return event.yingZhan != true && player.countCards("h") > 0 && player.getGaiPai("zhouFu_yaoLi").length < 2; },
            content: async function (event, trigger, player) {
                if (!player.countCards("h")) return;
                var cards = await player.chooseCard("h", 1, true).forResultCards();
                if (!cards.length) return;
                game.setXiBie(cards[0], "di");
                await player.addGaiPai(cards, "zhouFu_yaoLi");
            }
        });
        addSkill("nightmare_huShenDaiChang", {
            trigger: { player: "zhouFu" }, forced: true,
            content: async function (event, trigger, player) {
                var targets = await player.chooseTarget("【狐神代偿】：选择一名队友弃1张牌，然后其+1【治疗】", function (card, player, target) {
                    return target != player && target.side == player.side;
                }, true).set("ai", function (target) { return get.zhiLiaoEffect2(target, _status.event.player, 1) - target.countCards("h") * 0.1; }).forResultTargets();
                if (!targets.length) return;
                if (targets[0].countCards("h")) await targets[0].chooseToDiscard(1, "h", true)
                    .set("ai", function (card) { return 8 - get.value(card); });
                await targets[0].changeZhiLiao(1, player);
            }
        });
        register("zhouFuShi", ["nightmare_huShenJiangLin", "nightmare_huShenDaiChang"]);

        addSkill("nightmare_eShanBiJi", {
            trigger: { global: "damageAfter" }, forced: true,
            filter: function (event, player) { return event.source && event.source != player && event.source.side == player.side && player.countCards("h") > 0; },
            content: async function (event, trigger, player) {
                var cards = await player.chooseCard("h", 1, true).set("ai", function (card) { return 8 - get.value(card); }).forResultCards();
                if (!cards.length) return;
                await player.lose(cards, ui.ordering);
                var left = player.getExpansions("tianPing_zuo").length;
                var right = player.getExpansions("tianPing_you").length;
                await lib.skill.tianPing.addPai(player, cards, left <= right ? "zuo" : "you");
            }
        });
        addSkill("nightmare_wuZhengZhongShen", {
            trigger: { player: "zhiShiWuYiChu" }, forced: true,
            filter: function (event) { return event.zhiShiWu == "zui" && event.num > 0; },
            content: function () { player.changeShiQi(-1, enemySide(player)); }
        });
        register("sheng_zhongCaiZhe", ["nightmare_eShanBiJi", "nightmare_wuZhengZhongShen"]);

        addSkill("nightmare_rangBieRenGan", {
            trigger: { global: "gongJiMingZhongAfter" }, forced: true,
            filter: function (event, player) { return event.player && event.player != player && event.player.side == player.side && event.yingZhan != true; },
            content: function () { player.addNengLiang("baoShi", 1); }
        });
        addSkill("nightmare_gaoZhiLiangShuiMian", {
            trigger: { global: "chengShouShangHaiAfter" }, forced: true,
            filter: function (event, player) { return event.player && event.player != player && event.player.side == player.side && player.countCards("h") > 0; },
            content: function () { player.chooseToDiscard(1, "h", true).set("ai", function (card) { return 8 - get.value(card); }); }
        });
        register("daiDuoShaoNv", ["nightmare_rangBieRenGan", "nightmare_gaoZhiLiangShuiMian"]);

        addSkill("nightmare_zongYouRenZhiDeJiDu", {
            trigger: { player: "phaseBegin" }, forced: true,
            filter: function (event, player) { return player.countCards("h") > 0 && game.hasPlayer(function (target) { return target.side != player.side && target.countCards("h", function (card) { return ["anMie", "shengGuang"].includes(card.name); }); }); },
            content: async function (event, trigger, player) {
                await player.chooseToDiscard(1, "h", true).set("ai", function (card) { return 8 - get.value(card); });
                var targets = game.filterPlayer(function (target) { return target.side != player.side && target.countCards("h", function (card) { return ["anMie", "shengGuang"].includes(card.name); }); });
                var choices = [];
                targets.forEach(function (target) {
                    target.getCards("h", function (card) { return ["anMie", "shengGuang"].includes(card.name); }).forEach(function (card) {
                        // 暗灭可直接享受+2伤害；圣光在己方士气危险时优先，用于触发士气回复。
                        var score = card.name == "anMie" ? 3 : (get.shiQi(player.side) <= 3 ? 4 : 2);
                        choices.push({ target: target, card: card, score: score + get.value(card, player) * 0.05 });
                    });
                });
                choices.sort(function (a, b) { return b.score - a.score; });
                if (choices.length) await player.gain(choices[0].card, choices[0].target, "giveAuto");
            }
        });
        addSkill("nightmare_suanYiShangTou", {
            trigger: { source: "chengShouShangHai", player: "useCardAfter" }, forced: true,
            filter: function (event, player, name) { return name == "useCardAfter" ? event.card && event.card.name == "shengGuang" : !!parentNamed(event, "anMie"); },
            content: function (event, trigger) { if (event.triggername == "useCardAfter") player.changeShiQi(1); else trigger.changeDamageNum(2); }
        });
        register("jiDuShaoNv", ["nightmare_zongYouRenZhiDeJiDu", "nightmare_suanYiShangTou"]);

        addSkill("nightmare_jianShengJiCheng", {
            trigger: { player: "fengZhiJianAfter" }, forced: true,
            content: function () { player.addNengLiang("shuiJing", 1); }
        });
        addSkill("nightmare_shiYanBiDa", {
            trigger: { player: ["jianCanYingAfter", "gongJiSheZhi", "gongJiAfter"] }, forced: true, priority: 15,
            filter: function (event, player, name) {
                if (name == "jianCanYingAfter") return true;
                return player.storage.nightmareShiYanBiDaPending && event.yingZhan != true;
            },
            content: function (event, trigger, player) {
                if (event.triggername == "jianCanYingAfter") player.storage.nightmareShiYanBiDaPending = true;
                else if (event.triggername == "gongJiSheZhi") { trigger.changeDamageNum(1); trigger.qiangZhiMingZhong(); }
                else delete player.storage.nightmareShiYanBiDaPending;
            }
        });
        register("jianZhiZi", ["nightmare_jianShengJiCheng", "nightmare_shiYanBiDa"]);

        addSkill("nightmare_shenFengJiaoZhun", {
            trigger: { player: "gongJiShi" }, forced: true, priority: 20,
            filter: function (event) { return event.yingZhan != true && event.card; },
            content: function () {
                player.storage.nightmareShenFengCard = trigger.card;
                player.storage.nightmareShenFengOldXiBie = get.xiBie(trigger.card);
                game.setXiBie(trigger.card, "feng");
            },
            group: "nightmare_shenFengJiaoZhun_restore",
            subSkill: {
                restore: {
                    trigger: { player: "gongJiAfter" }, forced: true, silent: true, popup: false,
                    filter: function (event, player) { return !!player.storage.nightmareShenFengCard; },
                    content: function () {
                        game.setXiBie(player.storage.nightmareShenFengCard, player.storage.nightmareShenFengOldXiBie);
                        delete player.storage.nightmareShenFengCard;
                        delete player.storage.nightmareShenFengOldXiBie;
                    }
                }
            }
        });
        addSkill("nightmare_wuShiYiDao", {
            trigger: { player: "juJiAfter" }, forced: true,
            content: function () { game.filterPlayer(function (target) { return target.side != player.side; }).forEach(function (target) { target.drawTo(target.getHandcardLimit()); }); }
        });
        register("moGongEX", ["nightmare_shenFengJiaoZhun", "nightmare_wuShiYiDao"]);

        // 只有所有定义和原技能补丁都成功执行后才标记完成。
        // 这样即使角色包延迟加载，也可以在后续 phaseBefore/gameStart 再次尝试。
        lib._xingBeiNightmareSkillsSecondBatchDefined = true;
    }

    function patchSecondBatchNightmareAi() {
        if (!lib.skill) return;

        function owns(player, skill) {
            return player && player.hasSkill && player.hasSkill(skill);
        }
        function originalValue(value, context, args, fallback) {
            if (typeof value == "function") {
                var result = value.apply(context, args);
                return typeof result == "number" ? result : fallback;
            }
            return typeof value == "number" ? value : fallback;
        }
        function boostSkill(name, nightmareSkill, orderBonus, resultBonus) {
            var skill = lib.skill[name];
            if (!skill || !markPatched(skill, "secondBatchNightmareAi")) return;
            skill.ai = skill.ai || {};
            var oldOrder = skill.ai.order;
            skill.ai.order = function (item, player) {
                var base = originalValue(oldOrder, this, arguments, 3);
                return base + (owns(player, nightmareSkill) ? orderBonus : 0);
            };
            skill.ai.result = skill.ai.result || {};
            var oldPlayer = skill.ai.result.player;
            skill.ai.result.player = function (player) {
                var base = originalValue(oldPlayer, this, arguments, 0);
                return base + (owns(player, nightmareSkill) ? resultBonus : 0);
            };
        }

        // 免费变身、返还行动或返还能量后，不能继续沿用原技能的成本估值。
        boostSkill("yuanChu_shengHuangJiangLin", "nightmare_yongHengShengHuang", 3.5, 2.5);
        boostSkill("yuanChu_shengHuangHuiGuangPao", "nightmare_shengHuangShenYu2", 2.5, 2);
        boostSkill("yuanChu_shengHuangYuHui", "nightmare_shengHuangShenYu2", 2, 1.5);
        boostSkill("yanLingShu", "nightmare_miShuHuiXiang", 2.2, 1.5);
        boostSkill("zhenYanShu", "nightmare_wanYanTongXiao", 1.4, 1.2);
        boostSkill("miJingWanXiang", "nightmare_liShiChongYan", 2.2, 1.8);
        boostSkill("jiRi_moBaoChongJie", "nightmare_shengDanJiaBan", 1.8, 1.5);
        boostSkill("wangNvJinKu", "nightmare_wangGuoYiChan", 1.8, 1.4);

        // 黑洞强化结算后还会强制弃2张牌；只有确实能避免较大爆牌时才支付魔弹。
        var blackHole = lib.skill.shiYuDeHeiDong;
        if (blackHole && blackHole.cost && markPatched(blackHole, "nightmareExtraDiscardAi")) {
            var oldBlackHoleCost = blackHole.cost;
            blackHole.cost = async function (event, trigger, player) {
                if (!owns(player, "nightmare_heiDongXiaoHua")) return oldBlackHoleCost.apply(this, arguments);
                var target = trigger.player;
                var overflow = Math.max(0, target.countCards("h") + Math.max(0, trigger.num || 0) - target.getHandcardLimit());
                var result = await player.chooseToDiscard(function (card) { return get.name(card) == "moDan"; })
                    .set("ai", function (card) {
                        var overflow = _status.event.overflow;
                        if (overflow < 3) return 0;
                        return 9 + overflow - get.value(card);
                    })
                    .set("overflow", overflow)
                    .set("prompt", get.prompt("shiYuDeHeiDong"))
                    .set("prompt2", lib.translate.shiYuDeHeiDong_info + "；噩梦强化结算后还需弃2张牌")
                    .set("showCards", true)
                    .forResult();
                event.result = { bool: result.bool, cards: result.cards };
            };
        }
    }

    function applyShiZhouNianAiPatch() {
        if (!lib.skill) return;
        installDefaultCharacterImages();
        defineNightmareSkills();
        defineSecondBatchNightmareSkills();
        patchSecondBatchNightmareAi();
        installNightmareInfrastructure();
        var helper = getHelper();
        patchCoreActions(helper);
        patchStartupSkills(helper);
        patchTouTianHuanRi(helper);
        patchQiZha(helper);
        patchAngelSkills(helper);
        patchTianQiang(helper);
        patchDiQiang(helper);
        patchShengQiangQiShiActionChain(helper);
        patchNvWuShen(helper);
        patchHuangQuanZhengChan(helper);
        patchShengMingJieJie(helper);
        patchXuLiYiJi(helper);
        patchFuWenGaiZao(helper);
        patchBuQuYiZhi(helper);
        patchShouHunJingJie();
        patchShouFanAndNiFan();
        patchNianDan();
        patchYueDu();
        patchYueZhiLunHui();
        patchYueZhiNvShenActionChain(helper);
        patchLingHunLianJie();
        patchLingHunShuShi(helper);
        patchLingFuShi(helper);
        patchJianDi(helper);
        patchCangYanMoNv(helper);
        patchYinYouShiRen(helper);
        patchXueSeJianLing(helper);
        patchSupportTargeting(helper);
        patchXiWangFuGeQu(helper);
        patchShengHuangJiangLinReset();
        patchXueZhiBeiMing();
        patchShengHuangHuiGuangPao();
        patchZiDongTianChong(helper);
        patchOptionalSoulSkills(helper);
        patchExclusiveCards();
        patchYuanSuShiActionChain(helper);
        patchJingLingSheShou(helper);
        patchShenGuan(helper);
        patchHongLianQiShi(helper);
        patchYinYangShi(helper);
        patchMoGong(helper);
        patchMoQiang(helper);
        patchYongZhe();
        patchShengGong(helper);
        patchProactiveDrawSkills(helper);
        patchResidualChoiceSafety(helper);
        patchFengZhiJianSheng(helper);
        patchKuangZhanShi(helper);
        patchMoFaShaoNv(helper);
        patchMoGongActionChain(helper);
        patchYingLingRenXingActionChain(helper);
        patchYongZheActionChain(helper);
        patchHongLianQiShiActionChain(helper);
        patchJianDiActionChain(helper);
        patchXueZhiWuNvActionChain(helper);
        patchXianZheActionChain(helper);
        patchGeDouJiaActionChain(helper);
        patchDieWuZheActionChain(helper);
        patchShouLingWuShiActionChain(helper);
        patchPhysicalCostTargetAi();
    }

    return {
        name: extensionName,
        editable: false,
        arenaReady: function () {
            applyShiZhouNianAiPatch();
        },
        content: function () {
            applyShiZhouNianAiPatch();
        },
        precontent: function () {
            applyShiZhouNianAiPatch();
        },
        help: {
            "十周年-噩梦人机": "内置十周年-AI优化版的全部决策逻辑，并允许为仅由电脑控制的角色附加噩梦强化技能。玩家亲自操控、联机操控或接管角色时不会获得强化技能。"
        },
        config: {
            enableNightmareSkills: {
                name: "启用噩梦强化技能",
                init: true
            },
            affectFriendlyAi: {
                name: "己方电脑也获得强化",
                init: true
            },
            showNightmareSkills: {
                name: "显示噩梦强化技能",
                init: true
            },
            strength: {
                name: "噩梦强化等级",
                init: "standard",
                item: {
                    standard: "标准",
                    enhanced: "强化",
                    extreme: "极限"
                }
            },
            allowHiddenInformation: {
                name: "允许噩梦AI使用隐藏信息",
                init: false
            }
        },
        package: {
            character: { connect: true, character: {}, translate: {} },
            card: { card: {}, translate: {}, list: [] },
            skill: { skill: {}, translate: {} }
        },
        files: { character: [], card: [], skill: [], audio: [] }
    };
});
