import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CheckinComponent } from "~/app/home/checkin/checkin.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "checkin", component: CheckinComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
