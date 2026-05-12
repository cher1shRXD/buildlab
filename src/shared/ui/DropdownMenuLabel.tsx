"use client"

import { cn } from "@/shared/lib/utils"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

interface DropdownMenuLabelProps extends MenuPrimitive.GroupLabel.Props {
  inset?: boolean
}

export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) => {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}
