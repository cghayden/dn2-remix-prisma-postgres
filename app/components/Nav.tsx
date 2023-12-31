import { Link } from 'react-router-dom'
// import LogoutForm from '../LogoutForm'
// import XSvg from '../icons/XSvg'
import { Form } from '@remix-run/react'
import { useNavContext } from './context/NavContext'
import type { NavLink } from 'types'

// type ComponentProps = {
//   showNav: boolean
//   toggleShowNav: (bool: boolean) => void
// }

export default function Nav({ links }: { links: NavLink[] }) {
  const { showNav, toggleShowNav } = useNavContext()
  return (
    <div
      className={`nav_frame_custom bg-gray-200 text-gray-900 fixed  left-0  z-20 transition-all flex items-stretch
    ${showNav ? 'translate-x-0 ' : '-translate-x-full'}
    `}
    >
      <nav className='nav_custom items-stretch flex flex-col flex-auto h-full min-h-full min-w-[15rem] pt-4'>
        {/* <div className='flex'>
          <button
            type='button'
            className='ml-auto btn'
            aria-label='close navigation'
            onClick={() => toggleShowNav(false)}
          >
            <XSvg w={'24'} h={'24'} />
          </button>
        </div> */}
        <div>
          <ul>
            {links.map((link) => (
              <li key={link.label} className='px-3'>
                <Link
                  className='flex items-center my-2 pl-4 pr-2'
                  to={`${link.url}`}
                  onClick={() => {
                    toggleShowNav()
                  }}
                >
                  {/* <div className='w-[20px] h-[20px] bg-white mr-2 mt-2 mb-2'></div> */}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-auto pb-6'>
          <ul>
            {/* <li className='px-3'>
              <Link
                className='flex items-center my-2 pl-4 pr-2'
                to='configuration'
              >
                <span>Configuration</span>
              </Link>
            </li> */}
            <li className='px-3'>
              <Form
                className='flex items-center my-2 pl-4 pr-2'
                action='/logout'
                method='post'
              >
                <button type='submit'>Logout</button>
              </Form>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
