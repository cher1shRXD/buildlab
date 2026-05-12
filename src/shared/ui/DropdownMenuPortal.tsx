"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

interface DropdownMenuPortalProps extends MenuPrimitive.Portal.Props {}

export const DropdownMenuPortal = ({ ...props }: DropdownMenuPortalProps) => {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}
