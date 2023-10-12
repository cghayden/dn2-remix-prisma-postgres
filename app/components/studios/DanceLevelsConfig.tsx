import { type DanceLevel } from '@prisma/client'
import { useFetcher } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import type { ActionResponse } from 'types'
import { TextInput } from '../forms/TextInput'

export default function DanceLevelsConfig({
  danceLevels,
}: {
  danceLevels: DanceLevel[]
}) {
  const fetcher = useFetcher<ActionResponse>()
  console.log('fetcher', fetcher)
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
    <div className='mx-auto w-full max-w-md px-8'>
      <h3>Competitive and Skill Levels</h3>
      {!danceLevels?.length ? (
        <p>No dance levels found</p>
      ) : (
        <ul>
          {danceLevels?.map((level) => (
            <li key={level.id}>{level.name}</li>
          ))}
        </ul>
      )}
      <div>
        <fetcher.Form
          ref={formRef}
          method='post'
          action='updateDanceLevels'
          className='space-y-6'
        >
          <TextInput
            name='newLevel'
            label='Name of Level'
            ref={newLevelRef}
            ariaInvalid={actionData?.errors?.newLevel ? true : undefined}
            required={true}
            validationError={actionData?.errors?.description}
          />
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              description for this level{' '}
            </label>
            <div className='mt-1'>
              <input
                ref={descriptionRef}
                id='description'
                required
                autoFocus={true}
                name='description'
                type='text'
                autoComplete='description'
                aria-invalid={
                  actionData?.errors?.description ? true : undefined
                }
                aria-describedby='description-error'
                className='w-full rounded border border-gray-500 px-2 py-1 text-lg'
              />
              {actionData?.errors?.description ? (
                <div className='pt-1 text-red-700' id='description-error'>
                  {actionData.errors.description}
                </div>
              ) : null}
            </div>
          </div>
          <button
            type='submit'
            className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
          >
            Add Level
          </button>
        </fetcher.Form>
      </div>
    </div>
  )
}
