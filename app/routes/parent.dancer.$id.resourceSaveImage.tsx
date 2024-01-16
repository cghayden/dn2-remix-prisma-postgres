import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import { updateDancer } from '~/models/dancer.server'

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const fileKey = formData.get('fileKey')
  console.log('fileKey', typeof fileKey)
  const dancerId = params.id

  if (!fileKey || typeof fileKey !== 'string' || !dancerId) {
    throw new Error('error upoloading image')
  }

  await updateDancer(dancerId, { imageFilename: fileKey })
  return redirect(`/parent/dancer/${dancerId}`)
}
