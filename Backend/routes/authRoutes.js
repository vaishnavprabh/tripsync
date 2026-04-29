import express from 'express'
import { Adminlogin, UserLogin, OrganizerLogin, logout, refreshToken, verifyAuth } from '../controllers/auth.js'
import { authenticate } from '../middleware/auth.js'


const router= express.Router()

// Public routes (no authentication required)
router.post('/AdminLogin', Adminlogin)
router.post('/userLogin', UserLogin)
router.post('/organizerLogin', OrganizerLogin)
router.post('/refreshToken', refreshToken)

// Protected routes (authentication required)
router.post('/logout', authenticate, logout)
router.get('/verify', authenticate, verifyAuth)


export default router
