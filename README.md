# Vijaya Clinics — Website (Phase 1)

Fresh, clean rebuild of the Vijaya Clinics website — public site + working appointment system.
This is a fresh codebase (not the previous debugged one), designed to run without import errors.

## What's included (Phase 1)

- **Public website**: Home, About, Doctor Profile, Treatments (32 treatments across 4 categories), Treatment Detail pages, Gallery (real clinic photos), Reviews, FAQ, Contact
- **Two working appointment forms**: In-Clinic booking and Tele-Consultation booking, both save to MongoDB
- **Contact form**: saves messages to MongoDB
- **Reviews**: fetched from backend if available, falls back to sample reviews if backend is off (so the site never breaks in the browser)
- **FAQ**: searchable, filterable accordion
- Floating WhatsApp / Call / Book Now / Scroll-to-top buttons
- Fully responsive, glassmorphism cards, smooth Framer Motion animations, animated stat counters
- Colors and branding pulled directly from your logo (deep teal + aqua/mint)

## Not included yet (Phase 2 — tell me when you're ready)

- Admin dashboard (login + manage appointments/reviews/FAQs/gallery)
- Doctor portal
- Payment integration, e-prescription PDFs, WhatsApp/SMS reminders, multi-language

## Project structure

```
vijaya-clinics/
├── frontend/     React + Vite + Tailwind + Framer Motion
└── backend/      Node.js + Express + MongoDB (Mongoose)
```

## How to run locally

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed     # loads sample FAQs and reviews into MongoDB
npm run dev      # starts on http://localhost:5000
```

Make sure MongoDB is running locally at `mongodb://127.0.0.1:27017` (or update `MONGO_URI` in `.env` to point to MongoDB Atlas).

### 2. Frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm run dev       # starts on http://localhost:5173
```

Visit `http://localhost:5173`. The frontend proxies `/api` calls to the backend automatically (see `vite.config.js`).

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/appointments` | Create appointment (in-clinic or tele-consultation) |
| GET | `/api/appointments` | List appointments |
| PATCH | `/api/appointments/:id/status` | Update appointment status |
| DELETE | `/api/appointments/:id` | Delete appointment |
| POST | `/api/contact` | Submit contact message |
| GET | `/api/contact` | List contact messages |
| POST | `/api/reviews` | Submit a review (pending approval) |
| GET | `/api/reviews` | List approved reviews (public) |
| GET | `/api/reviews/all` | List all reviews (for future admin use) |
| PATCH | `/api/reviews/:id/approve` | Approve/reject a review |
| GET | `/api/faqs` | List FAQs |
| POST/PUT/DELETE | `/api/faqs` | Manage FAQs |

Routes marked "for future admin use" currently have **no auth** — they'll be protected once the admin portal (Phase 2) is built. Don't expose this backend publicly as-is.

## Notes

- Uploaded reports are saved to `backend/uploads/reports/` and served at `/uploads/reports/<filename>`.
- All clinic content (phone, address, hours, treatment list) lives in one place: `frontend/src/utils/clinicData.js` — edit this file to update text across the whole site instead of hunting through pages.
