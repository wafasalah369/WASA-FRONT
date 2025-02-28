// src/components/common/LoadingSpinner.tsx
import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
  size?: 'sm' | undefined;
  message?: string;
  className?: string;
}

const LoadingSpinner = ({ size, message, className }: LoadingSpinnerProps) => {
  return (
    <div className={`d-flex flex-column align-items-center ${className || ''}`}>
      <Spinner
        animation="border"
        role="status"
        size={size}
        className="mb-2"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && <div className="text-muted small">{message}</div>}
    </div>
  );
};

export default LoadingSpinner;