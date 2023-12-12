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
        <div class="footer-item" @click="historyTracesShowFunc">
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
        <div class="footer-item" @click="deviceInfoShowFunc">
          <div class="item-img"><img src="@/assets/micro.png" alt="" /></div>
          <div>设备信息</div>
        </div>
      </div>
    </div>
    <LeftCard :visible="leftCardVisible"></LeftCard>
    <Modal
      v-model="deviceInfoModalShow"
      footer-hide
      class-name="gis-modal"
      width="800px"
    >
      <div slot="header">
        <div>执法仪信息</div>
      </div>
      <div class="modal-content">
        <p class="content-title">设备基本信息：</p>
        <div class="content-item">
          <span class="content-key">当前使用人：</span>
          <span class="content-value">111</span>
        </div>
        <div class="content-item">
          <span class="content-key">归属部门：</span>
          <span class="content-value">111</span>
        </div>
        <div class="content-item">
          <span class="content-key">版本号：</span>
          <span class="content-value">111</span>
        </div>
        <div class="content-item">
          <span class="content-key">使用状态：</span>
          <span class="content-value-status">远程锁屏</span>
        </div>
        <div class="content-flex-info">
          <div class="content-flex-one">
            <div class="top-title">剩余电量</div>
            <div class="bottom-info">
              <div class="bottom-info-icon">
                <img src="@/assets/battery.png" alt="" />
              </div>
              <div class="bottom-info-value">100%</div>
            </div>
          </div>
          <div class="content-flex-one">
            <div class="top-title">当日流量</div>
            <div class="bottom-info">
              <div class="bottom-info-icon">
                <img src="@/assets/systemPromotion.png" alt="" />
              </div>
              <div class="bottom-info-value">26M</div>
            </div>
          </div>
          <div class="content-flex-one">
            <div class="top-title">当月流量</div>
            <div class="bottom-info">
              <div class="bottom-info-icon">
                <img src="@/assets/systemPromotion.png" alt="" />
              </div>
              <div class="bottom-info-value">319M</div>
            </div>
          </div>
          <div class="content-flex-one">
            <div class="top-title">红外</div>
            <div class="bottom-info">
              <div class="bottom-info-icon">
                <img src="@/assets/alarm.png" alt="" />
              </div>
              <div class="bottom-info-value">已关闭</div>
            </div>
          </div>
          <div class="content-flex-one">
            <div class="top-title">存储空间（可用/总空间）</div>
            <div class="bottom-info">
              <div class="bottom-info-icon">
                <img src="@/assets/chartpie.png" alt="" />
              </div>
              <div class="bottom-info-value">100%</div>
            </div>
          </div>
          <div class="content-flex-one">
            <div class="top-title">内存使用率</div>
            <div class="bottom-info">
              <div class="bottom-info-icon">
                <img src="@/assets/chartpie.png" alt="" />
              </div>
              <div class="bottom-info-value">26M</div>
            </div>
          </div>
          <div class="content-flex-one">
            <div class="top-title">CPU使用率</div>
            <div class="bottom-info">
              <div class="bottom-info-icon">
                <img src="@/assets/chartpie.png" alt="" />
              </div>
              <div class="bottom-info-value">319M</div>
            </div>
          </div>
          <div class="content-flex-one">
            <div class="top-title">温度</div>
            <div class="bottom-info">
              <div class="bottom-info-icon">
                <img src="@/assets/temperature.png" alt="" />
              </div>
              <div class="bottom-info-value">已关闭</div>
            </div>
          </div>
          <div class="content-flex-one">
            <div class="top-title">重点录音</div>
            <div class="bottom-info">
              <span class="bottom-info-btn">
                <img src="@/assets/audio-record.png" alt="" />
              </span>
            </div>
          </div>
          <div class="content-flex-one">
            <div class="top-title">重点录像</div>
            <div class="bottom-info">
              <span class="bottom-info-btn">
                <img src="@/assets/video-record.png" alt="" />
              </span>
            </div>
          </div>
          <div class="content-flex-two">
            <div class="top-title">wifi AP</div>
            <div class="bottom-info">
              <div class="bottom-info-icon">
                <img src="@/assets/chartpie.png" alt="" />
              </div>
              <div class="bottom-info-value">已关闭</div>
            </div>
          </div>
          <div class="content-flex-two">
            <div class="top-title">拍照</div>
            <div class="bottom-info">
              <span class="bottom-info-btn">
                <img src="@/assets/camera.png" alt="" />
              </span>
            </div>
          </div>
          <div class="content-flex-two">
            <div class="top-title">设备重启</div>
            <div class="bottom-info">
              <span class="bottom-info-btn bottom-info-btn-txt">立即重启</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <Modal v-model="historyTracesModalShow" class-name="gis-modal">
      <div slot="header">
        <div>历史轨迹</div>
      </div>
      <div class="modal-content">
        <p>起止时间</p>
        <div class="content-flex-info">
          <div
            class="content-flex-item"
            :class="{
              'content-flex-item-selected': AppliForm.timelevel === item,
            }"
            v-for="item in timelevelList"
            :key="item"
            @click="AppliForm.timelevel = item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button>取消</Button>
        <Button type="warning">开始刻画</Button>
      </div>
    </Modal>
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
      deviceInfoModalShow: false,
      leftCardVisible: false,
      historyTracesModalShow: false,
      timelevelList: ["近30分钟", "近1小时", "近2小时", "自定义"],
      AppliForm: {
        timelevel: "近30分钟",
      },
    };
  },
  components: {
    MapView,
    LeftCard,
  },
  computed: {},
  methods: {
    mapRenderHandle(_map) {
      initMap(_map);
      initConfigMarks([
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
      ]);
    },
    deviceInfoShowFunc() {
      this.deviceInfoModalShow = true;
    },
    historyTracesShowFunc() {
      this.historyTracesModalShow = true;
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

/deep/.gis-modal {
  .ivu-modal {
    .ivu-modal-content {
      .ivu-modal-header {
        background-color: #f6f6f6;
        border-radius: 10px 10px 0 0;
        color: #3c3c3c;
        font-weight: bold;
        font-size: 15px;
      }
      .ivu-modal-body {
        .modal-content {
          .content-title {
            font-weight: bold;
          }
          .content-item {
            padding: 10px 0;
            .content-key {
              width: 100px;
              display: inline-block;
              text-align: right;
              color: #9a9a9a;
            }
            .content-value {
              display: inline-block;
              color: #373737;
            }
            .content-value-status {
              padding: 5px 10px;
              background-color: #fca802;
              color: #fff;
              border-radius: 20px;
            }
          }
          .content-flex-info {
            display: flex;
            flex-wrap: wrap;
            .content-flex-one,
            .content-flex-two {
              width: 24%;
              background-color: #f6f6f6;
              margin-right: 1%;
              margin-bottom: 10px;
              padding: 0 10px;
              .top-title {
                padding: 5px 0;
              }
              .bottom-info {
                display: flex;
                justify-content: flex-end;
                .bottom-info-icon {
                  width: 20%;
                  img {
                    width: 20px;
                  }
                }
                .bottom-info-value {
                  text-align: right;
                  width: 80%;
                }
                .bottom-info-btn {
                  height: 25px;
                  text-align: right;
                  padding: 5px;
                  background-color: #42b511;
                  color: #fff;
                  border-radius: 15px;
                  cursor: pointer;
                  margin-bottom: 5px;
                  img {
                    width: 15px;
                  }
                }
                .bottom-info-btn-txt {
                  padding: 2px 10px;
                }
              }
            }
            .content-flex-two {
              width: 49%;
            }

            .content-flex-item {
              padding: 10px 20px;
              border: 1px solid #dcdfe6;
              border-radius: 5px;
              margin-right: 10px;
              cursor: pointer;
            }
            .content-flex-item-selected {
              border: 1px solid #fee5b3;
              color: #fcab0c;
              background-color: #fff6e6;
            }
          }
        }
      }
    }
  }
}
</style>
