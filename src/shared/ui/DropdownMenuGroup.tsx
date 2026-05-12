"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

interface DropdownMenuGroupProps extends MenuPrimitive.Group.Props {}

export const DropdownMenuGroup = ({ ...props }: DropdownMenuGroupProps) => {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}
