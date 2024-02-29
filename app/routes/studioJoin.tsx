import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import { z } from 'zod'

import { useForm } from '@conform-to/react'
import { TextInput } from '~/components/forms/TextInput'
import { createStudio } from '~/models/studio.server'

import { getUserByEmail } from '~/models/user.server'
import { createUserSession, getUserId } from '~/session.server'
import { safeRedirect } from '~/utils'
import { parse } from '@conform-to/zod'

export const meta: MetaFunction = () => [{ title: 'Sign Up' }]

const studioJoinSchema = z.object({
  name: z
    .string({ required_error: 'Studio Name is required' })
    .min(3, { message: 'Studio Name Must Be At Least 3 Characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password Must Be At Least 8 Characters' }),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const type = 'STUDIO'
  const formData = await request.formData()
  const submission = parse(formData, { schema: studioJoinSchema })
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/')

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }
  const { name, email, password } = submission.value

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return json({
      ...submission,
      error: {
        ...submission.error,
        email: ['A user already exists with this email'],
      },
    })
  }

  const user = await createStudio(email, password, type, name)

  return await createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.userId,
    type: user.type,
  })
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  return json({})
}

export default function StudioJoin() {
  const [searchParams] = useSearchParams()

  const lastSubmission = useActionData<typeof action>()
  console.log('lastSubmission', lastSubmission)

  const [form, { name, email, password }] = useForm({
    // The last submission will be used to report the error and serves as the default value and initial error of the form for progressive enhancement
    lastSubmission,
    // run validation logic on client (if slow connection)
    // shouldValidate: 'onBlur',
    // onValidate({ formData }) {
    //   return parse(formData, { schema })
    // },
  })
  console.log('name', name)
  return (
    <div className='flex min-h-screen flex-col justify-center'>
      <div className='grid place items-center'>
        <h1 className='text-xl text-center pb-12'>
          Sign Up For a Studio Account
        </h1>

        <div className='mx-auto w-full max-w-md px-8'>
          <Form method='post' {...form.props} className='form_default'>
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
                  name='email'
                  label={'Email'}
                  error={email.error}
                  required={true}
                  type='email'
                />
              </div>
              <div className='input_item'>
                <TextInput
                  name='password'
                  label={'Password'}
                  error={password.error}
                  required={true}
                  type='password'
                />
              </div>
            </div>
            <input type='hidden' name='redirectTo' value={'/studio'} />

            <div className='flex flex-col items-center justify-center'>
              <button
                type='submit'
                className='w-full rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 focus:bg-gray-500'
              >
                Create Account
              </button>
              <div className='text-center text-sm text-gray-500 pt-3'>
                Already have an account?{' '}
                <Link
                  className='text-blue-500 underline'
                  to={{
                    pathname: '/login',
                    search: searchParams.toString(),
                  }}
                >
                  Log in
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
