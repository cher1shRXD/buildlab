import { ComponentProps } from "react"
import { cn } from "@/shared/lib/utils"

interface CardTitleProps extends ComponentProps<"div"> {}

export const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}
