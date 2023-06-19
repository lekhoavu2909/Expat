import { Component, Injectable, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from 'environment';

export interface Post {
  "email": string,
  "newPassword": string
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})


export class ForgotComponent implements OnInit{
  forgotForm !: UntypedFormGroup
  posts: Observable<any> | undefined;
  
  constructor(private fb: UntypedFormBuilder, private http: HttpClient,) {}

  submitForm(): void {
    console.log(Environment.ROOT_URL)
    if (this.forgotForm.valid) {
      console.log('submit', this.forgotForm.value);
    }
    const data: Post = {
      "email": this.forgotForm.value['email'],
      "newPassword": this.forgotForm.value['newPassword']
    } 
    this.http.post(Environment.ROOT_URL, data, {
      headers : new HttpHeaders({
        "Access-Control-Allow-Origin":"*"
      })
    }).subscribe(responseData => {
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
