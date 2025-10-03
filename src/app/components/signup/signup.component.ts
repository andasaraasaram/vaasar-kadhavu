import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  template: `
    <div>
      <h2>Signup</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            [(ngModel)]="email" 
            required
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            [(ngModel)]="password" 
            required
          />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            [(ngModel)]="confirmPassword" 
            required
          />
        </div>
        <button type="submit">Signup</button>
        <button type="button" (click)="goBack()">Back</button>
      </form>
      <p *ngIf="errorMessage">{{errorMessage}}</p>
      <p *ngIf="successMessage">{{successMessage}}</p>
      <p *ngIf="loading">Loading...</p>
    </div>
  `
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.loading = false;
      return;
    }

    try {
      const result = await this.authService.signup(this.email, this.password);
      if (result.success) {
        if (result.needsVerification) {
          this.successMessage = 'Signup successful! Please check your email to verify your account.';
          setTimeout(() => {
            this.router.navigate(['/email-verification'], { 
              queryParams: { email: this.email } 
            });
          }, 2000);
        } else {
          this.successMessage = 'Signup successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/my-universe']);
          }, 1500);
        }
      } else {
        this.errorMessage = result.message || 'Signup failed';
      }
    } catch (error) {
      this.errorMessage = 'An error occurred during signup';
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}