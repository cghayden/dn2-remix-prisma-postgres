import { useForm } from '@conform-to/react'
import { Form, Link, useActionData } from '@remix-run/react'
import { TextInput } from '~/components/forms/TextInput'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { z } from 'zod'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { parse } from '@conform-to/zod'
import { parentSearchStudios } from '~/models/studio.server'
import { PageHeader } from '~/components/styledComponents/PageHeader'

const searchSchema = z.object({
  searchVal: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const submission = parse(formData, { schema: searchSchema })

  if (!submission.value) {
    return json({ status: 'error', submission, studios: [] })
  }

  const { searchVal } = submission.value

  const studios = await parentSearchStudios({ searchVal })

  return json({ submission, studios })
}

export default function SearchStudios() {
  const actionData = useActionData<typeof action>()

  const [form, { searchVal }] = useForm({
    lastSubmission: actionData?.submission,
  })

  return (
    <div>
      <PageHeader
        headerText='Search For A Studio'
        navigateBackUrl={'/parent'}
      />
      <ContentContainer className='w-5/6 max-w-[600px]'>
        <Form {...form.props} method='post' className='form_default w-5/6'>
          <div className='input_section wrapper'>
            <div className='input_item'>
              <TextInput
                label={'Search for a Studio'}
                name='searchVal'
                error={searchVal.error}
                required={true}
              />
            </div>
          </div>
          <div className='input-item mt-4'>
            <button type='submit' className='btn btn-action'>
              Search
            </button>
          </div>
        </Form>
      </ContentContainer>
      <div>
        <h2 className='p-6 '>
          Search Results... Choose a studio to browse dance classes
        </h2>
        <ul>
          {actionData?.studios.map((studio) => (
            <li key={studio.userId} className='m-2 w-4/5 mx-auto'>
              <ContentContainer className='bg-gray-200'>
                <Link
                  to={`/parent/browseStudioDances/${studio.userId}`}
                  className='inline-block w-full'
                >
                  <div className='p-4 flex justify-evenly'>
                    <p>{studio.name}</p>
                    <p>Address...</p>
                  </div>
                </Link>
              </ContentContainer>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
