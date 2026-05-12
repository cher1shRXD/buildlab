"use client";

import type { ComponentProps } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/ui/Button";
import { Sun, Moon } from "lucide-react";

interface Props extends ComponentProps<"button"> {
  className?: string;
}

export const ThemeToggle = ({ className, ...props }: Props) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      {...props}
    >
      <Sun
        size={15}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        size={15}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
};
