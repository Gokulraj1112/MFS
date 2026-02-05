import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-4">
      @if (product()) {
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <img 
                [src]="'http://localhost:5000/uploads/' + product()!.image" 
                [alt]="product()!.name" 
                class="card-img-top"
                style="height: 400px; object-fit: cover;">
            </div>
          </div>

          <div class="col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <h1 class="card-title">{{ product()!.name }}</h1>
                <p class="text-muted mb-3">Category: {{ product()!.category }}</p>
                <h3 class="text-primary mb-3">₹{{ product()!.price }}</h3>
                
                @if (product()!.stock > 0) {
                  <p class="text-success">
                    <span class="badge bg-success">
                      ✓ In Stock ({{ product()!.stock }} available)
                    </span>
                  </p>
                } @else {
                  <p class="text-danger">
                    <span class="badge bg-danger">Out of Stock</span>
                  </p>
                }

                <p class="card-text">{{ product()!.description }}</p>

                @if (product()!.stock > 0) {
                  <div class="mb-3">
                    <label class="form-label">Quantity:</label>
                    <div class="input-group" style="max-width: 150px;">
                      <button class="btn btn-outline-secondary" (click)="decreaseQuantity()">-</button>
                      <input 
                        type="number" 
                        class="form-control text-center" 
                        [(ngModel)]="quantity" 
                        [min]="1" 
                        [max]="product()!.stock">
                      <button class="btn btn-outline-secondary" (click)="increaseQuantity()">+</button>
                    </div>
                  </div>

                  <div class="d-grid gap-2">
                    <button class="btn btn-primary btn-lg" (click)="addToCart()">
                      Add {{ quantity }} to Cart - ₹{{ (product()!.price * quantity).toFixed(2) }}
                    </button>

                    @if (cartService.getCartItemCount(product()!.id) > 0) {
                      <p class="text-muted text-center">
                        Currently in cart: {{ cartService.getCartItemCount(product()!.id) }} items
                      </p>
                    }
                  </div>
                } @else {
                  <button class="btn btn-secondary btn-lg" disabled>
                    Out of Stock
                  </button>
                }

                <div class="mt-4">
                  <a routerLink="/shop" class="btn btn-outline-secondary">
                    ← Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div class="row mt-5">
          <div class="col-12">
            <h3>More from {{ product()!.category }}</h3>
          </div>

          @for (relatedProduct of getRelatedProducts(); track relatedProduct.id) {
            @if (relatedProduct.id !== product()!.id) {
              <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                  <img 
                    [src]="'http://localhost:5000/uploads/' + relatedProduct.image" 
                    [alt]="relatedProduct.name" 
                    class="product-image">

                  <div class="card-body">
                    <h5 class="card-title">{{ relatedProduct.name }}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="h6 text-primary">₹{{ relatedProduct.price }}</span>
                      <a [routerLink]="['/product', relatedProduct.id]" class="btn btn-primary">
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            }
          }
        </div>

      } @else {
        <div class="text-center">
          <h2>Product not found</h2>
          <p class="text-muted">The requested product could not be found.</p>
          <a routerLink="/shop" class="btn btn-primary">Browse Products</a>
        </div>
      }
    </div>
  `
})
export class ProductDetailsComponent implements OnInit {

  product = signal<Product | null>(null);
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.loadProduct(productId);
    });
  }

  loadProduct(id: number): void {
    const cached = this.productsService.getProductById(id);
    if (cached) {
      this.product.set(cached);
      return;
    }

    this.productsService.loadProducts().subscribe({
      next: () => {
        const product = this.productsService.getProductById(id);
        this.product.set(product || null);
      },
      error: () => this.product.set(null)
    });
  }

  increaseQuantity() {
    if (this.product() && this.quantity < this.product()!.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product()) {
      this.cartService.addToCart(this.product()!, this.quantity);
    }
  }

  getRelatedProducts(): Product[] {
    if (!this.product()) return [];
    return this.productsService.getProductsByCategory(this.product()!.category).slice(0, 3);
  }
}
