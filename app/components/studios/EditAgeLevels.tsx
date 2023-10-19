import { useFetcher } from '@remix-run/react'
import { TextInput } from '../forms/TextInput'
import { type AgeLevel } from '@prisma/client'

export default function EditAgeLevels({
  ageLevels,
}: {
  ageLevels: AgeLevel[]
}) {
  const fetcher = useFetcher()
  // function handleInputChange(event: React.ChangeEvent<HTMLInputElement>, defaultValue: string) {
  //   const button = document.getElementById(`btn_${event.target.name}`);
  //   if (button) {
  //     button.disabled = event.target.value === defaultValue;
  //   }
  // }
  return (
    <div className='w-[350px] p-4'>
      <h2 className='text-center'>Age Levels</h2>
      {ageLevels.map((level) => (
        <fetcher.Form
          key={level.id}
          id={level.id}
          method='post'
          action='ResourceEditLevels'
          className='p-4'
        >
          <input name={'levelId'} value={level.id} type='hidden' />
          <div className='input_button_as_row'>
            <TextInput
              label={null}
              name='newLevelName'
              defaultValue={level.name}
            />
            <button
              type='submit'
              form={level.id}
              className='text-sm rounded bg-blue-500  text-white hover:bg-blue-600 focus:bg-blue-400  transition duration-150 ease-in-out ml-auto px-2 h-6'
            >
              Save Level
            </button>
          </div>
        </fetcher.Form>
      ))}
    </div>
  )
}
