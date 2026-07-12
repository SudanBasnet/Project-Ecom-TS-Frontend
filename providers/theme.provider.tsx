"use client";

import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
export const ThemeContext = createContext({
  theme: "light" as Theme,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("broadway-theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    return saved ?? preferred;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("broadway-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () =>
          setTheme((current) => (current === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
