import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Search,
  FlightTakeoff,
  Person,
  SwapHoriz,
  LocationOn,
  CalendarToday,
  People,
  AttachMoney,
  ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserNav from "./Components/UserNav";
import Footer from "./Components/Footer";
import { styled } from "@mui/material/styles";
import bgimage from "../../assets/tripbg.jpg";

const HeroPaper = styled(Paper)(({ theme }) => ({
  p: 1,
  display: "flex",
  alignItems: "center",
  maxWidth: 700,
  margin: "0 auto",
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.shadows[12],
  border: `1px solid ${theme.palette.grey[200]}`,
  backdropFilter: "blur(5px)",
}));

const TripCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  borderRadius: theme.shape.borderRadius * 3,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: theme.shadows[4],
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[15],
    borderColor: theme.palette.primary.main,
    "& .trip-image": {
      transform: "scale(1.05)",
    },
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease",
  borderRadius: theme.shape.borderRadius * 3,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: theme.shadows[3],
  height: "100%",
  "&:hover": {
    boxShadow: theme.shadows[8],
    transform: "translateY(-4px)",
    borderColor: theme.palette.primary.main,
  },
}));

const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const featuredTrips = [
    {
      id: 1,
      name: "Summer Beach Adventure",
      destination: "Goa, India",
      startDate: "2025-06-15",
      endDate: "2025-06-20",
      organizer: "John Doe",
      participants: 12,
      maxParticipants: 20,
      budget: 50000,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Mountain Trekking",
      destination: "Manali, India",
      startDate: "2025-07-01",
      endDate: "2025-07-05",
      organizer: "Jane Smith",
      participants: 8,
      maxParticipants: 15,
      budget: 35000,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "City Exploration",
      destination: "Mumbai, India",
      startDate: "2025-05-10",
      endDate: "2025-05-12",
      organizer: "Mike Johnson",
      participants: 15,
      maxParticipants: 15,
      budget: 25000,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const features = [
    {
      title: "Easy Trip Planning",
      description: "Create detailed itineraries, manage dates, and organize activities all in one place.",
      icon: <CalendarToday sx={{ fontSize: 48 }} />,
      color: "#667eea",
    },
    {
      title: "Smart Invitations",
      description: "Invite friends via email or share a link. Track who's joining in real-time.",
      icon: <People sx={{ fontSize: 48 }} />,
      color: "#f093fb",
    },
    {
      title: "Expense Sharing",
      description: "Automatically split costs, track expenses, and settle balances seamlessly.",
      icon: <AttachMoney sx={{ fontSize: 48 }} />,
      color: "#4facfe",
    },
    {
      title: "Group Communication",
      description: "Stay connected with announcements, group chat, and real-time updates.",
      icon: <SwapHoriz sx={{ fontSize: 48 }} />,
      color: "#43e97b",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/my-skills?search=${searchQuery}`);
    } else {
      navigate("/my-skills");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f8fafd", minHeight: "100vh" }}>
      <UserNav />

      {/* Hero Banner */}
      <Box
        sx={{
          position: "relative",
          color: "white",
          py: { xs: 10, md: 15 },
          mb: { xs: 6, md: 10 },
          overflow: "hidden",
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(102, 219, 234, 0.38) 0%, rgba(75, 162, 107, 0.42) 100%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              textAlign: "center",
              textShadow: "0 4px 15px rgba(0,0,0,0.4)",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            TripSync: Plan Group Travels Together
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 4, md: 6 },
              textAlign: "center",
              opacity: 0.95,
              textShadow: "0 1px 5px rgba(0,0,0,0.2)",
              maxWidth: 800,
              mx: "auto",
            }}
          >
            Simplify group travel planning. Create trips, invite friends, share expenses, and make memories together.
          </Typography>

          <HeroPaper component="form" onSubmit={handleSearch}>
            <TextField
              fullWidth
              placeholder="Search for trips, destinations, or organizers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#667eea", ml: 2, fontSize: 28 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ ml: 1, py: 0.5 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                borderRadius: 2,
                px: { xs: 2, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  boxShadow: "0 6px 25px rgba(102, 126, 234, 0.6)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
                whiteSpace: 'nowrap',
              }}
            >
              Discover Trips
            </Button>
          </HeroPaper>

          <Box sx={{ display: "flex", justifyContent: "center", gap: { xs: 1.5, sm: 3 }, mt: { xs: 4, md: 8 } }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<FlightTakeoff />}
              onClick={() => navigate("/my-skills")}
              sx={{
                backgroundColor: "#ffffff",
                color: "#667eea",
                px: { xs: 2, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                },
                fontWeight: 600,
              }}
            >
              My Trips
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<FlightTakeoff />}
              sx={{
                borderColor: "white",
                borderWidth: 2,
                color: "white",
                px: { xs: 2, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: 3,
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 6px 20px rgba(255,255,255,0.2)",
                },
                fontWeight: 600,
              }}
              onClick={() => navigate("/register")}
            >
              Create Trip
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 10 }}>
        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#212121", textAlign: "center" }}>
            Why Choose TripSync?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mb: 4 }}>
            Everything you need for seamless group travel planning
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard>
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <Box
                      sx={{
                        color: feature.color,
                        mb: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#212121" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Trips */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#212121" }}>
              Featured Trips
            </Typography>
            <Button
              endIcon={<ArrowForward />}
              onClick={() => navigate("/my-skills")}
              sx={{ textTransform: "none", color: "#667eea" }}
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {featuredTrips.map((trip) => (
              <Grid item xs={12} md={4} key={trip.id}>
                <TripCard onClick={() => navigate(`/my-skills`)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={trip.image}
                    alt={trip.name}
                    className="trip-image"
                    sx={{ transition: "transform 0.3s ease" }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {trip.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <LocationOn sx={{ fontSize: 18, color: "#757575" }} />
                      <Typography variant="body2" color="text.secondary">
                        {trip.destination}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <CalendarToday sx={{ fontSize: 18, color: "#757575" }} />
                      <Typography variant="body2" color="text.secondary">
                        {trip.startDate} - {trip.endDate}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <People sx={{ fontSize: 18, color: "#757575" }} />
                        <Typography variant="body2">
                          {trip.participants}/{trip.maxParticipants}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#667eea" }}>
                        ₹{trip.budget.toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                      Organized by {trip.organizer}
                    </Typography>
                  </CardContent>
                </TripCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 8 }} />
      </Container>

      <Footer />
    </Box>
  );
};

export default Homepage;
