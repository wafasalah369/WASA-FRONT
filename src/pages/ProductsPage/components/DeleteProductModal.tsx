// src/pages/ProductsPage/components/DeleteProductModal.tsx
import { Modal, Button } from 'react-bootstrap';
import { Product } from '../../../types/product';

interface DeleteProductModalProps {
  show: boolean;
  product?: Product | null;
  onHide: () => void;
  onConfirm: () => void;
}

const DeleteProductModal = ({ show, product, onHide, onConfirm }: DeleteProductModalProps) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete product <strong>"{product?.name}"</strong>?
        {product?.image_path && (
          <div className="mt-2">
            <img
              src={`${import.meta.env.VITE_API_BASE}/storage/${product.image_path}`}
              alt={product.name}
              style={{ maxWidth: '200px' }}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete Product</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;