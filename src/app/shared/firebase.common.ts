import * as firebase from "nativescript-plugin-firebase";

export function initFirebase() {
    firebase.init({
        persist: false
    }).then((instance) => console.log("firebase.init done"),
        (error) => console.log("firebase.init error: " + error));
}
