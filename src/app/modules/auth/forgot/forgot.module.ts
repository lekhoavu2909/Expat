import { NgModule } from '@angular/core';

import { ForgotRoutingModule } from './forgot-routing.module';

import { ForgotComponent } from './forgot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzImageModule } from 'ng-zorro-antd/image';

@NgModule({
  imports: 
  [
    ForgotRoutingModule, 
    ReactiveFormsModule, 
    FormsModule, 
    NzFormModule,
    NzInputModule,
    NzImageModule
  ],
  declarations: [ForgotComponent],
  exports: [ForgotComponent]
})
export class ForgotModule { }
