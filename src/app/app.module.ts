import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app';
import { LandingComponent } from './components/landing/landing';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { MyUniverseComponent } from './components/my-universe/my-universe';
import { EmailVerificationComponent } from './components/email-verification/email-verification';
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