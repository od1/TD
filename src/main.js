import Vue from "vue";

import { Howl, Howler } from 'howler'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import App from "./App.vue";

Vue.config.productionTip = false;

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl; 

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.filter('numbers', (value) => {
  let number = value + 1
  if (number < 10) {
    return "0" + number + "."
  }
  return number + "."
})

Vue.filter('minutes', (value) => {
  if (!value || typeof value !== "number") return "00:00"
  let min = parseInt(value / 60),
    sec = parseInt(value % 60)
  min = min < 10 ? "0" + min : min
  sec = sec < 10 ? "0" + sec : sec
  value = min + ":" + sec
  return value
})

new Vue({
  render: h => h(App)
}).$mount("#app");
