export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}