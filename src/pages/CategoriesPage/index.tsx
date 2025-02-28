// src/pages/CategoriesPage/index.tsx
import { useState } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import useCategories from '../../hooks/useCategories';
import CategoryTable from './components/CategoryTable';
import CategoryFormModal from './components/CategoryFormModal';
import DeleteCategoryModal from './components/DeleteCategoryModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';
import { Category, CategoryFormValues } from '@/types/category';


const CategoriesPage = () => {
  const {
    categories,
    loading,
    error,
    pagination,
    setPage,
    setPerPage,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch,
  } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Category | null>(null);

  const handleSubmit = async (values: CategoryFormValues) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, values);
      } else {
        await createCategory(values);
      }
      setShowForm(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Categories Management</h1>
        <Button onClick={() => setShowForm(true)}>+ New Category</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <CategoryTable
            categories={categories}
            onEdit={(category) => {
              setSelectedCategory(category);
              setShowForm(true);
            }}
            onDelete={setDeleteCandidate}
          />

          <Pagination 
            currentPage={pagination.page}
            perPage={pagination.perPage}
            total={pagination.total}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        </>
      )}

      <CategoryFormModal
        show={showForm}
        category={selectedCategory}
        onHide={() => {
          setShowForm(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteCategoryModal
        category={deleteCandidate}
        show={!!deleteCandidate}
        onHide={() => setDeleteCandidate(null)}
        onConfirm={async () => {
          if (deleteCandidate) {
            await deleteCategory(deleteCandidate.id);
            setDeleteCandidate(null);
          }
        }}
      />
    </Container>
  );
};

export default CategoriesPage;