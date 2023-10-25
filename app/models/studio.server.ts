import type {
  User,
  Studio,
  AgeLevel,
  DanceClass,
  SkillLevel,
} from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'
import { requireUserId } from '~/session.server'
import { getUserById } from './user.server'
import { redirect } from '@remix-run/node'

export async function requireStudio(request: Request) {
  // check for UserId - if none, no one is logged in, redirect to /welcome
  const userId = await requireUserId(request)

  // get User, check user type for 'PARENT'
  const userWithPassword = await getUserById(userId)
  if (!userWithPassword || userWithPassword?.type !== 'STUDIO') {
    throw redirect(`/`)
  }
  const { password: _password, ...userWithoutPassword } = userWithPassword
  return userWithoutPassword
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
      danceClasses: {
        select: {
          id: true,
          name: true,
          ageLevel: {
            select: { name: true },
          },
        },
      },
    },
  })
  return studio
}

export async function getAgeLevels(userId: User['userId']) {
  const studio = prisma.ageLevel.findMany({
    where: {
      studioId: userId,
    },
    orderBy: {
      name: 'asc',
    },
  })
  return studio
}

export async function getStudioConfig(userId: User['userId']) {
  const studio = prisma.studio.findUnique({
    where: {
      userId,
    },
    select: {
      ageLevels: true,
      skillLevels: true,
    },
  })
  return studio
}

export async function updateAgeLevel(
  levelId: AgeLevel['id'],
  newName: AgeLevel['name'],
  levelDescription: AgeLevel['description']
) {
  await prisma.ageLevel.update({
    where: {
      id: levelId,
    },
    data: {
      name: newName,
      description: levelDescription,
    },
  })
}
export async function updateSkillLevel(
  levelId: SkillLevel['id'],
  newName: SkillLevel['name'],
  levelDescription: SkillLevel['description']
) {
  await prisma.skillLevel.update({
    where: {
      id: levelId,
    },
    data: {
      name: newName,
      description: levelDescription,
    },
  })
}

export async function createStudioDance({
  name,
  performanceName,
  competitions,
  recital,
  studioId,
  ageLevelId,
  skillLevelId,
  tights,
  shoes,
}: {
  name: DanceClass['name']
  performanceName: DanceClass['performanceName']
  competitions: DanceClass['competitions']
  recital: DanceClass['recital']
  studioId: DanceClass['studioId']
  ageLevelId: DanceClass['ageLevelId']
  skillLevelId: DanceClass['skillLevelId']
  tights: DanceClass['tights']
  shoes: DanceClass['shoes']
}) {
  await prisma.danceClass.create({
    data: {
      name,
      performanceName,
      studioId,
      ageLevelId,
      competitions,
      recital,
      skillLevelId,
      tights,
      shoes,
    },
  })
}
