import { Outlet, useRouteError } from '@remix-run/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import StudioHeader from '~/components/studios/StudioHeader'
// import Sidebar from '~/components/parents/Sidebar'
// import { prisma } from '~/db.server'
import { requireStudio } from '~/models/studio.server'
import { ErrorContainer } from '~/components/styledComponents/ErrorContainer'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const studioId = await requireStudio(request)

  return studioId
}

export default function StudioLayout() {
  // const studioNavData = useLoaderData<typeof loader>()
  return (
    <div className='min-h-screen flex flex-col'>
      <StudioHeader />
      <div className='flex h-full flex-1'>
        {/* <Sidebar /> */}
        <main className='w-full'>
          <Outlet />
        </main>
      </div>
      <footer>Footer</footer>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  return <ErrorContainer error={error} />
}
