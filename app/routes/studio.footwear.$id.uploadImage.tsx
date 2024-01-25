import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate, useSubmit } from '@remix-run/react'
import axios from 'axios'
import { useState } from 'react'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const footwearId = params.id
  const url = new URL(request.url)
  const saveToPrisma = url.searchParams.get('new')
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

  return json({ presignedUrl, fileKey, footwearId, error: null, saveToPrisma })
}

export default function AddFootwearImage() {
  const submit = useSubmit()
  const navigate = useNavigate()
  const { presignedUrl, error, fileKey, footwearId, saveToPrisma } =
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
        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        })
        // TODO - set busy UI

        // Handle successful upload response: programmatically submit form data to a resource route to save the file key to prisma, then redirect back to footwear page on success
        if (saveToPrisma) {
          const formData = new FormData()
          formData.append('fileKey', fileKey)
          submit(formData, {
            method: 'post',
            action: `/studio/footwear/${footwearId}/resourceSaveImage`,
          })
        }
      } catch (error) {
        console.error('Upload failed', error)
        setSubmitting(false)
        // TODO Handle upload error
      }
    }
  }
  return (
    <form onSubmit={handleS3Upload} className='py-4 px-8'>
      <legend className='font-bold '>Add Image</legend>
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
            <button
              className='btn btn-confirm mr-4'
              type='submit'
              disabled={!file}
            >
              Save Image
            </button>
            <button className='btn btn-cancel' onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
