import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import JoinForm from "@/components/JoinForm";
import CTA from "@/components/CTA";

export default function WINPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <JoinForm />
      <CTA />
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-background-secondary border-t border-accent-gold/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-text-secondary text-sm">
            © 2026 BizBuilders AI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
