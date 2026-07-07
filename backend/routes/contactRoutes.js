import express from 'express'
import { createContactMessage, getContactMessages } from '../controllers/contactController.js'

const router = express.Router()

router.post('/', createContactMessage)
router.get('/', getContactMessages) // TODO: protect with admin auth in phase 2

export default router
