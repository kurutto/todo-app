import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'

interface ParagraphProps {
  variant ?: 'base' | 'error';
  children : ReactNode;
  className ?: string;
}

const Paragraph = ({variant = 'base', children, className}:ParagraphProps) => {
  const baseStyle = cn(variant === 'base' && 'text-base', variant === 'error' && 'text-sm text-[#dc2626]' )
  return (
    <p className={cn(baseStyle,className)}>{children}</p>
  )
}

export default Paragraph