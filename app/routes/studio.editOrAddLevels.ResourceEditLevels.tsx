import { json, type ActionFunctionArgs } from '@remix-run/node'
import { updateAgeLevel, updateSkillLevel } from '~/models/studio.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const levelId = formData.get('levelId')
  const newLevelName = formData.get('newLevelName')
  const levelType = formData.get('levelType')

  const errors = {
    newLevel: null,
    description: null,
  }

  if (typeof levelId !== 'string') {
    return {
      errors: { ...errors, newLevel: 'ageLevel id was not provided' },
      status: 400,
    }
  }

  if (typeof newLevelName !== 'string' || newLevelName.length === 0) {
    return {
      errors: { ...errors, description: 'new name must be a string' },
      status: 400,
    }
  }

  // name, description, id
  // variable - ageLevel or skillLevel
  if (levelType === 'skillLevel') {
    await updateSkillLevel(levelId, newLevelName).catch((err) => {
      throw new Error(err.message)
    })
  }

  if (levelType === 'ageLevel') {
    await updateAgeLevel(levelId, newLevelName)
  }

  return json({ success: true })
}
