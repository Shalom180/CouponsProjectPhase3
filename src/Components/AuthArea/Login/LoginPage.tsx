import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Box, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../services/AuthService';
import { LoginRequest } from '../../../models/LoginRequest';
import { authSlice } from '../../../reducers/AuthSlice';
import { store } from '../../../store'; // Corrected named import

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
    
  },
});

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(new LoginRequest(email, password));

      if (response) {
        store.dispatch(authSlice.actions.login(response)); // Storing JWT token in Redux
        setToken(response);
        setError(null);

        const clientType: string = store.getState().auth.clientType;
        if (clientType === 'ADMINISTRATOR') {
          navigate('/allcompanies');
        } else if (clientType === 'COMPANY') {
          navigate('/coupons/company/' + store.getState().auth.id)
        }
          
          else {
          navigate('/');
        }
      } else {
        setError('Invalid credentials.');
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError('An error occurred while signing in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>

          {error && (
            <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              sx={{
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#bb86fc' },
                  '&:hover fieldset': { borderColor: '#bb86fc' },
                  '&.Mui-focused fieldset': { borderColor: '#bb86fc' },
                },
                color: 'white',
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              sx={{
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#bb86fc' },
                  '&:hover fieldset': { borderColor: '#bb86fc' },
                  '&.Mui-focused fieldset': { borderColor: '#bb86fc' },
                },
                color: 'white',
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ marginTop: 2 }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{
              marginTop: 2,
              color: 'var(--text-color)',
            }}
          >
            Don't have an account?{' '}
            <Link
              to="/guest/signup"
              style={{
                color: '#bb86fc',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
