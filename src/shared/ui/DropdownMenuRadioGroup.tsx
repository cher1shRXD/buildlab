"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

interface DropdownMenuRadioGroupProps extends MenuPrimitive.RadioGroup.Props {}

export const DropdownMenuRadioGroup = ({ ...props }: DropdownMenuRadioGroupProps) => {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}
