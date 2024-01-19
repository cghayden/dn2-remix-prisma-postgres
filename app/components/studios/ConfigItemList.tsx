import { useRef, useState } from 'react'
import { UpsertLevelForm } from '~/components/studios/UpsertLevelForm'
import { LevelList } from '~/components/studios/LevelList'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import type { AgeLevel, SkillLevel } from '@prisma/client'
import { cn } from '~/lib/tailwindUtils'

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
        <table className='w-full'>
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
          {/* if in edit mode, make all current levels names and desc. editable, otherwise just list them */}
          {editMode ? (
            <tbody>
              {data.map((level) => (
                <UpsertLevelForm
                  key={level.id}
                  level={level}
                  levelType={itemType}
                />
              ))}
            </tbody>
          ) : (
            <LevelList levels={data} />
          )}
          {/* in edit provide a blank entry at the end of the list to enter a new level name and desc. */}
          {editMode && (
            <UpsertLevelForm formRef={formRef} levelType={itemType} />
          )}
        </table>
      </ContentContainer>
    </div>
  )
}
