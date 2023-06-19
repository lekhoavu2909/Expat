import { Component, Injectable, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';
import { UnsubscriptionComponent } from '../../unsubscription.component';

export interface Post {
  "email": string,
  "newPassword": string
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class ForgotComponent extends UnsubscriptionComponent implements OnInit{
  forgotForm !: UntypedFormGroup
  ROOT_URL = 'https://expat-api.azurewebsites.net';
  
  constructor(private fb: UntypedFormBuilder, private http: HttpClient,) {
    super();
  }

  submitForm() {
    if (this.forgotForm.valid) {
      console.log('submit', this.forgotForm.value);
    }
    const data: Post = this.forgotForm.value
    this.http.post(this.ROOT_URL + '/api/Account/ResetPassword' , data)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(responseData => {
      console.log(responseData);
    })
  }
  
  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      newPassword:[null, [Validators.required]]
    });
  }
}
