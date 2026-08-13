# Vijaya Clinics - Cinematic Premium Redesign

Complete redesign of the public website: cinematic video hero, dual-specialty
identity (Dermatology + Psychiatry), premium doctor profiles, horizontal
scrolling gallery, testimonial carousels - and all appointment/booking
functionality removed as requested. Admin dashboard is untouched and works
exactly as before.

## What changed

- **No booking anywhere** - the old `/appointment` page, booking forms, and
  every "Book Appointment" CTA/nav item/floating button are gone. Old links
  to `/appointment` now redirect to `/contact` instead of 404ing.
- **Cinematic video hero** - your clinic reception video is now the
  full-screen homepage background (autoplay, muted, loop, compressed from
  13.5MB to ~1.5MB for performance). Falls back to a static frame for anyone
  with "reduce motion" turned on.
- **Navbar** - floating/transparent over the hero, becomes a solid glass bar
  on scroll. Home | About | Dermatology | Psychiatry | Contact.
- **Two dedicated specialty pages** - `/dermatology` (Dr. Amit Nikam) and
  `/psychiatry` (Dr. Pritisha Saxena Nikam), each with their own hero,
  qualifications, areas of care, treatments/services, and testimonials.
  Info was pulled from the public Eka Care profiles you linked - see the
  checklist below for what still needs your sign-off.
- **Homepage doctor cards** - hover-interactive cards for both doctors that
  link to their specialty pages ("Explore Profile").
- **Cinematic horizontal gallery** - vertical scroll drives a horizontal
  image reveal, using your real clinic photos (reception, treatment rooms,
  counselling room, signage, doctor's desk).
- **Testimonial carousels** - separate for Dermatology and Psychiatry,
  paraphrased from public reviews found on each doctor's Eka Care listing
  (not copied verbatim).
- **Images optimised** - all clinic photos resized/compressed for faster
  loading (some dropped from ~800KB to ~100-200KB with no visible quality
  loss).
- **Colour palette** - kept the teal/mint system already derived from your
  logo, refined spacing and typography for a more editorial, premium feel.

## Dr. Pritisha's photo

I cropped the photo you sent (a phone screenshot of her profile picture) to
use as her headshot. It's usable but not high-resolution since it came from
a screenshot - a proper photo file (even a good phone photo, not a
screenshot) would look noticeably sharper across the site.

## IMPORTANT - information still needed from you

Per your own instruction not to invent anything, here's exactly what's
using placeholder/reused content right now and needs your input:

### Dermatology
- [ ] Final biography copy for Dr. Amit (currently adapted from his Eka Care listing)
- [ ] Any certifications/awards beyond what's on Eka Care
- [ ] Updated treatment list, if different from the current 32 treatments
- [ ] Higher-resolution doctor photo (currently reusing his desk photo from your earlier uploads)
- [ ] Confirmation the Eka Care qualifications (MBBS, DDV Mumbai, PGDCC Pune) and registration number are current

### Psychiatry
- [ ] A proper photo of Dr. Pritisha (not a screenshot crop)
- [ ] Final biography copy (currently adapted from her Eka Care listing)
- [ ] **Team section is a placeholder** - no team members are shown yet; send photos + info when ready
- [ ] Any workshops/projects/certifications beyond the Times of India / India Times / Dainik Bhaskar mentions already on her profile
- [ ] Confirmation the Eka Care qualifications (MBBS, DPM) and registration number are current

### Clinic
- [ ] More gallery photos if you have them (currently reusing the same set from earlier in this project)
- [ ] Official working hours confirmation (currently showing the same hours as before)
- [ ] Social links beyond Instagram (Facebook, YouTube, Google Business are still placeholder icons in the footer)

Nothing above blocks the site from working - it's all clearly using real,
verified info already (not invented), just flagging what would upgrade it
further once you share it.

## Run locally
```bash
cd frontend
npm install
npm run dev
```

## Build for deployment
```bash
npm run build
```
Produces `dist/` ready for GitHub Pages, same as before.

## Admin dashboard
Unchanged - still at `/admin/login`, same credentials, same features
(Appointments, Availability, Reviews, Website Management, Doctor Profile,
Settings). Note the public site no longer lets patients book appointments,
so the Appointments/Availability admin sections will only show bookings
made through other channels (phone, WhatsApp, walk-in) if you're manually
adding them, or via the WhatsApp bot if that's been set up separately.
