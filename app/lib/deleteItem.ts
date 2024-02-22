import { type SubmitFunction } from '@remix-run/react'
import { type DeleteItem } from 'types'

export default function deleteItem(
  { itemId, itemType }: DeleteItem,
  submit: SubmitFunction
) {
  if (window.confirm('Delete this item?')) {
    submit(
      { itemId, itemType },
      { method: 'post', action: '/studio/resourceDeleteItem' }
    )
  }
}
