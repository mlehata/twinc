import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { LoadingIndicator } from "nativescript-loading-indicator";
import { Page } from "tns-core-modules/ui/page";
import { User } from "../shared/user.model";

// const firebase = require("nativescript-plugin-firebase");

import * as firebase from "nativescript-plugin-firebase";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn = true;
    isLoading = false;
    loader = new LoadingIndicator();

    constructor(private router: Router, private page: Page) {
        this.user = new User();
        this.user.email = "asdfg@gmail.com";
        this.user.password = "asdfgh";
    }

    submit() {
        if (this.isLoggingIn) {
            this.isLoading = true;
            this.loader.show();
            this.login();
        } else {
            this.isLoading = true;
            this.loader.show();
            this.signUp();
        }
    }

    login() {
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: this.user.email,
                password: this.user.password
            }
        }).then(
            (result) => {
                console.log(result);
                this.isLoading = false;
                // JSON.stringify(result);
                const navigationExtras: NavigationExtras = {
                    queryParams: {
                        email: this.user.email
                    }
                };
                this.loader.hide();
                this.router.navigate(["/home"], navigationExtras);
            },
            (error) => {
                this.loader.hide();
                this.isLoading = false;
                alert({
                    title: "Sign in error",
                    message: error.message,
                    okButtonText: "OK"
                });
            }
        );
    }

    signUp() {
        firebase.createUser({
            email: this.user.email,
            password: this.user.password
        }).then(
            (user) => {
                this.loader.hide();
                this.isLoading = false;
                alert({
                    title: "User created",
                    message: "email: " + user.email,
                    okButtonText: "OK"
                });
                this.toggleDisplay();
            },
            (error) => {
                this.loader.hide();
                this.isLoading = false;
                alert({
                    title: "No user created",
                    message: error,
                    okButtonText: "OK"
                });
            }
        );
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
