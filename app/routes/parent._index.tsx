import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { prisma } from '~/db.server'
import { requireParentUserId } from '~/models/parent.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // check for userId(logged in user) and 'PARENT' type, return id if so
  const userId = await requireParentUserId(request)
  const parent = await prisma.parent.findUnique({
    where: {
      userId: userId,
    },
    include: {
      dancers: true,
    },
  })
  if (!parent) {
    return redirect('/')
  }

  if (!parent.dancers || parent.dancers.length === 0) {
    console.log('no dancers')
    return redirect('addDancer')
  }
  return json({ parent })
}

export default function ParentIndex() {
  const { parent } = useLoaderData<typeof loader>()
  console.log('parent index data:', parent)
  if (!parent.dancers.length) {
    return (
      <div>
        <h1>Parent Index</h1>
        <p>you have no dancers</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Parent Index</h1>
      <ul>
        {parent.dancers.map((dancer) => (
          <li key={dancer.id}>
            <ContentContainer>
              <p>{dancer.firstName}</p>
            </ContentContainer>
          </li>
        ))}
      </ul>
    </div>
  )
}
