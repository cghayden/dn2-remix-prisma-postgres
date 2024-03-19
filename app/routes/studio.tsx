import { Outlet, useRouteError } from '@remix-run/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import StudioHeader from '~/components/studios/StudioHeader'
import { requireStudio } from '~/models/studio.server'
import { ErrorContainer } from '~/components/styledComponents/ErrorContainer'
import Nav from '~/components/Nav'
import type { NavLink } from 'types'
import { useState } from 'react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const studioUser = await requireStudio(request)
  return studioUser
}

export default function StudioLayout() {
  // const studioUser = useLoaderData<typeof loader>()
  const [showNav, toggleShowNav] = useState(false)

  const studioLinks: NavLink[] = [
    { label: 'Home', url: '/studio' },
    { label: 'Dance Classes', url: '/studio/danceClasses' },
    { label: 'Create a New Dance', url: '/studio/addDanceClass' },
    // { label: 'Configuration', url: '/studio/settings' },
    { label: 'Footwear', url: 'footwear' },
    { label: 'Tights', url: 'tights' },
    // { label: 'Age Levels', url: 'config/ageLevels' },
    // { label: 'Skill Levels', url: 'config/skillLevels' },
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
