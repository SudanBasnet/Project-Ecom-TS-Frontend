"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight, FiBox, FiLayers, FiMoon } from "react-icons/fi";

const promises = [
  {
    eyebrow: "01 / Current",
    title: "A live catalogue",
    description:
      "Products and collection details come from the connected store data, keeping the experience grounded in what is actually available.",
    icon: FiBox,
  },
  {
    eyebrow: "02 / Considered",
    title: "Stories, not shelves",
    description:
      "Useful context, editorial picks, and clearer product details make discovery feel intentional instead of overwhelming.",
    icon: FiLayers,
  },
  {
    eyebrow: "03 / Personal",
    title: "Made for your mode",
    description:
      "A first-class light and dark experience keeps the storefront comfortable from the morning browse to the late-night shortlist.",
    icon: FiMoon,
  },
];

const ExperiencePromises = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white">
      <div className="absolute -left-48 top-0 size-[30rem] rounded-full bg-indigo-500/15 blur-[110px]" />
      <div className="absolute -right-48 bottom-0 size-[28rem] rounded-full bg-sky-500/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300">
              Why Broadway feels different
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
              Built for better browsing.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-300 lg:justify-self-end lg:text-lg lg:leading-8">
            The best storefronts do more than put products in a grid. They make
            the next choice feel easier, clearer, and a little more inspiring.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            visible: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
          }}
          className="grid divide-y divide-white/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
        >
          {promises.map((promise, index) => (
            <motion.article
              key={promise.title}
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0 },
                    }
              }
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`group py-9 lg:py-12 ${index === 0 ? "lg:pr-8" : index === 2 ? "lg:pl-8" : "lg:px-8"}`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-indigo-300">
                  {promise.eyebrow}
                </p>
                <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-indigo-200 transition group-hover:-translate-y-1 group-hover:bg-indigo-500 group-hover:text-white">
                  <promise.icon className="size-5" />
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-black">{promise.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {promise.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-3 flex flex-col justify-between gap-6 rounded-[2rem] border border-indigo-400/20 bg-gradient-to-r from-indigo-500/20 via-sky-500/10 to-emerald-400/10 p-7 backdrop-blur sm:flex-row sm:items-center sm:p-9"
        >
          <div>
            <p className="text-sm font-bold text-indigo-200">Your next favourite may already be here.</p>
            <p className="mt-1 text-2xl font-black sm:text-3xl">Take another look at the collection.</p>
          </div>
          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-indigo-50 sm:self-auto"
          >
            Browse products
            <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperiencePromises;
