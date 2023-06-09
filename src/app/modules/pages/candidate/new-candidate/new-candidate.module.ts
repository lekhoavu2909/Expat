import { NgModule } from '@angular/core';

import { NewCandidateComponent } from './new-candidate.component';
import { NewCandidateRoutingModule } from './new-candidate-routing.module';

@NgModule({
  imports: 
  [
    NewCandidateRoutingModule,
  ],
  declarations: [NewCandidateComponent],
  exports: [NewCandidateComponent]
})
export class NewCandidateModule { }
