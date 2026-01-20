"use client";

import { motion } from "framer-motion";

const problems = [
  {
    title: "Too many tools",
    description: "Your stack keeps growing, but your results don't.",
  },
  {
    title: "No memory",
    description: "Every interaction starts from zero. Nothing learns.",
  },
  {
    title: "No compounding value",
    description: "You're busy, but you're not building leverage.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 px-6 bg-background-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            The Problem
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Most businesses are drowning in tools that don't talk to each other.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 bg-background-primary border border-accent-gold/20 rounded-lg hover:border-accent-gold/40 transition-all duration-300"
            >
              <div className="w-12 h-1 bg-accent-gold mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-text-primary">
                {problem.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
