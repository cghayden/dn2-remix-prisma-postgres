import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { useRef } from 'react'
import { getUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  // get available levels from loader to populate select
  return { levels: [] }
}

export const action = async ({ request }: ActionFunctionArgs) => {}

export default function AddDanceClass() {
  const { levels } = useLoaderData<typeof loader>()
  console.log('levels', levels)

  const nameRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <Form>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name
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
              // aria-invalid={actionData?.errors?.name ? true : undefined}
              aria-describedby='name-error'
              className='w-full rounded border border-gray-500 px-2 py-1 text-lg'
            />
            {/* {actionData?.errors?.name ? (
                <div className='pt-1 text-red-700' id='name-error'>
                  {actionData.errors.name}
                </div>
              ) : null} */}
          </div>
        </div>
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
