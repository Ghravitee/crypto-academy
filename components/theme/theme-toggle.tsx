"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "crypto-academy-theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  root.classList.toggle("dark", resolvedTheme === "dark");

  root.dataset.theme = resolvedTheme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;

    const initialTheme: Theme =
      storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
        ? storedTheme
        : "system";

    setTheme(initialTheme);
    applyTheme(initialTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      const currentTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;

      if (currentTheme === "system" || !currentTheme) {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    localStorage.setItem(STORAGE_KEY, nextTheme);

    applyTheme(nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-border
        bg-paper-dim
        text-slate
        transition
        duration-300
        hover:border-primary/30
        hover:bg-primary/8
        hover:text-primary
      "
    >
      <Sun
        size={17}
        strokeWidth={1.7}
        className={`
          absolute
          transition-all
          duration-300
          ${
            isDark
              ? "scale-50 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }
        `}
      />

      <Moon
        size={17}
        strokeWidth={1.7}
        className={`
          absolute
          transition-all
          duration-300
          ${
            isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-50 -rotate-90 opacity-0"
          }
        `}
      />
    </button>
  );
}
