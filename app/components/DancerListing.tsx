import { Link } from '@remix-run/react'
import { DashboardContainer } from './styledComponents/DashboardContainer'

type DancerListing = {
  id: string
  name: string
}
type Props = {
  dancers: DancerListing[]
}

function DanceClassListing({ dancers = [] }: Props) {
  return (
    <div>
      <h2 className='text-xl text-center py-2'>Dancers</h2>
      <DashboardContainer>
        <ul className='p-4'>
          {dancers.map((dancer) => (
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

export default DanceClassListing
