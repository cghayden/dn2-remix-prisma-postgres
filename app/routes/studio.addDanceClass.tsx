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
      <Form method='post' {...form.props}>
        <label
          htmlFor={'name'}
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Name
        </label>
        <div>
          <input
            id={'name'}
            type='text'
            name={'name'}
            required={true}
            autoFocus={true}
            aria-invalid={!name?.errors?.length || undefined}
            aria-describedby={name?.errors?.length ? 'name-error' : undefined}
            className='w-full rounded border border-gray-500 px-2 py-1 text-lg focus:ring-2 focus:ring-blue-300'
          />
          {name.error ? (
            <div className='pt-1 text-red-700' id={`${'name'}-error`}>
              {name.error}
            </div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={'performanceName'}
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Performance Name
          </label>
          <input
            id={'performanceName'}
            type='text'
            name={'performanceName'}
            autoFocus={true}
            aria-invalid={!performanceName?.errors?.length || undefined}
            aria-describedby={
              performanceName?.errors?.length ? 'name-error' : undefined
            }
            className='w-full rounded border border-gray-500 px-2 py-1 text-lg focus:ring-2 focus:ring-blue-300'
          />
          {performanceName.error ? (
            <div
              className='pt-1 text-red-700'
              id={`${'nperformanceNameame'}-error`}
            >
              {performanceName.error}
            </div>
          ) : null}
        </div>

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
          className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
        >
          Create Class
        </button>
      </Form>
    </div>
  )
}
