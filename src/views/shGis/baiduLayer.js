/**
 * leaflet百度地图图层
 */

import L from "leaflet";

const baiduSphericalMercator = {
  Vp: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
  Kj: [75, 60, 45, 30, 15, 0],
  Eu: [
    [
      1.410526172116255e-8, 898305509648872e-20, -1.9939833816331,
      200.9824383106796, -187.2403703815547, 91.6087516669843,
      -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2,
    ],
    [
      -7.435856389565537e-9, 8983055097726239e-21, -0.78625201886289,
      96.32687599759846, -1.85204757529826, -59.36935905485877,
      47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86,
    ],
    [
      -3.030883460898826e-8, 898305509983578e-20, 0.30071316287616,
      59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908,
      -3.29883767235584, 0.32710905363475, 6856817.37,
    ],
    [
      -1.981981304930552e-8, 8983055099779535e-21, 0.03278182852591,
      40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263,
      0.12923347998204, -0.04625736007561, 4482777.06,
    ],
    [
      3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14,
      23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273,
      0.03430082397953, -0.00466043876332, 2555164.4,
    ],
    [
      2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8,
      7.47137025468032, -353937994e-14, -0.02145144861037, -1234426596e-14,
      0.00010322952773, -323890364e-14, 826088.5,
    ],
  ],
  Tp: [
    [
      -0.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164,
      0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0,
      0x665d60f3742ca, 82.5,
    ],
    [
      0.0008277824516172526, 111320.7020463578, 647795574.6671607,
      -4082003173.641316, 10774905663.51142, -15171875531.51559,
      12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5,
    ],
    [
      0.00337398766765, 111320.7020202162, 4481351.045890365,
      -23393751.19931662, 79682215.47186455, -115964993.2797253,
      97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5,
    ],
    [
      0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245,
      992013.7397791013, -1221952.21711287, 1340652.697009075,
      -620943.6990984312, 144416.9293806241, 37.5,
    ],
    [
      -0.0003441963504368392, 111320.7020576856, 278.2353980772752,
      2485758.690035394, 6070.750963243378, 54821.18345352118,
      9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5,
    ],
    [
      -0.0003218135878613132, 111320.7020701615, 0.00369383431289,
      823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199,
      8.77738589078284, 0.37238884252424, 7.45,
    ],
  ],
  checkLng(f, b, c) {
    for (; f > c; ) {
      f -= c - b;
    }
    for (; f < b; ) {
      f += c - b;
    }
    return f;
  },
  checkLat(f, b, c) {
    b != (f = Math.max(f, b));
    c != (f = Math.min(f, c));
    return f;
  },
  Xr(h, b) {
    if (h && b) {
      let c = b[0] + b[1] * Math.abs(h.lng);
      let d = Math.abs(h.lat) / b[9];
      d =
        b[2] +
        b[3] * d +
        b[4] * d * d +
        b[5] * d * d * d +
        b[6] * d * d * d * d +
        b[7] * d * d * d * d * d +
        b[8] * d * d * d * d * d * d;
      c *= h.lng < 0 ? -1 : 1;
      d *= h.lat < 0 ? -1 : 1;
      return L.latLng(c, d);
    }
  },
  lngLatToPoint(h) {
    let b;
    let c;
    h.lng = this.checkLng(h.lng, -180, 180);
    h.lat = this.checkLat(h.lat, -74, 74);
    b = L.latLng(h.lat, h.lng);
    for (var d = 0; d < this.Kj.length; d++) {
      if (b.lat >= this.Kj[d]) {
        c = this.Tp[d];
        break;
      }
    }
    if (!c) {
      for (d = this.Kj.length - 1; d >= 0; d--) {
        if (b.lat <= -this.Kj[d]) {
          c = this.Tp[d];
          break;
        }
      }
    }
    h = this.Xr(h, c);
    return L.point(h.lat.toFixed(2), h.lng.toFixed(2));
  },
  pointToLngLat(h) {
    let b;
    let c;
    b = new L.latLng(Math.abs(h.y), Math.abs(h.x));
    for (let d = 0; d < this.Vp.length; d++) {
      if (b.lat >= this.Vp[d]) {
        c = this.Eu[d];
        break;
      }
    }
    const latlng = this.Xr(b, c);
    return L.latLng(latlng.lng.toFixed(6), latlng.lat.toFixed(6));
  },
  project(c) {
    const d = this.lngLatToPoint(c);
    return d;
  },
  unproject(b) {
    return this.pointToLngLat(b);
  },
  bounds: (function () {
    const f = 20037726.37;
    const h = -11708041.66;
    const g = 12474104.17;
    let j = L.bounds([-f, h], [f, g]);
    const i = 33554432;
    j = new L.Bounds([-i, -i], [i, i]);
    return j;
  })(),
};

L.CRS.BEPSG3857 = L.extend({}, L.CRS.EPSG3857, {
  code: "EPSG:3857",
  projection: baiduSphericalMercator,
  transformation: (function () {
    const c = -18 - 8;
    const d = Math.pow(2, c);
    return new L.Transformation(d, 0.5, -d, 0.5);
  })(),
});

L.TileLayer.BaiduLayer = L.TileLayer.extend({
  statics: {
    attribution:
      '© 2014 Baidu - GS(2012)6003;- Data © <a target="_blank" href="http://www.navinfo.com/">NavInfo</a> & <a target="_blank" href="http://www.cennavi.com.cn/">CenNavi</a> & <a target="_blank" href="http://www.365ditu.com/">DaoDaoTong</a>',
  },
  options: {
    minZoom: 3,
    maxZoom: 19,
  },
  initialize(m, h) {
    let j = null;
    if (L.mapStyle == "blue") {
      j = L.TileLayer.BaiduLayer.descBlue;
    } else {
      j = L.TileLayer.BaiduLayer.desc;
    }

    m = m || "Normal.Map";
    const k = m.split(".");
    const n = k[0];
    const l = k[1];
    const i = j[n][l];
    h = h || {};
    h.subdomains = j.subdomains;
    h.attribution = L.TileLayer.BaiduLayer.attribution;
    L.TileLayer.prototype.initialize.call(this, i, h);
  },
  getTileUrl(j) {
    const i = Math.pow(2, j.z - 1);
    const g = j.x - i;
    const h = i - j.y - 1;
    const f = L.point(g, h);
    f.z = j.z;
    return L.TileLayer.prototype.getTileUrl.call(this, f);
  },
});

L.TileLayer.BaiduLayer.desc = {
  Normal: {
    Map: "http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl",
  },
  Satellite: {
    Map: "http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",
    Road: "http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl",
  },
  customLayerSQ: {
    Map: "http://10.8.132.221/jslib/Tiles/baidu/{z}/{x}/{y}.jpg",
  },
  customLayerSat: {
    Map: "http://10.8.132.221/inasmap/Tiles/baidu/jsmap/weixing/{z}/{x}/{y}.jpg",
    Road: "http://10.8.132.221/inasmap/Tiles/baidu/jsmap/luwang/{z}/{x}/{y}.jpg",
  },
  customLayerJS: {
    Map: "http://10.8.132.221/inasmap/Tiles/baidu/jsmap/changgui/{z}/{x}/{y}.jpg",
  },
  customLayerDSN: {
    Map: "http://10.221.247.27:8080/sh/tilesDSN/newPics/{z}/{x}/{y}.jpg",
  },
  customLayerNormalSH: {
    Map: "http://10.221.71.221:8080/sh/tilesBaidu/changgui/{z}/{x}/{y}.jpg",
  },
  customLayerSatSH: {
    Map: "http://10.221.71.221:8080/sh/tilesBaidu/weixing/{z}/{x}/{y}.jpg",
    Road: "http://10.221.71.221:8080/sh/tilesBaidu/luwang/{z}/{x}/{y}.jpg",
  },
  subdomains: "0123456789",
};

L.TileLayer.BaiduLayer.descBlue = {
  Normal: {
    Map: "http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl",
  },
  Satellite: {
    Map: "http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",
    Road: "http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl",
  },
  customLayerSQ: {
    Map: "http://10.8.132.221/jslib/Tiles/baidu/{z}/{x}/{y}.jpg",
  },
  customLayerSat: {
    Map: "http://10.8.132.221/inasmap/Tiles/baidu/jsmap/weixing/{z}/{x}/{y}.jpg",
    Road: "http://10.8.132.221/inasmap/Tiles/baidu/jsmap/luwang/{z}/{x}/{y}.jpg",
  },
  customLayerJS: {
    Map: "http://10.221.213.85:8080/shjkws/wuyelan/{z}/{x}/{y}.jpg",
  },
  customLayerDSN: {
    Map: "http://10.221.247.27:8080/sh/tilesDSN/newPics/{z}/{x}/{y}.jpg",
  },
  customLayerNormalSH: {
    Map: "http://10.221.213.85:8080/shjkws/wuyelan/{z}/{x}/{y}.jpg",
  },
  customLayerSatSH: {
    Map: "http://10.221.71.221:8080/sh/tilesBaidu/weixing/{z}/{x}/{y}.jpg",
    Road: "http://10.221.71.221:8080/sh/tilesBaidu/luwang/{z}/{x}/{y}.jpg",
  },
  subdomains: "0123456789",
};

L.tileLayer.baiduLayer = function (c, d) {
  return new L.TileLayer.BaiduLayer(c, d);
};

function wgs84togcj02(k, j) {
  const d = (3.141592653589793 * 3e3) / 180;
  const n = 3.141592653589793;
  const m = 6378245;
  const f = 0.006693421622965943;
  let g = transformlat(k - 105, j - 35);
  let i = transformlng(k - 105, j - 35);
  const b = (j / 180) * n;
  let l = Math.sin(b);
  l = 1 - f * l * l;
  const h = Math.sqrt(l);
  g = (g * 180) / (((m * (1 - f)) / (l * h)) * n);
  i = (i * 180) / ((m / h) * Math.cos(b) * n);
  const c = j + g;
  const e = k + i;
  return [e, c];
}

function transformlat(e, g) {
  const f = (3.141592653589793 * 3e3) / 180;
  const h = 3.141592653589793;
  const c = 6378245;
  const b = 0.006693421622965943;
  let d =
    -100 +
    2 * e +
    3 * g +
    0.2 * g * g +
    0.1 * e * g +
    0.2 * Math.sqrt(Math.abs(e));
  d += ((20 * Math.sin(6 * e * h) + 20 * Math.sin(2 * e * h)) * 2) / 3;
  d += ((20 * Math.sin(g * h) + 40 * Math.sin((g / 3) * h)) * 2) / 3;
  d += ((160 * Math.sin((g / 12) * h) + 320 * Math.sin((g * h) / 30)) * 2) / 3;
  return d;
}

function transformlng(e, g) {
  const f = (3.141592653589793 * 3e3) / 180;
  const h = 3.141592653589793;
  const c = 6378245;
  const b = 0.006693421622965943;
  let d =
    300 + e + 2 * g + 0.1 * e * e + 0.1 * e * g + 0.1 * Math.sqrt(Math.abs(e));
  d += ((20 * Math.sin(6 * e * h) + 20 * Math.sin(2 * e * h)) * 2) / 3;
  d += ((20 * Math.sin(e * h) + 40 * Math.sin((e / 3) * h)) * 2) / 3;
  d += ((150 * Math.sin((e / 12) * h) + 300 * Math.sin((e / 30) * h)) * 2) / 3;
  return d;
}

L.gcj02tobd09 = function (i, h) {
  const e = (3.141592653589793 * 3e3) / 180;
  const k = 3.141592653589793;
  const j = 6378245;
  const f = 0.006693421622965943;
  const g = Math.sqrt(i * i + h * h) + 2e-5 * Math.sin(h * e);
  const b = Math.atan2(h, i) + 3e-6 * Math.cos(i * e);
  const d = g * Math.cos(b) + 0.0065;
  const c = g * Math.sin(b) + 0.006;
  return [d, c];
};

function bd09togcj02(f, b) {
  const i = (3.141592653589793 * 3e3) / 180;
  const h = f - 0.0065;
  const g = b - 0.006;
  const e = Math.sqrt(h * h + g * g) - 2e-5 * Math.sin(g * i);
  const a = Math.atan2(g, h) - 3e-6 * Math.cos(h * i);
  const d = e * Math.cos(a);
  const c = e * Math.sin(a);
  return [d, c];
}

function gcj02towgs84(k, j) {
  const d = (3.141592653589793 * 3e3) / 180;
  const n = 3.141592653589793;
  const m = 6378245;
  const f = 0.006693421622965943;
  let g = transformlat(k - 105, j - 35);
  let i = transformlng(k - 105, j - 35);
  const b = (j / 180) * n;
  let l = Math.sin(b);
  l = 1 - f * l * l;
  const h = Math.sqrt(l);
  g = (g * 180) / (((m * (1 - f)) / (l * h)) * n);
  i = (i * 180) / ((m / h) * Math.cos(b) * n);
  const c = j + g;
  const e = k + i;
  return [k * 2 - e, j * 2 - c];
}

function bd09towgs84(a, c) {
  const b = bd09togcj02(a, c);
  return gcj02towgs84(b[0], b[1]);
}
