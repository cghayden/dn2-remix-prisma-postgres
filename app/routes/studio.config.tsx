import { Outlet } from '@remix-run/react'
import { PageHeader } from '~/components/styledComponents/PageHeader'

export default function StudioConfigRoot() {
  return (
    <div className='px-8'>
      <PageHeader headerText='Studio Configuration' />
      <Outlet />
    </div>
  )
}
