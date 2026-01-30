import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Chip,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  Send,
  Add,
  Edit,
  Delete,
  Notifications,
  Chat,
} from "@mui/icons-material";
import OrganizerNav from "./Components/OrganizerNav";
import Footer from "../User/Components/Footer";

const AnnouncementsCommunication = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Trip Itinerary Updated",
      message: "We've updated the Day 2 itinerary. Please check the new schedule.",
      date: "2025-01-15",
      time: "10:30 AM",
      type: "announcement",
    },
    {
      id: 2,
      title: "Meeting Point Changed",
      message: "The meeting point has been changed to the hotel lobby instead of the airport.",
      date: "2025-01-14",
      time: "02:15 PM",
      type: "announcement",
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "John Doe",
      message: "What time should we arrive at the airport?",
      time: "2025-01-15 09:00 AM",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "I can help with the booking if needed!",
      time: "2025-01-15 09:15 AM",
    },
  ]);

  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [announcementData, setAnnouncementData] = useState({ title: "", message: "" });
  const [newMessage, setNewMessage] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handlePostAnnouncement = () => {
    if (!announcementData.title || !announcementData.message) {
      showSnackbar("Please fill in title and message", "error");
      return;
    }

    setAnnouncements([
      {
        id: Date.now(),
        ...announcementData,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        type: "announcement",
      },
      ...announcements,
    ]);
    setAnnouncementData({ title: "", message: "" });
    setOpenAnnouncement(false);
    showSnackbar("Announcement posted successfully", "success");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      showSnackbar("Please enter a message", "error");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setMessages([
      ...messages,
      {
        id: Date.now(),
        user: user.username || "You",
        message: newMessage,
        time: new Date().toLocaleString(),
      },
    ]);
    setNewMessage("");
    setOpenMessage(false);
    showSnackbar("Message sent successfully", "success");
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id));
    showSnackbar("Announcement deleted", "success");
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
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/my-trips")}
            sx={{ mb: 2, textTransform: "none" }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
            Announcements & Communication
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Post updates, send notifications, and manage group communication
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenAnnouncement(true)}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              textTransform: "none",
            }}
          >
            Post Announcement
          </Button>
          <Button
            variant="outlined"
            startIcon={<Chat />}
            onClick={() => setOpenMessage(true)}
            sx={{ textTransform: "none" }}
          >
            Send Message
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Announcements */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                  <Notifications sx={{ color: "#667eea" }} />
                  Announcements
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {announcements.length === 0 ? (
                <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                  No announcements yet
                </Typography>
              ) : (
                announcements.map((announcement) => (
                  <Card key={announcement.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {announcement.title}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {announcement.message}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Typography variant="caption" color="text.secondary">
                          {announcement.date} at {announcement.time}
                        </Typography>
                        <Chip label="Sent" size="small" color="success" />
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Paper>
          </Grid>

          {/* Group Chat */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Chat sx={{ color: "#667eea" }} />
                Group Chat
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ maxHeight: 400, overflowY: "auto", mb: 2 }}>
                {messages.length === 0 ? (
                  <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                    No messages yet
                  </Typography>
                ) : (
                  messages.map((msg) => (
                    <Box key={msg.id} sx={{ mb: 2, display: "flex", gap: 1 }}>
                      <Avatar sx={{ bgcolor: "#667eea", width: 32, height: 32 }}>
                        {msg.user.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {msg.user}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {msg.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {msg.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Chat />}
                onClick={() => setOpenMessage(true)}
                sx={{ textTransform: "none" }}
              >
                Send Message
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Post Announcement Dialog */}
        <Dialog open={openAnnouncement} onClose={() => setOpenAnnouncement(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Post Announcement</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField
                label="Title"
                value={announcementData.title}
                onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                fullWidth
                placeholder="e.g., Trip Itinerary Updated"
              />
              <TextField
                label="Message"
                value={announcementData.message}
                onChange={(e) => setAnnouncementData({ ...announcementData, message: e.target.value })}
                fullWidth
                multiline
                rows={4}
                placeholder="Enter your announcement message..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAnnouncement(false)}>Cancel</Button>
            <Button
              variant="contained"
              startIcon={<Send />}
              onClick={handlePostAnnouncement}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              Post Announcement
            </Button>
          </DialogActions>
        </Dialog>

        {/* Send Message Dialog */}
        <Dialog open={openMessage} onClose={() => setOpenMessage(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Send Message</DialogTitle>
          <DialogContent>
            <TextField
              label="Message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              fullWidth
              multiline
              rows={4}
              placeholder="Type your message..."
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenMessage(false)}>Cancel</Button>
            <Button
              variant="contained"
              startIcon={<Send />}
              onClick={handleSendMessage}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              Send Message
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

export default AnnouncementsCommunication;

