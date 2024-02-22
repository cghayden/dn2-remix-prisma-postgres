import { Link } from '@remix-run/react'
import LeftArrowSvg from '../icons/LeftArrowIcon'

type PageHeaderProps = {
  headerText: string
  className?: string
  actionRoute?: string | null
  navigateBack?: boolean
}

export function PageHeader({
  headerText,
  className = '',
  navigateBack = false,
  actionRoute = null,
}: PageHeaderProps) {
  return (
    <div className={`pageHeader p-4 flex items-center ${className}`}>
      <div className='w-[2rem]'>
        {navigateBack ? (
          <Link to={`../../${headerText.toLowerCase()}`}>
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
    </div>
  )
}
