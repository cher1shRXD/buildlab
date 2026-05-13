"use client"

import { cn } from "@/shared/lib/utils"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { ChevronDownIcon } from "lucide-react"
import { ComponentProps } from "react"

interface SelectScrollDownButtonProps extends ComponentProps<typeof SelectPrimitive.ScrollDownArrow> {}

export const SelectScrollDownButton = ({
  className,
  ...props
}: SelectScrollDownButtonProps) => {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  )
}
