import { type DanceLevel } from '@prisma/client'
import DanceLevelsForm from './AddDanceLevelsForm'
import { useState } from 'react'
import EditIcon from '../icons/EditIcon'

export default function DanceLevelsConfig({
  danceLevels,
}: {
  danceLevels: DanceLevel[]
}) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className='mx-auto w-full max-w-md px-8'>
      <div className='flex'>
        <h3 className='text-lg'>Competitive and Skill Levels</h3>
        <button className='ml-auto' onClick={() => setShowForm(!showForm)}>
          <EditIcon />
        </button>
      </div>
      {!danceLevels?.length ? (
        <p>No dance levels found</p>
      ) : (
        <ul className='grid grid-cols-2 gap-2'>
          {danceLevels?.map((level) => (
            <li key={level.id}>{level.name}</li>
          ))}
        </ul>
      )}
      {showForm && <DanceLevelsForm />}{' '}
    </div>
  )
}
