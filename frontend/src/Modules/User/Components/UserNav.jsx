import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  SwapHoriz,
  Notifications,
  Person,
  Settings,
  Logout,
  Home,
  FlightTakeoff,
  Bookmark,
} from "@mui/icons-material";

const UserNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#212121",
        boxShadow: "0 2px 8px rgba(102, 126, 234, 0.08)",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            mr: 3,
          }}
          onClick={() => navigate("/home")}
        >
          <SwapHoriz
            sx={{
              fontSize: 32,
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

        <Box sx={{ flexGrow: 1 }} />

        <Button
          color="inherit"
          startIcon={<Home />}
          onClick={() => navigate("/home")}
          sx={{
            color: isActive("/home") ? "#667eea" : "#757575",
            fontWeight: isActive("/home") ? 600 : 400,
            borderRadius: 2,
            px: 2,
            "&:hover": {
              backgroundColor: "#f3e5f5",
              color: "#667eea",
            },
            ...(isActive("/home") && {
              backgroundColor: "#f3e5f5",
              "&:hover": {
                backgroundColor: "#f3e5f5",
              },
            }),
          }}
        >
          Home
        </Button>

        <Button
          color="inherit"
          startIcon={<FlightTakeoff />}
          onClick={() => navigate("/my-skills")}
          sx={{
            color: isActive("/my-skills") ? "#667eea" : "#757575",
            fontWeight: isActive("/my-skills") ? 600 : 400,
            borderRadius: 2,
            px: 2,
            "&:hover": {
              backgroundColor: "#f3e5f5",
              color: "#667eea",
            },
            ...(isActive("/my-skills") && {
              backgroundColor: "#f3e5f5",
              "&:hover": {
                backgroundColor: "#f3e5f5",
              },
            }),
          }}
        >
          My Trips
        </Button>

        <IconButton
          color="inherit"
          onClick={handleNotificationClick}
          sx={{
            color: "#757575",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#f3e5f5",
              color: "#667eea",
            },
          }}
        >
          <Badge
            badgeContent={3}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#667eea",
                color: "#ffffff",
              },
            }}
          >
            <Notifications />
          </Badge>
        </IconButton>

        <IconButton
          onClick={handleProfileMenuOpen}
          sx={{
            ml: 1,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#667eea",
              border: "2px solid #f3e5f5",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#764ba2",
                transform: "scale(1.1)",
              },
            }}
          >
            U
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: "0 4px 16px rgba(43, 103, 119, 0.15)",
              border: "1px solid #c8d8e4",
              "& .MuiMenuItem-root": {
                px: 2,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#f3e5f5",
                  color: "#667eea",
                },
              },
            },
          }}
        >
          <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
            <Person sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem onClick={() => { navigate("/my-skills"); handleMenuClose(); }}>
            <Bookmark sx={{ mr: 1 }} /> My Trips
          </MenuItem>
          <MenuItem onClick={() => { navigate("/my-requests"); handleMenuClose(); }}>
            <SwapHoriz sx={{ mr: 1 }} /> Invitations
          </MenuItem>
          <MenuItem onClick={() => { navigate("/settings"); handleMenuClose(); }}>
            <Settings sx={{ mr: 1 }} /> Settings
          </MenuItem>
          <MenuItem onClick={() => { navigate("/login"); handleMenuClose(); }}>
            <Logout sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 280,
              borderRadius: 2,
              boxShadow: "0 4px 16px rgba(43, 103, 119, 0.15)",
              border: "1px solid #c8d8e4",
              "& .MuiMenuItem-root": {
                px: 2,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#f3e5f5",
                  color: "#667eea",
                },
              },
            },
          }}
        >
          <MenuItem onClick={() => { navigate("/notifications"); handleNotificationClose(); }}>
            View All Notifications
          </MenuItem>
          <MenuItem>New trip invitation</MenuItem>
          <MenuItem>Message from trip organizer</MenuItem>
          <MenuItem>Trip itinerary updated</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default UserNav;

