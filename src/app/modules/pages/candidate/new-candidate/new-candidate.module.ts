import { NgModule } from '@angular/core';

import { NewCandidateComponent } from './new-candidate.component';
import { NewCandidateRoutingModule } from './new-candidate-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  imports: 
  [
    NewCandidateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCascaderModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzTreeSelectModule,
    NzInputModule,
    NzCheckboxModule
  ],
  declarations: [NewCandidateComponent],
  exports: [NewCandidateComponent]
})
export class NewCandidateModule { }
