import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'login', loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./modules/auth/signup/signup.module').then(m => m.SignupModule) },
  { path: 'welcome', loadChildren: () => import('./modules/pages/welcome/welcome.module').then(m => m.WelcomeModule), },
  { path: 'forgot', loadChildren: () => import('./modules/auth/forgot/forgot.module').then(m => m.ForgotModule), }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
