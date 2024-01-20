import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getStudioFootwear } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const footwear = await getStudioFootwear(userId)
  return footwear
}

export default function AgeLevelsPage() {
  // const formRef = useRef<HTMLFormElement>(null)
  const footwear = useLoaderData<typeof loader>()

  // 2 columns display, like a CMS
  // col 1: list of footwear
  // col 2: selection

  return (
    <div className='flex flex-col h-full'>
      <PageHeader
        headerText='Footwear / Footwear'
        actionRoute='add'
        className='px-8'
      />
      <div className='flex flex-1 '>
        {/* col 1 - List */}
        <div className='border-r border-slate-600 h-full w-48'>
          <ul>
            {footwear.map((footwear) => (
              <li key={footwear.id} className='pl-8 py-2'>
                <Link to={footwear.id}>Nike Dunks</Link>
              </li>
            ))}

            <li className='pl-8 py-2'>Black Taps</li>
            <li className='pl-8 py-2'>Tan Taps</li>
            <li className='pl-8 py-2'>Ballet Slippers</li>
            <li className='pl-8 py-2'>Converse All Stars</li>
          </ul>
        </div>
        {/* col 2 - selection */}
        <div className='flex-1 bg-slate-50'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
