import { type AgeLevel } from '@prisma/client'
import EditIcon from '../icons/EditIcon'
import { Link } from '@remix-run/react'

export default function AgeLevelsList({
  ageLevels,
}: {
  ageLevels: AgeLevel[]
}) {
  return (
    <div className='mx-auto w-full max-w-md px-8'>
      <div className='flex'>
        <h3 className='text-lg'>Age Levels</h3>
        <Link to={'../editOrAddLevels'} className='ml-auto'>
          <EditIcon />
        </Link>
      </div>
      {!ageLevels?.length ? (
        <p>No age levels found</p>
      ) : (
        <ul className='grid grid-cols-2 gap-2'>
          {ageLevels?.map((level) => (
            <li key={level.id}>{level.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
