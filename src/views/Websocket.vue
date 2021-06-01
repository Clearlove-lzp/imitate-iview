<!-- websocket封装 -->
<template>
  <div>websocket封装</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { websocketFactory } from '@/components/mixins/websocketFactory.js'
export default {
  props: {},
  mixins: [websocketFactory],
  data () {
    return {
      wsuri: "ws://198.103.124.112:8080/ws" // 替换mixin里面的wsuri
    };
  },
  components: {},
  computed: {},
  methods: {
  },
  watch: {},
  mounted() {
    // eslint-disable-next-line no-console
    // websocketFactory
  },
  created() {},
}
</script>

<style scoped>
</style>