import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { ApiService, Post } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login, Signup, User, changePassword, Photo } from "../app/modules/auth/login/post.model";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(private apiService: ApiService, public jwtHelper: JwtHelperService, private toastr: ToastrService, private route: Router) {
    this._isLoggedIn$.next(!!this.token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  forgotPassword(data: Post) {
    return this.apiService.forgotPassword(data).pipe(
      tap((response: any) => {
        this.route.navigate(['/login']);
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
      }),
      concatMap(() => {
        return this.getUser()
      }),
      tap((res) => {
        this.route.navigate(['/welcome']);
      })
    ).subscribe();
  }

  signup(data: Signup){
    return this.apiService.signUpForm(data).pipe(
      tap((response: any) => {
        this.route.navigate(['/login']);
      })
    );
  }

  changePassword(data: changePassword){
    return this.apiService.changePasswordForm(data).pipe(
      tap((response: any) => {
        this.route.navigate(['/login']);
      })
    );
  }

  savePhoto(id: any){
    return this.apiService.savePhotoUrl(id).pipe(
      concatMap(() => {
        return this.getUser()
      }),
      tap((res) => {
        this.route.navigate(['/welcome']);
      })
    ).subscribe();
  }

  getUser(){
    return this.apiService.getUser(localStorage.getItem('username')).pipe(
      tap((response: any) => {
        localStorage.setItem('user', JSON.stringify(response))
        console.log(localStorage.getItem('username'))
    }))
  }

  getSettings(apiName: string){
    return this.apiService.getSettings(apiName).pipe(
      tap((response: any) => {
        localStorage.setItem(apiName, JSON.stringify(response))
      })
    );
  }

  putExp(id: number, newLevel: string){
    return this.apiService.putExperience(id, newLevel).pipe(
      tap((res) => {
        this.getSettings('Experience')
        window.location.reload();
        this.route.navigate(['/welcome/experience']);
      })
    ).subscribe();
  }

  addExp(newLevel: string){
    return this.apiService.addExperience(newLevel).pipe(
      tap((res) => {
        this.getSettings('Experience')
        window.location.reload();
        this.route.navigate(['/welcome/experience']);
      })
    ).subscribe();
  }

  deleteExp(id: number){
    return this.apiService.deleteExperience(id).pipe(
      tap((res) => {
        this.getSettings('Experience')
        window.location.reload();
        this.route.navigate(['/welcome/experience']);
      })
    ).subscribe();
  }

  putStack(id: number, newLevel: string){
    return this.apiService.putStack(id, newLevel).pipe(
      tap((res) => {
        this.getSettings('Stack')
        window.location.reload();
        this.route.navigate(['/welcome/stack']);
      })
    ).subscribe();
  }

  addStack(newLevel: string){
    return this.apiService.addStack(newLevel).pipe(
      tap((res) => {
        this.getSettings('Stack')
        window.location.reload();
        this.route.navigate(['/welcome/stack']);
      })
    ).subscribe();
  }

  deleteStack(id: number){
    return this.apiService.deleteExperience(id).pipe(
      tap((res) => {
        this.getSettings('Stack')
        window.location.reload();
        this.route.navigate(['/welcome/stack']);
      })
    ).subscribe();
  }

  putSkill(id: number, newLevel: string){
    return this.apiService.putSkill(id, newLevel).pipe(
      tap((res) => {
        this.getSettings('Skill')
        window.location.reload();
        this.route.navigate(['/welcome/skill']);
      })
    ).subscribe();
  }

  addSkill(newLevel: string){
    return this.apiService.addSkill(newLevel).pipe(
      tap((res) => {
        this.getSettings('Skill')
        window.location.reload();
        this.route.navigate(['/welcome/skill']);
      })
    ).subscribe();
  }

  deleteSkill(id: number){
    return this.apiService.deleteExperience(id).pipe(
      tap((res) => {
        this.getSettings('Skill')
        window.location.reload();
        this.route.navigate(['/welcome/skill']);
      })
    ).subscribe();
  }
}