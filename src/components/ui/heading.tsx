import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'

interface headingProps {
  level ?: 1 | 2 | 3 | 4 | 5 ;
  children : ReactNode;
  className ?: string;
}
const Heading = ({level=3,children,className}:headingProps) => {
  const Tag = `h${level}` as const;
  const style = cn(level === 1 && 'text-2xl text-center font-semibold mb-12',level === 2 && 'text-lg text-center mb-6 mt-12')
  return (
    <>
    <Tag className={cn(style,className)}>{children}</Tag>
    <p className='font-b'></p>
    </>
  )
}

export default Heading