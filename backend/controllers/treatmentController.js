import Treatment from '../models/Treatment.js'

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function getTreatments(req, res, next) {
  try {
    const treatments = await Treatment.find().sort({ category: 1, order: 1, name: 1 })
    res.json(treatments)
  } catch (err) {
    next(err)
  }
}

export async function getTreatmentBySlug(req, res, next) {
  try {
    const treatment = await Treatment.findOne({ slug: req.params.slug })
    if (!treatment) return res.status(404).json({ message: 'Treatment not found' })
    res.json(treatment)
  } catch (err) {
    next(err)
  }
}

export async function createTreatment(req, res, next) {
  try {
    const data = { ...req.body }
    if (!data.slug) data.slug = slugify(data.name)
    const treatment = await Treatment.create(data)
    res.status(201).json(treatment)
  } catch (err) {
    next(err)
  }
}

export async function updateTreatment(req, res, next) {
  try {
    const data = { ...req.body }
    if (data.name && !data.slug) data.slug = slugify(data.name)
    const treatment = await Treatment.findByIdAndUpdate(req.params.id, data, { new: true })
    if (!treatment) return res.status(404).json({ message: 'Treatment not found' })
    res.json(treatment)
  } catch (err) {
    next(err)
  }
}

export async function deleteTreatment(req, res, next) {
  try {
    const treatment = await Treatment.findByIdAndDelete(req.params.id)
    if (!treatment) return res.status(404).json({ message: 'Treatment not found' })
    res.json({ message: 'Treatment deleted' })
  } catch (err) {
    next(err)
  }
}
