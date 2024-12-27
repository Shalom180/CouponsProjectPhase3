import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Grid, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import guestService from "../../../services/GuestService";
import { Category } from "../../../models/Category";

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Use useNavigate for navigation

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: Category[] = await guestService.getCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box sx={{ backgroundColor: "var(--background-color)", color: "var(--text-color)", padding: "var(--spacing-md) 0" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info Section */}
          <Grid item xs={12} md={4}>
            <Box>
              <img
                src="/pics/JohnCouponLogoNoBG.png"
                alt="Company Logo"
                style={{ height: "100px", width: "auto" }}
              />
              <Typography variant="h6" sx={{ marginTop: "var(--spacing-sm)" }}>
                JohnCoupon
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "var(--spacing-xs)" }}>
                1234 Coupon Lane, Coupon City, Couponland 56789
              </Typography>
            </Box>
          </Grid>

          {/* Navigation Links Section */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6">NavLinks</Typography>
              <Box sx={{ marginTop: "var(--spacing-sm)" }}>
                <Button
                  onClick={() => navigate("/about")}
                  sx={{
                    display: "block",
                    color: "var(--link-color)",
                    textTransform: "none",
                    marginBottom: "var(--spacing-xs)",
                    "&:hover": { color: "var(--link-hover-color)" },
                  }}
                >
                  About
                </Button>
                <Button
                  onClick={() => navigate("/allcompanies")}
                  sx={{
                    display: "block",
                    color: "var(--link-color)",
                    textTransform: "none",
                    marginBottom: "var(--spacing-xs)",
                    "&:hover": { color: "var(--link-hover-color)" },
                  }}
                >
                  Companies
                </Button>
                <Button
                  onClick={() => navigate("/terms")}
                  sx={{
                    display: "block",
                    color: "var(--link-color)",
                    textTransform: "none",
                    marginBottom: "var(--spacing-xs)",
                    "&:hover": { color: "var(--link-hover-color)" },
                  }}
                >
                  Terms of Service
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Coupon Categories Section */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" sx={{ marginBottom: "var(--spacing-sm)" }}>
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
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Button
                          onClick={() => navigate(`/coupons/category/${category.id}`)}
                          sx={{
                            textTransform: "none",
                            color: "var(--link-color)",
                            "&:hover": { color: "var(--link-hover-color)" },
                          }}
                        >
                          {category.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Bottom */}
      <Box sx={{ textAlign: "center", marginTop: "var(--spacing-md)", color: "var(--footer-text-color)" }}>
        <Typography variant="body2">&copy; {new Date().getFullYear()} JohnCoupon. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
