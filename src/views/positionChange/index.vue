<!-- 坐标转换 -->
<template>
  <div>
    <p>GCJ-02 to BD-09</p>
    <p>经度：{{ GCJ02[0] }} 纬度：{{ GCJ02[1] }}</p>
    <p>经度：{{ GCJ02toBD09.lng }} 纬度：{{ GCJ02toBD09.lat }}</p>
  </div>
</template>

<script>
import coordinateTrans from "./coordinateTrans.js";
export default {
  props: {},
  data() {
    return {
      GCJ02: [116.81460846874998, 39.69286632191952],
    };
  },
  components: {},
  computed: {
    GCJ02toBD09() {
      return coordinateTrans.bd_encrypt(this.GCJ02[1], this.GCJ02[0]);
    },
  },
  methods: {},
  watch: {},
  mounted() {},
  created() {},
};
</script>

<style scoped>
</style>