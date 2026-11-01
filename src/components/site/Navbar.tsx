"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/site-data";

const LINKS = [
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#work", key: "work" },
  { href: "#results", key: "results" },
  { href: "#testimonials", key: "testimonials" },
] as const;

export default function Navbar() {
  const { tx, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)]" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
          {/* logo */}
          <a href="#top" className="flex items-center gap-3" aria-label="SHOHRA">
            <span className="relative h-11 w-11 overflow-hidden rounded-xl bg-[#0a222c] ring-1 ring-white/10">
              <Image src="/assets/logo-light.png" alt="شُهرة — SHOHRA" fill sizes="44px" className="object-cover p-1" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-lg font-bold text-white">شُهرة</span>
              <span className="font-latin text-[9px] font-semibold tracking-[0.32em] text-[#f08020]">MARKETING AGENCY</span>
            </span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.key}>
                <a
                  href={l.href}
                  className="group relative text-[13.5px] font-medium text-[#aebfc5] transition hover:text-white"
                >
                  {tx(T.nav[l.key])}
                  <span className="absolute -bottom-1.5 start-0 h-px w-0 bg-gradient-to-l from-[#3fc9d4] to-[#f08020] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* language switcher */}
            <button
              onClick={toggle}
              className="glass flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold text-[#bfe9ee] transition hover:border-[#3fc9d4]/50 hover:text-white"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4 text-[#3fc9d4]" />
              <span className="font-latin">{tx(T.lang.switch)}</span>
            </button>

            {/* CTA */}
            <a
              href="#contact"
              className="hidden h-10 items-center rounded-full bg-gradient-to-l from-[#f08020] to-[#e85f22] px-5 text-[13.5px] font-bold text-[#140c05] shadow-[0_8px_28px_-8px_rgba(240,128,32,0.65)] transition hover:brightness-110 md:inline-flex"
            >
              {tx(T.nav.contact)}
            </a>

            {/* mobile toggle */}
            <button
              onClick={() => setOpen(true)}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
              aria-label={tx(T.nav.menu)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
        <div className={`shimmer-line h-px w-full transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#050e14]/96 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <span className="flex items-center gap-3">
                <span className="relative h-10 w-10 overflow-hidden rounded-xl bg-[#0a222c] ring-1 ring-white/10">
                  <Image src="/assets/logo-light.png" alt="شُهرة" fill sizes="40px" className="object-cover p-1" />
                </span>
                <span className="font-display font-bold text-white">شُهرة</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-white"
                aria-label={tx(T.nav.close)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-6 flex flex-col gap-2 px-6">
              {[...LINKS, { href: "#contact", key: "contact" as const }].map((l, i) => (
                <motion.li
                  key={l.key}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display flex items-center justify-between border-b border-white/5 py-4 text-2xl font-semibold text-white/90 transition hover:text-[#3fc9d4]"
                  >
                    {tx(T.nav[l.key])}
                    <span className="font-latin text-xs text-[#f08020]">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="absolute inset-x-0 bottom-8 text-center text-xs text-[#5d7680]">
              SHOHRA · Jeddah — KSA & GCC
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
