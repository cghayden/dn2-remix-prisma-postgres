import type {
  User,
  Studio,
  AgeLevel,
  DanceClass,
  SkillLevel,
  Shoes,
  Tights,
} from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'
import { requireUserId } from '~/session.server'
import { getUserById } from './user.server'
import { redirect } from '@remix-run/node'

export async function requireStudio(request: Request) {
  // check for UserId - if none, no one is logged in, redirect to /welcome
  const userId = await requireUserId(request)

  // get User, check user type for 'STUDIO'
  const userWithPassword = await getUserById(userId)
  if (!userWithPassword || userWithPassword?.type !== 'STUDIO') {
    throw redirect(`/`)
  }
  const { password: _password, ...userWithoutPassword } = userWithPassword
  return userWithoutPassword
}

export async function getUserIdAsStudio(request: Request) {
  const user = await requireStudio(request)
  return user.userId
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

export async function getDanceClasses_Name_Id(userId: User['userId']) {
  const studio = prisma.danceClass.findMany({
    where: {
      studioId: userId,
    },
    select: {
      name: true,
      id: true,
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

export async function getSkillLevels(userId: User['userId']) {
  const studio = prisma.skillLevel.findMany({
    where: {
      studioId: userId,
    },
    orderBy: {
      name: 'asc',
    },
  })
  return studio
}
export async function getStudioShoes(userId: User['userId']) {
  const studio = prisma.shoes.findMany({
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

export async function upsertStudioShoe({
  shoeId,
  name,
  description,
  url,
  image,
  studioId,
  danceClassIds,
}: {
  shoeId: Shoes['id'] | 'new'
  name: Shoes['name']
  description?: Shoes['description']
  url?: Shoes['url']
  image?: Shoes['image']
  studioId: User['userId']
  danceClassIds: string[]
}) {
  const danceClassConnector = danceClassIds.map((classId) => {
    return { id: classId }
  })
  await prisma.shoes.upsert({
    where: {
      id: shoeId,
    },
    update: {
      name,
      description,
      studioId,
      url,
      image,
      danceClasses: {
        connect: danceClassConnector,
      },
    },
    create: {
      name,
      description,
      studioId,
      url,
      image,
      danceClasses: {
        connect: danceClassConnector,
      },
    },
  })
}
export async function upsertStudioTights({
  tightsId,
  name,
  description,
  url,
  image,
  studioId,
  danceClassIds,
}: {
  tightsId: Tights['id'] | 'new'
  name: Tights['name']
  description?: Tights['description']
  url?: Tights['url']
  image?: Tights['image']
  studioId: User['userId']
  danceClassIds: string[]
}) {
  const danceClassConnector = danceClassIds.map((classId) => {
    return { id: classId }
  })
  await prisma.tights.upsert({
    where: {
      id: tightsId,
    },
    update: {
      name,
      description,
      studioId,
      url,
      image,
      danceClasses: {
        connect: danceClassConnector,
      },
    },
    create: {
      name,
      description,
      studioId,
      url,
      image,
      danceClasses: {
        connect: danceClassConnector,
      },
    },
  })
}

export async function upsertSkillLevel(
  userId: Studio['userId'],
  levelId: SkillLevel['id'] | 'new',
  newName: SkillLevel['name'],
  levelDescription: SkillLevel['description']
) {
  await prisma.skillLevel.upsert({
    where: {
      id: levelId,
    },
    update: {
      name: newName,
      description: levelDescription,
    },
    create: {
      name: newName,
      description: levelDescription,
      studio: {
        connect: {
          userId,
        },
      },
    },
  })
}
export async function upsertAgeLevel(
  userId: Studio['userId'],
  levelId: AgeLevel['id'] | 'new',
  newName: AgeLevel['name'],
  levelDescription: AgeLevel['description']
) {
  await prisma.ageLevel.upsert({
    where: {
      id: levelId,
    },
    update: {
      name: newName,
      description: levelDescription,
    },
    create: {
      name: newName,
      description: levelDescription,
      studio: {
        connect: {
          userId,
        },
      },
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
}: {
  name: DanceClass['name']
  performanceName: DanceClass['performanceName']
  competitions: DanceClass['competitions']
  recital: DanceClass['recital']
  studioId: DanceClass['studioId']
  ageLevelId: DanceClass['ageLevelId']
  skillLevelId: DanceClass['skillLevelId']
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
    },
  })
}
