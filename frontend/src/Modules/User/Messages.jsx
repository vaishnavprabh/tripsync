import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  InputAdornment,
  Chip,
  Badge,
  Button,
} from "@mui/material";
import {
  Send,
  AttachFile,
  MoreVert,
  Search,
  EmojiEmotions,
  Image,
} from "@mui/icons-material";
import UserNav from "./Components/UserNav";
import Footer from "./Components/Footer";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Sure, let's schedule for tomorrow",
      time: "2:30 PM",
      unread: 2,
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Thanks for the session!",
      time: "Yesterday",
      unread: 0,
      avatar: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Can we reschedule?",
      time: "2 days ago",
      unread: 1,
      avatar: "MJ",
    },
  ];

  const messages = [
    { id: 1, sender: "John Doe", text: "Hi! I'm interested in learning web development", time: "10:00 AM", isMe: false },
    { id: 2, sender: "You", text: "Great! I'd be happy to help you learn", time: "10:05 AM", isMe: true },
    { id: 3, sender: "John Doe", text: "When would be a good time to start?", time: "10:10 AM", isMe: false },
    { id: 4, sender: "You", text: "How about tomorrow at 2 PM?", time: "10:15 AM", isMe: true },
    { id: 5, sender: "John Doe", text: "Sure, let's schedule for tomorrow", time: "2:30 PM", isMe: false },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      console.log("Sending:", message);
      setMessage("");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <UserNav />
      <Container maxWidth="lg" sx={{ py: 4, height: "calc(100vh - 200px)" }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              color: "#2b6777",
              background: "linear-gradient(135deg, #2b6777 0%, #52ab98 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Messages
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Connect and communicate with your skill exchange partners
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ height: "calc(100vh - 300px)" }}>
          {/* Chat List */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                border: "1px solid #c8d8e4",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  borderBottom: "1px solid #c8d8e4",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#2b6777",
                  }}
                >
                  Conversations
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search conversations..."
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#2b6777",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2b6777",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "#2b6777" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <List sx={{ flex: 1, overflow: "auto", p: 0 }}>
                {chats.map((chat) => (
                  <React.Fragment key={chat.id}>
                    <ListItem
                      button
                      selected={selectedChat === chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      sx={{
                        px: 2,
                        py: 1.5,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#f2f2f2",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#c8d8e4",
                          borderLeft: "4px solid #2b6777",
                          "&:hover": {
                            backgroundColor: "#c8d8e4",
                          },
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                          badgeContent={
                            chat.unread > 0 ? (
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: "50%",
                                  backgroundColor: "#52ab98",
                                  border: "2px solid #ffffff",
                                }}
                              />
                            ) : null
                          }
                        >
                          <Avatar
                            sx={{
                              bgcolor: "#2b6777",
                              width: 48,
                              height: 48,
                              fontSize: 18,
                              fontWeight: 600,
                            }}
                          >
                            {chat.avatar}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: selectedChat === chat.id ? 700 : 600,
                                color: selectedChat === chat.id ? "#2b6777" : "#212121",
                              }}
                            >
                              {chat.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#757575",
                                fontSize: "0.75rem",
                              }}
                            >
                              {chat.time}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#757575",
                              mt: 0.5,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {chat.lastMessage}
                          </Typography>
                        }
                      />
                      {chat.unread > 0 && (
                        <Chip
                          label={chat.unread}
                          size="small"
                          sx={{
                            ml: 1,
                            backgroundColor: "#52ab98",
                            color: "#ffffff",
                            fontWeight: 700,
                            minWidth: 24,
                            height: 24,
                            fontSize: "0.75rem",
                          }}
                        />
                      )}
                    </ListItem>
                    <Divider sx={{ borderColor: "#c8d8e4" }} />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Chat Window */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                border: "1px solid #c8d8e4",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              {/* Chat Header */}
              <Box
                sx={{
                  p: 2.5,
                  borderBottom: "1px solid #c8d8e4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          backgroundColor: "#52ab98",
                          border: "2px solid #ffffff",
                        }}
                      />
                    }
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#2b6777",
                        width: 48,
                        height: 48,
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      {chats.find((c) => c.id === selectedChat)?.avatar}
                    </Avatar>
                  </Badge>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#2b6777",
                      }}
                    >
                      {chats.find((c) => c.id === selectedChat)?.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#52ab98",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#52ab98",
                        }}
                      />
                      Online
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  sx={{
                    color: "#2b6777",
                    "&:hover": {
                      backgroundColor: "#c8d8e4",
                    },
                  }}
                >
                  <MoreVert />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  p: 3,
                  backgroundColor: "#f2f2f2",
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, rgba(43, 103, 119, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(82, 171, 152, 0.03) 0%, transparent 50%)",
                }}
              >
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      justifyContent: msg.isMe ? "flex-end" : "flex-start",
                      mb: 2.5,
                      animation: "fadeIn 0.3s ease-in",
                      "@keyframes fadeIn": {
                        from: { opacity: 0, transform: "translateY(10px)" },
                        to: { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        maxWidth: "70%",
                        backgroundColor: msg.isMe ? "#2b6777" : "#ffffff",
                        color: msg.isMe ? "#ffffff" : "#212121",
                        borderRadius: 3,
                        border: msg.isMe
                          ? "none"
                          : "1px solid #c8d8e4",
                        boxShadow: msg.isMe
                          ? "0 2px 8px rgba(43, 103, 119, 0.2)"
                          : "0 1px 3px rgba(0, 0, 0, 0.08)",
                        position: "relative",
                        "&::before": msg.isMe
                          ? {
                              content: '""',
                              position: "absolute",
                              right: -8,
                              top: 20,
                              width: 0,
                              height: 0,
                              borderTop: "8px solid transparent",
                              borderBottom: "8px solid transparent",
                              borderLeft: `8px solid #2b6777`,
                            }
                          : {
                              content: '""',
                              position: "absolute",
                              left: -8,
                              top: 20,
                              width: 0,
                              height: 0,
                              borderTop: "8px solid transparent",
                              borderBottom: "8px solid transparent",
                              borderRight: "8px solid #ffffff",
                            },
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: msg.isMe ? 400 : 500,
                          lineHeight: 1.6,
                          wordBreak: "break-word",
                        }}
                      >
                        {msg.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          mt: 1,
                          opacity: msg.isMe ? 0.8 : 0.6,
                          fontSize: "0.7rem",
                        }}
                      >
                        {msg.time}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box
                sx={{
                  p: 2.5,
                  borderTop: "1px solid #c8d8e4",
                  display: "flex",
                  gap: 1.5,
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                }}
              >
                <IconButton
                  sx={{
                    color: "#2b6777",
                    "&:hover": {
                      backgroundColor: "#c8d8e4",
                    },
                  }}
                >
                  <AttachFile />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#2b6777",
                    "&:hover": {
                      backgroundColor: "#c8d8e4",
                    },
                  }}
                >
                  <Image />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  multiline
                  maxRows={4}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "#f2f2f2",
                      "&:hover fieldset": {
                        borderColor: "#2b6777",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2b6777",
                      },
                    },
                  }}
                />
                <IconButton
                  sx={{
                    color: "#2b6777",
                    "&:hover": {
                      backgroundColor: "#c8d8e4",
                    },
                  }}
                >
                  <EmojiEmotions />
                </IconButton>
                <IconButton
                  onClick={handleSend}
                  disabled={!message.trim()}
                  sx={{
                    backgroundColor: message.trim() ? "#2b6777" : "#c8d8e4",
                    color: message.trim() ? "#ffffff" : "#757575",
                    "&:hover": {
                      backgroundColor: message.trim() ? "#52ab98" : "#c8d8e4",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#c8d8e4",
                      color: "#757575",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Messages;

