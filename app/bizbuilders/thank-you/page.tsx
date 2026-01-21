"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center px-6 py-20">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Success icon */}
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-[#C9A24D]/10 rounded-full mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CheckCircle2 className="w-10 h-10 text-[#C9A24D]" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-4">
          Your Edge Blueprint is Being Generated
        </h1>

        <p className="text-xl text-[#A1A1AA] mb-8">
          We're analyzing your business and creating your custom workflow intelligence package.
        </p>

        {submissionId && (
          <div className="inline-block bg-[#141417] border border-[#C9A24D]/20 rounded-lg px-6 py-3 mb-12">
            <p className="text-sm text-[#A1A1AA]">
              Submission ID:{" "}
              <span className="text-[#C9A24D] font-mono">{submissionId}</span>
            </p>
          </div>
        )}

        {/* Next steps */}
        <div className="space-y-6 mb-12">
          <motion.div
            className="bg-[#141417] border border-[#C9A24D]/20 rounded-lg p-6 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#C9A24D]/10 rounded-lg">
                <Mail className="w-6 h-6 text-[#C9A24D]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#F5F5F7] mb-2">
                  Check Your Email
                </h3>
                <p className="text-[#A1A1AA]">
                  Your Edge Blueprint will be delivered within 24 hours. It includes your workflow map, automation plan, implementation backlog, and more.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-[#141417] border border-[#C9A24D]/20 rounded-lg p-6 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#C9A24D]/10 rounded-lg">
                <Calendar className="w-6 h-6 text-[#C9A24D]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#F5F5F7] mb-2">
                  Book Your AI-Edge Call
                </h3>
                <p className="text-[#A1A1AA] mb-4">
                  Schedule a 30-minute strategy session to review your blueprint and discuss implementation.
                </p>
                <a
                  href={process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_LINK || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#C9A24D] text-[#0B0B0D] font-semibold rounded-lg hover:bg-[#D4B05E] transition-all duration-300"
                >
                  Schedule Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back to home */}
        <a
          href="/bizbuilders"
          className="text-[#C9A24D] hover:text-[#D4B05E] transition-colors"
        >
          ← Back to BizBuilders AI
        </a>
      </motion.div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0D]" />}>
      <ThankYouContent />
    </Suspense>
  );
}
