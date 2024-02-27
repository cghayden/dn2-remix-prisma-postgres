import { DanceListing } from './studios/SingleDanceLink'

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
      <ul className='p-4'>
        {danceClasses.map((danceClass) => (
          <li key={danceClass.id}>
            <DanceListing danceClass={danceClass} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DanceClassListing
