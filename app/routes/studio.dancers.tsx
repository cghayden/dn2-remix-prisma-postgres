import { prisma } from '~/db.server'
import { Link, useLoaderData } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { requireStudioUserId } from '~/models/studio.server'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { useState } from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const studioId = await requireStudioUserId(request)

  const studioDancers = await prisma.dancer.findMany({
    where: {
      enrollments: {
        some: {
          studioId: studioId,
        },
      },
    },
    include: {
      enrollments: {
        where: {
          studioId: studioId,
        },
      },
      parent: true, // If you want to include parent details
    },
    orderBy: {
      lastName: 'asc',
    },
  })

  return studioDancers
}
export default function Playground() {
  const studioDancers = useLoaderData<typeof loader>()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDancers = studioDancers?.filter(
    (dancer) =>
      dancer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dancer.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <PageHeader headerText='Studio Dancers' />
      <div className='p-4 w-full bg-slate-100 '>
        <input
          type='text'
          className='p-2 border border-gray-200 rounded w-full'
          placeholder='Search ...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul>
        {filteredDancers.map((dancer) => (
          <li key={dancer.id}>
            <Link to={`/studio/dancer/${dancer.id}`}>
              {dancer.lastName}, {dancer.firstName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
