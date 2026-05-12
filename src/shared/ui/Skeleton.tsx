import { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

interface SkeletonProps extends ComponentProps<"div"> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
);
