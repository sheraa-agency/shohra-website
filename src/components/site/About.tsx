"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Layers, Compass, BarChart3, Handshake, Quote } from "lucide-react";
import { Reveal } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/site-data";

const ICONS = [Layers, Compass, BarChart3, Handshake];

export default function About() {
  const { tx } = useLang();
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ---------- visual side ---------- */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative">
              {/* framed brand panel */}
              <div className="glass glow-card relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_0%,rgba(18,63,74,0.5),transparent_65%)]" />
                <div className="relative mx-auto aspect-[10/9] w-full max-w-sm">
                  <Image
                    src="/assets/logo-light.png"
                    alt="شعار شُهرة — SHOHRA Marketing Agency"
                    fill
                    sizes="(max-width: 1024px) 80vw, 380px"
                    className="object-contain p-4 drop-shadow-[0_18px_45px_rgba(63,201,212,0.18)]"
                    priority={false}
                  />
                </div>
                <p className="relative mt-6 text-center font-latin text-[10px] font-semibold tracking-[0.4em] text-[#f08020]" dir="ltr">
                  JEDDAH · KSA — EST. MARKETING EXCELLENCE
                </p>
              </div>

              {/* vision 2030 floating card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="glass-strong animate-floaty absolute -bottom-8 end-4 flex max-w-[260px] items-center gap-3 rounded-2xl p-4 sm:-end-6"
                style={{ ["--rot" as never]: "1.5deg" }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f08020] to-[#e85f22] text-[#140c05]">
                  <Users className="h-5 w-5" />
                </span>
                <p className="text-[12.5px] font-medium leading-5 text-white/90">{tx(T.about.align)}</p>
              </motion.div>
            </div>
          </Reveal>

          {/* ---------- copy side ---------- */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase section-kicker text-[#7adfe8]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f08020]" />
                {tx(T.about.kicker)}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-5 text-balance text-3xl font-bold leading-[1.4] text-white sm:text-[2.35rem]">
                {tx(T.about.title)}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-pretty text-[15px] leading-9 text-[#a7bcc2]">{tx(T.about.p1)}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-4 text-pretty text-[15px] leading-9 text-[#a7bcc2]">{tx(T.about.p2)}</p>
            </Reveal>

            {/* pillars */}
            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {T.about.pillars.map((p, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <Reveal key={p.title.en} delay={0.1 + i * 0.08}>
                    <div className="glass glow-card h-full rounded-2xl p-5">
                      <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#123f4a] text-[#3fc9d4]">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <h3 className="font-display text-[15px] font-bold text-white">{tx(p.title)}</h3>
                      <p className="mt-1.5 text-[12.5px] leading-6 text-[#8fa9b0]">{tx(p.desc)}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
