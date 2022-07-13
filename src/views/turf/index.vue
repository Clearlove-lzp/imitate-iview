<!-- turf.js -->
<template>
  <div>
    <a href="https://turfjs.fenxianglu.n/" target="_blank">Turf.js中文网</a>
  </div>
</template>

<script>
import * as turf from '@turf/turf'
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
  mounted() {
    let points = turf.featureCollection([
      turf.point([120.207496,30.243664]),
      turf.point([120.0828,30.32405]),
      turf.point([120.207481,30.265329]),
      turf.point([120.207481,30.255329]),
      turf.point([120.197481,30.255329]),
    ]);

    let hulls = turf.convex(points);
    console.log(hulls.geometry.coordinates[0])
  },
  created() {},
}
</script>

<style scoped>
</style>