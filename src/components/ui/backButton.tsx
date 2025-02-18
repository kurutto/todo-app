import React, { ReactNode } from "react";
import { Button } from "./button";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BackButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,'className'>{
  children: ReactNode;
  link: string;
  className?: string;
}

const BackButton = ({ children, link, className, ...props }: BackButtonProps) => {
  const baseStyle = cn("px-0");
  return (
    <Button asChild variant="link" className={cn(baseStyle, className)} {...props}>
      <Link href={link}>
        <IoIosArrowBack />
        {children}
      </Link>
    </Button>
  );
};

export default BackButton;
