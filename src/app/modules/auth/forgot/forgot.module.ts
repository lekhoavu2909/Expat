import { NgModule } from '@angular/core';

import { ForgotRoutingModule } from './forgot-routing.module';

import { ForgotComponent } from './forgot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzImageModule } from 'ng-zorro-antd/image';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  imports: 
  [
    ForgotRoutingModule, 
    ReactiveFormsModule, 
    FormsModule, 
    NzFormModule,
    NzInputModule,
    NzImageModule,
    CommonModule,
    HttpClientModule,
    NzCardModule
  ],
  declarations: [ForgotComponent],
  exports: [ForgotComponent]
})
export class ForgotModule { }
