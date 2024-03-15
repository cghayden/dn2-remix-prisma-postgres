import { prisma } from '~/db.server'
import { useLoaderData } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { requireStudioUserId } from '~/models/studio.server'

export async function loader({ request }: LoaderFunctionArgs) {
  // await prisma.enrollment.deleteMany()
  // await prisma.user.deleteMany()
  // await prisma.parent.deleteMany()

  return 'ok'
}
export default function Playground() {
  return <div>Delete db</div>
}
