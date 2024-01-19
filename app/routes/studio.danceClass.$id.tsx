import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
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
  console.log('danceClass', danceClass)

  return (
    <div>
      <PageHeader headerText={danceClass.name} />

      <ContentContainer>
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
  )
}
