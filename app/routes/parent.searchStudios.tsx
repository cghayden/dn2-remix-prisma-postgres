import { useForm } from '@conform-to/react'
import { Form, useActionData } from '@remix-run/react'
import { TextInput } from '~/components/forms/TextInput'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { z } from 'zod'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { parse } from '@conform-to/zod'
import { prisma } from '~/db.server'
import { parentSearchStudios } from '~/models/studio.server'

type Props = {}

const searchSchema = z.object({
  searchVal: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const submission = parse(formData, { schema: searchSchema })

  if (!submission.value) {
    return json(
      { status: 'error', submission, studios: undefined },
      { status: 400 }
    )
  }

  const { searchVal } = submission.value

  const studios = await parentSearchStudios({ searchVal })
  console.log('studios response', studios)

  return json({ submission, studios })
}

export default function SearchStudios({}: Props) {
  const actionData = useActionData<typeof action>()
  console.log('actionData', actionData)
  // console.log('studios', studios);

  const [form, { searchVal }] = useForm({
    lastSubmission: actionData?.submission,
  })

  return (
    <div>
      <ContentContainer>
        <Form {...form.props} method='post' className='form_default w-5/6'>
          <div className='input_section wrapper'>
            <div className='input_item'>
              <TextInput
                label={'Search for a Studio'}
                name='searchVal'
                error={undefined}
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
        <h2>Search Results...</h2>
        <ul>
          {actionData?.studios?.map((studio) => (
            <li key={studio.userId}>{studio.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
