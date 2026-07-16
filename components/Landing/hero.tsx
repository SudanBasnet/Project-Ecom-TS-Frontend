"use client";

import type { Product } from "@/api/catalog.api";
import { getCategoryName, getPrice } from "@/api/catalog.api";
import ProductMedia from "@/components/common/ui/product-media";
import { animated, useSpring } from "@react-spring/web";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCheck,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";
import { animate as animateElement } from "motion";

type HeroProps = {
  products: Product[];
};

const Hero = ({ products }: HeroProps) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const featuredProducts = [
    ...products.filter((product) => product.featured),
    ...products.filter((product) => !product.featured),
  ].slice(0, 3);
  const leadProduct = featuredProducts[0];
  const supportingProducts = featuredProducts.slice(1);
  const [buttonSpring, buttonApi] = useSpring(() => ({
    scale: 1,
    y: 0,
    config: { tension: 260, friction: 18 },
  }));

  useEffect(() => {
    if (shouldReduceMotion || !glowRef.current) return;

    const controls = animateElement(
      glowRef.current,
      { opacity: [0.35, 0.7, 0.35], scale: [1, 1.12, 1] },
      { duration: 6, repeat: Infinity, ease: "easeInOut" },
    );

    return () => controls.stop();
  }, [shouldReduceMotion]);

  const itemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 26, filter: "blur(7px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-slate-950 px-6 py-16 text-white sm:py-20 lg:flex lg:items-center">
      <motion.video
        className="absolute inset-0 -z-30 size-full object-cover opacity-50"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(105deg,rgba(2,6,23,0.98)_10%,rgba(2,6,23,0.86)_48%,rgba(15,23,42,0.48)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,rgba(99,102,241,0.3),transparent_32%),radial-gradient(circle_at_20%_90%,rgba(14,165,233,0.18),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div
        ref={glowRef}
        className="absolute -right-32 top-20 -z-10 size-[28rem] rounded-full bg-indigo-500/35 blur-[100px]"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: shouldReduceMotion
              ? { staggerChildren: 0 }
              : { delayChildren: 0.12, staggerChildren: 0.09 },
          },
        }}
        className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10"
      >
        <div className="relative z-10">
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-100 backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            Live from the Broadway edit
          </motion.div>

          <motion.h1
            variants={itemVariants}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl text-[2.75rem] font-black leading-[0.96] tracking-[-0.055em] min-[420px]:text-5xl sm:text-7xl lg:text-[5.4rem]"
          >
            Find the things worth
            <span className="block bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-200 bg-clip-text pb-2 text-transparent">
              <span className="block sm:inline">making room</span>{" "}
              <span className="block sm:inline">for.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
          >
            A sharper way to shop the everyday: considered products, useful
            stories, and new discoveries pulled directly from our live catalogue.
          </motion.p>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <animated.div
              className="w-full sm:w-auto"
              style={buttonSpring}
              onMouseEnter={() => buttonApi.start({ scale: 1.035, y: -2 })}
              onMouseLeave={() => buttonApi.start({ scale: 1, y: 0 })}
              onMouseDown={() => buttonApi.start({ scale: 0.98, y: 0 })}
              onMouseUp={() => buttonApi.start({ scale: 1.035, y: -2 })}
            >
              <Link
                href="/products"
                className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-slate-950 shadow-2xl shadow-black/30 transition hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-auto"
              >
                Shop the collection
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </animated.div>
            <Link
              href="#journal"
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-bold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20 sm:w-auto"
            >
              Read the journal
              <FiArrowDownRight />
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300"
          >
            {[
              "Live catalogue",
              "Curated discoveries",
              "Theme-aware browsing",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-emerald-300/15 text-emerald-200">
                  <FiCheck />
                </span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[36rem] lg:mr-0"
        >
          {leadProduct ? (
            <div className="relative pb-14 pl-4 pr-10 pt-4 sm:pl-10 sm:pr-16">
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, -8, 0], rotate: [0, 0.6, 0] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="group relative z-10 overflow-hidden rounded-[2.25rem] border border-white/15 bg-slate-900/80 p-3 shadow-[0_35px_100px_rgba(2,6,23,.7)] backdrop-blur-xl"
              >
                <Link href={`/products/${leadProduct._id}`}>
                  <div className="relative overflow-hidden rounded-[1.7rem]">
                    <ProductMedia
                      name={leadProduct.name}
                      imageUrl={leadProduct.cover_image?.path}
                      className="aspect-[4/4.3] transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-white/5" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.16em] backdrop-blur">
                      <FiStar className="text-amber-300" /> Featured now
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.17em] text-indigo-200">
                        {getCategoryName(leadProduct.category)}
                      </p>
                      <div className="mt-2 flex items-end justify-between gap-4">
                        <h2 className="max-w-xs text-2xl font-black leading-tight sm:text-3xl">
                          {leadProduct.name}
                        </h2>
                        <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-slate-950">
                          ${getPrice(leadProduct).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {supportingProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { y: index === 0 ? [0, 7, 0] : [0, -6, 0] }
                  }
                  transition={{
                    duration: index === 0 ? 5.2 : 5.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                  className={`absolute z-20 w-44 overflow-hidden rounded-3xl border border-white/20 bg-white/90 p-2 text-slate-950 shadow-2xl backdrop-blur dark:bg-slate-900/90 dark:text-white ${
                    index === 0
                      ? "-bottom-1 left-0 sm:-left-2"
                      : "right-0 top-0 sm:-right-2 sm:top-12"
                  }`}
                >
                  <Link href={`/products/${product._id}`} className="group block">
                    <ProductMedia
                      name={product.name}
                      imageUrl={product.cover_image?.path}
                      className="aspect-[5/3] rounded-[1.15rem] transition duration-500 group-hover:scale-105"
                    />
                    <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-3">
                      <p className="truncate text-xs font-black">{product.name}</p>
                      <FiArrowUpRight className="shrink-0 text-indigo-600" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/8 p-10 text-center shadow-2xl backdrop-blur-xl">
              <div className="mx-auto grid size-24 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 text-white shadow-2xl shadow-indigo-500/30">
                <FiShoppingBag className="size-9" />
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-indigo-200">
                The next edit
              </p>
              <h2 className="mt-3 text-3xl font-black">Being curated now.</h2>
              <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-300">
                Product stories will appear here as soon as the live catalogue is ready.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400 xl:flex">
        <span className="h-px w-10 bg-slate-500" />
        Scroll to discover
        <span className="h-px w-10 bg-slate-500" />
      </div>
    </section>
  );
};

export default Hero;
