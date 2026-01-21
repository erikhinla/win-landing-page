"use client";

import Hero from "@/components/bizbuilders/Hero";
import Offer from "@/components/bizbuilders/Offer";
import OnboardingForm from "@/components/bizbuilders/OnboardingForm";
import { motion } from "framer-motion";

export default function BizBuildersPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
        <Offer />
        <OnboardingForm />
      </motion.div>
    </div>
  );
}
