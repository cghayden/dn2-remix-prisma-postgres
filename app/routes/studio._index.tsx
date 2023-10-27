import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { DanceListing } from '~/components/studios/DanceListing'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getFullStudio } from '~/models/studio.server'
import { getUserId } from '~/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)
  if (!userId) {
    return redirect('/')
  }
  const studio = await getFullStudio(userId)
  return json({ studio })
}

export default function StudioIndex() {
  const { studio } = useLoaderData<typeof loader>()
  return (
    <>
      <PageHeader headerText='Studio Home' />
      <div className='pageContent flex justify-center'>
        <ContentContainer>
          <h2 className='text-xl text-center py-2'>Dance Classes</h2>
          <ul className='p-4 w-72 h-72'>
            {studio?.danceClasses.map((danceClass) => (
              <li key={danceClass.id}>
                <DanceListing danceClass={danceClass} />
              </li>
            ))}
          </ul>
        </ContentContainer>
      </div>
    </>
  )
}
