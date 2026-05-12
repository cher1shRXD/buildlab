"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

interface TooltipTriggerProps extends TooltipPrimitive.Trigger.Props {}

export const TooltipTrigger = ({ ...props }: TooltipTriggerProps) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}
