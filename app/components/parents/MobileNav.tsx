import { Link } from 'react-router-dom'
import LogoutForm from '../LogoutForm'
import XSvg from '../icons/XSvg'

type ComponentProps = {
  showMobileNav: boolean
  toggleShowMobileNav: (bool: boolean) => void
}

export default function MobileNav({
  showMobileNav,
  toggleShowMobileNav,
}: ComponentProps) {
  return (
    <div
      className={`bg-gray-200 text-slate-800 p-4 w-3/4 max-w-md fixed top-0 right-0 h-screen z-20 transition-all
    ${showMobileNav ? 'translate-x-0 ' : 'translate-x-full'}
    `}
    >
      <div className='flex'>
        <button
          type='button'
          className='ml-auto btn'
          aria-label='close navigation'
          onClick={() => toggleShowMobileNav(false)}
        >
          <XSvg w={'24'} h={'24'} />
        </button>
      </div>
      <nav>
        <ul className='flex flex-col'>
          <li className='py-2'>
            <Link to='addDancer'>Add a Dancer</Link>
          </li>
          <li className='py-2'>
            <LogoutForm />
          </li>
        </ul>
      </nav>
    </div>
  )
}
