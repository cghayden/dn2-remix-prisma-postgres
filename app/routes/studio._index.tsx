import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import DanceClassListing from '~/components/DanceClassListing'
import DancerListing from '~/components/DancerListing'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import {
  getDanceClasses_Name_Id,
  getStudioDancers,
} from '~/models/studio.server'
import { getUserId } from '~/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)
  if (!userId) {
    return redirect('/')
  }
  const dances = await getDanceClasses_Name_Id(userId)
  // const studio = await getFullStudio(userId)
  const studioDancers = await getStudioDancers(userId)
  const dancers = studioDancers.map((dancer) => {
    return { name: `${dancer.firstName} ${dancer.lastName}`, id: dancer.id }
  })
  return json({ dances, dancers })
}

export default function StudioIndex() {
  const { dances, dancers } = useLoaderData<typeof loader>()
  console.log('studioDancers', dancers)
  return (
    <>
      <PageHeader headerText='Studio Home' />
      <div className='pageContent flex justify-center'>
        <DanceClassListing danceClasses={dances} />
        <DancerListing dancers={dancers} />
      </div>
    </>
  )
}
