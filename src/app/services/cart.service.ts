import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSignal = signal<CartItem[]>([]);

  readonly cartItems = this.cartItemsSignal.asReadonly();

  readonly totalItems = computed(() =>
    this.cartItemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this.cartItemsSignal().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  constructor(private authService: AuthService) {
    this.loadCartFromStorage();
  }

  /* 🔑 UNIQUE CART KEY PER USER */
  private getCartKey(): string {
    const userId = this.authService.getUserId();
    return userId ? `bloomverse_cart_${userId}` : 'bloomverse_cart_guest';
  }

  /* LOAD CART */
  private loadCartFromStorage(): void {
    const cartJson = localStorage.getItem(this.getCartKey());
    this.cartItemsSignal.set(cartJson ? JSON.parse(cartJson) : []);
  }

  /* SAVE CART */
  private saveCartToStorage(): void {
    localStorage.setItem(this.getCartKey(), JSON.stringify(this.cartItemsSignal()));
  }

  /* RELOAD CART AFTER LOGIN/LOGOUT */
  reloadCartForUser(): void {
    this.loadCartFromStorage();
  }

  /* ADD TO CART */
  addToCart(product: Product, quantity: number = 1): void {
    const cart = [...this.cartItemsSignal()];
    const index = cart.findIndex(item => item.product.id === product.id);

    if (index >= 0) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    this.cartItemsSignal.set(cart);
    this.saveCartToStorage();
  }

  /* REMOVE ITEM */
  removeFromCart(productId: number): void {
    this.cartItemsSignal.set(this.cartItemsSignal().filter(i => i.product.id !== productId));
    this.saveCartToStorage();
  }

  /* UPDATE QUANTITY */
  updateQuantity(productId: number, quantity: number): void {
    const cart = [...this.cartItemsSignal()];
    const item = cart.find(i => i.product.id === productId);

    if (item) item.quantity = quantity;

    this.cartItemsSignal.set(cart);
    this.saveCartToStorage();
  }

  /* CLEAR CART */
  clearCart(): void {
    this.cartItemsSignal.set([]);
    localStorage.removeItem(this.getCartKey());
  }

  /* CART COUNT */
  getCartItemCount(productId: number): number {
    const item = this.cartItemsSignal().find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  }
}
