import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<!-- ================= HERO SECTION ================= -->
<section class="hero">
  <div class="hero-overlay">
    <div class="hero-content">
      <h1>
        Luxury Flowers <br />
        <span>Designed for Modern Living</span>
      </h1>
      <p>Discover premium floral collections crafted with elegance and perfection.</p>

      <div class="hero-actions">
        <a routerLink="/shop" class="btn-main">Shop Collection</a>
        <a routerLink="/shop" class="btn-outline">Explore</a>
      </div>
    </div>
  </div>
</section>

<!-- ================= CATEGORIES ================= -->
<section class="section">
  <h2 class="section-title">Explore Categories</h2>

  <div class="category-grid">
    <div class="category-card" *ngFor="let c of categories">
      <img [src]="c.image" />
      <div class="category-overlay">
        <h3>{{ c.name }}</h3>
      </div>
    </div>
  </div>
</section>

<!-- ================= PROMO ================= -->
<section class="promo">
  <div class="promo-box">
    <h2>Luxury Spring Collection 🌸</h2>
    <p>Exclusive designs with up to 40% off.</p>
    <a routerLink="/shop" class="btn-main dark">Shop Now</a>
  </div>
</section>

<!-- ================= TRUST ================= -->
<section class="section">
  <div class="trust-grid">
    <div class="trust-card">🌿 Premium Quality</div>
    <div class="trust-card">🚚 Fast Delivery</div>
    <div class="trust-card">💎 Luxury Designs</div>
    <div class="trust-card">❤️ 10,000+ Customers</div>
  </div>
</section>

<!-- ================= TESTIMONIALS ================= -->
<section class="section light-bg">
  <h2 class="section-title">Loved by Customers</h2>

  <div class="testimonial-grid">
    <div class="testimonial-card">
      <p>"Absolutely stunning flowers and premium quality!"</p>
      <h4>- Gokul</h4>
    </div>
    <div class="testimonial-card">
      <p>"Best floral store ever. Highly recommended."</p>
      <h4>- Muni</h4>
    </div>
    <div class="testimonial-card">
      <p>"Luxury packaging and fast delivery."</p>
      <h4>- Rahul</h4>
    </div>
  </div>
</section>

<!-- ================= NEWSLETTER ================= -->
<section class="newsletter">
  <h2>Join Our Luxury Community</h2>
  <p>Get exclusive offers and updates.</p>

  <div class="newsletter-box">
    <input type="email" placeholder="Enter your email" />
    <button>Subscribe</button>
  </div>
</section>

<!-- ================= FOOTER ================= -->
<footer class="footer">
  <div class="footer-grid">
    <div>
      <h3>BloomVerse</h3>
      <p>Luxury floral designs crafted for modern homes and premium lifestyles.</p>
    </div>

    <div>
      <h4>Quick Links</h4>   
      <p><a routerLink="/shop">Shop</a></p> 
      <p><a routerLink="/cart">Cart</a></p>
      <p><a routerLink="/contact">Contact</a></p>
      <p><a routerLink="/about">About Us</a></p>
    </div>

    <div>
      <h4>Customer Support</h4>
      <p><a routerLink="/faq">FAQ</a></p>
     <p><a routerLink="/privacy">Privacy Policy</a></p>
      <p><a routerLink="/terms">Terms & Conditions</a></p>
    </div>

    <div>
      <h4>Contact</h4>
      <p>Email: support&#64;bloomverse.com</p>
      <p>Phone: +91 98765 43210</p>
    </div>
  </div>

  <div class="footer-divider"></div>

  <p class="copyright">© 2026 BloomVerse. All rights reserved.</p>
</footer>

  `,
  styles: [`

/* ================= GLOBAL BACKGROUND (LIKE SHOP PAGE) ================= */
:host {
  display: block;
  font-family: 'Segoe UI', sans-serif;
  color: #343a40;
  background: linear-gradient(135deg, #fce4ec 0%, #bbdefb 100%);
  min-height: 100vh;
}

/* glass effect sections */
.section {
  padding: 90px 8%;
}

.light-bg {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 30px;
  margin: 40px 6%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.section-title {
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 40px;
  font-family: 'Playfair Display', serif;
}

/* ================= HERO (IMAGE BACKGROUND + GLASS CONTENT) ================= */
.hero {
  height: 100vh;
  background: url('/assets/home.png') center/cover no-repeat;
  position: relative;
  border-radius: 0 0 60px 60px;
  overflow: hidden;
}

/* dark + pastel overlay on image */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0.35),
    rgba(244,114,182,0.25),
    rgba(187,222,251,0.25)
  );
}

/* overlay container */
.hero-overlay {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
}

/* transparent glass content */
.hero-content {
  max-width: 720px;
  color: white;
  background: rgba(255, 255, 255, 0.15); /* transparency */
  backdrop-filter: blur(18px);           /* glass effect */
  border: 1px solid rgba(255,255,255,0.25);
  padding: 50px;
  border-radius:28px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.25);
}

/* text styles */
.hero-content h1 {
  font-size: 4rem;
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -1px;
}

.hero-content span {
  background: linear-gradient(45deg, #f472b6, #ce93d8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-content p {
  margin-top: 14px;
  font-size: 1.15rem;
  color: rgba(255,255,255,0.85);
}

/* ================= BUTTONS (SHOP STYLE) ================= */
.btn-main {
  padding: 14px 34px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  background: linear-gradient(45deg, #f8bbd9, #ce93d8);
  color: white;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(206,147,216,0.4);
}

.btn-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(206,147,216,0.5);
}

.btn-main.dark {
  background: #343a40;
}

.btn-outline {
  padding: 14px 32px;
  border-radius: 25px;
  border: 2px solid #ce93d8;
  color: #ce93d8;
  text-decoration: none;
  font-weight: 600;
  background: transparent;
  transition: 0.3s;
}

.btn-outline:hover {
  background: rgba(206,147,216,0.1);
}

/* ================= CATEGORIES ================= */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 22px;
}

.category-card {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  height: 260px;
  cursor: pointer;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.12);
  transition: 0.3s;
}

.category-card:hover {
  transform: translateY(-10px);
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
  display: flex;
  align-items: flex-end;
  padding: 20px;
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
}

/* ================= PROMO ================= */
.promo {
  padding: 80px 8%;
}

.promo-box {
  background: linear-gradient(135deg, #f8bbd9, #e1bee7, #bbdefb);
  padding: 80px;
  border-radius: 35px;
  text-align: center;
  color: #343a40;
  box-shadow: 0 25px 60px rgba(0,0,0,0.15);
}

/* ================= TRUST ================= */

.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.trust-card {
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(12px);
  padding: 22px;
  border-radius: 18px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
}

/* ================= TESTIMONIALS ================= */

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}

.testimonial-card {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  padding: 24px;
  border-radius: 22px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
}

/* ================= NEWSLETTER ================= */
.newsletter {
  text-align: center;

  /* Background image */
  background: url('/assets/update.png') no-repeat center center / cover;

  /* Glass effect overlay */
  position: relative;
  border-radius: 30px;
  padding: 70px 40px;
  margin: 80px 8%;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
  overflow: hidden;
}

/* Glass layer */
.newsletter::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.6); /* adjust transparency */
  backdrop-filter: blur(12px);
  border-radius: 30px;
}

/* Make content visible above overlay */
.newsletter * {
  position: relative;
  z-index: 1;
}

.newsletter-box {
  margin-top: 18px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.newsletter input {
  padding: 12px 20px;
  border-radius: 15px;
  border: 2px solid #e9ecef;
  width: 280px;
}

.newsletter button {
  padding: 12px 26px;
  border-radius: 25px;
  border: none;
  background: linear-gradient(45deg, #f8bbd9, #ce93d8);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.newsletter button:hover {
  transform: scale(1.05);
}


/* ================= FOOTER ================= */
/* ================= PROFESSIONAL FOOTER ================= */
.footer {
  background: linear-gradient(135deg, #0f172a, #020617);
  color: #e5e7eb;
  padding: 80px 8%;
  box-shadow: 0 -20px 60px rgba(0,0,0,0.4);
  position: relative;
  overflow: hidden;
  
}

/* subtle glow effect */
.footer::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(244,114,182,0.15), transparent 40%),
              radial-gradient(circle at bottom right, rgba(187,222,251,0.12), transparent 45%);
  pointer-events: none;
}

/* grid layout */
.footer-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
}

/* headings */
.footer h3 {
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(45deg, #f472b6, #ce93d8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer h4 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 0.4px;
  color: #ffffff;
  position: relative;
}


/* text */
.footer p {
  color: #9ca3af;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.2px;
}


/* links */
.footer a {
  color: #9ca3af;
  text-decoration: none;
  margin-top: 8px;
  font-size: 0.95rem;
  transition: all 0.25s ease;
}

.footer a:hover {
  color: #f472b6;
  transform: translateX(4px);
}

/* divider line */
.footer-divider {
  margin: 40px 0 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
}

/* copyright */
.copyright {
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
  letter-spacing:0.6px
}

  `]
})
export class HomeComponent implements OnInit {

  featuredProducts: Product[] = [];
  imageBaseUrl = environment.adminApi + '/uploads/';

  categories = [
    { name:' Wedding Grandland'  ,image: 'assets/cart1.png '},
    { name: 'Festival Grandland', image: 'assets/cart2.png'},
    { name: 'Stage Decoration ', image: 'assets/cart3.png    ' },
    { name: 'Bouquet', image: 'assets/cart4.png     ' }
  ];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 8);
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getImageUrl(image: string): string {
    if (!image) return 'assets/no-image.png';
    if (image.startsWith('http')) return image;
    return this.imageBaseUrl + image;
  }

  onImageError(event: any) {
    event.target.src = 'assets/no-image.png';
  }
}
