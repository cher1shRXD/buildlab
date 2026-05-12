"use client"

import { cn } from "@/shared/lib/utils"
import { Select as SelectPrimitive } from "@base-ui/react/select"

interface SelectGroupProps extends SelectPrimitive.Group.Props {}

export const SelectGroup = ({ className, ...props }: SelectGroupProps) => {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}
