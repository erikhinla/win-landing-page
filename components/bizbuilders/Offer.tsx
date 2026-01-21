"use client";

import { motion } from "framer-motion";
import { FileText, Workflow, ListChecks, Zap, Mail } from "lucide-react";

const deliverables = [
  {
    icon: FileText,
    title: "Workflow Map",
    description: "One-page visual of your current state → intelligent state",
  },
  {
    icon: Workflow,
    title: "Automation Plan",
    description: "3-5 high-impact workflows designed for your stack",
  },
  {
    icon: ListChecks,
    title: "Implementation Backlog",
    description: "Linear issues with clear priorities and dependencies",
  },
  {
    icon: Zap,
    title: "Working Automation",
    description: "One Activepieces workflow shipped and tested",
  },
  {
    icon: Mail,
    title: "Brand-Safe Copy Pack",
    description: "Email sequences and landing copy (optional add-on)",
  },
];

export default function Offer() {
  return (
    <section className="relative py-24 px-6 bg-[#141417]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-4">
            The Edge Blueprint
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
            A complete workflow intelligence package designed for your business.
            <br />
            <span className="text-[#C9A24D]">We orchestrate your existing stack.</span>
          </p>
        </motion.div>

        {/* Deliverables grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-[#0B0B0D] border border-[#C9A24D]/20 rounded-lg p-6 hover:border-[#C9A24D]/40 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#C9A24D]/10 rounded-lg">
                  <item.icon className="w-6 h-6 text-[#C9A24D]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#F5F5F7] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#A1A1AA]">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value prop */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-block bg-[#0B0B0D] border border-[#C9A24D]/30 rounded-lg px-8 py-6">
            <p className="text-lg text-[#F5F5F7] mb-2">
              <span className="text-[#C9A24D] font-semibold">No tool replacement.</span> No learning curve.
            </p>
            <p className="text-[#A1A1AA]">
              We connect HubSpot, Drive, Slack, Linear, and your existing stack into an intelligent workflow.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
