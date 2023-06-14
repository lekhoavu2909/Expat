import { NgModule } from '@angular/core';

import { CandidateListComponent } from './candidate-list.component';
import { CandidateListRoutingModule } from './candidate-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HttpClientModule } from '@angular/common/http';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
  imports: 
  [
    CandidateListRoutingModule,
    FormsModule, 
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    HttpClientModule,
    NzImageModule,
    NzListModule,
    CommonModule,
    NzTableModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzCascaderModule,
    NzTreeSelectModule,
    NzDatePickerModule,
    NzModalModule,
    NzDrawerModule
  ],
  declarations: [CandidateListComponent],
  exports: [CandidateListComponent]
})
export class CandidateListModule { }
