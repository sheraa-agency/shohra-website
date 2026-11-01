"use client";

import React from "react";
import { LangProvider } from "@/lib/lang";
import ParticleBackground from "@/components/site/ParticleBackground";
import { CustomCursor } from "@/components/site/ui-bits";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Stats from "@/components/site/Stats";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Portfolio from "@/components/site/Portfolio";
import Results from "@/components/site/Results";
import Testimonials from "@/components/site/Testimonials";
import Process from "@/components/site/Process";
import WhyShohra from "@/components/site/WhyShohra";
import FinalCTA from "@/components/site/FinalCTA";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";

export default function Home() {
  return (
    <LangProvider>
      <ParticleBackground />
      <CustomCursor />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Stats />
          <About />
          <Services />
          <Portfolio />
          <Results />
          <Testimonials />
          <Process />
          <WhyShohra />
          <FinalCTA />
        </main>
        <Footer />
      </div>
      <WhatsAppFloat />
    </LangProvider>
  );
}
