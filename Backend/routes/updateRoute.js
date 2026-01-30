import express from 'express'
import { updateUser } from '../controllers/editServices.js'

const router = express.Router()

router.put('/updateUser/:id', updateUser)

export default router
