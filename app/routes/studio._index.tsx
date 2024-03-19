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
  const studioDancers = await getStudioDancers(userId)
  const dancers = studioDancers
    .sort((a, b) => {
      const nameA = a.lastName.toUpperCase()
      const nameB = b.lastName.toUpperCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      // names must be equal
      return 0
    })

    .map((dancer) => {
      return { name: `${dancer.lastName}, ${dancer.firstName}`, id: dancer.id }
    })
  return json({ dances, dancers })
}

export default function StudioIndex() {
  const { dances, dancers } = useLoaderData<typeof loader>()
  return (
    <>
      <PageHeader headerText='Studio Home' />
      <div className='grid grid-cols-2'>
        <DanceClassListing danceClasses={dances} />
        <DancerListing dancers={dancers} />
      </div>
    </>
  )
}
