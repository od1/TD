<template>
    <l-map
    ref="map"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :max-bounds="maxBounds"
    :crs="crs" 
    class="map">
    <l-image-overlay
      :url="url"
      :bounds="bounds"
      />
    <l-marker 
      v-for="(track, index) in playlist"
        @click="selectTrack(track); playTrack()" 
        :lat-lng="track"
        :key="track.title" >
        <l-icon 
          :icon-size="[24, 24]"
          class-name="marker-icon"
          icon-url="https://uploads.codesandbox.io/uploads/user/2c43d101-5d2a-4fa1-b07c-6763022ce436/zJaE-button_play_1-512.png"
          >
        </l-icon>
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LImageOverlay, LMarker, LIcon } from 'vue2-leaflet';
export default {
  name: 'Map',
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LIcon
  },
  props: {
    playlist: Array,
    playing: Boolean,
    selectedTrack: Object
  },
  data () {
    return {
      url: 'https://uploads.codesandbox.io/uploads/user/2c43d101-5d2a-4fa1-b07c-6763022ce436/T9w0-landscape.jpg',
      bounds: [[0, 0], [1377, 2947]],
      maxBounds: [[0, 0], [1377, 2947]],
      minZoom: -1,
      maxZoom: 2,
      crs: L.CRS.Simple
    };
  },
  methods: {
    selectTrack (track) {
      this.$emit('selecttrack', track)
    },
    playTrack(index) {
      this.$emit('playtrack', index)
    }
  }, 
  mounted () {
    this.$refs.map.mapObject.setView([800, 1200], -1);
  },
  watch: {
    selectedTrack: function (val) {
      this.$refs.map.fitBounds([[val.lat, val.lng], [val.lat, val.lng]])
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  .someExtraClass {
    background-color: aqua;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 0 20px 20px 20px;
    box-shadow: 5px 3px 10px rgba(0,0,0,0.2);
    text-align: center;
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
  }
</style>