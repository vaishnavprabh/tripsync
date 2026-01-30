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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const SkillExchangeMonitor = ({ exchanges }) => {
  const [filter, setFilter] = useState("all");

  const exchangeData = exchanges || [
    {
      id: 1,
      requestedSkill: "Web Development",
      sender: "John Doe",
      receiver: "Jane Smith",
      mode: "Online",
      status: "Pending",
      timestamp: "2024-01-15 10:30 AM",
    },
    {
      id: 2,
      requestedSkill: "Graphic Design",
      sender: "Mike Johnson",
      receiver: "Sarah Lee",
      mode: "Offline",
      status: "Accepted",
      timestamp: "2024-01-15 09:15 AM",
    },
    {
      id: 3,
      requestedSkill: "Data Analysis",
      sender: "Emily Chen",
      receiver: "David Brown",
      mode: "Online",
      status: "Completed",
      timestamp: "2024-01-14 03:45 PM",
    },
    {
      id: 4,
      requestedSkill: "Photography",
      sender: "Alex Wilson",
      receiver: "Lisa Anderson",
      mode: "Offline",
      status: "Declined",
      timestamp: "2024-01-14 11:20 AM",
    },
  ];

  const filteredExchanges =
    filter === "all"
      ? exchangeData
      : exchangeData.filter((ex) => ex.status.toLowerCase() === filter);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "accepted":
        return "info";
      case "completed":
        return "success";
      case "declined":
        return "error";
      default:
        return "default";
    }
  };

  const getModeColor = (mode) => {
    return mode === "Online" ? "primary" : "secondary";
  };

  return (
    <Card sx={{ mb: 4, border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Skill Exchange Request Monitor
          </Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter Status</InputLabel>
            <Select
              value={filter}
              label="Filter Status"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="declined">Declined</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Requested Skill</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Sender</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Receiver</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Mode</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExchanges.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No exchanges found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredExchanges.map((exchange) => (
                  <TableRow key={exchange.id} hover>
                    <TableCell>{exchange.requestedSkill}</TableCell>
                    <TableCell>{exchange.sender}</TableCell>
                    <TableCell>{exchange.receiver}</TableCell>
                    <TableCell>
                      <Chip
                        label={exchange.mode}
                        color={getModeColor(exchange.mode)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={exchange.status}
                        color={getStatusColor(exchange.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{exchange.timestamp}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default SkillExchangeMonitor;

