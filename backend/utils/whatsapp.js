// Thin wrapper around the AiSensy WhatsApp API.
// You'll need an AiSensy account and API key: https://aisensy.com
// Docs: https://docs.aisensy.com (check "Send Session Message" / interactive message endpoints)
//
// AiSensy's exact payload shape can vary by plan (Campaign API vs Live/Session API).
// This wrapper targets their Session Messaging API for free-form replies within
// the 24-hour customer service window, which is what a booking bot needs.
// Adjust `AISENSY_API_URL` and payload shape if your AiSensy plan differs -
// check the API reference in your AiSensy dashboard for the exact current spec.

const AISENSY_API_URL = 'https://backend.aisensy.com/campaign/t1/api/v2'

async function callAiSensy(payload) {
  if (!process.env.AISENSY_API_KEY) {
    console.warn('AISENSY_API_KEY not set - WhatsApp message not sent. Payload was:', JSON.stringify(payload))
    return { skipped: true }
  }
  const res = await fetch(AISENSY_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.AISENSY_API_KEY, ...payload }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`AiSensy API error (${res.status}): ${text}`)
  }
  return res.json()
}

/** Send a plain text WhatsApp message to a phone number (with country code, no +). */
export async function sendText(phone, message) {
  return callAiSensy({
    destination: phone,
    userName: 'Vijaya Clinics',
    campaignName: 'booking_bot_reply',
    templateParams: [],
    // NOTE: check your AiSensy dashboard for whether free-text replies need a
    // different endpoint/shape than template campaigns - update here if so.
    message,
  })
}

/**
 * Send a list of quick-reply style options. WhatsApp itself supports
 * "interactive list" and "button" message types (max 3 buttons, or up to
 * 10 items in a list) - AiSensy exposes these as "interactive" message types.
 * If your AiSensy plan doesn't support interactive messages, fall back to
 * sending numbered plain text options instead (see sendNumberedOptions below).
 */
export async function sendNumberedOptions(phone, header, options) {
  const numbered = options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')
  return sendText(phone, `${header}\n\n${numbered}\n\nReply with the number of your choice.`)
}
