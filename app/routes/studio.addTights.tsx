import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import type { DanceClass } from '@prisma/client'
import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { getDanceClasses_Name_Id } from '~/models/studio.server'
import { getUserId } from '~/session.server'

const schema = z.object({
  danceClassesInput: z.string().array(),
})

export async function action({ request }: ActionFunctionArgs) {
  const userId = await getUserId(request)
  if (!userId)
    throw new Error('You must be logged in to create a footwear entry')
  const formData = await request.formData()

  console.log('all danceClassesInput', formData.getAll('danceClassesInput'))

  const submission = parse(formData, { schema })
  console.log('submission', submission)

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }
  console.log('danceClassSubmission,', submission.value.danceClassesInput)

  // return 'action submitted'
  return redirect('/studio')
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  if (!userId) throw new Error('You must be logged in to view this page')
  const danceClassesLoaderData = await getDanceClasses_Name_Id(userId)
  return { danceClassesLoaderData }
}

export default function Example() {
  const { danceClassesLoaderData } = useLoaderData<typeof loader>()
  const lastSubmission = useActionData<typeof action>()

  const idNameMap: Record<DanceClass['id'], DanceClass['name']> =
    danceClassesLoaderData.reduce((prev, curr) => {
      let id = curr.id
      let name = curr.name
      return { [id]: name, ...prev }
    }, {})

  const [form, { danceClassesInput }] = useForm({
    lastSubmission,
  })

  return (
    <Form {...form.props} method='post'>
      <fieldset>
        <legend>Select Dance Classes This Item Applies To</legend>
        {conform
          .collection(danceClassesInput, {
            type: 'checkbox',
            //options = value of each input
            options: Object.keys(idNameMap),
          })
          .map((props, index) => {
            return (
              <div key={index}>
                <label>
                  <input {...props} />
                  {idNameMap[props.value]}
                </label>
              </div>
            )
          })}
        <div>{danceClassesInput.error}</div>
      </fieldset>
      <button>Submit</button>
    </Form>
  )
}
