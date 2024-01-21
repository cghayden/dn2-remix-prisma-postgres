import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Form, useLoaderData, useSubmit } from '@remix-run/react'
import axios from 'axios'
import { useState } from 'react'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const footwearId = params.id
  const url = new URL(request.url)
  const footwearName = url.searchParams.get('footwearName')
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.STORAGE_ACCESS_KEY!,
      secretAccessKey: process.env.STORAGE_SECRET!,
    },
    region: process.env.STORAGE_REGION,
  })
  const fileKey = `${footwearId}.jpeg`

  const presignedUrl = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: 'dancernotes',
      Key: fileKey,
      ContentType: 'image/jpeg',
    })
  )

  if (!presignedUrl)
    throw new Error('could not establish secure file upload url')

  return json({ presignedUrl, fileKey, footwearId, footwearName, error: null })
}

export default function ChangeFootwearImage() {
  const submit = useSubmit()
  const { presignedUrl, error, fileKey, footwearId, footwearName } =
    useLoaderData<typeof loader>()
  const [file, setFile] = useState<File | null>()
  const [submitting, setSubmitting] = useState(false)

  if (error || !presignedUrl) {
    return (
      <div>
        <p>there was an error establishing an upload client.</p>
        <p> Refresh the page to try again or try again later</p>
      </div>
    )
  }

  const handleS3Upload = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // if(!file){
    //   return null
    // }
    if (file) {
      try {
        const imageUploadResponse = await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        })
        console.log('imageUploadResponse', imageUploadResponse)
        // TODO - set busy UI

        // Handle successful upload response: programmatically submit form data to a resource route to save the file key to prisma, then redirect back to footwear page on success
        const formData = new FormData()
        formData.append('fileKey', fileKey)
        submit(formData, {
          method: 'post',
          action: `/studio/apparel/footwear/${footwearId}/resourceSaveImage`,
        })
      } catch (error) {
        console.error('Upload failed', error)
        setSubmitting(false)
        // TODO Handle upload error
      }
    }
  }
  return (
    <Form onSubmit={handleS3Upload} className='py-4 px-8'>
      <legend>Update {footwearName} Image</legend>
      <fieldset disabled={submitting}>
        <div className='input_item'>
          <input
            type='file'
            accept='image/jpeg'
            name='img'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                setFile(e.target.files[0])
              }
            }}
          />
          <div className='pt-4'>
            <button className='btn btn-confirm mr-4' type='submit'>
              Save Image
            </button>
            <button
              className='btn btn-cancel'
              // onClick={() => toggleShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </fieldset>
    </Form>
  )
}
