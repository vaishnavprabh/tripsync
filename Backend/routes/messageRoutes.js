import express from 'express';
import {
    sendMessage,
    getTripMessages
} from '../controllers/messageController.js';
import { requireOrganizerOrTraveler } from '../middleware/auth.js';

const router = express.Router();

// All routes require organizer or traveler authentication
router.post('/:tripId', requireOrganizerOrTraveler, sendMessage);
router.get('/:tripId', requireOrganizerOrTraveler, getTripMessages);

export default router;
