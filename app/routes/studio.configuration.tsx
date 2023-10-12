import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useRouteError } from '@remix-run/react'
import DanceLevelsConfig from '~/components/studios/DanceLevelsConfig'
import { ErrorContainer } from '~/components/styledComponents/ErrorContainer'
import { getFullStudio } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const fullStudio = await getFullStudio(userId)
  if (!fullStudio) {
    throw new Error('Oh no! Studio could not be loaded')
  }
  return json(fullStudio)
}

export default function Configuration() {
  const studio = useLoaderData<typeof loader>()
  console.log('studio', studio)

  return (
    <div className='flex min-h-screen flex-col'>
      <h1>Studio Settings and Configuration</h1>
      <DanceLevelsConfig danceLevels={studio?.danceLevels} />
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  return <ErrorContainer error={error} />
}
