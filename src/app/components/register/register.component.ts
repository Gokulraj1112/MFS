import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <div class="text-center mb-4">
                <h2>Join BloomVerse 🌸</h2>
                <p class="text-muted">Create your account to start shopping</p>
              </div>

              @if (errorMessage()) {
                <div class="alert alert-danger">
                  {{ errorMessage() }}
                </div>
              }

              <form (ngSubmit)="onRegister()">

                <!-- Name -->
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input 
                    type="text"
                    class="form-control"
                    [(ngModel)]="registerData.name"
                    name="name"
                    required
                    placeholder="Enter your name">
                </div>

                <!-- Email -->
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input 
                    type="email"
                    class="form-control"
                    [(ngModel)]="registerData.email"
                    name="email"
                    required
                    placeholder="Enter your email">
                </div>

                <!-- Phone -->
                <div class="mb-3">
                  <label class="form-label">Phone</label>
                  <input 
                    type="text"
                    class="form-control"
                    [(ngModel)]="registerData.phone"
                    name="phone"
                    required
                    placeholder="Enter your phone number">
                </div>

                <!-- Password -->
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input 
                    type="password"
                    class="form-control"
                    [(ngModel)]="registerData.password"
                    name="password"
                    required
                    placeholder="Create a password">
                </div>

                <!-- Confirm Password -->
                <div class="mb-3">
                  <label class="form-label">Confirm Password</label>
                  <input 
                    type="password"
                    class="form-control"
                    [(ngModel)]="confirmPassword"
                    name="confirmPassword"
                    required
                    placeholder="Confirm your password">
                </div>

                <div class="d-grid mt-3">
                  @if (authService.isLoading()) {
                    <button class="btn btn-primary" disabled>
                      <span class="spinner-border spinner-border-sm me-2"></span>
                      Creating Account...
                    </button>
                  } @else {
                    <button class="btn btn-primary" type="submit">
                      Create Account
                    </button>
                  }
                </div>
              </form>

              <div class="text-center mt-3">
                <p class="text-muted">
                  Already have an account?
                  <a routerLink="/login">Login here</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {

  registerData = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  confirmPassword = '';
  errorMessage = signal('');

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  onRegister() {

    if (!this.registerData.name || !this.registerData.email || !this.registerData.password || !this.registerData.phone) {
      this.errorMessage.set('All fields are required');
      return;
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters');
      return;
    }

    if (this.registerData.password !== this.confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.errorMessage.set('');

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Registration failed');
      }
    });
  }
}
