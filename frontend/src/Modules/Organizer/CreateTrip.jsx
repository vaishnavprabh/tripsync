import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
  Snackbar,
  MenuItem,
} from "@mui/material";
import {
  Save,
  Publish,
  ArrowBack,
} from "@mui/icons-material";
import OrganizerNav from "./Components/OrganizerNav";
import Footer from "../User/Components/Footer";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  const [formData, setFormData] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    maxParticipants: "",
    estimatedBudget: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Validation
    if (!formData.tripName || !formData.destination || !formData.startDate || !formData.endDate) {
      showSnackbar("Please fill in all required fields", "error");
      return;
    }

    // API call to save trip
    console.log("Saving trip:", formData);
    showSnackbar(isEditMode ? "Trip updated successfully" : "Trip saved successfully", "success");
    
    setTimeout(() => {
      navigate("/my-trips");
    }, 1500);
  };

  const handlePublish = () => {
    if (!formData.tripName || !formData.destination || !formData.startDate || !formData.endDate) {
      showSnackbar("Please fill in all required fields", "error");
      return;
    }

    // API call to publish trip
    console.log("Publishing trip:", formData);
    showSnackbar("Trip published successfully", "success");
    
    setTimeout(() => {
      navigate("/my-trips");
    }, 1500);
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
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/my-trips")}
            sx={{ mb: 2, textTransform: "none" }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
            {isEditMode ? "Edit Trip" : "Create New Trip"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isEditMode ? "Update your trip details" : "Fill in the details to create your trip"}
          </Typography>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Trip Name"
                name="tripName"
                value={formData.tripName}
                onChange={handleChange}
                required
                placeholder="e.g., Summer Beach Trip"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                placeholder="e.g., Goa, India"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Describe your trip, activities, and what travelers can expect..."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Participants"
                name="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                placeholder="e.g., 20"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estimated Budget (₹)"
                name="estimatedBudget"
                type="number"
                value={formData.estimatedBudget}
                onChange={handleChange}
                inputProps={{ min: 0 }}
                placeholder="e.g., 50000"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/my-trips")}
                  sx={{ textTransform: "none" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                    },
                  }}
                >
                  {isEditMode ? "Update Trip" : "Save Trip"}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Publish />}
                  onClick={handlePublish}
                  sx={{
                    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(135deg, #3dd16b 0%, #2ee4c7 100%)",
                    },
                  }}
                >
                  Publish Trip
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

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

export default CreateTrip;

