import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_HUBSPOT_FORM_ID: process.env.HUBSPOT_FORM_ID,
    NEXT_PUBLIC_ACTIVEPIECES_WEBHOOK_URL: process.env.ACTIVEPIECES_WEBHOOK_URL,
    NEXT_PUBLIC_GOOGLE_APPOINTMENT_LINK: process.env.GOOGLE_APPOINTMENT_LINK,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
