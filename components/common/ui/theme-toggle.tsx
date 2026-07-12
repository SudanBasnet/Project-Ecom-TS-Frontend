"use client";

import { ThemeContext } from "@/providers/theme.provider";
import { motion } from "framer-motion";
import { useContext } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-amber-300"
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <FiSun className="size-4" /> : <FiMoon className="size-4" />}
      </motion.span>
    </button>
  );
};

export default ThemeToggle;
