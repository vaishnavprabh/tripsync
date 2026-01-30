import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Rating,
  TextField,
} from "@mui/material";
import {
  SwapHoriz,
  Message,
  CheckCircle,
  Cancel,
  Schedule,
} from "@mui/icons-material";
import UserNav from "./Components/UserNav";
import Footer from "./Components/Footer";

const MyRequests = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openReview, setOpenReview] = useState(null);

  const receivedRequests = [
    {
      id: 1,
      skill: "Web Development",
      requester: "Alice",
      status: "Pending",
      date: "2024-01-15",
      time: "2:00 PM",
      mode: "Online",
    },
    {
      id: 2,
      skill: "Graphic Design",
      requester: "Bob",
      status: "Accepted",
      date: "2024-01-14",
      time: "3:00 PM",
      mode: "Offline",
    },
  ];

  const sentRequests = [
    {
      id: 1,
      skill: "Data Science",
      instructor: "Mike Johnson",
      status: "Accepted",
      date: "2024-01-13",
      time: "10:00 AM",
      mode: "Online",
    },
    {
      id: 2,
      skill: "Photography",
      instructor: "Sarah Lee",
      status: "Declined",
      date: "2024-01-12",
      time: "4:00 PM",
      mode: "Offline",
    },
    {
      id: 3,
      skill: "Spanish Language",
      instructor: "Maria Garcia",
      status: "Completed",
      date: "2024-01-10",
      time: "11:00 AM",
      mode: "Online",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Accepted":
        return "info";
      case "Completed":
        return "success";
      case "Declined":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <UserNav />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          My Requests
        </Typography>

        <Paper sx={{ mb: 4 }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label={`Received Requests (${receivedRequests.length})`} />
            <Tab label={`Sent Requests (${sentRequests.length})`} />
          </Tabs>
        </Paper>

        {tabValue === 0 && (
          <Grid container spacing={3}>
            {receivedRequests.map((request) => (
              <Grid item xs={12} key={request.id}>
                <Card sx={{ border: "1px solid #c8d8e4" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {request.skill}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Requested by: {request.requester}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Chip
                            icon={<Schedule />}
                            label={`${request.date} at ${request.time}`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip label={request.mode} size="small" />
                        </Box>
                      </Box>
                      <Chip
                        label={request.status}
                        color={getStatusColor(request.status)}
                        icon={
                          request.status === "Accepted" ? (
                            <CheckCircle />
                          ) : request.status === "Declined" ? (
                            <Cancel />
                          ) : null
                        }
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Message />}
                        onClick={() => window.location.href = "/messages"}
                      >
                        View Conversation
                      </Button>
                      {request.status === "Pending" && (
                        <>
                          <Button variant="contained" color="success" startIcon={<CheckCircle />}>
                            Accept
                          </Button>
                          <Button variant="outlined" color="error" startIcon={<Cancel />}>
                            Decline
                          </Button>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={3}>
            {sentRequests.map((request) => (
              <Grid item xs={12} key={request.id}>
                <Card sx={{ border: "1px solid #c8d8e4" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {request.skill}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Instructor: {request.instructor}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Chip
                            icon={<Schedule />}
                            label={`${request.date} at ${request.time}`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip label={request.mode} size="small" />
                        </Box>
                      </Box>
                      <Chip
                        label={request.status}
                        color={getStatusColor(request.status)}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Message />}
                        onClick={() => window.location.href = "/messages"}
                      >
                        View Conversation
                      </Button>
                      {request.status === "Completed" && (
                        <Button
                          variant="contained"
                          onClick={() => setOpenReview(request)}
                          sx={{
                            background: "linear-gradient(135deg, #2b6777 0%, #52ab98 100%)",
                          }}
                        >
                          Leave Review
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Review Dialog */}
        <Dialog open={openReview !== null} onClose={() => setOpenReview(null)} maxWidth="sm" fullWidth>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Rate your experience with {openReview?.instructor}
              </Typography>
              <Rating size="large" />
              <TextField
                label="Write your review"
                multiline
                rows={4}
                fullWidth
                placeholder="Share your experience..."
              />
            </Box>
          </DialogContent>
          <Box sx={{ p: 2, display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button onClick={() => setOpenReview(null)}>Cancel</Button>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #2b6777 0%, #52ab98 100%)",
              }}
            >
              Submit Review
            </Button>
          </Box>
        </Dialog>
      </Container>
      <Footer />
    </Box>
  );
};

export default MyRequests;

