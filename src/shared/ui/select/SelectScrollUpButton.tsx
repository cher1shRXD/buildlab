"use client"

import { cn } from "@/shared/lib/utils"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { ChevronUpIcon } from "lucide-react"
import { ComponentProps } from "react"

interface SelectScrollUpButtonProps extends ComponentProps<typeof SelectPrimitive.ScrollUpArrow> {}

export const SelectScrollUpButton = ({
  className,
  ...props
}: SelectScrollUpButtonProps) => {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}
