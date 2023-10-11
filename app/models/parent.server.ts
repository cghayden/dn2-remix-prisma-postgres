import type { User, Parent } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'
import { requireUserId } from '~/session.server'
import { getUserById } from './user.server'
import { redirect } from '@remix-run/node'

export async function requireParent(request: Request) {
  // check for UserId - if none, no one is logged in, redirect to /welcome
  const userId = await requireUserId(request)

  // get User, check user type for 'PARENT'
  const user = await getUserById(userId)
  if (!user || user?.type !== 'PARENT') {
    throw redirect(`/`)
  }
  return userId
}

export async function createParent(
  email: User['email'],
  password: User['password'],
  type: User['type'],
  firstName: Parent['firstName'],
  lastName: Parent['lastName']
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      email,
      type,
      password: hashedPassword,
      parent: {
        create: {
          firstName,
          lastName,
        },
      },
    },
  })
}
