"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function SettingsPage(): ReactNode {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="content">
      <h2>Theme</h2>

      <form>
        <div className="settings-radio">
          <label>
            <input
              checked={theme === "system"}
              name="system"
              onChange={() => setTheme("system")}
              type="radio"
              value="system"
            />
            System theme
          </label>
        </div>

        <div className="settings-radio">
          <label>
            <input
              checked={theme === "light"}
              name="light"
              onChange={() => setTheme("light")}
              type="radio"
              value="light"
            />
            Light theme
          </label>
        </div>

        <div className="settings-radio">
          <label>
            <input
              checked={theme === "dark"}
              name="dark"
              onChange={() => setTheme("dark")}
              type="radio"
              value="dark"
            />
            Dark theme
          </label>
        </div>
      </form>
    </div>
  );
}
