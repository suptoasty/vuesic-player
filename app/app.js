import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import { getSongs } from "~/shared/media-utils";

Vue.use(RadSideDrawer);

import Vuex from "vuex";
Vue.use(Vuex);
Vue.config.silent = TNS_ENV === "production";

let vue = new Vue({
    render(h) {
        return h(App, [
            h(DrawerContent, { slot: "drawerContent" }),
            h(Home, { slot: "mainContent" })
        ]);
    }
}).$start();

const audio = require("nativescript-audio-player");
global.ArtistName = "";
global.AlbumPath = "";
global.SongName = "";
global.player = new audio.TNSPlayer();
global.playerOptions = {
    audioFile:
        "https://upload.wikimedia.org/wikipedia/commons/f/f3/Anthem_of_Europe_%28US_Navy_instrumental_short_version%29.ogg",
    loop: false,
    completeCallback: async function() {
        console.log("Finished Playing!"+global.AlbumPath);
        let Songs = await getSongs(global.AlbumPath);

        let index = 0;
        for (let i = 0; i < Songs.length; i++) {
            if (Songs[i].name == global.SongName) {
                index = i;
            }
        }
        
        let song = Songs[(index + 1) % Songs.length];
        global.playerOptions.audioFile = song.path;
        global.player.playFromFile(global.playerOptions);
        vue.$root.$emit("SongChanged", "stuff");
    },
    errorCallback: function(errorObject) {
        console.log(JSON.stringify(errorObject));
    },
    infoCallback: function(args) {
        console.log(JSON.stringify(args));
    }
};

