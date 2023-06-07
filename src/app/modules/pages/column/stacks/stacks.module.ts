import { NgModule } from '@angular/core';

import { StacksRoutingModule } from './stacks-routing.module';

import { StacksComponent } from './stacks.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';

@NgModule({
  imports: 
  [
    StacksRoutingModule,
    FormsModule, 
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    HttpClientModule,
    NzImageModule
  ],
  declarations: [ StacksComponent],
  exports: [ StacksComponent]
})
export class StacksModule { }
