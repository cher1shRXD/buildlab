"use client"

import { cn } from "@/shared/lib/utils"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

interface DialogOverlayProps extends DialogPrimitive.Backdrop.Props {}

export const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}
