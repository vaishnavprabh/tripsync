import express from 'express'
import { getAllUsers} from '../controllers/getServices.js'
import { requireAdmin } from '../middleware/auth.js'


const router= express.Router()

// Admin only route
router.get('/getAllUsers', requireAdmin, getAllUsers)



export default router