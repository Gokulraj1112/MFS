import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(
    public auth: AuthService,
    public orders: OrdersService,
    public cart: CartService
  ) {}

  /** USER SIGNAL */
  user = this.auth.user;

  /** ORDERS COUNT (safe) */
  totalOrders = computed(() => this.orders.orders()?.length ?? 0);

  /** AVATAR */
  avatarUrl = computed(() => {
    const name = this.user()?.name || 'User';
    const isGirl = ['a','i','e'].includes(name.toLowerCase().slice(-1));

    return isGirl
      ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&hair=long&eyes=happy`
      : `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&hair=short&eyes=happy`;
  });

  /** XP & LEVEL */
  xp = computed(() => this.totalOrders() * 350);

  level = computed(() =>
    Math.max(1, Math.floor(this.xp() / 1000))
  );

  /** DELIVERY PROGRESS (for progress bar) */
  deliveryProgress = computed(() => {
    const count = this.totalOrders();
    if (count === 0) return 0;
    return Math.min(100, count * 25); // fake progress logic
  });

  logout() {
    this.auth.logout();
  }
}
