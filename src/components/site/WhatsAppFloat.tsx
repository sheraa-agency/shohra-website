"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang";
import { waLink, WA_MESSAGES } from "@/lib/site-data";

export default function WhatsAppFloat() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          href={waLink(WA_MESSAGES.consult[lang])}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp — SHOHRA"
          className="wa-pulse fixed bottom-5 start-5 z-[85] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25d366] to-[#128c4b] text-white shadow-[0_14px_36px_-8px_rgba(37,211,102,0.6)] transition hover:brightness-110"
        >
          <MessageCircle className="h-6.5 w-6.5" strokeWidth={1.9} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
