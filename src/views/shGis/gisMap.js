import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const colorlist = ["#1786F9", "#FF3B30", "#00B578", "#FFFF00"];
let map; // 地图

const initMap = (_map) => {
  // 初始化地图
  map = _map;
  // map.on("zoomend", () => {
  // });
};

// 打点
const initConfigMarks = (list, deviceClickFunc) => {
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [11, 40],
    popupAnchor: [2, -40],
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  if (list.length !== 0) {
    for (let i = 0; i < list.length; i++) {
      let marker = L.marker([list[i].latitude, list[i].longitude], {
        dept: list[i].dept,
      });
      marker.addTo(map);
      let deviceModal = document.getElementById("device-modal");
      let popup = L.popup({
        className: "popup-device",
        closeOnClick: false,
        maxWidth: 400,
        offset: [0, -30],
      }).setLatLng([list[i].latitude, list[i].longitude]);
      marker.on("click", () => {
        deviceModal.style.display = "block";
        popup.setContent(deviceModal);
        popup.openOn(map);
      });
    }
  }
};
export { map, initMap, initConfigMarks };
