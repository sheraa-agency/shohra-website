"use client";

import React, { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import type { Lang } from "./site-data";
import { T } from "./site-data";

/* ------------------------------------------------------------------
   Language store — localStorage-backed via useSyncExternalStore.
   SSR/hydration always renders Arabic first (matches <html lang="ar">),
   then swaps to the stored preference after mount, without mismatch.
------------------------------------------------------------------- */

const LANG_EVENT = "shohra-lang-change";

function subscribe(callback: () => void) {
  window.addEventListener(LANG_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LANG_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Lang {
  const v = window.localStorage.getItem("shohra-lang");
  return v === "en" ? "en" : "ar";
}

function getServerSnapshot(): Lang {
  return "ar";
}

interface LangCtx {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** pick bilingual string */
  tx: <T2 extends { ar: string; en: string }>(v: T2) => string;
}

const Ctx = createContext<LangCtx>({
  lang: "ar",
  dir: "rtl",
  setLang: () => {},
  toggle: () => {},
  tx: (v) => v.ar,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    if (l === getSnapshot()) return;
    window.localStorage.setItem("shohra-lang", l);
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);

  const toggle = useCallback(() => {
    setLang(getSnapshot() === "ar" ? "en" : "ar");
  }, [setLang]);

  const tx = useCallback(<T2 extends { ar: string; en: string }>(v: T2) => v[lang], [lang]);

  return (
    <Ctx.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, toggle, tx: tx as LangCtx["tx"] }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
export { T };
