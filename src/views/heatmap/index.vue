<!--热力图-->
<template>
  <div style="height: 90vh">
    <MapView :base-map="baseMap" @render="mapRenderHandle"></MapView>
    <div style="position: absolute; top: 30px; left: 60px; z-index: 999">
      <button class="" value="" @click="mapChange">切换</button>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import HeatmapOverlay from "leaflet-heatmap/leaflet-heatmap.js";
import L from "leaflet";
import MapView from "@/components/cmmap/mapView.vue";
import jsonData from "./data.js";

export default {
  data() {
    return {
      baseMap: "normal",
      map: null,
      heatmapLayer: null,
      lock: false,
    };
  },
  mounted() {},
  methods: {
    initLayer1() {
      let cfg = {
        radius: 25, //每一个热力点的半径
        // radius: 0.06, //每一个热力点的半径
        maxOpacity: 0.7, //设置最大不透明度
        // minOpacity: 0.3, //设置最小不透明度
        // scaleRadius: 1, //设置热力点是否平滑过渡
        // useLocalExtrema: true, //使用局部极值
        // blur: 0.95, //系数越高，渐变越平滑，默认是0.85
        latField: "LATITUDE", // 热力图数据对应的纬度字段
        lngField: "LONGITUDE", // 热力图数据对应的经度字段
        valueField: "VALUE", // 热力图数据的值的字段
        gradient: {
          // 自定义渐变颜色，区间为0~1之间
          0.25: "rgb(0,0,255)",
          0.4: "#6bb9ed",
          0.55: "rgb(0,255,0)",
          0.7: "rgb(255,255,0)",
          0.8: "rgb(246,53,31)",
        },
      };
      this.heatmapLayer = new HeatmapOverlay(cfg);
      this.heatmapLayer.setData({
        max: Math.max(...jsonData.map((x) => (x.VALUE ? x.VALUE : 0))),
        data: jsonData,
      });
      this.map.addLayer(this.heatmapLayer);
    },
    initLayer2() {
      let cfg = {
        radius: 0.06, //每一个热力点的半径
        maxOpacity: 0.7, //设置最大不透明度
        // minOpacity: 0.3, //设置最小不透明度
        scaleRadius: true, //设置热力点是否平滑过渡
        // useLocalExtrema: true, //使用局部极值
        // blur: 0.95, //系数越高，渐变越平滑，默认是0.85
        latField: "LATITUDE", // 热力图数据对应的纬度字段
        lngField: "LONGITUDE", // 热力图数据对应的经度字段
        valueField: "VALUE", // 热力图数据的值的字段
        gradient: {
          // 自定义渐变颜色，区间为0~1之间
          0.25: "rgb(0,0,255)",
          0.4: "#6bb9ed",
          0.55: "rgb(0,255,0)",
          0.7: "rgb(255,255,0)",
          0.8: "rgb(246 53 31)",
        },
      };
      this.heatmapLayer = new HeatmapOverlay(cfg);
      this.heatmapLayer.setData({
        max: Math.max(...jsonData.map((x) => (x.VALUE ? x.VALUE : 0))),
        data: jsonData,
      });
      this.map.addLayer(this.heatmapLayer);
    },
    initMap() {
      this.initLayer1();
      this.map.on("zoomend", this.handleZoomEnd);
    },
    mapRenderHandle(_map) {
      this.map = _map;
      this.initMap();
    },
    mapChange() {
      this.baseMap === "normal"
        ? (this.baseMap = "wx")
        : (this.baseMap = "normal");
    },
    handleZoomEnd() {
      // 在每次缩放结束时手动调整热力图的半径大小
      const currentZoom = this.map.getZoom();
      if (currentZoom <= 9) {
        if (this.lock) {
          return;
        }
        this.lock = true;
        this.map.removeLayer(this.heatmapLayer);
        this.initLayer1();
      } else {
        if (!this.lock) {
          return;
        }
        this.lock = false;
        this.map.removeLayer(this.heatmapLayer);
        this.initLayer2();
      }
    },
  },
  components: {
    MapView,
  },
};
</script>

<style>
#map {
  height: 100%;
}
</style>