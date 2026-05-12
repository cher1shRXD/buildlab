"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

interface TooltipPortalProps extends TooltipPrimitive.Portal.Props {}

export const TooltipPortal = ({ ...props }: TooltipPortalProps) => {
  return <TooltipPrimitive.Portal data-slot="tooltip-portal" {...props} />
}
