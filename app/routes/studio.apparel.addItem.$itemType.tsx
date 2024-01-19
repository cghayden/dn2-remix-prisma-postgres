import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import {
  upsertStudioShoe,
  getDanceClasses_Name_Id,
  upsertStudioTights,
} from '~/models/studio.server'
import { getUserId } from '~/session.server'
import { z } from 'zod'
import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { TextInput } from '~/components/forms/TextInput'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import type { DanceClass } from '@prisma/client'

export async function action({ request }: ActionFunctionArgs) {
  const schema = z.object({
    itemId: z.string().optional(),
    name: z.string({ required_error: 'Name is required' }),
    description: z.string().optional(),
    url: z.string().url().optional(),
    image: z.string().url().optional(),
    danceClassesInput: z.string().array(),
    itemType: z.string(),
  })

  const userId = await getUserId(request)
  if (!userId) throw new Error('You must be logged in to create a new item')
  const formData = await request.formData()

  const submission = parse(formData, { schema })
  console.log(submission.value?.itemType)

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  if (submission.value.itemType === 'footwear') {
    await upsertStudioShoe({
      footwearId: submission.value.itemId ?? 'new',
      name: submission.value.name,
      description: submission.value.description,
      url: submission.value.url,
      image: submission.value.image,
      studioId: userId,
      danceClassIds: submission.value.danceClassesInput,
    }).catch((err) => {
      throw new Error(err.message)
    })
    return redirect('/studio')
  }

  if (submission.value.itemType === 'tights') {
    await upsertStudioTights({
      tightsId: submission.value.itemId ?? 'new',
      name: submission.value.name,
      description: submission.value.description,
      url: submission.value.url,
      image: submission.value.image,
      studioId: userId,
      danceClassIds: submission.value.danceClassesInput,
    }).catch((err) => {
      throw new Error(err.message)
    })
  }
  return redirect('/studio')
  // return submission
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const itemType = params.itemType
  const userId = await getUserId(request)
  if (!userId) throw new Error('You must be logged in to view this page')
  const danceClassesLoaderData = await getDanceClasses_Name_Id(userId)
  return { danceClassesLoaderData, itemType }
}

export default function AddFootwearOrTights() {
  const { danceClassesLoaderData, itemType } = useLoaderData<typeof loader>()
  const lastSubmission = useActionData<typeof action>()
  const idNameMap: Record<DanceClass['id'], DanceClass['name']> =
    danceClassesLoaderData.reduce((prev, curr) => {
      let id = curr.id
      let name = curr.name
      return { [id]: name, ...prev }
    }, {})

  const [form, { name, description, url, image, danceClassesInput }] = useForm({
    lastSubmission,
  })

  return (
    <>
      <PageHeader headerText='Add A New Shoe' />
      <Form method='post' {...form.props} className='form_default'>
        <div className='input_section_wrapper'>
          <div className='input_item'>
            <input type='hidden' name='itemType' value={itemType} />
            <input type='hidden' name='itemId' value={'new'} />
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
            />
          </div>
          <div className='input_item'>
            <TextInput name='url' label={'URL'} error={url.error} />
          </div>
          <div className='input_item'>
            <TextInput name='image' label={'Image URL'} error={image.error} />
          </div>
          <fieldset>
            <legend>Select Dance Classes This Item Applies To</legend>
            {conform
              .collection(danceClassesInput, {
                type: 'checkbox',
                options: Object.keys(idNameMap),
              })
              .map((props, index) => (
                <div key={index}>
                  <label>
                    <input {...props} />
                    {idNameMap[props.value]}
                  </label>
                </div>
              ))}
            <div>{danceClassesInput.error}</div>
          </fieldset>
          <button
            type='submit'
            className='rounded bg-blue-500 mt-4 ml-2 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
          >
            Create {itemType} Entry
          </button>
        </div>
      </Form>
    </>
  )
}
