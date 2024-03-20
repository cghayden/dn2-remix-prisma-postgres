import type { Filters } from '~/routes/studio.danceClasses'

export default function ActiveFilterDisplay({ filters }: { filters: Filters }) {
  console.log('filters', Object.values(filters))
  return (
    <div className='flex'>
      Active Filters
      {Object.values(filters).map((filter) => {
        return filter.map((label) => <p key={label}>{label}</p>)
      })}
    </div>
  )
}
