import { useMatches } from '@remix-run/react'
import { useMemo } from 'react'

import type { User } from '~/models/user.server'

const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect
  }

  return to
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches()
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  )
  return route?.data as Record<string, unknown>
}

function isUser(user: any): user is User {
  return user && typeof user === 'object' && typeof user.email === 'string'
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData('root')
  if (!data || !isUser(data.user)) {
    return undefined
  }
  return data.user
}

export function useUser(): User {
  const maybeUser = useOptionalUser()
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.'
    )
  }
  return maybeUser
}

export function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length > 3 && email.includes('@')
}

export function validateString(str: unknown): str is string {
  return typeof str === 'string' && str.length > 0
}

export type ValidatedObject = Record<string, string>

// export function validateForm(inputs: Record<string, unknown>) {
//   const errors: Record<string, string> = {}
//   for (const [key, value] of Object.entries(inputs)) {
//     if (key === 'email') {
//       if (typeof value !== 'string' || value.length < 3 || !key.includes('@')) {
//         errors[key] = `${key} is invalid`
//         continue
//       }
//     }
//     if (key === 'password') {
//       if (typeof value !== 'string' || value.length < 8) {
//         errors[key] = `${key} is invalid`
//         continue
//       }
//     }
//     if (typeof value !== 'string' || value.length < 1) {
//       errors[key] = `${key} is required and must be a string`
//     }
//   }
//   return Object.values(errors).length ? errors : null
// }
type FormInput = {
  [key: string]: unknown
}

export function validateForm(inputs: FormInput) {
  const errors: Record<string, string> = {}

  for (const [key, value] of Object.entries(inputs)) {
    if (typeof value !== 'string') {
      errors[key] = `${key} is required and must be a string`
      continue
    }

    switch (key) {
      case 'email':
        if (value.length < 3 || !value.includes('@')) {
          errors[key] = `${key} is invalid`
        }
        break
      case 'password':
        if (value.length < 8) {
          errors[key] = `${key} is invalid`
        }
        break
      default:
        if (value.length < 1) {
          errors[key] = `${key} is required and must be a string`
        }
        break
    }
  }

  return errors
}
