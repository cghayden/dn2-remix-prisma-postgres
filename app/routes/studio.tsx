import { Outlet, useRouteError } from '@remix-run/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import StudioHeader from '~/components/studios/StudioHeader'
import { requireStudio } from '~/models/studio.server'
import { ErrorContainer } from '~/components/styledComponents/ErrorContainer'
import Nav from '~/components/Nav'
import type { NavLink } from 'types'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const studioUser = await requireStudio(request)
  return studioUser
}

export default function StudioLayout() {
  // const studioUser = useLoaderData<typeof loader>()

  const studioLinks: NavLink[] = [
    { label: 'Home', url: '/studio' },
    { label: 'Create a New Dance', url: '/studio/addDanceClass' },
    // { label: 'Configuration', url: '/studio/settings' },
    { label: 'Age Levels', url: '/studio/ageLevels' },
    { label: 'Skill Levels', url: '/studio/skillLevels' },
  ]
  return (
    <>
      <StudioHeader />
      <Nav links={studioLinks} />
      <main className='main_custom'>
        <div className='px-6 flex-1'>
          <Outlet />
        </div>
      </main>
      <footer>Footer</footer>
    </>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  return <ErrorContainer error={error} />
}
