"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MessageCircle, MapPin, Globe, Instagram, ExternalLink, Clock } from "lucide-react";
import { useLang } from "@/lib/lang";
import { T, CONTACT, SERVICES, waLink, WA_MESSAGES } from "@/lib/site-data";

export default function Footer() {
  const { tx, lang } = useLang();
  const year = 2026;

  return (
    <footer className="relative mt-auto border-t border-white/5 bg-[#040d12]/80 pb-8 pt-16 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-xl bg-[#0a222c] ring-1 ring-white/10">
                <Image src="/assets/logo-light.png" alt="شُهرة — SHOHRA" fill sizes="48px" className="object-cover p-1" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-xl font-bold text-white">شُهرة</span>
                <span className="font-latin text-[9px] font-semibold tracking-[0.3em] text-[#f08020]">MARKETING AGENCY</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[13px] leading-7 text-[#8fa9b0]">{tx(T.footer.desc)}</p>
            <p className="mt-4 text-[11.5px] leading-6 text-[#5d7680]">{tx(T.footer.sources)}</p>
          </div>

          {/* services */}
          <nav aria-label={tx(T.footer.servicesTitle)}>
            <h3 className="font-display text-[13px] font-bold uppercase tracking-wider text-[#7adfe8]">{tx(T.footer.servicesTitle)}</h3>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-[13px] text-[#a7bcc2] transition hover:text-white">
                    {tx(s.title)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* work */}
          <nav aria-label={tx(T.footer.workTitle)}>
            <h3 className="font-display text-[13px] font-bold uppercase tracking-wider text-[#7adfe8]">{tx(T.footer.workTitle)}</h3>
            <ul className="mt-5 space-y-2.5">
              <li><a href="#trust" className="text-[13px] text-[#a7bcc2] transition hover:text-white">{tx(T.stats.kicker)}</a></li>
              <li><a href="#work" className="text-[13px] text-[#a7bcc2] transition hover:text-white">{tx(T.portfolio.kicker)}</a></li>
              <li><a href="#results" className="text-[13px] text-[#a7bcc2] transition hover:text-white">{tx(T.results.kicker)}</a></li>
              <li><a href="#testimonials" className="text-[13px] text-[#a7bcc2] transition hover:text-white">{tx(T.testimonials.kicker)}</a></li>
              <li><a href="#process" className="text-[13px] text-[#a7bcc2] transition hover:text-white">{tx(T.process.kicker)}</a></li>
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="font-display text-[13px] font-bold uppercase tracking-wider text-[#7adfe8]">{tx(T.footer.contactTitle)}</h3>
            <ul className="mt-5 space-y-3.5 text-[13px] text-[#a7bcc2]">
              <li>
                <a href={waLink(WA_MESSAGES.consult[lang])} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-white" dir="ltr">
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#25d366]" />
                  <span className="font-latin">{CONTACT.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 transition hover:text-white" dir="ltr">
                  <Phone className="h-4 w-4 shrink-0 text-[#3fc9d4]" />
                  <span className="font-latin">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 transition hover:text-white" dir="ltr">
                  <Mail className="h-4 w-4 shrink-0 text-[#f08020]" />
                  <span className="font-latin">{CONTACT.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#3fc9d4]" />
                {tx(CONTACT.hours)}
              </li>
              <li>
                <a href={CONTACT.maps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-white">
                  <MapPin className="h-4 w-4 shrink-0 text-[#f08020]" />
                  {tx(CONTACT.city)}
                </a>
              </li>
            </ul>

            {/* socials */}
            <h3 className="font-display mt-7 text-[13px] font-bold uppercase tracking-wider text-[#7adfe8]">{tx(T.footer.follow)}</h3>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tx(T.footer.officialSite)}
                title={tx(T.footer.officialSite)}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-[#a7bcc2] transition hover:border-[#f08020]/50 hover:text-white"
              >
                <Globe className="h-4.5 w-4.5" />
              </a>
              <a
                href={CONTACT.linktree}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linktree"
                title="Linktree — shohramarketing1"
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-[#a7bcc2] transition hover:border-[#3fc9d4]/50 hover:text-white"
              >
                <LinkIcon />
              </a>
              <a
                href="https://www.instagram.com/shohramarketing1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram — shohramarketing1"
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-[#a7bcc2] transition hover:border-[#f08020]/50 hover:text-white"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-7 sm:flex-row">
          <p className="text-[12px] text-[#5d7680]">
            © {year} {tx(T.footer.rights)} — SHOHRA · {tx(CONTACT.city)}
          </p>
          <a
            href={CONTACT.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#8fa9b0] transition hover:text-white"
          >
            shohrah.com
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.3 7.06-4.06 8.9c-.2.45-.62.74-1.12.74h-.03c-.5 0-.94-.3-1.13-.76l-1.4-3.4a.9.9 0 0 0-.5-.5l-3.4-1.4a1.22 1.22 0 0 1-.76-1.13c0-.5.3-.94.75-1.13l8.9-4.05c.4-.19.88-.1 1.2.22.32.32.4.8.22 1.2l-1.67 3.3Z" />
    </svg>
  );
}

