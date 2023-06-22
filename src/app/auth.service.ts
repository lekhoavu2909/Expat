import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService, Post } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login, Signup, changePassword } from "../app/modules/auth/login/post.model";
import { ToastrService, ToastrModule } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'token';
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private apiService: ApiService, public jwtHelper: JwtHelperService, private toastr: ToastrService) {
    this._isLoggedIn$.next(!!this.token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  forgotPassword(data: Post) {
    return this.apiService.forgotPassword(data).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('photoUrl', response.photoUrl);
        localStorage.setItem('knownAs', response.knownAs);
        localStorage.setItem('gender', response.gender);
      })
    );
  }

  login(data: Login){
    return this.apiService.loginForm(data)
    .pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('photoUrl', response.photoUrl);
        localStorage.setItem('knownAs', response.knownAs);
        localStorage.setItem('gender', response.gender);
      })
    );
  }

  signup(data: Signup){
    return this.apiService.signUpForm(data).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('photoUrl', response.photoUrl);
        localStorage.setItem('knownAs', response.knownAs);
        localStorage.setItem('gender', response.gender);
      })
    );
  }

  changePassword(data: changePassword){
    return this.apiService.changePasswordForm(data).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('photoUrl', response.photoUrl);
        localStorage.setItem('knownAs', response.knownAs);
        localStorage.setItem('gender', response.gender);
      })
    );
  }
}