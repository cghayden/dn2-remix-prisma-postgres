import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import AgeLevelsList from '~/components/studios/AgeLevelsList'
import SkillLevelsList from '~/components/studios/SkillLevelsList'
import { getStudioConfig } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const configData = await getStudioConfig(userId)
  if (!configData) {
    throw new Error('Oh no! dance ageLevels could not be loaded')
  }
  return json({ configData })
}

export default function Configuration() {
  const { configData } = useLoaderData<typeof loader>()

  return (
    <div className='flex min-h-screen flex-col'>
      <h1>Studio Settings and Configuration</h1>
      <AgeLevelsList ageLevels={configData.ageLevels} />
      <SkillLevelsList skillLevels={configData.skillLevels} />
    </div>
  )
}
