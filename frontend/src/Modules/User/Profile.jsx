import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Tabs,
  Tab,
  Paper,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Edit,
  Email,
  Phone,
  Lock,
  Delete,
  Save,
  FlightTakeoff,
} from "@mui/icons-material";
import UserNav from "./Components/UserNav";
import Footer from "./Components/Footer";

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  
  const [profile, setProfile] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    bio: "",
    role: "",
  });

  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    number: "",
    bio: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.id) {
      setProfile({
        id: userData.id,
        name: userData.username || "",
        email: userData.email || "",
        phone: userData.number || "",
        bio: userData.bio || "",
        role: userData.role || "traveler",
      });
      setEditForm({
        username: userData.username || "",
        email: userData.email || "",
        number: userData.number || "",
        bio: userData.bio || "",
      });
    }
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!profile.id) {
      showSnackbar("User ID not found. Please log in again.", "error");
      return;
    }

    try {
      const updateData = {
        username: editForm.username,
        email: editForm.email,
        number: editForm.number,
      };

      const response = await axios.put(
        `${API_ENDPOINTS.UPDATE_USER}/${profile.id}`,
        updateData
      );

      if (response.data.message === "User updated successfully") {
        // Update localStorage
        const updatedUser = {
          ...JSON.parse(localStorage.getItem("user") || "{}"),
          username: editForm.username,
          email: editForm.email,
          number: editForm.number,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Update profile state
        setProfile({
          ...profile,
          name: editForm.username,
          email: editForm.email,
          phone: editForm.number,
          bio: editForm.bio,
        });

        setEditMode(false);
        showSnackbar("Profile updated successfully", "success");
      }
    } catch (error) {
      console.error("Update error:", error);
      showSnackbar(
        error.response?.data?.error || "Failed to update profile",
        "error"
      );
    }
  };

  const handleUpdatePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showSnackbar("New passwords do not match", "error");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showSnackbar("Password must be at least 6 characters long", "error");
      return;
    }

    if (!profile.id) {
      showSnackbar("User ID not found. Please log in again.", "error");
      return;
    }

    try {
      const response = await axios.put(
        `${API_ENDPOINTS.UPDATE_USER}/${profile.id}`,
        { password: passwordForm.newPassword }
      );

      if (response.data.message === "User updated successfully") {
        setOpenPasswordDialog(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        showSnackbar("Password updated successfully", "success");
      }
    } catch (error) {
      console.error("Password update error:", error);
      showSnackbar(
        error.response?.data?.error || "Failed to update password",
        "error"
      );
    }
  };

  const handleDeleteAccount = async () => {
    if (!profile.id) {
      showSnackbar("User ID not found. Please log in again.", "error");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.DELETE_USER}/${profile.id}`
      );

      if (response.data.message === "User deleted successfully") {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userRole");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Delete error:", error);
      showSnackbar(
        error.response?.data?.error || "Failed to delete account",
        "error"
      );
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const tripStats = {
    totalTrips: 12,
    upcomingTrips: 3,
    completedTrips: 9,
  };

  return (
    <Box sx={{ backgroundColor: "#f8fafd", minHeight: "100vh" }}>
      <UserNav />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header */}
        <Card sx={{ border: "1px solid #e0e0e0", mb: 4, boxShadow: 2 }}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: "#667eea",
                    mx: "auto",
                    mb: 2,
                    fontSize: "3rem",
                    fontWeight: 700,
                  }}
                >
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </Avatar>
                <Chip
                  label={profile.role === "organizer" ? "Organizer" : "Traveler"}
                  color={profile.role === "organizer" ? "secondary" : "primary"}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => {
                    setEditForm({
                      username: profile.name,
                      email: profile.email,
                      number: profile.phone,
                      bio: profile.bio,
                    });
                    setEditMode(!editMode);
                  }}
                  sx={{ textTransform: "none" }}
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </Button>
              </Grid>
              <Grid item xs={12} md={9}>
                {editMode ? (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                      label="Full Name"
                      name="username"
                      value={editForm.username}
                      onChange={handleEditChange}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Phone Number"
                      name="number"
                      value={editForm.number}
                      onChange={handleEditChange}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: "#9e9e9e" }} />,
                      }}
                    />
                    <TextField
                      label="Bio"
                      name="bio"
                      multiline
                      rows={3}
                      value={editForm.bio}
                      onChange={handleEditChange}
                      fullWidth
                      placeholder="Tell us about yourself..."
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSaveProfile}
                        sx={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          textTransform: "none",
                          "&:hover": {
                            background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                          },
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setEditMode(false)}
                        sx={{ textTransform: "none" }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
                      {profile.name || "User"}
                    </Typography>
                    {profile.bio && (
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {profile.bio}
                      </Typography>
                    )}
                    <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Email sx={{ fontSize: 16, color: "#9e9e9e" }} />
                        <Typography variant="body2" color="text.secondary">
                          {profile.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Phone sx={{ fontSize: 16, color: "#9e9e9e" }} />
                        <Typography variant="body2" color="text.secondary">
                          {profile.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Paper sx={{ mb: 4 }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label="Trip Statistics" />
            <Tab label="Account Settings" />
          </Tabs>
        </Paper>

        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {tripStats.totalTrips}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Total Trips
                      </Typography>
                    </Box>
                    <FlightTakeoff sx={{ fontSize: 48, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {tripStats.upcomingTrips}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Upcoming Trips
                      </Typography>
                    </Box>
                    <FlightTakeoff sx={{ fontSize: 48, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  color: "white",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {tripStats.completedTrips}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Completed Trips
                      </Typography>
                    </Box>
                    <FlightTakeoff sx={{ fontSize: 48, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#212121" }}>
              Account Settings
            </Typography>
            
            {/* Change Password */}
            <Card sx={{ border: "1px solid #e0e0e0", mb: 2, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Change Password
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Lock />}
                  onClick={() => setOpenPasswordDialog(true)}
                  sx={{ textTransform: "none" }}
                >
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card sx={{ border: "1px solid #e0e0e0", boxShadow: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "#d32f2f" }}>
                  Danger Zone
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Once you delete your account, there is no going back. Please be certain.
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => setOpenDelete(true)}
                  sx={{ textTransform: "none" }}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Password Update Dialog */}
        <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField
                label="Current Password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
                fullWidth
                InputProps={{
                  startAdornment: <Lock sx={{ mr: 1, color: "#9e9e9e" }} />,
                }}
              />
              <TextField
                label="New Password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                fullWidth
                helperText="Password must be at least 6 characters long"
              />
              <TextField
                label="Confirm New Password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPasswordDialog(false)} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdatePassword}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }}
            >
              Update Password
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Account Dialog */}
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete your account? This action cannot be undone.
              All your trip data and history will be permanently deleted.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelete(false)} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteAccount}
              sx={{ textTransform: "none" }}
            >
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </Box>
  );
};

export default Profile;
