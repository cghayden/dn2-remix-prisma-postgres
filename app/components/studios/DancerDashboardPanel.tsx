import { Link } from '@remix-run/react'
import { DashboardContainer } from '../styledComponents/DashboardContainer'
import { useState } from 'react'

type DancerListing = {
  id: string
  name: string
}
type Props = {
  dancers: DancerListing[]
}
export default function DancerDashboardPanel({ dancers = [] }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredDancers = dancers.filter((dancer) =>
    dancer.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <div>
      <h2 className='text-xl text-center py-2'>Dancers</h2>
      <DashboardContainer>
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
          {filteredDancers.map((dancer) => (
            <li key={dancer.id}>
              <Link to={`dancer/${dancer.id}`} className='inline-block py-2'>
                {dancer.name}
              </Link>
            </li>
          ))}
        </ul>
      </DashboardContainer>
    </div>
  )
}
