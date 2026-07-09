import Appointment from '../models/Appointment.js'

export async function createAppointment(req, res, next) {
  try {
    const data = { ...req.body }
    if (req.file) data.reportUrl = `/uploads/reports/${req.file.filename}`

    const appointment = await Appointment.create(data)
    res.status(201).json({ message: 'Appointment booked successfully', appointment })
  } catch (err) {
    next(err)
  }
}

export async function getAppointments(req, res, next) {
  try {
    const { type, status } = req.query
    const filter = {}
    if (type) filter.type = type
    if (status) filter.status = status
    const appointments = await Appointment.find(filter).sort({ createdAt: -1 })
    res.json(appointments)
  } catch (err) {
    next(err)
  }
}

export async function updateAppointmentStatus(req, res, next) {
  try {
    const { status } = req.body
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' })
    res.json(appointment)
  } catch (err) {
    next(err)
  }
}

export async function rescheduleAppointment(req, res, next) {
  try {
    const { date, time, preferredTime } = req.body
    const update = { status: 'confirmed' }
    if (date) update.date = date
    if (time) update.time = time
    if (preferredTime) update.preferredTime = preferredTime

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' })
    res.json(appointment)
  } catch (err) {
    next(err)
  }
}

export async function deleteAppointment(req, res, next) {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id)
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' })
    res.json({ message: 'Appointment deleted' })
  } catch (err) {
    next(err)
  }
}
