"use client";

import React from "react";
import { Reveal, SectionHeading, CountUp } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T, STATS } from "@/lib/site-data";

export default function Stats() {
  const { tx, lang } = useLang();
  return (
    <section id="trust" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker={tx(T.stats.kicker)} title={tx(T.stats.title)} sub={tx(T.stats.sub)} />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label.en} delay={i * 0.1}>
              <div className="glass glow-card group relative h-full overflow-hidden rounded-3xl p-7">
                <div className="absolute -end-10 -top-10 h-28 w-28 rounded-full bg-[#123f4a]/50 blur-2xl transition group-hover:bg-[#f08020]/15" />
                <div className="relative flex flex-col gap-2">
                  <span
                    className="font-display text-[2.1rem] font-extrabold leading-none text-gradient-teal sm:text-[2.4rem]"
                    dir="ltr"
                  >
                    {s.countUp ? (
                      <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                    ) : (
                      s.label[lang]
                    )}
                  </span>
                  <span className="font-display text-base font-bold text-white">{s.countUp ? tx(s.label) : "\u00A0"}</span>
                  <span className="text-[13px] leading-6 text-[#8fa9b0]">{tx(s.note)}</span>
                </div>
                <div className="shimmer-line mt-6 h-px w-full opacity-60" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-6 text-center text-[11.5px] text-[#5d7680]">{tx(T.footer.sources)}</p>
        </Reveal>
      </div>
    </section>
  );
}
