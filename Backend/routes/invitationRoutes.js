import express from 'express';
import {
    sendInvitation,
    getTripInvitations,
    cancelInvitation,
    getInviteLink,
    joinTripByCode
} from '../controllers/invitationController.js';
import { requireOrganizer, requireTraveler } from '../middleware/auth.js';

const router = express.Router();

// All routes require organizer authentication
router.post('/:tripId/send', requireOrganizer, sendInvitation);
router.get('/:tripId', requireOrganizer, getTripInvitations);
router.get('/:tripId/link', requireOrganizer, getInviteLink);
router.put('/:invitationId/cancel', requireOrganizer, cancelInvitation);

// Join trip via invite code (for travelers)
router.post('/join', requireTraveler, joinTripByCode);

export default router;
