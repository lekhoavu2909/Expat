import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent,
  children: [
    {
      path:'stacks', loadChildren: () => import('../settings/stacks/stacks.module').then(m => m.StacksModule)
    },
    {
      path:'skills', loadChildren: () => import('../settings/skills/skills.module').then(m => m.SkillsModule)
    },
    {
      path:'experience', loadChildren: () => import('../settings/experience/experience.module').then(m => m.ExperienceModule)
    },
    {
      path:'interview', loadChildren: () => import('../candidate/interview/interview.module').then(m => m.InterviewModule)
    },
    {
      path:'candidate-list', loadChildren: () => import('../candidate/candidate-list/candidate-list.module').then(m => m.CandidateListModule)
    }
  ]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
