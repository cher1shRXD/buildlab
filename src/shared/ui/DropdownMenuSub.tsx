"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

interface DropdownMenuSubProps extends MenuPrimitive.SubmenuRoot.Props {}

export const DropdownMenuSub = ({ ...props }: DropdownMenuSubProps) => {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}
