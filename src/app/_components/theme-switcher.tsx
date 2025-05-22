"use client";

import { useTheme } from "next-themes";
import { type ChangeEvent, type ReactNode, useEffect, useState } from "react";

export default function ThemeSwitcher(): ReactNode {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  function saveTheme(event: ChangeEvent<HTMLInputElement>) {
    const theme: string = event.currentTarget.value;

    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    const savedTheme: string | null = localStorage.getItem("theme");

    if (savedTheme !== null) {
      setTheme(savedTheme);
    }

    setMounted(true);
  }, [setTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <form className="theme-settings">
      <input
        checked={theme === "system"}
        id="theme-system"
        name="system"
        onChange={saveTheme}
        type="radio"
        value="system"
      />
      <label htmlFor="theme-system">System</label>

      <input
        checked={theme === "light"}
        id="theme-light"
        name="light"
        onChange={saveTheme}
        type="radio"
        value="light"
      />
      <label htmlFor="theme-light">
        <i>
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7-.7.7m0 11.4.7.7m-12.1-.7-.7.7M8 12a4 4 0 1 0 0-.001Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </i>
        Light
      </label>

      <input
        checked={theme === "dark"}
        id="theme-dark"
        name="dark"
        onChange={saveTheme}
        type="radio"
        value="dark"
      />
      <label htmlFor="theme-dark">
        <i>
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.137 4.007A6.6 6.6 0 0 0 19 15.07a7.8 8 0 1 1-6.863-11.063Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </i>
        Dark
      </label>
    </form>
  );
}
