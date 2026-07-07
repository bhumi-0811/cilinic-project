import Review from '../models/Review.js'

export async function createReview(req, res, next) {
  try {
    const review = await Review.create(req.body)
    res.status(201).json({ message: 'Review submitted — pending approval', review })
  } catch (err) {
    next(err)
  }
}

export async function getReviews(req, res, next) {
  try {
    // Public endpoint only returns approved reviews
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
}

export async function getAllReviewsAdmin(req, res, next) {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
}

export async function updateReviewApproval(req, res, next) {
  try {
    const { approved } = req.body
    const review = await Review.findByIdAndUpdate(req.params.id, { approved }, { new: true })
    if (!review) return res.status(404).json({ message: 'Review not found' })
    res.json(review)
  } catch (err) {
    next(err)
  }
}
