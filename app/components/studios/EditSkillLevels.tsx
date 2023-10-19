import { useFetcher } from '@remix-run/react'
import { TextInput } from '../forms/TextInput'
import { type SkillLevel } from '@prisma/client'

export default function EditSkillLevels({
  skillLevels,
}: {
  skillLevels: SkillLevel[]
}) {
  const fetcher = useFetcher()
  return (
    <div className='w-[350px] p-4'>
      {' '}
      <h2 className='text-center'>Skill Levels</h2>
      {skillLevels.map((skillLevel) => (
        <div key={skillLevel.id} className=''>
          <fetcher.Form
            id={skillLevel.id}
            method='post'
            action='resourceEditSkillLevels'
            className='p-4'
          >
            <input name={'levelId'} value={skillLevel.id} type='hidden' />
            <div className='input_button_as_row '>
              <TextInput
                label={null}
                name='newLevelName'
                defaultValue={skillLevel.name}
              />
              <button
                type='submit'
                form={skillLevel.id}
                className=' rounded bg-blue-500  text-white hover:bg-blue-600 focus:bg-blue-400  transition duration-150 ease-in-out ml-auto px-2'
              >
                Save Level
              </button>
              ``
            </div>
          </fetcher.Form>
        </div>
      ))}
    </div>
  )
}
