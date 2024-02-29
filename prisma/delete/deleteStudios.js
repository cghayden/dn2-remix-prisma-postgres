//deletes all studios, including dance classes, skill levels, age levels, footwear and tights
// import { argv } from 'node:process'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// print process.argv
// const studioId = argv[2]

export async function deleteAllStudios() {
  console.log('deleting all studios ...')
  await prisma.user.deleteMany({
    where: {
      type: 'STUDIO',
    },
  })
}

async function main() {
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

async function deleteAllSkillLevels() {
  console.log('deleting all skill levels ...')
  await prisma.skillLevel.deleteMany({})
}

async function deleteAllAgeLevels() {
  console.log('deleting all age levels ...')
  await prisma.ageLevel.deleteMany({})
}

async function deleteAllFootwear() {
  console.log('deleting all footwear ...')
  await prisma.footwear.deleteMany({})
}

async function deleteAllTights() {
  console.log('deleting all tights ...')
  await prisma.tights.deleteMany({})
}
