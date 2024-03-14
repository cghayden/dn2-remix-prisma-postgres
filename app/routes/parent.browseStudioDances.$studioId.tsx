import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import BrowseStudioDanceListing from '~/components/parents/BrowseStudioDanceListing'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getDancersForEnrollment } from '~/models/dancer.server'
import {
  enrollDancerInDanceClass,
  getStudioDancesToBrowse,
} from '~/models/studio.server'
import { getUserId } from '~/session.server'

export type FormattedDancer = {
  id: string
  firstName: string
  // birthdate: Date | null
  enrollments: string[] // Now just an array of strings
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const danceClassId = formData.get('danceClassId')
  const studioId = formData.get('studioId')
  const dancerId = formData.get('dancerId')

  if (!danceClassId || typeof danceClassId !== 'string') {
    return { error: `incorrect danceClassId provided ` }
  }
  if (!dancerId || typeof dancerId !== 'string') {
    return { error: `incorrect dancerId provided ` }
  }
  if (!studioId || typeof studioId !== 'string') {
    return { error: `incorrect studioId provided ` }
  }

  const enrollment = await enrollDancerInDanceClass({
    danceClassId,
    dancerId,
    studioId,
  })

  return json(enrollment)
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  const studioId = params.studioId
  if (!studioId || !userId) {
    throw new Error('no studio Id or no User Id  provided')
  }

  const dancers = await getDancersForEnrollment(userId)

  // change array of enrollment objects to array of enrollment ids:
  const formattedDancers: FormattedDancer[] = dancers.map((dancer) => ({
    ...dancer, // Spread the original dancer properties
    enrollments: dancer.enrollments.map((enrollment) => enrollment.classId), // Transform to array of strings
  }))

  const studio = await getStudioDancesToBrowse({ studioId })
  if (!studio) {
    throw new Error('could studio could not be found')
  }
  return { studio, formattedDancers, studioId }
}

// dance name
// dance time
// dance day
// dance style
// invitation only
// button = enroll || requested || enrolled
// already enrolled?
// show as enrolled
// option to cancel
// send enrollment request
// dance.autoEnroll = true ? enroll dancer : create enrollment request
// change UI to indicate requested

export default function BrowseStudioDances() {
  const { studio, formattedDancers, studioId } = useLoaderData<typeof loader>()
  const [activeDancerId, setActiveDancerId] = useState(formattedDancers[0].id)

  const activeDancer =
    formattedDancers.find((dancer) => dancer.id === activeDancerId) ||
    formattedDancers[0]

  return (
    <>
      <PageHeader headerText={`Classes at ${studio?.name}`} />

      {/* 
// studio name
// studio address
// studio website
// studio about
// studio image(s) */}
      <div className='w-4/5 max-w-[600px] mx-auto min-w-[300px]'>
        <div className='w-full flex justify-center gap-8 m-4'>
          {formattedDancers.map((dancer) => (
            <button
              key={dancer.id}
              className={`px-4 py-2 border rounded-full
            
            ${
              activeDancer.id === dancer.id
                ? 'btn-action text-white'
                : 'bg-slate-300'
            }
            `}
              onClick={() => setActiveDancerId(dancer.id)}
            >
              {dancer.firstName}
            </button>
          ))}
        </div>
        <ul className='flex flex-col items-center'>
          {studio.danceClasses.map((dance) => (
            <BrowseStudioDanceListing
              key={dance.id}
              dancer={activeDancer}
              danceClass={dance}
              studioId={studioId}
            />
          ))}
        </ul>
      </div>
    </>
  )
}
