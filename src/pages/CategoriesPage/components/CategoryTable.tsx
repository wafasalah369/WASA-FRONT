// src/pages/CategoriesPage/components/CategoryTable.tsx

import { Category } from "@/types/category";
import { Button, Table } from "@mui/material";


interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryTable = ({ categories, onEdit, onDelete }: CategoryTableProps) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Description</th>
          <th>Products</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.name}</td>
            <td>{category.slug}</td>
            <td>{category.description || '-'}</td>
            <td>{category.products_count || 0}</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onEdit(category)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(category)}
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

export default CategoryTable;