"use client"

import { cn } from "@/shared/lib/utils"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

interface AvatarFallbackProps extends AvatarPrimitive.Fallback.Props {}

export const AvatarFallback = ({
  className,
  ...props
}: AvatarFallbackProps) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}
