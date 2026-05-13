"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

interface DropdownMenuProps extends MenuPrimitive.Root.Props {}

export const DropdownMenu = ({ ...props }: DropdownMenuProps) => {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}
