'use strict';define(['common/kernel/kernel'],function(a){var b;'your_production_host'===location.host&&(window._hmt=[['_setAutoPageview',!1]],require(['//hm.baidu.com/hm.js?[your_hmid]'],function(){var a=head.getElementsByTagName('input')[0];a&&head.removeChild(a)})),a.listeners.add(a.pageEvents,'route',function(){b=history.state,history.replaceState&&history.replaceState(!0,null),window._hmt&&_hmt.push&&_hmt.push(['_trackPageview','/'+a.buildHash(a.location)])}),a.listeners.add(a.pageEvents,'routend',function(){var c;a.lastLocation&&a.lastLocation.id!==a.location.id&&!b&&(c=Math.max(document.body.scrollTop,document.documentElement.scrollTop),0<c&&$('html,body').animate({scrollTop:0},c))}),a.init('doc')});