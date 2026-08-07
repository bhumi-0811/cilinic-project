import express from 'express'
import { handleIncomingMessage } from '../controllers/whatsappController.js'

const router = express.Router()

// Point your AiSensy webhook URL to: https://your-backend-url/api/whatsapp/webhook
router.post('/webhook', handleIncomingMessage)

// Some providers verify the webhook URL with a GET request on setup
router.get('/webhook', (req, res) => res.status(200).send('OK'))

export default router
