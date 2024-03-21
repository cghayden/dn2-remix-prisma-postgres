import { type ActionFunctionArgs } from '@remix-run/node'
import { requireStudioUserId } from '~/models/studio.server'
import { prisma } from '~/db.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireStudioUserId(request)
  const body = await request.formData()
  const levelId = body.get('levelId')
  const levelType = body.get('levelType')

  if (
    !levelId ||
    !levelType ||
    typeof levelId !== 'string' ||
    typeof levelId !== 'string'
  ) {
    return 'error: incorrect, or no levelId/skillLevel provided'
  }

  if (levelType === 'skillLevel') {
    const relatedDanceClasses = await prisma.danceClass.findMany({
      where: {
        skillLevelId: levelId,
      },
    })
    if (relatedDanceClasses.length > 0) {
      return {
        error:
          'This skill level cannot be deleted, as there are dance classes that are using it.  You can edit the skill level, or change all dance classes that useit to another skil level, and then delete it',
      }
    }

    await prisma.skillLevel.delete({
      where: {
        id: levelId,
      },
    })
  }

  if (levelType === 'ageLevel') {
    const relatedDanceClasses = await prisma.danceClass.findMany({
      where: {
        ageLevelId: levelId,
      },
    })
    if (relatedDanceClasses.length > 0) {
      return {
        error:
          'This age level cannot be deleted, as there are dance classes that are using it.  You can edit the skill level, or change all dance classes that useit to another skil level, and then delete it',
      }
    }
    await prisma.ageLevel.delete({
      where: {
        id: levelId,
      },
    })
    return 'level deleted'
  }
}
