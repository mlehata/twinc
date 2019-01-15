import { Component, OnInit } from "@angular/core";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Employee } from "../shared/employee.model";

import * as firebase from "nativescript-plugin-firebase";
import { error } from "tns-core-modules/trace";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    employee: Employee;
    loader = new LoadingIndicator();

    constructor() {
        this.employee = new Employee();
    }

    ngOnInit(): void {
        // this.loader.show();
    }

    addUser(): void {
        console.log("pressed");
        const twinc = firebase.firestore.collection("cleaners");
        twinc
            .add({
                name: this.employee.name,
                surname: this.employee.surname,
                age: this.employee.age,
                nationality: this.employee.nationality,
                contact: this.employee.contact,
                password: this.employee.password
            })
            .then(
            () => {
                alert("User added");
            },
            (e) => {
                alert({
                    title: "Error",
                    message: e,
                    okButtonText: "OK"
                });
            }
        );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
