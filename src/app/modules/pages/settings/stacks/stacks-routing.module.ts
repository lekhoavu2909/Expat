import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StacksComponent } from './stacks.component';

const routes: Routes = [
  { path: '', component: StacksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StacksRoutingModule { }
