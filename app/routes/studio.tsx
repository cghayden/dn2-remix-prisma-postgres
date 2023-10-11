import { Outlet } from '@remix-run/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import Header from '~/components/parents/Header'
// import Sidebar from '~/components/parents/Sidebar'
// import { prisma } from '~/db.server'
import { requireStudio } from '~/models/studio.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const studioId = await requireStudio(request)

  return studioId
}

export default function StudioLayout() {
  // const studioNavData = useLoaderData<typeof loader>()
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
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
