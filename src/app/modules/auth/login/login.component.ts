import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;


  constructor(private accService: AuthService, private fb: UntypedFormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const loginData = this.validateForm.value;
      this.accService.loginForm(loginData)
      this.route.navigate(['./welcome'])
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
