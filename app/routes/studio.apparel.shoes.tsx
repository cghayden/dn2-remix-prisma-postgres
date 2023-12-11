import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { useRef, useState } from 'react'
// import { UpsertLevelForm } from '~/components/studios/UpsertLevelForm'
// import { LevelList } from '~/components/studios/LevelList'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { getStudioShoes } from '~/models/studio.server'
import { requireUserId } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const shoes = await getStudioShoes(userId)
  return shoes
}

// display shoes:
//          name
//         description?
//         url?
//         image?
//         classes
export default function AgeLevelsPage() {
  // const formRef = useRef<HTMLFormElement>(null)
  const shoes = useLoaderData<typeof loader>()
  const [editMode, toggleEditMode] = useState(false)

  return (
    <div>
      <div>
        <PageHeader headerText='Shoes' />
      </div>
      <div className='text-right mb-2 pr-4'>
        <Link
          to='/studio/settings/addItem/shoes'
          className='text-white bg-gray-700 p-2 rounded-md '
          // onClick={() => toggleEditMode(!editMode)}
        >
          {editMode ? 'Cancel' : 'Edit / Add New Shoe'}
        </Link>
      </div>
      <ContentContainer>
        <thead className='block'>
          <tr className='bg-gray-200 py-1 grid grid-cols-2 justify-items-start rounded-t-md'>
            <th className='pl-2'>Name</th>
            <th className='pl-2'>Description</th>
          </tr>
        </thead>
        {editMode ? (
          <>
            Edit Mode
            {/* {levels.map((level) => (
              <UpsertLevelForm
                key={level.id}
                level={level}
                levelType='ageLevel'
              />
            ))} */}
          </>
        ) : (
          <ul>
            {shoes.map((shoe) => (
              <li key={shoe.id}>{shoe.name}</li>
            ))}
          </ul>
        )}
        {/* {editMode && <UpsertLevelForm formRef={formRef} levelType='ageLevel' />} */}
      </ContentContainer>
    </div>
  )
}
