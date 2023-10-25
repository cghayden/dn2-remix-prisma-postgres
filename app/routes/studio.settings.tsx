import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { LevelList } from '~/components/studios/LevelList'
import { getStudioConfig } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const configData = await getStudioConfig(userId)
  if (!configData) {
    throw new Error('Oh no! dance ageLevels could not be loaded')
  }
  return configData
}

export default function Configuration() {
  const { ageLevels, skillLevels } = useLoaderData<typeof loader>()

  return (
    <div className='flex min-h-screen flex-col gap-5'>
      <h1>Studio Settings and Configuration</h1>
      <LevelList levels={ageLevels} levelType='ageLevels' />
      <LevelList levels={skillLevels} levelType='skillLevels' />
    </div>
  )
}
