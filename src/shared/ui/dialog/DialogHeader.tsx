import { ComponentProps } from "react"
import { cn } from "@/shared/lib/utils"

interface DialogHeaderProps extends ComponentProps<"div"> {}

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}
