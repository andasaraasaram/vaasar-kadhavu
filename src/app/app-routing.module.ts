import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { MyUniverseComponent } from './components/my-universe/my-universe';
import { EmailVerificationComponent } from './components/email-verification/email-verification';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'email-verification', component: EmailVerificationComponent },
  { path: 'verify-email', component: EmailVerificationComponent },
  { path: 'my-universe', component: MyUniverseComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }