import express from 'express';
import {
    submitFeedback,
    getAllFeedback,
    getFeedbackById,
    replyToFeedback,
    updateFeedbackStatus,
    deleteFeedback,
    getUserFeedback
} from '../controllers/feedbackController.js';
import { requireAdmin, requireOrganizerOrTraveler } from '../middleware/auth.js';
import { verifyToken } from '../config/jwt.js';

const router = express.Router();

// Optional authentication middleware - doesn't fail if no token
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
        } catch (error) {
            // Invalid token, continue without user
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
};

// Public route - anyone can submit feedback (with or without auth)
router.post('/submit', optionalAuth, submitFeedback);

// User routes - get their own feedback
router.get('/my-feedback', requireOrganizerOrTraveler, getUserFeedback);

// Admin routes
router.get('/', requireAdmin, getAllFeedback);
router.get('/:feedbackId', requireAdmin, getFeedbackById);
router.post('/:feedbackId/reply', requireAdmin, replyToFeedback);
router.put('/:feedbackId/status', requireAdmin, updateFeedbackStatus);
router.delete('/:feedbackId', requireAdmin, deleteFeedback);

export default router;
