"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, BadgeCheck, Quote, X, Layers, MapPin } from "lucide-react";
import { Reveal, SectionHeading, TiltCard } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T, STORES, CATEGORIES, waLink, WA_MESSAGES, type Store } from "@/lib/site-data";

export default function Portfolio() {
  const { tx, lang } = useLang();
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<Store | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? STORES : STORES.filter((s) => s.category === filter)),
    [filter]
  );

  // close on Escape + lock body scroll while the detail dialog is open
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="work" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker={tx(T.portfolio.kicker)} title={tx(T.portfolio.title)} sub={tx(T.portfolio.sub)} />

        {/* filters */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Categories">
            {CATEGORIES.map((c) => {
              const isOn = filter === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isOn}
                  onClick={() => setFilter(c.id)}
                  className={`rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all duration-300 ${
                    isOn
                      ? "bg-gradient-to-l from-[#f08020] to-[#e85f22] text-[#140c05] shadow-[0_8px_24px_-8px_rgba(240,128,32,0.6)]"
                      : "glass text-[#a7bcc2] hover:border-[#3fc9d4]/40 hover:text-white"
                  }`}
                >
                  {tx(c.label)}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => (
              <motion.article
                layout
                key={s.id}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full">
                  <button
                    onClick={() => setActive(s)}
                    className="glass glow-card group block h-full w-full overflow-hidden rounded-3xl text-start"
                    aria-label={`${s.name[lang]} — ${tx(T.portfolio.viewDetails)}`}
                  >
                    {/* image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={s.image}
                        alt={`${s.name[lang]} — ${s.tagline[lang]}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050e14] via-[#050e14]/25 to-transparent" />
                      {/* platform chip */}
                      <span className="glass-strong absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] font-semibold text-white/90">
                        {s.verified && <BadgeCheck className="h-3.5 w-3.5 text-[#3fc9d4]" />}
                        {tx(s.platform)}
                      </span>
                      <span className="font-latin absolute bottom-3 end-4 text-[11px] font-bold tracking-[0.18em] text-white/70" dir="ltr">
                        {s.latin}
                      </span>
                    </div>

                    {/* body */}
                    <div className="flex flex-col gap-3 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-[17px] font-bold leading-7 text-white">{s.name[lang]}</h3>
                        <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#7adfe8] transition-all duration-300 group-hover:border-[#f08020]/50 group-hover:bg-[#f08020]/10 group-hover:text-[#f08020]">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </span>
                      </div>
                      <p className="text-[12.5px] leading-6 text-[#8fa9b0]">{s.desc[lang]}</p>

                      {/* metrics */}
                      <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1.5">
                        {s.metrics.slice(0, 2).map((m) => (
                          <span key={m.label.en} className="flex flex-col">
                            <span className="font-latin text-[13px] font-bold text-[#3fc9d4]" dir="ltr">{m.value}</span>
                            <span className="text-[10.5px] text-[#6d868e]">{tx(m.label)}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ---------- detail dialog ---------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.name[lang]}
            className="fixed inset-0 z-[115] overflow-y-auto bg-[#030a0e]/92 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong relative mx-auto my-6 w-full max-w-4xl overflow-hidden rounded-[1.8rem]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* close */}
              <button
                onClick={() => setActive(null)}
                aria-label={tx(T.portfolio.close)}
                className="glass absolute end-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition hover:border-[#f08020]/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* hero image */}
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <Image src={active.image} alt={active.name[lang]} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071820] via-transparent to-[#050e14]/40" />
                <div className="absolute bottom-0 w-full p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="glass-strong inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white/90">
                      {active.verified && <BadgeCheck className="h-3.5 w-3.5 text-[#3fc9d4]" />}
                      {tx(active.platform)}
                    </span>
                    {active.badges.map((b) => (
                      <span key={b.en} className="glass inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-medium text-[#bfe9ee]">
                        {tx(b)}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display mt-3 text-2xl font-extrabold text-white sm:text-3xl">{active.name[lang]}</h3>
                  <p className="mt-1 text-[13px] text-[#9fd9df]">{active.tagline[lang]}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
                {/* left: description + services */}
                <div>
                  <p className="text-[14px] leading-8 text-[#a7bcc2]">{active.desc[lang]}</p>

                  <h4 className="font-display mt-7 flex items-center gap-2 text-[15px] font-bold text-white">
                    <Layers className="h-4 w-4 text-[#f08020]" />
                    {tx(T.portfolio.delivered)}
                  </h4>
                  <ul className="mt-3.5 space-y-2.5">
                    {active.services.map((sv) => (
                      <li key={sv.en} className="flex items-start gap-2.5 text-[13px] leading-6 text-[#a7bcc2]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f08020]" />
                        {tx(sv)}
                      </li>
                    ))}
                  </ul>

                  {active.testimonial && (
                    <figure className="glass mt-7 rounded-2xl p-5">
                      <Quote className="h-4.5 w-4.5 text-[#f08020]" />
                      <blockquote className="mt-2.5 text-[13.5px] leading-7 text-white/90">“{active.testimonial[lang]}”</blockquote>
                      <figcaption className="mt-2.5 text-[11px] text-[#6d868e]">— {tx(T.portfolio.testimonial)}</figcaption>
                    </figure>
                  )}
                </div>

                {/* right: metrics + CTA */}
                <div className="flex flex-col gap-5">
                  <div className="glass rounded-2xl p-5">
                    <h4 className="font-display mb-4 text-[13px] font-bold uppercase tracking-wider text-[#7adfe8]">
                      {active.latin}
                    </h4>
                    <dl className="space-y-3.5">
                      {active.metrics.map((m) => (
                        <div key={m.label.en} className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                          <dt className="text-[12px] text-[#8fa9b0]">{tx(m.label)}</dt>
                          <dd className="font-latin text-[14px] font-bold text-white" dir="auto">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#3fc9d4] to-[#2aa7b2] text-[13.5px] font-bold text-[#04141a] transition hover:brightness-110"
                  >
                    {tx(T.portfolio.visit)}
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-translate-x-0.5" />
                  </a>
                  <a
                    href={waLink(WA_MESSAGES.portfolio[lang])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass inline-flex h-12 items-center justify-center gap-2 rounded-full text-[13.5px] font-semibold text-white transition hover:border-[#f08020]/50"
                  >
                    {tx(T.cta.button)}
                  </a>
                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#5d7680]">
                    <MapPin className="h-3.5 w-3.5" />
                    SHOHRA · Jeddah, Saudi Arabia
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
