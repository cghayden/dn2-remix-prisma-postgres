import { Outlet, useLoaderData } from '@remix-run/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import Header from '~/components/parents/Header'
import Sidebar from '~/components/parents/Sidebar'
import { prisma } from '~/db.server'
import { requireParent } from '~/models/parent.server'

// type UserNavData = {
//   dancers: Dancer['id' | 'firstName']
// }
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // check for userId(logged in user) and 'PARENT' type, return id if so
  const userId = await requireParent(request)
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
