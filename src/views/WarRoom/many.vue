<template>
  <div class="room">
    <div class="video-box" ref="video-box">
      <video class="video-mine" autoplay controls ref="video-mine"></video>
    </div>
  </div>
</template>

<script>
  // import socket from '../../utils/socket';

//   app._io.on( 'connection', sock => {
//     sock.on('join', data=>{
//         sock.join(data.roomid, () => {
//             if (!users[data.roomid]) {
//                 users[data.roomid] = [];
//             }
//             let obj = {
//                 account: data.account,
//                 id: sock.id
//             };
//             let arr = users[data.roomid].filter(v => v.account === data.account);
//             if (!arr.length) {
//                 users[data.roomid].push(obj);
//             }
//             sockS[data.account] = sock;
//             app._io.in(data.roomid).emit('joined', users[data.roomid], data.account, sock.id); // 发给房间内所有人
//             // sock.to(data.roomid).emit('joined',data.account);
//         });
//     });
//     sock.on('offer', data=>{
//         // console.log('offer', data);
//         sock.to(data.roomid).emit('offer',data);
//     });
//     sock.on('answer', data=>{
//         // console.log('answer', data);
//         sock.to(data.roomid).emit('answer',data);
//     });
//     sock.on('__ice_candidate', data=>{
//         // console.log('__ice_candidate', data);
//         sock.to(data.roomid).emit('__ice_candidate',data);
//     });

//     // 1 v 1
//     sock.on('apply', data=>{ // 转发申请
//         sockS[data.account].emit('apply', data);
//     });
//     sock.on('reply', data=>{ // 转发回复
//         sockS[data.account].emit('reply', data);
//     });
//     sock.on('1v1answer', data=>{ // 转发 answer
//         sockS[data.account].emit('1v1answer', data);
//     });
//     sock.on('1v1ICE', data=>{ // 转发 ICE
//         sockS[data.account].emit('1v1ICE', data);
//     });
//     sock.on('1v1offer', data=>{ // 转发 Offer
//         sockS[data.account].emit('1v1offer', data);
//     });
//     sock.on('1v1hangup', data=>{ // 转发 hangup
//         sockS[data.account].emit('1v1hangup', data);
//     });
// });
// app._io.on('disconnect', (sock) => {
//     for (let k in users) {
//         users[k] = users[k].filter(v => v.id !== sock.id);
//     }
//     console.log(`disconnect id => ${users}`);
// });

  export default {
    name: 'home',
    data() {
      return {
        roomid: '',
        peer: null,
        peerList: {},
        candidate: null,
        localStream: null
      }
    },
    watch: {
      userList: {
        handler() {
        },
        deep: true
      }
    },
    beforeDestroy() {
      for (let k in this.peerList) {
        this.peerList[k].close();
        this.peerList[k] = null;
      }
    },
    methods: {
      getUserMedia() {
        //兼容浏览器的getUserMedia写法
        let myVideo = this.$refs['video-mine'];
        let getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
        //获取本地的媒体流，并绑定到一个video标签上输出，并且发送这个媒体流给其他客户端
        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, {
              "audio": true,
              "video": true
          }, (stream) => {
              //绑定本地媒体流到video标签用于输出
              myVideo.srcObject = stream;
              this.localStream = stream;
              resolve();
          }, function(error){
              reject(error);
              // console.log(error);
              //处理媒体流创建失败错误
          });
        })
      },
      getPeerConnection(v) {
        let videoBox = this.$refs['video-box'];
        let iceServer = {
          "iceServers": [
            {
              "url": "stun:stun.l.google.com:19302"
            }
          ]
        };
        //兼容浏览器的PeerConnection写法
        let PeerConnection = (window.RTCPeerConnection ||
            window.webkitRTCPeerConnection ||
            window.mozRTCPeerConnection);
        // 创建
        let peer = new PeerConnection(iceServer);
        //向PeerConnection中加入需要发送的流
        peer.addStream(this.localStream);

        //如果检测到媒体流连接到本地，将其绑定到一个video标签上输出
        peer.onaddstream = function(event){
          // console.log('event-stream', event);
          let videos = document.querySelector('#' + v.account);
          if (videos) {
              videos.srcObject = event.stream;
          } else {
            let video = document.createElement('video');
            video.controls = true;
            video.autoplay = 'autoplay';
            video.srcObject = event.stream;
            video.id = v.account;
            videoBox.append(video);
          }
        };
        //发送ICE候选到其他客户端
        peer.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('__ice_candidate', {'candidate': event.candidate, roomid: this.$route.params.roomid, account: v.account});
          }
        };
        console.log('v.account', v.account);
        this.peerList[v.account] = peer;
      },
      createOffer(account, peer) {
        // 我新进入，我给
        //发送offer，发送本地session描述
        peer.createOffer({
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        }).then((desc) => {
            // console.log('send-offer', desc);
            peer.setLocalDescription(desc, () => {
                socket.emit('offer', {'sdp': peer.localDescription, roomid: this.$route.params.roomid, account: account});
            });
        });
      },
      socketInit() {
        // 我 peerList也是我的peerList，我接收，我给peerList[v.account]设置远程描述
        socket.on('offer', v => {
            // console.log('take_offer', this.peerList[v.account]);
          this.peerList[v.account] && this.peerList[v.account].setRemoteDescription(v.sdp, () => {
              this.peerList[v.account].createAnswer().then((desc) => {
                  // console.log('send-answer', desc);
                  this.peerList[v.account].setLocalDescription(desc, () => {
                      socket.emit('answer', {'sdp': this.peerList[v.account].localDescription, roomid: this.$route.params.roomid, account: v.account});
                  });
              });
          }, () => {// console.log(err)
          });
        });
        socket.on('answer', v => {
          console.log('take_answer', v.sdp);
          this.peerList[v.account] && this.peerList[v.account].setRemoteDescription(v.sdp, function(){}, () => {// console.log(err)
          });
        });
        socket.on('__ice_candidate', v => {
          // console.log('take_candidate', v.candidate);
          //如果是一个ICE的候选，则将其加入到PeerConnection中
          if (v.candidate) {
            this.peerList[v.account] && this.peerList[v.account].addIceCandidate(v.candidate).catch(() => {}// console.log('err', e)
            );
          }
        });
        socket.on('disconnected', id => {
          // console.log('disconnected', id);
          let dom = document.querySelector('#' + id);
          if (dom) {
              dom.remove();
          }
        })
      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   this.getUserMedia().then(() => {
      //       socket.emit('join', {roomid: this.$route.params.roomid, account: this.$route.params.account});
      //   });
      //   this.socketInit();
        
      //   socket.on('joined', (data, account)=>{
      //     console.log('joined', data);
      //     if (data.length> 1) {
      //       data.forEach(v => {
      //         let obj = {};
      //         let arr = [v.account, this.$route.params.account];
      //         obj.account = arr.sort().join('-');
      //         if (!this.peerList[obj.account] && v.account !== this.$route.params.account) {
      //           // console.log('obj', obj);
      //           this.getPeerConnection(obj);
      //         }
      //       });
      //       李,小,龙三人,对于李来说 this.peerList = {小-李, 李-龙}, 对于小来说 this.peerList = {小-李, 小-龙}, 对于龙来说 this.peerList = {小-龙, 李-龙}，李的小-李和小的小-李不同，类似于独立的peerA和peerB，这里为多人通话，不至于混乱，相当于唯一标识，取名一样。只有实现关联才能视为一个通道
      //       if (account === this.$route.params.account) {
      //         // 新加入
      //         // console.log('account', account);
      //         for (let k in this.peerList) {
      //           this.createOffer(k, this.peerList[k]);
      //         }
      //       }
      //     }
      //   });
      // });
    }
  };
</script>

<style lang="stylus">
.room{
  padding: 30px;
}
.video-box{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  video{
    width:400px;
    height: 300px;
    margin-right: 10px;
  }
}
</style>
