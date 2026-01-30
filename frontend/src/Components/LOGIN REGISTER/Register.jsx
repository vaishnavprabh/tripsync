import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  SwapHoriz,
  ArrowForward,
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  maxWidth: 600,
  width: "100%",
  margin: "0 auto",
  borderRadius: theme.spacing(3),
  boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)",
  border: "1px solid #e8e8e8",
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
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

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userRole, setUserRole] = useState("traveler"); // "traveler" or "organizer"
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    role: "traveler",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRoleChange = (e, newValue) => {
    setUserRole(newValue);
    setUser({ ...user, role: newValue });
    setError("");
  };

  const addusers = async () => {
    try {
      // Validation
      if (
        !user.name ||
        !user.email ||
        !user.phone ||
        !user.password ||
        !user.cpassword ||
        !user.role
      ) {
        setError("All fields are required.");
        return;
      }

      if (user.password !== user.cpassword) {
        setError("Passwords do not match!");
        return;
      }

      if (user.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      // Prepare data for API (exclude cpassword)
      const { cpassword, ...userData } = user;

      // API call
      const response = await axios.post(
        API_ENDPOINTS.REGISTER_USER,
        userData
      );
      setSuccess(`${userRole === "organizer" ? "Organizer" : "Traveler"} Registered Successfully!`);
      setError("");
      console.log(response.data);

      // Clear form after success
      setUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        role: "traveler",
      });
      setUserRole("traveler");

      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setSuccess("");
      // Backend error message
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Registration failed!");
      } else {
        setError("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <BackgroundBox>
      <StyledContainer maxWidth="md">
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
          Create Your Account
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: "#757575", textAlign: "center" }}
        >
          Join TripSync and start planning your group travels today
        </Typography>

        {/* Role Selection Tabs */}
        <Box sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={userRole}
            onChange={handleRoleChange}
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
          </Tabs>
        </Box>

        <Box sx={{ width: "100%" }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {success}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#9e9e9e" }} />
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={user.phone}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: "#9e9e9e" }} />
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleChange}
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
                        onClick={() => setShowPassword(!showPassword)}
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="cpassword"
                type={showConfirmPassword ? "text" : "password"}
                value={user.cpassword}
                onChange={handleChange}
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                        sx={{ color: "#9e9e9e" }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            </Grid>
          </Grid>

          <StyledButton
            fullWidth
            variant="contained"
            size="large"
            onClick={addusers}
            endIcon={<ArrowForward />}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
              },
            }}
          >
            Create Account
          </StyledButton>

          
          <Box sx={{ textAlign: "center" ,marginTop: 2}}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{
                  color: "#667eea",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
        </StyledPaper>
      </StyledContainer>
    </BackgroundBox>
  );
};

export default Register;
