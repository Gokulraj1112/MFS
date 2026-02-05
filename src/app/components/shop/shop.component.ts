import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12 mb-4">
          <h2>Shop Flowers</h2>
          <p class="text-muted">Browse our beautiful collection</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="row mb-4">
        <div class="col-md-6">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search flowers..." 
            [(ngModel)]="searchQuery"
            (input)="filterProducts()">
        </div>

        <div class="col-md-6">
          <select class="form-control" [(ngModel)]="selectedCategory" (change)="filterProducts()">
            <option value="">All Categories</option>
            @for (category of categories; track category) {
              <option [value]="category">{{ category }}</option>
            }
          </select>
        </div>
      </div>

      @if (productsService.isLoading()) {
        <div class="text-center">
          <div class="spinner-border"></div>
        </div>
      } @else if (productsService.error()) {
        <div class="alert alert-danger">
          {{ productsService.error() }}
        </div>
      } @else {
        <div class="row">
          @if (filteredProducts().length === 0) {
            <div class="col-12 text-center">
              <p>No products found.</p>
            </div>
          } @else {
            @for (product of filteredProducts(); track product.id) {
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">

                  <img 
                    [src]="adminApi + '/uploads/' + product.image"
                    [alt]="product.name"
                    class="product-image">

                  <div class="card-body d-flex flex-column">
                    <h5>{{ product.name }}</h5>
                    <small class="text-muted">{{ product.category }}</small>
                    <p class="flex-grow-1">{{ product.description }}</p>

                    <div class="d-flex justify-content-between">
                      <span class="text-primary h5">₹{{ product.price }}</span>
                      <span *ngIf="product.stock > 0" class="badge bg-success">
                        In stock ({{ product.stock }})
                      </span>
                      <span *ngIf="product.stock === 0" class="badge bg-danger">
                        Out of stock
                      </span>
                    </div>

                    <div class="mt-3 d-flex gap-2">
                      <a [routerLink]="['/product', product.id]" class="btn btn-outline-secondary flex-fill">
                        View
                      </a>
                      <button *ngIf="product.stock > 0"
                              class="btn btn-primary"
                              (click)="addToCart(product)">
                        Add to cart
                        <span *ngIf="cartService.getCartItemCount(product.id)">
                          ({{ cartService.getCartItemCount(product.id) }})
                        </span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            }
          }
        </div>
      }
    </div>
  `
})
export class ShopComponent implements OnInit {

  adminApi = environment.adminApi;

  searchQuery = '';
  selectedCategory = '';
  categories: string[] = [];
  filteredProducts = signal<Product[]>([]);

  constructor(
    public productsService: ProductsService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe(() => {
      this.categories = this.productsService.getCategories();
      this.filterProducts();
    });
  }

  filterProducts(): void {
    let products = this.productsService.products();

    if (this.searchQuery) {
      products = this.productsService.searchProducts(this.searchQuery);
    }

    if (this.selectedCategory) {
      products = products.filter(p => p.category === this.selectedCategory);
    }

    this.filteredProducts.set(products);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
