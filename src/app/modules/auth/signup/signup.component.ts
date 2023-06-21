import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';


import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  constructor(
    private fb: UntypedFormBuilder,
    private accService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      knownAs: [null, [Validators.required]],
      email: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      city: [null, [Validators.required]],
      country: [null, [Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/),
        ],
      ],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      const signupData = this.validateForm.value;
      this.accService.signup(signupData).subscribe((response) => {
        this.route.navigate(['/welcome']);
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.validateForm.controls?.['checkPassword'].updateValueAndValidity()
    );
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { empty: true };
    } else if (
      control.value !== this.validateForm.controls?.['password'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
}
