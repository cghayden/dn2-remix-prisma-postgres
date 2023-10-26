import type { AgeLevel, SkillLevel } from '@prisma/client'
export const LevelList = ({
  levels,
}: {
  levels: AgeLevel[] | SkillLevel[]
}) => {
  return (
    <>
      {levels.map((level) => (
        <div
          key={level.id}
          className='grid grid-cols-2 items-center border-b-2 last:border-b-0'
        >
          <p className='px-4 py-2 text-sm font-semibold'>{level.name}</p>
          <p className='px-4 py-2 text-xs'>{level.description}</p>
        </div>
      ))}
    </>
  )
}
