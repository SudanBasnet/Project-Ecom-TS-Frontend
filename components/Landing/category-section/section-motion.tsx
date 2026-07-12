"use client";

import { motion, useReducedMotion } from "framer-motion";

type CategorySectionMotionProps = Readonly<{
  children: React.ReactNode;
}>;

const CategorySectionMotion = ({ children }: CategorySectionMotionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default CategorySectionMotion;
