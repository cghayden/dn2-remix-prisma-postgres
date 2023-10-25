import type { AgeLevel, SkillLevel } from '@prisma/client'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { TextInput } from '~/components/forms/TextInput'
import { LevelEditableList } from '~/components/studios/LevelEditableList'
// import { LevelEditableList } from '~/components/studios/LevelEditableList'
// import { LevelList } from '~/components/studios/LevelList'
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
  const levels = useLoaderData<typeof loader>()
  const [editMode, toggleEditMode] = useState(false)
  return (
    <div>
      <div>
        <PageHeader headerText='Age Levels' />
        <button onClick={() => toggleEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <ContentContainer>
        {editMode ? (
          <>
            {levels.map((level) => (
              <LevelEditableList
                key={level.id}
                level={level}
                levelType='ageLevel'
              />
            ))}
          </>
        ) : (
          <LevList levels={levels} />
        )}
      </ContentContainer>
    </div>
  )
}

type Level_s_EditableListProps = {
  levels: AgeLevel[] | SkillLevel[]
  levelType: 'skill' | 'age'
}

type FetcherData = {
  success: boolean
}

const EditableList = ({ levels, levelType }: Level_s_EditableListProps) => {
  const fetcher = useFetcher<FetcherData>()
  let success = fetcher?.data?.success
  let isSaving = fetcher.state === 'submitting'
  let fetcherState = fetcher.state
  const [showSaveButton, toggleShowSaveButton] = useState(false)

  useEffect(() => {
    if (fetcherState === 'idle' && success) toggleShowSaveButton(false)
  }, [success, fetcherState])

  return (
    <div>
      {levels.map((level) => (
        <fetcher.Form
          key={level.id}
          id={level.id}
          method='post'
          action='/studio/editOrAddLevels/ResourceEditLevels'
          className=''
        >
          <input name={'levelId'} value={level.id} type='hidden' />
          <input name={'levelType'} value={levelType} type='hidden' />
          <div className='input_button_as_row'>
            <TextInput
              label={'Name'}
              name='newLevelName'
              defaultValue={level.name}
              onChange={() => toggleShowSaveButton(true)}
            />
            <TextInput
              label={'Description'}
              name='levelDescription'
              defaultValue={level.description ?? ''}
              onChange={() => toggleShowSaveButton(true)}
            />
            <div className='ml-auto'>
              <div className='flex gap-1'>
                {showSaveButton && (
                  <button
                    type='submit'
                    disabled={isSaving}
                    form={level.id}
                    className='text-sm rounded bg-blue-500  text-white hover:bg-blue-600 focus:bg-blue-400  transition duration-150 ease-in-out ml-auto px-2 py-[2px] '
                  >
                    Save
                  </button>
                )}
                <button
                  className=' text-sm bg-red-600 text-white rounded transition px-2 py-[2px] duration-150 ease-in-out'
                  onClick={() => toggleShowSaveButton(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </fetcher.Form>
      ))}
    </div>
  )
}

const LevList = ({ levels }: { levels: AgeLevel[] | SkillLevel[] }) => {
  return (
    <>
      {levels.map((level) => (
        <div
          key={level.id}
          className='px-4 py-2 grid grid-cols-2 items-center border-b-2 last:border-b-0'
        >
          <p className='text-sm font-semibold'>{level.name}</p>
          <p className='text-xs'>{level.description}</p>
        </div>
      ))}
    </>
  )
}
