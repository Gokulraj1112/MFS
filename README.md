# BloomVerse Customer App 🌸

A beautiful, modern flower shop web application built with Angular 17 and Bootstrap 5, featuring a soft pastel theme and complete e-commerce functionality.

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with JWT tokens
- Secure token storage in localStorage
- Protected routes for authenticated users only
- Automatic token validation and logout

### 🛍️ Shopping Experience
- Browse beautiful flower collections
- Search and filter products by category
- Detailed product pages with high-quality images
- Real-time stock availability
- Shopping cart with persistent state
- Secure checkout process

### 📱 User Interface
- Soft pastel color scheme (pinks, lavenders, mint greens)
- Fully responsive design for all devices
- Smooth animations and hover effects
- Clean, modern Bootstrap 5 components
- Intuitive navigation with cart badge
- Loading states and error handling

### 📦 Order Management
- Place orders with multiple items
- View order history with detailed information
- Track order status (NEW, PROCESSING, DELIVERED)
- Order confirmation and success feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (v17 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bloomverse-customer-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🏗️ Architecture

### Technology Stack
- **Frontend Framework**: Angular 17 (Standalone Components)
- **UI Framework**: Bootstrap 5
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Authentication**: JWT Bearer Tokens

### Project Structure
```
src/
├── app/
│   ├── components/          # Feature components
│   │   ├── home/           # Homepage component
│   │   ├── shop/           # Product listing
│   │   ├── product-details/ # Individual product view
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Order placement
│   │   ├── login/          # User authentication
│   │   ├── register/       # User registration
│   │   ├── my-orders/      # Order history
│   │   └── shared/         # Shared components (navbar)
│   ├── services/           # Business logic services
│   │   ├── auth.service.ts     # Authentication management
│   │   ├── products.service.ts # Product data handling
│   │   ├── cart.service.ts     # Shopping cart logic
│   │   └── orders.service.ts   # Order management
│   ├── models/             # TypeScript interfaces
│   │   ├── product.model.ts    # Product data types
│   │   ├── order.model.ts      # Order data types
│   │   └── user.model.ts       # User data types
│   ├── guards/             # Route protection
│   │   └── auth.guard.ts       # Authentication guard
│   ├── app.routes.ts       # Application routing
│   └── app.component.ts    # Root component
├── global_styles.css       # Global styling
└── index.html             # Main HTML template
```

## 🔌 API Integration

### Authentication Endpoints
- **Register**: `POST /api/auth/user/register`
- **Login**: `POST /api/auth/user/login`

### Product Endpoints
- **Get Products**: `GET /api/products`

### Order Endpoints
- **Create Order**: `POST /api/orders`
- **Get My Orders**: `GET /api/orders/my`

### Authentication Headers
All protected API calls include:
```
Authorization: Bearer <jwt_token>
```

## 📊 Data Models

### Product Model
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string; // base64 encoded
  description: string;
}
```

### Order Model
```typescript
interface Order {
  order_id: number;
  total: number;
  status: 'NEW' | 'PROCESSING' | 'DELIVERED';
  created_at: string;
  items: OrderItem[];
}
```

## 🎨 Design System

### Color Palette
- **Primary Pink**: `#fce4ec`
- **Rose**: `#f8bbd9`
- **Lavender**: `#e1bee7`
- **Purple**: `#ce93d8`
- **Mint**: `#c8e6c9`
- **Peach**: `#ffccbc`
- **Sky Blue**: `#bbdefb`

### Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headings**: 700 weight with gradient text effects
- **Body**: 400 weight with proper line spacing

### Components
- **Cards**: Rounded corners (20px) with soft shadows
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Rounded inputs (15px) with focus states
- **Navigation**: Glass-morphism effect with backdrop blur

## 🔒 Security Features

- JWT token-based authentication
- Protected routes with authentication guards
- Secure token storage in localStorage
- Automatic token validation
- CSRF protection through proper headers

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Optimized layouts for medium screens
- **Mobile**: Touch-friendly interface with collapsible navigation

## 🧪 Development Guidelines

### Code Style
- Use Angular 17 standalone components
- Implement reactive patterns with Angular Signals
- Follow TypeScript strict mode
- Use proper error handling and loading states

### State Management
- Cart state persisted in localStorage
- User authentication state managed globally
- Product data cached in services
- Reactive updates using Angular Signals

## 🚀 Deployment

### Environment Configuration
Create environment files for different deployment stages:
- `environment.ts` (development)
- `environment.prod.ts` (production)

### Build Commands
```bash
# Development build
ng build

# Production build
ng build --configuration production

# Serve production build locally
ng serve --configuration production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Bootstrap team for the excellent UI framework
- Angular team for the powerful frontend framework
- Unsplash for beautiful flower imagery inspiration
- The open-source community for continuous inspiration

---

**BloomVerse** - Where every flower tells a story 🌺