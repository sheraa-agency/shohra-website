"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, TrendingUp, MousePointerClick, BadgeCheck } from "lucide-react";
import { useLang } from "@/lib/lang";
import { T, WA_MESSAGES, waLink, CONTACT } from "@/lib/site-data";
import { Magnetic } from "./ui-bits";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { tx, lang } = useLang();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* ---------- copy column ---------- */}
        <div className="relative z-10 text-center lg:text-start">
          {/* kicker */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mb-6 inline-flex"
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#9fd9df]">
              <Sparkles className="h-3.5 w-3.5 text-[#f08020]" />
              {tx(T.hero.kicker)}
            </span>
          </motion.div>

          {/* H1 */}
          <h1 className="font-display text-balance text-[2.35rem] font-extrabold leading-[1.28] text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.22]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease }}
            >
              {tx(T.hero.h1a)}
            </motion.span>
            <motion.span
              className="text-gradient-orange block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.42, ease }}
            >
              {tx(T.hero.h1b)}
            </motion.span>
          </h1>

          {/* EN supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.56, ease }}
            className="font-latin mt-5 text-[13px] font-medium uppercase tracking-[0.22em] text-[#7adfe8]"
            dir="ltr"
          >
            Strategic Digital Growth · Creative Excellence · Measurable Results
          </motion.p>

          {/* description */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.66, ease }}
            className="mx-auto mt-5 max-w-xl text-pretty text-[15.5px] leading-9 text-[#8fa9b0] lg:mx-0"
          >
            {tx(T.hero.sub)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78, ease }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Magnetic>
              <a
                href="#work"
                className="group relative inline-flex h-14 items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-l from-[#f08020] to-[#e85f22] px-8 text-[15px] font-bold text-[#140c05] shadow-[0_14px_44px_-10px_rgba(240,128,32,0.55)] transition hover:brightness-110"
              >
                <span className="relative z-10">{tx(T.hero.cta1)}</span>
                <ArrowDown className="relative z-10 h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-y-0.5 rtl:rotate-0" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={waLink(WA_MESSAGES.consult[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glow-card inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-[15px] font-semibold text-white"
              >
                {tx(T.hero.cta2)}
              </a>
            </Magnetic>
          </motion.div>

          {/* trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-9 flex items-center justify-center gap-2.5 text-[12.5px] text-[#6d868e] lg:justify-start"
          >
            <BadgeCheck className="h-4 w-4 shrink-0 text-[#3fc9d4]" />
            {tx(T.hero.trusted)}
          </motion.div>
        </div>

        {/* ---------- visual column ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
          className="relative z-10 mx-auto hidden w-full max-w-md lg:block"
          aria-hidden
        >
          {/* orbit rings + logo */}
          <div className="relative mx-auto aspect-square w-full">
            <motion.div
              className="absolute inset-0 rounded-full border border-[#3fc9d4]/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#3fc9d4] shadow-[0_0_14px_rgba(63,201,212,0.9)]" />
            </motion.div>
            <motion.div
              className="absolute inset-8 rounded-full border border-dashed border-[#f08020]/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#f08020] shadow-[0_0_12px_rgba(240,128,32,0.9)]" />
            </motion.div>
            <div className="glass absolute inset-14 flex items-center justify-center rounded-full">
              <div className="relative h-full w-full p-10">
                <Image src="/assets/logo-light.png" alt="" fill sizes="320px" className="animate-floaty object-contain p-8" style={{ ["--rot" as never]: "0deg" }} />
              </div>
            </div>
          </div>

          {/* floating analytics chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease }}
            className="glass animate-floaty absolute -start-6 top-6 flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ ["--rot" as never]: "-2deg", animationDelay: "0.4s" }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#123f4a] text-[#3fc9d4]">
              <TrendingUp className="h-4.5 w-4.5" />
            </span>
            <span className="flex flex-col leading-tight" dir="ltr">
              <span className="font-latin text-sm font-bold text-white tabular-nums">+150</span>
              <span className="text-[10px] text-[#7d959d]">stores growing</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7, ease }}
            className="glass animate-floaty absolute -end-4 bottom-20 flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ ["--rot" as never]: "2deg", animationDelay: "1.6s" }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#f08020] to-[#e85f22] text-[#140c05]">
              <MousePointerClick className="h-4.5 w-4.5" />
            </span>
            <span className="flex flex-col leading-tight" dir="ltr">
              <span className="font-latin text-sm font-bold text-white tabular-nums">+1.5M</span>
              <span className="text-[10px] text-[#7d959d]">audience reached</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="glass absolute -bottom-2 start-10 flex items-center gap-2 rounded-full px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fc9d4] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fc9d4]" />
            </span>
            <span className="text-[11px] text-[#9fb6bd]" dir="ltr">{CONTACT.city.en}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#trust"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-max flex-col items-center gap-2 text-[#5d7680] transition hover:text-[#7adfe8]"
        aria-label={tx(T.hero.scroll)}
      >
        <span className="text-[10px] tracking-[0.3em]">{tx(T.hero.scroll)}</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-current p-1.5">
          <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      </motion.a>
    </section>
  );
}
