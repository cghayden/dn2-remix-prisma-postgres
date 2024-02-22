import { Outlet } from '@remix-run/react'
import { PageHeader } from '~/components/styledComponents/PageHeader'

export default function FootwearBase() {
  return (
    <div>
      <PageHeader headerText='Tights' actionRoute='add' />
      <Outlet />
    </div>
  )
}
