"use client"

import { cn } from "@/shared/lib/utils"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

interface DialogTitleProps extends DialogPrimitive.Title.Props {}

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base leading-none font-medium", className)}
      {...props}
    />
  )
}
