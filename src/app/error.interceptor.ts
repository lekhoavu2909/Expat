import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService, ToastrModule } from 'ngx-toastr';

interface ClientError {
  code: string;
  description: string;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.status == 400){
          if(typeof error.error == 'string'){
            errorMsg+=error.error
            this.toastr.error(error.error);
          }
          else{
            const errors: Array<ClientError> = error.error;
            errors.forEach(clientError => {
              errorMsg+=clientError.description
              this.toastr.error(clientError.description);
            });
          }
        }
        else{
          errorMsg+=error.error
          this.toastr.error(error.error);
        }
          
        return throwError(errorMsg);
     })
    );
  }
}
