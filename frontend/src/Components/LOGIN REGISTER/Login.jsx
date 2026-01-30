import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  SwapHoriz,
  ArrowForward,
  Person,
  AdminPanelSettings,
  Group,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import bgimage from "../../assets/tripbg.jpg";

const BackgroundBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${bgimage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    zIndex: 0,
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  maxWidth: 480,
  borderRadius: theme.spacing(3),
  boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)",
  border: "1px solid #e8e8e8",
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: theme.spacing(1.5),
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("traveler"); // "traveler", "organizer", "admin"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      let endpoint;
      let redirectPath;
      
      if (loginType === "admin") {
        endpoint = API_ENDPOINTS.ADMIN_LOGIN;
        redirectPath = "/dashboard";
      } else if (loginType === "organizer") {
        endpoint = API_ENDPOINTS.ORGANIZER_LOGIN;
        redirectPath = "/my-trips";
      } else {
        endpoint = API_ENDPOINTS.USER_LOGIN;
        redirectPath = "/home";
      }

      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.message === "Login successful") {
        // Store user data in localStorage
        const userData = response.data.user || response.data.admin || response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", loginType);
        
        // Navigate based on login type
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.error || "Login failed. Please try again.");
      } else {
        setError("Something went wrong! Please try again.");
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <BackgroundBox>
      <StyledContainer maxWidth="sm">
        <StyledPaper elevation={0}>
        <LogoBox>
          <SwapHoriz
            sx={{
              fontSize: 36,
              color: "#667eea",
              transform: "rotate(90deg)",
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#212121",
              letterSpacing: "-0.5px",
            }}
          >
            TripSync
          </Typography>
        </LogoBox>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            color: "#212121",
            textAlign: "center",
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: "#757575", textAlign: "center" }}
        >
          {loginType === "admin" 
            ? "Sign in to access admin dashboard" 
            : loginType === "organizer"
            ? "Sign in to create and manage your trips"
            : "Sign in to join trips and plan your travels"}
        </Typography>

        {/* Login Type Tabs */}
        <Box sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={loginType}
            onChange={(e, newValue) => {
              setLoginType(newValue);
              setError("");
            }}
            centered
          >
            <Tab
              icon={<Person />}
              iconPosition="start"
              label="Traveler"
              value="traveler"
              sx={{ textTransform: "none", minHeight: 48 }}
            />
            <Tab
              icon={<Group />}
              iconPosition="start"
              label="Organizer"
              value="organizer"
              sx={{ textTransform: "none", minHeight: 48 }}
            />
            <Tab
              icon={<AdminPanelSettings />}
              iconPosition="start"
              label="Admin"
              value="admin"
              sx={{ textTransform: "none", minHeight: 48 }}
            />
          </Tabs>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#9e9e9e" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#ffffff",
                "&:hover fieldset": {
                  borderColor: "#667eea",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#9e9e9e" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    aria-label="toggle password visibility"
                    sx={{ color: "#9e9e9e" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#ffffff",
                "&:hover fieldset": {
                  borderColor: "#667eea",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                },
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Link
              component="button"
              variant="body2"
              sx={{
                color: "#667eea",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
              },
            }}
          >
            Sign In
          </StyledButton>

        

          <Box sx={{ textAlign: "center",marginTop: 2}}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/register")}
                sx={{
                  color: "#667eea",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Create Account
              </Link>
            </Typography>
          </Box>
        </Box>
        </StyledPaper>
      </StyledContainer>
    </BackgroundBox>
  );
};

export default Login;
