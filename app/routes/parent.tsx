import { Outlet, useLoaderData } from '@remix-run/react'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { prisma } from '~/db.server'
import { requireParentUserId } from '~/models/parent.server'
import StudioHeader from '~/components/studios/StudioHeader'
import Nav from '~/components/parents/ParentNav'
import type { NavLink } from 'types'
import { useState } from 'react'

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
  const [showNav, toggleShowNav] = useState(false)

  const dancerLinks = parentNavData?.dancers
    ? parentNavData?.dancers.map((dancer) => {
        return {
          label: `${dancer.firstName}`,
          url: `dancer/${dancer.id}`,
        }
      })
    : []

  const parentLinks: NavLink[] = [
    // { label: 'Home', url: '/parent' },
    { label: 'Create a Custom Dance', url: '/parent/addCustomDance' },
    { label: 'Add a Dancer', url: '/parent/addDancer' },
    { label: 'Find a Studio', url: '/parent/searchStudios' },
    ...dancerLinks,
    // { label: 'Configuration', url: '/parent/settings' },
  ]
  return (
    <>
      <StudioHeader showNav={showNav} toggleShowNav={toggleShowNav} />
      <Nav
        links={parentLinks}
        showNav={showNav}
        toggleShowNav={toggleShowNav}
      />
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
