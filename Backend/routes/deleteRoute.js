import express from "express";
import { deleteUser} from "../controllers/deleteServices.js";
import { requireAdmin } from '../middleware/auth.js';

const router=express.Router();

// Admin only route
router.delete('/deleteUser/:id', requireAdmin, deleteUser)



export default router