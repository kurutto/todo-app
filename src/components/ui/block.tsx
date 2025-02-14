import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'

interface BlockProps {
  children : ReactNode;
  className ?: string;
}

const Block = ({children,className,...props}:BlockProps) => {
  const baseStyle = cn('mt-6')
  return (
    <div className={cn(baseStyle,className)} {...props}>{children}</div>
  )
}

export default Block