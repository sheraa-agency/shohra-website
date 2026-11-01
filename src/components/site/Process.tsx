"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SearchCheck, Route, Wand2, Rocket } from "lucide-react";
import { SectionHeading, Reveal } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/site-data";

const ICONS = [SearchCheck, Route, Wand2, Rocket];

export default function Process() {
  const { tx, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="process" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading kicker={tx(T.process.kicker)} title={tx(T.process.title)} />

        <div ref={ref} className="relative mt-16">
          {/* track */}
          <div className="absolute bottom-0 top-2 start-[22px] w-px bg-white/8 sm:start-1/2" aria-hidden>
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-[#3fc9d4] via-[#2b96a0] to-[#f08020]"
              style={{ scaleY }}
            />
          </div>

          <ol className="space-y-12">
            {T.process.steps.map((step, i) => {
              const Icon = ICONS[i];
              const isEven = i % 2 === 0;
              return (
                <li key={step.n} className="relative">
                  <div className={`flex items-start gap-6 sm:items-center ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    {/* node */}
                    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#3fc9d4]/40 bg-[#081c26] text-[#3fc9d4] shadow-[0_0_24px_-6px_rgba(63,201,212,0.55)] sm:absolute sm:start-1/2 sm:-translate-x-1/2 rtl:sm:translate-x-1/2">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>

                    {/* card */}
                    <Reveal className={`w-full sm:w-[calc(50%-3rem)] ${isEven ? "" : "sm:ms-auto"}`} delay={0.05 * i}>
                      <div className="glass glow-card rounded-3xl p-6">
                        <div className="flex items-center gap-3">
                          <span className="font-latin text-gradient-orange text-2xl font-extrabold" dir="ltr">{step.n}</span>
                          <h3 className="font-display text-[16.5px] font-bold text-white">{tx(step.title)}</h3>
                        </div>
                        <p className="mt-3 text-[13.5px] leading-7 text-[#8fa9b0]">{step.desc[lang]}</p>
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
