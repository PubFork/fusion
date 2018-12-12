! function () {
	'use strict';
	var src, prefix, cfg, head, n;
	if (self.XMLHttpRequest) {
		src = (document.currentScript || document.scripts[document.scripts.length - 1]).getAttribute('src');
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
				controller.postMessage(VERSION === 'dev' ? prefix : {
					framework: RES_TO_CACHE,
					modules: Object.values(MODULES)
				});
				init();
			}, function (err) {
				console.log('unable to register ServiceWorker: ' + err);
				init();
			});
		} else {
			init();
		}
	} else {
		self.onload = function () {
			document.getElementById('loading').firstChild.firstChild.firstChild.data = 'Your browser is too old, please upgrade.';
		};
	}

	function init() {
		var l = document.createElement('link'),
			m = document.createElement('link');
		if (VERSION === 'dev') {
			l.rel = m.rel = 'stylesheet/less';
			l.href = require.toUrl('site/index/index.less');
			m.href = require.toUrl('common/kernel/kernel.less');
			require([prefix + 'framework/less.js'], function () {
				less.pageLoadFinished.then(start);
			});
		} else {
			l.rel = m.rel = 'stylesheet';
			l.href = require.toUrl('site/index/index.css');
			m.href = require.toUrl('common/kernel/kernel.css');
			l.onload = m.onload = trystart;
			n = false;
		}
		head = document.head || document.getElementsByTagName('head')[0];
		head.appendChild(m);
		head.appendChild(l);
	}

	function start() {
		require(['site/index/index']);
	}

	function trystart() {
		this.onload = null;
		if (n) {
			start();
		} else {
			n = true;
		}
	}
}();