// src/pages/ProductsPage/index.tsx
import { useState, useEffect  } from 'react';
import { Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import useProducts from '../../hooks/useProducts';
import ProductTable from './components/ProductTable';
import ProductFormModal from './components/ProductFormModal';
import DeleteProductModal from './components/DeleteProductModal';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Product, ProductFilters, ProductFormValues } from '@/types/product';
import useCategories from '../../hooks/useCategories';
import { Category } from '@/types/category';

const ProductsPage = () => {
  const {
    products,
    loading,
    error,
    filters,
    setFilters,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch,
  } = useProducts();
 
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleFilterChange = (name: keyof ProductFilters, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };
  const { categories: allCategories, fetchCategories } = useCategories();
  const [categories, setCategories] = useState<Category[]>([]);
  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data); // Now data will be properly typed
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, []);
  // Add this to your ProductsPage component
    const handleFormClose = () => {
        setShowForm(false);
        setSelectedProduct(null); // Clear selected product
    };
    
  const handleSubmit = async (values: ProductFormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });
    
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setShowForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Product Management</h1>
        </Col>
        <Col xs="auto">
          <Button onClick={() => setShowForm(true)}>Add Product</Button>
        </Col>
      </Row>

      <Row className="mb-3 g-3">
        <Col md={4}>
          <Form.Control
            type="search"
            placeholder="Search products..."
            value={filters.search || ''}
            onChange={handleSearch}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                 {category.name}
            </option>
          ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={`${filters.sort_by}|${filters.sort_order}`}
            onChange={(e) => {
              const [sort_by, sort_order] = e.target.value.split('|');
              handleFilterChange('sort_by', sort_by || undefined);
              handleFilterChange('sort_order', sort_order || undefined);
            }}
          >
            <option value="">Default Sorting</option>
            <option value="name|asc">Name (A-Z)</option>
            <option value="name|desc">Name (Z-A)</option>
            <option value="price|asc">Price (Low to High)</option>
            <option value="price|desc">Price (High to Low)</option>
          </Form.Select>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ProductTable
            products={products}
            onEdit={(product) => {
                setSelectedProduct(product);
                setShowForm(true); // Add this to open the modal
              }}
            onDelete={setDeleteCandidate}
          />
          
          <Pagination
            currentPage={filters.page || 1}
            perPage={filters.per_page || 10}
            total={products.length}
            onPageChange={(page) => setFilters(prev => ({ ...prev, page }))}
            onPerPageChange={(per_page) => setFilters(prev => ({ ...prev, per_page }))}
          />
        </>
      )}

      <ProductFormModal
        show={showForm}
        product={selectedProduct}
        categories={categories}
        onHide={() => {
          setShowForm(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteProductModal
        product={deleteCandidate}
        show={!!deleteCandidate}
        onHide={() => setDeleteCandidate(null)}
        onConfirm={async () => {
          if (deleteCandidate) {
            await deleteProduct(deleteCandidate.id);
            setDeleteCandidate(null);
          }
        }}
      />
    </Container>
  );
};

export default ProductsPage;