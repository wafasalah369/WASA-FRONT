// src/pages/Login.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert, Paper } from '@mui/material';
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.user && response.data.token) {
        login(response.data.token, response.data.user);
        navigate('/profile');
      }
    } catch (err: any) {
      if (err.response?.status === 422) {
        const errorMessage = err.response.data.message || 'Validation failed';
        const fieldErrors = err.response.data.errors;
        
        if (fieldErrors?.email) {
          setError(fieldErrors.email[0]);
        } else {
          setError(errorMessage);
        }
      } else if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              autoComplete="email"
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              autoComplete="current-password"
            />
            
            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              sx={{ mt: 3 }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Container>

      <Footer />
    </>
  );
}
