import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  orderSuccess = signal(false);

  minDate = '';
  selectedFile: File | null = null;
  paymentUploaded = false;

  form = {
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
    deliveryDate: '',
    paymentMethod: 'COD' as 'COD' | 'ONLINE'
  };

  constructor(
    public cartService: CartService,
    public ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  // ✅ COD ORDER
  placeOrder(transactionId: string | null = null) {
    if (!this.form.name || !this.form.phone || !this.form.address || !this.form.deliveryDate) {
      alert('Fill all required fields!');
      return;
    }

    const payload = {
      items: this.cartService.cartItems().map(i => ({
        product_id: i.product.id,
        quantity: i.quantity
      })),
      customer_name: this.form.name,
      phone: this.form.phone,
      address: this.form.address,
      city: this.form.city,
      pincode: this.form.pincode,
      notes: this.form.notes,
      delivery_date: this.form.deliveryDate,
      payment_method: this.form.paymentMethod,
      transaction_id: transactionId
    };

    this.ordersService.createOrder(payload).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.cartService.clearCart();
        this.router.navigate(['/my-orders']);
      },
      error: () => alert('Order failed!')
    });
  }

  // ✅ ONLINE PAYMENT FLOW
  uploadProofAndPlaceOrder() {
    if (!this.selectedFile) {
      alert('Upload payment screenshot first!');
      return;
    }

    const formData = new FormData();
    formData.append('proof', this.selectedFile);

    this.ordersService.uploadTempPaymentProof(formData).subscribe({
      next: (res: any) => {
        console.log('Uploaded proof:', res.fileName);
        this.paymentUploaded = true;

        // ✅ Place order with proof filename
        this.placeOrder(res.fileName);
      },
      error: () => alert('Payment upload failed!')
    });
  }
}
