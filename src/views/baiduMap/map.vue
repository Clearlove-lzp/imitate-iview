<!-- 百度GIS地图 -->
<template>
  <div class="baiduGis">
    <div
      :id="mapId"
      class="mapId"
      style="width: 100%;height: 100%;overflow: hidden;margin:0;font-family:'微软雅黑'"
    ></div>
    <div>
      <Input search enter-button @on-search="searchInfo"></Input>
    </div>
  </div>
</template>

<script>
import loadBMap from "./loadMap.js";

export default {
  name: "myMap",
  props: {},
  data() {
    return {
      mapId: "BMap-" + parseInt(Date.now() + Math.random()),
      wodeMap: null,
      dataArr: [],
      schoolArr: ['南昌大学', '华东交通大学', '东华理工大学']
    };
  },
  components: {},
  computed: {},
  methods: {
    searchInfo(value) {

    },
    initMap() {
      loadBMap("tOMWlFDm95x14WyVU8D0GQNK9XlaGipP")
        .then(() => {
          // const sContent =
          //   "<div style='width: 287px;position: relative'>" +
          //   "<h4 style='margin:0 0 5px 0;padding:0.2em 0;font-size: 20px;rgba(28,34,44,1)'>上海总部</h4>" +
          //   "<p style='margin-bottom:5px;line-height:1.5;font-size:12px;color:rgba(42,46,54,0.75);line-height:24px;'>上海市长江南路180号（三号线长江南路地铁站附近）</p>" +
          //   "<p style='color: font-size:14px;font-family:MicrosoftYaHeiUI-Bold;font-weight:bold;color:rgba(65,151,232,1);line-height:24px;font-size: 14px'><img id='imgDemo1' src='./static/img/Group.png' width='14' style='margin-right:10px;' height='14'/><span style='margin-right: 33px'>400-188-2010</span><img id='imgDemo' src='./static/img/Bitmap_1.png' width='14' style='margin-right:10px' height='14'><span style=';font-size: 14px'>021-65066038</span></p>" +
          //   "<div style='position:absolute;left:-45px;top:0;width:40px;height:40px;background:rgba(65,151,232,1);color:#FFF;text-align: center;line-height: 40px;font-size:18px;font-weight:bold;'>沪</div>" +
          //   "</div>";
          // 百度地图API功能
          this.wodeMap = new BMap.Map(this.mapId); // 创建Map实例
          const point = new BMap.Point(117.211297, 31.77784);
          this.wodeMap.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
          // let myGeo = new BMap.Geocoder();      
          // 将地址解析结果显示在地图上，并调整地图视野    
          // myGeo.getPoint("华东交通大学", function(point){      
          //   if (point) {      
          //     console.log(point)
          //     let myGeo1 = new BMap.Geocoder({extensions_town: true});      
          //     // 根据坐标得到地址描述    
          //     myGeo1.getLocation(new BMap.Point(point.lng, point.lat), function(result){      
          //       if (result){      
          //         console.log(result)
          //       }      
          //     });
          //   }      
          // },
          // "南昌市");

          // let options = {      
          //     onSearchComplete: function(results){    
          //       if (local.getStatus() == BMAP_STATUS_SUCCESS){      
          //         console.log(results)     
          //       }
          //     }      
          // }; 
          // let local = new BMap.LocalSearch(this.wodeMap, options);      
          // local.search("合肥工业大学");

          this.schoolArr.map(x => {
            let options = {      
              onSearchComplete: (results) => {    
                if (local.getStatus() == BMAP_STATUS_SUCCESS){
                  console.log(results.Br)
                }
              }      
            };
            let local = new BMap.LocalSearch(this.wodeMap, options);      
            local.search(x);
          })


          // const marker = new BMap.Marker(point); // 创建标注
          // this.wodeMap.addOverlay(marker); // 将标注添加到地图中
          // marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
          // 添加公司信息标签
          // const infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象
          // const me = marker;
          // marker.addEventListener("click", () => {
          //   me.openInfoWindow(infoWindow);
          //   document.getElementById("imgDemo").onload = () => {
          //     infoWindow.redraw(); // 防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
          //   };;
          // });
          // 添加地图类型控件
          this.wodeMap.addControl(
            new BMap.MapTypeControl({
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
            })
          );
          this.wodeMap.setCurrentCity("合肥"); // 设置地图显示的城市 此项是必须设置的
          this.wodeMap.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        })
        .catch((err) => {
          // console.log("地图加载失败");
        });
    },
  },
  mounted() {
    setTimeout(() => {
      this.initMap();
    }, 1000);
  },
  created() {},
};
</script>

<style scoped>
.baiduGis {
  width: 1000px;
  height: 400px;
  margin: 20px 30px;
}
</style>
