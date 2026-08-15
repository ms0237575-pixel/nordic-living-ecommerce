export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  collection: string;
  description: string;
  image: string;
  images?: string[];
  gallery?: string[];
  featured: boolean;
  newArrival: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
