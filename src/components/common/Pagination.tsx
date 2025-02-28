// src/components/common/Pagination.tsx
import { Pagination as BSPagination, Form, Row, Col } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
  className
}: PaginationProps) => {
  const totalPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Row className={`align-items-center ${className || ''}`}>
      <Col md={6} className="mb-2 mb-md-0">
        <BSPagination>
          <BSPagination.Prev
            disabled={isFirstPage}
            onClick={() => onPageChange(currentPage - 1)}
          />
          <BSPagination.Item active>{currentPage}</BSPagination.Item>
          <BSPagination.Next
            disabled={isLastPage || totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </BSPagination>
      </Col>
      
      <Col md={6} className="d-flex align-items-center justify-content-md-end">
        <div className="d-flex align-items-center">
          <span className="me-2 text-muted small">Items per page:</span>
          <Form.Select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            size="sm"
            style={{ width: '80px' }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Form.Select>
        </div>
      </Col>
    </Row>
  );
};

export default Pagination;