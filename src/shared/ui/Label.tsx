import { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

interface LabelProps extends ComponentProps<"label"> {}

export const Label = ({ className, ...props }: LabelProps) => (
  <label className={cn("text-sm font-medium leading-none", className)} {...props} />
);
