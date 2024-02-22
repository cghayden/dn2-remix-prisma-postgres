import type { AgeLevel, SkillLevel } from '@prisma/client'
export const LevelList = ({
  levels,
}: {
  levels: AgeLevel[] | SkillLevel[]
}) => {
  return (
    <tbody>
      {levels.map((level) => (
        <tr
          key={level.id}
          className='grid grid-cols-2 border-b-2 last:border-b-0'
        >
          <th className='px-4 py-2 text-sm font-semibold text-start'>
            {level.name}
          </th>
          <td className='px-4 py-2 text-sm'>{level.description}</td>
        </tr>
      ))}
    </tbody>
  )
}
