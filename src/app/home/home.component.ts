import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { ActivatedRoute } from "@angular/router";
import * as firebase from "nativescript-plugin-firebase";
import { Country } from "~/app/home/country.model";

const employees = ["Lethabo", "Siyabonga", "Amogelang", "Siyabonga", "Bandile", "Blessing",
    "Lubanzi", "Siphesihle", "Ndlovu"];

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    user: string;
    countries: Array<Country>;

    constructor(private route: ActivatedRoute) {
        this.countries = [];

        for (const country of employees) {
            this.countries.push(new Country(country));
        }

        // this.route.queryParams.subscribe((params) => {
        //     console.log(params.email);
        //     this.user = params.email;
        // });
    }

    onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
    }

    ngOnInit(): void {
        // const twinc = firebase.firestore.collection("twinc");
        // twinc.get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        //     });
        // });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
