import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
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
    <div>
      <PageHeader headerText='Footwear' actionRoute='add' navigateBack={true} />
      <ContentContainer className='m-3'>
        <PanelHeader
          headerText={footwearItem.name}
          editRoute={`../edit/${footwearItem.id}`}
        />
        <div className='item-image-section_wrapper'>
          {footwearItem.imageFilename ? (
            <div className='item-image-section'>
              <div className='min-w-48 min-h-48 w-52 h-52 mx-auto text-center'>
                <img
                  className='w-full h-full object-contain object-center'
                  src={`https://dancernotes.s3.us-east-2.amazonaws.com/${footwearItem.imageFilename}`}
                  alt='footwear pic'
                />
              </div>
              <Link to={'changeImage'}>Change Image</Link>
            </div>
          ) : (
            <div className='item-image-section'>
              <Link to={'addImage'}>Add an Image</Link>
            </div>
          )}

          <Outlet context={{ footwearItem }} />
        </div>

        {footwearItem.url && (
          <div className='grid place-items-center py-4'>
            <Link to={footwearItem.url} className='text-indigo-700'>
              Preferred Store Listing
            </Link>
          </div>
        )}
        <div className='p-4'>
          <p>
            <span className='font-bold'>Notes:</span> {footwearItem.description}
          </p>
        </div>
        <div className='p-4'>
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
      </ContentContainer>
    </div>
  )
}
