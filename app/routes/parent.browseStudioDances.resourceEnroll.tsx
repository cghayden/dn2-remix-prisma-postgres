import { json, type ActionFunctionArgs } from '@remix-run/node'
import { enrollDancerInDanceClass } from '~/models/studio.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  // await requireStudioUserId(request)
  const formData = await request.formData()
  const danceClassId = formData.get('danceClassId')
  const studioId = formData.get('studioId')
  const dancerId = formData.get('dancerId')

  if (!danceClassId || typeof danceClassId !== 'string') {
    return { error: `incorrect danceClassId provided ` }
  }
  if (!dancerId || typeof dancerId !== 'string') {
    return { error: `incorrect dancerId provided ` }
  }
  if (!studioId || typeof studioId !== 'string') {
    return { error: `incorrect studioId provided ` }
  }

  const enrollment = await enrollDancerInDanceClass({
    danceClassId,
    dancerId,
    studioId,
  })

  return json(enrollment)
}
