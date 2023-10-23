import { Link, useLocation } from '@remix-run/react'
import { useEffect, useState } from 'react'
import MenuSvg from '../icons/MenuSvg'
import StudioMobileNav from './StudioMobileNav'
// TODO - make this a reusable component for parent/studio/etc.

export default function StudioHeader() {
  const [showMobileNav, toggleShowMobileNav] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    toggleShowMobileNav(false) // Close the navigation panel anytime pathname changes
  }, [pathname])

  return (
    <header className='header'>
      <button
        className=' grid place-items-center md:hidden'
        type='button'
        aria-label='show navigation menu'
        onClick={() => {
          toggleShowMobileNav((showMobileNav) => !showMobileNav)
        }}
      >
        <MenuSvg />
      </button>
      <Link to='/studio' className='hidden md:block'>
        Dancernotes
      </Link>
      <StudioMobileNav
        showMobileNav={showMobileNav}
        toggleShowMobileNav={toggleShowMobileNav}
      />
    </header>
  )
}
