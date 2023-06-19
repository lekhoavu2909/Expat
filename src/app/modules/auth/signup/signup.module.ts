import { NgModule } from '@angular/core';

import { SignupRoutingModule } from './signup-routing.module';

import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzImageModule } from 'ng-zorro-antd/image';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: 
  [
    NzButtonModule,
    CommonModule,
    SignupRoutingModule, 
    ReactiveFormsModule, 
    FormsModule, 
    NzFormModule,
    NzInputModule,
    NzListModule,
    NzImageModule
  ],
  declarations: [ SignupComponent],
  exports: [ SignupComponent]
})
export class SignupModule { }
