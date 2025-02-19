import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface BlockProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  margin?: "sm" | "base" | "lg";
  variant?: "form";
  children: ReactNode;
  className?: string;
}

const Block = ({
  margin = "base",
  variant,
  children,
  className,
  ...props
}: BlockProps) => {
  const baseStyle = cn(
    margin === "sm" && "mt-3",
    margin === "base" && "mt-6",
    margin === "lg" && "mt-10",
    variant === "form" && "grid gap-1"
  );
  return (
    <div className={cn(baseStyle, className)} {...props}>
      {children}
    </div>
  );
};

export { Block };
