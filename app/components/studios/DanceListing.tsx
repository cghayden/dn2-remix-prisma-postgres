import type { DanceClass } from '@prisma/client'
import { ContentContainer } from '../styledComponents/ContentContainer'
import { Link } from '@remix-run/react'

export function DanceListing({ danceClass }: { danceClass: DanceClass }) {
  return (
    <Link to={danceClass.id} className='inline-block py-2'>
      {danceClass.name}
    </Link>
  )
}
