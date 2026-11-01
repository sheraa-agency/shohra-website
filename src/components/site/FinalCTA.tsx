"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Clock, MapPin } from "lucide-react";
import { Magnetic, Reveal } from "./ui-bits";
import { useLang } from "@/lib/lang";
import { T, CONTACT, waLink, WA_MESSAGES } from "@/lib/site-data";

export default function FinalCTA() {
  const { tx, lang } = useLang();

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[2.2rem] px-6 py-16 text-center sm:px-14">
            {/* glow decor */}
            <div className="absolute inset-0 bg-[radial-gradient(620px_300px_at_50%_-10%,rgba(240,128,32,0.14),transparent_65%),radial-gradient(520px_280px_at_85%_110%,rgba(18,63,74,0.6),transparent_60%)]" />
            <div className="shimmer-line absolute inset-x-0 top-0 h-px" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#25d366] to-[#128c4b] text-white shadow-[0_16px_44px_-10px_rgba(37,211,102,0.55)]"
            >
              <MessageCircle className="h-8 w-8" strokeWidth={1.8} />
            </motion.div>

            <h2 className="font-display relative text-balance text-3xl font-extrabold leading-[1.45] text-white sm:text-4xl">
              {tx(T.cta.title)}
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-9 text-[#9fb6bd]">
              {tx(T.cta.sub)}
            </p>

            <div className="relative mt-9 flex flex-col items-center gap-4">
              <Magnetic strength={0.3}>
                <motion.a
                  href={waLink(WA_MESSAGES.growth[lang])}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex h-15 items-center gap-3 rounded-full bg-gradient-to-l from-[#f08020] to-[#e85f22] px-9 py-4 text-base font-extrabold text-[#140c05] shadow-[0_18px_54px_-12px_rgba(240,128,32,0.65)] transition hover:brightness-110"
                >
                  <MessageCircle className="h-5 w-5" />
                  {tx(T.cta.button)}
                </motion.a>
              </Magnetic>

              <p className="text-[12px] text-[#6d868e]">{tx(T.cta.note)}</p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[#8fa9b0]">
                <span className="inline-flex items-center gap-1.5" dir="ltr">
                  <MessageCircle className="h-3.5 w-3.5 text-[#25d366]" />
                  {CONTACT.whatsappDisplay}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#3fc9d4]" />
                  {tx(CONTACT.hours)}
                </span>
                <a
                  href={CONTACT.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition hover:text-white"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#f08020]" />
                  {tx(CONTACT.city)}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
