import { type LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { getDancer } from '~/models/dancer.server'

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
          <Form>
            <div className='input_item'>
              <div>
                <label>Add an image for {dancer.firstName}</label>
                <input type='file' accept='image/*' name='imgFile' />
              </div>
            </div>
          </Form>
        )}
      </ContentContainer>
    </>
  )
}