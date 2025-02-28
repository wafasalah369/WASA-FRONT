// src/pages/Home.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Button, Container, Grid, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.primary.light,
}));

export default function Home() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Commerce Store
          </Typography>
          {token ? (
            <>
              <Button color="inherit" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <HeroSection elevation={0}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome{user ? `, ${user.name}` : ''}!
          </Typography>
          <Typography variant="h5" component="p">
            Discover amazing products at great prices
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                New Arrivals
              </Typography>
              <Typography>
                Check out our latest collection of products
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Special Offers
              </Typography>
              <Typography>
                Don't miss our exclusive discounts and deals
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Paper sx={{ marginTop: 4, padding: 2 }} elevation={3}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">About Us</Typography>
              <Typography variant="body2">
                Learn more about our company
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Services</Typography>
              <Typography variant="body2">
                Discover our services
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Contact</Typography>
              <Typography variant="body2">
                Get in touch with us
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
            © {new Date().getFullYear()} Your E-Commerce Store. All rights reserved.
          </Typography>
        </Container>
      </Paper>
    </div>
  );
}