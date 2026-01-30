import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  LocationOn,
  Computer,
  Bookmark,
  Share,
  CheckCircle,
  Schedule,
} from "@mui/icons-material";
import UserNav from "./Components/UserNav";
import Footer from "./Components/Footer";

const SkillDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openRequest, setOpenRequest] = useState(false);
  const [requestData, setRequestData] = useState({
    schedule: "",
    mode: "Online",
    notes: "",
    offering: "",
  });

  // Mock data - replace with API call
  const skill = {
    id: id,
    name: "Web Development",
    instructor: {
      name: "John Doe",
      avatar: "JD",
      rating: 4.8,
      reviews: 45,
      location: "New York, NY",
    },
    rating: 4.8,
    reviews: 45,
    category: "Programming",
    mode: "Online",
    description: "Learn modern web development with React, Node.js, and Express. This comprehensive course covers frontend and backend development, database integration, and deployment strategies.",
    whatYouLearn: [
      "React fundamentals and advanced concepts",
      "Node.js and Express.js backend development",
      "Database design and integration",
      "RESTful API development",
      "Deployment and DevOps basics",
    ],
    prerequisites: [
      "Basic knowledge of JavaScript",
      "Understanding of HTML and CSS",
      "Familiarity with command line",
    ],
    availability: "Available for online sessions",
  };

  const handleRequestExchange = () => {
    setOpenRequest(true);
  };

  const handleSubmitRequest = () => {
    // Handle API call here
    console.log("Request submitted:", requestData);
    setOpenRequest(false);
    // Show success message and navigate
  };

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <UserNav />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {skill.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating value={skill.rating} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {skill.rating} ({skill.reviews} reviews)
                </Typography>
              </Box>
              <Chip label={skill.category} />
              <Chip
                label={skill.mode}
                color={skill.mode === "Online" ? "primary" : "secondary"}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* About the Skill */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                About This Skill
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {skill.description}
              </Typography>
            </Box>

            {/* What You'll Learn */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                What You'll Learn
              </Typography>
              <List>
                {skill.whatYouLearn.map((item, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <CheckCircle sx={{ color: "#2e7d32", mr: 2 }} />
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Prerequisites */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Prerequisites
              </Typography>
              <List>
                {skill.prerequisites.map((item, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Availability */}
            <Card sx={{ border: "1px solid #c8d8e4" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Schedule sx={{ color: "#2b6777" }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Availability
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {skill.availability}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ border: "1px solid #c8d8e4", position: "sticky", top: 80 }}>
              <CardContent>
                {/* Instructor Profile */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Avatar sx={{ width: 64, height: 64, bgcolor: "#2b6777" }}>
                    {skill.instructor.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {skill.instructor.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating value={skill.instructor.rating} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {skill.instructor.rating}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                      <LocationOn sx={{ fontSize: 16, color: "#9e9e9e" }} />
                      <Typography variant="body2" color="text.secondary">
                        {skill.instructor.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleRequestExchange}
                  sx={{
                    mb: 2,
                    background: "linear-gradient(135deg, #2b6777 0%, #52ab98 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #235a68 0%, #459a88 100%)",
                    },
                  }}
                >
                  Request Exchange / Learn This Skill
                </Button>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Bookmark />}
                    sx={{ borderColor: "#c8d8e4" }}
                  >
                    Bookmark
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Share />}
                    sx={{ borderColor: "#c8d8e4" }}
                  >
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Request Exchange Dialog */}
      <Dialog open={openRequest} onClose={() => setOpenRequest(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Skill Exchange</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Preferred Schedule"
              type="datetime-local"
              fullWidth
              value={requestData.schedule}
              onChange={(e) =>
                setRequestData({ ...requestData, schedule: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Mode</InputLabel>
              <Select
                value={requestData.mode}
                label="Mode"
                onChange={(e) =>
                  setRequestData({ ...requestData, mode: e.target.value })
                }
              >
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Additional Notes"
              multiline
              rows={4}
              fullWidth
              value={requestData.notes}
              onChange={(e) =>
                setRequestData({ ...requestData, notes: e.target.value })
              }
            />
            <TextField
              label="Your Exchange Offering (Optional)"
              multiline
              rows={3}
              fullWidth
              value={requestData.offering}
              onChange={(e) =>
                setRequestData({ ...requestData, offering: e.target.value })
              }
              placeholder="What skill can you offer in return?"
            />
          </Box>
        </DialogContent>
        <Box sx={{ p: 2, display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button onClick={() => setOpenRequest(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmitRequest}
            sx={{
              background: "linear-gradient(135deg, #2b6777 0%, #52ab98 100%)",
            }}
          >
            Send Request
          </Button>
        </Box>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default SkillDetail;

