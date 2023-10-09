import { Outlet, useLoaderData } from '@remix-run/react'
import { requireUserId } from '~/session.server'
import { type LoaderFunctionArgs } from '@remix-run/node'
import Header from '~/components/parents/Header'
import Sidebar from '~/components/parents/Sidebar'
import { prisma } from '~/db.server'

// type UserNavData = {
//   dancers: Dancer['id' | 'firstName']
// }
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const parentNavData = prisma.parent.findUnique({
    where: {
      userId: userId,
    },
    select: {
      dancers: {
        select: {
          firstName: true,
          id: true,
        },
      },
    },
  })
  return parentNavData
}

function ParentLayout() {
  const parentNavData = useLoaderData<typeof loader>()
  console.log('parentNavData', parentNavData)
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex h-full flex-1'>
        <Sidebar parentNavData={parentNavData} />
        <main className='w-full'>
          <Outlet />
        </main>
      </div>
      <footer>Footer</footer>
    </div>
  )
}
export default ParentLayout
