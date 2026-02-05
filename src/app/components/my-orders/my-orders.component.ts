import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/order.model';
import { environment } from '../../../environments/environment';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  adminApi = environment.adminApi;

  constructor(
    public ordersService: OrdersService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.loadMyOrders().subscribe();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /* ===============================
     🔁 Reorder
  =============================== */
  reorder(order: Order) {
  order.items.forEach(item => {
    this.cartService.addToCart(
      {
        id: 0,
        name: item.product_name,
        price: item.price,
        stock: 999,
        category: '',
        image: item.image,
        description: ''   // 🔥 REQUIRED by Product model
      },
      item.quantity
    );
  });

  this.router.navigate(['/cart']);
}


  /* ===============================
     📄 Invoice PDF
  =============================== */
  downloadInvoice(order: Order) {
    const pdf = new jsPDF();

    pdf.text('BloomVerse Invoice', 20, 20);
    pdf.text(`Order #${order.id}`, 20, 30);
    pdf.text(`Customer: ${order.customer_name}`, 20, 40);
    pdf.text(`Phone: ${order.phone}`, 20, 50);
    pdf.text(`Address: ${order.address}, ${order.city}`, 20, 60);

    let y = 80;
    order.items.forEach(item => {
      pdf.text(
        `${item.product_name} x${item.quantity} - ₹${item.price * item.quantity}`,
        20,
        y
      );
      y += 10;
    });

    pdf.text(`Total: ₹${order.total}`, 20, y + 10);

    pdf.save(`BloomVerse_Order_${order.id}.pdf`);
  }
  cancelOrder(orderId: number) {
  if (!confirm('Are you sure you want to cancel this order?')) return;

  this.ordersService.cancelOrder(orderId).subscribe({
    next: () => {
      alert('Order cancelled successfully');
      this.loadOrders(); // refresh list
    },
    error: err => {
      alert(err.error?.message || 'Unable to cancel order');
    }
  });
}

}
