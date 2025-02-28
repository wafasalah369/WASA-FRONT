// src/pages/CategoriesPage/components/CategoryFormModal.tsx
import { Category, CategoryFormValues } from '@/types/category';
import { Modal, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
//import { Category, CategoryFormValues } from '../../../../types/category';

interface CategoryFormModalProps {
  show: boolean;
  category?: Category | null;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  onHide: () => void;
}

const CategoryFormModal = ({ show, category, onSubmit, onHide }: CategoryFormModalProps) => {
  const [formValues, setFormValues] = useState<CategoryFormValues>({
    name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    if (category) {
      setFormValues({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formValues);
      onHide();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{category ? 'Edit' : 'Create'} Category</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              required
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={formValues.slug}
              onChange={(e) => setFormValues({ ...formValues, slug: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formValues.description}
              onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryFormModal;