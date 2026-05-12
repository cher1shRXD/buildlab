import { ComponentProps } from "react"
import { cn } from "@/shared/lib/utils"

interface CardFooterProps extends ComponentProps<"div"> {}

export const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}
