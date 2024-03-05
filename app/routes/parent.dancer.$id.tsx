import { type LoaderFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useOutletContext } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { getDancer, raw_getDancer } from '~/models/dancer.server'
import { useEffect, useState } from 'react'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const dancerId = params.id

  if (!dancerId) {
    return redirect('/parent')
  }
  //   const dancer = await raw_getDancer({ dancerId })
  //   console.log('raw dancer', dancer)
  //   if (!dancer) {
  //     return redirect('/parent')
  //   }
  //   return json({ dancer })
  // }
  const dancer = await getDancer(dancerId)
  if (!dancer || !dancer.id) {
    return redirect('/parent')
  }
  return json({ dancer })
}

type ContextType = {
  showForm: boolean
  toggleShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DancerIndex() {
  const [showForm, toggleShowForm] = useState<boolean>(false)
  const { dancer } = useLoaderData<typeof loader>()

  useEffect(() => {
    toggleShowForm(false)
  }, [])

  return (
    <>
      <h1 className='text-xl font-bold py-4'>Dancer Page/Index</h1>
      <ContentContainer className='relative w-5/6 max-w-[600px]'>
        <div className='absolute top-0 right-0 p-4'>
          <Link to={`edit`} className='text-rose-600'>
            Edit Dancer
          </Link>
        </div>
        <div className='p-8'>
          {/* not currently using images until content moderation can be implemented */}
          {/* <div className='w-36'>
            <img
              src={`https://dancernotes.s3.us-east-2.amazonaws.com/${dancer.imageFilename}`}
              alt='dancerImage'
            />
          </div> */}
          <p>{dancer.firstName}</p>
        </div>
        {/* not currently using images until content moderation can be implemented */}
        {/* {!showForm && (
          <div className='py-4 px-8'>
            <Link
              to={`addImage`}
              className='btn btn-action'
              onClick={() => toggleShowForm(true)}
            >
              Add Image
            </Link>
          </div>
        )} */}
        <Outlet context={{ showForm, toggleShowForm } satisfies ContextType} />
      </ContentContainer>
    </>
  )
}

export function useFormState() {
  return useOutletContext<ContextType>()
}

// If you're using TypeScript, we recommend the parent component provide a custom hook for accessing the context value. This makes it easier for consumers to get nice typings, control consumers, and know who's consuming the context value. Here's a more realistic example:
