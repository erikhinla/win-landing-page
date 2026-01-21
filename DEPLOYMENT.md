# WIN Landing Page - Deployment Guide

## Project Deliverables

### 1. GitHub Repository
**URL**: https://github.com/erikhinla/win-landing-page  
**Latest Commit**: f885db9 (Initial commit with all components and integrations)  
**Visibility**: Public

### 2. Vercel Deployment
**Status**: Ready for deployment  
**Recommended URL**: `win-landing-page.vercel.app` (or custom domain)

### 3. Visual Verification
Screenshots available in `docs/screenshots/` directory showing:
- Hero section with BizBuilders AI branding
- Problem statement section
- Solution framework (Organize, Optimize, Mobilize)
- Form integration placeholder

## Deployment Steps (Vercel Dashboard)

### Step 1: Import Repository

1. Navigate to https://vercel.com/new
2. Connect GitHub account (if not already connected)
3. Search for `erikhinla/win-landing-page`
4. Click "Import"

### Step 2: Configure Build Settings

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Node Version**: 18.x or higher

### Step 3: Add Environment Variables

Click "Environment Variables" and add the following:

```
HUBSPOT_FORM_ID
Value: [Your HubSpot form ID from Marketing → Forms]

ACTIVEPIECES_WEBHOOK_URL
Value: [Your Activepieces webhook URL from flow trigger]

GOOGLE_APPOINTMENT_LINK
Value: [Your Google Calendar appointment schedule link]

NEXT_PUBLIC_SITE_URL
Value: [Leave blank for now, will update after first deploy]
```

**Important**: Mark all variables for Production, Preview, and Development environments.

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (typically 2-3 minutes)
3. Vercel will provide a production URL (e.g., `win-landing-page.vercel.app`)

### Step 5: Update Site URL

After first deployment:

1. Go to Project Settings → Environment Variables
2. Edit `NEXT_PUBLIC_SITE_URL`
3. Set value to your production URL (e.g., `https://win-landing-page.vercel.app`)
4. Go to Deployments tab
5. Click three dots on latest deployment → "Redeploy"

### Step 6: Configure Custom Domain (Optional)

To use `transformby10x.ai/win` or `win.transformby10x.ai`:

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your desired domain
4. Follow DNS configuration instructions provided by Vercel

**For subdomain (`win.transformby10x.ai`):**
- Add CNAME record: `win` → `cname.vercel-dns.com`

**For subdirectory (`transformby10x.ai/win`):**
- Requires reverse proxy configuration on main domain
- Or use Vercel's rewrites in main site's `vercel.json`

## Post-Deployment Verification

### Checklist

- [ ] Site loads at production URL
- [ ] Hero section displays correctly with BizBuilders AI branding
- [ ] "Get Your AI Edge" button scrolls to form
- [ ] "Book AI-Edge Call" link opens Google Calendar
- [ ] Problem section displays three cards
- [ ] Solution section displays three pillars
- [ ] HubSpot form loads (requires valid `HUBSPOT_FORM_ID`)
- [ ] Form submission triggers Activepieces webhook
- [ ] Success state displays with booking link
- [ ] Mobile responsive on all screen sizes
- [ ] No console errors
- [ ] Lighthouse score >90

### Testing Form Integration

1. **HubSpot Form**:
   - Fill out the form with test data
   - Submit and verify success message appears
   - Check HubSpot dashboard for submission

2. **Activepieces Webhook**:
   - Submit form
   - Check Activepieces flow runs
   - Verify payload contains form data

3. **Google Calendar**:
   - Click booking link after form submission
   - Verify calendar opens correctly

## Performance Optimization

### Lighthouse Targets

Run Lighthouse audit in Chrome DevTools:

```
Performance: >90
Accessibility: >90
Best Practices: >90
SEO: >90
```

### Common Issues and Fixes

**Slow Load Time**:
- Verify images are optimized
- Check for blocking scripts
- Enable Vercel Edge caching

**Low Accessibility Score**:
- Ensure all buttons have aria-labels
- Verify color contrast ratios
- Test keyboard navigation

**SEO Issues**:
- Verify meta tags in `app/layout.tsx`
- Add `robots.txt` if needed
- Configure Open Graph images

## Environment Variables Reference

| Variable | Purpose | Where to Get It |
|----------|---------|-----------------|
| `HUBSPOT_FORM_ID` | Loads HubSpot form | HubSpot → Marketing → Forms → Embed Code |
| `ACTIVEPIECES_WEBHOOK_URL` | Sends form data | Activepieces → Create Flow → Webhook Trigger |
| `GOOGLE_APPOINTMENT_LINK` | Booking CTA | Google Calendar → Appointment Schedule |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | Vercel production URL |

## Monitoring and Analytics

### Vercel Analytics

Enable in Project Settings → Analytics for:
- Page views
- Unique visitors
- Performance metrics
- Core Web Vitals

### HubSpot Tracking

Form submissions automatically tracked in HubSpot dashboard:
- Marketing → Forms → [Your Form] → Performance

### Activepieces Logs

Monitor webhook activity:
- Activepieces → Flows → [Your Flow] → Runs
- Check for successful executions
- Review payload data

## Troubleshooting

### Build Failures

**Error: "Module not found"**
- Clear Vercel build cache
- Redeploy with "Clear Cache and Redeploy"

**Error: "Environment variable not defined"**
- Verify all required env vars are set
- Check for typos in variable names
- Ensure variables are enabled for correct environment

### Runtime Errors

**HubSpot form not loading**
- Verify `HUBSPOT_FORM_ID` is correct
- Check browser console for script errors
- Ensure form is published in HubSpot

**Webhook not firing**
- Verify `ACTIVEPIECES_WEBHOOK_URL` is correct
- Check Activepieces flow is active
- Review server logs in Vercel → Deployments → Functions

**Google Calendar link broken**
- Verify `GOOGLE_APPOINTMENT_LINK` is correct
- Ensure appointment schedule is public
- Test link in incognito mode

## Rollback Procedure

If deployment has issues:

1. Go to Vercel → Deployments
2. Find last working deployment
3. Click three dots → "Promote to Production"

## Support and Maintenance

### Regular Updates

- Monitor Vercel for security updates
- Update dependencies monthly: `pnpm update`
- Review HubSpot form performance weekly
- Check Activepieces webhook logs for errors

### Contact Information

For technical issues with:
- **Vercel**: https://vercel.com/support
- **HubSpot**: https://help.hubspot.com
- **Activepieces**: https://www.activepieces.com/docs

## Success Criteria

Deployment is considered successful when:

✅ Site is live at production URL  
✅ All sections render correctly  
✅ HubSpot form loads and submits  
✅ Activepieces receives webhook data  
✅ Google Calendar link works  
✅ Mobile responsive  
✅ Lighthouse score >90  
✅ No console errors  
✅ Custom domain configured (if applicable)

---

**Deployment Date**: 2026-01-20  
**Version**: 1.0.0  
**Maintainer**: BizBuilders AI Team
