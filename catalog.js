if (!localStorage.getItem('old-extension-tip')) {
	alert('您在游戏内的扩展栏目获取的扩展可能导致游戏崩溃' +
		'，请谨慎下载');
	localStorage.setItem('old-extension-tip', 'true');
};