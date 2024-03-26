import { useEffect, useState } from 'react'
import { TextInput } from '../forms/TextInput'
import { useFetcher } from '@remix-run/react'
import { useForm } from '@conform-to/react'
import { type action } from '../../routes/studio.settings.ResourceEditStringArray'
import DeleteItemFromArray from './DeleteItemFromArray'

type EditableListProps = {
  entry?: string
  actionType: 'update' | 'new'
  arrayFormRef?: React.RefObject<HTMLFormElement>
}

export function EditArrayForm({
  entry,
  actionType,
  arrayFormRef,
}: EditableListProps) {
  const fetcher = useFetcher<typeof action>()
  console.log('fetcher edit array form', fetcher)
  const lastSubmission = fetcher?.data
  let success = fetcher?.data
  let isSaving = fetcher.state === 'submitting'
  let fetcherState = fetcher.state
  const [showSaveButton, toggleShowSaveButton] = useState(false)

  useEffect(() => {
    if (fetcherState === 'idle' && success) {
      toggleShowSaveButton(false)
      arrayFormRef?.current?.reset()
    }
  }, [success, fetcherState, arrayFormRef])

  const [form] = useForm({
    lastSubmission,
  })

  return (
    <tr>
      <td className='relative flex items-center'>
        <fetcher.Form
          {...form.props}
          id={`editStringArray${entry}`}
          method='post'
          action='../settings/ResourceEditStringArray'
          className='pl-3'
          ref={arrayFormRef}
        >
          <input type='hidden' name='originalEntry' value={entry} />
          <input type='hidden' name='actionType' value={actionType} />
          <div className=' levels_edit'>
            <TextInput
              label={''}
              name='newEntry'
              defaultValue={entry ?? ''}
              onChange={() => toggleShowSaveButton(true)}
              error={''}
            />
            <div className='flex items-center justify-end'>
              <div className='w-[80px]'>
                {showSaveButton && (
                  <button
                    type='submit'
                    disabled={isSaving}
                    form={`editStringArray${entry}`}
                    className='text-sm rounded bg-indigo-500  text-white hover:bg-indigo-600 focus:bg-indigo-400  transition duration-150 ease-in-out ml-auto px-2 py-[2px] '
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </fetcher.Form>
        {actionType === 'update' && entry && (
          <DeleteItemFromArray actionType='delete' originalEntry={entry} />
        )}
      </td>
    </tr>
  )
}
