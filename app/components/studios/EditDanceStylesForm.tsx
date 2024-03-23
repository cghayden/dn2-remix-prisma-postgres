import { useFetcher } from '@remix-run/react'
import { TextInput } from '../forms/TextInput'
import { useEffect, useState } from 'react'
import { useForm } from '@conform-to/react'
import { type action } from '../../routes/studio.settings.ResourceEditLevels'
// import RemoveStringFromDbArray from '../RemoveStringFromDbArray'

type EditableListProps = {
  entry?: string
  entryType: string // 'stylesOfDance', 'other?', etc.
  // formRef?: React.RefObject<HTMLFormElement>
}

export function EditDanceStylesForm({
  entry,
  entryType,
}: // formRef,
EditableListProps) {
  const fetcher = useFetcher<typeof action>()
  const lastSubmission = fetcher?.data
  // let success = fetcher?.data
  let isSaving = fetcher.state === 'submitting'
  // let fetcherState = fetcher.state
  const [showSaveButton, toggleShowSaveButton] = useState(false)

  // useEffect(() => {
  //   if (fetcherState === 'idle' && success) {Z
  //     toggleShowSaveButton(false)
  //     formRef?.current?.reset()
  //   }
  // }, [success, fetcherState, formRef])

  const [form] = useForm({
    lastSubmission,
  })

  return (
    <tr>
      <td className='relative'>
        <fetcher.Form
          {...form.props}
          id='editStringArray'
          method='post'
          action='../settings/ResourceEditStringArray'
          className='pl-3'
          // ref={formRef}
        >
          <input name={'field'} value={entryType} type='hidden' />
          <div className=' levels_edit'>
            <TextInput
              label={''}
              name='editEntry'
              defaultValue={entry ?? ''}
              onChange={() => toggleShowSaveButton(true)}
              error={''}
              // error={
              //   lastSubmission?.error?.newEntry
              //     ? lastSubmission?.error?.newLevelName[0]
              //     : undefined
              // }
            />

            <div className='w-[80px]'>
              {showSaveButton && (
                <button
                  type='submit'
                  disabled={isSaving}
                  form='editStringArray'
                  className='text-sm rounded bg-blue-500  text-white hover:bg-blue-600 focus:bg-blue-400  transition duration-150 ease-in-out ml-auto px-2 py-[2px] '
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </fetcher.Form>
        {/* <>
        {entry ? <RemoveStringFromDbArray entry={entry} /> : null}
        </> */}
      </td>
    </tr>
  )
}
