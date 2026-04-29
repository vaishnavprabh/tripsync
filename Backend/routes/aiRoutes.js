import express from 'express';
import { getDestinationSuggestions } from '../controllers/aiController.js';

const router = express.Router();

// Public route – destination-based suggestions using Gemini
router.post('/destination-suggestions', getDestinationSuggestions);

export default router;

