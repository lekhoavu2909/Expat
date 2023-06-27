import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HTTP_INTERCEPTORS,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, of } from 'rxjs';
  import { tap } from "rxjs/operators";
  import { AuthService } from './auth.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        request = request.clone({
          headers: request.headers.set('authorization', 'Bearer ' + this.authService.token),
        });

        return next.handle(request)
      } else {
        return next.handle(request)
      }
    }
  }
  
  export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  };