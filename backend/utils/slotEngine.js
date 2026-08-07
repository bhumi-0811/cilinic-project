import Availability from '../models/Availability.js'
import Appointment from '../models/Appointment.js'

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60).toString().padStart(2, '0')
  const m = (mins % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

/**
 * Returns an array of "HH:MM" slots available for booking on the given date.
 * @param {string} dateStr - "YYYY-MM-DD"
 */
export async function getAvailableSlots(dateStr) {
  const availability = await Availability.findOne()
  if (!availability) return []

  const isBlocked = availability.blockedDates.some((b) => b.date === dateStr)
  if (isBlocked) return []

  const date = new Date(`${dateStr}T00:00:00`)
  const dayOfWeek = date.getDay() // 0-6
  const daySchedule = availability.weeklySchedule.find((d) => d.day === dayOfWeek)
  if (!daySchedule || !daySchedule.isOpen || !daySchedule.windows.length) return []

  const duration = availability.slotDurationMinutes || 20
  const capacity = availability.slotsPerBooking || 1

  // Generate every possible slot from the open windows
  const allSlots = []
  for (const window of daySchedule.windows) {
    let cursor = timeToMinutes(window.start)
    const end = timeToMinutes(window.end)
    while (cursor + duration <= end) {
      allSlots.push(minutesToTime(cursor))
      cursor += duration
    }
  }

  // Count existing bookings per slot on that date (excluding cancelled)
  const existing = await Appointment.find({
    type: 'in-clinic',
    date: dateStr,
    status: { $ne: 'cancelled' },
  })
  const bookedCounts = {}
  existing.forEach((a) => {
    bookedCounts[a.time] = (bookedCounts[a.time] || 0) + 1
  })

  // If the date is today, drop slots that have already passed
  const now = new Date()
  const isToday = dateStr === now.toISOString().slice(0, 10)
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  return allSlots.filter((slot) => {
    const bookedForSlot = bookedCounts[slot] || 0
    if (bookedForSlot >= capacity) return false
    if (isToday && timeToMinutes(slot) <= nowMinutes) return false
    return true
  })
}

/** Returns the next N days (from today) that have at least one open slot, each with its slots. */
export async function getUpcomingAvailability(daysAhead = 7) {
  const results = []
  const today = new Date()
  for (let i = 0; i < daysAhead; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    const dateStr = d.toISOString().slice(0, 10)
    const slots = await getAvailableSlots(dateStr)
    results.push({ date: dateStr, weekday: d.toLocaleDateString('en-US', { weekday: 'long' }), slots })
  }
  return results
}
