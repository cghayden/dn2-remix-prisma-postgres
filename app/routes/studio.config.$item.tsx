import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useRef, useState } from 'react'
import { UpsertLevelForm } from '~/components/studios/UpsertLevelForm'
import { LevelList } from '~/components/studios/LevelList'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getAgeLevels, getSkillLevels } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

// export async function loader({ request }: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   const  = url.searchParams.get("")

//   return {}
// }

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const item = params.item
  console.log('item', item)
  // item = "ageLevels" | "skillLevels" | "shoes" | "tights"
  switch (item) {
    case 'ageLevels': {
      const data = await getAgeLevels(userId)
      return json({ data, page: 'Age Levels', itemType: 'ageLevel' })
    }
    case 'skillLevels': {
      const data = await getSkillLevels(userId)
      return json({ data, page: 'Skill Levels', itemType: 'skillLevel' })
    }
    default:
      throw new Error('no query provided')
  }
}

export default function ItemListingPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const { data, page, itemType } = useLoaderData<typeof loader>()
  const [editMode, toggleEditMode] = useState(false)
  return (
    <div>
      <div>
        <PageHeader headerText={page} />
      </div>
      <div className='text-right mb-2 pr-4'>
        <button
          className='text-white bg-gray-700 p-2 rounded-md '
          onClick={() => toggleEditMode(!editMode)}
        >
          {editMode ? 'Cancel' : `Edit / Add New ${page}`}
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
            {data.map((level) => (
              <UpsertLevelForm
                key={level.id}
                level={level}
                // levelType='ageLevel'
                levelType={itemType}
              />
            ))}
          </>
        ) : (
          <LevelList levels={data} />
        )}
        {editMode && <UpsertLevelForm formRef={formRef} levelType={itemType} />}
      </ContentContainer>
    </div>
  )
}
