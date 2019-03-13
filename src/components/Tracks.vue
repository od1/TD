<template>
    <ul>
      <li 
          v-for="(track, index) in playlist" 
          :key="track.title"
          v-show="track.display"
          :class="[{selected: track === selectedTrack}, {even: index % 2 == 0}]">
          <a href="#" @click="selectTrack(track)" @dblclick="playTrack()" :class="{selected: track === selectedTrack}">
            <span>{{ index | numbers }} {{ track.artist }} - {{ track.title }}</span>
          </a>
          
          {{ track.howl.duration() | minutes }}
      </li>
    </ul>
</template>

<script>
  export default {
    name: "Tracks",
    props: {
      playlist: Array,
      selectedTrack: Object
    },
    methods: {
      selectTrack (track) {
        this.$emit('selecttrack', track)
      },
      playTrack(index) {
        this.$emit('playtrack', index)
      }
    } 
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .selected {
    background-color:  orange;
  }
</style>
