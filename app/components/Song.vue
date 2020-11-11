<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Songs" />
    </ActionBar>

  <StackLayout>
    <ScrollView height="90%">
      <StackLayout height="100%">

      <ListView for="song in Songs" @itemTap="onItemTap">
        <v-template>
          <Label :text="song.name"></Label>
        </v-template>
      </ListView>
      </StackLayout>
    </ScrollView>
    <StackLayout>
      <Button text="Currently Playing" @tap="onCurrentlyPlaying"></Button>
    </StackLayout>
  </StackLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import SelectedPageService from "../shared/selected-page-service";
const app = require("../app");

import { getSongs } from "../shared/media-utils";
import NowPlaying from "./NowPlaying";


export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Song");
  },
  data() {
    return {
      Songs: getSongs(global.AlbumPath)
    };
  },
  computed: {},
  methods: {
    onItemTap(event) {
      global.playerOptions.audioFile = event.item.path;
      global.SongName = event.item.name;
      global.player.playFromFile(global.playerOptions);
    },
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onCurrentlyPlaying() {
      this.$navigateTo(NowPlaying, {});
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
