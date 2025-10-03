import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  template: `
    <div>
      <h1>Welcome to My Universe</h1>
      <p>Please login or signup to continue</p>
      <button (click)="goToLogin()">Login</button>
      <button (click)="goToSignup()">Signup</button>
    </div>
  `
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}