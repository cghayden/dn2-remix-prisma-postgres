import type { User, Studio, DanceLevel, DanceClass } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'
import { requireUserId } from '~/session.server'
import { getUserById } from './user.server'
import { redirect } from '@remix-run/node'

export async function requireStudio(request: Request) {
  // check for UserId - if none, no one is logged in, redirect to /welcome
  const userId = await requireUserId(request)

  // get User, check user type for 'PARENT'
  const user = await getUserById(userId)
  if (!user || user?.type !== 'STUDIO') {
    throw redirect(`/`)
  }
  return userId
}

export async function createStudio(
  email: User['email'],
  password: User['password'],
  type: User['type'],
  name: Studio['name']
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return await prisma.user.create({
    data: {
      email,
      type,
      password: hashedPassword,
      studio: {
        create: {
          name,
        },
      },
    },
  })
}

export async function getFullStudio(userId: User['userId']) {
  const studio = prisma.studio.findUnique({
    where: {
      userId,
    },
    include: {
      danceClasses: true,
    },
  })
  return studio
}

export async function getDanceLevels(userId: User['userId']) {
  const studio = prisma.danceLevel.findMany({
    where: {
      studioId: userId,
    },
    orderBy: {
      name: 'asc',
    },
  })
  return studio
}

export async function updateDanceLevel(
  levelId: DanceLevel['id'],
  newName: DanceLevel['name']
  // description: DanceLevel['description']
) {
  await prisma.danceLevel.update({
    where: {
      id: levelId,
    },
    data: {
      name: newName,
      // description,
    },
  })
}

export async function createStudioDance({
  name,
  performanceName,
  competitive,
  recreational,
  recital,
  studioId,
}: {
  name: DanceClass['name']
  performanceName: DanceClass['performanceName']
  competitive: DanceClass['competitive']
  recreational: DanceClass['recreational']
  recital: DanceClass['recital']
  studioId: DanceClass['studioId']
}) {
  await prisma.danceClass.create({
    data: {
      name,
      performanceName,
      competitive,
      recreational,
      recital,
      studioId,
    },
  })
}
