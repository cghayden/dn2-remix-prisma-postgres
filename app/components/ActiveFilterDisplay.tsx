import type { Filters } from '~/routes/studio.danceClasses'

export default function ActiveFilterDisplay({ filters }: { filters: Filters }) {
  console.log('filters', Object.values(filters))
  return (
    <ul className='flex text-sm'>
      {Object.values(filters).map((filter) => {
        return filter.map((label) => (
          <li
            key={label}
            className='bg-amber-700 text-amber-50 m-2 px-2 py-1 rounded-xl'
          >
            {label}
          </li>
        ))
      })}
    </ul>
  )
}
