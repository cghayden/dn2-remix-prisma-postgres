import { Link } from 'react-router-dom'
// import LogoutForm from '../LogoutForm'
// import XSvg from '../icons/XSvg'
import { Form } from '@remix-run/react'

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
      className={`nav_frame_custom bg-gray-200 text-slate-800 fixed  left-0  z-20 transition-all flex items-stretch
    ${showMobileNav ? 'translate-x-0 ' : '-translate-x-full'}
    `}
    >
      <nav className='nav_custom items-stretch flex flex-col flex-auto h-full min-h-full max-w-[22.5rem] min-w-[15rem] '>
        {/* <div className='flex'>
          <button
            type='button'
            className='ml-auto btn'
            aria-label='close navigation'
            onClick={() => toggleShowMobileNav(false)}
          >
            <XSvg w={'24'} h={'24'} />
          </button>
        </div> */}
        <div>
          <ul>
            <li className='px-3'>
              <Link
                className='flex items-center my-2 pl-4 pr-2'
                to='addDanceClass'
              >
                <div className='w-[20px] h-[20px] bg-white mr-2 mt-2 mb-2'></div>
                <span>Add a Dance Class</span>
              </Link>
            </li>
            <li className='px-3'>
              <Link
                className='flex items-center my-2 pl-4 pr-2'
                to='addDanceClass'
              >
                <div className='w-[20px] h-[20px] bg-white mr-2 mt-2 mb-2'></div>
                <span>Add a Dance Class</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className='mt-auto pb-6'>
          <ul>
            <li className='px-3'>
              <Link
                className='flex items-center my-2 pl-4 pr-2'
                to='configuration'
              >
                <div className='w-[20px] h-[20px] bg-white mr-2 mt-2 mb-2'></div>
                <span>Configuration</span>
              </Link>
            </li>
            <li className='px-3'>
              <Form
                className='flex items-center my-2 pl-4 pr-2'
                action='/logout'
                method='post'
              >
                <div className='w-[20px] h-[20px] bg-white mr-2 mt-2 mb-2'></div>
                <button type='submit'>Logout</button>
              </Form>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
