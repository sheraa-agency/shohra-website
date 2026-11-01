"use client";

import React, { useEffect, useRef } from "react";

/* ------------------------------------------------------------------
   SHOHRA interactive background
   - deep gradient base (CSS) + canvas particle constellation
   - mouse light field + node attraction/repulsion
   - 3 depth layers with parallax + floating geometry + grid
   - 60fps rAF, DPR capped, adaptive density, tab-hidden pause,
     reduced-motion static fallback, lighter on mobile
------------------------------------------------------------------- */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number; // 0..1 — parallax depth
  hue: "teal" | "orange";
  tw: number; // twinkle phase
}

interface Geo {
  x: number;
  y: number;
  size: number;
  rot: number;
  vr: number;
  depth: number;
  sides: number; // 4 = diamond, 6 = hexagon, 0 = ring
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let geos: Geo[] = [];
    let raf = 0;
    let running = true;
    let t = 0;

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    let scrollY = window.scrollY;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      const mobile = W < 768;
      const area = W * H;
      const base = mobile ? 34 : Math.min(105, Math.floor(area / 16000));
      nodes = [];
      for (let i = 0; i < base; i++) {
        const depth = 0.25 + Math.random() * 0.75;
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22 * depth,
          vy: (Math.random() - 0.5) * 0.22 * depth,
          r: (0.9 + Math.random() * 1.7) * depth,
          depth,
          hue: Math.random() < 0.14 ? "orange" : "teal",
          tw: Math.random() * Math.PI * 2,
        });
      }
      geos = [];
      const gCount = mobile ? 3 : 6;
      for (let i = 0; i < gCount; i++) {
        geos.push({
          x: Math.random() * W,
          y: Math.random() * H,
          size: 26 + Math.random() * 70,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.0016,
          depth: 0.3 + Math.random() * 0.7,
          sides: [0, 4, 4, 6][Math.floor(Math.random() * 4)],
        });
      }
    };

    /* ---------- drawing helpers ---------- */

    const drawGrid = () => {
      const gap = 72;
      const px = mouse.active ? (mouse.x - W / 2) * 0.012 : 0;
      const py = mouse.active ? (mouse.y - H / 2) * 0.012 : 0;
      const oy = (scrollY * 0.06) % gap;
      ctx.save();
      ctx.strokeStyle = "rgba(63,201,212,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = gap / 2 + px; x < W; x += gap) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = gap / 2 - oy + py; y < H; y += gap) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawGeos = () => {
      ctx.save();
      for (const g of geos) {
        const px = mouse.active ? (mouse.x - W / 2) * 0.02 * g.depth : 0;
        const py = mouse.active ? (mouse.y - H / 2) * 0.02 * g.depth : 0;
        ctx.save();
        ctx.translate(g.x + px, ((g.y + py - scrollY * 0.08 * g.depth) % (H + 200) + H + 200) % (H + 200) - 100);
        ctx.rotate(g.rot);
        ctx.strokeStyle = `rgba(63,201,212,${0.05 + 0.04 * g.depth})`;
        ctx.lineWidth = 1;
        if (g.sides === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, g.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          const sides = g.sides;
          ctx.beginPath();
          for (let i = 0; i <= sides; i++) {
            const a = (i / sides) * Math.PI * 2;
            const x = (Math.cos(a) * g.size) / 2;
            const y = (Math.sin(a) * g.size) / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.restore();
        g.rot += g.vr;
      }
      ctx.restore();
    };

    const drawMouseGlow = () => {
      if (!mouse.active) return;
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
      grad.addColorStop(0, "rgba(63,201,212,0.10)");
      grad.addColorStop(0.45, "rgba(18,63,74,0.10)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = grad;
      ctx.fillRect(mouse.x - 260, mouse.y - 260, 520, 520);
      ctx.restore();
    };

    const step = () => {
      t += 0.016;
      // lerp mouse
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      ctx.clearRect(0, 0, W, H);
      drawGrid();
      drawGeos();

      // links
      const linkDist = W < 768 ? 105 : 135;
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.16;
            const teal = a.hue === "teal" && b.hue === "teal";
            ctx.strokeStyle = teal
              ? `rgba(63,201,212,${alpha})`
              : `rgba(240,128,32,${alpha * 0.9})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // mouse light field behind nodes
      drawMouseGlow();

      // nodes
      for (const n of nodes) {
        // cursor proximity: gentle push away from cursor core
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 170 && d > 0.001) {
            const f = (1 - d / 170) * 0.55;
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        }
        n.x += n.vx;
        n.y += n.vy;
        const wrapPad = 30;
        if (n.x < -wrapPad) n.x = W + wrapPad;
        if (n.x > W + wrapPad) n.x = -wrapPad;
        n.y += -Math.sin(t * 0.6 + n.tw) * 0.02 * n.depth;
        if (n.y < -wrapPad) n.y = H + wrapPad;
        if (n.y > H + wrapPad) n.y = -wrapPad;

        const px = mouse.active ? (mouse.x - W / 2) * 0.03 * n.depth : 0;
        const py = mouse.active ? (mouse.y - H / 2) * 0.03 * n.depth : 0;
        const twinkle = 0.55 + 0.45 * Math.sin(t * 1.4 + n.tw);
        const near = mouse.active ? Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / 200) : 0;
        const alpha = (0.28 + 0.5 * near) * twinkle;

        ctx.beginPath();
        ctx.arc(n.x + px, n.y + py, n.r * (1 + near * 0.9), 0, Math.PI * 2);
        ctx.fillStyle =
          n.hue === "orange"
            ? `rgba(240,128,32,${alpha})`
            : `rgba(63,201,212,${alpha})`;
        ctx.shadowColor = n.hue === "orange" ? "rgba(240,128,32,0.8)" : "rgba(63,201,212,0.8)";
        ctx.shadowBlur = 6 + near * 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const loop = () => {
      if (running) step();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.tx = -9999;
      mouse.ty = -9999;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onVisibility = () => {
      running = !document.hidden;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      step(); // one static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-[#06121a]">
      {/* deep gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 85% -10%, rgba(18,63,74,0.55), transparent 60%)," +
            "radial-gradient(900px 700px at 8% 108%, rgba(15,54,63,0.5), transparent 55%)," +
            "radial-gradient(700px 500px at 50% 40%, rgba(8,28,36,0.6), transparent 70%)," +
            "linear-gradient(180deg, #050e14 0%, #06131a 40%, #051017 100%)",
        }}
      />
      {/* atmospheric glow blobs */}
      <div className="absolute -top-40 right-[12%] h-[480px] w-[480px] rounded-full bg-[#123f4a]/25 blur-[130px]" />
      <div className="absolute bottom-[-160px] left-[6%] h-[420px] w-[420px] rounded-full bg-[#f08020]/[0.07] blur-[120px]" />
      {/* canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* fine noise */}
      <div className="bg-noise absolute inset-0 opacity-[0.05]" />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 60%, rgba(3,9,12,0.55) 100%)" }}
      />
    </div>
  );
}
