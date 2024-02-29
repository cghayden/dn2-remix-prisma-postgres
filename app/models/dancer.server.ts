import type { Dancer, User } from '@prisma/client'
import { prisma } from '~/db.server'

export async function createParentDancer(
  firstName: Dancer['firstName'],
  lastName: Dancer['lastName'],
  userId: User['userId']
) {
  return await prisma.dancer.create({
    data: {
      firstName,
      lastName,
      parent: {
        connect: {
          userId: userId,
        },
      },
    },
  })
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
