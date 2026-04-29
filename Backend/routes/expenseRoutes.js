import express from 'express';
import {
    addExpense,
    getTripExpenses,
    updateExpense,
    deleteExpense
} from '../controllers/expenseController.js';
import { requireOrganizerOrTraveler } from '../middleware/auth.js';

const router = express.Router();

// Routes require organizer or traveler authentication
router.post('/:tripId', requireOrganizerOrTraveler, addExpense);
router.get('/:tripId', requireOrganizerOrTraveler, getTripExpenses);
router.put('/:expenseId', requireOrganizerOrTraveler, updateExpense);
router.delete('/:expenseId', requireOrganizerOrTraveler, deleteExpense);

export default router;
