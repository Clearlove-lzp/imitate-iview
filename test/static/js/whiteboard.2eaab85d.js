(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["whiteboard"],{1635:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"demo"},[n("div",{staticClass:"rtcBox"},[n("ul",t._l(t.handleList,(function(e){return n("li",{key:e.type},["color"===e.type?n("el-color-picker",{attrs:{"show-alpha":"",disabled:t.allowHangup},on:{change:t.colorChange},model:{value:t.color,callback:function(e){t.color=e},expression:"color"}}):t._e(),["color","lineWidth","polygon"].includes(e.type)?t._e():n("button",{class:{active:t.currHandle===e.type},attrs:{disabled:"cancel"===e.type?t.allowHangup||t.allowCancel:"go"===e.type?t.allowHangup||t.allowGo:t.allowHangup},on:{click:function(n){return t.handleClick(e)}}},[t._v(t._s(e.name))]),"polygon"===e.type?n("el-popover",{attrs:{placement:"top",width:"400",trigger:"click"}},[n("el-input-number",{attrs:{"controls-position":"right",min:3,max:10},on:{change:t.sidesChange},model:{value:t.sides,callback:function(e){t.sides=e},expression:"sides"}}),n("button",{class:{active:t.currHandle===e.type},attrs:{slot:"reference",disabled:t.allowHangup},on:{click:function(n){return t.handleClick(e)}},slot:"reference"},[t._v(t._s(e.name))])],1):t._e(),"lineWidth"===e.type?n("el-popover",{attrs:{placement:"top",width:"400",trigger:"click"}},[n("el-slider",{attrs:{max:20},on:{change:t.lineWidthChange},model:{value:t.lineWidth,callback:function(e){t.lineWidth=e},expression:"lineWidth"}}),n("button",{attrs:{slot:"reference",disabled:t.allowHangup},slot:"reference"},[t._v(t._s(e.name)+" "),n("i",[t._v(t._s(t.lineWidth+"px"))])])],1):t._e()],1)})),0),n("div",[n("canvas",{ref:"canvas",attrs:{width:"400",height:"300"}}),n("h5",[t._v("白板操作")])]),n("div",[n("video",{attrs:{src:"",id:"rtcB",playsinline:"",autoplay:""}}),n("h5",[t._v("演示画面")]),n("button",{attrs:{disabled:t.allowCall},on:{click:t.call}},[t._v("call")]),n("button",{attrs:{disabled:t.allowHangup},on:{click:t.hangup}},[t._v("hangup")])])])])},r=[],a=(n("caad"),n("96cf"),n("c964")),o=n("ebd6"),s={name:"whiteboard",data:function(){return{peerA:null,peerB:null,offerOption:{offerToReceiveAudio:1,offerToReceiveVideo:1},allowCall:!0,allowHangup:!0,handleList:[{name:"圆",type:"arc"},{name:"线条",type:"line"},{name:"矩形",type:"rect"},{name:"多边形",type:"polygon"},{name:"橡皮擦",type:"eraser"},{name:"撤回",type:"cancel"},{name:"前进",type:"go"},{name:"清屏",type:"clear"},{name:"线宽",type:"lineWidth"},{name:"颜色",type:"color"}],color:"rgba(19, 206, 102, 1)",currHandle:"line",lineWidth:5,palette:null,allowCancel:!0,allowGo:!0,sides:3}},methods:{initPalette:function(){this.palette=new o["a"](this.$refs["canvas"],{drawColor:this.color,drawType:this.currHandle,lineWidth:this.lineWidth,allowCallback:this.allowCallback})},allowCallback:function(t,e){this.allowCancel=!t,this.allowGo=!e},sidesChange:function(){this.palette.changeWay({sides:this.sides})},colorChange:function(){this.palette.changeWay({color:this.color})},lineWidthChange:function(){this.palette.changeWay({lineWidth:this.lineWidth})},handleClick:function(t){["cancel","go","clear"].includes(t.type)?this.palette[t.type]():(this.palette.changeWay({type:t.type}),["color","lineWidth"].includes(t.type)||(this.currHandle=t.type))},call:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.peerA&&t.peerB||t.initPeer(),e.prev=1,e.next=4,t.peerB.createOffer(t.offerOption);case 4:return n=e.sent,e.next=7,t.onCreateOffer(n);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](1),console.log("createOffer: ",e.t0);case 12:t.allowCall=!0,t.allowHangup=!1;case 14:case"end":return e.stop()}}),e,null,[[1,9]])})))()},hangup:function(){this.peerA.close(),this.peerB.close(),this.peerA=null,this.peerB=null,this.allowCall=!1,this.allowHangup=!0,this.palette.destroy(),this.palette=null},onCreateOffer:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.peerB.setLocalDescription(t);case 3:n.next=8;break;case 5:n.prev=5,n.t0=n["catch"](0),console.log("Offer-setLocalDescription: ",n.t0);case 8:return n.prev=8,n.next=11,e.peerA.setRemoteDescription(t);case 11:n.next=16;break;case 13:n.prev=13,n.t1=n["catch"](8),console.log("Offer-setRemoteDescription: ",n.t1);case 16:return n.prev=16,n.next=19,e.peerA.createAnswer();case 19:return i=n.sent,n.next=22,e.onCreateAnswer(i);case 22:n.next=27;break;case 24:n.prev=24,n.t2=n["catch"](16),console.log("createAnswer: ",n.t2);case 27:case"end":return n.stop()}}),n,null,[[0,5],[8,13],[16,24]])})))()},onCreateAnswer:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.peerA.setLocalDescription(t);case 3:n.next=8;break;case 5:n.prev=5,n.t0=n["catch"](0),console.log("answer-setLocalDescription: ",n.t0);case 8:return n.prev=8,n.next=11,e.peerB.setRemoteDescription(t);case 11:n.next=16;break;case 13:n.prev=13,n.t1=n["catch"](8),console.log("answer-setRemoteDescription: ",n.t1);case 16:case"end":return n.stop()}}),n,null,[[0,5],[8,13]])})))()},initPeer:function(){var t=this,e=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;this.peerA=new e,this.peerA.addStream(this.localstream),this.peerA.onicecandidate=function(e){e.candidate&&t.peerB.addIceCandidate(e.candidate)},this.peerB=new e,this.peerB.onaddstream=function(e){var n=document.querySelector("#rtcB");n.srcObject=e.stream,t.initPalette()},this.peerB.onicecandidate=function(e){e.candidate&&t.peerA.addIceCandidate(e.candidate)},this.allowCall=!1},createMedia:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.localstream=t.$refs["canvas"].captureStream(),t.initPeer();case 2:case"end":return e.stop()}}),e)})))()}},mounted:function(){var t=this;this.$nextTick((function(){t.createMedia()}))}},c=s,l=(n("27ab"),n("2877")),h=Object(l["a"])(c,i,r,!1,null,"59ad7617",null);e["default"]=h.exports},"1dde":function(t,e,n){var i=n("d039"),r=n("b622"),a=n("2d00"),o=r("species");t.exports=function(t){return a>=51||!i((function(){var e=[],n=e.constructor={};return n[o]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"27ab":function(t,e,n){"use strict";n("e2d2")},"65f0":function(t,e,n){var i=n("861d"),r=n("e8b5"),a=n("b622"),o=a("species");t.exports=function(t,e){var n;return r(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!r(n.prototype)?i(n)&&(n=n[o],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},8418:function(t,e,n){"use strict";var i=n("c04e"),r=n("9bf2"),a=n("5c6c");t.exports=function(t,e,n){var o=i(e);o in t?r.f(t,o,a(0,n)):t[o]=n}},"96cf":function(t,e,n){var i=function(t){"use strict";var e,n=Object.prototype,i=n.hasOwnProperty,r="function"===typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",s=r.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(P){c=function(t,e,n){return t[e]=n}}function l(t,e,n,i){var r=e&&e.prototype instanceof y?e:y,a=Object.create(r.prototype),o=new O(i||[]);return a._invoke=E(t,n,o),a}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(P){return{type:"throw",arg:P}}}t.wrap=l;var u="suspendedStart",p="suspendedYield",d="executing",f="completed",v={};function y(){}function g(){}function m(){}var w={};w[a]=function(){return this};var b=Object.getPrototypeOf,x=b&&b(b(S([])));x&&x!==n&&i.call(x,a)&&(w=x);var k=m.prototype=y.prototype=Object.create(w);function C(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function n(r,a,o,s){var c=h(t[r],t,a);if("throw"!==c.type){var l=c.arg,u=l.value;return u&&"object"===typeof u&&i.call(u,"__await")?e.resolve(u.__await).then((function(t){n("next",t,o,s)}),(function(t){n("throw",t,o,s)})):e.resolve(u).then((function(t){l.value=t,o(l)}),(function(t){return n("throw",t,o,s)}))}s(c.arg)}var r;function a(t,i){function a(){return new e((function(e,r){n(t,i,e,r)}))}return r=r?r.then(a,a):a()}this._invoke=a}function E(t,e,n){var i=u;return function(r,a){if(i===d)throw new Error("Generator is already running");if(i===f){if("throw"===r)throw a;return M()}n.method=r,n.arg=a;while(1){var o=n.delegate;if(o){var s=W(o,n);if(s){if(s===v)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(i===u)throw i=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);i=d;var c=h(t,e,n);if("normal"===c.type){if(i=n.done?f:p,c.arg===v)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(i=f,n.method="throw",n.arg=c.arg)}}}function W(t,n){var i=t.iterator[n.method];if(i===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,W(t,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var r=h(i,t.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,n.delegate=null,v;var a=r.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function S(t){if(t){var n=t[a];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function n(){while(++r<t.length)if(i.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:M}}function M(){return{value:e,done:!0}}return g.prototype=k.constructor=m,m.constructor=g,g.displayName=c(m,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,s,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},C(L.prototype),L.prototype[o]=function(){return this},t.AsyncIterator=L,t.async=function(e,n,i,r,a){void 0===a&&(a=Promise);var o=new L(l(e,n,i,r),a);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},C(k),c(k,s,"Generator"),k[a]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var i=e.pop();if(i in t)return n.value=i,n.done=!1,n}return n.done=!0,n}},t.values=S,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(A),!t)for(var n in this)"t"===n.charAt(0)&&i.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(i,r){return s.type="throw",s.arg=t,n.next=i,r&&(n.method="next",n.arg=e),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=i.call(o,"catchLoc"),l=i.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),A(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var i=n.completion;if("throw"===i.type){var r=i.arg;A(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,i){return this.delegate={iterator:S(t),resultName:n,nextLoc:i},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=i}catch(r){Function("r","regeneratorRuntime = r")(i)}},"99af":function(t,e,n){"use strict";var i=n("23e7"),r=n("d039"),a=n("e8b5"),o=n("861d"),s=n("7b0b"),c=n("50c4"),l=n("8418"),h=n("65f0"),u=n("1dde"),p=n("b622"),d=n("2d00"),f=p("isConcatSpreadable"),v=9007199254740991,y="Maximum allowed index exceeded",g=d>=51||!r((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),m=u("concat"),w=function(t){if(!o(t))return!1;var e=t[f];return void 0!==e?!!e:a(t)},b=!g||!m;i({target:"Array",proto:!0,forced:b},{concat:function(t){var e,n,i,r,a,o=s(this),u=h(o,0),p=0;for(e=-1,i=arguments.length;e<i;e++)if(a=-1===e?o:arguments[e],w(a)){if(r=c(a.length),p+r>v)throw TypeError(y);for(n=0;n<r;n++,p++)n in a&&l(u,p,a[n])}else{if(p>=v)throw TypeError(y);l(u,p++,a)}return u.length=p,u}})},ae40:function(t,e,n){var i=n("83ab"),r=n("d039"),a=n("5135"),o=Object.defineProperty,s={},c=function(t){throw t};t.exports=function(t,e){if(a(s,t))return s[t];e||(e={});var n=[][t],l=!!a(e,"ACCESSORS")&&e.ACCESSORS,h=a(e,0)?e[0]:c,u=a(e,1)?e[1]:void 0;return s[t]=!!n&&!r((function(){if(l&&!i)return!0;var t={length:-1};l?o(t,1,{enumerable:!0,get:c}):t[1]=1,n.call(t,h,u)}))}},c964:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("d3b7");function i(t,e,n,i,r,a,o){try{var s=t[a](o),c=s.value}catch(l){return void n(l)}s.done?e(c):Promise.resolve(c).then(i,r)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function s(t){i(o,r,a,s,c,"next",t)}function c(t){i(o,r,a,s,c,"throw",t)}s(void 0)}))}}},caad:function(t,e,n){"use strict";var i=n("23e7"),r=n("4d64").includes,a=n("44d2"),o=n("ae40"),s=o("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:!s},{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),a("includes")},e2d2:function(t,e,n){},e8b5:function(t,e,n){var i=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==i(t)}},ebd6:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("99af"),n("fb6a");function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function a(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}var o=function(){function t(e,n){var r=n.drawType,a=void 0===r?"line":r,o=n.drawColor,s=void 0===o?"rgba(19, 206, 102, 1)":o,c=n.lineWidth,l=void 0===c?5:c,h=n.sides,u=void 0===h?3:h,p=n.allowCallback,d=n.moveCallback;i(this,t),this.canvas=e,this.width=e.width,this.height=e.height,this.paint=e.getContext("2d"),this.isClickCanvas=!1,this.isMoveCanvas=!1,this.imgData=[],this.index=0,this.x=0,this.y=0,this.last=[this.x,this.y],this.drawType=a,this.drawColor=s,this.lineWidth=l,this.sides=u,this.allowCallback=p||function(){},this.moveCallback=d||function(){},this.bindMousemove=function(){},this.bindMousedown=function(){},this.bindMouseup=function(){},this.init()}return a(t,[{key:"init",value:function(){this.paint.fillStyle="#fff",this.paint.fillRect(0,0,this.width,this.height),this.gatherImage(),this.bindMousemove=this.onmousemove.bind(this),this.bindMousedown=this.onmousedown.bind(this),this.bindMouseup=this.onmouseup.bind(this),this.canvas.addEventListener("mousedown",this.bindMousedown),document.addEventListener("mouseup",this.bindMouseup)}},{key:"onmousedown",value:function(t){this.isClickCanvas=!0,this.x=t.offsetX,this.y=t.offsetY,this.last=[this.x,this.y],this.canvas.addEventListener("mousemove",this.bindMousemove)}},{key:"gatherImage",value:function(){this.imgData=this.imgData.slice(0,this.index+1);var t=this.paint.getImageData(0,0,this.width,this.height);this.imgData.push(t),this.index=this.imgData.length-1,this.allowCallback(this.index>0,this.index<this.imgData.length-1)}},{key:"reSetImage",value:function(){this.paint.clearRect(0,0,this.width,this.height),this.imgData.length>=1&&this.paint.putImageData(this.imgData[this.index],0,0)}},{key:"onmousemove",value:function(t){this.isMoveCanvas=!0;var e=t.offsetX,n=t.offsetY,i=e-this.x,r=n-this.y,a=[e,n];switch(this.drawType){case"line":var o=[this.last,a,this.lineWidth,this.drawColor];this.moveCallback.apply(this,["line"].concat(o)),this.line.apply(this,o);break;case"rect":var s=[this.x,this.y,i,r,this.lineWidth,this.drawColor];this.moveCallback.apply(this,["rect"].concat(s)),this.rect.apply(this,s);break;case"polygon":var c=[this.x,this.y,this.sides,i,r,this.lineWidth,this.drawColor];this.moveCallback.apply(this,["polygon"].concat(c)),this.polygon.apply(this,c);break;case"arc":var l=[this.x,this.y,i,r,this.lineWidth,this.drawColor];this.moveCallback.apply(this,["arc"].concat(l)),this.arc.apply(this,l);break;case"eraser":var h=[e,n,this.width,this.height,this.lineWidth];this.moveCallback.apply(this,["eraser"].concat(h)),this.eraser.apply(this,h);break}}},{key:"onmouseup",value:function(){this.isClickCanvas&&(this.isClickCanvas=!1,this.canvas.removeEventListener("mousemove",this.bindMousemove),this.isMoveCanvas&&(this.isMoveCanvas=!1,this.moveCallback("gatherImage"),this.gatherImage()))}},{key:"line",value:function(t,e,n,i){this.paint.beginPath(),this.paint.lineCap="round",this.paint.lineJoin="round",this.paint.lineWidth=n,this.paint.strokeStyle=i,this.paint.moveTo(t[0],t[1]),this.paint.lineTo(e[0],e[1]),this.paint.closePath(),this.paint.stroke(),this.last=e}},{key:"rect",value:function(t,e,n,i,r,a){this.reSetImage(),this.paint.lineWidth=r,this.paint.strokeStyle=a,this.paint.strokeRect(t,e,n,i)}},{key:"polygon",value:function(t,e,n,i,r,a,o){this.reSetImage();var s=n,c=360/s,l=Math.sqrt(Math.pow(i,2)+Math.pow(r,2));this.paint.beginPath(),this.paint.strokeStyle=o,this.paint.lineWidth=a;for(var h=0;h<s;h++)this.paint.lineTo(t+Math.sin((h*c+45)*Math.PI/180)*l,e+Math.cos((h*c+45)*Math.PI/180)*l);this.paint.closePath(),this.paint.stroke()}},{key:"arc",value:function(t,e,n,i,r,a){this.reSetImage(),this.paint.beginPath(),this.paint.lineWidth=r;var o=Math.sqrt(Math.pow(n,2)+Math.pow(i,2));this.paint.arc(t,e,o,0,2*Math.PI,!1),this.paint.strokeStyle=a,this.paint.closePath(),this.paint.stroke()}},{key:"eraser",value:function(t,e,n,i,r){this.paint.save(),this.paint.beginPath(),this.paint.arc(t,e,r/2,0,2*Math.PI),this.paint.closePath(),this.paint.clip(),this.paint.clearRect(0,0,n,i),this.paint.fillStyle="#fff",this.paint.fillRect(0,0,n,i),this.paint.restore()}},{key:"cancel",value:function(){--this.index<0?this.index=0:(this.allowCallback(this.index>0,this.index<this.imgData.length-1),this.paint.putImageData(this.imgData[this.index],0,0))}},{key:"go",value:function(){++this.index>this.imgData.length-1?this.index=this.imgData.length-1:(this.allowCallback(this.index>0,this.index<this.imgData.length-1),this.paint.putImageData(this.imgData[this.index],0,0))}},{key:"clear",value:function(){this.imgData=[],this.paint.clearRect(0,0,this.width,this.height),this.paint.fillStyle="#fff",this.paint.fillRect(0,0,this.width,this.height),this.gatherImage()}},{key:"changeWay",value:function(t){var e=t.type,n=t.color,i=t.lineWidth,r=t.sides;this.drawType="color"!==e&&e||this.drawType,this.drawColor=n||this.drawColor,this.lineWidth=i||this.lineWidth,this.sides=r||this.sides}},{key:"destroy",value:function(){this.clear(),this.canvas.removeEventListener("mousedown",this.bindMousedown),document.removeEventListener("mouseup",this.bindMouseup),this.canvas=null,this.paint=null}}]),t}()},fb6a:function(t,e,n){"use strict";var i=n("23e7"),r=n("861d"),a=n("e8b5"),o=n("23cb"),s=n("50c4"),c=n("fc6a"),l=n("8418"),h=n("b622"),u=n("1dde"),p=n("ae40"),d=u("slice"),f=p("slice",{ACCESSORS:!0,0:0,1:2}),v=h("species"),y=[].slice,g=Math.max;i({target:"Array",proto:!0,forced:!d||!f},{slice:function(t,e){var n,i,h,u=c(this),p=s(u.length),d=o(t,p),f=o(void 0===e?p:e,p);if(a(u)&&(n=u.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[v],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return y.call(u,d,f);for(i=new(void 0===n?Array:n)(g(f-d,0)),h=0;d<f;d++,h++)d in u&&l(i,h,u[d]);return i.length=h,i}})}}]);