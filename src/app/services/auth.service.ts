import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://pin-vaasal.onrender.com/api'; // Replace with your Render URL
  private currentUser: any = null;

  constructor(private http: HttpClient) {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(`${this.apiUrl}/login`, { email, password })
      );
      
      if (response.success) {
        this.currentUser = response.user;
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.error?.message || 'Login failed' 
      };
    }
  }

  async signup(email: string, password: string): Promise<any> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(`${this.apiUrl}/signup`, { email, password })
      );
      
      if (response.success) {
        // Check if email confirmation is required
        if (response.needsVerification) {
          return { 
            success: true, 
            needsVerification: true,
            message: 'Please verify your email address' 
          };
        }
        
        // Auto-login if no verification needed
        this.currentUser = response.user;
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return { success: true, needsVerification: false };
      }
      return { success: false, message: response.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.error?.message || 'Signup failed' 
      };
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUserEmail(): string {
    return this.currentUser?.email || '';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  async verifyEmail(tokenHash: string, type: string): Promise<any> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(`${this.apiUrl}/verify-email`, { tokenHash, type })
      );
      
      if (response.success) {
        this.currentUser = response.user;
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.error?.message || 'Email verification failed' 
      };
    }
  }

  async resendVerificationEmail(email: string): Promise<any> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(`${this.apiUrl}/resend-verification`, { email })
      );
      
      return { 
        success: response.success, 
        message: response.message 
      };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.error?.message || 'Failed to resend verification email' 
      };
    }
  }
}