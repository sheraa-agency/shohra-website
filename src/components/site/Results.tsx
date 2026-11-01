"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, ShieldCheck } from "lucide-react";
import Lightbox, { type LightboxItem } from "./Lightbox";
import { Reveal, SectionHeading } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T, DASHBOARDS } from "@/lib/site-data";

export default function Results() {
  const { tx, lang } = useLang();
  const [index, setIndex] = useState<number | null>(null);

  const items: LightboxItem[] = DASHBOARDS.map((d) => ({
    src: d.src,
    title: d.title[lang],
    caption: `${tx(T.results.caption)} · ${tx(T.results.source)}`,
  }));

  return (
    <section id="results" className="relative py-24 sm:py-28">
      {/* subtle section tint */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(18,63,74,0.28),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker={tx(T.results.kicker)} title={tx(T.results.title)} sub={tx(T.results.sub)} />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DASHBOARDS.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setIndex(i)}
                className="glass glow-card group relative block w-full overflow-hidden rounded-2xl"
                aria-label={`${d.title.ar} — ${tx(T.results.enlarge)}`}
              >
                <div className="relative aspect-[85/42] w-full">
                  <Image
                    src={d.src}
                    alt={d.title[lang]}
                    fill
                    loading={i < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050e14]/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

                <span className="glass-strong absolute end-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#3fc9d4]" />
                    {d.title[lang]}
                  </span>
                  <span className="font-latin text-[10px] tracking-wider text-[#7adfe8]/80" dir="ltr">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </section>
  );
}
