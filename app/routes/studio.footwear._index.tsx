import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'

import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getStudioFootwear } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const footwear = await getStudioFootwear(userId)
  return footwear
}

export default function AgeLevelsPage() {
  const footwear = useLoaderData<typeof loader>()

  return (
    <div className='flex flex-col h-full'>
      <PageHeader headerText='Footwear' actionRoute='add' className='px-4' />
      <ContentContainer className='mx-4 py-3 '>
        <ul>
          {footwear.map((footwearItem) => (
            <li
              key={footwearItem.id}
              className='p-8 py-2 grid grid-cols-apparelListing items-center'
            >
              <div className='w-7 h-7'>
                {footwearItem.imageFilename ? (
                  <img
                    className='w-full h-full object-center object-contain'
                    src={`https://dancernotes.s3.us-east-2.amazonaws.com/${footwearItem.imageFilename}`}
                    alt='pic'
                  />
                ) : (
                  <Link
                    className='w-full h-full bg-slate-400'
                    to={`${footwearItem.id}/addImage`}
                  >
                    +
                  </Link>
                )}
              </div>
              <Link to={footwearItem.id} className='mx-8'>
                {footwearItem.name}
              </Link>
              <div className='text-indigo-600'>
                {footwearItem.url ? (
                  <Link to={footwearItem.url}>
                    <p className='text-nowrap text-ellipsis overflow-hidden'>
                      {footwearItem.url}
                    </p>
                  </Link>
                ) : (
                  <Link to={`${footwearItem.id}`}>Add Store Link</Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </ContentContainer>
    </div>
  )
}
