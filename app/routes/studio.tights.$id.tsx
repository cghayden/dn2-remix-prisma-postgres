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
import { getTightsItem, upsertStudioTights } from '~/models/studio.server'
// import ImagePlaceHolderIcon from '~/components/icons/ImagePlaceHolderIcon'
import { useState } from 'react'
import deleteItem from '~/lib/deleteItemUtil'

const tightsSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2),
  description: z.string().min(2).optional(),
  url: z.string().url().optional(),
  danceClassIds: z.string().array().optional().default([]),
  tightsId: z.string().default('new'),
})

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const submission = parse(formData, { schema: tightsSchema })

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  const { name, description, url, tightsId, danceClassIds } = submission.value

  await upsertStudioTights({
    tightsId,
    studioId: userId,
    name,
    description,
    url,
    danceClassIds,
  })

  return redirect(`/studio/tights`)
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const tightsId = params.id

  if (!tightsId) {
    throw new Error('no tights Id was provided')
  }

  const tightsItem = await getTightsItem(tightsId)
  if (tightsItem?.studioId !== userId) {
    throw new Error('you cannot view this item')
  }

  return tightsItem
}

export default function IndividualTightsPage() {
  const tightsItem = useLoaderData<typeof loader>()
  const lastSubmission = useActionData<typeof action>()
  const [form, { name, description, url }] = useForm({ lastSubmission })
  const [dirtyForm, toggleDirtyForm] = useState(false)
  const submit = useSubmit()

  return (
    <div>
      <ContentContainer className='m-3 w-5/6'>
        <PanelHeader
          headerText={tightsItem.name}
          // editRoute={`../edit/${footwearItem.id}`}
        />
        <div className='item-image-section_wrapper px-4'>
          <div className='item-image-section'></div>
          <Outlet context={{ tightsItemName: tightsItem.name }} />
        </div>
        <Form
          onChange={() => toggleDirtyForm(true)}
          method='post'
          id='editTights'
          {...form.props}
          className='form_default'
        >
          <fieldset>
            <div className='input_section_wrapper'>
              <input type='hidden' value={tightsItem.id} name='tightsId' />
              <div className='input_item'>
                <TextInput
                  label={'Name'}
                  name='name'
                  defaultValue={tightsItem?.name ?? ''}
                  error={name.error}
                  required={true}
                />
              </div>
              <div className='input_item'>
                <TextInput
                  label={'Description'}
                  name='description'
                  defaultValue={tightsItem?.description ?? ''}
                  error={description.error}
                  required={false}
                />
              </div>
              <div className='input_item'>
                <TextInput
                  label={'Url'}
                  name='url'
                  defaultValue={tightsItem?.url ?? ''}
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
                    { itemId: tightsItem.id, itemType: 'tights' },
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
