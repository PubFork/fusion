"use strict";define("common/kernel/kernel",["common/slider/slider","site/pages/pages","site/popups/popups","site/panels/panels"],function(e,n,t,o){function i(e,n,t){var o;2===e.loaded&&"function"==typeof e.ondestory&&e.ondestory(),$("#"+t).remove(),e.css&&"string"!=typeof e.css&&($(e.css).remove(),"stylesheet/less"===e.css.type&&(less.sheets.splice(less.sheets.indexOf(e.css),1),less.refresh()),e.css=e.css.getAttribute("href").replace(RegExp("^"+require.toUrl(n+"/"+t)+"/"),"")),e.js&&(o=n+"/"+t+"/"+e.js,require.defined(o)&&require([o],function(n){require.undef(o),n&&(e.__proto__=Object.prototype)})),e.loaded=0}function s(e,n,t,o){function s(){var s;"js"in n?(c.showLoading(),s=r+n.js,require([s],function(e){e&&(n.__proto__=e),n.loaded=2,o(),c.hideLoading()},require.data.debug?void 0:function(o){i(n,e,t),o.requireType&&"scripterror"!==o.requireType&&"nodefine"!==o.requireType||o.xhr&&404!==o.xhr.status?a(s,o.message,p):d(p),c.hideLoading()})):(n.loaded=2,o())}var l,r,u,p,f;2===n.loaded?o():1!==n.loaded&&(n.loaded=1,l="#"+e+"s",r=e+"/"+t+"/",u=require.toUrl(r),p="page"===e,"popup"===e?l+=">div>div":"panel"===e&&(l+=">.contents>div"),l=$(l)[0],"string"==typeof n.css&&(n.css=c.appendCss(u+n.css)),"html"in n?(f=u+n.html,$.ajax({url:f,type:"get",dataType:"text",success:function(e){l.insertAdjacentHTML("afterBegin",'<div id="'+t+'">'+e+"</div>"),s()},error:function(o){i(n,e,t),require.data.debug||404!==o.status?a(f,o.status,p):d(p)},complete:c.hideLoading}),c.showLoading()):(l.insertAdjacentHTML("afterBegin",'<div id="'+t+'"></div>'),s()))}function a(e,n,t){c.alert("加载"+e+"时发生了一个错误: "+n,t?function(){history.back()}:void 0)}function d(e){e?location.reload():c.confirm("网站已经更新, 使用该功能需要先重新加载. 是否立即刷新本页?",function(e){e&&location.reload()})}var l,c={appendCss:function(e){var n=document.createElement("link");return n.type="text/css",/\.less$/.test(e)?"object"==typeof less?(n.rel="stylesheet/less",n.href=e,less.sheets.push(n),less.refresh()):(n.rel="stylesheet",n.href=e.replace(/less$/,"css")):(n.rel="stylesheet",n.href=e),(document.head||document.getElementsByTagName("head")[0]).appendChild(n),n},buildHash:function(e){var n,t="#!"+encodeURIComponent(e.id);for(n in e.args)t+=void 0===e.args[n]?"&"+encodeURIComponent(n):"&"+encodeURIComponent(n)+"="+encodeURIComponent(e.args[n]);return t},parseHash:function(e){var t,o,i,s={id:l,args:{}};if(e=e.substr(1).replace(/[#\?].*$/,""),i=e.match(/[^=&]+(=[^&]*)?/g)){"!"===i[0].charAt(0)&&(o=i[0].substr(1),o in n&&(s.id=decodeURIComponent(o)));for(t=1;i.length>t;t++)o=i[t].match(/^([^=]+)(=)?(.+)?$/),o&&(s.args[decodeURIComponent(o[1])]=o[2]?decodeURIComponent(o[3]||""):void 0)}return s},isSameLocation:function(e,n){var t;if(e.id===n.id&&Object.keys(e.args).length===Object.keys(n.args).length){for(t in e.args)if(!(t in n.args)||e.args[t]!==n.args[t])return!1;return!0}return!1}};return!function(){function e(e,n){var t,o,i;for(e.xEvents[n.type].locked=!0,t=0;e.xEvents[n.type].length>t;t++)e.xEvents[n.type][t].call(e,n);for(e.xEvents[n.type].locked=!1;e.xEvents[n.type].stack.length;)e.xEvents[n.type].stack[0]?(o=e.xEvents[n.type].indexOf(e.xEvents[n.type].stack[0][1]),e.xEvents[n.type].stack[0][0]?o!==-1&&e.xEvents[n.type].splice(o,1):o===-1&&e.xEvents[n.type].push(e.xEvents[n.type].stack[0][1])):e.xEvents[n.type].splice(0,e.xEvents[n.type].length),e.xEvents[n.type].stack.shift();if(e.xEvents[n.type].length||(delete e.xEvents[n.type],e["on"+n.type]=null),e.xEvents.removeMark){delete e.xEvents.removeMark;for(i in e.xEvents)delete e.xEvents[i],e["on"+i]=null;e.xEvents=null}}c.listeners={add:function(n,t,o){n.xEvents||(n.xEvents=function(t){e(n,t)}),n.xEvents[t]||(n.xEvents[t]=[],n.xEvents[t].stack=[],n.xEvents[t].locked=!1,n["on"+t]=n.xEvents),n.xEvents[t].locked?n.xEvents[t].stack.push([!1,o]):n.xEvents[t].indexOf(o)<0&&n.xEvents[t].push(o)},list:function(e,n){var t,o;if(n)t=e.xEvents&&e.xEvents[n]?e.xEvents[n].slice(0):[];else if(t={},e.xEvents)for(o in e.xEvents)"array"===$.type(e.xEvents[o])&&e.xEvents[o].length&&(t[o]=e.xEvents[o].slice(0));return t},remove:function(e,n,t){var o,i,s;if(e.xEvents)if(n)e.xEvents[n]&&(e.xEvents[n].locked?e.xEvents[n].stack.push(t?[!0,t]:null):t?(s=e.xEvents[n].indexOf(t),s!==-1&&e.xEvents[n].splice(s,1)):e.xEvents[n].splice(0,e.xEvents[n].length),0===e.xEvents[n].length&&(delete e.xEvents[n],e["on"+n]=null));else if(!e.xEvents.removeMark){for(o in e.xEvents)e.xEvents[o].locked?i=!0:(delete e.xEvents[o],e["on"+o]=null);i?e.xEvents.removeMark=!0:e.xEvents=null}}}}(),!function(){function e(e,n){a=!0,$(r).animate({"margin-left":n?"-100%":"0%"},{duration:200,complete:function(){a=!1,e(),"function"==typeof d&&(d(),d=void 0)}})}function n(){"function"==typeof o[t].onunload&&o[t].onunload(),e(function(){"function"==typeof o[t].onunloadend&&o[t].onunloadend(),document.getElementById(t).style.display=l.style.display="",t=void 0},!1)}var t,a,d,l=document.getElementById("panels"),r=l.lastChild.firstChild;c.openPanel=function(e,n){var t=o[e];t?s("panel",t,e,function(){"function"==typeof t.open?t.open(n):c.showPanel(e,n)}):c.hint("panel config not found: "+e,"error")},c.showPanel=function(i,s){function r(){setTimeout(function(){d=function(){c.showPanel(i,s)}},0)}a?r():t?(n(),r()):("function"==typeof o[i].onload&&o[i].onload(s),l.className=t=i,l.style.display=document.getElementById(i).style.display="block",e(function(){"function"==typeof o[i].onloadend&&o[i].onloadend()},!0))},c.closePanel=function(e){var o;a?setTimeout(function(){d=function(){c.closePanel(e)}},0):t&&(o="string"==typeof e?e===t:"array"!==$.type(e)||e.indexOf(t)>=0,o?n():d&&(d=void 0))},c.destoryPanel=function(e){var n=o[e];n&&i(n,"panel",e)},$(l.firstChild).on("click",c.closePanel),$(r.firstChild).on("click",c.closePanel)}(),!function(){var e,n=document.getElementById("popups");c.openPopup=function(e,n){var o=t[e];o?s("popup",o,e,function(){"function"==typeof o.open?o.open(n):c.showPopup(e,n)}):c.hint("popup config not found: "+e,"error")},c.showPopup=function(o,i){var s,a=t[o];e?("function"==typeof t[e].onunload&&t[e].onunload(),document.getElementById(e).style.display=""):(n.style.display="block",s=!0),e=o,n.className=o,document.getElementById(o).style.display="block",s&&"function"==typeof c.popupEvents.onshow&&c.popupEvents.onshow({type:"show"}),"function"==typeof a.onload&&a.onload(i)},c.closePopup=function(o){var i;if(e&&(i="string"==typeof o?o===e:"array"!==$.type(o)||o.indexOf(e)>=0))return"function"==typeof t[e].onunload&&t[e].onunload(),document.getElementById(e).style.display="",i=e,n.className=n.style.display=e="","function"==typeof c.popupEvents.onhide&&c.popupEvents.onhide({type:"hide",id:i}),!0},c.getCurrentPopup=function(){return e},c.destoryPopup=function(e){var n=t[e];n&&i(n,"popup",e)},c.popupEvents={},$("#popups>div>a").on("click",function(){c.closePopup()})}(),!function(){function n(){i=$(window).innerWidth(),s=$(window).innerHeight(),"number"==typeof u.current&&p[u.current]&&o(u.current)}function t(e){u.children[e].one("load",function(){p[e]={w:this.width,h:this.height},u.current===e&&o(e),this.style.visibility="visible"})}function o(e){var n,t,o;p[e].w>i||p[e].h>s?(n=p[e].w/p[e].h,i/s>n?(o=s,t=o*n,u.children[e].css({left:(i-t)/2+"px",top:0})):(t=i,o=t/n,u.children[e].css({left:0,top:(s-o)/2+"px"})),u.children[e].css({width:t+"px",height:o+"px",cursor:"zoom-in"})):u.children[e].css({top:(s-p[e].h)/2+"px",left:(i-p[e].w)/2+"px",width:"",height:"",cursor:""})}var i,s,a=$("#photoview"),d=a.find(".close"),l=a.find(".prev"),r=a.find(".next"),u=e(a.find(">div")),p=[];c.showPhotoView=function(e,n){var o;if("array"===$.type(e)){for(o=0;e.length>o;o++)u.add($('<img src="'+e[o]+'"/>')),t(o);n>=0&&u.children.length>n&&u.slideTo(n,!0),u.children.length>1?(l.css("display","block"),r.css("display","block")):(l.css("display",""),r.css("display",""))}},c.hidePhotoView=function(){for(p=[];u.children.length;)u.remove(0)},a.on("click",">div>img",function(){"zoom-in"===this.style.cursor?(this.style.width=this.style.height="",this.style.cursor="zoom-out",this.style.top=p[u.current].h>s?0:(s-p[u.current].h)/2+"px",this.style.left=p[u.current].w>i?0:(i-p[u.current].w)/2+"px"):"zoom-out"===this.style.cursor&&o(u.current)}),$(window).on("resize",n),l.on("click",function(){u.slideTo(u.current-1)}),r.on("click",function(){u.slideTo(u.current+1)}),d.on("click",c.hidePhotoView),u.onchange=function(){void 0===this.current?a.css("display",""):(p[this.current]&&o(this.current),a.css("display","block"))},n()}(),!function(){var e,n,t,o=(document.getElementById("hintCtn"),0),i=document.getElementById("dialogs"),s=[];c.showLoading=function(e){$("#loading>div>div").text(e?e:"加载中..."),0===o&&(document.getElementById("loading").style.display="block"),o+=1},c.hideLoading=function(){o>0&&(o-=1,0===o&&(document.getElementById("loading").style.display="","function"==typeof c.dialogEvents.onloaded&&c.dialogEvents.onloaded({type:"loaded"})))},c.isLoading=function(){return o>0},c.hint=function(n,t,o){var i=$("#hint");i.prop("className",t?t:""),i.find("span").text(n),e?clearTimeout(e):(i.css("display","block"),i.fadeIn()),o||(o="error"===t?4e3:"warning"===t?3e3:2e3),e=setTimeout(function(){e=0,i.fadeOut(function(){i.css("display","")})},o)},c.showReadable=function(e,n,o,i){var s=$("#readable");"string"==typeof e?s.find(">div").css("width",n).css("height",o).find(">div").html(e):s.find(">div").css("width",n).css("height",o).find(">div").append(e),s.css("display","block"),t=i},c.hideReadable=function(){"function"==typeof t&&(t(),t=void 0),$("#readable").css("display","").find(">div>div>*").remove()},c.hideDialog=function(e){var t;"function"==typeof n&&("isConfirm"===i.className?n(e):"isAlert"===i.className&&n(),n=void 0),i.className="",s.length>0&&(t=s[0][0],s[0].shift(),c[t].apply(this,s[0]),s.shift())},c.showForeign=function(e,n,t,o){c.showReadable('<iframe frameborder="no" allowtransparency="yes" marginwidth="0" marginheight="0" style="width:100%;height:100%;" src="'+e+'"></iframe>',n,t,o)},c.confirm=function(e,t,o,a){var d,l;""===i.className?(d=$(i).find(">div"),l=d.find(">div>div"),n=t,d.css("width",o||"400px"),l.text(e),i.className="isConfirm",d.css("height",l.outerHeight()+Math.max($(i).find(">div>a.yes").outerHeight(),$(i).find(">div>a.no").outerHeight())+76+"px")):s.push(["confirm",e,t,o,a])},c.alert=function(e,t,o){var a,d;""===i.className?(a=$(i).find(">div"),d=a.find(">div>div"),n=t,a.css("width",o||"400px"),d.text(e),i.className="isAlert",a.css("height",d.outerHeight()+46+"px")):s.push(["alert",e,t,o])},$("#readable>div>a").on("click",c.hideReadable),$(window).on("keydown",function(e){27===e.keyCode&&"block"===$("#readable").css("display")&&c.hideReadable()}),$(i).find(">div>a.close").on("click",c.hideDialog),$(i).find(">div>a.yes").on("click",function(){c.hideDialog(!0)}),$(i).find(">div>a.no").on("click",function(){c.hideDialog(!1)}),c.dialogEvents={}}(),!function(){function e(){var e=c.parseHash(location.hash),i=history.state,d=e.id!==t;history.replaceState&&history.replaceState(!0,null),c.location&&c.isSameLocation(c.location,e)||(c.location=e,c.closePanel(),c.closePopup(),c.hideReadable(),"function"==typeof o&&o(d),s("page",n[e.id],e.id,function(){var o,s;d?(t?("function"==typeof n[t].onunload&&n[t].onunload(),document.getElementById(t).style.display="",o=!a&&!i):"autopopup"in e.args&&c.openPopup(e.args.autopopup,e.args.autopopuparg?JSON.parse(e.args.autopopuparg):void 0),document.body.className=t=e.id,document.getElementById(e.id).style.display="block","function"==typeof n[e.id].onload&&n[e.id].onload(!0),o?(s=Math.max(document.body.scrollTop,document.documentElement.scrollTop),s>0&&$("html,body").animate({scrollTop:0},s)):a&&(a.scrollTop=0)):"function"==typeof n[e.id].onload&&n[e.id].onload()}))}var t,o,a;c.init=function(n,t,i){var s;l=n,a=t,o=i,"onhashchange"in window?$(window).on("hashchange",e):setInterval(function(){s!==location.hash&&(s=location.hash,e())},10),e()},c.setHome=function(t){var o;if(t in n&&(o=l,l=t,c.location&&c.location.id===o&&!c.isSameLocation(c.location,c.parseHash(location.hash))))return e(),!0},c.reloadPage=function(e){(!e||"string"==typeof e&&e===c.location.id||"array"===$.type(e)&&e.indexOf(c.location.id)>=0)&&(c.closePanel(),c.closePopup(),c.hideReadable(),"function"==typeof n[t].onunload&&n[t].onunload(),"function"==typeof n[t].onload&&n[t].onload(!0))},c.destoryPage=function(e){var t=n[e];t&&i(t,"page",e)}}(),c});