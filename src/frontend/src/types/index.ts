export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  icon: string;
  color: string; // tailwind bg class
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  description: string;
  imageUrl: string;
  featured: boolean;
  stock: number;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  productId: number;
  approved: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
