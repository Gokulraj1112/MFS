import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          🌸 BloomVerse
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/shop" routerLinkActive="active">
                Shop
              </a>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            @if (authService.isAuthenticated()) {
              <li class="nav-item position-relative">
                <a class="nav-link" routerLink="/cart" routerLinkActive="active">
                  🛒 Cart
                  @if (cartService.totalItems() > 0) {
                    <span class="cart-badge">{{ cartService.totalItems() }}</span>
                  }
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/my-orders" routerLinkActive="active">
                  My Orders
                </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  {{ authService.user()?.name || authService.user()?.email }}
                </a>
                <ul class="dropdown-menu">
                  <li>  <a class="nav-link" routerLink="/profile" routerLinkActive="active">
                  Profile
                </a></li>
                  <li><a class="dropdown-item" href="#" (click)="logout()">Logout</a></li>
                </ul>
              </li>
            } @else {
              <li class="nav-item">
                <a class="nav-link" routerLink="/login" routerLinkActive="active">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/register" routerLinkActive="active">
                  Register
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    public cartService: CartService
  ) {}

  logout(): void {
    this.authService.logout();
  }
}