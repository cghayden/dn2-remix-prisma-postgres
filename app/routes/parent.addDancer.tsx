import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { createParentDancer } from '~/models/dancer.server'
import { z } from 'zod'
import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { TextInput } from '~/components/forms/TextInput'
import { requireParentUserId } from '~/models/parent.server'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import datePickerStyles from 'react-datepicker/dist/react-datepicker.css'
import { normalizeDate } from '~/lib/normalizeDate'
// @ts-expect-error otherwise it doesn't work
const DatePicker = ReactDatePicker.default

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: datePickerStyles },
]

export const meta: MetaFunction = () => [{ title: 'Add a Dancer' }]
// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const userId = await getUserId(request)
//   if (userId) return redirect('/')
//   return json({})
// }

const dancerSchema = z.object({
  firstName: z.string({ required_error: 'First Name is required' }),
  lastName: z.string({ required_error: 'Last Name is required' }),
  birthdate: z.date(),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireParentUserId(request)
  const formData = await request.formData()
  const submission = parse(formData, { schema: dancerSchema })

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  const { firstName, lastName, birthdate } = submission.value

  // dont allow parent to create a dancer with the same name?
  const newDancer = await createParentDancer({
    firstName,
    lastName,
    userId,
    birthdate: normalizeDate(birthdate),
  })
  return redirect(`/parent/dancer/${newDancer.id}`)
}

export default function AddDancer() {
  const lastSubmission = useActionData<typeof action>()
  const [startDate, setStartDate] = useState(new Date())
  // console.log('startDate', normalizeDate(startDate))

  // The `useForm` hook will return everything you need to setup a form including the error and config of each field
  const [form, { firstName, lastName }] = useForm({
    // The last submission will be used to report the error and serves as the default value and initial error of the form for progressive enhancement
    lastSubmission,
  })

  return (
    <div className='flex min-h-screen flex-col'>
      <h3 className='py-8 text-lg text-center'>Add a New Dancer</h3>
      <div className='mx-auto w-full max-w-md px-8'>
        <Form method='post' {...form.props} className='form_default'>
          <div className='input_section_wrapper'>
            <div className='input_item'>
              <TextInput
                name='firstName'
                label={'First Name'}
                error={firstName.error}
                required={true}
              />
            </div>
            <div className='input_item'>
              <TextInput
                name='lastName'
                label={'Last Name'}
                error={lastName.error}
                required={true}
              />
            </div>
            {/* <div className='input_item'>
              <label>Add an image</label>
              <input type='file' accept='image/*' name='imgFile' />
            </div> */}
          </div>

          <div>
            <div className='input_item'>
              <label className='block'>Birthdate:</label>
              <DatePicker
                name='birthdate'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                peekNextMonth
                showYearDropdown
                dropdownMode='select'
              />
            </div>
          </div>

          <div className='pt-4'>
            <button
              type='submit'
              className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
            >
              Create Dancer
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}
