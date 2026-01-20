"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function JoinForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const hubspotFormId = typeof window !== "undefined" 
    ? process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID
    : undefined;
  const googleAppointmentLink = typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_LINK || "#"
    : "#";

  useEffect(() => {
    // Load HubSpot form script
    if (hubspotFormId && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "//js.hsforms.net/forms/embed/v2.js";
      script.async = true;
      script.charset = "utf-8";
      script.type = "text/javascript";
      
      script.onload = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: "na1",
            portalId: hubspotFormId.split("-")[0] || "",
            formId: hubspotFormId,
            target: "#hubspot-form-container",
            onFormSubmit: async ($form: any) => {
              setLoading(true);
              
              // Get form data
              const formData = new FormData($form[0]);
              const data: Record<string, any> = {};
              formData.forEach((value, key) => {
                data[key] = value;
              });

              // Send to Activepieces webhook via internal API
              try {
                await fetch("/api/webhook", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });
              } catch (error) {
                console.error("Webhook error:", error);
              }

              setLoading(false);
              setSubmitted(true);
            },
          });
        }
      };

      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [hubspotFormId]);

  if (submitted) {
    return (
      <section id="join" className="py-24 px-6 bg-background-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-12 bg-background-primary border border-accent-gold/30 rounded-lg"
          >
            <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-background-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-text-primary">
              You're on the list.
            </h3>
            <p className="text-xl text-text-secondary mb-8">
              We'll be in touch soon with your AI Edge Assessment results.
            </p>
            <a
              href={googleAppointmentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-accent-gold text-background-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200"
            >
              Book Your AI-Edge Call Now
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="join" className="py-24 px-6 bg-background-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Get Your <span className="text-accent-gold">AI Edge</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Take the AI-Edge Assessment and discover how to turn your tools into intelligence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-background-primary border border-accent-gold/20 rounded-lg p-8"
        >
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-text-secondary">Processing...</p>
            </div>
          )}
          
          {!hubspotFormId ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">
                Form configuration pending. Please check back soon.
              </p>
            </div>
          ) : (
            <div id="hubspot-form-container" className="hubspot-form" />
          )}
        </motion.div>
      </div>
    </section>
  );
}

// TypeScript declaration for HubSpot
declare global {
  interface Window {
    hbspt: any;
  }
}
