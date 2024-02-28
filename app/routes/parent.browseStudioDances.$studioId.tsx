import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { getDancers_Id_Name } from '~/models/dancer.server'
import { getStudioDancesToBrowse } from '~/models/studio.server'
import { getUserId } from '~/session.server'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  const studioId = params.studioId

  if (!studioId || !userId) {
    throw new Error('no studio Id or no User Id  provided')
  }

  const dancerIds = await getDancers_Id_Name(userId)

  const studioDances = await getStudioDancesToBrowse({ studioId })
  return { studioDances, dancerIds }
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
  const { studioDances, dancerIds } = useLoaderData<typeof loader>()
  console.log('studioDances', studioDances)

  return (
    <div>
      browse studio dances
      {/* 
// studio name
// studio address
// studio website
// studio about
// studio image(s) */}
      <ul className='flex flex-col items-center'>
        {studioDances.map((dance) => (
          <li
            key={dance.id}
            className='flex p-4 m-4 w-4/5 w-min-[300px] w-max-[600px]'
          >
            <ContentContainer className='p-4 w-full'>
              <p>Name: {dance.name}</p>
              {/* <p>Style: {dance.styleOfDance}</p> */}
              <p>Age Level: {dance.ageLevel.name}</p>
              <button className='btn btn-action'>Enroll</button>
            </ContentContainer>
          </li>
        ))}
      </ul>
    </div>
  )
}
