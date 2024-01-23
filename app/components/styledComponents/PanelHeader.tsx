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
    <div className={`p-4 flex ${className}`}>
      <h1 className='text-center text-xl font-bold'>{headerText}</h1>
      <Link to={editRoute} className='ml-auto btn btn-action'>
        Edit
      </Link>
    </div>
  )
}
