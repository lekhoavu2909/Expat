import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from '../../auth/login/post.model';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = false;
  changePasswordForm!: UntypedFormGroup;
  constructor(private route : Router, private fb: UntypedFormBuilder, private accService: AuthService) { }
  drawerVisible = false
  infoVisible = false
  popoverVisible = false
  changed = false
  menuTitle = "Hi, "
  user: any

  logout(){
    localStorage.clear();
    this.route.navigate(['/login'])
  }

  openDrawer(): void {
    this.drawerVisible = true
  }

  closeDrawer(): void {
    this.drawerVisible = false;
    this.changed = false
  }

  openInfo(): void {
    this.infoVisible = true
  }

  closeInfo(): void {
    this.infoVisible = false;
  }

  submitForm(): void {
    if (this.changePasswordForm.valid) {
      console.log('submit', this.changePasswordForm.value);
      const loginData = this.changePasswordForm.value;
      this.accService.changePassword(loginData).subscribe((response) => {
        this.changed = true
      });
    } else {
      Object.values(this.changePasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.changePasswordForm = this.fb.group({
      username: localStorage.getItem('username'),
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      username: localStorage.getItem('username'),
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]]
    })
    const userJString = localStorage.getItem('user')
    console.log(userJString)
    this.user = userJString ? JSON.parse(userJString) : {}
    this.menuTitle = "Hi, " + this.user.knownAs
  }
}
