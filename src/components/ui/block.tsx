import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface BlockProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  margin?: "sm" | "base" | "lg";
  children: ReactNode;
  className?: string;
}

const Block = ({
  margin = "base",
  children,
  className,
  ...props
}: BlockProps) => {
  const baseStyle = cn(
    margin === "sm" && "mt-3",
    margin === "base" && "mt-6",
    margin === "lg" && "mt-10"
  );
  return (
    <div className={cn(baseStyle, className)} {...props}>
      {children}
    </div>
  );
};

export default Block;
