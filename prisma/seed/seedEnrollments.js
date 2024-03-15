import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
//Proper implementation uses .map to loop over array and perform async functin on each item:
// use array.map wrapped in Promise.all to  get an array of promises and execute all promises using Promise.all. Using Promise.all with Array.map() is recommended if we want to concurrently execute asynchronous code for each element in an array. Hence, improving the performance of the code.

// By using Promise.all along with map, you ensure that the timer is stopped only after all the asynchronous operations inside the mapping are fully completed, giving you an accurate measurement of the execution time.

export async function seedEnrollments() {
  let totalEnrollments = 0

  const dancers = await prisma.dancer.findMany({
    select: { id: true },
  })

  let studios = await prisma.studio.findMany({
    include: {
      danceClasses: {
        select: {
          id: true,
        },
      },
    },
  })

  const filteredStudios = studios.filter(
    (studio) => studio.danceClasses.length !== 0
  )

  await Promise.all(
    dancers.map(async (dancer) => {
      let numberOfClassesToEnroll = 5
      const studio =
        filteredStudios[Math.floor(Math.random() * filteredStudios.length)]
      const studioClasses = studio.danceClasses

      while (numberOfClassesToEnroll > 0) {
        // pick a dance class and enroll
        const randomDanceClass =
          studioClasses[Math.floor(Math.random() * studioClasses.length)]
        await prisma.enrollment.create({
          data: {
            dancerId: dancer.id,
            classId: randomDanceClass.id,
            studioId: studio.userId,
          },
        })
        totalEnrollments++
        numberOfClassesToEnroll--
      }
    })
  )

  console.log('totalEnrollments', totalEnrollments)
}

async function main() {
  console.time('seed enrollments')
  await seedEnrollments().then(() => console.timeEnd('seed enrollments'))
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

// Ineffiecient use of forEach to loop over array and perfrom asynchronous code:
// export async function seedEnrollments_withForEach() {
//   let totalEnrollments = 0
//   const dancers = await prisma.dancer.findMany({ select: { id: true } })
//   console.log('total dancers in db:', dancers.length)

//   const danceClasses = await prisma.danceClass.findMany({
//     select: { id: true, studioId: true },
//     take: 10,
//   })

//   danceClasses.forEach(async (danceClass) => {
//     let poolOfDancers = [...dancers]

//     let randomNumberOfDancersToSeedIntoClass = Math.floor(Math.random() * 9) + 4
//     if (randomNumberOfDancersToSeedIntoClass > poolOfDancers.length) {
//       throw new Error(
//         'random number of dancers to seed is greater than the number of dancers available in the db'
//       )
//     }
//     totalEnrollments += randomNumberOfDancersToSeedIntoClass

//     console.log(
//       `seeding dance class ${danceClass.id} with ${randomNumberOfDancersToSeedIntoClass} dancers`
//     )
//     while (randomNumberOfDancersToSeedIntoClass > 0) {
//       // pick a dancer from dancers
//       const randomDancerIndex = Math.floor(Math.random() * poolOfDancers.length)
//       // remove dancer at randomDancerIndex from dancers array
//       const randomDancer = poolOfDancers.splice(randomDancerIndex, 1)[0]

//       // create an enrollment with dancer and danceClass
//       await prisma.enrollment.create({
//         data: {
//           dancerId: randomDancer.id,
//           classId: danceClass.id,
//           studioId: danceClass.studioId,
//         },
//       })
//       randomNumberOfDancersToSeedIntoClass--
//     }
//   })
//   console.log(totalEnrollments, 'totalEnrollments')
// }

// when running a large seed, you might need to optimize the connection pool to handle it
// from prisma:
// If the query engine cannot process a query in the queue before the time limit , you will see connection pool timeout exceptions in your log. A connection pool timeout can occur if:

// Many users are accessing your app simultaneously
// You send a large number of queries in parallel (for example, using await Promise.all())
// If you consistently experience connection pool timeouts after configuring the recommended pool size, you can further tune the connection_limit and pool_timeout parameters.

//   await Promise.all(
//     // for each dancer, pick a studio and enroll in 5 classes from that studio

//     danceClasses.map(async (danceClass) => {
//       let poolOfDancers = [...dancers]
//       let randomNumberOfDancersToSeedIntoClass =
//         Math.floor(Math.random() * 9) + 4
//       if (randomNumberOfDancersToSeedIntoClass > poolOfDancers.length) {
//         throw new Error(
//           'random number of dancers to seed is greater than the number of dancers available in the db'
//         )
//       }

//       console.log(
//         `seeding dance class ${danceClass.id} with ${randomNumberOfDancersToSeedIntoClass} dancers`
//       )
//       while (randomNumberOfDancersToSeedIntoClass > 0) {
//         const randomDancerIndex = Math.floor(
//           Math.random() * poolOfDancers.length
//         )
//         const randomDancer = poolOfDancers.splice(randomDancerIndex, 1)[0]
//         // create an enrollment with dancer and danceClass
//         await prisma.enrollment.create({
//           data: {
//             dancerId: randomDancer.id,
//             classId: danceClass.id,
//             studioId: danceClass.studioId,
//           },
//         })
//         totalEnrollments++
//         randomNumberOfDancersToSeedIntoClass--
//       }
//     })
//   )
//   console.log(totalEnrollments, 'totalEnrollments')
// }
