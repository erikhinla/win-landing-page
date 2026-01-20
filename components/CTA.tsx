"use client";

import { motion } from "framer-motion";

export default function CTA() {
  const scrollToForm = () => {
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6 bg-background-primary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-12 bg-gradient-to-br from-accent-gold/10 to-accent-steel/10 border border-accent-gold/30 rounded-lg"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Ready to make your tools <span className="text-accent-gold">intelligent</span>?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Stop managing tools. Start building systems that learn.
          </p>
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-accent-gold text-background-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
          >
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
