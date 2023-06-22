import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = false;
  changePasswordForm!: UntypedFormGroup;
  constructor(private route : Router, private fb: UntypedFormBuilder, private accService: AuthService) { }
  username = localStorage.getItem('username')
  email = localStorage.getItem('email')
  photoUrl = localStorage.getItem('photoUrl')
  knownAs = localStorage.getItem('knownAs')
  gender = localStorage.getItem('gender')
  drawerVisible = false
  popoverVisible = false
  changed = false
  menuTitle = "Hi, " + this.knownAs

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
    this.username = localStorage.getItem('username')
    this.email = localStorage.getItem('email')
    this.photoUrl = localStorage.getItem('photoUrl')
    this.knownAs = localStorage.getItem('knownAs')
    this.gender = localStorage.getItem('gender')
    this.changePasswordForm = this.fb.group({
      username: localStorage.getItem('username'),
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]]
    })
    this.menuTitle = "Hi, " + this.knownAs
  }

}
