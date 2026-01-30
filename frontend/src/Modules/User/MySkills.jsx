import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  FlightTakeoff,
  LocationOn,
  CalendarToday,
  People,
  AttachMoney,
  Visibility,
  CheckCircle,
  Cancel,
  Person,
} from "@mui/icons-material";
import UserNav from "./Components/UserNav";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";

const MySkills = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const joinedTrips = [
    {
      id: 1,
      name: "Summer Beach Trip",
      destination: "Goa, India",
      organizer: "John Doe",
      startDate: "2025-06-15",
      endDate: "2025-06-20",
      status: "upcoming",
      participants: 12,
      maxParticipants: 20,
      budget: 50000,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Mountain Adventure",
      destination: "Manali, India",
      organizer: "Jane Smith",
      startDate: "2025-07-01",
      endDate: "2025-07-05",
      status: "active",
      participants: 8,
      maxParticipants: 15,
      budget: 35000,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const invitedTrips = [
    {
      id: 3,
      name: "City Exploration",
      destination: "Mumbai, India",
      organizer: "Mike Johnson",
      startDate: "2025-05-10",
      endDate: "2025-05-12",
      status: "pending",
      participants: 15,
      maxParticipants: 15,
      budget: 25000,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Desert Safari",
      destination: "Rajasthan, India",
      organizer: "Sarah Wilson",
      startDate: "2025-08-01",
      endDate: "2025-08-05",
      status: "pending",
      participants: 10,
      maxParticipants: 20,
      budget: 40000,
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop",
    },
  ];

  const pastTrips = [
    {
      id: 5,
      name: "Historical Tour",
      destination: "Delhi, India",
      organizer: "David Brown",
      startDate: "2024-12-10",
      endDate: "2024-12-15",
      status: "completed",
      participants: 18,
      maxParticipants: 20,
      budget: 30000,
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "upcoming":
        return "info";
      case "pending":
        return "warning";
      case "completed":
        return "default";
      default:
        return "default";
    }
  };

  const handleAcceptInvitation = (tripId) => {
    // API call to accept invitation
    console.log("Accepting invitation for trip:", tripId);
  };

  const handleRejectInvitation = (tripId) => {
    // API call to reject invitation
    console.log("Rejecting invitation for trip:", tripId);
  };

  const renderTripCard = (trip) => (
    <Grid item xs={12} md={6} lg={4} key={trip.id}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={trip.image}
          alt={trip.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
              {trip.name}
            </Typography>
            <Chip
              label={trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              size="small"
              color={getStatusColor(trip.status)}
            />
          </Box>

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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Person sx={{ fontSize: 18, color: "#757575" }} />
            <Typography variant="body2" color="text.secondary">
              Organized by {trip.organizer}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <People sx={{ fontSize: 18, color: "#757575" }} />
              <Typography variant="body2">
                {trip.participants}/{trip.maxParticipants}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AttachMoney sx={{ fontSize: 18, color: "#757575" }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#667eea" }}>
                ₹{trip.budget.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {trip.status === "pending" ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<CheckCircle />}
                onClick={() => handleAcceptInvitation(trip.id)}
                sx={{
                  flex: 1,
                  background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #3dd16b 0%, #2ee4c7 100%)",
                  },
                }}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Cancel />}
                onClick={() => handleRejectInvitation(trip.id)}
                sx={{ flex: 1, textTransform: "none" }}
                color="error"
              >
                Decline
              </Button>
            </Box>
          ) : (
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Visibility />}
              onClick={() => {
                // Navigate to trip details
                console.log("View trip:", trip.id);
              }}
              sx={{ textTransform: "none" }}
            >
              View Details
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ backgroundColor: "#f8fafd", minHeight: "100vh" }}>
      <UserNav />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
          My Trips
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your trips, view invitations, and track your travel history
        </Typography>

        <Paper sx={{ mb: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={`Joined Trips (${joinedTrips.length})`} />
            <Tab label={`Invitations (${invitedTrips.length})`} />
            <Tab label={`Past Trips (${pastTrips.length})`} />
          </Tabs>
        </Paper>

        {tabValue === 0 && (
          <Box>
            {joinedTrips.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: "center" }}>
                <FlightTakeoff sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No trips joined yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Accept invitations or discover new trips to join
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {joinedTrips.map(renderTripCard)}
              </Grid>
            )}
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            {invitedTrips.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: "center" }}>
                <FlightTakeoff sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No pending invitations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You'll see trip invitations here when organizers invite you
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {invitedTrips.map(renderTripCard)}
              </Grid>
            )}
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            {pastTrips.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: "center" }}>
                <FlightTakeoff sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No past trips
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your completed trips will appear here
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {pastTrips.map(renderTripCard)}
              </Grid>
            )}
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default MySkills;
