import { prisma } from '~/db.server'
import { useLoaderData } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const dancers = await prisma.dancer.findMany({
    select: { id: true },
    take: 5,
  })

  // seed dance classes at each studio with 5-10 dancers

  // requirements:
  // studioId - on the danceClass
  // danceClassId - loop over each danceclass in the studio / (or all in db)
  // dancerId: choose random from array of dancerIds

  // for each enrollment:
  // const enrollment = await enrollDancerInDanceClass({
  //   danceClassId,
  //   dancerId,
  //   studioId,
  // })
  return dancers
}
export default function Playground() {
  const dancers = useLoaderData<typeof loader>()
  console.log('dancers', dancers)
  return <div>Playground</div>
}
