(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Websocket"],{"02f3":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[e._v("websocket封装")])},i=[],s={data:function(){return{websock:null,lockReconnect:!1,timeout:1e4,timeoutObj:null,serverTimeoutObj:null,timeoutnum:null,reconnectCount:0,wsuri:"ws://198.103.124.112:8080/ws"}},methods:{initWebSocket:function(){this.websock=new WebSocket(this.wsuri),this.websock.onopen=this.websocketonopen,this.websock.onerror=this.websocketonerror,this.websock.onmessage=this.websocketonmessage,this.websock.onclose=this.websocketclose},reconnect:function(){var e=this;console.log("重连锁",this.lockReconnect),this.lockReconnect||(console.log("重连次数",this.reconnectCount),this.reconnectCount>5||(this.lockReconnect=!0,this.timeoutnum&&clearTimeout(this.timeoutnum),this.timeoutnum=setTimeout((function(){e.initWebSocket(),e.reconnectCount++,e.lockReconnect=!1}),5e3)))},reset:function(){clearTimeout(this.timeoutObj),clearTimeout(this.serverTimeoutObj),this.start()},start:function(){var e=this;this.timeoutObj&&clearTimeout(this.timeoutObj),this.serverTimeoutObj&&clearTimeout(this.serverTimeoutObj),this.timeoutObj=setTimeout((function(){if(1==e.websock.readyState){console.log("正常");var t={FG:"HB",userName:"刘志鹏"};e.websock.send(JSON.stringify(t))}else e.reconnect();e.serverTimeoutObj=setTimeout((function(){e.websock.close()}),e.timeout)}),this.timeout)},websocketonopen:function(){var e={FG:"REG",token:"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDkiLCJpYXQiOjE1ODcwMjcyOTgsInN1YiI6Imx6cHMiLCJleHAiOjE1ODcxMTM2OTh9.LdtsG6SRMBDIiC9jFqy8wwd1ALvxpgpfVxNQjZifOVM",userId:"209"};this.websocketsend(JSON.stringify(e)),console.log("连接成功"),this.reconnectCount=0,this.start()},websocketonerror:function(){console.log("WebSocket连接发生错误"),this.reconnect()},websocketclose:function(e){e.code&&console.log("connection closed ("+e.code+")"),this.reconnect()},websocketonmessage:function(e){console.log(e.data),this.reset()},websocketsend:function(e){this.websock.send(e)}},created:function(){},destroyed:function(){this.lockReconnect=!0,this.timeoutnum&&clearTimeout(this.timeoutnum),this.timeoutObj&&clearTimeout(this.timeoutObj),this.serverTimeoutObj&&clearTimeout(this.serverTimeoutObj),this.websock.close()},mounted:function(){this.initWebSocket()}},c={props:{},mixins:[s],data:function(){return{wsuri:"ws://198.103.124.112:8080/ws"}},components:{},computed:{},methods:{},watch:{},mounted:function(){},created:function(){}},u=c,r=o("2877"),m=Object(r["a"])(u,n,i,!1,null,"35ab2c5a",null);t["default"]=m.exports}}]);