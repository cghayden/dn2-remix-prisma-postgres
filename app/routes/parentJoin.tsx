import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { createParent } from '~/models/parent.server'

import { getUserByEmail } from '~/models/user.server'
import { createUserSession, getUserId } from '~/session.server'
import { safeRedirect, validateEmail } from '~/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  return json({})
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const password = formData.get('password')
  const type = 'PARENT'
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/')

  const errors = {
    email: null,
    firstName: null,
    lastName: null,
    password: null,
  }

  if (!validateEmail(email)) {
    return json(
      { errors: { ...errors, email: 'Email is invalid' } },
      { status: 400 }
    )
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json(
      { errors: { ...errors, password: 'Password is required' } },
      { status: 400 }
    )
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

  if (password.length < 8) {
    return json(
      {
        errors: {
          ...errors,
          password: 'Password must be at least 8 characters',
        },
      },
      { status: 400 }
    )
  }

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return json(
      { errors: { ...errors, email: 'A user already exists with this email' } },
      { status: 400 }
    )
  }

  const user = await createParent(email, password, type, firstName, lastName)

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.userId,
    type: user.type,
  })
}

export const meta: MetaFunction = () => [{ title: 'Sign Up' }]

export default function ParentJoin() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? undefined
  const actionData = useActionData<typeof action>()
  console.log('actionData', actionData)
  const emailRef = useRef<HTMLInputElement>(null)
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus()
    }
    if (actionData?.errors?.firstName) {
      firstNameRef.current?.focus()
    }
    if (actionData?.errors?.lastName) {
      lastNameRef.current?.focus()
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus()
    }
  }, [actionData])

  return (
    <div className='flex min-h-screen flex-col justify-center'>
      <div className='mx-auto w-full max-w-md px-8'>
        <Form method='post' className='space-y-6'>
          <div>
            {/* parent Form */}
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email address
            </label>
            <div className='mt-1'>
              <input
                ref={emailRef}
                id='email'
                required
                autoFocus={true}
                name='email'
                type='email'
                autoComplete='email'
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby='email-error'
                className='w-full rounded border border-gray-500 px-2 py-1 text-lg'
              />
              {actionData?.errors?.email ? (
                <div className='pt-1 text-red-700' id='email-error'>
                  {actionData.errors.email}
                </div>
              ) : null}
            </div>
          </div>
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

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <div className='mt-1'>
              <input
                id='password'
                ref={passwordRef}
                name='password'
                type='password'
                autoComplete='new-password'
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby='password-error'
                className='w-full rounded border border-gray-500 px-2 py-1 text-lg'
              />
              {actionData?.errors?.password ? (
                <div className='pt-1 text-red-700' id='password-error'>
                  {actionData.errors.password}
                </div>
              ) : null}
            </div>
          </div>
          {/* end parent form */}
          <input type='hidden' name='redirectTo' value={redirectTo} />
          <button
            type='submit'
            className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
          >
            Create Account
          </button>
          <div className='flex items-center justify-center'>
            <div className='text-center text-sm text-gray-500'>
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
  )
}
