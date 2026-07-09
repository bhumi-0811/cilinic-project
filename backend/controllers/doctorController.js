import Doctor from '../models/Doctor.js'

export async function getDoctor(req, res, next) {
  try {
    let doctor = await Doctor.findOne()
    if (!doctor) doctor = await Doctor.create({})
    res.json(doctor)
  } catch (err) {
    next(err)
  }
}

export async function updateDoctor(req, res, next) {
  try {
    let doctor = await Doctor.findOne()
    if (!doctor) doctor = new Doctor()

    const fields = ['name', 'designation', 'bio', 'experienceYears']
    fields.forEach((f) => {
      if (req.body[f] !== undefined) doctor[f] = req.body[f]
    })
    ;['qualifications', 'specializations', 'languages'].forEach((f) => {
      if (req.body[f] !== undefined) {
        doctor[f] = Array.isArray(req.body[f]) ? req.body[f] : String(req.body[f]).split(',').map((s) => s.trim()).filter(Boolean)
      }
    })
    if (req.file) doctor.photoUrl = `/uploads/doctor/${req.file.filename}`

    await doctor.save()
    res.json(doctor)
  } catch (err) {
    next(err)
  }
}
