import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { nanoid } from "nanoid";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, industry, offerType, primaryGoal, currentTools, email } = body;

    // Validate required fields
    if (!businessName || !industry || !offerType || !primaryGoal || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate unique submission ID
    const submissionId = nanoid(12);

    // Generate Edge Blueprint using OpenAI
    const prompt = `You are a workflow intelligence expert. Generate a comprehensive Edge Blueprint for the following business:

Business Name: ${businessName}
Industry: ${industry}
Offer Type: ${offerType}
Primary Goal (90 days): ${primaryGoal}
Current Tools: ${currentTools.join(", ") || "None specified"}

Generate the following deliverables in a structured format:

1. WORKFLOW MAP (one-page summary)
   - Current state analysis
   - Intelligent state vision
   - Key transformation points

2. AUTOMATION PLAN (3-5 high-impact workflows)
   - For each workflow:
     * Name
     * Description
     * Tools involved
     * Expected impact
     * Implementation priority (High/Medium/Low)

3. IMPLEMENTATION BACKLOG (Linear-ready issues)
   - 5-8 specific tasks with:
     * Title
     * Description
     * Priority
     * Dependencies
     * Estimated effort

4. WORKING AUTOMATION (one Activepieces workflow)
   - Workflow name
   - Trigger
   - Actions (step-by-step)
   - Expected outcome

5. BRAND-SAFE COPY PACK (optional add-on)
   - 3 email sequence templates
   - 1 landing page copy outline

Format the output as structured markdown with clear sections.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert workflow intelligence consultant specializing in business automation and AI integration. You provide clear, actionable, and highly specific recommendations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const blueprint = completion.choices[0]?.message?.content || "Error generating blueprint";

    // Prepare payload for Activepieces webhook
    const webhookPayload = {
      submissionId,
      timestamp: new Date().toISOString(),
      businessInfo: {
        businessName,
        industry,
        offerType,
        primaryGoal,
        currentTools,
        email,
      },
      blueprint,
    };

    // Send to Activepieces webhook
    const webhookUrl = process.env.ACTIVEPIECES_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
        });
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
        // Continue even if webhook fails
      }
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Edge Blueprint generated successfully",
    });
  } catch (error) {
    console.error("Blueprint generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate blueprint" },
      { status: 500 }
    );
  }
}
