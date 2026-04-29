import express from 'express'
import { updateUser } from '../controllers/editServices.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Authenticated users can update (controller will check if user can update themselves or if admin)
router.put('/updateUser/:id', authenticate, updateUser)

export default router
