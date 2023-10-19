import { type SkillLevel } from '@prisma/client'
import EditIcon from '../icons/EditIcon'
import { Link } from '@remix-run/react'

export default function SkillLevelsList({
  skillLevels,
}: {
  skillLevels: SkillLevel[]
}) {
  return (
    <div className='mx-auto w-full max-w-md px-8'>
      <div className='flex'>
        <h3 className='text-lg'>Competitive / Skill Levels</h3>
        <Link to={'../editOrAddLevels'} className='ml-auto'>
          <EditIcon />
        </Link>
      </div>
      {!skillLevels?.length ? (
        <p>No skill levels found</p>
      ) : (
        <ul className='grid grid-cols-2 gap-2'>
          {skillLevels?.map((level) => (
            <li key={level.id}>{level.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
