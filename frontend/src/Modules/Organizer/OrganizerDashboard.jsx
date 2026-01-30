import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import {
  FlightTakeoff,
  Event,
  PersonAdd,
  AttachMoney,
  Add,
  Edit,
  Delete,
  Visibility,
  ArrowForward,
} from "@mui/icons-material";
import OrganizerNav from "./Components/OrganizerNav";
import Footer from "../User/Components/Footer";

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [trips] = useState([
    {
      id: 1,
      name: "Summer Beach Trip",
      destination: "Goa, India",
      startDate: "2025-06-15",
      endDate: "2025-06-20",
      status: "upcoming",
      participants: 12,
      maxParticipants: 20,
      budget: 50000,
      pendingInvitations: 3,
    },
    {
      id: 2,
      name: "Mountain Adventure",
      destination: "Manali, India",
      startDate: "2025-07-01",
      endDate: "2025-07-05",
      status: "active",
      participants: 8,
      maxParticipants: 15,
      budget: 35000,
      pendingInvitations: 0,
    },
    {
      id: 3,
      name: "City Exploration",
      destination: "Mumbai, India",
      startDate: "2025-05-10",
      endDate: "2025-05-12",
      status: "completed",
      participants: 15,
      maxParticipants: 15,
      budget: 25000,
      pendingInvitations: 0,
    },
  ]);

  const stats = {
    createdTrips: trips.length,
    upcomingTrips: trips.filter((t) => t.status === "upcoming").length,
    activeTrips: trips.filter((t) => t.status === "active").length,
    pendingInvitations: trips.reduce((sum, t) => sum + t.pendingInvitations, 0),
    totalExpenses: trips.reduce((sum, t) => sum + t.budget, 0),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "upcoming":
        return "info";
      case "completed":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <OrganizerNav />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
            Organizer Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your trips, invitations, and expenses all in one place
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {stats.createdTrips}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Created Trips
                    </Typography>
                  </Box>
                  <FlightTakeoff sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {stats.upcomingTrips}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Upcoming Trips
                    </Typography>
                  </Box>
                  <Event sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {stats.pendingInvitations}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Pending Invitations
                    </Typography>
                  </Box>
                  <PersonAdd sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                color: "white",
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      ₹{stats.totalExpenses.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Expense Summary
                    </Typography>
                  </Box>
                  <AttachMoney sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Create Trip Button */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => navigate("/organizer/create-trip")}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
              },
            }}
          >
            Create New Trip
          </Button>
        </Box>

        {/* Trips List */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#212121" }}>
          My Trips
        </Typography>

        <Grid container spacing={3}>
          {trips.map((trip) => (
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Chip
                      label={trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      color={getStatusColor(trip.status)}
                      size="small"
                    />
                    {trip.pendingInvitations > 0 && (
                      <Chip
                        label={`${trip.pendingInvitations} Pending`}
                        color="warning"
                        size="small"
                      />
                    )}
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {trip.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {trip.destination}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {trip.startDate} - {trip.endDate}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body2">
                      <strong>{trip.participants}</strong> / {trip.maxParticipants} participants
                    </Typography>
                    <Typography variant="body2">
                      Budget: <strong>₹{trip.budget.toLocaleString()}</strong>
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Visibility />}
                        onClick={() => navigate(`/organizer/itinerary/${trip.id}`)}
                        sx={{ flex: 1 }}
                      >
                        Itinerary
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => navigate(`/organizer/create-trip?edit=${trip.id}`)}
                        sx={{ flex: 1 }}
                      >
                        Edit
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/organizer/invitations/${trip.id}`)}
                        sx={{ flex: 1, fontSize: "0.7rem" }}
                      >
                        Invitations
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/organizer/expenses/${trip.id}`)}
                        sx={{ flex: 1, fontSize: "0.7rem" }}
                      >
                        Expenses
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/organizer/announcements/${trip.id}`)}
                        sx={{ flex: 1, fontSize: "0.7rem" }}
                      >
                        Chat
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {trips.length === 0 && (
          <Paper sx={{ p: 6, textAlign: "center", mt: 4 }}>
            <FlightTakeoff sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No trips created yet
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/organizer/create-trip")}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              Create Your First Trip
            </Button>
          </Paper>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default OrganizerDashboard;

