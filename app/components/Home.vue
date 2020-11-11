<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Home" />
    </ActionBar>

    <StackLayout>
      <ScrollView height="90%">
        <StackLayout height="100%">
          <ListView for="artist in Artists" @itemTap="onItemTap">
            <v-template>
              <Label :text="artist.name"></Label>
            </v-template>
          </ListView>
        </StackLayout>
      </ScrollView>
      <StackLayout orientation="horizontal">
        <Button text="Currently Playing" @tap="onCurrentlyPlaying"></Button>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import SelectedPageService from "../shared/selected-page-service";
const app = require("../app");

import Album from "./Album";
import NowPlaying from "./NowPlaying";

import { getAlbums, getArtists } from "../shared/media-utils";

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
  },
  data() {
    return {
      Artists: []
    };
  },
  computed: {},
  methods: {
    onItemTap(event) {
      global.ArtistName = event.item.name;
      this.$navigateTo(Album, {
        props: { Artist: [{ name: "Test" }, { name: "This is" }] }
      });
    },
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onCurrentlyPlaying() {
      this.$navigateTo(NowPlaying, {});
    }
  },
  created() {
    this.Artists = getArtists();
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
