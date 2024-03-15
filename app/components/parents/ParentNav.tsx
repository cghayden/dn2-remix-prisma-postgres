import { Link } from 'react-router-dom'
import { Form } from '@remix-run/react'
import type { NavLink } from 'types'
// import { useNavContext } from '../context/NavContext'

export default function ParentNav({
  links,
  showNav,
  toggleShowNav,
}: {
  links: NavLink[]
  showNav: boolean
  toggleShowNav: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const settingsLinks = links.filter((link) => link.url.startsWith('config'))
  const contentLinks = links.filter((link) => link.url.startsWith('/'))
  const dancerLinks = links.filter((link) => link.url.startsWith('dancer'))
  const studioLinks = links.filter((link) => link.url.startsWith('studio'))

  return (
    <div
      className={`nav_frame_custom bg-gray-200 text-gray-900 fixed  left-0  z-20 transition-all flex items-stretch
    ${showNav ? 'translate-x-0 ' : '-translate-x-full'}
    `}
    >
      <nav className='nav_custom items-stretch flex flex-col flex-auto h-full min-h-full min-w-[15rem] pt-4'>
        <Link to={'/parent'} className=' pl-4 py-2 font-bold inline-block'>
          Home
        </Link>
        <div className='my-2'>
          <legend className=' pl-4 font-bold'>Dancers</legend>

          <ul>
            {dancerLinks.map((link) => (
              <li key={link.label} className='px-3'>
                <Link
                  className='flex items-center my-2 pl-4 pr-2'
                  to={`${link.url}`}
                  onClick={() => {
                    toggleShowNav(false)
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='my-2'>
          <legend className=' pl-4 font-bold'>Studios</legend>

          <ul>
            {studioLinks.map((link) => (
              <li key={link.label} className='px-3'>
                <Link
                  className='flex items-center my-2 pl-4 pr-2'
                  to={`${link.url}`}
                  onClick={() => {
                    toggleShowNav(false)
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='my-2'>
          <legend className=' pl-4 font-bold'>Actions</legend>

          <ul>
            {contentLinks.map((link) => (
              <li key={link.label} className='px-3'>
                <Link
                  className='flex items-center my-2 pl-4 pr-2'
                  to={`${link.url}`}
                  onClick={() => {
                    toggleShowNav(false)
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='pb-6 my-2'>
          <legend className=' pl-4 font-bold text-l'>Settings</legend>
          <ul>
            {settingsLinks.map((link) => (
              <li key={link.label} className='px-3'>
                <Link
                  className='flex items-center my-2 pl-4 pr-2'
                  to={`${link.url}`}
                  onClick={() => {
                    toggleShowNav(false)
                  }}
                >
                  {/* <div className='w-[20px] h-[20px] bg-white mr-2 mt-2 mb-2'></div> */}
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
