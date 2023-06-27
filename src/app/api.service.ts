import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, Signup, User, changePassword } from "../app/modules/auth/login/post.model";

export interface Post {
    "email": string,
    "newPassword": string
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  ROOT_URL = 'https://expat-api.azurewebsites.net';

  constructor(private http: HttpClient) {}

  forgotPassword(data : Post) {
    return this.http.post(this.ROOT_URL + '/api/Account/ResetPassword', data);
  }

  loginForm(data: Login) {
    return this.http.post(this.ROOT_URL + '/api/Account/login', data);
  }

  signUpForm(data: Signup) {
    return this.http.post(this.ROOT_URL + '/api/Account/register', data);
  }

  changePasswordForm(data: changePassword) {
    return this.http.post(this.ROOT_URL + '/api/Account/ChangePassword', data);
  }

  getUser(username: string | null){
    return this.http.get(this.ROOT_URL + '/api/Users/'+ username);
  }
}