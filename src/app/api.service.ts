import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  savePhotoUrl(id: any){
    return this.http.put(this.ROOT_URL + '/api/Users/set-main-photo/' + id, null)
  }

  getUser(username: string | null){
    return this.http.get(this.ROOT_URL + '/api/Users/'+ username);
  }

  getSettings(apiName: string){
    return this.http.get(this.ROOT_URL + '/api/' + apiName);
  }

  putExperience(id: number, newLevel: string){
    return this.http.put(this.ROOT_URL + '/api/Experience/' + id, '{"level": "' + newLevel + '"}',{headers: new HttpHeaders({'Content-Type': 'application/json', 'charset': 'utf-8'})}) 
  }

  addExperience(newLevel: string){
    return this.http.post(this.ROOT_URL + '/api/Experience', '{"level": "' + newLevel + '"}', {headers: new HttpHeaders({'Content-Type': 'application/json', 'charset': 'utf-8'})})
  }

  deleteExperience(id: number){
    return this.http.delete(this.ROOT_URL + '/api/Experience/' + id)
  }

  putStack(id: number, newName: string){
    return this.http.put(this.ROOT_URL + '/api/Stack/' + id, '{"name": "' + newName + '"}',{headers: new HttpHeaders({'Content-Type': 'application/json', 'charset': 'utf-8'})}) 
  }

  addStack(newName: string){
    return this.http.post(this.ROOT_URL + '/api/Stack', '{"name": "' + newName + '"}', {headers: new HttpHeaders({'Content-Type': 'application/json', 'charset': 'utf-8'})})
  }

  deleteStack(id: number){
    return this.http.delete(this.ROOT_URL + '/api/Stack/' + id)
  }

  putSkill(id: number, newName: string){
    return this.http.put(this.ROOT_URL + '/api/Skill/' + id, '{"name": "' + newName + '"}',{headers: new HttpHeaders({'Content-Type': 'application/json', 'charset': 'utf-8'})}) 
  }

  addSkill(newName: string){
    return this.http.post(this.ROOT_URL + '/api/Skill', '{"name": "' + newName + '"}', {headers: new HttpHeaders({'Content-Type': 'application/json', 'charset': 'utf-8'})})
  }

  deleteSkill(id: number){
    return this.http.delete(this.ROOT_URL + '/api/Skill/' + id)
  }

  getCandidates(){
    return this.http.get(this.ROOT_URL + '/api/Candidate/');
  }
}