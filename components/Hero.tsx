"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const googleAppointmentLink = typeof window !== "undefined" 
    ? process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_LINK || "#"
    : "#";

  const scrollToForm = () => {
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-primary via-background-secondary to-background-primary opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex justify-center"
        >
          <Image
            src="/visuals/logo.png"
            alt="BizBuilders AI"
            width={400}
            height={100}
            className="h-16 w-auto"
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-text-primary"
        >
          Automation is everywhere.
          <br />
          <span className="text-accent-gold">Intelligence is rare.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto"
        >
          WIN turns your existing tools into a learning workflow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-accent-gold text-background-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
          >
            Get Your AI Edge
          </button>
          <a
            href={googleAppointmentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-accent-gold text-accent-gold font-semibold rounded-lg hover:bg-accent-gold hover:text-background-primary transition-all duration-200"
          >
            Book AI-Edge Call
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-accent-gold rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-accent-gold rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
