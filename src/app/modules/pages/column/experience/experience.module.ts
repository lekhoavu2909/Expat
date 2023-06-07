import { NgModule } from '@angular/core';

import { ExperienceRoutingModule } from './experience-routing.module';

import { ExperienceComponent } from './experience.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  imports: 
  [
    ExperienceRoutingModule,
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
  ],
  declarations: [ExperienceComponent],
  exports: [ExperienceComponent]
})
export class ExperienceModule { }
