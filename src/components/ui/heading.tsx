import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface headingProps
  extends Omit<React.ComponentPropsWithoutRef<"h1">, "className"> {
  level?: 1 | 2 | 3 | 4 | 5;
  children: ReactNode;
  className?: string;
}
const Heading = ({
  level = 3,
  children,
  className,
  ...props
}: headingProps) => {
  const Tag = `h${level}` as const;
  const baseStyle = cn(
    level === 1 && "text-2xl text-center font-semibold mb-12",
    level === 2 && "text-lg text-center mb-6 mt-12",
    level === 3 && "text-base font-bold mb-3 mt-4",
    level === 4 && "text-base font-medium mb-3 mt-4"
  );
  return (
    <>
      <Tag className={cn(baseStyle, className)} {...props}>
        {children}
      </Tag>
    </>
  );
};

export  { Heading };
