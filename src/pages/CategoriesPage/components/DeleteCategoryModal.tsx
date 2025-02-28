// src/pages/CategoriesPage/components/DeleteCategoryModal.tsx
import { Modal, Button } from 'react-bootstrap';
import { Category } from '@/types/category';

interface DeleteCategoryModalProps {
  show: boolean;
  category?: Category | null;
  onHide: () => void;
  onConfirm: () => void;
}

const DeleteCategoryModal = ({
  show,
  category,
  onHide,
  onConfirm
}: DeleteCategoryModalProps) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {category ? (
          <p>
            Are you sure you want to delete the category <strong>"{category.name}"</strong>?
            {category.products_count && category.products_count > 0 && (
              <span className="text-danger d-block mt-2">
                Warning: This category contains {category.products_count} product(s)!
              </span>
            )}
          </p>
        ) : (
          <p>Are you sure you want to delete this category?</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCategoryModal;