(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["online1"],{2681:function(e,t,n){"use strict";n("64b7")},"64b7":function(e,t,n){},"96cf":function(e,t,n){var r=function(e){"use strict";var t,n=Object.prototype,r=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(S){s=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var o=t&&t.prototype instanceof g?t:g,i=Object.create(o.prototype),a=new P(r||[]);return i._invoke=O(e,n,a),i}function l(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(S){return{type:"throw",arg:S}}}e.wrap=u;var f="suspendedStart",h="suspendedYield",p="executing",d="completed",v={};function g(){}function m(){}function y(){}var w={};w[i]=function(){return this};var x=Object.getPrototypeOf,b=x&&x(x(R([])));b&&b!==n&&r.call(b,i)&&(w=b);var k=y.prototype=g.prototype=Object.create(w);function _(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function n(o,i,a,c){var s=l(e[o],e,i);if("throw"!==s.type){var u=s.arg,f=u.value;return f&&"object"===typeof f&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,a,c)}),(function(e){n("throw",e,a,c)})):t.resolve(f).then((function(e){u.value=e,a(u)}),(function(e){return n("throw",e,a,c)}))}c(s.arg)}var o;function i(e,r){function i(){return new t((function(t,o){n(e,r,t,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function O(e,t,n){var r=f;return function(o,i){if(r===p)throw new Error("Generator is already running");if(r===d){if("throw"===o)throw i;return T()}n.method=o,n.arg=i;while(1){var a=n.delegate;if(a){var c=j(a,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var s=l(e,t,n);if("normal"===s.type){if(r=n.done?d:h,s.arg===v)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=d,n.method="throw",n.arg=s.arg)}}}function j(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator["return"]&&(n.method="return",n.arg=t,j(e,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=l(r,e.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,v;var i=o.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,v):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function R(e){if(e){var n=e[i];if(n)return n.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function n(){while(++o<e.length)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return a.next=a}}return{next:T}}function T(){return{value:t,done:!0}}return m.prototype=k.constructor=y,y.constructor=m,m.displayName=s(y,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,s(e,c,"GeneratorFunction")),e.prototype=Object.create(k),e},e.awrap=function(e){return{__await:e}},_(L.prototype),L.prototype[a]=function(){return this},e.AsyncIterator=L,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new L(u(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},_(k),s(k,c,"Generator"),k[i]=function(){return this},k.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){while(t.length){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=R,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(E),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return c.type="throw",c.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),E(n),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;E(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:R(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),v}},e}(e.exports);try{regeneratorRuntime=r}catch(o){Function("r","regeneratorRuntime = r")(r)}},c964:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n("d3b7");function r(e,t,n,r,o,i,a){try{var c=e[i](a),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(o,i){var a=e.apply(t,n);function c(e){r(a,o,i,c,s,"next",e)}function s(e){r(a,o,i,c,s,"throw",e)}c(void 0)}))}}},c9bf:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"remote1",attrs:{"element-loading-text":e.loadingText,"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[e.isJoin?e._e():n("div",{staticClass:"shade"},[n("div",{staticClass:"input-container"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.account,expression:"account"}],attrs:{type:"text",placeholder:"请输入你的昵称"},domProps:{value:e.account},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.join(t)},input:function(t){t.target.composing||(e.account=t.target.value)}}}),n("button",{on:{click:e.join}},[e._v("确定")])])]),n("div",{staticClass:"userList"},[n("h5",[e._v("在线用户："+e._s(e.userList.length))]),e._l(e.userList,(function(t){return n("p",{key:t.account},[e._v(" "+e._s(t.account)+" "),t.account===e.account||t.account===e.isCall?n("i",[e._v(" "+e._s(t.account===e.account?"me":"")+" "+e._s(t.account===e.isCall?"calling":"")+" ")]):e._e(),t.account!==e.account&&t.account!==e.isCall?n("span",{on:{click:function(n){return e.apply(t.account)}}},[e._v("呼叫 "+e._s(t.account))]):e._e()])}))],2),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isToPeer,expression:"isToPeer"}],staticClass:"video-container"},[n("div",[n("video",{attrs:{src:"",id:"rtcA",controls:"",autoplay:""}}),n("h5",[e._v(e._s(e.account))]),n("button",{on:{click:e.hangup}},[e._v("hangup")])]),n("div",[n("video",{attrs:{src:"",id:"rtcB",controls:"",autoplay:""}}),n("h5",[e._v(e._s(e.isCall))])])])])},o=[],i=(n("96cf"),n("c964")),a={name:"remote1",data:function(){return{account:window.sessionStorage.account||"",isJoin:!1,userList:[],roomid:"webrtc_1v1",isCall:!1,loading:!1,loadingText:"呼叫中",isToPeer:!1,peer:null,offerOption:{offerToReceiveAudio:1,offerToReceiveVideo:1}}},methods:{join:function(){this.account&&(this.isJoin=!0,window.sessionStorage.account=this.account)},initSocket:function(){var e=this;socket.on("joined",(function(t){e.userList=t})),socket.on("reply",function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.loading=!1,console.log(n),t.t0=n.type,t.next="1"===t.t0?5:"2"===t.t0?10:"3"===t.t0?12:14;break;case 5:return e.isCall=n.self,t.next=8,e.createP2P(n);case 8:return e.createOffer(n),t.abrupt("break",14);case 10:return e.$message({message:"对方拒绝了你的请求！",type:"warning"}),t.abrupt("break",14);case 12:return e.$message({message:"对方正在通话中！",type:"warning"}),t.abrupt("break",14);case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),socket.on("apply",(function(t){e.isCall?e.reply(t.self,"3"):e.$confirm(t.self+" 向你请求视频通话, 是否同意?","提示",{confirmButtonText:"同意",cancelButtonText:"拒绝",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.createP2P(t);case 2:e.isCall=t.self,e.reply(t.self,"1");case 4:case"end":return n.stop()}}),n)})))).catch((function(){e.reply(t.self,"2")}))})),socket.on("1v1answer",(function(t){e.onAnswer(t)})),socket.on("1v1ICE",(function(t){e.onIce(t)})),socket.on("1v1offer",(function(t){e.onOffer(t)})),socket.on("1v1hangup",(function(t){e.$message({message:"对方已断开连接！",type:"warning"}),e.peer.close(),e.peer=null,e.isToPeer=!1,e.isCall=!1}))},hangup:function(){socket.emit("1v1hangup",{account:this.isCall,self:this.account}),this.peer.close(),this.peer=null,this.isToPeer=!1,this.isCall=!1},apply:function(e){this.loading=!0,this.loadingText="呼叫中",socket.emit("apply",{account:e,self:this.account})},reply:function(e,t){socket.emit("reply",{account:e,self:this.account,type:t})},createP2P:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,t.loadingText="正在建立通话连接",n.next=4,t.createMedia(e);case 4:case"end":return n.stop()}}),n)})))()},createMedia:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,navigator.mediaDevices.getUserMedia({audio:!0,video:!0});case 3:t.localstream=n.sent,r=document.querySelector("#rtcA"),r.srcObject=t.localstream,n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),console.log("getUserMedia: ",n.t0);case 11:t.initPeer(e);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})))()},initPeer:function(e){var t=this,n=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;this.peer=new n,this.peer.addStream(this.localstream),this.peer.onicecandidate=function(n){n.candidate&&socket.emit("1v1ICE",{account:e.self,self:t.account,sdp:n.candidate})},this.peer.onaddstream=function(e){t.isToPeer=!0,t.loading=!1;var n=document.querySelector("#rtcB");n.srcObject=e.stream}},createOffer:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.peer.createOffer(t.offerOption);case 3:return r=n.sent,n.next=6,t.peer.setLocalDescription(r);case 6:socket.emit("1v1offer",{account:e.self,self:t.account,sdp:r}),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](0),console.log("createOffer: ",n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})))()},onOffer:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.peer.setRemoteDescription(e.sdp);case 3:return n.next=5,t.peer.createAnswer();case 5:return r=n.sent,n.next=8,t.peer.setLocalDescription(r);case 8:socket.emit("1v1answer",{account:e.self,self:t.account,sdp:r}),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](0),console.log("onOffer: ",n.t0);case 14:case"end":return n.stop()}}),n,null,[[0,11]])})))()},onAnswer:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.peer.setRemoteDescription(e.sdp);case 3:n.next=8;break;case 5:n.prev=5,n.t0=n["catch"](0),console.log("onAnswer: ",n.t0);case 8:case"end":return n.stop()}}),n,null,[[0,5]])})))()},onIce:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.peer.addIceCandidate(e.sdp);case 3:n.next=8;break;case 5:n.prev=5,n.t0=n["catch"](0),console.log("onAnswer: ",n.t0);case 8:case"end":return n.stop()}}),n,null,[[0,5]])})))()}},mounted:function(){},destroyed:function(){}},c=a,s=(n("2681"),n("2877")),u=Object(s["a"])(c,r,o,!1,null,"81b7f320",null);t["default"]=u.exports}}]);