import { redirect, type ActionFunctionArgs } from '@remix-run/node'
// import { type DeleteItem } from 'types'
import { deleteItem } from '~/models/studio.server'
import { z } from 'zod'

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  // const ItemTypeEnum = z.enum(['tights', 'footwear'])

  const DeleteItemSchema = z.object({
    itemId: z.string(),
    itemType: z.enum(['tights', 'footwear']),
  })

  const deleteItemData = DeleteItemSchema.parse(formData)
  console.log('deleteItemData', deleteItemData)

  await deleteItem(deleteItemData).catch((err) => {
    throw new Error('error deleting item')
  })
  return redirect(`/studio/${deleteItemData.itemType}`)
}
