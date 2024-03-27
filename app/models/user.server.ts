import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'

export type { User } from '@prisma/client'

export async function getUserById(userId: User['userId']) {
  return await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      email: true,
      type: true,
      password: true,
      studio: {
        select: {
          name: true,
        },
      },
      parent: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}

export async function getUserByEmail(email: User['email']) {
  return await prisma.user.findUnique({ where: { email } })
}

export async function createUser(
  email: User['email'],
  password: User['password'],
  type: User['type']
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return await prisma.user.create({
    data: {
      email,
      type,
      password: hashedPassword,
    },
  })
}

export async function deleteUserByEmail(email: User['email']) {
  return await prisma.user.delete({ where: { email } })
}

export async function verifyLogin(
  email: User['email'],
  password: User['password']
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }
  const isValid = await bcrypt.compare(password, userWithPassword.password)

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
