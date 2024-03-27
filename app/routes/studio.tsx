import { Outlet, useRouteError } from '@remix-run/react'
import StudioHeader from '~/components/studios/StudioHeader'
import { ErrorContainer } from '~/components/styledComponents/ErrorContainer'
import Nav from '~/components/Nav'
import type { NavLink } from 'types'
import { useState } from 'react'

export default function StudioLayout() {
  const [showNav, toggleShowNav] = useState(false)

  const studioLinks: NavLink[] = [
    { label: 'Home', url: '/studio' },
    { label: 'Dancers', url: '/studio/dancers' },
    { label: 'Dance Classes', url: '/studio/danceClasses' },
    { label: 'Create a New Dance', url: '/studio/addDanceClass' },
    { label: 'Footwear', url: 'footwear' },
    { label: 'Tights', url: 'tights' },
    { label: 'Configuration', url: 'config' },
  ]
  return (
    <>
      <StudioHeader showNav={showNav} toggleShowNav={toggleShowNav} />
      <Nav
        links={studioLinks}
        showNav={showNav}
        toggleShowNav={toggleShowNav}
      />
      <main className='main_custom'>
        <div className='flex-1'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  return <ErrorContainer error={error} />
}
