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
  Tabs,
  Tab,
} from "@mui/material";
import {
  Reply,
  Refresh,
  Visibility,
  CheckCircle,
  Warning,
  BugReport,
  Feedback,
} from "@mui/icons-material";

const FeedbackSupport = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [feedbacks] = useState([
    {
      id: 1,
      type: "feedback",
      userName: "John Doe",
      userEmail: "john@example.com",
      subject: "Great platform!",
      message: "TripSync has made planning our group trip so much easier. Love the expense tracking feature!",
      date: "2025-01-15",
      status: "pending",
    },
    {
      id: 2,
      type: "complaint",
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      subject: "Issue with trip invitation",
      message: "I didn't receive the invitation email for the trip. Can you please check?",
      date: "2025-01-14",
      status: "resolved",
    },
    {
      id: 3,
      type: "technical",
      userName: "Mike Johnson",
      userEmail: "mike@example.com",
      subject: "App crashes on login",
      message: "The app crashes every time I try to log in. This started happening after the last update.",
      date: "2025-01-13",
      status: "pending",
    },
  ]);

  const [complaints] = useState([
    {
      id: 2,
      type: "complaint",
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      subject: "Issue with trip invitation",
      message: "I didn't receive the invitation email for the trip. Can you please check?",
      date: "2025-01-14",
      status: "resolved",
    },
    {
      id: 4,
      type: "complaint",
      userName: "Sarah Wilson",
      userEmail: "sarah@example.com",
      subject: "Payment not processed",
      message: "I made a payment for trip expenses but it's not showing in my account.",
      date: "2025-01-12",
      status: "pending",
    },
  ]);

  const [technicalIssues] = useState([
    {
      id: 3,
      type: "technical",
      userName: "Mike Johnson",
      userEmail: "mike@example.com",
      subject: "App crashes on login",
      message: "The app crashes every time I try to log in. This started happening after the last update.",
      date: "2025-01-13",
      status: "pending",
    },
    {
      id: 5,
      type: "technical",
      userName: "David Brown",
      userEmail: "david@example.com",
      subject: "Cannot upload trip photos",
      message: "I'm unable to upload photos to the trip gallery. Getting an error message.",
      date: "2025-01-11",
      status: "pending",
    },
  ]);

  const getStatusColor = (status) => {
    return status === "resolved" ? "success" : "warning";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "feedback":
        return <Feedback />;
      case "complaint":
        return <Warning />;
      case "technical":
        return <BugReport />;
      default:
        return <Feedback />;
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setOpenView(true);
  };

  const handleReply = (item) => {
    setSelectedItem(item);
    setOpenReply(true);
  };

  const sendReply = () => {
    if (!replyText.trim()) {
      showSnackbar("Please enter a reply message", "error");
      return;
    }
    // API call to send reply
    showSnackbar("Reply sent successfully", "success");
    setOpenReply(false);
    setReplyText("");
    setSelectedItem(null);
  };

  const markResolved = (itemId) => {
    // API call to mark as resolved
    showSnackbar("Marked as resolved", "success");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderTable = (data) => (
    <TableContainer component={Paper} sx={{ border: "1px solid #e0e0e0" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                <Typography color="text.secondary">No items found</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {getTypeIcon(item.type)}
                    <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                      {item.type}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.userName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.userEmail}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Chip
                    label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    size="small"
                    color={getStatusColor(item.status)}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleView(item)}
                    sx={{ mr: 1 }}
                    title="View Details"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => handleReply(item)}
                    sx={{ mr: 1 }}
                    title="Reply"
                  >
                    <Reply />
                  </IconButton>
                  {item.status === "pending" && (
                    <IconButton
                      color="info"
                      onClick={() => markResolved(item.id)}
                      title="Mark as Resolved"
                    >
                      <CheckCircle />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
          Feedback & Support
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => {
            showSnackbar("Data refreshed", "info");
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
                {feedbacks.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Feedback
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#d32f2f" }}>
                {complaints.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complaints
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#ed6c02" }}>
                {technicalIssues.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Technical Issues
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#ed6c02" }}>
                {[...feedbacks, ...complaints, ...technicalIssues].filter(
                  (item) => item.status === "pending"
                ).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="All Feedback" />
          <Tab label="Complaints" />
          <Tab label="Technical Issues" />
        </Tabs>
      </Paper>

      {tabValue === 0 && renderTable(feedbacks)}
      {tabValue === 1 && renderTable(complaints)}
      {tabValue === 2 && renderTable(technicalIssues)}

      {/* View Details Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="md" fullWidth>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField
                label="Type"
                value={selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="User Name"
                value={selectedItem.userName}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="User Email"
                value={selectedItem.userEmail}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Subject"
                value={selectedItem.subject}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Message"
                value={selectedItem.message}
                fullWidth
                multiline
                rows={4}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Date"
                value={selectedItem.date}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Status
                </Typography>
                <Chip
                  label={selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                  color={getStatusColor(selectedItem.status)}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
          <Button
            variant="contained"
            startIcon={<Reply />}
            onClick={() => {
              setOpenView(false);
              setOpenReply(true);
            }}
          >
            Reply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={openReply} onClose={() => setOpenReply(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reply to {selectedItem?.userName}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Subject"
              value={selectedItem?.subject}
              fullWidth
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Reply Message"
              fullWidth
              multiline
              rows={6}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Enter your reply message..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReply(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={sendReply}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            Send Reply
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

export default FeedbackSupport;

