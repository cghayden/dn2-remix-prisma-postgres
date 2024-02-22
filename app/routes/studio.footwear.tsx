import { Outlet } from '@remix-run/react'
import { PageHeader } from '~/components/styledComponents/PageHeader'

export default function FootwearOutlet() {
  return (
    <div>
      <PageHeader headerText='Footwear' actionRoute={'add'} className='px-4' />
      <Outlet />
    </div>
  )
}
