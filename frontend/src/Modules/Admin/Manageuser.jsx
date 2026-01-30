import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
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
  TextField,
  Alert,
  Snackbar,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Edit,
  Delete,
  Refresh,
  Block,
  CheckCircle,
} from "@mui/icons-material";

const ManageUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    role: "",
    status: "active",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINTS.GET_ALL_USERS);
      console.log(response.data.data);
      setData(response.data.data || []);
    } catch (error) {
      console.log("failed to load users", error);
      showSnackbar("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username || "",
      email: user.email || "",
      number: user.number || "",
      password: "",
      role: user.role || "traveler",
      status: user.status || "active",
    });
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      // Only send fields that have values
      const updateData = {};
      if (editForm.username) updateData.username = editForm.username;
      if (editForm.email) updateData.email = editForm.email;
      if (editForm.number) updateData.number = editForm.number;
      if (editForm.password) updateData.password = editForm.password;
      if (editForm.role) updateData.role = editForm.role;
      if (editForm.status) updateData.status = editForm.status;

      const response = await axios.put(
        `${API_ENDPOINTS.UPDATE_USER}/${selectedUser.id}`,
        updateData
      );

      if (response.data.message === "User updated successfully") {
        showSnackbar("User updated successfully", "success");
        setOpenEdit(false);
        fetchUsers();
      }
    } catch (error) {
      console.error("Update error:", error);
      showSnackbar(
        error.response?.data?.error || "Failed to update user",
        "error"
      );
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.DELETE_USER}/${selectedUser.id}`
      );

      if (response.data.message === "User deleted successfully") {
        showSnackbar("User deleted successfully", "success");
        setOpenDelete(false);
        fetchUsers();
      }
    } catch (error) {
      console.error("Delete error:", error);
      showSnackbar(
        error.response?.data?.error || "Failed to delete user",
        "error"
      );
    }
  };

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.UPDATE_USER}/${userId}`,
        { status: newStatus }
      );
      if (response.data.message === "User updated successfully") {
        showSnackbar(`User ${newStatus === "active" ? "unblocked" : "blocked"} successfully`, "success");
        fetchUsers();
      }
    } catch (error) {
      console.error("Status update error:", error);
      showSnackbar(
        error.response?.data?.error || "Failed to update user status",
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
          Manage Users
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchUsers}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ border: "1px solid #e0e0e0" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">Loading...</Typography>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.number}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role === "organizer" ? "Organizer" : "Traveler"} 
                      size="small" 
                      color={user.role === "organizer" ? "secondary" : "primary"} 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={(user.status || "active") === "active" ? "Active" : "Blocked"} 
                      size="small" 
                      color={(user.status || "active") === "active" ? "success" : "error"} 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(user)}
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color={(user.status || "active") === "active" ? "warning" : "success"}
                      onClick={() => {
                        const currentStatus = user.status || "active";
                        const newStatus = currentStatus === "active" ? "blocked" : "active";
                        handleUpdateStatus(user.id, newStatus);
                      }}
                      sx={{ mr: 1 }}
                      title={(user.status || "active") === "active" ? "Block User" : "Unblock User"}
                    >
                      {(user.status || "active") === "active" ? <Block /> : <CheckCircle />}
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenDelete(true);
                      }}
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

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Username"
              fullWidth
              value={editForm.username}
              onChange={(e) =>
                setEditForm({ ...editForm, username: e.target.value })
              }
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={editForm.number}
              onChange={(e) =>
                setEditForm({ ...editForm, number: e.target.value })
              }
            />
            <TextField
              label="New Password (leave blank to keep current)"
              type="password"
              fullWidth
              value={editForm.password}
              onChange={(e) =>
                setEditForm({ ...editForm, password: e.target.value })
              }
              helperText="Only fill this if you want to change the password"
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={editForm.role}
                label="Role"
                onChange={(e) =>
                  setEditForm({ ...editForm, role: e.target.value })
                }
              >
                <MenuItem value="traveler">Traveler</MenuItem>
                <MenuItem value="organizer">Organizer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={editForm.status}
                label="Status"
                onChange={(e) =>
                  setEditForm({ ...editForm, status: e.target.value })
                }
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete user{" "}
            <strong>{selectedUser?.username}</strong>? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageUser;
