import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useRef, useState } from 'react'
import { UpsertLevelForm } from '~/components/studios/UpsertLevelForm'
import { LevelList } from '~/components/studios/LevelList'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getAgeLevels } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const ageLevels = await getAgeLevels(userId)
  if (!ageLevels) {
    throw new Error('Oh no! ageLevels could not be loaded')
  }
  return ageLevels
}
export default function AgeLevelsPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const levels = useLoaderData<typeof loader>()
  const [editMode, toggleEditMode] = useState(false)
  return (
    <div>
      <div>
        <PageHeader headerText='Age Levels' />
      </div>
      <div className='text-right mb-2 pr-4'>
        <button
          className='text-white bg-gray-700 p-2 rounded-md '
          onClick={() => toggleEditMode(!editMode)}
        >
          {editMode ? 'Cancel' : 'Edit / Add New Age Level'}
        </button>
      </div>
      <ContentContainer>
        <thead className='block'>
          <tr className='bg-gray-200 py-1 grid grid-cols-2 justify-items-start rounded-t-md'>
            <th className='pl-2'>Name</th>
            <th className='pl-2'>Description</th>
          </tr>
        </thead>
        {editMode ? (
          <>
            {levels.map((level) => (
              <UpsertLevelForm
                key={level.id}
                level={level}
                levelType='ageLevel'
              />
            ))}
          </>
        ) : (
          <LevelList levels={levels} />
        )}
        {editMode && <UpsertLevelForm formRef={formRef} levelType='ageLevel' />}
      </ContentContainer>
    </div>
  )
}
