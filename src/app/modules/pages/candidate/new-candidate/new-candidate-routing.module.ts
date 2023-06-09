import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCandidateComponent } from './new-candidate.component';

const routes: Routes = [
  { path: '', component:NewCandidateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCandidateRoutingModule { }
