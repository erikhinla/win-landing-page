"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("onboarding-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D] via-[#141417] to-[#0B0B0D]" />
      
      {/* Logo */}
      <motion.div
        className="absolute top-8 left-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/visuals/BBAIlogo1.2.26.png"
          alt="BizBuilders AI"
          width={200}
          height={60}
          className="h-12 w-auto"
        />
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-[#F5F5F7] mb-6 leading-tight">
            Automation is everywhere.
            <br />
            <span className="text-[#C9A24D]">Intelligence is rare.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#A1A1AA] mb-12 max-w-3xl mx-auto leading-relaxed">
            BizBuilders AI turns your existing tools into a learning workflow.
            <br />
            <span className="text-[#F5F5F7] font-medium">We don't replace your stack. We make it intelligent.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 bg-[#C9A24D] text-[#0B0B0D] font-semibold rounded-lg hover:bg-[#D4B05E] transition-all duration-300 shadow-lg hover:shadow-[#C9A24D]/20"
            >
              Get Your Edge Blueprint
            </button>
            
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_LINK || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-[#C9A24D] text-[#C9A24D] font-semibold rounded-lg hover:bg-[#C9A24D]/10 transition-all duration-300"
            >
              Book AI-Edge Call
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-6 h-10 border-2 border-[#C9A24D]/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-[#C9A24D] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
