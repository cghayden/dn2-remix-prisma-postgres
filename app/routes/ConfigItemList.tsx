import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useRef, useState } from 'react'
import { UpsertLevelForm } from '~/components/studios/UpsertLevelForm'
import { LevelList } from '~/components/studios/LevelList'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import type { AgeLevel, SkillLevel } from '@prisma/client'
import { getAgeLevels, getSkillLevels } from '~/models/studio.server'
import { requireUserId } from '~/session.server'
import { cn } from '~/lib/tailwindUtils'

// export async function loader({ request }: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   const  = url.searchParams.get("")

//   return {}
// }

// export const loader = async ({ request, params }: LoaderFunctionArgs) => {
//   const userId = await requireUserId(request)
//   const item = params.item
//   console.log('item', item)
//   // item = "ageLevels" | "skillLevels" | "shoes" | "tights"
//   switch (item) {
//     case 'ageLevels': {
//       const data = await getAgeLevels(userId)
//       return json({ data, page: 'Age Levels', itemType: 'ageLevel' })
//     }
//     case 'skillLevels': {
//       const data = await getSkillLevels(userId)
//       return json({ data, page: 'Skill Levels', itemType: 'skillLevel' })
//     }
//     default:
//       throw new Error('no query provided')
//   }
// }

type ConfigItemListProps = {
  data: AgeLevel[] | SkillLevel[]
  page: 'Age Levels' | 'Skill Levels'
  itemType: 'ageLevel' | 'skillLevel'
}

export default function ConfigItemList({
  data,
  page,
  itemType,
}: ConfigItemListProps) {
  // const { data, page, itemType } = useLoaderData<typeof loader>()
  console.log('data', data)

  const formRef = useRef<HTMLFormElement>(null)
  const [editMode, toggleEditMode] = useState(false)
  return (
    <div className='mb-8 border-red-600'>
      <div className='flex justify-between items-end relative'>
        <PageHeader headerText={page} className='pb-1' />
        <div className='text-right mb-2'>
          {editMode ? (
            <button
              className='btn-noBg-cancel'
              onClick={() => toggleEditMode(!editMode)}
            >
              Close Edit Mode
            </button>
          ) : (
            <button
              className='btn-noBg-action'
              onClick={() => toggleEditMode(!editMode)}
            >
              Edit / Add
            </button>
          )}
        </div>
        {/* Text that alerts the user that the field is in edit mode.  This is not needed as the red border and 'cancel edit mode' button should be enough of a UI signal: 

        {editMode && (
          <div className='text-rose-600 absolute bottom-0'>Edit Mode</div>
        )} */}
      </div>

      <ContentContainer
        className={cn({
          'border-2 border-rose-600': editMode === true,
          'border-2 border-transparent': editMode === false,
        })}
      >
        <thead className='block'>
          <tr className='bg-gray-200 py-1 grid grid-cols-2 justify-items-start rounded-t-md'>
            <th className='pl-2'>Name</th>
            <th className='pl-2'>Description</th>
          </tr>
        </thead>
        {!data.length && !editMode && (
          <p className='text-center py-8'>
            You have no {page}. Click "edit/add to create
          </p>
        )}
        {editMode ? (
          <>
            {data.map((level) => (
              <UpsertLevelForm
                key={level.id}
                level={level}
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
