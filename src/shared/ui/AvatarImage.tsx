"use client"

import { cn } from "@/shared/lib/utils"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

interface AvatarImageProps extends AvatarPrimitive.Image.Props {}

export const AvatarImage = ({ className, ...props }: AvatarImageProps) => {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}
