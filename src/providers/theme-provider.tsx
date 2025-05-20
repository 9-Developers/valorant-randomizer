"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";

export default function Provider({
  children,
}: Readonly<{ children: ReactNode }>): ReactNode {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  } else {
    return <ThemeProvider>{children}</ThemeProvider>;
  }
}
