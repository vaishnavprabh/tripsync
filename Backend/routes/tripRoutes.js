import express from 'express';
import {
    createTrip,
    getOrganizerTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    getTripStats,
    getTravelerTrips,
    getPublishedTrips,
    getTripParticipants
} from '../controllers/tripController.js';
import { requireOrganizer, requireTraveler, requireOrganizerOrTraveler } from '../middleware/auth.js';

const router = express.Router();

// Public routes (no auth required)
router.get('/published', getPublishedTrips);

// Traveler routes (must be before /:tripId to avoid route conflict)
router.get('/traveler/my-trips', requireTraveler, getTravelerTrips);

// Organizer routes
router.post('/', requireOrganizer, createTrip);
router.get('/', requireOrganizer, getOrganizerTrips);
router.get('/stats', requireOrganizer, getTripStats);
router.put('/:tripId', requireOrganizer, updateTrip);
router.delete('/:tripId', requireOrganizer, deleteTrip);

// Participants route (organizer or traveler can view)
router.get('/:tripId/participants', requireOrganizerOrTraveler, getTripParticipants);

// Get trip by ID - organizer or traveler can view (if they're participants)
router.get('/:tripId', requireOrganizerOrTraveler, getTripById);

export default router;
