import { json, type ActionFunctionArgs } from '@remix-run/node'
import {
  upsertSkillLevel,
  upsertAgeLevel,
  requireStudioUserId,
} from '~/models/studio.server'
import { z } from 'zod'
import { parse } from '@conform-to/zod'

const levelSchema = z.object({
  levelId: z.string(),
  newLevelName: z
    .string()
    .min(2, { message: 'Level Name Must Be At Least 2 Characters' }),
  levelDescription: z.string().optional(),
  levelType: z.string(),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireStudioUserId(request)
  const formData = await request.formData()
  const submission = parse(formData, { schema: levelSchema })

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  const { levelId, newLevelName, levelDescription, levelType } =
    submission.value

  //TODO handle missing levelDesription

  if (levelType === 'skillLevel') {
    await upsertSkillLevel(userId, levelId, newLevelName, levelDescription)
  }

  if (levelType === 'ageLevel') {
    await upsertAgeLevel(userId, levelId, newLevelName, levelDescription)
  }
  return json(submission)
}
