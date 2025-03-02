// src/types/product.ts
import { Category } from './category';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id: number;
  image_path: string;
  created_at?: string;
  updated_at?: string;
  category?: Category;
}

export interface ProductFormValues {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id: number;
  image?: File | null;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface ProductResponse {
  data: Product;
}

export interface ProductMutationResponse {
  message: string;
  data: Product;
}

export interface ProductFilters {
  search?: string;
  category?: number;
  sort_by?: 'name' | 'price' | 'created_at';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}