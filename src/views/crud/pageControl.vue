<!-- 分页器 -->
<template>
  <div class="page">
    <Page :total="pageInfo.total" :current="pageInfo.current" :page-size="pageInfo.pageSize" @on-change="(value) => {pageInfo.current = value; queryHandler()}" @on-page-size-change="pageInfo.pageSize = value; queryHandler()" show-sizer  show-total/>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      pageInfo: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  components: {},
  computed: {},
  methods: {
    queryHandler() {}
  },
  watch: {},
  mounted() {},
  created() {},
}
</script>

<style scoped>
.page{
  margin-top: 10px;
  text-align: right;
}
</style>