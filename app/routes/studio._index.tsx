import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import DanceClassListing from '~/components/DanceClassListing'
import { DanceListing } from '~/components/studios/SingleDanceLink'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getDanceClasses_Name_Id, getFullStudio } from '~/models/studio.server'
import { getUserId } from '~/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)
  if (!userId) {
    return redirect('/')
  }
  const dances = await getDanceClasses_Name_Id(userId)
  // const studio = await getFullStudio(userId)
  return json({ dances })
}

export default function StudioIndex() {
  const { dances } = useLoaderData<typeof loader>()
  console.log('dances', dances)
  return (
    <>
      <PageHeader headerText='Studio Home' />
      <div className='pageContent flex justify-center'>
        <ContentContainer>
          {<DanceClassListing danceClasses={dances} />}
        </ContentContainer>
      </div>
    </>
  )
}
