import express from 'express'
import { createReview, getReviews, getAllReviewsAdmin, updateReviewApproval } from '../controllers/reviewController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/', createReview)
router.get('/', getReviews)
router.get('/all', protect, getAllReviewsAdmin)
router.patch('/:id/approve', protect, updateReviewApproval)

export default router
