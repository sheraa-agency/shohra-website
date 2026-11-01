"use client";

import React from "react";
import Image from "next/image";
import { Blocks, Briefcase, MapPinned, LineChart, Award, Link2 } from "lucide-react";
import { Reveal, SectionHeading, TiltCard } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/site-data";

const ICONS = [Blocks, Briefcase, MapPinned, LineChart, Award, Link2];

export default function WhyShohra() {
  const { tx } = useLang();

  return (
    <section id="why" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker={tx(T.why.kicker)} title={tx(T.why.title)} align="start" />

        {/* asymmetric bento */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {/* brand cell — large */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <div className="glass glow-card relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl p-8">
              <div className="absolute inset-0 bg-[radial-gradient(500px_280px_at_80%_10%,rgba(240,128,32,0.12),transparent_65%),radial-gradient(420px_260px_at_10%_90%,rgba(18,63,74,0.55),transparent_60%)]" />
              <div className="relative">
                <span className="font-latin text-[10px] font-bold tracking-[0.4em] text-[#f08020]" dir="ltr">WHY SHOHRA</span>
                <h3 className="font-display mt-4 max-w-sm text-balance text-2xl font-extrabold leading-[1.5] text-white">
                  {T.hero.h1a.ar} — {T.hero.h1b.ar}
                </h3>
                <p className="mt-4 max-w-md text-[13.5px] leading-8 text-[#9fb6bd]">{tx(T.about.p1).slice(0, 160)}…</p>
              </div>
              <div className="relative mt-8 aspect-[10/6] w-full max-w-[240px] self-end opacity-95">
                <Image src="/assets/logo-light.png" alt="" fill sizes="240px" className="object-contain" />
              </div>
            </div>
          </Reveal>

          {/* six advantage cells */}
          {T.why.items.map((item, i) => {
            const Icon = ICONS[i];
            const wide = i === 1 || i === 4; // asymmetric rhythm
            return (
              <Reveal key={item.title.en} delay={0.06 * i} className={wide ? "md:col-span-2" : ""}>
                <TiltCard max={6} className="h-full">
                  <div className="glass glow-card group flex h-full items-start gap-4 rounded-3xl p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123f4a] text-[#3fc9d4] ring-1 ring-[#3fc9d4]/20 transition group-hover:bg-[#f08020] group-hover:text-[#140c05] group-hover:ring-[#f08020]/40">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span>
                      <h3 className="font-display text-[15px] font-bold text-white">{tx(item.title)}</h3>
                      <p className="mt-1.5 text-[12.5px] leading-6 text-[#8fa9b0]">{tx(item.desc)}</p>
                    </span>
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
