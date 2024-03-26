import { useRef, useState } from 'react'
import { ContentContainer } from '~/components/styledComponents/ContentContainer'
import { TableHeader } from '~/components/styledComponents/TableHeader'
import { cn } from '~/lib/tailwindUtils'
import { EditArrayForm } from './EditArrayForm'
import type { KeyedStyleOfDance } from '~/routes/studio.config._index'

type ConfigItemListProps = {
  data: KeyedStyleOfDance[]
  page: 'Age Levels' | 'Skill Levels' | 'Styles of Dance'
  itemType: 'styleOfDance'
}

export default function StringArrayTable({ data, page }: ConfigItemListProps) {
  const arrayFormRef = useRef<HTMLFormElement>(null)
  const [editMode, toggleEditMode] = useState(false)

  // using uuidv4() as key causes infinite re-render
  // Keys must not change or that defeats their purpose! Don’t generate them while rendering.

  return (
    <div className='w-5/6 mx-auto mb-8'>
      <TableHeader headerText={page} className=''>
        <div className='text-right mb-2'>
          {editMode ? (
            <button
              className='btn-noBg-cancel'
              onClick={() => toggleEditMode(false)}
            >
              Close Edit Mode
            </button>
          ) : (
            <button
              className='btn-noBg-action'
              onClick={() => toggleEditMode(true)}
            >
              Edit / Add
            </button>
          )}
        </div>
      </TableHeader>
      {/* Text that alerts the user that the field is in edit mode.  This is not needed as the red border and 'cancel edit mode' button should be enough of a UI signal: 

        {editMode && (
          <div className='text-rose-600 absolute bottom-0'>Edit Mode</div>
        )} */}

      <ContentContainer
        className={cn({
          ' border-rose-600': editMode === true,
          ' border-transparent': editMode === false,
          'w-full': true,
          'border-2': true,
        })}
      >
        <table className='w-full'>
          <thead className='block'>
            <tr className='bg-gray-200 py-1 grid grid-cols-2 justify-items-start rounded-t-md'>
              <th className='pl-2'>Name</th>
              {/* <th className='pl-2'>Description</th> */}
            </tr>
          </thead>
          {/* {!data.length && !editMode && (
            <p className='text-center py-8'>
              You have no {page}. Click "edit/add to create
            </p>
          )} */}
          {/* if in edit mode, make all current levels names and desc. editable, otherwise just list them */}
          {editMode ? (
            <tbody>
              {data.map((entry) => (
                <EditArrayForm
                  key={entry.key}
                  entry={entry.style}
                  actionType='update'
                />
              ))}
              {/* in edit provide a blank entry at the end of the list to enter a new level name and desc. */}
              <EditArrayForm
                actionType='new'
                entry=''
                arrayFormRef={arrayFormRef}
              />
            </tbody>
          ) : (
            <tbody>
              {data.map((entry) => (
                <tr
                  key={entry.key}
                  className='grid grid-cols-2 border-b-2 last:border-b-0'
                >
                  <th className='px-4 py-2 text-sm font-semibold text-start'>
                    {entry.style}
                  </th>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </ContentContainer>
    </div>
  )
}
