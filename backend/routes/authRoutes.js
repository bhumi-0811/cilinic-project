import express from 'express'
import { login, getMe, changePassword, changeEmail } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/login', login)
router.get('/me', protect, getMe)
router.patch('/change-password', protect, changePassword)
router.patch('/change-email', protect, changeEmail)

export default router
