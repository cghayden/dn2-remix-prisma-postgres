import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
// import { generateNames } from '../../app/lib/generateNames'

const prisma = new PrismaClient()

export async function seedParentsAndDancers() {
  console.log('seeding parents and dancers...')
  const parentNames = generateNames(200)
  const dancerNames = [
    'Emma',
    'Liam',
    'Olivia',
    'Noah',
    'Ava',
    'William',
    'Sophia',
    'James',
    'Isabella',
    'Benjamin',
    'Mia',
    'Ethan',
    'Charlotte',
    'Michael',
    'Amelia',
    'Alexander',
    'Grace',
    'Henry',
    'Natalie',
    'Leonardo',
    'Thomas',
    'Emily',
    'Daniel',
    'Madison',
    'Matthew',
    'Anna',
    'David',
    'Samantha',
    'Joseph',
    'Ashley',
    'Lucas',
    'Elizabeth',
    'Jackson',
    'Margaret',
    'Evelyn',
    'Andrew',
    'Chloe',
    'Christopher',
    'Victoria',
    'Sarah',
    'Owen',
    'Luna',
    'Jack',
    'Grace',
    'Dylan',
    'Ruby',
    'Luke',
    'Ella',
    'Ryan',
    'Avery',
    'Nathan',
    'Lily',
    'Caleb',
    'Addison',
    'Isaac',
    'Zoe',
    'Christian',
    'Layla',
    'Aaron',
    'Peyton',
    'Hunter',
    'Hannah',
    'Joshua',
    'Mia',
    'Logan',
    'Leah',
    'Elijah',
    'Sophie',
    'Gabriel',
    'Scarlett',
    'Cameron',
    'Stella',
    'Samuel',
    'Mila',
    'Austin',
    'Charlotte',
    'Evan',
    'Harper',
    'Kaylee',
    'Aiden',
    'Eli',
    'Chloe',
    'Benjamin',
    'Lucy',
    'Adrian',
    'Madelyn',
    'Jesse',
    'Amelia',
    'Henry',
    'Isabelle',
    'Joseph',
    'Matilda',
    'Leo',
    'Kinsley',
    'Ian',
    'Aria',
    'Adam',
    'Penelope',
    'Julian',
    'Brielle',
  ]

  for (const name of parentNames) {
    // Create Parent-type User
    const hashedPassword = await bcrypt.hash(
      `parent${name.firstName[0].toLowerCase()}${name.lastName.toLowerCase()}`,
      10
    )
    await prisma.user.upsert({
      where: {
        email: `${name.firstName[0].toLowerCase()}${name.lastName.toLowerCase()}@example.com`,
      },
      update: {},
      create: {
        email: `${name.firstName[0].toLowerCase()}${name.lastName.toLowerCase()}@example.com`,
        password: hashedPassword,
        type: 'PARENT',
        parent: {
          create: {
            firstName: name.firstName,
            lastName: name.lastName,
            dancers: {
              createMany: {
                data: [
                  {
                    firstName: `${
                      dancerNames[
                        Math.floor(Math.random() * dancerNames.length)
                      ]
                    }`,
                    lastName: name.lastName,
                  },
                  {
                    firstName: `${
                      dancerNames[
                        Math.floor(Math.random() * dancerNames.length)
                      ]
                    }`,
                    lastName: name.lastName,
                  },
                ],
              },
            },
          },
        },
      },
    })
  }
}

async function main() {
  await seedParentsAndDancers()
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

function generateNames(numberOfNames) {
  const firstNames = [
    'Alex',
    'Jordan',
    'Taylor',
    'Casey',
    'Morgan',
    'Jamie',
    'Quinn',
    'Avery',
    'Riley',
    'Peyton',
    'Skyler',
    'Cameron',
    'Drew',
    'Robin',
    'Dana',
    'Andy',
    'Leslie',
    'Kelly',
    'Jesse',
    'Sam',
    'Emma',
    'Liam',
    'Olivia',
    'Noah',
    'Ava',
    'William',
    'Sophia',
    'James',
    'Isabella',
    'Benjamin',
    'Mia',
    'Ethan',
    'Charlotte',
    'Michael',
    'Amelia',
    'Alexander',
    'Grace',
    'Henry',
    'Natalie',
    'Leonardo',
    'Thomas',
    'Emily',
    'Daniel',
    'Madison',
    'Matthew',
    'Anna',
    'David',
    'Samantha',
    'Joseph',
    'Ashley',
    'Lucas',
    'Elizabeth',
    'Jackson',
    'Margaret',
    'Evelyn',
    'Andrew',
    'Chloe',
    'Christopher',
    'Victoria',
    'Sarah',
    'Owen',
    'Luna',
    'Jack',
    'Grace',
    'Dylan',
    'Ruby',
    'Luke',
    'Ella',
    'Ryan',
    'Avery',
    'Nathan',
    'Lily',
    'Caleb',
    'Addison',
    'Isaac',
    'Zoe',
    'Christian',
    'Layla',
    'Aaron',
    'Peyton',
    'Hunter',
    'Hannah',
    'Joshua',
    'Mia',
    'Logan',
    'Leah',
    'Elijah',
    'Sophie',
    'Gabriel',
    'Scarlett',
    'Cameron',
    'Stella',
    'Samuel',
    'Mila',
    'Austin',
    'Charlotte',
    'Evan',
    'Harper',
    'Kaylee',
    'Aiden',
    'Eli',
    'Chloe',
    'Benjamin',
    'Lucy',
    'Adrian',
    'Madelyn',
    'Jesse',
    'Amelia',
    'Henry',
    'Isabelle',
    'Joseph',
    'Matilda',
    'Leo',
    'Kinsley',
    'Ian',
    'Aria',
    'Adam',
    'Penelope',
    'Julian',
    'Brielle',
    'Addie',
    'Ella',
  ]
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
    'Hayden',
    'Viera',
    'Smith',
    'Scott',
    'Swift',
    'Fishman',
    'Weber',
    'Maloney',
    'Ford',
  ]

  const namesArray = []
  const nameSet = new Set()

  while (nameSet.size < numberOfNames) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const fullName = `${firstName} ${lastName}`

    if (!nameSet.has(fullName)) {
      nameSet.add(fullName)
      namesArray.push({ firstName, lastName })
    }
  }

  return namesArray
}

export { generateNames }
