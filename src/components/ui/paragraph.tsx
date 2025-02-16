import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'

interface ParagraphProps
extends Omit<React.ComponentPropsWithoutRef<'p'>, 'className'> {
  variant ?: 'base' | 'error';
  children : ReactNode;
  className ?: string;
}

const Paragraph = ({variant = 'base', children, className,...props}:ParagraphProps) => {
  const baseStyle = cn(variant === 'base' && 'text-base', variant === 'error' && 'text-sm text-[#dc2626]')
  return (
    <p className={cn(baseStyle,className)} {...props}>{children}</p>
  )
}

export default Paragraph