import { type SkillLevel } from '@prisma/client'
import { SkillLevelEditableList } from './SkillLevelEditableList'

export default function EditSkillLevels({
  skillLevels,
}: {
  skillLevels: SkillLevel[]
}) {
  return (
    <div className='w-[350px] p-4'>
      <h2 className='text-center'>Skill Levels</h2>
      <div className='p-4'>
        {skillLevels.map((level) => (
          <SkillLevelEditableList skillLevel={level} key={level.id} />
        ))}
      </div>
    </div>
  )
}
