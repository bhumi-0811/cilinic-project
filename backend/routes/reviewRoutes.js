import express from 'express'
import { createReview, getReviews, getAllReviewsAdmin, updateReviewApproval } from '../controllers/reviewController.js'

const router = express.Router()

router.post('/', createReview)
router.get('/', getReviews)
router.get('/all', getAllReviewsAdmin) // TODO: protect with admin auth in phase 2
router.patch('/:id/approve', updateReviewApproval) // TODO: protect with admin auth in phase 2

export default router
