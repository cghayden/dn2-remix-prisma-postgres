import { requireUserId } from '~/session.server'
import { z } from 'zod'
import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { TextInput } from '~/components/forms/TextInput'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { json, type ActionFunctionArgs, redirect } from '@remix-run/node'
import { upsertStudioFootwear } from '~/models/studio.server'
import { Form, useActionData } from '@remix-run/react'
import { PageHeader } from '~/components/styledComponents/PageHeader'

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

export default function AddFootwear() {
  const lastSubmission = useActionData<typeof action>()

  const [form, { name, description, url }] = useForm({ lastSubmission })

  return (
    <>
      <ContentContainer className='mx-4 w-5/6'>
        <Form method='post' {...form.props} className='form_default'>
          <fieldset>
            <legend className='text-lg font-semibold py-4'>
              Add footwear to your studio
            </legend>
            <div className='input_section_wrapper'>
              <div className='input_item'>
                <TextInput
                  name='name'
                  label={'Name'}
                  error={name.error}
                  required={true}
                />
              </div>
              <div className='input_item'>
                <TextInput
                  name='description'
                  label={'Description'}
                  error={description.error}
                  required={false}
                />
              </div>
              <div className='input_item'>
                <TextInput
                  name='url'
                  label={'Url'}
                  error={url.error}
                  required={false}
                />
              </div>
              <button
                type='submit'
                className=' rounded bg-blue-500 mt-4 ml-2 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
              >
                Save Footwear
              </button>
            </div>
          </fieldset>
        </Form>
      </ContentContainer>
    </>
  )
}
