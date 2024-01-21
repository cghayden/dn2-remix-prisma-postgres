import { Link } from '@remix-run/react'

type HeaderProps = {
  headerText: string
  className?: string
  editRoute?: string
}

export function PanelHeader({
  headerText,
  className = '',
  editRoute = '/',
}: HeaderProps) {
  return (
    <div className={`py-4 flex ${className}`}>
      <h1 className='text-center text-xl font-bold'>{headerText}</h1>
      <Link to={editRoute} className='ml-auto'>
        Edit
      </Link>
    </div>
  )
}
