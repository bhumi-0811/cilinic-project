import multer from 'multer'
import path from 'path'
import fs from 'fs'

function makeUploader(subfolder, allowedTypes) {
  const uploadDir = path.resolve(`uploads/${subfolder}`)
  fs.mkdirSync(uploadDir, { recursive: true })

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      cb(null, `${unique}${path.extname(file.originalname)}`)
    },
  })

  function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowedTypes.includes(ext)) cb(null, true)
    else cb(new Error(`Only ${allowedTypes.join(', ')} files are allowed`))
  }

  return multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })
}

export const upload = makeUploader('reports', ['.pdf', '.jpg', '.jpeg', '.png'])
export const uploadDoctorPhoto = makeUploader('doctor', ['.jpg', '.jpeg', '.png', '.webp'])
export const uploadGalleryPhoto = makeUploader('gallery', ['.jpg', '.jpeg', '.png', '.webp'])
