import { Observable } from "@nativescript/core";

const fileSystemModule = require("tns-core-modules/file-system");
const documents = fileSystemModule.knownFolders.documents();
const music = fileSystemModule.knownFolders.currentApp().getFolder("assets");

export function getArtists() {
    let arr = [];

    music
        .getEntities()
        .then(entities => {
            entities.forEach(entity => {
                arr.push(entity);
            });
        })
        .catch(err => {
            console.log(err.stack);
        });

    return arr;
}

export function getAlbums(artist) {
    let arr = [];

    let artistFolder = music.getFolder(artist);
    artistFolder
        .getEntities()
        .then(entities => {
            entities.forEach(entity => {
                arr.push(entity);
            });
        })
        .catch(err => {
            console.log(err.stack);
        });

    return arr;
}

export function getSongs(album) {
    let arr = [];

    let albumFolder = fileSystemModule.Folder.fromPath(album);
    albumFolder
        .getEntities()
        .then(entities => {
            entities.forEach(entity => {
                arr.push(entity);
            });
        })
        .catch(err => {
            console.log(err.stack);
        });

    return arr;
}
