import { type ActionFunctionArgs } from '@remix-run/node'
import { updateSkillLevel } from '~/models/studio.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const skillLevelId = formData.get('skillLevelId')
  const newLevelName = formData.get('newLevelName')
  const description = formData.get('description')
  const errors = {
    newLevel: null,
    description: null,
  }

  if (typeof skillLevelId !== 'string') {
    return {
      errors: { ...errors, newLevel: 'skillLevel id was not provided' },
      status: 400,
    }
  }
  if (typeof description !== 'string') {
    return {
      errors: { ...errors, newLevel: 'decription must be a string' },
      status: 400,
    }
  }

  if (typeof newLevelName !== 'string' || newLevelName.length === 0) {
    return {
      errors: { ...errors, description: 'new name must be a string' },
      status: 400,
    }
  }

  await updateSkillLevel(skillLevelId, newLevelName, description).catch(
    (err) => {
      throw new Error(err.message)
    }
  )

  return { success: true, errors: null, status: 200 }
}
