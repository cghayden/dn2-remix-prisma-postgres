import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function deleteAllParents() {
  console.log('deleting all parents ...')
  await prisma.user.deleteMany({
    where: {
      type: 'PARENT',
    },
  })
}

async function main() {
  await deleteAllParents()
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
