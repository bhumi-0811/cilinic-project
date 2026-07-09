import express from 'express'
import { upload } from '../middleware/upload.js'
import { protect } from '../middleware/auth.js'
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  rescheduleAppointment,
  deleteAppointment,
} from '../controllers/appointmentController.js'

const router = express.Router()

router.post('/', upload.single('reports'), createAppointment)
router.get('/', protect, getAppointments)
router.patch('/:id/status', protect, updateAppointmentStatus)
router.patch('/:id/reschedule', protect, rescheduleAppointment)
router.delete('/:id', protect, deleteAppointment)

export default router
