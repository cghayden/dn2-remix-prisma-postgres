import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import AddDanceLevelForm from '~/components/studios/AddDanceLevelForm'
import EditDanceLevels from '~/components/studios/EditDanceLevels'
import { getDanceLevels } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const danceLevels = await getDanceLevels(userId)
  if (!danceLevels) {
    throw new Error('Oh no! dance levels could not be loaded')
  }
  return json(danceLevels)
}

export default function EditAddDanceLevels() {
  const danceLevels = useLoaderData<typeof loader>()
  return (
    <div className='p-4'>
      <h2>Edit Levels or Add a New Level</h2>
      <EditDanceLevels danceLevels={danceLevels} />
      <AddDanceLevelForm />
    </div>
  )
}
