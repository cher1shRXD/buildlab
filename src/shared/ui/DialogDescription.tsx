"use client"

import { cn } from "@/shared/lib/utils"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

interface DialogDescriptionProps extends DialogPrimitive.Description.Props {}

export const DialogDescription = ({
  className,
  ...props
}: DialogDescriptionProps) => {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}
