import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { ExperienceComponent } from '../column/experience/experience.component';
import { StacksComponent } from '../column/stacks/stacks.component';
import { SkillsComponent } from '../column/skills/skills.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent,
  children: [
    {
      path:'stacks', loadChildren: () => import('../column/stacks/stacks.module').then(m => m.StacksModule)
    },
    {
      path:'skills', loadChildren: () => import('../column/skills/skills.module').then(m => m.SkillsModule)
    },
    {
      path:'experience', loadChildren: () => import('../column/experience/experience.module').then(m => m.ExperienceModule)
    }
  ]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
