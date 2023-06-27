import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@NgModule({
  imports: 
  [
    WelcomeRoutingModule,
    FormsModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzImageModule,
    NzInputModule,
    NzFormModule,
    NzPaginationModule,
    NzButtonModule,
    NzPopoverModule,
    NzListModule,
    NzDrawerModule,
    ReactiveFormsModule,
    NzResultModule,
    CommonModule,
    NzDescriptionsModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
