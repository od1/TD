<template>
  <nav>
    
    <div id="nav" class="dropdown-menu">
      <div href="#" class="dropdown-item" id="trackTitle">
        Titre : 
        <span>{{ trackInfo.title }}</span>
        <span> {{ trackInfo.duration | minutes }}</span>
      </div>
      <a href="#" v-show="!playing" class="dropdown-item" id="playPauseTrack" @click="playTrack()">Lecture</a>
      <a href="#" v-show="playing"  class="dropdown-item" id="playPauseTrack" @click="pauseTrack()">Pause</a>
      <a href="#" class="dropdown-item" id="nextTrack" @click="skipTrack('next')">Suivant</a>
      <a href="#" class="dropdown-item" id="prevTrack" @click="skipTrack('prev')">Précédent</a>
      <div class="dropdown-divider">--</div>
      <a href="#" class="dropdown-item">Démarche</a>
      <a href="#" class="dropdown-item">Ressources</a>
      <a href="#" class="dropdown-item">Presse</a> 
      <a href="#" class="dropdown-item">Contact</a>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Menu",
    props: {
      menuToggled: false,
      playing: Boolean,
      trackInfo: Object,
      progress: Number
    },
    data () {
      return {
        volume: 0.8,
        muted: false
      }
    },
    computed: {
      trackProgress () {
        return this.progress * 100
      },
    },
    created: function () {
      Howler.volume(this.volume)
    },
    methods: {
      toggle: function(event) {
        this.menuToggled = !this.menuToggled;
      },
      playTrack(index) {
        this.$emit('playtrack', index)
      },
      pauseTrack() {
        this.$emit('pausetrack')
      },
      skipTrack (direction) {
          this.$emit('skiptrack', direction)
      },
      updateSeek (event) {
        let el = document.querySelector(".progress-linear__bar"),
            mousePos = event.offsetX,
            elWidth = el.clientWidth,
            percents = (mousePos / elWidth) * 100
        this.$emit('updateseek', percents)
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dropdown-item {
    display: block;
  }
</style>
