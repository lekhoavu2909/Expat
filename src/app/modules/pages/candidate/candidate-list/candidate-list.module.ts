import { NgModule } from '@angular/core';

import { CandidateListComponent } from './candidate-list.component';
import { CandidateListRoutingModule } from './candidate-list-routing.module';

@NgModule({
  imports: 
  [
    CandidateListRoutingModule,
  ],
  declarations: [CandidateListComponent],
  exports: [CandidateListComponent]
})
export class CandidateListModule { }
