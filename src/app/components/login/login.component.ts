import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        <button type="button" (click)="goBack()">Back</button>
      </form>
      <p *ngIf="errorMessage">{{errorMessage}}</p>
      <p *ngIf="loading">Loading...</p>
    </div>
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    
    try {
      const result = await this.authService.login(this.email, this.password);
      if (result.success) {
        this.router.navigate(['/my-universe']);
      } else {
        if (result.needsVerification) {
          this.errorMessage = 'Please verify your email before logging in. Check your inbox for the verification link.';
          setTimeout(() => {
            this.router.navigate(['/email-verification'], { 
              queryParams: { email: this.email } 
            });
          }, 3000);
        } else {
          this.errorMessage = result.message || 'Login failed';
        }
      }
    } catch (error) {
      this.errorMessage = 'An error occurred during login';
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}