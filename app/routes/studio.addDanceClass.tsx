import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { createStudioDance, getStudioConfig } from '~/models/studio.server'
import { getUserId } from '~/session.server'
import { z } from 'zod'
import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { ComposeTextInput } from '~/components/forms/TextInput'

const schema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  performanceName: z.string().min(3).optional(),
  ageLevelId: z.string(),
  competitions: z.boolean(),
  recital: z.boolean(),
  skillLevelId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
  const userId = await getUserId(request)
  if (!userId) throw new Error('you must be logged in to create a dance')
  const formData = await request.formData()
  const submission = parse(formData, { schema })
  console.log('submission', submission)

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  await createStudioDance({
    name: submission.value.name,
    performanceName: submission.value.performanceName || null,
    studioId: userId,
    ageLevelId: submission.value.ageLevelId,
    competitions: submission.value.competitions,
    recital: submission.value.recital,
    skillLevelId: submission.value.skillLevelId,
  }).catch((err) => {
    throw new Error(err.message)
  })
  return redirect('/studio')
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  const studioConfig = await getStudioConfig(userId as string)
  if (!studioConfig)
    throw new Error('there was a problem retrieving Studio config')
  // get available ageLevels and skillLevels from loader to populate select
  return { studioConfig }
}

export default function AddDanceClass() {
  const { studioConfig } = useLoaderData<typeof loader>()
  const lastSubmission = useActionData<typeof action>()
  console.log('lastSubmission', lastSubmission)

  // The `useForm` hook will return everything you need to setup a form
  // including the error and config of each field
  const [
    form,
    { name, performanceName, ageLevelId, skillLevelId, competitions, recital },
  ] = useForm({
    // The last submission will be used to report the error and
    // served as the default value and initial error of the form
    // for progressive enhancement
    lastSubmission,
    // run validation logic on client (if slow connection)
    // shouldValidate: 'onBlur',
    // onValidate({ formData }) {
    //   return parse(formData, { schema })
    // },
  })

  return (
    <div>
      <Form method='post' {...form.props} className='form_default'>
        <div className='input_section_wrapper'>
          <div className='label_input_wrap_for_stacked'>
            <ComposeTextInput
              name='name'
              label={'Name'}
              error={name.error}
              required={true}
            />
          </div>
          <div className='label_input_wrap_for_stacked'>
            <ComposeTextInput
              name='performanceName'
              label={'Performance Name'}
              error={performanceName.error}
            />
          </div>
          <div className='label_input_wrap_for_stacked'>
            <label
              className='block text-sm text-gray-600 mb-1'
              htmlFor={'ageLevel'}
            >
              Age Level
            </label>
            <select
              // required={true}
              name='ageLevelId'
              id='ageLevel'
              className='w-full border rounded bg-gray-50 border-gray-300 text-gray-800 px-2 py-1 focus:ring-2 focus:ring-blue-300 pt-[5px] pb-[5px]'
            >
              <option value='12'>-- Choose a Dance Level --</option>
              {studioConfig.ageLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
            {ageLevelId.error ? (
              <div className='pt-1 text-red-700' id={`ageLevel-error`}>
                {ageLevelId.error}
              </div>
            ) : null}
          </div>
          <div className='label_input_wrap_for_stacked'>
            <label
              className='block text-sm text-gray-600 mb-1'
              htmlFor={'skillLevel'}
            >
              Skill Level
            </label>
            <select
              // required={true}
              name='skillLevelId'
              id='skillLevel'
              className='w-full border rounded bg-gray-50 border-gray-300 text-gray-800 px-2 py-1 focus:ring-2 focus:ring-blue-300 pt-[5px] pb-[5px]'
            >
              <option value='12'>-- Choose a Dance Level --</option>
              {studioConfig.skillLevels.map((skillLevel) => (
                <option key={skillLevel.id} value={skillLevel.id}>
                  {skillLevel.name}
                </option>
              ))}
            </select>
            {skillLevelId.error ? (
              <div className='pt-1 text-red-700' id={`skillLevel-error`}>
                {ageLevelId.error}
              </div>
            ) : null}
          </div>

          <div className='label_input_wrap_for_stacked'>
            <label className='flex gap-4'>
              <input {...conform.input(competitions, { type: 'checkbox' })} />
              <span>This Dance will compete in competitions</span>
            </label>
          </div>

          <div className='label_input_wrap_for_stacked'>
            <label className='flex gap-4'>
              <input {...conform.input(recital, { type: 'checkbox' })} />
              <span>Recital: Yes, this dance will be in the recital</span>
            </label>
          </div>
          <div>{recital.error}</div>
          <button
            type='submit'
            className=' rounded bg-blue-500 mt-4 ml-2 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
          >
            Create Class
          </button>
        </div>
      </Form>
    </div>
  )
}
