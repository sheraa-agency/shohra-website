"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Lightbox, { type LightboxItem } from "./Lightbox";
import { Reveal, SectionHeading } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T, REVIEWS, FEATURED_QUOTES } from "@/lib/site-data";

export default function Testimonials() {
  const { tx, lang, dir } = useLang();
  const [index, setIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items: LightboxItem[] = useMemo(
    () => REVIEWS.map((r) => ({ src: r.src, title: r.alt[lang] })),
    [lang]
  );

  const scrollBy = (dirSign: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 20 : 340;
    // in RTL, scrollLeft decreases going forward visually
    const rtl = dir === "rtl";
    el.scrollBy({ left: rtl ? -dirSign * w : dirSign * w, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_380px_at_85%_20%,rgba(240,128,32,0.05),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker={tx(T.testimonials.kicker)} title={tx(T.testimonials.title)} sub={tx(T.testimonials.sub)} />

        {/* featured quotes */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {FEATURED_QUOTES.map((q, i) => (
            <Reveal key={q.author.en} delay={i * 0.09}>
              <figure className="glass glow-card relative h-full rounded-3xl p-6">
                <Quote className="h-5 w-5 text-[#f08020]" />
                <blockquote className="mt-4 flex-1 text-[13.5px] leading-8 text-white/90">“{q.quote[lang]}”</blockquote>
                <div className="mt-5 flex items-center gap-1" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-[#f08020] text-[#f08020]" />
                  ))}
                </div>
                <figcaption className="mt-3 border-t border-white/5 pt-3.5">
                  <span className="font-display block text-[13px] font-bold text-white">{q.author[lang]}</span>
                  <span className="mt-0.5 block text-[11px] text-[#6d868e]" dir="ltr">{q.source[lang]}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* screenshot slider */}
        <Reveal delay={0.2}>
          <div className="mt-16">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-[12.5px] text-[#8fa9b0]">{tx(T.testimonials.sub)}</p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => scrollBy(-1)}
                  aria-label={tx(T.testimonials.prev)}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition hover:border-[#3fc9d4]/60 hover:text-white"
                >
                  {dir === "rtl" ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => scrollBy(1)}
                  aria-label={tx(T.testimonials.next)}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition hover:border-[#3fc9d4]/60 hover:text-white"
                >
                  {dir === "rtl" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div
              ref={trackRef}
              className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
              role="list"
              aria-label="Client review screenshots"
            >
              {REVIEWS.map((r, i) => (
                <motion.button
                  data-card
                  role="listitem"
                  key={r.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.03, 0.4), duration: 0.5 }}
                  onClick={() => setIndex(i)}
                  className="glass glow-card group relative h-[420px] w-[300px] shrink-0 overflow-hidden rounded-2xl sm:w-[340px]"
                  aria-label={r.alt[lang]}
                >
                  <Image
                    src={r.src}
                    alt={r.alt[lang]}
                    fill
                    loading={i < 4 ? "eager" : "lazy"}
                    sizes="340px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="font-latin absolute bottom-3 end-3 rounded-full bg-[#050e14]/70 px-2.5 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-sm" dir="ltr">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </section>
  );
}
