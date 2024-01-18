import { type AgeLevel, type SkillLevel } from '@prisma/client'
import { useFetcher } from '@remix-run/react'
import { TextInput } from '../forms/TextInput'
import { useEffect, useState } from 'react'
import { useForm } from '@conform-to/react'
import { type action } from '../../routes/studio.settings.ResourceEditLevels'

type LevelEditableListProps = {
  level?: AgeLevel | SkillLevel
  // levelType: 'skillLevel' | 'ageLevel'
  levelType: string
  formRef?: React.RefObject<HTMLFormElement>
}

export function UpsertLevelForm({
  level,
  levelType,
  formRef,
}: LevelEditableListProps) {
  const fetcher = useFetcher<typeof action>()
  console.log('fetcher', fetcher)
  const lastSubmission = fetcher?.data
  console.log('lastSubmission', lastSubmission)
  let success = fetcher?.data
  let isSaving = fetcher.state === 'submitting'
  let fetcherState = fetcher.state
  const [showSaveButton, toggleShowSaveButton] = useState(false)

  useEffect(() => {
    if (fetcherState === 'idle' && success) {
      toggleShowSaveButton(false)
      formRef?.current?.reset()
    }
  }, [success, fetcherState, formRef])

  const [form] = useForm({
    lastSubmission,
  })

  return (
    <fetcher.Form
      {...form.props}
      id={level?.id ?? `new${levelType}`}
      method='post'
      action='../settings/ResourceEditLevels'
      className='pl-3'
      ref={formRef}
    >
      <input name={'levelId'} value={level?.id ?? 'new'} type='hidden' />
      <input name={'levelType'} value={levelType} type='hidden' />
      <div className=' levels_edit'>
        <TextInput
          label={''}
          name='newLevelName'
          defaultValue={level?.name ?? ''}
          onChange={() => toggleShowSaveButton(true)}
          error={
            lastSubmission?.error?.newLevelName
              ? lastSubmission?.error?.newLevelName[0]
              : undefined
          }
        />
        <TextInput
          label={''}
          name='levelDescription'
          defaultValue={level?.description ?? ''}
          onChange={() => toggleShowSaveButton(true)}
          error={
            lastSubmission?.error?.levelDescription
              ? lastSubmission?.error?.levelDescription[0]
              : undefined
          }
        />
        <div className='w-[80px]'>
          {showSaveButton && (
            <button
              type='submit'
              disabled={isSaving}
              form={level?.id ?? `new${levelType}`}
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
