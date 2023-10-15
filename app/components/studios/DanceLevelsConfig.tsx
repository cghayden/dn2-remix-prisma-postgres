import { type DanceLevel } from '@prisma/client'
import EditIcon from '../icons/EditIcon'
import { Link } from '@remix-run/react'

export default function DanceLevelsConfig({
  danceLevels,
}: {
  danceLevels: DanceLevel[]
}) {
  return (
    <div className='mx-auto w-full max-w-md px-8'>
      <div className='flex'>
        <h3 className='text-lg'>Competitive and Skill Levels</h3>
        <Link to={'../editOrAddLevels'} className='ml-auto'>
          <EditIcon />
        </Link>
      </div>
      {!danceLevels?.length ? (
        <p>No dance levels found</p>
      ) : (
        <ul className='grid grid-cols-2 gap-2'>
          {danceLevels?.map((level) => (
            <li key={level.id}>{level.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
