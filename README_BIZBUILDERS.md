# BizBuilders AI - Revenue-First Landing Page

A production-ready Next.js application for BizBuilders AI that generates custom Edge Blueprints using OpenAI and integrates with Activepieces for workflow automation.

## Overview

BizBuilders AI v1 is a **Workflow Intelligence layer** that orchestrates existing business tools (HubSpot, Drive, Slack, Linear, etc.) into an intelligent workflow. This landing page captures leads, generates custom Edge Blueprints, and automates delivery through Activepieces.

## Features

### Landing Page (`/bizbuilders`)
- **Hero Section**: "Automation is everywhere. Intelligence is rare."
- **Edge Blueprint Offer**: Clear value proposition with deliverables showcase
- **Onboarding Form**: Lightweight lead capture (no authentication required)
- **BizBuilders AI Design System**: Dark premium aesthetic with gold accents

### Edge Blueprint Generation
- **OpenAI Integration**: Auto-generates custom blueprints based on form inputs
- **Deliverables Package**:
  - Workflow Map (current state → intelligent state)
  - Automation Plan (3-5 high-impact workflows)
  - Implementation Backlog (Linear-ready issues)
  - Working Automation (Activepieces workflow)
  - Brand-Safe Copy Pack (optional add-on)

### Automation Integration
- **Activepieces Webhook**: Sends blueprint data for processing
- **Google Drive**: Creates client folders automatically
- **Linear**: Generates project and implementation issues
- **Slack**: Notifies sales team of new submissions

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4 with custom design system
- **Animations**: Framer Motion
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel-ready

## Project Structure

```
/app
  /bizbuilders
    page.tsx                    # Main landing page
    /thank-you
      page.tsx                  # Post-submission thank you page
  /api
    /generate-blueprint
      route.ts                  # OpenAI blueprint generation + webhook
  /win                          # WIN landing page (separate route)
    page.tsx
  layout.tsx                    # Root layout
  globals.css                   # Global styles

/components
  /bizbuilders
    Hero.tsx                    # Hero section
    Offer.tsx                   # Edge Blueprint deliverables showcase
    OnboardingForm.tsx          # Lead capture form
  /win                          # WIN page components
    ...

/public
  /visuals
    BBAIlogo1.2.26.png         # BizBuilders AI logo
    BBAIIcon.png               # BizBuilders AI icon

ACTIVEPIECES_SETUP.md          # Complete Activepieces integration guide
```

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```bash
# OpenAI API Key (required for blueprint generation)
OPENAI_API_KEY=sk-...

# Activepieces Webhook URL (required for automation)
ACTIVEPIECES_WEBHOOK_URL=https://cloud.activepieces.com/api/v1/webhooks/YOUR_WEBHOOK_ID

# Google Calendar Booking Link
GOOGLE_APPOINTMENT_LINK=https://calendar.google.com/...
NEXT_PUBLIC_GOOGLE_APPOINTMENT_LINK=https://calendar.google.com/...

# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://bizbuilders.ai
```

### 3. Run Development Server

```bash
pnpm run dev
```

Visit http://localhost:3000/bizbuilders

### 4. Build for Production

```bash
pnpm run build
pnpm start
```

## Activepieces Integration

See [ACTIVEPIECES_SETUP.md](./ACTIVEPIECES_SETUP.md) for complete integration instructions.

**Quick Summary:**
1. Create webhook trigger in Activepieces
2. Add webhook URL to `.env.local`
3. Configure actions:
   - Create Google Drive folder
   - Upload blueprint markdown file
   - Create Linear project and issues
   - Send Slack notification
   - Email blueprint to user

## Deployment

### Deploy to Vercel

1. **Push to GitHub**:
```bash
git add .
git commit -m "BizBuilders AI v1 complete"
git push origin main
```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Select your repository
   - Add environment variables
   - Deploy

3. **Configure Custom Domain**:
   - Primary: `bizbuilders.ai`
   - Fallback: `transformby10x.ai/bizbuilders`

### Environment Variables in Vercel

Add all variables from `.env.local` to Vercel project settings:
- `OPENAI_API_KEY`
- `ACTIVEPIECES_WEBHOOK_URL`
- `GOOGLE_APPOINTMENT_LINK`
- `NEXT_PUBLIC_GOOGLE_APPOINTMENT_LINK`
- `NEXT_PUBLIC_SITE_URL`

## User Flow

1. **Landing Page** (`/bizbuilders`)
   - User views Edge Blueprint offer
   - Clicks "Get Your Edge Blueprint"
   - Scrolls to onboarding form

2. **Form Submission**
   - User fills out business details
   - Submits form
   - OpenAI generates custom blueprint (server-side)
   - Webhook sends data to Activepieces

3. **Thank You Page** (`/bizbuilders/thank-you`)
   - Confirmation message
   - Booking link for strategy call
   - Email notification promise

4. **Automation** (Activepieces)
   - Drive folder created
   - Linear project and issues generated
   - Slack notification sent
   - Email with blueprint delivered

## Design System

### Colors
- **Primary Background**: `#0B0B0D` (near-black)
- **Secondary Background**: `#141417` (section separation)
- **Primary Text**: `#F5F5F7` (off-white)
- **Secondary Text**: `#A1A1AA` (muted gray)
- **Accent Gold**: `#C9A24D` (warm metallic)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large scale
- **Body**: Regular, high readability

### Brand Assets
- Logo: `/public/visuals/BBAIlogo1.2.26.png`
- Icon: `/public/visuals/BBAIIcon.png`

## API Routes

### POST `/api/generate-blueprint`

Generates Edge Blueprint using OpenAI and sends to Activepieces webhook.

**Request Body:**
```json
{
  "businessName": "Acme Corp",
  "industry": "Technology/SaaS",
  "offerType": "B2B SaaS platform",
  "primaryGoal": "Increase qualified leads by 30%",
  "currentTools": ["HubSpot", "Slack", "Linear"],
  "email": "founder@acmecorp.com"
}
```

**Response:**
```json
{
  "success": true,
  "submissionId": "abc123xyz789",
  "message": "Edge Blueprint generated successfully"
}
```

## Testing

### Test Form Submission

1. Fill out the onboarding form with test data
2. Submit form
3. Check:
   - Thank you page displays with submission ID
   - Activepieces flow executes
   - Drive folder created
   - Linear issues generated
   - Slack notification received
   - Email delivered

### Test OpenAI Generation

Monitor OpenAI API usage in your dashboard to verify blueprint generation is working correctly.

## Troubleshooting

### Build Errors

If you encounter build errors related to React context:
- Ensure all client components use `"use client"` directive
- Check that layout.tsx doesn't have manual `<head>` tags
- Verify all dependencies are installed

### Webhook Not Receiving Data

- Verify `ACTIVEPIECES_WEBHOOK_URL` is correct
- Check Activepieces flow is active
- Review Next.js API route logs

### OpenAI Errors

- Verify `OPENAI_API_KEY` is valid
- Check API quota and usage limits
- Review prompt in `/app/api/generate-blueprint/route.ts`

## Roadmap (v2)

**Not in v1 scope:**
- User authentication
- White-labeled dashboards
- Persistent app workspace
- AI employee agents UI
- Tool replacement features

**v2 Enhancements:**
- User accounts and saved workspaces
- Real-time blueprint generation progress
- Interactive workflow builder
- Client portal for deliverables
- Subscription billing integration

## Support

For questions or issues:
- Review [ACTIVEPIECES_SETUP.md](./ACTIVEPIECES_SETUP.md)
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) (if exists)
- Contact BizBuilders AI team

---

**Built with precision. Deployed with confidence.**
