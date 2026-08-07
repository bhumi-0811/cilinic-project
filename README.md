# Vijaya Clinics - Website + Admin/Doctor Dashboard

Full-stack clinic website with a single combined Doctor/Admin login and dashboard.

## What's included

### Public website
- Home, About, Doctor Profile, Treatments (list + detail pages), Reviews, FAQ, Contact
- In-Clinic and Tele-Consultation appointment booking (saves to MongoDB)
- Contact form (saves to MongoDB)
- All content below is **live from the database** - edits made in the admin dashboard show up on the public site immediately:
  - Doctor profile (photo, bio, qualifications, specializations, languages)
  - Clinic settings (phone, email, address, opening hours)
  - Treatments (list, categories, detail page content)
- Reviews and FAQ still load from the database too (with safe fallback content if the backend is ever unreachable, so the site never breaks for visitors)
- Fully responsive (tested at 320px–1440px+), fixed floating WhatsApp/Call/Book buttons

### Doctor/Admin Dashboard (`/admin/login`)
Single combined login for the doctor - no separate roles needed.

- **📊 Dashboard** - Total / Today's / Upcoming / Completed / Cancelled appointment counts, recent appointments table
- **📅 Appointment Management** - view all appointments, Accept, Reject, Reschedule (date & time), Mark Complete
- **👤 Patient Details** - tap any appointment to see name, phone, age, gender, concern, date/time, uploaded reports
- **💬 Contact Messages** - view all messages from the Contact Us form, mark as read
- **⭐ Reviews** - approve/reject incoming reviews; only approved reviews show on the public site
- **📝 Website Management** (tabs):
  - Timings & Contact - edit clinic phone, email, address, opening hours
  - Treatments - add/edit/delete treatments and their detail-page content
  - FAQ - add/edit/delete FAQs
  - Gallery - upload/delete clinic photos by category
- **👨‍⚕️ Doctor Profile** - edit photo, qualifications, experience, about section
- **🔒 Settings** - change password, change email, logout

There's a small "Doctor/Admin Login" link in the public site's footer.

## Project structure

```
vijaya-clinics/
├── frontend/     React + Vite + Tailwind + Framer Motion
│   └── src/admin/    Admin dashboard (separate layout, protected routes)
└── backend/      Node.js + Express + MongoDB (Mongoose) + JWT auth
```

## How to run locally

### 1. Backend

```bash
cd backend
cp .env.example .env
```

Open `.env` and set `ADMIN_EMAIL` / `ADMIN_PASSWORD` to whatever you want your login to be (defaults shown below if you skip this).

```bash
npm install
npm run seed      # creates the admin login, doctor profile, settings, 32 treatments, sample FAQs/reviews
npm run dev        # starts on http://localhost:5000
```

Make sure MongoDB is running locally at `mongodb://127.0.0.1:27017` (or update `MONGO_URI` in `.env` to point to MongoDB Atlas).

The seed script prints your admin login to the terminal the first time it runs:
```
Admin login created:
  Email: amitsnikam@gmail.com
  Password: changeme123
  (Change this password after first login - Settings page in the admin dashboard)
```

**⚠️ Change this password immediately after your first login**, using the Settings page in the dashboard.

### 2. Frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm run dev        # starts on http://localhost:5173
```

Visit `http://localhost:5173` for the public site, or `http://localhost:5173/admin/login` for the dashboard.

## API endpoints

Public (no login needed):
| Method | Endpoint |
|---|---|
| GET | `/api/health` |
| POST | `/api/appointments` - book appointment |
| POST | `/api/contact` - send contact message |
| POST | `/api/reviews` - submit a review (pending approval) |
| GET | `/api/reviews` - approved reviews only |
| GET | `/api/faqs` |
| GET | `/api/doctor` |
| GET | `/api/settings` |
| GET | `/api/treatments` , `/api/treatments/:slug` |
| GET | `/api/gallery` |
| POST | `/api/auth/login` |

Protected (require `Authorization: Bearer <token>` from login):
| Method | Endpoint |
|---|---|
| GET | `/api/auth/me` |
| PATCH | `/api/auth/change-password`, `/api/auth/change-email` |
| GET | `/api/dashboard/stats` |
| GET/PATCH/DELETE | `/api/appointments`, `/:id/status`, `/:id/reschedule` |
| GET | `/api/contact` (all messages) |
| PATCH | `/api/contact/:id/read` |
| GET | `/api/reviews/all` |
| PATCH | `/api/reviews/:id/approve` |
| POST/PUT/DELETE | `/api/faqs` |
| POST/PUT/DELETE | `/api/treatments` |
| PUT | `/api/doctor` (multipart, field `photo`) |
| PUT | `/api/settings` |
| POST/DELETE | `/api/gallery` (multipart, field `image`) |

## Notes

- Uploaded files are saved under `backend/uploads/` (`reports/`, `doctor/`, `gallery/`) and served at `/uploads/...`.
- JWT tokens are valid for 7 days; the dashboard will redirect to login automatically if the token expires.
- Only one admin/doctor account is supported by design (as requested) - there's no multi-user role system.
- Not included yet: patient/tele-consultation payment integration, e-prescription PDFs, WhatsApp/SMS reminders, multi-language support.

## WhatsApp Booking + Online Payment (New)

### What's included
- **Availability engine** - set the doctor's weekly schedule (per day, multiple time windows), slot duration, and how many patients can book the same slot. Manage it from **Admin → Availability**. Blocked dates (holidays/leave) are supported too.
- **WhatsApp booking bot** - a patient messages your WhatsApp number, the bot shows available days → time slots → collects name/age/gender/concern → asks payment preference → books the appointment (visible in the same Admin → Appointments page as website bookings, tagged with source "whatsapp").
- **Razorpay payment** - "Pay Online" generates a Razorpay Payment Link sent right in WhatsApp; "Pay at visit" skips payment and books directly.

### What YOU need to set up (I can't create these for you - they require your business KYC)
1. **AiSensy account** ([aisensy.com](https://aisensy.com)) with a verified WhatsApp Business number. Get your API key from the dashboard.
2. **Razorpay account** ([razorpay.com](https://razorpay.com)) with KYC completed. Get your Key ID + Key Secret from Settings → API Keys, and set up a webhook (Settings → Webhooks) pointing to `https://your-backend-url/api/payments/webhook` with the `payment.captured` event enabled - copy the webhook secret it gives you.

### Configure
Add these to `backend/.env` (also in `.env.example`):
```
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
AISENSY_API_KEY=your_aisensy_api_key
```

In your AiSensy dashboard, set the incoming message webhook URL to:
```
https://your-backend-url/api/whatsapp/webhook
```

### Important - please read before going live
- **`backend/utils/whatsapp.js`** sends messages via AiSensy's API. I wrote it based on AiSensy's general API pattern, but their exact endpoint/payload can vary by plan. Once your AiSensy account is active, send yourself a test message from their dashboard's API tester, compare it to this file, and adjust if needed.
- **`backend/controllers/whatsappController.js` → `extractIncoming()`** reads the incoming webhook payload from AiSensy. I've guessed common field names (`phone`, `text`, etc.) but AiSensy's real payload may use different field names. **Log `req.body` from a real incoming message first** (temporarily add `console.log(JSON.stringify(req.body))` at the top of `handleIncomingMessage`), send yourself a test WhatsApp message, check the Render logs, then update `extractIncoming()` to match exactly.
- The consultation fee is currently hardcoded at ₹500 in both `paymentController.js` and `whatsappController.js` (search for `CONSULTATION_FEE_PAISE` / `amount: 50000`) - change this to your real price, or let me know if you want it configurable from the admin panel instead.
- This bot currently only books **in-clinic** appointments (not tele-consultations) to keep the flow simple - can extend it if you need WhatsApp booking for video consults too.
