import { useFetcher } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { type action } from '../../routes/parent.browseStudioDances.resourceEnroll'
import { type FormattedDancer } from '~/routes/parent.browseStudioDances.$studioId'

export type BrowseStudioDanceClassType = {
  id: string
  name: string
  ageLevel?: {
    name: string
  }
  styleOfDance: string | null
}

export default function BrowseStudioDanceListing({
  dancer,
  danceClass,
  studioId,
}: {
  dancer: FormattedDancer
  danceClass: BrowseStudioDanceClassType
  studioId: string
}) {
  const fetcher = useFetcher<typeof action>()
  const loading = fetcher.state === 'loading'
  const isEnrolled = dancer.enrollments.includes(danceClass.id)

  return (
    <li className='flex p-4 m-4 w-full'>
      <ContentContainer
        className={`p-4 w-full ${isEnrolled && 'bg-slate-200'}`}
      >
        <p>Name: {danceClass.name}</p>
        {/* <p>Style: {dance.styleOfDance}</p> */}
        {danceClass.ageLevel && <p>Age Level: {danceClass.ageLevel.name}</p>}
        <fetcher.Form
          method='post'
          id={`${danceClass.id}`}
          action='/parent/browseStudioDances/resourceEnroll'
        >
          <input type='hidden' name='dancerId' value={dancer.id} />
          <input type='hidden' name='danceClassId' value={danceClass.id} />
          <input type='hidden' name='studioId' value={studioId} />
          <button
            type='submit'
            disabled={loading}
            form={`${danceClass.id}`}
            className={`btn ${isEnrolled ? 'bg-emerald-500' : 'btn-action'}`}
          >
            {loading
              ? 'Enrolling...'
              : isEnrolled
              ? 'Enrolled'
              : `Enroll ${dancer.firstName}`}
          </button>
        </fetcher.Form>
      </ContentContainer>
    </li>
  )
}
