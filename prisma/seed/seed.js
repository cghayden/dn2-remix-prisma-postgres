import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

const skill_levels = ['Recreational', 'Company']

const age_levels = [
  { name: 'First Steps', description: '3-4' },
  { name: 'Mini', description: '5-7' },
  { name: 'Petite', description: '7-9' },
  { name: 'Junior', description: '10-12' },
  { name: 'Teen', description: '13-15' },
  { name: 'Senior', description: '15-18' },
]

const tights = [
  {
    name: 'Capezio Studio Basic Fishnet Seamless',
    color: 'Black',
    url: 'https://www.capezio.com/studio-basics-fishnet-seamless-tight-child',
  },
  {
    name: 'Capezio Ultra Soft Stirrup',
    color: 'Light Suntan',
    url: 'https://discountdance.com/dancewear/style_1961C.html?&pid=25514&Shop=Style&&skey=capezio+ultra+soft+stirrup+tights&search=true&SortOrder=R&SID=1873605563',
  },
  {
    name: 'Bloch Endura Footed',
    color: 'Light Pink',
    url: 'https://us.blochworld.com/products/girls-endura-footed-tights-light-pink',
  },
  {
    name: 'Bloch Contoursoft Stirrup',
    color: 'Tan',
    url: 'https://us.blochworld.com/collections/children-dancewear-tights/products/girls-contoursoft-stirrup-tights-tan',
  },
  {
    name: 'Capezio Studio Basic Fishnet Seamless',
    color: 'Black',
    url: 'https://www.capezio.com/studio-basics-fishnet-seamless-tight-child',
  },
  {
    name: 'Capezio Ultra Soft Footed',
    color: 'Ballet Pink',
    url: 'https://www.capezio.com/ultra-soft-footed-tight-girls',
  },
  { name: 'Capezio Footed', color: 'Ballet Pink', url: '' },
  {
    name: 'Body Wrappers Total Stretch Seamless Fishnet',
    color: 'Black',
    url: 'https://bodywrappers.com/collections/totalstretch%C2%AE-tights-by-body-wrappers/products/dance-fishnet-tights-a69-c69-womens-girls?_pos=1&_fid=a809d7dd6&_ss=c',
  },
  {
    name: 'Body Wrappers Total Stretch Seamless Convertible',
    color: 'Ballet Pink',
    url: 'https://bodywrappers.com/products/dance-convertible-tights-a31-c31-womens-girls',
  },
  {
    name: 'Capezio Ultra Soft',
    color: 'Caramel',
    url: 'https://www.capezio.com/ultra-soft-self-knit-waistband-stirrup-tight-girls',
  },
]

const footwear = [
  {
    name: 'Capezio Hanami Wonder Jazz Shoe',
    color: 'Caramel',
    url: 'https://www.capezio.com/lily-ballet-shoe-child',
  },
  {
    name: 'Capezio Slip On Jazz, E-Series',
    color: 'Caramel',
    url: 'https://www.capezio.com/e-series-jazz-slip-on-child',
  },
  {
    name: 'Capezio Lily',
    color: 'Ballet Pink',
    url: 'https://www.capezio.com/lily-ballet-shoe-child',
  },
  {
    name: 'Pastry Glam Pie Glitter',
    color: 'Black with White Sole',
    url: 'https://www.lovepastry.com/products/glam-pie-glitter-youth-sneakers-black',
  },
  {
    name: 'Capezio Hanami Canvas',
    color: 'Light Pink',
    url: 'https://www.capezio.com/hanami-ballet-shoe-child',
  },
  {
    name: 'Capezio Mary Jane',
    color: 'Caramel',
    url: 'https://www.capezio.com/mary-jane',
  },
  {
    name: 'Capezio Cadence',
    color: 'Black',
    url: 'https://www.capezio.com/cadence-tap-shoe-child',
  },
  {
    name: 'Capezio Roxy',
    color: 'Black',
    url: 'https://www.capezio.com/roxy-tap-shoe',
  },
  {
    name: 'Bloch Jason Samuels Smith Tap Shoes',
    color: 'Black',
    url: 'https://us.blochworld.com/products/ladies-jason-samuels-smith-tap-shoes-black-leather?_pos=1&_psq=samuel%20&_ss=e&_v=1.0',
  },
  {
    name: 'Nike Dunk Low',
    color: 'Black and White',
    url: 'https://www.nike.com/t/dunk-low-womens-shoes-ppQwKZ/DD1503-101?_gl=1*1hl910n*_up*MQ..&gclid=CjwKCAiA29auBhBxEiwAnKcSqi6FfsKq7srSLOsTL_zWAVggcAy7MbCS7aZlfmYz2gITUC-4_y_fZRoCvkEQAvD_BwE&gclsrc=aw.ds',
  },
  {
    name: 'Capezio Fierce Dance Sneaker',
    color: 'Black',
    url: 'https://www.capezio.com/fierce-dansneakerr-child',
  },
]

async function seedStudios() {
  console.log('seeding studios')
  const studioNames = ['A', 'B', 'C', 'D', 'E']

  for (const name of studioNames) {
    // Create Studio-type User
    const hashedPassword = await bcrypt.hash(
      `studio${name.toLowerCase()}${name.toLowerCase()}`,
      10
    )
    await prisma.user
      .upsert({
        where: {
          email: `studio${name.toLowerCase()}@example.com`,
        },
        update: {},
        create: {
          email: `studio${name.toLowerCase()}@example.com`,
          password: hashedPassword,
          type: 'STUDIO',
          studio: {
            create: {
              name: `Studio ${name}`,
            },
          },
        },
      })
      .then(async (user) => {
        console.log('new studio user:', user)
        console.log('seeding skill levels...')
        for (const level of skill_levels) {
          await prisma.skillLevel.upsert({
            where: {
              id: `${user.email}-sl-${level}`,
            },
            update: {},
            create: {
              id: `${user.email}-sl-${level}`,
              description: '',
              name: level,
              studio: {
                connect: {
                  userId: user.userId,
                },
              },
            },
          })
        }
        console.log('seeding tights...')
        for (const tight of tights) {
          await prisma.tights.upsert({
            where: {
              id: `${user.email}-tights-${tight.name}`,
            },
            update: {},
            create: {
              id: `${user.email}-tights-${tight.name}`,
              name: tight.name,
              color: tight.color,
              url: tight.url,
              studio: {
                connect: {
                  userId: user.userId,
                },
              },
            },
          })
        }
        console.log('seeding footwear...')

        for (const shoe of footwear) {
          await prisma.footwear.upsert({
            where: {
              id: `${user.email}-shoes-${shoe.name}`,
            },
            update: {},
            create: {
              id: `${user.email}-shoes-${shoe.name}`,

              name: shoe.name,
              color: shoe.color,
              url: shoe.url,
              studio: {
                connect: {
                  userId: user.userId,
                },
              },
            },
          })
        }
        console.log('seeding age levels...')

        for (const age of age_levels) {
          await prisma.ageLevel.upsert({
            where: {
              id: `${user.email}-ageLevel-${age.name}`,
            },
            update: {},
            create: {
              id: `${user.email}-ageLevel-${age.name}`,
              name: age.name,
              description: age.description,
              studio: {
                connect: {
                  userId: user.userId,
                },
              },
            },
          })
        }
      })
  }
}

function generateStudioDanceData(studio, stylesOfDance) {
  let danceClasses = []
  const ageLevels = studio.ageLevels
  const tights = studio.tights
  const footwear = studio.footwear
  const skillLevels = studio.skillLevels
  const defaultSkillLevel = skillLevels.filter(
    (level) => level.name === 'Recreational'
  )[0]

  for (const ageLevel of ageLevels) {
    for (const style of stylesOfDance) {
      const shouldDuplicateForSkillLevels = [
        'Mini',
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
            name: `${ageLevel.name} ${skillLevel.id.slice(23)} ${style} `,
            ageLevelId: ageLevel.id,
            skillLevelId: skillLevel.id,
            styleOfDance: style,
            tightsId: tightsId,
            footwearId: footwearId,
            studioId: studio.userId,
            competitions: skillLevel.id.slice(23) === 'Company' ? true : false,
            recital: true,
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

async function seedDanceClasses() {
  const stylesOfDance = ['Tap', 'Jazz', 'Hip Hop', 'Lyric', 'Ballet']

  const studios = await prisma.studio.findMany({
    select: {
      userId: true,
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
  for (const studio of studios) {
    const danceClassData = generateStudioDanceData(studio, stylesOfDance)
    await prisma.danceClass.createMany({
      data: danceClassData,
    })
  }
}

async function main() {
  //seed studios
  // await seedStudios()
  //seed studio dance classes
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
