<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Albums" />
    </ActionBar>

    <StackLayout>

    <ScrollView height="90%">
      <StackLayout  height="100%">

      <ListView for="album in Albums" @itemTap="onItemTap">
        <!-- @tap="onItemTap(item, $event)" -->
        <v-template>
          <Label :text="album.name"></Label>
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
import { getAlbums } from "~/shared/media-utils";
import Song from "./Song";
import NowPlaying from "./NowPlaying";


export default {
  props: ["Artist"],
  data() {
    return {
      Albums: getAlbums(global.ArtistName)
    };
  },
  methods: {
    onItemTap(event) {
      global.AlbumPath = event.item.path;
      this.$navigateTo(Song);
    },
    onTap(item, event) {
      console.log("ITEM: " + item + " EVENT: " + event);
    },
    onCurrentlyPlaying() {
      this.$navigateTo(NowPlaying, {});
    }
  },
  created() {}
};
</script>

<style></style>
