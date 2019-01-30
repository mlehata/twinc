import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListView } from "ui/list-view";
import { Page } from "ui/page";

import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
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

    constructor(private route: ActivatedRoute, public page: Page, private ngZone: NgZone,
                private change: ChangeDetectorRef, private router: Router) {
        this.employees = [];
        // const listview: ListView = <ListView> this.page.getViewById("lvId");
        // listview.refresh();

        // for (const employee of employees) {
        //     this.employees.push(new EmployeeList(employee));
        // }
    }

    onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
        console.log(this.employees[args.index].id);
        this.router.navigate(["/home/checkin"], {
            queryParams: {
                id: this.employees[args.index].id,
                name: this.employees[args.index].name,
                surname: this.employees[args.index].surname
            }
        });
    }

    ngOnInit(): void {
        this.loader.show();
        console.log("getting data...");
        firebase.firestore.collection("cleaners")
            .get()
            .then((query) => {
                query.forEach((doc) => {
                    console.log(doc.data());
                    this.employees.push(new EmployeeList(doc.id, doc.data().name, doc.data().surname));
                    this.loader.hide();
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
