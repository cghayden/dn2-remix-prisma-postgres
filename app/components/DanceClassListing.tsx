import { useState } from 'react'
import { DanceListing } from './studios/SingleDanceLink'
import { DashboardContainer } from './styledComponents/DashboardContainer'

type DanceListing = {
  id: string
  name: string
}
type Props = {
  danceClasses: DanceListing[]
}

function DanceClassListing({ danceClasses = [] }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredDances = danceClasses.filter((danceClass) =>
    danceClass.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <div>
      <h2 className='text-xl text-center py-2'>Dance Classes</h2>
      <DashboardContainer>
        <div className='p-4 w-full bg-slate-100 '>
          <input
            type='text'
            className='p-2 border border-gray-200 rounded'
            placeholder='Search ...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ul className='p-4'>
          {filteredDances.map((danceClass) => (
            <li key={danceClass.id}>
              <DanceListing danceClass={danceClass} />
            </li>
          ))}
        </ul>
      </DashboardContainer>
    </div>
  )
}

export default DanceClassListing
