import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./modules/auth/signup/signup.module').then(m => m.SignupModule) },
  { path: 'welcome', loadChildren: () => import('./modules/pages/welcome/welcome.module').then(m => m.WelcomeModule), canActivate: [AuthGuard]},
  { path: 'forgot', loadChildren: () => import('./modules/auth/forgot/forgot.module').then(m => m.ForgotModule), }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

@Injectable({
  providedIn: 'root'
})
export class AppRoutingModule { }
