"use client"

import { cn } from "@/shared/lib/utils"
import { Select as SelectPrimitive } from "@base-ui/react/select"

interface SelectSeparatorProps extends SelectPrimitive.Separator.Props {}

export const SelectSeparator = ({
  className,
  ...props
}: SelectSeparatorProps) => {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}
