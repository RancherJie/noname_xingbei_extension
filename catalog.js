if (!localStorage.getItem('old-extension-tip')) {
	alert('您在游戏内的扩展栏目获取的扩展可能导致游戏崩溃' +
		'，请谨慎下载');
	localStorage.setItem('old-extension-tip', 'true');
};
extension["织梦者"]={
	date:"2025/03/11",
	intro:"玩弄技能的角色。游戏本体版本最低v1.0.2",
	author:"农之",
	netdisk:"",
	forum:"",
	version:"1.1",
	files:["info.json","LICENSE","mengJingSuXing.jpg","package.js","README.md","zhiMengZhe.jpg"],
	size:"1.8MB"
};