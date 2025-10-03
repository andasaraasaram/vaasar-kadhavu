import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-universe',
  standalone: false,
  template: `
    <div>
      <h1>My Universe</h1>
      <p>Welcome to your universe!</p>
      <p *ngIf="userEmail">You are logged in as: {{userEmail}}</p>
      <p>Status: <strong>Logged In</strong></p>
      <button (click)="logout()">Logout</button>
    </div>
  `
})
export class MyUniverseComponent implements OnInit {
  userEmail: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userEmail = this.authService.getCurrentUserEmail();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}