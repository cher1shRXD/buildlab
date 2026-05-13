"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

interface TooltipProviderProps extends TooltipPrimitive.Provider.Props {}

export const TooltipProvider = ({
  delay = 0,
  ...props
}: TooltipProviderProps) => {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}
