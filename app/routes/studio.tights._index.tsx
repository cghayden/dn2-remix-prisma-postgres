import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'

import { getStudioTights } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const tights = await getStudioTights(userId)
  return tights
}

export default function TightsIndex() {
  const tights = useLoaderData<typeof loader>()

  return (
    <div className='w-5/6 mx-auto'>
      <ContentContainer className='w-full'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-200 py-1 grid grid-cols-2 justify-items-start rounded-t-md'>
              <th scope='col' className='pl-2'>
                Name
              </th>
              <th scope='col' className='pl-2'>
                Shop
              </th>
            </tr>
          </thead>
          {!tights.length && (
            <p className='text-center py-8'>You have no tights</p>
          )}

          <tbody>
            {tights.map((tightsItem) => (
              <tr
                key={tightsItem.id}
                className='grid grid-cols-2 border-b-2 last:border-b-0'
              >
                <th
                  scope='row'
                  className='p-4 text-sm font-semibold text-start'
                >
                  <Link to={tightsItem.id}>{tightsItem.name}</Link>
                </th>
                <td className='p-4'>
                  <div className='text-indigo-600 text-nowrap text-ellipsis overflow-hidden'>
                    {tightsItem.url ? (
                      <Link to={tightsItem.url}>{tightsItem.url}</Link>
                    ) : (
                      <Link to={`${tightsItem.id}`}>Add Store Link</Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentContainer>
    </div>
  )
}
