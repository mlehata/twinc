import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { User } from "../../shared/user.model";

import * as firebase from "nativescript-plugin-firebase";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EmployeeList } from "~/app/home/employeelist.model";

export class Check {
    constructor(public id: string, public lat: number, public long: number) { }
}

@Component({
    moduleId: module.id,
    selector: "ns-checkin",
    templateUrl: "checkin.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckinComponent implements OnInit {

    employee: Array<Check>;
    employeeId: string;
    employeeName: string;
    employeeSurname: string;

    constructor(private router: Router, private page: Page, private ngZone: NgZone,
                private change: ChangeDetectorRef, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((params) => {
            this.employeeId = params.id;
            this.employeeName = params.name;
            this.employeeSurname = params.surname;
        });
        this.employee = [];
    }

    ngOnInit() {
        console.log("getting data...");
        firebase.firestore.collection("clockin")
            .where("id", "==", this.employeeId)
            .get()
            .then((query) => {
                    query.forEach((doc) => {
                        console.log(doc.data());
                        this.employee.push(new Check(doc.id,
                            doc.data().location.latitude.toFixed(3), doc.data().location.longitude.toFixed(3)));
                    });
                    this.ngZone.run(() => {
                        this.change.detectChanges();
                    });
                },
                (e) => {
                    alert("Error fetching employees");
                });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
