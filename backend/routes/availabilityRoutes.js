import express from 'express'
import { getAvailability, updateAvailability, getSlotsForDate, getUpcoming } from '../controllers/availabilityController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getAvailability)
router.put('/', protect, updateAvailability)
router.get('/slots', getSlotsForDate)
router.get('/upcoming', getUpcoming)

export default router
