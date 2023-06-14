import { NgModule } from '@angular/core';

import { StacksRoutingModule } from './stacks-routing.module';

import { StacksComponent } from './stacks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
@NgModule({
  imports: 
  [
    StacksRoutingModule,
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
    ReactiveFormsModule
  ],
  declarations: [ StacksComponent],
  exports: [ StacksComponent]
})
export class StacksModule { }
