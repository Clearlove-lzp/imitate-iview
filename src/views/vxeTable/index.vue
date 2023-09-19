<!-- vxeTable -->
<template>
  <div>
    <p>
      <a href="https://vxetable.cn/#/table/start/install" target="_blank"
        >官方文档</a
      >
    </p>
    <div>
      <div>
        1、 列宽，通过设置 width
        参数，支持固定像素、百分比、等比例分配等，如果不设置则按照表格的宽度进行均匀分配
      </div>
      <div>2、:scroll-y="{enabled: false}" 设置自动换行</div>
      <div>
        3、通过 tooltip-config.showAll 开启全表工具提示，还可以配合
        contentMethod 方法重写默认的提示内容，显示逻辑完全自定义控制，可以返回
        null 使用默认的提示消息 还可以设置 tooltip-config.enterable 允许鼠标进入
        tooltip 中，通过 title-help 设置列标题的帮助提示消息
      </div>
      <div>
        4、当内容溢出时显示为省略号，show-overflow 和 show-header-overflow 和
        show-footer-overflow ellipsis 当内容溢出时显示为省略号 title
        当内容溢出时显示为省略号并用原生 title 显示 tooltip
        当内容溢出时显示为省略号并用 tooltip 显示
      </div>
      <div>
        5、斑马线条纹，通过设置 stripe 参数 使用 row-config.isHover 属性启用
        hover 行高亮
      </div>
      <div>6、圆角边框，通过设置 round 参数，通过 sass 变量 设置圆角值</div>
      <div>
        7、修改行高，可以通过 show-overflow 和 row-config.height 修改行的高度
      </div>
      <div>
        8、虚拟滚动（最大可以支撑 5w 列、30w 行） 高性能的虚拟渲染，设置
        scroll-x={ enabled, gt } | scroll-y={ enabled, gt } 和
        height、max-height 来开启虚拟滚动， 会根据触发规则 gt
        来启用虚拟渲染。虚拟滚动启用后只会渲染指定范围内的可视区数据，其他的数据将被卷去收起，当滚动到可视区时才被渲染出来
        （注：启用虚拟滚动后：show-overflow，show-header-overflow，show-footer-overflow
        参数将根据不同场景各自触发生效，无法取消；如果需要支持，需将虚拟滚动关闭）
        （性能优化：横向虚拟滚动由列宽决定性能，每一列的列宽越大就越流畅；纵向虚拟滚动由行高决定性能，每一行的高度越高就越流畅）
        v3.7+默认关闭虚拟滚动，需手动 enabled 开启或者 setup 全局开启
      </div>
      <vxe-table
        align="center"
        border
        round
        size="small"
        :data="tableData"
        stripe
        :tooltip-config="{ showAll: true, enterable: true }"
        :column-config="{ resizable: true }"
        :row-config="{ isCurrent: true, isHover: true, height: 40 }"
        max-height="400"
        :scroll-y="{ enabled: true }"
        :sort-config="{
          trigger: 'cell',
          orders: ['desc', 'asc', null],
          sortMethod: customSortMethod,
        }"
        @sort-change="sortChangeEvent"
      >
        <vxe-column type="seq" width="120"></vxe-column>
        <vxe-column
          v-for="x in columns"
          :key="x.field"
          :width="x.width"
          :title="x.title"
          :field="x.field"
          :sortable="x.sortable"
          show-overflow
        >
          <template v-if="x.slot === 'C40103'" #default="{ row }">
            <div
              class="excel-cell"
              @click="showNeNormChartFunc(row, '最大用户数')"
            >
              {{ row.C40103 }}
              <div :style="getGridientStyle(row, 'C40103')"></div>
            </div>
          </template>
          <template v-else-if="x.slot === 'C20076'" #default="{ row }">
            <div
              class="excel-cell"
              @click="showNeNormChartFunc(row, 'RRC最大用户数_省级')"
            >
              {{ row.C20076 }}
              <div :style="getGridientStyle(row, 'C20076')"></div>
            </div>
          </template>
          <template v-else-if="x.slot === 'C_02'" #default="{ row }">
            <div
              class="excel-cell"
              @click="showNeNormChartFunc(row, '最大用户数')"
            >
              {{ row.C_02 }}
              <div :style="getGridientStyle(row, 'C_02')"></div>
            </div>
          </template>
          <template
            v-else-if="x.slot === '最大用户数趋势图'"
            #default="{ row }"
          >
            <div class="thumbStyle">
              <thumbChart
                :dataArr="row['最大用户数'] ? row['最大用户数'] : []"
              ></thumbChart>
            </div>
          </template>
          <template
            v-else-if="x.slot === '上行PRB平均利用率趋势图'"
            #default="{ row }"
          >
            <div class="thumbStyle">
              <thumbChart
                :dataArr="
                  row['上行PRB平均利用率'] ? row['上行PRB平均利用率'] : []
                "
              ></thumbChart>
            </div>
          </template>
          <template
            v-else-if="x.slot === '下行PRB平均利用率趋势图'"
            #default="{ row }"
          >
            <div class="thumbStyle">
              <thumbChart
                :dataArr="
                  row['下行PRB平均利用率'] ? row['下行PRB平均利用率'] : []
                "
              ></thumbChart>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import thumbChart from "./thumbChart.vue";
export default {
  props: {},
  data() {
    return {
      tableData: [],
      columns: [],
    };
  },
  components: {
    thumbChart,
  },
  computed: {
    getGridientStyle() {
      return (data, key) => {
        const percentage = (data[key] / data.max_user_num) * 100;
        const startColor = "#1d8bfd";
        const endColor = "#dbeaf9";
        return {
          position: "absolute",
          height: "100%",
          zIndex: -1,
          left: 0,
          top: 0,
          background: `linear-gradient(to right, ${startColor}, ${endColor})`,
          width: `${percentage}%`,
        };
      };
    },
  },
  methods: {
    customSortMethod({ data, sortList }) {
      console.log(data);
      console.log(sortList);
    },
    sortChangeEvent({ column, property, order }) {
      console.log(column);
      console.log(property);
      console.log(order);
    },
    showNeNormChartFunc(data, key) {
      console.log(data);
      console.log(key);
    },
  },
  watch: {},
  mounted() {
    let res = {
      head: [
        {
          fieldName: "CITY",
          fieldCname: "地市",
        },
        {
          fieldName: "DATETIME",
          fieldCname: "时间",
        },
        {
          fieldName: "CI",
          fieldCname: "CI",
        },
        {
          fieldName: "CELL_NAME",
          fieldCname: "小区名称",
        },
        {
          fieldName: "CGI",
          fieldCname: "CGI",
        },
        {
          fieldName: "FREQUENCY_OFFSET",
          fieldCname: "频段",
        },
        {
          fieldName: "AREATYPE",
          fieldCname: "区域类型",
        },
        {
          fieldName: "AREANAME",
          fieldCname: "区域名称",
        },
        {
          nettype: "LTE",
          fieldName: "C_01",
          fieldCname: "平均用户数",
          unit: "个",
          orderinlist: 1,
        },
        {
          nettype: "LTE",
          fieldName: "C_02",
          fieldCname: "最大用户数",
          unit: "个",
          orderinlist: 2,
        },
        {
          nettype: "LTE",
          fieldName: "C_03",
          fieldCname: "上行PRB平均利用率",
          unit: "%",
          orderinlist: 3,
        },
        {
          nettype: "LTE",
          fieldName: "C_04",
          fieldCname: "下行PRB平均利用率",
          unit: "%",
          orderinlist: 4,
        },
        {
          nettype: "LTE",
          fieldName: "C_05",
          fieldCname: "小区RB上行平均干扰电平",
          unit: "dbm",
          orderinlist: 5,
        },
        {
          nettype: "LTE",
          fieldName: "C_06",
          fieldCname: "上行用户平均速率",
          unit: "Mbps",
          orderinlist: 6,
        },
        {
          nettype: "LTE",
          fieldName: "C_07",
          fieldCname: "下行用户平均速率",
          unit: "Mbps",
          orderinlist: 7,
        },
        {
          nettype: "LTE",
          fieldName: "C_08",
          fieldCname: "无线接通率",
          unit: "%",
          orderinlist: 8,
        },
        {
          nettype: "LTE",
          fieldName: "C_09",
          fieldCname: "无线掉线率",
          unit: "%",
          orderinlist: 9,
        },
        {
          nettype: "LTE",
          fieldName: "C_10",
          fieldCname: "平均激活用户数",
          unit: "个",
          orderinlist: 10,
        },
        {
          nettype: "LTE",
          fieldName: "C_11",
          fieldCname: "最大激活用户数",
          unit: "个",
          orderinlist: 11,
        },
        {
          nettype: "LTE",
          fieldName: "C_13",
          fieldCname: "VoLTE接通率",
          unit: "%",
          orderinlist: 13,
        },
        {
          nettype: "LTE",
          fieldName: "C_14",
          fieldCname: "VoLTE掉话率",
          unit: "%",
          orderinlist: 14,
        },
        {
          nettype: "LTE",
          fieldName: "C_15",
          fieldCname: "下行数据流量",
          unit: "MB",
          orderinlist: 15,
        },
        {
          nettype: "LTE",
          fieldName: "C_16",
          fieldCname: "上行数据流量",
          unit: "MB",
          orderinlist: 16,
        },
        {
          nettype: "LTE",
          fieldName: "C_17",
          fieldCname: "CCE利用率",
          unit: "%",
          orderinlist: 17,
        },
        {
          nettype: "LTE",
          fieldName: "C_18",
          fieldCname: "切换成功率",
          unit: "%",
          orderinlist: 18,
        },
      ],
      total: 125,
      data: [],
    };
    for (let i = 0; i < 1000; i++) {
      res.data.push(
        {
          C_11: 1,
          C_10: 0.02,
          最大用户数: [
            {
              time: "2023-09-19 15:20:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:21:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:22:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:23:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:24:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:25:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:26:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:27:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:28:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:29:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:30:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:31:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:32:00",
              value: 0.0,
            },
            {
              time: "2023-09-19 15:33:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:34:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:35:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:36:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:37:00",
              value: 0.0,
            },
            {
              time: "2023-09-19 15:38:00",
              value: 0.0,
            },
            {
              time: "2023-09-19 15:39:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:40:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:41:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:42:00",
              value: 0.0,
            },
            {
              time: "2023-09-19 15:43:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:44:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:45:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:46:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:47:00",
              value: 4.0,
            },
            {
              time: "2023-09-19 15:48:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:49:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:50:00",
              value: 2.0,
            },
          ],
          CELL_NAME: "省公司杭州钱江新城大楼LY钱江新城音乐喷泉西WZE_193",
          SITE_NAME:
            "H511031省公司杭州钱江新城大楼LY钱江新城音乐喷泉西信源池WZE_new",
          R_NUM: 1,
          上行PRB平均利用率: [
            {
              time: "2023-09-19 15:20:00",
              value: 7.22,
            },
            {
              time: "2023-09-19 15:21:00",
              value: 6.48,
            },
            {
              time: "2023-09-19 15:22:00",
              value: 6.24,
            },
            {
              time: "2023-09-19 15:23:00",
              value: 12.54,
            },
            {
              time: "2023-09-19 15:24:00",
              value: 84.41,
            },
            {
              time: "2023-09-19 15:25:00",
              value: 92.3,
            },
            {
              time: "2023-09-19 15:26:00",
              value: 94.47,
            },
            {
              time: "2023-09-19 15:27:00",
              value: 57.2,
            },
            {
              time: "2023-09-19 15:28:00",
              value: 6.45,
            },
            {
              time: "2023-09-19 15:29:00",
              value: 6.16,
            },
            {
              time: "2023-09-19 15:30:00",
              value: 6.83,
            },
            {
              time: "2023-09-19 15:31:00",
              value: 6.91,
            },
            {
              time: "2023-09-19 15:32:00",
              value: 7.0,
            },
            {
              time: "2023-09-19 15:33:00",
              value: 7.34,
            },
            {
              time: "2023-09-19 15:34:00",
              value: 7.04,
            },
            {
              time: "2023-09-19 15:35:00",
              value: 6.94,
            },
            {
              time: "2023-09-19 15:36:00",
              value: 7.24,
            },
            {
              time: "2023-09-19 15:37:00",
              value: 7.0,
            },
            {
              time: "2023-09-19 15:38:00",
              value: 6.99,
            },
            {
              time: "2023-09-19 15:39:00",
              value: 7.26,
            },
            {
              time: "2023-09-19 15:40:00",
              value: 7.26,
            },
            {
              time: "2023-09-19 15:41:00",
              value: 6.48,
            },
            {
              time: "2023-09-19 15:42:00",
              value: 7.0,
            },
            {
              time: "2023-09-19 15:43:00",
              value: 6.35,
            },
            {
              time: "2023-09-19 15:44:00",
              value: 6.93,
            },
            {
              time: "2023-09-19 15:45:00",
              value: 11.4,
            },
            {
              time: "2023-09-19 15:46:00",
              value: 10.48,
            },
            {
              time: "2023-09-19 15:47:00",
              value: 9.42,
            },
            {
              time: "2023-09-19 15:48:00",
              value: 7.92,
            },
            {
              time: "2023-09-19 15:49:00",
              value: 6.67,
            },
            {
              time: "2023-09-19 15:50:00",
              value: 6.12,
            },
          ],
          C_09: 0,
          C_08: 100,
          C_06: 0.04,
          C_05: -113,
          C_04: 2.66,
          C_03: 6.12,
          C_02: 2,
          C_01: 0.55,
          AREATYPE: "城市阳台",
          CGI: "460-00-196706-193",
          FREQUENCY_OFFSET: "E1",
          CI: 50356929,
          ROW_ID: 1,
          DATETIME: "2023-09-19 15:50:00",
          CITY: "杭州",
          AREANAME: "城市阳台",
          C_18: 100,
          C_17: 5.87,
          C_16: 0,
          下行PRB平均利用率: [
            {
              time: "2023-09-19 15:20:00",
              value: 2.69,
            },
            {
              time: "2023-09-19 15:21:00",
              value: 2.63,
            },
            {
              time: "2023-09-19 15:22:00",
              value: 2.64,
            },
            {
              time: "2023-09-19 15:23:00",
              value: 10.26,
            },
            {
              time: "2023-09-19 15:24:00",
              value: 89.47,
            },
            {
              time: "2023-09-19 15:25:00",
              value: 96.81,
            },
            {
              time: "2023-09-19 15:26:00",
              value: 99.07,
            },
            {
              time: "2023-09-19 15:27:00",
              value: 57.69,
            },
            {
              time: "2023-09-19 15:28:00",
              value: 2.78,
            },
            {
              time: "2023-09-19 15:29:00",
              value: 2.69,
            },
            {
              time: "2023-09-19 15:30:00",
              value: 3.13,
            },
            {
              time: "2023-09-19 15:31:00",
              value: 2.7,
            },
            {
              time: "2023-09-19 15:32:00",
              value: 2.64,
            },
            {
              time: "2023-09-19 15:33:00",
              value: 2.75,
            },
            {
              time: "2023-09-19 15:34:00",
              value: 2.77,
            },
            {
              time: "2023-09-19 15:35:00",
              value: 2.74,
            },
            {
              time: "2023-09-19 15:36:00",
              value: 2.71,
            },
            {
              time: "2023-09-19 15:37:00",
              value: 2.63,
            },
            {
              time: "2023-09-19 15:38:00",
              value: 2.62,
            },
            {
              time: "2023-09-19 15:39:00",
              value: 2.85,
            },
            {
              time: "2023-09-19 15:40:00",
              value: 2.91,
            },
            {
              time: "2023-09-19 15:41:00",
              value: 2.65,
            },
            {
              time: "2023-09-19 15:42:00",
              value: 2.62,
            },
            {
              time: "2023-09-19 15:43:00",
              value: 2.66,
            },
            {
              time: "2023-09-19 15:44:00",
              value: 2.79,
            },
            {
              time: "2023-09-19 15:45:00",
              value: 4.15,
            },
            {
              time: "2023-09-19 15:46:00",
              value: 4.55,
            },
            {
              time: "2023-09-19 15:47:00",
              value: 3.92,
            },
            {
              time: "2023-09-19 15:48:00",
              value: 3.35,
            },
            {
              time: "2023-09-19 15:49:00",
              value: 2.65,
            },
            {
              time: "2023-09-19 15:50:00",
              value: 2.66,
            },
          ],
          C_15: 0,
        },
        {
          C_11: 2,
          C_10: 0.12,
          最大用户数: [
            {
              time: "2023-09-19 15:20:00",
              value: 7.0,
            },
            {
              time: "2023-09-19 15:21:00",
              value: 4.0,
            },
            {
              time: "2023-09-19 15:22:00",
              value: 5.0,
            },
            {
              time: "2023-09-19 15:23:00",
              value: 5.0,
            },
            {
              time: "2023-09-19 15:24:00",
              value: 5.0,
            },
            {
              time: "2023-09-19 15:25:00",
              value: 4.0,
            },
            {
              time: "2023-09-19 15:26:00",
              value: 4.0,
            },
            {
              time: "2023-09-19 15:27:00",
              value: 5.0,
            },
            {
              time: "2023-09-19 15:28:00",
              value: 4.0,
            },
            {
              time: "2023-09-19 15:29:00",
              value: 5.0,
            },
            {
              time: "2023-09-19 15:30:00",
              value: 6.0,
            },
            {
              time: "2023-09-19 15:31:00",
              value: 4.0,
            },
            {
              time: "2023-09-19 15:32:00",
              value: 5.0,
            },
            {
              time: "2023-09-19 15:33:00",
              value: 7.0,
            },
            {
              time: "2023-09-19 15:34:00",
              value: 5.0,
            },
            {
              time: "2023-09-19 15:35:00",
              value: 5.0,
            },
            {
              time: "2023-09-19 15:36:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:37:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:38:00",
              value: 5.0,
            },
            {
              time: "2023-09-19 15:39:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:40:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:41:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:42:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:43:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:44:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:45:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:46:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:47:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:48:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:49:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:50:00",
              value: 2.0,
            },
          ],
          CELL_NAME: "省公司杭州钱江新城大楼LY钱江新城音乐喷泉西WZE_194",
          SITE_NAME:
            "H511031省公司杭州钱江新城大楼LY钱江新城音乐喷泉西信源池WZE_new",
          R_NUM: 1,
          上行PRB平均利用率: [
            {
              time: "2023-09-19 15:20:00",
              value: 7.87,
            },
            {
              time: "2023-09-19 15:21:00",
              value: 7.5,
            },
            {
              time: "2023-09-19 15:22:00",
              value: 7.4,
            },
            {
              time: "2023-09-19 15:23:00",
              value: 9.67,
            },
            {
              time: "2023-09-19 15:24:00",
              value: 8.88,
            },
            {
              time: "2023-09-19 15:25:00",
              value: 7.3,
            },
            {
              time: "2023-09-19 15:26:00",
              value: 6.96,
            },
            {
              time: "2023-09-19 15:27:00",
              value: 44.74,
            },
            {
              time: "2023-09-19 15:28:00",
              value: 38.75,
            },
            {
              time: "2023-09-19 15:29:00",
              value: 9.15,
            },
            {
              time: "2023-09-19 15:30:00",
              value: 8.44,
            },
            {
              time: "2023-09-19 15:31:00",
              value: 8.24,
            },
            {
              time: "2023-09-19 15:32:00",
              value: 7.92,
            },
            {
              time: "2023-09-19 15:33:00",
              value: 10.68,
            },
            {
              time: "2023-09-19 15:34:00",
              value: 9.07,
            },
            {
              time: "2023-09-19 15:35:00",
              value: 7.54,
            },
            {
              time: "2023-09-19 15:36:00",
              value: 6.6,
            },
            {
              time: "2023-09-19 15:37:00",
              value: 7.23,
            },
            {
              time: "2023-09-19 15:38:00",
              value: 7.02,
            },
            {
              time: "2023-09-19 15:39:00",
              value: 8.47,
            },
            {
              time: "2023-09-19 15:40:00",
              value: 6.76,
            },
            {
              time: "2023-09-19 15:41:00",
              value: 7.07,
            },
            {
              time: "2023-09-19 15:42:00",
              value: 6.87,
            },
            {
              time: "2023-09-19 15:43:00",
              value: 9.19,
            },
            {
              time: "2023-09-19 15:44:00",
              value: 7.11,
            },
            {
              time: "2023-09-19 15:45:00",
              value: 6.34,
            },
            {
              time: "2023-09-19 15:46:00",
              value: 6.26,
            },
            {
              time: "2023-09-19 15:47:00",
              value: 6.05,
            },
            {
              time: "2023-09-19 15:48:00",
              value: 6.26,
            },
            {
              time: "2023-09-19 15:49:00",
              value: 6.45,
            },
            {
              time: "2023-09-19 15:50:00",
              value: 6.26,
            },
          ],
          C_09: 0,
          C_08: 100,
          C_07: 14.07,
          C_06: 0.52,
          C_05: -113,
          C_04: 2.92,
          C_03: 6.26,
          C_02: 2,
          C_01: 1.12,
          AREATYPE: "城市阳台",
          CGI: "460-00-196706-194",
          FREQUENCY_OFFSET: "E1",
          CI: 50356930,
          ROW_ID: 2,
          DATETIME: "2023-09-19 15:50:00",
          CITY: "杭州",
          AREANAME: "城市阳台",
          C_18: 100,
          C_17: 6.35,
          C_16: 0.04,
          下行PRB平均利用率: [
            {
              time: "2023-09-19 15:20:00",
              value: 3.14,
            },
            {
              time: "2023-09-19 15:21:00",
              value: 3.51,
            },
            {
              time: "2023-09-19 15:22:00",
              value: 2.93,
            },
            {
              time: "2023-09-19 15:23:00",
              value: 3.95,
            },
            {
              time: "2023-09-19 15:24:00",
              value: 3.47,
            },
            {
              time: "2023-09-19 15:25:00",
              value: 3.23,
            },
            {
              time: "2023-09-19 15:26:00",
              value: 3.44,
            },
            {
              time: "2023-09-19 15:27:00",
              value: 43.83,
            },
            {
              time: "2023-09-19 15:28:00",
              value: 37.05,
            },
            {
              time: "2023-09-19 15:29:00",
              value: 4.61,
            },
            {
              time: "2023-09-19 15:30:00",
              value: 3.5,
            },
            {
              time: "2023-09-19 15:31:00",
              value: 3.31,
            },
            {
              time: "2023-09-19 15:32:00",
              value: 3.05,
            },
            {
              time: "2023-09-19 15:33:00",
              value: 5.97,
            },
            {
              time: "2023-09-19 15:34:00",
              value: 3.45,
            },
            {
              time: "2023-09-19 15:35:00",
              value: 3.07,
            },
            {
              time: "2023-09-19 15:36:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:37:00",
              value: 2.94,
            },
            {
              time: "2023-09-19 15:38:00",
              value: 3.17,
            },
            {
              time: "2023-09-19 15:39:00",
              value: 3.52,
            },
            {
              time: "2023-09-19 15:40:00",
              value: 2.73,
            },
            {
              time: "2023-09-19 15:41:00",
              value: 3.71,
            },
            {
              time: "2023-09-19 15:42:00",
              value: 2.89,
            },
            {
              time: "2023-09-19 15:43:00",
              value: 4.5,
            },
            {
              time: "2023-09-19 15:44:00",
              value: 4.53,
            },
            {
              time: "2023-09-19 15:45:00",
              value: 2.81,
            },
            {
              time: "2023-09-19 15:46:00",
              value: 2.76,
            },
            {
              time: "2023-09-19 15:47:00",
              value: 2.72,
            },
            {
              time: "2023-09-19 15:48:00",
              value: 2.77,
            },
            {
              time: "2023-09-19 15:49:00",
              value: 2.74,
            },
            {
              time: "2023-09-19 15:50:00",
              value: 2.92,
            },
          ],
          C_15: 0.03,
        },
        {
          C_11: 1,
          C_10: 0,
          最大用户数: [
            {
              time: "2023-09-19 15:20:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:21:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:22:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:23:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:24:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:25:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:26:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:27:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:28:00",
              value: 4.0,
            },
            {
              time: "2023-09-19 15:29:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:30:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:31:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:32:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:33:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:34:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:35:00",
              value: 3.0,
            },
            {
              time: "2023-09-19 15:36:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:37:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:38:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:39:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:40:00",
              value: 0.0,
            },
            {
              time: "2023-09-19 15:41:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:42:00",
              value: 0.0,
            },
            {
              time: "2023-09-19 15:43:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:44:00",
              value: 2.0,
            },
            {
              time: "2023-09-19 15:45:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:46:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:47:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:48:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:49:00",
              value: 1.0,
            },
            {
              time: "2023-09-19 15:50:00",
              value: 1.0,
            },
          ],
          CELL_NAME: "省公司钱江新城大楼LY音乐喷泉东南WZE_196",
          SITE_NAME:
            "H511031省公司杭州钱江新城大楼LY钱江新城音乐喷泉西信源池WZE_new",
          R_NUM: 1,
          上行PRB平均利用率: [
            {
              time: "2023-09-19 15:20:00",
              value: 5.73,
            },
            {
              time: "2023-09-19 15:21:00",
              value: 5.87,
            },
            {
              time: "2023-09-19 15:22:00",
              value: 6.33,
            },
            {
              time: "2023-09-19 15:23:00",
              value: 7.53,
            },
            {
              time: "2023-09-19 15:24:00",
              value: 6.86,
            },
            {
              time: "2023-09-19 15:25:00",
              value: 5.75,
            },
            {
              time: "2023-09-19 15:26:00",
              value: 6.64,
            },
            {
              time: "2023-09-19 15:27:00",
              value: 5.92,
            },
            {
              time: "2023-09-19 15:28:00",
              value: 6.96,
            },
            {
              time: "2023-09-19 15:29:00",
              value: 5.3,
            },
            {
              time: "2023-09-19 15:30:00",
              value: 5.5,
            },
            {
              time: "2023-09-19 15:31:00",
              value: 6.53,
            },
            {
              time: "2023-09-19 15:32:00",
              value: 7.39,
            },
            {
              time: "2023-09-19 15:33:00",
              value: 6.46,
            },
            {
              time: "2023-09-19 15:34:00",
              value: 6.59,
            },
            {
              time: "2023-09-19 15:35:00",
              value: 7.12,
            },
            {
              time: "2023-09-19 15:36:00",
              value: 6.56,
            },
            {
              time: "2023-09-19 15:37:00",
              value: 6.93,
            },
            {
              time: "2023-09-19 15:38:00",
              value: 6.82,
            },
            {
              time: "2023-09-19 15:39:00",
              value: 6.8,
            },
            {
              time: "2023-09-19 15:40:00",
              value: 7.17,
            },
            {
              time: "2023-09-19 15:41:00",
              value: 6.94,
            },
            {
              time: "2023-09-19 15:42:00",
              value: 7.0,
            },
            {
              time: "2023-09-19 15:43:00",
              value: 6.95,
            },
            {
              time: "2023-09-19 15:44:00",
              value: 6.53,
            },
            {
              time: "2023-09-19 15:45:00",
              value: 6.91,
            },
            {
              time: "2023-09-19 15:46:00",
              value: 6.77,
            },
            {
              time: "2023-09-19 15:47:00",
              value: 6.39,
            },
            {
              time: "2023-09-19 15:48:00",
              value: 6.87,
            },
            {
              time: "2023-09-19 15:49:00",
              value: 5.98,
            },
            {
              time: "2023-09-19 15:50:00",
              value: 6.97,
            },
          ],
          C_09: 0,
          C_08: 100,
          C_05: -108,
          C_04: 2.58,
          C_03: 6.97,
          C_02: 1,
          C_01: 0.07,
          AREATYPE: "城市阳台",
          CGI: "460-00-196706-196",
          FREQUENCY_OFFSET: "E1",
          CI: 50356932,
          ROW_ID: 3,
          DATETIME: "2023-09-19 15:50:00",
          CITY: "杭州",
          AREANAME: "城市阳台",
          C_17: 5.73,
          C_16: 0,
          下行PRB平均利用率: [
            {
              time: "2023-09-19 15:20:00",
              value: 5.38,
            },
            {
              time: "2023-09-19 15:21:00",
              value: 4.99,
            },
            {
              time: "2023-09-19 15:22:00",
              value: 6.18,
            },
            {
              time: "2023-09-19 15:23:00",
              value: 6.18,
            },
            {
              time: "2023-09-19 15:24:00",
              value: 4.12,
            },
            {
              time: "2023-09-19 15:25:00",
              value: 5.16,
            },
            {
              time: "2023-09-19 15:26:00",
              value: 2.55,
            },
            {
              time: "2023-09-19 15:27:00",
              value: 2.64,
            },
            {
              time: "2023-09-19 15:28:00",
              value: 3.03,
            },
            {
              time: "2023-09-19 15:29:00",
              value: 2.59,
            },
            {
              time: "2023-09-19 15:30:00",
              value: 2.58,
            },
            {
              time: "2023-09-19 15:31:00",
              value: 2.71,
            },
            {
              time: "2023-09-19 15:32:00",
              value: 3.26,
            },
            {
              time: "2023-09-19 15:33:00",
              value: 2.88,
            },
            {
              time: "2023-09-19 15:34:00",
              value: 2.71,
            },
            {
              time: "2023-09-19 15:35:00",
              value: 2.69,
            },
            {
              time: "2023-09-19 15:36:00",
              value: 2.6,
            },
            {
              time: "2023-09-19 15:37:00",
              value: 2.76,
            },
            {
              time: "2023-09-19 15:38:00",
              value: 2.75,
            },
            {
              time: "2023-09-19 15:39:00",
              value: 2.55,
            },
            {
              time: "2023-09-19 15:40:00",
              value: 2.59,
            },
            {
              time: "2023-09-19 15:41:00",
              value: 2.59,
            },
            {
              time: "2023-09-19 15:42:00",
              value: 2.55,
            },
            {
              time: "2023-09-19 15:43:00",
              value: 2.58,
            },
            {
              time: "2023-09-19 15:44:00",
              value: 2.59,
            },
            {
              time: "2023-09-19 15:45:00",
              value: 2.89,
            },
            {
              time: "2023-09-19 15:46:00",
              value: 2.57,
            },
            {
              time: "2023-09-19 15:47:00",
              value: 2.57,
            },
            {
              time: "2023-09-19 15:48:00",
              value: 2.57,
            },
            {
              time: "2023-09-19 15:49:00",
              value: 2.6,
            },
            {
              time: "2023-09-19 15:50:00",
              value: 2.58,
            },
          ],
          C_15: 0,
        }
      );
    }
    if (!this.columns.length) {
      let arr = [];
      res.head.forEach((x, i) => {
        if (x.fieldCname && x.fieldName) {
          let obj = {
            field: x.fieldName,
            title: x.fieldCname,
            width: 100,
            sortable: true,
          };
          if (x.fieldCname === "时间" || x.fieldName === "DATETIME") {
            obj.width = 150;
          }
          if (x.fieldCname === "CGI" || x.fieldName === "CELL_ID") {
            obj.width = 150;
          }
          if (x.fieldCname === "小区名称" || x.fieldName === "CELL_NAME") {
            obj.className = "cellClass";
            obj.width = 200;
          }
          if (x.fieldCname === "最大用户数" || x.fieldName === "C_02") {
            obj.slot = x.fieldName;
            arr.push({
              field: "最大用户数趋势图",
              title: "最大用户数趋势图",
              slot: "最大用户数趋势图",
              width: 150,
              align: "center",
              resizable: true,
            });
          }

          if (x.fieldCname === "上行PRB平均利用率" || x.fieldName === "C_03") {
            obj.slot = x.fieldName;
            arr.push({
              field: "上行PRB平均利用率趋势图",
              title: "上行PRB平均利用率趋势图",
              slot: "上行PRB平均利用率趋势图",
              width: 150,
              align: "center",
              resizable: true,
            });
          }

          if (x.fieldCname === "下行PRB平均利用率" || x.fieldName === "C_04") {
            obj.slot = x.fieldName;
            arr.push({
              field: "下行PRB平均利用率趋势图",
              title: "下行PRB平均利用率趋势图",
              slot: "下行PRB平均利用率趋势图",
              width: 150,
              align: "center",
              resizable: true,
            });
          }
          arr.push(obj);
        }
      });
      this.columns = arr;
    }
    this.tableData = res.data;
    let max_user_num = [];
    max_user_num = this.tableData.map((x) => x["C_02"]).filter((x) => x);
    this.tableData.forEach((x) => {
      x.max_user_num = Math.max(...max_user_num);
    });
  },
  created() {},
};
</script>

<style scoped>
.excel-cell {
  position: relative;
  z-index: 1000;
  text-align: right;
  cursor: pointer;
}

.thumbStyle {
  height: 30px;
  width: 100%;
}
</style>