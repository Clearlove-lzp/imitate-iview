<template>
  <div class="gis-container">
    <MapView @render="mapRenderHandle"></MapView>
  </div>
</template>

<script>
import MapView from "./LMapSH.vue";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { initMap, initConfigMarks } from "./gisMap";

const colorlist = ["#1786F9", "#FF3B30", "#00B578", "#FFFF00"];
export default {
  props: {},
  data() {
    return {};
  },
  components: {
    MapView,
  },
  computed: {},
  methods: {
    mapRenderHandle(_map) {
      initMap(_map);
      initConfigMarks([
        { latitude: 31.131625214855486, longitude: 121.64296110168458 },
      ]);
    },
  },
  watch: {},
  mounted() {},
  created() {},
  destroyed() {},
};
</script>

<style scoped lang="less">
.gis-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
