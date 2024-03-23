import { useEffect, useState } from 'react'
import { TextInput } from '../forms/TextInput'
import { useFetcher } from '@remix-run/react'
import { useForm } from '@conform-to/react'
import { type action } from '../../routes/studio.settings.ResourceEditStringArray'
type EditableListProps = {
  entry?: string
  actionType: 'update' | 'new'
  formRef?: React.RefObject<HTMLFormElement>
}

export function EditArrayForm({
  entry,
  actionType,
  formRef,
}: EditableListProps) {
  const fetcher = useFetcher<typeof action>()
  const lastSubmission = fetcher?.data
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
    <tr>
      <td className='relative'>
        <fetcher.Form
          {...form.props}
          id={`editStringArray${entry}`}
          method='post'
          action='../settings/ResourceEditStringArray'
          className='pl-3'
          ref={formRef}
        >
          <div className=' levels_edit'>
            <input type='hidden' name='originalEntry' value={entry} />
            <input type='hidden' name='actionType' value={actionType} />
            <TextInput
              label={''}
              name='newEntry'
              defaultValue={entry ?? ''}
              onChange={() => toggleShowSaveButton(true)}
              error={''}
            />
            <div className='w-[80px]'>
              {showSaveButton && (
                <button
                  type='submit'
                  disabled={isSaving}
                  form={`editStringArray${entry}`}
                  className='text-sm rounded bg-blue-500  text-white hover:bg-blue-600 focus:bg-blue-400  transition duration-150 ease-in-out ml-auto px-2 py-[2px] '
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </fetcher.Form>
      </td>
    </tr>
  )
}
