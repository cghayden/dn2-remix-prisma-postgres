import { useFetcher } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import type { ActionResponse } from 'types'
import { TextInput } from '../forms/TextInput'

export default function AgeLevelsForm() {
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
      <h2 className='text-center'>Add a New Age Level</h2>
      <fetcher.Form
        id='addAgeForm'
        ref={formRef}
        method='post'
        action='resourceAddAgeLevel'
        className='form_default'
      >
        <div className='input_section_wrapper'>
          <TextInput
            name='newLevel'
            label='Add a New Age Level'
            refProp={newLevelRef}
            ariaInvalid={actionData?.errors?.newLevel ? true : undefined}
            required={true}
            validationError={actionData?.errors?.newLevel}
          />
          <TextInput
            name='description'
            label='Description of Skill Level'
            refProp={descriptionRef}
            ariaInvalid={actionData?.errors?.description ? true : undefined}
            required={false}
            validationError={actionData?.errors?.description}
          />
          <button
            type='submit'
            form='addAgeForm'
            className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
          >
            Save Age Level
          </button>
        </div>
      </fetcher.Form>
    </div>
  )
}
