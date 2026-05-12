"use client"

import { cn } from "@/shared/lib/utils"
import { Select as SelectPrimitive } from "@base-ui/react/select"

interface SelectValueProps extends SelectPrimitive.Value.Props {}

export const SelectValue = ({ className, ...props }: SelectValueProps) => {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}
