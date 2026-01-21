"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const INDUSTRIES = [
  "Technology/SaaS",
  "E-commerce",
  "Professional Services",
  "Healthcare",
  "Real Estate",
  "Marketing/Agency",
  "Education",
  "Finance",
  "Other",
];

const TOOLS = [
  "HubSpot",
  "Google Drive",
  "Slack",
  "Linear",
  "Notion",
  "Airtable",
  "Zapier",
  "Make",
  "Calendly",
  "Stripe",
];

export default function OnboardingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    offerType: "",
    primaryGoal: "",
    currentTools: [] as string[],
    email: "",
  });

  const handleToolToggle = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      currentTools: prev.currentTools.includes(tool)
        ? prev.currentTools.filter((t) => t !== tool)
        : [...prev.currentTools, tool],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/generate-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to thank you page with submission ID
        router.push(`/bizbuilders/thank-you?id=${data.submissionId}`);
      } else {
        alert("Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="onboarding-form" className="relative py-24 px-6 bg-[#0B0B0D]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-[#F5F5F7] mb-4 text-center">
            Get Your Edge Blueprint
          </h2>
          <p className="text-lg text-[#A1A1AA] mb-12 text-center">
            Tell us about your business. We'll generate your workflow intelligence package.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#141417] border border-[#C9A24D]/20 rounded-lg text-[#F5F5F7] focus:outline-none focus:border-[#C9A24D] transition-colors"
                placeholder="Acme Corp"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#141417] border border-[#C9A24D]/20 rounded-lg text-[#F5F5F7] focus:outline-none focus:border-[#C9A24D] transition-colors"
                placeholder="you@company.com"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                Industry *
              </label>
              <select
                required
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#141417] border border-[#C9A24D]/20 rounded-lg text-[#F5F5F7] focus:outline-none focus:border-[#C9A24D] transition-colors"
              >
                <option value="">Select your industry</option>
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Offer Type */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                What do you sell? *
              </label>
              <input
                type="text"
                required
                value={formData.offerType}
                onChange={(e) =>
                  setFormData({ ...formData, offerType: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#141417] border border-[#C9A24D]/20 rounded-lg text-[#F5F5F7] focus:outline-none focus:border-[#C9A24D] transition-colors"
                placeholder="e.g., B2B SaaS, consulting services, e-commerce products"
              />
            </div>

            {/* Primary Goal */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                Primary Goal (90 days) *
              </label>
              <textarea
                required
                value={formData.primaryGoal}
                onChange={(e) =>
                  setFormData({ ...formData, primaryGoal: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 bg-[#141417] border border-[#C9A24D]/20 rounded-lg text-[#F5F5F7] focus:outline-none focus:border-[#C9A24D] transition-colors resize-none"
                placeholder="e.g., Increase qualified leads by 30%, automate client onboarding, reduce manual data entry"
              />
            </div>

            {/* Current Tools */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-3">
                Current Tools (select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {TOOLS.map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => handleToolToggle(tool)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                      formData.currentTools.includes(tool)
                        ? "border-[#C9A24D] bg-[#C9A24D]/10 text-[#C9A24D]"
                        : "border-[#C9A24D]/20 bg-[#141417] text-[#A1A1AA] hover:border-[#C9A24D]/40"
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-[#C9A24D] text-[#0B0B0D] font-semibold rounded-lg hover:bg-[#D4B05E] transition-all duration-300 shadow-lg hover:shadow-[#C9A24D]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Generating Your Blueprint..." : "Generate My Edge Blueprint"}
            </button>

            <p className="text-xs text-[#A1A1AA] text-center">
              By submitting, you'll receive your Edge Blueprint and an invitation to book a strategy call.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
