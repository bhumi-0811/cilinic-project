import FAQ from '../models/FAQ.js'

export async function getFaqs(req, res, next) {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 })
    res.json(faqs)
  } catch (err) {
    next(err)
  }
}

export async function createFaq(req, res, next) {
  try {
    const faq = await FAQ.create(req.body)
    res.status(201).json(faq)
  } catch (err) {
    next(err)
  }
}

export async function updateFaq(req, res, next) {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!faq) return res.status(404).json({ message: 'FAQ not found' })
    res.json(faq)
  } catch (err) {
    next(err)
  }
}

export async function deleteFaq(req, res, next) {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id)
    if (!faq) return res.status(404).json({ message: 'FAQ not found' })
    res.json({ message: 'FAQ deleted' })
  } catch (err) {
    next(err)
  }
}
