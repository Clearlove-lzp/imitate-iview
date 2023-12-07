<template>
  <div class="gis-container">
    <MapView @render="mapRenderHandle"></MapView>
    <Button
      type="primary"
      @click="leftCardVisible = !leftCardVisible"
      class="open-btn-list"
      >{{ !leftCardVisible ? "展开" : "收起" }}</Button
    >
    <div id="device-modal">
      <div class="device-header">
        <div>第二指挥室终端1</div>
      </div>
      <div class="device-content">
        <div class="content-item">
          <span class="content-key">部门名称：</span
          ><span class="content-value">111</span>
        </div>
        <div class="content-item">
          <span class="content-key">设备编号：</span
          ><span class="content-value">111</span>
        </div>
        <div class="content-item">
          <span class="content-key">设备型号：</span
          ><span class="content-value">111</span>
        </div>
        <div class="content-item">
          <span class="content-key">设备名称：</span
          ><span class="content-value">111</span>
        </div>
      </div>
      <div class="device-footer">
        <div class="footer-item">
          <div class="item-img">
            <img src="@/assets/micro.png" alt="" />
          </div>
          <div>查看直播</div>
        </div>
        <div class="footer-item">
          <div class="item-img"><img src="@/assets/micro.png" alt="" /></div>
          <div>实时轨迹</div>
        </div>
        <div class="footer-item">
          <div class="item-img"><img src="@/assets/micro.png" alt="" /></div>
          <div>历史轨迹</div>
        </div>
        <div class="footer-item">
          <div class="item-img"><img src="@/assets/micro.png" alt="" /></div>
          <div>历史视频</div>
        </div>
        <div class="footer-item">
          <div class="item-img"><img src="@/assets/micro.png" alt="" /></div>
          <div>远程对讲</div>
        </div>
        <div class="footer-item">
          <div class="item-img"><img src="@/assets/micro.png" alt="" /></div>
          <div>设备信息</div>
        </div>
      </div>
    </div>
    <LeftCard :visible="leftCardVisible"></LeftCard>
  </div>
</template>

<script>
import MapView from "./LMapSH.vue";
import LeftCard from "./leftCard.vue";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { initMap, initConfigMarks } from "./gisMap";

const colorlist = ["#1786F9", "#FF3B30", "#00B578", "#FFFF00"];
export default {
  props: {},
  data() {
    return {
      deviceShow: false,
      leftCardVisible: false,
    };
  },
  components: {
    MapView,
    LeftCard,
  },
  computed: {},
  methods: {
    deviceClickFunc(e) {
      this.deviceShow = true;
    },
    mapRenderHandle(_map) {
      initMap(_map);
      initConfigMarks(
        [
          {
            latitude: 31.131625214855486,
            longitude: 121.64296110168458,
            dept: "部门11",
          },
          {
            latitude: 31.131625214855486,
            longitude: 121.71296110168458,
            dept: "部门22",
          },
        ],
        this.deviceClickFunc
      );
    },
  },
  watch: {},
  mounted() {},
  created() {},
  destroyed() {},
};
</script>

<style scoped lang="less">
.gis-container {
  width: 100%;
  height: 100%;
  position: relative;
}
/deep/.popup-device {
  .leaflet-popup-content-wrapper {
    .leaflet-popup-content {
      margin: 0;
    }
  }
  .leaflet-popup-close-button {
    top: 9px;
    font-size: 24px;
    right: 5px;
  }
}
#device-modal {
  display: none;
  .device-header {
    padding: 13px 20px;
    border-bottom: 1px solid #edeef0;
    font-weight: bold;
    font-size: 15px;
    color: #3c3c3c;
    background-color: #f6f6f6;
    border-radius: 10px 10px 0 0;
  }
  .device-content {
    padding: 0 20px;
    border-bottom: 1px solid #edeef0;
    .content-item {
      padding: 10px 0;
      .content-key {
        color: #9a9a9a;
      }
      .content-value {
        color: #373737;
      }
    }
  }
  .device-footer {
    display: flex;
    padding: 8px;
    background-color: #f9f9fb;
    border-radius: 0 0 10px 10px;
    .footer-item {
      width: 60px;
      height: 60px;
      font-size: 12px;
      text-align: center;
      background-color: #fff;
      margin-right: 3px;
      box-shadow: 0 2px 2px rgba(86, 85, 85, 0.4);
      color: #777777;
      cursor: pointer;
      .item-img {
        width: 20px;
        height: 20px;
        margin: 8px auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.open-btn-list {
  position: absolute;
  z-index: 100;
  left: 8px;
  top: 8px;
}
</style>
