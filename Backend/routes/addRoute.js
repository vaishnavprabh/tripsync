import express from 'express'
import { addusers } from '../controllers/addServices.js'


const router= express.Router()


router.post('/addusers', addusers)


export default router

