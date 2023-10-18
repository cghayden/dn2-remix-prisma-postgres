import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { createStudioDance, getDanceLevels } from '~/models/studio.server'
import { getUserId } from '~/session.server'
import { z } from 'zod'
import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { ComposeTextInput } from '~/components/forms/TextInput'

const schema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  performanceName: z.string().min(3).optional(),
  // recital: z.boolean(),
  // compOrRec: z.union([z.literal("competitive"), z.literal("recreational")])
})

export async function action({ request }: ActionFunctionArgs) {
  const userId = await getUserId(request)
  if (!userId) throw new Error('you must be logged in to create a dance')
  const formData = await request.formData()
  const submission = parse(formData, { schema })

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  const newDance = await createStudioDance({
    name: submission.value.name,
    performanceName: submission.value.performanceName || null,
    competitive: false,
    recital: true,
    recreational: true,
    studioId: userId,
  }).catch((err) => {
    throw new Error(err.message)
  })
  console.log('newDance', newDance)
  // return json(newDance)
  return redirect('/studio')
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  const danceLevels = await getDanceLevels(userId as string)
  if (!danceLevels)
    throw new Error('user ID or danceLevels could not be retrieved')
  // get available levels from loader to populate select
  return { danceLevels }
}

export default function AddDanceClass() {
  const { danceLevels } = useLoaderData<typeof loader>()
  console.log('danceLevels', danceLevels)

  const lastSubmission = useActionData<typeof action>()
  console.log('lastSubmission', lastSubmission)

  // The `useForm` hook will return everything you need to setup a form
  // including the error and config of each field
  const [form, { name, performanceName }] = useForm({
    // The last submission will be used to report the error and
    // served as the default value and initial error of the form
    // for progressive enhancement
    lastSubmission,
    // run validation logic on client (if slow connection)
    shouldValidate: 'onBlur',
    onValidate({ formData }) {
      return parse(formData, { schema })
    },
  })

  return (
    <div>
      <Form method='post' {...form.props} className='form_default roun'>
        <div className='input_section_wrapper'>
          <ComposeTextInput
            name='name'
            label={'Name'}
            error={name.error}
            required={true}
          />
          <ComposeTextInput
            name='performanceName'
            label={'Performance Name'}
            error={performanceName.error}
          />
          {/* <label htmlFor="recital">
          Recital: <input id="recital" type="checkbox" name="recital" defaultChecked={false} value="true"/>
                </label> */}
          {/* <p>
                 Is this dance Recreational or Competitive?:
                 {conform.collection(recOrComp, {
          type:'radio',
          options: ['recreational', 'competitive']
                 })
                 .map((props, index) => (
          <div key={index}>
            <label>{props.value}</label>
          </div>
                 ))
                 
                 }
                </p> */}
          {/* <input name={'userId'} value={userId} type='hidden' /> */}
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
