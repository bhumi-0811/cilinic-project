import express from 'express'
import { upload } from '../middleware/upload.js'
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js'

const router = express.Router()

router.post('/', upload.single('reports'), createAppointment)
router.get('/', getAppointments) // TODO: protect with admin auth in phase 2
router.patch('/:id/status', updateAppointmentStatus)
router.delete('/:id', deleteAppointment)

export default router
