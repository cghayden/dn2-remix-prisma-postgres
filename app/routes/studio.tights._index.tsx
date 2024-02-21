import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'

import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getStudioTights } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const footwear = await getStudioTights(userId)
  return footwear
}

export default function AgeLevelsPage() {
  const footwear = useLoaderData<typeof loader>()

  return (
    <div className='flex flex-col h-full'>
      <PageHeader headerText='Tights' actionRoute='add' className='px-4' />
      <ContentContainer className='max-w-[600px] w-5/6'>
        <ul>
          {footwear.map((tightsItem) => (
            <li key={tightsItem.id} className='pl-8 py-2 grid grid-cols-2'>
              <Link to={tightsItem.id}>{tightsItem.name}</Link>
              {tightsItem.url ? <Link to={tightsItem.url}>Shop</Link> : null}
            </li>
          ))}
        </ul>
      </ContentContainer>
    </div>
  )
}
