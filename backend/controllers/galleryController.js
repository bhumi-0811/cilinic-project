import Gallery from '../models/Gallery.js'

export async function getGallery(req, res, next) {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 })
    res.json(images)
  } catch (err) {
    next(err)
  }
}

export async function uploadGalleryImage(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image file is required' })
    const image = await Gallery.create({
      imageUrl: `/uploads/gallery/${req.file.filename}`,
      category: req.body.category || 'Clinic',
      caption: req.body.caption || '',
    })
    res.status(201).json(image)
  } catch (err) {
    next(err)
  }
}

export async function deleteGalleryImage(req, res, next) {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id)
    if (!image) return res.status(404).json({ message: 'Image not found' })
    res.json({ message: 'Image deleted' })
  } catch (err) {
    next(err)
  }
}
