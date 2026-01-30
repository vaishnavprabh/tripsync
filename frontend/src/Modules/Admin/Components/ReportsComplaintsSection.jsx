import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Warning,
  Block,
  CheckCircle,
  Visibility,
  Person,
  Chat,
  Flag,
} from "@mui/icons-material";

const ReportsComplaintsSection = ({ reports }) => {
  const [openDialog, setOpenDialog] = useState(null);
  const [reportData, setReportData] = useState(
    reports || [
      {
        id: 1,
        type: "User",
        reportedItem: "John Doe",
        reportedBy: "Jane Smith",
        reason: "Inappropriate behavior",
        severity: "High",
        status: "Pending",
        timestamp: "2024-01-15 10:30 AM",
      },
      {
        id: 2,
        type: "Chat",
        reportedItem: "Message #1234",
        reportedBy: "Mike Johnson",
        reason: "Spam messages",
        severity: "Medium",
        status: "Pending",
        timestamp: "2024-01-15 09:15 AM",
      },
      {
        id: 3,
        type: "Skill",
        reportedItem: "Web Development",
        reportedBy: "Sarah Lee",
        reason: "Misleading information",
        severity: "Low",
        status: "Resolved",
        timestamp: "2024-01-14 03:45 PM",
      },
    ]
  );

  const handleResolve = (id) => {
    setReportData(
      reportData.map((report) =>
        report.id === id ? { ...report, status: "Resolved" } : report
      )
    );
    setOpenDialog(null);
    // Add API call here
  };

  const handleBlock = (id) => {
    setReportData(
      reportData.map((report) =>
        report.id === id ? { ...report, status: "Blocked" } : report
      )
    );
    setOpenDialog(null);
    // Add API call here
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    return status === "Resolved" ? "success" : "warning";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "User":
        return <Person />;
      case "Chat":
        return <Chat />;
      case "Skill":
        return <Flag />;
      default:
        return <Warning />;
    }
  };

  return (
    <Card sx={{ mb: 4, border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Reports & Complaints
          </Typography>
          <Chip
            label={`${reportData.filter((r) => r.status === "Pending").length} Pending`}
            color="warning"
            size="small"
          />
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reported Item</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reported By</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Severity</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No reports found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                reportData.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {getTypeIcon(report.type)}
                        {report.type}
                      </Box>
                    </TableCell>
                    <TableCell>{report.reportedItem}</TableCell>
                    <TableCell>{report.reportedBy}</TableCell>
                    <TableCell>{report.reason}</TableCell>
                    <TableCell>
                      <Chip
                        label={report.severity}
                        color={getSeverityColor(report.severity)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={report.status}
                        color={getStatusColor(report.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{report.timestamp}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => setOpenDialog(report.id)}
                          title="View Details"
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                        {report.status === "Pending" && (
                          <>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleResolve(report.id)}
                              title="Mark as Resolved"
                            >
                              <CheckCircle fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleBlock(report.id)}
                              title="Block User"
                            >
                              <Block fontSize="small" />
                            </IconButton>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openDialog !== null}
          onClose={() => setOpenDialog(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Report Details</DialogTitle>
          <DialogContent>
            {openDialog !== null && (
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Review the evidence and take appropriate action.
                </Typography>
                {/* Add detailed report view here */}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(null)}>Close</Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleResolve(openDialog)}
            >
              Mark Resolved
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ReportsComplaintsSection;

