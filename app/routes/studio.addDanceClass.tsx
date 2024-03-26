import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import {
  createStudioDance,
  getStudioConfig,
  requireStudioUserId,
} from '~/models/studio.server'
import { getUserId } from '~/session.server'
import { z } from 'zod'
import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { TextInput } from '~/components/forms/TextInput'
import { PageHeader } from '~/components/styledComponents/PageHeader'
import { useState } from 'react'

const danceSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  performanceName: z.string().min(3).optional(),
  ageLevelId: z.string(),
  competitions: z.boolean().default(false),
  recital: z.boolean().default(false),
  skillLevelId: z.string(),
  tightsId: z.string().optional(),
  footwearId: z.string().optional(),
  styleOfDance: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
  const studioId = await requireStudioUserId(request)
  const formData = await request.formData()
  const submission = parse(formData, { schema: danceSchema })

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }
  // if boolean checkboxes are not checked, there will not be a submission

  const {
    name,
    performanceName,
    ageLevelId,
    competitions,
    recital,
    skillLevelId,
    tightsId,
    footwearId,
    styleOfDance,
  } = submission.value

  await createStudioDance({
    name,
    performanceName: performanceName || null,
    studioId,
    ageLevelId,
    competitions,
    recital,
    skillLevelId,
    tightsId,
    footwearId,
    styleOfDance,
  }).catch((err) => {
    throw new Error(err.message)
  })
  return redirect('/studio')
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  const studioConfig = await getStudioConfig(userId as string)
  if (!studioConfig)
    throw new Error('there was a problem retrieving Studio config')
  // get available ageLevels and skillLevels from loader to populate select
  return { studioConfig }
}

export default function AddDanceClass() {
  const { studioConfig } = useLoaderData<typeof loader>()
  const lastSubmission = useActionData<typeof action>()
  const [selectedAgeLevel, setSelectedAgeLevel] = useState('')
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('')
  const [selectedTights, setSelectedTights] = useState('')
  const [selectedFootwear, setSelectedFootwear] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')

  // The `useForm` hook will return everything you need to setup a form including the error and config of each field
  const [
    form,
    {
      name,
      performanceName,
      ageLevelId,
      skillLevelId,
      tightsId,
      footwearId,
      competitions,
      recital,
      // styleOfDance,
    },
  ] = useForm({
    // The last submission will be used to report the error and serves as the default value and initial error of the form for progressive enhancement
    lastSubmission,
    // run validation logic on client (if slow connection)
    // shouldValidate: 'onBlur',
    // onValidate({ formData }) {
    //   return parse(formData, { schema })
    // },
  })

  return (
    <>
      <PageHeader headerText='Add A New Dance' />
      <Form method='post' {...form.props} className='form_default w-5/6'>
        <div className='input_section_wrapper'>
          <div className='input_item'>
            <TextInput
              name='name'
              label={'Name'}
              error={name.error}
              required={true}
            />
          </div>
          <div className='input_item'>
            <TextInput
              name='performanceName'
              label={'Performance Name'}
              error={performanceName.error}
              required={false}
            />
          </div>

          {/* Style OF Dance */}
          <div className='input_item'>
            <label
              className='block text-sm text-gray-600 mb-1'
              htmlFor={'ageLevel'}
            >
              Style of Dance{' '}
            </label>
            <input type='hidden' name='styleOfDance' value={selectedStyle} />
            {studioConfig.stylesOfDance.map((style) => (
              <button
                type='button'
                key={style}
                className={`inline-block text-sm px-4 py-2 border rounded-full mr-2 mb-2 
                          ${
                            selectedStyle === style
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                onClick={() => setSelectedStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Age Level */}
          <div className='input_item'>
            <label
              className='block text-sm text-gray-600 mb-1'
              htmlFor={'ageLevel'}
            >
              Age Level
            </label>
            <input type='hidden' name='ageLevelId' value={selectedAgeLevel} />
            {studioConfig.ageLevels.map((level) => (
              <button
                type='button'
                key={level.id}
                className={`inline-block text-sm px-4 py-2 border rounded-full mr-2 mb-2 
                          ${
                            selectedAgeLevel === level.id
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                onClick={() => setSelectedAgeLevel(level.id)}
              >
                {level.name}
              </button>
            ))}
            {/* 
             old, traditional native select with dropdown...
            <select
              // required={true}
              name='ageLevelId'
              id='ageLevel'
              className='w-full border rounded bg-gray-50 border-gray-300 text-gray-800 px-2 py-1 focus:ring-2 focus:ring-blue-300 pt-[5px] pb-[5px]'
            >
              <option value='12'>-- Choose a Dance Level --</option>
              {studioConfig.ageLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select> */}
            {ageLevelId.error ? (
              <div className='pt-1 text-red-700' id={`ageLevel-error`}>
                {ageLevelId.error}
              </div>
            ) : null}
          </div>

          {/* Skill Level Selector*/}
          <div className='input_item'>
            <label
              className='block text-sm text-gray-600 mb-1'
              htmlFor={'skillLevel'}
            >
              Skill Level
            </label>
            <input
              type='hidden'
              name='skillLevelId'
              value={selectedSkillLevel}
            />
            {studioConfig.skillLevels.map((skillLevel) => (
              <button
                type='button'
                key={skillLevel.id}
                className={`inline-block text-sm px-4 py-2 border rounded-full mr-2 mb-2 
                          ${
                            selectedSkillLevel === skillLevel.id
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                onClick={() => setSelectedSkillLevel(skillLevel.id)}
              >
                {skillLevel.name}
              </button>
            ))}
            {skillLevelId.error ? (
              <div className='pt-1 text-red-700' id={`skillLevel-error`}>
                {skillLevelId.error}
              </div>
            ) : null}
          </div>

          {/* Tights Selector */}
          <div className='input_item'>
            <label
              className='block text-sm text-gray-600 mb-1'
              htmlFor={'tights'}
            >
              Tights
            </label>
            <input type='hidden' name='tightsId' value={selectedTights} />
            {studioConfig.tights.map((tightsItem) => (
              <button
                type='button'
                key={tightsItem.id}
                className={`inline-block text-sm px-4 py-2 border rounded-full mr-2 mb-2 
                          ${
                            selectedTights === tightsItem.id
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                onClick={() => setSelectedTights(tightsItem.id)}
              >
                {tightsItem.name}
              </button>
            ))}
            {tightsId.error ? (
              <div className='pt-1 text-red-700' id={`tights-error`}>
                {tightsId.error}
              </div>
            ) : null}
          </div>

          {/* Footwear Selector */}
          <div className='input_item'>
            <label
              className='block text-sm text-gray-600 mb-1'
              htmlFor={'footwear'}
            >
              Footwear
            </label>
            <input type='hidden' name='footwearId' value={selectedFootwear} />
            {studioConfig.footwear.map((footwearItem) => (
              <button
                type='button'
                key={footwearItem.id}
                className={`inline-block text-sm px-4 py-2 border rounded-full mr-2 mb-2 
                          ${
                            selectedFootwear === footwearItem.id
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                onClick={() => setSelectedFootwear(footwearItem.id)}
              >
                {footwearItem.name}
              </button>
            ))}
            {footwearId.error ? (
              <div className='pt-1 text-red-700' id={`footwear-error`}>
                {footwearId.error}
              </div>
            ) : null}
          </div>

          {/* Competitions Selector */}
          <div className='input_item'>
            <label className='flex gap-4'>
              <input {...conform.input(competitions, { type: 'checkbox' })} />
              <span>This Dance will compete in competitions</span>
            </label>
          </div>

          {/* Recital Selector */}
          <div className='input_item'>
            <label className='flex gap-4'>
              <input {...conform.input(recital, { type: 'checkbox' })} />
              <span>Recital: Yes, this dance will be in the recital</span>
            </label>
          </div>
          <div>{recital.error}</div>
          <button
            type='submit'
            className=' rounded bg-blue-500 mt-4 ml-2 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400'
          >
            Create Class
          </button>
        </div>
      </Form>
    </>
  )
}
