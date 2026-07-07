import ContactMessage from '../models/ContactMessage.js'

export async function createContactMessage(req, res, next) {
  try {
    const message = await ContactMessage.create(req.body)
    res.status(201).json({ message: 'Message sent successfully', data: message })
  } catch (err) {
    next(err)
  }
}

export async function getContactMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    next(err)
  }
}
