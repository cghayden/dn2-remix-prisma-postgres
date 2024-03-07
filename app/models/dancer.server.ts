import type { Dancer, User } from '@prisma/client'
import { prisma } from '~/db.server'

export async function createParentDancer({
  firstName,
  lastName,
  userId,
  birthdate,
}: {
  firstName: Dancer['firstName']
  lastName: Dancer['lastName']
  userId: User['userId']
  birthdate: Dancer['birthdate']
}) {
  return await prisma.dancer.create({
    data: {
      firstName,
      lastName,
      birthdate,
      parent: {
        connect: {
          userId: userId,
        },
      },
    },
  })
}

export async function raw_getDancer({ dancerId }: { dancerId: Dancer['id'] }) {
  const dancer = await prisma.$queryRaw`
   
  `
  return dancer
}

export async function raw_getDancers() {
  const dancers = await prisma.$queryRaw`
    SELECT * FROM User`
  return dancers
}

export async function updateDancer(
  dancerId: Dancer['id'],
  data: Partial<Dancer>
) {
  return await prisma.dancer.update({
    where: {
      id: dancerId,
    },
    data: data,
  })
}

export async function getDancers_Id_Name(userId: User['userId']) {
  const dancersNames = await prisma.dancer.findMany({
    where: { parentId: userId },
    select: { firstName: true, id: true },
  })
  return dancersNames
}

export async function getDancersForEnrollment(userId: User['userId']) {
  const dancersNames = await prisma.dancer.findMany({
    where: { parentId: userId },
    select: {
      firstName: true,
      id: true,
      birthdate: true,
      enrollments: {
        select: {
          classId: true,
        },
      },
    },
  })
  return dancersNames
}

export const getDancer = async (dancerId: Dancer['id']) => {
  const dancer = await prisma.dancer.findUnique({
    where: {
      id: dancerId,
    },
  })
  return dancer
}
