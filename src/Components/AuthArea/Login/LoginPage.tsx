import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from '@toolpad/core/SignInPage';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Email and password' }];

const signIn: (
  provider: AuthProvider,
  formData?: FormData,
) => Promise<AuthResponse> | void = async (provider, formData) => {
  const promise = new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      const email = formData?.get('email');
      const password = formData?.get('password');
      alert(
        `Signing in with "${provider.name}" and credentials: ${email}, ${password}`,
      );
      resolve({
        type: 'CredentialsSignin',
        error: 'Invalid credentials.',
      });
    }, 300);
  });
  return promise;
};

// Create a dark theme using MUI's theme system
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode by default
    primary: {
      main: '#bb86fc', // Purple color for primary
    },
    secondary: {
      main: '#03dac6', // Teal for secondary
    },
    background: {
      default: '#121212', // Dark background color
      paper: '#1e1e1e', // Paper background color (for card-like components)
    },
    text: {
      primary: '#e0e0e0', // Light text color for primary text
      secondary: '#b0b0b0', // Secondary text color
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

export default function NotificationsSignInPageError() {
  return (
    <ThemeProvider theme={darkTheme}> {/* Wrap everything with ThemeProvider */}
      <AppProvider theme={darkTheme}>
        <SignInPage signIn={signIn} providers={providers} />
      </AppProvider>
    </ThemeProvider>
  );
}
