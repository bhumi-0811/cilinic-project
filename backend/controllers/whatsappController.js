import Razorpay from 'razorpay'
import WhatsAppSession from '../models/WhatsAppSession.js'
import Appointment from '../models/Appointment.js'
import { getUpcomingAvailability, getAvailableSlots } from '../utils/slotEngine.js'
import { sendText, sendNumberedOptions } from '../utils/whatsapp.js'

// --- Helpers -----------------------------------------------------------

async function getOrCreateSession(phone) {
  let session = await WhatsAppSession.findOne({ phone })
  if (!session) session = await WhatsAppSession.create({ phone, step: 'start', data: {} })
  return session
}

async function resetSession(session) {
  session.step = 'start'
  session.data = {}
  await session.save()
}

async function createPaymentLink(appointment) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
  const link = await razorpay.paymentLink.create({
    amount: 50000, // ₹500 - TODO: make configurable
    currency: 'INR',
    description: `Vijaya Clinics appointment - ${appointment.name}`,
    customer: { name: appointment.name, contact: appointment.phone },
    notify: { sms: false, email: false },
    notes: { appointmentId: String(appointment._id) },
  })
  appointment.razorpayOrderId = link.id
  await appointment.save()
  return link.short_url
}

// --- Main webhook entrypoint --------------------------------------------

/**
 * Handles an incoming WhatsApp message webhook from AiSensy.
 *
 * IMPORTANT: AiSensy's exact incoming-webhook payload shape depends on your
 * account setup. Log `req.body` once your webhook is live and adjust the
 * `extractIncoming` function below to match the real field names before
 * relying on this in production.
 */
export async function handleIncomingMessage(req, res, next) {
  try {
    const { phone, text } = extractIncoming(req.body)
    if (!phone || !text) {
      return res.status(200).json({ ok: true, note: 'No phone/text extracted - check extractIncoming() mapping' })
    }

    const session = await getOrCreateSession(phone)
    const trimmed = text.trim()

    // Allow restarting the conversation at any point
    if (/^(hi|hello|hey|book|start|restart)$/i.test(trimmed) && session.step !== 'start') {
      await resetSession(session)
    }

    switch (session.step) {
      case 'start':
        await handleStart(phone, session)
        break
      case 'awaiting_date':
        await handleDateChoice(phone, session, trimmed)
        break
      case 'awaiting_slot':
        await handleSlotChoice(phone, session, trimmed)
        break
      case 'awaiting_name':
        session.data.name = trimmed
        session.step = 'awaiting_age'
        await session.save()
        await sendText(phone, 'What is your age?')
        break
      case 'awaiting_age': {
        const age = parseInt(trimmed, 10)
        if (!age || age <= 0 || age > 120) {
          await sendText(phone, 'Please enter a valid age (numbers only).')
          break
        }
        session.data.age = age
        session.step = 'awaiting_gender'
        await session.save()
        await sendNumberedOptions(phone, 'Gender?', ['Male', 'Female', 'Other'])
        break
      }
      case 'awaiting_gender': {
        const genders = ['Male', 'Female', 'Other']
        const idx = parseInt(trimmed, 10) - 1
        const gender = genders[idx] || trimmed
        session.data.gender = gender
        session.step = 'awaiting_problem'
        await session.save()
        await sendText(phone, 'Briefly describe your concern (skin, hair, or mental wellness):')
        break
      }
      case 'awaiting_problem':
        session.data.problem = trimmed
        session.step = 'awaiting_payment_choice'
        await session.save()
        await sendNumberedOptions(phone, 'How would you like to pay?', ['Pay Online now', 'Pay at the clinic (on visit)'])
        break
      case 'awaiting_payment_choice':
        await handlePaymentChoice(phone, session, trimmed)
        break
      default:
        await resetSession(session)
        await handleStart(phone, session)
    }

    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

// --- Step handlers -------------------------------------------------------

async function handleStart(phone, session) {
  const upcoming = await getUpcomingAvailability(7)
  const withSlots = upcoming.filter((d) => d.slots.length > 0)

  if (!withSlots.length) {
    await sendText(phone, 'Sorry, there are no available slots in the next 7 days. Please call the clinic directly.')
    return
  }

  session.data.dateOptions = withSlots.map((d) => d.date)
  session.step = 'awaiting_date'
  await session.save()

  const labels = withSlots.map((d) => `${d.weekday}, ${d.date} (${d.slots.length} slots)`)
  await sendNumberedOptions(phone, 'Welcome to Vijaya Clinics! Here are the available days for booking:', labels)
}

async function handleDateChoice(phone, session, reply) {
  const idx = parseInt(reply, 10) - 1
  const dateOptions = session.data.dateOptions || []
  const chosenDate = dateOptions[idx]

  if (!chosenDate) {
    await sendText(phone, "Sorry, I didn't understand that. Please reply with the number of the day you'd like.")
    return
  }

  const slots = await getAvailableSlots(chosenDate)
  if (!slots.length) {
    await sendText(phone, 'Sorry, that day just got fully booked. Please choose another day - type "restart" to see options again.')
    return
  }

  session.data.date = chosenDate
  session.data.slotOptions = slots
  session.step = 'awaiting_slot'
  await session.save()

  await sendNumberedOptions(phone, `Available time slots on ${chosenDate}:`, slots)
}

async function handleSlotChoice(phone, session, reply) {
  const idx = parseInt(reply, 10) - 1
  const slotOptions = session.data.slotOptions || []
  const chosenSlot = slotOptions[idx]

  if (!chosenSlot) {
    await sendText(phone, "Sorry, I didn't understand that. Please reply with the number of a time slot.")
    return
  }

  // Re-check availability in case someone else just took it
  const stillAvailable = await getAvailableSlots(session.data.date)
  if (!stillAvailable.includes(chosenSlot)) {
    await sendText(phone, 'Sorry, that slot was just booked by someone else. Please choose another:')
    await sendNumberedOptions(phone, `Available time slots on ${session.data.date}:`, stillAvailable)
    session.data.slotOptions = stillAvailable
    await session.save()
    return
  }

  session.data.time = chosenSlot
  session.step = 'awaiting_name'
  await session.save()
  await sendText(phone, "Great! What's your full name?")
}

async function handlePaymentChoice(phone, session, reply) {
  const isOnline = /^1|online/i.test(reply.trim())
  const { date, time, name, age, gender, problem } = session.data

  const appointment = await Appointment.create({
    type: 'in-clinic',
    source: 'whatsapp',
    name,
    age,
    gender,
    phone,
    problem,
    date,
    time,
    paymentStatus: isOnline ? 'pending' : 'not-required',
    status: 'pending',
  })

  if (isOnline) {
    try {
      const payUrl = await createPaymentLink(appointment)
      await sendText(
        phone,
        `Almost done! Please complete your payment here to confirm your booking:\n${payUrl}\n\nAppointment: ${date} at ${time}\nOnce paid, our team will confirm your slot.`
      )
    } catch (err) {
      await sendText(
        phone,
        `Your appointment for ${date} at ${time} is booked, but online payment isn't available right now - you can pay at the clinic instead. We'll see you soon!`
      )
    }
  } else {
    await sendText(
      phone,
      `You're booked! ✅\n\nDate: ${date}\nTime: ${time}\nPayment: At the clinic\n\nOur team will confirm shortly. See you at Vijaya Clinics!`
    )
  }

  await resetSession(await WhatsAppSession.findOne({ phone }))
}

// --- Payload extraction (ADJUST to match your real AiSensy webhook shape) ---

function extractIncoming(body) {
  // Common shapes seen across WhatsApp BSPs - try a few reasonable fallbacks.
  // Once you have a real AiSensy webhook payload sample, update this to match exactly.
  const phone =
    body?.phone ||
    body?.from ||
    body?.contact?.phone ||
    body?.sender ||
    body?.data?.phone

  const text =
    body?.text ||
    body?.message ||
    body?.body ||
    body?.data?.text ||
    body?.data?.message

  return { phone: phone ? String(phone).replace(/\D/g, '') : null, text: text ? String(text) : null }
}
