import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { raw_getDancers } from '~/models/dancer.server'

import { Prisma, PrismaClient } from '@prisma/client'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const prisma = new PrismaClient()
  // prisma.$connect()
  // check for userId(logged in user) and 'PARENT' type, return id if so
  const date = new Date('1977-02-07')
  const ageFunc = `AGE("birthdate")`

  const dancers =
    await prisma.$queryRaw`SELECT "firstName", "birthdate", age("birthdate") as "age"  FROM "public"."Dancer"`
  console.log('dancers', dancers)

  return dancers
}

export default function ParentRaw() {
  const data = useLoaderData<typeof loader>()
  console.log('data', data)

  return <div>raw parent</div>
}
