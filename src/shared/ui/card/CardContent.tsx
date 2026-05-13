import { ComponentProps } from "react"
import { cn } from "@/shared/lib/utils"

interface CardContentProps extends ComponentProps<"div"> {}

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}
