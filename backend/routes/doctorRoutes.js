import express from 'express'
import { getDoctor, updateDoctor } from '../controllers/doctorController.js'
import { protect } from '../middleware/auth.js'
import { uploadDoctorPhoto } from '../middleware/upload.js'

const router = express.Router()

router.get('/', getDoctor)
router.put('/', protect, uploadDoctorPhoto.single('photo'), updateDoctor)

export default router
