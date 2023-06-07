import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { NzImageModule } from 'ng-zorro-antd/image';

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
    NzImageModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
