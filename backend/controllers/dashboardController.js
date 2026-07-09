import Appointment from '../models/Appointment.js'

export async function getDashboardStats(req, res, next) {
  try {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const endOfToday = new Date()
    endOfToday.setHours(23, 59, 59, 999)

    const [total, today, upcoming, completed, cancelled, pending] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ createdAt: { $gte: startOfToday, $lte: endOfToday } }),
      Appointment.countDocuments({ status: { $in: ['pending', 'confirmed'] } }),
      Appointment.countDocuments({ status: 'completed' }),
      Appointment.countDocuments({ status: 'cancelled' }),
      Appointment.countDocuments({ status: 'pending' }),
    ])

    const recent = await Appointment.find().sort({ createdAt: -1 }).limit(8)

    res.json({ total, today, upcoming, completed, cancelled, pending, recent })
  } catch (err) {
    next(err)
  }
}
