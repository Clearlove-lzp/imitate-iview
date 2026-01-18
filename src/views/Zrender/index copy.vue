<template>
  <div class="process-container">
    <div class="process-main">
      <div class="process-item complete">发现</div>
      <div class="process-item process-bound">定界</div>
      <div class="process-item">处置</div>
      <div class="process-item">恢复</div>
      <div class="process-item">复核</div>
    </div>
    <div class="flow-main">
      <div ref="flowContainer" class="flow-container"></div>
      <div class="line line1"></div>
      <div class="line line2"></div>
      <div class="line line3"></div>
      <div class="line line4"></div>
    </div>

    <div style="text-align: center; margin: 20px">
      <button @click="reRenderFull">清空重绘（恢复原始数据）</button>
    </div>
  </div>
</template>

<script>
import * as zrender from "zrender";

// 原始流程图数据
const ORIGINAL_FLOW_DATA = {
  nodes: [
    {
      id: "eventGen",
      x: 50,
      y: 180,
      text: "事件生成",
      bg: "#d9f7be",
      dept: "监控",
      time: "10:00",
      userName: "张三",
      userDept: "省监控",
      deptBg: "#28C768",
    },
    {
      id: "confirm",
      x: 300,
      y: 100,
      text: "真实性确认",
      bg: "#d9f7be",
      dept: "专业",
      time: "10:00",
      userName: "张三",
      userDept: "省监控",
      deptBg: "#28C768",
      from: [
        { fromId: "eventGen", fromPoint: "right", triggerDirection: "right" },
      ],
    },
    {
      id: "rootCause",
      x: 300,
      y: 180,
      text: "根因初定界",
      bg: "#d9f7be",
      dept: "监控",
      time: "10:00",
      userName: "张三",
      userDept: "省监控",
      deptBg: "#28C768",
      from: [
        { fromId: "eventGen", fromPoint: "right", triggerDirection: "right" },
      ],
    },
    {
      id: "impact",
      x: 300,
      y: 260,
      text: "影响初定界",
      bg: "#d9f7be",
      dept: "监控",
      time: "10:00",
      userName: "张三",
      userDept: "省监控",
      deptBg: "#28C768",
      from: [
        { fromId: "eventGen", fromPoint: "right", triggerDirection: "right" },
      ],
    },
    {
      id: "rootConfirm",
      x: 490,
      y: 180,
      text: "根因定界确认",
      bg: "#66B2FF",
      dept: "专业",
      deptBg: "#0677FB",
      from: [
        { fromId: "rootCause", fromPoint: "right", triggerDirection: "right" },
      ],
    },
    {
      id: "impactConfirm",
      x: 490,
      y: 260,
      text: "影响定界确认",
      bg: "#FF6262",
      dept: "专业",
      deptBg: "#B50000",
      from: [
        { fromId: "impact", fromPoint: "right", triggerDirection: "right" },
      ],
    },
    {
      id: "impactSum",
      x: 680,
      y: 260,
      text: "影响汇总",
      bg: "#E0E0E0",
      dept: "监控",
      deptBg: "#959595",
      from: [
        {
          fromId: "impactConfirm",
          fromPoint: "right",
          triggerDirection: "right",
        },
      ],
    },
    {
      id: "rootHandle",
      x: 920,
      y: 180,
      text: "根因定位处理",
      bg: "#E0E0E0",
      dept: "专业",
      deptBg: "#959595",
      from: [
        {
          fromId: "rootConfirm",
          fromPoint: "right",
          triggerDirection: "right",
        },
      ],
    },
    {
      id: "impactHandle",
      x: 920,
      y: 260,
      text: "影响核实处理",
      bg: "#E0E0E0",
      dept: "专业",
      deptBg: "#959595",
      from: [
        {
          fromId: "impactSum",
          fromPoint: "right",
          triggerDirection: "right",
        },
      ],
    },
    {
      id: "recover",
      x: 1150,
      y: 180,
      text: "恢复验证",
      bg: "#E0E0E0",
      dept: "监控",
      deptBg: "#959595",
      from: [
        {
          fromId: "impactHandle",
          fromPoint: "right",
          triggerDirection: "up",
        },
        {
          fromId: "rootHandle",
          fromPoint: "right",
          triggerDirection: "right",
        },
      ],
    },
    {
      id: "close",
      x: 1150,
      y: 100,
      text: "事件闭环",
      bg: "#E0E0E0",
      dept: "监控",
      deptBg: "#959595",
      from: [
        {
          fromId: "recover",
          fromPoint: "up",
          triggerDirection: "up",
        },
      ],
    },
  ],
  rectWidth: 140,
  rectHeight: 50,
};

export default {
  name: "FlowChartWithArrow",
  data() {
    return {
      zr: null,
      flowData: JSON.parse(JSON.stringify(ORIGINAL_FLOW_DATA)),
      selectedNode: "", // 记录选中的节点ID
      nodeElements: {}, // 存储所有节点元素，用于高亮/交互
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initZRender();
      this.renderFlowChart();
    });
  },
  beforeUnmount() {
    if (this.zr) this.zr.dispose();
  },
  methods: {
    initZRender() {
      const container = this.$refs.flowContainer;
      this.zr = zrender.init(container);
      console.log(
        "ZRender 初始化完成，容器尺寸：",
        container.clientWidth,
        container.clientHeight
      );
    },

    // 绘制节点
    drawNode(node) {
      const { rectWidth, rectHeight } = this.flowData;
      // 节点矩形
      const rect = new zrender.Rect({
        shape: {
          x: node.x,
          y: node.y,
          width: rectWidth,
          height: rectHeight,
          r: 6,
        },
        style: {
          fill: node.bg,
          lineWidth: 2,
          // 阴影核心配置（以下4项配合使用）
          shadowBlur: 10, // 阴影模糊度（越大越柔和）
          shadowColor: "rgba(0,0,0,0.3)", // 阴影颜色（带透明度更自然）
          shadowOffsetX: 3, // 阴影水平偏移（向右为正）
          shadowOffsetY: 3, // 阴影垂直偏移（向下为正）
        },
        z: 1,
      });
      // ========== 核心：添加点击事件 ==========
      rect.on("click", () => {
        const nodeId = node.id;
        // 1. 更新选中状态
        this.selectedNode = nodeId;

        // 2. 节点高亮（取消之前选中节点的高亮）
        Object.keys(this.nodeElements).forEach((id) => {
          const el = this.nodeElements[id];
          el.attr("style", {
            ...el.attr("style"),
            stroke: null,
            lineWidth: 2,
          });
        });
        // 高亮当前选中节点
        rect.attr("style", {
          ...rect.attr("style"),
          stroke: "#1890ff", // 蓝色高亮边框
          lineWidth: 3,
        });
      });

      // 可选：添加鼠标悬浮效果
      rect.on("mouseover", () => {
        rect.attr("style", {
          ...rect.attr("style"),
          shadowBlur: 15, // 悬浮时阴影更明显
          shadowColor: "rgba(24, 144, 255, 0.4)", // 蓝色阴影
        });
      });
      rect.on("mouseout", () => {
        // 恢复原有样式（如果未选中）
        if (this.selectedNode !== node.id) {
          rect.attr("style", {
            ...rect.attr("style"),
            shadowBlur: 10,
            shadowColor: "rgba(0,0,0,0.3)",
          });
        }
      });
      this.zr.add(rect);
      // 存储节点元素，用于后续交互
      this.nodeElements[node.id] = rect;

      // 节点部门 - 矩形
      const deptRect = new zrender.Rect({
        shape: {
          x: node.x + 5,
          y: node.y + 5,
          width: 32,
          height: 17,
          r: 4,
        },
        style: {
          fill: node.deptBg,
        },
        z: 2,
        silent: true, // 事件穿透
      });
      this.zr.add(deptRect);

      // 节点部门 - 文本
      const deptText = new zrender.Text({
        style: {
          text: node.dept,
          fontSize: 13,
          fill: "#fff",
          x: node.x + 8,
          y: node.y + 7,
        },
        z: 3,
        silent: true, // 事件穿透
      });
      this.zr.add(deptText);

      // 节点文本
      const text = new zrender.Text({
        style: {
          text: node.text,
          fontSize: 13,
          fill: "#334044",
          x: node.x + 50,
          y:
            node.time || node.userName || node.userDept
              ? node.y + 7
              : node.y + 20,
        },
        z: 2,
        silent: true, // 事件穿透
      });
      this.zr.add(text);

      // 节点时间 - 文本
      if (node.time) {
        const timeText = new zrender.Text({
          style: {
            text: node.time,
            fontSize: 12,
            fill: "#334044",
            x: node.x + 5,
            y: node.y + 34,
          },
          z: 2,
          silent: true, // 事件穿透
        });
        this.zr.add(timeText);
      }

      // 节点填写信息 - 文本
      if (node.userName && node.userDept) {
        const infoText = new zrender.Text({
          style: {
            text: `${node.userName}-${node.userDept}`,
            fontSize: 12,
            fill: "#334044",
            x: node.x + 70,
            y: node.y + 34,
          },
          z: 2,
          silent: true, // 事件穿透
        });
        this.zr.add(infoText);
      }
    },

    // 绘制连线 + 箭头（核心修复）
    drawLine(fromNode, toNode, fromInfo) {
      // 绘制起点的圆
      if (fromInfo.fromPoint === "right") {
        const circle = new zrender.Circle({
          shape: {
            cx: fromNode.x + this.flowData.rectWidth + 4,
            cy: fromNode.y + this.flowData.rectHeight / 2,
            r: 4,
          },
          style: {
            fill: "#28C768",
          },
        });
        this.zr.add(circle);
      } else if (fromInfo.fromPoint === "up") {
        const circle = new zrender.Circle({
          shape: {
            cx: fromNode.x + this.flowData.rectWidth / 2,
            cy: fromNode.y - 4,
            r: 4,
          },
          style: {
            fill: "#28C768",
          },
        });
        this.zr.add(circle);
      }
      if (fromInfo.triggerDirection === "right") {
        // 绘制终点的三角形
        const trianglePoints = [
          [toNode.x - 2, toNode.y + this.flowData.rectHeight / 2], // 尖点
          [toNode.x - 12, toNode.y + this.flowData.rectHeight / 2 - 6], // 左底点
          [toNode.x - 12, toNode.y + this.flowData.rectHeight / 2 + 6], // 右底点
        ];
        const triangle = new zrender.Polygon({
          shape: {
            points: trianglePoints,
          },
          style: {
            fill: "#28C768",
          },
        });
        this.zr.add(triangle);
        // 绘制连线
        // 如果是左上角和右下角连线，可以考虑使用折线，中间加一个拐点，如果是水平连线或者垂直连线，直接画直线
        if (fromNode.y !== toNode.y && fromNode.x !== toNode.x) {
          const polylinePoints = [
            [
              fromNode.x + this.flowData.rectWidth,
              fromNode.y + this.flowData.rectHeight / 2,
            ], // 起点
            [
              (toNode.x + fromNode.x + this.flowData.rectWidth) / 2,
              fromNode.y + this.flowData.rectHeight / 2,
            ], // 拐点1（水平右移）
            [
              (toNode.x + fromNode.x + this.flowData.rectWidth) / 2,
              toNode.y + this.flowData.rectHeight / 2,
            ], // 拐点2（垂直上下移）
            [toNode.x - 10, toNode.y + this.flowData.rectHeight / 2], // 终点
          ];
          const polyline = new zrender.Polyline({
            shape: {
              points: polylinePoints,
            },
            style: {
              stroke: "#28C768",
              lineWidth: 2,
            },
          });
          this.zr.add(polyline);
          return;
        } else {
          const line = new zrender.Line({
            shape: {
              x1: fromNode.x + this.flowData.rectWidth,
              y1: fromNode.y + this.flowData.rectHeight / 2,
              x2: toNode.x - 10,
              y2: toNode.y + this.flowData.rectHeight / 2,
            },
            style: { stroke: "#28C768", lineWidth: 2, fill: "none" },
          });
          this.zr.add(line);
        }
      } else if (fromInfo.triggerDirection === "up") {
        // 绘制终点的三角形
        const trianglePoints = [
          [
            toNode.x + this.flowData.rectWidth / 2,
            toNode.y + this.flowData.rectHeight + 2,
          ], // 尖点
          [
            toNode.x + this.flowData.rectWidth / 2 - 6,
            toNode.y + this.flowData.rectHeight + 12,
          ], // 左底点
          [
            toNode.x + this.flowData.rectWidth / 2 + 6,
            toNode.y + this.flowData.rectHeight + 12,
          ], // 右底点
        ];
        const triangle = new zrender.Polygon({
          shape: {
            points: trianglePoints,
          },
          style: {
            fill: "#28C768",
          },
        });
        this.zr.add(triangle);
        // 绘制连线
        // 如果是左上角和右下角连线，可以考虑使用折线，中间加一个拐点，如果是水平连线或者垂直连线，直接画直线
        if (fromNode.y !== toNode.y && fromNode.x !== toNode.x) {
          const polylinePoints = [
            [
              fromNode.x + this.flowData.rectWidth,
              fromNode.y + this.flowData.rectHeight / 2,
            ], // 起点）
            [
              toNode.x + this.flowData.rectWidth / 2,
              fromNode.y + this.flowData.rectHeight / 2,
            ], // 拐点1（水平右移）
            [
              toNode.x + this.flowData.rectWidth / 2,
              toNode.y + this.flowData.rectHeight + 2,
            ], // 终点
          ];
          const polyline = new zrender.Polyline({
            shape: {
              points: polylinePoints,
            },
            style: {
              stroke: "#28C768",
              lineWidth: 2,
            },
          });
          this.zr.add(polyline);
        } else {
          const line = new zrender.Line({
            shape: {
              x1: toNode.x + this.flowData.rectWidth / 2,
              y1: fromNode.y,
              x2: toNode.x + this.flowData.rectWidth / 2,
              y2: toNode.y + this.flowData.rectHeight + 2,
            },
            style: { stroke: "#28C768", lineWidth: 2, fill: "none" },
          });
          this.zr.add(line);
        }
      }
    },
    // 渲染整个流程图
    renderFlowChart() {
      if (!this.zr) return;
      this.zr.clear();
      // 绘制所有节点
      this.flowData.nodes.forEach((node) => {
        this.drawNode(node);
        if (node.from?.length) {
          node.from.find((fromInfo) => {
            const fromNode = this.flowData.nodes.find(
              (n) => n.id === fromInfo.fromId
            );
            if (fromNode) this.drawLine(fromNode, node, fromInfo);
          });
        }
      });
    },

    // 清空重绘（恢复原始数据）
    reRenderFull() {
      this.flowData = JSON.parse(JSON.stringify(ORIGINAL_FLOW_DATA));
      this.renderFlowChart();
    },
  },
};
</script>

<style scoped lang="less">
.process-container {
  width: 1600px;
  margin: 20px auto;
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 10px;
  .process-main {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    .process-item {
      width: 200px;
      padding: 10px 20px;
      background-color: #f0f0f0;
      border-radius: 4px;
      font-weight: bold;
      text-align: center;
      &.process-bound {
        width: 600px;
        border: 2px solid #1890ff;
        background-color: #e6f7ff;
      }
      &.complete {
        background-color: #dfffe3;
      }
    }
  }
}
.flow-main {
  position: relative;
  .line {
    position: absolute;
    top: 0;
    left: 0;
    width: 0px;
    height: 100%;
    border-left: 2px dashed #eee;
    z-index: 1000;
  }
  .line1 {
    left: 235px;
  }
  .line2 {
    left: 870px;
  }
  .line3 {
    left: 1105px;
  }
  .line4 {
    left: 1340px;
  }
}
.flow-container {
  width: 1580px;
  height: 400px;
  margin: 20px auto;
  border: 1px solid #ccc;
  background-color: #ffffff;
  overflow: hidden;
}
button {
  padding: 10px 20px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: #40a9ff;
}
</style>
