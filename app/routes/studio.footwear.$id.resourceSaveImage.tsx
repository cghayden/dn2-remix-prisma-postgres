import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import { saveFootwearImage } from '~/models/studio.server'

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const fileKey = formData.get('fileKey')
  const footwearId = params.id

  if (!fileKey || typeof fileKey !== 'string' || !footwearId) {
    throw new Error('error upoloading image')
  }

  await saveFootwearImage({ footwearId, imageFilename: fileKey })

  return redirect(`/studio/footwear/${footwearId}`)
}
