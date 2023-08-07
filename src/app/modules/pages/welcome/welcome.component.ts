import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';
import { takeUntil, tap } from 'rxjs';
import { UnsubscriptionComponent } from '../../unsubscription.component';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent extends UnsubscriptionComponent implements OnInit {
  isCollapsed = false;
  changePasswordForm!: UntypedFormGroup;
  constructor(private route : Router, private fb: UntypedFormBuilder, private accService: AuthService, private http: HttpClient) {
    super();
  }
  drawerVisible = false
  infoVisible = false
  popoverVisible = false
  changed = false
  menuTitle = "Hi, "
  user: any
  token: any
  postResponse: any;
  uploadedImage: any;
  onUpload = false
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    this.imageUploadAction()
  }

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

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('file', this.uploadedImage, this.uploadedImage.name);

    this.http.post('https://expat-api.azurewebsites.net/api/Users/add-photo', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 201) {
          localStorage.setItem('photo', JSON.stringify(response))
          const photoString = JSON.stringify(response);
          const photo = photoString ? JSON.parse(photoString) : {}
          this.accService.savePhoto(photo.body.id);
          this.user.photoUrl = photo.body.url
        }}
      );
    this.onUpload = false
  }

  submitForm(): void {
    if (this.changePasswordForm.valid) {
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

  previewImage: string | undefined = '';
  previewVisible = false;

  handleUpload() {
    this.onUpload = true
  };


  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      username: localStorage.getItem('username'),
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]]
    })
    const userJString = localStorage.getItem('user')
    this.user = userJString ? JSON.parse(userJString) : {}
    this.menuTitle = "Hi, " + this.user.knownAs
    this.token = localStorage.getItem('token')
    this.onUpload = false
  }
}
