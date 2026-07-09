import express from 'express'
import { createContactMessage, getContactMessages, markMessageRead } from '../controllers/contactController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/', createContactMessage)
router.get('/', protect, getContactMessages)
router.patch('/:id/read', protect, markMessageRead)

export default router
