"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/site-data";

export interface LightboxItem {
  src: string;
  title?: string;
  caption?: string;
}

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const { tx } = useLang();
  const open = index !== null && index >= 0 && index < items.length;

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        // RTL: right arrow goes to previous visually
        if (document.documentElement.dir === "rtl") prev();
        else next();
      }
      if (e.key === "ArrowLeft") {
        if (document.documentElement.dir === "rtl") next();
        else prev();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, next, prev]);

  const item = open && index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#030a0e]/92 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 sm:px-8">
            <span className="font-latin text-sm text-[#7adfe8] tabular-nums" dir="ltr">
              {index! + 1} / {items.length}
            </span>
            <button
              onClick={onClose}
              aria-label={tx(T.lightbox.close)}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition hover:border-[#f08020]/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* image */}
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[76vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-strong overflow-hidden rounded-2xl p-2 sm:p-3">
              <div className="relative h-[52vh] w-full sm:h-[64vh]">
                <Image
                  src={item.src}
                  alt={item.title || "SHOHRA"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
              {(item.title || item.caption) && (
                <div className="px-3 pb-2 pt-3 text-center">
                  {item.title && <p className="font-display text-sm font-semibold text-white">{item.title}</p>}
                  {item.caption && <p className="mt-1 text-xs text-[#8fa9b0]">{item.caption}</p>}
                </div>
              )}
            </div>
          </motion.div>

          {/* nav arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label={tx(T.testimonials.next)}
                className="glass absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/85 transition hover:border-[#3fc9d4]/60 hover:text-white sm:left-6"
              >
                <ChevronLeft className="h-5 w-5 rtl:hidden" />
                <ChevronRight className="hidden h-5 w-5 rtl:block" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label={tx(T.testimonials.prev)}
                className="glass absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/85 transition hover:border-[#3fc9d4]/60 hover:text-white sm:right-6"
              >
                <ChevronRight className="h-5 w-5 rtl:hidden" />
                <ChevronLeft className="hidden h-5 w-5 rtl:block" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
