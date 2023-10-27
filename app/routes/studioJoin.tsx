import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { createStudio } from '~/models/studio.server'

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
  const name = formData.get('name')
  const password = formData.get('password')
  const type = 'STUDIO'
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/')

  const errors = {
    email: null,
    name: null,
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

  if (typeof name !== 'string' || name.length === 0) {
    return json({
      errors: { ...errors, name: 'Studio Name Name is required' },
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

  const user = await createStudio(email, password, type, name)
  console.log('user', user)

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
  const emailRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus()
    }
    if (actionData?.errors?.name) {
      nameRef.current?.focus()
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus()
    }
  }, [actionData])

  return (
    <div className='flex min-h-screen flex-col justify-center'>
      <div className='grid place items-center'>
        <h1 className='text-xl text-center pb-12'>
          Sign Up For a Studio Account
        </h1>

        <div className='mx-auto w-full max-w-md px-8'>
          <Form method='post' className='space-y-6'>
            <div>
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
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Studio Name
              </label>
              <div className='mt-1'>
                <input
                  ref={nameRef}
                  id='name'
                  required
                  autoFocus={true}
                  name='name'
                  type='text'
                  autoComplete='name'
                  aria-invalid={actionData?.errors?.name ? true : undefined}
                  aria-describedby='name-error'
                  className='w-full rounded border border-gray-500 px-2 py-1 text-lg'
                />
                {actionData?.errors?.name ? (
                  <div className='pt-1 text-red-700' id='name-error'>
                    {actionData.errors.name}
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
            <input type='hidden' name='redirectTo' value={redirectTo} />
            <button
              type='submit'
              className='w-full rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 focus:bg-gray-500'
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
    </div>
  )
}
