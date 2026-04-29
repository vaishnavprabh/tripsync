import express from 'express';
import {
    createAnnouncement,
    getTripAnnouncements,
    deleteAnnouncement
} from '../controllers/announcementController.js';
import { requireOrganizerOrTraveler } from '../middleware/auth.js';

const router = express.Router();

// All routes require organizer or traveler authentication
router.post('/:tripId', requireOrganizerOrTraveler, createAnnouncement);
router.get('/:tripId', requireOrganizerOrTraveler, getTripAnnouncements);
router.delete('/:announcementId', requireOrganizerOrTraveler, deleteAnnouncement);

export default router;
