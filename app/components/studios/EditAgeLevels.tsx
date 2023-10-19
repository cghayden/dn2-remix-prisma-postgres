import { type AgeLevel } from '@prisma/client'
import { AgeLevelEditableList } from './AgeLevelEditableList'

export default function EditAgeLevels({
  ageLevels,
}: {
  ageLevels: AgeLevel[]
}) {
  return (
    <div className='w-[350px] p-4'>
      <h2 className='text-center'>Age Levels</h2>
      <div className='p-4'>
        {ageLevels.map((level) => (
          <AgeLevelEditableList ageLevel={level} key={level.id} />
        ))}
      </div>
    </div>
  )
}
