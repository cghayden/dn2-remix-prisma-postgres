import { Link } from 'react-router-dom'
import { Form } from '@remix-run/react'
import type { NavLink } from 'types'
import { useEffect, useRef } from 'react'
import MenuSvg from './icons/MenuSvg'

export default function Nav({
  links,
  showNav,
  toggleShowNav,
}: {
  links: NavLink[]
  showNav: boolean
  toggleShowNav: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const navRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        toggleShowNav(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navRef, toggleShowNav])

  const settingsLinks = links.filter((link) => link.url.startsWith('config'))
  const apparelLinks = links.filter(
    (link) => link.url.startsWith('footwear') || link.url.startsWith('tights')
  )
  const contentLinks = links.filter((link) => link.url.startsWith('/'))

  return (
    <div
      ref={navRef}
      className={`nav_frame_custom bg-gray-200 text-gray-900 fixed  left-0  z-20 transition-all flex items-stretch h-full
    ${showNav ? 'translate-x-0 ' : '-translate-x-full'}
    `}
    >
      <nav className='nav_custom items-stretch flex flex-col flex-auto h-full min-h-full min-w-[15rem]'>
        <div className='h-[3.5rem] bg-slate-900 flex items-center p-4 '>
          <button
            className=' grid place-items-center md:hidden text-slate-50'
            type='button'
            aria-label='show navigation menu'
            onClick={(e) => {
              toggleShowNav(!showNav)
            }}
          >
            <MenuSvg />
          </button>
        </div>
        <div className='pt-4'>
          <ul>
            {contentLinks.map((link) => (
              <li key={link.label} className='px-3'>
                <Link
                  className='flex items-center my-2 pl-4 pr-2'
                  to={`${link.url}`}
                  onClick={() => {
                    toggleShowNav(!showNav)
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='pb-6'>
          <legend className=' pl-4 font-bold text-l'>Apparel</legend>
          <ul>
            {apparelLinks.map((link) => (
              <li key={link.label} className='px-3'>
                <Link
                  className='flex items-center my-2 pl-4 pr-2'
                  to={`${link.url}`}
                  onClick={() => {
                    toggleShowNav(!showNav)
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='pb-6'>
          <legend className=' pl-4 font-bold text-l'>Settings</legend>
          <ul>
            {settingsLinks.map((link) => (
              <li key={link.label} className='px-3'>
                <Link
                  className='flex items-center my-2 pl-4 pr-2'
                  to={`${link.url}`}
                  onClick={() => {
                    toggleShowNav(!showNav)
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
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
