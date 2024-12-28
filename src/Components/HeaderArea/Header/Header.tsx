import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { AccountCircle } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { store } from '../../../store';
import { authSlice } from '../../../reducers/AuthSlice';

// Custom theme for dark mode
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#3FC48D',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
  },
});

interface Page {
  name: string;
  url: string;
}

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve state from the Redux store
  const clientType = store.getState().auth.clientType;
  const clientId = store.getState().auth.id;
  const username = store.getState().auth.username;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Dynamically calculate the pages based on the authentication state
  const pages: Page[] = [
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/allcategories' },
    { name: 'Companies', url: '/allcompanies' },
    ...(clientType === 'ADMINISTRATOR' ? [{ name: 'Customers', url: '/allcustomers' }] : []),
    { name: 'About', url: '/about' },
  ];
  const settings = [
    {
      name: 'Account',
      type: 'link',
      url:
        clientType === 'ADMINISTRATOR'
          ? '/admin'
          : clientType === 'COMPANY'
          ? `/company/${clientId}`
          : clientType === 'CUSTOMER'
          ? `/onecustomer/${clientId}`
          : '/',
    },
    {
      name: 'Logout',
      type: 'action',
      action: () => {
        dispatch(authSlice.actions.logout());
        navigate('/'); // Redirect to homepage
      },
    },
  ];
  

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" sx={{ backgroundColor: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ display: 'flex', mr: 1 }} component={Link} to="/">
              <img
                src="/pics/JohnCOuponLogoNoBG.png"
                alt="Logo"
                style={{ height: '40px', width: 'auto' }}
              />
            </Box>

            {/* Main Title */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: '"Roboto", sans-serif',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              JohnCoupon
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to={page.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.url}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* User Account Section */}
            <Box sx={{ flexGrow: 0 }}>
              {localStorage.getItem('token') ? (
                <>
                  {`Hello ${username || 'User'}`}
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <AccountCircle color="secondary" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        onClick={() => {
                          handleCloseUserMenu();
                          if (setting.type === 'link' && setting.url) {
                            navigate(setting.url);
                          } else if (setting.type === 'action' && setting.action) {
                            setting.action();
                          }
                        }}
                      >
                        <Typography textAlign="center">{setting.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/guest/login"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Sign in/Sign up
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default ResponsiveAppBar;


