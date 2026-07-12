"use client";

import { animated, useSpring } from "@react-spring/web";
import { motion, useReducedMotion } from "framer-motion";
import Lottie from "lottie-react";
import { animate as animateElement } from "motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

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
  const glowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [buttonSpring, buttonApi] = useSpring(() => ({
    scale: 1,
    y: 0,
    config: { tension: 260, friction: 18 },
  }));

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (!glowRef.current) return;

    const controls = animateElement(
      glowRef.current,
      { opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] },
      { duration: 5, repeat: Infinity, ease: "easeInOut" },
    );

    return () => controls.stop();
  }, [shouldReduceMotion]);

  const itemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section
      className="relative isolate mt-4 min-h-[78vh] overflow-hidden px-6 py-20 text-white sm:py-28"
    >
      <motion.video
        className="absolute inset-0 -z-20 size-full object-cover"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 -z-10 bg-slate-950/65" />
      <div
        ref={glowRef}
        className="absolute right-[-8rem] top-10 -z-10 size-80 rounded-full bg-indigo-400/40 blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: shouldReduceMotion
              ? { staggerChildren: 0 }
              : { delayChildren: 0.15, staggerChildren: 0.1 },
          },
        }}
        className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-200"
          >
            New season collection
          </motion.p>
          <motion.h1
            variants={itemVariants}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl"
          >
            Come here for the best.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-200"
          >
            Browse useful products, featured categories, and new arrivals from
            your connected backend catalogue.
          </motion.p>
          <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
            <animated.div
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
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
