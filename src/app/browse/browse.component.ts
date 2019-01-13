import { Component, OnInit } from "@angular/core";
import * as geolocation from "nativescript-geolocation";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Accuracy } from "ui/enums";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        geolocation.enableLocationRequest().then(
            () => {
                console.log("Location enabled");
            },
            (e) => {
                console.log("Error: " + e.message);
            }
        );
    }

    buttonGetLocationTap() {
        const location = geolocation.getCurrentLocation({
            desiredAccuracy: 3,
            updateDistance: 10,
            maximumAge: 20000,
            timeout: 20000
        }).then(
            (loc) => {
                if (loc) {
                    console.log("Current location is: Latitude " + loc.latitude + ", Longitude " + loc.longitude);
                }
            },
            (e) => {
                console.log("Error: " + e.message);
            }
        );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
