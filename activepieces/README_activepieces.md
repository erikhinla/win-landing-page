# Activepieces Workflows - BizBuilders AI

This directory contains production-ready Activepieces workflow configurations for the BizBuilders AI Edge Blueprint automation system.

---

## 📋 Workflows Overview

### Flow A: Edge Blueprint Intake (`flowA_edge_intake.json`)

**Trigger:** Webhook (form submission from `/api/generate-blueprint`)

**Purpose:** Process Edge Blueprint submissions, create deliverables, and notify the team.

**Actions:**
1. Extract and validate submission data
2. Check for duplicate submissions (idempotent using `submissionId`)
3. Create Google Drive folder: `WIN_Leads/{BusinessName}/{submissionId}`
4. Upload Edge Blueprint markdown file to Drive
5. Create Linear project with business context
6. Parse blueprint and create Linear issues from Implementation Backlog
7. Send Slack notification to #sales channel
8. Send Edge Blueprint email to client

**Idempotency:** Uses `submissionId` to prevent duplicate processing. Skips if already processed.

---

### Flow B: Google Calendar Booking Follow-up (`flowB_gcal_booked.json`)

**Trigger:** New Google Calendar event created

**Purpose:** Automate follow-up actions when a strategy call is booked.

**Actions:**
1. Extract event details (attendee, time, submission ID if present)
2. Check for duplicate bookings (idempotent using `eventId`)
3. Find related Linear project (if submission ID available)
4. Add calendar event comment to Linear project
5. Send Slack notification to #sales channel
6. Send booking confirmation email to client

**Idempotency:** Uses `eventId` to prevent duplicate processing. Skips if already processed.

---

## 🚀 Import Instructions

### Prerequisites

Before importing, ensure you have:

1. **Activepieces Account** (Cloud or Self-hosted)
2. **Connected Integrations:**
   - Google Drive (OAuth)
   - Linear (API Key)
   - Slack (OAuth or Webhook)
   - Gmail (OAuth)
   - Google Calendar (OAuth) - for Flow B only

### Step 1: Configure Environment Variables

In Activepieces, go to **Settings → Environment Variables** and add:

```bash
# Linear Configuration
LINEAR_TEAM_ID=your-linear-team-id

# Slack Configuration
SLACK_SALES_CHANNEL=#sales

# Google Calendar Configuration (Flow B only)
GOOGLE_CALENDAR_ID=primary

# Google Appointment Link (for emails)
GOOGLE_APPOINTMENT_LINK=https://calendar.google.com/calendar/appointments/...
```

**How to find your Linear Team ID:**
1. Go to Linear → Settings → API
2. Create a new API key
3. Use GraphQL Explorer: `query { teams { nodes { id name } } }`
4. Copy the team ID you want to use

**How to find your Slack Channel:**
1. Open Slack → Right-click channel → View channel details
2. Copy channel name (e.g., `#sales`) or channel ID

---

### Step 2: Import Flow A (Edge Blueprint Intake)

1. Go to Activepieces → **Flows** → **Import Flow**
2. Upload `flowA_edge_intake.json`
3. Click **Import**
4. Configure connections:
   - **Google Drive:** Connect your Google account
   - **Linear:** Add your Linear API key
   - **Slack:** Connect your Slack workspace
   - **Gmail:** Connect your Gmail account
5. **Enable the flow**
6. Copy the **Webhook URL** from the trigger

---

### Step 3: Update Next.js Environment Variables

Add the webhook URL to your `.env.local`:

```bash
ACTIVEPIECES_WEBHOOK_URL=https://cloud.activepieces.com/api/v1/webhooks/YOUR_WEBHOOK_ID
```

Redeploy your Next.js application to Vercel.

---

### Step 4: Import Flow B (Calendar Booking Follow-up)

1. Go to Activepieces → **Flows** → **Import Flow**
2. Upload `flowB_gcal_booked.json`
3. Click **Import**
4. Configure connections:
   - **Google Calendar:** Connect your Google account
   - **Linear:** Use the same Linear API key from Flow A
   - **Slack:** Use the same Slack connection from Flow A
   - **Gmail:** Use the same Gmail connection from Flow A
5. Configure the trigger:
   - Select your Google Calendar
   - Choose event types: `created`
6. **Enable the flow**

---

## 🧪 Testing

### Test Flow A: Edge Blueprint Intake

Use this test payload to simulate a form submission:

```json
{
  "submissionId": "test-12345-abc",
  "timestamp": "2026-01-22T12:00:00Z",
  "businessInfo": {
    "businessName": "Test Business Inc",
    "email": "test@example.com",
    "industry": "Technology",
    "offerType": "SaaS Platform",
    "primaryGoal": "Automate customer onboarding and reduce manual data entry by 80% in 90 days",
    "currentTools": ["HubSpot", "Slack", "Google Drive", "Linear"]
  },
  "blueprint": "# EDGE BLUEPRINT: Test Business Inc\n\n## Executive Summary\n\nThis Edge Blueprint transforms Test Business Inc's existing tools into an intelligent workflow system.\n\n## Current State Analysis\n\n**Tools in Use:** HubSpot, Slack, Google Drive, Linear\n\n**Pain Points:**\n- Manual data entry between systems\n- No automated customer onboarding\n- Disconnected tools requiring context switching\n\n## Workflow Map\n\n### Current State\n```\nLead Form → Manual HubSpot Entry → Manual Slack Notification → Manual Drive Folder Creation → Manual Linear Task\n```\n\n### Intelligent State\n```\nLead Form → HubSpot (auto) → Slack (auto) → Drive (auto) → Linear (auto) → Email (auto)\n```\n\n## Automation Plan\n\n### Automation 1: Lead Intake & Qualification (High Priority)\n**Trigger:** New HubSpot contact created\n**Actions:**\n- Create Google Drive folder: `/Clients/{Company Name}`\n- Create Linear project with onboarding checklist\n- Send Slack notification to #sales\n- Send welcome email sequence\n\n### Automation 2: Customer Onboarding (High Priority)\n**Trigger:** Deal stage changed to \"Closed Won\"\n**Actions:**\n- Create onboarding project in Linear\n- Generate onboarding document in Drive\n- Schedule kickoff call via Google Calendar\n- Send onboarding email with next steps\n\n### Automation 3: Support Ticket Routing (Medium Priority)\n**Trigger:** New email to support@testbusiness.com\n**Actions:**\n- Create Linear issue with email content\n- Assign to support team based on keywords\n- Send auto-reply with ticket number\n- Post to #support Slack channel\n\n## Implementation Backlog\n\n### Task 1: Setup Activepieces Workspace (High Priority)\n**Description:** Create Activepieces account and connect all tools (HubSpot, Slack, Drive, Linear, Gmail).\n**Estimated Time:** 2 hours\n**Dependencies:** None\n\n### Task 2: Build Lead Intake Automation (High Priority)\n**Description:** Create the lead intake workflow that triggers on new HubSpot contacts.\n**Estimated Time:** 4 hours\n**Dependencies:** Task 1\n\n### Task 3: Build Customer Onboarding Automation (High Priority)\n**Description:** Create the customer onboarding workflow that triggers on deal stage changes.\n**Estimated Time:** 6 hours\n**Dependencies:** Task 1, Task 2\n\n### Task 4: Build Support Ticket Routing (Medium Priority)\n**Description:** Create the support ticket automation that processes incoming emails.\n**Estimated Time:** 4 hours\n**Dependencies:** Task 1\n\n### Task 5: Test All Workflows End-to-End (High Priority)\n**Description:** Test each automation with real data and verify all integrations work correctly.\n**Estimated Time:** 3 hours\n**Dependencies:** Task 2, Task 3, Task 4\n\n## Working Automation Spec\n\n### Automation: Lead Intake & Qualification\n\n**Platform:** Activepieces\n\n**Trigger:**\n- Type: HubSpot - New Contact\n- Filter: Contact property \"Lead Source\" is not empty\n\n**Actions:**\n1. **Google Drive - Create Folder**\n   - Parent Folder: \"Clients\"\n   - Folder Name: `{{contact.company}}_{{contact.email}}`\n\n2. **Linear - Create Project**\n   - Team: Sales\n   - Name: `{{contact.company}} - Onboarding`\n   - Description: Lead source: {{contact.leadSource}}\n\n3. **Linear - Create Issue**\n   - Project: (from step 2)\n   - Title: \"Qualify lead: {{contact.company}}\"\n   - Priority: High\n\n4. **Slack - Send Message**\n   - Channel: #sales\n   - Message: \"🎯 New lead: {{contact.company}} ({{contact.email}}) - Source: {{contact.leadSource}}\"\n\n5. **Gmail - Send Email**\n   - To: {{contact.email}}\n   - Subject: \"Welcome to Test Business Inc\"\n   - Body: (Welcome email template)\n\n**Error Handling:**\n- Retry failed actions 3 times with exponential backoff\n- Send Slack alert to #ops if automation fails\n\n## Brand-Safe Copy Pack\n\n### Welcome Email Sequence\n\n**Email 1: Welcome (Immediate)**\nSubject: Welcome to Test Business Inc\n\nHi {{firstName}},\n\nWelcome! We're excited to help you automate your workflows and scale your operations.\n\nHere's what happens next:\n1. Our team will review your use case\n2. We'll schedule a strategy call within 24 hours\n3. You'll receive a custom implementation plan\n\nQuestions? Just reply to this email.\n\nBest,\nThe Test Business Team\n\n**Email 2: Strategy Call Reminder (Day 1)**\nSubject: Your strategy call is confirmed\n\n(Booking confirmation email)\n\n**Email 3: Pre-Call Prep (Day 2)**\nSubject: Preparing for your strategy call\n\n(Pre-call checklist and questions)\n\n### Landing Page Copy\n\n**Hero Headline:** Automate Your Workflow. Scale Your Business.\n\n**Subheadline:** Test Business Inc transforms your existing tools into an intelligent system that works for you.\n\n**CTA:** Get Your Custom Automation Plan\n\n---\n\n*This Edge Blueprint was generated by BizBuilders AI based on your business context.*"
}
```

**How to test:**

1. Go to Activepieces → Flow A → **Test**
2. Paste the test payload
3. Click **Run Test**
4. Verify:
   - Drive folder created
   - Linear project and issues created
   - Slack notification sent
   - Email delivered

**Expected Result:**
- ✅ Drive folder: `WIN_Leads/Test_Business_Inc/test-12345-abc`
- ✅ Linear project: "Test Business Inc - Edge Blueprint Implementation"
- ✅ Linear issues: 5 tasks from Implementation Backlog
- ✅ Slack message in #sales channel
- ✅ Email sent to test@example.com

---

### Test Flow B: Calendar Booking Follow-up

**How to test:**

1. Book a test event in your Google Calendar
2. In the event description, add:
   ```
   Business: Test Business Inc
   Submission ID: test-12345-abc
   ```
3. Save the event
4. Go to Activepieces → Flow B → **Executions**
5. Verify the flow ran successfully

**Expected Result:**
- ✅ Linear project comment added (if submission ID matches)
- ✅ Slack notification sent to #sales
- ✅ Confirmation email sent to attendee

---

## 🔧 Troubleshooting

### Flow A: Edge Blueprint Intake

**Issue: Drive folder not created**
- Check Google Drive connection is active
- Verify parent folder "WIN_Leads" exists
- Check folder naming for special characters

**Issue: Linear issues not created**
- Verify `LINEAR_TEAM_ID` environment variable is correct
- Check Linear API key has write permissions
- Review blueprint parsing logic in "Parse Blueprint for Linear Issues" step

**Issue: Slack notification not sent**
- Verify `SLACK_SALES_CHANNEL` environment variable is correct
- Check Slack connection is active
- Ensure bot has permission to post in the channel

**Issue: Email not sent**
- Check Gmail connection is active
- Verify sender email is authorized
- Check for email content formatting errors

---

### Flow B: Calendar Booking Follow-up

**Issue: Flow not triggering**
- Verify Google Calendar connection is active
- Check the correct calendar is selected in trigger settings
- Ensure event type is set to "created"

**Issue: Linear project not found**
- Check submission ID format in event description
- Verify Linear search query is correct
- Ensure Linear project exists with matching submission ID

**Issue: Confirmation email not sent**
- Verify attendee email is extracted correctly
- Check Gmail connection is active
- Review email template for formatting errors

---

## 🔒 Security & Privacy

### Data Handling

- **Submission IDs:** Used for idempotency, stored in Activepieces key-value store
- **Personal Data:** Email addresses and business names are processed but not permanently stored in Activepieces
- **Blueprints:** Stored in Google Drive with appropriate folder permissions

### Access Control

- **Google Drive:** Ensure folder permissions are set correctly (private by default)
- **Linear:** Projects are visible only to team members
- **Slack:** Messages posted to internal channels only
- **Gmail:** Emails sent from authorized account only

### Compliance

- **GDPR:** Ensure you have consent to process email addresses
- **Data Retention:** Configure Google Drive and Linear retention policies
- **Audit Logs:** Activepieces maintains execution logs for 30 days

---

## 📊 Monitoring & Analytics

### Key Metrics to Track

1. **Flow A (Edge Blueprint Intake)**
   - Total submissions processed
   - Success rate (%)
   - Average processing time
   - Failed executions (with error types)

2. **Flow B (Calendar Booking Follow-up)**
   - Total bookings processed
   - Linear projects updated
   - Confirmation emails sent
   - Failed executions (with error types)

### Activepieces Dashboard

Go to **Flows → Analytics** to view:
- Execution count (last 7/30 days)
- Success vs. failure rate
- Average execution time
- Error breakdown

### Alerts

Set up alerts for:
- Flow failures (send to #ops Slack channel)
- High error rates (>10% failures)
- Long execution times (>2 minutes)

---

## 🚀 Optimization Tips

### Performance

1. **Reduce API Calls:** Batch Linear issue creation when possible
2. **Async Processing:** Use Activepieces delay/schedule for non-critical actions
3. **Caching:** Store frequently accessed data (e.g., Linear team ID) in environment variables

### Reliability

1. **Error Handling:** Add retry logic with exponential backoff
2. **Fallbacks:** Send Slack alerts when critical actions fail
3. **Validation:** Validate all inputs before processing

### Scalability

1. **Rate Limits:** Monitor API rate limits for Linear, Slack, Gmail
2. **Queue Management:** Use Activepieces queue for high-volume submissions
3. **Load Testing:** Test with 10+ concurrent submissions

---

## 📞 Support

### Activepieces Resources

- **Documentation:** https://www.activepieces.com/docs
- **Community:** https://community.activepieces.com
- **Support:** support@activepieces.com

### BizBuilders AI Support

For questions about these workflows:
- Review `DELIVERABLES_BIZBUILDERS.md` for project context
- Check `ACTIVEPIECES_SETUP.md` for detailed setup instructions
- Contact BizBuilders AI team for custom workflow requests

---

## 📝 Changelog

### v1.0.0 (2026-01-22)
- Initial release
- Flow A: Edge Blueprint Intake
- Flow B: Google Calendar Booking Follow-up
- Idempotency using submissionId and eventId
- Complete documentation and test payloads

---

**Built for BizBuilders AI - Workflow Intelligence for Modern Operators**
