import express from 'express'
import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js'
import { protect } from '../middleware/auth.js'
import { uploadGalleryPhoto } from '../middleware/upload.js'

const router = express.Router()

router.get('/', getGallery)
router.post('/', protect, uploadGalleryPhoto.single('image'), uploadGalleryImage)
router.delete('/:id', protect, deleteGalleryImage)

export default router
