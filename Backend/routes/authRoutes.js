import express from 'express'
import { Adminlogin, UserLogin, OrganizerLogin } from '../controllers/auth.js'


const router= express.Router()


router.post('/AdminLogin', Adminlogin)
router.post('/userLogin', UserLogin)
router.post('/organizerLogin', OrganizerLogin)


export default router
