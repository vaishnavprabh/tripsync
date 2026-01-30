import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  IconButton,
  Tooltip,
  Paper,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  Bookmark,
  BookmarkBorder,
  LocationOn,
  Computer,
  SwapHoriz,
  Search,
  FilterList,
  Tune,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserNav from "./Components/UserNav";
import Footer from "./Components/Footer";

const SkillDiscovery = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [mode, setMode] = useState("all");
  const [rating, setRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [bookmarked, setBookmarked] = useState(new Set());

  const skills = [
    {
      id: 1,
      name: "Web Development",
      instructor: "John Doe",
      rating: 4.8,
      reviews: 45,
      mode: "Online",
      category: "Programming",
      location: "Remote",
      description: "Learn modern web development with React, Node.js, and more",
      image: "https://via.placeholder.com/300x200",
      price: "Free Exchange",
    },
    {
      id: 2,
      name: "Graphic Design",
      instructor: "Jane Smith",
      rating: 4.9,
      reviews: 38,
      mode: "Offline",
      category: "Design",
      location: "New York, NY",
      description: "Master Adobe Creative Suite and design principles",
      image: "https://via.placeholder.com/300x200",
      price: "Free Exchange",
    },
    {
      id: 3,
      name: "Spanish Language",
      instructor: "Maria Garcia",
      rating: 4.7,
      reviews: 52,
      mode: "Online",
      category: "Languages",
      location: "Remote",
      description: "Learn Spanish from a native speaker",
      image: "https://via.placeholder.com/300x200",
      price: "Free Exchange",
    },
  ];

  const handleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarked((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <UserNav />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#2b6777",
              background: "linear-gradient(135deg, #2b6777 0%, #52ab98 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Discover Skills
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore and find the perfect skills to learn or exchange
          </Typography>
        </Box>

        {/* Search Bar */}
        <Paper
          component="form"
          elevation={0}
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            mb: 4,
            border: "1px solid #c8d8e4",
            borderRadius: 3,
            backgroundColor: "#f2f2f2",
            transition: "all 0.3s ease",
            "&:focus-within": {
              backgroundColor: "#ffffff",
              borderColor: "#2b6777",
              boxShadow: "0 2px 8px rgba(43, 103, 119, 0.1)",
            },
          }}
        >
          <InputAdornment position="start" sx={{ ml: 1 }}>
            <Search sx={{ color: "#2b6777" }} />
          </InputAdornment>
          <TextField
            fullWidth
            placeholder="Search skills, instructors, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{ ml: 1 }}
          />
        </Paper>

        {/* Filters */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            border: "1px solid #c8d8e4",
            borderRadius: 3,
            backgroundColor: "#f2f2f2",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <FilterList sx={{ color: "#2b6777" }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#2b6777" }}>
              Filters
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <FormControl
              sx={{
                minWidth: 150,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "&:hover fieldset": {
                    borderColor: "#2b6777",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2b6777",
                  },
                },
              }}
              size="small"
            >
              <InputLabel sx={{ color: "#2b6777" }}>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Programming">Programming</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Languages">Languages</MenuItem>
                <MenuItem value="Fitness">Fitness</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{
                minWidth: 150,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "&:hover fieldset": {
                    borderColor: "#2b6777",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2b6777",
                  },
                },
              }}
              size="small"
            >
              <InputLabel sx={{ color: "#2b6777" }}>Mode</InputLabel>
              <Select value={mode} label="Mode" onChange={(e) => setMode(e.target.value)}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{
                minWidth: 150,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "&:hover fieldset": {
                    borderColor: "#2b6777",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2b6777",
                  },
                },
              }}
              size="small"
            >
              <InputLabel sx={{ color: "#2b6777" }}>Rating</InputLabel>
              <Select value={rating} label="Rating" onChange={(e) => setRating(e.target.value)}>
                <MenuItem value="all">All Ratings</MenuItem>
                <MenuItem value="4.5">4.5+ Stars</MenuItem>
                <MenuItem value="4.0">4.0+ Stars</MenuItem>
                <MenuItem value="3.5">3.5+ Stars</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{
                minWidth: 150,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "&:hover fieldset": {
                    borderColor: "#2b6777",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2b6777",
                  },
                },
              }}
              size="small"
            >
              <InputLabel sx={{ color: "#2b6777" }}>Sort By</InputLabel>
              <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<Tune />}
              onClick={() => {
                setCategory("all");
                setMode("all");
                setRating("all");
                setSortBy("newest");
                setSearchQuery("");
              }}
              sx={{
                borderColor: "#c8d8e4",
                color: "#2b6777",
                "&:hover": {
                  borderColor: "#2b6777",
                  backgroundColor: "#c8d8e4",
                },
              }}
            >
              Reset
            </Button>
          </Box>
        </Paper>

        {/* Skills Grid */}
        <Grid container spacing={3}>
          {skills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "1px solid #c8d8e4",
                  borderRadius: 3,
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(43, 103, 119, 0.15)",
                    borderColor: "#2b6777",
                    "& .skill-image": {
                      transform: "scale(1.1)",
                    },
                  },
                }}
                onClick={() => navigate(`/skill/${skill.id}`)}
              >
                <Box sx={{ position: "relative", overflow: "hidden", height: 200 }}>
                  <CardMedia
                    className="skill-image"
                    component="img"
                    height="200"
                    image={skill.image}
                    alt={skill.name}
                    sx={{
                      transition: "transform 0.5s ease",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    onClick={(e) => handleBookmark(skill.id, e)}
                  >
                    {bookmarked.has(skill.id) ? (
                      <Bookmark sx={{ color: "#2b6777" }} />
                    ) : (
                      <BookmarkBorder sx={{ color: "#757575" }} />
                    )}
                  </IconButton>
                </Box>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                      color: "#2b6777",
                    }}
                  >
                    {skill.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5, fontWeight: 500 }}
                  >
                    by {skill.instructor}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Rating value={skill.rating} readOnly size="small" />
                    <Typography variant="body2" sx={{ color: "#2b6777", fontWeight: 500 }}>
                      {skill.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({skill.reviews} reviews)
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: "#757575",
                      minHeight: 40,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {skill.description}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                    <Chip
                      label={skill.mode}
                      size="small"
                      sx={{
                        backgroundColor:
                          skill.mode === "Online" ? "#52ab98" : "#c8d8e4",
                        color: skill.mode === "Online" ? "#ffffff" : "#2b6777",
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={skill.category}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: "#c8d8e4",
                        color: "#2b6777",
                        fontWeight: 500,
                      }}
                    />
                    {skill.mode === "Offline" && (
                      <Chip
                        icon={<LocationOn sx={{ fontSize: 16, color: "#2b6777" }} />}
                        label={skill.location}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: "#c8d8e4",
                          color: "#2b6777",
                          fontWeight: 500,
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 1,
                      borderTop: "1px solid #c8d8e4",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: "#2b6777",
                        fontSize: "1rem",
                      }}
                    >
                      {skill.price}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#2b6777",
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 2,
                        "&:hover": {
                          backgroundColor: "#52ab98",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/skill/${skill.id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
            mb: 2,
          }}
        >
          <Pagination
            count={10}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#2b6777",
                "&.Mui-selected": {
                  backgroundColor: "#2b6777",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#52ab98",
                  },
                },
                "&:hover": {
                  backgroundColor: "#c8d8e4",
                },
              },
            }}
          />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default SkillDiscovery;

