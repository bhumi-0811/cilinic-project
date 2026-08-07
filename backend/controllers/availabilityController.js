import Availability from '../models/Availability.js'
import { getAvailableSlots, getUpcomingAvailability } from '../utils/slotEngine.js'

export async function getAvailability(req, res, next) {
  try {
    let availability = await Availability.findOne()
    if (!availability) availability = await Availability.create({})
    res.json(availability)
  } catch (err) {
    next(err)
  }
}

export async function updateAvailability(req, res, next) {
  try {
    let availability = await Availability.findOne()
    if (!availability) availability = new Availability()

    if (req.body.slotDurationMinutes !== undefined) availability.slotDurationMinutes = req.body.slotDurationMinutes
    if (req.body.slotsPerBooking !== undefined) availability.slotsPerBooking = req.body.slotsPerBooking
    if (req.body.weeklySchedule !== undefined) availability.weeklySchedule = req.body.weeklySchedule
    if (req.body.blockedDates !== undefined) availability.blockedDates = req.body.blockedDates

    await availability.save()
    res.json(availability)
  } catch (err) {
    next(err)
  }
}

export async function getSlotsForDate(req, res, next) {
  try {
    const { date } = req.query
    if (!date) return res.status(400).json({ message: 'date query param is required (YYYY-MM-DD)' })
    const slots = await getAvailableSlots(date)
    res.json({ date, slots })
  } catch (err) {
    next(err)
  }
}

export async function getUpcoming(req, res, next) {
  try {
    const days = Number(req.query.days) || 7
    const result = await getUpcomingAvailability(days)
    res.json(result)
  } catch (err) {
    next(err)
  }
}
