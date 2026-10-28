# Checkpoint

A running record of the changes made to the Monarch Placements site in this working session.
Last updated: 2026-10-27.

## Status of GitHub

Repo: `https://github.com/developermonarchsoftwares-spec/MONARCHPLACEMENTS.git` (branch `main`)

| Commit | What it contains |
| --- | --- |
| `29cdb4a` | Internships and Colleges pages, liquid glass cards, card animations |
| `a6e6478` | IT Staffing page, redesigned domain modal, footer refinements |
| `40c283f` | Vercel-ready storage, IT Staffing typography and service rows, aligned card buttons |

**Not pushed yet** (done after `40c283f`):
- Robot loads immediately on the homepage
- Scroll-reveal animation for all sections below each hero, plus footer reveal and CTA hover lift
- Resolved hydration warning on Footer ("Privacy Policy" & "Terms of Service" buttons) and other interactive modal/toggle buttons caused by browser extension autofill attributes (`fdprocessedid`).
- Responsive design overhaul across Android, iOS, tablets, and mobile screens:
  - Fixed tablet navbar collision between 768px-1024px by switching breakpoint to `lg` and making mobile drawer scrollable (`overflow-y-auto`) so all 9 links and CTA are accessible on all screen heights (e.g. iPhone SE).
  - Scaled hero headline typography on small mobile screens (<380px) to prevent word clipping.
  - Resolved horizontal card clipping in the internships duration carousel by calculating card width relative to available viewport between arrow controls.
  - Adjusted CardSwap scaling for narrow screens (<=380px) to prevent container overflow.
  - Added viewport `viewportFit: cover` metadata in root layout for notch/safe-area support across iPhone and Android devices.
  - Optimized modal padding (`DomainDetailsModal` and `PolicyModal`) for mobile and landscape viewports.
  - Fixed accordion title truncation on mobile to allow full text readability.

## Changes by area

### Navigation (`src/components/Navbar.tsx`)
- Desktop navigation breakpoint shifted from `md` to `lg` (`hidden lg:flex` / `lg:hidden`) to eliminate link collision with logo and CTA button on tablets (768px–1023px, iPad portrait).
- Mobile & tablet drawer is now vertically scrollable (`overflow-y-auto max-h-screen`) with proportional spacing (`gap-3.5 sm:gap-5`, `text-xl sm:text-2xl md:text-3xl`), ensuring all 9 navigation links and the "Enroll Now" button are completely accessible on all device heights (e.g., iPhone SE, landscape phones).
- `suppressHydrationWarning` added to the mobile toggle button.

### Homepage (`src/app/page.tsx`)
- Robot loads immediately in the initial HTML instead of after a 1.5s timer delay.
- Stats cards use responsive padding (`p-4 sm:p-6`) and scalable Counter typography (`text-2xl sm:text-3xl md:text-4xl`) to prevent number and icon clipping on narrow screens (320px–360px).
- `CardSwap` container bounded with `overflow-hidden sm:overflow-visible` and responsive height to prevent overflow on mobile.
- In `src/components/CardSwap.css`, added `@media (max-width: 380px)` scaling (`scale(0.62)`) to ensure the 3D card stack remains bounded within narrow mobile screens.
- Commitments accordion title truncation removed (`truncate` replaced with `text-left break-words`) and inner description padding optimized (`pl-6 sm:pl-14 pr-2 sm:pr-14`) so full titles and text are readable on all mobile displays.
- `suppressHydrationWarning` on accordion trigger buttons.

### Hero Component (`src/components/Hero.tsx`)
- Headline font sizing updated to `text-[30px] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] break-words` to prevent word clipping and awkward line wrapping on 320px–360px mobile viewports.

### Internships page (`src/app/internships/page.tsx`)
- "View" buttons on the five domain cards show only the word, centred; the arrow icon is removed.
- Duration cards use the transparent liquid glass style (`LiquidGlassCard`); carousel and arrows unchanged.
- Duration card width updated to `w-[calc(100vw-5.5rem)] max-w-[394px] sm:w-[385px] md:w-[394px]` so cards fit precisely within the carousel track between the arrow buttons on mobile screens.
- Domain row no longer clips its hover lift (container no longer clips vertically on desktop).
- Domain details modal replaced by the shared `DomainDetailsModal` component (see Components).
- Static "Internship Experience" section: logo left, four items in a vertical timeline right. No scroll animation by request.

### Colleges page (`src/app/college-partnerships/page.tsx`)
- Hero background uses `ShapeGrid`, replaying its intro blink every 2 seconds.

### IT Staffing page (`src/app/it-staffing/`)
- Page, layout (tab title is "Monarch Placements"), and hiring requirement API (`src/app/api/hiring-requirements/route.ts`).
- Collaborative Hiring section is four service rows with large faint numbers, alternating sides (01 and 03 left, 02 and 04 right), stacked on mobile.
- Typography matched to the rest of the site (Inter, existing heading, label and body patterns).
- "Discuss Requirement" buttons pinned to the bottom of each card so they line up.
- `suppressHydrationWarning` added to role buttons and all hiring form controls.

### Training page (`src/app/training/page.tsx`)
- Learning timeline cards formatted with responsive left indentation (`pl-12 sm:pl-16`) and card padding (`p-4 sm:p-6`) to give text proper breathing room on mobile devices without horizontal squeeze.

### Modals (`DomainDetailsModal.tsx`, `PolicyModal.tsx`)
- `DomainDetailsModal`: top padding reduced on mobile to `pt-16 sm:pt-24 pb-4` to fit landscape and compact mobile viewports without vertical clipping; `suppressHydrationWarning` on action and close buttons.
- `PolicyModal`: container and content padding optimized for mobile (`p-3 sm:p-6 md:p-8`, `px-5 py-5 sm:px-8 sm:py-6`); `suppressHydrationWarning` on close and action buttons.

### WhatsApp Widget (`src/components/WhatsAppWidget.tsx`)
- Positioning and dimensions made responsive (`bottom-6 sm:bottom-16 right-4 sm:right-6 w-11 h-11 sm:w-12 sm:h-12`) to prevent obstructing footer content on small screens.

### Root Layout (`src/app/layout.tsx`)
- Added Next.js `viewport` export (`width: 'device-width'`, `initialScale: 1`, `viewportFit: 'cover'`) for notch and safe-area compatibility across iOS and Android devices.

### Footer (`src/components/Footer.tsx`)
- Logo aligned exactly with the navbar logo; description and icons indented to the visible logo mark.
- Five areas: Company, Quick Links, Programs & Services, Contact, and a separate Location column with the map.
- Consistent link spacing and heading line; bottom row clear of the WhatsApp button.
- "View on Google Maps" opens the supplied Monarch Softwares link.
- `suppressHydrationWarning` on Privacy Policy and Terms of Service trigger buttons.

### Site-wide
- **Cards:** all `.glass-card` and `SpotlightCard` cards share a transparent liquid glass style (`src/app/glass.css`). The cursor-following sheen was removed.
- **Card grids:** `RevealGrid` gives staggered entrance and hover lift.
- **Background:** the animated grid, floating dots and cursor glow were simplified; it now has static ambient lights and a light dot canvas.
- **Hydration warnings:** `suppressHydrationWarning` added across all form inputs and interactive buttons (Footer Privacy Policy & Terms buttons, PolicyModal close/action buttons, Navbar mobile toggle, DomainDetailsModal controls, homepage accordion buttons, and form inputs) to protect against browser autofill and extension attribute injection (such as `fdprocessedid`).
- **Homepage robot:** the Spline iframe is in the initial HTML instead of mounting after a 1.5 s timer, so it starts loading with the page.
- **Section animations:** `RevealSection` (in `src/components/Reveal.tsx`) fades each non-hero section up once as it enters view. The footer content is wrapped in `Reveal`. CTA-style uppercase buttons lift 2px on hover (touch and reduced-motion excluded). Heroes and the Internship Experience section are not animated.

### Vercel readiness (`src/lib/storage.ts`, `.gitignore`)
- Vercel's file system is read-only, so a submission now counts as received only if the Web3Forms email is accepted (or, locally, if it was saved to `data/`). On Vercel the JSON files only live in `/tmp`.
- `.gitignore` now ignores `/data` and `.vercel`.
- `next build` passes.

## Components added
- `src/components/LiquidGlassCard.tsx` and `.css`
- `src/components/RevealGrid.tsx`
- `src/components/Reveal.tsx` (`RevealSection`, `Reveal`)
- `src/components/ShapeGrid.jsx` and `.css` (supplied React Bits component, plus an `introInterval` prop)
- `src/components/DomainDetailsModal.tsx`
- `src/components/EditorialInternshipExperience.tsx`
- `src/app/glass.css` (shared glass surface, imported in `layout.tsx`)

## To deploy on Vercel
1. Push to GitHub.
2. Import the repo in Vercel and deploy (defaults work).
3. Add `WEB3FORMS_ACCESS_KEY` under Environment Variables.

## Open items
- The API routes (`/api/internships`, `/api/college-enquiries`, `/api/hiring-requirements`) have an open `GET` that lists every saved submission, including emails and phone numbers. Lock it or remove it before going live.
- Submissions on Vercel are only delivered by email. Add a database if you want a lasting record.
- Two older lint errors (unescaped apostrophes) remain in `src/app/it-staffing/page.tsx`.
- `public/test-trim.png` looks like a test image already pushed to the repo.
- Some files (the footer policy modal, favicons, `scripts/generate-favicons.mjs`) were changed outside these sessions; they are included in pushes as found.
