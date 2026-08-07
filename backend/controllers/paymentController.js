import crypto from 'crypto'
import Razorpay from 'razorpay'
import Appointment from '../models/Appointment.js'

function getRazorpayInstance() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys are not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env')
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

// Consultation fee in paise (Razorpay uses smallest currency unit).
// TODO: make this configurable per treatment/consultation type from the admin panel if needed.
const CONSULTATION_FEE_PAISE = 50000 // ₹500

export async function createOrder(req, res, next) {
  try {
    const { appointmentId } = req.body
    if (!appointmentId) return res.status(400).json({ message: 'appointmentId is required' })

    const appointment = await Appointment.findById(appointmentId)
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' })

    const razorpay = getRazorpayInstance()
    const order = await razorpay.orders.create({
      amount: CONSULTATION_FEE_PAISE,
      currency: 'INR',
      receipt: `appt_${appointment._id}`,
      notes: { appointmentId: String(appointment._id), patientName: appointment.name },
    })

    appointment.razorpayOrderId = order.id
    await appointment.save()

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    next(err)
  }
}

// Called by the frontend (Razorpay checkout success handler) to confirm payment signature.
export async function verifyPayment(req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed - signature mismatch' })
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { paymentStatus: 'paid', razorpayPaymentId: razorpay_payment_id, status: 'confirmed' },
      { new: true }
    )

    res.json({ message: 'Payment verified successfully', appointment })
  } catch (err) {
    next(err)
  }
}

// Razorpay server-to-server webhook (configure this URL in the Razorpay dashboard).
// Handles cases where the browser closes before the frontend can call verifyPayment.
export async function razorpayWebhook(req, res, next) {
  try {
    const signature = req.headers['x-razorpay-signature']
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
      .update(req.rawBody || JSON.stringify(req.body))
      .digest('hex')

    if (signature !== expected) {
      return res.status(400).json({ message: 'Invalid webhook signature' })
    }

    const event = req.body
    if (event.event === 'payment.captured') {
      const orderId = event.payload.payment.entity.order_id
      const paymentId = event.payload.payment.entity.id
      await Appointment.findOneAndUpdate(
        { razorpayOrderId: orderId },
        { paymentStatus: 'paid', razorpayPaymentId: paymentId, status: 'confirmed' }
      )
    }

    res.json({ received: true })
  } catch (err) {
    next(err)
  }
}
