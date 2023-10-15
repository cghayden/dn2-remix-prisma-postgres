import { useFetcher } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import type { ActionResponse } from 'types'
import { TextInput } from '../forms/TextInput'

export default function DanceLevelsForm() {
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
    <div>
      <h2>Add a new Level</h2>
      <fetcher.Form
        id='addForm'
        ref={formRef}
        method='post'
        action='ResourceAddDanceLevel'
        className='space-y-6'
      >
        <TextInput
          name='newLevel'
          label='Name of Skill Level'
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
          form='addForm'
          className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
        >
          Add Level
        </button>
      </fetcher.Form>
    </div>
  )
}
