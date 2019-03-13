<template>
  <div id="app">
    <Menu 
      :trackInfo="getTrackInfo"
      :progress="progress"
      :playing="playing"
      @playtrack="play"
      @pausetrack="pause"
      @stoptrack="stop"
      @skiptrack="skip"
      @updateseek="setSeek"
    />

    <div id="content">
      <Map 
        :playlist="playlist"
        :playing="playing"
        :selectedTrack="selectedTrack"
        @selecttrack="selectTrack"
        @playtrack="play"
      />
      <Tracks 
        :playlist="playlist"
        :selectedTrack="selectedTrack"
        @selecttrack="selectTrack"
        @playtrack="play"
      />
    </div>
  </div>
</template>

<script>
  import Menu from "./components/Menu";
  import Tracks from "./components/Tracks";
  import Map from "./components/Map";
  

  export default {
    name: "App",
    components: {
      Menu,
      Tracks,
      Map
    },
    data () {
      return {
        playlist: [
          {title: "carnet de bal", artist: "", file:"./playlist/Going_Up_the_Country.mp3", howl: null, display: true, lng: 1580.2, lat: 911.0 },
          {title: "marcher ensemble", artist: "", file:"./playlist/Tonight_Belong_to_Me.mp3", howl: null, display: true, lng: 1350.6, lat: 1070.1 }
        ],
        selectedTrack: null,
        index: 0,
        playing: false,
        seek: 0
      }
    },
    computed: {
      currentTrack () {
        return this.playlist[this.index]
      },
      progress () {
        if (this.currentTrack.howl.duration() === 0) return 0
        return this.seek / this.currentTrack.howl.duration()
      },
      getTrackInfo () {
        let artist = this.currentTrack.artist,
            title = this.currentTrack.title,
            file = this.currentTrack.file,
            seek = this.seek,
            duration = this.currentTrack.howl.duration()
        return {
          artist,
          title,
          file,
          seek,
          duration
        }
      }
    },
    watch: {
      playing(playing) {
        this.seek = this.currentTrack.howl.seek()
        let updateSeek
        if (playing) {
          updateSeek = setInterval(() => {
            this.seek = this.currentTrack.howl.seek()
          }, 250)
        } else {
          clearInterval(updateSeek)
        }
      },
    },
    created: function () {
      this.playlist.forEach( (track) => {
        track.howl = new Howl({
          src: track.file,
          onend: () => {
            if (this.loop) {
              this.play(this.index)
            } else {
              this.skip('next')
            }
          }
        })
      })
    },
    methods: {
      selectTrack (track) {
        this.selectedTrack = track
      },
      play (index) {
        let selectedTrackIndex = this.playlist.findIndex(track => track === this.selectedTrack)

        if (typeof index === 'number') {
          index = index
        } else if (this.selectedTrack) {
          if (this.selectedTrack != this.currentTrack) {
            this.stop()
          }
          index = selectedTrackIndex
        } else {
          index = this.index
        }

        let track = this.playlist[index].howl

        if (track.playing()) {
          track.pause()
        } else {
          track.play()
        }
        
        this.selectedTrack = this.playlist[index]
        this.playing = true
        this.index = index
      },
      pause () {
        this.currentTrack.howl.pause()
        this.playing = false
      },
      stop () {
        this.currentTrack.howl.stop()
        this.playing = false
      },
      skip (direction) {
        let index = 0,
            lastIndex = this.playlist.length - 1

        if (this.shuffle) {
          index = Math.round(Math.random() * lastIndex)
          while (index === this.index) {
            index = Math.round(Math.random() * lastIndex)
          }
        } else if (direction === "next") {
          index = this.index + 1
          if (index >= this.playlist.length) {
            index = 0
          }
        } else {
          index = this.index - 1
          if (index < 0) {
            index = this.playlist.length - 1
          }
        }

        this.skipTo(index)
      },
      skipTo (index) {
        if (this.currentTrack) {
          this.currentTrack.howl.stop()
        }

        this.play(index)
      },
      setSeek (percents) {
        let track = this.currentTrack.howl

        if (track.playing()) {
          track.seek((track.duration() / 100) * percents)
        }
      }
    }
  };
</script>

<style>
  #app {
  }
  nav {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 5;
    background:  rgba(255, 255, 255, 0.8);
  }
  #content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    overflow-x: auto;
  }
</style>
