import { useState } from 'react'
import { DanceListing } from './SingleDanceLink'
import { type DanceListingType } from '~/routes/studio.danceClasses'

export default function DancesPageDanceListings({
  danceClasses,
}: {
  danceClasses: DanceListingType[] | null
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredDances = danceClasses?.filter((danceClass) =>
    danceClass.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <div>
      <h2 className='text-xl text-center py-2'>Dance Classes</h2>

      <div className='p-4 w-full bg-slate-100 '>
        <input
          type='text'
          className='p-2 border border-gray-200 rounded w-full'
          placeholder='Search ...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className='p-4'>
        {filteredDances?.map((danceClass) => (
          <li key={danceClass.id}>
            <DanceListing danceClass={danceClass} />
          </li>
        ))}
      </ul>
    </div>
  )
}
