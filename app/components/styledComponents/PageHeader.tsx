import { Link } from '@remix-run/react'
import LeftArrowSvg from '../icons/LeftArrowIcon'

type PageHeaderProps = {
  headerText: string
  className?: string
  actionRoute?: string | null
  editRoute?: string | null
  navigateBackUrl?: string | null
}

export function PageHeader({
  headerText,
  className = '',
  editRoute = null,
  navigateBackUrl = null,
  actionRoute = null,
}: PageHeaderProps) {
  return (
    <div className={`pageHeader p-4 flex items-center ${className}`}>
      <div className='w-[2rem]'>
        {navigateBackUrl ? (
          <Link to={`${navigateBackUrl}`}>
            <LeftArrowSvg />
          </Link>
        ) : (
          ''
        )}
      </div>
      <h1 className='font-bold text-xl'>{headerText}</h1>
      {actionRoute && (
        <Link to={actionRoute} className='ml-auto text-2xl pr-8'>
          +
        </Link>
      )}
      {editRoute && (
        <Link to={editRoute} className='ml-auto text-xl pr-8 text-rose-700'>
          Edit
        </Link>
      )}
    </div>
  )
}
