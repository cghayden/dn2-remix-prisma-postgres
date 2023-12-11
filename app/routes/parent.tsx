import { Outlet } from '@remix-run/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { prisma } from '~/db.server'
import { requireParentUserId } from '~/models/parent.server'
import StudioHeader from '~/components/studios/StudioHeader'
import Nav from '~/components/Nav'
import type { NavLink } from 'types'
// type UserNavData = {
//   dancers: Dancer['id' | 'firstName']
// }

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   // check for userId(logged in user) and 'PARENT' type, return id if so
//   const userId = await requireParentUserId(request)
//   const parentNavData = await prisma.parent.findUnique({
//     where: {
//       userId: userId,
//     },
//     select: {
//       dancers: {
//         select: {
//           firstName: true,
//           id: true,
//         },
//       },
//     },
//   })
//   return parentNavData
// }

function ParentLayout() {
  // const parentNavData = useLoaderData<typeof loader>()
  const parentLinks: NavLink[] = [
    { label: 'Home', url: '/studio' },
    { label: 'Create a New Dance', url: '/parent/addDanceClass' },
    { label: 'Add a Dancer', url: '/parent/addDancer' },
    // { label: 'Configuration', url: '/parent/settings' },
  ]
  return (
    <>
      <StudioHeader />
      <Nav links={parentLinks} />
      <main className='main_custom'>
        <div className='px-6 flex-1'>
          <Outlet />
        </div>
      </main>
      <footer>Footer</footer>
    </>
  )
}
export default ParentLayout
