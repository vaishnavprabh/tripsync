import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Chip,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Delete,
  Visibility,
  Refresh,
  CheckCircle,
  Warning,
  Cancel,
} from "@mui/icons-material";

const TripManagement = () => {
  const [trips, setTrips] = useState([
    // Sample data - replace with API call
    {
      id: 1,
      tripName: "Summer Beach Trip",
      organizerName: "John Doe",
      organizerEmail: "john@example.com",
      destination: "Goa, India",
      startDate: "2025-06-15",
      endDate: "2025-06-20",
      status: "active",
      participants: 12,
      budget: 50000,
    },
    {
      id: 2,
      tripName: "Mountain Adventure",
      organizerName: "Jane Smith",
      organizerEmail: "jane@example.com",
      destination: "Manali, India",
      startDate: "2025-07-01",
      endDate: "2025-07-05",
      status: "upcoming",
      participants: 8,
      budget: 35000,
    },
    {
      id: 3,
      tripName: "City Exploration",
      organizerName: "Mike Johnson",
      organizerEmail: "mike@example.com",
      destination: "Mumbai, India",
      startDate: "2025-05-10",
      endDate: "2025-05-12",
      status: "completed",
      participants: 15,
      budget: 25000,
    },
  ]);

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "upcoming":
        return "info";
      case "completed":
        return "default";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const handleView = (trip) => {
    setSelectedTrip(trip);
    setOpenView(true);
  };

  const handleDelete = (trip) => {
    setSelectedTrip(trip);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    // API call to delete trip
    setTrips(trips.filter((trip) => trip.id !== selectedTrip.id));
    showSnackbar("Trip deleted successfully", "success");
    setOpenDelete(false);
    setSelectedTrip(null);
  };

  const verifyTrip = (tripId) => {
    // API call to verify trip
    showSnackbar("Trip verified successfully", "success");
  };

  const resolveIssue = (tripId) => {
    // API call to resolve issue
    showSnackbar("Issue resolved successfully", "success");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#212121" }}>
          Trip Management
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => {
            // Refresh trips from API
            showSnackbar("Trips refreshed", "info");
          }}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {trips.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Trips
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#2e7d32" }}>
                {trips.filter((t) => t.status === "active").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Trips
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976d2" }}>
                {trips.filter((t) => t.status === "upcoming").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Trips
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#757575" }}>
                {trips.filter((t) => t.status === "completed").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Trips
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ border: "1px solid #e0e0e0" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 600 }}>Trip ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Trip Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Organizer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Destination</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Dates</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Participants</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No trips found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              trips.map((trip) => (
                <TableRow key={trip.id} hover>
                  <TableCell>{trip.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{trip.tripName}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {trip.organizerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {trip.organizerEmail}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {trip.startDate} to {trip.endDate}
                    </Typography>
                  </TableCell>
                  <TableCell>{trip.participants}</TableCell>
                  <TableCell>
                    <Chip
                      label={trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      size="small"
                      color={getStatusColor(trip.status)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleView(trip)}
                      sx={{ mr: 1 }}
                      title="View Trip Details"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="success"
                      onClick={() => verifyTrip(trip.id)}
                      sx={{ mr: 1 }}
                      title="Verify Trip"
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => resolveIssue(trip.id)}
                      sx={{ mr: 1 }}
                      title="Resolve Issue"
                    >
                      <Warning />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(trip)}
                      title="Delete Trip"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Trip Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="md" fullWidth>
        <DialogTitle>Trip Details</DialogTitle>
        <DialogContent>
          {selectedTrip && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField
                label="Trip Name"
                value={selectedTrip.tripName}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Organizer Name"
                value={selectedTrip.organizerName}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Organizer Email"
                value={selectedTrip.organizerEmail}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Destination"
                value={selectedTrip.destination}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Start Date"
                    value={selectedTrip.startDate}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="End Date"
                    value={selectedTrip.endDate}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Participants"
                    value={selectedTrip.participants}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Budget"
                    value={`₹${selectedTrip.budget.toLocaleString()}`}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Status
                </Typography>
                <Chip
                  label={selectedTrip.status.charAt(0).toUpperCase() + selectedTrip.status.slice(1)}
                  color={getStatusColor(selectedTrip.status)}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Trip</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete trip{" "}
            <strong>{selectedTrip?.tripName}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
    </Box>
  );
};

export default TripManagement;

