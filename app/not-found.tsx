"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Inter, system-ui, sans-serif",
      backgroundColor: "#0B0B0D",
      color: "#F5F5F7"
    }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404 - Page Not Found</h2>
      <p style={{ marginBottom: "2rem", color: "#A1A1AA" }}>The page you're looking for doesn't exist.</p>
      <Link href="/" style={{ color: "#C9A24D", textDecoration: "underline" }}>
        Return Home
      </Link>
    </div>
  );
}
