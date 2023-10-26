import { Link } from '@remix-run/react'
import MenuSvg from '../icons/MenuSvg'
import { useNavContext } from '../context/NavContext'
// TODO - make this a reusable component for parent/studio/etc.

export type HeaderProps = {
  userType: string
  links: NavLink[]
}

export type NavLink = {
  label: string
  url: string
}

export default function StudioHeader() {
  const { toggleShowNav } = useNavContext()

  // Close the navigation panel anytime pathname changes
  // useEffect(() => {
  //   toggleShowNav()
  // }, [pathname, toggleShowNav])

  return (
    <header className='header'>
      <button
        className=' grid place-items-center md:hidden'
        type='button'
        aria-label='show navigation menu'
        onClick={() => {
          toggleShowNav()
        }}
      >
        <MenuSvg />
      </button>
      <Link to='/studio' className='hidden md:block'>
        Dancernotes
      </Link>
    </header>
  )
}
