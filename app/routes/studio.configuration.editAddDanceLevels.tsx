import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { getDanceLevels } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const danceLevels = await getDanceLevels(userId)
  if (!danceLevels) {
    throw new Error('Oh no! Studio could not be loaded')
  }
  return json(danceLevels)
}

export default function EditAddDanceLevels() {
  return <div></div>
}
