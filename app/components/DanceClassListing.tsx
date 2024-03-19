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
  return (
    <div>
      <h2 className='text-xl text-center py-2'>Dance Classes</h2>
      <DashboardContainer>
        <ul className='p-4'>
          {danceClasses.map((danceClass) => (
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
