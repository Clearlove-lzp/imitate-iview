<template>
  <div :class="cardClass">
    <Card></Card>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },
  components: {},
  computed: {
    cardClass() {
      return `left-card${this.visible ? "" : " left-card-close"}`;
    },
  },
  methods: {},
  watch: {},
  mounted() {},
  created() {},
  destroyed() {},
};
</script>

<style scoped lang="less">
.left-card {
  position: absolute;
  top: 60px;
  left: 8px;
  width: 720px;
  height: 200px;
  z-index: 100;
  transition: left linear 0.36s;
}
.left-card-close {
  left: -720px;
}
</style>
