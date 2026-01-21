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

// 4种状态：0 未开始、1 处理中、2 已完成、3 任务驳回；不同状态不同颜色
const notStartedStatus = {
  bg: "#FFFFFF",
  roleBg: "#A0A2AA",
};
const processingStatus = {
  bg: "#F1F9FF",
  roleBg: "#2396F5",
};
const completeStatus = {
  bg: "#EFFFF0",
  roleBg: "#26BE2A",
};
const rejectedStatus = {
  bg: "#FFF1F0",
  roleBg: "#FF4D4F",
};

// 原始流程图数据
const ORIGINAL_FLOW_DATA = {
  nodes: [
    {
      id: "eventGen",
      x: 50,
      y: 180,
      text: "事件生成",
      role: "监控",
      time: "10:00",
      userName: "张三",
      userDept: "省监控",
      status: 2,
    },
    {
      id: "confirm",
      x: 300,
      y: 60,
      text: "真实性确认",
      role: "专业",
      time: "10:00",
      userName: "张三",
      userDept: "省监控",
      from: [
        { fromId: "eventGen", fromPoint: "right", triggerDirection: "right" },
      ],
      status: 2,
    },
    {
      id: "rootCause",
      x: 300,
      y: 180,
      text: "根因初定界",
      role: "监控",
      time: "10:00",
      userName: "张三",
      userDept: "省监控",
      from: [
        { fromId: "eventGen", fromPoint: "right", triggerDirection: "right" },
      ],
      rejectFrom: [
        { fromId: "rootConfirm", fromPoint: "up", triggerDirection: "down" },
      ],
      status: 2,
    },
    {
      id: "impact",
      x: 300,
      y: 300,
      text: "影响初定界",
      role: "监控",
      time: "10:00",
      userName: "张三",
      userDept: "省监控",
      from: [
        { fromId: "eventGen", fromPoint: "right", triggerDirection: "right" },
      ],
      status: 2,
    },
    {
      id: "rootConfirm",
      x: 490,
      y: 180,
      text: "根因定界确认",
      role: "专业",
      from: [
        { fromId: "rootCause", fromPoint: "right", triggerDirection: "right" },
      ],
      status: 3,
    },
    {
      id: "impactConfirm",
      x: 490,
      y: 300,
      text: "影响定界确认",
      role: "专业",
      from: [
        { fromId: "impact", fromPoint: "right", triggerDirection: "right" },
      ],
      status: 1,
    },
    {
      id: "impactSum",
      x: 680,
      y: 300,
      text: "影响汇总",
      role: "监控",
      from: [
        {
          fromId: "impactConfirm",
          fromPoint: "right",
          triggerDirection: "right",
        },
      ],
      status: 0,
    },
    {
      id: "rootHandle",
      x: 920,
      y: 180,
      text: "根因定位处理",
      role: "专业",
      from: [
        {
          fromId: "rootConfirm",
          fromPoint: "right",
          triggerDirection: "right",
        },
      ],
      status: 0,
    },
    {
      id: "impactHandle",
      x: 920,
      y: 300,
      text: "影响核实处理",
      role: "专业",
      from: [
        {
          fromId: "impactSum",
          fromPoint: "right",
          triggerDirection: "right",
        },
      ],
      status: 0,
    },
    {
      id: "recover",
      x: 1150,
      y: 180,
      text: "恢复验证",
      role: "监控",
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
      status: 0,
    },
    {
      id: "close",
      x: 1150,
      y: 60,
      text: "事件闭环",
      role: "监控",
      from: [
        {
          fromId: "recover",
          fromPoint: "up",
          triggerDirection: "up",
        },
      ],
      status: 0,
    },
    {
      id: "over",
      x: 1390,
      y: 180,
      text: "结束",
      from: [
        {
          fromId: "recover",
          fromPoint: "right",
          triggerDirection: "right",
        },
      ],
      status: 0,
    },
  ],
  rectWidth: 140,
  rectHeight: 90,
  spaceHeight: 30,
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
      const bg =
        node.status === 0
          ? notStartedStatus.bg
          : node.status === 1
          ? processingStatus.bg
          : node.status === 2
          ? completeStatus.bg
          : node.status === 3
          ? rejectedStatus.bg
          : "";
      const roleBg =
        node.status === 0
          ? notStartedStatus.roleBg
          : node.status === 1
          ? processingStatus.roleBg
          : node.status === 2
          ? completeStatus.roleBg
          : node.status === 3
          ? rejectedStatus.roleBg
          : "";
      // 节点矩形
      const rect = new zrender.Rect({
        id: node.id,
        shape: {
          x: node.x,
          y: node.y,
          width: rectWidth,
          height: rectHeight,
          r: 6,
        },
        style: {
          fill: bg,
          stroke: roleBg,
          lineWidth: 2,
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
          if (id === node.id) {
            // 高亮当前选中节点
            el.attr("style", {
              ...el.attr("style"),
              shadowBlur: 10, // 悬浮时阴影更明显
              shadowColor: `${roleBg}80`, // 阴影
              lineWidth: 3,
            });
          } else {
            el.attr("style", {
              ...el.attr("style"),
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: "transparent",
              lineWidth: 2,
            });
          }
        });
      });

      // 可选：添加鼠标悬浮效果
      rect.on("mouseover", () => {
        rect.attr("style", {
          ...rect.attr("style"),
          shadowBlur: 10, // 悬浮时阴影更明显
          shadowColor: `${roleBg}80`, // 阴影
          lineWidth: 3,
        });
      });
      rect.on("mouseout", () => {
        // 恢复原有样式（如果未选中）
        if (this.selectedNode !== node.id) {
          rect.attr("style", {
            ...rect.attr("style"),
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "transparent",
            lineWidth: 2,
          });
        }
      });
      this.zr.add(rect);
      // 存储节点元素，用于后续交互
      this.nodeElements[node.id] = rect;

      if (node.role) {
        // 节点部门 - 矩形
        const roleRect = new zrender.Rect({
          shape: {
            x: node.x + 7,
            y: node.y - 7,
            width: 40,
            height: 20,
            r: 4,
          },
          style: {
            fill: roleBg,
          },
          z: 2,
          silent: true, // 事件穿透
        });
        this.zr.add(roleRect);
        // 节点部门 - 文本
        const roleText = new zrender.Text({
          style: {
            text: node.role,
            fontSize: 14,
            fill: "#fff",
            x: node.x + 12,
            y: node.y - 4,
          },
          z: 3,
          silent: true, // 事件穿透
        });
        this.zr.add(roleText);
      }

      // 节点文本
      const text = new zrender.Text({
        style: {
          text: node.text,
          fontSize: 16,
          fill: "#000",
          x: node.x + rectWidth / 2,
          y:
            node.time || node.userName || node.userDept
              ? node.y + 20
              : node.y + 40,
        },
        z: 2,
        silent: true,
      });
      this.zr.add(text);
      const textBound = text.getBoundingRect();
      // 反算真正的“视觉居中”
      text.attr("style", {
        x: textBound.x - textBound.width / 2,
      });

      // 节点时间 - 文本
      if (node.time) {
        const timeText = new zrender.Text({
          style: {
            text: node.time,
            fontSize: 14,
            fill: "#334044",
            x: node.x + rectWidth / 2,
            y: node.y + 65,
          },
          z: 2,
          silent: true, // 事件穿透
        });
        this.zr.add(timeText);
        const timeTextBound = timeText.getBoundingRect();
        // 反算真正的“视觉居中”
        timeText.attr("style", {
          x: timeTextBound.x - timeTextBound.width / 2,
        });
      }

      // 节点填写信息 - 文本
      if (node.userName && node.userDept) {
        const infoText = new zrender.Text({
          style: {
            text: `${node.userName}-${node.userDept}`,
            fontSize: 14,
            fill: "#334044",
            x: node.x + rectWidth / 2,
            y: node.y + 45,
          },
          z: 2,
          silent: true, // 事件穿透
        });
        this.zr.add(infoText);
        const infoTextBound = infoText.getBoundingRect();
        // 反算真正的“视觉居中”
        infoText.attr("style", {
          x: infoTextBound.x - infoTextBound.width / 2,
        });
      }
    },
    // 绘制连线 + 箭头（核心修复）
    drawLine(fromNode, toNode, fromInfo) {
      // console.info(fromNode, toNode, fromInfo);
      const lineColor =
        fromNode.status === 0
          ? notStartedStatus.roleBg
          : fromNode.status === 1
          ? notStartedStatus.roleBg
          : fromNode.status === 2
          ? completeStatus.roleBg
          : fromNode.status === 3
          ? notStartedStatus.roleBg
          : "";
      // 绘制起点的圆
      if (fromInfo.fromPoint === "right") {
        const circle = new zrender.Circle({
          shape: {
            cx: fromNode.x + this.flowData.rectWidth + 4,
            cy: fromNode.y + this.flowData.rectHeight / 2,
            r: 4,
          },
          style: {
            fill: lineColor,
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
            fill: lineColor,
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
            fill: lineColor,
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
              stroke: lineColor,
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
            style: { stroke: lineColor, lineWidth: 2, fill: "none" },
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
            fill: lineColor,
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
              stroke: lineColor,
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
            style: { stroke: lineColor, lineWidth: 2, fill: "none" },
          });
          this.zr.add(line);
        }
      }
    },
    // 绘制驳回连线 + 箭头
    drawRejectLine(fromNode, toNode, fromInfo) {
      console.info(fromNode, toNode, fromInfo);
      const lineColor = rejectedStatus.roleBg;
      // 绘制起点的圆
      if (fromInfo.fromPoint === "up") {
        const circle = new zrender.Circle({
          shape: {
            cx: fromNode.x + this.flowData.rectWidth / 2,
            cy: fromNode.y - 4,
            r: 4,
          },
          style: {
            fill: lineColor,
          },
        });
        this.zr.add(circle);
      }
      if (fromInfo.triggerDirection === "down") {
        // 绘制终点的三角形
        const trianglePoints = [
          [toNode.x + this.flowData.rectWidth / 2, toNode.y], // 尖点
          [toNode.x + this.flowData.rectWidth / 2 - 6, toNode.y - 12], // 左底点
          [toNode.x + this.flowData.rectWidth / 2 + 6, toNode.y - 12], // 右底点
        ];
        const triangle = new zrender.Polygon({
          shape: {
            points: trianglePoints,
          },
          style: {
            fill: lineColor,
          },
        });
        this.zr.add(triangle);
      }
      // 绘制连线折现
      if (fromInfo.fromPoint === "up" && fromInfo.triggerDirection === "down") {
        const polylinePoints = [
          [fromNode.x + this.flowData.rectWidth / 2, fromNode.y - 4], // 起点）
          [fromNode.x + this.flowData.rectWidth / 2, fromNode.y - 17], // 拐点1（水平上移）
          [toNode.x + this.flowData.rectWidth / 2, fromNode.y - 17], // 拐点2（水平上移）
          [toNode.x + this.flowData.rectWidth / 2, toNode.y], // 终点
        ];
        const polyline = new zrender.Polyline({
          shape: {
            points: polylinePoints,
          },
          style: {
            stroke: lineColor,
            lineWidth: 2,
            lineDash: [2, 2],
          },
        });
        this.zr.add(polyline);
      }
      // 绘制驳回文字
      if (fromInfo.fromPoint === "up" && fromInfo.triggerDirection === "down") {
        // 节点文本
        const text = new zrender.Text({
          style: {
            text: "驳回",
            fontSize: 14,
            fill: lineColor,
            x: (fromNode.x + toNode.x) / 2 + this.flowData.rectWidth / 2 - 10,
            y: fromNode.y - 35,
          },
        });
        this.zr.add(text);
        // const textBound = text.getBoundingRect();
        // // 反算真正的“视觉居中”
        // text.attr("style", {
        //   x: textBound.x - textBound.width / 2,
        // });
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
        if (node.rejectFrom?.length) {
          node.rejectFrom.find((fromInfo) => {
            const fromNode = this.flowData.nodes.find(
              (n) => n.id === fromInfo.fromId
            );
            if (fromNode) this.drawRejectLine(fromNode, node, fromInfo);
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
  height: 550px;
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
