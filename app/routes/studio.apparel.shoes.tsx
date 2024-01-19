import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getStudioShoes } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const shoes = await getStudioShoes(userId)
  console.log('server shoes', shoes)
  return shoes
}

export default function AgeLevelsPage() {
  // const formRef = useRef<HTMLFormElement>(null)
  const shoes = useLoaderData<typeof loader>()

  // 2 columns display, like a CMS
  // col 1: list of shoes
  // col 2: selection

  return (
    <div>
      <div>
        <PageHeader headerText='Shoes / Footwear' />
      </div>
      <div className='grid grid-cols-2'>
        {/* col 1 - List */}
        <div>
          <ul>
            {shoes.map((shoe) => (
              <li key={shoe.id}>
                <Link to={shoe.id}>Nike Dunks</Link>
              </li>
            ))}

            <li>Black Taps</li>
            <li>Tan Taps</li>
            <li>Ballet Slippers</li>
            <li>Converse All Stars</li>
          </ul>
        </div>
        {/* col 2 - selection */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
