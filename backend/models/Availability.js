import mongoose from 'mongoose'

// Singleton document holding the doctor's recurring weekly schedule
// and any one-off blocked dates (holidays, leave days).
const availabilitySchema = new mongoose.Schema(
  {
    slotDurationMinutes: { type: Number, default: 20 },
    slotsPerBooking: { type: Number, default: 1 }, // how many patients can book the same slot
    weeklySchedule: {
      // 0 = Sunday ... 6 = Saturday
      type: [
        {
          day: { type: Number, required: true, min: 0, max: 6 },
          isOpen: { type: Boolean, default: false },
          windows: [
            {
              start: String, // "10:00"
              end: String,   // "18:00"
            },
          ],
        },
      ],
      default: [
        { day: 0, isOpen: false, windows: [] }, // Sunday - closed
        { day: 1, isOpen: true, windows: [{ start: '11:30', end: '14:00' }, { start: '18:00', end: '20:30' }] },
        { day: 2, isOpen: true, windows: [{ start: '11:30', end: '14:00' }, { start: '18:00', end: '20:30' }] },
        { day: 3, isOpen: false, windows: [] }, // Wednesday - closed
        { day: 4, isOpen: true, windows: [{ start: '11:30', end: '14:00' }, { start: '18:00', end: '20:30' }] },
        { day: 5, isOpen: true, windows: [{ start: '11:30', end: '14:00' }, { start: '18:00', end: '20:30' }] },
        { day: 6, isOpen: true, windows: [{ start: '11:30', end: '14:00' }, { start: '18:00', end: '20:30' }] },
      ],
    },
    blockedDates: [
      {
        date: String, // "2026-08-15"
        reason: String,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Availability', availabilitySchema)
