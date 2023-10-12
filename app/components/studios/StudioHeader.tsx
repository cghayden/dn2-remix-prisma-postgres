import { useLocation } from '@remix-run/react'
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
    <header className='bg-gray-100 flex items-center p-4'>
      <div>Dancernotes</div>
      <button
        className='md:hidden grid place-items-center ml-auto'
        type='button'
        aria-label='show navigation menu'
        onClick={() => {
          toggleShowMobileNav(true)
        }}
      >
        <MenuSvg />
      </button>
      <StudioMobileNav
        showMobileNav={showMobileNav}
        toggleShowMobileNav={toggleShowMobileNav}
      />
    </header>
  )
}
