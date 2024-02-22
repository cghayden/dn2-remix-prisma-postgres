import { type ReactNode } from 'react'

type PageHeaderProps = {
  headerText: string
  className?: string
  actionRoute?: string | null
  navigateBack?: boolean
  children?: ReactNode
}

export function TableHeader({
  children,
  headerText,
  className = '',
  navigateBack = false,
  actionRoute = null,
}: PageHeaderProps) {
  return (
    <div
      className='flex justify-between items-end relative
      '
    >
      <div className={`items-center pb-1 ${className}`}>
        <h1 className='font-bold text-lg'>{headerText}</h1>
      </div>
      {children}
    </div>
  )
}
