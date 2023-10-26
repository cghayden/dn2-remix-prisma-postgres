import { type AgeLevel, type SkillLevel } from '@prisma/client'
import { useFetcher } from '@remix-run/react'
import { TextInput } from '../forms/TextInput'
import { useEffect, useState } from 'react'

type FetcherData = {
  success: boolean
}

type LevelEditableListProps = {
  level?: AgeLevel | SkillLevel
  levelType: 'skillLevel' | 'ageLevel'
  formRef?: React.RefObject<HTMLFormElement>
}

export function UpsertLevelForm({
  level,
  levelType,
  formRef,
}: LevelEditableListProps) {
  const fetcher = useFetcher<FetcherData>()
  let success = fetcher?.data?.success
  let isSaving = fetcher.state === 'submitting'
  let fetcherState = fetcher.state
  const [showSaveButton, toggleShowSaveButton] = useState(false)

  useEffect(() => {
    if (fetcherState === 'idle' && success) {
      toggleShowSaveButton(false)
      formRef?.current?.reset()
    }
  }, [success, fetcherState, formRef])

  return (
    <fetcher.Form
      id={level?.id ?? 'newLevel'}
      method='post'
      action='/studio/ResourceEditLevels'
      className=''
      ref={formRef}
    >
      <input name={'levelId'} value={level?.id ?? 'new'} type='hidden' />
      <input name={'levelType'} value={levelType} type='hidden' />
      <div className=' levels_edit'>
        <TextInput
          classProps='flex-1'
          label={''}
          name='newLevelName'
          defaultValue={level?.name ?? ''}
          onChange={() => toggleShowSaveButton(true)}
        />
        <TextInput
          label={''}
          name='levelDescription'
          defaultValue={level?.description ?? ''}
          onChange={() => toggleShowSaveButton(true)}
        />
        <div className='w-[80px]'>
          {showSaveButton && (
            <button
              type='submit'
              disabled={isSaving}
              form={level?.id ?? 'newLevel'}
              className='text-sm rounded bg-blue-500  text-white hover:bg-blue-600 focus:bg-blue-400  transition duration-150 ease-in-out ml-auto px-2 py-[2px] '
            >
              Save
            </button>
          )}
          {/* <button
              type='button'
              className=' text-sm bg-red-600 text-white rounded transition px-2 py-[2px] duration-150 ease-in-out'
              onClick={() => toggleShowSaveButton(false)}
            >
              Cancel
            </button> */}
        </div>
      </div>
    </fetcher.Form>
  )
}
