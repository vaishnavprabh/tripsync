import express from 'express';
import {
    addItineraryDay,
    getTripItinerary,
    addActivity,
    updateActivity,
    deleteActivity,
    deleteDay
} from '../controllers/itineraryController.js';
import { requireOrganizer, requireOrganizerOrTraveler } from '../middleware/auth.js';

const router = express.Router();

// Get itinerary - organizer or traveler can view
router.get('/:tripId', requireOrganizerOrTraveler, getTripItinerary);

// Modify itinerary - only organizer
router.post('/:tripId/day', requireOrganizer, addItineraryDay);
router.delete('/day/:dayId', requireOrganizer, deleteDay);
router.post('/day/:dayId/activity', requireOrganizer, addActivity);
router.put('/activity/:activityId', requireOrganizer, updateActivity);
router.delete('/activity/:activityId', requireOrganizer, deleteActivity);

export default router;
