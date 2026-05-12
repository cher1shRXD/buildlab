import { ComponentProps } from "react"
import { cn } from "@/shared/lib/utils"

interface AvatarGroupProps extends ComponentProps<"div"> {}

export const AvatarGroup = ({ className, ...props }: AvatarGroupProps) => {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}
