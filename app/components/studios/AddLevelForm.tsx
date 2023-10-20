import { useFetcher } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import type { ActionResponse } from 'types'
import { TextInput } from '../forms/TextInput'

type AddLevelFormProps = {
  levelType: 'ageLevel' | 'skillLevel'
}

export default function AgeLevelsForm({ levelType }: AddLevelFormProps) {
  const heading = levelType === 'ageLevel' ? 'Age' : 'Skill'
  const fetcher = useFetcher<ActionResponse>()
  const actionData = fetcher.data
  const newLevelRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset()
      newLevelRef.current?.focus()
    }
    if (actionData?.errors?.newLevel) {
      newLevelRef.current?.focus()
    }
    if (actionData?.errors?.description) {
      descriptionRef.current?.focus()
    }
  }, [actionData])
  return (
    <div className='w-[350px] p-4'>
      <h2 className='text-center'>Add a New {heading} Level</h2>
      <fetcher.Form
        id={`add${levelType}`}
        ref={formRef}
        method='post'
        action='resourceAddLevel'
        className='form_default'
      >
        <div className='input_section_wrapper'>
          <input type='hidden' value={levelType} name='levelType' />
          <TextInput
            name='newLevel'
            label={`Add a New ${heading} Level`}
            refProp={newLevelRef}
            ariaInvalid={actionData?.errors?.[levelType] ? true : undefined}
            required={true}
            validationError={actionData?.errors?.[levelType]}
          />
          <TextInput
            name='description'
            label={`Description of ${heading} Level`}
            refProp={descriptionRef}
            ariaInvalid={actionData?.errors?.description ? true : undefined}
            required={false}
            validationError={actionData?.errors?.description}
          />
          <button
            type='submit'
            form={`add${levelType}`}
            className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
          >
            Save {heading} Level
          </button>
        </div>
      </fetcher.Form>
    </div>
  )
}
