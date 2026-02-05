import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body">
              <div class="text-center mb-4">
                <h2>Welcome Back</h2>
                <p class="text-muted">Sign in to your BloomVerse account</p>
              </div>

              @if (errorMessage()) {
                <div class="alert alert-danger" role="alert">
                  {{ errorMessage() }}
                </div>
              }

              <form (ngSubmit)="onLogin()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    class="form-control" 
                    [(ngModel)]="loginData.email"
                    name="email"
                    required
                    placeholder="Enter your email">
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    id="password"
                    class="form-control" 
                    [(ngModel)]="loginData.password"
                    name="password"
                    required
                    placeholder="Enter your password">
                </div>

                <div class="d-grid">
                  @if (authService.isLoading()) {
                    <button type="submit" class="btn btn-primary" disabled>
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing in...
                    </button>
                  } @else {
                    <button type="submit" class="btn btn-primary">
                      Sign In
                    </button>
                  }
                </div>
              </form>

              <div class="text-center mt-3">
                <p class="text-muted">
                  Don't have an account? 
                  <a routerLink="/register" class="text-decoration-none">Sign up here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  
  errorMessage = signal<string>('');

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage.set('Please fill in all fields');
      return;
    }

    this.errorMessage.set('');
    
    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage.set(
          error.error?.message || 'Login failed. Please check your credentials.'
        );
      }
    });
    

  }
}
