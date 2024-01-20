import type {
  User,
  Studio,
  AgeLevel,
  DanceClass,
  SkillLevel,
  Footwear,
  Tights,
} from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'
import { requireUserId } from '~/session.server'
import { getUserById } from './user.server'
import { redirect } from '@remix-run/node'
// import { select } from 'node_modules/@conform-to/react/helpers'

// return logged in studio without password
export async function requireStudio(request: Request) {
  // check for UserId on session - if none, no one is logged in, redirect to /welcome
  const userId = await requireUserId(request)

  // get User, check user type for 'STUDIO'
  const userWithPassword = await getUserById(userId)
  if (!userWithPassword || userWithPassword?.type !== 'STUDIO') {
    throw redirect(`/`)
  }
  const { password: _password, ...userWithoutPassword } = userWithPassword
  return userWithoutPassword
}

// return logged in Studio UserId
export async function requireStudioUserId(request: Request) {
  const studio = await requireStudio(request)
  return studio.userId
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

export async function getStudioFootwear(userId: User['userId']) {
  const footwear = await prisma.footwear.findMany({
    where: {
      studioId: userId,
    },
    orderBy: {
      name: 'asc',
    },
  })
  return footwear
}

export async function getFootwearItem(footwearId: Footwear['id']) {
  const footwearItem = await prisma.footwear.findUnique({
    where: {
      id: footwearId,
    },
  })

  return footwearItem
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

export async function getDanceClass({
  danceId,
}: {
  danceId: DanceClass['id']
}) {
  const danceClass = await prisma.danceClass.findUnique({
    where: { id: danceId },
    select: {
      studioId: true,
      name: true,
      performanceName: true,
      ageLevel: {
        select: {
          name: true,
          description: true,
        },
      },
      skillLevel: {
        select: {
          name: true,
          description: true,
        },
      },
      tights: {
        select: {
          name: true,
          id: true,
        },
      },
      footwear: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  })

  return danceClass
}

// MUTATIONS //

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

export async function upsertStudioFootwear({
  studioId,
  footwearId,
  name,
  description,
  url,
  imageFilename,
  danceClassIds,
}: {
  studioId: User['userId']
  footwearId: Footwear['id'] | 'new'
  name: Footwear['name']
  description?: Footwear['description']
  url?: Footwear['url']
  imageFilename?: Footwear['imageFilename']
  danceClassIds: string[]
}) {
  const danceClassConnector = danceClassIds.map((classId) => {
    return { id: classId }
  })
  return await prisma.footwear.upsert({
    where: {
      id: footwearId,
    },
    update: {
      name,
      description,
      studioId,
      url,
      imageFilename,
      danceClasses: {
        connect: danceClassConnector,
      },
    },
    create: {
      name,
      description,
      studioId,
      url,
      imageFilename,
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
  imageFilename,
  studioId,
  danceClassIds,
}: {
  tightsId: Tights['id'] | 'new'
  name: Tights['name']
  description?: Tights['description']
  url?: Tights['url']
  imageFilename?: Tights['imageFilename']
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
      imageFilename,
      danceClasses: {
        connect: danceClassConnector,
      },
    },
    create: {
      name,
      description,
      studioId,
      url,
      imageFilename,
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
  levelDescription: SkillLevel['description'] = null
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
  levelDescription: AgeLevel['description'] = null
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
