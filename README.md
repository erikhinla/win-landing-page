# WIN Landing Page - BizBuilders AI

Production-ready landing page for the WIN (Workflow Intelligence Network) offering by BizBuilders AI.

## Overview

**WIN** turns existing business tools into an intelligent, learning workflow system through three core pillars: **Organize** (map real workflows), **Optimize** (remove friction and automate), and **Mobilize** (connect tools and turn data into decisions).

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS 4 with custom BizBuilders AI design system
- **Animation**: Framer Motion (minimal, fade/glow only)
- **Form**: HubSpot embedded form
- **Automation**: Activepieces webhook integration
- **Scheduling**: Google Calendar Appointment Schedule
- **Hosting**: Vercel (recommended)

## Design System

The site follows the **BizBuilders AI Design System** with a dark, premium aesthetic inspired by Apple, Tesla, and Boston Dynamics. The color palette includes near-black backgrounds (#0B0B0D, #141417), off-white text (#F5F5F7), muted gray secondary text (#A1A1AA), and warm gold accents (#C9A24D). Typography uses Inter from Google Fonts for clean, modern readability. Motion is subtle with fade-in animations on scroll and smooth scrolling behavior.

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```bash
HUBSPOT_FORM_ID=your_hubspot_form_id
ACTIVEPIECES_WEBHOOK_URL=your_activepieces_webhook_url
GOOGLE_APPOINTMENT_LINK=your_google_calendar_link
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Getting the Required Values:**

- **HubSpot Form ID**: Log into HubSpot → Marketing → Lead Capture → Forms → Copy Form ID from embed code
- **Activepieces Webhook URL**: Log into Activepieces → Create flow with Webhook trigger → Copy webhook URL
- **Google Calendar Link**: Open Google Calendar → Create Appointment Schedule → Copy booking link

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000/win](http://localhost:3000/win)

### 4. Build for Production

```bash
pnpm build
pnpm start
```

## Deployment to Vercel

### Via Vercel CLI

```bash
pnpm add -g vercel
vercel --prod
```

### Via GitHub Integration

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables in Project Settings
4. Deploy automatically on push to main

**Environment Variables in Vercel**: Add `HUBSPOT_FORM_ID`, `ACTIVEPIECES_WEBHOOK_URL`, `GOOGLE_APPOINTMENT_LINK`, and `NEXT_PUBLIC_SITE_URL` in Project Settings → Environment Variables.

## Project Structure

```
win-site/
├── app/
│   ├── api/webhook/route.ts      # Activepieces webhook proxy
│   ├── win/page.tsx              # Main WIN landing page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Root redirect
├── components/
│   ├── Hero.tsx                  # Hero with CTAs
│   ├── Problem.tsx               # Problem statement
│   ├── Solution.tsx              # Three-pillar solution
│   ├── JoinForm.tsx              # HubSpot form
│   └── CTA.tsx                   # Final CTA
├── public/visuals/
│   ├── logo.png                  # BizBuilders AI logo
│   └── icon.png                  # BizBuilders AI icon
└── README.md
```

## Features

The landing page includes a hero section with dual CTAs, a problem section highlighting tool sprawl and lack of intelligence, a solution section explaining the three-pillar WIN framework, an embedded HubSpot form with Activepieces webhook integration, and a final call-to-action. The form automatically forwards submissions to Activepieces and displays a success state with a booking link.

## Integration Details

### HubSpot Form

The form loads dynamically and on submission sends data to `/api/webhook`, which forwards it to Activepieces with source, timestamp, and form data.

### Activepieces Webhook

Receives JSON payload:
```json
{
  "source": "WIN Landing Page",
  "timestamp": "2026-01-20T10:00:00.000Z",
  "formData": { /* HubSpot fields */ }
}
```

Use this to log submissions, send notifications, update CRM, or trigger follow-up sequences.

### Google Calendar

Direct link to appointment scheduling, displayed after form submission.

## Performance Targets

- **Lighthouse Score**: >90
- **Load Time**: <2s
- **Mobile-responsive**: Fully optimized
- **Accessibility**: WCAG 2.1 AA compliant

## Testing Checklist

- [ ] Hero section loads with correct branding
- [ ] All CTAs scroll/link correctly
- [ ] HubSpot form loads and submits successfully
- [ ] Activepieces webhook receives payload
- [ ] Google Calendar link opens correctly
- [ ] Mobile responsive on all screen sizes
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Lighthouse score >90

## Troubleshooting

**HubSpot Form Not Loading**: Verify `HUBSPOT_FORM_ID`, check browser console, ensure form is published.

**Webhook Not Firing**: Verify `ACTIVEPIECES_WEBHOOK_URL`, check Activepieces flow is active, review server logs.

**Build Errors**: Clear `.next` folder, reinstall dependencies, check TypeScript errors with `pnpm run check`.

## License

Proprietary - BizBuilders AI © 2026
