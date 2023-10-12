import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { createDancer } from '~/models/dancer.server'

import { requireUserId } from '~/session.server'

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const userId = await getUserId(request)
//   if (userId) return redirect('/')
//   return json({})
// }

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request)
  console.log('userId', userId)
  const formData = await request.formData()
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')

  const errors = {
    firstName: null,
    lastName: null,
  }

  if (typeof firstName !== 'string' || firstName.length === 0) {
    return json({
      errors: { ...errors, firstName: 'First Name is required' },
      status: 400,
    })
  }

  if (typeof lastName !== 'string' || lastName.length === 0) {
    return json({
      errors: { ...errors, lastName: 'Last Name is required' },
      status: 400,
    })
  }

  // dont allow parent to create a dancer with the same name?

  await createDancer(firstName, lastName, userId)
  return redirect('/parent')
}

export const meta: MetaFunction = () => [{ title: 'Sign Up' }]

export default function AddDancer() {
  // const [searchParams] = useSearchParams()
  // const redirectTo = searchParams.get('redirectTo') ?? undefined
  const actionData = useActionData<typeof action>()
  console.log('actionData', actionData)
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (actionData?.errors?.firstName) {
      firstNameRef.current?.focus()
    }
    if (actionData?.errors?.lastName) {
      lastNameRef.current?.focus()
    }
  }, [actionData])

  return (
    <div className='flex min-h-screen flex-col justify-center'>
      <h3 className='py-8 text-lg text-center'>Add a New Dancer</h3>
      <div className='mx-auto w-full max-w-md px-8'>
        <Form method='post' className='space-y-6'>
          <div>
            <label
              htmlFor='firstName'
              className='block text-sm font-medium text-gray-700'
            >
              First Name{' '}
            </label>
            <div className='mt-1'>
              <input
                ref={firstNameRef}
                id='firstName'
                required
                autoFocus={true}
                name='firstName'
                type='text'
                autoComplete='firstName'
                aria-invalid={actionData?.errors?.firstName ? true : undefined}
                aria-describedby='firstName-error'
                className='w-full rounded border border-gray-500 px-2 py-1 text-lg'
              />
              {actionData?.errors?.firstName ? (
                <div className='pt-1 text-red-700' id='firstName-error'>
                  {actionData.errors.firstName}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor='lastName'
              className='block text-sm font-medium text-gray-700'
            >
              Last Name{' '}
            </label>
            <div className='mt-1'>
              <input
                ref={lastNameRef}
                id='lastName'
                required
                autoFocus={true}
                name='lastName'
                type='text'
                autoComplete='lastName'
                aria-invalid={actionData?.errors?.lastName ? true : undefined}
                aria-describedby='lastName-error'
                className='w-full rounded border border-gray-500 px-2 py-1 text-lg'
              />
              {actionData?.errors?.lastName ? (
                <div className='pt-1 text-red-700' id='lastName-error'>
                  {actionData.errors.lastName}
                </div>
              ) : null}
            </div>
          </div>

          {/* <input type='hidden' name='redirectTo' value={redirectTo} /> */}
          <button
            type='submit'
            className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
          >
            Create Dancer
          </button>
        </Form>
      </div>
    </div>
  )
}
