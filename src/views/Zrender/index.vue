<template>
  <div class="process-container">
    <ProcessStep></ProcessStep>
    <ProcessMain></ProcessMain>
    <ProcessDetail></ProcessDetail>
  </div>
</template>

<script>
  import ProcessMain from "./processMain.vue";
  import ProcessStep from "./processStep.vue";
  import ProcessDetail from "./processDetail.vue";
  import "./index.less";
  // 4种状态：0 未开始、1 处理中、2 已完成、3 任务驳回；不同状态不同颜色
  export default {
    data() {
      return {};
    },
    components: { ProcessStep, ProcessDetail, ProcessMain },
    mounted() {},
    methods: {},
  };
</script>

<style scoped lang="less"></style>
