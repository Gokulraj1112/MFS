import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly baseUrl = environment.userApi;

  private productsSignal = signal<Product[]>([]);
  private isLoadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  readonly products = this.productsSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor(private http: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      tap(products => this.productsSignal.set(products)),
      catchError(error => {
        this.errorSignal.set('Failed to load products. Please try again.');
        this.isLoadingSignal.set(false);
        return throwError(() => error);
      }),
      tap(() => this.isLoadingSignal.set(false))
    );
  }

  getProductById(id: number): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.productsSignal().filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  searchProducts(query: string): Product[] {
    const q = query.toLowerCase();
    return this.productsSignal().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  getCategories(): string[] {
    return [...new Set(this.productsSignal().map(p => p.category))];
  }
}
