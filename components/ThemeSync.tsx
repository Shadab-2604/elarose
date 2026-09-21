"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeSync({ theme }: { theme?: string }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  return null;
}
