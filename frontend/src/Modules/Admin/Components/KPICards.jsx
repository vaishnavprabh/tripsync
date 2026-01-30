import React from "react";
import { Grid, Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import {
  People,
  FlightTakeoff,
  Flight,
  Warning,
  TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const KPICards = ({ metrics }) => {
  const navigate = useNavigate();

  const kpiData = [
    {
      title: "Total Users",
      value: metrics?.totalUsers || 0,
      icon: <People sx={{ fontSize: 40 }} />,
      color: "#1976d2",
      bgColor: "#e3f2fd",
      path: "/admin/users",
    },
    {
      title: "Total Trips",
      value: metrics?.totalTrips || 0,
      icon: <FlightTakeoff sx={{ fontSize: 40 }} />,
      color: "#9c27b0",
      bgColor: "#f3e5f5",
      path: "/admin/trips",
    },
    {
      title: "Active Trips",
      value: metrics?.activeTrips || 0,
      icon: <Flight sx={{ fontSize: 40 }} />,
      color: "#2e7d32",
      bgColor: "#e8f5e9",
      path: "/admin/trips?status=active",
    },
    {
      title: "System Alerts",
      value: metrics?.systemAlerts || 0,
      icon: <Warning sx={{ fontSize: 40 }} />,
      color: "#d32f2f",
      bgColor: "#ffebee",
      path: "/admin/feedback",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {kpiData.map((kpi, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              height: "100%",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "1px solid #e0e0e0",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
            onClick={() => navigate(kpi.path)}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: kpi.bgColor,
                    borderRadius: 2,
                    p: 1.5,
                    color: kpi.color,
                  }}
                >
                  {kpi.icon}
                </Box>
                {kpi.title.includes("Active") && (
                  <TrendingUp sx={{ color: "#2e7d32", fontSize: 20 }} />
                )}
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#212121",
                  mb: 0.5,
                }}
              >
                {kpi.value.toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#757575",
                  fontWeight: 500,
                }}
              >
                {kpi.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPICards;

