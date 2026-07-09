import Settings from '../models/Settings.js'

const defaultHours = [
  { days: 'Monday – Saturday', time: '11:30 AM – 2:00 PM & 6:00 PM – 8:30 PM' },
  { days: 'Wednesday', time: 'Closed' },
  { days: 'Sunday', time: 'Closed' },
]

export async function getSettings(req, res, next) {
  try {
    let settings = await Settings.findOne()
    if (!settings) settings = await Settings.create({ hours: defaultHours })
    res.json(settings)
  } catch (err) {
    next(err)
  }
}

export async function updateSettings(req, res, next) {
  try {
    let settings = await Settings.findOne()
    if (!settings) settings = new Settings()

    const fields = ['clinicName', 'phone', 'phoneAlt', 'email', 'address', 'instagram']
    fields.forEach((f) => {
      if (req.body[f] !== undefined) settings[f] = req.body[f]
    })
    if (req.body.hours !== undefined) settings.hours = req.body.hours

    await settings.save()
    res.json(settings)
  } catch (err) {
    next(err)
  }
}
