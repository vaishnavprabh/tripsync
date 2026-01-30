import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Divider,
} from "@mui/material";
import {
  FlightTakeoff,
  People,
  AttachMoney,
  Chat,
  CalendarToday,
  LocationOn,
} from "@mui/icons-material";
import UserNav from "./Components/UserNav";
import Footer from "./Components/Footer";
import bgimage from "../../assets/tripbg.jpg";

const About = () => {
  const features = [
    {
      icon: <FlightTakeoff sx={{ fontSize: 48 }} />,
      title: "Trip Planning",
      description: "Create detailed itineraries with day-wise plans, activities, and time slots.",
    },
    {
      icon: <People sx={{ fontSize: 48 }} />,
      title: "Invitation Management",
      description: "Invite travelers via email or share links. Track join status in real-time.",
    },
    {
      icon: <AttachMoney sx={{ fontSize: 48 }} />,
      title: "Expense Sharing",
      description: "Automatically split costs, track expenses, and manage balances seamlessly.",
    },
    {
      icon: <Chat sx={{ fontSize: 48 }} />,
      title: "Communication",
      description: "Post announcements, send notifications, and manage group chats.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f8fafd", minHeight: "100vh" }}>
      <UserNav />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          color: "white",
          py: { xs: 8, md: 12 },
          mb: 6,
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
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.88) 0%, rgba(118, 75, 162, 0.92) 100%)",
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
            About TripSync
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              opacity: 0.95,
              textShadow: "0 1px 5px rgba(0,0,0,0.2)",
              maxWidth: 800,
              mx: "auto",
            }}
          >
            Simplifying group travel planning, one trip at a time
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {/* Mission Section */}
        <Paper sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "#212121" }}>
            Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.8 }}>
            TripSync is a smart, centralized trip management platform specifically tailored for simplifying group travel,
            whether it's for college field trips, student exchange programs, or casual friends' outings. We eliminate
            the logistical headaches of coordinating multiple people by providing a truly collaborative environment.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            By structuring the planning process, managing communication channels, and providing clear visibility into
            all aspects of the trip, TripSync dramatically reduces confusion and ensures a seamless, well-coordinated
            travel experience for every member of the group.
          </Typography>
        </Paper>

        {/* Features Grid */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "#212121", textAlign: "center" }}>
            Key Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: "#667eea", mb: 2, display: "flex", justifyContent: "center" }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#212121" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How It Works */}
        <Paper sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "#212121" }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: "#667eea",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Create Your Trip
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Organizers can effortlessly set up detailed itineraries with dates, destinations, and activities.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: "#667eea",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Invite Travelers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Send invitations via email or share a link. Travelers can join and view trip details.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: "#667eea",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  3
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Plan & Share Expenses
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track expenses, split costs automatically, and ensure full transparency for all travelers.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Benefits */}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "#212121" }}>
            Why Choose TripSync?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <LocationOn sx={{ color: "#667eea", fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Centralized Planning
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    All trip details, itineraries, and communications in one place.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <CalendarToday sx={{ color: "#667eea", fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Easy Coordination
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Track attendance, manage invitations, and share updates effortlessly.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <AttachMoney sx={{ color: "#667eea", fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Transparent Expenses
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Integrated expense-sharing ensures smooth cost reconciliation.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Chat sx={{ color: "#667eea", fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Seamless Communication
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Group chats, announcements, and real-time notifications keep everyone informed.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default About;
