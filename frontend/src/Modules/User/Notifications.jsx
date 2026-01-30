import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import {
  SwapHoriz,
  Message,
  CheckCircle,
  Star,
  TrendingUp,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import UserNav from "./Components/UserNav";
import Footer from "./Components/Footer";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "exchange",
      title: "Exchange Request Accepted",
      message: "John Doe accepted your request to learn Web Development",
      time: "2 hours ago",
      read: false,
      icon: <CheckCircle />,
      color: "#2e7d32",
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message: "You have a new message from Jane Smith",
      time: "5 hours ago",
      read: false,
      icon: <Message />,
      color: "#1976d2",
    },
    {
      id: 3,
      type: "skill",
      title: "Skill Approved",
      message: "Your skill 'Graphic Design' has been approved by admin",
      time: "1 day ago",
      read: true,
      icon: <CheckCircle />,
      color: "#2e7d32",
    },
    {
      id: 4,
      type: "trending",
      title: "Skill Trending",
      message: "Your skill 'Web Development' is now trending!",
      time: "2 days ago",
      read: true,
      icon: <TrendingUp />,
      color: "#ed6c02",
    },
    {
      id: 5,
      type: "review",
      title: "New Review",
      message: "You received a 5-star review from Mike Johnson",
      time: "3 days ago",
      read: true,
      icon: <Star />,
      color: "#ffc107",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <UserNav />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <NotificationsIcon sx={{ fontSize: 32, color: "#2b6777" }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
        </Box>

        <List sx={{ backgroundColor: "#ffffff", border: "1px solid #c8d8e4", borderRadius: 2 }}>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  backgroundColor: notification.read ? "#ffffff" : "#c8d8e4",
                  "&:hover": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: notification.color }}>
                    {notification.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {notification.title}
                      </Typography>
                      {!notification.read && (
                        <Chip label="New" size="small" color="primary" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                        {notification.time}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Container>
      <Footer />
    </Box>
  );
};

export default Notifications;

