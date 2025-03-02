// src/pages/ProductsPage/components/ProductFormModal.tsx
import { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, } from 'react-bootstrap';
import { Product, ProductFormValues } from '../../../types/product';
import { Category } from '@/types/category';

interface ProductFormModalProps {
  show: boolean;
  product?: Product | null;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onHide: () => void;
  categories: Category[];
}

const ProductFormModal = ({ show, product, categories, onSubmit, onHide }: ProductFormModalProps) => {
  const [formValues, setFormValues] = useState<ProductFormValues>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: 0,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setFormValues({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image: undefined,
      });
    } else {
        // Reset form for new products
        setFormValues({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          category_id: 0,
          image: undefined,
        });
      }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formValues,
      image: selectedImage || undefined,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Edit' : 'Create'} Product</Modal.Title>
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

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  required
                  value={formValues.price}
                  onChange={(e) => setFormValues({ ...formValues, price: parseFloat(e.target.value) })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock *</Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={formValues.stock}
                  onChange={(e) => setFormValues({ ...formValues, stock: parseInt(e.target.value) })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formValues.description}
              onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category *</Form.Label>
            <Form.Select
              required
              value={formValues.category_id}
              onChange={(e) => setFormValues({ ...formValues, category_id: parseInt(e.target.value) })}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image {!product && '*'}</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!product}
            />
            {product?.image_path && (
              <div className="mt-2">
                <img
                  src={`${import.meta.env.VITE_API_BASE}/storage/${product.image_path}`}
                  alt="Current"
                  style={{ maxWidth: '200px' }}
                />
              </div>
            )}
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

export default ProductFormModal;