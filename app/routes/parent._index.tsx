import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
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
    return redirect('addDancer')
  }
  return json({ parent })
}

export default function ParentIndex() {
  const { parent } = useLoaderData<typeof loader>()
  console.log('parent', parent)
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
      <PageHeader headerText='My Dancers' />
      <ul>
        {parent.dancers.map((dancer) => (
          <li key={dancer.id} className='my-2'>
            <ContentContainer className='p-6'>
              <Link to={`dancer/${dancer.id}`} className='inline-block w-full'>
                <div className='flex items-center'>
                  {/* <div className='w-14 h-14 overflow-hidden rounded-full'>
                    <img
                      src={`https://dancernotes.s3.us-east-2.amazonaws.com/${dancer.imageFilename}`}
                      alt='dancerImage'
                    />
                  </div> */}
                  <p>{dancer.firstName}</p>
                </div>
              </Link>
            </ContentContainer>
          </li>
        ))}
      </ul>
    </div>
  )
}
