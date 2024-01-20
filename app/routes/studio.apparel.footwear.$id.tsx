import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
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
      <h2 className='text-center text-xl font-bold'>{footwearItem.name}</h2>
      {footwearItem.imageFilename && (
        <div className='w-48 mx-auto'>
          <img src={footwearItem.imageFilename} alt='nikes pic' />
        </div>
      )}
      {footwearItem.url && (
        <div className='grid place-items-center'>
          <Link to={footwearItem.url} className='text-indigo-700'>
            Preferred Store Listing
          </Link>
        </div>
      )}
      <div>
        <p>{footwearItem.description}</p>
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
