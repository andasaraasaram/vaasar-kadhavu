import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email-verification',
  template: `
    <div>
      <h2>Email Verification</h2>
      
      <div *ngIf="!isVerifying && !verificationSuccess && !verificationError">
        <p>We've sent a verification email to: <strong>{{userEmail}}</strong></p>
        <p>Please check your inbox and click the verification link to activate your account.</p>
        <p>Once verified, you can log in to your account.</p>
        <button (click)="resendVerification()" [disabled]="resendLoading">
          {{resendLoading ? 'Sending...' : 'Resend Verification Email'}}
        </button>
        <button (click)="goToLogin()">Go to Login</button>
        <p *ngIf="resendMessage">{{resendMessage}}</p>
      </div>

      <div *ngIf="isVerifying">
        <p>Verifying your email...</p>
        <p>Please wait while we confirm your email address.</p>
      </div>

      <div *ngIf="verificationSuccess">
        <h3>Email Verified Successfully!</h3>
        <p>Your email has been verified. You can now access your account.</p>
        <button (click)="goToMyUniverse()">Go to My Universe</button>
      </div>

      <div *ngIf="verificationError">
        <h3>Verification Failed</h3>
        <p>{{errorMessage}}</p>
        <p>The verification link may have expired or is invalid.</p>
        <button (click)="resendVerification()" [disabled]="resendLoading">
          {{resendLoading ? 'Sending...' : 'Resend Verification Email'}}
        </button>
        <button (click)="goToLogin()">Go to Login</button>
      </div>
    </div>
  `
})
export class EmailVerificationComponent implements OnInit {
  userEmail: string = '';
  isVerifying: boolean = false;
  verificationSuccess: boolean = false;
  verificationError: boolean = false;
  errorMessage: string = '';
  resendMessage: string = '';
  resendLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    // Get email from query params
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'] || '';
    });

    // Check for verification token in URL (from email link)
    this.route.fragment.subscribe(async fragment => {
      if (fragment) {
        // Parse the fragment to get token_hash and type
        const params = new URLSearchParams(fragment);
        const tokenHash = params.get('token_hash');
        const type = params.get('type');

        if (tokenHash && type === 'email') {
          await this.verifyEmail(tokenHash, type);
        }
      }
    });
  }

  async verifyEmail(tokenHash: string, type: string) {
    this.isVerifying = true;
    try {
      const result = await this.authService.verifyEmail(tokenHash, type);
      if (result.success) {
        this.verificationSuccess = true;
        this.verificationError = false;
      } else {
        this.verificationError = true;
        this.errorMessage = result.message || 'Verification failed';
      }
    } catch (error) {
      this.verificationError = true;
      this.errorMessage = 'An error occurred during verification';
    } finally {
      this.isVerifying = false;
    }
  }

  async resendVerification() {
    if (!this.userEmail) {
      this.resendMessage = 'Email address not found. Please sign up again.';
      return;
    }

    this.resendLoading = true;
    this.resendMessage = '';

    try {
      const result = await this.authService.resendVerificationEmail(this.userEmail);
      if (result.success) {
        this.resendMessage = 'Verification email sent! Please check your inbox.';
      } else {
        this.resendMessage = result.message || 'Failed to send verification email';
      }
    } catch (error) {
      this.resendMessage = 'An error occurred. Please try again.';
    } finally {
      this.resendLoading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToMyUniverse() {
    this.router.navigate(['/my-universe']);
  }
}