import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { TableHeader } from '~/components/styledComponents/TableHeader'
import { getDanceClass, requireStudioUserId } from '~/models/studio.server'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const danceId = params.id
  const studioId = await requireStudioUserId(request)

  if (!danceId || !studioId) {
    throw new Error(
      ' there was an error: either dance Id or Studio Id was not provided'
    )
  }

  const danceClass = await getDanceClass({ danceId })

  if (danceClass?.studioId !== studioId) {
    throw new Error('you do not have permission to view this dance')
  }

  return danceClass
}

export default function StudioDanceClass() {
  const danceClass = useLoaderData<typeof loader>()

  return (
    <div>
      <PageHeader headerText='Dance Class' />
      <div className='w-5/6 mx-auto'>
        {/* <TableHeader headerText={danceClass.name} /> */}
        <ContentContainer className='w-full p-4'>
          <h2 className='font-bold text-lg pb-2'>{danceClass.name}</h2>
          <div>
            <ul>
              <li>
                <span className='font-bold text-lg'>name: </span>
                {danceClass.name}
              </li>
              <li>
                <span className='font-bold text-lg'>performance name:</span>{' '}
                {danceClass.performanceName}
              </li>
              <li>
                <span className='font-bold text-lg'>age level:</span>{' '}
                {danceClass.ageLevel.name}
              </li>
              <li>
                <span className='font-bold text-lg'>skill level:</span>{' '}
                {danceClass.skillLevel.name}
              </li>
            </ul>
          </div>
        </ContentContainer>
      </div>
    </div>
  )
}
