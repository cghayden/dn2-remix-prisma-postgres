import { Link } from '@remix-run/react'

type HeaderProps = {
  headerText: string
  className?: string
  actionRoute?: string
}

export function PageHeader({
  headerText,
  className = '',
  actionRoute = '/',
}: HeaderProps) {
  return (
    <div className={`pageHeader py-4 flex ${className}`}>
      <h1 className='font-bold text-lg'>{headerText}</h1>
      <Link to={actionRoute} className='ml-auto text-2xl'>
        +
      </Link>
    </div>
  )
}
