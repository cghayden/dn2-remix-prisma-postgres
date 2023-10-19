import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import AddAgeLevelForm from '~/components/studios/AddAgeLevelForm'
import AddSkillLevelForm from '~/components/studios/AddSkillLevelForm'
import EditAgeLevels from '~/components/studios/EditAgeLevels'
import EditSkillLevels from '~/components/studios/EditSkillLevels'
import { getStudioConfig } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const config = await getStudioConfig(userId)
  if (!config) {
    throw new Error('Oh no! studio config could not be loaded')
  }
  return json({ config })
}

export default function EditAddAgeLevels() {
  const { config } = useLoaderData<typeof loader>()
  return (
    <div className='p-4'>
      <h1>Edit or Add to Skill or Age Levels</h1>

      <div className='flex flex-wrap justify-center gap-10 bg-white p-4'>
        <div>
          <EditAgeLevels ageLevels={config.ageLevels} />
        </div>
        <AddAgeLevelForm />
      </div>

      <div className='flex flex-wrap justify-center gap-10 bg-white p-4'>
        <div>
          <EditSkillLevels skillLevels={config.skillLevels} />
        </div>
        <AddSkillLevelForm />
      </div>
    </div>
  )
}
