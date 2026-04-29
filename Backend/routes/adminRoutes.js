import express from 'express';
import {
    getAdminStats,
    getAllTrips,
    getTripDetails,
    deleteTrip
} from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin authentication
router.get('/stats', requireAdmin, getAdminStats);
router.get('/trips', requireAdmin, getAllTrips);
router.get('/trips/:tripId', requireAdmin, getTripDetails);
router.delete('/trips/:tripId', requireAdmin, deleteTrip);

export default router;
