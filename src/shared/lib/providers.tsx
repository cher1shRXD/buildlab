"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { getQueryClient } from "./query-client";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors closeButton position="bottom-right" />
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
