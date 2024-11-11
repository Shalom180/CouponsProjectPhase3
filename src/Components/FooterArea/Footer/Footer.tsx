import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Link, Grid2, CircularProgress } from '@mui/material';
import guestService from '../../../services/GuestService';

// Define the structure of the category object returned by the API
interface Category {
  id: number;
  name: string;
}

const Footer = () => {
  const [categories, setCategories] = useState<string[]>([]); // Categories are now strings
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: Category[] = await guestService.getCategories(); // Fetch categories
        setCategories(data.map(category => category.name)); // Map category objects to strings (name)
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box sx={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', padding: 'var(--spacing-md) 0' }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          {/* Company Info Section */}
          <Grid2 component="section" sx={{ xs: 12, md: 4 }}>
            <Box>
              <img
                src="/pics/JohnCouponLogoNoBG.png" // Update with your actual logo path
                alt="Company Logo"
                style={{ height: '100px', width: 'auto' }}
              />
              <Typography variant="h6" sx={{ marginTop: 'var(--spacing-sm)' }}>
                JohnCoupon
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 'var(--spacing-xs)' }}>
                1234 Coupon Lane, Coupon City, Couponland 56789
              </Typography>
            </Box>
          </Grid2>

          {/* Navigation Links Section */}
          <Grid2 component="nav" sx={{ xs: 12, md: 4 }}>
            <Box>
              <Typography variant="h6">NavLinks</Typography>
              <Box sx={{ marginTop: 'var(--spacing-sm)' }}>
                <Link
                  href="#"
                  sx={{
                    display: 'block',
                    color: 'var(--link-color)',
                    textDecoration: 'none',
                    marginBottom: 'var(--spacing-xs)',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'var(--link-hover-color)', // Optional hover effect
                    },
                  }}
                >
                  About
                </Link>
                <Link
                  href="#"
                  sx={{
                    display: 'block',
                    color: 'var(--link-color)',
                    textDecoration: 'none',
                    marginBottom: 'var(--spacing-xs)',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'var(--link-hover-color)', // Optional hover effect
                    },
                  }}
                >
                  Companies
                </Link>
                <Link
                  href="#"
                  sx={{
                    display: 'block',
                    color: 'var(--link-color)',
                    textDecoration: 'none',
                    marginBottom: 'var(--spacing-xs)',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'var(--link-hover-color)', // Optional hover effect
                    },
                  }}
                >
                  Terms of Service
                </Link>
              </Box>
            </Box>
          </Grid2>

          

          {/* Coupon Categories Section */}
          <Grid2 component="section" sx={{ xs: 12, md: 4 }}>
            <Box>
              <Typography variant="h6" sx={{ marginBottom: 'var(--spacing-sm)' }}>
                Coupon Categories
              </Typography>

              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              ) : (
                <Box>
                  <ul>
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link href={`/coupons/category/${category}`} sx={{ textDecoration: 'none', color: 'var(--link-color)' }}>
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Container>

      {/* Footer Bottom */}
      <Box sx={{ textAlign: 'center', marginTop: 'var(--spacing-md)', color: 'var(--footer-text-color)' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} JohnCoupon. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
