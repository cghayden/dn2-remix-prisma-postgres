import { seedStudioModule } from '../../prisma/seed/seedStudios'

export async function loader({ request }) {
  if (
    request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return request.status(401).end('Unauthorized')
  }
  await seedStudioModule().catch((err) => {
    throw new Error(err)
  })

  return new Response('Seed Cron completed')
}
