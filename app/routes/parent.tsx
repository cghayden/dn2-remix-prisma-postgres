import { Outlet, useLoaderData } from '@remix-run/react'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { prisma } from '~/db.server'
import { requireParentUserId } from '~/models/parent.server'
import StudioHeader from '~/components/studios/StudioHeader'
import Nav from '~/components/parents/ParentNav'
import type { NavLink } from 'types'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // check for userId(logged in user) and 'PARENT' type, return id if so
  const userId = await requireParentUserId(request)
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
  return json({ parentNavData })
}

function ParentLayout() {
  const { parentNavData } = useLoaderData<typeof loader>()

  const dancerLinks = parentNavData?.dancers
    ? parentNavData?.dancers.map((dancer) => {
        return {
          label: `${dancer.firstName}`,
          url: `dancer/${dancer.id}`,
        }
      })
    : []

  const parentLinks: NavLink[] = [
    // { label: 'Home', url: '/' },
    { label: 'Create a New Dance', url: '/parent/addDanceClass' },
    { label: 'Add a Dancer', url: '/parent/addDancer' },
    { label: 'Find a Studio', url: '/parent/searchStudios' },
    ...dancerLinks,
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
      {/* <footer>Footer</footer> */}
    </>
  )
}
export default ParentLayout
