import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '~/db.server'
import { requireParent } from '~/models/parent.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // check for userId(logged in user) and 'PARENT' type, return id if so
  const userId = await requireParent(request)
  const parent = await prisma.parent.findUnique({
    where: {
      userId: userId,
    },
    include: {
      dancers: true,
    },
  })
  if (parent?.dancers.length === 0) {
    console.log('no dancers')
    return redirect('addDancer')
  }
  return parent
}

export default function ParentIndex() {
  const parent = useLoaderData<typeof loader>()
  console.log('parent', parent)
  return (
    <div>
      <div>has dancers , list all dances</div>
    </div>
  )
}
