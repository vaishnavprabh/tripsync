import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  InputAdornment,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  ArrowBack,
  Send,
  ContentCopy,
  CheckCircle,
  Cancel,
  Email,
  Link as LinkIcon,
} from "@mui/icons-material";
import OrganizerNav from "./Components/OrganizerNav";
import Footer from "../User/Components/Footer";

const InvitationManagement = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitations, setInvitations] = useState([
    { id: 1, email: "john@example.com", name: "John Doe", status: "accepted", invitedDate: "2025-01-10" },
    { id: 2, email: "jane@example.com", name: "Jane Smith", status: "pending", invitedDate: "2025-01-12" },
    { id: 3, email: "mike@example.com", name: "Mike Johnson", status: "rejected", invitedDate: "2025-01-11" },
  ]);

  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [inviteLink, setInviteLink] = useState("https://tripsync.com/join/trip-123");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSendEmail = () => {
    if (!inviteEmail) {
      showSnackbar("Please enter an email address", "error");
      return;
    }

    // API call to send invitation
    setInvitations([
      ...invitations,
      {
        id: Date.now(),
        email: inviteEmail,
        name: "",
        status: "pending",
        invitedDate: new Date().toISOString().split("T")[0],
      },
    ]);
    setInviteEmail("");
    setOpenEmailDialog(false);
    showSnackbar("Invitation sent successfully", "success");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    showSnackbar("Link copied to clipboard", "success");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
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
            Invitation Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Invite travelers via email or share invitation link
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Invite via Email */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Email sx={{ color: "#667eea" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Invite via Email
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Send />}
                  onClick={() => setOpenEmailDialog(true)}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    textTransform: "none",
                  }}
                >
                  Send Invitation
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Share Link */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <LinkIcon sx={{ color: "#667eea" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Share Invitation Link
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  value={inviteLink}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleCopyLink} edge="end">
                          <ContentCopy />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ContentCopy />}
                  onClick={handleCopyLink}
                  sx={{ textTransform: "none" }}
                >
                  Copy Link
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Invitations List */}
        <Paper>
          <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Invited Travelers
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Invited Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Join Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invitations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">No invitations sent yet</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  invitations.map((invitation) => (
                    <TableRow key={invitation.id} hover>
                      <TableCell>{invitation.name || "N/A"}</TableCell>
                      <TableCell>{invitation.email}</TableCell>
                      <TableCell>{invitation.invitedDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                          color={getStatusColor(invitation.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {invitation.status === "pending" && (
                          <IconButton size="small" color="error">
                            <Cancel />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Send Email Dialog */}
        <Dialog open={openEmailDialog} onClose={() => setOpenEmailDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Send Invitation Email</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              An invitation email will be sent to: <strong>{inviteEmail}</strong>
            </Typography>
            <TextField
              fullWidth
              label="Custom Message (Optional)"
              multiline
              rows={3}
              placeholder="Add a personal message to your invitation..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEmailDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSendEmail}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              Send Invitation
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

export default InvitationManagement;

