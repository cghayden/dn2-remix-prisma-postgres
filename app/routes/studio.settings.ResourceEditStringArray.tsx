import { json, type ActionFunctionArgs } from '@remix-run/node'
import { requireStudioUserId } from '~/models/studio.server'
import { z } from 'zod'
import { parse } from '@conform-to/zod'
import { prisma } from '~/db.server'

const styleOfDanceSchema = z.object({
  originalEntry: z.string().optional(),
  newEntry: z.string().optional(),
  // newLevelName: z
  //   .string()
  //   .min(2, { message: 'Level Name Must Be At Least 2 Characters' }),
  // levelDescription: z.string().optional(),
  actionType: z.string(),
})
export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireStudioUserId(request)
  const formData = await request.formData()
  const submission = parse(formData, { schema: styleOfDanceSchema })
  console.log('submission', submission)

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  const { actionType, originalEntry, newEntry } = submission.value

  if (actionType === 'new') {
    // add to array on studio
    await prisma.studio.update({
      where: {
        userId: userId,
      },
      data: {
        stylesOfDance: {
          push: newEntry,
        },
      },
    })
  }

  if (actionType === 'update' || 'delete') {
    const studio = await prisma.studio.findUnique({
      where: {
        userId: userId,
      },
      select: {
        stylesOfDance: true,
      },
    })

    if (!studio) {
      throw new Error('studio not found')
    }

    //update an entry
    if (actionType === 'update') {
      if (!newEntry) {
        return json(submission)
      }
      studio.stylesOfDance.push(newEntry)
      const newStyles = studio.stylesOfDance.filter(
        (style) => style !== originalEntry
      )
      console.log('newStyles', newStyles)
      await prisma.studio.update({
        where: {
          userId: userId,
        },
        data: {
          stylesOfDance: newStyles,
        },
      })
    }

    //delete an entry
    else {
      const newStyles = studio.stylesOfDance.filter(
        (entry) => entry !== originalEntry
      )
      await prisma.studio.update({
        where: {
          userId: userId,
        },
        data: {
          stylesOfDance: newStyles,
        },
      })
    }
    // add to array on studio
  }

  return json(submission)
}
