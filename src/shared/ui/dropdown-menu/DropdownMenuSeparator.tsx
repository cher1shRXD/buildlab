"use client"

import { cn } from "@/shared/lib/utils"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

interface DropdownMenuSeparatorProps extends MenuPrimitive.Separator.Props {}

export const DropdownMenuSeparator = ({
  className,
  ...props
}: DropdownMenuSeparatorProps) => {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}
