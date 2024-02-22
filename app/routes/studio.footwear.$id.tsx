import {
  type ActionFunctionArgs,
  json,
  redirect,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import {
  Form,
  Outlet,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react'
import { requireUserId } from '~/session.server'
import { z } from 'zod'
import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { TextInput } from '~/components/forms/TextInput'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PanelHeader } from '~/components/styledComponents/PanelHeader'
import { getFootwearItem, upsertStudioFootwear } from '~/models/studio.server'
// import ImagePlaceHolderIcon from '~/components/icons/ImagePlaceHolderIcon'
import { useState } from 'react'
import deleteItem from '~/lib/deleteItemUtil'

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

  await upsertStudioFootwear({
    footwearId,
    studioId: userId,
    name,
    description,
    url,
    danceClassIds,
  })

  return redirect(`/studio/footwear`)
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
  const submit = useSubmit()

  return (
    <div>
      <ContentContainer className='m-3'>
        <PanelHeader
          headerText={footwearItem.name}
          // editRoute={`../edit/${footwearItem.id}`}
        />
        <div className='item-image-section_wrapper px-4'>
          <div className='item-image-section'></div>
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
            <div className='flex justify-between'>
              <button
                type='submit'
                form='editTights'
                className=' btn btn-action'
                disabled={!dirtyForm}
              >
                Save Changes
              </button>
              <button
                type='button'
                className='btn btn-cancel'
                onClick={() =>
                  deleteItem(
                    { itemId: footwearItem.id, itemType: 'footwear' },
                    submit
                  )
                }
              >
                Delete
              </button>
            </div>
          </fieldset>
        </Form>
      </ContentContainer>
    </div>
  )
}
