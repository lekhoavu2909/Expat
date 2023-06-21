import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getProducts(): Observable<Post[]> {
    return this.http.get<Post[]>('products', {
      headers: {},
    });
  }
}