import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  ArrowBack,
  Share,
  AccessTime,
  LocationOn,
} from "@mui/icons-material";
import OrganizerNav from "./Components/OrganizerNav";
import Footer from "../User/Components/Footer";

const ItineraryManagement = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [itinerary, setItinerary] = useState([
    {
      id: 1,
      day: 1,
      date: "2025-06-15",
      activities: [
        { id: 1, time: "09:00", activity: "Arrival & Check-in", location: "Hotel" },
        { id: 2, time: "12:00", activity: "Lunch", location: "Beach Restaurant" },
        { id: 3, time: "15:00", activity: "Beach Activities", location: "Goa Beach" },
      ],
    },
    {
      id: 2,
      day: 2,
      date: "2025-06-16",
      activities: [
        { id: 4, time: "08:00", activity: "Breakfast", location: "Hotel" },
        { id: 5, time: "10:00", activity: "Water Sports", location: "Beach" },
        { id: 6, time: "19:00", activity: "Dinner & Party", location: "Beach Club" },
      ],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [newActivity, setNewActivity] = useState({ time: "", activity: "", location: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleAddActivity = (dayId) => {
    setSelectedDay(dayId);
    setNewActivity({ time: "", activity: "", location: "" });
    setOpenDialog(true);
  };

  const handleSaveActivity = () => {
    if (!newActivity.time || !newActivity.activity) {
      showSnackbar("Please fill in time and activity", "error");
      return;
    }

    const updatedItinerary = itinerary.map((day) => {
      if (day.id === selectedDay) {
        return {
          ...day,
          activities: [
            ...day.activities,
            { id: Date.now(), ...newActivity },
          ],
        };
      }
      return day;
    });

    setItinerary(updatedItinerary);
    setOpenDialog(false);
    showSnackbar("Activity added successfully", "success");
  };

  const handleDeleteActivity = (dayId, activityId) => {
    const updatedItinerary = itinerary.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.filter((a) => a.id !== activityId),
        };
      }
      return day;
    });
    setItinerary(updatedItinerary);
    showSnackbar("Activity deleted successfully", "success");
  };

  const handleShare = () => {
    // API call to share itinerary
    showSnackbar("Itinerary shared with travelers", "success");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <OrganizerNav />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/my-trips")}
              sx={{ mb: 1, textTransform: "none" }}
            >
              Back to Dashboard
            </Button>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#212121" }}>
              Itinerary Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Plan day-wise activities and share with travelers
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Share />}
            onClick={handleShare}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              textTransform: "none",
            }}
          >
            Share Itinerary
          </Button>
        </Box>

        {itinerary.map((day) => (
          <Paper key={day.id} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Day {day.day}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {day.date}
                </Typography>
              </Box>
              <Button
                size="small"
                startIcon={<Add />}
                onClick={() => handleAddActivity(day.id)}
                sx={{ textTransform: "none" }}
              >
                Add Activity
              </Button>
            </Box>

            <Grid container spacing={2}>
              {day.activities.map((activity) => (
                <Grid item xs={12} sm={6} md={4} key={activity.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
                        <Chip
                          icon={<AccessTime />}
                          label={activity.time}
                          size="small"
                          color="primary"
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteActivity(day.id, activity.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {activity.activity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LocationOn fontSize="small" />
                        {activity.location}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}

        {/* Add Day Button */}
        <Button
          variant="outlined"
          startIcon={<Add />}
          fullWidth
          sx={{ mt: 2, py: 2, textTransform: "none" }}
        >
          Add New Day
        </Button>

        {/* Add Activity Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Activity</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField
                label="Time"
                type="time"
                value={newActivity.time}
                onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Activity"
                value={newActivity.activity}
                onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
                fullWidth
                placeholder="e.g., Beach Activities"
              />
              <TextField
                label="Location"
                value={newActivity.location}
                onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                fullWidth
                placeholder="e.g., Goa Beach"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveActivity}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              Add Activity
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

export default ItineraryManagement;

