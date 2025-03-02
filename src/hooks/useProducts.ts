// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, ProductFormValues, ProductsResponse, ProductFilters } from '../types/product';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    per_page: 10,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ProductsResponse>(`${API_BASE}/products`, {
        params: filters,
      });
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (formData: FormData) => {
    try {
      const response = await axios.post<Product>(`${API_BASE}/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchProducts();
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateProduct = async (id: number, formData: FormData) => {
    try {
        formData.append('_method', 'PUT');
      const response = await axios.post<Product>(`${API_BASE}/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchProducts();
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return {
    products,
    loading,
    error,
    filters,
    setFilters,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
};

export default useProducts;