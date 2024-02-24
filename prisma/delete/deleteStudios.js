import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function deleteAllDanceClasses() {
  console.log('deleting all dance classes ...')
  await prisma.danceClass.deleteMany({
    where: {
      parentId: null,
    },
  })
}

export async function deleteAllSkillLevels() {
  console.log('deleting all skill levels ...')
  await prisma.skillLevel.deleteMany({})
}

export async function deleteAllAgeLevels() {
  console.log('deleting all age levels ...')
  await prisma.ageLevel.deleteMany({})
}

export async function deleteAllFootwear() {
  console.log('deleting all footwear ...')
  await prisma.footwear.deleteMany({})
}

export async function deleteAllTights() {
  console.log('deleting all tights ...')
  await prisma.tights.deleteMany({})
}

export async function deleteAllStudios() {
  console.log('deleting all studios ...')
  await prisma.user.deleteMany({
    where: {
      type: 'STUDIO',
    },
  })
}

async function main() {
  await deleteAllDanceClasses()
  await deleteAllSkillLevels()
  await deleteAllAgeLevels()
  await deleteAllFootwear()
  await deleteAllTights()
  await deleteAllStudios()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
