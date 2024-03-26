import { useFetcher } from '@remix-run/react'
import { useEffect } from 'react'

type DeleteLevelProps = {
  originalEntry: string
  actionType: 'delete'
  // formRef?: React.RefObject<HTMLFormElement>
}

export default function DeleteItemFromArray({
  originalEntry,
  actionType,
}: DeleteLevelProps) {
  const fetcher = useFetcher()
  console.log('fetcher deleteLevel', fetcher)
  let isDeleting = fetcher.state === 'submitting'

  // useEffect(() => {
  //   if (fetcher.state === 'idle' && fetcher?.data?.error) {
  //     alert(
  //       'This skill level cannot be deleted, as there are dance classes that are using it.  You can edit the skill level, or change all dance classes that useit to another skil level, and then delete it'
  //     )
  //   }
  // }, [fetcher])

  return (
    <>
      <fetcher.Form
        id={`delete${originalEntry}`}
        method='post'
        action='../settings/ResourceEditStringArray'
        className='pl-3 '
      >
        <input type='hidden' name='originalEntry' value={originalEntry} />
        <input type='hidden' name='actionType' value={actionType} />
        <button
          disabled={isDeleting}
          form={`delete${originalEntry}`}
          className='text-sm rounded bg-rose-700  text-white hover:bg-rose-600 rose:bg-indigo-600  transition duration-150 ease-in-out ml-auto px-2 py-[2px]  '
        >
          Delete
        </button>
      </fetcher.Form>
    </>
  )
}
