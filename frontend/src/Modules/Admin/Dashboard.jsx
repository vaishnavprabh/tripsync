import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
  Divider,
  Avatar,
  Chip,
  Grid,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People,
  FlightTakeoff,
  Support,
  Logout,
  Menu as MenuIcon,
  Notifications,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import KPICards from "./Components/KPICards";
import ManageUser from "./Manageuser";
import TripManagement from "./Components/TripManagement";
import FeedbackSupport from "./Components/FeedbackSupport";

const drawerWidth = 260;

const Dashboard = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("dashboard");
  const [metrics, setMetrics] = useState({
    totalUsers: 1245,
    totalTrips: 342,
    activeTrips: 45,
    systemAlerts: 8,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, view: "dashboard" },
    { text: "User Management", icon: <People />, view: "users" },
    { text: "Trip Management", icon: <FlightTakeoff />, view: "trips" },
    { text: "Feedback & Support", icon: <Support />, view: "feedback" },
  ];

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          minHeight: "64px !important",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          TripSync Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedView === item.view}
              onClick={() => setSelectedView(item.view)}
              sx={{
                mx: 1,
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: "#f3e5f5",
                  color: "#9c27b0",
                  "&:hover": {
                    backgroundColor: "#f3e5f5",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: selectedView === item.view ? "#9c27b0" : "#757575",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: selectedView === item.view ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 1,
              borderRadius: 2,
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "#ffebee",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#d32f2f" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const renderContent = () => {
    switch (selectedView) {
      case "dashboard":
        return (
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Admin Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View platform statistics and monitor system activity
              </Typography>
            </Box>

            <KPICards metrics={metrics} />

          </Box>
        );
      case "users":
        return <ManageUser />;
      case "trips":
        return <TripManagement />;
      case "feedback":
        return <FeedbackSupport />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#ffffff",
          color: "#212121",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find((item) => item.view === selectedView)?.text ||
              "Dashboard"}
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Notifications />
          </IconButton>
          <Avatar sx={{ bgcolor: "#9c27b0" }}>A</Avatar>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#ffffff",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#ffffff",
              borderRight: "1px solid #e0e0e0",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: "64px",
        }}
      >
        <Container maxWidth="xl" sx={{ backgroundColor: "#ffffff", p: 0 }}>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
