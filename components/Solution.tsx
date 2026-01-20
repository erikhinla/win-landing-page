"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    title: "Organize",
    description: "Map real workflows. See how information actually moves through your business.",
  },
  {
    title: "Optimize",
    description: "Remove friction. Automate the repetitive. Focus human attention where it matters.",
  },
  {
    title: "Mobilize",
    description: "Connect your tools. Make them work together. Turn data into decisions.",
  },
];

export default function Solution() {
  return (
    <section className="py-24 px-6 bg-background-primary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            The <span className="text-accent-gold">WIN</span> Solution
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Three pillars that turn your stack into a system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 bg-background-secondary border border-accent-gold/20 rounded-lg hover:border-accent-gold/40 transition-all duration-300 group"
            >
              <div className="absolute top-4 right-4 text-6xl font-bold text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-300">
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-accent-gold">
                {pillar.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Key message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center p-8 bg-gradient-to-r from-accent-gold/10 to-accent-steel/10 border border-accent-gold/30 rounded-lg"
        >
          <p className="text-2xl md:text-3xl font-semibold text-text-primary">
            We don't replace your stack.
            <br />
            <span className="text-accent-gold">We make it intelligent.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
