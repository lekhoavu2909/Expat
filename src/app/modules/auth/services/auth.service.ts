import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login, Signup } from "../login/post.model";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    rootAPI = 'https://expat-api.azurewebsites.net';

    constructor(private http: HttpClient) { }

    loginForm(loginData: Login) {
        this.http.post(this.rootAPI + '/api/Account/login', loginData).subscribe(responseData => {
            console.log(responseData);
        })
    }

    signUpForm(signupData: Signup) {
        return this.http.post(this.rootAPI + '/api/Account/register', signupData).subscribe(responseData => {
            console.log(responseData);
        })
    }
}