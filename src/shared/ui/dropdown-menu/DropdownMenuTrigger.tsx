"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

interface DropdownMenuTriggerProps extends MenuPrimitive.Trigger.Props {}

export const DropdownMenuTrigger = ({ ...props }: DropdownMenuTriggerProps) => {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}
