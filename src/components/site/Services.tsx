"use client";

import React from "react";
import { Search, Target, ShoppingBag, PenTool, Share2, Gem, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, SectionHeading, TiltCard } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T, SERVICES } from "@/lib/site-data";

const ICONS: Record<string, LucideIcon> = {
  Search,
  Target,
  ShoppingBag,
  PenTool,
  Share2,
  Gem,
};

export default function Services() {
  const { tx, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="services" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker={tx(T.services.kicker)} title={tx(T.services.title)} sub={tx(T.services.sub)} />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Gem;
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.1}>
                <TiltCard className="h-full">
                  <div className="glass glow-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-7">
                    {/* index number */}
                    <span className="font-latin pointer-events-none absolute end-5 top-4 text-4xl font-extrabold text-white/[0.045] tabular-nums" dir="ltr">
                      0{i + 1}
                    </span>

                    <span className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123f4a] to-[#0f363f] text-[#3fc9d4] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-[#3fc9d4]/20 transition-all duration-500 group-hover:from-[#f08020] group-hover:to-[#e85f22] group-hover:text-[#140c05] group-hover:ring-[#f08020]/40">
                      <Icon className="h-6.5 w-6.5" strokeWidth={1.7} />
                    </span>

                    <h3 className="font-display text-lg font-bold text-white">{tx(s.title)}</h3>
                    <p className="mt-3 flex-1 text-[13.5px] leading-7 text-[#8fa9b0]">{tx(s.desc)}</p>

                    <span className="mt-6 flex items-center gap-1.5 text-[12px] font-semibold text-[#3fc9d4] opacity-0 transition-all duration-300 group-hover:opacity-100">
                      SHOHRA
                      <Arrow className="h-3.5 w-3.5" />
                    </span>

                    {/* hover gradient sweep */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(400px_180px_at_80%_0%,rgba(240,128,32,0.09),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
