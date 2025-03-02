// src/pages/ProductsPage/components/ProductTable.tsx
import { Table, Button, Image } from 'react-bootstrap';
import { Product } from '../../../types/product';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  const getImageUrl = (path: string) => 
    `${import.meta.env.VITE_API_BASE}/storage/${path}`;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              {product.image_path && (
                <Image
                  src={getImageUrl(product.image_path)}
                  alt={product.name}
                  thumbnail
                  style={{ maxWidth: '80px' }}
                />
              )}
            </td>
            <td>{product.name}</td>
            <td>${Number(product.price).toFixed(2)}</td>
            <td>{product.stock}</td>
            <td>{product.category?.name || '-'}</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onEdit(product)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(product)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;