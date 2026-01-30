import React from "react";
import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";
import { SwapHoriz, Email, Phone, LocationOn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f2f2f2",
        borderTop: "2px solid #e0e0e0",
        mt: 8,
        py: 6,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <SwapHoriz
                sx={{
                  fontSize: 28,
                  color: "#667eea",
                  transform: "rotate(90deg)",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                TripSync
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Plan group travels seamlessly. Create trips, invite friends, and share expenses with ease.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Box
                component="a"
                href="#"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#c8d8e4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#667eea",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#667eea",
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                  },
                }}
              >
                <Email />
              </Box>
              <Box
                component="a"
                href="#"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#c8d8e4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#667eea",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#667eea",
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                  },
                }}
              >
                <Phone />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              About
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="/about"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                About Us
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                Our Mission
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                How It Works
              </Link>
              <Link
                href="/contact"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                Contact Us
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Resources
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                User Guide
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                Help Center
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                FAQs
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                Community Guidelines
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Legal
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                Terms & Conditions
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  "&:hover": {
                    color: "#667eea",
                    fontWeight: 500,
                  },
                }}
              >
                Safety & Security
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#e0e0e0" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} TripSync. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link
              href="#"
              color="text.secondary"
              underline="hover"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "#2b6777",
                  fontWeight: 500,
                },
              }}
            >
              Privacy
            </Link>
            <Link
              href="#"
              color="text.secondary"
              underline="hover"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "#2b6777",
                  fontWeight: 500,
                },
              }}
            >
              Terms
            </Link>
            <Link
              href="#"
              color="text.secondary"
              underline="hover"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "#2b6777",
                  fontWeight: 500,
                },
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

