# Activepieces Integration Setup

This document explains how to configure the Activepieces automation flow for BizBuilders AI Edge Blueprint delivery.

## Overview

When a user submits the onboarding form, the system:
1. Generates an Edge Blueprint using OpenAI
2. Sends the complete package to an Activepieces webhook
3. Activepieces then:
   - Creates a Google Drive folder structure
   - Creates Linear issues for implementation
   - Sends a Slack notification to the sales team
   - Emails the Edge Blueprint to the user

## Webhook Payload Structure

The webhook receives a JSON payload with the following structure:

```json
{
  "submissionId": "abc123xyz789",
  "timestamp": "2025-01-21T14:30:00.000Z",
  "businessInfo": {
    "businessName": "Acme Corp",
    "industry": "Technology/SaaS",
    "offerType": "B2B SaaS platform",
    "primaryGoal": "Increase qualified leads by 30% in 90 days",
    "currentTools": ["HubSpot", "Slack", "Linear"],
    "email": "founder@acmecorp.com"
  },
  "blueprint": "# EDGE BLUEPRINT FOR ACME CORP\n\n## 1. WORKFLOW MAP\n..."
}
```

## Activepieces Flow Configuration

### Step 1: Create Webhook Trigger

1. In Activepieces, create a new flow
2. Add a **Webhook** trigger
3. Copy the webhook URL
4. Add it to your `.env.local` as `ACTIVEPIECES_WEBHOOK_URL`

### Step 2: Create Google Drive Folder

Add a **Google Drive - Create Folder** action:

- **Folder Name**: `{{businessInfo.businessName}} - {{submissionId}}`
- **Parent Folder**: `/WIN_Leads/`
- **Output Variable**: `driveFolder`

### Step 3: Upload Blueprint to Drive

Add a **Google Drive - Upload File** action:

- **File Name**: `Edge_Blueprint_{{businessInfo.businessName}}.md`
- **File Content**: `{{blueprint}}`
- **Parent Folder**: `{{driveFolder.id}}`
- **MIME Type**: `text/markdown`

### Step 4: Create Linear Project

Add a **Linear - Create Project** action:

- **Project Name**: `{{businessInfo.businessName}} - Edge Blueprint Implementation`
- **Description**: `90-day goal: {{businessInfo.primaryGoal}}`
- **Output Variable**: `linearProject`

### Step 5: Parse Blueprint and Create Linear Issues

Add a **Code** action to extract implementation tasks from the blueprint:

```javascript
const blueprint = inputs.blueprint;
const projectId = inputs.linearProject.id;

// Extract implementation backlog section
const backlogMatch = blueprint.match(/## 3\. IMPLEMENTATION BACKLOG[\s\S]*?(?=##|$)/);
if (!backlogMatch) return { issues: [] };

// Parse tasks (simplified - adjust regex based on actual format)
const taskMatches = backlogMatch[0].matchAll(/### (.*?)\n- Description: (.*?)\n- Priority: (.*?)\n/g);

const issues = [];
for (const match of taskMatches) {
  issues.push({
    title: match[1],
    description: match[2],
    priority: match[3].toLowerCase(),
  });
}

return { issues };
```

### Step 6: Create Linear Issues (Loop)

Add a **Loop** action over `{{codeOutput.issues}}`:

For each issue, add a **Linear - Create Issue** action:

- **Title**: `{{item.title}}`
- **Description**: `{{item.description}}`
- **Priority**: `{{item.priority}}`
- **Project**: `{{linearProject.id}}`

### Step 7: Send Slack Notification

Add a **Slack - Send Message** action:

- **Channel**: `#sales` (or your preferred channel)
- **Message**:

```
🎯 New Edge Blueprint Generated!

Business: {{businessInfo.businessName}}
Industry: {{businessInfo.industry}}
Email: {{businessInfo.email}}
Goal: {{businessInfo.primaryGoal}}

📁 Drive Folder: {{driveFolder.webViewLink}}
📋 Linear Project: {{linearProject.url}}
🆔 Submission ID: {{submissionId}}

Next step: Review blueprint and schedule strategy call.
```

### Step 8: Send Email to User

Add a **Gmail - Send Email** action (or your preferred email service):

- **To**: `{{businessInfo.email}}`
- **Subject**: `Your Edge Blueprint is Ready - {{businessInfo.businessName}}`
- **Body**:

```html
Hi there,

Your custom Edge Blueprint for {{businessInfo.businessName}} has been generated!

We've analyzed your business and created a comprehensive workflow intelligence package including:

✅ Workflow Map (current state → intelligent state)
✅ Automation Plan (3-5 high-impact workflows)
✅ Implementation Backlog (prioritized tasks)
✅ Working Automation (Activepieces workflow)
✅ Brand-Safe Copy Pack (optional add-on)

📁 View your complete blueprint here: {{driveFolder.webViewLink}}

Next Steps:
1. Review your Edge Blueprint
2. Book your AI-Edge Call: [YOUR_GOOGLE_CALENDAR_LINK]
3. Let's discuss implementation and get your first automation live

Looking forward to working with you!

Best,
The BizBuilders AI Team
```

## Environment Variables Required

Add these to your `.env.local`:

```bash
ACTIVEPIECES_WEBHOOK_URL=https://cloud.activepieces.com/api/v1/webhooks/YOUR_WEBHOOK_ID
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_GOOGLE_APPOINTMENT_LINK=https://calendar.google.com/...
```

## Testing the Flow

1. Submit a test form on `/bizbuilders`
2. Check Activepieces flow execution logs
3. Verify:
   - Drive folder created
   - Linear project and issues created
   - Slack notification sent
   - Email delivered

## Troubleshooting

### Webhook not receiving data
- Check that `ACTIVEPIECES_WEBHOOK_URL` is set correctly
- Verify the webhook trigger is active in Activepieces
- Check Next.js API route logs for errors

### Blueprint parsing issues
- Review the OpenAI prompt in `/app/api/generate-blueprint/route.ts`
- Adjust the parsing logic in the Code action
- Test with different business inputs

### Linear issues not created
- Verify Linear API permissions
- Check project ID is valid
- Review issue priority mapping

## Next Steps

After setting up the basic flow, consider adding:

- **HubSpot Contact Creation**: Add the lead to HubSpot CRM
- **Calendly Integration**: Auto-create booking link
- **Follow-up Sequences**: Automated email reminders
- **Analytics Tracking**: Log conversion events

---

**Need help?** Contact the BizBuilders AI team for support with Activepieces configuration.
