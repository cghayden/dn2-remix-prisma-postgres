import { useFetcher } from '@remix-run/react'
// import { useEffect } from 'react'

export default function RemoveStringFromDbArray({ entry }: { entry: string }) {
  const fetcher = useFetcher()
  // console.log('fetcher', fetcher)
  let isDeleting = fetcher.state === 'submitting'
  // let fetcherState = fetcher.state

  return (
    <>
      <fetcher.Form
        id={`delete${entry}`}
        method='post'
        action='../settings/ResourceEditStringArray'
        className='pl-3 absolute top-1/2 -translate-y-1/2 right-4'
      >
        <input type='hidden' name='entry' value={entry} />
        <input type='hidden' name='action' value={'remove'} />
        <button
          disabled={isDeleting}
          form={`delete${entry}`}
          className='text-sm rounded bg-blue-500  text-white hover:bg-blue-600 focus:bg-blue-400  transition duration-150 ease-in-out ml-auto px-2 py-[2px] '
        >
          Delete
        </button>
      </fetcher.Form>
    </>
  )
}
