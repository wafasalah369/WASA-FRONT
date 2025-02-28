// src/hooks/useCategories.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category, CategoriesResponse, CategoryFormValues } from '../types/category';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get<CategoriesResponse>(`${API_BASE}/categories`, {
        params: {
          page: pagination.page,
          per_page: pagination.perPage,
        },
      });
      
      setCategories(response.data.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.meta.total,
      }));
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (values: CategoryFormValues) => {
    try {
      await axios.post<Category>(`${API_BASE}/categories`, values);
      await fetchCategories();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateCategory = async (id: number, values: CategoryFormValues) => {
    try {
      await axios.put<Category>(`${API_BASE}/categories/${id}`, values);
      await fetchCategories();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/categories/${id}`);
      await fetchCategories();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [pagination.page, pagination.perPage]);

  return {
    categories,
    loading,
    error,
    pagination,
    setPage: (page: number) => setPagination(prev => ({ ...prev, page })),
    setPerPage: (perPage: number) => setPagination(prev => ({ ...prev, perPage })),
    createCategory,
    updateCategory,
    deleteCategory,
    refetch: fetchCategories,
  };
};

export default useCategories;