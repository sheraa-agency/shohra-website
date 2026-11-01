"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate, type HTMLMotionProps } from "framer-motion";
import { useLang } from "@/lib/lang";

/* ---------------- Custom cursor + ambient light ---------------- */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    // elements are hidden on touch via CSS; JS drives them only on fine pointers
    document.body.classList.add("cursor-enabled");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const light = { x: -100, y: -100 };
    let hovering = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      const el = e.target as HTMLElement | null;
      hovering = !!el?.closest("a, button, [role='button'], input, [data-cursor]");
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      light.x += (pos.x - light.x) * 0.06;
      light.y += (pos.y - light.y) * 0.06;
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${hovering ? 1.9 : 1})`;
        ringRef.current.style.borderColor = hovering ? "rgba(240,128,32,0.85)" : "rgba(63,201,212,0.6)";
      }
      if (lightRef.current) lightRef.current.style.transform = `translate(${light.x}px, ${light.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    // hide the native DOM nodes until first move so they don't flash at 0,0
    const hide = () => {
      for (const r of [dotRef, ringRef, lightRef]) {
        if (r.current) r.current.style.opacity = "0";
      }
    };
    hide();
    const reveal = (e: PointerEvent) => {
      for (const r of [dotRef, ringRef, lightRef]) {
        if (r.current) r.current.style.opacity = "1";
      }
      window.removeEventListener("pointermove", reveal);
    };
    window.addEventListener("pointermove", reveal, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("cursor-enabled");
    };
  }, []);

  return (
    <>
      <div
        ref={lightRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-[560px] w-[560px] rounded-full"
        style={{
          opacity: 0,
          background:
            "radial-gradient(circle, rgba(63,201,212,0.07) 0%, rgba(240,128,32,0.035) 35%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />
      <div ref={ringRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9 rounded-full border opacity-0 transition-[border-color] duration-200" />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] h-1.5 w-1.5 rounded-full bg-[#f08020]"
        style={{ opacity: 0, boxShadow: "0 0 10px rgba(240,128,32,0.9)" }}
      />
    </>
  );
}

/* ---------------- Magnetic wrapper ---------------- */
export function Magnetic({ children, strength = 0.25, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------------- Scroll reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  ...rest
}: { children: React.ReactNode; delay?: number; y?: number; className?: string; once?: boolean } & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHeading({ kicker, title, sub, align = "center" }: { kicker: string; title: string; sub?: string; align?: "center" | "start" }) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <div className={`flex flex-col ${alignCls} gap-4`}>
      <Reveal>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium text-[#7adfe8] section-kicker uppercase">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f08020]" />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-balance text-3xl font-bold leading-[1.35] text-white sm:text-4xl lg:text-[2.6rem]">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-pretty text-[15px] leading-8 text-[#8fa9b0]">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Animated counter ---------------- */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  const { lang } = useLang();

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted = val.toLocaleString(lang === "ar" ? "en-US" : "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="font-latin tabular-nums" dir="ltr">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ---------------- 3D tilt card ---------------- */
export function TiltCard({ children, className, max = 9 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
