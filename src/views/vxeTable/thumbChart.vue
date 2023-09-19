<template>
  <div class="trendChartBox" ref="chartBox">
    <div ref="myChart" class="myChart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import moment from "moment";

export default {
  props: ["dataArr"],
  data() {
    return {
      myCharts: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.initChart();
      window.addEventListener("resize", this.resizeChart, true);
    }, 500);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart, true);
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myCharts = echarts.init(this.$refs.myChart);
      this.myCharts.clear();
      // 绘制图表
      this.myCharts.setOption({
        color: [
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
        ],
        grid: {
          left: 0,
          right: 0,
          bottom: "1px",
          top: "1px",
        },
        xAxis: {
          type: "category",
          data: this.dataArr.map((x) => moment(x.time).format("HH:mm")),
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: this.dataArr.map((x) => x.value),
            type: "line",
            smooth: true,
            symbol: "none",
          },
        ],
      });
    },
  },
  watch: {
    datas: {
      handler(newData, oldData) {
        // this.getEchart();
      },
      deep: true,
    },
    chartWidth() {
      this.charts.resize();
    },
  },
};
</script>

<style lang="less" scoped>
.trendChartBox {
  width: 100%;
  height: 100%;
  .myChart {
    width: 100%;
    height: 100%;
  }
}
</style>
