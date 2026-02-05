import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CreateOrderPayload, Order } from '../models/order.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly baseUrl = 'http://localhost:3000/api/orders';

  private ordersSignal = signal<Order[]>([]);
  private isLoadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  readonly orders = this.ordersSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // ✅ JSON HEADER (for normal API calls)
  private getJsonHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      'Content-Type': 'application/json'
    });
  }

  // ✅ AUTH HEADER ONLY (for file upload)
  private getAuthOnlyHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
      // ❌ NO Content-Type here!
    });
  }

  // ===============================
  // 🛒 CREATE ORDER
  // ===============================
  createOrder(orderData: CreateOrderPayload): Observable<any> {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post(`${this.baseUrl}`, orderData, {
      headers: this.getJsonHeaders() // ✅ use JSON header
    }).pipe(
      tap(() => this.isLoadingSignal.set(false)),
      catchError(error => {
        this.errorSignal.set('Failed to place order. Please try again.');
        this.isLoadingSignal.set(false);
        return throwError(() => error);
      })
    );
  }

  // ===============================
  // 📦 LOAD MY ORDERS
  // ===============================
  loadMyOrders(): Observable<Order[]> {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<Order[]>(`${this.baseUrl}/my`, {
      headers: this.getJsonHeaders()
    }).pipe(
      tap(orders => {
        this.ordersSignal.set(orders);
        this.isLoadingSignal.set(false);
      }),
      catchError(error => {
        this.errorSignal.set('Failed to load orders. Please try again.');
        this.isLoadingSignal.set(false);
        return throwError(() => error);
      })
    );
  }

  // ===============================
  // ❌ CANCEL ORDER
  // ===============================
  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${orderId}/cancel`,
      {},
      { headers: this.getJsonHeaders() }
    );
  }

  // ===============================
  // 💳 UPLOAD PAYMENT PROOF ✅ FIXED
  // ===============================
  uploadTempPaymentProof(data: FormData) {
  return this.http.post(
    'http://localhost:3000/api/payments/upload-temp-proof',
    data,
    { headers: this.getAuthOnlyHeaders() }
  );
}

}
