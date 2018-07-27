! function () {
	'use strict';
	var src, prefix, cfg, head, l, m, n;
	if (window.XMLHttpRequest) {
		src = (document.currentScript || document.scripts[document.scripts.length - 1]).src;
		prefix = src.replace(/framework\/[^\/]+$/, '');
		cfg = {
			waitSeconds: 0,
			baseUrl: prefix + 'dev/'
		};
		if (VERSION !== 'dev') {
			for (n in MODULES) {
				MODULES[n] = prefix + 'dist/' + n + '/' + MODULES[n];
			}
			cfg.paths = MODULES;
		}
		require.config(cfg);
		if (navigator.serviceWorker) {
			navigator.serviceWorker.register('sw.js', {
				scope: './'
			}).then(function (registration) {
				var controller = registration.installing || registration.waiting || registration.active;
				RES_TO_CACHE.push(src);
				controller.postMessage({
					framework: RES_TO_CACHE,
					modules: Object.values(MODULES)
				});
			}, function (err) {
				console.log('unable to register ServiceWorker: ' + err);
			});
		}
		l = document.createElement('link');
		m = document.createElement('link');
		if (VERSION === 'dev') {
			l.rel = m.rel = 'stylesheet/less';
			l.href = require.toUrl('site/index/index.less');
			m.href = require.toUrl('common/kernel/kernel.less');
			require([prefix + 'framework/less.js'], function () {
				less.pageLoadFinished.then(function () {
					require(['site/index/index']);
				});
			});
		} else {
			l.rel = m.rel = 'stylesheet';
			l.href = require.toUrl('site/index/index.css');
			m.href = require.toUrl('common/kernel/kernel.css');
			require(['site/index/index']);
		}
		head = document.head || document.getElementsByTagName('head')[0];
		head.appendChild(m);
		head.appendChild(l);
	} else {
		window.onload = function () {
			document.getElementById('loading').firstChild.firstChild.firstChild.data = '请使用IE7+、Chrome、Firefox访问';
		};
	}
}();