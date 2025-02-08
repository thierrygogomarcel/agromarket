export interface ProductListResponse {
  total: number;
  products: Product[];
}

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sellerId: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
