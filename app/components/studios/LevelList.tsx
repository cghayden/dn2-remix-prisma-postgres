import type { AgeLevel, SkillLevel } from '@prisma/client'
import { Link } from '@remix-run/react'
import EditIcon from '../icons/EditIcon'

type LevelListProps = {
  levels: SkillLevel[] | AgeLevel[]
  levelType: 'skillLevels' | 'ageLevels'
}

export function LevelList({ levels, levelType }: LevelListProps) {
  const heading = levelType === 'ageLevels' ? 'Age' : 'Skill'
  return (
    <div className='mx-auto w-full max-w-md bg-white'>
      <div className=' grid grid-cols-1 relative bg-indigo-800 text-white py-1 px-2'>
        <h3 className='text-lg text-center place-self-center row-start-1 row-end-1'>
          {heading} Levels
        </h3>
        <Link
          to={'../editOrAddLevels'}
          className='place-self-end row-start-1 row-end-1'
        >
          <EditIcon />
        </Link>
      </div>
      {!levels?.length ? (
        <p>No age levels found</p>
      ) : (
        <ul className='grid grid-cols-2 gap-2 p-4'>
          {levels?.map((level) => (
            <li key={level.id}>{level.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
