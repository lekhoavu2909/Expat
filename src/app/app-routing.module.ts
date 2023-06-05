import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'login', loadChildren: () => import('./modules/pages/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./modules/pages/auth/signup/signup.module').then(m => m.SignupModule) },
  { path: 'welcome', loadChildren: () => import('./modules/pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
