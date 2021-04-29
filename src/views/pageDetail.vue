<!-- 详情页 -->
<template>
  <div class="imitate-table">
    <table>
      <tr>
        <td>111</td>
        <td>22</td>
        <td>33</td>
        <td>44</td>
      </tr>
      <tr>
        <td>55</td>
        <td>66</td>
        <td>77</td>
        <td>88</td>
      </tr>
      <tr>
        <td>99</td>
        <td>00</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
  created() {},
}
</script>

<style scoped lang="stylus">
.imitate-table{
  width: 1000px;
  table{
    border-collapse: collapse;
    width: 100%;
    tr{
      width: 100%;
      td{
        border: 1px solid #ddd;
        text-align: left;
        padding: 5px 10px;
        &:nth-of-type(1) {
          background-color: #eee;
          width: 200px;
          text-align:right;
          font-weight: bold;
        }
        &:nth-of-type(2) {
          border-left: none;
          text-align:left;
          width: calc(50vw - 200px);
          word-break: break-all;
        }
        &:nth-of-type(3) {
          background-color: #eee;
          width: 200px;
          text-align:right;
          font-weight: bold;
        }
        &:nth-of-type(4) {
          border-left: none;
          text-align:left;
          width: calc(50vw - 200px);
        }
      }
    }
  }
}
</style>