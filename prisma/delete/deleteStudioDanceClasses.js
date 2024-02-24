import { argv } from 'node:process'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const studioId = argv[2]

export async function deleteAllStudioDanceClasses(studioId = null) {
  if (studioId) {
    console.log(`deleting classes for studio ${studioId}`)
    await prisma.danceClass.deleteMany({
      where: {
        studioId: studioId,
      },
    })
  } else {
    console.log('deleting dance classes for all studios ...')
    await prisma.danceClass.deleteMany({
      where: {
        parentId: null,
      },
    })
  }
}

async function main(studioId) {
  await deleteAllStudioDanceClasses(studioId)
}

main(studioId)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
