import { Outlet } from '@remix-run/react'
import { PageHeader } from '~/components/styledComponents/PageHeader'

export default function StudioConfigRoot() {
  return (
    <div>
      <PageHeader headerText='Studio Configuration' />
      <Outlet />
    </div>
  )
}
