<template>
  <div ref="mapRef" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref, onMounted } from "@vue/composition-api";
import "./baiduLayer";

const emit = defineEmits(["render"]);

const mapRef = ref(null);

onMounted(() => {
  const _southWest = L.latLng(31.959115, 122.3702);
  const _northEast = L.latLng(30.237952, 120.753598);
  const _bounds = L.latLngBounds(_southWest, _northEast);
  const map = L.map(mapRef.value, {
    minZoom: 11,
    maxZoom: 18,
    crs: L.CRS.BEPSG3857,
    contextmenu: true,
    maxBounds: _bounds,
    zoomControl: false,
    attributionControl: false,
  }).setView([31.147534, 121.663992], 14);

  L.tileLayer.baiduLayer("customLayerNormalSH.Map").addTo(map);

  emit("render", map);
});
</script>

<style scoped></style>
