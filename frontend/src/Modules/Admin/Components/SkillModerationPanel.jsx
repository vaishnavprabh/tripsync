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
  ButtonGroup,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Flag,
  Visibility,
} from "@mui/icons-material";

const SkillModerationPanel = ({ pendingSkills }) => {
  const [skills, setSkills] = useState(
    pendingSkills || [
      {
        id: 1,
        skillName: "Web Development",
        submittedBy: "John Doe",
        category: "Technology",
        status: "pending",
        submittedAt: "2024-01-15",
      },
      {
        id: 2,
        skillName: "Graphic Design",
        submittedBy: "Jane Smith",
        category: "Creative",
        status: "flagged",
        submittedAt: "2024-01-14",
      },
      {
        id: 3,
        skillName: "Data Analysis",
        submittedBy: "Mike Johnson",
        category: "Business",
        status: "pending",
        submittedAt: "2024-01-13",
      },
    ]
  );

  const handleApprove = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
    // Add API call here
  };

  const handleReject = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
    // Add API call here
  };

  const handleFlag = (id) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, status: "flagged" } : skill
      )
    );
    // Add API call here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "flagged":
        return "error";
      case "approved":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Card sx={{ mb: 4, border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Skill Moderation Panel
          </Typography>
          <Chip
            label={`${skills.length} Pending`}
            color="warning"
            size="small"
          />
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Skill Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Submitted By</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No pending skills to review
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                skills.map((skill) => (
                  <TableRow key={skill.id} hover>
                    <TableCell>{skill.skillName}</TableCell>
                    <TableCell>{skill.submittedBy}</TableCell>
                    <TableCell>
                      <Chip label={skill.category} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={skill.status}
                        color={getStatusColor(skill.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{skill.submittedAt}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup size="small" variant="outlined">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleApprove(skill.id)}
                          title="Approve"
                        >
                          <CheckCircle fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleReject(skill.id)}
                          title="Reject"
                        >
                          <Cancel fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="warning"
                          onClick={() => handleFlag(skill.id)}
                          title="Flag for Review"
                        >
                          <Flag fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="default"
                          title="View Details"
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </ButtonGroup>
                    </TableCell>
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

export default SkillModerationPanel;

