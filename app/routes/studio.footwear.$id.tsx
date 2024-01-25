import {
  type ActionFunctionArgs,
  json,
  redirect,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import {
  Form,
  Link,
  Outlet,
  useActionData,
  useLoaderData,
} from '@remix-run/react'
import { requireUserId } from '~/session.server'
import { z } from 'zod'
import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { TextInput } from '~/components/forms/TextInput'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { PanelHeader } from '~/components/styledComponents/PanelHeader'
import { getFootwearItem, upsertStudioFootwear } from '~/models/studio.server'
import ImagePlaceHolderIcon from '~/components/icons/ImagePlaceHolderIcon'
import { useState } from 'react'

const footwearSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2),
  description: z.string().min(2).optional(),
  url: z.string().url().optional(),
  danceClassIds: z.string().array().optional().default([]),
  footwearId: z.string().default('new'),
})

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const submission = parse(formData, { schema: footwearSchema })

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  const { name, description, url, footwearId, danceClassIds } = submission.value

  const footwear = await upsertStudioFootwear({
    footwearId,
    studioId: userId,
    name,
    description,
    url,
    danceClassIds,
  })

  return redirect(`/studio/footwear/${footwear.id}`)
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const footwearId = params.id

  if (!footwearId) {
    throw new Error('no footwear Id was provided')
  }

  const footwearItem = await getFootwearItem(footwearId)
  if (footwearItem?.studioId !== userId) {
    throw new Error('you cannot view this item')
  }

  return footwearItem
}

export default function IndividualShoePage() {
  const footwearItem = useLoaderData<typeof loader>()
  const lastSubmission = useActionData<typeof action>()
  const [form, { name, description, url }] = useForm({ lastSubmission })
  const [dirtyForm, toggleDirtyForm] = useState(false)

  return (
    <div>
      <PageHeader headerText='Footwear' actionRoute='add' navigateBack={true} />
      <ContentContainer className='m-3'>
        <PanelHeader
          headerText={footwearItem.name}
          // editRoute={`../edit/${footwearItem.id}`}
        />
        <div className='item-image-section_wrapper px-4'>
          <div className='item-image-section'>
            <div className='min-w-48 min-h-48 w-52 h-52 mx-auto text-center bg-slate-300'>
              {footwearItem.imageFilename ? (
                <>
                  <img
                    className='w-full h-full object-contain object-center'
                    src={`https://dancernotes.s3.us-east-2.amazonaws.com/${footwearItem.imageFilename}`}
                    alt='footwear pic'
                  />

                  <Link to={`uploadImage?new=false`}>Add /Change Image</Link>
                </>
              ) : (
                <div className='flex flex-col items-center justify-center h-full w-full'>
                  <Link
                    to={'uploadImage/?new=true'}
                    className=' text-indigo-600 w-full h-full'
                  >
                    <div className='flex flex-col justify-center w-full h-full'>
                      <div className='mx-auto mb-4'>
                        <ImagePlaceHolderIcon w={'60'} h={'60'} />
                      </div>
                      Add an Image
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Outlet context={{ footwearItemName: footwearItem.name }} />
        </div>
        <Form
          onChange={() => toggleDirtyForm(true)}
          method='post'
          id='editFootwear'
          {...form.props}
          className='form_default'
        >
          <fieldset>
            <div className='input_section_wrapper'>
              <input type='hidden' value={footwearItem.id} name='footwearId' />
              <div className='input_item'>
                <TextInput
                  label={'Name'}
                  name='name'
                  defaultValue={footwearItem?.name ?? ''}
                  error={name.error}
                  required={true}
                />
              </div>
              <div className='input_item'>
                <TextInput
                  label={'Description'}
                  name='description'
                  defaultValue={footwearItem?.description ?? ''}
                  error={description.error}
                  required={false}
                />
              </div>
              <div className='input_item'>
                <TextInput
                  label={'Url'}
                  name='url'
                  defaultValue={footwearItem?.url ?? ''}
                  error={url.error}
                  required={false}
                />
              </div>
            </div>

            <div className='p-4'>
              <section>
                <h3 className='text-lg font-bold my-2'>Classes</h3>
                <ul>
                  <li>Dummy Data Class Listngs...</li>
                  <li>Junior Hip Hop</li>
                  <li>Production</li>
                  <li>Junior Company Hip Hop</li>
                  <li>Teen Company Hip Hop</li>
                  <li>Senior Company Hip Hop</li>
                </ul>
              </section>
            </div>
            <button
              type='submit'
              form='editFootwear'
              className=' btn btn-action'
              disabled={!dirtyForm}
            >
              Save Changes
            </button>
          </fieldset>
        </Form>
      </ContentContainer>
    </div>
  )
}
