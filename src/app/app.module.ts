import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyUniverseComponent } from './components/my-universe/my-universe.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    MyUniverseComponent,
    EmailVerificationComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }