<!-- 流程图 -->
<template>
  <div>
    <canvas width="400" height="300" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      canvas: null,
      context: null,
      path1: null,
      path2: null,
    };
  },
  components: {},
  computed: {},
  methods: {
    init() {
      this.canvas = this.$refs.canvas;
      this.context = this.canvas.getContext("2d");
      this.path1 = new Path2D();
      this.path1.rect(150, 40, 100, 40);
      this.context.fillStyle = 'skyBlue';
      this.context.fill(this.path1)


      this.context.fillStyle = 'black';
      this.context.fillText('一键冲突检测',170, 62)
      
      
      this.path2 = new Path2D();
      this.path2.rect(150, 240, 100, 40);
      this.context.fillStyle = '#8bc34a';
      this.context.fill(this.path2)

      
      this.context.fillStyle = 'black';
      this.context.fillText('检测通过',180, 262)


      this.context.beginPath(); 
      this.context.moveTo(50, 140); 
      this.context.lineTo(10, 160); 
      this.context.lineTo(50, 180); 
      this.context.lineTo(90, 160); 
      this.context.lineTo(50, 140);
      this.context.strokeStyle = "green";
      this.context.fillStyle = "green"; 
      this.context.fill();
      this.context.closePath()
      this.context.stroke();

      this.context.beginPath(); 
      this.context.moveTo(200, 140); 
      this.context.lineTo(160, 160); 
      this.context.lineTo(200, 180); 
      this.context.lineTo(240, 160); 
      this.context.lineTo(200, 140);
      this.context.strokeStyle = "green";
      this.context.fillStyle = "green"; 
      this.context.fill(); 
      this.context.stroke();

      this.context.beginPath(); 
      this.context.moveTo(350, 140); 
      this.context.lineTo(310, 160); 
      this.context.lineTo(350, 180); 
      this.context.lineTo(390, 160); 
      this.context.lineTo(350, 140);
      this.context.strokeStyle = "green";
      this.context.fillStyle = "green"; 
      this.context.fill(); 
      this.context.stroke();


      this.context.beginPath(); 
      this.context.moveTo(200, 80); 
      this.context.lineTo(200, 140); 
      this.context.strokeStyle = "black";
      this.context.stroke();

      this.context.beginPath(); 
      this.context.moveTo(200, 80); 
      this.context.lineTo(50, 140); 
      this.context.strokeStyle = "black";
      this.context.stroke();

      this.context.beginPath(); 
      this.context.moveTo(200, 80); 
      this.context.lineTo(350, 140); 
      this.context.strokeStyle = "black";
      this.context.stroke();


      this.context.beginPath(); 
      this.context.moveTo(50, 180); 
      this.context.lineTo(200, 240); 
      this.context.strokeStyle = "black";
      this.context.stroke();

      this.context.beginPath(); 
      this.context.moveTo(200, 180); 
      this.context.lineTo(200, 240); 
      this.context.strokeStyle = "black";
      this.context.stroke();

      this.context.beginPath(); 
      this.context.moveTo(350, 180); 
      this.context.lineTo(200, 240); 
      this.context.strokeStyle = "black";
      this.context.stroke();

      this.canvas.addEventListener('click', (e) => {
        console.log(e.offsetX, e.offsetY)
        // console.log(this.context.isPointInPath(e.offsetX, e.offsetY)) // 只使用于最后一笔。并且不能用于直接矩形填充的
        console.log(this.context.isPointInPath(this.path1, e.offsetX, e.offsetY)) // 分path1和2,具体定位到某一笔
        console.log(this.context.isPointInPath(this.path2, e.offsetX, e.offsetY))
      })
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  created() {},
}
</script>

<style scoped>
canvas{
  border: 1px solid #000;
}
</style>