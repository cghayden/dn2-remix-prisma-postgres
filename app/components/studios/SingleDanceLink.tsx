import type { DanceClass } from '@prisma/client'
import { Link } from '@remix-run/react'

type DanceListingProps = Partial<DanceClass>

export function DanceListing({
  danceClass,
}: {
  danceClass: DanceListingProps
}) {
  if (!danceClass.id) {
    return null
  }

  return (
    <Link to={`danceClass/${danceClass.id}`} className='inline-block py-2'>
      {danceClass.name}
    </Link>
  )
}
