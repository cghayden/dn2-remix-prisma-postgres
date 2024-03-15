import { prisma } from '~/db.server'
import { useLoaderData } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { requireStudioUserId } from '~/models/studio.server'

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
  // const studios = await prisma.studio.findMany({
  //   include: {
  //     danceClasses: {
  //       select: {
  //         id: true,
  //       },
  //     },
  //   },
  // })
  // return studios
  // return 'ok'
  return studiosForDancer
}
export default function Playground() {
  const studiosForDancer = useLoaderData<typeof loader>()
  console.log('studiosForDancer', studiosForDancer)
  return <div>Playground</div>
}
