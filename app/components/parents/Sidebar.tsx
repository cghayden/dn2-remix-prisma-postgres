import { Link } from '@remix-run/react'
import type { ParentNavData } from 'types'

type ComponentProps = {
  parentNavData: ParentNavData | null
}
export default function Sidebar({ parentNavData }: ComponentProps) {
  return (
    <div>
      <ul>
        {parentNavData?.dancers.map((dancer) => (
          <li key={dancer.id}>
            <Link to={`dancer/${dancer.id}`}>{dancer.firstName}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
