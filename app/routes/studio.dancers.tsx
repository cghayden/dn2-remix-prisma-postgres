import { prisma } from '~/db.server'
import { useLoaderData } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { requireStudioUserId } from '~/models/studio.server'
import { PageHeader } from '~/components/styledComponents/PageHeader'

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
  })

  return studioDancers
}
export default function Playground() {
  const studioDancers = useLoaderData<typeof loader>()
  console.log('studioDancers', studioDancers)
  return (
    <div>
      <PageHeader headerText='Studio Dancers' />
      <ul>
        {studioDancers.map((dancer) => (
          <li key={dancer.id}>
            {dancer.firstName} {dancer.lastName}
          </li>
        ))}
      </ul>
    </div>
  )
}
