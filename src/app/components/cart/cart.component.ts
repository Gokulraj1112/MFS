import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12 mb-4">
          <h2>Shopping Cart</h2>
          @if (cartService.totalItems() > 0) {
            <p class="text-muted">{{ cartService.totalItems() }} items in your cart</p>
          }
        </div>
      </div>

      @if (cartService.cartItems().length === 0) {
        <div class="text-center">
          <div class="card">
            <div class="card-body">
              <h4>Your cart is empty</h4>
              <p class="text-muted">Add some beautiful flowers to get started!</p>
              <a routerLink="/shop" class="btn btn-primary">Continue Shopping</a>
            </div>
          </div>
        </div>
      } @else {
        <div class="row">
          <div class="col-lg-8">
            @for (item of cartService.cartItems(); track item.product.id) {
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-md-3">
                      <img 
                        [src]="adminApi + '/uploads/' + item.product.image"
                        [alt]="item.product.name"
                        class="img-fluid rounded"
                        style="height: 100px; object-fit: cover;">
                    </div>

                    <div class="col-md-4">
                      <h5>{{ item.product.name }}</h5>
                      <p class="text-muted">{{ item.product.category }}</p>
                      <p class="text-primary">₹{{ item.product.price }} each</p>
                    </div>

                    <div class="col-md-3">
                      <div class="input-group">
                        <button class="btn btn-outline-secondary" (click)="decreaseQuantity(item.product.id)">-</button>
                        <span class="form-control text-center">{{ item.quantity }}</span>
                        <button class="btn btn-outline-secondary" (click)="increaseQuantity(item.product.id)">+</button>
                      </div>
                      @if (item.quantity > item.product.stock) {
                        <small class="text-danger">Exceeds stock ({{ item.product.stock }})</small>
                      }
                    </div>

                    <div class="col-md-2 text-end">
                      <p class="h6">₹{{ (item.product.price * item.quantity).toFixed(2) }}</p>
                      <button class="btn btn-outline-danger btn-sm" (click)="removeItem(item.product.id)">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="col-lg-4">
            <div class="card sticky-top">
              <div class="card-header">
                <h5>Order Summary</h5>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>₹{{ cartService.totalPrice().toFixed(2) }}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>₹{{ cartService.totalPrice().toFixed(2) }}</strong>
                </div>
                <div class="d-grid gap-2 mt-3">
                  @if (!hasStockIssues()) {
                    <a routerLink="/checkout" class="btn btn-primary btn-lg">
                      Proceed to Checkout
                    </a>
                  } @else {
                    <button class="btn btn-secondary btn-lg" disabled>
                      Fix Stock Issues First
                    </button>
                  }
                  <a routerLink="/shop" class="btn btn-outline-secondary">
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </div>
  `
})
export class CartComponent {

  adminApi = environment.adminApi;

  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  increaseQuantity(productId: number) {
    const item = this.cartService.cartItems().find(i => i.product.id === productId);
    if (item && item.quantity < item.product.stock) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cartService.cartItems().find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  hasStockIssues(): boolean {
    return this.cartService.cartItems().some(item => item.quantity > item.product.stock);
  }
}
