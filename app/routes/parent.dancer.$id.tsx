import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type UploadHandler,
} from '@remix-run/node'
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
  redirect,
} from '@remix-run/node'
import {
  Form,
  Link,
  Outlet,
  useActionData,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { getDancer } from '~/models/dancer.server'
// import { myUploadHandler, s3UploadHandler } from '~/lib/s3UploadHandler.server'
// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { useEffect, useState } from 'react'
// import { formatUrl } from '@aws-sdk/util-format-url'
import { s3UploadHandler } from '~/lib/s3UploadHandler.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  //get presigned url

  //send url to front end

  const uploadHandler: UploadHandler = composeUploadHandlers(
    s3UploadHandler,
    createMemoryUploadHandler()
  )
  const formData = await parseMultipartFormData(request, uploadHandler)
  return json({ action: 'trial' })
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const dancerId = params.id

  if (!dancerId) {
    return redirect('/parent')
  }
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
      <ContentContainer>
        <div className='p-8'>
          <p>{dancer.firstName}</p>
        </div>
        {!showForm && (
          <div className='py-4 px-8'>
            <Link
              to={`addImage`}
              className='btn btn-action'
              onClick={() => toggleShowForm(true)}
            >
              Add Image
            </Link>
          </div>
        )}
        <Outlet context={{ showForm, toggleShowForm } satisfies ContextType} />
      </ContentContainer>
    </>
  )
}

export function useFormState() {
  return useOutletContext<ContextType>()
}

// If you're using TypeScript, we recommend the parent component provide a custom hook for accessing the context value. This makes it easier for consumers to get nice typings, control consumers, and know who's consuming the context value. Here's a more realistic example:
