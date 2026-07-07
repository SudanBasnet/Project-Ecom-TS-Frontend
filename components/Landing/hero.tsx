"use client";

import { useGSAP } from "@gsap/react";
import { animated, useSpring } from "@react-spring/web";
import gsap from "gsap";
import Lottie from "lottie-react";
import { animate } from "motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP);

const sparkleAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 160,
  h: 160,
  nm: "Shopping sparkle",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Sparkle",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [35] }, { t: 30, s: [100] }, { t: 60, s: [35] }] },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [180] }] },
        p: { a: 0, k: [80, 80, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [82, 82, 100] }, { t: 30, s: [115, 115, 100] }, { t: 60, s: [82, 82, 100] }] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sr",
              sy: 1,
              d: 1,
              pt: { a: 0, k: 4 },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 45 },
              or: { a: 0, k: 38 },
              os: { a: 0, k: 0 },
              ir: { a: 0, k: 10 },
              is: { a: 0, k: 0 },
            },
            { ty: "fl", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
};

const Hero = () => {
  const scope = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [buttonSpring, buttonApi] = useSpring(() => ({
    scale: 1,
    y: 0,
    config: { tension: 260, friction: 18 },
  }));

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      gsap.from("[data-hero-item]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
      });
    },
    { scope },
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    if (!glowRef.current) return;

    const controls = animate(
      glowRef.current,
      { opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] },
      { duration: 5, repeat: Infinity, ease: "easeInOut" },
    );

    return () => controls.stop();
  }, []);

  return (
    <section
      ref={scope}
      className="relative isolate mt-4 min-h-[78vh] overflow-hidden px-6 py-20 text-white sm:py-28"
    >
      <video
        className="absolute inset-0 -z-20 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-slate-950/65" />
      <div
        ref={glowRef}
        className="absolute right-[-8rem] top-10 -z-10 size-80 rounded-full bg-indigo-400/40 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p
            data-hero-item
            className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-200"
          >
            New season collection
          </p>
          <h1
            data-hero-item
            className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl"
          >
            Come here for the best.
          </h1>
          <p
            data-hero-item
            className="mt-6 max-w-xl text-lg leading-8 text-slate-200"
          >
            Browse useful products, featured categories, and new arrivals from
            your connected backend catalogue.
          </p>
          <animated.div
            data-hero-item
            className="mt-8 inline-flex"
            style={buttonSpring}
            onMouseEnter={() => buttonApi.start({ scale: 1.04, y: -2 })}
            onMouseLeave={() => buttonApi.start({ scale: 1, y: 0 })}
            onMouseDown={() => buttonApi.start({ scale: 0.98, y: 0 })}
            onMouseUp={() => buttonApi.start({ scale: 1.04, y: -2 })}
          >
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-indigo-700 shadow-xl shadow-black/20 transition hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Shop Now
            </Link>
          </animated.div>
        </div>

        <div
          data-hero-item
          className="hidden justify-self-end rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-md lg:block"
        >
          <Lottie
            animationData={sparkleAnimation}
            loop
            className="mx-auto size-32"
            aria-hidden="true"
          />
          <p className="mt-4 max-w-xs text-center text-sm font-semibold leading-6 text-indigo-100">
            Fresh picks, polished details, and a smoother browsing flow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
