"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, MessageCircle, MapPin, Globe, Instagram, ExternalLink, Clock, ShieldCheck, FileText, Maximize2 } from "lucide-react";
import { useLang } from "@/lib/lang";
import { T, CONTACT, CREDENTIALS, SERVICES, waLink, WA_MESSAGES } from "@/lib/site-data";
import Lightbox, { type LightboxItem } from "./Lightbox";

export default function Footer() {
  const { tx, lang } = useLang();
  const year = 2026;
  const [certIdx, setCertIdx] = useState<number | null>(null);

  const certItem: LightboxItem = {
    src: CREDENTIALS.crImage,
    title: lang === "ar" ? "شهادة السجل التجاري — وزارة التجارة" : "Commercial Registration Certificate — Ministry of Commerce",
    caption: tx(CREDENTIALS.legalName),
    w: CREDENTIALS.crImageW,
    h: CREDENTIALS.crImageH,
  };

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

        {/* official credentials — verified CR with certificate preview */}
        <div className="mt-14">
          <div className="flex items-center gap-4">
            <span className="font-display inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#7adfe8]">
              <ShieldCheck className="h-4 w-4 text-[#3fc9d4]" />
              {tx(T.footer.credentialsTitle)}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="glass glow-card relative mt-5 overflow-hidden rounded-3xl p-6 sm:p-7">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              {/* Ministry of Commerce logo */}
              <span className="flex h-[56px] shrink-0 items-center rounded-2xl bg-white px-4 ring-1 ring-white/20">
                <Image src={CREDENTIALS.mcLogo} alt="وزارة التجارة — Ministry of Commerce" width={132} height={57} className="h-10 w-auto" />
              </span>

              {/* CR info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="font-display text-[15px] font-bold text-white">{tx(T.footer.crBadge)}</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25d366]/10 px-2.5 py-1 text-[10px] font-semibold text-[#25d366] ring-1 ring-[#25d366]/25">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25d366]" />
                    {tx(CREDENTIALS.status)}
                  </span>
                </div>
                <p className="font-latin mt-2 text-[22px] font-bold tracking-[0.08em] text-[#7adfe8]" dir="ltr">
                  {CREDENTIALS.crNumber}
                </p>
                <p className="mt-1.5 text-[12px] leading-6 text-[#8fa9b0]">{tx(CREDENTIALS.legalName)}</p>
                <a
                  href={CREDENTIALS.crPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] text-[#8fa9b0] transition hover:text-white"
                >
                  <FileText className="h-3.5 w-3.5" />
                  {tx(T.footer.viewCertificate)} — PDF
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </div>

              {/* certificate thumbnail — click to enlarge */}
              <button
                type="button"
                onClick={() => setCertIdx(0)}
                aria-label={tx(T.footer.viewCertificate)}
                className="group relative shrink-0 self-center overflow-hidden rounded-xl ring-1 ring-white/15 transition hover:ring-[#f08020]/70 sm:self-auto"
              >
                <Image
                  src={CREDENTIALS.crImage}
                  alt={lang === "ar" ? "شهادة السجل التجاري" : "Commercial Registration certificate"}
                  width={190}
                  height={134}
                  className="h-auto w-[190px] transition duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-[#030a0e]/0 text-white opacity-0 transition duration-300 group-hover:bg-[#030a0e]/55 group-hover:opacity-100">
                  <Maximize2 className="h-6 w-6 drop-shadow" />
                </span>
              </button>
            </div>
          </div>

          <Lightbox items={[certItem]} index={certIdx} onClose={() => setCertIdx(null)} onNavigate={setCertIdx} />
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-7 sm:flex-row">
          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <p className="text-[12px] text-[#5d7680]">
              © {year} {tx(CREDENTIALS.legalName)} — {tx(T.footer.rights)}
            </p>
            <p className="font-latin flex items-center gap-1.5 text-[11px] text-[#4e646d]" dir="ltr">
              <ShieldCheck className="h-3 w-3 text-[#3fc9d4]/70" />
              CR {CREDENTIALS.crNumber}
            </p>
          </div>
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

