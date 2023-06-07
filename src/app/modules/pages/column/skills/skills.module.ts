import { NgModule } from '@angular/core';

import { SkillsRoutingModule } from './skills-routing.module';

import { SkillsComponent } from './skills.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';

@NgModule({
  imports: 
  [
    SkillsRoutingModule,
    FormsModule, 
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    HttpClientModule,
    NzImageModule
  ],
  declarations: [ SkillsComponent],
  exports: [ SkillsComponent]
})
export class SkillsModule { }
