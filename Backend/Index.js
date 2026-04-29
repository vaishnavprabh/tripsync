import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import addRoutes from './routes/addRoute.js';
import authRoutes from './routes/authRoutes.js';
import getRoutes from './routes/getRoute.js';
import deleteRoutes from './routes/deleteRoute.js';
import updateRoutes from './routes/updateRoute.js';
import tripRoutes from './routes/tripRoutes.js';
import invitationRoutes from './routes/invitationRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
      
// Authentication routes
app.use('/api/auth', authRoutes);

// User management routes
app.use('/api/add', addRoutes);
app.use('/api/get', getRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/delete', deleteRoutes);

// Organizer routes
app.use('/api/trips', tripRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/messages', messageRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// Feedback routes
app.use('/api/feedback', feedbackRoutes);

// AI routes
app.use('/api/ai', aiRoutes);

app.listen(8081, () => {
  console.log('Server is running');
});
