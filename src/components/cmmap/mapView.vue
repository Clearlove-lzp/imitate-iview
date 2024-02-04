<!--  -->
<template>
  <div id="_gismap"></div>
</template>

<script>
import * as L from "leaflet";
import Proj from "proj4leaflet";
import "leaflet/dist/leaflet.css";
const crs3857 = L.CRS.EPSG3857;
const crs4326 = new Proj.CRS(
  "EPSG:4326",
  "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ",
  {
    origin: [-180, 90],
    resolutions: [
      1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125,
      0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125,
      0.001373291015625, 6.866455078125e-4, 3.4332275390625e-4,
      1.71661376953125e-4, 8.58306884765625e-5, 4.291534423828125e-5,
      2.1457672119140625e-5, 1.0728836059570312e-5, 5.364418029785156e-6,
      2.682209014892578e-6, 1.341104507446289e-6, 6.7055225372e-7,
    ],
  }
);

const defineCMLayer = (ak) =>
  L.TileLayer.extend({
    defaultWmtsParams: {
      service: "WMTS",
      request: "GetTile",
      version: "1.0.0",
      layer: "",
      style: "",
      tilematrixset: "",
      format: "image/jpeg",
    },
    initialize: function (a, b) {
      this._url = a;
      const c = {};
      const d = Object.keys(b);
      d.forEach((a) => {
        c[a.toLowerCase()] = b[a];
      });
      const e = L.extend({}, this.defaultWmtsParams);
      const f = c.tileSize || this.options.tileSize;
      e.width =
        c.detectRetina && L.Browser.retina
          ? (e.height = 2 * f)
          : (e.height = f);
      for (const g in c) {
        e[g] != null && g !== "matrixIds" && (e[g] = c[g]);
      }
      this.wmtsParams = e;
      this.matrixIds = b.matrixIds || this.getDefaultMatrix();
      L.setOptions(this, b);
    },
    onAdd: function (a) {
      this._crs = this.options.crs || a.options.crs;
      L.TileLayer.prototype.onAdd.call(this, a);
    },
    getTileUrl: function (coords) {
      this.wmtsParams.ak = ak;
      if (
        this._map.options.crs &&
        this._map.options.crs.code &&
        this._map.options.crs.code.indexOf("4326") !== -1
      ) {
        this.wmtsParams.tileMatrix =
          "EPSG:4326_" +
          this.wmtsParams.layer +
          ":" +
          this._tileZoom.toString();
        this.wmtsParams.tileMatrixSet = "EPSG:4326_" + this.wmtsParams.layer;
      } else if (
        this._map.options.crs &&
        this._map.options.crs.code &&
        this._map.options.crs.code.indexOf("3857") !== -1
      ) {
        this.wmtsParams.tileMatrix =
          "EPSG:3857_" +
          this.wmtsParams.layer +
          ":" +
          this._tileZoom.toString();
        this.wmtsParams.tileMatrixSet = "EPSG:3857_" + this.wmtsParams.layer;
      } else {
        this.wmtsParams.tileMatrix =
          this.wmtsParams.tileMatrixSet + ":" + this._tileZoom.toString();
      }
      const url = L.Util.template(this._url, { s: this._getSubdomain(coords) });
      const params = this.gisExtend(this.wmtsParams, {
        tileRow: coords.y,
        tileCol: coords.x,
      });
      return url + L.Util.getParamString(params);
    },
    setParams: function (a, b) {
      if (b) {
        this.redraw();
      }
      return L.extend(this.wmtsParams, a);
    },
    getDefaultMatrix: function () {
      const a = Array(22);
      for (let b = 0; b < 22; b++)
        a[b] = {
          identifier: "" + b,
          topLeftCorner: new L.LatLng(20037508.3428, -20037508.3428),
        };
      return a;
    },
    gisExtend(obj1, obj2) {
      for (const item in obj2) {
        obj1[item] = obj2[item];
      }
      return obj1;
    },
  });

let baseLayer, wxLayer, wxImgLayer;

let ak = "yyt";

export default {
  props: {
    baseMap: {
      type: String,
      default: "normal",
    },
  },
  data() {
    return {
      map: null,
    };
  },
  components: {},
  computed: {},
  methods: {
    async init() {
      const CMLayer = defineCMLayer(ak);

      baseLayer = new CMLayer(`/gisserver/gwc/service/wmts`, {
        layer: "ygistile",
        style: "default",
        tileMatrixSet: "EPSG:3857_ygistile",
        tileMatrix: "EPSG:3857_ygistile",
        format: "image/jpeg",
        maxZoom: 19,
        minZoom: 7,
      });

      wxLayer = new CMLayer(`/gisserver/gwc/service/wmts`, {
        layer: "ygisimgtile",
        style: "default",
        tileMatrixSet: "EPSG:4326_ygisimgtile",
        tileMatrix: "EPSG:4326_ygisimgtile",
        format: "image/jpeg",
        maxZoom: 19,
        minZoom: 7,
      });

      wxImgLayer = L.tileLayer.wms(`/gisserver/gisRes/wms?ak=${ak}`, {
        layers: "gis:IMAGE_IDENTIFICATION",
        format: "image/png",
        transparent: true,
        maxZoom: 19,
        minZoom: 7,
      });

      // 地图基础配置
      this.map = L.map("_gismap", {
        center: [30.22888111347636, 120.21088352993881],
        zoom: 8,
        crs: crs3857,
        attributionControl: false,
        zoomControl: false,
        keyboard: false,
      });
      this.map.addLayer(baseLayer);
      this.changeLayer(this.baseMap);
      this.$emit("render", this.map);
    },
    changeLayer(layer) {
      const center = this.map.getCenter();
      const zoom = this.map.getZoom();
      switch (layer) {
        case "normal":
          this.map.options.crs = crs3857;
          this.map.removeLayer(wxImgLayer);
          this.map.removeLayer(wxLayer);
          this.map.addLayer(baseLayer);
          break;
        case "wx":
          this.map.options.crs = crs4326;
          this.map.removeLayer(baseLayer);
          this.map.addLayer(wxLayer);
          this.map.addLayer(wxImgLayer);
      }
      this.map.setView(center, zoom);
    },
  },
  watch: {
    baseMap() {
      this.changeLayer(this.baseMap);
    },
  },
  mounted() {
    this.ak = "MTcwNjgMTAwMU1UY3dOamcxTVRrNE16VTNNaU0xTURBPQ__";
    this.init();
  },
  created() {},
};
</script>

<style scoped lang="less">
#_gismap {
  width: 100%;
  height: 100%;
}
</style>
