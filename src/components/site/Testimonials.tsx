"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, MessageCircle, Quote, Star, ZoomIn, Sparkles } from "lucide-react";
import Lightbox, { type LightboxItem } from "./Lightbox";
import { Reveal, SectionHeading } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T, REVIEWS, FEATURED_QUOTES } from "@/lib/site-data";

export default function Testimonials() {
  const { tx, lang } = useLang();
  const [index, setIndex] = useState<number | null>(null);

  const items: LightboxItem[] = useMemo(
    () =>
      REVIEWS.map((r) => ({
        src: r.src,
        title: r.alt[lang],
        caption: tx(T.testimonials.caption),
        w: r.w,
        h: r.h,
      })),
    [lang, tx]
  );

  const chips = [
    { icon: BadgeCheck, cls: "text-[#3fc9d4]", label: tx(T.testimonials.chipCount) },
    { icon: MessageCircle, cls: "text-[#25d366]", label: tx(T.testimonials.chipOriginal) },
    { icon: Sparkles, cls: "text-[#f08020]", label: tx(T.testimonials.chipWritten) },
  ];

  return (
    <section id="testimonials" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_380px_at_85%_20%,rgba(240,128,32,0.05),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_360px_at_10%_60%,rgba(63,201,212,0.05),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker={tx(T.testimonials.kicker)} title={tx(T.testimonials.title)} sub={tx(T.testimonials.sub)} />

        {/* authenticity chips */}
        <Reveal delay={0.18}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {chips.map((c) => (
              <span
                key={c.label}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium text-white/85"
              >
                <c.icon className={`h-4 w-4 ${c.cls}`} />
                {c.label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* featured written quotes — asymmetric zigzag */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
          {FEATURED_QUOTES.map((q, i) => {
            const featured = i === 0;
            const wide = i === 0 || i === 3;
            const span = featured
              ? "md:col-span-6 xl:col-span-4"
              : wide
                ? "md:col-span-6 xl:col-span-4"
                : "md:col-span-3 xl:col-span-2";
            return (
              <Reveal key={q.author.en} delay={i * 0.08} className={span}>
                <figure
                  className={`glass glow-card group relative h-full overflow-hidden rounded-3xl ${
                    featured ? "p-7 sm:p-9" : "p-6"
                  }`}
                >
                  {/* watermark quote */}
                  <Quote
                    aria-hidden
                    className={`absolute -top-2 end-4 text-white/[0.045] transition-transform duration-700 group-hover:scale-110 ${
                      featured ? "h-32 w-32" : "h-24 w-24"
                    }`}
                    strokeWidth={1}
                  />
                  {/* top gradient hairline */}
                  <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#f08020]/50 to-transparent opacity-70" />

                  <div className="relative">
                    <div className="flex items-center gap-1" aria-label="5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-[#f08020] text-[#f08020]" />
                      ))}
                    </div>
                    <blockquote
                      className={`mt-4 text-pretty text-white/90 ${
                        featured ? "font-display text-[17px] font-medium leading-9 sm:text-[19px] sm:leading-10" : "text-[13.5px] leading-8"
                      }`}
                    >
                      “{q.quote[lang]}”
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
                      <span
                        className={`font-display flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0a222c] to-[#0f3542] font-bold text-[#7adfe8] ring-1 ring-[#3fc9d4]/30 ${
                          featured ? "h-11 w-11 text-lg" : "h-9 w-9 text-base"
                        }`}
                        aria-hidden
                      >
                        {q.author[lang].trim().charAt(0)}
                      </span>
                      <span className="min-w-0">
                        <span className={`font-display block truncate font-bold text-white ${featured ? "text-[15px]" : "text-[13px]"}`}>
                          {q.author[lang]}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-[#6d868e]" dir="ltr">
                          {q.source[lang]}
                        </span>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            );
          })}
        </div>

        {/* full reviews wall — masonry, uncropped */}
        <div className="mt-20">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-white sm:text-xl">{tx(T.testimonials.wallTitle)}</h3>
                <p className="mt-1.5 text-[12.5px] text-[#8fa9b0]">{tx(T.testimonials.wallSub)}</p>
              </div>
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold text-[#7adfe8]">
                <BadgeCheck className="h-3.5 w-3.5" />
                <span className="font-latin" dir="ltr">{REVIEWS.length}</span>
                {lang === "ar" ? "لقطة موثقة" : "verified shots"}
              </span>
            </div>
          </Reveal>

          <div className="gap-4 [column-fill:balance] sm:columns-2 sm:gap-5 lg:columns-3 xl:columns-4">
            {REVIEWS.map((r, i) => (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min((i % 4) * 0.06, 0.3), duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setIndex(i)}
                aria-label={r.alt[lang]}
                className="group relative mb-4 block w-full cursor-pointer overflow-hidden rounded-2xl bg-white/[0.04] text-start shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition duration-300 break-inside-avoid hover:-translate-y-1 hover:ring-[#3fc9d4]/45 hover:shadow-[0_18px_50px_-16px_rgba(63,201,212,0.28)] sm:mb-5"
              >
                <Image
                  src={r.src}
                  alt={r.alt[lang]}
                  width={r.w}
                  height={r.h}
                  loading={i < 8 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
                {/* hover veil + action hint */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050e14]/90 via-[#050e14]/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-3.5 bottom-3 flex translate-y-2 items-center justify-between opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10.5px] font-medium text-white backdrop-blur-md">
                    <ZoomIn className="h-3.5 w-3.5 text-[#7adfe8]" />
                    {tx(T.testimonials.viewFull)}
                  </span>
                  <span className="font-latin rounded-full bg-[#f08020]/90 px-2 py-1 text-[9.5px] font-bold text-[#08131a]" dir="ltr">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                {/* permanent corner mark */}
                <span className="absolute end-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#050e14]/55 opacity-0 ring-1 ring-white/15 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                  <BadgeCheck className="h-3.5 w-3.5 text-[#25d366]" />
                </span>
              </motion.button>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-7 flex items-center justify-center gap-2 text-center text-[11.5px] text-[#5d7680]">
              <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#25d366]/70" />
              {tx(T.testimonials.sourceNote)}
            </p>
          </Reveal>
        </div>
      </div>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </section>
  );
}
