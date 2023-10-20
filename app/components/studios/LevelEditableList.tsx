import { type AgeLevel, type SkillLevel } from '@prisma/client'
import { useFetcher } from '@remix-run/react'
import { TextInput } from '../forms/TextInput'
import { useEffect, useState } from 'react'

type FetcherData = {
  success: boolean
}

type LevelEditableListProps = {
  level: AgeLevel | SkillLevel
  levelType: 'skillLevel' | 'ageLevel'
}

export function LevelEditableList({
  level,
  levelType,
}: LevelEditableListProps) {
  const fetcher = useFetcher<FetcherData>()
  let success = fetcher?.data?.success
  let isSaving = fetcher.state === 'submitting'
  let fetcherState = fetcher.state
  const [showForm, toggleShowForm] = useState(false)
  const [showSaveButton, toggleShowSaveButton] = useState(false)

  useEffect(() => {
    if (fetcherState === 'idle' && success) toggleShowForm(false)
  }, [success, fetcherState])

  return (
    <>
      {showForm ? (
        <fetcher.Form
          key={level.id}
          id={level.id}
          method='post'
          action='ResourceEditLevels'
          className=''
        >
          <input name={'levelId'} value={level.id} type='hidden' />
          <input name={'levelType'} value={levelType} type='hidden' />
          <div className='input_button_as_row'>
            <TextInput
              label={null}
              name='newLevelName'
              defaultValue={level.name}
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
                  onClick={() => toggleShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </fetcher.Form>
      ) : (
        <div className='flex '>
          <button
            onClick={() => toggleShowForm(true)}
            className='text-sm rounded bg-blue-500  text-white hover:bg-blue-600 focus:bg-blue-400  transition duration-150 ease-in-out px-2 h-6'
          >
            Edit
          </button>

          <p className='ml-4'>{level.name}</p>
        </div>
      )}
    </>
  )
}
