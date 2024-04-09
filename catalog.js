if (!localStorage.getItem('old-extension-tip')) {
	alert('扩展仓库升级中，' +
		'您在游戏内的扩展栏目获取扩展时可能会下载到四五年前的扩展导致游戏崩溃' +
		'，升级完成前请谨慎下载');
	localStorage.setItem('old-extension-tip', 'true');
}