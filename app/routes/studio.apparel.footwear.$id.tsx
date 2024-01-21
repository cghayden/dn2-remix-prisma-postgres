import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { PanelHeader } from '~/components/styledComponents/PanelHeader'
import { getFootwearItem } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const footwearId = params.id

  if (!footwearId) {
    throw new Error('no footwear Id was provided')
  }

  const footwearItem = await getFootwearItem(footwearId)
  if (footwearItem?.studioId !== userId) {
    throw new Error('you cannot view this item')
  }

  console.log('server footwear', footwearItem)
  return footwearItem
}
export default function IndividualShoePage() {
  const footwearItem = useLoaderData<typeof loader>()

  return (
    <div className='p-8'>
      <PanelHeader
        headerText={footwearItem.name}
        editRoute={`../edit/${footwearItem.id}`}
      />
      <div className='min-w-48 min-h-48 w-52 h-52 mx-auto text-center'>
        {footwearItem.imageFilename ? (
          <img
            // src={
            //   'https://dancernotes-footwear.s3.us-east-2.amazonaws.com/footwear/1.jpeg'
            // }
            src={`https://dancernotes.s3.us-east-2.amazonaws.com/${footwearItem.imageFilename}`}
            alt='footwear pic'
          />
        ) : (
          <>
            <Link to={'addImage'}>Add an Image</Link>
            <Outlet context={{ footwearItem }} />
          </>
        )}
      </div>
      {footwearItem.url && (
        <div className='grid place-items-center'>
          <Link to={footwearItem.url} className='text-indigo-700'>
            Preferred Store Listing
          </Link>
        </div>
      )}
      <div>
        <p>Description: {footwearItem.description}</p>
      </div>
      <div>
        <section>
          <h3 className='text-lg font-bold my-2'>Classes</h3>
          <ul>
            <li>Dummy Data Class Listngs</li>
            <li>Junior Hip Hop</li>
            <li>Production</li>
            <li>Junior Company Hip Hop</li>
            <li>Teen Company Hip Hop</li>
            <li>Senior Company Hip Hop</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
