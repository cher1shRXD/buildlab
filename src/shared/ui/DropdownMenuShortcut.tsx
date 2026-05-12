import { ComponentProps } from "react"
import { cn } from "@/shared/lib/utils"

interface DropdownMenuShortcutProps extends ComponentProps<"span"> {}

export const DropdownMenuShortcut = ({
  className,
  ...props
}: DropdownMenuShortcutProps) => {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}
