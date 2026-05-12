"use client"

import { cn } from "@/shared/lib/utils"
import { Select as SelectPrimitive } from "@base-ui/react/select"

interface SelectLabelProps extends SelectPrimitive.GroupLabel.Props {}

export const SelectLabel = ({
  className,
  ...props
}: SelectLabelProps) => {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}
