"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type PageTransitionProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

const PageTransition = ({ children, className }: PageTransitionProps) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, shouldReduceMotion]);

  return (
    <motion.div
      key={pathname}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
