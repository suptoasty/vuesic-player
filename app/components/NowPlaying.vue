<template>
  <Page class="page">
    <StackLayout>
      <Label :text="SongTitle"></Label>
      <StackLayout orientation="horizontal">
        <Button text="Prev" @tap="onPrevSong"></Button>
        <Button id="Pause" text="Pause" @tap="onPauseSong"></Button>
        <Button text="Next" @tap="onSkipSong"></Button>
      </StackLayout>
      <Slider :value="SongProgress" minValue="0" :maxValue="SongDuration" @valueChange="onValueChanged"></Slider>
    </StackLayout>
  </Page>
</template>

<script>
import { getSongs } from "~/shared/media-utils";
import { MediaMetadataRetriever } from "nativescript-media-metadata-retriever";

export default {
  props: ["Album"],
  data() {
    return {
      SongTitle: "Song Title Here",
      Songs: getSongs(global.AlbumPath),
      SongDuration: 0.0,
      SongProgress: 0.0,
      player: global.player
    };
  },
  methods: {
    onSkipSong() {
      let index = 0;

      for (let i = 0; i < this.Songs.length; i++) {
        if (this.Songs[i].name == this.SongTitle) {
          index = i;
        }
      }

      let song = this.Songs[(index + 1) % this.Songs.length];
      global.playerOptions.audioFile = song.path;
      global.player.playFromFile(global.playerOptions);
      this.SongTitle = song.name;

      this.$root.$emit("SongChanged", "stuff");
    },
    onPrevSong() {
      let index = 0;

      for (let i = 0; i < this.Songs.length; i++) {
        if (this.Songs[i].name == this.SongTitle) {
          index = i;
        }
      }

      let newIndex = (index - 1) % this.Songs.length;
      if (newIndex <= -1) {
        newIndex = this.Songs.length - 1;
      }
      let song = this.Songs[newIndex];
      global.playerOptions.audioFile = song.path;
      global.player.playFromFile(global.playerOptions);
      this.SongTitle = song.name;
    },
    onPauseSong(event) {
      let player = global.player;
      let button = event.object;
      if (player.isAudioPlaying()) {
        player.pause();
        button.title = "Paused";
      } else {
        player.resume();
        button.title = "Playing";
      }
    },
    onValueChanged(event) {
      global.player.seekTo(event.object.value);
    },
    updateSlider() {}
  },
  beforeMount() {
    this.SongTitle = global.SongName;
    global.player.getAudioTrackDuration().then(response => {
      this.SongDuration = response;
    });
    console.log("Duration: "+this.SongDuration);
  },
  mounted() {
    this.$root.$on("SongChanged", (event) => {
      console.log("STUFF: "+event);
    })
  }
};
</script>

<style></style>
