"use strict";define("site/kernel/kernel",["site/pages/pages","site/popups/popups","common/slider/slider"],function(e,n,t){function o(e,n,t,o){function d(){var n;"js"in e?(a.showLoading(),n=p+e.js,require([n],function(n){delete e.js,n&&a.extendIn(e,n,r),e.loaded=2,o(),a.hideLoading()},function(o){e.loaded=0,require.data.debug||o.requireType&&"scripterror"!==o.requireType&&"nodefine"!==o.requireType||o.xhr&&404!==o.xhr.status?(require.undef(n),i(n,o.message,t)):s(t),a.hideLoading()})):(e.loaded=2,o())}var l,c,r,p,u,v;2===e.loaded?o():1!==e.loaded&&(e.loaded=1,t?(l="#pages",c="page",r=["onload","onunload"]):(l="#popups > div > div",c="popup",r=["onload","onunload","open"]),p=c+"/"+n+"/",u=require.toUrl(p),"css"in e&&(a.appendCss(u+e.css),delete e.css),"html"in e?(v=u+e.html,$.ajax({url:v,type:"get",dataType:"text",success:function(t){delete e.html,$(l).append('<div id="'+n+'">'+t+"</div>"),d()},error:function(n,o){e.loaded=0,require.data.debug||404!==n.status?i(v,n.status,t):s(t)},complete:a.hideLoading}),a.showLoading()):($(l).append('<div id="'+n+'"></div>'),d()))}function i(e,n,t){a.alert("加载"+e+"时发生了一个错误: "+n,t?function(){history.back()}:void 0)}function s(e){e?location.reload():a.confirm("网站已经更新, 使用该功能需要先重新加载. 是否立即刷新本页?",function(e){e&&location.reload()})}var a={appendCss:function(e){var n=document.createElement("link");n.type="text/css",/\.less$/.test(e)?"object"==typeof less?(n.rel="stylesheet/less",n.href=e,less.sheets.push(n),less.refresh()):(n.rel="stylesheet",n.href=e.replace(/less$/,"css")):(n.rel="stylesheet",n.href=e),(document.head||document.getElementsByTagName("head")[0]).appendChild(n)},extendIn:function(e,n,t){for(var o=0;o<t.length;o++)t[o]in n&&(e[t[o]]=n[t[o]])},buildHash:function(e){var n,t="#!"+encodeURIComponent(e.id);for(n in e.args)t+=void 0===e.args[n]?"&"+encodeURIComponent(n):"&"+encodeURIComponent(n)+"="+encodeURIComponent(e.args[n]);return t},parseHash:function(n){var t,o,i,s={id:"home",args:{}};if(n=n.substr(1).replace(/[#\?].*$/,""),i=n.match(/[^=&]+(=[^&]*)?/g)){"!"===i[0].charAt(0)&&(o=i[0].substr(1),o in e&&(s.id=decodeURIComponent(o)));for(t=1;t<i.length;t++)o=i[t].match(/^([^=]+)(?:=(.+))?$/),o&&(s.args[decodeURIComponent(o[1])]=o.length>1?decodeURIComponent(o[2]):void 0)}return s},isSameLocation:function(e,n){var t;if(e.id===n.id&&Object.keys(e.args).length===Object.keys(n.args).length){for(t in e.args)if(!(t in n.args)||e.args[t]!==n.args[t])return!1;return!0}return!1}};return!function(){function e(e,n){var t,o,i;for(e.xEvents[n.type].locked=!0,t=0;t<e.xEvents[n.type].length;t++)e.xEvents[n.type][t].call(e,n);for(e.xEvents[n.type].locked=!1;e.xEvents[n.type].stack.length>0;)e.xEvents[n.type].stack[0]?(o=e.xEvents[n.type].indexOf(e.xEvents[n.type].stack[0][1]),e.xEvents[n.type].stack[0][0]?-1!==o&&e.xEvents[n.type].splice(o,1):-1===o&&e.xEvents[n.type].push(e.xEvents[n.type].stack[0][1])):e.xEvents[n.type].splice(0,e.xEvents[n.type].length),e.xEvents[n.type].stack.shift();if(0===e.xEvents[n.type].length&&(delete e.xEvents[n.type],e.removeEventListener?e.removeEventListener(n.type,e.xEvents,!1):e.detachEvent?e.detachEvent("on"+n.type,e.xEvents):e["on"+n.type]=null),e.xEvents.removeMark){delete e.xEvents.removeMark;for(i in e.xEvents)delete e.xEvents[i],e.removeEventListener?e.removeEventListener(i,e.xEvents,!1):e.detachEvent?e.detachEvent("on"+i,e.xEvents):e["on"+i]=null;e.xEvents=null}}a.listeners={add:function(n,t,o){n.xEvents||(n.xEvents=function(t){e(n,t)}),n.xEvents[t]||(n.xEvents[t]=[],n.xEvents[t].stack=[],n.xEvents[t].locked=!1,n.addEventListener?n.addEventListener(t,n.xEvents,!1):n.attachEvent?n.attachEvent("on"+t,n.xEvents):n["on"+t]=n.xEvents),n.xEvents[t].locked?n.xEvents[t].stack.push([!1,o]):n.xEvents[t].indexOf(o)<0&&n.xEvents[t].push(o)},list:function(e,n){var t,o;if(n)t=e.xEvents&&e.xEvents[n]?e.xEvents[n].slice(0):[];else if(t={},e.xEvents)for(o in e.xEvents)e.xEvents[o]instanceof Array&&e.xEvents[o].length>0&&(t[o]=e.xEvents[o].slice(0));return t},remove:function(e,n,t){var o,i,s;if(e.xEvents)if(n)e.xEvents[n]&&(e.xEvents[n].locked?t?e.xEvents[n].stack.push([!0,t]):e.xEvents[n].stack.push(null):t?(s=e.xEvents[n].indexOf(t),-1!==s&&e.xEvents[n].splice(s,1)):e.xEvents[n].splice(0,e.xEvents[n].length),0===e.xEvents[n].length&&(delete e.xEvents[n],e.removeEventListener?e.removeEventListener(n,e.xEvents,!1):e.detachEvent?e.detachEvent("on"+n,e.xEvents):e["on"+n]=null));else if(!e.xEvents.removeMark){for(o in e.xEvents)e.xEvents[o].locked?i=!0:(delete e.xEvents[o],e.removeEventListener?e.removeEventListener(o,e.xEvents,!1):e.detachEvent?e.detachEvent("on"+o,e.xEvents):e["on"+o]=null);i?e.xEvents.removeMark=!0:e.xEvents=null}}}}(),!function(){var e,t=document.getElementById("popups");a.openPopup=function(e,t){var i=n[e];i?o(i,e,!1,function(){"function"==typeof i.open?i.open(t):a.showPopup(e,t)}):a.hint("popup config not found: "+e)},a.showPopup=function(o,i){var s,d=n[o];e?("function"==typeof n[e].onunload&&n[e].onunload(),document.getElementById(e).style.display=""):(t.style.display="block",s=!0),e=o,t.className=o,document.getElementById(o).style.display="block",s&&"function"==typeof a.popupEvents.onshow&&a.popupEvents.onshow({type:"show"}),"function"==typeof d.onload&&d.onload(i)},a.closePopup=function(o){var i;return e&&(i="string"==typeof o?o===e:o instanceof Array?o.indexOf(e)>=0:!0)?("function"==typeof n[e].onunload&&n[e].onunload(),document.getElementById(e).style.display="",t.className=t.style.display=e="","function"==typeof a.popupEvents.onhide&&a.popupEvents.onhide({type:"hide"}),!0):void 0},a.getCurrentPopup=function(){return e},a.popupEvents={},$("#popups > div > a").on("click",function(){a.closePopup()})}(),!function(){var e=$("#photoview"),n=e.find(".close"),o=e.find(".prev"),i=e.find(".next"),s=t(e.find(">div"));a.showPhotoView=function(e,n){var t;if("array"===$.type(e)){for(t=0;t<e.length;t++)s.add($('<div style="background-image:url('+e[t]+')"></div>'));n>=0&&n<s.children.length&&s.slideTo(n,!0),s.children.length>1?(o.css("display","block"),i.css("display","block")):(o.css("display",""),i.css("display",""))}},a.hidePhotoView=function(){for(;s.children.length;)s.remove(0)},o.on("click",function(){s.slideTo(s.current-1)}),i.on("click",function(){s.slideTo(s.current+1)}),n.on("click",a.hidePhotoView),s.onchange=function(){e.css("display",void 0===this.current?"":"block")}}(),!function(){var e,n,t,o=(document.getElementById("hintCtn"),0),i=document.getElementById("dialogs"),s=[];a.showLoading=function(e){$("#loading > div > div").text(e?e:"正在为您努力加载中..."),0===o&&(document.getElementById("loading").style.display="block"),o+=1},a.hideLoading=function(){o>0&&(o-=1,0===o&&(document.getElementById("loading").style.display="","function"==typeof a.dialogEvents.onloaded&&a.dialogEvents.onloaded({type:"loaded"})))},a.isLoading=function(){return o>0},a.hint=function(n,t){var o=$("#hint");o.find("span").text(n),e?clearTimeout(e):(o.css("display","block"),o[0].offsetWidth,o.fadeIn()),e=setTimeout(function(){e=0,o.fadeOut(function(){o.css("display","")})},t?t:4e3)},a.showReadable=function(e,n,o,i){var s=$("#readable");"string"==typeof e?s.find(">div").css("width",n).css("height",o).find(">div").html(e):s.find(">div").css("width",n).css("height",o).find(">div").append(e),s.css("display","block"),t=i},a.hideReadable=function(){"function"==typeof t&&(t(),t=void 0),$("#readable").css("display","").find(">div>div>*").remove()},a.hideDialog=function(e){var t;"function"==typeof n&&("isConfirm"===i.className?n(e):"isAlert"===i.className&&n(),n=void 0),i.className="",s.length>0&&(t=s[0][0],s[0].shift(),a[t].apply(this,s[0]),s.shift())},a.showForeign=function(e,n,t,o){a.showReadable('<iframe frameborder="no" allowtransparency="yes" marginwidth="0" marginheight="0" style="width:100%;height:100%;" src="'+e+'"></iframe>',n,t,o)},a.confirm=function(e,t,o,a){var d,l;""===i.className?(d=$(i).find(">div"),l=d.find(">div>div"),n=t,d.css("width",o||"400px"),l.text(e),i.className="isConfirm",d.css("height",l.outerHeight()+108+"px")):s.push(["confirm",e,t,o,a])},a.alert=function(e,t,o,a){var d,l;""===i.className?(d=$(i).find(">div"),l=d.find(">div>div"),n=t,d.css("width",o||"400px"),l.text(e),i.className="isAlert",d.css("height",l.outerHeight()+46+"px")):s.push(["alert",e,t,o])},$("#readable > div > a").on("click",a.hideReadable),$(window).on("keydown",function(e){27===e.keyCode&&"block"===$("#readable").css("display")&&a.hideReadable()}),$(i).find(">div>a.close").on("click",a.hideDialog),$(i).find(">div>a.yes").on("click",function(){a.hideDialog(!0)}),$(i).find(">div>a.no").on("click",function(){a.hideDialog(!1)}),a.dialogEvents={}}(),!function(){function n(){var n=a.parseHash(location.hash),s=history.state;history.replaceState&&history.replaceState(!0,null),a.location&&a.isSameLocation(a.location,n)||("undefined"!=typeof _hmt&&_hmt.push&&_hmt.push(["_trackPageview","/"+a.buildHash(n)]),a.location=n,a.closePopup(),a.hideReadable(),"function"==typeof i&&i(),o(e[a.location.id],a.location.id,!0,function(){var n,o;a.location.id!==t?(t?("function"==typeof e[t].onunload&&e[t].onunload(),document.getElementById(t).style.display="",n=!s):"autopopup"in a.location.args&&(a.openPopup(a.location.args.autopopup,a.location.args.autopopuparg),delete a.location.args.autopopup,delete a.location.args.autopopuparg),document.body.className=t=a.location.id,document.getElementById(a.location.id).style.display="block","function"==typeof e[a.location.id].onload&&e[a.location.id].onload(!0),n&&(o=Math.max(document.body.scrollTop,document.documentElement.scrollTop),o>0&&$("html,body").animate({scrollTop:0},o))):"function"==typeof e[a.location.id].onload&&e[a.location.id].onload()}))}var t,i;a.init=function(e){var t;i=e,"onhashchange"in window?$(window).on("hashchange",n):setInterval(function(){t!==location.hash&&(t=location.hash,n())},10),n()},a.reloadPage=function(){a.closePopup(),a.hideReadable(),"function"==typeof e[t].onunload&&e[t].onunload(),"function"==typeof e[t].onload&&e[t].onload(!0)}}(),a});