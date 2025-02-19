import { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
interface NavButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: ReactNode;
  link: string;
  className?: string;
}
const NavButton = ({ children, link, className, ...props }: NavButtonProps) => {
  const baseStyle = cn(
    "sm:px-4 max-sm:px-3 text-[hsl(var(--muted-foreground))] hover:bg-transparent rounded-none"
  );
  return (
    <Button variant="ghost" className={cn(baseStyle, className)} {...props}>
      <Link href={link}>{children}</Link>
    </Button>
  );
};

export { NavButton };
