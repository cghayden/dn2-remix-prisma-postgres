import { type LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { getDancer } from '~/models/dancer.server'

import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { z } from 'zod'
import { useState } from 'react'

const schema = z.object({
  imgFile: z.instanceof(File, { message: 'file is required' }),
})

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const dancerId = params.id
  console.log('dancerId', dancerId)
  if (!dancerId) {
    return redirect('/parent')
  }
  const dancer = await getDancer(dancerId)
  if (!dancer || !dancer.id) {
    return redirect('/parent')
  }
  return json({ dancer })
}

export default function DancerIndex() {
  const { dancer } = useLoaderData<typeof loader>()
  const [file, setFile] = useState(undefined)
  console.log('file', file)

  const [form, { imgFile }] = useForm({
    onValidate({ formData }) {
      return parse(formData, { schema })
    },
  })
  console.log('imgFile from component', imgFile)

  const onFileChange = (e) => {
    console.log('file input change', e.target.files)
    setFile(e.target.files[0])
  }

  const handleImageSave = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log('e:', e)
    const target = e.target as typeof e.target & {
      imgFile: { value: string }
    }
    const imgFile = target.imgFile.value // typechecks!
    console.log('imgFile in handle submit', imgFile)
    // etc...
  }

  return (
    <>
      <h1 className='text-xl font-bold py-4'>Dancer Page/Index</h1>
      <ContentContainer>
        <div className='p-8'>
          <p>{dancer.firstName}</p>
        </div>
        {dancer.img ? (
          <p>display image</p>
        ) : (
          <Form
            encType='multipart/form-data'
            {...form.props}
            onSubmit={(e) => handleImageSave(e)}
          >
            <div className='input_item'>
              <label className='block'>
                Add an image for {dancer.firstName}
              </label>
              <input
                type='file'
                accept='image/*'
                name='imgFile'
                onChange={(e) => onFileChange(e)}
              />
              <button>Save Image</button>
            </div>
          </Form>
        )}
      </ContentContainer>
    </>
  )
}
