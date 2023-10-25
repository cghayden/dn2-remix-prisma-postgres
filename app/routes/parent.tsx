import { Outlet } from '@remix-run/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { prisma } from '~/db.server'
import { requireParent } from '~/models/parent.server'
import StudioHeader from '~/components/studios/StudioHeader'

// type UserNavData = {
//   dancers: Dancer['id' | 'firstName']
// }
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // check for userId(logged in user) and 'PARENT' type, return id if so
  const userId = await requireParent(request)
  const parentNavData = await prisma.parent.findUnique({
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
  // const parentNavData = useLoaderData<typeof loader>()
  return (
    <>
      <StudioHeader />
      <main className='main_custom'>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}
export default ParentLayout
