const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function clearAllDanceClasses() {
  await prisma.danceClass.deleteMany({})
}

async function main() {
  await clearAllDanceClasses()
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
