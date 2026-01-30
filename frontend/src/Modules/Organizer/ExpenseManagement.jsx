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
  Grid,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import {
  ArrowBack,
  Add,
  Edit,
  Delete,
  AttachMoney,
  People,
  TrendingUp,
} from "@mui/icons-material";
import OrganizerNav from "./Components/OrganizerNav";
import Footer from "../User/Components/Footer";

const ExpenseManagement = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Hotel Booking", paidBy: "John Doe", amount: 15000, date: "2025-01-10", split: "Equal" },
    { id: 2, description: "Flight Tickets", paidBy: "Jane Smith", amount: 25000, date: "2025-01-12", split: "Equal" },
    { id: 3, description: "Food & Dining", paidBy: "Mike Johnson", amount: 5000, date: "2025-01-15", split: "Equal" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    paidBy: "",
    amount: "",
    date: "",
    split: "Equal",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const participants = 12;
  const perPerson = totalExpenses / participants;

  const handleAddExpense = () => {
    setFormData({ description: "", paidBy: "", amount: "", date: "", split: "Equal" });
    setOpenDialog(true);
  };

  const handleSaveExpense = () => {
    if (!formData.description || !formData.paidBy || !formData.amount) {
      showSnackbar("Please fill in all required fields", "error");
      return;
    }

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount),
      },
    ]);
    setOpenDialog(false);
    showSnackbar("Expense added successfully", "success");
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
    showSnackbar("Expense deleted successfully", "success");
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
            Expense Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track expenses, split costs, and manage balances
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
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
                      ₹{totalExpenses.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Expenses
                    </Typography>
                  </Box>
                  <AttachMoney sx={{ fontSize: 48, opacity: 0.8 }} />
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
                      ₹{perPerson.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Per Person
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 48, opacity: 0.8 }} />
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
                      {expenses.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Expenses
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Add Expense Button */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddExpense}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              textTransform: "none",
            }}
          >
            Add Expense
          </Button>
        </Box>

        {/* Expenses Table */}
        <Paper>
          <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Expense List
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Paid By</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Split</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">No expenses added yet</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  expenses.map((expense) => (
                    <TableRow key={expense.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{expense.description}</TableCell>
                      <TableCell>{expense.paidBy}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>₹{expense.amount.toLocaleString()}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>
                        <Chip label={expense.split} size="small" color="primary" />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="primary">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Settlement Summary */}
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Settlement Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Auto-split calculations and balance tracking will be displayed here
          </Typography>
        </Paper>

        {/* Add Expense Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
                placeholder="e.g., Hotel Booking"
              />
              <TextField
                label="Paid By"
                value={formData.paidBy}
                onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
                fullWidth
                placeholder="Name of person who paid"
              />
              <TextField
                label="Amount (₹)"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                fullWidth
                inputProps={{ min: 0 }}
              />
              <TextField
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Split Method"
                value={formData.split}
                onChange={(e) => setFormData({ ...formData, split: e.target.value })}
                fullWidth
              >
                <MenuItem value="Equal">Equal Split</MenuItem>
                <MenuItem value="Custom">Custom Split</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveExpense}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              Add Expense
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

export default ExpenseManagement;

