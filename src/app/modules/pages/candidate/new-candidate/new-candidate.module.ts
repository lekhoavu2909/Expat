import { NgModule } from '@angular/core';

import { NewCandidateComponent } from './new-candidate.component';
import { NewCandidateRoutingModule } from './new-candidate-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  imports: 
  [
    NewCandidateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCascaderModule,
    NzDatePickerModule
  ],
  declarations: [NewCandidateComponent],
  exports: [NewCandidateComponent]
})
export class NewCandidateModule { }
