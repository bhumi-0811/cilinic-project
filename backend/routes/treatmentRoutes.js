import express from 'express'
import {
  getTreatments,
  getTreatmentBySlug,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} from '../controllers/treatmentController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getTreatments)
router.get('/:slug', getTreatmentBySlug)
router.post('/', protect, createTreatment)
router.put('/:id', protect, updateTreatment)
router.delete('/:id', protect, deleteTreatment)

export default router
