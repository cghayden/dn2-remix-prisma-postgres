import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// after retrieving studios from db, this function populates an array of dance classes that can then be used in a prisma create many mutation to create those dances for the studio
export function generateStudioDanceData(studio) {
  let danceClasses = []
  const ageLevels = studio.ageLevels
  const tights = studio.tights
  const footwear = studio.footwear
  const skillLevels = studio.skillLevels
  const defaultSkillLevel = skillLevels.filter(
    (level) => level.name === 'Recreational'
  )[0]
  const stylesOfDance = studio.stylesOfDance

  for (const ageLevel of ageLevels) {
    for (const style of stylesOfDance) {
      const shouldDuplicateForSkillLevels = [
        // 'Mini',
        'Junior',
        'Teen',
        'Senior',
      ].includes(ageLevel.name)

      if (shouldDuplicateForSkillLevels) {
        for (let skillLevel of skillLevels) {
          const tightsId = tights[Math.floor(Math.random() * tights.length)].id
          const footwearId =
            footwear[Math.floor(Math.random() * footwear.length)].id
          danceClasses.push({
            name: `${ageLevel.name} ${skillLevel.name} ${style} `,
            ageLevelId: ageLevel.id,
            skillLevelId: skillLevel.id,
            tightsId: tightsId,
            footwearId: footwearId,
            studioId: studio.userId,
            competitions: skillLevel.name === 'Company' ? true : false,
            recital: true,
            styleOfDance: style,
          })
        }
      } else {
        const tightsId = tights[Math.floor(Math.random() * tights.length)].id
        const footwearId =
          footwear[Math.floor(Math.random() * footwear.length)].id

        danceClasses.push({
          name: `${ageLevel.name} Recreational ${style}`,
          ageLevelId: ageLevel.id,
          skillLevelId: defaultSkillLevel.id,
          styleOfDance: style,
          tightsId: tightsId,
          footwearId: footwearId,
          studioId: studio.userId,
          competitions: false,
          recital: true,
        })
      }
    }
  }
  return danceClasses
}

export async function seedDanceClasses() {
  console.log('seeding studio dance classes')

  const studios = await prisma.studio.findMany({
    select: {
      userId: true,
      stylesOfDance: true,
      ageLevels: {
        select: {
          id: true,
          name: true,
        },
      },
      tights: {
        select: {
          id: true,
        },
      },
      footwear: {
        select: {
          id: true,
        },
      },
      skillLevels: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  if (!studios.length) {
    console.log(
      'no studios ... run "npm run seedStudios" to create studios, then seed dance classes'
    )
    return
  }
  for (const studio of studios) {
    const danceClassData = generateStudioDanceData(studio)
    await prisma.danceClass.createMany({
      data: danceClassData,
    })
  }
}

async function main() {
  await seedDanceClasses()
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
