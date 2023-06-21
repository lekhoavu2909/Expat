import { Component, Injectable, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UnsubscriptionComponent } from '../../unsubscription.component';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';


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
  
  constructor(private authService: AuthService, private router: Router, private fb: UntypedFormBuilder, private http: HttpClient) {
    super();
  }

  submitForm() {
    if (this.forgotForm.invalid) {
      return;
    }

    const data : Post = this.forgotForm.value

    this.authService
      .forgotPassword(data)
      .subscribe((response) => {
        console.log(response.token)
        this.router.navigate(['/welcome']);
      });
  }
  
  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      newPassword:[null, [Validators.required]]
    });
  }
}
