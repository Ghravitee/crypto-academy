"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Curriculum } from "@/components/landing/curriculum";
import { Security } from "@/components/landing/security";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-250">
      <Nav />
      <Hero />
      <Curriculum />
      <Security />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
