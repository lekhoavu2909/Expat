import { NgModule } from '@angular/core';

import { InterviewComponent } from './interview.component';
import { InterviewRoutingModule } from './interview-routing.module';

@NgModule({
  imports: 
  [
    InterviewRoutingModule,
  ],
  declarations: [InterviewComponent],
  exports: [InterviewComponent]
})
export class InterviewModule { }
