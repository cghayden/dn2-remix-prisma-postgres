import { useFetcher } from '@remix-run/react'
import { TextInput } from '../forms/TextInput'
import { type DanceLevel } from '@prisma/client'

export default function EditDanceLevels({
  danceLevels,
}: {
  danceLevels: DanceLevel[]
}) {
  const fetcher = useFetcher()
  // function handleInputChange(event: React.ChangeEvent<HTMLInputElement>, defaultValue: string) {
  //   const button = document.getElementById(`btn_${event.target.name}`);
  //   if (button) {
  //     button.disabled = event.target.value === defaultValue;
  //   }
  // }
  return (
    <div>
      {danceLevels.map((level) => (
        <div key={level.id} className=''>
          <fetcher.Form
            id={level.id}
            method='post'
            action='ResourceEditLevels'
            className='space-y-4'
          >
            <input name={'levelId'} value={level.id} type='hidden' />
            <div className='flex '>
              <TextInput
                label={null}
                name='newLevelName'
                defaultValue={level.name}
                // onChange={()=>handleInputChange(e, level.name)}
              />
              <button
                type='submit'
                form={level.id}
                className=' rounded bg-blue-500  text-white hover:bg-blue-600 focus:bg-blue-400  transition duration-150 ease-in-out ml-auto px-2'
              >
                Save Level
              </button>
            </div>
          </fetcher.Form>
        </div>
      ))}
    </div>
  )
}
