import { NgModule } from '@angular/core';

import { ExperienceRoutingModule } from './experience-routing.module';

import { ExperienceComponent } from './experience.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';

@NgModule({
  imports: 
  [
    ExperienceRoutingModule,
    FormsModule, 
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    HttpClientModule,
    NzImageModule
  ],
  declarations: [ ExperienceComponent],
  exports: [ ExperienceComponent]
})
export class ExperienceModule { }
