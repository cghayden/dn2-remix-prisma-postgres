import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import AddLevelForm from '~/components/studios/AddLevelForm'
import AddSkillLevelForm from '~/components/studios/AddSkillLevelForm'
import { LevelEditableList } from '~/components/studios/LevelEditableList'
import { getStudioConfig } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const config = await getStudioConfig(userId)
  if (!config) {
    throw new Error('Oh no! studio config could not be loaded')
  }
  return config
  // return { config: json({ config }), nojson: config }
}

export default function EditAddAgeLevels() {
  const config = useLoaderData<typeof loader>()

  return (
    <div className='p-4'>
      <h1 className='text-center text-lg font-semibold'>
        Edit or Add Age or Skill Levels
      </h1>

      <div className='flex flex-wrap justify-center gap-10 bg-white p-4'>
        <div className='w-[350px] p-4'>
          <h2 className='text-center'>Age Levels</h2>
          <div className='p-2 flex flex-col gap-1'>
            {config.ageLevels.map((level) => (
              <LevelEditableList
                level={level}
                levelType='ageLevel'
                key={level.id}
              />
            ))}
          </div>
        </div>
        <AddLevelForm levelType='ageLevel' />
      </div>

      <div className='flex flex-wrap justify-center gap-10 bg-white p-4'>
        <div className='w-[350px] p-4'>
          <h2 className='text-center'>Skill Levels</h2>
          <div className='p-2 flex flex-col gap-1'>
            {config.skillLevels.map((level) => (
              <LevelEditableList
                level={level}
                levelType='skillLevel'
                key={level.id}
              />
            ))}
          </div>
        </div>
        <AddLevelForm levelType='skillLevel' />
      </div>
    </div>
  )
}
