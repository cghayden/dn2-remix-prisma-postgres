import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { prisma } from '~/db.server'
import { requireStudioUserId } from '~/models/studio.server'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const dancerId = params.dancerId
  const studioId = await requireStudioUserId(request)

  const dancer = await prisma.dancer.findUnique({
    where: {
      id: dancerId,
    },
    select: {
      firstName: true,
      lastName: true,
      parent: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      birthdate: true,
      imageFilename: true,
      enrollments: {
        where: {
          studioId: studioId,
        },
        select: {
          class: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })
  return dancer
}

export default function DancerPage() {
  const dancer = useLoaderData<typeof loader>()
  console.log('dancer page', dancer)
  return (
    <>
      <PageHeader headerText={`${dancer?.firstName} ${dancer?.lastName}`} />
      <div className='py-4 '>
        <h3 className='text-lg font-bold'>Enrollments:</h3>
        <ul className='pl-4'>
          {dancer?.enrollments.map((enrollment) => (
            <li key={enrollment.class.id}>
              <Link to={`/studio/danceClass/${enrollment.class.id}`}>
                {enrollment.class.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
