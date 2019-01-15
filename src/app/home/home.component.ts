import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { ActivatedRoute } from "@angular/router";
import * as firebase from "nativescript-plugin-firebase";
import { EmployeeList } from "~/app/home/employeelist.model";

// const employees = ["Lethabo", "Siyabonga", "Amogelang", "Siyabonga", "Bandile", "Blessing",
//     "Lubanzi", "Siphesihle", "Ndlovu"];

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    user: string;
    employees: Array<EmployeeList>;
    loader = new LoadingIndicator();

    constructor(private route: ActivatedRoute) {
        this.employees = [];

        // for (const employee of employees) {
        //     this.employees.push(new EmployeeList(employee));
        // }
    }

    onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
    }

    ngOnInit(): void {
        this.loader.show();
        console.log("getting data...");
        firebase.firestore.collection("cleaners")
            .get()
            .then((query) => {
                query.forEach((doc) => {
                    console.log(doc.data());
                    this.employees.push(doc.data().name);
                    this.loader.hide();
                });
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
