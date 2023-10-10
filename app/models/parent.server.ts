import type { User, Parent } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'

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
